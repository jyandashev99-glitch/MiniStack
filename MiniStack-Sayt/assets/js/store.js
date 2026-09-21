/* localStorage / sessionStorage uchun xavfsiz o'ramalar (private rejimda yoki bloklanganda ham sayt ishlaydi). */
window.MS = window.MS || {};

MS.store = (function () {
  const mem = {}; // storage mavjud bo'lmasa, xotirada saqlaymiz

  function pick(kind) {
    try {
      const s = window[kind];
      const k = "__ms_probe__";
      s.setItem(k, "1"); s.removeItem(k);
      return s;
    } catch (e) { return null; }
  }
  const local = pick("localStorage");
  const session = pick("sessionStorage");

  function read(area, key, fallback) {
    try {
      const raw = area ? area.getItem(key) : mem[key];
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function write(area, key, value) {
    const raw = JSON.stringify(value);
    if (area) { try { area.setItem(key, raw); return; } catch (e) { /* to'lgan */ } }
    mem[key] = raw;
  }
  function remove(area, key) {
    if (area) { try { area.removeItem(key); } catch (e) { /* ignore */ } }
    delete mem[key];
  }

  return {
    get: (k, d) => read(local, k, d),
    set: (k, v) => write(local, k, v),
    del: (k) => remove(local, k),
    sget: (k, d) => read(session, k, d),
    sset: (k, v) => write(session, k, v),
    sdel: (k) => remove(session, k),
  };
})();
