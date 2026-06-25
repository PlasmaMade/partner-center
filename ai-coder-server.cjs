#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");
const { createAiCoderHandler } = require("./server/ai-coder-handler.cjs");

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8103);

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

const handleAiCoder = createAiCoderHandler({ requireAdmin: false });

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
  if (!process.env.OPENAI_API_KEY) console.log("OPENAI_API_KEY ontbreekt; de frontend gebruikt dan lokale fallback-acties.");
});
