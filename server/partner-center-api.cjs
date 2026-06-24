#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(process.env.PM_PUBLIC_DIR || ROOT_DIR);
const DATA_FILE = path.resolve(process.env.PM_SYNC_DATA_FILE || path.join(__dirname, "data", "state.json"));
const PORT = Number(process.env.PORT || process.env.PM_PORT || 8787);
const TOKEN_TTL_SECONDS = Number(process.env.PM_TOKEN_TTL_SECONDS || 60 * 60 * 12);
const MAX_BODY_BYTES = Number(process.env.PM_MAX_BODY_MB || 25) * 1024 * 1024;
const SERVER_SECRET = process.env.PM_SYNC_SECRET || "change-this-secret-before-production";

const CENTRAL_STATE_KEYS = [
  "pm_admin_grants",
  "pm_audit_log",
  "pm_account_requests",
  "pm_admin_mail_log",
  "pm_standard_phrases",
  "pm_designs",
  "pm_support_tickets",
  "pm_portal_settings",
  "pm_partner_groups",
  "pm_media_library",
  "pm_custom_pages",
  "pm_version_history",
  "pm_partners",
  "pm_cms_overrides",
  "pm_page_edits"
];
const PUBLIC_SYNC_KEYS = ["pm_designs", "pm_support_tickets"];
const ARRAY_STATE_KEYS = new Set([
  "pm_admin_grants",
  "pm_audit_log",
  "pm_account_requests",
  "pm_admin_mail_log",
  "pm_standard_phrases",
  "pm_designs",
  "pm_support_tickets",
  "pm_partner_groups",
  "pm_media_library",
  "pm_custom_pages",
  "pm_version_history",
  "pm_partners"
]);

const BOOTSTRAP_ADMIN = {
  email: "bjonkeren@plasmamade.com",
  name: "Bjorn Jonkeren",
  firstName: "Bjorn",
  lastName: "Jonkeren",
  company: "PlasmaMade",
  passwordSalt: "pm_bootstrap_bjonkeren_2026_06_v1",
  passwordHash: "3b9efd943719350f62ac8fbecf3a283838115568802c90995f6585794507da3e",
  createdAt: "2026-06-24T00:00:00.000Z"
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function normEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix) {
  return prefix + "_" + Date.now().toString(36) + "_" + crypto.randomBytes(3).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.createHash("sha256").update(String(salt || "") + ":" + String(password || "")).digest("hex");
}

function timingSafeEqualText(a, b) {
  const aa = Buffer.from(String(a || ""));
  const bb = Buffer.from(String(b || ""));
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload) {
  return crypto.createHmac("sha256", SERVER_SECRET).update(payload).digest("base64url");
}

function createToken(user) {
  const payload = base64url(JSON.stringify({
    email: normEmail(user.email),
    admin: !!user.admin,
    role: user.role || "dealer",
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  }));
  return payload + "." + sign(payload);
}

function verifyToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 2) return null;
  if (!timingSafeEqualText(sign(parts[0]), parts[1])) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    if (!payload.email || Number(payload.exp || 0) < Math.floor(Date.now() / 1000)) return null;
    payload.email = normEmail(payload.email);
    return payload;
  } catch (e) {
    return null;
  }
}

function blankState() {
  const state = {};
  CENTRAL_STATE_KEYS.forEach((key) => {
    state[key] = ARRAY_STATE_KEYS.has(key) ? [] : {};
  });
  return state;
}

function loadDb() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    parsed.state = Object.assign(blankState(), parsed.state || {});
    return parsed;
  } catch (e) {
    return { updatedAt: nowIso(), state: blankState() };
  }
}

function saveDb(db) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const tmp = DATA_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

function sameJson(a, b) {
  try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
}

function requestName(req) {
  return ((req && req.firstName || "") + " " + (req && req.lastName || "")).trim() || (req && (req.name || req.email)) || "Partner";
}

function companyFromEmail(email) {
  const root = String(email || "").split("@")[1] || "";
  return (root.split(".")[0] || "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function isInternalEmail(email) {
  return /@plasmamade\.(com|nl)$/i.test(String(email || ""));
}

function isBootstrapAdmin(email) {
  return normEmail(email) === BOOTSTRAP_ADMIN.email;
}

function bootstrapGrant(existing) {
  return Object.assign({}, existing || {}, {
    id: (existing && existing.id) || "adm_bootstrap_bjonkeren",
    email: BOOTSTRAP_ADMIN.email,
    name: (existing && existing.name) || BOOTSTRAP_ADMIN.name,
    source: "bootstrap_admin",
    grantedBy: (existing && existing.grantedBy) || "system",
    grantedAt: (existing && existing.grantedAt) || BOOTSTRAP_ADMIN.createdAt
  });
}

function bootstrapPartner(existing) {
  return Object.assign({}, existing || {}, {
    id: (existing && existing.id) || "pt_bootstrap_bjonkeren",
    name: BOOTSTRAP_ADMIN.name,
    email: BOOTSTRAP_ADMIN.email,
    company: BOOTSTRAP_ADMIN.company,
    country: (existing && existing.country) || "Nederland",
    phone: (existing && existing.phone) || "",
    role: "internal",
    roleLocked: true,
    status: "active",
    source: "bootstrap_admin",
    createdAt: (existing && existing.createdAt) || BOOTSTRAP_ADMIN.createdAt,
    updatedAt: (existing && existing.updatedAt) || BOOTSTRAP_ADMIN.createdAt,
    lastActiveAt: (existing && existing.lastActiveAt) || BOOTSTRAP_ADMIN.createdAt
  });
}

function upsertByEmail(rows, row) {
  const email = normEmail(row.email);
  const list = Array.isArray(rows) ? rows.slice() : [];
  const idx = list.findIndex((item) => normEmail(item && item.email) === email);
  if (idx > -1) list[idx] = Object.assign({}, list[idx], row, { email });
  else list.unshift(Object.assign({}, row, { email }));
  return list;
}

function ensureBootstrapState(db) {
  const state = db.state || (db.state = blankState());
  const grants = Array.isArray(state.pm_admin_grants) ? state.pm_admin_grants.slice() : [];
  const grantIdx = grants.findIndex((row) => isBootstrapAdmin(row && row.email));
  if (grantIdx > -1) grants[grantIdx] = bootstrapGrant(grants[grantIdx]);
  else grants.unshift(bootstrapGrant());
  const partners = Array.isArray(state.pm_partners) ? state.pm_partners.slice() : [];
  const partnerIdx = partners.findIndex((row) => isBootstrapAdmin(row && row.email));
  if (partnerIdx > -1) partners[partnerIdx] = bootstrapPartner(partners[partnerIdx]);
  else partners.unshift(bootstrapPartner());
  if (!sameJson(state.pm_admin_grants, grants)) state.pm_admin_grants = grants.slice(0, 100);
  if (!sameJson(state.pm_partners, partners)) state.pm_partners = partners.slice(0, 300);
}

function adminHasEmail(state, email) {
  const e = normEmail(email);
  if (!e) return false;
  if (isBootstrapAdmin(e)) return true;
  return (state.pm_admin_grants || []).some((row) => normEmail(row && row.email) === e);
}

function activePartner(state, email) {
  const e = normEmail(email);
  return (state.pm_partners || []).find((p) => normEmail(p && p.email) === e && (p.status || "active") === "active") || null;
}

function isAdminUser(state, email) {
  if (adminHasEmail(state, email)) return true;
  const partner = activePartner(state, email);
  return !!(partner && partner.role === "internal");
}

function normalizeRole(role, email, state) {
  const r = String(role || "dealer").trim().toLowerCase();
  const allowed = ["dealer", "distributor", "installer", "studio", "retailpartner", "international", "support"];
  if (r === "internal" || r === "admin") return isAdminUser(state, email) || isBootstrapAdmin(email) ? "internal" : "dealer";
  return allowed.includes(r) ? r : "dealer";
}

function addAudit(state, action, subject, meta, actor) {
  const row = {
    id: makeId("log"),
    action: action || "update",
    subject: subject || "",
    meta: meta || {},
    actor: actor || "server",
    createdAt: nowIso()
  };
  const list = Array.isArray(state.pm_audit_log) ? state.pm_audit_log : [];
  state.pm_audit_log = [row].concat(list).slice(0, 300);
  return row;
}

function findRequest(state, email) {
  const e = normEmail(email);
  return (state.pm_account_requests || []).find((req) => normEmail(req && req.email) === e) || null;
}

function normalizeRequestPayload(payload, timestamp) {
  const out = Object.assign({}, payload || {});
  out.email = normEmail(out.email);
  if (out.password && (!out.passwordSalt || !out.passwordHash)) {
    out.passwordSalt = makeId("pw");
    out.passwordHash = hashPassword(out.password, out.passwordSalt);
    out.passwordSetAt = out.passwordSetAt || timestamp || nowIso();
  }
  delete out.password;
  delete out.passwordConfirm;
  return out;
}

function createAccountRequest(db, payload) {
  ensureBootstrapState(db);
  const state = db.state;
  const submittedAt = nowIso();
  payload = normalizeRequestPayload(payload, submittedAt);
  const internal = isInternalEmail(payload.email);
  const nextRole = internal ? "internal" : normalizeRole(payload.partnerType || payload.role || "dealer", payload.email, state);
  const requests = Array.isArray(state.pm_account_requests) ? state.pm_account_requests.slice() : [];
  let existing = requests.find((req) => normEmail(req && req.email) === payload.email);
  if (existing && existing.status !== "approved") {
    Object.assign(existing, payload, {
      status: internal ? "approved" : "pending",
      role: nextRole,
      partnerType: nextRole,
      updatedAt: submittedAt,
      submittedAt,
      approvedAt: internal ? submittedAt : existing.approvedAt
    });
  } else {
    existing = Object.assign({
      id: makeId("req"),
      submittedAt,
      createdAt: submittedAt,
      updatedAt: submittedAt
    }, payload, {
      status: internal ? "approved" : "pending",
      role: nextRole,
      partnerType: nextRole,
      approvedAt: internal ? submittedAt : null
    });
    requests.unshift(existing);
  }
  state.pm_account_requests = requests.slice(0, 300);
  if (internal) {
    state.pm_admin_grants = upsertByEmail(state.pm_admin_grants, {
      id: "adm_" + payload.email.replace(/[^a-z0-9]+/g, "_"),
      email: payload.email,
      name: requestName(existing),
      source: "internal_account_request",
      grantedBy: "server",
      grantedAt: submittedAt
    }).slice(0, 100);
    state.pm_partners = upsertByEmail(state.pm_partners, {
      id: "pt_" + payload.email.replace(/[^a-z0-9]+/g, "_"),
      name: requestName(existing),
      email: payload.email,
      company: payload.company || "PlasmaMade",
      phone: payload.phone || "",
      country: payload.country || "",
      role: "internal",
      roleLocked: true,
      status: "active",
      source: "internal_account_request",
      createdAt: submittedAt,
      updatedAt: submittedAt,
      lastActiveAt: submittedAt
    }).slice(0, 300);
  }
  addAudit(state, "account_request", payload.email, { status: existing.status, company: existing.company || "" }, payload.email);
  db.updatedAt = submittedAt;
  return existing;
}

function mergeRowsByOwner(existingRows, incomingRows, ownerEmail, fieldName) {
  const owner = normEmail(ownerEmail);
  const base = Array.isArray(existingRows) ? existingRows.slice() : [];
  const incoming = Array.isArray(incomingRows) ? incomingRows : [];
  const byId = new Map();
  base.forEach((row) => {
    if (row && row.id) byId.set(String(row.id), row);
  });
  incoming.forEach((row) => {
    if (!row || !row.id) return;
    const rowOwner = normEmail(row[fieldName]);
    if (rowOwner !== owner) return;
    byId.set(String(row.id), Object.assign({}, row, { [fieldName]: owner }));
  });
  return Array.from(byId.values()).sort((a, b) => String(b.updatedAt || b.createdAt || b.updated || "").localeCompare(String(a.updatedAt || a.createdAt || a.updated || "")));
}

function rowIdentity(key, row) {
  if (!row || typeof row !== "object") return "";
  if (key === "pm_partners" || key === "pm_admin_grants") return normEmail(row.email);
  if (key === "pm_account_requests") return row.id ? String(row.id) : normEmail(row.email);
  return row.id ? String(row.id) : (row.email ? normEmail(row.email) : "");
}

function mergeAdminRows(key, existingRows, incomingRows) {
  const byId = new Map();
  const add = (row, preferIncoming) => {
    const id = rowIdentity(key, row);
    if (!id) return;
    if (!byId.has(id) || preferIncoming) byId.set(id, Object.assign({}, row));
  };
  (Array.isArray(existingRows) ? existingRows : []).forEach((row) => add(row, false));
  (Array.isArray(incomingRows) ? incomingRows : []).forEach((row) => add(row, true));
  return Array.from(byId.values()).sort((a, b) => String(b.updatedAt || b.createdAt || b.updated || b.submittedAt || "").localeCompare(String(a.updatedAt || a.createdAt || a.updated || a.submittedAt || "")));
}

function applyStatePatch(db, patch, auth, baseUpdatedAt) {
  ensureBootstrapState(db);
  const state = db.state;
  const incoming = patch && typeof patch === "object" ? patch : {};
  const actorAdmin = !!(auth && auth.admin && isAdminUser(state, auth.email));
  const staleAdminSave = !!(actorAdmin && baseUpdatedAt && db.updatedAt && baseUpdatedAt !== db.updatedAt);
  if (actorAdmin) {
    CENTRAL_STATE_KEYS.forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(incoming, key)) return;
      if (staleAdminSave && ARRAY_STATE_KEYS.has(key)) state[key] = mergeAdminRows(key, state[key], incoming[key]);
      else state[key] = incoming[key];
    });
  } else {
    if (Object.prototype.hasOwnProperty.call(incoming, "pm_designs")) {
      state.pm_designs = mergeRowsByOwner(state.pm_designs, incoming.pm_designs, auth.email, "ownerEmail").slice(0, 1000);
    }
    if (Object.prototype.hasOwnProperty.call(incoming, "pm_support_tickets")) {
      state.pm_support_tickets = mergeRowsByOwner(state.pm_support_tickets, incoming.pm_support_tickets, auth.email, "email").slice(0, 1000);
    }
  }
  addAudit(state, "remote_state_saved", auth.email, { admin: actorAdmin, staleMerge: staleAdminSave, keys: Object.keys(incoming).filter((key) => CENTRAL_STATE_KEYS.includes(key)) }, auth.email);
  db.updatedAt = nowIso();
}

function login(db, email, password) {
  ensureBootstrapState(db);
  const state = db.state;
  const e = normEmail(email);
  if (isBootstrapAdmin(e)) {
    const ok = timingSafeEqualText(hashPassword(password, BOOTSTRAP_ADMIN.passwordSalt), BOOTSTRAP_ADMIN.passwordHash);
    if (!ok) return { ok: false, status: "approved", request: bootstrapRequest(), reason: "bad_password" };
    return withToken({ ok: true, status: "approved", request: bootstrapRequest(), admin: true, internal: true }, state, e);
  }
  const req = findRequest(state, e);
  if (req) {
    if (req.status !== "approved") return { ok: false, status: req.status || "pending", request: req };
    if (!req.passwordSalt || !req.passwordHash) return { ok: false, status: "approved", request: req, reason: "missing_password" };
    const ok = timingSafeEqualText(hashPassword(password, req.passwordSalt), req.passwordHash);
    if (!ok) return { ok: false, status: "approved", request: req, reason: "bad_password" };
    const admin = isAdminUser(state, e) || isInternalEmail(e);
    return withToken({ ok: true, status: "approved", request: req, admin, internal: admin }, state, e);
  }
  const partner = activePartner(state, e);
  if (partner) {
    return { ok: false, status: "approved", request: partner, reason: "missing_password" };
  }
  return { ok: false, status: "none" };
}

function bootstrapRequest() {
  return {
    email: BOOTSTRAP_ADMIN.email,
    firstName: BOOTSTRAP_ADMIN.firstName,
    lastName: BOOTSTRAP_ADMIN.lastName,
    company: BOOTSTRAP_ADMIN.company,
    role: "internal",
    partnerType: "internal",
    status: "approved"
  };
}

function withToken(result, state, email) {
  const admin = isAdminUser(state, email) || !!result.admin;
  result.admin = admin;
  result.internal = admin || !!result.internal;
  result.token = createToken({ email, admin, role: admin ? "internal" : (result.request && (result.request.partnerType || result.request.role)) || "dealer" });
  return result;
}

function allowedOrigins() {
  const raw = process.env.PM_ALLOWED_ORIGINS || [
    "http://127.0.0.1:8787",
    "http://localhost:8787",
    "http://127.0.0.1:8099",
    "http://localhost:8099",
    "https://plasmamade.github.io",
    "https://plasmamade.com",
    "https://www.plasmamade.com",
    "https://partners.plasmamade.com"
  ].join(",");
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function setCors(req, res) {
  const origin = req.headers.origin || "";
  const allowed = allowedOrigins();
  if (origin && (allowed.includes("*") || allowed.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type,x-pm-actor,x-pm-token");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function sendJson(req, res, status, body) {
  setCors(req, res);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("body_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8") || "{}";
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function authFromRequest(req, db) {
  const payload = verifyToken(req.headers["x-pm-token"]);
  if (!payload) return null;
  ensureBootstrapState(db);
  return {
    email: payload.email,
    admin: !!payload.admin && isAdminUser(db.state, payload.email),
    role: payload.role || "dealer"
  };
}

async function handleApi(req, res) {
  if (req.method === "OPTIONS") {
    setCors(req, res);
    res.writeHead(204);
    res.end();
    return;
  }
  const db = loadDb();
  ensureBootstrapState(db);
  if (req.method === "GET") {
    saveDb(db);
    sendJson(req, res, 200, { ok: true, updatedAt: db.updatedAt, state: db.state });
    return;
  }
  if (req.method !== "POST") {
    sendJson(req, res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }
  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    sendJson(req, res, 400, { ok: false, error: e.message || "bad_request" });
    return;
  }
  try {
    if (body.action === "accountRequest") {
      const request = createAccountRequest(db, body.request || {});
      saveDb(db);
      sendJson(req, res, 200, { ok: true, updatedAt: db.updatedAt, request, state: db.state });
      return;
    }
    if (body.action === "login") {
      const result = login(db, body.email, body.password);
      saveDb(db);
      sendJson(req, res, 200, Object.assign({ updatedAt: db.updatedAt, state: db.state }, result));
      return;
    }
    if (body.action === "saveState") {
      const auth = authFromRequest(req, db);
      if (!auth) {
        sendJson(req, res, 401, { ok: false, error: "invalid_or_missing_token" });
        return;
      }
      applyStatePatch(db, body.state || {}, auth, body.baseUpdatedAt || "");
      saveDb(db);
      sendJson(req, res, 200, { ok: true, updatedAt: db.updatedAt, state: db.state });
      return;
    }
    sendJson(req, res, 400, { ok: false, error: "unknown_action" });
  } catch (e) {
    sendJson(req, res, 500, { ok: false, error: "server_error", detail: process.env.NODE_ENV === "production" ? undefined : String(e && e.stack || e) });
  }
}

function safeStaticPath(urlPath) {
  let rel = decodeURIComponent(urlPath || "/");
  if (rel === "/") rel = "/index.html";
  if (rel.includes("\0")) return null;
  if (rel.startsWith("/.git") || rel.startsWith("/.env") || rel.startsWith("/server/") || rel.startsWith("/.codex") || rel.startsWith("/.agents")) return null;
  const target = path.resolve(PUBLIC_DIR, "." + rel);
  if (!target.startsWith(PUBLIC_DIR)) return null;
  return target;
}

function serveStatic(req, res, pathname) {
  const target = safeStaticPath(pathname);
  if (!target) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  fs.readFile(target, (err, buf) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "content-type": MIME[path.extname(target).toLowerCase()] || "application/octet-stream",
      "cache-control": pathname.includes("?") ? "no-store" : "public, max-age=60"
    });
    res.end(buf);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname === "/api/health") {
    sendJson(req, res, 200, { ok: true, name: "PlasmaMade Partner Center API", updatedAt: loadDb().updatedAt });
    return;
  }
  if (url.pathname === "/api/sync") {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
  const secretWarning = SERVER_SECRET === "change-this-secret-before-production" ? " (set PM_SYNC_SECRET before production)" : "";
  console.log("PlasmaMade Partner Center API listening on http://127.0.0.1:" + PORT + secretWarning);
});
