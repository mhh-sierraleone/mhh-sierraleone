// storage-shim.js
// Provides the same window.storage.get/set/delete/list API the site code uses,
// but backed by this browser's own localStorage instead of Claude's chat storage.
// IMPORTANT: data only lives on this device/browser. It will NOT sync to other
// devices or other people's browsers. For shared, multi-device data, you need a
// real backend (see the Firebase option discussed separately).
(function () {
  const PREFIX = "mhhsl_";

  window.storage = {
    async get(key) {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) {
        throw new Error("Key not found: " + key);
      }
      return { key, value: raw };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: true };
    },
    async list(prefix) {
      const full = PREFIX + (prefix || "");
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(full))
        .map((k) => k.slice(PREFIX.length));
      return { keys, prefix };
    },
  };
})();
