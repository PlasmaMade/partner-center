const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const STORE_NAME = "plasmamade-partner-center";
const STORE_KEY = "portal-state";
const LOCAL_STATE_PATH = path.join(process.cwd(), ".netlify", "portal-state.local.json");
let memoryState = null;

const ARRAY_KEYS = new Set([
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

const OBJECT_KEYS = new Set([
  "pm_portal_settings",
  "pm_cms_overrides",
  "pm_page_edits"
]);

const STATE_KEYS = Array.from(new Set([...ARRAY_KEYS, ...OBJECT_KEYS]));
const PUBLIC_WRITE_KEYS = new Set(["pm_designs", "pm_support_tickets"]);
const SENSITIVE_REQUEST_FIELDS = ["passwordHash", "passwordSalt", "passwordSetAt"];

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type,x-pm-actor"
    },
    body: JSON.stringify(body)
  };
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function defaultValue(key) {
  if (ARRAY_KEYS.has(key)) return [];
  if (OBJECT_KEYS.has(key)) return {};
  return null;
}

function emptyState() {
  const state = {};
  STATE_KEYS.forEach((key) => {
    state[key] = defaultValue(key);
  });
  state.updatedAt = null;
  return state;
}

async function blobStore() {
  try {
    const mod = await import("@netlify/blobs");
    if (mod && typeof mod.getStore === "function") return mod.getStore(STORE_NAME);
  } catch (error) {
    return null;
  }
  return null;
}

async function readPersistedState() {
  const store = await blobStore();
  if (store) {
    const raw = await store.get(STORE_KEY);
    if (!raw) return emptyState();
    try {
      return Object.assign(emptyState(), JSON.parse(raw));
    } catch (error) {
      return emptyState();
    }
  }

  try {
    if (!fs.existsSync(LOCAL_STATE_PATH)) return memoryState ? Object.assign(emptyState(), memoryState) : emptyState();
    const raw = fs.readFileSync(LOCAL_STATE_PATH, "utf8");
    return Object.assign(emptyState(), JSON.parse(raw));
  } catch (error) {
    return memoryState ? Object.assign(emptyState(), memoryState) : emptyState();
  }
}

async function writePersistedState(state) {
  const next = Object.assign(emptyState(), state || {}, { updatedAt: new Date().toISOString() });
  const store = await blobStore();
  if (store) {
    if (typeof store.setJSON === "function") await store.setJSON(STORE_KEY, next);
    else await store.set(STORE_KEY, JSON.stringify(next));
    return next;
  }

  try {
    fs.mkdirSync(path.dirname(LOCAL_STATE_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_STATE_PATH, JSON.stringify(next, null, 2));
  } catch (error) {
    memoryState = next;
  }
  return next;
}

function cleanState(input) {
  const state = {};
  STATE_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(input || {}, key)) return;
    const value = input[key];
    if (ARRAY_KEYS.has(key)) state[key] = Array.isArray(value) ? value : [];
    else if (OBJECT_KEYS.has(key)) state[key] = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  });
  return state;
}

function scrubRequest(req) {
  const out = Object.assign({}, req || {});
  SENSITIVE_REQUEST_FIELDS.forEach((field) => delete out[field]);
  return out;
}

function publicState(state) {
  const out = cleanState(state);
  if (Array.isArray(out.pm_account_requests)) {
    out.pm_account_requests = out.pm_account_requests.map(scrubRequest);
  }
  return out;
}

function rowKey(row) {
  return String((row && (row.id || row.email || row.title || row.name)) || "");
}

function mergeArrayById(existing, incoming, opts) {
  const preserveMissingSensitive = !!(opts && opts.preserveMissingSensitive);
  const map = new Map();
  (Array.isArray(existing) ? existing : []).forEach((row) => {
    const key = rowKey(row);
    if (key) map.set(key, Object.assign({}, row));
  });
  (Array.isArray(incoming) ? incoming : []).forEach((row) => {
    const key = rowKey(row);
    if (!key) return;
    const previous = map.get(key) || {};
    const next = Object.assign({}, previous, row);
    if (preserveMissingSensitive) {
      SENSITIVE_REQUEST_FIELDS.forEach((field) => {
        if ((next[field] == null || next[field] === "") && previous[field] != null) next[field] = previous[field];
      });
    }
    map.set(key, next);
  });
  return Array.from(map.values()).sort((a, b) => String(b.updatedAt || b.createdAt || b.submittedAt || "").localeCompare(String(a.updatedAt || a.createdAt || a.submittedAt || "")));
}

function mergeIncomingState(base, incoming, actorIsAdmin) {
  const clean = cleanState(incoming);
  const next = Object.assign(emptyState(), base || {});
  Object.keys(clean).forEach((key) => {
    if (key === "pm_account_requests") {
      next[key] = actorIsAdmin
        ? mergeArrayById(next[key], clean[key], { preserveMissingSensitive: true })
        : next[key];
      return;
    }
    if (!actorIsAdmin && PUBLIC_WRITE_KEYS.has(key)) {
      next[key] = mergeArrayById(next[key], clean[key]);
      return;
    }
    if (actorIsAdmin) next[key] = clean[key];
  });
  return next;
}

function adminEmails() {
  return String(process.env.PM_ADMIN_EMAILS || "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);
}

function envAdminPassword() {
  return String(process.env.PM_ADMIN_PASSWORD || "");
}

function isAdminActor(state, email) {
  const e = normalizeEmail(email);
  if (!e) return false;
  if (adminEmails().includes(e)) return true;
  const grants = Array.isArray(state.pm_admin_grants) ? state.pm_admin_grants : [];
  if (grants.some((grant) => normalizeEmail(grant.email) === e)) return true;
  const partners = Array.isArray(state.pm_partners) ? state.pm_partners : [];
  return partners.some((partner) => normalizeEmail(partner.email) === e && partner.status !== "suspended" && partner.role === "internal");
}

function hashPassword(password, salt) {
  return crypto.createHash("sha256").update(`${String(salt || "")}:${String(password || "")}`).digest("hex");
}

function verifyPassword(password, row) {
  if (!row || !row.passwordHash || !row.passwordSalt) return false;
  return hashPassword(password, row.passwordSalt) === row.passwordHash;
}

function findByEmail(rows, email) {
  const e = normalizeEmail(email);
  return (Array.isArray(rows) ? rows : []).find((row) => normalizeEmail(row.email) === e) || null;
}

function requestName(req) {
  return `${req.firstName || ""} ${req.lastName || ""}`.trim() || req.name || req.email || "Partner";
}

function makeRequestId() {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function makeAuditId() {
  return `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function addAudit(state, action, subject, meta, actor) {
  const row = {
    id: makeAuditId(),
    action,
    subject: subject || "",
    meta: meta || {},
    actor: actor || "system",
    createdAt: new Date().toISOString()
  };
  const list = Array.isArray(state.pm_audit_log) ? state.pm_audit_log : [];
  state.pm_audit_log = [row].concat(list).slice(0, 300);
}

function submitAccountRequest(state, payload) {
  const now = new Date().toISOString();
  const clean = Object.assign({}, payload || {});
  clean.email = normalizeEmail(clean.email);
  if (!clean.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email)) {
    return { error: "invalid_email" };
  }
  if (!clean.passwordHash || !clean.passwordSalt) return { error: "missing_password" };

  const rows = Array.isArray(state.pm_account_requests) ? state.pm_account_requests : [];
  let hit = findByEmail(rows, clean.email);
  if (hit && hit.status === "approved") {
    return { request: scrubRequest(hit), alreadyApproved: true };
  }
  if (hit) {
    Object.assign(hit, clean, { status: "pending", updatedAt: now, submittedAt: now });
  } else {
    hit = Object.assign({
      id: makeRequestId(),
      status: "pending",
      role: clean.partnerType || clean.role || "dealer",
      submittedAt: now,
      createdAt: now,
      updatedAt: now
    }, clean);
    rows.unshift(hit);
  }
  state.pm_account_requests = rows.slice(0, 300);
  addAudit(state, "account_request", clean.email, { company: clean.company || "" }, clean.email);
  return { request: scrubRequest(hit) };
}

function login(state, email, password) {
  const e = normalizeEmail(email);
  const envPassword = envAdminPassword();
  if (adminEmails().includes(e) && envPassword && String(password || "") === envPassword) {
    return {
      ok: true,
      status: "approved",
      admin: true,
      internal: true,
      request: {
        email: e,
        firstName: "PlasmaMade",
        lastName: "Admin",
        company: "PlasmaMade",
        role: "internal",
        partnerType: "internal",
        status: "approved"
      }
    };
  }

  const req = findByEmail(state.pm_account_requests, e);
  if (req) {
    if (req.status !== "approved") return { ok: false, status: req.status || "pending", request: scrubRequest(req) };
    if (!verifyPassword(password, req)) return { ok: false, status: "approved", request: scrubRequest(req), reason: "bad_password" };
    const admin = isAdminActor(state, e);
    return {
      ok: true,
      status: "approved",
      request: scrubRequest(req),
      admin,
      internal: admin
    };
  }

  const partner = findByEmail(state.pm_partners, e);
  if (partner && partner.status === "active") {
    if (!verifyPassword(password, partner)) return { ok: false, status: "approved", request: scrubRequest(partner), reason: partner.passwordHash ? "bad_password" : "missing_password" };
    const admin = isAdminActor(state, e);
    return {
      ok: true,
      status: "approved",
      request: scrubRequest(partner),
      admin,
      internal: admin
    };
  }

  return { ok: false, status: "none" };
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});

  try {
    const state = await readPersistedState();

    if (event.httpMethod === "GET") {
      return json(200, { ok: true, updatedAt: state.updatedAt || null, state: publicState(state) });
    }

    if (event.httpMethod !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

    let body = {};
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch (error) {
      return json(400, { ok: false, error: "invalid_json" });
    }

    if (body.action === "accountRequest") {
      const result = submitAccountRequest(state, body.request || {});
      if (result.error) return json(400, { ok: false, error: result.error });
      const saved = await writePersistedState(state);
      return json(200, { ok: true, updatedAt: saved.updatedAt, request: result.request, state: publicState(saved) });
    }

    if (body.action === "login") {
      const access = login(state, body.email, body.password);
      return json(200, Object.assign({}, access, { updatedAt: state.updatedAt || null, state: publicState(state) }));
    }

    if (body.action === "saveState") {
      const incoming = cleanState(body.state || {});
      const actor = normalizeEmail((event.headers && (event.headers["x-pm-actor"] || event.headers["X-Pm-Actor"])) || body.actor || "");
      const keys = Object.keys(incoming);
      const actorIsAdmin = isAdminActor(state, actor);
      const publicOnly = keys.length > 0 && keys.every((key) => PUBLIC_WRITE_KEYS.has(key));
      if (!actorIsAdmin && !publicOnly) return json(403, { ok: false, error: "admin_required" });
      const merged = mergeIncomingState(state, incoming, actorIsAdmin);
      if (actorIsAdmin) addAudit(merged, "state_synced", keys.join(", "), { keys }, actor);
      const saved = await writePersistedState(merged);
      return json(200, { ok: true, updatedAt: saved.updatedAt, state: publicState(saved) });
    }

    return json(400, { ok: false, error: "unknown_action" });
  } catch (error) {
    return json(500, { ok: false, error: "server_error", message: error && error.message ? error.message : String(error) });
  }
};
