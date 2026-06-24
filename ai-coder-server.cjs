#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8103);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const MAX_BODY = 8 * 1024 * 1024;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".cjs": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2"
};

const SYSTEM_PROMPT = [
  "Je bent de AI-bewerker van het PlasmaMade Partner Center.",
  "Gedraag je als een productieve ChatGPT-achtige editor: denk zelf mee, vul ontbrekende details verstandig in en lever toepasbare portal-acties.",
  "Werk strikt binnen de meegegeven portalcontext, merkregels en bestaande assets.",
  "Maak geen medische garanties of claims die niet uit de context blijken.",
  "Gebruik professionele Nederlandse B2B-taal, tenzij de gebruiker expliciet een andere taal vraagt.",
  "Geef altijd JSON terug met: reply (string), actions (array), notes (array optioneel).",
  "Ondersteunde action types: addSection, addBanner, addCard, addUploadField, replaceImage, rewriteSelectedText, updateSettings, createCustomPage, createDistributorPage, addPhrase, createCmsItem, addMedia, moveSectionBefore, whitespace, navigate.",
  "Houd acties concreet en veilig. De browser voert acties pas uit na bevestiging van de beheerder."
].join("\n");

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

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", chunk => {
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
  (data.output || []).forEach(item => {
    (item.content || []).forEach(part => {
      if (part && typeof part.text === "string") out.push(part.text);
    });
  });
  return out.join("\n").trim();
}

function compactPayload(payload) {
  const context = payload.context || {};
  return [
    "Portalcontext JSON:",
    JSON.stringify(context).slice(0, 60000),
    "",
    "Gesprek:",
    JSON.stringify((payload.history || []).slice(-10)).slice(0, 18000),
    "",
    "Opdracht:",
    String(payload.prompt || "").slice(0, 6000)
  ].join("\n");
}

async function callOpenAI(payload) {
  const content = [{ type: "input_text", text: compactPayload(payload) }];
  const upload = payload.uploaded || null;
  if (upload && upload.type === "image" && /^data:image\//.test(upload.dataUrl || "")) {
    content.push({ type: "input_image", image_url: upload.dataUrl, detail: "auto" });
  }

  const requestBody = {
    model: OPENAI_MODEL,
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

  const response = await fetch(OPENAI_BASE_URL + "/responses", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  const text = await response.text();
  const data = safeJson(text, null);
  if (!response.ok) {
    const msg = data && data.error && data.error.message ? data.error.message : text.slice(0, 400);
    throw new Error(msg || ("OpenAI HTTP " + response.status));
  }
  const raw = responseText(data || {});
  const parsed = safeJson(raw, null);
  if (!parsed) {
    return { reply: raw || "Ik heb een antwoord ontvangen, maar geen geldige actie-JSON.", actions: [], notes: ["Ongeldige AI JSON"] };
  }
  parsed.source = "provider";
  return parsed;
}

async function handleAiCoder(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Alleen POST is toegestaan." });
    return;
  }
  if (!OPENAI_API_KEY) {
    sendJson(res, 501, {
      error: "OPENAI_API_KEY ontbreekt op de server.",
      reply: "De AI-server draait, maar er is nog geen server-side OpenAI API-key ingesteld.",
      actions: []
    });
    return;
  }
  try {
    const payload = safeJson(await readBody(req), {});
    const result = await callOpenAI(payload || {});
    sendJson(res, 200, result);
  } catch (err) {
    sendJson(res, 500, { error: err && err.message ? err.message : "AI-aanroep mislukt.", reply: "De AI-aanroep is mislukt.", actions: [] });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  const target = path.resolve(ROOT, "." + pathname);
  if (!target.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(target).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if ((req.url || "").split("?")[0] === "/api/ai-coder") {
    handleAiCoder(req, res);
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("PlasmaMade Partner Center + AI Coder: http://127.0.0.1:" + PORT + "/");
  console.log("AI endpoint: http://127.0.0.1:" + PORT + "/api/ai-coder");
  if (!OPENAI_API_KEY) console.log("OPENAI_API_KEY ontbreekt; de frontend gebruikt dan lokale fallback-acties.");
});
