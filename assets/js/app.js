/* ============================================================
   PlasmaMade Partner Center — App shell & runtime
   - Injecteert sidebar / topbar / footer op elke pagina
   - Login-guard (GitHub Pages/localStorage + optionele externe sync)
   - Globale zoekfunctie over alle content (PM_DATA), meertalig
   - Taalmenu (NL/EN, via PM_I18N in assets/js/i18n.js)
   - Iconen, toasts, dialogen, favorieten, recent bekeken
   ============================================================ */
(function () {
  "use strict";

  var t = window.PM_t;

  /* ---------------- ICON LIBRARY (Lucide-style) ---------------- */
  const I = {
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
    box:'<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/>',
    megaphone:'<path d="M3 11l15-6v14L3 13zM3 11v2a4 4 0 0 0 4 4M11 17.5l1 3.5"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    palette:'<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.7 0 2.5-1.2 2.5-2.3 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2H17c2.8 0 5-2.2 5-5 0-4.4-4.5-8-10-8z"/>',
    newspaper:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9a1 1 0 0 1 1-1h1"/><path d="M10 6h8M10 10h8M10 14h4"/>',
    lifebuoy:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M4.9 4.9l4.6 4.6M14.5 14.5l4.6 4.6M14.5 9.5l4.6-4.6M9.5 14.5l-4.6 4.6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    chevronRight:'<path d="M9 18l6-6-6-6"/>',
    arrowRight:'<path d="M5 12h14M13 5l7 7-7 7"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    check:'<path d="M20 6L9 17l-5-5"/>',
    copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
    filter:'<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
    x:'<path d="M18 6L6 18M6 6l12 12"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7L22 6"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    star:'<path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2 2 9.4l7-.9z"/>',
    shieldCheck:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    layers:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
    type:'<path d="M4 7V5h16v2M9 5v14M9 19h6"/>',
    move:'<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
    save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff:'<path d="M17.9 17.9A11 11 0 0 1 12 20c-7 0-11-8-11-8a20 20 0 0 1 5.1-5.9M9.9 4.2A11 11 0 0 1 12 4c7 0 11 8 11 8a20 20 0 0 1-3 4.4M1 1l22 22"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    sparkles:'<path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2 10.2 11.4 5.4 9.6 10.2 7.8z"/><path d="M5 3v3M19 17v3M3.5 4.5h3M17.5 18.5h3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    print:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    paperclip:'<path d="M21.4 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.4 17.4a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    alert:'<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    /* knowledge / pollutant icons */
    wind:'<path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.7 7.8A2.5 2.5 0 1 1 19.5 12H2"/>',
    zap:'<path d="M13 2L3 14h7l-1 8 10-12h-7z"/>',
    refresh:'<path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/>',
    cloud:'<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.6A4 4 0 0 0 6.5 19z"/>',
    flower:'<circle cx="12" cy="12" r="3"/><path d="M12 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM12 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM15 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zM9 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/>',
    nose:'<path d="M6 21v-3c0-1 .5-2 1.2-2.7M18 21v-3c0-3-2-4-2-7a4 4 0 0 0-8 0M9 21h6"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    leaf:'<path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-9 16zM4 21c3-5 7-7 12-8"/>',
    battery:'<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M6 11v2M10 11v2"/>',
    lab:'<path d="M9 3h6M10 3v6l-5.5 9A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9V3M7 14h10"/>',
    chart:'<path d="M3 3v18h18M7 16l4-5 3 3 5-7"/>',
    badgeCheck:'<path d="M12 2l2.4 1.8 3-.3 1.2 2.7 2.7 1.2-.3 3L23 14l-1.8 2.4.3 3-2.7 1.2-1.2 2.7-3-.3L12 26l-2.4-1.8-3 .3-1.2-2.7-2.7-1.2.3-3L1 14l1.8-2.4-.3-3 2.7-1.2L6.4 4.5l3 .3z" transform="scale(0.82) translate(2.3 1)"/><path d="M9 12l2 2 4-4"/>',
    building:'<rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    smartphone:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    droplet:'<path d="M12 2.7l5.6 6.3a7.5 7.5 0 1 1-11.2 0z"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.5 12.5L21 2M16 7l3 3M14 9l2.5 2.5"/>',
    camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    idCard:'<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="10" r="2.2"/><path d="M5.5 16c.6-1.6 2-2.3 3.5-2.3s2.9.7 3.5 2.3M15 9h4M15 13h4"/>',
    bellRing:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0M2 8a6 6 0 0 1 2-3M22 8a6 6 0 0 0-2-3"/>',
    sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    logIn:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>'
  };

  function icon(name, cls) {
    const p = I[name] || I.box;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '>' + p + '</svg>';
  }
  window.PM_ICON = icon;

  /* ---------------- HELPERS ---------------- */
  window.PM_escape = function (s) { const d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; };
  var esc = window.PM_escape;

  window.PM_param = function (k) {
    try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; }
  };
  window.PM_copy = function (text, cb) {
    const done = () => { if (cb) cb(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallback());
    } else fallback();
    function fallback() {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      ta.remove(); done();
    }
  };
  /* Compat: gestructureerde datum voor nieuws-/dashboardkaarten */
  window.PM_date = function (iso) {
    const d = new Date(iso + "T00:00:00");
    return { d: d.getDate(), m: window.PM_fmtMonth(iso).replace(".", ""), y: d.getFullYear(), full: window.PM_fmtDate(iso) };
  };

  function readStore(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function isQuotaError(e) {
    return !!(e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22 || e.code === 1014));
  }
  function compactStoredHistoryForRetry() {
    var changed = false;
    try {
      var rows = JSON.parse(localStorage.getItem("pm_version_history") || "[]");
      if (Array.isArray(rows) && rows.length) {
        var compact = rows.slice(0, 25).map(function (row) {
          return {
            id: row.id,
            type: row.type,
            subject: row.subject,
            meta: Object.assign({}, row.meta || {}, { compacted: true }),
            actor: row.actor,
            createdAt: row.createdAt,
            before: null,
            after: null
          };
        });
        localStorage.setItem("pm_version_history", JSON.stringify(compact));
        changed = true;
      }
    } catch (e) {}
    try {
      var archives = JSON.parse(localStorage.getItem("pm_portal_archives") || "[]");
      if (Array.isArray(archives) && archives.length) {
        localStorage.setItem("pm_portal_archives", JSON.stringify(archives.slice(0, 1).map(function (row) {
          return Object.assign({}, row, { values: {}, compacted: true });
        })));
        changed = true;
      }
    } catch (e) {}
    return changed;
  }
  function writeStore(key, val) {
    var raw;
    try {
      raw = JSON.stringify(val);
      localStorage.setItem(key, raw);
      if (window.PM_SYNC && PM_SYNC.noteLocalChange) PM_SYNC.noteLocalChange(key);
      if (window.PM_SYNC && PM_SYNC.shouldPush && PM_SYNC.shouldPush(key)) PM_SYNC.schedule(key);
      window.PM_STORE_LAST_ERROR = null;
      return true;
    } catch (e) {
      if (raw && isQuotaError(e) && compactStoredHistoryForRetry()) {
        try {
          localStorage.setItem(key, raw);
          if (window.PM_SYNC && PM_SYNC.noteLocalChange) PM_SYNC.noteLocalChange(key);
          if (window.PM_SYNC && PM_SYNC.shouldPush && PM_SYNC.shouldPush(key)) PM_SYNC.schedule(key);
          window.PM_STORE_LAST_ERROR = null;
          return true;
        } catch (retryErr) { e = retryErr; }
      }
      window.PM_STORE_LAST_ERROR = { key: key, quota: isQuotaError(e), message: String((e && e.message) || e || "storage_failed") };
      if (window.console) console.warn("PlasmaMade opslag mislukt", key, e);
      return false;
    }
  }
  function storageFailedMessage(key) {
    var err = window.PM_STORE_LAST_ERROR || {};
    return err.quota
      ? "Opslaan lukt niet: browseropslag is vol. Ik heb oude versies opgeschoond; probeer nogmaals op te slaan."
      : "Opslaan lukt niet. De wijziging is niet permanent opgeslagen.";
  }
  function toastStorageFailure(key) {
    if (window.PM_toast) PM_toast(storageFailedMessage(key));
  }
  window.PM_STORE = { read: readStore, write: writeStore, lastError: function () { return window.PM_STORE_LAST_ERROR || null; } };

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
  const SYNC_DIRTY_KEY = "pm_sync_dirty_keys";
  const PORTAL_BUILD_VERSION = "20260630-plasmamade-site-style-1";
  const PORTAL_BUILD_KEY = "pm_portal_build_version";
  const PORTAL_ARCHIVE_KEY = "pm_portal_archives";
  const PORTAL_LAST_RESET_KEY = "pm_portal_last_reset";
  const PRESENTATION_RESET_KEYS = [
    "pm_cms_overrides",
    "pm_page_edits",
    "pm_portal_settings",
    "pm_standard_phrases",
    "pm_partner_groups",
    "pm_media_library",
    "pm_custom_pages"
  ];
  function isCentralKey(key) { return CENTRAL_STATE_KEYS.indexOf(key) > -1; }
  function syncEndpoint() {
    try { return String(window.PM_REMOTE_SYNC_ENDPOINT || "").trim(); } catch (e) { return ""; }
  }
  function isSyncOnline() { return !!syncEndpoint() && /^https?:$/i.test(location.protocol) && typeof fetch === "function"; }
  function isLocalDevHost() { return /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname || ""); }
  function requiresRemoteSync() { return /^https?:$/i.test(location.protocol || "") && !isLocalDevHost(); }
  function isGitHubPagesHost() { return /github\.io$/i.test(location.hostname || ""); }
  function portalArchivePresentation(keys, reason, fromVersion) {
    try {
      var values = {};
      (keys || []).forEach(function (key) {
        var raw = localStorage.getItem(key);
        if (raw != null) values[key] = raw;
      });
      if (!Object.keys(values).length) return null;
      var rows = readStore(PORTAL_ARCHIVE_KEY, []);
      var row = {
        id: "portal_" + Date.now().toString(36),
        reason: reason || "presentation_reset",
        fromVersion: fromVersion || "",
        toVersion: PORTAL_BUILD_VERSION,
        createdAt: new Date().toISOString(),
        keys: Object.keys(values),
        values: values
      };
      rows.unshift(row);
      localStorage.setItem(PORTAL_ARCHIVE_KEY, JSON.stringify(rows.slice(0, 5)));
      return row;
    } catch (e) { return null; }
  }
  function portalResetPresentation(reason) {
    try {
      var keys = PRESENTATION_RESET_KEYS.filter(function (key) { return localStorage.getItem(key) != null; });
      if (keys.length) portalArchivePresentation(keys, reason || "manual_reset", localStorage.getItem(PORTAL_BUILD_KEY) || "");
      keys.forEach(function (key) { localStorage.removeItem(key); });
      localStorage.removeItem(SYNC_DIRTY_KEY);
      localStorage.setItem(PORTAL_LAST_RESET_KEY, JSON.stringify({
        from: localStorage.getItem(PORTAL_BUILD_KEY) || "",
        to: PORTAL_BUILD_VERSION,
        at: new Date().toISOString(),
        resetKeys: keys
      }));
      localStorage.setItem(PORTAL_BUILD_KEY, PORTAL_BUILD_VERSION);
      return keys;
    } catch (e) { return []; }
  }
  function migratePortalBuild() {
    try {
      var previous = localStorage.getItem(PORTAL_BUILD_KEY) || "";
      if (previous === PORTAL_BUILD_VERSION) return;
      if (previous) {
        localStorage.setItem(PORTAL_LAST_RESET_KEY, JSON.stringify({
          from: previous,
          to: PORTAL_BUILD_VERSION,
          at: new Date().toISOString(),
          resetKeys: [],
          note: "build_migration_preserved_local_content"
        }));
      }
      localStorage.setItem(PORTAL_BUILD_KEY, PORTAL_BUILD_VERSION);
    } catch (e) {}
  }
  migratePortalBuild();
  window.PM_PORTAL_BUILD = {
    version: PORTAL_BUILD_VERSION,
    resetKeys: PRESENTATION_RESET_KEYS.slice(),
    lastReset: function () { return readStore(PORTAL_LAST_RESET_KEY, null); },
    archives: function () { return readStore(PORTAL_ARCHIVE_KEY, []); },
    resetPresentation: function () { var keys = portalResetPresentation("admin_manual_reset"); if (location && location.reload) location.reload(); return keys; }
  };
  function syncActor() {
    try {
      var u = (typeof getUser === "function") ? getUser() : null;
      return (u && u.email) || "";
    } catch (e) { return ""; }
  }
  function syncAuthHeaders(extra) {
    var headers = Object.assign({}, extra || {});
    try {
      var u = (typeof getUser === "function") ? getUser() : null;
      if (u && u.syncToken) headers["x-pm-token"] = u.syncToken;
      if (u && u.email) headers["x-pm-actor"] = u.email;
    } catch (e) {}
    return headers;
  }
  function syncIsAdmin() {
    try {
      var u = (typeof getUser === "function") ? getUser() : null;
      return !!(u && window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(u));
    } catch (e) { return false; }
  }
  const LOCAL_MERGE_STATE_KEYS = ["pm_page_edits", "pm_cms_overrides"];
  const AUTHORITATIVE_PULL_KEYS = ["pm_account_requests", "pm_admin_grants", "pm_partners", "pm_audit_log", "pm_admin_mail_log"];
  const DESIGN_REVIEW_STATES = ["in_review", "changes_requested", "approved", "rejected", "downloaded"];
  const DESIGN_REVIEW_FIELDS = ["status", "feedback", "feedbackAt", "reviewedAt", "approvedAt", "rejectedAt", "downloadedAt", "downloadedKind", "submittedAt"];
  function isPlainObject(value) {
    return !!(value && typeof value === "object" && !Array.isArray(value));
  }
  function isEmptyObject(value) {
    return isPlainObject(value) && Object.keys(value).length === 0;
  }
  function mergePlainState(remote, local) {
    var out = Object.assign({}, isPlainObject(remote) ? remote : {});
    if (!isPlainObject(local)) return out;
    Object.keys(local).forEach(function (key) {
      if (isPlainObject(out[key]) && isPlainObject(local[key])) out[key] = mergePlainState(out[key], local[key]);
      else out[key] = local[key];
    });
    return out;
  }
  function designById(rows) {
    var map = {};
    (Array.isArray(rows) ? rows : []).forEach(function (row) {
      if (row && row.id) map[String(row.id)] = row;
    });
    return map;
  }
  function dateValue(value) {
    var n = Date.parse(value || "");
    return Number.isFinite(n) ? n : 0;
  }
  function designReviewTime(row) {
    if (!row) return 0;
    return Math.max.apply(Math, DESIGN_REVIEW_FIELDS.map(function (field) { return dateValue(row[field]); }).concat([
      DESIGN_REVIEW_STATES.indexOf(row.status || "") > -1 ? dateValue(row.updated || row.updatedAt) : 0
    ]));
  }
  function designContentTime(row) {
    if (!row) return 0;
    return dateValue(row.contentUpdatedAt || row.updatedAt || row.updated || row.createdAt);
  }
  function copyDesignReviewFields(target, source) {
    if (!target || !source) return target;
    DESIGN_REVIEW_FIELDS.forEach(function (field) {
      if (Object.prototype.hasOwnProperty.call(source, field)) target[field] = source[field];
    });
    return target;
  }
  function mergeDesignRow(remote, local, preferLocalContent) {
    if (!local) return remote;
    if (!remote) return local;
    var remoteHasNewerContent = designContentTime(remote) > designContentTime(local);
    var out = preferLocalContent || !remoteHasNewerContent
      ? Object.assign({}, remote, local)
      : Object.assign({}, local, remote);
    var remoteReview = designReviewTime(remote);
    var localReview = designReviewTime(local);
    copyDesignReviewFields(out, remoteReview >= localReview ? remote : local);
    return out;
  }
  function mergeDesignRows(remoteRows, localRows, preferLocalContent) {
    var out = [];
    var seen = {};
    var localMap = designById(localRows);
    (Array.isArray(remoteRows) ? remoteRows : []).forEach(function (remote) {
      if (!remote || !remote.id) return;
      var id = String(remote.id);
      var local = localMap[id] || null;
      seen[id] = true;
      out.push(mergeDesignRow(remote, local, !!preferLocalContent));
    });
    (Array.isArray(localRows) ? localRows : []).forEach(function (local) {
      if (!local || !local.id || seen[String(local.id)]) return;
      out.push(local);
    });
    return out.sort(function (a, b) {
      return String(b.updated || b.updatedAt || b.feedbackAt || b.approvedAt || b.submittedAt || "").localeCompare(String(a.updated || a.updatedAt || a.feedbackAt || a.approvedAt || a.submittedAt || ""));
    });
  }
  function designReviewUpdates(beforeRows, afterRows) {
    var user = (typeof getUser === "function") ? getUser() : null;
    var userEmail = normEmail(user && user.email);
    var before = designById(beforeRows);
    return (Array.isArray(afterRows) ? afterRows : []).filter(function (row) {
      if (!row || !row.id) return false;
      if (userEmail && normEmail(row.ownerEmail) && normEmail(row.ownerEmail) !== userEmail) return false;
      var previous = before[String(row.id)] || {};
      var status = row.status || "draft";
      if (DESIGN_REVIEW_STATES.indexOf(status) === -1) return false;
      return DESIGN_REVIEW_FIELDS.some(function (field) {
        return String(previous[field] || "") !== String(row[field] || "");
      });
    }).map(function (row) {
      return {
        id: row.id,
        name: row.name || "Ontwerp",
        status: row.status || "draft",
        feedback: row.feedback || ""
      };
    });
  }
  function mergedIncomingStateValue(key, incoming, dirtyKeys, source) {
    if (key === "pm_designs" && (source === "pull" || source === "login")) {
      return mergeDesignRows(incoming, readStore(key, []), (dirtyKeys || []).indexOf(key) > -1);
    }
    if (LOCAL_MERGE_STATE_KEYS.indexOf(key) === -1) return incoming;
    var localRaw = null;
    try { localRaw = localStorage.getItem(key); } catch (e) {}
    if (localRaw == null) return incoming;
    var local = readStore(key, null);
    var localHasContent = isPlainObject(local) && Object.keys(local).length > 0;
    var incomingIsObject = isPlainObject(incoming);
    var incomingHasContent = incomingIsObject && Object.keys(incoming).length > 0;
    if (!localHasContent) return incoming;
    if ((dirtyKeys || []).indexOf(key) > -1 && incomingIsObject) return mergePlainState(incoming, local);
    if (source === "pull" && (!incomingHasContent || isEmptyObject(incoming))) return local;
    if (source === "pull" && key === "pm_page_edits" && incomingIsObject) return mergePlainState(incoming, local);
    return incoming;
  }
  function withTimeout(ms) {
    if (!window.AbortController) return {};
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, ms || 4500);
    return { signal: controller.signal, done: function () { clearTimeout(timer); } };
  }
  window.PM_SYNC = {
    endpoint: "",
    getEndpoint: syncEndpoint,
    pending: {},
    muted: false,
    lastPullAt: null,
    lastPushAt: null,
    remoteUpdatedAt: null,
    timer: null,
    interval: null,
    online: isSyncOnline,
    isLocalDev: isLocalDevHost,
    requiresRemote: requiresRemoteSync,
    configured: function () { return !!syncEndpoint(); },
    lastError: "",
    dirtyKeys: function () {
      try {
        var rows = JSON.parse(localStorage.getItem(SYNC_DIRTY_KEY) || "[]");
        return Array.isArray(rows) ? rows.filter(isCentralKey) : [];
      } catch (e) { return []; }
    },
    saveDirtyKeys: function (keys) {
      try { localStorage.setItem(SYNC_DIRTY_KEY, JSON.stringify(Array.from(new Set((keys || []).filter(isCentralKey))))); } catch (e) {}
    },
    markDirty: function (key) {
      if (!isCentralKey(key)) return;
      var keys = this.dirtyKeys();
      if (keys.indexOf(key) === -1) keys.push(key);
      this.saveDirtyKeys(keys);
    },
    clearDirty: function (keys) {
      keys = (keys || []).filter(isCentralKey);
      if (!keys.length) return;
      var remove = new Set(keys);
      this.saveDirtyKeys(this.dirtyKeys().filter(function (key) { return !remove.has(key); }));
    },
    noteLocalChange: function (key) {
      if (this.muted || !isCentralKey(key)) return;
      this.markDirty(key);
    },
    shouldPush: function (key) {
      if (this.muted || !isCentralKey(key) || !this.online()) return false;
      return syncIsAdmin() || PUBLIC_SYNC_KEYS.indexOf(key) > -1;
    },
    applyState: function (state, opts) {
      if (!state || typeof state !== "object") return false;
      opts = opts || {};
      var preserveDirty = opts.source !== "push" && opts.source !== "request";
      var dirty = preserveDirty ? this.dirtyKeys() : [];
      var overwrittenDirty = [];
      var designUpdates = [];
      this.muted = true;
      try {
        CENTRAL_STATE_KEYS.forEach(function (key) {
          if (!Object.prototype.hasOwnProperty.call(state, key)) return;
          var hasLocal = localStorage.getItem(key) != null;
          var authoritative = (opts.source === "pull" || opts.source === "login") && AUTHORITATIVE_PULL_KEYS.indexOf(key) > -1;
          var designReviewPull = key === "pm_designs" && (opts.source === "pull" || opts.source === "login");
          if (dirty.indexOf(key) > -1 && hasLocal && LOCAL_MERGE_STATE_KEYS.indexOf(key) === -1 && !authoritative && !designReviewPull) return;
          if (authoritative && dirty.indexOf(key) > -1) overwrittenDirty.push(key);
          var beforeDesigns = designReviewPull ? readStore(key, []) : null;
          var incoming = mergedIncomingStateValue(key, state[key], dirty, opts.source || "remote");
          if (designReviewPull) designUpdates = designUpdates.concat(designReviewUpdates(beforeDesigns, incoming));
          localStorage.setItem(key, JSON.stringify(incoming));
        });
      } catch (e) {}
      this.muted = false;
      if (overwrittenDirty.length) this.clearDirty(overwrittenDirty);
      if (window.PM_PORTAL_SETTINGS) PM_PORTAL_SETTINGS.apply();
      if (window.PM_CMS) PM_CMS.apply();
      if (window.PM_PAGE_EDITS && PM_PAGE_EDITS.apply) PM_PAGE_EDITS.apply();
      if (!opts.quiet && window.PM_rebuildShell) PM_rebuildShell();
      try { document.dispatchEvent(new CustomEvent("pm:state-sync", { detail: { source: opts.source || "remote", changed: !!opts.changed, designUpdates: designUpdates } })); } catch (e) {}
      return true;
    },
    snapshot: function (keys) {
      var out = {};
      (keys && keys.length ? keys : CENTRAL_STATE_KEYS).forEach(function (key) {
        if (!isCentralKey(key)) return;
        out[key] = readStore(key, null);
      });
      return out;
    },
    pull: async function (opts) {
      opts = opts || {};
      if (!this.online()) return false;
      var endpoint = this.getEndpoint ? this.getEndpoint() : this.endpoint;
      if (!endpoint) return false;
      var timeout = withTimeout(opts.timeout || 4500);
      try {
        var res = await fetch(endpoint, { cache: "no-store", headers: syncAuthHeaders(), signal: timeout.signal });
        if (!res.ok) {
          this.lastError = "pull_http_" + res.status;
          return false;
        }
        var data = await res.json();
        if (data && data.state) {
          var changed = !!(data.updatedAt && data.updatedAt !== this.remoteUpdatedAt);
          this.applyState(data.state, { quiet: !!opts.quiet, source: "pull", changed: changed });
          if (data.updatedAt) this.remoteUpdatedAt = data.updatedAt;
          this.lastPullAt = new Date().toISOString();
          this.lastError = "";
          return true;
        }
      } catch (e) {
        this.lastError = "pull_failed";
        return false;
      } finally {
        if (timeout.done) timeout.done();
      }
      return false;
    },
    push: async function (keys, opts) {
      opts = opts || {};
      if (!this.online()) return false;
      var endpoint = this.getEndpoint ? this.getEndpoint() : this.endpoint;
      if (!endpoint) return false;
      keys = (keys || []).filter(isCentralKey);
      if (!keys.length) return false;
      var timeout = withTimeout(opts.timeout || 5500);
      try {
        var request = {
          method: "POST",
          headers: syncAuthHeaders({ "content-type": "application/json", "x-pm-actor": syncActor() }),
          body: JSON.stringify({ action: "saveState", actor: syncActor(), baseUpdatedAt: this.remoteUpdatedAt || "", state: this.snapshot(keys) }),
          signal: timeout.signal
        };
        if (opts.keepalive) request.keepalive = true;
        var res = await fetch(endpoint, request);
        if (!res.ok) {
          this.lastError = "push_http_" + res.status;
          return false;
        }
        var data = await res.json();
        if (data && data.updatedAt) this.remoteUpdatedAt = data.updatedAt;
        this.clearDirty(keys);
        if (data && data.state) this.applyState(data.state, { quiet: true, source: "push" });
        this.lastPushAt = new Date().toISOString();
        this.lastError = "";
        return true;
      } catch (e) {
        this.lastError = "push_failed";
        return false;
      } finally {
        if (timeout.done) timeout.done();
      }
    },
    flushDirty: function (opts) {
      var self = this;
      var keys = this.dirtyKeys().filter(function (key) { return self.shouldPush(key); });
      if (!keys.length) return false;
      return this.push(keys, opts || {});
    },
    schedule: function (key) {
      if (!isCentralKey(key)) return;
      this.pending[key] = true;
      clearTimeout(this.timer);
      var self = this;
      this.timer = setTimeout(function () {
        var keys = Object.keys(self.pending);
        self.pending = {};
        self.push(keys);
      }, syncIsAdmin() ? 140 : 420);
    },
    adminFlush: function (opts) {
      if (!syncIsAdmin()) return Promise.resolve(false);
      clearTimeout(this.timer);
      this.pending = {};
      return Promise.resolve(this.flushDirty(opts || {}));
    },
    submitRequest: async function (payload) {
      if (!this.online()) return null;
      var endpoint = this.getEndpoint ? this.getEndpoint() : this.endpoint;
      if (!endpoint) return null;
      var timeout = withTimeout(6500);
      try {
        var res = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "accountRequest", request: payload || {} }),
          signal: timeout.signal
        });
        if (!res.ok) {
          this.lastError = "request_http_" + res.status;
          return null;
        }
        var data = await res.json();
        if (data && data.updatedAt) this.remoteUpdatedAt = data.updatedAt;
        if (data && data.state) this.applyState(data.state, { quiet: true, source: "request" });
        this.lastError = "";
        return data && data.request ? data.request : null;
      } catch (e) {
        this.lastError = "request_failed";
        return null;
      } finally {
        if (timeout.done) timeout.done();
      }
    },
    login: async function (email, password) {
      if (!this.online()) return null;
      var endpoint = this.getEndpoint ? this.getEndpoint() : this.endpoint;
      if (!endpoint) return null;
      var timeout = withTimeout(6500);
      try {
        var res = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "login", email: email, password: password }),
          signal: timeout.signal
        });
        if (!res.ok) {
          this.lastError = "login_http_" + res.status;
          return null;
        }
        var data = await res.json();
        if (data && data.updatedAt) this.remoteUpdatedAt = data.updatedAt;
        if (data && data.state) this.applyState(data.state, { quiet: true, source: "login" });
        if (data && Object.prototype.hasOwnProperty.call(data, "ok")) {
          data.remote = true;
          return data;
        }
      } catch (e) {
        this.lastError = "login_failed";
        return null;
      } finally {
        if (timeout.done) timeout.done();
      }
      return null;
    },
    adminMutation: async function (action, payload, opts) {
      opts = opts || {};
      if (!this.online()) return { ok: false, error: "sync_offline" };
      var endpoint = this.getEndpoint ? this.getEndpoint() : this.endpoint;
      if (!endpoint) return { ok: false, error: "sync_not_configured" };
      var timeout = withTimeout(opts.timeout || 6500);
      try {
        var res = await fetch(endpoint, {
          method: "POST",
          headers: syncAuthHeaders({ "content-type": "application/json", "x-pm-actor": syncActor() }),
          body: JSON.stringify(Object.assign({ action: action }, payload || {})),
          signal: timeout.signal
        });
        var data = null;
        try { data = await res.json(); } catch (jsonErr) {}
        if (!res.ok) {
          this.lastError = String(action || "mutation") + "_http_" + res.status;
          return Object.assign({ ok: false, error: this.lastError }, data || {});
        }
        if (data && data.updatedAt) this.remoteUpdatedAt = data.updatedAt;
        if (data && data.state) this.applyState(data.state, { quiet: true, source: "push" });
        this.clearDirty(CENTRAL_STATE_KEYS);
        this.lastPushAt = new Date().toISOString();
        this.lastError = "";
        return Object.assign({ ok: true }, data || {});
      } catch (e) {
        this.lastError = String(action || "mutation") + "_failed";
        return { ok: false, error: this.lastError };
      } finally {
        if (timeout.done) timeout.done();
      }
    },
    approveRequest: async function (requestId, email) {
      return this.adminMutation("approveAccountRequest", { requestId: requestId || "", email: email || "", approvalMailAt: new Date().toISOString() });
    },
    rejectRequest: async function (requestId, email, reason) {
      return this.adminMutation("rejectAccountRequest", { requestId: requestId || "", email: email || "", reason: reason || "" });
    },
    suspendRequest: async function (requestId, email, reason) {
      return this.adminMutation("suspendAccountRequest", { requestId: requestId || "", email: email || "", reason: reason || "" });
    },
    deleteRequest: async function (requestId, email) {
      return this.adminMutation("deleteAccountRequest", { requestId: requestId || "", email: email || "" });
    },
    upsertPartner: async function (partner) {
      return this.adminMutation("upsertPartner", { partner: partner || {} });
    },
    deletePartner: async function (email) {
      return this.adminMutation("deletePartner", { email: email || "" });
    },
    grantAdmin: async function (email, meta) {
      return this.adminMutation("grantAdmin", Object.assign({ email: email || "" }, meta || {}));
    },
    revokeAdmin: async function (email) {
      return this.adminMutation("revokeAdmin", { email: email || "" });
    },
    setDesignStatus: async function (designId, status, feedback) {
      return this.adminMutation("setDesignStatus", { designId: designId || "", status: status || "", feedback: feedback || "" });
    },
    deleteDesign: async function (designId) {
      return this.adminMutation("deleteDesign", { designId: designId || "" });
    },
    startAutoRefresh: function () {
      if (this.interval || !this.online()) return;
      var self = this;
      var run = function () {
        self.pull({ quiet: true, timeout: 3500 });
        self.flushDirty();
      };
      this.interval = setInterval(run, 5000);
      if (!window.__pmSyncFocusBound) {
        window.__pmSyncFocusBound = true;
        window.addEventListener("focus", run);
        document.addEventListener("visibilitychange", function () {
          if (!document.hidden) run();
        });
      }
    }
  };

  try {
    window.addEventListener("pagehide", function () {
      if (window.PM_SYNC && PM_SYNC.adminFlush) PM_SYNC.adminFlush({ keepalive: true, timeout: 2200 });
    });
  } catch (e) {}

  function normEmail(email) { return String(email || "").trim().toLowerCase(); }
  const BOOTSTRAP_ADMIN_ROWS = [
    {
      email: "bjonkeren@plasmamade.com",
      name: "Bjorn",
      firstName: "Bjorn",
      lastName: "",
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
  function bootstrapAdminForEmail(email) {
    var e = normEmail(email);
    return BOOTSTRAP_ADMIN_ROWS.find(function (admin) { return admin.email === e; }) || null;
  }
  function isLegacyBjornFallbackName(email, value) {
    return normEmail(email) === "bjonkeren@plasmamade.com" && /\bbjonkeren\b/i.test(String(value || "").trim());
  }
  function safeDisplayName(row, email, fallback) {
    row = row || {};
    email = email || row.email;
    var full = ((row.firstName || "") + " " + (row.lastName || "")).trim();
    var name = full || row.name || row.company || email || fallback || "Partner";
    if (isLegacyBjornFallbackName(email, name)) return "Bjorn";
    return name;
  }
  window.PM_displayName = safeDisplayName;
  function bootstrapDisplayName(existing, admin) {
    var existingName = existing && existing.name;
    if (existingName && !isLegacyBjornFallbackName(admin && admin.email, existingName)) return existingName;
    return admin.name;
  }
  function sanitizeBootstrapUserName(user) {
    if (user && isLegacyBjornFallbackName(user.email, user.name)) user.name = "Bjorn";
    return user;
  }
  function isBootstrapAdminEmailValue(email) { return !!bootstrapAdminForEmail(email); }
  function bootstrapAdminGrantRow(existing, admin) {
    admin = admin || bootstrapAdminForEmail(existing && existing.email) || BOOTSTRAP_ADMIN_ROWS[0];
    return Object.assign({}, existing || {}, {
      id: (existing && existing.id) || admin.grantId,
      email: admin.email,
      name: bootstrapDisplayName(existing, admin),
      source: "bootstrap_admin",
      grantedBy: (existing && existing.grantedBy) || "system",
      grantedAt: (existing && existing.grantedAt) || admin.createdAt
    });
  }
  function bootstrapAdminPartnerRow(existing, admin) {
    admin = admin || bootstrapAdminForEmail(existing && existing.email) || BOOTSTRAP_ADMIN_ROWS[0];
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
  function withBootstrapAdminGrant(rows) {
    var list = Array.isArray(rows) ? rows.slice() : [];
    BOOTSTRAP_ADMIN_ROWS.slice().reverse().forEach(function (admin) {
      var idx = list.findIndex(function (row) { return normEmail(row && row.email) === admin.email; });
      if (idx > -1) list[idx] = bootstrapAdminGrantRow(list[idx], admin);
      else list.unshift(bootstrapAdminGrantRow(null, admin));
    });
    return list.slice(0, 100);
  }
  function withBootstrapAdminPartner(rows) {
    var list = Array.isArray(rows) ? rows.slice() : [];
    BOOTSTRAP_ADMIN_ROWS.slice().reverse().forEach(function (admin) {
      var idx = list.findIndex(function (row) { return normEmail(row && row.email) === admin.email; });
      if (idx > -1) list[idx] = bootstrapAdminPartnerRow(list[idx], admin);
      else list.unshift(bootstrapAdminPartnerRow(null, admin));
    });
    return list.slice(0, 300);
  }
  function sameJson(a, b) {
    try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
  }
  function ensureBootstrapAdminState() {
    var grants = readStore(ADMIN_GRANTS_KEY, []);
    var nextGrants = withBootstrapAdminGrant(grants);
    if (!sameJson(grants, nextGrants)) writeStore(ADMIN_GRANTS_KEY, nextGrants);
    var partners = readStore(PARTNER_KEY, []);
    var nextPartners = withBootstrapAdminPartner(partners);
    if (!sameJson(partners, nextPartners)) writeStore(PARTNER_KEY, nextPartners);
  }
  function makeId(prefix) { return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6); }
  const ADMIN_GRANTS_KEY = "pm_admin_grants";
  window.PM_ADMINS = {
    list: function () { return withBootstrapAdminGrant(readStore(ADMIN_GRANTS_KEY, [])); },
    has: function (email) {
      var e = normEmail(email);
      if (!e) return false;
      if (isBootstrapAdminEmailValue(e)) return true;
      return this.list().some(function (a) { return normEmail(a.email) === e; });
    },
    grant: function (email, meta) {
      var e = normEmail(email);
      if (!e) return null;
      meta = Object.assign({}, meta || {});
      if (isLegacyBjornFallbackName(e, meta.name)) meta.name = "Bjorn";
      var rows = this.list();
      var hit = rows.find(function (a) { return normEmail(a.email) === e; });
      var now = new Date().toISOString();
      if (hit) Object.assign(hit, meta || {}, { email: e, updatedAt: now });
      else {
        var user = (window.PM_AUTH && PM_AUTH.getUser && PM_AUTH.getUser()) || {};
        hit = Object.assign({ id: makeId("adm"), email: e, grantedAt: now, grantedBy: user.email || "system" }, meta || {});
        rows.unshift(hit);
      }
      writeStore(ADMIN_GRANTS_KEY, rows.slice(0, 100));
      if (window.PM_AUDIT) PM_AUDIT.add("admin_granted", e, {});
      return hit;
    },
    revoke: function (email) {
      var e = normEmail(email);
      if (isBootstrapAdminEmailValue(e)) return false;
      var rows = this.list().filter(function (a) { return normEmail(a.email) !== e; });
      writeStore(ADMIN_GRANTS_KEY, rows);
      if (window.PM_AUDIT) PM_AUDIT.add("admin_revoked", e, {});
      return true;
    }
  };
  function normalizeRole(role, email) {
    var r = String(role || "dealer").trim().toLowerCase();
    var allowed = ["dealer", "distributor", "installer", "studio", "retailpartner", "international", "support", "marketing", "agent", "partner"];
    if (r === "internal") return ((window.PM_ADMINS && PM_ADMINS.has(email)) || isBootstrapAdminEmailValue(email)) ? "internal" : "dealer";
    if (r === "admin") return ((window.PM_ADMINS && PM_ADMINS.has(email)) || isBootstrapAdminEmailValue(email)) ? "internal" : "dealer";
    return allowed.indexOf(r) > -1 ? r : "dealer";
  }

  function hexFromBuffer(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }
  function fallbackHash(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return ((h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0"));
  }
  window.PM_SECURITY = {
    makeSalt: function () {
      if (window.crypto && crypto.getRandomValues) {
        var arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        return Array.prototype.map.call(arr, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      }
      return makeId("salt") + "_" + Date.now().toString(36);
    },
    hashPassword: async function (password, salt) {
      var input = String(salt || "") + ":" + String(password || "");
      if (window.crypto && crypto.subtle && window.TextEncoder) {
        return hexFromBuffer(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input)));
      }
      return fallbackHash(input);
    },
    createPassword: async function (password) {
      var salt = this.makeSalt();
      return { passwordSalt: salt, passwordHash: await this.hashPassword(password, salt) };
    },
    verifyPassword: async function (password, salt, expectedHash) {
      if (!salt || !expectedHash) return false;
      return await this.hashPassword(password, salt) === expectedHash;
    }
  };

  window.PM_companyFromEmail = function (email) {
    var domain = String(email || "").split("@")[1] || "";
    var root = domain.split(".")[0] || "";
    return root
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  };

  const AUDIT_KEY = "pm_audit_log";
  window.PM_AUDIT = {
    list: function () { return readStore(AUDIT_KEY, []); },
    add: function (action, subject, meta) {
      var user = (window.PM_AUTH && PM_AUTH.getUser && PM_AUTH.getUser()) || {};
      var row = {
        id: makeId("log"),
        action: action || "update",
        subject: subject || "",
        meta: meta || {},
        actor: user.email || user.name || "system",
        createdAt: new Date().toISOString()
      };
      var list = this.list();
      list.unshift(row);
      writeStore(AUDIT_KEY, list.slice(0, 300));
      return row;
    }
  };

  const REQUEST_KEY = "pm_account_requests";
  function requestName(r) {
    var name = ((r && r.firstName || "") + " " + (r && r.lastName || "")).trim() || (r && (r.name || r.email)) || "Partner";
    var admin = bootstrapAdminForEmail(r && r.email);
      if (isLegacyBjornFallbackName(r && r.email, name)) return (admin && admin.name) || "Bjorn";
    return name;
  }
  function requestStatusRank(status) {
    var map = { approved: 4, pending: 3, suspended: 2, rejected: 1 };
    return map[status || ""] || 0;
  }
  function requestStamp(row) {
    return String((row && (row.updatedAt || row.approvedAt || row.submittedAt || row.createdAt)) || "");
  }
  function normalizeRequestRows(rows) {
    var byEmail = {};
    var noEmail = [];
    (Array.isArray(rows) ? rows : []).forEach(function (row) {
      if (!row) return;
      var email = normEmail(row.email);
      if (!email) { noEmail.push(row); return; }
      var current = byEmail[email];
      if (!current ||
        requestStatusRank(row.status) > requestStatusRank(current.status) ||
        (requestStatusRank(row.status) === requestStatusRank(current.status) && requestStamp(row) > requestStamp(current))) {
        byEmail[email] = Object.assign({}, current || {}, row);
      }
    });
    return Object.keys(byEmail).map(function (email) { return byEmail[email]; }).concat(noEmail)
      .sort(function (a, b) { return requestStamp(b).localeCompare(requestStamp(a)); });
  }
  window.PM_REQUESTS = {
    list: function () { return normalizeRequestRows(readStore(REQUEST_KEY, [])); },
    findByEmail: function (email) {
      var e = normEmail(email);
      var matches = this.list().filter(function (r) { return normEmail(r.email) === e; });
      return matches.find(function (r) { return r.status === "approved"; }) || matches[0] || null;
    },
    create: function (payload) {
      payload = payload || {};
      var now = new Date().toISOString();
      var internal = isInternalEmail(payload.email);
      var nextRole = internal ? "internal" : normalizeRole(payload.partnerType || payload.role || "dealer", payload.email);
      var existing = this.findByEmail(payload.email);
      var list = this.list();
      if (existing) {
        Object.assign(existing, payload, {
          status: existing.status === "approved" ? "approved" : (internal ? "approved" : "pending"),
          role: nextRole,
          partnerType: nextRole,
          updatedAt: now,
          submittedAt: existing.submittedAt || now,
          approvedAt: existing.status === "approved" ? (existing.approvedAt || now) : (internal ? now : existing.approvedAt)
        });
      } else {
        existing = Object.assign({
          id: makeId("req"),
          submittedAt: now,
          createdAt: now,
          updatedAt: now
        }, payload, {
          status: internal ? "approved" : "pending",
          role: nextRole,
          partnerType: nextRole,
          approvedAt: internal ? now : null
        });
        list.unshift(existing);
      }
      writeStore(REQUEST_KEY, list.slice(0, 300));
      if (window.PM_AUDIT) PM_AUDIT.add("account_request", existing.email, { status: existing.status, company: existing.company || "" });
      if (internal) {
        if (window.PM_ADMINS) PM_ADMINS.grant(existing.email, { source: "internal_account_request", name: requestName(existing) });
        if (window.PM_PARTNERS) {
          PM_PARTNERS.upsert({
            name: requestName(existing),
            email: existing.email,
            company: existing.company || "PlasmaMade",
            phone: existing.phone || "",
            country: existing.country || "",
            role: "internal",
            roleLocked: true,
            status: "active",
            source: "internal_account_request",
            lastActiveAt: now
          });
        }
        if (window.PM_AUDIT) PM_AUDIT.add("internal_account_approved", existing.email, { company: existing.company || "PlasmaMade" });
      }
      return existing;
    },
    update: function (id, patch) {
      var list = this.list();
      var hit = list.find(function (r) { return r.id === id; });
      if (!hit) return null;
      Object.assign(hit, patch || {}, { updatedAt: new Date().toISOString() });
      writeStore(REQUEST_KEY, list);
      return hit;
    },
    approve: function (id) {
      var req = this.update(id, { status: "approved", approvedAt: new Date().toISOString(), rejectedAt: null, suspendedAt: null });
      if (req && req.email) {
        var rows = this.list();
        var email = normEmail(req.email);
        rows.forEach(function (row) {
          if (normEmail(row.email) === email) {
            row.status = "approved";
            row.approvedAt = row.approvedAt || req.approvedAt || new Date().toISOString();
            row.rejectedAt = null;
            row.suspendedAt = null;
            row.updatedAt = new Date().toISOString();
          }
        });
        writeStore(REQUEST_KEY, rows);
      }
      if (req && window.PM_PARTNERS) {
        PM_PARTNERS.upsert({
          name: requestName(req),
          email: req.email,
          company: req.company,
          phone: req.phone,
          country: req.country,
          role: normalizeRole(req.partnerType || req.role || "dealer", req.email),
          roleLocked: true,
          status: "active",
          source: "account_request",
          lastActiveAt: new Date().toISOString()
        });
      }
      if (req && window.PM_AUDIT) PM_AUDIT.add("account_approved", req.email, { company: req.company || "" });
      return req;
    },
    reject: function (id, reason) {
      var req = this.update(id, { status: "rejected", rejectedAt: new Date().toISOString(), rejectionReason: reason || "" });
      if (req && window.PM_PARTNERS) PM_PARTNERS.upsert({ email: req.email, status: "inactive" });
      if (req && window.PM_AUDIT) PM_AUDIT.add("account_rejected", req.email, { reason: reason || "" });
      return req;
    },
    suspend: function (id, reason) {
      var req = this.update(id, { status: "suspended", suspendedAt: new Date().toISOString(), suspensionReason: reason || "" });
      if (req && window.PM_PARTNERS) PM_PARTNERS.upsert({ email: req.email, status: "suspended" });
      if (req && window.PM_AUDIT) PM_AUDIT.add("account_suspended", req.email, { reason: reason || "" });
      return req;
    },
    remove: function (id) {
      var removed = null;
      var rows = this.list().filter(function (r) {
        if (r.id === id) { removed = r; return false; }
        return true;
      });
      writeStore(REQUEST_KEY, rows);
      if (removed && window.PM_AUDIT) PM_AUDIT.add("account_request_deleted", removed.email || id, {});
      return removed;
    }
  };

  const MAIL_KEY = "pm_admin_mail_log";
  const MARKETING_EMAIL = "marketing@plasmamade.com";
  function portalUrl() {
    try {
      var u = new URL("dashboard.html", location.href);
      return u.href;
    } catch (e) {
      return "dashboard.html";
    }
  }
  function approvalMailText(req) {
    var name = requestName(req);
    return [
      "Partner Center account goedgekeurd.",
      "",
      "Naam: " + name,
      "Bedrijf: " + ((req && req.company) || "-"),
      "E-mail: " + ((req && req.email) || "-"),
      "Partnertype: " + ((req && (req.partnerType || req.role)) || "-"),
      "",
      "De gebruiker kan nu inloggen met het wachtwoord dat bij de aanvraag is aangemaakt:",
      portalUrl(),
      "",
      "Deze melding is uitsluitend bedoeld voor PlasmaMade Marketing."
    ].join("\n");
  }
  function adminPortalUrl() {
    try {
      var u = new URL("admin.html#account-requests", location.href);
      return u.href;
    } catch (e) {
      return "admin.html#account-requests";
    }
  }
  function requestMailSubject(req) {
    var who = (req && (req.company || requestName(req))) || "nieuwe partner";
    return "Nieuwe Partner Center aanvraag - " + who;
  }
  function requestMailText(req) {
    req = req || {};
    return [
      "Nieuwe aanvraag voor het PlasmaMade Partner Center.",
      "",
      "Naam: " + requestName(req),
      "Bedrijf: " + (req.company || "-"),
      "E-mail: " + (req.email || "-"),
      "Telefoon: " + (req.phone || "-"),
      "Functie: " + (req.functionTitle || "-"),
      "Land/regio: " + (req.country || "-"),
      "Partnertype: " + (req.partnerType || req.role || "-"),
      "Website: " + (req.website || "-"),
      "",
      "Toelichting:",
      req.reason || "-",
      "",
      "Verwerken in de adminomgeving:",
      adminPortalUrl(),
      "",
      "Deze melding is uitsluitend bedoeld voor beheer via het Partner Center."
    ].join("\n");
  }
  window.PM_MAIL = {
    list: function () { return readStore(MAIL_KEY, []); },
    requestBody: requestMailText,
    requestHref: function (req) {
      return "mailto:" + encodeURIComponent(MARKETING_EMAIL) +
        "?subject=" + encodeURIComponent(requestMailSubject(req)) +
        "&body=" + encodeURIComponent(requestMailText(req));
    },
    logRequest: function (req) {
      if (!req || !req.email) return null;
      var row = {
        id: makeId("mail"),
        type: "account_request_notification",
        to: MARKETING_EMAIL,
        subject: requestMailSubject(req),
        body: requestMailText(req),
        requestId: req.id || "",
        createdAt: new Date().toISOString()
      };
      var rows = this.list();
      rows.unshift(row);
      writeStore(MAIL_KEY, rows.slice(0, 200));
      if (window.PM_AUDIT) PM_AUDIT.add("request_mail_prepared", req.email, { to: row.to });
      return row;
    },
    openRequest: function (req) {
      this.logRequest(req);
      var href = this.requestHref(req);
      try { window.open(href, "_blank"); }
      catch (e) { location.href = href; }
      return href;
    },
    approvalHref: function (req) {
      var subject = "Partner Center account goedgekeurd - " + (((req && req.company) || requestName(req)) || "partner");
      return "mailto:" + encodeURIComponent(MARKETING_EMAIL) +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(approvalMailText(req));
    },
    logApproval: function (req) {
      if (!req || !req.email) return null;
      var row = {
        id: makeId("mail"),
        type: "account_approved",
        to: MARKETING_EMAIL,
        subject: "Partner Center account goedgekeurd - " + ((req.company || requestName(req)) || "partner"),
        body: approvalMailText(req),
        createdAt: new Date().toISOString()
      };
      var rows = this.list();
      rows.unshift(row);
      writeStore(MAIL_KEY, rows.slice(0, 200));
      if (window.PM_AUDIT) PM_AUDIT.add("approval_mail_prepared", req.email, { to: row.to });
      return row;
    },
    openApproval: function (req) {
      this.logApproval(req);
      var href = this.approvalHref(req);
      try { window.open(href, "_blank"); }
      catch (e) { location.href = href; }
      return href;
    }
  };

  const PHRASE_KEY = "pm_standard_phrases";
  const DEFAULT_PHRASES = [
    { id: "ph-001", text: "Breathe better, live better.", lang: "EN", category: "algemeen", product: "Merk algemeen", active: true },
    { id: "ph-002", text: "Schone lucht begint bij PlasmaMade.", lang: "NL", category: "algemeen", product: "Merk algemeen", active: true },
    { id: "ph-003", text: "Slimme recirculatie voor een gezonde binnenlucht.", lang: "NL", category: "E-Filters", product: "E-Filter", active: true },
    { id: "ph-004", text: "Frisse lucht, zonder ingrijpende installatie.", lang: "NL", category: "dealercommunicatie", product: "Merk algemeen", active: true },
    { id: "ph-005", text: "Ontwikkeld voor langdurige prestaties.", lang: "NL", category: "techniek", product: "Merk algemeen", active: true },
    { id: "ph-006", text: "Minder vervanging, minder afval.", lang: "NL", category: "duurzaamheid", product: "Merk algemeen", active: true },
    { id: "ph-007", text: "Een systeem, jarenlang constante kwaliteit.", lang: "NL", category: "techniek", product: "E-Filter", active: true },
    { id: "ph-008", text: "Voor keukens waar design en luchtkwaliteit samenkomen.", lang: "NL", category: "E-Filters", product: "GUC1223", active: true },
    { id: "ph-009", text: "Voor ruimtes waar luchtkwaliteit direct merkbaar is.", lang: "NL", category: "AirClean UltraFine", product: "AirClean UltraFine", active: true },
    { id: "ph-010", text: "PlasmaMade helpt fijnstof, geuren en allergenen te verminderen.", lang: "NL", category: "algemeen", product: "Merk algemeen", active: true },
    { id: "ph-011", text: "Gebruik altijd de actuele PlasmaMade-materialen.", lang: "NL", category: "dealercommunicatie", product: "Merk algemeen", active: true },
    { id: "ph-012", text: "Vraag naar de juiste PlasmaMade-oplossing voor jouw situatie.", lang: "NL", category: "social media", product: "Merk algemeen", active: true }
  ];
  window.PM_PHRASES = {
    defaults: DEFAULT_PHRASES,
    list: function () {
      var rows = readStore(PHRASE_KEY, null);
      return rows && rows.length ? rows : DEFAULT_PHRASES.slice();
    },
    save: function (rows) { writeStore(PHRASE_KEY, (rows || []).slice(0, 500)); },
    active: function () { return this.list().filter(function (p) { return p.active !== false; }); },
    create: function (payload) {
      var rows = this.list();
      var row = Object.assign({ id: makeId("ph"), lang: "NL", category: "algemeen", product: "Merk algemeen", active: true }, payload || {});
      rows.unshift(row); this.save(rows);
      if (window.PM_AUDIT) PM_AUDIT.add("phrase_created", row.text, { category: row.category });
      return row;
    },
    update: function (id, patch) {
      var rows = this.list();
      var hit = rows.find(function (p) { return p.id === id; });
      if (!hit) return null;
      Object.assign(hit, patch || {});
      this.save(rows);
      if (window.PM_AUDIT) PM_AUDIT.add("phrase_updated", hit.text, { category: hit.category, active: hit.active !== false });
      return hit;
    },
    remove: function (id) {
      var rows = this.list();
      var hit = rows.find(function (p) { return p.id === id; });
      this.save(rows.filter(function (p) { return p.id !== id; }));
      if (hit && window.PM_AUDIT) PM_AUDIT.add("phrase_removed", hit.text, {});
    }
  };

  const DESIGN_STORE = "pm_designs";
  const DESIGN_LABELS = {
    draft: "Concept",
    submitted: "Aangevraagd",
    in_review: "In beoordeling",
    approved: "Goedgekeurd",
    rejected: "Afgewezen",
    changes_requested: "Aanpassing nodig",
    downloaded: "Gedownload"
  };
  window.PM_DESIGNS = {
    labels: DESIGN_LABELS,
    list: function () { return readStore(DESIGN_STORE, []); },
    save: function (rows) { return writeStore(DESIGN_STORE, rows || []); },
    get: function (id) { return this.list().find(function (d) { return d.id === id; }) || null; },
    update: function (id, patch) {
      var rows = this.list();
      var hit = rows.find(function (d) { return d.id === id; });
      if (!hit) return null;
      Object.assign(hit, patch || {}, { updated: new Date().toISOString() });
      this.save(rows);
      return hit;
    },
    setStatus: function (id, status, feedback) {
      var patch = { status: status };
      var now = new Date().toISOString();
      if (status === "submitted") patch.submittedAt = now;
      if (status === "in_review") patch.reviewedAt = now;
      if (status === "approved") patch.approvedAt = now;
      if (status === "rejected") patch.rejectedAt = now;
      if (status === "changes_requested") patch.feedbackAt = now;
      if (feedback != null) patch.feedback = feedback;
      var d = this.update(id, patch);
      if (d && window.PM_AUDIT) PM_AUDIT.add("design_" + status, d.name || id, { designId: id, feedback: feedback || "" });
      return d;
    },
    counts: function (ownerEmail) {
      var rows = this.list().filter(function (d) { return !ownerEmail || normEmail(d.ownerEmail) === normEmail(ownerEmail); });
      var out = { total: rows.length, draft: 0, submitted: 0, in_review: 0, approved: 0, rejected: 0, changes_requested: 0, downloaded: 0 };
      rows.forEach(function (d) { var s = d.status || "draft"; out[s] = (out[s] || 0) + 1; });
      return out;
    },
    canExport: function (id) {
      var d = this.get(id);
      return !!(d && (d.status === "approved" || d.status === "downloaded"));
    },
    markDownloaded: function (id, kind) {
      var d = this.update(id, { status: "downloaded", downloadedAt: new Date().toISOString(), downloadedKind: kind || "" });
      if (d && window.PM_AUDIT) PM_AUDIT.add("design_downloaded", d.name || id, { format: kind || "" });
      return d;
    },
    remove: function (id) {
      var removed = null;
      var rows = this.list().filter(function (d) {
        if (d.id === id) { removed = d; return false; }
        return true;
      });
      this.save(rows);
      if (removed && window.PM_AUDIT) PM_AUDIT.add("design_deleted", removed.name || id, { designId: id });
      return removed;
    }
  };

  const TICKET_KEY = "pm_support_tickets";
  window.PM_TICKETS = {
    list: function () { return readStore(TICKET_KEY, []); },
    create: function (payload) {
      var now = new Date();
      var id = "PM-" + now.toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      var ticket = Object.assign({ id: id, status: "open", createdAt: now.toISOString(), updatedAt: now.toISOString() }, payload || {});
      var list = this.list();
      list.unshift(ticket);
      writeStore(TICKET_KEY, list.slice(0, 200));
      if (window.PM_PARTNERS && ticket.email) {
        window.PM_PARTNERS.upsert({
          name: ticket.name,
          email: ticket.email,
          company: ticket.company,
          phone: ticket.phone,
          role: "support",
          lastActiveAt: ticket.createdAt,
          source: "support"
        });
      }
      track("support_ticket", ticket.category || "support");
      return ticket;
    },
    update: function (id, patch) {
      var list = this.list();
      var hit = list.find(function (t) { return t.id === id; });
      if (!hit) return null;
      Object.assign(hit, patch || {}, { updatedAt: new Date().toISOString() });
      writeStore(TICKET_KEY, list);
      return hit;
    },
    remove: function (id) {
      var removed = null;
      var rows = this.list().filter(function (t) {
        if (t.id === id) { removed = t; return false; }
        return true;
      });
      writeStore(TICKET_KEY, rows);
      if (removed && window.PM_AUDIT) PM_AUDIT.add("support_ticket_deleted", removed.id, { email: removed.email || "" });
      return removed;
    }
  };

  function adminNoticeCounts() {
    var requests = window.PM_REQUESTS ? PM_REQUESTS.list().filter(function (r) { return (r.status || "pending") === "pending"; }).length : 0;
    var designCounts = window.PM_DESIGNS && PM_DESIGNS.counts ? PM_DESIGNS.counts() : {};
    var designs = (designCounts.submitted || 0) + (designCounts.in_review || 0) + (designCounts.changes_requested || 0);
    var tickets = window.PM_TICKETS ? PM_TICKETS.list().filter(function (t) { return (t.status || "open") !== "closed"; }).length : 0;
    var mail = window.PM_MAIL ? PM_MAIL.list().filter(function (m) { return m.type === "account_request_notification"; }).length : 0;
    return { requests: requests, designs: designs, tickets: tickets, mail: mail, total: requests + designs + tickets };
  }
  window.PM_ADMIN_NOTICES = {
    counts: adminNoticeCounts
  };

  const PORTAL_SETTINGS_KEY = "pm_portal_settings";
  const DEFAULT_PORTAL_SETTINGS = {
    green: "#13A538",
    radius: 8,
    spacing: "comfortable",
    surface: "#ffffff",
    background: "#f6f7f6",
    buttonStyle: "technical",
    updatedAt: null
  };
  function portalSettings() {
    return Object.assign({}, DEFAULT_PORTAL_SETTINGS, readStore(PORTAL_SETTINGS_KEY, {}));
  }
  window.PM_PORTAL_SETTINGS = {
    defaults: DEFAULT_PORTAL_SETTINGS,
    get: portalSettings,
    apply: function () {
      var s = portalSettings();
      var r = document.documentElement;
      if (!r) return s;
      r.style.setProperty("--green", s.green || DEFAULT_PORTAL_SETTINGS.green);
      r.style.setProperty("--radius", Math.max(4, Number(s.radius) || 8) + "px");
      r.style.setProperty("--radius-sm", Math.max(4, (Number(s.radius) || 8) - 2) + "px");
      r.style.setProperty("--radius-lg", Math.max(8, (Number(s.radius) || 8) + 4) + "px");
      r.style.setProperty("--radius-xl", Math.max(12, (Number(s.radius) || 8) + 8) + "px");
      r.style.setProperty("--surface", s.surface || "#ffffff");
      r.style.setProperty("--bg", s.background || "#f6f7f6");
      document.body.dataset.pmSpacing = s.spacing || "comfortable";
      return s;
    },
    update: function (patch) {
      var before = portalSettings();
      var next = Object.assign({}, before, patch || {}, { updatedAt: new Date().toISOString() });
      writeStore(PORTAL_SETTINGS_KEY, next);
      if (window.PM_VERSIONS) PM_VERSIONS.add("settings", "Portal styling", before, next, { label: "Designinstellingen" });
      if (window.PM_AUDIT) PM_AUDIT.add("settings_updated", "Portal styling", {});
      this.apply();
      return next;
    },
    reset: function () {
      var before = portalSettings();
      writeStore(PORTAL_SETTINGS_KEY, DEFAULT_PORTAL_SETTINGS);
      if (window.PM_VERSIONS) PM_VERSIONS.add("settings", "Portal styling", before, DEFAULT_PORTAL_SETTINGS, { label: "Designinstellingen hersteld" });
      this.apply();
    }
  };

  const GROUP_KEY = "pm_partner_groups";
  const ALL_PARTNER_PAGES = ["dashboard", "products", "finder", "knowledge", "videos", "marketing", "campaigns", "sales", "designs", "studio", "brand", "downloads", "testdocs", "news", "support", "account", "custom-page"];
  const DEFAULT_GROUPS = [
    { id: "dealer", label: "Dealer", pages: ALL_PARTNER_PAGES.slice(), note: "Verkoop, downloads en marketingmateriaal." },
    { id: "distributor", label: "Distributeur", pages: ALL_PARTNER_PAGES.slice(), note: "Volledige productlijn, campagnes en internationale materialen." },
    { id: "installer", label: "Installateur", pages: ALL_PARTNER_PAGES.slice(), note: "Techniek, handleidingen, productspecificaties en support." },
    { id: "studio", label: "Retailpartner", pages: ALL_PARTNER_PAGES.slice(), note: "Showroommateriaal, designstudio en productadvies." },
    { id: "retailpartner", label: "Retailpartner", pages: ALL_PARTNER_PAGES.slice(), note: "Showroommateriaal, designstudio en productadvies." },
    { id: "international", label: "Internationale partner", pages: ALL_PARTNER_PAGES.slice(), note: "Campagnes, downloads en meertalige verkoopmaterialen." },
    { id: "marketing", label: "Marketingpartner", pages: ALL_PARTNER_PAGES.slice(), note: "Marketingmateriaal, campagnes, downloads en merkcontent." },
    { id: "agent", label: "Agent", pages: ALL_PARTNER_PAGES.slice(), note: "Verkooptools, productinformatie en partnercampagnes." },
    { id: "partner", label: "Partner", pages: ALL_PARTNER_PAGES.slice(), note: "Algemene partnercontent en support." },
    { id: "internal", label: "Interne gebruiker", pages: ALL_PARTNER_PAGES.concat(["admin"]), note: "Interne PlasmaMade-weergave." }
  ];
  function groupRows() {
    var rows = readStore(GROUP_KEY, null);
    return rows && rows.length ? rows : JSON.parse(JSON.stringify(DEFAULT_GROUPS));
  }
  window.PM_GROUPS = {
    defaults: DEFAULT_GROUPS,
    pages: ALL_PARTNER_PAGES,
    labels: function () {
      return groupRows().reduce(function (acc, g) { acc[g.id] = g.label; return acc; }, {});
    },
    list: groupRows,
    save: function (rows) {
      var before = groupRows();
      writeStore(GROUP_KEY, rows || []);
      if (window.PM_VERSIONS) PM_VERSIONS.add("groups", "Partnergroepen", before, rows || [], { label: "Rechtenstructuur" });
      if (window.PM_AUDIT) PM_AUDIT.add("groups_updated", "Partnergroepen", {});
    },
    update: function (id, patch) {
      var rows = groupRows();
      var hit = rows.find(function (g) { return g.id === id; });
      if (!hit) {
        hit = { id: id, label: id, pages: ALL_PARTNER_PAGES.slice(), note: "" };
        rows.push(hit);
      }
      Object.assign(hit, patch || {});
      this.save(rows);
      return hit;
    },
    canPage: function (page, user) {
      if (!page || page === "login") return true;
      if (page === "admin") return !!(window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(user));
      if (window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(user)) return true;
      var role = normalizeRole((user && user.role) || "dealer", user && user.email);
      var rows = groupRows();
      var group = rows.find(function (g) { return g.id === role; }) || rows.find(function (g) { return g.id === "dealer"; });
      if (!group || !Array.isArray(group.pages) || !group.pages.length) return true;
      if (group.pages.indexOf("*") > -1 || group.pages.indexOf(page) > -1) return true;
      return page === "designs" && group.pages.indexOf("studio") > -1;
    }
  };

  const MEDIA_KEY = "pm_media_library";
  const MEDIA_CATEGORIES = [
    "Productfoto's", "Renders", "Logo's", "Video's", "Brochures", "Handleidingen", "Certificaten",
    "Testdocumenten", "Campagnemateriaal", "Social media templates", "Persmateriaal", "Dealerbestanden", "Technische bestanden"
  ];
  function mediaDefaults() {
    var out = [];
    var D = window.PM_DATA || {};
    function add(row) {
      if (!row || !row.url) return;
      if (out.some(function (x) { return x.url === row.url; })) return;
      out.push(Object.assign({
        id: makeId("media"),
        description: "",
        productCategory: "Merk algemeen",
        lang: "NL",
        version: "1.0",
        date: new Date().toISOString().slice(0, 10),
        visibility: "Alle partnergroepen",
        downloadable: true,
        adminOnly: false,
        groups: []
      }, row));
    }
    (D.products || []).forEach(function (p) { add({ id: "media-product-" + p.id, title: p.name + " productbeeld", category: "Productfoto's", type: "PNG/JPG", productCategory: p.name, url: p.image }); });
    (D.marketing || []).forEach(function (m) { add({ id: "media-marketing-" + m.id, title: m.title, category: m.category || "Campagnemateriaal", type: m.type || "Afbeelding", productCategory: m.product || "Merk algemeen", url: m.img || m.file || "" }); });
    (D.downloads || []).forEach(function (d) { add({ id: "media-download-" + d.id, title: d.title, category: d.cat || "Brochures", type: d.type || "PDF", productCategory: d.product || "Merk algemeen", lang: d.lang || "NL", url: "assets/downloads/" + d.file + (d.type === "ZIP" ? ".zip" : ".pdf") }); });
    (D.testdocs || []).forEach(function (td) { add({ id: "media-test-" + td.id, title: td.title, category: "Testdocumenten", type: "PDF", productCategory: td.product || "Merk algemeen", lang: td.lang || "NL", url: "assets/testdocs/" + td.file + ".pdf" }); });
    (D.videos || []).forEach(function (v) { add({ id: "media-video-" + v.id, title: v.title, category: "Video's", type: v.source === "local" ? "MP4" : "YouTube", productCategory: v.product || "Merk algemeen", url: v.file || ("https://youtu.be/" + (v.yt || "")), downloadable: v.source === "local" }); });
    return out;
  }
  function mediaRows() {
    var rows = readStore(MEDIA_KEY, null);
    return rows && rows.length ? rows : mediaDefaults();
  }
  window.PM_MEDIA_LIBRARY = {
    categories: MEDIA_CATEGORIES,
    list: mediaRows,
    save: function (rows) {
      var before = mediaRows();
      writeStore(MEDIA_KEY, (rows || []).slice(0, 1000));
      if (window.PM_VERSIONS) PM_VERSIONS.add("media", "Mediabibliotheek", before, rows || [], { label: "Mediabeheer" });
      if (window.PM_AUDIT) PM_AUDIT.add("media_saved", "Mediabibliotheek", { count: (rows || []).length });
    },
    upsert: function (item) {
      var rows = mediaRows();
      item = Object.assign({ id: makeId("media"), date: new Date().toISOString().slice(0, 10), version: "1.0", downloadable: true, adminOnly: false, groups: [] }, item || {});
      var idx = rows.findIndex(function (m) { return m.id === item.id; });
      if (idx > -1) rows[idx] = item;
      else rows.unshift(item);
      this.save(rows);
      return item;
    },
    remove: function (id) {
      this.save(mediaRows().filter(function (m) { return m.id !== id; }));
    },
    createFromFile: function (file, meta, cb) {
      if (!file) return;
      meta = meta || {};
      function done(dataUrl) {
        var item = window.PM_MEDIA_LIBRARY.upsert(Object.assign({
          title: meta.title || file.name,
          description: meta.description || "",
          category: meta.category || "Dealerbestanden",
          productCategory: meta.productCategory || "Merk algemeen",
          lang: meta.lang || "NL",
          type: (file.type || file.name.split(".").pop() || "Bestand").toUpperCase(),
          size: Math.round(file.size / 1024) + " KB",
          url: dataUrl,
          fileName: file.name
        }, meta));
        if (cb) cb(item);
      }
      if (/^image\//.test(file.type || "")) resizeImageFile(file, done);
      else {
        var reader = new FileReader();
        reader.onload = function () { done(reader.result); };
        reader.readAsDataURL(file);
      }
    }
  };

  const CUSTOM_PAGE_KEY = "pm_custom_pages";
  window.PM_CUSTOM_PAGES = {
    list: function () { return readStore(CUSTOM_PAGE_KEY, []); },
    get: function (id) { return this.list().find(function (p) { return p.id === id; }) || null; },
    save: function (rows) {
      var before = this.list();
      if (!writeStore(CUSTOM_PAGE_KEY, (rows || []).slice(0, 200))) {
        toastStorageFailure(CUSTOM_PAGE_KEY);
        return null;
      }
      if (window.PM_VERSIONS) PM_VERSIONS.add("pages", "Landingspagina's", before, rows || [], { label: "Paginabeheer" });
      if (window.PM_AUDIT) PM_AUDIT.add("pages_saved", "Landingspagina's", { count: (rows || []).length });
      return rows || [];
    },
    upsert: function (page) {
      var rows = this.list();
      page = Object.assign({
        id: makeId("page"),
        title: "Nieuwe landingspagina",
        audience: "Partners",
        status: "draft",
        image: "assets/img/lifestyle/butterflies-kitchen.jpg",
        intro: "Een heldere PlasmaMade-pagina voor partners.",
        cta: "Neem contact op",
        ctaHref: "support.html",
        blocks: [],
        groups: [],
        createdAt: new Date().toISOString()
      }, page || {}, { updatedAt: new Date().toISOString() });
      var idx = rows.findIndex(function (p) { return p.id === page.id; });
      if (idx > -1) rows[idx] = page;
      else rows.unshift(page);
      if (!this.save(rows)) return null;
      return page;
    },
    createDistributorPage: function () {
      return this.upsert({
        id: "distributeurs",
        title: "Distributeur Center",
        audience: "Distributeurs",
        status: "published",
        groups: ["distributor", "international", "internal"],
        image: "assets/img/lifestyle/butterflies-kitchen.jpg",
        intro: "Alle productlijnen, verkoopargumenten en documentatie voor internationale distributie in een overzicht.",
        cta: "Bekijk downloads",
        ctaHref: "downloads.html",
        blocks: [
          { title: "Volledige productlijn", text: "GUC1223, GUC1323, AirClean UltraFine en ondersteunend marketingmateriaal centraal beschikbaar." },
          { title: "Bewijs en certificering", text: "Interflow, TUV, VDE, CE, UKCA, ROHS en RED documenten direct vindbaar voor verkoopgesprekken." },
          { title: "Lokale campagnes", text: "Gebruik PlasmaMade templates en pas teksten aan per markt binnen de bewaakte huisstijl." }
        ]
      });
    },
    remove: function (id) {
      this.save(this.list().filter(function (p) { return p.id !== id; }));
    },
    renderInto: function (root, id) {
      if (!root) return;
      var page = this.get(id) || this.list()[0];
      if (!page) {
        root.innerHTML = '<div class="empty">' + PM_ICON("fileText") + '<h4>Pagina niet gevonden</h4><p>Deze landingspagina bestaat nog niet.</p></div>';
        return;
      }
      var user = window.PM_AUTH && PM_AUTH.getUser ? PM_AUTH.getUser() : null;
      if (page.groups && page.groups.length && !(window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(user)) && page.groups.indexOf(normalizeRole(user && user.role, user && user.email)) === -1) {
        root.innerHTML = '<div class="empty">' + PM_ICON("shield") + '<h4>Geen toegang</h4><p>Deze pagina is beschikbaar voor specifieke partnergroepen.</p></div>';
        return;
      }
      document.title = page.title + " - PlasmaMade Partner Center";
      root.innerHTML =
        '<section class="pm-custom-hero">' +
          '<div><span class="badge badge--green-soft">' + esc(page.audience || "Partnerpagina") + '</span><h2>' + esc(page.title) + '</h2><p>' + esc(page.intro || "") + '</p><a class="btn btn--primary" href="' + esc(page.ctaHref || "support.html") + '">' + icon("arrowRight") + esc(page.cta || "Openen") + '</a></div>' +
          '<div class="pm-custom-hero__media"><img src="' + esc(page.image || "assets/img/logo/logo-green.png") + '" alt=""></div>' +
        '</section>' +
        '<section class="grid grid--3 pm-custom-blocks">' + (page.blocks || []).map(function (b) {
          return '<article class="card"><div class="card__body"><h3>' + esc(b.title || "Blok") + '</h3><p class="muted">' + esc(b.text || "") + '</p></div></article>';
        }).join("") + '</section>';
    }
  };

  const VERSION_KEY = "pm_version_history";
  window.PM_VERSIONS = {
    list: function () { return readStore(VERSION_KEY, []); },
    add: function (type, subject, before, after, meta) {
      function compactValue(value, depth) {
        if (value == null) return value;
        if (typeof value === "string") {
          if (/^data:/i.test(value) || value.length > 1200) return value.slice(0, 160) + "...";
          return value;
        }
        if (typeof value !== "object") return value;
        if (depth > 4) return "[ingekort]";
        if (Array.isArray(value)) return value.slice(0, 40).map(function (item) { return compactValue(item, depth + 1); });
        var out = {};
        Object.keys(value).slice(0, 80).forEach(function (key) { out[key] = compactValue(value[key], depth + 1); });
        return out;
      }
      function snapshot(value) {
        if (value == null) return null;
        var clone = JSON.parse(JSON.stringify(value));
        try {
          if (JSON.stringify(clone).length > 180000) clone = compactValue(clone, 0);
        } catch (e) { clone = compactValue(clone, 0); }
        return clone;
      }
      var row = {
        id: makeId("ver"),
        type: type || "change",
        subject: subject || "",
        before: snapshot(before),
        after: snapshot(after),
        meta: meta || {},
        actor: (getUser() && (getUser().email || getUser().name)) || "system",
        createdAt: new Date().toISOString()
      };
      var rows = this.list();
      rows.unshift(row);
      writeStore(VERSION_KEY, rows.slice(0, 80));
      return row;
    },
    restore: function (id) {
      var row = this.list().find(function (v) { return v.id === id; });
      if (!row) return false;
      var snapshot = row.before;
      if (row.type === "settings") {
        writeStore(PORTAL_SETTINGS_KEY, snapshot || DEFAULT_PORTAL_SETTINGS);
        if (window.PM_PORTAL_SETTINGS) PM_PORTAL_SETTINGS.apply();
      } else if (row.type === "groups") {
        writeStore(GROUP_KEY, snapshot || DEFAULT_GROUPS);
      } else if (row.type === "media") {
        writeStore(MEDIA_KEY, snapshot || []);
      } else if (row.type === "pages") {
        writeStore(CUSTOM_PAGE_KEY, snapshot || []);
      } else if (row.type === "cms") {
        writeStore(CMS_KEY, snapshot || {});
        if (window.PM_CMS) PM_CMS.apply();
      } else if (row.type === "page") {
        writeStore(PAGE_EDIT_KEY, snapshot || {});
      }
      if (window.PM_AUDIT) PM_AUDIT.add("version_restored", row.subject || row.type, { versionId: id, type: row.type });
      return true;
    },
    remove: function (id) {
      writeStore(VERSION_KEY, this.list().filter(function (v) { return v.id !== id; }));
    }
  };

  const PARTNER_KEY = "pm_partners";
  window.PM_PARTNERS = {
    list: function () { return withBootstrapAdminPartner(readStore(PARTNER_KEY, [])); },
    upsert: function (partner) {
      if (!partner || !partner.email) return null;
      var list = this.list();
      var email = String(partner.email).toLowerCase();
      partner.email = email;
      if (isLegacyBjornFallbackName(email, partner.name)) partner.name = "Bjorn";
      if (partner.role != null) partner.role = normalizeRole(partner.role, email);
      var hit = list.find(function (p) { return String(p.email || "").toLowerCase() === email; });
      var now = new Date().toISOString();
      if (hit) {
        Object.assign(hit, partner, { email: partner.email, updatedAt: now, lastActiveAt: partner.lastActiveAt || now });
      } else {
        hit = Object.assign({ id: "pt_" + Date.now().toString(36), createdAt: now, status: "active" }, partner, { updatedAt: now, lastActiveAt: partner.lastActiveAt || now });
        list.unshift(hit);
      }
      writeStore(PARTNER_KEY, list.slice(0, 300));
      return hit;
    },
    update: function (email, patch) {
      if (!email) return null;
      patch = patch || {};
      if (patch.role != null) patch.role = normalizeRole(patch.role, email);
      return this.upsert(Object.assign({}, patch, { email: email }));
    },
    remove: function (email) {
      var target = normEmail(email);
      if (isBootstrapAdminEmailValue(target)) return false;
      var list = this.list().filter(function (p) { return normEmail(p.email) !== target; });
      writeStore(PARTNER_KEY, list);
      if (window.PM_AUDIT) PM_AUDIT.add("partner_deleted", target, {});
      return true;
    }
  };

  const CMS_KEY = "pm_cms_overrides";
  const CMS_COLLECTIONS = [
    { id: "products", label: "Producten" },
    { id: "articles", label: "Kennisartikelen" },
    { id: "campaigns", label: "Campagnes" },
    { id: "news", label: "Nieuws" },
    { id: "marketing", label: "Marketingmateriaal" },
    { id: "downloads", label: "Downloads" },
    { id: "videos", label: "Video's" },
    { id: "testdocs", label: "Testdocumenten" }
  ];
  function cmsStore() { return readStore(CMS_KEY, {}); }
  function cmsCloneRows(collection) {
    var src = (window.PM_DATA && Array.isArray(window.PM_DATA[collection])) ? window.PM_DATA[collection] : [];
    return JSON.parse(JSON.stringify(src));
  }
  function cmsBlank(collection) {
    var id = makeId(collection.slice(0, 4));
    var base = { id: id, title: "Nieuw item", summary: "", category: "Algemeen", status: "published" };
    if (collection === "products") return Object.assign(base, { name: "Nieuw product", type: "E-Filter", image: "assets/img/products/guc1223.png", tagline: "", description: "", features: [], specs: [] });
    if (collection === "downloads") return Object.assign(base, { title: "Nieuwe download", type: "PDF", file: "nieuw-bestand", product: "Algemeen", lang: "NL", cat: "Algemeen", size: "" });
    if (collection === "marketing") return Object.assign(base, { title: "Nieuw marketingasset", type: "Afbeelding", img: "assets/img/social/li-algemeen.jpg", formats: [] });
    if (collection === "videos") return Object.assign(base, { title: "Nieuwe video", duration: "00:00", source: "youtube", yt: "", file: "", poster: "", product: "Algemeen", topic: "Werking & uitleg", audience: "Partner", desc: "" });
    if (collection === "testdocs") return Object.assign(base, { title: "Nieuw testdocument", type: "PDF", file: "nieuw-testdocument", product: "Algemeen", usage: "Commercieel", conclusion: "", lang: "NL", size: "" });
    if (collection === "news") return Object.assign(base, { date: new Date().toISOString().slice(0, 10), tag: "Partner Center" });
    if (collection === "campaigns") return Object.assign(base, { start: new Date().toISOString().slice(0, 10), end: "", assets: [] });
    return base;
  }
  window.PM_CMS = {
    collections: CMS_COLLECTIONS,
    labels: CMS_COLLECTIONS.reduce(function (acc, c) { acc[c.id] = c.label; return acc; }, {}),
    list: function (collection) {
      var store = cmsStore();
      return Array.isArray(store[collection]) ? JSON.parse(JSON.stringify(store[collection])) : cmsCloneRows(collection);
    },
    save: function (collection, rows) {
      var store = cmsStore();
      var before = JSON.parse(JSON.stringify(store));
      store[collection] = (rows || []).slice(0, 1000);
      if (!writeStore(CMS_KEY, store)) {
        toastStorageFailure(CMS_KEY);
        return null;
      }
      this.apply();
      if (window.PM_VERSIONS) PM_VERSIONS.add("cms", this.labels[collection] || collection, before, store, { collection: collection, label: "Contentpublicatie" });
      if (window.PM_AUDIT) PM_AUDIT.add("cms_saved", this.labels[collection] || collection, { count: store[collection].length });
      return store[collection];
    },
    upsert: function (collection, row) {
      row = row || {};
      row.id = String(row.id || makeId(collection.slice(0, 4)));
      row.updatedAt = new Date().toISOString();
      var rows = this.list(collection);
      var idx = rows.findIndex(function (r) { return String(r.id) === String(row.id); });
      if (idx > -1) rows[idx] = row;
      else rows.unshift(row);
      if (!this.save(collection, rows)) return null;
      return row;
    },
    duplicate: function (collection, id) {
      var rows = this.list(collection);
      var hit = rows.find(function (r) { return String(r.id) === String(id); });
      if (!hit) return null;
      var copy = JSON.parse(JSON.stringify(hit));
      copy.id = makeId(collection.slice(0, 4));
      copy.title = (copy.title || copy.name || "Item") + " kopie";
      if (copy.name) copy.name = copy.title;
      return this.upsert(collection, copy);
    },
    remove: function (collection, id) {
      var rows = this.list(collection).filter(function (r) { return String(r.id) !== String(id); });
      if (!this.save(collection, rows)) return null;
      if (window.PM_AUDIT) PM_AUDIT.add("cms_deleted", id, { collection: collection });
      return rows;
    },
    reset: function (collection) {
      var store = cmsStore();
      var before = JSON.parse(JSON.stringify(store));
      delete store[collection];
      if (!writeStore(CMS_KEY, store)) {
        toastStorageFailure(CMS_KEY);
        return;
      }
      this.apply();
      if (window.PM_VERSIONS) PM_VERSIONS.add("cms", this.labels[collection] || collection, before, store, { collection: collection, label: "Originele content hersteld" });
      if (window.PM_AUDIT) PM_AUDIT.add("cms_reset", this.labels[collection] || collection, {});
    },
    blank: cmsBlank,
    apply: function () {
      if (!window.PM_DATA) return;
      var store = cmsStore();
      CMS_COLLECTIONS.forEach(function (c) {
        if (Array.isArray(store[c.id])) window.PM_DATA[c.id] = JSON.parse(JSON.stringify(store[c.id]));
      });
    }
  };

  /* ---------------- NAV CONFIG ---------------- */
  const NAV = [
    { key: "grp.overview", items: [
      { id: "dashboard", href: "dashboard.html", icon: "grid" }
    ]},
    { key: "grp.kp", items: [
      { id: "products", href: "products.html", icon: "box" },
      { id: "finder", href: "filter-finder.html", icon: "filter" },
      { id: "knowledge", href: "knowledge.html", icon: "book" },
      { id: "videos", href: "videos.html", icon: "play" }
    ]},
    { key: "grp.ms", items: [
      { id: "marketing", href: "marketing.html", icon: "image" },
      { id: "campaigns", href: "campaigns.html", icon: "megaphone" },
      { id: "sales", href: "sales-tools.html", icon: "target" },
      { id: "designs", href: "designs.html", icon: "palette" },
      { id: "studio", href: "studio.html", icon: "edit", badge: "Studio" }
    ]},
    { key: "grp.fb", items: [
      { id: "brand", href: "brand-guidelines.html", icon: "shieldCheck" },
      { id: "downloads", href: "downloads.html", icon: "download" },
      { id: "testdocs", href: "testdocuments.html", icon: "shieldCheck" }
    ]},
    { key: "grp.uh", items: [
      { id: "news", href: "news.html", icon: "newspaper" },
      { id: "support", href: "support.html", icon: "lifebuoy" }
    ]},
    { key: "grp.admin", items: [
      { id: "admin", href: "admin.html", icon: "chart" }
    ]}
  ];

  const PAGE_TITLE_KEY = {
    dashboard: "nav.dashboard", products: "nav.products", product: "nav.products",
    finder: "nav.finder", knowledge: "nav.knowledge", article: "nav.knowledge", videos: "nav.videos",
    marketing: "nav.marketing", campaigns: "nav.campaigns", campaign: "nav.campaigns",
    sales: "nav.sales", designs: "nav.designs", studio: "nav.studio", downloads: "nav.downloads",
    testdocs: "nav.testdocs", news: "nav.news", support: "nav.support", admin: "nav.admin",
    account: "nav.account", brand: "nav.brand", "custom-page": "Partnerpagina"
  };
  const PAGE_GROUP_KEY = {
    dashboard: "grp.overview", products: "grp.kp", product: "grp.kp", finder: "grp.kp", knowledge: "grp.kp",
    article: "grp.kp", videos: "grp.kp", marketing: "grp.ms", campaigns: "grp.ms",
    campaign: "grp.ms", sales: "grp.ms", designs: "grp.ms", studio: "grp.ms", downloads: "grp.fb",
    testdocs: "grp.fb", brand: "grp.fb", news: "grp.uh", support: "grp.uh", admin: "grp.admin",
    account: "grp.account", "custom-page": "grp.ms"
  };

  /* ---------------- AUTH ---------------- */
  const AUTH_KEY = "pm_partner_auth";
  function getUser() {
    var user = readStore(AUTH_KEY, null);
    if (user && isLegacyBjornFallbackName(user.email, user.name)) {
      user = sanitizeBootstrapUserName(Object.assign({}, user));
      writeStore(AUTH_KEY, user);
    }
    return user;
  }
  function setUser(u) { writeStore(AUTH_KEY, sanitizeBootstrapUserName(u)); }
  function updateUser(patch) {
    var u = getUser() || {};
    patch = Object.assign({}, patch || {});
    var wasAdmin = isAdminUser(u);
    if (patch.email && !wasAdmin) patch.email = u.email || patch.email;
    if (patch.role != null) {
      var selfRoles = ["dealer", "distributor", "installer", "studio"];
      var nextRole = String(patch.role || "").trim().toLowerCase();
      if (nextRole === "internal") {
        patch.role = wasAdmin ? "internal" : (selfRoles.indexOf(u.role) > -1 ? u.role : "dealer");
      } else {
        patch.role = selfRoles.indexOf(nextRole) > -1 ? nextRole : (selfRoles.indexOf(u.role) > -1 ? u.role : "dealer");
      }
    }
    Object.keys(patch).forEach(function (k) {
      if (patch[k] && typeof patch[k] === "object" && !Array.isArray(patch[k])) u[k] = Object.assign({}, u[k], patch[k]);
      else u[k] = patch[k];
    });
    setUser(u);
    return u;
  }
  function userInitials(u) {
    var n = (u && u.name) || "P";
    return esc((n.split(/\s+/).map(function (s) { return s[0] || ""; }).slice(0, 2).join("") || "P").toUpperCase());
  }
  function avatarHtml(u) { return (u && u.avatar) ? '<img src="' + u.avatar + '" alt="">' : userInitials(u); }
  function logout() {
    try { localStorage.removeItem(AUTH_KEY); } catch (e) {}
    location.href = "index.html";
  }
  function isInternalEmail(email) { return /@plasmamade\.(com|nl)$/i.test(String(email || "")); }
  function isBootstrapAdminEmail(email) { return !!bootstrapAdminForEmail(email); }
  function bootstrapAdminRequest(admin) {
    admin = admin || BOOTSTRAP_ADMIN_ROWS[0];
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
  async function bootstrapAdminAccess(email, password) {
    var admin = bootstrapAdminForEmail(email);
    if (!admin) return null;
    var ok = await PM_SECURITY.verifyPassword(password, admin.passwordSalt, admin.passwordHash);
    if (!ok) return { ok: false, status: "approved", request: bootstrapAdminRequest(admin), reason: "bad_password" };
    return { ok: true, status: "approved", request: bootstrapAdminRequest(admin), admin: true, internal: true, bootstrap: true };
  }
  function approvedRequest(email) {
    var req = window.PM_REQUESTS && PM_REQUESTS.findByEmail(email);
    return req && req.status === "approved" ? req : null;
  }
  function activePartner(email) {
    var e = normEmail(email);
    return window.PM_PARTNERS && PM_PARTNERS.list().find(function (p) {
      return normEmail(p.email) === e && (p.status || "active") === "active";
    }) || null;
  }
  function hasApprovedAccount(email) {
    return !!(approvedRequest(email) || activePartner(email));
  }
  function isAdminUser(user) {
    if (!user) return false;
    var email = user.email;
    if (!email) return false;
    var partner = activePartner(email);
    if (window.PM_ADMINS && PM_ADMINS.has(email)) return true;
    if (partner && partner.role === "internal") return true;
    if (isBootstrapAdminEmail(email) && user.admin === true) return true;
    if (isInternalEmail(email) && hasApprovedAccount(email)) return true;
    return !!(user.admin === true && hasApprovedAccount(email));
  }
  function approvalStatus(user) {
    if (!user) return "";
    var partner = activePartner(user.email);
    if (partner) return "approved";
    var req = window.PM_REQUESTS && PM_REQUESTS.findByEmail(user.email);
    if (req) return req.status || "pending";
    if (isBootstrapAdminEmail(user.email) && user.admin === true) return "approved";
    if (user.approvalStatus && user.approvalStatus !== "approved") return user.approvalStatus;
    return "none";
  }
  function canLogin(email) {
    var partner = activePartner(email);
    if (partner) {
      var partnerAdmin = isAdminUser({ email: email });
      return { ok: true, status: "approved", request: partner, admin: partnerAdmin, internal: partnerAdmin };
    }
    var req = window.PM_REQUESTS && PM_REQUESTS.findByEmail(email);
    if (req) {
      if (req.status === "approved") {
        var reqAdmin = isAdminUser({ email: email });
        return { ok: true, status: "approved", request: req, admin: reqAdmin, internal: reqAdmin };
      }
      return { ok: false, status: req.status || "pending", request: req };
    }
    return { ok: false, status: "none" };
  }
  async function verifyLogin(email, password) {
    var bootstrap = await bootstrapAdminAccess(email, password);
    if (bootstrap && bootstrap.ok && window.PM_SYNC && PM_SYNC.login && PM_SYNC.online && PM_SYNC.online()) {
      var bootstrapRemote = await PM_SYNC.login(email, password);
      if (bootstrapRemote && bootstrapRemote.remote) return bootstrapRemote;
      if (PM_SYNC.online && PM_SYNC.online() && !(PM_SYNC.isLocalDev && PM_SYNC.isLocalDev())) {
        return { ok: false, status: "approved", request: bootstrap.request, reason: "sync_unavailable" };
      }
    }
    if (bootstrap) return bootstrap;
    if (window.PM_SYNC && PM_SYNC.login && PM_SYNC.online && PM_SYNC.online()) {
      var remote = await PM_SYNC.login(email, password);
      if (remote && remote.remote) return remote;
      if (PM_SYNC.online && PM_SYNC.online() && !(PM_SYNC.isLocalDev && PM_SYNC.isLocalDev())) {
        return { ok: false, status: "none", reason: "sync_unavailable" };
      }
    }
    var access = canLogin(email);
    if (!access.ok) return access;
    var req = access.request;
    if (!req || !req.passwordHash || !req.passwordSalt) {
      return { ok: false, status: "approved", request: req, reason: "missing_password" };
    }
    var verified = await PM_SECURITY.verifyPassword(password, req.passwordSalt, req.passwordHash);
    if (!verified) return { ok: false, status: "approved", request: req, reason: "bad_password" };
    if (window.PM_ADMINS && PM_ADMINS.has(email)) access.admin = true;
    if (access.admin) access.internal = true;
    return access;
  }
  window.PM_AUTH = {
    getUser: getUser,
    setUser: setUser,
    update: updateUser,
    logout: logout,
    initials: userInitials,
    avatarHtml: avatarHtml,
    canLogin: canLogin,
    verifyLogin: verifyLogin,
    approvalStatus: approvalStatus,
    isAdmin: isAdminUser,
    isInternalEmail: isInternalEmail
  };

  /* ---------------- FAVORIETEN & RECENT BEKEKEN ---------------- */
  const FAV_KEY = "pm_favs", RECENT_KEY = "pm_recent";
  window.PM_FAVS = {
    list: function () { return readStore(FAV_KEY, []); },
    has: function (type, id) { return this.list().some(function (f) { return f.type === type && f.id === id; }); },
    toggle: function (type, id) {
      var l = this.list();
      var i = l.findIndex(function (f) { return f.type === type && f.id === id; });
      if (i > -1) l.splice(i, 1); else l.unshift({ type: type, id: id });
      writeStore(FAV_KEY, l.slice(0, 40));
      return i === -1;
    }
  };
  window.PM_RECENT = {
    push: function (type, id) {
      var l = readStore(RECENT_KEY, []).filter(function (r) { return !(r.type === type && r.id === id); });
      l.unshift({ type: type, id: id, t: Date.now() });
      writeStore(RECENT_KEY, l.slice(0, 12));
    },
    list: function () { return readStore(RECENT_KEY, []); }
  };

  /* ---------------- TOAST ---------------- */
  function toast(msg) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; wrap.setAttribute("role", "status"); wrap.setAttribute("aria-live", "polite"); document.body.appendChild(wrap); }
    const el = document.createElement("div");
    el.className = "toast"; el.innerHTML = icon("check") + "<span>" + esc(msg) + "</span>";
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(20px)"; el.style.transition = "all .3s"; }, 2400);
    setTimeout(() => el.remove(), 2800);
  }
  window.PM_toast = toast;

  /* ---------------- TOEGANKELIJKE BEVESTIGINGSDIALOOG ---------------- */
  var lastFocus = null;
  function confirmDialog(message, onYes, opts) {
    opts = opts || {};
    closeDialog();
    lastFocus = document.activeElement;
    var ov = document.createElement("div");
    ov.className = "pm-dialog-ov"; ov.id = "pm-dialog";
    ov.innerHTML =
      '<div class="pm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="pm-dialog-msg">' +
        '<p id="pm-dialog-msg">' + esc(message) + '</p>' +
        '<div class="pm-dialog__btns">' +
          '<button type="button" class="btn btn--ghost" data-act="cancel">' + esc(opts.cancel || t("common.cancel")) + '</button>' +
          '<button type="button" class="btn btn--primary" data-act="ok">' + esc(opts.ok || t("common.confirm")) + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    var okBtn = ov.querySelector('[data-act="ok"]');
    okBtn.focus();
    ov.addEventListener("click", function (e) {
      if (e.target === ov || e.target.closest('[data-act="cancel"]')) { closeDialog(); }
      else if (e.target.closest('[data-act="ok"]')) { closeDialog(); onYes(); }
    });
    ov.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.stopPropagation(); closeDialog(); }
      if (e.key === "Tab") {
        var btns = ov.querySelectorAll("button");
        var first = btns[0], last = btns[btns.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function promptDialog(message, value, onSubmit, opts) {
    opts = opts || {};
    closeDialog();
    lastFocus = document.activeElement;
    var isMultiline = !!opts.multiline;
    var fieldTag = isMultiline ? "textarea" : "input";
    var fieldAttrs = isMultiline ? ' rows="' + (opts.rows || 4) + '"' : ' type="text"';
    var ov = document.createElement("div");
    ov.className = "pm-dialog-ov"; ov.id = "pm-dialog";
    ov.innerHTML =
      '<div class="pm-dialog pm-dialog--prompt" role="dialog" aria-modal="true" aria-labelledby="pm-dialog-msg">' +
        '<label class="pm-dialog__field" for="pm-dialog-input">' +
          '<span id="pm-dialog-msg">' + esc(message) + '</span>' +
          '<' + fieldTag + ' id="pm-dialog-input"' + fieldAttrs + '></' + fieldTag + '>' +
        '</label>' +
        '<div class="pm-dialog__btns">' +
          '<button type="button" class="btn btn--ghost" data-act="cancel">' + esc(opts.cancel || t("common.cancel")) + '</button>' +
          '<button type="button" class="btn btn--primary" data-act="ok">' + esc(opts.ok || t("common.save")) + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    var input = ov.querySelector("#pm-dialog-input");
    input.value = value == null ? "" : String(value);
    input.focus();
    input.select();
    function submitPrompt() {
      var next = input.value;
      closeDialog();
      onSubmit(next);
    }
    ov.addEventListener("click", function (e) {
      if (e.target === ov || e.target.closest('[data-act="cancel"]')) { closeDialog(); }
      else if (e.target.closest('[data-act="ok"]')) { submitPrompt(); }
    });
    ov.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.stopPropagation(); closeDialog(); }
      if (!isMultiline && e.key === "Enter") { e.preventDefault(); submitPrompt(); }
      if (isMultiline && (e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); submitPrompt(); }
      if (e.key === "Tab") {
        var focusables = ov.querySelectorAll("input,textarea,button");
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function closeDialog() {
    var d = document.getElementById("pm-dialog");
    if (d) { d.remove(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  }
  window.PM_confirm = confirmDialog;
  window.PM_prompt = promptDialog;

  /* ---------------- GLOBALE ADMIN-BEWERKMODUS ---------------- */
  const PAGE_EDIT_KEY = "pm_page_edits";
  function pageEditStore() { return readStore(PAGE_EDIT_KEY, {}); }
  function pageKey() { return (location.pathname.split("/").pop() || "dashboard.html").toLowerCase(); }
  function isDashboardPage(key) {
    return String(key || pageKey()).toLowerCase() === "dashboard.html";
  }
  function legacyDashboardHeroMatch(value) {
    return /hero-filters\.png|portal-hero__media|portal-hero__product|portal-hero__butterflies/i.test(String(value || ""));
  }
  function scrubLegacyDashboardHeroEdits(all, key) {
    key = key || pageKey();
    if (!isDashboardPage(key) || !all || !all[key]) return false;
    var edits = all[key];
    var changed = false;
    if (Array.isArray(edits._adds)) {
      var nextAdds = edits._adds.filter(function (add) {
        var haystack = [
          add && add.className,
          add && add.html,
          add && add.src,
          add && add.alt,
          add && add.parentSel,
          add && add.afterSel
        ].join(" ");
        var remove = legacyDashboardHeroMatch(haystack);
        if (remove) changed = true;
        return !remove;
      });
      edits._adds = nextAdds;
    }
    Object.keys(edits).forEach(function (sel) {
      if (sel.charAt(0) === "_") return;
      var edit = edits[sel] || {};
      var haystack = [sel, edit.html, edit.src, edit.bg, edit.style, edit.text].join(" ");
      if (legacyDashboardHeroMatch(haystack)) {
        delete edits[sel];
        changed = true;
      }
    });
    return changed;
  }
  function removeLegacyDashboardHeroDom() {
    if (!isDashboardPage()) return;
    try {
      Array.prototype.slice.call(document.querySelectorAll("main.content .portal-hero__media")).forEach(function (media) {
        var haystack = [media.className, media.innerHTML, media.getAttribute && media.getAttribute("style")].join(" ");
        if (legacyDashboardHeroMatch(haystack)) media.remove();
      });
    } catch (e) {}
    try {
      Array.prototype.slice.call(document.querySelectorAll('main.content img[src*="hero-filters.png"]')).forEach(function (img) {
        var box = img.closest(".portal-hero__media,.hero__media,.pm-ai-banner,.pm-ai-section,.pm-added-image") || img;
        if (box && box.remove) box.remove();
      });
    } catch (e) {}
  }
  function selectorFor(el) {
    if (!el || el === document.body) return "";
    if (el.getAttribute && el.getAttribute("data-pm-add")) return '[data-pm-add="' + CSS.escape(el.getAttribute("data-pm-add")) + '"]';
    if (el.id && !/^pm-|^acct-|^f-|^cms-|^admin-|^fc-|^exp-|^request-|^approval-|^phrase-/.test(el.id)) return "#" + CSS.escape(el.id);
    var parts = [];
    var cur = el;
    while (cur && cur.nodeType === 1 && cur !== document.body && parts.length < 5) {
      var name = cur.tagName.toLowerCase();
      if (cur.classList && cur.classList.length) {
        var cls = Array.prototype.slice.call(cur.classList).filter(function (c) {
          return !/^(active|open|on|sel|hidden|is-|js-|pm-editable|pm-editing-target)$/.test(c);
        }).slice(0, 2);
        if (cls.length) name += "." + cls.map(function (c) { return CSS.escape(c); }).join(".");
      }
      var parent = cur.parentElement;
      if (parent) {
        var siblings = Array.prototype.filter.call(parent.children, function (x) { return x.tagName === cur.tagName; });
        if (siblings.length > 1) name += ":nth-of-type(" + (siblings.indexOf(cur) + 1) + ")";
      }
      parts.unshift(name);
      cur = parent;
    }
    return parts.join(">");
  }
  function editableKind(el) {
    if (!el || el.closest("#pm-sidebar,#pm-topbar,#pm-footer,.toast-wrap,.pm-dialog-ov,.pm-cms-edit-ov,.search-ov,.user-menu,.lang-menu,.pm-editbar,.pm-contentbar,.pm-edit-menu")) return "";
    if (el.matches("img")) return "image";
    if (el.matches("a")) return "link";
    if (el.matches("button")) return "button";
    var bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== "none" && bg.indexOf("url(") > -1) return "background";
    if (el.children.length === 0 && el.textContent.trim()) return "text";
    return "";
  }
  function buildAddedNode(add) {
    var tag = add.tag || (add.type === "image" ? "img" : "div");
    var el = document.createElement(tag);
    el.setAttribute("data-pm-add", add.id);
    el.className = add.className || (add.type === "image" ? "pm-added-image" : "pm-added-text");
    if (add.type === "image") {
      el.src = add.src || "assets/img/logo/logo-green.png";
      el.alt = add.alt || "";
    } else if (add.html != null) {
      el.innerHTML = add.html;
    } else {
      el.textContent = add.text || "Nieuwe tekst";
    }
    if (add.style) el.setAttribute("style", add.style);
    return el;
  }
  function applyPageAdditions(edits) {
    var adds = (edits && edits._adds) || [];
    adds.forEach(function (add) {
      if (!add || !add.id || document.querySelector('[data-pm-add="' + CSS.escape(add.id) + '"]')) return;
      var node = buildAddedNode(add);
      var parent = null, after = null;
      try { parent = add.parentSel ? document.querySelector(add.parentSel) : null; } catch (e) {}
      try { after = add.afterSel ? document.querySelector(add.afterSel) : null; } catch (e) {}
      if (after && after.parentElement) after.insertAdjacentElement("afterend", node);
      else if (parent) parent.appendChild(node);
      else {
        var main = document.querySelector("main.content");
        if (main) main.appendChild(node);
      }
    });
  }
  function applyPageEdits() {
    var all = pageEditStore();
    var key = pageKey();
    if (scrubLegacyDashboardHeroEdits(all, key)) {
      try { localStorage.setItem(PAGE_EDIT_KEY, JSON.stringify(all)); } catch (e) {}
      if (window.PM_SYNC && PM_SYNC.noteLocalChange) PM_SYNC.noteLocalChange(PAGE_EDIT_KEY);
      if (window.PM_SYNC && PM_SYNC.shouldPush && PM_SYNC.shouldPush(PAGE_EDIT_KEY)) PM_SYNC.schedule(PAGE_EDIT_KEY);
    }
    var edits = all[key] || {};
    removeLegacyDashboardHeroDom();
    applyPageAdditions(edits);
    Object.keys(edits).forEach(function (sel) {
      if (sel.charAt(0) === "_") return;
      var edit = edits[sel];
      var el;
      try { el = document.querySelector(sel); } catch (e) { el = null; }
      if (!el || !edit) return;
      if (edit.deleted) { el.remove(); return; }
      if (edit.moveBefore) {
        var before = null;
        try { before = document.querySelector(edit.moveBefore); } catch (e) {}
        if (before && before.parentElement) before.parentElement.insertBefore(el, before);
      }
      if (edit.moveAfter) {
        var after = null;
        try { after = document.querySelector(edit.moveAfter); } catch (e) {}
        if (after && after.parentElement) after.insertAdjacentElement("afterend", el);
      }
      if (edit.text != null) el.textContent = edit.text;
      if (edit.html != null) el.innerHTML = edit.html;
      if (edit.src != null && el.matches("img")) el.src = edit.src;
      if (edit.bg != null) el.style.backgroundImage = 'url("' + edit.bg + '")';
      if (edit.href != null && el.matches("a")) el.setAttribute("href", edit.href);
      if (edit.alt != null && el.matches("img")) el.alt = edit.alt;
      if (edit.style != null) el.setAttribute("style", edit.style);
    });
    removeLegacyDashboardHeroDom();
  }
  function savePageEdit(sel, edit) {
    var all = pageEditStore();
    var before = JSON.parse(JSON.stringify(all));
    var key = pageKey();
    all[key] = all[key] || {};
    all[key][sel] = Object.assign(all[key][sel] || {}, edit || {});
    if (!writeStore(PAGE_EDIT_KEY, all)) {
      toastStorageFailure(PAGE_EDIT_KEY);
      return false;
    }
    if (window.PM_VERSIONS) PM_VERSIONS.add("page", key, before, all, { selector: sel, label: "Pagina bewerkt" });
    if (window.PM_AUDIT) PM_AUDIT.add("page_edit", key, { selector: sel });
    return true;
  }
  function savePageAddition(afterEl, add) {
    var all = pageEditStore();
    var before = JSON.parse(JSON.stringify(all));
    var key = pageKey();
    all[key] = all[key] || {};
    all[key]._adds = all[key]._adds || [];
    all[key]._adds.push(add);
    if (!writeStore(PAGE_EDIT_KEY, all)) {
      toastStorageFailure(PAGE_EDIT_KEY);
      return null;
    }
    var node = buildAddedNode(add);
    if (afterEl && afterEl.insertAdjacentElement) afterEl.insertAdjacentElement("afterend", node);
    else {
      var main = document.querySelector("main.content");
      if (main) main.appendChild(node);
    }
    if (window.PM_VERSIONS) PM_VERSIONS.add("page", key, before, all, { id: add.id, type: add.type, label: "Blok toegevoegd" });
    if (window.PM_AUDIT) PM_AUDIT.add("page_add", key, { id: add.id, type: add.type });
    return node;
  }
  function editImage(el, sel, isBg) {
    var file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var max = 1800;
          var scale = Math.min(1, max / Math.max(img.width, img.height));
          var cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(img.width * scale));
          cv.height = Math.max(1, Math.round(img.height * scale));
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          var data = cv.toDataURL("image/jpeg", 0.86);
          if (isBg) {
            if (!savePageEdit(sel, { bg: data })) return;
            el.style.backgroundImage = 'url("' + data + '")';
          } else {
            if (!savePageEdit(sel, { src: data, alt: el.alt || "" })) return;
            el.src = data;
          }
          toast("Afbeelding opgeslagen");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(f);
    });
    file.click();
  }
  function openPageEditor(el) {
    var kind = editableKind(el);
    if (!kind) return;
    var sel = selectorFor(el);
    if (!sel) { toast("Dit element kan niet betrouwbaar worden opgeslagen"); return; }
    if (kind === "image" || kind === "background") { editImage(el, sel, kind === "background"); return; }
    var current = el.textContent.trim();
    promptDialog(kind === "link" ? "Tekst van link/knop:" : "Tekst aanpassen:", current, function (next) {
      if (next == null) return;
      var save = function (href) {
        var edit = { text: next };
        if (kind === "link" && href != null) edit.href = href;
        if (!savePageEdit(sel, edit)) return;
        el.textContent = next;
        if (kind === "link" && href != null) el.setAttribute("href", href);
        toast("Aanpassing opgeslagen");
      };
      if (kind === "link") {
        promptDialog("Link URL:", el.getAttribute("href") || "", function (href) { save(href); }, { ok: "Opslaan" });
      } else {
        save(null);
      }
    }, { ok: "Opslaan", multiline: kind !== "link" && current.length > 70, rows: 4 });
  }
  function pageCollection() {
    var p = document.body && document.body.getAttribute("data-page");
    var map = { products: "products", product: "products", knowledge: "articles", article: "articles", news: "news", campaigns: "campaigns", campaign: "campaigns", marketing: "marketing", downloads: "downloads", videos: "videos", testdocs: "testdocs" };
    return map[p] || "";
  }
  function collectionLabel(collection) {
    return (window.PM_CMS && PM_CMS.labels && PM_CMS.labels[collection]) || collection || "content";
  }
  function collectionSingleLabel(collection) {
    var map = {
      products: "product",
      articles: "kennisartikel",
      campaigns: "campagne",
      news: "nieuwsbericht",
      marketing: "marketingitem",
      downloads: "download",
      videos: "video",
      testdocs: "testdocument"
    };
    return map[collection] || "contentitem";
  }
  function collectionNewLabel(collection) {
    var map = {
      products: "Nieuw product",
      articles: "Nieuw kennisartikel",
      campaigns: "Nieuwe campagne",
      news: "Nieuw nieuwsbericht",
      marketing: "Nieuw marketingitem",
      downloads: "Nieuwe download",
      videos: "Nieuwe video",
      testdocs: "Nieuw testdocument"
    };
    return map[collection] || ("Nieuw " + collectionSingleLabel(collection));
  }
  function capFirst(s) {
    s = String(s || "");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function contentTitle(row) {
    return (row && (row.title || row.name || row.id)) || "Contentitem";
  }
  function slugifyContentId(text, fallback) {
    var s = String(text || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return s || fallback || makeId("item");
  }
  function contentFieldDefs(collection) {
    var id = { key: "id", label: "ID", type: "text", required: true };
    var title = { key: "title", label: "Titel", type: "text", required: true };
    var category = { key: "category", label: "Categorie", type: "text" };
    var product = { key: "product", label: "Product", type: "text" };
    var image = { key: "image", label: "Afbeelding", type: "image" };
    var img = { key: "img", label: "Afbeelding", type: "image" };
    var desc = { key: "desc", label: "Omschrijving", type: "textarea", rows: 3 };
    var fields = {
      products: [
        id, { key: "name", label: "Productnaam", type: "text", required: true }, { key: "family", label: "Familie", type: "text" },
        { key: "type", label: "Type", type: "text" }, image, { key: "tagline", label: "Introregel", type: "textarea", rows: 2 },
        { key: "description", label: "Omschrijving", type: "textarea", rows: 5 }
      ],
      articles: [
        id, title, category, { key: "icon", label: "Icoon", type: "text" }, { key: "read", label: "Leestijd", type: "text" },
        { key: "excerpt", label: "Korte intro", type: "textarea", rows: 3 }, { key: "body", label: "Artikeltekst", type: "textarea", rows: 8 }
      ],
      campaigns: [
        id, title, { key: "status", label: "Campagnestatus", type: "text" }, { key: "period", label: "Periode", type: "text" },
        { key: "audience", label: "Doelgroep", type: "text" }, image, { key: "core", label: "Kernboodschap", type: "textarea", rows: 3 },
        { key: "description", label: "Omschrijving", type: "textarea", rows: 5 }
      ],
      news: [
        id, title, category, { key: "date", label: "Datum", type: "date" },
        { key: "excerpt", label: "Korte intro", type: "textarea", rows: 3 }, { key: "body", label: "Berichttekst", type: "textarea", rows: 6 }
      ],
      marketing: [
        id, title, category, { key: "type", label: "Type", type: "text" }, product, { key: "lang", label: "Taal", type: "text" },
        img, { key: "file", label: "Bestands-ID", type: "text" }, desc
      ],
      downloads: [
        id, title, { key: "cat", label: "Categorie", type: "text" }, product, { key: "type", label: "Bestandstype", type: "text" },
        { key: "file", label: "Bestands-ID", type: "text" }, { key: "size", label: "Bestandsgrootte", type: "text" }, { key: "lang", label: "Taal", type: "text" }
      ],
      videos: [
        id, title, product, { key: "topic", label: "Onderwerp", type: "text" }, { key: "audience", label: "Doelgroep", type: "text" },
        { key: "source", label: "Bron", type: "select", options: ["youtube", "local"] }, { key: "yt", label: "YouTube ID", type: "text" },
        { key: "file", label: "Videobestand", type: "text" }, { key: "poster", label: "Posterbeeld", type: "image" }, desc
      ],
      testdocs: [
        id, title, category, product, { key: "usage", label: "Gebruik", type: "text" }, { key: "file", label: "Bestands-ID", type: "text" },
        { key: "size", label: "Bestandsgrootte", type: "text" }, { key: "lang", label: "Taal", type: "text" },
        { key: "conclusion", label: "Conclusie", type: "textarea", rows: 4 }
      ]
    };
    return fields[collection] || [id, title, category, { key: "summary", label: "Samenvatting", type: "textarea", rows: 4 }];
  }
  function contentImageField(row) {
    return (row && (row.image || row.img || row.poster)) || "";
  }
  function resizeImageFile(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1800;
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(img.width * scale));
        cv.height = Math.max(1, Math.round(img.height * scale));
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL("image/jpeg", 0.86));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  function renderContentField(row, def) {
    var val = row && row[def.key] != null ? row[def.key] : "";
    if (Array.isArray(val)) val = val.join(", ");
    var req = def.required ? " required" : "";
    var label = '<span>' + esc(def.label) + (def.required ? " *" : "") + '</span>';
    if (def.type === "textarea") {
      return '<label class="pm-cms-field pm-cms-field--wide">' + label +
        '<textarea data-cms-key="' + esc(def.key) + '" rows="' + (def.rows || 4) + '"' + req + '>' + esc(val) + '</textarea></label>';
    }
    if (def.type === "select") {
      return '<label class="pm-cms-field">' + label + '<select data-cms-key="' + esc(def.key) + '"' + req + '>' +
        (def.options || []).map(function (o) { return '<option value="' + esc(o) + '"' + (String(o) === String(val) ? " selected" : "") + '>' + esc(o) + '</option>'; }).join("") +
        '</select></label>';
    }
    if (def.type === "image") {
      return '<label class="pm-cms-field pm-cms-field--wide">' + label +
        '<span class="pm-cms-inputrow"><input data-cms-key="' + esc(def.key) + '" type="text" value="' + esc(val) + '"' + req + '>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-cms-upload="' + esc(def.key) + '">' + icon("image") + 'Upload</button></span></label>';
    }
    return '<label class="pm-cms-field">' + label +
      '<input data-cms-key="' + esc(def.key) + '" type="' + (def.type || "text") + '" value="' + esc(val) + '"' + req + '></label>';
  }
  function contentInfoFromElement(el) {
    if (!window.PM_CMS || !el) return null;
    var direct = el.closest && el.closest('[id^="m-"],[id^="v-"],[id^="t-"],[id^="d-"]');
    if (direct && direct.id) {
      var prefix = direct.id.slice(0, 2);
      var mapId = { "m-": "marketing", "v-": "videos", "t-": "testdocs", "d-": "downloads" };
      if (mapId[prefix]) return { collection: mapId[prefix], id: direct.id.slice(2) };
    }
    var a = el.closest && el.closest("a[href]");
    if (a) {
      var href = a.getAttribute("href") || "";
      try {
        var u = new URL(href, location.href);
        var file = (u.pathname.split("/").pop() || "").toLowerCase();
        var id = u.searchParams.get("id");
        var map = { "product.html": "products", "article.html": "articles", "news.html": "news", "campaign.html": "campaigns" };
        if (id && map[file]) return { collection: map[file], id: id };
        var m1 = u.pathname.match(/assets\/downloads\/([^/.]+)/i);
        if (m1 && window.PM_DATA) {
          var d = (PM_DATA.downloads || []).find(function (x) { return x.file === m1[1] || x.id === m1[1]; });
          if (d) return { collection: "downloads", id: d.id };
        }
        var m2 = u.pathname.match(/assets\/testdocs\/([^/.]+)/i);
        if (m2 && window.PM_DATA) {
          var td = (PM_DATA.testdocs || []).find(function (x) { return x.file === m2[1] || x.id === m2[1]; });
          if (td) return { collection: "testdocs", id: td.id };
        }
      } catch (e) {}
    }
    var curId = window.PM_param && PM_param("id");
    var pc = pageCollection();
    if (curId && pc) return { collection: pc, id: curId };
    return null;
  }
  function closeContentEditor() {
    var old = document.querySelector(".pm-cms-edit-ov");
    if (old) old.remove();
  }
  function openContentEditor(collection, row) {
    if (!window.PM_CMS || !collection) return;
    row = row || PM_CMS.blank(collection);
    var defs = contentFieldDefs(collection);
    var preview = contentImageField(row);
    var titleLabel = capFirst(collectionSingleLabel(collection));
    closeContentEditor();
    var ov = document.createElement("div");
    ov.className = "pm-cms-edit-ov";
    ov.innerHTML =
      '<div class="pm-cms-edit" role="dialog" aria-modal="true" aria-labelledby="pm-cms-edit-title">' +
        '<div class="pm-cms-edit__head"><div><h3 id="pm-cms-edit-title">' + esc(titleLabel) + ' bewerken</h3><p>' + esc(collectionLabel(collection)) + ' · ' + esc(contentTitle(row)) + '</p></div><button type="button" class="icon-btn" data-cms-close aria-label="Sluiten">' + icon("x") + '</button></div>' +
        '<div class="pm-cms-edit__body">' +
          (preview ? '<div class="pm-cms-preview"><img src="' + esc(preview) + '" alt="" data-cms-preview></div>' : '<div class="pm-cms-preview pm-cms-preview--empty"><span data-cms-preview-empty>' + icon("fileText") + '</span><img src="" alt="" data-cms-preview hidden></div>') +
          '<form class="pm-cms-form">' + defs.map(function (def) { return renderContentField(row, def); }).join("") +
            '<details class="pm-cms-advanced"><summary>Geavanceerde data</summary><textarea spellcheck="false" aria-label="Volledige contentdata">' + esc(JSON.stringify(row, null, 2)) + '</textarea></details>' +
          '</form>' +
        '</div>' +
        '<div class="pm-cms-edit__foot"><button type="button" class="btn btn--ghost btn--sm" data-cms-close>Annuleren</button><button type="button" class="btn btn--primary btn--sm" data-cms-save>Opslaan</button></div>' +
      '</div>';
    document.body.appendChild(ov);
    var form = ov.querySelector(".pm-cms-form");
    var first = form.querySelector("input,textarea,select");
    if (first) first.focus();
    ov.querySelectorAll("[data-cms-close]").forEach(function (b) { b.addEventListener("click", closeContentEditor); });
    ov.querySelectorAll("[data-cms-upload]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-cms-upload");
        var input = form.querySelector('[data-cms-key="' + CSS.escape(key) + '"]');
        var file = document.createElement("input");
        file.type = "file";
        file.accept = "image/*";
        file.addEventListener("change", function () {
          var f = file.files && file.files[0];
          if (!f || !input) return;
          resizeImageFile(f, function (data) {
            input.value = data;
            var img = ov.querySelector("[data-cms-preview]");
            var empty = ov.querySelector("[data-cms-preview-empty]");
            if (img) { img.hidden = false; img.src = data; }
            if (empty) empty.hidden = true;
          });
        });
        file.click();
      });
    });
    ov.querySelector("[data-cms-save]").addEventListener("click", function () {
      var next;
      try { next = JSON.parse(ov.querySelector(".pm-cms-advanced textarea").value); }
      catch (e) {
        toast("De geavanceerde data is niet geldig.");
        ov.querySelector(".pm-cms-advanced textarea").focus();
        return;
      }
      var ok = true;
      defs.forEach(function (def) {
        var field = form.querySelector('[data-cms-key="' + CSS.escape(def.key) + '"]');
        if (!field) return;
        var value = String(field.value || "").trim();
        if (def.required && !value) ok = false;
        if (def.key === "id") value = slugifyContentId(value, next.id || contentTitle(next));
        next[def.key] = value;
      });
      if (!ok) {
        toast("Vul de verplichte velden in.");
        var missing = defs.map(function (def) {
          return def.required ? form.querySelector('[data-cms-key="' + CSS.escape(def.key) + '"]') : null;
        }).find(function (field) { return field && !String(field.value || "").trim(); });
        if (missing) missing.focus();
        return;
      }
      if (!next.id) next.id = slugifyContentId(next.title || next.name, makeId(collection.slice(0, 4)));
      if (!PM_CMS.upsert(collection, next)) return;
      closeContentEditor();
      toast(titleLabel + " opgeslagen");
      location.reload();
    });
  }
  function editContentItem(info) {
    if (!info || !window.PM_CMS) return;
    var row = PM_CMS.list(info.collection).find(function (r) { return String(r.id) === String(info.id); });
    if (!row) { toast("Contentitem niet gevonden"); return; }
    openContentEditor(info.collection, row);
  }
  function duplicateContentItem(info) {
    if (!info || !window.PM_CMS) return;
    var copy = PM_CMS.duplicate(info.collection, info.id);
    if (!copy) { toast("Contentitem niet gevonden"); return; }
    toast(capFirst(collectionSingleLabel(info.collection)) + " gedupliceerd");
    location.reload();
  }
  function moveContentItem(info, dir) {
    if (!info || !window.PM_CMS) return;
    var rows = PM_CMS.list(info.collection);
    var idx = rows.findIndex(function (r) { return String(r.id) === String(info.id); });
    var next = idx + dir;
    if (idx < 0 || next < 0 || next >= rows.length) { toast("Geen contentitem om mee te wisselen"); return; }
    var tmp = rows[idx];
    rows[idx] = rows[next];
    rows[next] = tmp;
    if (!PM_CMS.save(info.collection, rows)) return;
    toast("Volgorde opgeslagen");
    location.reload();
  }
  function deleteContentItem(info) {
    if (!info || !window.PM_CMS) return;
    var label = collectionSingleLabel(info.collection);
    var done = function () {
      if (!PM_CMS.remove(info.collection, info.id)) return;
      toast(capFirst(label) + " verwijderd");
      var detailPages = { products: "products.html", articles: "knowledge.html", news: "news.html", campaigns: "campaigns.html" };
      if (window.PM_param && PM_param("id") === info.id && detailPages[info.collection]) location.href = detailPages[info.collection];
      else location.reload();
    };
    if (window.PM_confirm) PM_confirm("Dit " + label + " verwijderen?", done, { ok: "Verwijderen", cancel: "Annuleren" });
    else if (confirm("Dit " + label + " verwijderen?")) done();
  }
  function addContentItem(collection) {
    if (!window.PM_CMS || !collection) return;
    var row = PM_CMS.blank(collection);
    var label = collectionNewLabel(collection);
    if (row.title === "Nieuw item") row.title = label;
    if (row.name === "Nieuw item") row.name = label;
    openContentEditor(collection, row);
  }
  function syncContentAdminBar() {
    var pc = pageCollection();
    var main = document.querySelector("main.content");
    if (!pc || !main || document.querySelector(".pm-contentbar")) return;
    var bar = document.createElement("div");
    bar.className = "pm-contentbar";
    bar.innerHTML =
      '<div><b>Contentbeheer</b><span>' + esc(collectionLabel(pc)) + '</span></div>' +
      '<div class="pm-contentbar__actions"><button type="button" class="btn btn--primary btn--sm" data-content-add>' + icon("plus") + esc(collectionNewLabel(pc)) + '</button>' +
      '<a class="btn btn--ghost btn--sm" href="admin.html#cms-panel">' + icon("sliders") + 'Alle content</a></div>';
    bar.querySelector("[data-content-add]").addEventListener("click", function () { addContentItem(pc); });
    main.insertBefore(bar, main.firstChild);
  }
  function closePageEditMenu() {
    var old = document.querySelector(".pm-edit-menu");
    if (old) old.remove();
  }
  var lastEditableTarget = null;
  function movePageElement(el, dir) {
    var sel = selectorFor(el);
    if (!sel) return;
    var target = dir < 0 ? el.previousElementSibling : el.nextElementSibling;
    while (target && !editableKind(target)) target = dir < 0 ? target.previousElementSibling : target.nextElementSibling;
    if (!target) { toast("Geen element om mee te wisselen"); return; }
    var saved;
    if (dir < 0) {
      el.parentElement.insertBefore(el, target);
      saved = savePageEdit(sel, { moveBefore: selectorFor(target), moveAfter: null });
    } else {
      target.insertAdjacentElement("afterend", el);
      saved = savePageEdit(sel, { moveAfter: selectorFor(target), moveBefore: null });
    }
    if (saved) toast("Element verplaatst");
  }
  function deletePageElement(el) {
    var sel = selectorFor(el);
    if (!sel) return;
    if (!savePageEdit(sel, { deleted: true })) return;
    el.remove();
    toast("Element verwijderd");
  }
  function addTextAfter(el) {
    promptDialog("Nieuwe tekst:", "Nieuwe tekst", function (text) {
      if (!String(text || "").trim()) return;
      var node = savePageAddition(el, {
        id: makeId("add"),
        type: "text",
        tag: "div",
        text: text,
        parentSel: selectorFor(el.parentElement),
        afterSel: selectorFor(el),
        className: "pm-added-text"
      });
      if (node) toast("Tekst toegevoegd");
    }, { ok: "Toevoegen", multiline: true, rows: 3 });
  }
  function addImageAfter(el) {
    var file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var max = 1600;
          var scale = Math.min(1, max / Math.max(img.width, img.height));
          var cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(img.width * scale));
          cv.height = Math.max(1, Math.round(img.height * scale));
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          var node = savePageAddition(el, {
            id: makeId("add"),
            type: "image",
            tag: "img",
            src: cv.toDataURL("image/jpeg", 0.86),
            parentSel: selectorFor(el.parentElement),
            afterSel: selectorFor(el),
            className: "pm-added-image"
          });
          if (node) toast("Afbeelding toegevoegd");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(f);
    });
    file.click();
  }
  function openPageEditMenu(el, x, y) {
    closePageEditMenu();
    lastEditableTarget = el;
    var info = contentInfoFromElement(el);
    var pc = (info && info.collection) || pageCollection();
    var menu = document.createElement("div");
    menu.className = "pm-edit-menu";
    menu.style.left = Math.min(x, window.innerWidth - 230) + "px";
    menu.style.top = Math.min(y, window.innerHeight - 330) + "px";
    var contentActions = "";
    if (info) {
      var itemLabel = capFirst(collectionSingleLabel(info.collection));
      contentActions +=
        '<button type="button" data-act="content-edit">' + icon("fileText") + '<span>' + esc(itemLabel) + ' bewerken</span></button>' +
        '<button type="button" data-act="content-copy">' + icon("copy") + '<span>' + esc(itemLabel) + ' dupliceren</span></button>' +
        '<button type="button" data-act="content-up">' + icon("arrowRight") + '<span>Item omhoog</span></button>' +
        '<button type="button" data-act="content-down">' + icon("arrowRight") + '<span>Item omlaag</span></button>' +
        '<button type="button" class="danger" data-act="content-delete">' + icon("trash") + '<span>' + esc(itemLabel) + ' verwijderen</span></button>';
    }
    if (pc) {
      contentActions += '<button type="button" data-act="content-add">' + icon("plus") + '<span>' + esc(collectionNewLabel(pc)) + '</span></button><div></div>';
    }
    menu.innerHTML =
      contentActions +
      '<button type="button" data-act="edit">' + icon("edit") + '<span>Bewerken</span></button>' +
      '<button type="button" data-act="up">' + icon("arrowRight") + '<span>Omhoog</span></button>' +
      '<button type="button" data-act="down">' + icon("arrowRight") + '<span>Omlaag</span></button>' +
      '<button type="button" data-act="add-text">' + icon("type") + '<span>Tekst toevoegen</span></button>' +
      '<button type="button" data-act="add-image">' + icon("image") + '<span>Afbeelding toevoegen</span></button>' +
      '<div></div>' +
      '<button type="button" class="danger" data-act="delete">' + icon("trash") + '<span>Verwijderen</span></button>';
    document.body.appendChild(menu);
    menu.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button[data-act]");
      if (!btn) return;
      ev.preventDefault();
      ev.stopPropagation();
      var act = btn.getAttribute("data-act");
      closePageEditMenu();
      if (act === "edit") openPageEditor(el);
      if (act === "content-edit") editContentItem(info);
      if (act === "content-copy") duplicateContentItem(info);
      if (act === "content-up") moveContentItem(info, -1);
      if (act === "content-down") moveContentItem(info, 1);
      if (act === "content-delete") deleteContentItem(info);
      if (act === "content-add") addContentItem(pc);
      if (act === "up") movePageElement(el, -1);
      if (act === "down") movePageElement(el, 1);
      if (act === "add-text") addTextAfter(el);
      if (act === "add-image") addImageAfter(el);
      if (act === "delete") deletePageElement(el);
    });
  }
  function setPageEditMode(on) {
    document.body.classList.toggle("pm-edit-mode", on);
    if (on) syncContentAdminBar();
    var btn = document.getElementById("pm-edit-page");
    if (btn) btn.setAttribute("aria-pressed", String(on));
    if (!on) closePageEditMenu();
    if (on) toast("Bewerkmodus aan");
    else toast("Bewerkmodus uit");
  }
  function initPageEditor() {
    applyPageEdits();
    var user = getUser();
    if (!isAdminUser(user)) return;
    syncContentAdminBar();
    document.addEventListener("click", function (e) {
      if (!document.body.classList.contains("pm-edit-mode")) return;
      var target = e.target && e.target.closest("img,a,button,h1,h2,h3,h4,h5,p,span,li,div");
      if (!target || !editableKind(target)) return;
      e.preventDefault();
      e.stopPropagation();
      openPageEditMenu(target, e.clientX + 8, e.clientY + 8);
    }, true);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePageEditMenu(); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".pm-edit-menu") && !document.body.classList.contains("pm-edit-mode")) closePageEditMenu(); });
  }
  window.PM_PAGE_EDITS = {
    apply: applyPageEdits,
    setMode: setPageEditMode,
    store: pageEditStore,
    clearPage: function (key) {
      var all = pageEditStore();
      var before = JSON.parse(JSON.stringify(all));
      delete all[key || pageKey()];
      writeStore(PAGE_EDIT_KEY, all);
      if (window.PM_VERSIONS) PM_VERSIONS.add("page", key || pageKey(), before, all, { label: "Pagina hersteld" });
      location.reload();
    }
  };

  const AI_HISTORY_KEY = "pm_ai_coder_history";
  const AI_PROVIDER_KEY = "pm_ai_provider";
  const AI_MODE_KEY = "pm_ai_coder_mode";
  const AI_MAX_HISTORY = 30;
  const AI_MODES = [
    { id: "builder", label: "Bouwen", icon: "layers", placeholder: "Bouw een partnerpagina, sectie, banner of kaart..." },
    { id: "copy", label: "Copy", icon: "type", placeholder: "Schrijf of herschrijf partnercopy in PlasmaMade-stijl..." },
    { id: "cms", label: "CMS", icon: "fileText", placeholder: "Maak een nieuwsitem, campagne, download of artikel..." },
    { id: "qa", label: "Check", icon: "shieldCheck", placeholder: "Controleer claims, toon, structuur of risico's..." },
    { id: "code", label: "Codeplan", icon: "settings", placeholder: "Beschrijf een technische portalwijziging als veilig bouwplan..." }
  ];

  function aiModeConfig(id) {
    return AI_MODES.find(function (m) { return m.id === id; }) || AI_MODES[0];
  }
  function aiMode() {
    return aiModeConfig(readStore(AI_MODE_KEY, "builder")).id;
  }
  function aiSaveMode(id) {
    var mode = aiModeConfig(id).id;
    writeStore(AI_MODE_KEY, mode);
    return mode;
  }

  function aiAfterTarget() {
    var main = document.querySelector("main.content");
    if (!main) return null;
    return document.querySelector("main.content .page-head") || main.firstElementChild || main;
  }
  function aiAddHtmlBlock(label, html, className) {
    var after = aiAfterTarget();
    return savePageAddition(after, {
      id: makeId("ai"),
      type: "section",
      tag: "section",
      className: className || "pm-ai-section",
      parentSel: after && after.parentElement ? selectorFor(after.parentElement) : "main.content",
      afterSel: after ? selectorFor(after) : "",
      html: html
    });
  }
  function aiProfessionalText(text) {
    text = String(text || "").trim();
    if (!text) return "PlasmaMade biedt partners duidelijke, actuele informatie om klanten technisch sterk en commercieel zorgvuldig te adviseren.";
    return text
      .replace(/\bsuper\b/gi, "zeer")
      .replace(/\bgeweldig\b/gi, "sterk")
      .replace(/\bbeste\b/gi, "bewezen")
      .replace(/\bAI\b/g, "PlasmaMade")
      .replace(/\s+/g, " ")
      .replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function aiReadFile(file, done) {
    if (!file) { done(null); return; }
    if (/^image\//.test(file.type || "")) resizeImageFile(file, done);
    else {
      var reader = new FileReader();
      reader.onload = function () { done(reader.result); };
      reader.readAsDataURL(file);
    }
  }
  function aiText(s, max) {
    s = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
    return max && s.length > max ? s.slice(0, max - 1).trim() + "..." : s;
  }
  function aiSentence(text, fallback) {
    text = aiText(text, 260);
    if (!text) return fallback || "";
    return text.replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function aiDefaultEndpoint() {
    var sync = "";
    try { sync = window.PM_SYNC && PM_SYNC.getEndpoint ? PM_SYNC.getEndpoint() : ""; } catch (e) {}
    if (sync) {
      try {
        var u = new URL(sync, location.href);
        if (/\/api\/sync$/i.test(u.pathname)) {
          u.pathname = u.pathname.replace(/\/api\/sync$/i, "/api/ai-coder");
          u.search = "";
          return u.toString();
        }
      } catch (e) {}
    }
    if (/^https?:$/i.test(location.protocol || "")) return location.origin.replace(/\/$/, "") + "/api/ai-coder";
    return "/api/ai-coder";
  }
  function aiProviderDefaults() {
    return { enabled: true, endpoint: aiDefaultEndpoint(), updatedAt: null };
  }
  function aiProviderConfig() {
    var defaults = aiProviderDefaults();
    var saved = readStore(AI_PROVIDER_KEY, {});
    var cfg = Object.assign(defaults, saved);
    if (!saved.endpoint || (saved.endpoint === "/api/ai-coder" && defaults.endpoint !== "/api/ai-coder")) cfg.endpoint = defaults.endpoint;
    return cfg;
  }
  function aiSaveProvider(patch) {
    var next = Object.assign(aiProviderConfig(), patch || {}, { updatedAt: new Date().toISOString() });
    writeStore(AI_PROVIDER_KEY, next);
    return next;
  }
  function aiAuthHeaders(extra) {
    var headers = Object.assign({}, extra || {});
    try {
      var u = getUser ? getUser() : null;
      if (u && u.syncToken) headers["x-pm-token"] = u.syncToken;
      if (u && u.email) headers["x-pm-actor"] = u.email;
    } catch (e) {}
    return headers;
  }
  function aiHistory() {
    var rows = readStore(AI_HISTORY_KEY, []);
    return Array.isArray(rows) ? rows : [];
  }
  function aiSaveHistory(rows) {
    writeStore(AI_HISTORY_KEY, (rows || []).slice(-AI_MAX_HISTORY));
  }
  function aiMessage(role, content, meta) {
    return Object.assign({ id: makeId("aimsg"), role: role || "assistant", content: aiText(content, 2400), at: new Date().toISOString() }, meta || {});
  }
  function aiFindProduct(command) {
    var q = String(command || "").toLowerCase();
    var products = (window.PM_DATA && PM_DATA.products) || [];
    return products.find(function (p) {
      return q.indexOf(String(p.id || "").toLowerCase()) > -1 || q.indexOf(String(p.name || "").toLowerCase()) > -1;
    }) || null;
  }
  function aiHumanPage() {
    var p = document.body && document.body.getAttribute("data-page");
    return p || (location.pathname.split("/").pop() || "portal");
  }
  function aiPageLabel() {
    var key = aiHumanPage();
    var title = "";
    try {
      title = (PAGE_TITLE_KEY[key] && t(PAGE_TITLE_KEY[key])) || key || "Portal";
    } catch (e) {
      title = key || "Portal";
    }
    if (key === "custom-page") title = window.PM_PAGE_TITLE_OVERRIDE || title;
    return title || "Portal";
  }
  function aiVisiblePageSummary() {
    var main = document.querySelector("main.content");
    if (!main) return {};
    function rows(sel, max, limit) {
      return Array.prototype.slice.call(main.querySelectorAll(sel)).slice(0, max).map(function (el) {
        return aiText(el.textContent || el.alt || "", limit || 180);
      }).filter(Boolean);
    }
    return {
      title: aiText((main.querySelector("h1,h2") || {}).textContent || document.title || "", 180),
      headings: rows("h1,h2,h3", 14, 140),
      paragraphs: rows("p,.lead,.muted,.tile p,.card p", 18, 220),
      actions: rows("a.btn,button.btn,.tile__link", 14, 80),
      images: Array.prototype.slice.call(main.querySelectorAll("img")).slice(0, 12).map(function (img) {
        return { src: img.getAttribute("src") || "", alt: aiText(img.getAttribute("alt") || "", 120) };
      })
    };
  }
  function aiActionCatalog() {
    return [
      { type: "addSection", use: "Voeg een compleet portalblok toe met titel, body, CTA en optioneel beeld." },
      { type: "addBanner", use: "Voeg een brede campagne- of aankondigingsbanner toe." },
      { type: "addCard", use: "Voeg een compacte kaart/link toe op de huidige pagina." },
      { type: "replaceImage", use: "Vervang een bestaand beeld of voeg een beeld toe als er geen match is." },
      { type: "rewriteSelectedText", use: "Herschrijf de geselecteerde tekst in PlasmaMade-stijl." },
      { type: "createCustomPage", use: "Maak een nieuwe landingspagina met intro, CTA en blokken." },
      { type: "createCmsItem", use: "Maak een CMS-concept voor nieuws, artikel, download, video of campagne." },
      { type: "addPhrase", use: "Voeg copy toe aan de standaardzinnen van de Design Studio." },
      { type: "addMedia", use: "Voeg een item toe aan de mediabibliotheek." },
      { type: "navigate", use: "Open een relevante bestaande portalpagina." }
    ];
  }
  function aiContext() {
    var data = window.PM_DATA || {};
    var user = getUser ? getUser() : null;
    var selected = lastEditableTarget ? {
      kind: editableKind(lastEditableTarget),
      selector: selectorFor(lastEditableTarget),
      text: aiText(lastEditableTarget.textContent || lastEditableTarget.alt || "", 900)
    } : null;
    function productRow(p) {
      return { id: p.id, name: p.name, family: p.family, type: p.type, tagline: aiText(p.tagline || p.description, 220), image: p.image };
    }
    function mediaRow(m) {
      return { id: m.id, title: m.title, category: m.category, product: m.productCategory || m.product, type: m.type, url: m.url };
    }
    return {
      language: window.PM_lang ? PM_lang() : "nl",
      page: aiHumanPage(),
      path: location.pathname + location.search,
      visiblePage: aiVisiblePageSummary(),
      selected: selected,
      user: user ? { role: user.role || "", company: user.company || "", isAdmin: !!(window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(user)) } : null,
      settings: window.PM_PORTAL_SETTINGS ? PM_PORTAL_SETTINGS.get() : {},
      capabilities: aiActionCatalog(),
      brand: {
        name: "PlasmaMade",
        colors: ["#13A538", "#000000", "#ffffff", "#ececec"],
        tone: "fris, direct, premium, technisch betrouwbaar, warm en niet schreeuwerig",
        copyRules: [
          "Gebruik geen Beste, Nr. 1, marktleider, super, geweldig of fantastische claims.",
          "Headlines kort houden; primaire URL is plasmamade.com.",
          "B2B-copy gebruikt bewijs, 'uw' en concrete vervolgstappen.",
          "Consumentencopy mag directer zijn maar blijft premium."
        ],
        verifiedClaims: [
          "Min. 10 jaar / 9.000 uur levensduur.",
          "97% recyclebaar materiaal.",
          "Tot 98% reductie van virussen en bacterien wanneer de context dit ondersteunt.",
          "Geen afvoer naar buiten nodig door recirculatie.",
          "GUC1223 en GUC1323: CE, UKCA, ROHS, RED.",
          "AirClean UltraFine: Interflow-test, vergelijkbare deeltjesreductie met HEPA en ISO 6/7-context."
        ],
        rules: [
          "Gebruik echte portal-assets of geuploade bestanden.",
          "Maak geen medische garanties.",
          "Onderbouw claims met beschikbare productinformatie.",
          "Gebruik PlasmaMade groen voor primaire acties."
        ]
      },
      products: (data.products || []).slice(0, 12).map(productRow),
      media: window.PM_MEDIA_LIBRARY ? PM_MEDIA_LIBRARY.list().slice(0, 35).map(mediaRow) : [],
      customPages: window.PM_CUSTOM_PAGES ? PM_CUSTOM_PAGES.list().map(function (p) { return { id: p.id, title: p.title, audience: p.audience, status: p.status, groups: p.groups || [] }; }) : [],
      cms: window.PM_CMS ? PM_CMS.collections.map(function (c) { return { id: c.id, label: c.label, count: PM_CMS.list(c.id).length }; }) : [],
      sync: window.PM_SYNC ? { online: !!(PM_SYNC.online && PM_SYNC.online()), remoteUpdatedAt: PM_SYNC.remoteUpdatedAt || "", lastError: PM_SYNC.lastError || "" } : null
    };
  }
  function aiContextMetric(label, value) {
    return '<div class="pm-ai-context__metric"><span>' + esc(label) + '</span><b>' + esc(value == null ? "-" : value) + '</b></div>';
  }
  function aiRenderContext(panel, context, provider, mode) {
    if (!panel) return;
    context = context || aiContext();
    provider = provider || aiProviderConfig();
    var visible = context.visiblePage || {};
    var sync = context.sync || {};
    var selected = context.selected || null;
    var pageTitle = aiPageLabel();
    var source = provider.enabled ? "server" : "lokaal";
    var syncState = sync.lastError ? "fout" : (sync.online ? "online" : "lokaal");
    panel.innerHTML =
      '<div class="pm-ai-panel__title"><span class="badge badge--green-soft">Pagina & context</span><b>Pagina: ' + esc(pageTitle) + '</b><p>Elke wijziging wordt aan deze pagina gekoppeld en staat daarna in de versiegeschiedenis.</p></div>' +
      '<div class="pm-ai-context__grid">' +
        aiContextMetric("Modus", aiModeConfig(mode).label) +
        aiContextMetric("Bron", source) +
        aiContextMetric("Sync", syncState) +
        aiContextMetric("Media", (context.media || []).length) +
      '</div>' +
      (selected ? '<div class="pm-ai-context__selected"><b>Selectie</b><p>' + esc(selected.text || selected.kind || "Actief element") + '</p></div>' : '') +
      '<div class="pm-ai-context__chips">' +
        (context.products || []).slice(0, 5).map(function (p) { return '<span>' + esc(p.name || p.id || "Product") + '</span>'; }).join("") +
      '</div>';
  }
  function aiRenderRecent(panel) {
    if (!panel) return;
    var questions = aiHistory().filter(function (m) { return m.role === "user"; }).slice(-4).reverse();
    var versions = window.PM_VERSIONS ? PM_VERSIONS.list().slice(0, 5) : [];
    var questionHtml = questions.length
      ? questions.map(function (m) { return '<li><button type="button" data-ai-reuse="' + esc(m.id) + '"><span>' + esc(aiText(m.content, 92)) + '</span><small>' + esc(PM_fmtDate(m.at)) + '</small></button></li>'; }).join("")
      : '<li class="muted">Nog geen recente vragen.</li>';
    var versionHtml = versions.length
      ? versions.map(function (v) {
          var subject = v.subject || v.type || "Wijziging";
          var page = v.type === "page" ? subject : (v.meta && v.meta.page) || "";
          return '<li><div><b>' + esc((v.meta && v.meta.label) || subject) + '</b><span>' + esc(page ? "Pagina: " + page : PM_fmtDate(v.createdAt)) + '</span></div><button type="button" class="btn btn--ghost btn--sm" data-ai-restore="' + esc(v.id) + '">Terugdraaien</button></li>';
        }).join("")
      : '<li class="muted">Nog geen wijzigingen.</li>';
    panel.innerHTML =
      '<div class="pm-ai-panel__title"><span class="badge badge--green-soft">Historie</span><b>Vragen en terugdraaien</b><p>Heropen een recente opdracht of draai een wijziging direct terug.</p></div>' +
      '<div class="pm-ai-recent__block"><b>Recente vragen</b><ul class="pm-ai-recent__questions">' + questionHtml + '</ul></div>' +
      '<div class="pm-ai-recent__block"><b>Versies & terugdraaien</b><ul class="pm-ai-recent__changes">' + versionHtml + '</ul></div>';
  }
  function aiPlanStepsFor(actions, prompt, mode) {
    var count = Array.isArray(actions) ? actions.length : 0;
    var modeLabel = aiModeConfig(mode).label;
    if (!count) {
      return [
        { step: modeLabel + " opdracht gelezen", status: "klaar", detail: aiText(prompt, 120) },
        { step: "Veilige actie bepalen", status: "wacht", detail: "Meer richting nodig voordat er iets wordt toegepast." }
      ];
    }
    return [
      { step: "Context gelezen", status: "klaar", detail: "Pagina, selectie, CMS, media en merkregels meegenomen." },
      { step: "Voorstel opgebouwd", status: "klaar", detail: count + " veilige actie" + (count === 1 ? "" : "s") + " klaargezet." },
      { step: "Beheerder beslist", status: "wacht", detail: "Pas toe na controle; structurele acties vragen bevestiging." }
    ];
  }
  function aiDraft(command, kind) {
    var product = aiFindProduct(command);
    var q = aiText(command, 240);
    var isDistributor = /distributeur|distributor|internationaal|international/i.test(q);
    var isInstaller = /installateur|techniek|montage|handleiding/i.test(q);
    var fallbackTitle = kind === "page" ? "Partnerpagina" : "Nieuwe partnersectie";
    if (/campaign|campagne/i.test(q)) fallbackTitle = "Partnercampagne";
    if (/dealer|retail|showroom/i.test(q)) fallbackTitle = "Dealerondersteuning";
    if (isInstaller) fallbackTitle = "Technische ondersteuning";
    if (isDistributor) fallbackTitle = "Distributeur Center";
    var title = product ? product.name : fallbackTitle;
    var body = product
      ? aiSentence(product.tagline || product.description, "")
      : (isDistributor
        ? "Een compacte partnerpagina met productinformatie, bewijsvoering en verkoopmateriaal voor internationale distributie."
        : isInstaller
          ? "Een praktisch blok met montage-informatie, downloads en support voor installateurs en technische partners."
          : "Een helder PlasmaMade-blok dat partners helpt om klanten technisch sterk en commercieel zorgvuldig te adviseren.");
    if (/linkedin|caption|social/i.test(q)) {
      title = product ? product.name + " LinkedIn-copy" : "LinkedIn-copy";
      body = product
        ? product.name + " helpt partners om recirculatie en luchtkwaliteit helder uit te leggen met bewezen PlasmaMade-technologie."
        : "Schone lucht begint met duidelijk advies. PlasmaMade ondersteunt partners met bewezen technologie, actuele documentatie en sterke verkoopmaterialen.";
    }
    return {
      title: title,
      kicker: product ? product.family || "Product" : (isDistributor ? "Distributeurs" : "Partner Center"),
      body: body,
      ctaLabel: product ? "Bekijk product" : (/download/i.test(q) ? "Open downloads" : "Meer informatie"),
      ctaHref: product ? "product.html?id=" + encodeURIComponent(product.id) : (/download/i.test(q) ? "downloads.html" : "support.html"),
      image: product ? product.image : "assets/img/lifestyle/butterflies-kitchen.jpg",
      product: product
    };
  }
  function aiSectionHtml(action, uploadedData) {
    var d = aiDraft(action.prompt || action.title || "", "section");
    var title = action.title || d.title;
    var kicker = action.kicker || action.badge || d.kicker;
    var body = action.body || action.text || action.description || d.body;
    var ctaLabel = action.ctaLabel != null ? action.ctaLabel : (action.cta != null ? action.cta : d.ctaLabel);
    var ctaHref = action.ctaHref || action.href || d.ctaHref;
    var image = action.image || action.src || (action.useUploadedImage ? uploadedData : "") || d.image;
    var html = '<div class="pm-ai-section__copy"><span class="badge badge--green-soft">' + esc(kicker) + '</span><h3>' + esc(title) + '</h3><p>' + esc(body) + '</p>';
    if (ctaLabel) html += '<div class="pm-ai-actions"><a class="btn btn--primary btn--sm" href="' + esc(ctaHref || "support.html") + '">' + icon("arrowRight") + esc(ctaLabel) + '</a></div>';
    html += '</div>';
    if (image) html += '<img src="' + esc(image) + '" alt="' + esc(title) + '">';
    return html;
  }
  function aiCardHtml(action) {
    var d = aiDraft(action.prompt || action.title || "", "card");
    return '<div class="tile__icon">' + icon(action.icon || "fileText") + '</div><h3>' + esc(action.title || d.title) + '</h3><p>' + esc(action.body || action.text || d.body) + '</p><a class="tile__link" href="' + esc(action.href || action.ctaHref || d.ctaHref) + '">' + icon("arrowRight") + esc(action.ctaLabel || "Openen") + '</a>';
  }
  function aiCustomPageFromAction(action, prompt, uploadedData) {
    var d = aiDraft(prompt || action.prompt || action.title || "", "page");
    var blocks = Array.isArray(action.blocks) && action.blocks.length ? action.blocks : [
      { title: "Productlijn", text: "Overzicht van relevante PlasmaMade-producten, toepassingen en verkoopargumenten." },
      { title: "Bewijs en documentatie", text: "Downloads, testdocumenten en technische informatie op een centrale plek." },
      { title: "Partneractie", text: "Heldere vervolgstap voor verkoop, support of campagnegebruik." }
    ];
    return {
      id: action.id || slugifyContentId(action.title || d.title, makeId("page")),
      title: action.title || d.title,
      audience: action.audience || d.kicker || "Partners",
      status: action.status || "published",
      groups: Array.isArray(action.groups) ? action.groups : [],
      image: action.image || action.src || uploadedData || d.image,
      intro: action.intro || action.body || action.text || d.body,
      cta: action.cta || action.ctaLabel || d.ctaLabel,
      ctaHref: action.ctaHref || action.href || d.ctaHref,
      blocks: blocks.map(function (b) { return { title: b.title || "Blok", text: b.text || b.body || "" }; })
    };
  }
  function aiNormalizeActions(actions) {
    if (!Array.isArray(actions)) return [];
    return actions.map(function (a) {
      if (typeof a === "string") return { type: "note", label: a, text: a };
      a = Object.assign({}, a || {});
      a.type = String(a.type || a.action || a.kind || "note");
      a.label = a.label || a.title || a.text || a.type;
      return a;
    }).filter(function (a) { return a && a.type; }).slice(0, 8);
  }
  function aiFlushAdminChanges() {
    if (window.PM_SYNC && PM_SYNC.adminFlush) return PM_SYNC.adminFlush({ timeout: 6500 });
    if (window.PM_SYNC && PM_SYNC.flushDirty) return Promise.resolve(PM_SYNC.flushDirty({ timeout: 6500 }));
    return Promise.resolve(false);
  }
  function aiNavigateAfterSync(href) {
    aiFlushAdminChanges().then(function () {
      location.href = href;
    }).catch(function () {
      location.href = href;
    });
  }
  function aiOpFromAction(action, uploadedData, prompt) {
    var type = String(action.type || "").replace(/[\s_-]+/g, "").toLowerCase();
    if (type === "replaceimage" || type === "image") {
      return {
        label: action.label || "Vervang het eerstvolgende beeld door de gekozen afbeelding.",
        structural: false,
        apply: function () {
          var src = action.src || action.image || uploadedData;
          if (!src) { toast("Geen afbeelding beschikbaar"); return; }
          var img = null;
          if (action.selector) {
            try { img = document.querySelector(action.selector); } catch (e) {}
          }
          img = img || document.querySelector("main.content .portal-hero__media img, main.content .hero img, main.content .pm-custom-hero__media img, main.content img");
          if (img) {
            var sel = selectorFor(img);
            img.src = src;
            if (action.alt) img.alt = action.alt;
            savePageEdit(sel, { src: src, alt: action.alt || img.alt || "PlasmaMade beeld" });
          } else {
            savePageAddition(aiAfterTarget(), { id: makeId("ai"), type: "image", tag: "img", src: src, alt: action.alt || "PlasmaMade beeld", className: "pm-added-image", parentSel: "main.content", afterSel: "" });
          }
        }
      };
    }
    if (type === "updatesettings" || type === "style") {
      return {
        label: action.label || "Pas de portalstijl aan.",
        structural: false,
        apply: function () {
          var patch = Object.assign({}, action.patch || {});
          if (action.green) patch.green = action.green;
          if (action.radius != null) patch.radius = action.radius;
          if (action.spacing) patch.spacing = action.spacing;
          if (!Object.keys(patch).length) patch = { green: "#13A538", radius: 14, buttonStyle: "soft-technical" };
          PM_PORTAL_SETTINGS.update(patch);
        }
      };
    }
    if (type === "addsection" || type === "addbanner" || type === "banner" || type === "section") {
      return {
        label: action.label || "Voeg een nieuw portalblok toe.",
        structural: true,
        apply: function () {
          var cls = (type === "addbanner" || type === "banner") ? "pm-ai-banner" : "pm-ai-section pm-ai-section--media";
          aiAddHtmlBlock(action.title || "Builder-sectie", aiSectionHtml(Object.assign({ prompt: prompt }, action), uploadedData), action.className || cls);
        }
      };
    }
    if (type === "addcard" || type === "card") {
      return {
        label: action.label || "Voeg een kaart toe.",
        structural: true,
        apply: function () { aiAddHtmlBlock(action.title || "Partnerkaart", aiCardHtml(Object.assign({ prompt: prompt }, action)), action.className || "tile pm-ai-card"); }
      };
    }
    if (type === "adduploadfield" || type === "uploadfield") {
      return {
        label: action.label || "Voeg een uploadblok voor partnerafbeeldingen toe.",
        structural: true,
        apply: function () {
          aiAddHtmlBlock("Uploadveld",
            '<h3>' + esc(action.title || "Partnerafbeeldingen uploaden") + '</h3><p>' + esc(action.body || "Voeg lokaal beelden toe aan de mediabibliotheek. Beheerders kunnen metadata, zichtbaarheid en downloadrechten instellen.") + '</p><label class="pm-ai-upload"><input type="file" accept="image/*" multiple><span>' + icon("image") + 'Bestanden kiezen</span></label>',
            action.className || "pm-ai-section");
        }
      };
    }
    if (type === "rewriteselectedtext" || type === "rewritetext" || type === "text") {
      return {
        label: action.label || "Herschrijf de geselecteerde tekst in PlasmaMade-stijl.",
        structural: false,
        apply: function () {
          var el = null;
          if (action.selector) {
            try { el = document.querySelector(action.selector); } catch (e) {}
          }
          el = el || (lastEditableTarget && editableKind(lastEditableTarget) === "text" ? lastEditableTarget : document.querySelector("main.content p"));
          if (!el) { toast("Selecteer eerst een tekst in bewerkmodus."); return; }
          var next = action.text || action.body || aiProfessionalText(el.textContent);
          el.textContent = next;
          savePageEdit(selectorFor(el), { text: next });
        }
      };
    }
    if (type === "createcustompage" || type === "createpage" || type === "landingspagina") {
      return {
        label: action.label || "Maak een nieuwe landingspagina.",
        structural: true,
        apply: function () {
          var page = PM_CUSTOM_PAGES.upsert(aiCustomPageFromAction(action, prompt, uploadedData));
          toast("Landingspagina aangemaakt");
          aiNavigateAfterSync("page.html?id=" + encodeURIComponent(page.id));
        }
      };
    }
    if (type === "createdistributorpage") {
      return {
        label: action.label || "Maak een nieuwe landingspagina voor distributeurs.",
        structural: true,
        apply: function () {
          var page = PM_CUSTOM_PAGES.createDistributorPage();
          toast("Landingspagina aangemaakt");
          aiNavigateAfterSync("page.html?id=" + encodeURIComponent(page.id));
        }
      };
    }
    if (type === "addphrase" || type === "phrase" || type === "caption") {
      return {
        label: action.label || "Voeg copy toe aan de Design Studio.",
        structural: false,
        apply: function () {
          if (!window.PM_PHRASES) return;
          PM_PHRASES.create({
            text: action.text || action.body || aiDraft(prompt, "phrase").body,
            category: action.category || "Partnercopy",
            product: action.product || (aiFindProduct(prompt) && aiFindProduct(prompt).name) || "Merk algemeen",
            lang: action.lang || "NL",
            active: action.active !== false
          });
        }
      };
    }
    if (type === "createcmsitem" || type === "cmsitem") {
      return {
        label: action.label || "Maak een nieuw CMS-item.",
        structural: true,
        apply: function () {
          if (!window.PM_CMS) return;
          var collection = action.collection || "news";
          var base = PM_CMS.blank(collection);
          var item = Object.assign(base, action.item || {}, {
            id: action.id || (action.item && action.item.id) || slugifyContentId(action.title || base.title || base.name, makeId(collection.slice(0, 4)))
          });
          if (action.title) item.title = action.title;
          if (action.name) item.name = action.name;
          if (action.body) item.body = action.body;
          if (action.description) item.description = action.description;
          PM_CMS.upsert(collection, item);
        }
      };
    }
    if (type === "addmedia") {
      return {
        label: action.label || "Voeg item toe aan de mediabibliotheek.",
        structural: false,
        apply: function () {
          if (!window.PM_MEDIA_LIBRARY) return;
          PM_MEDIA_LIBRARY.upsert({
            title: action.title || "Builder-media",
            description: action.description || action.text || "",
            category: action.category || "Dealerbestanden",
            productCategory: action.productCategory || action.product || "Merk algemeen",
            lang: action.lang || "NL",
            type: action.mediaType || action.fileType || "Bestand",
            url: action.url || action.src || uploadedData || "assets/img/logo/logo-green.png"
          });
        }
      };
    }
    if (type === "movesectionbefore") {
      return {
        label: action.label || "Verplaats de downloadsectie boven de videosectie.",
        structural: true,
        apply: function () {
          var heads = Array.prototype.slice.call(document.querySelectorAll("main.content h2,main.content h3,.section-title h3"));
          var dl = heads.find(function (h) { return /download/i.test(h.textContent); });
          var vd = heads.find(function (h) { return /video/i.test(h.textContent); });
          var dlBlock = dl && (dl.closest("section,.card,.grid") || dl.parentElement);
          var vdBlock = vd && (vd.closest("section,.card,.grid") || vd.parentElement);
          if (dlBlock && vdBlock && vdBlock.parentElement) {
            vdBlock.parentElement.insertBefore(dlBlock, vdBlock);
            savePageEdit(selectorFor(dlBlock), { moveBefore: selectorFor(vdBlock), moveAfter: null });
          } else toast("Ik kon de secties niet betrouwbaar herkennen.");
        }
      };
    }
    if (type === "whitespace" || type === "relaxlayout") {
      return {
        label: action.label || "Maak de geselecteerde sectie rustiger met meer witruimte.",
        structural: false,
        apply: function () {
          var el = lastEditableTarget ? (lastEditableTarget.closest("section,.card,.tile,article,div") || lastEditableTarget) : aiAfterTarget();
          if (!el) return;
          var sel = selectorFor(el);
          el.style.maxWidth = action.maxWidth || "960px";
          el.style.marginLeft = "auto";
          el.style.marginRight = "auto";
          el.style.padding = action.padding || "28px";
          savePageEdit(sel, { style: el.getAttribute("style") || "" });
        }
      };
    }
    if (type === "navigate") {
      return {
        label: action.label || "Open " + (action.href || "pagina") + ".",
        structural: false,
        apply: function () { if (action.href) aiNavigateAfterSync(action.href); }
      };
    }
    return null;
  }
  function aiBuildPlan(actions, uploadedData, prompt, notes, meta) {
    meta = meta || {};
    var pageLabel = aiPageLabel();
    var normalized = aiNormalizeActions(actions);
    var ops = normalized.map(function (a) {
      var op = aiOpFromAction(a, uploadedData, prompt);
      if (op) {
        op.type = a.type;
        op.target = a.target || a.selector || a.collection || a.href || "";
        op.reason = a.reason || a.preview || "";
        op.risk = a.risk || (op.structural ? "controle" : "laag");
      }
      return op;
    }).filter(Boolean);
    ops.forEach(function (op) {
      op.page = pageLabel;
      if (op.label && op.label.indexOf("Pagina:") === -1) op.label += " (Pagina: " + pageLabel + ")";
      if (!op.target) op.target = pageLabel;
    });
    return {
      ops: ops,
      notes: notes || [],
      planSteps: Array.isArray(meta.plan) && meta.plan.length ? meta.plan : aiPlanStepsFor(normalized, prompt, meta.mode || aiMode()),
      page: pageLabel,
      mode: meta.mode || aiMode(),
      confidence: meta.confidence || (ops.length ? "goed" : "laag"),
      structural: ops.some(function (o) { return !!o.structural; }) || ops.length > 1
    };
  }
  function aiLocalActions(command, uploadedData, mode) {
    var q = String(command || "").toLowerCase();
    mode = mode || aiMode();
    var actions = [];
    if (/wat kun|wat kan|help|mogelijkheden|hoe werkt|uitleg/i.test(q)) return actions;
    var wantsCopy = /linkedin|copy|caption|social|post|tekst|schrijf/i.test(q);
    if (wantsCopy && (q.indexOf("linkedin") > -1 || q.indexOf("caption") > -1 || q.indexOf("copy") > -1 || q.indexOf("post") > -1 || q.indexOf("social") > -1)) {
      actions.push({
        type: "addPhrase",
        label: "Voeg een copyconcept toe aan standaardzinnen voor de Design Studio.",
        text: aiDraft(command, "phrase").body,
        category: q.indexOf("linkedin") > -1 ? "LinkedIn" : "Social",
        product: (aiFindProduct(command) && aiFindProduct(command).name) || "Merk algemeen"
      });
    }
    if ((q.indexOf("headerfoto") > -1 || q.indexOf("afbeelding") > -1 || q.indexOf("foto") > -1) && uploadedData) {
      actions.push({ type: "replaceImage", label: "Vervang het eerstvolgende beeld op deze pagina door de geuploade afbeelding.", src: uploadedData });
    }
    if ((q.indexOf("controleer") > -1 || q.indexOf("check") > -1 || q.indexOf("claim") > -1 || q.indexOf("factcheck") > -1) && lastEditableTarget) {
      actions.push({ type: "rewriteSelectedText", label: "Controleer en herschrijf de geselecteerde tekst volgens PlasmaMade-claims en tone of voice." });
    }
    if (q.indexOf("knoppen") > -1 && (q.indexOf("groen") > -1 || q.indexOf("ronder") > -1 || q.indexOf("rond") > -1)) {
      actions.push({ type: "updateSettings", label: "Pas de portalstijl aan: PlasmaMade groen en rondere actieknoppen.", patch: { green: "#13A538", radius: 14, buttonStyle: "soft-technical" } });
    }
    if (!wantsCopy && (q.indexOf("ultrafine") > -1 || q.indexOf("productsectie") > -1)) {
      actions.push({ type: "addSection", label: "Voeg een AirClean UltraFine productsectie toe op deze pagina.", title: "Cleanroomkwaliteit. Zonder de cleanroom.", kicker: "AirClean UltraFine", body: "De AirClean UltraFine combineert ESP- en ESD-technologie voor professionele ruimtes van 20 tot 150 m2. Onafhankelijk getest door Interflow en geschikt voor kantoor, zorg, horeca, retail en sport.", image: "assets/img/ultrafine/ultrafine.jpg", ctaLabel: "Bekijk product", ctaHref: "product.html?id=airclean-ultrafine" });
    }
    if (q.indexOf("banner") > -1) {
      actions.push({ type: "addBanner", label: "Voeg een nieuwe banner toe met afbeelding, titel, tekst en CTA.", title: "Schone lucht. Sterk advies.", kicker: "Partnercampagne", body: "Gebruik actuele PlasmaMade-materialen om klanten helder te adviseren over recirculatie, luchtkwaliteit en lange levensduur.", image: uploadedData || "assets/img/lifestyle/butterflies-kitchen.jpg", ctaLabel: "Bekijk campagnes", ctaHref: "campaigns.html" });
    }
    if (q.indexOf("technische handleidingen") > -1 || q.indexOf("extra kaart") > -1) {
      actions.push({ type: "addCard", label: "Voeg een kaart toe voor technische handleidingen.", title: "Technische handleidingen", body: "Montage-informatie, productsheets en testdocumenten voor installateurs en technische partners.", href: "downloads.html", ctaLabel: "Open downloads" });
    }
    if (q.indexOf("downloadsectie") > -1 && q.indexOf("video") > -1) {
      actions.push({ type: "moveSectionBefore", label: "Probeer de downloadsectie boven de videosectie te plaatsen op deze pagina." });
    }
    if (q.indexOf("professioneler") > -1 || q.indexOf("plasmamade tone") > -1 || q.indexOf("toon") > -1 || q.indexOf("herschrijf") > -1) {
      actions.push({ type: "rewriteSelectedText", label: "Herschrijf de geselecteerde tekst in PlasmaMade-stijl." });
    }
    if (q.indexOf("uploadveld") > -1) {
      actions.push({ type: "addUploadField", label: "Voeg een uploadblok voor partnerafbeeldingen toe.", title: "Partnerafbeeldingen uploaden", body: "Voeg lokaal beelden toe aan de mediabibliotheek. Beheerders kunnen metadata, zichtbaarheid en downloadrechten instellen." });
    }
    if (q.indexOf("landingspagina") > -1 && q.indexOf("distributeur") > -1) {
      actions.push({ type: "createDistributorPage", label: "Maak een nieuwe landingspagina voor distributeurs." });
    } else if (q.indexOf("landingspagina") > -1 || q.indexOf("pagina") > -1) {
      actions.push(Object.assign({ type: "createCustomPage", label: "Maak een nieuwe landingspagina op basis van je opdracht." }, aiCustomPageFromAction({}, command, uploadedData)));
    }
    if (q.indexOf("linkedin") > -1 && (q.indexOf("template") > -1 || q.indexOf("tekst") > -1 || q.indexOf("caption") > -1 || q.indexOf("copy") > -1) && !actions.some(function (a) { return a.type === "addPhrase"; })) {
      actions.push({ type: "addPhrase", label: "Voeg een LinkedIn-tekstblok toe aan standaardzinnen voor de Design Studio.", text: aiDraft(command, "phrase").body, category: "LinkedIn", product: (aiFindProduct(command) && aiFindProduct(command).name) || "AirClean UltraFine" });
    }
    if ((q.indexOf("social") > -1 || q.indexOf("post") > -1 || q.indexOf("caption") > -1) && !actions.some(function (a) { return a.type === "addPhrase"; })) {
      actions.push({ type: "addPhrase", label: "Voeg een social-copy concept toe aan standaardzinnen voor de Design Studio.", text: aiDraft(command, "phrase").body, category: q.indexOf("linkedin") > -1 ? "LinkedIn" : "Social", product: (aiFindProduct(command) && aiFindProduct(command).name) || "Merk algemeen" });
    }
    if (q.indexOf("nieuws") > -1 || q.indexOf("artikel") > -1) {
      actions.push({ type: "createCmsItem", label: "Maak een CMS-concept voor dit onderwerp.", collection: q.indexOf("artikel") > -1 ? "articles" : "news", title: aiDraft(command, "cms").title, body: aiDraft(command, "cms").body });
    }
    if (q.indexOf("downloads") > -1 && q.indexOf("open") > -1) {
      actions.push({ type: "navigate", label: "Open de downloadpagina.", href: "downloads.html" });
    }
    if (q.indexOf("support") > -1 && (q.indexOf("open") > -1 || q.indexOf("vraag") > -1)) {
      actions.push({ type: "navigate", label: "Open support.", href: "support.html" });
    }
    if (q.indexOf("witruimte") > -1 || q.indexOf("smaller") > -1 || q.indexOf("rustiger") > -1) {
      actions.push({ type: "whitespace", label: "Maak de geselecteerde sectie rustiger met meer witruimte." });
    }
    if (!actions.length && aiText(command)) {
      if (mode === "cms" || /cms|nieuws|artikel|download|video|campagne/i.test(command)) {
        var collection = /download/i.test(command) ? "downloads" : /video/i.test(command) ? "videos" : /campagne/i.test(command) ? "campaigns" : /artikel|kennis/i.test(command) ? "articles" : "news";
        actions.push({ type: "createCmsItem", label: "Maak een concept in het CMS.", collection: collection, title: aiDraft(command, "cms").title, body: aiDraft(command, "cms").body });
      } else if (mode === "copy") {
        actions.push({ type: "addPhrase", label: "Voeg een tekstconcept toe aan standaardzinnen.", text: aiDraft(command, "phrase").body, category: "Partnercopy", product: (aiFindProduct(command) && aiFindProduct(command).name) || "Merk algemeen" });
      } else if (mode === "qa") {
        actions.push({ type: "rewriteSelectedText", label: "Maak een veilige claim- en tooncorrectie voor geselecteerde tekst.", reason: "QA-modus controleert claims en PlasmaMade-toon." });
      } else {
        var draft = aiDraft(command, "section");
        actions.push({ type: "addSection", label: "Maak een passend portalblok op basis van je opdracht.", title: draft.title, kicker: draft.kicker, body: draft.body, image: uploadedData || draft.image, ctaLabel: draft.ctaLabel, ctaHref: draft.ctaHref });
      }
    }
    return actions;
  }
  function aiPlan(command, uploadedData, mode) {
    var actions = aiLocalActions(command, uploadedData, mode);
    var notes = actions.length ? [] : ["Ik heb nog geen veilige wijziging kunnen afleiden."];
    return aiBuildPlan(actions, uploadedData, command, notes, { mode: mode || aiMode() });
  }
  function aiLocalAnswer(command, uploadedData, mode) {
    mode = mode || aiMode();
    if (/wat kun|wat kan|help|mogelijkheden|hoe werkt|uitleg/i.test(command)) {
      return {
        reply: "Ik kan pagina's, CMS-content, partnercopy, beelden, landingspagina's, standaardzinnen en claimchecks voorbereiden als toepasbare admin-acties.",
        actions: [],
        plan: aiPlanStepsFor([], command, mode),
        mode: mode,
        confidence: "goed",
        notes: [],
        source: "local"
      };
    }
    var actions = aiLocalActions(command, uploadedData, mode);
    var draft = aiDraft(command, actions.some(function (a) { return /page/i.test(a.type); }) ? "page" : "section");
    var reply = actions.length
      ? "Ik heb dit vertaald naar een uitvoerbaar voorstel in PlasmaMade-stijl. Ik gebruik de huidige portalcontext, beschikbare productinformatie en veilige merkregels. Controleer de stappen hieronder en pas ze toe wanneer het klopt."
      : "Ik kan dit maken, maar ik heb nog net iets meer richting nodig. Je kunt bijvoorbeeld om een pagina, sectie, CMS-item, tekstblok of beeldwissel vragen.";
    if (actions.length && /bedenk|maak|bouw|vul|schrijf/i.test(command)) {
      reply = "Ik denk mee: dit wordt het sterkst als we het centreren rond '" + draft.title + "' en de partner direct naar de juiste vervolgstap sturen. Ik heb alvast een voorstel klaargezet.";
    }
    return { reply: reply, actions: actions, plan: aiPlanStepsFor(actions, command, mode), mode: mode, confidence: actions.length ? "goed" : "laag", notes: [], source: "local" };
  }
  function aiNormalizeResponse(raw) {
    if (!raw) return null;
    if (typeof raw === "string") {
      try { raw = JSON.parse(raw); } catch (e) { return { reply: raw, actions: [] }; }
    }
    if (typeof raw.reply !== "string" && typeof raw.message === "string") raw.reply = raw.message;
    if (!Array.isArray(raw.actions) && Array.isArray(raw.ops)) raw.actions = raw.ops;
    return {
      reply: aiText(raw.reply || "Ik heb een voorstel klaargezet.", 2400),
      actions: aiNormalizeActions(raw.actions || []),
      plan: Array.isArray(raw.plan) ? raw.plan.map(function (step) {
        return {
          step: aiText((step && (step.step || step.title || step.label)) || "", 160),
          status: aiText((step && step.status) || "", 60),
          detail: aiText((step && (step.detail || step.text || step.body)) || "", 260)
        };
      }).filter(function (step) { return step.step; }).slice(0, 6) : [],
      notes: Array.isArray(raw.notes) ? raw.notes : [],
      mode: raw.mode || "",
      confidence: raw.confidence || "",
      source: raw.source || "provider"
    };
  }
  function aiProviderRequest(command, uploadedData, history, mode) {
    var cfg = aiProviderConfig();
    if (!cfg.enabled || !cfg.endpoint || !window.fetch) return Promise.resolve(null);
    var payload = {
      prompt: command,
      mode: mode || aiMode(),
      history: (history || []).slice(-12).map(function (m) { return { role: m.role, content: m.content }; }),
      context: aiContext(),
      uploaded: uploadedData ? { type: /^data:image\//.test(uploadedData) ? "image" : "file", dataUrl: uploadedData.slice(0, 750000) } : null
    };
    return fetch(cfg.endpoint, {
      method: "POST",
      headers: aiAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.text().then(function (txt) {
        var data = null;
        try { data = JSON.parse(txt); } catch (e) { data = { reply: txt, actions: [] }; }
        if (!res.ok) throw new Error((data && (data.error || data.reply)) || ("HTTP " + res.status));
        return aiNormalizeResponse(data);
      });
    });
  }
  function aiMessageHtml(m) {
    var role = m.role === "user" ? "user" : (m.role === "system" ? "system" : "assistant");
    var actions = Array.isArray(m.actions) && m.actions.length
      ? '<ul>' + m.actions.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join("") + '</ul>'
      : "";
    var source = m.source ? '<span class="pm-ai-msg__source">' + esc(m.source === "provider" ? "server" : "lokaal") + '</span>' : "";
    return '<div class="pm-ai-msg pm-ai-msg--' + role + '"><div class="pm-ai-msg__bubble"><p>' + esc(m.content).replace(/\n/g, "<br>") + '</p>' + actions + source + '</div></div>';
  }
  function aiRenderThread(root, history) {
    root.innerHTML = history.map(aiMessageHtml).join("");
    root.scrollTop = root.scrollHeight;
  }
  function aiRenderPlan(panel, plan) {
    if (!plan || (!plan.ops.length && !plan.notes.length)) {
      panel.innerHTML = '<div class="pm-ai-plan__empty"><b>Geen voorstel actief</b><p class="muted">Stuur een bericht om een nieuw voorstel te maken.</p></div>';
      return;
    }
    var steps = Array.isArray(plan.planSteps) && plan.planSteps.length
      ? '<div class="pm-ai-plan__steps">' + plan.planSteps.map(function (s, i) {
          return '<div class="pm-ai-step"><span>' + esc(s.status || (i + 1)) + '</span><div><b>' + esc(s.step || "Stap") + '</b>' + (s.detail ? '<p>' + esc(s.detail) + '</p>' : '') + '</div></div>';
        }).join("") + '</div>'
      : "";
    var mode = plan.mode ? '<span class="pm-ai-plan__pill">' + esc(aiModeConfig(plan.mode).label) + '</span>' : "";
    var pageLabel = plan.page || aiPageLabel();
    var page = '<span class="pm-ai-plan__pill">Pagina: ' + esc(pageLabel) + '</span>';
    var confidence = plan.confidence ? '<span class="pm-ai-plan__pill">' + esc(plan.confidence) + '</span>' : "";
    var notesHtml = plan.notes && plan.notes.length
      ? '<div class="pm-ai-notes"><b>Let op</b><ul>' + plan.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join("") + '</ul></div>'
      : "";
    panel.innerHTML = plan.ops.length
      ? '<div class="pm-ai-plan__top"><div><span class="badge badge--green-soft">Voorstel</span><b>Pagina: ' + esc(pageLabel) + '</b><p>Controleer de stappen; toepassen wordt opgeslagen en blijft terug te draaien.</p></div><div>' + page + mode + confidence + '</div></div>' + steps +
        '<div class="pm-ai-plan__ops">' + plan.ops.map(function (o) {
          var risk = o.risk || (o.structural ? "controle" : "laag");
          return '<div class="pm-ai-op"><div><b>' + esc(o.label) + '</b>' + (o.reason ? '<p>' + esc(o.reason) + '</p>' : '') + '<div class="pm-ai-op__meta"><span>Pagina: ' + esc(o.page || pageLabel) + '</span><span>Risico: ' + esc(risk) + '</span></div></div>' + (o.target ? '<small>' + esc(o.target) + '</small>' : '') + '</div>';
        }).join("") + '</div>' + notesHtml + (plan.structural ? '<p class="pm-ai-warn">Structurele wijziging: controleer dit voorstel voordat je publiceert.</p>' : '')
      : '<b>Geen wijziging gemaakt</b><p class="muted">' + esc(plan.notes.join(" ")) + '</p>';
  }
  function aiSuggestionPrompts(mode) {
    var page = aiHumanPage();
    var selected = lastEditableTarget && aiText(lastEditableTarget.textContent || lastEditableTarget.alt || "", 80);
    var base = mode === "copy" ? [
      { icon: "type", label: "LinkedIn-copy", prompt: "Schrijf LinkedIn-copy voor partners over AirClean UltraFine, bewijs-gestuurd en zonder overdreven claims." },
      { icon: "shieldCheck", label: "Claimproof", prompt: selected ? "Herschrijf de geselecteerde tekst claimproof in PlasmaMade-stijl." : "Maak een korte claimproof partnertekst over GUC1223." },
      { icon: "arrowRight", label: "CTA's", prompt: "Maak drie korte CTA's voor dealers die naar plasmamade.com verwijzen." }
    ] : mode === "cms" ? [
      { icon: "newspaper", label: "Nieuwsitem", prompt: "Maak een CMS-nieuwsitem over nieuwe partnercontent in het PlasmaMade Partner Center." },
      { icon: "download", label: "Download", prompt: "Maak een CMS-downloaditem voor een technische productsheet." },
      { icon: "palette", label: "Campagne", prompt: "Maak een campagneconcept voor dealers met titel, korte intro en CTA." }
    ] : mode === "qa" ? [
      { icon: "shieldCheck", label: "Claims", prompt: selected ? "Controleer de geselecteerde tekst op PlasmaMade-claims en herschrijf hem waar nodig." : "Controleer de huidige pagina op PlasmaMade-claims en stel verbeteringen voor." },
      { icon: "eye", label: "Pagina", prompt: "Controleer de huidige pagina op duidelijkheid, structuur en partnerwaarde." },
      { icon: "fileText", label: "Tone", prompt: "Maak de tekst zakelijker, directer en betrouwbaarder volgens PlasmaMade-toon." }
    ] : mode === "code" ? [
      { icon: "settings", label: "Flowplan", prompt: "Maak een veilig technisch plan om deze portalpagina beter te laten werken voor admins." },
      { icon: "layers", label: "Component", prompt: "Ontwerp een veilige admin-component als toepasbare portalacties, zonder externe scripts." },
      { icon: "shieldCheck", label: "Risico's", prompt: "Controleer welke wijziging hier technisch het veiligst is en zet alleen veilige acties klaar." }
    ] : [
      { icon: "fileText", label: "Bouw dealerpagina", prompt: "Maak een compacte dealerpagina voor GUC1223 met bewijs, assets, CTA en drie blokken." },
      { icon: "type", label: "Schrijf LinkedIn-copy", prompt: "Schrijf LinkedIn-copy voor partners over AirClean UltraFine, bewijs-gestuurd en zonder overdreven claims." },
      { icon: "newspaper", label: "Maak nieuwsitem", prompt: "Maak een CMS-nieuwsitem over nieuwe partnercontent in het PlasmaMade Partner Center." },
      { icon: "shieldCheck", label: "Check claims", prompt: selected ? "Controleer de geselecteerde tekst op PlasmaMade-claims en herschrijf hem waar nodig." : "Controleer de huidige pagina op PlasmaMade-claims en stel verbeteringen voor." }
    ];
    if (page === "downloads") base.unshift({ icon: "download", label: "Orden downloads", prompt: "Verbeter deze downloadpagina voor partners: maak het overzicht duidelijker en stel een veilige actie voor." });
    if (page === "studio") base.unshift({ icon: "palette", label: "Verbeter studio", prompt: "Denk mee over deze Design Studio-pagina en stel een concrete verbetering voor." });
    return base.slice(0, 5);
  }
  function closeAiCoder() {
    var old = document.querySelector(".pm-ai-ov");
    if (old) old.remove();
  }
  function openAiCoder() {
    if (!(window.PM_AUTH && PM_AUTH.isAdmin && PM_AUTH.isAdmin(getUser()))) return;
    closeAiCoder();
    var provider = aiProviderConfig();
    var currentMode = aiMode();
    var pageLabel = aiPageLabel();
    var suggestions = aiSuggestionPrompts(currentMode);
    var ov = document.createElement("div");
    ov.className = "pm-ai-ov";
    ov.innerHTML =
      '<div class="pm-ai pm-ai--chat" role="dialog" aria-modal="true" aria-labelledby="pm-ai-title">' +
        '<div class="pm-ai__head"><div class="pm-ai__brand"><img src="assets/img/logo/logo-black.png" alt="PlasmaMade"><div><span class="badge badge--green-soft">Admin werkbank</span><h3 id="pm-ai-title">PlasmaMade Builder</h3><p>Werk overzichtelijk aan pagina&apos;s, CMS, copy, beeld en controles.</p></div></div><div class="pm-ai__head-actions"><span class="pm-ai-page-badge">Pagina: ' + esc(pageLabel) + '</span><button type="button" class="icon-btn" data-ai-close aria-label="Sluiten">' + icon("x") + '</button></div></div>' +
        '<div class="pm-ai-modebar" id="pm-ai-modebar" role="tablist" aria-label="AI modus">' +
          AI_MODES.map(function (m) { return '<button type="button" role="tab" aria-selected="' + (m.id === currentMode) + '" class="' + (m.id === currentMode ? "active" : "") + '" data-ai-mode="' + esc(m.id) + '">' + icon(m.icon) + '<span>' + esc(m.label) + '</span></button>'; }).join("") +
        '</div>' +
        '<div class="pm-ai__body pm-ai__body--builder">' +
          '<div class="pm-ai-workspace">' +
            '<section class="pm-ai-main">' +
              '<div class="pm-ai-intake"><div class="pm-ai-intake__head"><span>1</span><div><b>Opdracht</b><p>Kies een taak of beschrijf precies wat er op deze pagina moet gebeuren.</p></div></div><div class="pm-ai-suggestions" id="pm-ai-suggestions"></div><div class="pm-ai__foot pm-ai-composer"><textarea id="pm-ai-cmd" rows="3" placeholder="' + esc(aiModeConfig(currentMode).placeholder) + '"></textarea><div class="pm-ai-composer__row"><label class="btn btn--ghost btn--sm pm-ai-file">' + icon("paperclip") + 'Bestand<input id="pm-ai-file" type="file"></label><button type="button" class="btn btn--ghost btn--sm" id="pm-ai-clear">' + icon("trash") + 'Wissen</button><button type="button" class="btn btn--ghost btn--sm" id="pm-ai-send">' + icon("arrowRight") + 'Voorstel</button><button type="button" class="btn btn--primary btn--sm" id="pm-ai-apply" disabled>' + icon("check") + 'Pas toe</button></div></div></div>' +
              '<div class="pm-ai-thread" id="pm-ai-thread" aria-live="polite"></div>' +
              '<div class="pm-ai-attachment" id="pm-ai-attachment" hidden></div>' +
              '<details class="pm-ai-provider"><summary>' + icon("settings") + '<span>Server-bridge</span><b id="pm-ai-provider-state">' + esc(provider.enabled ? "aan" : "uit") + '</b></summary><div class="pm-ai-provider__grid"><label>Endpoint<input id="pm-ai-endpoint" type="text" value="' + esc(provider.endpoint || aiDefaultEndpoint()) + '"></label><label class="pm-ai-toggle"><input id="pm-ai-provider-enabled" type="checkbox"' + (provider.enabled ? " checked" : "") + '><span>Server gebruiken</span></label><button type="button" class="btn btn--ghost btn--sm" id="pm-ai-save-provider">' + icon("save") + 'Opslaan</button></div></details>' +
            '</section>' +
            '<aside class="pm-ai-rail">' +
              '<div class="pm-ai-context" id="pm-ai-context"></div>' +
              '<div class="pm-ai__preview" id="pm-ai-preview"><div class="pm-ai-plan__empty"><b>Geen voorstel actief</b><p class="muted">Stuur een bericht om een nieuw voorstel te maken.</p></div></div>' +
              '<div class="pm-ai-recent" id="pm-ai-recent"></div>' +
            '</aside>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    var currentPlan = null;
    var uploadedData = null;
    var history = aiHistory();
    var thread = ov.querySelector("#pm-ai-thread");
    var preview = ov.querySelector("#pm-ai-preview");
    var cmd = ov.querySelector("#pm-ai-cmd");
    var applyBtn = ov.querySelector("#pm-ai-apply");
    var sendBtn = ov.querySelector("#pm-ai-send");
    var attach = ov.querySelector("#pm-ai-attachment");
    var modebar = ov.querySelector("#pm-ai-modebar");
    var suggestionsWrap = ov.querySelector("#pm-ai-suggestions");
    var contextPanel = ov.querySelector("#pm-ai-context");
    var recentPanel = ov.querySelector("#pm-ai-recent");
    if (!history.length) {
      history = [aiMessage("assistant", "Kies een werkmodus en beschrijf wat er op deze pagina moet gebeuren. Ik maak eerst een voorstel met pagina, stappen en terugdraai-optie.", { source: "local" })];
      aiSaveHistory(history);
    }
    aiRenderThread(thread, history);
    aiRenderContext(contextPanel, aiContext(), provider, currentMode);
    aiRenderRecent(recentPanel);
    function renderModebar() {
      modebar.querySelectorAll("[data-ai-mode]").forEach(function (btn) {
        var active = btn.getAttribute("data-ai-mode") === currentMode;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
    }
    function renderSuggestions() {
      suggestions = aiSuggestionPrompts(currentMode);
      suggestionsWrap.innerHTML = suggestions.map(function (s, i) {
        return '<button type="button" class="pm-ai-suggestion" data-ai-suggestion="' + i + '">' + icon(s.icon || "layers") + '<span>' + esc(s.label) + '</span></button>';
      }).join("");
      suggestionsWrap.querySelectorAll("[data-ai-suggestion]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var item = suggestions[Number(btn.getAttribute("data-ai-suggestion"))] || null;
          if (!item) return;
          cmd.value = item.prompt;
          submitPrompt();
        });
      });
    }
    renderSuggestions();
    function setBusy(on) {
      sendBtn.disabled = !!on;
      sendBtn.innerHTML = on ? icon("clock") + "Werkt..." : icon("arrowRight") + "Voorstel";
    }
    function setPlan(plan) {
      currentPlan = plan;
      aiRenderPlan(preview, plan);
      applyBtn.disabled = !(plan && plan.ops && plan.ops.length);
      aiRenderContext(contextPanel, aiContext(), aiProviderConfig(), currentMode);
    }
    function addAndRender(msg) {
      history.push(msg);
      aiSaveHistory(history);
      aiRenderThread(thread, history);
      aiRenderRecent(recentPanel);
    }
    function submitPrompt() {
      var command = cmd.value.trim();
      if (!command) return;
      cmd.value = "";
      setPlan(null);
      addAndRender(aiMessage("user", command));
      setBusy(true);
      aiProviderRequest(command, uploadedData, history, currentMode).then(function (providerResult) {
        var result = providerResult || aiLocalAnswer(command, uploadedData, currentMode);
        var source = result.source === "provider" ? "provider" : "local";
        var plan = aiBuildPlan(result.actions, uploadedData, command, result.notes, { plan: result.plan, mode: result.mode || currentMode, confidence: result.confidence });
        setPlan(plan);
        addAndRender(aiMessage("assistant", result.reply, {
          source: source,
          actions: plan.ops.map(function (o) { return o.label; })
        }));
      }).catch(function (err) {
        var result = aiLocalAnswer(command, uploadedData, currentMode);
        result.reply += "\n\nDe server-bridge reageerde niet, daarom heb ik lokaal alvast een voorstel gemaakt.";
        var plan = aiBuildPlan(result.actions, uploadedData, command, result.notes, { plan: result.plan, mode: result.mode || currentMode, confidence: result.confidence });
        setPlan(plan);
        addAndRender(aiMessage("assistant", result.reply, {
          source: "local",
          error: err && err.message,
          actions: plan.ops.map(function (o) { return o.label; })
        }));
      }).finally(function () {
        setBusy(false);
      });
    }
    modebar.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest("[data-ai-mode]");
      if (!btn) return;
      currentMode = aiSaveMode(btn.getAttribute("data-ai-mode"));
      cmd.placeholder = aiModeConfig(currentMode).placeholder;
      renderModebar();
      renderSuggestions();
      setPlan(null);
      aiRenderContext(contextPanel, aiContext(), aiProviderConfig(), currentMode);
      aiRenderRecent(recentPanel);
    });
    recentPanel.addEventListener("click", function (e) {
      var reuse = e.target.closest && e.target.closest("[data-ai-reuse]");
      if (reuse) {
        var msg = aiHistory().find(function (m) { return m.id === reuse.getAttribute("data-ai-reuse"); });
        if (msg) {
          cmd.value = msg.content || "";
          cmd.focus();
        }
        return;
      }
      var restore = e.target.closest && e.target.closest("[data-ai-restore]");
      if (!restore || !(window.PM_VERSIONS && PM_VERSIONS.restore)) return;
      var id = restore.getAttribute("data-ai-restore");
      var row = PM_VERSIONS.list().find(function (v) { return v.id === id; }) || null;
      var run = function () {
        var ok = PM_VERSIONS.restore(id);
        if (!ok) { toast("Kon wijziging niet terugdraaien"); return; }
        if (row && row.type === "page" && window.PM_PAGE_EDITS && PM_PAGE_EDITS.apply) PM_PAGE_EDITS.apply();
        if (window.PM_CMS && row && row.type === "cms") PM_CMS.apply();
        toast("Wijziging teruggedraaid");
        aiFlushAdminChanges().then(function (saved) { if (saved) toast("Terugdraaiing centraal opgeslagen"); });
        addAndRender(aiMessage("assistant", "Teruggedraaid via versiegeschiedenis: " + ((row && ((row.meta && row.meta.label) || row.subject)) || id), { source: "local" }));
        aiRenderRecent(recentPanel);
        setPlan(null);
      };
      if (window.PM_confirm) PM_confirm("Deze wijziging terugdraaien?", run, { ok: "Terugdraaien", cancel: "Annuleren" });
      else run();
    });
    ov.querySelector("#pm-ai-save-provider").addEventListener("click", function () {
      var cfg = aiSaveProvider({
        endpoint: ov.querySelector("#pm-ai-endpoint").value.trim() || aiDefaultEndpoint(),
        enabled: ov.querySelector("#pm-ai-provider-enabled").checked
      });
      ov.querySelector("#pm-ai-provider-state").textContent = cfg.enabled ? "aan" : "uit";
      provider = cfg;
      aiRenderContext(contextPanel, aiContext(), cfg, currentMode);
      toast("Server-bridge opgeslagen");
    });
    var fileInput = ov.querySelector("#pm-ai-file");
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      aiReadFile(f, function (data) {
        uploadedData = data;
        if (!f) return;
        attach.hidden = false;
        attach.innerHTML = /^data:image\//.test(data || "")
          ? '<span>' + icon("image") + esc(f.name) + '</span><img src="' + data + '" alt="">'
          : '<span>' + icon("paperclip") + esc(f.name) + '</span>';
        addAndRender(aiMessage("system", "Bijlage gekoppeld: " + f.name));
      });
    });
    ov.querySelectorAll("[data-ai-close]").forEach(function (b) { b.addEventListener("click", closeAiCoder); });
    ov.querySelector("#pm-ai-send").addEventListener("click", submitPrompt);
    cmd.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submitPrompt();
    });
    ov.querySelector("#pm-ai-clear").addEventListener("click", function () {
      history = [aiMessage("assistant", "Nieuwe chat gestart.", { source: "local" })];
      aiSaveHistory(history);
      uploadedData = null;
      attach.hidden = true;
      attach.innerHTML = "";
      fileInput.value = "";
      setPlan(null);
      aiRenderThread(thread, history);
      aiRenderRecent(recentPanel);
    });
    applyBtn.addEventListener("click", function () {
      if (!currentPlan || !currentPlan.ops.length) return;
      var apply = function () {
        currentPlan.ops.forEach(function (o) { o.apply(); });
        toast("Builder heeft de wijziging toegepast");
        aiFlushAdminChanges().then(function (saved) {
          if (saved) toast("Wijziging centraal opgeslagen");
        });
        addAndRender(aiMessage("assistant", "Toegepast op pagina: " + (currentPlan.page || aiPageLabel()) + ". De wijziging staat nu in de portal, wordt centraal gesynchroniseerd en is opgenomen in de versiegeschiedenis.", { source: "local" }));
        aiRenderRecent(recentPanel);
        setPlan(null);
      };
      if (currentPlan.structural && window.PM_confirm) PM_confirm("Deze wijziging past de structuur van de portal aan. Toepassen?", apply, { ok: "Toepassen", cancel: "Annuleren" });
      else apply();
    });
    setTimeout(function () { cmd.focus(); }, 30);
  }
  window.PM_AI_CODER = {
    open: openAiCoder,
    close: closeAiCoder,
    plan: aiPlan,
    ask: function (command, uploadedData, mode) { return aiProviderRequest(command, uploadedData, aiHistory(), mode || aiMode()).then(function (res) { return res || aiLocalAnswer(command, uploadedData, mode || aiMode()); }).catch(function () { return aiLocalAnswer(command, uploadedData, mode || aiMode()); }); },
    context: aiContext,
    mode: { get: aiMode, set: aiSaveMode, all: function () { return AI_MODES.slice(); } },
    provider: { get: aiProviderConfig, save: aiSaveProvider }
  };

  /* ---------------- SHELL BUILDER ---------------- */
  var currentPage = null;

  function buildShell(page) {
    currentPage = page;
    const user = getUser() || { name: "Partner", role: "", company: "" };

    // Skip-to-content link + main landmark (accessibility)
    var skip = document.querySelector(".skip-link");
    if (!skip) {
      document.body.insertAdjacentHTML("afterbegin", '<a class="skip-link" href="#pm-main">' + esc(t("ui.skip")) + '</a>');
    } else {
      skip.textContent = t("ui.skip");
    }
    const mainEl = document.querySelector("main.content");
    if (mainEl && !mainEl.id) { mainEl.id = "pm-main"; mainEl.setAttribute("tabindex", "-1"); }
    const initials = esc((user.name || "P").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase());

    /* Sidebar */
    const sb = document.getElementById("pm-sidebar");
    if (sb) {
      let nav = "";
      var navConfig = NAV.slice();
      var customPages = window.PM_CUSTOM_PAGES ? PM_CUSTOM_PAGES.list().filter(function (p) {
        if ((p.status || "published") !== "published") return false;
        if (isAdminUser(user) || !p.groups || !p.groups.length) return true;
        return p.groups.indexOf(normalizeRole(user.role, user.email)) > -1;
      }) : [];
      if (customPages.length) {
        navConfig.push({
          label: "Landingspagina's",
          items: customPages.map(function (p) {
            return { id: "custom-page", label: p.title || "Landingspagina", href: "page.html?id=" + encodeURIComponent(p.id), icon: "fileText", pageId: p.id };
          })
        });
      }
      navConfig.forEach(g => {
        var items = g.items.filter(function (it) {
          return (it.id !== "admin" || isAdminUser(user)) && (!window.PM_GROUPS || PM_GROUPS.canPage(it.id, user));
        });
        if (!items.length) return;
        nav += '<div class="nav-group"><div class="nav-group__label">' + esc(g.label || t(g.key)) + '</div>';
        items.forEach(it => {
          const active = (page === it.id || (page === "product" && it.id === "products") || (page === "article" && it.id === "knowledge") || (page === "campaign" && it.id === "campaigns")) ? " active" : "";
          var itemBadge = it.badge || "";
          if (it.id === "admin" && isAdminUser(user) && window.PM_ADMIN_NOTICES) {
            var navNotices = PM_ADMIN_NOTICES.counts();
            itemBadge = navNotices.total ? String(navNotices.total) : itemBadge;
          }
          var badgeClass = it.id === "admin" && itemBadge ? " nav-badge--alert" : "";
          nav += '<a class="nav-item' + active + '" href="' + it.href + '"' + (active ? ' aria-current="page"' : '') + '>' + icon(it.icon) +
                 '<span>' + esc(it.label || t("nav." + it.id)) + '</span>' + (itemBadge ? '<span class="nav-badge' + badgeClass + '">' + esc(itemBadge) + '</span>' : '') + '</a>';
        });
        nav += '</div>';
      });
      sb.className = "sidebar";
      sb.innerHTML =
        '<a class="sidebar__brand" href="dashboard.html"><img src="assets/img/logo/logo-green.png" alt="PlasmaMade" width="150" height="32"></a>' +
        '<nav class="sidebar__nav" aria-label="' + esc(t("ui.mainNav")) + '">' + nav + '</nav>' +
        '<div class="sidebar__foot"><div class="help-card"><h4>' + esc(t("ui.help")) + '</h4><p>' + esc(t("ui.helpText")) + '</p><a href="support.html">' + esc(t("ui.helpLink")) + '</a></div></div>';
    }

    /* Topbar */
    const tb = document.getElementById("pm-topbar");
    if (tb) {
      tb.className = "topbar";
      const title = window.PM_PAGE_TITLE_OVERRIDE || (PAGE_TITLE_KEY[page] ? t(PAGE_TITLE_KEY[page]) : "Partner Center");
      const crumb = PAGE_GROUP_KEY[page] ? t(PAGE_GROUP_KEY[page]) : "PlasmaMade Partner Center";
      const cur = window.PM_I18N.meta(window.PM_lang());
      const adminNotice = isAdminUser(user) && window.PM_ADMIN_NOTICES ? PM_ADMIN_NOTICES.counts() : { total: 0 };
      const noticeLabel = adminNotice.total
        ? "Adminmeldingen: " + adminNotice.total + " open"
        : "Adminmeldingen";
      const adminBtns = isAdminUser(user)
        ? '<a class="icon-btn pm-admin-notice" href="admin.html#account-requests" title="' + esc(noticeLabel) + '" aria-label="' + esc(noticeLabel) + '">' + icon(adminNotice.total ? "bellRing" : "bell") + (adminNotice.total ? '<span class="pm-admin-notice__count">' + esc(adminNotice.total) + '</span>' : '') + '</a>' +
          '<button class="icon-btn" id="pm-edit-page" type="button" title="Pagina bewerken" aria-label="Pagina bewerken" aria-pressed="false">' + icon("edit") + '</button>' +
          '<button class="icon-btn" id="pm-ai-coder-open" type="button" title="PlasmaMade Builder" aria-label="PlasmaMade Builder">' + icon("settings") + '</button>'
        : '';
      tb.innerHTML =
        '<button class="icon-btn hamburger" id="pm-burger" type="button" aria-label="' + esc(t("ui.menu")) + '" aria-expanded="false" aria-controls="pm-sidebar">' + icon("menu") + '</button>' +
        '<div class="topbar__title"><div class="crumb">' + esc(crumb) + '</div><h1>' + esc(title) + '</h1></div>' +
        '<button class="topbar__search" id="pm-search-open" type="button" aria-label="' + esc(t("ui.search")) + '">' + icon("search") +
          '<span style="flex:1;text-align:left;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(t("ui.search")) + '</span>' +
          '<kbd>Ctrl K</kbd></button>' +
        '<div class="topbar__actions">' +
          adminBtns +
          '<div class="lang-wrap"><button class="icon-btn lang-btn" id="pm-lang" type="button" title="' + esc(t("ui.lang")) + '" aria-label="' + esc(t("ui.lang")) + ': ' + esc(cur.name) + '" aria-haspopup="menu" aria-expanded="false" aria-controls="pm-lang-menu">' + icon("globe") + '<span class="lang-code">' + esc(cur.code.toUpperCase()) + '</span></button>' +
            '<div class="lang-menu" id="pm-lang-menu" role="menu" aria-label="' + esc(t("ui.lang")) + '">' +
              window.PM_I18N.langs.map(l =>
                '<button type="button" role="menuitemradio" aria-checked="' + (l.code === cur.code) + '" data-lang="' + l.code + '" class="' + (l.code === cur.code ? "active" : "") + '" lang="' + l.code + '"><span class="lang-code-tag">' + esc(l.code.toUpperCase()) + '</span>' + esc(l.name) + (l.code === cur.code ? icon("check") : '') + '</button>'
              ).join("") +
              '<div class="lang-note">' + esc(t("ui.langNote")) + '</div>' +
            '</div></div>' +
          '<a class="icon-btn" href="news.html" title="' + esc(t("nav.news")) + '" aria-label="' + esc(t("nav.news")) + '">' + icon("bell") + '</a>' +
          '<div class="user-wrap">' +
            '<a class="user-chip" id="pm-user" href="account.html" aria-label="' + esc(t("ui.myAccount")) + '">' +
              '<div class="avatar" aria-hidden="true">' + avatarHtml(user) + '</div>' +
              '<div class="user-chip__txt"><div class="u-name">' + esc(user.name || "Partner") + '</div><div class="u-role">' + esc(t(roleKey(user.role)) || user.role || "Partner") + '</div></div>' +
            '</a>' +
            '<button class="icon-btn user-menu-toggle" id="pm-user-menu-toggle" type="button" aria-label="' + esc(t("ui.accountMenu")) + '" aria-haspopup="menu" aria-expanded="false" aria-controls="pm-user-menu">' + icon("chevronRight") + '</button>' +
            '<div class="user-menu" id="pm-user-menu" role="menu" aria-label="' + esc(t("ui.accountMenu")) + '">' +
              '<a class="user-menu__head" href="account.html" role="menuitem">' +
                '<span class="avatar avatar--lg" aria-hidden="true">' + avatarHtml(user) + '</span>' +
                '<span class="user-menu__id"><b>' + esc(user.name || "Partner") + '</b><span>' + esc(user.email || t(roleKey(user.role)) || "Partner") + '</span></span>' +
              '</a>' +
              '<a class="user-menu__item" href="account.html" role="menuitem">' + icon("user") + '<span>' + esc(t("ui.myAccount")) + '</span></a>' +
              '<a class="user-menu__item" href="account.html#prefs" role="menuitem">' + icon("settings") + '<span>' + esc(t("ui.preferences")) + '</span></a>' +
              '<a class="user-menu__item" href="support.html" role="menuitem">' + icon("lifebuoy") + '<span>' + esc(t("ui.helpSupport")) + '</span></a>' +
              '<div class="user-menu__sep"></div>' +
              '<button class="user-menu__item user-menu__item--danger" id="pm-logout" type="button" role="menuitem">' + icon("logout") + '<span>' + esc(t("ui.logoutBtn")) + '</span></button>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    /* Footer */
    const ft = document.getElementById("pm-footer");
    if (ft) {
      ft.className = "site-footer";
      ft.innerHTML =
        '<div style="border-top:1px solid var(--line);background:var(--surface);padding:22px 34px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;color:var(--muted);font-size:12.5px">' +
          '<div style="display:flex;align-items:center;gap:12px"><img src="assets/img/logo/logo-green.png" alt="PlasmaMade" style="height:22px" width="103" height="22"><span>© ' + (new Date().getFullYear()) + ' PlasmaMade B.V. — Partner Center</span></div>' +
          '<div style="display:flex;gap:18px;flex-wrap:wrap"><span><i>breathe better, live better.</i></span><a href="mailto:marketing@plasmamade.com" class="green">marketing@plasmamade.com</a><a href="https://plasmamade.com" target="_blank" rel="noopener noreferrer" class="green">plasmamade.com</a></div>' +
        '</div>';
    }

    wireShell();
  }

  /* Rol → vertaalsleutel (rollen worden als code opgeslagen bij login) */
  function roleKey(role) {
    var map = { dealer: "role.dealer", distributor: "role.distributor", installer: "role.installer", studio: "role.studio", retailpartner: "role.retailpartner", international: "role.international", marketing: "role.marketing", agent: "role.agent", partner: "role.partner", support: "role.support", internal: "role.internal", admin: "role.internal" };
    return map[role] || "";
  }
  window.PM_roleKey = roleKey;

  function wireShell() {
    /* Mobiele navigatie met overlay + scroll lock */
    const burger = document.getElementById("pm-burger");
    function setNav(open) {
      document.body.classList.toggle("nav-open", open);
      if (burger) burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open && window.innerWidth <= 1024 ? "hidden" : "";
    }
    if (burger) burger.addEventListener("click", function (e) { e.stopPropagation(); setNav(!document.body.classList.contains("nav-open")); });
    document.addEventListener("click", e => {
      if (document.body.classList.contains("nav-open")) {
        const sbEl = document.querySelector(".sidebar");
        if (sbEl && !sbEl.contains(e.target) && !e.target.closest("#pm-burger")) setNav(false);
      }
    });

    /* Gebruikersmenu (account / voorkeuren / uitloggen) */
    const userChip = document.getElementById("pm-user"), userMenuToggle = document.getElementById("pm-user-menu-toggle"), userMenu = document.getElementById("pm-user-menu");
    if (userMenuToggle && userMenu) {
      const setUserOpen = function (open) {
        userMenu.classList.toggle("open", open);
        userMenuToggle.setAttribute("aria-expanded", String(open));
      };
      if (userChip) userChip.addEventListener("click", function () { setUserOpen(false); });
      userMenuToggle.addEventListener("click", function (e) { e.stopPropagation(); setUserOpen(!userMenu.classList.contains("open")); });
      userMenu.addEventListener("click", function (e) { e.stopPropagation(); });
      document.addEventListener("click", function () { setUserOpen(false); });
      userMenuToggle.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); setUserOpen(true); var f = userMenu.querySelector(".user-menu__item"); if (f) f.focus(); }
      });
      userMenu.addEventListener("keydown", function (e) { if (e.key === "Escape") { setUserOpen(false); userMenuToggle.focus(); } });
      const lo = document.getElementById("pm-logout");
      if (lo) lo.addEventListener("click", function () {
        setUserOpen(false);
        confirmDialog(t("ui.logoutConfirm"), logout, { ok: t("ui.logoutBtn"), cancel: t("common.cancel") });
      });
    }

    const so = document.getElementById("pm-search-open");
    if (so) so.addEventListener("click", openSearch);
    const editPage = document.getElementById("pm-edit-page");
    if (editPage) editPage.addEventListener("click", function () {
      setPageEditMode(!document.body.classList.contains("pm-edit-mode"));
    });
    const aiCoder = document.getElementById("pm-ai-coder-open");
    if (aiCoder) aiCoder.addEventListener("click", function () {
      if (window.PM_AI_CODER) PM_AI_CODER.open();
    });

    /* Taalmenu: muis + toetsenbord */
    const lb = document.getElementById("pm-lang"), lm = document.getElementById("pm-lang-menu");
    if (lb && lm) {
      function setOpen(open) {
        lm.classList.toggle("open", open);
        lb.setAttribute("aria-expanded", String(open));
        if (open) {
          var act = lm.querySelector("button.active") || lm.querySelector("button");
          if (act) act.focus();
        }
      }
      lb.addEventListener("click", e => { e.stopPropagation(); setOpen(!lm.classList.contains("open")); });
      lm.addEventListener("click", e => e.stopPropagation());
      document.addEventListener("click", () => setOpen(false));
      lm.addEventListener("keydown", function (e) {
        var items = Array.prototype.slice.call(lm.querySelectorAll("[data-lang]"));
        var idx = items.indexOf(document.activeElement);
        if (e.key === "ArrowDown") { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
        else if (e.key === "Home") { e.preventDefault(); items[0].focus(); }
        else if (e.key === "End") { e.preventDefault(); items[items.length - 1].focus(); }
        else if (e.key === "Escape") { setOpen(false); lb.focus(); }
      });
      lm.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
        setOpen(false);
        window.PM_setLang(b.getAttribute("data-lang"));
      }));
    }
  }

  /* Herbouw shell na taalwissel (aangeroepen door i18n.js) */
  window.PM_rebuildShell = function () {
    if (currentPage && currentPage !== "login") {
      window.PM_PAGE_TITLE_OVERRIDE = null; // pagina-init zet zo nodig opnieuw
      buildShell(currentPage);
      searchIndexLang = null; // zoekindex opnieuw opbouwen in nieuwe taal
    }
  };

  /* ---------------- GLOBAL SEARCH (meertalig) ---------------- */
  let searchIndex = null, searchIndexLang = null;

  function fold(s) {
    s = (s == null ? "" : String(s)).toLowerCase();
    try { s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch (e) {}
    return s;
  }

  function buildIndex() {
    var lang = window.PM_lang();
    if (searchIndex && searchIndexLang === lang) return searchIndex;
    const D = window.PM_DATA, idx = [], lc = window.PM_lc;
    if (!D) return [];
    D.products.forEach(p => {
      var type = lc("products", p.id, "type", p.type), tag = lc("products", p.id, "tagline", p.tagline);
      idx.push({ t: p.name, s: type, g: t("nav.products"), href: "product.html?id=" + p.id, ic: "box", kw: fold(p.name + " " + p.type + " " + type + " " + tag + " " + p.tagline) });
    });
    D.articles.forEach(a => {
      var title = lc("articles", a.id, "title", a.title), cat = window.PM_dict("categories", a.category);
      idx.push({ t: title, s: cat, g: t("nav.knowledge"), href: "article.html?id=" + a.id, ic: "book", kw: fold(title + " " + a.title + " " + cat + " " + a.excerpt + " " + lc("articles", a.id, "excerpt", "")) });
    });
    D.campaigns.forEach(c => {
      var title = lc("campaigns", c.id, "title", c.title);
      idx.push({ t: title, s: window.PM_dict("audiences", c.audience), g: t("nav.campaigns"), href: "campaign.html?id=" + c.id, ic: "megaphone", kw: fold(title + " " + c.title + " " + c.core + " " + c.audience) });
    });
    D.marketing.forEach(m => {
      var title = lc("marketing", m.id, "title", m.title);
      idx.push({ t: title, s: window.PM_dict("categories", m.category), g: t("nav.marketing"), href: "marketing.html?focus=" + m.id, ic: "image", kw: fold(title + " " + m.title + " " + m.category + " " + m.product + " " + (m.desc || "")) });
    });
    D.downloads.forEach(d => {
      var title = lc("downloads", d.id, "title", d.title);
      idx.push({ t: title, s: window.PM_dict("categories", d.cat) + " · " + d.type, g: t("nav.downloads"), href: "downloads.html?focus=" + d.id, ic: "download", kw: fold(title + " " + d.title + " " + d.cat + " " + d.product) });
    });
    D.news.forEach(n => {
      var title = lc("news", n.id, "title", n.title);
      idx.push({ t: title, s: window.PM_dict("categories", n.category), g: t("nav.news"), href: "news.html?id=" + n.id, ic: "newspaper", kw: fold(title + " " + n.title + " " + n.excerpt) });
    });
    (D.videos || []).forEach(v => {
      var title = lc("videos", v.id, "title", v.title);
      idx.push({ t: title, s: window.PM_dict("topics", v.topic) + " · " + v.product, g: t("nav.videos"), href: "videos.html?focus=" + v.id, ic: "play", kw: fold(title + " " + v.title + " " + v.product + " " + v.topic + " " + v.desc) });
    });
    (D.testdocs || []).forEach(td => {
      var title = lc("testdocs", td.id, "title", td.title);
      idx.push({ t: title, s: window.PM_dict("categories", td.category) + " · " + td.product, g: t("nav.testdocs"), href: "testdocuments.html?focus=" + td.id, ic: "shieldCheck", kw: fold(title + " " + td.title + " " + td.product + " " + td.category + " " + td.conclusion) });
    });
    idx.push({ t: t("nav.brand"), s: "Logo, kleurgebruik, tone of voice, claims", g: t("grp.fb"), href: "brand-guidelines.html", ic: "shieldCheck", kw: fold("brand guidelines huisstijl logo kleur typografie tone of voice claims PlasmaMade") });
    if (window.PM_PHRASES) {
      PM_PHRASES.active().forEach(function (p) {
        idx.push({ t: p.text, s: (p.category || "Standaardzin") + " - " + (p.product || "Merk algemeen"), g: t("nav.studio"), href: "studio.html", ic: "type", kw: fold(p.text + " " + p.category + " " + p.product + " standaardzin tekstblok") });
      });
    }
    idx.push({ t: t("nav.designs"), s: "Opgeslagen ontwerpen, status, feedback en goedkeuring", g: t("grp.ms"), href: "designs.html", ic: "palette", kw: fold("mijn opgeslagen ontwerpen design status feedback goedkeuring afgewezen aanpassing nodig") });
    searchIndex = idx; searchIndexLang = lang;
    return idx;
  }

  function ensureOverlay() {
    var ov = document.getElementById("pm-search-ov");
    if (ov) {
      ov.querySelector("#pm-search-input").setAttribute("placeholder", t("ui.search"));
      return;
    }
    ov = document.createElement("div");
    ov.className = "search-overlay"; ov.id = "pm-search-ov";
    ov.innerHTML =
      '<div class="search-modal" role="dialog" aria-modal="true" aria-label="' + esc(t("ui.search")) + '"><div class="search-modal__in">' + icon("search") +
      '<input type="text" id="pm-search-input" placeholder="' + esc(t("ui.search")) + '" autocomplete="off" aria-label="' + esc(t("ui.search")) + '">' +
      '<span class="esc">ESC</span></div><div class="search-results" id="pm-search-res" role="listbox"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener("click", e => { if (e.target === ov) closeSearch(); });
    document.getElementById("pm-search-input").addEventListener("input", e => runSearch(e.target.value));
  }
  function openSearch() {
    ensureOverlay(); buildIndex();
    document.getElementById("pm-search-ov").classList.add("open");
    runSearch(document.getElementById("pm-search-input").value || "");
    setTimeout(() => document.getElementById("pm-search-input").focus(), 30);
  }
  function closeSearch() {
    const ov = document.getElementById("pm-search-ov");
    if (ov) ov.classList.remove("open");
  }
  function runSearch(q) {
    const res = document.getElementById("pm-search-res");
    const idx = buildIndex();
    var fq = fold((q || "").trim());
    let hits = fq ? idx.filter(x => fq.split(/\s+/).every(term => x.kw.indexOf(term) > -1)) : idx.slice(0, 8);
    if (!hits.length) {
      res.innerHTML = '<div class="search-empty">' + esc(t("ui.noResults")) + ' “' + esc(q) + '”.<br><span class="muted" style="font-size:12.5px">' + esc(t("ui.noResultsHint")) + '</span></div>';
      return;
    }
    const groups = {};
    hits.slice(0, 24).forEach(h => { (groups[h.g] = groups[h.g] || []).push(h); });
    let html = "";
    Object.keys(groups).forEach(g => {
      html += '<div class="sr-group">' + esc(g) + '</div>';
      groups[g].forEach(h => {
        html += '<a class="sr-item" href="' + esc(h.href) + '"><div class="sr-ico">' + icon(h.ic) + '</div>' +
                '<div><h5>' + esc(h.t) + '</h5><p>' + esc(h.s) + '</p></div><span class="sr-tag">' + esc(t("common.open")) + '</span></a>';
      });
    });
    res.innerHTML = html;
  }
  window.PM_openSearch = openSearch;

  /* ---------------- ANALYTICS (client-side, voor beheerderspagina) ---------------- */
  function track(event, label) {
    try {
      const a = JSON.parse(localStorage.getItem("pm_analytics") || "{}");
      a.events = a.events || {}; a.events[event] = (a.events[event] || 0) + 1;
      if (label) { a.byLabel = a.byLabel || {}; a.byLabel[event] = a.byLabel[event] || {}; a.byLabel[event][label] = (a.byLabel[event][label] || 0) + 1; }
      a.recent = a.recent || []; a.recent.unshift({ event, label: label || "", t: Date.now() }); a.recent = a.recent.slice(0, 50);
      const day = new Date().toISOString().slice(0, 10);
      a.daily = a.daily || {}; a.daily[day] = (a.daily[day] || 0) + 1;
      localStorage.setItem("pm_analytics", JSON.stringify(a));
    } catch (e) {}
  }
  window.PM_track = track;

  /* Standaard "niet gevonden"-state voor detailpagina's met ongeldige ?id */
  window.PM_notFound = function (rootEl, opts) {
    if (!rootEl) return;
    opts = opts || {};
    rootEl.innerHTML =
      '<a href="' + esc(opts.href || "dashboard.html") + '" class="flex items-center gap green" style="font-weight:700;font-size:13px;margin-bottom:18px"><span style="display:inline-flex;transform:rotate(180deg)">' + icon("arrowRight") + '</span>' + esc(opts.back || t("common.backOverview")) + '</a>' +
      '<div class="empty" style="padding:70px 20px">' + icon("search") +
      '<h4>' + esc(opts.title || t("common.notFound")) + '</h4>' +
      '<p>' + esc(opts.text || t("common.notFoundText")) + '</p>' +
      '<a class="btn btn--primary" href="' + esc(opts.href || "dashboard.html") + '" style="margin-top:16px">' + esc(opts.cta || t("common.backOverview")) + '</a></div>';
  };

  /* ---------------- BOOT ---------------- */
  var booted = false;
  async function boot() {
    if (booted) return;
    booted = true;
    const page = document.body.getAttribute("data-page");
    if (window.PM_SYNC) await PM_SYNC.pull({ quiet: true, timeout: 4500 });
    ensureBootstrapAdminState();
    if (window.PM_PORTAL_SETTINGS) PM_PORTAL_SETTINGS.apply();
    if (window.PM_CMS) PM_CMS.apply();
    // Auth guard (loginpagina is "login")
    if (page !== "login") {
      var authUser = getUser();
      if (!authUser) { location.replace("index.html"); return; }
      var status = approvalStatus(authUser);
      if (status && status !== "approved") {
        location.replace("account-status.html?status=" + encodeURIComponent(status));
        return;
      }
      if (page === "admin" && !isAdminUser(authUser)) { location.replace("dashboard.html"); return; }
      if (!isAdminUser(authUser) && window.PM_GROUPS && !PM_GROUPS.canPage(page, authUser)) { location.replace("dashboard.html?access=denied"); return; }
      buildShell(page);
      track("view", page);
    }
    window.PM_applyI18n();
    if (page !== "login") {
      document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest("a[download]");
        if (a) {
          var f = a.getAttribute("download") || (a.getAttribute("href") || "").split("/").pop() || "bestand";
          track("download", f);
        }
      });
    }
    // Globale sneltoetsen
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (page !== "login") openSearch(); }
      if (e.key === "Escape") { closeSearch(); closeDialog(); }
    });
    if (window.PM_PAGE_INIT) try { window.PM_PAGE_INIT(); } catch (e) { console.error("Page init error:", e); }
    if (window.PM_SYNC && page !== "login" && PM_SYNC.flushDirty) PM_SYNC.flushDirty();
    if (page !== "login") initPageEditor();
    if (page !== "login") {
      document.addEventListener("pm:state-sync", function (ev) {
        if (!ev.detail || ev.detail.source !== "pull") return;
        var designUpdates = Array.isArray(ev.detail.designUpdates) ? ev.detail.designUpdates : [];
        if (designUpdates.length && window.PM_toast) {
          var d = designUpdates[0];
          var label = d.status === "approved" || d.status === "downloaded"
            ? "Ontwerp goedgekeurd"
            : (d.status === "changes_requested" ? "Feedback ontvangen" : (d.status === "rejected" ? "Ontwerp afgewezen" : "Ontwerpstatus bijgewerkt"));
          PM_toast(label + ": " + (d.name || "Ontwerp") + (designUpdates.length > 1 ? " +" + (designUpdates.length - 1) : ""));
        }
        if (!ev.detail.changed) return;
        if (document.hidden) return;
        var active = document.activeElement;
        if (active && /^(INPUT|TEXTAREA|SELECT)$/i.test(active.tagName || "")) return;
        if (window.PM_PORTAL_SETTINGS) PM_PORTAL_SETTINGS.apply();
        if (window.PM_CMS) PM_CMS.apply();
        if (window.PM_rebuildShell) PM_rebuildShell();
        if (window.PM_PAGE_INIT) {
          try { window.PM_PAGE_INIT(); } catch (e) { console.error("Page refresh error:", e); }
        }
        if (window.PM_PAGE_EDITS && PM_PAGE_EDITS.apply) PM_PAGE_EDITS.apply();
      });
    }
    if (window.PM_SYNC && page !== "login") PM_SYNC.startAutoRefresh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
