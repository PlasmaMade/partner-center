(function () {
  "use strict";

  var DEFAULT_ENDPOINT = "https://partner-center.onrender.com/api/sync";

  function clean(value) {
    return String(value || "").trim();
  }

  function sameOriginEndpoint() {
    if (!/^https?:$/i.test(location.protocol || "")) return "";
    return location.origin.replace(/\/$/, "") + "/api/sync";
  }

  function isLocalHost() {
    return /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname || "");
  }

  function isCentralApiHost() {
    return /^partner-center\.onrender\.com$/i.test(location.hostname || "");
  }

  function isProductionHost() {
    return /^https?:$/i.test(location.protocol || "") && !isLocalHost() && !isCentralApiHost();
  }

  function isTrustedProductionEndpoint(value) {
    try {
      var url = new URL(clean(value), location.href);
      return url.protocol === "https:" &&
        /^partner-center\.onrender\.com$/i.test(url.hostname || "") &&
        /\/api\/sync\/?$/i.test(url.pathname || "");
    } catch (e) {
      return false;
    }
  }

  function allowEndpointOverride(value) {
    if (!isProductionHost()) return true;
    return isTrustedProductionEndpoint(value);
  }

  function isUnsafeStoredEndpoint(value) {
    var endpoint = clean(value);
    if (!endpoint) return true;
    try {
      var url = new URL(endpoint, location.href);
      if (isProductionHost() && /^https?:$/i.test(url.protocol) && /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(url.hostname || "")) return true;
      if (isProductionHost() && url.protocol !== "https:") return true;
      return !/\/api\/sync\/?$/i.test(url.pathname || "");
    } catch (e) {
      return true;
    }
  }

  function autoEndpoint() {
    if (isLocalHost() || isCentralApiHost()) return sameOriginEndpoint();
    return DEFAULT_ENDPOINT;
  }

  var endpoint = autoEndpoint();
  var source = endpoint === DEFAULT_ENDPOINT ? "shared-default" : "same-origin";

  try {
    var meta = document.querySelector('meta[name="pm-sync-endpoint"]');
    if (meta && clean(meta.content) && allowEndpointOverride(meta.content)) {
      endpoint = clean(meta.content);
      source = "meta";
    }
  } catch (e) {}

  try {
    var stored = localStorage.getItem("pm_remote_sync_endpoint");
    if (clean(stored) && !isUnsafeStoredEndpoint(stored) && allowEndpointOverride(stored)) {
      endpoint = clean(stored);
      source = "stored";
    } else if (clean(stored) && isProductionHost()) {
      localStorage.removeItem("pm_remote_sync_endpoint");
    }
  } catch (e) {}

  try {
    var params = new URLSearchParams(location.search || "");
    var fromUrl = params.get("syncEndpoint");
    if (clean(fromUrl) && allowEndpointOverride(fromUrl)) {
      endpoint = clean(fromUrl);
      source = "query";
      localStorage.setItem("pm_remote_sync_endpoint", endpoint);
    } else if (clean(fromUrl) && isProductionHost()) {
      localStorage.removeItem("pm_remote_sync_endpoint");
    }
  } catch (e) {}

  window.PM_REMOTE_SYNC_ENDPOINT = endpoint;
  window.PM_SYNC_CONFIG = {
    endpoint: endpoint,
    configured: !!endpoint,
    source: source,
    storageKey: "pm_remote_sync_endpoint"
  };
})();
