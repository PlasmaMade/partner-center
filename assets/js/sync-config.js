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

  function autoEndpoint() {
    if (isLocalHost() || isCentralApiHost()) return sameOriginEndpoint();
    return DEFAULT_ENDPOINT;
  }

  var endpoint = autoEndpoint();
  var source = endpoint === DEFAULT_ENDPOINT ? "shared-default" : "same-origin";

  try {
    var meta = document.querySelector('meta[name="pm-sync-endpoint"]');
    if (meta && clean(meta.content)) {
      endpoint = clean(meta.content);
      source = "meta";
    }
  } catch (e) {}

  try {
    var stored = localStorage.getItem("pm_remote_sync_endpoint");
    if (clean(stored)) {
      endpoint = clean(stored);
      source = "stored";
    }
  } catch (e) {}

  try {
    var params = new URLSearchParams(location.search || "");
    var fromUrl = params.get("syncEndpoint");
    if (clean(fromUrl)) {
      endpoint = clean(fromUrl);
      source = "query";
      localStorage.setItem("pm_remote_sync_endpoint", endpoint);
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
