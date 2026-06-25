#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

const MAX_BODY = Number(process.env.PM_AI_MAX_BODY_MB || 8) * 1024 * 1024;
const MAX_CONTEXT_CHARS = Number(process.env.PM_AI_MAX_CONTEXT_CHARS || 60000);
const MAX_HISTORY_CHARS = Number(process.env.PM_AI_MAX_HISTORY_CHARS || 18000);
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const OPENAI_REASONING_EFFORT = process.env.OPENAI_REASONING_EFFORT || "medium";
const OPENAI_TIMEOUT_MS = Number(process.env.OPENAI_TIMEOUT_MS || 70000);

const ACTION_TYPES = new Set([
  "addSection",
  "addBanner",
  "addCard",
  "addUploadField",
  "replaceImage",
  "rewriteSelectedText",
  "updateSettings",
  "createCustomPage",
  "createDistributorPage",
  "addPhrase",
  "createCmsItem",
  "addMedia",
  "moveSectionBefore",
  "whitespace",
  "navigate"
]);

const ACTION_ALIASES = {
  addsection: "addSection",
  section: "addSection",
  addbanner: "addBanner",
  banner: "addBanner",
  addcard: "addCard",
  card: "addCard",
  adduploadfield: "addUploadField",
  uploadfield: "addUploadField",
  image: "replaceImage",
  replaceimage: "replaceImage",
  text: "rewriteSelectedText",
  rewritetext: "rewriteSelectedText",
  rewriteselectedtext: "rewriteSelectedText",
  updateselectedtext: "rewriteSelectedText",
  updatesettings: "updateSettings",
  style: "updateSettings",
  createcustompage: "createCustomPage",
  createpage: "createCustomPage",
  page: "createCustomPage",
  createdistributorpage: "createDistributorPage",
  addphrase: "addPhrase",
  addmedia: "addMedia",
  createcmsitem: "createCmsItem",
  cmsitem: "createCmsItem",
  phrase: "addPhrase",
  caption: "addPhrase",
  movesectionbefore: "moveSectionBefore",
  whitespace: "whitespace",
  relaxlayout: "whitespace",
  navigate: "navigate"
};

const SYSTEM_PROMPT = [
  "Je bent de AI-bewerker in het PlasmaMade Partner Center: een senior Codex-achtige product-, copy- en portalassistent voor beheerders.",
  "Gedrag: warm, scherp, proactief en concreet. Denk mee zoals een goede collega: vat niet eindeloos samen, stel alleen een korte vervolgvraag als een veilige actie echt niet kan.",
  "Doel: zet losse vragen om naar toepasbare portal-acties, CMS-concepten, partnerpagina's, copy, beeldwissels of navigatievoorstellen.",
  "Werk strikt met de meegegeven portalcontext, bestaande assets, productdata en merkregels. Verzin geen productspecificaties, awards, certificeringen, medische garanties of testresultaten.",
  "PlasmaMade-regels: schrijf PlasmaMade exact zo; primaire kleur #13A538; toon is fris, direct, premium en technisch betrouwbaar; B2B gebruikt bewijs en 'uw'; consumentencopy mag directer zijn.",
  "Toegestane bewezen claims alleen wanneer ze in context staan: min. 10 jaar / 9.000 uur, 97% recyclebaar, tot 98% reductie virussen en bacterien, geen afvoer naar buiten nodig, CE/UKCA/ROHS/RED voor GUC1223/GUC1323, Interflow-resultaten voor AirClean UltraFine.",
  "Als de gebruiker om copy vraagt: lever meteen bruikbare tekst in de juiste taal en zet waar logisch een addPhrase- of createCmsItem-actie klaar.",
  "Als de gebruiker om platformbouw vraagt: maak kleine, veilige acties die de beheerder kan toepassen. Nooit destructief, nooit adminrechten wijzigen, nooit externe scripts injecteren.",
  "Als een actie onzeker is: benoem dat kort in notes en maak liever een concept of navigatievoorstel dan een riskante wijziging.",
  "Geef uitsluitend JSON terug met reply (string), actions (array), notes (array). Geen markdown buiten JSON.",
  "Ondersteunde action types: addSection, addBanner, addCard, addUploadField, replaceImage, rewriteSelectedText, updateSettings, createCustomPage, createDistributorPage, addPhrase, createCmsItem, addMedia, moveSectionBefore, whitespace, navigate.",
  "Houd actions maximaal 6 items en maak labels menselijk leesbaar. De browser past acties pas toe na bevestiging van de beheerder.",
  process.env.PM_AI_EXTRA_PROMPT || ""
].filter(Boolean).join("\n");

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    notes: { type: "array", items: { type: "string" } },
    actions: {
      type: "array",
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: true,
        properties: {
          type: { type: "string" },
          label: { type: "string" },
          title: { type: "string" },
          kicker: { type: "string" },
          body: { type: "string" },
          text: { type: "string" },
          intro: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          src: { type: "string" },
          alt: { type: "string" },
          ctaLabel: { type: "string" },
          ctaHref: { type: "string" },
          href: { type: "string" },
          selector: { type: "string" },
          collection: { type: "string" },
          category: { type: "string" },
          product: { type: "string" },
          audience: { type: "string" },
          status: { type: "string" },
          lang: { type: "string" },
          icon: { type: "string" },
          className: { type: "string" },
          useUploadedImage: { type: "boolean" },
          active: { type: "boolean" },
          green: { type: "string" },
          radius: { type: "number" },
          spacing: { type: "string" },
          maxWidth: { type: "string" },
          padding: { type: "string" },
          groups: { type: "array", items: { type: "string" } },
          blocks: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
              properties: {
                title: { type: "string" },
                text: { type: "string" },
                body: { type: "string" }
              }
            }
          },
          patch: { type: "object", additionalProperties: true },
          item: { type: "object", additionalProperties: true }
        }
      }
    }
  },
  required: ["reply", "actions"]
};

function clampText(value, max) {
  const text = String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  if (!max || text.length <= max) return text;
  return text.slice(0, max - 1).trim() + "...";
}

function truncateDeep(value, maxStringLength, depth) {
  if (value == null || depth > 5) return value == null ? value : null;
  if (typeof value === "string") return clampText(value, maxStringLength || 1600);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.slice(0, 12).map((item) => truncateDeep(item, maxStringLength, depth + 1));
  if (typeof value === "object") {
    const out = {};
    Object.keys(value).slice(0, 40).forEach((key) => {
      out[key] = truncateDeep(value[key], maxStringLength, depth + 1);
    });
    return out;
  }
  return null;
}

function normalizeActionType(type) {
  const raw = String(type || "").trim();
  if (ACTION_TYPES.has(raw)) return raw;
  const compact = raw.replace(/[\s_-]+/g, "").toLowerCase();
  return ACTION_ALIASES[compact] || raw;
}

function cleanUrl(value, allowDataImage) {
  const text = clampText(value, allowDataImage ? 4000 : 900);
  if (!text) return "";
  if (allowDataImage && /^data:image\/[a-z0-9.+-]+;base64,/i.test(text)) return text;
  if (/^(javascript|vbscript|data):/i.test(text)) return "";
  if (/^[a-z][a-z0-9.+-]*:/i.test(text) && !/^(https?:|mailto:)/i.test(text)) return "";
  return text;
}

function sanitizeAction(action) {
  if (!action || typeof action !== "object") return null;
  const next = truncateDeep(action, 1800, 0) || {};
  next.type = normalizeActionType(next.type || next.action || next.kind);
  if (!ACTION_TYPES.has(next.type)) return null;
  next.label = clampText(next.label || next.title || next.text || next.type, 220);
  [
    "title", "kicker", "body", "text", "intro", "description", "alt",
    "category", "product", "audience", "status", "lang", "icon", "className",
    "collection", "selector", "maxWidth", "padding", "spacing"
  ].forEach((key) => {
    if (next[key] != null) next[key] = clampText(next[key], key === "body" || key === "text" || key === "description" ? 1600 : 260);
  });
  ["href", "ctaHref", "image", "src", "url"].forEach((key) => {
    if (next[key] != null) next[key] = cleanUrl(next[key], key === "image" || key === "src" || key === "url");
  });
  if (Array.isArray(next.groups)) next.groups = next.groups.slice(0, 8).map((g) => clampText(g, 80)).filter(Boolean);
  if (Array.isArray(next.blocks)) {
    next.blocks = next.blocks.slice(0, 8).map((block) => ({
      title: clampText(block && block.title, 160),
      text: clampText((block && (block.text || block.body)) || "", 1000)
    })).filter((block) => block.title || block.text);
  }
  if (next.radius != null) {
    const radius = Number(next.radius);
    next.radius = Number.isFinite(radius) ? Math.max(0, Math.min(30, radius)) : undefined;
  }
  return next;
}

function sanitizeResult(raw) {
  let result = raw && typeof raw === "object" ? raw : { reply: String(raw || ""), actions: [] };
  const actions = Array.isArray(result.actions) ? result.actions : [];
  const notes = Array.isArray(result.notes) ? result.notes : [];
  return {
    reply: clampText(result.reply || result.message || "Ik heb een voorstel klaargezet.", 2400),
    actions: actions.map(sanitizeAction).filter(Boolean).slice(0, 8),
    notes: notes.map((note) => clampText(note, 320)).filter(Boolean).slice(0, 8),
    source: "provider"
  };
}

function sendJson(req, res, status, body, setCors) {
  if (typeof setCors === "function") {
    setCors(req, res);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-pm-token,x-pm-actor");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  }
  if (status === 204) {
    res.writeHead(204);
    res.end();
    return;
  }
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
      if (size > MAX_BODY) {
        reject(new Error("Request body is te groot."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function safeJson(text, fallback) {
  try { return JSON.parse(text); } catch (err) { return fallback; }
}

function responseText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const out = [];
  (data.output || []).forEach((item) => {
    (item.content || []).forEach((part) => {
      if (part && typeof part.text === "string") out.push(part.text);
    });
  });
  return out.join("\n").trim();
}

function compactPayload(payload) {
  const context = truncateDeep(payload.context || {}, 2200, 0);
  const history = Array.isArray(payload.history) ? payload.history.slice(-12) : [];
  return [
    "Portalcontext JSON:",
    JSON.stringify(context).slice(0, MAX_CONTEXT_CHARS),
    "",
    "Gesprek JSON:",
    JSON.stringify(history.map((m) => ({ role: m.role, content: clampText(m.content, 1800) }))).slice(0, MAX_HISTORY_CHARS),
    "",
    "Opdracht:",
    clampText(payload.prompt || "", 7000),
    "",
    "Antwoord als JSON volgens het schema. Maak acties klein, veilig en direct toepasbaar."
  ].join("\n");
}

function hashIdentifier(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return undefined;
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 64);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs || OPENAI_TIMEOUT_MS);
  try {
    return await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAI(payload, auth) {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    const err = new Error("OPENAI_API_KEY ontbreekt op de server.");
    err.status = 501;
    throw err;
  }
  const content = [{ type: "input_text", text: compactPayload(payload) }];
  const upload = payload.uploaded || null;
  if (upload && upload.type === "image" && /^data:image\//.test(upload.dataUrl || "")) {
    content.push({ type: "input_image", image_url: String(upload.dataUrl).slice(0, 750000), detail: "auto" });
  }

  const requestBody = {
    model: process.env.OPENAI_MODEL || OPENAI_MODEL,
    store: false,
    input: [
      { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
      { role: "user", content }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "pm_ai_editor_response",
        schema: RESPONSE_SCHEMA,
        strict: false
      }
    }
  };
  if (OPENAI_REASONING_EFFORT) requestBody.reasoning = { effort: OPENAI_REASONING_EFFORT };
  const safetyIdentifier = hashIdentifier(auth && auth.email);
  if (safetyIdentifier) requestBody.safety_identifier = safetyIdentifier;

  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetchWithTimeout(OPENAI_BASE_URL + "/responses", {
      method: "POST",
      headers: {
        "authorization": "Bearer " + apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(requestBody)
    }, OPENAI_TIMEOUT_MS);

    const text = await response.text();
    const data = safeJson(text, null);
    if (response.ok) {
      const raw = responseText(data || {});
      const parsed = safeJson(raw, null);
      return sanitizeResult(parsed || { reply: raw || "Ik heb een antwoord ontvangen, maar geen geldige actie-JSON.", actions: [], notes: ["Ongeldige AI JSON"] });
    }
    const msg = data && data.error && data.error.message ? data.error.message : text.slice(0, 500);
    lastError = new Error(msg || ("OpenAI HTTP " + response.status));
    lastError.status = response.status;
    if (![408, 409, 429, 500, 502, 503, 504].includes(response.status) || attempt > 0) break;
    await delay(700);
  }
  throw lastError || new Error("AI-aanroep mislukt.");
}

function createAiCoderHandler(options) {
  options = options || {};
  const requireAdmin = !!options.requireAdmin;
  const setCors = options.setCors;
  const authorize = typeof options.authorize === "function" ? options.authorize : async function () {
    return { ok: true, auth: { email: "" } };
  };

  return async function handleAiCoder(req, res) {
    if (req.method === "OPTIONS") {
      sendJson(req, res, 204, {}, setCors);
      return;
    }
    if (req.method !== "POST") {
      sendJson(req, res, 405, { error: "Alleen POST is toegestaan.", reply: "Deze AI-route accepteert alleen POST-verzoeken.", actions: [] }, setCors);
      return;
    }
    try {
      const authResult = await authorize(req);
      if (requireAdmin && (!authResult || !authResult.ok)) {
        sendJson(req, res, authResult && authResult.status ? authResult.status : 403, {
          error: authResult && authResult.error ? authResult.error : "admin_required",
          reply: "De AI-bewerker is alleen beschikbaar voor beheerders.",
          actions: []
        }, setCors);
        return;
      }
      const payload = safeJson(await readBody(req), {});
      const result = await callOpenAI(payload || {}, (authResult && authResult.auth) || {});
      sendJson(req, res, 200, result, setCors);
    } catch (err) {
      const status = err && err.status ? err.status : 500;
      const missingKey = status === 501;
      sendJson(req, res, status, {
        error: err && err.message ? err.message : "AI-aanroep mislukt.",
        reply: missingKey
          ? "De AI-server draait, maar er is nog geen server-side OpenAI API-key ingesteld."
          : "De AI-aanroep is mislukt. De portal kan lokaal nog steeds veilige voorstellen maken.",
        actions: []
      }, setCors);
    }
  };
}

module.exports = {
  createAiCoderHandler,
  sanitizeResult
};
