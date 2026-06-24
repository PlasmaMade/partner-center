(function () {
  "use strict";

  var DEFAULT_ENDPOINT = "";
  var endpoint = DEFAULT_ENDPOINT;

  try {
    var meta = document.querySelector('meta[name="pm-sync-endpoint"]');
    if (meta && meta.content) endpoint = meta.content.trim();
  } catch (e) {}

  try {
    var stored = localStorage.getItem("pm_remote_sync_endpoint");
    if (stored) endpoint = stored.trim();
  } catch (e) {}

  if (!endpoint && /^https?:$/i.test(location.protocol || "") && !/github\.io$/i.test(location.hostname || "")) {
    endpoint = location.origin.replace(/\/$/, "") + "/api/sync";
  }

  try {
    var params = new URLSearchParams(location.search || "");
    var fromUrl = params.get("syncEndpoint");
    if (fromUrl) {
      endpoint = fromUrl.trim();
      localStorage.setItem("pm_remote_sync_endpoint", endpoint);
    }
  } catch (e) {}

  window.PM_REMOTE_SYNC_ENDPOINT = endpoint;
  window.PM_SYNC_CONFIG = {
    endpoint: endpoint,
    configured: !!endpoint,
    storageKey: "pm_remote_sync_endpoint"
  };
})();
