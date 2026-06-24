var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.PlasmaMade;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function jsx3(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx3;
      module.exports.jsxs = jsx3;
      module.exports.jsxDEV = jsx3;
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/KbCard.tsx
  var KbCard_exports = {};
  __export(KbCard_exports, {
    Default: () => Default,
    Grid: () => Grid
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.PlasmaMade;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/_shared.tsx
  init_define_import_meta_env();
  var import_jsx_runtime = __toESM(require_react_shim());
  var ic = (children) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children });
  var IconBook = () => ic(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 17H6" })
  ] }));
  var IconShield = () => ic(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 12l2 2 4-4" })
  ] }));
  var IconHeadset = () => ic(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 13a8 8 0 0 1 16 0" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 13v3a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 13v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 18a4 4 0 0 1-4 3h-2" })
  ] }));
  var svg = (s) => `data:image/svg+xml,${encodeURIComponent(s)}`;
  var unitImg = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16b03d"/><stop offset="1" stop-color="#0c7026"/></linearGradient></defs>
  <rect x="74" y="34" width="112" height="192" rx="26" fill="#ffffff" stroke="#e6e9ed" stroke-width="2"/>
  <rect x="92" y="58" width="76" height="9" rx="4.5" fill="url(#g)"/>
  <rect x="92" y="76" width="76" height="9" rx="4.5" fill="#e6e9ed"/>
  <rect x="92" y="94" width="76" height="9" rx="4.5" fill="#e6e9ed"/>
  <circle cx="130" cy="158" r="34" fill="#f2fbf5" stroke="#13A538" stroke-width="2"/>
  <circle cx="130" cy="158" r="12" fill="url(#g)"/>
  <path d="M130 124v8M130 184v8M96 158h8M156 158h8" stroke="#13A538" stroke-width="3" stroke-linecap="round"/>
</svg>`);
  var campaignImg = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
  <defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16b03d"/><stop offset="1" stop-color="#0c7026"/></linearGradient></defs>
  <rect width="600" height="380" fill="url(#b)"/>
  <circle cx="500" cy="70" r="160" fill="#ffffff" opacity="0.10"/>
  <circle cx="90" cy="340" r="120" fill="#000000" opacity="0.12"/>
  <path d="M0 300 Q150 240 300 290 T600 270 V380 H0Z" fill="#ffffff" opacity="0.08"/>
</svg>`);
  var docThumb = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#f2fbf5"/>
  <rect x="96" y="40" width="128" height="160" rx="8" fill="#ffffff" stroke="#cfe9d6" stroke-width="2"/>
  <rect x="116" y="64" width="88" height="8" rx="4" fill="#13A538"/>
  <rect x="116" y="84" width="88" height="6" rx="3" fill="#d7dde3"/>
  <rect x="116" y="98" width="70" height="6" rx="3" fill="#d7dde3"/>
  <rect x="116" y="120" width="88" height="6" rx="3" fill="#d7dde3"/>
  <rect x="116" y="134" width="60" height="6" rx="3" fill="#d7dde3"/>
</svg>`);

  // .design-sync/previews/KbCard.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var Default = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { maxWidth: 280 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ds_exports.KbCard,
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconBook, {}),
      category: "Installatie",
      title: "Unit aansluiten op de afzuigkap",
      description: "Stap voor stap door de montage van een recirculatie-unit."
    }
  ) });
  var Grid = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_exports.KbCard, { icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconBook, {}), category: "Installatie", title: "Unit aansluiten", description: "Montage van een recirculatie-unit." }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_exports.KbCard, { icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconHeadset, {}), category: "Support", title: "Veelgestelde vragen", description: "Antwoorden op de meestgestelde vragen." }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_exports.KbCard, { icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconShield, {}), category: "Garantie", title: "Garantievoorwaarden", description: "Wat valt onder de fabrieksgarantie?" })
  ] });
  return __toCommonJS(KbCard_exports);
})();
