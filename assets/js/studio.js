/* ============================================================
   PlasmaMade Partner Center — Design Studio
   - Vaste huisstijl-templates · multi-select · drag & drop · rotatie
   - Slimme uitlijnhulplijnen · zoom · lagen · meerdere pagina's
   - Ongedaan maken/opnieuw · autosave · uploads · beeldfilters
   - Opslaan/openen (localStorage) · export PNG/JPG/PDF (offline)
   - Beschermde huisstijl: brand-kleuren, Libre Franklin, echte assets
   ============================================================ */
var PMStudio = (function () {
  "use strict";

  /* i18n: UI-strings via PM_t (assets/js/i18n.js), datalabels via PM_dict.
     Valt terug op de NL-bron wanneer i18n (nog) niet geladen is. */
  function T(key, vars) { return window.PM_t ? window.PM_t(key, vars) : key; }
  function DL(list, value) { return window.PM_dict ? window.PM_dict(list, value) : value; }

  /* ================= Brand palette (PROTECTED) ================= */
  var COLORS = ["#13A538", "#0c7026", "#0d1117", "#1c2530", "#5c6873", "#ececec", "#f4f6f8", "#ffffff", "#e7f6ec", "#f2fbf5"];

  /* ================= Formats ================= */
  var FORMATS = {
    "ig-square":   { label: "Social vierkant · 1080×1080", w: 1080, h: 1080 },
    "ig-story":    { label: "Story / Reel · 1080×1920", w: 1080, h: 1920 },
    "li-post":     { label: "LinkedIn post · 1200×628", w: 1200, h: 628 },
    "fb-post":     { label: "Facebook · 1200×630", w: 1200, h: 630 },
    "flyer-a4":    { label: "Flyer A4 · 794×1123", w: 794, h: 1123 },
    "poster":      { label: "Poster · 1080×1350", w: 1080, h: 1350 },
    "product-card":{ label: "Productkaart · 1080×1080", w: 1080, h: 1080 },
    "dealer":      { label: "Dealer advertentie · 1080×1080", w: 1080, h: 1080 },
    "banner":      { label: "Banner · 1200×300", w: 1200, h: 300 },
    "newsletter":  { label: "Nieuwsbrief header · 1200×500", w: 1200, h: 500 },
    "presentation":{ label: "Presentatie 16:9 · 1280×720", w: 1280, h: 720 },
    "custom":      { label: "Aangepast…", w: 1080, h: 1080 }
  };

  /* ================= Asset library ================= */
  var ASSETS = {
    logos: [
      { src: "assets/img/logo/logo-white.png", label: "Logo wit" },
      { src: "assets/img/logo/logo-green.png", label: "Logo groen" },
      { src: "assets/img/logo/logo-black.png", label: "Logo zwart" }
    ],
    products: [
      { src: "assets/img/products/guc1223.png", label: "GUC1223" },
      { src: "assets/img/products/guc1212.png", label: "GUC1212" },
      { src: "assets/img/products/guc1323.png", label: "GUC1323" },
      { src: "assets/img/products/guc1214.png", label: "GUC1214" },
      { src: "assets/img/products/guc1314.png", label: "GUC1314" },
      { src: "assets/img/ultrafine/ultrafine.jpg", label: "AirClean UltraFine" },
      { src: "assets/img/ultrafine/esp.png", label: "GUC4184 ESP" },
      { src: "assets/img/products/table-air-cleaner.png", label: "Table Air Cleaner" }
    ],
    photos: [
      { src: "assets/img/lifestyle/kitchen-grandma.jpg", label: "Keuken" },
      { src: "assets/img/lifestyle/butterflies-kitchen.jpg", label: "Vlinders & keuken" },
      { src: "assets/img/lifestyle/integrale-afzuiging.jpg", label: "Integrale afzuiging" },
      { src: "assets/img/lifestyle/kookplaat.jpg", label: "Kookplaat" },
      { src: "assets/img/lifestyle/afzuigkap.jpg", label: "Afzuigkap" },
      { src: "assets/img/lifestyle/efilter-explained.jpg", label: "E-Filter uitleg" },
      { src: "assets/img/lifestyle/hero-girl.png", label: "Lifestyle meisje" },
      { src: "assets/img/ultrafine/kantoor.jpg", label: "Kantoor" },
      { src: "assets/img/ultrafine/school.jpg", label: "School" },
      { src: "assets/img/ultrafine/zorg.jpg", label: "Zorg" },
      { src: "assets/img/ultrafine/horeca.jpg", label: "Horeca" },
      { src: "assets/img/ultrafine/sport.jpg", label: "Sport" },
      { src: "assets/img/ultrafine/ultrafine-space.jpg", label: "UltraFine ruimte" },
      { src: "assets/img/ultrafine/ultrafine-dishwasher.jpg", label: "ESP-module reinigen" }
    ],
    decor: [
      { src: "assets/img/lifestyle/butterflies.png", label: "Vlinders (transp.)" }
    ]
  };
  var ASSET_LABELS = {};
  Object.keys(ASSETS).forEach(function (k) { ASSETS[k].forEach(function (a) { ASSET_LABELS[a.src] = a.label; }); });

  var SHAPE_NAMES = { pill: "Pill / badge", rect: "Rechthoek", ellipse: "Ovaal", triangle: "Driehoek", star: "Ster", line: "Lijn", fade: "Groene afloop" };
  var TRIANGLE_PTS = [[50, 0], [100, 100], [0, 100]];
  var STAR_PTS = [[50, 0], [61.8, 35.3], [98.1, 35.3], [68.7, 57.6], [79.4, 91.6], [50, 70.9], [20.6, 91.6], [31.3, 57.6], [1.9, 35.3], [38.2, 35.3]];

  /* ================= Element factories ================= */
  var uid = 0;
  function nid() { return "e" + (++uid) + "_" + (Date.now() % 100000); }
  function txt(o) { return Object.assign({ id: nid(), type: "text", x: 80, y: 80, w: 600, text: "Tekst", size: 48, weight: 700, color: "#0d1117", align: "left", italic: false, underline: false, lh: 1.18, ls: 0, shadow: false, rot: 0, opacity: 1 }, o); }
  function img(o) { return Object.assign({ id: nid(), type: "image", x: 100, y: 100, w: 320, h: 320, src: "", fit: "contain", radius: 0, rot: 0, opacity: 1, flipH: false, flipV: false, filters: null }, o); }
  function shp(o) { return Object.assign({ id: nid(), type: "shape", shape: "pill", x: 80, y: 80, w: 260, h: 70, color: "#13A538", text: "", textColor: "#ffffff", size: 28, rot: 0, opacity: 1, strokeW: 0, strokeColor: "#0d1117", radius: 6 }, o); }
  function fade(o) { return Object.assign({ id: nid(), type: "shape", shape: "fade", dir: "bottom", x: 0, y: 0, w: 1080, h: 540, color: "#13A538", opacity: 1, rot: 0 }, o); }

  /* ================= Colour helpers ================= */
  function hexToRgb(h) { h = (h || "#13A538").replace("#", ""); if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join(""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; }
  function rgba(h, a) { var c = hexToRgb(h); return "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")"; }
  function fadeCss(el) {
    var c = el.color || "#13A538", t = rgba(c, 0);
    if (el.dir === "corner") return "radial-gradient(125% 115% at 0% 100%, " + c + ", " + t + " 62%)";
    if (el.dir === "diagonal") return "linear-gradient(135deg, " + c + ", " + t + " 78%)";
    if (el.dir === "top") return "linear-gradient(to bottom, " + c + ", " + t + ")";
    return "linear-gradient(to top, " + c + ", " + t + ")";
  }
  function bgCss(bg) {
    if (!bg) return "#ffffff";
    if (bg.type === "grad") return "linear-gradient(135deg,#16b03d 0%,#0c7026 100%)";
    if (bg.type === "greenfade-bottom") return "linear-gradient(to top, " + rgba("#13A538", 0.9) + ", " + rgba("#13A538", 0) + " 58%), #ffffff";
    if (bg.type === "greenfade-corner") return "radial-gradient(120% 110% at 0% 100%, " + rgba("#13A538", 0.95) + ", " + rgba("#13A538", 0) + " 60%), #ffffff";
    if (bg.type === "image") return "#fff url('" + bg.value + "') center/cover no-repeat";
    return bg.value || "#ffffff";
  }

  var L = { white: "assets/img/logo/logo-white.png", green: "assets/img/logo/logo-green.png", black: "assets/img/logo/logo-black.png" };
  var P = { p1223: "assets/img/products/guc1223.png", p1323: "assets/img/products/guc1323.png", uf: "assets/img/ultrafine/ultrafine.jpg" };
  var PH = { oma: "assets/img/lifestyle/kitchen-grandma.jpg", vl: "assets/img/lifestyle/butterflies-kitchen.jpg", kantoor: "assets/img/ultrafine/kantoor.jpg" };
  var DEC = "assets/img/lifestyle/butterflies.png";

  /* ================= Templates (huisstijl) ================= */
  var TEMPLATES = [
    { id: "blank", name: "Leeg canvas", cat: "Basis", format: "ig-square",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [] }; } },
    { id: "social-getfresh", name: "Get fresh! — social", cat: "Social media", format: "ig-square",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 80, y: 80, w: 300, h: 64, fit: "contain" }),
        txt({ text: "Koken zonder\nde geuren.", x: 80, y: 280, w: 620, size: 86, weight: 800, color: "#ffffff" }),
        txt({ text: "Schone lucht. Geen filter wisselen, 10 tot 15 jaar lang.", x: 80, y: 530, w: 520, size: 30, weight: 500, color: "#ffffff" }),
        shp({ shape: "pill", text: "Get fresh!", x: 80, y: 640, w: 300, h: 86, color: "#ffffff", textColor: "#0c7026", size: 42 }),
        img({ src: P.p1223, x: 660, y: 360, w: 360, h: 600, fit: "contain" }),
        txt({ text: "plasmamade.com", x: 80, y: 980, w: 500, size: 34, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "social-afloop", name: "Get fresh! — groene afloop", cat: "Social media", format: "ig-square",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        fade({ dir: "bottom", x: 0, y: 520, w: 1080, h: 560, color: "#13A538" }),
        img({ src: L.green, x: 80, y: 80, w: 300, h: 64, fit: "contain" }),
        txt({ text: "Schone lucht.\nElke dag.", x: 80, y: 210, w: 640, size: 84, weight: 800, color: "#0d1117" }),
        txt({ text: "Geuren, fijnstof en virussen — tot 98% gefilterd.", x: 80, y: 440, w: 560, size: 30, weight: 500, color: "#1c2530" }),
        shp({ shape: "pill", text: "Get fresh!", x: 80, y: 560, w: 300, h: 84, color: "#ffffff", textColor: "#0c7026", size: 40 }),
        img({ src: P.p1223, x: 640, y: 440, w: 380, h: 600, fit: "contain" }),
        txt({ text: "plasmamade.com", x: 80, y: 990, w: 500, size: 32, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "social-product", name: "Productintroductie", cat: "Social media", format: "ig-square",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        img({ src: L.green, x: 80, y: 80, w: 280, h: 60, fit: "contain" }),
        shp({ shape: "pill", text: "Nieuw", x: 80, y: 175, w: 180, h: 56, color: "#13A538", textColor: "#ffffff", size: 26 }),
        txt({ text: "GUC1223 E-Filter", x: 80, y: 270, w: 600, size: 64, weight: 800, color: "#0d1117" }),
        txt({ text: "Verwijdert geuren, fijnstof, virussen\nen pollen — tot 98% gefilterd.", x: 80, y: 380, w: 560, size: 30, weight: 500, color: "#1c2530" }),
        img({ src: P.p1223, x: 620, y: 300, w: 400, h: 640, fit: "contain" }),
        txt({ text: "plasmamade.com", x: 80, y: 980, w: 400, size: 32, weight: 700, color: "#13A538" })
      ] }; } },
    { id: "story-lifestyle", name: "Story — lifestyle", cat: "Social media", format: "ig-story",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        img({ src: PH.vl, x: 0, y: 0, w: 1080, h: 1180, fit: "cover" }),
        shp({ shape: "rect", x: 0, y: 980, w: 1080, h: 940, color: "#0c7026", radius: 0 }),
        img({ src: L.white, x: 90, y: 1060, w: 320, h: 68, fit: "contain" }),
        txt({ text: "Adem vrij\nbinnen.", x: 90, y: 1200, w: 700, size: 96, weight: 800, color: "#ffffff" }),
        txt({ text: "Filter de lente buiten — pollen en\nallergenen uit je lucht.", x: 90, y: 1480, w: 760, size: 34, weight: 500, color: "#ffffff" }),
        shp({ shape: "pill", text: "Get fresh!", x: 90, y: 1640, w: 320, h: 92, color: "#ffffff", textColor: "#0c7026", size: 44 }),
        txt({ text: "plasmamade.com", x: 90, y: 1800, w: 500, size: 36, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "li-post", name: "LinkedIn — B2B", cat: "Social media", format: "li-post",
      build: function () { return { bg: { type: "color", value: "#ececec" }, elements: [
        shp({ shape: "rect", x: 0, y: 0, w: 720, h: 628, color: "#ffffff", radius: 0 }),
        img({ src: L.green, x: 60, y: 56, w: 250, h: 54, fit: "contain" }),
        txt({ text: "Cleanroomkwaliteit.\nZonder de cleanroom.", x: 60, y: 170, w: 600, size: 50, weight: 800, color: "#0d1117" }),
        txt({ text: "AirClean UltraFine — tot 98% minder virussen\nen bacteriën. Getest door Interflow.", x: 60, y: 360, w: 600, size: 26, weight: 500, color: "#1c2530" }),
        txt({ text: "plasmamade.com", x: 60, y: 540, w: 400, size: 26, weight: 700, color: "#13A538" }),
        img({ src: P.uf, x: 760, y: 60, w: 380, h: 508, fit: "contain" })
      ] }; } },
    { id: "flyer", name: "Flyer / cover A4", cat: "Print", format: "flyer-a4",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        img({ src: L.green, x: 60, y: 60, w: 280, h: 60, fit: "contain" }),
        img({ src: PH.oma, x: 197, y: 180, w: 400, h: 400, fit: "cover", radius: 200 }),
        img({ src: DEC, x: 90, y: 230, w: 200, h: 200, fit: "contain" }),
        txt({ text: "Schone lucht\nbegint thuis.", x: 60, y: 640, w: 680, size: 64, weight: 800, color: "#0d1117", align: "center" }),
        txt({ text: "Geen geuren. Geen fijnstof. Geen afvoer naar buiten.", x: 60, y: 800, w: 674, size: 26, weight: 500, color: "#1c2530", align: "center" }),
        shp({ shape: "pill", text: "Get fresh!", x: 277, y: 880, w: 240, h: 76, color: "#13A538", textColor: "#ffffff", size: 36 }),
        txt({ text: "plasmamade.com", x: 60, y: 1050, w: 674, size: 30, weight: 700, color: "#13A538", align: "center" })
      ] }; } },
    { id: "product-card", name: "Productkaart", cat: "Sales", format: "product-card",
      build: function () { return { bg: { type: "color", value: "#f4f6f8" }, elements: [
        shp({ shape: "rect", x: 60, y: 60, w: 960, h: 960, color: "#ffffff", radius: 6 }),
        img({ src: L.green, x: 110, y: 110, w: 250, h: 54, fit: "contain" }),
        img({ src: P.p1323, x: 560, y: 200, w: 420, h: 620, fit: "contain" }),
        txt({ text: "GUC1323", x: 110, y: 240, w: 420, size: 70, weight: 800, color: "#0d1117" }),
        txt({ text: "Plat E-Filter voor kookplaten met\ngeïntegreerde afzuiging.", x: 110, y: 350, w: 420, size: 28, weight: 500, color: "#1c2530" }),
        txt({ text: "• 1.000 m³/h\n• 10–15 jaar levensduur\n• CE · UKCA · ROHS · RED\n• Geen afvoer nodig", x: 110, y: 520, w: 420, size: 30, weight: 600, color: "#13A538" }),
        txt({ text: "plasmamade.com", x: 110, y: 920, w: 400, size: 30, weight: 700, color: "#13A538" })
      ] }; } },
    { id: "dealer", name: "Dealer advertentie", cat: "Sales", format: "dealer",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 80, y: 80, w: 280, h: 60, fit: "contain" }),
        shp({ shape: "pill", text: "Dealer info", x: 80, y: 200, w: 280, h: 80, color: "#ffffff", textColor: "#0c7026", size: 34 }),
        txt({ text: "Schone lucht\nin elke keuken.", x: 80, y: 320, w: 640, size: 82, weight: 800, color: "#ffffff" }),
        txt({ text: "Vraag naar de juiste PlasmaMade-oplossing\nvoor uw situatie.", x: 80, y: 700, w: 620, size: 30, weight: 500, color: "#ffffff" }),
        img({ src: P.p1223, x: 700, y: 480, w: 320, h: 520, fit: "contain" }),
        txt({ text: "plasmamade.com", x: 80, y: 980, w: 400, size: 32, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "banner", name: "Web banner", cat: "Digitaal", format: "banner",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 50, y: 40, w: 240, h: 52, fit: "contain" }),
        txt({ text: "Schone lucht. Altijd.", x: 50, y: 140, w: 600, size: 52, weight: 800, color: "#ffffff" }),
        txt({ text: "plasmamade.com", x: 50, y: 230, w: 400, size: 26, weight: 700, color: "#ffffff" }),
        shp({ shape: "pill", text: "Get fresh!", x: 760, y: 110, w: 230, h: 76, color: "#ffffff", textColor: "#0c7026", size: 36 }),
        img({ src: P.p1223, x: 1020, y: 20, w: 170, h: 270, fit: "contain" })
      ] }; } },
    { id: "newsletter", name: "Nieuwsbrief header", cat: "Digitaal", format: "newsletter",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        shp({ shape: "rect", x: 0, y: 0, w: 1200, h: 500, color: "#ececec", radius: 0 }),
        img({ src: DEC, x: 820, y: 60, w: 340, h: 340, fit: "contain" }),
        img({ src: L.green, x: 70, y: 70, w: 280, h: 60, fit: "contain" }),
        txt({ text: "PlasmaMade\nPartner Update", x: 70, y: 180, w: 700, size: 64, weight: 800, color: "#0d1117" }),
        txt({ text: "Het laatste nieuws, materiaal en updates.", x: 70, y: 380, w: 600, size: 28, weight: 500, color: "#1c2530" })
      ] }; } },
    { id: "presentation", name: "Presentatie — titel", cat: "Presentatie", format: "presentation",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 80, y: 80, w: 300, h: 64, fit: "contain" }),
        txt({ text: "Clean Air Technology", x: 80, y: 280, w: 900, size: 78, weight: 800, color: "#ffffff" }),
        txt({ text: "E-Filters voor afzuigkappen, kookplaten en ruimtes.", x: 80, y: 420, w: 900, size: 32, weight: 500, color: "#ffffff" }),
        txt({ text: "breathe better, live better.", x: 80, y: 600, w: 700, size: 30, weight: 500, color: "#ffffff", italic: true })
      ] }; } },
    { id: "facebook-post", name: "Facebook post", cat: "Social media", format: "fb-post",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        shp({ shape: "rect", x: 0, y: 0, w: 600, h: 630, color: "#ececec", radius: 0 }),
        img({ src: L.green, x: 56, y: 54, w: 230, h: 50, fit: "contain" }),
        txt({ text: "Schone lucht,\nzonder gedoe.", x: 56, y: 150, w: 500, size: 52, weight: 800, color: "#0d1117" }),
        txt({ text: "Geen filter wisselen, 10 tot 15 jaar lang.", x: 56, y: 340, w: 480, size: 26, weight: 500, color: "#1c2530" }),
        txt({ text: "plasmamade.com", x: 56, y: 540, w: 400, size: 26, weight: 700, color: "#13A538" }),
        img({ src: P.p1223, x: 640, y: 70, w: 380, h: 500, fit: "contain" })
      ] }; } },
    { id: "poster-actie", name: "Poster", cat: "Print", format: "poster",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 80, y: 80, w: 300, h: 64, fit: "contain" }),
        txt({ text: "Adem het\nverschil.", x: 80, y: 250, w: 900, size: 110, weight: 800, color: "#ffffff" }),
        txt({ text: "Tot 98% van virussen, fijnstof en pollen — gefilterd.", x: 80, y: 560, w: 720, size: 34, weight: 500, color: "#ffffff" }),
        img({ src: P.p1223, x: 600, y: 700, w: 420, h: 600, fit: "contain" }),
        shp({ shape: "pill", text: "Get fresh!", x: 80, y: 720, w: 320, h: 92, color: "#ffffff", textColor: "#0c7026", size: 44 }),
        txt({ text: "plasmamade.com", x: 80, y: 1250, w: 500, size: 36, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "email-header", name: "E-mailheader", cat: "Digitaal", format: "newsletter",
      build: function () { return { bg: { type: "grad" }, elements: [
        img({ src: L.white, x: 70, y: 70, w: 280, h: 60, fit: "contain" }),
        txt({ text: "Nieuws van PlasmaMade", x: 70, y: 200, w: 760, size: 58, weight: 800, color: "#ffffff" }),
        txt({ text: "breathe better, live better.", x: 70, y: 300, w: 500, size: 26, weight: 500, color: "#ffffff", italic: true }),
        img({ src: DEC, x: 850, y: 80, w: 320, h: 320, fit: "contain" })
      ] }; } },
    { id: "campagne-getfresh", name: "Campagnebeeld", cat: "Campagne", format: "ig-square",
      build: function () { return { bg: { type: "color", value: "#ffffff" }, elements: [
        img({ src: PH.vl, x: 0, y: 0, w: 1080, h: 700, fit: "cover" }),
        shp({ shape: "rect", x: 0, y: 660, w: 1080, h: 420, color: "#ffffff", radius: 0 }),
        img({ src: L.green, x: 80, y: 730, w: 280, h: 60, fit: "contain" }),
        txt({ text: "Filter de lente buiten.", x: 80, y: 830, w: 820, size: 58, weight: 800, color: "#0d1117" }),
        txt({ text: "Pollen en allergenen uit je lucht.", x: 80, y: 920, w: 700, size: 30, weight: 500, color: "#1c2530" }),
        txt({ text: "plasmamade.com", x: 80, y: 1000, w: 400, size: 30, weight: 700, color: "#13A538" })
      ] }; } },
    { id: "website-hero", name: "Websitebeeld — hero", cat: "Digitaal", format: "presentation",
      build: function () { return { bg: { type: "color", value: "#f4f6f8" }, elements: [
        shp({ shape: "rect", x: 0, y: 0, w: 1280, h: 720, color: "#ffffff", radius: 0 }),
        img({ src: L.green, x: 90, y: 90, w: 280, h: 60, fit: "contain" }),
        txt({ text: "Schone lucht\nbegint thuis.", x: 90, y: 230, w: 640, size: 76, weight: 800, color: "#0d1117" }),
        txt({ text: "PlasmaMade E-Filters reinigen je binnenlucht volledig — zonder afvoer naar buiten.", x: 90, y: 450, w: 560, size: 26, weight: 500, color: "#1c2530" }),
        shp({ shape: "pill", text: "Get fresh!", x: 90, y: 570, w: 240, h: 76, color: "#13A538", textColor: "#ffffff", size: 34 }),
        img({ src: P.p1223, x: 770, y: 130, w: 420, h: 560, fit: "contain" })
      ] }; } },
    { id: "award-social", name: "Plus X Award — social", cat: "Campagne", format: "ig-square",
      build: function () { return { bg: { type: "greenfade-corner", value: "#ffffff" }, elements: [
        img({ src: L.green, x: 80, y: 80, w: 280, h: 60, fit: "contain" }),
        shp({ shape: "pill", text: "Plus X Award 2025", x: 80, y: 180, w: 420, h: 72, color: "#13A538", textColor: "#ffffff", size: 30 }),
        txt({ text: "Vijf keer\nbekroond.", x: 80, y: 300, w: 700, size: 92, weight: 800, color: "#0d1117" }),
        txt({ text: "Innovation · High Quality · Functionality ·\nErgonomics · Ecology", x: 80, y: 560, w: 660, size: 27, weight: 600, color: "#0c7026" }),
        img({ src: P.p1223, x: 660, y: 520, w: 360, h: 520, fit: "contain" }),
        txt({ text: "plasmamade.com", x: 80, y: 990, w: 460, size: 32, weight: 700, color: "#0c7026" })
      ] }; } },
    { id: "story-product", name: "Story — product", cat: "Social media", format: "ig-story",
      build: function () { return { bg: { type: "greenfade-bottom", value: "#ffffff" }, elements: [
        img({ src: L.green, x: 90, y: 110, w: 320, h: 68, fit: "contain" }),
        txt({ text: "Het vlaggenschip.", x: 90, y: 250, w: 800, size: 70, weight: 800, color: "#0d1117" }),
        txt({ text: "GUC1223 E-Filter — schone lucht\nin elke keuken.", x: 90, y: 370, w: 760, size: 34, weight: 500, color: "#1c2530" }),
        img({ src: P.p1223, x: 240, y: 560, w: 600, h: 900, fit: "contain" }),
        shp({ shape: "pill", text: "Get fresh!", x: 90, y: 1620, w: 320, h: 92, color: "#ffffff", textColor: "#0c7026", size: 44 }),
        txt({ text: "plasmamade.com", x: 90, y: 1790, w: 500, size: 36, weight: 700, color: "#ffffff" })
      ] }; } },
    { id: "li-proof", name: "LinkedIn — bewijs (Interflow)", cat: "Social media", format: "li-post",
      build: function () { return { bg: { type: "color", value: "#0d1117" }, elements: [
        img({ src: L.white, x: 60, y: 56, w: 250, h: 54, fit: "contain" }),
        txt({ text: "Zo goed als HEPA.", x: 60, y: 170, w: 760, size: 56, weight: 800, color: "#ffffff" }),
        txt({ text: "Onafhankelijk getest door Interflow (2024):\ndeeltjesreductie nagenoeg gelijk aan een HEPA-filter — R² = 0,996.", x: 60, y: 290, w: 740, size: 25, weight: 500, color: "#ececec" }),
        shp({ shape: "pill", text: "AirClean UltraFine", x: 60, y: 470, w: 370, h: 64, color: "#13A538", textColor: "#ffffff", size: 26 }),
        img({ src: P.uf, x: 880, y: 60, w: 300, h: 508, fit: "contain" })
      ] }; } },
    { id: "product-card-uf", name: "Productkaart — UltraFine", cat: "Sales", format: "product-card",
      build: function () { return { bg: { type: "color", value: "#f4f6f8" }, elements: [
        shp({ shape: "rect", x: 60, y: 60, w: 960, h: 960, color: "#ffffff", radius: 6 }),
        img({ src: L.green, x: 110, y: 110, w: 250, h: 54, fit: "contain" }),
        img({ src: P.uf, x: 600, y: 200, w: 400, h: 640, fit: "contain" }),
        txt({ text: "AirClean\nUltraFine", x: 110, y: 230, w: 460, size: 62, weight: 800, color: "#0d1117" }),
        txt({ text: "Professionele luchtzuivering\nvoor 20–150 m².", x: 110, y: 400, w: 440, size: 27, weight: 500, color: "#1c2530" }),
        txt({ text: "• Tot 98% virussen & bacteriën\n• Tot 85% minder fijnstof\n• Cleanroomprincipes (ISO 6/7)\n• Geen wegwerpfilters", x: 110, y: 540, w: 460, size: 27, weight: 600, color: "#13A538" }),
        txt({ text: "plasmamade.com", x: 110, y: 920, w: 400, size: 30, weight: 700, color: "#0c7026" })
      ] }; } }
  ];

  /* ================= State ================= */
  function newPage(bg) { return { bg: bg || { type: "color", value: "#ffffff" }, elements: [] }; }
  var state = {
    id: null, name: T("studio.nameDefault"), format: "ig-square",
    customSize: { w: 1080, h: 1080 },
    pages: [newPage()], page: 0,
    sel: [], zoom: null, tab: "templates", editing: null,
    status: "draft", feedback: "", ownerEmail: ""
  };
  var ratios = {};       // image natural ratios
  var clipboard = [];    // internal element clipboard
  var undoStack = [], redoStack = [];
  var pageThumbs = [];   // dataURLs per page index
  var fitScale = 1;

  function cur() { return state.pages[state.page]; }
  function els() { return cur().elements; }
  function fmt() {
    if (state.format === "custom") return { label: "Aangepast", w: state.customSize.w, h: state.customSize.h };
    return FORMATS[state.format];
  }
  function selEls() { return state.sel.map(function (id) { return els().find(function (e) { return e.id === id; }); }).filter(Boolean); }
  function statusText(status) {
    var map = (window.PM_DESIGNS && PM_DESIGNS.labels) || { draft: "Concept", submitted: "Ingediend", in_review: "In beoordeling", approved: "Goedgekeurd", rejected: "Afgewezen", changes_requested: "Aanpassing nodig", downloaded: "Gedownload" };
    return map[status || "draft"] || status || "Concept";
  }
  function renderStatus() {
    var el = $("st-status");
    if (!el) return;
    var status = state.status || "draft";
    var cls = status === "approved" || status === "downloaded" ? " ok" : (status === "draft" ? "" : " warn");
    el.className = "st-status" + cls;
    el.innerHTML = '<i></i><span>' + PM_escape(statusText(status)) + '</span>';
    var detail = $("st-status-detail");
    if (detail) {
      var saved = state.id && window.PM_DESIGNS ? PM_DESIGNS.get(state.id) : null;
      var feedback = (saved && saved.feedback) || state.feedback || "";
      var date = (saved && (saved.feedbackAt || saved.rejectedAt || saved.approvedAt || saved.reviewedAt || saved.submittedAt || saved.updated)) || "";
      var title = statusText(status);
      var body = "";
      var tone = "";
      if (status === "draft") body = "Concept. Dien je ontwerp in zodra het klaar is voor controle door PlasmaMade.";
      if (status === "submitted") { title = "Aangevraagd"; body = "Je ontwerp is aangevraagd en wacht op beoordeling door PlasmaMade."; tone = "warn"; }
      if (status === "in_review") { title = "In beoordeling"; body = "PlasmaMade bekijkt je ontwerp. Je ontvangt hier feedback of goedkeuring."; tone = "warn"; }
      if (status === "approved") { body = "Goedgekeurd voor gebruik. Exporteren is beschikbaar."; }
      if (status === "downloaded") { body = "Goedgekeurd en gedownload. Je kunt de goedgekeurde versie opnieuw exporteren."; }
      if (status === "rejected") { body = feedback ? "Reden: " + feedback : "Dit ontwerp is afgewezen. Er is geen reden ingevuld."; tone = "bad"; }
      if (status === "changes_requested") { title = "Aanpassing nodig"; body = feedback ? "Feedback: " + feedback : "PlasmaMade vraagt om aanpassingen. Er is geen toelichting ingevuld."; tone = "warn"; }
      detail.className = "st-status-detail show" + (tone ? " " + tone : "");
      detail.innerHTML = icn(status === "rejected" ? "alert" : (status === "approved" || status === "downloaded" ? "shieldCheck" : "info")) +
        '<div><b>' + PM_escape(title) + '</b><br>' + PM_escape(body) + (date ? '<br><span>' + PM_escape(new Date(date).toLocaleString(window.PM_I18N ? PM_I18N.intl() : "nl-NL")) + '</span>' : '') + '</div>';
    }
    var ex = $("st-export-btn");
    if (ex) ex.title = status === "approved" || status === "downloaded" ? "Download goedgekeurde versie" : "Download is beschikbaar na goedkeuring";
  }
  function markDraftAfterEdit() {
    if (["submitted", "in_review", "approved", "rejected", "changes_requested", "downloaded"].indexOf(state.status || "draft") === -1) return;
    state.status = "draft";
    state.feedback = "";
    renderStatus();
  }

  /* ================= DOM refs ================= */
  var $ = function (id) { return document.getElementById(id); };
  var surface, stage, wrap;

  /* ================= Text measuring ================= */
  var measureCtx = document.createElement("canvas").getContext("2d");
  function fontStr(el) { return (el.italic ? "italic " : "") + el.weight + " " + el.size + "px 'Libre Franklin', sans-serif"; }
  function wrapText(ctx, el) {
    ctx.font = fontStr(el);
    try { ctx.letterSpacing = (el.ls || 0) + "px"; } catch (e) {}
    var out = [];
    String(el.text || "").split("\n").forEach(function (para) {
      var words = para.split(" "), line = "";
      words.forEach(function (w) {
        var test = line ? line + " " + w : w;
        if (ctx.measureText(test).width > el.w && line) { out.push(line); line = w; }
        else line = test;
      });
      out.push(line);
    });
    return out;
  }
  function measureTextH(el) {
    var lines = wrapText(measureCtx, el);
    return Math.max(el.size * (el.lh || 1.18), Math.round(lines.length * el.size * (el.lh || 1.18)));
  }
  function elH(el) {
    if (el.type !== "text") return el.h;
    var node = surface && surface.querySelector('[data-id="' + el.id + '"]');
    return node ? node.offsetHeight : measureTextH(el);
  }
  function bounds(el) { return { x: el.x, y: el.y, w: el.w, h: elH(el) }; }
  function selBounds() {
    var list = selEls(); if (!list.length) return null;
    var x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    list.forEach(function (el) { var b = bounds(el); x1 = Math.min(x1, b.x); y1 = Math.min(y1, b.y); x2 = Math.max(x2, b.x + b.w); y2 = Math.max(y2, b.y + b.h); });
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
  }

  /* ================= Init ================= */
  function init() {
    surface = $("st-surface"); stage = $("st-stage"); wrap = $("st-canvas-wrap");
    fillToolbarIcons();
    buildFormatSelect();
    bindBar();
    bindZoom();
    bindModals();
    bindContextMenu();
    renderPanelTabs();

    // Deep-link: ?template=<id> + optional ?product=<id>; anders autosave herstellen
    var designParam = (typeof PM_param === "function") ? PM_param("design") : null;
    var tplParam = (typeof PM_param === "function") ? PM_param("template") : null;
    var prodParam = (typeof PM_param === "function") ? PM_param("product") : null;
    var restored = false;
    if (designParam && getDesigns().some(function (d) { return d.id === designParam; })) {
      doOpen(designParam);
      restored = true;
    } else if (tplParam && TEMPLATES.some(function (t) { return t.id === tplParam; })) {
      loadTemplate(tplParam);
      if (prodParam && window.PM_DATA) {
        var pp = (PM_DATA.products || []).find(function (p) { return p.id === prodParam; });
        if (pp) {
          els().forEach(function (el) {
            if (el.type === "image" && /\/products\/|\/ultrafine\/ultrafine/.test(el.src)) el.src = pp.image;
          });
          renderCanvas();
        }
      }
    } else {
      restored = restoreAutosave();
      if (!restored) loadTemplate("social-getfresh");
    }
    select([]);
    selectTab("templates");
    renderStatus();
    resetHistory();
    if (restored) PM_toast(T("studio.restored"));

    window.addEventListener("resize", function () { applyView(); });
    document.addEventListener("keydown", onKey);
    bindCanvasPointer();
    loadUploads(); // eigen beelden uit IndexedDB laden (+ migratie van oude localStorage-uploads)
  }

  function fillToolbarIcons() {
    var map = { "st-new": ["plus", T("studio.new")], "st-open": ["folder", T("studio.open")], "st-undo": ["undo", ""], "st-redo": ["redo", ""], "st-preview": ["eye", T("studio.preview")], "st-save": ["save", T("studio.save")], "st-submit": ["check", "Indienen"], "st-zoom-in": ["zoomIn", ""], "st-zoom-out": ["zoomOut", ""], "st-zoom-fit": ["fit", ""], "st-shortcuts": ["help", ""] };
    Object.keys(map).forEach(function (id) {
      var b = $(id); if (b) b.innerHTML = icn(map[id][0]) + (map[id][1] || "");
    });
    document.querySelectorAll(".st-modal__close").forEach(function (b) { b.innerHTML = icn("x"); });
    var ex = $("st-export-btn"); if (ex) ex.innerHTML = icn("download") + T("studio.export") + " " + icn("chevDown");
    var exKeys = { png: "studio.exportPng", png3x: "studio.exportPng3x", jpg: "studio.exportJpg", pdf: "studio.exportPdf", clip: "studio.exportClip" };
    document.querySelectorAll("#st-export-menu [data-fmt]").forEach(function (b) {
      var k = b.getAttribute("data-fmt");
      b.innerHTML = icn(k === "clip" ? "clip" : "download") + T(exKeys[k] || k);
    });
  }

  /* Eigen iconenset (aanvulling op PM_ICON) */
  var ICONS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    undo: '<path d="M3 7v6h6M21 17a9 9 0 0 0-15-6.7L3 13"/>',
    redo: '<path d="M21 7v6h-6M3 17a9 9 0 0 1 15-6.7L21 13"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    chevDown: '<path d="M6 9l6 6 6-6"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.6-1.7"/>',
    eyeOff: '<path d="M17.9 17.9A11 11 0 0 1 12 20c-7 0-11-8-11-8a20 20 0 0 1 5.1-5.9M9.9 4.2A11 11 0 0 1 12 4c7 0 11 8 11 8a20 20 0 0 1-3 4.4M1 1l22 22"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    front: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M3 16V5a2 2 0 0 1 2-2h11"/>',
    back: '<rect x="3" y="3" width="13" height="13" rx="2"/><path d="M21 8v11a2 2 0 0 1-2 2H8"/>',
    alignL: '<path d="M4 3v18M8 8h12M8 16h7"/>',
    alignCH: '<path d="M12 3v18M5 8h14M7 16h10"/>',
    alignR: '<path d="M20 3v18M4 8h12M9 16h7"/>',
    alignT: '<path d="M3 4h18M8 8v12M16 8v7"/>',
    alignCV: '<path d="M3 12h18M8 5v14M16 7v10"/>',
    alignB: '<path d="M3 20h18M8 4v12M16 9v7"/>',
    flipH: '<path d="M12 2v20M7 6L3 12l4 6M17 6l4 6-4 6"/>',
    flipV: '<path d="M2 12h20M6 7l6-4 6 4M6 17l6 4 6-4"/>',
    zoomIn: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>',
    zoomOut: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/>',
    fit: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4M12 17.5h.01"/>',
    pageAdd: '<rect x="3" y="4" width="12" height="16" rx="2"/><path d="M19 8v8M15 12h8" transform="translate(-2 0)"/>',
    text: '<path d="M4 7V5h16v2M9 5v14M9 19h6"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
    shape: '<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/>',
    layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.7 0 2.5-1.2 2.5-2.3 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2H17c2.8 0 5-2.2 5-5 0-4.4-4.5-8-10-8z"/>',
    droplet: '<path d="M12 2.7l5.6 6.3a7.5 7.5 0 1 1-11.2 0z"/>',
    move: '<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
    rotate: '<path d="M21 2v6h-6M21 8a9 9 0 1 0 2.5 6"/>',
    star: '<path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2 2 9.4l7-.9z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clip: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    group: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    ungroup: '<path d="M5 7V5a2 2 0 0 1 2-2h2M15 3h2a2 2 0 0 1 2 2v2"/><rect x="3" y="11" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
    crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14"/>',
    more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    distH: '<path d="M3 4v16M21 4v16M8 9h8v6H8z"/>',
    distV: '<path d="M4 3h16M4 21h16M9 8v8h6V8z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>'
  };
  function icn(name, cls) {
    var p = ICONS[name] || (window.PM_ICON ? null : ICONS.shape);
    if (!p && window.PM_ICON) return PM_ICON(name, cls);
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (cls ? ' class="' + cls + '"' : '') + '>' + (p || "") + '</svg>';
  }
  function stPrompt(message, value, onSubmit, opts) {
    if (window.PM_prompt) {
      PM_prompt(message, value, onSubmit, opts || {});
      return;
    }
    var next = prompt(message, value == null ? "" : value);
    if (next !== null) onSubmit(next);
  }

  /* ================= Toolbar ================= */
  function buildFormatSelect() {
    $("st-format").innerHTML = Object.keys(FORMATS).map(function (k) {
      return '<option value="' + k + '">' + DL("studioFormats", FORMATS[k].label) + '</option>';
    }).join("");
    $("st-format").value = state.format;
    function applyFormat(value) {
      state.format = value;
      state.zoom = null;
      applyView(); renderCanvas(); commit();
    }
    $("st-format").addEventListener("change", function () {
      var sel = this;
      if (this.value === "custom") {
        var prev = state.format;
        stPrompt(T("studio.customW"), state.customSize.w, function (wVal) {
          var w = parseInt(wVal, 10);
          if (!w || w < 100 || w > 4000) { sel.value = prev; return; }
          stPrompt(T("studio.customH"), state.customSize.h, function (hVal) {
            var h = parseInt(hVal, 10);
            if (!h || h < 100 || h > 4000) { sel.value = prev; return; }
            state.customSize = { w: w, h: h };
            sel.value = "custom";
            applyFormat("custom");
          }, { ok: "Opslaan" });
        }, { ok: "Volgende" });
        return;
      }
      applyFormat(this.value);
    });
  }

  function bindBar() {
    $("st-name").addEventListener("input", function () { state.name = this.value || T("studio.nameDefault"); });
    $("st-name").addEventListener("change", function () { commit(); });
    $("st-save").addEventListener("click", saveDesign);
    $("st-submit").addEventListener("click", submitDesign);
    $("st-open").addEventListener("click", openModal);
    $("st-preview").addEventListener("click", preview);
    $("st-new").addEventListener("click", function () {
      var doNew = function () { state.id = null; clearAutosave(); loadTemplate("blank"); resetHistory(); };
      if (window.PM_confirm) PM_confirm(T("studio.confirmNew"), doNew);
      else if (confirm(T("studio.confirmNew"))) doNew();
    });
    $("st-undo").addEventListener("click", undo);
    $("st-redo").addEventListener("click", redo);
    $("st-export-btn").addEventListener("click", function (e) { e.stopPropagation(); $("st-export-menu").classList.toggle("open"); });
    document.addEventListener("click", function () { $("st-export-menu").classList.remove("open"); hideContextMenu(); });
    $("st-export-menu").addEventListener("click", function (e) { e.stopPropagation(); });
    document.querySelectorAll("#st-export-menu [data-fmt]").forEach(function (b) {
      b.addEventListener("click", function () { exportAs(b.getAttribute("data-fmt")); $("st-export-menu").classList.remove("open"); });
    });
    $("st-shortcuts").addEventListener("click", function () { $("st-keys-modal").classList.add("open"); });
  }

  /* ================= Zoom / view ================= */
  function computeFit() {
    var f = fmt();
    var s = Math.min((wrap.clientWidth - 70) / f.w, (wrap.clientHeight - 70) / f.h);
    return Math.max(0.05, Math.min(s, 1));
  }
  function curScale() { fitScale = computeFit(); return state.zoom || fitScale; }
  function applyView() {
    var f = fmt(), s = curScale();
    stage.style.width = (f.w * s) + "px";
    stage.style.height = (f.h * s) + "px";
    surface.style.width = f.w + "px";
    surface.style.height = f.h + "px";
    surface.style.transform = "scale(" + s + ")";
    $("st-zoom-val").textContent = Math.round(s * 100) + "%";
  }
  function setZoom(z) { state.zoom = Math.max(0.05, Math.min(4, z)); applyView(); }
  function bindZoom() {
    $("st-zoom-in").addEventListener("click", function () { setZoom(curScale() * 1.2); });
    $("st-zoom-out").addEventListener("click", function () { setZoom(curScale() / 1.2); });
    $("st-zoom-fit").addEventListener("click", function () { state.zoom = null; applyView(); });
    wrap.addEventListener("wheel", function (e) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom(curScale() * (e.deltaY < 0 ? 1.1 : 1 / 1.1));
    }, { passive: false });
  }
  function toCanvas(e) {
    var r = surface.getBoundingClientRect(), s = curScale();
    return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s };
  }

  /* ================= Canvas render (DOM) ================= */
  function renderCanvas() {
    var f = fmt();
    surface.style.background = bgCss(cur().bg);
    surface.innerHTML = "";
    els().forEach(function (el) {
      if (el.hidden) return;
      surface.appendChild(buildNode(el));
    });
    renderSelection();
    renderPagesBar();
    if (state.tab === "layers") renderPanel();
    updateUndoButtons();
  }

  function imgFilterCss(el) {
    var fl = el.filters; if (!fl) return "";
    var parts = [];
    if (fl.br !== 100) parts.push("brightness(" + fl.br / 100 + ")");
    if (fl.ct !== 100) parts.push("contrast(" + fl.ct / 100 + ")");
    if (fl.sa !== 100) parts.push("saturate(" + fl.sa / 100 + ")");
    if (fl.bl > 0) parts.push("blur(" + fl.bl + "px)");
    if (fl.gs > 0) parts.push("grayscale(" + fl.gs / 100 + ")");
    return parts.join(" ");
  }
  function ptsToClip(pts) { return "polygon(" + pts.map(function (p) { return p[0] + "% " + p[1] + "%"; }).join(",") + ")"; }

  function buildNode(el) {
    var node = document.createElement("div");
    node.className = "st-el" + (el.locked ? " locked" : "");
    node.setAttribute("data-id", el.id);
    node.style.left = el.x + "px"; node.style.top = el.y + "px"; node.style.width = el.w + "px";
    if (el.rot) node.style.transform = "rotate(" + el.rot + "deg)";
    if (el.opacity != null && el.opacity !== 1) node.style.opacity = el.opacity;

    if (el.type === "text") {
      node.classList.add("st-text");
      node.style.fontSize = el.size + "px";
      node.style.fontWeight = el.weight;
      node.style.color = el.color;
      node.style.textAlign = el.align;
      node.style.fontStyle = el.italic ? "italic" : "normal";
      node.style.textDecoration = el.underline ? "underline" : "none";
      node.style.lineHeight = String(el.lh || 1.18);
      node.style.letterSpacing = (el.ls || 0) + "px";
      if (el.shadow) node.style.textShadow = "0 2px 8px rgba(0,0,0,.35)";
      node.textContent = el.text;
    } else if (el.type === "image") {
      node.style.height = el.h + "px";
      var im = document.createElement("img");
      im.src = el.src; im.draggable = false;
      var fcss = imgFilterCss(el); if (fcss) im.style.filter = fcss;
      var flips = (el.flipH ? "scaleX(-1) " : "") + (el.flipV ? "scaleY(-1)" : "");
      if (flips) im.style.transform = flips;
      im.onload = function () { if (!ratios[el.id]) ratios[el.id] = im.naturalWidth / im.naturalHeight; };
      if (el.crop) {
        node.style.overflow = "hidden";
        node.style.borderRadius = (el.radius || 0) + "px";
        var cw = el.w / el.crop.sw, ch = el.h / el.crop.sh;
        im.style.position = "absolute"; im.style.maxWidth = "none";
        im.style.width = cw + "px"; im.style.height = ch + "px";
        im.style.left = (-el.crop.sx * cw) + "px"; im.style.top = (-el.crop.sy * ch) + "px";
      } else {
        im.style.width = "100%"; im.style.height = "100%";
        im.style.objectFit = el.fit; im.style.borderRadius = (el.radius || 0) + "px";
      }
      node.appendChild(im);
    } else if (el.type === "shape") {
      node.style.height = el.h + "px";
      if (el.shape === "fade") {
        node.style.background = fadeCss(el);
      } else if (el.shape === "line") {
        node.style.background = el.color;
        node.style.borderRadius = (el.h / 2) + "px";
      } else if (el.shape === "triangle" || el.shape === "star") {
        node.style.background = el.color;
        node.style.clipPath = ptsToClip(el.shape === "star" ? STAR_PTS : TRIANGLE_PTS);
      } else {
        node.style.background = el.color;
        if (el.shape === "pill") node.style.borderRadius = (el.h / 2) + "px";
        else if (el.shape === "ellipse") node.style.borderRadius = "50%";
        else node.style.borderRadius = (el.radius != null ? el.radius : 6) + "px";
        if (el.strokeW > 0) node.style.border = el.strokeW + "px solid " + el.strokeColor;
        if (el.text) {
          node.style.display = "flex"; node.style.alignItems = "center"; node.style.justifyContent = "center";
          node.style.color = el.textColor; node.style.fontWeight = "700"; node.style.fontSize = el.size + "px";
          node.style.fontFamily = "'Libre Franklin',sans-serif";
          node.textContent = el.text;
        }
      }
    }
    attachElementPointer(node, el);
    return node;
  }

  /* Selection chrome: boxes + handles, bovenop alle elementen */
  function renderSelection() {
    surface.querySelectorAll(".st-selbox").forEach(function (n) { n.remove(); });
    if (state.editing) { renderQuickbar(); return; }
    var multi = state.sel.length > 1;

    if (multi) {
      // dunne omtrek per element + één groepskader met hoek-handles (proportioneel schalen)
      selEls().forEach(function (el) {
        if (el.hidden) return;
        var b = bounds(el);
        var o = document.createElement("div");
        o.className = "st-selbox"; o.setAttribute("data-for", el.id);
        o.style.left = b.x + "px"; o.style.top = b.y + "px";
        o.style.width = b.w + "px"; o.style.height = b.h + "px";
        o.style.outlineWidth = "1px"; o.style.outlineColor = "rgba(19,165,56,.5)";
        if (el.rot) o.style.transform = "rotate(" + el.rot + "deg)";
        surface.appendChild(o);
      });
      var gb = selBounds();
      if (gb) {
        var gbox = document.createElement("div");
        gbox.className = "st-selbox st-group"; gbox.setAttribute("data-group", "1");
        gbox.style.left = gb.x + "px"; gbox.style.top = gb.y + "px";
        gbox.style.width = gb.w + "px"; gbox.style.height = gb.h + "px";
        var anyLocked = selEls().some(function (e) { return e.locked; });
        if (!anyLocked) {
          ["nw", "ne", "sw", "se"].forEach(function (c) {
            var h = document.createElement("div");
            h.className = "st-h st-h-" + c; h.setAttribute("data-c", c);
            h.addEventListener("pointerdown", function (e) { startGroupResize(e, c); });
            gbox.appendChild(h);
          });
        }
        surface.appendChild(gbox);
      }
      renderQuickbar();
      return;
    }

    selEls().forEach(function (el) {
      if (el.hidden) return;
      var b = bounds(el);
      var box = document.createElement("div");
      box.className = "st-selbox";
      box.setAttribute("data-for", el.id);
      box.style.left = b.x + "px"; box.style.top = b.y + "px";
      box.style.width = b.w + "px"; box.style.height = b.h + "px";
      if (el.rot) box.style.transform = "rotate(" + el.rot + "deg)";
      if (!el.locked) {
        ["nw", "ne", "sw", "se"].forEach(function (c) {
          var h = document.createElement("div");
          h.className = "st-h st-h-" + c; h.setAttribute("data-c", c);
          h.addEventListener("pointerdown", function (e) { startResize(e, el, c); });
          box.appendChild(h);
        });
        if (el.type === "text" || (el.type === "shape" && el.shape !== "fade")) {
          ["e", "w"].forEach(function (c) {
            var h = document.createElement("div");
            h.className = "st-h st-h-side st-h-" + c; h.setAttribute("data-c", c);
            h.addEventListener("pointerdown", function (e) { startResize(e, el, c); });
            box.appendChild(h);
          });
        }
        var rh = document.createElement("div");
        rh.className = "st-rot"; rh.innerHTML = icn("rotate");
        rh.title = "Draai (Shift = stappen van 15°) · dubbelklik = recht";
        rh.addEventListener("pointerdown", function (e) { startRotate(e, el); });
        rh.addEventListener("dblclick", function () { el.rot = 0; renderCanvas(); syncPropValues(); commit(); });
        box.appendChild(rh);
      }
      if (el.locked) {
        var lk = document.createElement("div"); lk.className = "st-lockbadge"; lk.innerHTML = icn("lock");
        box.appendChild(lk);
      }
      surface.appendChild(box);
    });
    renderQuickbar();
  }

  /* ================= Zwevende selectie-toolbar ================= */
  var quickbar = null, transforming = false, cropEl = null;
  function hideQuickbar() { if (quickbar) { quickbar.remove(); quickbar = null; } }
  function renderQuickbar() {
    hideQuickbar();
    if (transforming || !state.sel.length || state.editing) return;
    var list = selEls(); if (!list.length) return;
    var single = list.length === 1 ? list[0] : null;
    var grouped = list.length > 1 && list.every(function (e) { return e.group && e.group === list[0].group; });
    quickbar = document.createElement("div");
    quickbar.className = "st-quickbar";
    function btn(ic, title, fn, danger) {
      var b = document.createElement("button");
      b.innerHTML = icn(ic); b.title = title; b.setAttribute("aria-label", title);
      if (danger) b.className = "danger";
      b.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
      b.addEventListener("click", function (e) { e.stopPropagation(); fn(); });
      return b;
    }
    function sep() { var s = document.createElement("span"); s.className = "qb-sep"; return s; }

    quickbar.appendChild(btn("copy", T("studio.propDuplicate"), duplicateSel));
    if (list.length > 1 && !grouped) quickbar.appendChild(btn("group", T("studio.group"), groupSel));
    if (grouped) quickbar.appendChild(btn("ungroup", T("studio.ungroup"), ungroupSel));
    if (single && single.type === "image") quickbar.appendChild(btn("crop", T("studio.crop"), function () { startCrop(single); }));
    quickbar.appendChild(sep());
    quickbar.appendChild(btn("front", T("studio.ctxToFront"), function () { reorderSel(1, true); }));
    if (single) quickbar.appendChild(btn(single.locked ? "lock" : "unlock", T(single.locked ? "studio.layerUnlock" : "studio.layerLock"), function () { toggleLock(single); }));
    quickbar.appendChild(btn("more", T("studio.more"), function () {
      var r = quickbar.getBoundingClientRect();
      openElementMenu(r.left, r.bottom + 4);
    }));
    quickbar.appendChild(sep());
    quickbar.appendChild(btn("trash", T("studio.propDelete"), deleteSel, true));

    stage.appendChild(quickbar);
    positionQuickbar();
  }
  function positionQuickbar() {
    if (!quickbar) return;
    var gb = selBounds(); if (!gb) { hideQuickbar(); return; }
    var s = curScale();
    var bw = quickbar.offsetWidth || 240, bh = quickbar.offsetHeight || 40;
    var left = gb.x * s + (gb.w * s - bw) / 2;
    left = Math.max(2, Math.min(left, fmt().w * s - bw - 2));
    var top = gb.y * s - bh - 10;
    if (top < 2) top = (gb.y + gb.h) * s + 10;
    quickbar.style.left = Math.round(left) + "px";
    quickbar.style.top = Math.round(top) + "px";
  }
  function openElementMenu(x, y) {
    var el = selEls()[0];
    var items = [
      [T("studio.ctxCopy"), "copy", copySel],
      [T("studio.ctxCut"), "copy", function () { copySel(); deleteSel(); }],
      null,
      [T("studio.ctxForward"), "up", function () { reorderSel(1); }],
      [T("studio.ctxBackward"), "down", function () { reorderSel(-1); }],
      [T("studio.ctxToBack"), "back", function () { reorderSel(-1, true); }],
      null,
      [T(el && el.locked ? "studio.layerUnlock" : "studio.layerLock"), el && el.locked ? "unlock" : "lock", function () { if (el) toggleLock(el); }],
      [T("studio.layerHide"), "eyeOff", function () { if (el) toggleHide(el); }],
      null,
      [T("studio.propDelete"), "trash", deleteSel]
    ];
    showContextMenu(x, y, items);
  }

  /* ================= Bijsnijden (crop) ================= */
  function startCrop(el) {
    if (!el || el.type !== "image" || el.locked) return;
    select([el.id]); hideQuickbar();
    var existing = ratios[el.id];
    if (existing) buildCrop(el, existing);
    else { var probe = new Image(); probe.onload = function () { ratios[el.id] = probe.naturalWidth / probe.naturalHeight; buildCrop(el, ratios[el.id]); }; probe.onerror = function () { buildCrop(el, el.w / Math.max(1, el.h)); }; probe.src = el.src; }
  }
  function buildCrop(el, natRatio) {
    cancelCrop();
    cropEl = el;
    var s = curScale();
    var crop = el.crop || { sx: 0, sy: 0, sw: 1, sh: 1 };
    var ex = el.x * s, ey = el.y * s;
    var Wbox = (el.w * s) / crop.sw, Hbox = Wbox / natRatio;
    var boxX = ex - crop.sx * Wbox, boxY = ey - crop.sy * Hbox;
    var fr = { x: ex, y: ey, w: el.w * s, h: el.h * s };

    var cont = document.createElement("div");
    cont.id = "st-crop"; cont.style.cssText = "position:absolute;inset:0;z-index:54;pointer-events:auto;user-select:none;overflow:hidden";
    var bimg = document.createElement("img");
    bimg.src = el.src; bimg.draggable = false;
    bimg.style.cssText = "position:absolute;pointer-events:none;left:" + boxX + "px;top:" + boxY + "px;width:" + Wbox + "px;height:" + Hbox + "px;max-width:none";
    cont.appendChild(bimg);

    var frame = document.createElement("div");
    frame.className = "st-crop-frame";
    var grid = document.createElement("div"); grid.className = "st-crop-grid"; frame.appendChild(grid);
    ["nw", "ne", "sw", "se"].forEach(function (c) {
      var h = document.createElement("div"); h.className = "st-crop-h st-crop-h-" + c; h.setAttribute("data-c", c);
      h.addEventListener("pointerdown", function (e) { cropResize(e, c); });
      frame.appendChild(h);
    });
    frame.addEventListener("pointerdown", function (e) { if (e.target.closest(".st-crop-h")) return; cropMove(e); });
    cont.appendChild(frame);

    var bar = document.createElement("div"); bar.className = "st-crop-bar";
    var cancelBtn = document.createElement("button"); cancelBtn.className = "cancel";
    cancelBtn.innerHTML = icn("x") + T("studio.cropCancel");
    cancelBtn.addEventListener("click", cancelCrop);
    var okBtn = document.createElement("button"); okBtn.className = "ok"; okBtn.innerHTML = icn("check") + T("studio.cropApply");
    okBtn.addEventListener("click", applyCrop);
    bar.appendChild(cancelBtn); bar.appendChild(okBtn);
    cont.appendChild(bar);
    cont.addEventListener("pointerdown", function (e) { if (e.target === cont || e.target === bimg) e.stopPropagation(); });

    stage.appendChild(cont);

    function paint() {
      frame.style.left = fr.x + "px"; frame.style.top = fr.y + "px";
      frame.style.width = fr.w + "px"; frame.style.height = fr.h + "px";
    }
    paint();

    function clamp() {
      fr.w = Math.max(24, Math.min(fr.w, Wbox)); fr.h = Math.max(24, Math.min(fr.h, Hbox));
      fr.x = Math.max(boxX, Math.min(fr.x, boxX + Wbox - fr.w));
      fr.y = Math.max(boxY, Math.min(fr.y, boxY + Hbox - fr.h));
    }
    function cropMove(e) {
      e.preventDefault(); e.stopPropagation();
      var sx0 = e.clientX, sy0 = e.clientY, ox = fr.x, oy = fr.y;
      function mv(ev) { fr.x = ox + (ev.clientX - sx0); fr.y = oy + (ev.clientY - sy0); clamp(); paint(); }
      function up() { document.removeEventListener("pointermove", mv); document.removeEventListener("pointerup", up); }
      document.addEventListener("pointermove", mv); document.addEventListener("pointerup", up);
    }
    function cropResize(e, c) {
      e.preventDefault(); e.stopPropagation();
      var sx0 = e.clientX, sy0 = e.clientY, o = { x: fr.x, y: fr.y, w: fr.w, h: fr.h };
      var west = c.indexOf("w") > -1, north = c.indexOf("n") > -1;
      function mv(ev) {
        var dx = ev.clientX - sx0, dy = ev.clientY - sy0;
        if (west) { fr.x = o.x + dx; fr.w = o.w - dx; } else { fr.w = o.w + dx; }
        if (north) { fr.y = o.y + dy; fr.h = o.h - dy; } else { fr.h = o.h + dy; }
        if (fr.w < 24) { fr.w = 24; if (west) fr.x = o.x + o.w - 24; }
        if (fr.h < 24) { fr.h = 24; if (north) fr.y = o.y + o.h - 24; }
        clamp(); paint();
      }
      function up() { document.removeEventListener("pointermove", mv); document.removeEventListener("pointerup", up); }
      document.addEventListener("pointermove", mv); document.addEventListener("pointerup", up);
    }

    cropApplyFn = function () {
      var sx = (fr.x - boxX) / Wbox, sy = (fr.y - boxY) / Hbox, sw = fr.w / Wbox, sh = fr.h / Hbox;
      el.crop = { sx: Math.max(0, sx), sy: Math.max(0, sy), sw: Math.min(1, sw), sh: Math.min(1, sh) };
      el.x = Math.round(fr.x / s); el.y = Math.round(fr.y / s);
      el.w = Math.round(fr.w / s); el.h = Math.round(fr.h / s);
      cancelCrop();
      renderCanvas(); select([el.id]); commit();
      PM_toast(T("studio.cropDone"));
    };
  }
  var cropApplyFn = null;
  function applyCrop() { if (cropApplyFn) cropApplyFn(); }
  function cancelCrop() {
    var c = $("st-crop"); if (c) c.remove();
    cropEl = null; cropApplyFn = null;
    renderSelection();
  }
  function syncSelBoxes() {
    selEls().forEach(function (el) {
      var box = surface.querySelector('.st-selbox[data-for="' + el.id + '"]');
      if (!box) return;
      var b = bounds(el);
      box.style.left = b.x + "px"; box.style.top = b.y + "px";
      box.style.width = b.w + "px"; box.style.height = b.h + "px";
      box.style.transform = el.rot ? "rotate(" + el.rot + "deg)" : "";
    });
    var gbox = surface.querySelector('.st-selbox[data-group]');
    if (gbox) {
      var gb = selBounds();
      if (gb) { gbox.style.left = gb.x + "px"; gbox.style.top = gb.y + "px"; gbox.style.width = gb.w + "px"; gbox.style.height = gb.h + "px"; }
    }
    positionQuickbar();
  }

  /* ================= Selection ================= */
  function byId(id) { return els().find(function (e) { return e.id === id; }); }
  /* Een groepslid selecteren = de hele groep selecteren */
  function expandGroups(ids) {
    var groups = {};
    ids.forEach(function (id) { var el = byId(id); if (el && el.group) groups[el.group] = 1; });
    if (!Object.keys(groups).length) return ids;
    var set = ids.slice();
    els().forEach(function (el) { if (el.group && groups[el.group] && set.indexOf(el.id) === -1) set.push(el.id); });
    return set;
  }
  function select(ids) {
    state.sel = ids.slice();
    renderSelection();
    renderProps();
    if (state.tab === "layers") renderPanel();
  }
  function selectOne(id, additive) {
    if (additive) {
      var grp = expandGroups([id]);
      var allIn = grp.every(function (g) { return state.sel.indexOf(g) > -1; });
      var next = state.sel.slice();
      if (allIn) next = next.filter(function (s) { return grp.indexOf(s) === -1; });
      else grp.forEach(function (g) { if (next.indexOf(g) === -1) next.push(g); });
      select(next);
    } else if (expandGroups([id]).some(function (g) { return state.sel.indexOf(g) === -1; }) || state.sel.indexOf(id) === -1) {
      select(expandGroups([id]));
    } else {
      renderSelection(); // keep selection (clicked inside existing multi-selection)
    }
  }

  /* ================= Pointer: canvas (marquee / deselect) ================= */
  function bindCanvasPointer() {
    surface.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      if (e.target !== surface) return;
      e.preventDefault();
      var start = toCanvas(e), moved = false;
      var mq = document.createElement("div"); mq.className = "st-marquee";
      function move(ev) {
        var p = toCanvas(ev);
        if (!moved && (Math.abs(p.x - start.x) > 4 || Math.abs(p.y - start.y) > 4)) { moved = true; surface.appendChild(mq); }
        if (!moved) return;
        var x = Math.min(p.x, start.x), y = Math.min(p.y, start.y);
        var w = Math.abs(p.x - start.x), h = Math.abs(p.y - start.y);
        mq.style.left = x + "px"; mq.style.top = y + "px"; mq.style.width = w + "px"; mq.style.height = h + "px";
        mq._box = { x: x, y: y, w: w, h: h };
      }
      function up() {
        document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
        if (moved) {
          var bx = mq._box; mq.remove();
          if (bx) {
            var hit = els().filter(function (el) {
              if (el.hidden || el.locked) return false;
              var b = bounds(el);
              return b.x < bx.x + bx.w && b.x + b.w > bx.x && b.y < bx.y + bx.h && b.y + b.h > bx.y;
            }).map(function (el) { return el.id; });
            select(expandGroups(hit));
          }
        } else {
          select([]);
        }
      }
      document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
    });
    // klik buiten canvas deselecteert
    wrap.addEventListener("pointerdown", function (e) { if (e.target === wrap || e.target === stage) select([]); });
  }

  /* ================= Pointer: element drag + smart guides ================= */
  function attachElementPointer(node, el) {
    node.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      if (state.editing === el.id) return;
      if (el.locked) return;
      e.preventDefault(); e.stopPropagation();
      if (state.editing) stopEditing();
      selectOne(el.id, e.shiftKey);
      if (e.shiftKey) return; // alleen selectie wisselen, niet slepen
      startDrag(e);
    });
    if (el.type === "text") {
      node.addEventListener("dblclick", function (e) { e.stopPropagation(); startEditing(node, el); });
    }
  }

  var guideV = null, guideH = null;
  function showGuide(axis, pos) {
    var g = axis === "v" ? guideV : guideH;
    if (!g) {
      g = document.createElement("div");
      g.className = "st-guide st-guide-" + axis;
      surface.appendChild(g);
      if (axis === "v") guideV = g; else guideH = g;
    }
    if (axis === "v") g.style.left = pos + "px"; else g.style.top = pos + "px";
    g.style.display = "block";
  }
  function hideGuides() {
    if (guideV) guideV.style.display = "none";
    if (guideH) guideH.style.display = "none";
  }
  function clearGuides() {
    if (guideV) { guideV.remove(); guideV = null; }
    if (guideH) { guideH.remove(); guideH = null; }
  }

  function snapTargets() {
    var f = fmt();
    var tx = [0, f.w / 2, f.w], ty = [0, f.h / 2, f.h];
    els().forEach(function (o) {
      if (o.hidden || state.sel.indexOf(o.id) > -1) return;
      var b = bounds(o);
      tx.push(b.x, b.x + b.w / 2, b.x + b.w);
      ty.push(b.y, b.y + b.h / 2, b.y + b.h);
    });
    return { x: tx, y: ty };
  }

  function startDrag(e) {
    var list = selEls().filter(function (el) { return !el.locked; });
    if (!list.length) return;
    transforming = true; hideQuickbar();
    var start = toCanvas(e);
    var orig = list.map(function (el) { return { el: el, x: el.x, y: el.y }; });
    var bb0 = selBounds();
    var targets = snapTargets();
    var moved = false;
    var thr = 5 / curScale();

    function move(ev) {
      var p = toCanvas(ev);
      var dx = p.x - start.x, dy = p.y - start.y;
      if (!moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) moved = true;
      if (!moved) return;
      // snapping op selectie-bbox
      hideGuides();
      if (!ev.altKey && bb0) {
        var bx = [bb0.x + dx, bb0.x + bb0.w / 2 + dx, bb0.x + bb0.w + dx];
        var by = [bb0.y + dy, bb0.y + bb0.h / 2 + dy, bb0.y + bb0.h + dy];
        var bestX = null, bestY = null;
        bx.forEach(function (v) { targets.x.forEach(function (t) { var d = t - v; if (Math.abs(d) < thr && (bestX === null || Math.abs(d) < Math.abs(bestX.d))) bestX = { d: d, t: t }; }); });
        by.forEach(function (v) { targets.y.forEach(function (t) { var d = t - v; if (Math.abs(d) < thr && (bestY === null || Math.abs(d) < Math.abs(bestY.d))) bestY = { d: d, t: t }; }); });
        if (bestX) { dx += bestX.d; showGuide("v", bestX.t); }
        if (bestY) { dy += bestY.d; showGuide("h", bestY.t); }
      }
      orig.forEach(function (o) {
        o.el.x = Math.round(o.x + dx); o.el.y = Math.round(o.y + dy);
        var node = surface.querySelector('.st-el[data-id="' + o.el.id + '"]');
        if (node) { node.style.left = o.el.x + "px"; node.style.top = o.el.y + "px"; }
      });
      syncSelBoxes();
      syncPropValues();
    }
    function up() {
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      clearGuides();
      transforming = false;
      if (moved) { renderCanvas(); commit(); } else { renderSelection(); }
    }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
  }

  /* ================= Resize (met rotatie-anker) ================= */
  function rotVec(x, y, deg) {
    var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return { x: x * c - y * s, y: x * s + y * c };
  }
  function startResize(e, el, corner) {
    e.preventDefault(); e.stopPropagation();
    transforming = true; hideQuickbar();
    var start = toCanvas(e);
    var ow = el.w, oh = elH(el), osize = el.size || 0, orad = el.radius || 0;
    var cx0 = el.x + ow / 2, cy0 = el.y + oh / 2;
    var sx = corner.indexOf("e") > -1 ? 1 : (corner.indexOf("w") > -1 ? -1 : 0);
    var sy = corner.indexOf("s") > -1 ? 1 : (corner.indexOf("n") > -1 ? -1 : 0);
    var isCorner = sx !== 0 && sy !== 0;
    var ratio = ow / oh; // hoek-resize behoudt de huidige kaderverhouding

    function move(ev) {
      var p = toCanvas(ev);
      var d = rotVec(p.x - start.x, p.y - start.y, -(el.rot || 0));
      var nw = ow, nh = oh;
      if (sx) nw = Math.max(20, ow + sx * d.x);
      if (sy) nh = Math.max(14, oh + sy * d.y);

      if (el.type === "image" && isCorner) { nh = nw / ratio; }
      else if (el.type === "text") { var s = nw / ow; nw = ow * s; nh = oh * s; }
      else if (isCorner && ev.shiftKey) { var s2 = nw / ow; nh = oh * s2; }

      if (el.type === "text") {
        var sc = nw / ow;
        el.w = Math.max(30, Math.round(nw));
        if (isCorner) el.size = Math.max(8, Math.round(osize * sc));
        nh = measureTextH(el);
      } else {
        el.w = Math.round(nw); el.h = Math.round(nh);
      }
      // anker: tegenoverliggende hoek/zijde blijft op zijn plek
      var ax = -sx * ow / 2, ay = -sy * oh / 2;
      var aw = rotVec(ax, ay, el.rot || 0);
      var anchorX = cx0 + aw.x, anchorY = cy0 + aw.y;
      var ax2 = -sx * el.w / 2, ay2 = -sy * (el.type === "text" ? nh : el.h) / 2;
      var aw2 = rotVec(ax2, ay2, el.rot || 0);
      el.x = Math.round(anchorX - aw2.x - el.w / 2);
      el.y = Math.round(anchorY - aw2.y - (el.type === "text" ? nh : el.h) / 2);

      renderCanvas(); syncPropValues();
    }
    function up() {
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      transforming = false; renderSelection();
      commit();
    }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
  }

  /* ================= Group resize (proportioneel) ================= */
  function startGroupResize(e, corner) {
    e.preventDefault(); e.stopPropagation();
    transforming = true; hideQuickbar();
    var list = selEls().filter(function (el) { return !el.locked; });
    if (!list.length) return;
    var gb0 = selBounds();
    if (!gb0 || gb0.w < 2 || gb0.h < 2) return;
    var anchor = {
      x: corner.indexOf("w") > -1 ? gb0.x + gb0.w : gb0.x,
      y: corner.indexOf("n") > -1 ? gb0.y + gb0.h : gb0.y
    };
    var diag = Math.hypot(gb0.w, gb0.h);
    var orig = list.map(function (el) { return { el: el, x: el.x, y: el.y, w: el.w, h: elH(el), size: el.size || 0, ls: el.ls || 0 }; });

    function move(ev) {
      var p = toCanvas(ev);
      var scale = Math.max(0.05, Math.min(8, Math.hypot(p.x - anchor.x, p.y - anchor.y) / diag));
      orig.forEach(function (o) {
        var el = o.el;
        el.x = Math.round(anchor.x + (o.x - anchor.x) * scale);
        el.y = Math.round(anchor.y + (o.y - anchor.y) * scale);
        if (el.type === "text") {
          el.w = Math.max(20, Math.round(o.w * scale));
          el.size = Math.max(6, Math.round(o.size * scale));
          el.ls = o.ls * scale;
        } else {
          el.w = Math.max(6, Math.round(o.w * scale));
          el.h = Math.max(4, Math.round(o.h * scale));
        }
      });
      renderCanvas();
    }
    function up() {
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      transforming = false; renderSelection();
      commit();
    }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
  }

  /* ================= Groeperen / verdelen ================= */
  function groupSel() {
    var list = selEls();
    if (list.length < 2) return;
    var gid = "g_" + (++uid) + "_" + (Date.now() % 100000);
    list.forEach(function (el) { el.group = gid; });
    renderSelection(); renderProps(); commit();
    PM_toast(T("studio.grouped"));
  }
  function ungroupSel() {
    var list = selEls(), any = false;
    list.forEach(function (el) { if (el.group) { delete el.group; any = true; } });
    if (any) { renderSelection(); renderProps(); commit(); PM_toast(T("studio.ungrouped")); }
  }
  function distributeSel(axis) {
    var list = selEls().filter(function (el) { return !el.locked; });
    if (list.length < 3) return;
    list.sort(function (a, b) { var ba = bounds(a), bb = bounds(b); return axis === "h" ? (ba.x + ba.w / 2) - (bb.x + bb.w / 2) : (ba.y + ba.h / 2) - (bb.y + bb.h / 2); });
    var n = list.length;
    var c0 = axis === "h" ? bounds(list[0]).x + bounds(list[0]).w / 2 : bounds(list[0]).y + bounds(list[0]).h / 2;
    var bl = bounds(list[n - 1]);
    var cN = axis === "h" ? bl.x + bl.w / 2 : bl.y + bl.h / 2;
    var step = (cN - c0) / (n - 1);
    list.forEach(function (el, i) {
      var b = bounds(el);
      var c = c0 + i * step;
      if (axis === "h") el.x = Math.round(c - b.w / 2); else el.y = Math.round(c - b.h / 2);
    });
    renderCanvas(); syncPropValues(); commit();
  }

  /* ================= Rotate ================= */
  function startRotate(e, el) {
    e.preventDefault(); e.stopPropagation();
    transforming = true; hideQuickbar();
    var b = bounds(el);
    var cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    var badge = document.createElement("div"); badge.className = "st-rotbadge"; surface.appendChild(badge);
    function move(ev) {
      var p = toCanvas(ev);
      var a = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI + 90;
      if (ev.shiftKey) a = Math.round(a / 15) * 15;
      a = Math.round(((a % 360) + 360) % 360);
      if (a > 180) a -= 360;
      el.rot = a;
      var node = surface.querySelector('.st-el[data-id="' + el.id + '"]');
      if (node) node.style.transform = a ? "rotate(" + a + "deg)" : "";
      syncSelBoxes();
      badge.style.left = (cx) + "px"; badge.style.top = (b.y - 46) + "px";
      badge.textContent = a + "°";
      syncPropValues();
    }
    function up() {
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      badge.remove();
      transforming = false;
      renderCanvas(); commit();
    }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
  }

  /* ================= Inline tekst bewerken ================= */
  function startEditing(node, el) {
    if (el.locked) return;
    state.editing = el.id;
    select([el.id]);
    var box = surface.querySelector('.st-selbox[data-for="' + el.id + '"]');
    if (box) box.style.display = "none";
    node.setAttribute("contenteditable", "true");
    node.focus();
    try { document.execCommand("selectAll", false, null); } catch (e) {}
    function onblur() {
      node.removeEventListener("blur", onblur);
      el.text = node.innerText.replace(/\n$/, "");
      state.editing = null;
      renderCanvas(); renderProps(); commit();
    }
    node.addEventListener("blur", onblur);
  }
  function stopEditing() {
    var node = surface.querySelector('[data-id="' + state.editing + '"]');
    if (node) node.blur();
  }

  /* ================= Keyboard ================= */
  var nudgeTimer = null;
  function onKey(e) {
    var ae = document.activeElement;
    if (ae && ae.getAttribute && ae.getAttribute("contenteditable") === "true") {
      if (e.key === "Escape") { e.preventDefault(); stopEditing(); }
      return;
    }
    if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return;
    var mod = e.ctrlKey || e.metaKey;
    var k = e.key.toLowerCase();

    if (mod && k === "z" && !e.shiftKey) { e.preventDefault(); undo(); return; }
    if ((mod && k === "y") || (mod && e.shiftKey && k === "z")) { e.preventDefault(); redo(); return; }
    if (mod && k === "a") { e.preventDefault(); select(els().filter(function (el) { return !el.hidden && !el.locked; }).map(function (el) { return el.id; })); return; }
    if (mod && k === "c") { e.preventDefault(); copySel(); return; }
    if (mod && k === "x") { e.preventDefault(); copySel(); deleteSel(); return; }
    if (mod && k === "v") { e.preventDefault(); pasteClipboard(); return; }
    if (mod && k === "d") { e.preventDefault(); duplicateSel(); return; }
    if (mod && e.key === "]") { e.preventDefault(); reorderSel(1); return; }
    if (mod && e.key === "[") { e.preventDefault(); reorderSel(-1); return; }
    if (mod && k === "g" && !e.shiftKey) { e.preventDefault(); groupSel(); return; }
    if (mod && k === "g" && e.shiftKey) { e.preventDefault(); ungroupSel(); return; }
    if (e.key === "Escape") { if (cropEl) { cancelCrop(); return; } select([]); $("st-keys-modal").classList.remove("open"); return; }
    if (e.key === "Delete" || e.key === "Backspace") { if (state.sel.length) { e.preventDefault(); deleteSel(); } return; }

    if (state.sel.length && e.key.indexOf("Arrow") === 0) {
      e.preventDefault();
      var step = e.shiftKey ? 10 : 1;
      selEls().forEach(function (el) {
        if (el.locked) return;
        if (e.key === "ArrowLeft") el.x -= step; else if (e.key === "ArrowRight") el.x += step;
        else if (e.key === "ArrowUp") el.y -= step; else if (e.key === "ArrowDown") el.y += step;
        var node = surface.querySelector('.st-el[data-id="' + el.id + '"]');
        if (node) { node.style.left = el.x + "px"; node.style.top = el.y + "px"; }
      });
      syncSelBoxes(); syncPropValues();
      clearTimeout(nudgeTimer);
      nudgeTimer = setTimeout(function () { commit(); }, 400);
    }
  }

  /* ================= Clipboard / duplicate / delete ================= */
  function cloneEl(el) { return JSON.parse(JSON.stringify(el)); }
  function copySel() {
    if (!state.sel.length) return;
    clipboard = selEls().map(cloneEl);
    PM_toast(clipboard.length === 1 ? T("studio.copiedOne") : T("studio.copiedN", { n: clipboard.length }));
  }
  function newGid() { return "g_" + (++uid) + "_" + (Date.now() % 100000); }
  function pasteClipboard() {
    if (!clipboard.length) return;
    var ids = [], gmap = {};
    clipboard.forEach(function (c) {
      var copy = cloneEl(c);
      copy.id = nid(); copy.x += 24; copy.y += 24; copy.locked = false;
      if (copy.group) { gmap[copy.group] = gmap[copy.group] || newGid(); copy.group = gmap[copy.group]; }
      els().push(copy); ids.push(copy.id);
    });
    renderCanvas(); select(ids); commit();
  }
  function duplicateSel() {
    if (!state.sel.length) return;
    var ids = [], gmap = {};
    selEls().forEach(function (el) {
      var copy = cloneEl(el);
      copy.id = nid(); copy.x += 24; copy.y += 24;
      if (copy.group) { gmap[copy.group] = gmap[copy.group] || newGid(); copy.group = gmap[copy.group]; }
      els().push(copy); ids.push(copy.id);
    });
    renderCanvas(); select(ids); commit();
  }
  function deleteSel() {
    if (!state.sel.length) return;
    cur().elements = els().filter(function (el) { return state.sel.indexOf(el.id) === -1 || el.locked; });
    renderCanvas(); select([]); commit();
  }

  /* ================= Z-order ================= */
  function reorderSel(dir, extreme) {
    var list = els();
    var moving = selEls();
    if (!moving.length) return;
    moving.sort(function (a, b) { return list.indexOf(a) - list.indexOf(b); });
    if (dir > 0) moving.reverse();
    moving.forEach(function (el) {
      var i = list.indexOf(el);
      var j = extreme ? (dir > 0 ? list.length - 1 : 0) : i + dir;
      if (j < 0 || j >= list.length) return;
      list.splice(i, 1); list.splice(j, 0, el);
    });
    renderCanvas(); commit();
  }

  /* ================= Lock / hide ================= */
  function toggleLock(el) { el.locked = !el.locked; renderCanvas(); renderProps(); commit(); }
  function toggleHide(el) {
    el.hidden = !el.hidden;
    if (el.hidden) state.sel = state.sel.filter(function (id) { return id !== el.id; });
    renderCanvas(); renderProps(); commit();
  }

  /* ================= Align to page ================= */
  function alignSel(how) {
    var f = fmt(), bb = selBounds();
    if (!bb) return;
    var dx = 0, dy = 0;
    if (how === "l") dx = -bb.x;
    if (how === "ch") dx = (f.w - bb.w) / 2 - bb.x;
    if (how === "r") dx = f.w - bb.w - bb.x;
    if (how === "t") dy = -bb.y;
    if (how === "cv") dy = (f.h - bb.h) / 2 - bb.y;
    if (how === "b") dy = f.h - bb.h - bb.y;
    selEls().forEach(function (el) { if (!el.locked) { el.x = Math.round(el.x + dx); el.y = Math.round(el.y + dy); } });
    renderCanvas(); syncPropValues(); commit();
  }

  /* ================= History (undo/redo) + autosave ================= */
  function docSnapshot() {
    return JSON.stringify({ name: state.name, format: state.format, customSize: state.customSize, page: state.page, pages: state.pages });
  }
  function restoreSnapshot(json) {
    var d = JSON.parse(json);
    state.name = d.name; state.format = d.format;
    state.customSize = d.customSize || { w: 1080, h: 1080 };
    state.pages = d.pages; state.page = Math.min(d.page || 0, d.pages.length - 1);
    state.sel = [];
    $("st-name").value = state.name;
    $("st-format").value = state.format;
    applyView(); renderCanvas(); renderProps();
  }
  var lastSnap = null;
  function resetHistory() {
    undoStack = []; redoStack = [];
    lastSnap = docSnapshot();
    updateUndoButtons();
  }
  function commit() {
    var snap = docSnapshot();
    if (snap === lastSnap) return;
    markDraftAfterEdit();
    undoStack.push(lastSnap);
    if (undoStack.length > 80) undoStack.shift();
    redoStack = [];
    lastSnap = snap;
    updateUndoButtons();
    autosave();
    schedulePageThumb();
  }
  function undo() {
    if (!undoStack.length) return;
    redoStack.push(lastSnap);
    lastSnap = undoStack.pop();
    restoreSnapshot(lastSnap);
    updateUndoButtons(); autosave();
  }
  function redo() {
    if (!redoStack.length) return;
    undoStack.push(lastSnap);
    lastSnap = redoStack.pop();
    restoreSnapshot(lastSnap);
    updateUndoButtons(); autosave();
  }
  function updateUndoButtons() {
    var u = $("st-undo"), r = $("st-redo");
    if (u) u.disabled = !undoStack.length;
    if (r) r.disabled = !redoStack.length;
  }

  var AUTOSAVE_KEY = "pm_studio_autosave";
  function autosave() {
    try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ id: state.id, snap: lastSnap || docSnapshot(), ts: Date.now() })); } catch (e) {}
  }
  function clearAutosave() { try { localStorage.removeItem(AUTOSAVE_KEY); } catch (e) {} }
  function restoreAutosave() {
    try {
      var raw = localStorage.getItem(AUTOSAVE_KEY);
      if (!raw) return false;
      var a = JSON.parse(raw);
      if (!a || !a.snap) return false;
      state.id = a.id || null;
      restoreSnapshot(a.snap);
      return true;
    } catch (e) { return false; }
  }

  /* ================= Template load ================= */
  function loadTemplate(tid) {
    var t = TEMPLATES.find(function (x) { return x.id === tid; }) || TEMPLATES[0];
    var built = t.build();
    state.format = t.format;
    state.pages = [{ bg: built.bg, elements: built.elements.map(function (e) { return Object.assign({}, e, { id: nid() }); }) }];
    state.page = 0;
    state.sel = [];
    state.zoom = null;
    state.name = t.id === "blank" ? "Naamloos ontwerp" : t.name;
    state.status = "draft";
    state.feedback = "";
    state.ownerEmail = "";
    pageThumbs = [];
    $("st-name").value = state.name;
    $("st-format").value = state.format;
    applyView(); renderCanvas(); renderProps(); renderStatus(); commit();
  }

  /* ================= Add elements ================= */
  function center(w, h) { var f = fmt(); return { x: Math.round((f.w - w) / 2), y: Math.round((f.h - h) / 2) }; }
  function pushEl(e) { els().push(e); renderCanvas(); select([e.id]); commit(); }
  function addText(kind) {
    var f = fmt(), k = Math.min(1, f.w / 1080);
    var presets = {
      head: { text: "Jouw kop hier", size: Math.round(72 * k), weight: 800, color: "#0d1117", w: Math.round(700 * k) },
      sub: { text: "Jouw subtitel hier", size: Math.round(36 * k), weight: 600, color: "#13A538", w: Math.round(600 * k) },
      body: { text: "Jouw bodytekst hier. Vertel je verhaal in heldere, korte zinnen.", size: Math.round(26 * k), weight: 400, color: "#1c2530", w: Math.round(560 * k) },
      url: { text: "plasmamade.com", size: Math.round(30 * k), weight: 700, color: "#13A538", w: Math.round(400 * k) },
      dealer: { text: "Jouw Dealernaam\nStraat 1, Plaats · 012 - 345 6789\njouwwebsite.nl", size: Math.round(24 * k), weight: 600, color: "#1c2530", w: Math.round(480 * k) }
    };
    var p = presets[kind] || presets.body;
    var c = center(p.w, p.size * 1.3);
    pushEl(txt(Object.assign({}, p, { x: c.x, y: c.y })));
  }
  function addPhrase(text) {
    var f = fmt(), k = Math.min(1, f.w / 1080);
    var w = Math.round(Math.min(f.w * 0.78, 720 * k));
    var c = center(w, 60 * k);
    pushEl(txt({ text: text || "Schone lucht begint bij PlasmaMade.", x: c.x, y: c.y, w: w, size: Math.round(30 * k), weight: 700, color: "#0d1117" }));
    if (window.PM_track) PM_track("phrase_use", text || "");
  }
  function addImage(src, fit) {
    var w = 360, h = 360, c = center(w, h);
    pushEl(img({ src: src, x: c.x, y: c.y, w: w, h: h, fit: fit || "contain" }));
  }
  function addShape(shape) {
    var e, c;
    if (shape === "pill") { c = center(260, 70); e = shp({ shape: "pill", text: "Get fresh!", x: c.x, y: c.y, w: 260, h: 70 }); }
    else if (shape === "ellipse") { c = center(300, 300); e = shp({ shape: "ellipse", x: c.x, y: c.y, w: 300, h: 300, color: "#13A538", text: "" }); }
    else if (shape === "triangle") { c = center(300, 260); e = shp({ shape: "triangle", x: c.x, y: c.y, w: 300, h: 260, color: "#13A538", text: "" }); }
    else if (shape === "star") { c = center(300, 290); e = shp({ shape: "star", x: c.x, y: c.y, w: 300, h: 290, color: "#13A538", text: "" }); }
    else if (shape === "line") { c = center(420, 6); e = shp({ shape: "line", x: c.x, y: c.y, w: 420, h: 6, color: "#0d1117", text: "" }); }
    else { c = center(400, 200); e = shp({ shape: "rect", x: c.x, y: c.y, w: 400, h: 200, color: "#ececec", text: "" }); }
    pushEl(e);
  }
  function addFade(dir) {
    var f = fmt(), el;
    if (dir === "corner") el = fade({ dir: "corner", x: 0, y: Math.round(f.h * 0.4), w: Math.round(f.w * 0.72), h: Math.round(f.h * 0.6) });
    else if (dir === "diagonal") el = fade({ dir: "diagonal", x: 0, y: 0, w: f.w, h: f.h });
    else el = fade({ dir: "bottom", x: 0, y: Math.round(f.h * 0.45), w: f.w, h: Math.round(f.h * 0.55) });
    els().unshift(el); // afloop als achtergrondlaag onderaan
    renderCanvas(); select([el.id]); commit();
  }

  /* ================= Left panel ================= */
  function renderPanelTabs() {
    var tabs = [["templates", T("studio.tabTemplates"), "layers"], ["text", T("studio.tabText"), "text"], ["images", T("studio.tabImages"), "image"], ["shapes", T("studio.tabShapes"), "shape"], ["bg", T("studio.tabBg"), "palette"], ["layers", T("studio.tabLayers"), "front"]];
    $("st-panel-tabs").innerHTML = tabs.map(function (t) {
      return '<button class="st-ptab' + (state.tab === t[0] ? " active" : "") + '" data-tab="' + t[0] + '">' + icn(t[2]) + '<span>' + t[1] + '</span></button>';
    }).join("");
    $("st-panel-tabs").querySelectorAll(".st-ptab").forEach(function (b) {
      b.addEventListener("click", function () { selectTab(b.getAttribute("data-tab")); });
    });
  }
  function selectTab(tab) {
    state.tab = tab;
    $("st-panel-tabs").querySelectorAll(".st-ptab").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === tab); });
    renderPanel();
  }
  function imgGroup(label, arr, fit) {
    return '<div class="st-grouplbl">' + label + '</div><div class="st-img-grid">' +
      arr.map(function (a) { var lbl = DL("studioAssets", a.label); return '<button class="st-img" data-img="' + a.src + '" data-fit="' + (fit || "contain") + '" title="' + lbl + '" aria-label="' + T("studio.addAria", { name: lbl }) + '"><img src="' + a.src + '" alt="" loading="lazy"></button>'; }).join("") + '</div>';
  }
  function renderPanel() {
    var tab = state.tab, body = $("st-panel-body"), html = "";
    if (tab === "templates") {
      var cats = {}; TEMPLATES.forEach(function (t) { (cats[t.cat] = cats[t.cat] || []).push(t); });
      Object.keys(cats).forEach(function (c) {
        html += '<div class="st-grouplbl">' + DL("studioTplCats", c) + '</div><div class="st-tpl-grid">';
        cats[c].forEach(function (t) {
          var f = FORMATS[t.format];
          var thumb = tplThumbs[t.id];
          html += '<button class="st-tpl" data-tpl="' + t.id + '"><span class="st-tpl-thumb" style="aspect-ratio:' + f.w + '/' + f.h + '">' +
            (thumb ? '<img src="' + thumb + '" alt="">' : (t.id === "blank" ? '<b>+</b>' : '<span class="st-tpl-loading"></span>')) +
            '</span><span class="st-tpl-name">' + DL("studioTemplates", t.name) + '</span></button>';
        });
        html += '</div>';
      });
    } else if (tab === "text") {
      var phrases = (window.PM_PHRASES ? PM_PHRASES.active() : []).slice(0, 10);
      html = '<div class="st-grouplbl">' + T("studio.addTextGroup") + '</div>' +
        '<button class="st-add" data-add="head">' + icn("text") + T("studio.addHead") + '</button>' +
        '<button class="st-add" data-add="sub">' + icn("text") + T("studio.addSub") + '</button>' +
        '<button class="st-add" data-add="body">' + icn("text") + T("studio.addBody") + '</button>' +
        '<button class="st-add" data-add="url">' + icn("text") + T("studio.addUrl") + '</button>' +
        '<button class="st-add" data-add="dealer">' + icn("pin") + T("studio.addDealer") + '</button>' +
        (phrases.length ? '<div class="st-grouplbl">Standaardzinnen</div>' + phrases.map(function (p) { return '<button class="st-add" data-phrase="' + PM_escape(p.text) + '">' + icn("text") + '<span>' + PM_escape(p.text) + '</span></button>'; }).join("") : "") +
        '<p class="st-hint">' + T("studio.textHint") + '</p>';
    } else if (tab === "images") {
      var ups = getUploads();
      html = '<div class="st-grouplbl">' + T("studio.ownImage") + '</div>' +
        '<button class="st-add" id="st-upload-btn">' + icn("image") + T("studio.uploadBtn") + '</button>' +
        '<input type="file" id="st-upload" accept="image/*" multiple style="display:none">' +
        (ups.length ? '<div class="st-grouplbl">' + T("studio.myUploads") + '</div><div class="st-img-grid">' +
          ups.map(function (u) { return '<span class="st-img st-upl"><button class="st-upl-add" data-img="' + u.id + '" data-upload="1" title="' + PM_escape(u.name) + '"><img src="' + u.data + '" alt=""></button><button class="st-upl-del" data-updel="' + u.id + '" title="' + T("studio.uploadDel") + '">' + icn("x") + '</button></span>'; }).join("") + '</div>' : '') +
        '<p class="st-hint" style="margin:8px 0 4px">' + T("studio.uploadHint") + '</p>' +
        imgGroup(T("studio.grpLogos"), ASSETS.logos) + imgGroup(T("studio.grpProducts"), ASSETS.products) + imgGroup(T("studio.grpPhotos"), ASSETS.photos, "cover") + imgGroup(T("studio.grpDecor"), ASSETS.decor);
    } else if (tab === "shapes") {
      html = '<div class="st-grouplbl">' + T("studio.shapesGroup") + '</div>' +
        '<button class="st-add" data-shape="pill">' + icn("shape") + T("studio.shapePill") + '</button>' +
        '<button class="st-add" data-shape="rect">' + icn("shape") + T("studio.shapeRect") + '</button>' +
        '<button class="st-add" data-shape="ellipse">' + icn("shape") + T("studio.shapeEllipse") + '</button>' +
        '<button class="st-add" data-shape="triangle">' + icn("shape") + T("studio.shapeTriangle") + '</button>' +
        '<button class="st-add" data-shape="star">' + icn("star") + T("studio.shapeStar") + '</button>' +
        '<button class="st-add" data-shape="line">' + icn("shape") + T("studio.shapeLine") + '</button>' +
        '<div class="st-grouplbl">' + T("studio.fadeGroup") + '</div>' +
        '<button class="st-add" data-fade="bottom">' + icn("droplet") + T("studio.fadeBottom") + '</button>' +
        '<button class="st-add" data-fade="corner">' + icn("droplet") + T("studio.fadeCorner") + '</button>' +
        '<button class="st-add" data-fade="diagonal">' + icn("droplet") + T("studio.fadeDiagonal") + '</button>' +
        '<p class="st-hint">' + T("studio.shapesHint") + '</p>';
    } else if (tab === "bg") {
      html = '<div class="st-grouplbl">' + T("studio.bgFadeGroup") + '</div>' +
        '<button class="st-add" data-bg="greenfade-bottom">' + icn("droplet") + T("studio.bgFadeBottom") + '</button>' +
        '<button class="st-add" data-bg="greenfade-corner">' + icn("droplet") + T("studio.bgFadeCorner") + '</button>' +
        '<button class="st-add" data-bg="grad">' + icn("droplet") + T("studio.bgGrad") + '</button>' +
        '<div class="st-grouplbl">' + T("studio.bgSolid") + '</div>' +
        '<div class="st-swatches">' + COLORS.map(function (c) { return '<button class="st-sw" data-bgcolor="' + c + '" aria-label="' + T("studio.bgColorAria", { c: c }) + '" style="background:' + c + (c === "#ffffff" || c === "#f2fbf5" ? ";border:1px solid #ddd" : "") + '"></button>'; }).join("") + '</div>' +
        '<div class="st-grouplbl">' + T("studio.bgImage") + '</div>' +
        '<div class="st-img-grid">' + ASSETS.photos.map(function (a) { return '<button class="st-img" data-bgimg="' + a.src + '" aria-label="' + T("studio.bgImage") + ': ' + DL("studioAssets", a.label) + '"><img src="' + a.src + '" alt="" loading="lazy"></button>'; }).join("") + '</div>';
    } else if (tab === "layers") {
      var list = els();
      if (!list.length) {
        html = '<div class="st-props-empty">' + icn("front") + '<p>' + T("studio.layersEmpty") + '</p></div>';
      } else {
        html = '<div class="st-grouplbl">' + T("studio.layersGroup") + '</div><div class="st-layerlist">';
        list.slice().reverse().forEach(function (el) {
          var name = el.type === "text" ? (el.text || T("studio.layerText")).split("\n")[0].slice(0, 22)
            : el.type === "image" ? (DL("studioAssets", ASSET_LABELS[el.src]) || (el.src.indexOf("data:") === 0 ? T("studio.layerUpload") : T("studio.layerImage")))
            : (DL("studioShapes", SHAPE_NAMES[el.shape]) || T("studio.layerShape"));
          var ic = el.type === "text" ? "text" : el.type === "image" ? "image" : (el.shape === "fade" ? "droplet" : "shape");
          html += '<div class="st-layer' + (state.sel.indexOf(el.id) > -1 ? " active" : "") + (el.hidden ? " hid" : "") + '" data-layer="' + el.id + '">' +
            '<span class="st-layer-ic">' + icn(ic) + '</span>' +
            '<span class="st-layer-name">' + PM_escape(name) + '</span>' +
            '<button data-lup="' + el.id + '" title="' + T("studio.layerUp") + '">' + icn("up") + '</button>' +
            '<button data-ldown="' + el.id + '" title="' + T("studio.layerDown") + '">' + icn("down") + '</button>' +
            '<button data-lhide="' + el.id + '" title="' + T(el.hidden ? "studio.layerShow" : "studio.layerHide") + '" class="' + (el.hidden ? "on" : "") + '">' + icn(el.hidden ? "eyeOff" : "eye") + '</button>' +
            '<button data-llock="' + el.id + '" title="' + T(el.locked ? "studio.layerUnlock" : "studio.layerLock") + '" class="' + (el.locked ? "on" : "") + '">' + icn(el.locked ? "lock" : "unlock") + '</button>' +
            '</div>';
        });
        html += '</div><p class="st-hint">' + T("studio.layersHint") + '</p>';
      }
    }
    body.innerHTML = html;
    wirePanel();
    if (tab === "templates") ensureTplThumbs();
  }
  function wirePanel() {
    var body = $("st-panel-body");
    body.querySelectorAll("[data-tpl]").forEach(function (b) { b.addEventListener("click", function () { state.id = null; loadTemplate(b.getAttribute("data-tpl")); }); });
    body.querySelectorAll("[data-add]").forEach(function (b) { b.addEventListener("click", function () { addText(b.getAttribute("data-add")); }); });
    body.querySelectorAll("[data-phrase]").forEach(function (b) { b.addEventListener("click", function () { addPhrase(b.getAttribute("data-phrase")); }); });
    body.querySelectorAll("[data-shape]").forEach(function (b) { b.addEventListener("click", function () { addShape(b.getAttribute("data-shape")); }); });
    body.querySelectorAll("[data-fade]").forEach(function (b) { b.addEventListener("click", function () { addFade(b.getAttribute("data-fade")); }); });
    body.querySelectorAll("[data-bg]").forEach(function (b) { b.addEventListener("click", function () { cur().bg = { type: b.getAttribute("data-bg") }; renderCanvas(); commit(); }); });
    body.querySelectorAll("[data-bgcolor]").forEach(function (b) { b.addEventListener("click", function () { cur().bg = { type: "color", value: b.getAttribute("data-bgcolor") }; renderCanvas(); commit(); }); });
    body.querySelectorAll("[data-bgimg]").forEach(function (b) { b.addEventListener("click", function () { cur().bg = { type: "image", value: b.getAttribute("data-bgimg") }; renderCanvas(); commit(); }); });
    body.querySelectorAll("[data-img]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-img");
        if (b.getAttribute("data-upload")) {
          var u = getUploads().find(function (x) { return x.id === v; });
          if (u) addImage(u.data, "contain");
        } else addImage(v, b.getAttribute("data-fit"));
      });
    });
    body.querySelectorAll("[data-updel]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        deleteUpload(b.getAttribute("data-updel"));
      });
    });
    var ub = $("st-upload-btn"), ui = $("st-upload");
    if (ub && ui) {
      ub.addEventListener("click", function () { ui.click(); });
      ui.addEventListener("change", function () {
        if (ui.files && ui.files.length) handleUploads(ui.files);
        ui.value = "";
      });
    }
    // layers
    body.querySelectorAll("[data-layer]").forEach(function (row) {
      row.addEventListener("click", function (e) {
        if (e.target.closest("button")) return;
        select(expandGroups([row.getAttribute("data-layer")]));
      });
    });
    function elById(id) { return els().find(function (e) { return e.id === id; }); }
    body.querySelectorAll("[data-lup]").forEach(function (b) { b.addEventListener("click", function () { select([b.getAttribute("data-lup")]); reorderSel(1); }); });
    body.querySelectorAll("[data-ldown]").forEach(function (b) { b.addEventListener("click", function () { select([b.getAttribute("data-ldown")]); reorderSel(-1); }); });
    body.querySelectorAll("[data-lhide]").forEach(function (b) { b.addEventListener("click", function () { var el = elById(b.getAttribute("data-lhide")); if (el) toggleHide(el); }); });
    body.querySelectorAll("[data-llock]").forEach(function (b) { b.addEventListener("click", function () { var el = elById(b.getAttribute("data-llock")); if (el) toggleLock(el); }); });
  }

  /* ================= Uploads (IndexedDB — onbeperkt, geen localStorage-limiet) =================
     Eigen beelden worden in IndexedDB bewaard (veel ruimer dan localStorage en raakt niet "vol").
     Niets wordt automatisch verwijderd; je kunt zoveel uploaden als je wilt, in één keer meerdere. */
  var UPLOAD_KEY = "pm_uploads"; // legacy localStorage (eenmalige migratie)
  var IDB_NAME = "pm_studio", IDB_STORE = "uploads", idbRef = null;
  var uploadsCache = [];
  function getUploads() { return uploadsCache; }
  function idbOpen() {
    return new Promise(function (res) {
      if (idbRef) { res(idbRef); return; }
      if (!window.indexedDB) { res(null); return; }
      var rq;
      try { rq = indexedDB.open(IDB_NAME, 1); } catch (e) { res(null); return; }
      rq.onupgradeneeded = function (e) { var db = e.target.result; if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE, { keyPath: "id" }); };
      rq.onsuccess = function () { idbRef = rq.result; res(idbRef); };
      rq.onerror = function () { res(null); };
    });
  }
  function idbAll() {
    return idbOpen().then(function (db) {
      if (!db) return [];
      return new Promise(function (res) {
        try { var rq = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).getAll(); rq.onsuccess = function () { res(rq.result || []); }; rq.onerror = function () { res([]); }; }
        catch (e) { res([]); }
      });
    });
  }
  function idbPut(rec) {
    return idbOpen().then(function (db) {
      if (!db) return false;
      return new Promise(function (res) {
        try { var tx = db.transaction(IDB_STORE, "readwrite"); tx.objectStore(IDB_STORE).put(rec); tx.oncomplete = function () { res(true); }; tx.onerror = function () { res(false); }; tx.onabort = function () { res(false); }; }
        catch (e) { res(false); }
      });
    });
  }
  function idbDel(id) {
    return idbOpen().then(function (db) {
      if (!db) return false;
      return new Promise(function (res) {
        try { var tx = db.transaction(IDB_STORE, "readwrite"); tx.objectStore(IDB_STORE).delete(id); tx.oncomplete = function () { res(true); }; tx.onerror = function () { res(false); }; }
        catch (e) { res(false); }
      });
    });
  }
  function loadUploads() {
    return idbAll().then(function (list) {
      var legacy = [];
      try { legacy = JSON.parse(localStorage.getItem(UPLOAD_KEY)) || []; } catch (e) {}
      if (legacy.length) {
        var have = {}; list.forEach(function (u) { have[u.id] = 1; });
        var puts = legacy.filter(function (u) { return u && u.data && !have[u.id]; }).map(function (u) { return idbPut({ id: u.id, name: u.name, data: u.data, ts: u.ts || Date.now() }); });
        return Promise.all(puts).then(function () { try { localStorage.removeItem(UPLOAD_KEY); } catch (e) {} return idbAll(); });
      }
      return list;
    }).then(function (list) {
      uploadsCache = (list || []).sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
      if (state.tab === "images") renderPanel();
      return uploadsCache;
    }).catch(function () { uploadsCache = []; return uploadsCache; });
  }
  function compressImage(file) {
    return new Promise(function (resolve) {
      var r = new FileReader();
      r.onload = function () {
        var im = new Image();
        im.onload = function () {
          var maxDim = 1600, w = im.width, h = im.height;
          var scale = Math.min(1, maxDim / Math.max(w, h));
          var cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(w * scale)); cv.height = Math.max(1, Math.round(h * scale));
          cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
          var isPng = /png|gif|webp|svg/i.test(file.type);
          resolve(isPng ? cv.toDataURL("image/png") : cv.toDataURL("image/jpeg", 0.85));
        };
        im.onerror = function () { resolve(null); };
        im.src = r.result;
      };
      r.onerror = function () { resolve(null); };
      r.readAsDataURL(file);
    });
  }
  function handleUpload(file) { handleUploads([file]); }
  function handleUploads(files) {
    var arr = Array.prototype.slice.call(files).filter(function (f) { return f && /^image\//.test(f.type || ""); });
    if (!arr.length) return;
    var added = [], failed = 0;
    var chain = Promise.resolve();
    arr.forEach(function (file, i) {
      chain = chain.then(function () {
        return compressImage(file).then(function (data) {
          if (!data) { failed++; return; }
          var rec = { id: "u_" + Date.now() + "_" + i + "_" + Math.round(performance.now()), name: file.name || "afbeelding", data: data, ts: Date.now() + i };
          return idbPut(rec).then(function (ok) { if (ok) { uploadsCache.push(rec); added.push(rec); } else failed++; });
        });
      });
    });
    chain.then(function () {
      uploadsCache.sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
      renderPanel();
      if (added.length) addImage(added[added.length - 1].data, "contain");
      if (failed && !added.length) PM_toast(T("studio.uploadFail"));
      else if (added.length > 1) PM_toast(T("studio.uploadedN", { n: added.length }));
      else if (added.length === 1) PM_toast(T("studio.imgAdded"));
    });
  }
  function deleteUpload(id) {
    uploadsCache = uploadsCache.filter(function (u) { return u.id !== id; });
    idbDel(id);
    renderPanel();
  }

  /* ================= Achtergrond verwijderen (rand-flood-fill + zachte rand) ================= */
  function removeBg(el) {
    if (!el || el.type !== "image") return;
    var src = el.srcOriginal || el.src;
    var im = new Image();
    im.onload = function () {
      var maxD = 1100, w = im.naturalWidth || im.width, h = im.naturalHeight || im.height;
      var sc = Math.min(1, maxD / Math.max(w, h));
      var cw = Math.max(1, Math.round(w * sc)), ch = Math.max(1, Math.round(h * sc));
      var cv = document.createElement("canvas"); cv.width = cw; cv.height = ch;
      var ctx = cv.getContext("2d");
      ctx.drawImage(im, 0, 0, cw, ch);
      var id;
      try { id = ctx.getImageData(0, 0, cw, ch); } catch (e) { PM_toast(T("studio.bgRemoveFail")); return; }
      var d = id.data;
      function rgb(x, y) { var i = (y * cw + x) * 4; return [d[i], d[i + 1], d[i + 2]]; }
      var cs = [rgb(0, 0), rgb(cw - 1, 0), rgb(0, ch - 1), rgb(cw - 1, ch - 1)];
      var bg = [0, 0, 0]; cs.forEach(function (c) { bg[0] += c[0]; bg[1] += c[1]; bg[2] += c[2]; });
      bg = [bg[0] / 4, bg[1] / 4, bg[2] / 4];
      var tol = el.bgTol != null ? el.bgTol : 42;
      var thr = tol * tol * 3;
      var soft = (tol * 1.7) * (tol * 1.7) * 3;
      var visited = new Uint8Array(cw * ch);
      var stack = [];
      function dist2(i) { var a = d[i] - bg[0], b = d[i + 1] - bg[1], c = d[i + 2] - bg[2]; return a * a + b * b + c * c; }
      function push(x, y) { if (x < 0 || y < 0 || x >= cw || y >= ch) return; var p = y * cw + x; if (visited[p]) return; visited[p] = 1; stack.push(p); }
      var x, y;
      for (x = 0; x < cw; x++) { push(x, 0); push(x, ch - 1); }
      for (y = 0; y < ch; y++) { push(0, y); push(cw - 1, y); }
      while (stack.length) {
        var p = stack.pop(), i = p * 4, dd = dist2(i);
        if (dd > soft) continue;
        if (dd <= thr) { d[i + 3] = 0; }
        else { var f = (dd - thr) / (soft - thr); d[i + 3] = Math.round(d[i + 3] * f); continue; }
        var px = p % cw, py = (p - px) / cw;
        push(px - 1, py); push(px + 1, py); push(px, py - 1); push(px, py + 1);
      }
      ctx.putImageData(id, 0, 0);
      var out = cv.toDataURL("image/png");
      if (!el.srcOriginal) el.srcOriginal = src;
      el.src = out; el.bgRemoved = true; el.bgTol = tol;
      delete ratios[el.id];
      renderCanvas(); renderProps(); commit();
      PM_toast(T("studio.bgDone"));
    };
    im.onerror = function () { PM_toast(T("studio.bgRemoveFail")); };
    im.src = src;
  }
  function restoreBg(el) {
    if (!el || !el.srcOriginal) return;
    el.src = el.srcOriginal; delete el.srcOriginal; delete el.bgRemoved; delete el.bgTol;
    delete ratios[el.id];
    renderProps(); renderCanvas(); commit();
  }

  /* ================= Properties panel ================= */
  function field(label, inner) { return '<div class="st-field"><label>' + label + '</label>' + inner + '</div>'; }
  function dropdown(id, opts, val) { return '<select id="' + id + '" class="select" style="width:100%">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === val ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>'; }
  function swatches(id, val) { return '<div class="st-swatches" data-for="' + id + '">' + COLORS.map(function (c) { return '<button class="st-sw' + (c.toLowerCase() === (val || "").toLowerCase() ? " active" : "") + '" data-c="' + c + '" aria-label="Kleur ' + c + '" style="background:' + c + (c === "#ffffff" || c === "#f2fbf5" ? ";border:1px solid #ddd" : "") + '"></button>'; }).join("") + '</div>'; }
  function slider(id, min, max, val, unit, step) {
    return '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + (step || 1) + '" value="' + val + '"><span class="st-val" id="' + id + '-v">' + val + (unit || "") + '</span>';
  }
  function numRow(items) {
    return '<div class="st-numrow">' + items.map(function (it) {
      return '<label class="st-num"><span>' + it[0] + '</span><input type="number" id="' + it[1] + '" value="' + it[2] + '" step="1"></label>';
    }).join("") + '</div>';
  }

  function renderProps() {
    var box = $("st-props");
    var list = selEls();
    if (!list.length) {
      box.innerHTML = '<div class="st-props-empty">' + icn("move") + '<p>' + T("studio.propsEmpty") + '</p>' +
        '<div class="st-hint" style="margin-top:14px">' + T("studio.propsEmptyTip") + '</div>' +
        '<div class="st-hint" style="margin-top:10px">' + T("studio.propsBrandNote") + '</div></div>';
      return;
    }

    if (list.length > 1) {
      var grouped = list.every(function (e) { return e.group && e.group === list[0].group; });
      box.innerHTML = '<div class="st-props-head"><span>' + T("studio.propsElements", { n: list.length }) + '</span>' +
        '<button class="st-del" id="p-del" title="' + T("studio.kbdDelete") + '">' + icn("trash") + '</button></div>' +
        '<button class="btn ' + (grouped ? "btn--ghost" : "btn--primary") + ' btn--sm btn--block" id="p-group" style="margin-bottom:10px">' + icn(grouped ? "ungroup" : "group") + (grouped ? T("studio.ungroup") : T("studio.group")) + '</button>' +
        field(T("studio.alignPage"), alignRow()) +
        (list.length >= 3 ? field(T("studio.distribute"), '<div class="st-layers"><button id="p-disth">' + icn("distH") + T("studio.distributeH") + '</button><button id="p-distv">' + icn("distV") + T("studio.distributeV") + '</button></div>') : "") +
        '<button class="btn btn--ghost btn--sm btn--block" id="p-dup" style="margin:4px 0 10px">' + icn("copy") + T("studio.kbdDuplicate") + '</button>' +
        '<div class="st-layers"><button id="p-front">' + icn("front") + T("studio.layerUp") + '</button><button id="p-back">' + icn("back") + T("studio.layerDown") + '</button></div>';
      $("p-del").addEventListener("click", deleteSel);
      $("p-group").addEventListener("click", grouped ? ungroupSel : groupSel);
      var dh = $("p-disth"), dv = $("p-distv");
      if (dh) dh.addEventListener("click", function () { distributeSel("h"); });
      if (dv) dv.addEventListener("click", function () { distributeSel("v"); });
      $("p-dup").addEventListener("click", duplicateSel);
      $("p-front").addEventListener("click", function () { reorderSel(1, true); });
      $("p-back").addEventListener("click", function () { reorderSel(-1, true); });
      wireAlignRow(box);
      return;
    }

    var el = list[0];
    var typeName = el.type === "text" ? T("studio.layerText") : el.type === "image" ? T("studio.layerImage") : (DL("studioShapes", SHAPE_NAMES[el.shape]) || T("studio.layerShape"));
    var h = '<div class="st-props-head"><span>' + typeName + '</span><span style="display:flex;gap:6px">' +
      '<button class="st-del st-neutral" id="p-lock" title="' + T(el.locked ? "studio.layerUnlock" : "studio.layerLock") + '">' + icn(el.locked ? "lock" : "unlock") + '</button>' +
      '<button class="st-del" id="p-del" title="' + T("studio.propDelete") + '">' + icn("trash") + '</button></span></div>';

    // Positie & afmetingen
    var isText = el.type === "text";
    h += field(T("studio.propPosRot"), numRow([["X", "p-x", Math.round(el.x)], ["Y", "p-y", Math.round(el.y)], ["B", "p-wn", Math.round(el.w)]].concat(isText ? [] : [["H", "p-hn", Math.round(el.h)]]).concat([["°", "p-rot", Math.round(el.rot || 0)]])));
    h += field(T("studio.alignPage"), alignRow());

    if (el.type === "text") {
      h += field(T("studio.propText"), '<textarea id="p-text" rows="3">' + PM_escape(el.text) + '</textarea>');
      h += field(T("studio.propFontSize"), slider("p-size", 8, 200, el.size, "px"));
      h += field(T("studio.propWeight"), dropdown("p-weight", [["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"], ["800", "Extrabold"]], String(el.weight)));
      h += field(T("studio.propAlign"), '<div class="st-seg" id="p-align">' + ["left", "center", "right"].map(function (a) { return '<button data-a="' + a + '" class="' + (el.align === a ? "active" : "") + '">' + T(a === "left" ? "studio.alignLeft" : a === "center" ? "studio.alignCenter" : "studio.alignRight") + '</button>'; }).join("") + '</div>');
      h += field(T("studio.propStyle"), '<div class="st-checkrow">' +
        '<label class="st-check"><input type="checkbox" id="p-italic" ' + (el.italic ? "checked" : "") + '> ' + T("studio.propItalic") + '</label>' +
        '<label class="st-check"><input type="checkbox" id="p-underline" ' + (el.underline ? "checked" : "") + '> ' + T("studio.propUnderline") + '</label>' +
        '<label class="st-check"><input type="checkbox" id="p-shadow" ' + (el.shadow ? "checked" : "") + '> ' + T("studio.propShadow") + '</label></div>');
      h += field(T("studio.propLineHeight"), slider("p-lh", 0.9, 2, el.lh || 1.18, "", 0.02));
      h += field(T("studio.propLetterSpacing"), slider("p-ls", -2, 20, el.ls || 0, "px", 0.5));
      h += field(T("studio.propColor"), swatches("p-color", el.color));
    } else if (el.type === "image") {
      h += field(T("studio.propFit"), '<div class="st-seg" id="p-fit"><button data-f="contain" class="' + (el.fit === "contain" ? "active" : "") + '">Contain</button><button data-f="cover" class="' + (el.fit === "cover" ? "active" : "") + '">Cover</button></div>');
      h += field(T("studio.propRadius"), slider("p-radius", 0, 400, el.radius || 0, "px"));
      h += field(T("studio.propMirror"), '<div class="st-layers"><button id="p-fliph" class="' + (el.flipH ? "on" : "") + '">' + icn("flipH") + T("studio.propMirrorH") + '</button><button id="p-flipv" class="' + (el.flipV ? "on" : "") + '">' + icn("flipV") + T("studio.propMirrorV") + '</button></div>');
      var fl = el.filters || { br: 100, ct: 100, sa: 100, bl: 0, gs: 0 };
      h += '<div class="st-grouplbl" style="margin-top:4px">' + T("studio.propFilters") + '</div>';
      h += field(T("studio.propBrightness"), slider("p-f-br", 40, 160, fl.br, "%"));
      h += field(T("studio.propContrast"), slider("p-f-ct", 40, 160, fl.ct, "%"));
      h += field(T("studio.propSaturation"), slider("p-f-sa", 0, 200, fl.sa, "%"));
      h += field(T("studio.propBlur"), slider("p-f-bl", 0, 10, fl.bl, "px", 0.5));
      h += field(T("studio.propGrayscale"), slider("p-f-gs", 0, 100, fl.gs, "%"));
      h += '<button class="btn btn--ghost btn--sm btn--block" id="p-freset" style="margin-bottom:10px">' + T("studio.propFilterReset") + '</button>';
      h += '<button class="btn btn--ghost btn--sm btn--block" id="p-crop" style="margin-bottom:6px">' + icn("crop") + T("studio.crop") + '</button>';
      if (el.crop) h += '<button class="btn btn--ghost btn--sm btn--block" id="p-uncrop" style="margin-bottom:6px">' + icn("x") + T("studio.cropReset") + '</button>';
      h += '<button class="btn ' + (el.bgRemoved ? "btn--ghost" : "btn--primary") + ' btn--sm btn--block" id="p-bgremove" style="margin-bottom:6px">' + icn("sparkles") + T(el.bgRemoved ? "studio.bgRedo" : "studio.bgRemove") + '</button>';
      if (el.bgRemoved) {
        h += field(T("studio.bgTolerance"), slider("p-bgtol", 8, 120, el.bgTol != null ? el.bgTol : 42, ""));
        h += '<button class="btn btn--ghost btn--sm btn--block" id="p-bgrestore" style="margin-bottom:6px">' + icn("undo") + T("studio.bgRestore") + '</button>';
      }
      h += '<button class="btn btn--ghost btn--sm btn--block" id="p-replace" style="margin-bottom:6px">' + icn("image") + T("studio.propReplace") + '</button>';
    } else if (el.shape === "fade") {
      h += field(T("studio.propFadeDir"), '<div class="st-seg" id="p-dir">' + [["bottom", T("studio.dirBottom")], ["corner", T("studio.dirCorner")], ["diagonal", T("studio.dirDiagonal")], ["top", T("studio.dirTop")]].map(function (d) { return '<button data-d="' + d[0] + '" class="' + (el.dir === d[0] ? "active" : "") + '">' + d[1] + '</button>'; }).join("") + '</div>');
      h += field(T("studio.propColor"), swatches("p-color", el.color));
    } else if (el.shape === "line") {
      h += field(T("studio.propThickness"), slider("p-thick", 1, 60, el.h, "px"));
      h += field(T("studio.propColor"), swatches("p-color", el.color));
    } else {
      h += field(T("studio.propColor"), swatches("p-color", el.color));
      if (el.shape === "pill" || el.shape === "rect" || el.shape === "ellipse") {
        h += field(T("studio.propShapeText"), '<input type="text" id="p-stext" value="' + PM_escape(el.text || "") + '">');
        if (el.text) {
          h += field(T("studio.propTextColor"), swatches("p-textcolor", el.textColor || "#ffffff"));
          h += field(T("studio.propTextSize"), slider("p-ssize", 10, 120, el.size || 28, "px"));
        }
        if (el.shape === "rect") h += field(T("studio.propCornerRadius"), slider("p-srad", 0, 200, el.radius != null ? el.radius : 6, "px"));
        h += field(T("studio.propStroke"), slider("p-stroke", 0, 24, el.strokeW || 0, "px"));
        if (el.strokeW > 0) h += field(T("studio.propStrokeColor"), swatches("p-strokecolor", el.strokeColor || "#0d1117"));
      }
    }

    var op = Math.round((el.opacity != null ? el.opacity : 1) * 100);
    h += field(T("studio.propOpacity"), slider("p-op", 10, 100, op, "%"));
    h += '<button class="btn btn--ghost btn--sm btn--block" id="p-dup" style="margin:4px 0 10px">' + icn("copy") + T("studio.propDuplicate") + '</button>';
    h += '<div class="st-layers"><button id="p-front" title="' + T("studio.ctxToFront") + '">' + icn("front") + T("studio.propFront") + '</button><button id="p-fw" title="' + T("studio.ctxForward") + '">' + icn("up") + '</button><button id="p-bw" title="' + T("studio.ctxBackward") + '">' + icn("down") + '</button><button id="p-back" title="' + T("studio.ctxToBack") + '">' + icn("back") + T("studio.propBack") + '</button></div>';
    box.innerHTML = h;
    wireProps(el);
  }

  function alignRow() {
    var btns = [["l", "alignL", T("studio.alignLeft")], ["ch", "alignCH", T("studio.alignCenterH")], ["r", "alignR", T("studio.alignRight")], ["t", "alignT", T("studio.alignTop")], ["cv", "alignCV", T("studio.alignCenterV")], ["b", "alignB", T("studio.alignBottom")]];
    return '<div class="st-alignrow">' + btns.map(function (b) { return '<button data-alg="' + b[0] + '" title="' + b[2] + '">' + icn(b[1]) + '</button>'; }).join("") + '</div>';
  }
  function wireAlignRow(box) {
    box.querySelectorAll("[data-alg]").forEach(function (b) { b.addEventListener("click", function () { alignSel(b.getAttribute("data-alg")); }); });
  }

  function bindSlider(id, fn, commitOnChange) {
    var s = $(id); if (!s) return;
    s.addEventListener("input", function () {
      var v = parseFloat(this.value);
      $(id + "-v").textContent = this.value + ($(id + "-v").textContent.replace(/^[\d.,\-]+/, "") || "");
      fn(v);
      renderCanvas(); syncSelBoxes();
    });
    s.addEventListener("change", function () { commit(); if (commitOnChange) renderProps(); });
  }

  function wireProps(el) {
    var box = $("st-props");
    $("p-del").addEventListener("click", deleteSel);
    $("p-lock") && $("p-lock").addEventListener("click", function () { toggleLock(el); });
    var pf = $("p-front"), pb = $("p-back"), pfw = $("p-fw"), pbw = $("p-bw");
    pf && pf.addEventListener("click", function () { reorderSel(1, true); });
    pb && pb.addEventListener("click", function () { reorderSel(-1, true); });
    pfw && pfw.addEventListener("click", function () { reorderSel(1); });
    pbw && pbw.addEventListener("click", function () { reorderSel(-1); });
    var dup = $("p-dup"); if (dup) dup.addEventListener("click", duplicateSel);
    wireAlignRow(box);

    // Positie
    [["p-x", "x"], ["p-y", "y"]].forEach(function (m) {
      var inp = $(m[0]); if (!inp) return;
      inp.addEventListener("input", function () { el[m[1]] = parseFloat(this.value) || 0; renderCanvas(); });
      inp.addEventListener("change", function () { commit(); });
    });
    var wn = $("p-wn");
    if (wn) {
      wn.addEventListener("input", function () {
        var v = Math.max(10, parseFloat(this.value) || el.w);
        if (el.type === "image") { var r = el.w / el.h; el.w = v; el.h = Math.round(v / r); var hn0 = $("p-hn"); if (hn0) hn0.value = el.h; }
        else el.w = v;
        renderCanvas();
      });
      wn.addEventListener("change", function () { commit(); });
    }
    var hn = $("p-hn");
    if (hn) {
      hn.addEventListener("input", function () { el.h = Math.max(4, parseFloat(this.value) || el.h); renderCanvas(); });
      hn.addEventListener("change", function () { commit(); });
    }
    var rot = $("p-rot");
    if (rot) {
      rot.addEventListener("input", function () { el.rot = (parseFloat(this.value) || 0) % 360; renderCanvas(); });
      rot.addEventListener("change", function () { commit(); });
    }

    if (el.type === "text") {
      $("p-text").addEventListener("input", function () { el.text = this.value; renderCanvas(); });
      $("p-text").addEventListener("change", function () { commit(); });
      bindSlider("p-size", function (v) { el.size = v; });
      $("p-weight").addEventListener("change", function () { el.weight = +this.value; renderCanvas(); commit(); });
      $("p-align").querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { el.align = b.getAttribute("data-a"); renderProps(); renderCanvas(); commit(); }); });
      $("p-italic").addEventListener("change", function () { el.italic = this.checked; renderCanvas(); commit(); });
      $("p-underline").addEventListener("change", function () { el.underline = this.checked; renderCanvas(); commit(); });
      $("p-shadow").addEventListener("change", function () { el.shadow = this.checked; renderCanvas(); commit(); });
      bindSlider("p-lh", function (v) { el.lh = v; });
      bindSlider("p-ls", function (v) { el.ls = v; });
    } else if (el.type === "image") {
      $("p-fit").querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { el.fit = b.getAttribute("data-f"); renderProps(); renderCanvas(); commit(); }); });
      bindSlider("p-radius", function (v) { el.radius = v; });
      $("p-fliph").addEventListener("click", function () { el.flipH = !el.flipH; renderProps(); renderCanvas(); commit(); });
      $("p-flipv").addEventListener("click", function () { el.flipV = !el.flipV; renderProps(); renderCanvas(); commit(); });
      function flt() { if (!el.filters) el.filters = { br: 100, ct: 100, sa: 100, bl: 0, gs: 0 }; return el.filters; }
      bindSlider("p-f-br", function (v) { flt().br = v; });
      bindSlider("p-f-ct", function (v) { flt().ct = v; });
      bindSlider("p-f-sa", function (v) { flt().sa = v; });
      bindSlider("p-f-bl", function (v) { flt().bl = v; });
      bindSlider("p-f-gs", function (v) { flt().gs = v; });
      $("p-freset").addEventListener("click", function () { el.filters = null; renderProps(); renderCanvas(); commit(); });
      $("p-crop").addEventListener("click", function () { startCrop(el); });
      var unc = $("p-uncrop"); if (unc) unc.addEventListener("click", function () { delete el.crop; renderProps(); renderCanvas(); commit(); });
      $("p-bgremove").addEventListener("click", function () { PM_toast(T("studio.bgWorking")); setTimeout(function () { removeBg(el); }, 30); });
      var bgtol = $("p-bgtol");
      if (bgtol) {
        bgtol.addEventListener("input", function () { var v = $("p-bgtol-v"); if (v) v.textContent = this.value; });
        bgtol.addEventListener("change", function () { el.bgTol = parseFloat(this.value); PM_toast(T("studio.bgWorking")); setTimeout(function () { removeBg(el); }, 30); });
      }
      var bgrest = $("p-bgrestore"); if (bgrest) bgrest.addEventListener("click", function () { restoreBg(el); });
      $("p-replace").addEventListener("click", function () { selectTab("images"); PM_toast(T("studio.chooseImg")); replaceTarget = el.id; });
    } else if (el.shape === "line") {
      bindSlider("p-thick", function (v) { el.h = v; });
    } else if (el.shape !== "fade") {
      var st = $("p-stext"); if (st) { st.addEventListener("input", function () { el.text = this.value; renderCanvas(); }); st.addEventListener("change", function () { renderProps(); commit(); }); }
      bindSlider("p-ssize", function (v) { el.size = v; });
      bindSlider("p-srad", function (v) { el.radius = v; });
      bindSlider("p-stroke", function (v) { el.strokeW = v; }, true);
    }
    var dir = $("p-dir"); if (dir) dir.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { el.dir = b.getAttribute("data-d"); renderProps(); renderCanvas(); commit(); }); });
    bindSlider("p-op", function (v) { el.opacity = v / 100; });

    box.querySelectorAll(".st-swatches").forEach(function (sw) {
      var target = sw.getAttribute("data-for");
      sw.querySelectorAll(".st-sw").forEach(function (b) {
        b.addEventListener("click", function () {
          var c = b.getAttribute("data-c");
          if (target === "p-textcolor") el.textColor = c;
          else if (target === "p-strokecolor") el.strokeColor = c;
          else el.color = c;
          renderProps(); renderCanvas(); commit();
        });
      });
    });
  }
  var replaceTarget = null;
  // vervang-afbeelding flow: klik in beeldpaneel vervangt het doelelement
  document.addEventListener("click", function (e) {
    if (!replaceTarget) return;
    var b = e.target.closest && e.target.closest("[data-img]");
    if (!b || !$("st-panel-body").contains(b)) return;
    var el = els().find(function (x) { return x.id === replaceTarget; });
    if (el && el.type === "image") {
      e.stopImmediatePropagation();
      var v = b.getAttribute("data-img");
      if (b.getAttribute("data-upload")) { var u = getUploads().find(function (x) { return x.id === v; }); if (u) el.src = u.data; }
      else el.src = v;
      delete ratios[el.id];
      renderCanvas(); select([el.id]); commit();
      PM_toast(T("studio.imgReplaced"));
    }
    replaceTarget = null;
  }, true);

  function syncPropValues() {
    var list = selEls();
    if (list.length !== 1) return;
    var el = list[0];
    var m = { "p-x": Math.round(el.x), "p-y": Math.round(el.y), "p-wn": Math.round(el.w), "p-hn": el.h != null ? Math.round(el.h) : null, "p-rot": Math.round(el.rot || 0) };
    Object.keys(m).forEach(function (id) { var inp = $(id); if (inp && m[id] != null && document.activeElement !== inp) inp.value = m[id]; });
  }

  /* ================= Pages ================= */
  function renderPagesBar() {
    var bar = $("st-pages");
    var f = fmt(), ar = f.w + "/" + f.h;
    var html = state.pages.map(function (p, i) {
      var active = i === state.page;
      return '<div class="st-page' + (active ? " active" : "") + '" data-page="' + i + '">' +
        '<span class="st-page-thumb" style="aspect-ratio:' + ar + '">' + (pageThumbs[i] ? '<img src="' + pageThumbs[i] + '">' : '<b>' + (i + 1) + '</b>') + '</span>' +
        '<span class="st-page-num">' + (i + 1) + '</span>' +
        (active && state.pages.length > 1 ? '<span class="st-page-acts">' +
          (i > 0 ? '<button data-pmove="-1" title="' + T("studio.pageLeft") + '">‹</button>' : '') +
          '<button data-pdup title="' + T("studio.pageDup") + '">⧉</button>' +
          '<button data-pdel title="' + T("studio.pageDel") + '">×</button>' +
          (i < state.pages.length - 1 ? '<button data-pmove="1" title="' + T("studio.pageRight") + '">›</button>' : '') +
          '</span>' : (active ? '<span class="st-page-acts"><button data-pdup title="' + T("studio.pageDup") + '">⧉</button></span>' : '')) +
        '</div>';
    }).join("");
    html += '<button class="st-page-add" id="st-page-add" title="' + T("studio.pageAdd") + '">' + icn("plus") + '</button>';
    bar.innerHTML = html;

    bar.querySelectorAll("[data-page]").forEach(function (chip) {
      chip.addEventListener("click", function (e) {
        if (e.target.closest("button")) return;
        var i = +chip.getAttribute("data-page");
        if (i !== state.page) { state.page = i; select([]); renderCanvas(); }
      });
    });
    $("st-page-add").addEventListener("click", function () {
      state.pages.push(newPage(JSON.parse(JSON.stringify(cur().bg))));
      state.page = state.pages.length - 1;
      select([]); renderCanvas(); commit();
      PM_track && PM_track("page_add", "studio");
    });
    var pd = bar.querySelector("[data-pdup]");
    if (pd) pd.addEventListener("click", function () {
      var copy = JSON.parse(JSON.stringify(cur()));
      copy.elements.forEach(function (e) { e.id = nid(); });
      state.pages.splice(state.page + 1, 0, copy);
      pageThumbs.splice(state.page + 1, 0, pageThumbs[state.page]);
      state.page++;
      select([]); renderCanvas(); commit();
    });
    var px = bar.querySelector("[data-pdel]");
    if (px) px.addEventListener("click", function () {
      if (state.pages.length < 2) return;
      var doDel = function () {
        state.pages.splice(state.page, 1);
        pageThumbs.splice(state.page, 1);
        state.page = Math.min(state.page, state.pages.length - 1);
        select([]); renderCanvas(); commit();
      };
      if (!cur().elements.length) { doDel(); return; }
      if (window.PM_confirm) PM_confirm(T("studio.pageDelConfirm", { n: state.page + 1 }), doDel);
      else if (confirm(T("studio.pageDelConfirm", { n: state.page + 1 }))) doDel();
    });
    bar.querySelectorAll("[data-pmove]").forEach(function (b) {
      b.addEventListener("click", function () {
        var d = +b.getAttribute("data-pmove"), i = state.page, j = i + d;
        if (j < 0 || j >= state.pages.length) return;
        var pg = state.pages.splice(i, 1)[0]; state.pages.splice(j, 0, pg);
        var th = pageThumbs.splice(i, 1)[0]; pageThumbs.splice(j, 0, th);
        state.page = j;
        renderCanvas(); commit();
      });
    });
  }
  var thumbTimer = null;
  function schedulePageThumb() {
    clearTimeout(thumbTimer);
    thumbTimer = setTimeout(function () {
      var i = state.page;
      renderPageToCanvas(state.pages[i], fmt(), 64 / fmt().w).then(function (cv) {
        pageThumbs[i] = cv.toDataURL("image/jpeg", 0.6);
        var chip = $("st-pages") && $("st-pages").querySelector('[data-page="' + i + '"] .st-page-thumb');
        if (chip) chip.innerHTML = '<img src="' + pageThumbs[i] + '">';
      });
    }, 700);
  }

  /* ================= Save / open (localStorage) ================= */
  var STORE = "pm_designs";
  function getDesigns() { try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch (e) { return []; } }
  function setDesigns(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); return true; }
    catch (e) { PM_toast(T("studio.saveFailed")); return false; }
  }
  function saveDesign(opts) {
    opts = opts || {};
    var list = getDesigns();
    if (!state.id) state.id = "d_" + Date.now();
    var user = (window.PM_AUTH && PM_AUTH.getUser && PM_AUTH.getUser()) || {};
    var i = list.findIndex(function (d) { return d.id === state.id; });
    var existing = i > -1 ? list[i] : {};
    var snap = Object.assign({}, existing, {
      id: state.id,
      name: state.name,
      format: state.format,
      customSize: state.customSize,
      pages: JSON.parse(JSON.stringify(state.pages)),
      updated: new Date().toISOString(),
      status: state.status || existing.status || "draft",
      feedback: state.feedback || existing.feedback || "",
      ownerEmail: state.ownerEmail || existing.ownerEmail || user.email || "",
      ownerName: existing.ownerName || user.name || "",
      company: existing.company || user.company || ""
    });
    state.status = snap.status || "draft";
    state.feedback = snap.feedback || "";
    state.ownerEmail = snap.ownerEmail || "";
    if (i > -1) snap.thumb = list[i].thumb;
    if (i > -1) list[i] = snap; else list.push(snap);
    if (!setDesigns(list)) return null;
    renderPageToCanvas(state.pages[0], fmt(), 0.3).then(function (cv) {
      var thumb = cv.toDataURL("image/jpeg", 0.6);
      var l2 = getDesigns(); var k = l2.findIndex(function (d) { return d.id === snap.id; });
      if (k > -1) { l2[k].thumb = thumb; setDesigns(l2); }
    });
    if (window.PM_track) PM_track("design_save", state.name);
    renderStatus();
    if (!opts.silent) PM_toast(T("studio.saved"));
    return snap;
  }
  function submitDesign() {
    var snap = saveDesign({ silent: true });
    if (!snap) return;
    if (window.PM_DESIGNS) PM_DESIGNS.setStatus(state.id, "submitted", "");
    state.status = "submitted";
    state.feedback = "";
    renderStatus();
    PM_toast("Ontwerp ingediend ter goedkeuring");
  }
  function migrate(d) {
    if (d.pages) return d;
    d.pages = [{ bg: d.bg || { type: "color", value: "#ffffff" }, elements: d.elements || [] }];
    return d;
  }
  function openModal() {
    var list = getDesigns().sort(function (a, b) { return a.updated < b.updated ? 1 : -1; });
    var m = $("st-open-modal");
    $("st-open-body").innerHTML = list.length ? '<div class="st-saved-grid">' + list.map(function (d) {
      var f = d.format === "custom" ? (d.customSize || { w: 1080, h: 1080 }) : (FORMATS[d.format] || FORMATS["ig-square"]);
      var pcount = d.pages ? d.pages.length : 1;
      var fb = d.feedback ? " - " + d.feedback : "";
      return '<div class="st-saved"><button class="st-saved-thumb" data-open="' + d.id + '" style="aspect-ratio:' + f.w + '/' + f.h + '">' + (d.thumb ? '<img src="' + d.thumb + '">' : '<span>' + PM_escape(d.name) + '</span>') + (pcount > 1 ? '<span class="st-saved-pages">' + T("studio.pageCount", { n: pcount }) + '</span>' : '') + '</button>' +
        '<div class="st-saved-meta"><b>' + PM_escape(d.name) + '</b><span>' + statusText(d.status || "draft") + fb + ' - ' + new Date(d.updated).toLocaleString(window.PM_I18N ? PM_I18N.intl() : "nl-NL") + '</span></div>' +
        '<div class="st-saved-act"><button class="btn btn--ghost btn--sm" data-open="' + d.id + '">' + T("studio.open") + '</button>' +
        '<button class="st-del st-neutral" data-rename="' + d.id + '" title="' + T("studio.rename") + '">✎</button>' +
        '<button class="st-del st-neutral" data-clone="' + d.id + '" title="' + T("studio.propDuplicate") + '">⧉</button>' +
        '<button class="st-del" data-del="' + d.id + '" title="' + T("studio.propDelete") + '">' + icn("trash") + '</button></div></div>';
    }).join("") + '</div>' : '<div class="empty">' + icn("save") + '<h4>' + T("studio.noDesigns") + '</h4><p>' + T("studio.noDesignsText") + '</p></div>';
    m.classList.add("open");
    $("st-open-body").querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", function () { doOpen(b.getAttribute("data-open")); }); });
    $("st-open-body").querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        var doDel = function () {
          setDesigns(getDesigns().filter(function (d) { return d.id !== b.getAttribute("data-del"); }));
          openModal();
        };
        if (window.PM_confirm) PM_confirm(T("studio.delConfirm"), doDel);
        else if (confirm(T("studio.delConfirm"))) doDel();
      });
    });
    $("st-open-body").querySelectorAll("[data-rename]").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = getDesigns(), d = l.find(function (x) { return x.id === b.getAttribute("data-rename"); });
        if (!d) return;
        stPrompt(T("studio.renamePrompt"), d.name, function (n) {
          if (n) { d.name = n.trim() || d.name; setDesigns(l); if (state.id === d.id) { state.name = d.name; $("st-name").value = d.name; } openModal(); }
        }, { ok: "Opslaan" });
      });
    });
    $("st-open-body").querySelectorAll("[data-clone]").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = getDesigns(), d = l.find(function (x) { return x.id === b.getAttribute("data-clone"); });
        if (!d) return;
        var copy = JSON.parse(JSON.stringify(d));
        copy.id = "d_" + Date.now(); copy.name = d.name + " " + T("studio.copySuffix"); copy.updated = new Date().toISOString();
        copy.status = "draft"; copy.feedback = ""; copy.submittedAt = null; copy.approvedAt = null; copy.downloadedAt = null;
        l.push(copy); setDesigns(l); openModal();
      });
    });
  }
  function doOpen(id) {
    var d = getDesigns().find(function (x) { return x.id === id; }); if (!d) return;
    d = migrate(JSON.parse(JSON.stringify(d)));
    state.id = d.id; state.name = d.name; state.format = d.format;
    state.customSize = d.customSize || { w: 1080, h: 1080 };
    state.pages = d.pages; state.page = 0; state.sel = []; state.zoom = null;
    state.status = d.status || "draft"; state.feedback = d.feedback || ""; state.ownerEmail = d.ownerEmail || "";
    pageThumbs = [];
    $("st-name").value = d.name; $("st-format").value = FORMATS[d.format] ? d.format : "ig-square";
    $("st-open-modal").classList.remove("open");
    applyView(); renderCanvas(); renderProps(); renderStatus(); resetHistory(); autosave();
    PM_toast(T("studio.opened"));
  }

  /* ================= Canvas renderer (export) ================= */
  function loadImg(src) { return new Promise(function (res) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; }); }
  function roundRectPath(ctx, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function ptsPath(ctx, pts, x, y, w, h) {
    ctx.beginPath();
    pts.forEach(function (p, i) {
      var px = x + p[0] * w / 100, py = y + p[1] * h / 100;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.closePath();
  }
  function canvasFade(ctx, el) {
    var c = el.color || "#13A538", g;
    if (el.dir === "corner") { var r = Math.max(el.w, el.h) * 1.15; g = ctx.createRadialGradient(el.x, el.y + el.h, 0, el.x, el.y + el.h, r); g.addColorStop(0, c); g.addColorStop(0.62, rgba(c, 0)); }
    else if (el.dir === "diagonal") { g = ctx.createLinearGradient(el.x, el.y, el.x + el.w, el.y + el.h); g.addColorStop(0, c); g.addColorStop(0.78, rgba(c, 0)); }
    else if (el.dir === "top") { g = ctx.createLinearGradient(el.x, el.y, el.x, el.y + el.h); g.addColorStop(0, c); g.addColorStop(1, rgba(c, 0)); }
    else { g = ctx.createLinearGradient(el.x, el.y + el.h, el.x, el.y); g.addColorStop(0, c); g.addColorStop(1, rgba(c, 0)); }
    return g;
  }
  function drawBg(ctx, bg, w, h) {
    var bt = bg && bg.type;
    if (bt === "grad") { var g = ctx.createLinearGradient(0, 0, w, h); g.addColorStop(0, "#16b03d"); g.addColorStop(1, "#0c7026"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); return; }
    ctx.fillStyle = (bt === "greenfade-bottom" || bt === "greenfade-corner" || bt === "image") ? "#ffffff" : ((bg && bg.value) || "#ffffff");
    ctx.fillRect(0, 0, w, h);
    if (bt === "greenfade-bottom") { var gb = ctx.createLinearGradient(0, h, 0, 0); gb.addColorStop(0, rgba("#13A538", 0.9)); gb.addColorStop(0.58, rgba("#13A538", 0)); ctx.fillStyle = gb; ctx.fillRect(0, 0, w, h); }
    else if (bt === "greenfade-corner") { var rad = Math.max(w, h) * 1.15; var gc = ctx.createRadialGradient(0, h, 0, 0, h, rad); gc.addColorStop(0, rgba("#13A538", 0.95)); gc.addColorStop(0.6, rgba("#13A538", 0)); ctx.fillStyle = gc; ctx.fillRect(0, 0, w, h); }
  }
  function drawCover(ctx, im, x, y, w, h) { var ir = im.width / im.height, tr = w / h, sw, sh, sx, sy; if (ir > tr) { sh = im.height; sw = sh * tr; sx = (im.width - sw) / 2; sy = 0; } else { sw = im.width; sh = sw / tr; sx = 0; sy = (im.height - sh) / 2; } ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h); }
  function drawContain(ctx, im, x, y, w, h) { var ir = im.width / im.height, tr = w / h, dw, dh; if (ir > tr) { dw = w; dh = w / ir; } else { dh = h; dw = h * ir; } ctx.drawImage(im, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh); }
  function imgFilterCanvas(el) {
    var fl = el.filters; if (!fl) return "none";
    var s = imgFilterCss(el);
    return s || "none";
  }

  function renderPageToCanvas(page, f, scale) {
    scale = scale || 2;
    var cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(f.w * scale));
    cv.height = Math.max(1, Math.round(f.h * scale));
    var ctx = cv.getContext("2d");
    ctx.scale(scale, scale);
    drawBg(ctx, page.bg, f.w, f.h);

    var chain = Promise.resolve();
    if (page.bg && page.bg.type === "image") {
      chain = chain.then(function () { return loadImg(page.bg.value); }).then(function (im) { if (im) drawCover(ctx, im, 0, 0, f.w, f.h); });
    }
    page.elements.forEach(function (el) {
      if (el.hidden) return;
      chain = chain.then(function () {
        var alpha = (el.opacity != null) ? el.opacity : 1;
        var rot = (el.rot || 0) * Math.PI / 180;

        if (el.type === "text") {
          var elx = Object.assign({}, el);
          var lines = wrapText(measureCtx, elx);
          var lh = el.size * (el.lh || 1.18);
          var h = Math.max(lh, lines.length * lh);
          ctx.save(); ctx.globalAlpha = alpha;
          ctx.translate(el.x + el.w / 2, el.y + h / 2);
          if (rot) ctx.rotate(rot);
          ctx.fillStyle = el.color;
          ctx.font = fontStr(el);
          try { ctx.letterSpacing = (el.ls || 0) + "px"; } catch (e) {}
          ctx.textBaseline = "top"; ctx.textAlign = el.align;
          if (el.shadow) { ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 8 * scale; ctx.shadowOffsetY = 2 * scale; }
          var tx = el.align === "center" ? 0 : el.align === "right" ? el.w / 2 : -el.w / 2;
          var padTop = (lh - el.size) / 2;
          lines.forEach(function (ln, i) {
            var y = -h / 2 + i * lh + padTop;
            ctx.fillText(ln, tx, y);
            if (el.underline && ln) {
              var lw = ctx.measureText(ln).width;
              var ux = el.align === "center" ? -lw / 2 : el.align === "right" ? el.w / 2 - lw : -el.w / 2;
              ctx.save(); ctx.shadowColor = "transparent";
              ctx.fillRect(ux, y + el.size * 1.02, lw, Math.max(1, el.size / 14));
              ctx.restore();
            }
          });
          ctx.restore();
        } else if (el.type === "shape") {
          ctx.save(); ctx.globalAlpha = alpha;
          ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
          if (rot) ctx.rotate(rot);
          var x = -el.w / 2, y = -el.h / 2, w = el.w, h2 = el.h;
          if (el.shape === "fade") {
            ctx.translate(-el.x - el.w / 2, -el.y - el.h / 2);
            ctx.fillStyle = canvasFade(ctx, el); ctx.fillRect(el.x, el.y, el.w, el.h);
          } else if (el.shape === "triangle" || el.shape === "star") {
            ctx.fillStyle = el.color;
            ptsPath(ctx, el.shape === "star" ? STAR_PTS : TRIANGLE_PTS, x, y, w, h2);
            ctx.fill();
          } else if (el.shape === "line") {
            ctx.fillStyle = el.color;
            roundRectPath(ctx, x, y, w, h2, h2 / 2); ctx.fill();
          } else {
            ctx.fillStyle = el.color;
            var rr = el.shape === "ellipse" ? Math.min(w, h2) / 2 : el.shape === "pill" ? h2 / 2 : (el.radius != null ? el.radius : 6);
            roundRectPath(ctx, x, y, w, h2, rr); ctx.fill();
            if (el.strokeW > 0) {
              ctx.strokeStyle = el.strokeColor || "#0d1117"; ctx.lineWidth = el.strokeW;
              roundRectPath(ctx, x + el.strokeW / 2, y + el.strokeW / 2, w - el.strokeW, h2 - el.strokeW, Math.max(0, rr - el.strokeW / 2));
              ctx.stroke();
            }
            if (el.text) {
              ctx.fillStyle = el.textColor; ctx.font = "700 " + el.size + "px 'Libre Franklin', sans-serif";
              ctx.textBaseline = "middle"; ctx.textAlign = "center";
              ctx.fillText(el.text, 0, 2);
            }
          }
          ctx.restore();
        } else if (el.type === "image") {
          return loadImg(el.src).then(function (im) {
            if (!im) return;
            ctx.save(); ctx.globalAlpha = alpha;
            ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
            if (rot) ctx.rotate(rot);
            if (el.radius) { roundRectPath(ctx, -el.w / 2, -el.h / 2, el.w, el.h, el.radius); ctx.clip(); }
            if (el.flipH || el.flipV) ctx.scale(el.flipH ? -1 : 1, el.flipV ? -1 : 1);
            try { ctx.filter = imgFilterCanvas(el); } catch (e) {}
            if (el.crop) {
              var nw = im.width, nh = im.height;
              ctx.drawImage(im, el.crop.sx * nw, el.crop.sy * nh, el.crop.sw * nw, el.crop.sh * nh, -el.w / 2, -el.h / 2, el.w, el.h);
            } else if (el.fit === "cover") drawCover(ctx, im, -el.w / 2, -el.h / 2, el.w, el.h);
            else drawContain(ctx, im, -el.w / 2, -el.h / 2, el.w, el.h);
            ctx.restore();
          });
        }
      });
    });
    return chain.then(function () { return cv; });
  }

  /* ================= Template thumbnails ================= */
  var tplThumbs = {};
  var TPL_CACHE_KEY = "pm_tpl_thumbs_v2";
  try { tplThumbs = JSON.parse(sessionStorage.getItem(TPL_CACHE_KEY)) || {}; } catch (e) { tplThumbs = {}; }
  var tplRendering = false;
  function ensureTplThumbs() {
    if (tplRendering) return;
    var missing = TEMPLATES.filter(function (t) { return !tplThumbs[t.id] && t.id !== "blank"; });
    if (!missing.length) return;
    tplRendering = true;
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var chain = fontsReady;
    missing.forEach(function (t) {
      chain = chain.then(function () {
        var f = FORMATS[t.format];
        return renderPageToCanvas(t.build(), f, 150 / f.w).then(function (cv) {
          tplThumbs[t.id] = cv.toDataURL("image/jpeg", 0.62);
          var btn = $("st-panel-body").querySelector('[data-tpl="' + t.id + '"] .st-tpl-thumb');
          if (btn) btn.innerHTML = '<img src="' + tplThumbs[t.id] + '" alt="">';
        });
      });
    });
    chain.then(function () {
      tplRendering = false;
      try { sessionStorage.setItem(TPL_CACHE_KEY, JSON.stringify(tplThumbs)); } catch (e) {}
    });
  }

  /* ================= Preview ================= */
  function preview() {
    var m = $("st-preview-modal");
    $("st-preview-body").innerHTML = '<div class="st-loading">Voorbeeld genereren…</div>';
    m.classList.add("open");
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    fontsReady.then(function () {
      var chain = Promise.resolve();
      var out = [];
      state.pages.forEach(function (p, i) {
        chain = chain.then(function () {
          return renderPageToCanvas(p, fmt(), Math.min(2, 1600 / fmt().w)).then(function (cv) { out.push(cv); });
        });
      });
      return chain.then(function () { return out; });
    }).then(function (cvs) {
      $("st-preview-body").innerHTML = "";
      cvs.forEach(function (cv, i) {
        if (cvs.length > 1) {
          var lbl = document.createElement("div"); lbl.className = "st-prev-lbl"; lbl.textContent = T("studio.page", { n: i + 1 });
          $("st-preview-body").appendChild(lbl);
        }
        var im = new Image(); im.src = cv.toDataURL("image/png"); im.className = "st-preview-img";
        $("st-preview-body").appendChild(im);
      });
    });
  }

  /* ================= Export ================= */
  function fname() { return (state.name || "plasmamade-ontwerp").replace(/[^\w\-]+/g, "-").toLowerCase(); }
  function download(url, name) {
    var a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    if (window.PM_DESIGNS && state.id) {
      PM_DESIGNS.markDownloaded(state.id, name);
      state.status = "downloaded";
      renderStatus();
    }
    PM_toast(T("studio.downloaded", { name: name }));
  }
  function exportAs(kind) {
    var saved = state.id ? (window.PM_DESIGNS && PM_DESIGNS.get(state.id)) : null;
    var approved = saved && (saved.status === "approved" || saved.status === "downloaded") && (state.status === "approved" || state.status === "downloaded");
    if (!approved) {
      saveDesign({ silent: true });
      PM_toast("Download is beschikbaar nadat PlasmaMade dit ontwerp heeft goedgekeurd.");
      renderStatus();
      return;
    }
    if (window.PM_track) PM_track("export", kind.toUpperCase());
    PM_toast(T("studio.exportPrep"));
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var suffix = state.pages.length > 1 ? "-p" + (state.page + 1) : "";

    fontsReady.then(function () {
      if (kind === "pdf") {
        var chain = Promise.resolve(), jpgs = [];
        state.pages.forEach(function (p) {
          chain = chain.then(function () {
            return renderPageToCanvas(p, fmt(), 2).then(function (cv) {
              jpgs.push({ b64: cv.toDataURL("image/jpeg", 0.92).split(",")[1], w: cv.width, h: cv.height });
            });
          });
        });
        chain.then(function () { download(jpegsToPdf(jpgs), fname() + ".pdf"); });
        return;
      }
      var scale = kind === "png3x" ? 3 : 2;
      renderPageToCanvas(cur(), fmt(), scale).then(function (cv) {
        if (kind === "png" || kind === "png3x") download(cv.toDataURL("image/png"), fname() + suffix + (kind === "png3x" ? "@3x" : "") + ".png");
        else if (kind === "jpg") download(cv.toDataURL("image/jpeg", 0.92), fname() + suffix + ".jpg");
        else if (kind === "clip") {
          cv.toBlob(function (blob) {
            if (!blob || !navigator.clipboard || !window.ClipboardItem) { PM_toast(T("studio.clipUnsupported")); return; }
            navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
              .then(function () { PM_toast(T("studio.clipCopied")); })
              .catch(function () { PM_toast(T("studio.clipFailed")); });
          }, "image/png");
        }
      });
    });
  }

  /* JPEG('s) -> PDF zonder libraries (DCTDecode-embed) */
  function jpegsToPdf(pages) {
    var objs = [], kids = [];
    for (var i = 0; i < pages.length; i++) kids.push((3 + i * 3) + " 0 R");
    objs.push({ body: "<< /Type /Catalog /Pages 2 0 R >>" });
    objs.push({ body: "<< /Type /Pages /Kids [" + kids.join(" ") + "] /Count " + pages.length + " >>" });
    pages.forEach(function (p, i) {
      var bin = atob(p.b64);
      var ptW = (p.w * 72 / 192).toFixed(2), ptH = (p.h * 72 / 192).toFixed(2); // 2x render → 96dpi maat
      var pid = 3 + i * 3;
      objs.push({ body: "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + ptW + " " + ptH + "] /Resources << /XObject << /Im" + i + " " + (pid + 1) + " 0 R >> >> /Contents " + (pid + 2) + " 0 R >>" });
      objs.push({ pre: "<< /Type /XObject /Subtype /Image /Width " + p.w + " /Height " + p.h + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + bin.length + " >>\nstream\n", img: bin, post: "\nendstream" });
      var content = "q\n" + ptW + " 0 0 " + ptH + " 0 0 cm\n/Im" + i + " Do\nQ";
      objs.push({ body: "<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream" });
    });
    var header = "%PDF-1.4\n", out = header, pos = header.length, offsets = [];
    objs.forEach(function (o, idx) {
      var head = (idx + 1) + " 0 obj\n", tail = "\nendobj\n";
      offsets.push(pos);
      var s = o.img !== undefined ? head + o.pre + o.img + o.post + tail : head + o.body + tail;
      out += s; pos += s.length;
    });
    var xref = "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
    offsets.forEach(function (off) { xref += ("0000000000" + off).slice(-10) + " 00000 n \n"; });
    out += xref + "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + pos + "\n%%EOF";
    var bytes = new Uint8Array(out.length);
    for (var c = 0; c < out.length; c++) bytes[c] = out.charCodeAt(c) & 0xff;
    return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  }

  /* ================= Context menu ================= */
  var ctxMenu = null;
  function bindContextMenu() {
    wrap.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      var elNode = e.target.closest && e.target.closest(".st-el");
      var items = [];
      if (elNode) {
        var id = elNode.getAttribute("data-id");
        var el = els().find(function (x) { return x.id === id; });
        if (el && state.sel.indexOf(id) === -1) select([id]);
        items = [
          [T("studio.propDuplicate"), "copy", duplicateSel],
          [T("studio.ctxCopy"), "copy", copySel],
          [T("studio.ctxCut"), "copy", function () { copySel(); deleteSel(); }],
          null,
          [T("studio.ctxToFront"), "front", function () { reorderSel(1, true); }],
          [T("studio.ctxForward"), "up", function () { reorderSel(1); }],
          [T("studio.ctxBackward"), "down", function () { reorderSel(-1); }],
          [T("studio.ctxToBack"), "back", function () { reorderSel(-1, true); }],
          null,
          [T(el && el.locked ? "studio.layerUnlock" : "studio.layerLock"), el && el.locked ? "unlock" : "lock", function () { if (el) toggleLock(el); }],
          [T("studio.layerHide"), "eyeOff", function () { if (el) toggleHide(el); }],
          null,
          [T("studio.propDelete"), "trash", deleteSel]
        ];
      } else {
        items = [
          [T("studio.ctxPaste"), "copy", pasteClipboard],
          [T("studio.kbdSelectAll"), "move", function () { select(els().filter(function (x) { return !x.hidden && !x.locked; }).map(function (x) { return x.id; })); }]
        ];
      }
      showContextMenu(e.clientX, e.clientY, items);
    });
  }
  function showContextMenu(x, y, items) {
    hideContextMenu();
    ctxMenu = document.createElement("div");
    ctxMenu.className = "st-ctx";
    items.forEach(function (it) {
      if (!it) { var d = document.createElement("div"); d.className = "st-ctx-sep"; ctxMenu.appendChild(d); return; }
      var b = document.createElement("button");
      b.innerHTML = icn(it[1]) + it[0];
      b.addEventListener("click", function () { hideContextMenu(); it[2](); });
      ctxMenu.appendChild(b);
    });
    document.body.appendChild(ctxMenu);
    var r = ctxMenu.getBoundingClientRect();
    ctxMenu.style.left = Math.min(x, window.innerWidth - r.width - 8) + "px";
    ctxMenu.style.top = Math.min(y, window.innerHeight - r.height - 8) + "px";
  }
  function hideContextMenu() { if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; } }

  /* ================= Modals ================= */
  function bindModals() {
    document.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function () { document.getElementById(b.getAttribute("data-close")).classList.remove("open"); });
    });
    document.querySelectorAll(".st-modal").forEach(function (m) {
      m.addEventListener("pointerdown", function (e) { if (e.target === m) m.classList.remove("open"); });
    });
  }

  /* Bij taalwissel: alleen labels opnieuw renderen, editor-status behouden */
  function relabel() {
    fillToolbarIcons();
    var fmtSel = $("st-format");
    if (fmtSel) {
      var cur = fmtSel.value;
      fmtSel.innerHTML = Object.keys(FORMATS).map(function (k) {
        return '<option value="' + k + '">' + DL("studioFormats", FORMATS[k].label) + '</option>';
      }).join("");
      fmtSel.value = cur;
    }
    renderPanelTabs();
    renderPanel();
    renderProps();
    renderPagesBar();
    renderStatus();
  }

  return { init: init, relabel: relabel, templateCount: TEMPLATES.length };
})();

window.PM_PAGE_INIT = function () {
  if (window.__pmStudioBooted) { PMStudio.relabel(); return; }
  window.__pmStudioBooted = true;
  PMStudio.init();
};
