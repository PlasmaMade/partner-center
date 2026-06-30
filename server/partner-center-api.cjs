#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");
const { createAiCoderHandler } = require("./ai-coder-handler.cjs");

const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(process.env.PM_PUBLIC_DIR || ROOT_DIR);
const DATA_FILE = path.resolve(process.env.PM_SYNC_DATA_FILE || path.join(__dirname, "data", "state.json"));
const PORT = Number(process.env.PORT || process.env.PM_PORT || 8787);
const TOKEN_TTL_SECONDS = Number(process.env.PM_TOKEN_TTL_SECONDS || 60 * 60 * 12);
const MAX_BODY_BYTES = Number(process.env.PM_MAX_BODY_MB || 25) * 1024 * 1024;
const SERVER_SECRET = process.env.PM_SYNC_SECRET || "change-this-secret-before-production";
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const MAIN_STATE_ID = process.env.PM_SYNC_STATE_ID || "main";
const STORAGE_MODE = DATABASE_URL ? "postgres" : "file";
const PG_SSLMODE = String(process.env.PGSSLMODE || process.env.PM_DATABASE_SSL || "").trim().toLowerCase();
let pgPool = null;
let pgSchemaReady = null;

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
const DESIGN_REVIEW_STATES = new Set(["in_review", "changes_requested", "approved", "rejected", "downloaded"]);
const DESIGN_REVIEW_FIELDS = ["status", "feedback", "feedbackAt", "reviewedAt", "approvedAt", "rejectedAt", "downloadedAt", "downloadedKind", "submittedAt"];
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
const OBJECT_STATE_KEYS = new Set([
  "pm_cms_overrides",
  "pm_page_edits",
  "pm_portal_settings"
]);

const BOOTSTRAP_ADMINS = [
  {
    email: "bjonkeren@plasmamade.com",
    name: "Bjonkeren",
    firstName: "",
    lastName: "Bjonkeren",
    company: "PlasmaMade",
    passwordSalt: "pm_bootstrap_bjonkeren_2026_06_v1",
    passwordHash: "3b9efd943719350f62ac8fbecf3a283838115568802c90995f6585794507da3e",
    grantId: "adm_bootstrap_bjonkeren",
    partnerId: "pt_bootstrap_bjonkeren",
    createdAt: "2026-06-24T00:00:00.000Z"
  },
  {
    email: "wmarckelbach@plasmamade.com",
    name: "Wim Marckelbach",
    firstName: "Wim",
    lastName: "Marckelbach",
    company: "PlasmaMade",
    passwordSalt: "pm_bootstrap_wmarckelbach_2026_06_v1",
    passwordHash: "1a109b139caef5af8114d4a99e71ab4413961303270b4c6dd1e8f58b3180a022",
    grantId: "adm_bootstrap_wmarckelbach",
    partnerId: "pt_bootstrap_wmarckelbach",
    createdAt: "2026-06-24T00:00:00.000Z"
  }
];

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

function isLegacyBjonkerenName(email, value) {
  return normEmail(email) === "bjonkeren@plasmamade.com" && /^bjorn(?:\s+jonkeren)?$/i.test(String(value || "").trim());
}

function bootstrapDisplayName(existing, admin) {
  const existingName = existing && existing.name;
  if (existingName && !isLegacyBjonkerenName(admin && admin.email, existingName)) return existingName;
  return admin.name;
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

function normalizeDb(input, fallbackUpdatedAt) {
  const parsed = input && typeof input === "object" ? input : {};
  const rawState = parsed.state && typeof parsed.state === "object" ? parsed.state : parsed;
  return {
    updatedAt: parsed.updatedAt || fallbackUpdatedAt || nowIso(),
    state: Object.assign(blankState(), rawState || {})
  };
}

function getPgPool() {
  if (!DATABASE_URL) return null;
  if (pgPool) return pgPool;
  let Pool;
  try {
    ({ Pool } = require("pg"));
  } catch (e) {
    const err = new Error("The pg package is required when DATABASE_URL is set. Run npm install before starting the API.");
    err.code = "pg_dependency_missing";
    throw err;
  }
  const config = {
    connectionString: DATABASE_URL,
    max: Number(process.env.PM_DATABASE_POOL_SIZE || 5)
  };
  if (PG_SSLMODE !== "disable") config.ssl = { rejectUnauthorized: false };
  pgPool = new Pool(config);
  return pgPool;
}

async function ensurePgSchema() {
  if (!DATABASE_URL) return;
  if (!pgSchemaReady) {
    pgSchemaReady = getPgPool().query(`
      CREATE TABLE IF NOT EXISTS partner_center_state (
        id text PRIMARY KEY,
        data jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `).catch((err) => {
      pgSchemaReady = null;
      throw err;
    });
  }
  await pgSchemaReady;
}

async function loadDbAsync() {
  if (!DATABASE_URL) return loadDb();
  await ensurePgSchema();
  const result = await getPgPool().query(
    "SELECT data, updated_at FROM partner_center_state WHERE id = $1",
    [MAIN_STATE_ID]
  );
  if (!result.rows.length) {
    const db = { updatedAt: nowIso(), state: blankState() };
    await saveDbAsync(db);
    return db;
  }
  const row = result.rows[0];
  return normalizeDb(row.data, row.updated_at && row.updated_at.toISOString ? row.updated_at.toISOString() : nowIso());
}

async function saveDbAsync(db) {
  const normalized = normalizeDb(db);
  ensureBootstrapState(normalized);
  if (!DATABASE_URL) {
    saveDb(normalized);
    return normalized;
  }
  await ensurePgSchema();
  await getPgPool().query(
    `INSERT INTO partner_center_state (id, data, updated_at)
     VALUES ($1, $2::jsonb, $3::timestamptz)
     ON CONFLICT (id) DO UPDATE
     SET data = EXCLUDED.data,
         updated_at = EXCLUDED.updated_at`,
    [MAIN_STATE_ID, JSON.stringify(normalized), normalized.updatedAt]
  );
  return normalized;
}

function sameJson(a, b) {
  try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
}

function requestName(req) {
  const name = ((req && req.firstName || "") + " " + (req && req.lastName || "")).trim() || (req && (req.name || req.email)) || "Partner";
  if (isLegacyBjonkerenName(req && req.email, name)) {
    const admin = bootstrapAdminForEmail(req && req.email);
    return (admin && admin.name) || "Bjonkeren";
  }
  return name;
}

function companyFromEmail(email) {
  const root = String(email || "").split("@")[1] || "";
  return (root.split(".")[0] || "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function isInternalEmail(email) {
  return /@plasmamade\.(com|nl)$/i.test(String(email || ""));
}

function bootstrapAdminForEmail(email) {
  const e = normEmail(email);
  return BOOTSTRAP_ADMINS.find((admin) => admin.email === e) || null;
}

function isBootstrapAdmin(email) {
  return !!bootstrapAdminForEmail(email);
}

function bootstrapGrant(existing, admin) {
  admin = admin || bootstrapAdminForEmail(existing && existing.email) || BOOTSTRAP_ADMINS[0];
  return Object.assign({}, existing || {}, {
    id: (existing && existing.id) || admin.grantId,
    email: admin.email,
    name: bootstrapDisplayName(existing, admin),
    source: "bootstrap_admin",
    grantedBy: (existing && existing.grantedBy) || "system",
    grantedAt: (existing && existing.grantedAt) || admin.createdAt
  });
}

function bootstrapPartner(existing, admin) {
  admin = admin || bootstrapAdminForEmail(existing && existing.email) || BOOTSTRAP_ADMINS[0];
  return Object.assign({}, existing || {}, {
    id: (existing && existing.id) || admin.partnerId,
    name: bootstrapDisplayName(existing, admin),
    email: admin.email,
    company: admin.company,
    country: (existing && existing.country) || "Nederland",
    phone: (existing && existing.phone) || "",
    role: "internal",
    roleLocked: true,
    status: "active",
    source: "bootstrap_admin",
    createdAt: (existing && existing.createdAt) || admin.createdAt,
    updatedAt: (existing && existing.updatedAt) || admin.createdAt,
    lastActiveAt: (existing && existing.lastActiveAt) || admin.createdAt
  });
}

function upsertByEmail(rows, row) {
  const email = normEmail(row.email);
  const admin = bootstrapAdminForEmail(email);
  if (row && isLegacyBjonkerenName(email, row.name)) row = Object.assign({}, row, { name: (admin && admin.name) || "Bjonkeren" });
  const list = Array.isArray(rows) ? rows.slice() : [];
  const idx = list.findIndex((item) => normEmail(item && item.email) === email);
  if (idx > -1) list[idx] = Object.assign({}, list[idx], row, { email });
  else list.unshift(Object.assign({}, row, { email }));
  return list;
}

function ensureBootstrapState(db) {
  const state = db.state || (db.state = blankState());
  const grants = Array.isArray(state.pm_admin_grants) ? state.pm_admin_grants.slice() : [];
  const partners = Array.isArray(state.pm_partners) ? state.pm_partners.slice() : [];
  BOOTSTRAP_ADMINS.slice().reverse().forEach((admin) => {
    const grantIdx = grants.findIndex((row) => normEmail(row && row.email) === admin.email);
    if (grantIdx > -1) grants[grantIdx] = bootstrapGrant(grants[grantIdx], admin);
    else grants.unshift(bootstrapGrant(null, admin));
    const partnerIdx = partners.findIndex((row) => normEmail(row && row.email) === admin.email);
    if (partnerIdx > -1) partners[partnerIdx] = bootstrapPartner(partners[partnerIdx], admin);
    else partners.unshift(bootstrapPartner(null, admin));
  });
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
  const allowed = ["dealer", "distributor", "installer", "studio", "retailpartner", "international", "support", "marketing", "agent", "partner"];
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
  const matches = (state.pm_account_requests || []).filter((req) => normEmail(req && req.email) === e);
  return matches.find((req) => req && req.status === "approved") || matches[0] || null;
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
  if (existing) {
    Object.assign(existing, payload, {
      status: existing.status === "approved" ? "approved" : (internal ? "approved" : "pending"),
      role: nextRole,
      partnerType: nextRole,
      updatedAt: submittedAt,
      submittedAt: existing.submittedAt || submittedAt,
      approvedAt: existing.status === "approved" ? (existing.approvedAt || submittedAt) : (internal ? submittedAt : existing.approvedAt)
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

function approveAccountRequest(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const approvedAt = nowIso();
  const requestId = String((body && (body.requestId || body.id)) || "");
  const email = normEmail(body && body.email);
  const requests = Array.isArray(state.pm_account_requests) ? state.pm_account_requests.slice() : [];
  const found = requests.find((row) => (requestId && String(row && row.id) === requestId) || (email && normEmail(row && row.email) === email));
  if (!found || !normEmail(found.email)) return null;
  const targetEmail = normEmail(found.email);
  let approvedRequest = null;
  state.pm_account_requests = requests.map((row) => {
    if (!row || normEmail(row.email) !== targetEmail) return row;
    const next = Object.assign({}, row, {
      email: targetEmail,
      status: "approved",
      approvedAt: row.approvedAt || approvedAt,
      rejectedAt: null,
      suspendedAt: null,
      updatedAt: approvedAt
    });
    if (body && body.approvalMailAt) next.approvalMailAt = body.approvalMailAt;
    if (!approvedRequest || (requestId && String(row.id) === requestId)) approvedRequest = next;
    return next;
  }).slice(0, 300);
  approvedRequest = approvedRequest || Object.assign({}, found, {
    email: targetEmail,
    status: "approved",
    approvedAt,
    updatedAt: approvedAt
  });
  const role = normalizeRole(approvedRequest.partnerType || approvedRequest.role || "dealer", targetEmail, state);
  state.pm_partners = upsertByEmail(state.pm_partners, {
    id: approvedRequest.partnerId || "pt_" + targetEmail.replace(/[^a-z0-9]+/g, "_"),
    name: requestName(approvedRequest),
    email: targetEmail,
    company: approvedRequest.company || companyFromEmail(targetEmail),
    phone: approvedRequest.phone || "",
    country: approvedRequest.country || "",
    role,
    roleLocked: true,
    status: "active",
    source: "account_request",
    createdAt: approvedRequest.createdAt || approvedRequest.submittedAt || approvedAt,
    updatedAt: approvedAt,
    lastActiveAt: approvedAt
  }).slice(0, 300);
  addAudit(state, "account_approved", targetEmail, { company: approvedRequest.company || "" }, auth && auth.email || "server");
  db.updatedAt = approvedAt;
  return approvedRequest;
}

function findRequestForMutation(state, body) {
  const requestId = String((body && (body.requestId || body.id)) || "");
  const email = normEmail(body && body.email);
  const requests = Array.isArray(state.pm_account_requests) ? state.pm_account_requests : [];
  return requests.find((row) => (requestId && String(row && row.id) === requestId) || (email && normEmail(row && row.email) === email)) || null;
}

function setAccountRequestStatus(db, body, auth, status) {
  ensureBootstrapState(db);
  const state = db.state;
  const now = nowIso();
  const found = findRequestForMutation(state, body);
  if (!found || !normEmail(found.email)) return null;
  const targetEmail = normEmail(found.email);
  let changed = null;
  state.pm_account_requests = (Array.isArray(state.pm_account_requests) ? state.pm_account_requests : []).map((row) => {
    if (!row || normEmail(row.email) !== targetEmail) return row;
    const next = Object.assign({}, row, {
      email: targetEmail,
      status,
      updatedAt: now
    });
    if (status === "rejected") {
      next.rejectedAt = now;
      next.rejectionReason = (body && body.reason) || row.rejectionReason || "";
      next.approvedAt = null;
      next.suspendedAt = null;
    }
    if (status === "suspended") {
      next.suspendedAt = now;
      next.suspensionReason = (body && body.reason) || row.suspensionReason || "";
    }
    if (!changed || String(row.id) === String(found.id)) changed = next;
    return next;
  }).slice(0, 300);
  if (status === "rejected" || status === "suspended") {
    const partnerStatus = status === "suspended" ? "suspended" : "inactive";
    state.pm_partners = (Array.isArray(state.pm_partners) ? state.pm_partners : []).map((partner) => {
      if (!partner || normEmail(partner.email) !== targetEmail) return partner;
      return Object.assign({}, partner, { status: partnerStatus, updatedAt: now });
    }).slice(0, 300);
  }
  addAudit(
    state,
    status === "rejected" ? "account_rejected" : "account_suspended",
    targetEmail,
    { reason: (body && body.reason) || "" },
    auth && auth.email || "server"
  );
  db.updatedAt = now;
  return changed;
}

function deleteAccountRequest(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const found = findRequestForMutation(state, body);
  if (!found) return null;
  const requestId = String(found.id || "");
  const email = normEmail(found.email);
  state.pm_account_requests = (Array.isArray(state.pm_account_requests) ? state.pm_account_requests : []).filter((row) => {
    if (!row) return false;
    if (requestId && String(row.id || "") === requestId) return false;
    return !(email && !requestId && normEmail(row.email) === email);
  }).slice(0, 300);
  addAudit(state, "account_request_deleted", email || requestId, {}, auth && auth.email || "server");
  db.updatedAt = nowIso();
  return found;
}

function sanitizePartner(partner, state) {
  const input = partner && typeof partner === "object" ? partner : {};
  const email = normEmail(input.email);
  if (!email) return null;
  const now = nowIso();
  const rawRole = String(input.role || input.partnerType || "dealer").trim().toLowerCase();
  if (rawRole === "internal" || rawRole === "admin") {
    state.pm_admin_grants = upsertByEmail(state.pm_admin_grants, {
      id: "adm_" + email.replace(/[^a-z0-9]+/g, "_"),
      email,
      name: input.name || input.company || companyFromEmail(email),
      source: input.source || "partner_admin_edit",
      grantedBy: input.grantedBy || "admin",
      grantedAt: now
    }).slice(0, 100);
  }
  const role = normalizeRole(rawRole, email, state);
  const allowedStatus = ["active", "inactive", "suspended"];
  const status = allowedStatus.includes(String(input.status || "active").toLowerCase()) ? String(input.status || "active").toLowerCase() : "active";
  return {
    id: input.id || "pt_" + email.replace(/[^a-z0-9]+/g, "_"),
    name: input.name || input.company || companyFromEmail(email),
    email,
    company: input.company || input.name || companyFromEmail(email),
    phone: input.phone || "",
    country: input.country || "",
    role,
    roleLocked: role === "internal" || !!input.roleLocked,
    status,
    source: input.source || "admin",
    createdAt: input.createdAt || now,
    updatedAt: now,
    lastActiveAt: input.lastActiveAt || now
  };
}

function upsertPartnerAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const partner = sanitizePartner(body && body.partner, state);
  if (!partner) return null;
  state.pm_partners = upsertByEmail(state.pm_partners, partner).slice(0, 300);
  addAudit(state, "partner_saved", partner.email, { role: partner.role, status: partner.status }, auth && auth.email || "server");
  db.updatedAt = nowIso();
  return partner;
}

function deletePartnerAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const email = normEmail(body && body.email);
  if (!email || isBootstrapAdmin(email)) return null;
  const existing = activePartner(state, email) || (state.pm_partners || []).find((p) => normEmail(p && p.email) === email) || null;
  state.pm_partners = (Array.isArray(state.pm_partners) ? state.pm_partners : []).filter((p) => normEmail(p && p.email) !== email).slice(0, 300);
  state.pm_admin_grants = (Array.isArray(state.pm_admin_grants) ? state.pm_admin_grants : []).filter((g) => normEmail(g && g.email) !== email).slice(0, 100);
  addAudit(state, "partner_deleted", email, {}, auth && auth.email || "server");
  db.updatedAt = nowIso();
  return existing || { email };
}

function grantAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const email = normEmail(body && body.email);
  if (!email) return null;
  const now = nowIso();
  state.pm_admin_grants = upsertByEmail(state.pm_admin_grants, {
    id: "adm_" + email.replace(/[^a-z0-9]+/g, "_"),
    email,
    name: (body && body.name) || companyFromEmail(email),
    source: (body && body.source) || "admin_panel",
    grantedBy: auth && auth.email || "server",
    grantedAt: now,
    updatedAt: now
  }).slice(0, 100);
  state.pm_partners = upsertByEmail(state.pm_partners, {
    id: "pt_" + email.replace(/[^a-z0-9]+/g, "_"),
    email,
    name: (body && body.name) || companyFromEmail(email),
    company: (body && body.company) || companyFromEmail(email),
    role: "internal",
    roleLocked: true,
    status: "active",
    source: "admin_grant",
    createdAt: now,
    updatedAt: now,
    lastActiveAt: now
  }).slice(0, 300);
  addAudit(state, "admin_granted", email, {}, auth && auth.email || "server");
  db.updatedAt = now;
  return { email };
}

function revokeAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const email = normEmail(body && body.email);
  if (!email || isBootstrapAdmin(email)) return null;
  const now = nowIso();
  state.pm_admin_grants = (Array.isArray(state.pm_admin_grants) ? state.pm_admin_grants : []).filter((g) => normEmail(g && g.email) !== email).slice(0, 100);
  state.pm_partners = (Array.isArray(state.pm_partners) ? state.pm_partners : []).map((p) => {
    if (!p || normEmail(p.email) !== email) return p;
    return Object.assign({}, p, { role: "dealer", roleLocked: false, updatedAt: now });
  }).slice(0, 300);
  addAudit(state, "admin_revoked", email, {}, auth && auth.email || "server");
  db.updatedAt = now;
  return { email };
}

function findDesignForMutation(state, body) {
  const designId = String((body && (body.designId || body.id)) || "");
  if (!designId) return null;
  const rows = Array.isArray(state.pm_designs) ? state.pm_designs : [];
  return rows.find((row) => row && String(row.id || "") === designId) || null;
}

function setDesignStatusAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const found = findDesignForMutation(state, body);
  if (!found) return null;
  const allowed = new Set(["draft", "submitted", "in_review", "changes_requested", "approved", "rejected", "downloaded"]);
  const status = String((body && body.status) || "").trim().toLowerCase();
  if (!allowed.has(status)) return null;
  const now = nowIso();
  const feedback = body && Object.prototype.hasOwnProperty.call(body, "feedback") ? String(body.feedback || "") : null;
  let changed = null;
  state.pm_designs = (Array.isArray(state.pm_designs) ? state.pm_designs : []).map((row) => {
    if (!row || String(row.id || "") !== String(found.id || "")) return row;
    const next = Object.assign({}, row, { status, updated: now });
    if (status === "submitted") next.submittedAt = row.submittedAt || now;
    if (status === "in_review") next.reviewedAt = now;
    if (status === "changes_requested") next.feedbackAt = now;
    if (status === "approved") next.approvedAt = now;
    if (status === "rejected") next.rejectedAt = now;
    if (status === "downloaded") next.downloadedAt = now;
    if (feedback !== null) next.feedback = feedback;
    changed = next;
    return next;
  }).slice(0, 1000);
  addAudit(state, "design_" + status, changed.name || changed.id, { designId: changed.id, feedback: feedback || "" }, auth && auth.email || "server");
  db.updatedAt = now;
  return changed;
}

function deleteDesignAdmin(db, body, auth) {
  ensureBootstrapState(db);
  const state = db.state;
  const found = findDesignForMutation(state, body);
  if (!found) return null;
  state.pm_designs = (Array.isArray(state.pm_designs) ? state.pm_designs : []).filter((row) => row && String(row.id || "") !== String(found.id || "")).slice(0, 1000);
  addAudit(state, "design_deleted", found.name || found.id, { designId: found.id }, auth && auth.email || "server");
  db.updatedAt = nowIso();
  return found;
}

function dateValue(value) {
  const n = Date.parse(value || "");
  return Number.isFinite(n) ? n : 0;
}

function designReviewTime(row) {
  if (!row) return 0;
  const times = DESIGN_REVIEW_FIELDS.map((field) => dateValue(row[field]));
  if (DESIGN_REVIEW_STATES.has(String(row.status || ""))) times.push(dateValue(row.updated || row.updatedAt));
  return Math.max(0, ...times);
}

function designContentTime(row) {
  if (!row) return 0;
  return dateValue(row.contentUpdatedAt || row.updatedAt || row.updated || row.createdAt);
}

function copyDesignReviewFields(target, source) {
  if (!target || !source) return target;
  DESIGN_REVIEW_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) target[field] = source[field];
  });
  return target;
}

function mergeDesignForOwner(existing, incoming, ownerEmail) {
  const owner = normEmail(ownerEmail);
  const nextIncoming = Object.assign({}, incoming || {}, { ownerEmail: owner });
  if (!existing) {
    const status = String(nextIncoming.status || "draft").toLowerCase();
    if (!["draft", "submitted"].includes(status)) {
      DESIGN_REVIEW_FIELDS.forEach((field) => { delete nextIncoming[field]; });
      nextIncoming.status = "draft";
      nextIncoming.feedback = "";
    }
    return nextIncoming;
  }
  const incomingContentIsNewer = designContentTime(nextIncoming) >= designContentTime(existing);
  const next = incomingContentIsNewer
    ? Object.assign({}, existing, nextIncoming)
    : Object.assign({}, nextIncoming, existing);
  const incomingStatus = String(nextIncoming.status || "").toLowerCase();
  const existingStatus = String(existing.status || "").toLowerCase();
  const incomingReview = designReviewTime(nextIncoming);
  const existingReview = designReviewTime(existing);
  let reviewSource = existing;
  if (incomingStatus === "submitted" && incomingReview >= existingReview) reviewSource = nextIncoming;
  if (incomingStatus === "downloaded" && ["approved", "downloaded"].includes(existingStatus) && incomingReview >= existingReview) reviewSource = nextIncoming;
  if (!existingReview && ["draft", "submitted"].includes(incomingStatus)) reviewSource = nextIncoming;
  copyDesignReviewFields(next, reviewSource);
  next.ownerEmail = owner;
  return next;
}

function mergeDesignRowsByOwner(existingRows, incomingRows, ownerEmail) {
  const owner = normEmail(ownerEmail);
  const base = Array.isArray(existingRows) ? existingRows.slice() : [];
  const incoming = Array.isArray(incomingRows) ? incomingRows : [];
  const byId = new Map();
  base.forEach((row) => {
    if (row && row.id) byId.set(String(row.id), row);
  });
  incoming.forEach((row) => {
    if (!row || !row.id) return;
    const rowOwner = normEmail(row.ownerEmail);
    if (rowOwner !== owner) return;
    const id = String(row.id);
    byId.set(id, mergeDesignForOwner(byId.get(id), row, owner));
  });
  return Array.from(byId.values()).sort((a, b) => String(b.updatedAt || b.createdAt || b.updated || "").localeCompare(String(a.updatedAt || a.createdAt || a.updated || "")));
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
  if (key === "pm_account_requests") return row.email ? normEmail(row.email) : (row.id ? String(row.id) : "");
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

function isPlainObject(value) {
  return !!(value && typeof value === "object" && !Array.isArray(value));
}

function mergeAdminObject(existing, incoming) {
  if (!isPlainObject(existing)) return isPlainObject(incoming) ? Object.assign({}, incoming) : incoming;
  if (!isPlainObject(incoming)) return incoming;
  const out = Object.assign({}, existing);
  Object.keys(incoming).forEach((key) => {
    if (isPlainObject(out[key]) && isPlainObject(incoming[key])) out[key] = mergeAdminObject(out[key], incoming[key]);
    else out[key] = incoming[key];
  });
  return out;
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
      else if (staleAdminSave && OBJECT_STATE_KEYS.has(key)) state[key] = mergeAdminObject(state[key], incoming[key]);
      else state[key] = incoming[key];
    });
  } else {
    if (Object.prototype.hasOwnProperty.call(incoming, "pm_designs")) {
      state.pm_designs = mergeDesignRowsByOwner(state.pm_designs, incoming.pm_designs, auth.email).slice(0, 1000);
    }
    if (Object.prototype.hasOwnProperty.call(incoming, "pm_support_tickets")) {
      state.pm_support_tickets = mergeRowsByOwner(state.pm_support_tickets, incoming.pm_support_tickets, auth.email, "email").slice(0, 1000);
    }
  }
  ensureBootstrapState(db);
  addAudit(state, "remote_state_saved", auth.email, { admin: actorAdmin, staleMerge: staleAdminSave, keys: Object.keys(incoming).filter((key) => CENTRAL_STATE_KEYS.includes(key)) }, auth.email);
  db.updatedAt = nowIso();
}

function login(db, email, password) {
  ensureBootstrapState(db);
  const state = db.state;
  const e = normEmail(email);
  const bootstrapAdmin = bootstrapAdminForEmail(e);
  if (bootstrapAdmin) {
    const ok = timingSafeEqualText(hashPassword(password, bootstrapAdmin.passwordSalt), bootstrapAdmin.passwordHash);
    if (!ok) return { ok: false, status: "approved", request: bootstrapRequest(bootstrapAdmin), reason: "bad_password" };
    return withToken({ ok: true, status: "approved", request: bootstrapRequest(bootstrapAdmin), admin: true, internal: true }, state, e);
  }
  const partner = activePartner(state, e);
  const req = findRequest(state, e);
  if (req) {
    const approved = req.status === "approved" || !!partner;
    if (!approved) return { ok: false, status: req.status || "pending", request: req };
    if (partner && req.status !== "approved") {
      req.status = "approved";
      req.approvedAt = req.approvedAt || nowIso();
      req.updatedAt = nowIso();
    }
    if (!req.passwordSalt || !req.passwordHash) return { ok: false, status: "approved", request: req, reason: "missing_password" };
    const ok = timingSafeEqualText(hashPassword(password, req.passwordSalt), req.passwordHash);
    if (!ok) return { ok: false, status: "approved", request: req, reason: "bad_password" };
    const admin = isAdminUser(state, e) || isInternalEmail(e);
    return withToken({ ok: true, status: "approved", request: req, admin, internal: admin }, state, e);
  }
  if (partner) {
    return { ok: false, status: "approved", request: partner, reason: "missing_password" };
  }
  return { ok: false, status: "none" };
}

function bootstrapRequest(admin) {
  admin = admin || BOOTSTRAP_ADMINS[0];
  return {
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
    company: admin.company,
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

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function sanitizeAccountRequest(row) {
  const out = Object.assign({}, row || {});
  delete out.password;
  delete out.passwordConfirm;
  delete out.passwordHash;
  delete out.passwordSalt;
  delete out.passwordSetAt;
  return out;
}

function sanitizeAccountRequests(rows) {
  return (Array.isArray(rows) ? rows : []).map(sanitizeAccountRequest);
}

function sanitizeStateForClient(state, auth) {
  const safe = blankState();
  const actorEmail = normEmail(auth && auth.email);
  const admin = !!(auth && auth.admin && isAdminUser(state, actorEmail));
  if (admin) {
    CENTRAL_STATE_KEYS.forEach((key) => {
      safe[key] = key === "pm_account_requests"
        ? sanitizeAccountRequests(state[key])
        : cloneValue(state[key]);
    });
    return safe;
  }
  safe.pm_standard_phrases = cloneValue(state.pm_standard_phrases || []);
  safe.pm_portal_settings = cloneValue(state.pm_portal_settings || {});
  safe.pm_partner_groups = cloneValue(state.pm_partner_groups || []);
  safe.pm_media_library = cloneValue(state.pm_media_library || []);
  safe.pm_custom_pages = cloneValue(state.pm_custom_pages || []);
  safe.pm_cms_overrides = cloneValue(state.pm_cms_overrides || {});
  safe.pm_page_edits = cloneValue(state.pm_page_edits || {});
  if (actorEmail) {
    safe.pm_account_requests = sanitizeAccountRequests((state.pm_account_requests || []).filter((row) => normEmail(row && row.email) === actorEmail));
    safe.pm_partners = cloneValue((state.pm_partners || []).filter((row) => normEmail(row && row.email) === actorEmail));
    safe.pm_designs = cloneValue((state.pm_designs || []).filter((row) => normEmail(row && row.ownerEmail) === actorEmail));
    safe.pm_support_tickets = cloneValue((state.pm_support_tickets || []).filter((row) => normEmail(row && row.email) === actorEmail));
  }
  return safe;
}

function stateAuthForLogin(email, result, state) {
  const actorEmail = normEmail(email);
  return {
    email: actorEmail,
    admin: !!(result && result.ok && (result.admin || isAdminUser(state, actorEmail))),
    role: (result && result.request && (result.request.partnerType || result.request.role)) || "dealer"
  };
}

function sendSyncState(req, res, status, db, body, auth) {
  const payload = Object.assign({}, body || {});
  if (payload.request) payload.request = sanitizeAccountRequest(payload.request);
  if (payload.result && payload.result.passwordHash) payload.result = sanitizeAccountRequest(payload.result);
  payload.updatedAt = db.updatedAt;
  payload.state = sanitizeStateForClient(db.state, auth || null);
  sendJson(req, res, status, payload);
}

async function handleApi(req, res) {
  if (req.method === "OPTIONS") {
    setCors(req, res);
    res.writeHead(204);
    res.end();
    return;
  }
  let db;
  try {
    db = await loadDbAsync();
    ensureBootstrapState(db);
  } catch (e) {
    sendJson(req, res, 503, {
      ok: false,
      error: "storage_unavailable",
      storage: STORAGE_MODE,
      detail: process.env.NODE_ENV === "production" ? undefined : String(e && e.stack || e)
    });
    return;
  }
  if (req.method === "GET") {
    try {
      await saveDbAsync(db);
      const auth = authFromRequest(req, db);
      sendSyncState(req, res, 200, db, { ok: true }, auth);
    } catch (e) {
      sendJson(req, res, 503, {
        ok: false,
        error: "storage_unavailable",
        storage: STORAGE_MODE,
        detail: process.env.NODE_ENV === "production" ? undefined : String(e && e.stack || e)
      });
    }
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
      await saveDbAsync(db);
      sendSyncState(req, res, 200, db, { ok: true, request }, { email: request && request.email, admin: false });
      return;
    }
    if (body.action === "login") {
      const result = login(db, body.email, body.password);
      await saveDbAsync(db);
      sendSyncState(req, res, 200, db, Object.assign({}, result), stateAuthForLogin(body.email, result, db.state));
      return;
    }
    if (body.action === "approveAccountRequest") {
      const auth = authFromRequest(req, db);
      if (!auth) {
        sendJson(req, res, 401, { ok: false, error: "invalid_or_missing_token" });
        return;
      }
      if (!auth.admin || !isAdminUser(db.state, auth.email)) {
        sendJson(req, res, 403, { ok: false, error: "admin_required" });
        return;
      }
      const approved = approveAccountRequest(db, body, auth);
      if (!approved) {
        sendJson(req, res, 404, { ok: false, error: "request_not_found" });
        return;
      }
      await saveDbAsync(db);
      sendSyncState(req, res, 200, db, { ok: true, request: approved }, auth);
      return;
    }
    if ([
      "rejectAccountRequest",
      "suspendAccountRequest",
      "deleteAccountRequest",
      "upsertPartner",
      "deletePartner",
      "grantAdmin",
      "revokeAdmin",
      "setDesignStatus",
      "deleteDesign"
    ].includes(body.action)) {
      const auth = authFromRequest(req, db);
      if (!auth) {
        sendJson(req, res, 401, { ok: false, error: "invalid_or_missing_token" });
        return;
      }
      if (!auth.admin || !isAdminUser(db.state, auth.email)) {
        sendJson(req, res, 403, { ok: false, error: "admin_required" });
        return;
      }
      let result = null;
      if (body.action === "rejectAccountRequest") result = setAccountRequestStatus(db, body, auth, "rejected");
      if (body.action === "suspendAccountRequest") result = setAccountRequestStatus(db, body, auth, "suspended");
      if (body.action === "deleteAccountRequest") result = deleteAccountRequest(db, body, auth);
      if (body.action === "upsertPartner") result = upsertPartnerAdmin(db, body, auth);
      if (body.action === "deletePartner") result = deletePartnerAdmin(db, body, auth);
      if (body.action === "grantAdmin") result = grantAdmin(db, body, auth);
      if (body.action === "revokeAdmin") result = revokeAdmin(db, body, auth);
      if (body.action === "setDesignStatus") result = setDesignStatusAdmin(db, body, auth);
      if (body.action === "deleteDesign") result = deleteDesignAdmin(db, body, auth);
      if (!result) {
        sendJson(req, res, 404, { ok: false, error: "target_not_found_or_protected" });
        return;
      }
      await saveDbAsync(db);
      sendSyncState(req, res, 200, db, { ok: true, result }, auth);
      return;
    }
    if (body.action === "saveState") {
      const auth = authFromRequest(req, db);
      if (!auth) {
        sendJson(req, res, 401, { ok: false, error: "invalid_or_missing_token" });
        return;
      }
      applyStatePatch(db, body.state || {}, auth, body.baseUpdatedAt || "");
      await saveDbAsync(db);
      sendSyncState(req, res, 200, db, { ok: true }, auth);
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
    const ext = path.extname(target).toLowerCase();
    const hasQuery = String(req.url || "").includes("?");
    const cacheControl = ext === ".html" || hasQuery ? "no-store, max-age=0" : "public, max-age=60";
    res.writeHead(200, {
      "content-type": MIME[ext] || "application/octet-stream",
      "cache-control": cacheControl
    });
    res.end(buf);
  });
}

async function handleHealth(req, res) {
  try {
    const db = await loadDbAsync();
    ensureBootstrapState(db);
    await saveDbAsync(db);
    sendJson(req, res, 200, {
      ok: true,
      name: "PlasmaMade Partner Center API",
      storage: STORAGE_MODE,
      updatedAt: db.updatedAt
    });
  } catch (e) {
    sendJson(req, res, 503, {
      ok: false,
      name: "PlasmaMade Partner Center API",
      storage: STORAGE_MODE,
      error: "storage_unavailable",
      detail: process.env.NODE_ENV === "production" ? undefined : String(e && e.stack || e)
    });
  }
}

const handleAiCoder = createAiCoderHandler({
  requireAdmin: true,
  setCors,
  authorize: async function (req) {
    let db;
    try {
      db = await loadDbAsync();
      ensureBootstrapState(db);
    } catch (e) {
      return { ok: false, status: 503, error: "storage_unavailable" };
    }
    const auth = authFromRequest(req, db);
    if (!auth) return { ok: false, status: 401, error: "invalid_or_missing_token" };
    if (!auth.admin || !isAdminUser(db.state, auth.email)) return { ok: false, status: 403, error: "admin_required" };
    return { ok: true, auth: auth };
  }
});

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname === "/api/health") {
    handleHealth(req, res);
    return;
  }
  if (url.pathname === "/api/ai-coder") {
    handleAiCoder(req, res);
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
  console.log("PlasmaMade Partner Center API listening on http://127.0.0.1:" + PORT + " using " + STORAGE_MODE + " storage" + secretWarning);
});
