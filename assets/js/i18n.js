/* ============================================================
   PlasmaMade Partner Center — i18n runtime
   - 15 interfacetalen, Nederlands (nl) is bron- en fallbacktaal
   - Woordenboeken staan in assets/i18n/<code>.js en registreren
     zichzelf op window.PM_LOCALES[<code>] = { name, ui, content }
   - Taalkeuze: ?lang= → localStorage("pm_lang") → nl
   - Live wisselen zonder reload: PM_setLang() laadt het
     taalbestand on demand en rendert shell + pagina opnieuw.
   ============================================================ */
(function () {
  "use strict";

  var LANGS = [
    { code: "nl", name: "Nederlands", intl: "nl-NL" },
    { code: "en", name: "English", intl: "en-GB" },
    { code: "de", name: "Deutsch", intl: "de-DE" },
    { code: "fr", name: "Français", intl: "fr-FR" },
    { code: "es", name: "Español", intl: "es-ES" },
    { code: "it", name: "Italiano", intl: "it-IT" },
    { code: "pt", name: "Português", intl: "pt-PT" },
    { code: "tr", name: "Türkçe", intl: "tr-TR" },
    { code: "da", name: "Dansk", intl: "da-DK" },
    { code: "sv", name: "Svenska", intl: "sv-SE" },
    { code: "no", name: "Norsk", intl: "nb-NO" },
    { code: "fi", name: "Suomi", intl: "fi-FI" },
    { code: "pl", name: "Polski", intl: "pl-PL" },
    { code: "cs", name: "Čeština", intl: "cs-CZ" },
    { code: "sl", name: "Slovenščina", intl: "sl-SI" }
  ];
  var DEFAULT = "nl";
  var STORE_KEY = "pm_lang";

  window.PM_LOCALES = window.PM_LOCALES || {};

  function isValid(code) {
    return LANGS.some(function (l) { return l.code === code; });
  }

  /* Bepaal actieve taal: querystring wint, daarna opgeslagen voorkeur. */
  function resolveLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q) {
      q = String(q).toLowerCase().slice(0, 5);
      if (q === "us") q = "en"; // legacy code uit eerdere versie
      if (isValid(q)) {
        try { localStorage.setItem(STORE_KEY, q); } catch (e) {}
        return q;
      }
    }
    var s = null;
    try { s = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (s === "us") s = "en";
    return isValid(s) ? s : DEFAULT;
  }

  var active = resolveLang();
  document.documentElement.lang = active;

  function localeOf(code) { return window.PM_LOCALES[code] || null; }
  function meta(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i];
    return LANGS[0];
  }

  /* ---------------- Vertaalfuncties ---------------- */

  function interpolate(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, function (m, k) {
      return Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m;
    });
  }

  /* UI-string: actieve taal → nl → key zelf. */
  function t(key, vars) {
    var loc = localeOf(active), base = localeOf(DEFAULT);
    var v = (loc && loc.ui && loc.ui[key] != null) ? loc.ui[key]
          : (base && base.ui && base.ui[key] != null) ? base.ui[key]
          : null;
    if (v == null) {
      if (window.console && active !== DEFAULT) console.warn("[i18n] ontbrekende sleutel:", key, "(" + active + ")");
      v = (base && base.ui && base.ui[key] != null) ? base.ui[key] : key;
    }
    return interpolate(v, vars);
  }

  /* Content-overlay: vertaalde dynamische content (data.js blijft NL-bron).
     PM_lc("products", "guc1223", "tagline", p.tagline)
     id == null → de sectie zelf is het object (bijv. "sales"). */
  function lc(section, id, field, fallback) {
    var loc = localeOf(active);
    if (loc && loc.content && loc.content[section]) {
      var entry = (id == null) ? loc.content[section] : loc.content[section][id];
      if (entry && entry[field] != null) return entry[field];
    }
    return fallback;
  }

  /* Vertaal een spec-label of spec-waarde via globale woordenlijsten. */
  function dict(listName, value) {
    if (value == null) return value;
    var loc = localeOf(active);
    if (loc && loc.content && loc.content[listName] && loc.content[listName][value] != null) {
      return loc.content[listName][value];
    }
    return value;
  }

  /* ---------------- Intl-formattering ---------------- */

  function intlTag() { return meta(active).intl; }

  function fmtDate(iso, opts) {
    try {
      var d = (iso instanceof Date) ? iso : new Date(String(iso).length <= 10 ? iso + "T00:00:00" : iso);
      return new Intl.DateTimeFormat(intlTag(), opts || { day: "numeric", month: "short", year: "numeric" }).format(d);
    } catch (e) { return String(iso); }
  }
  function fmtMonth(iso) {
    try {
      var d = new Date(String(iso).length <= 10 ? iso + "T00:00:00" : iso);
      return new Intl.DateTimeFormat(intlTag(), { month: "short" }).format(d);
    } catch (e) { return ""; }
  }
  function fmtNum(n, opts) {
    try { return new Intl.NumberFormat(intlTag(), opts || {}).format(n); }
    catch (e) { return String(n); }
  }
  /* "2,5 MB" / "456 KB" uit data → gelokaliseerde decimaal */
  function fmtSize(s) {
    if (s == null) return "";
    return String(s).replace(/(\d+),(\d+)/, function (m, a, b) {
      return fmtNum(parseFloat(a + "." + b), { maximumFractionDigits: 1 });
    });
  }

  /* ---------------- Taal wisselen (zonder reload) ---------------- */

  var loading = {};
  function loadLocale(code, done) {
    if (localeOf(code)) { done(true); return; }
    if (loading[code]) { loading[code].push(done); return; }
    loading[code] = [done];
    var s = document.createElement("script");
    s.src = "assets/i18n/" + code + ".js";
    s.onload = function () {
      var cbs = loading[code]; delete loading[code];
      cbs.forEach(function (cb) { cb(!!localeOf(code)); });
    };
    s.onerror = function () {
      var cbs = loading[code]; delete loading[code];
      cbs.forEach(function (cb) { cb(false); });
    };
    document.head.appendChild(s);
  }

  function applyI18n(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    scope.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    scope.querySelectorAll("[data-i18n-al]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-al"))); });
    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) { el.setAttribute("title", t(el.getAttribute("data-i18n-title"))); });
    scope.querySelectorAll("[data-i18n-alt]").forEach(function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });
  }

  function rerender() {
    document.documentElement.lang = active;
    applyI18n();
    if (typeof window.PM_rebuildShell === "function") window.PM_rebuildShell();
    if (typeof window.PM_PAGE_INIT === "function") {
      try { window.PM_PAGE_INIT(); } catch (e) { if (window.console) console.error("Pagina-herrender na taalwissel mislukt:", e); }
    }
    if (window.PM_PAGE_EDITS && typeof window.PM_PAGE_EDITS.apply === "function") window.PM_PAGE_EDITS.apply();
    try { document.dispatchEvent(new CustomEvent("pm:langchange", { detail: { lang: active } })); } catch (e) {}
  }

  function setLang(code) {
    if (!isValid(code) || code === active) return;
    loadLocale(code, function (ok) {
      if (!ok && code !== DEFAULT) {
        if (window.PM_toast) window.PM_toast(t("ui.langLoadError"));
        return;
      }
      active = code;
      try { localStorage.setItem(STORE_KEY, code); } catch (e) {}
      if (window.PM_track) window.PM_track("lang", code);
      rerender();
    });
  }

  /* ---------------- Export ---------------- */
  window.PM_I18N = {
    langs: LANGS,
    default: DEFAULT,
    active: function () { return active; },
    meta: meta,
    locale: localeOf,
    intl: intlTag
  };
  window.PM_t = t;
  window.PM_lc = lc;
  window.PM_dict = dict;
  window.PM_lang = function () { return active; };
  window.PM_setLang = setLang;
  window.PM_applyI18n = applyI18n;
  window.PM_fmtDate = fmtDate;
  window.PM_fmtMonth = fmtMonth;
  window.PM_fmtNum = fmtNum;
  window.PM_fmtSize = fmtSize;

  /* Synchronous load van basistaal (nl) + actieve taal, vóór data.js/app.js.
     document.write is hier bewust: parser-blocking zodat PM_t direct werkt
     zonder build-stap. */
  /* eslint-disable no-document-write */
  document.write('<script src="assets/i18n/nl.js"><\/script>');
  if (active !== DEFAULT) document.write('<script src="assets/i18n/' + active + '.js"><\/script>');
})();
