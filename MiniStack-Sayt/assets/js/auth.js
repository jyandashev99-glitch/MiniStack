/*
 * Autentifikatsiya xizmati.
 *
 * DIQQAT: bu sayt hozircha faqat frontend, shuning uchun hisoblar foydalanuvchining O'Z brauzerida
 * (localStorage) saqlanadi. Parollar PBKDF2-SHA256 (150 000 iteratsiya, tasodifiy salt) bilan
 * hash qilinadi va ochiq ko'rinishda saqlanmaydi, lekin baribir bu HAQIQIY server xavfsizligi emas:
 * hisoblar qurilmalar orasida sinxronlanmaydi va brauzer ma'lumotlarini tozalasa yo'qoladi.
 *
 * Haqiqiy backend ulash uchun faqat quyidagi funksiyalarning ichini almashtiring
 * (register, login, logout, current, updateProfile, changePassword, deleteAccount):
 * sahifalar ularni faqat shu interfeys orqali chaqiradi.
 */
window.MS = window.MS || {};

MS.auth = (function () {
  const K_USERS = "ms_users";
  const K_SESSION = "ms_session";
  const K_FAILS = "ms_fails";
  const ITER = 150000;
  const SESSION_DAYS = 30;
  const MAX_FAILS = 5;
  const LOCK_MS = 30000;

  class AuthError extends Error {
    constructor(code, message) { super(message); this.code = code; }
  }

  const enc = new TextEncoder();
  const listeners = [];

  function b64(buf) {
    let s = "";
    new Uint8Array(buf).forEach((b) => (s += String.fromCharCode(b)));
    return btoa(s);
  }
  function unb64(str) {
    const bin = atob(str);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function randomHex(n) {
    const a = new Uint8Array(n);
    crypto.getRandomValues(a);
    return Array.from(a, (x) => x.toString(16).padStart(2, "0")).join("");
  }

  async function derive(password, salt) {
    if (!(window.crypto && crypto.subtle)) {
      throw new AuthError("insecure", "Brauzeringiz xavfsiz kontekstni (HTTPS) talab qiladi. Saytni https:// orqali oching.");
    }
    const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" }, key, 256);
    return b64(bits);
  }

  // Doimiy vaqtli solishtirish
  function safeEqual(a, b) {
    if (a.length !== b.length) return false;
    let d = 0;
    for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return d === 0;
  }

  const norm = (e) => String(e || "").trim().toLowerCase();
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  const cleanName = (n) => String(n || "").trim().replace(/\s+/g, " ");

  function users() { return MS.store.get(K_USERS, {}); }
  function saveUsers(u) { MS.store.set(K_USERS, u); }

  function emit() {
    const cur = current();
    listeners.forEach((fn) => { try { fn(cur); } catch (e) { /* ignore */ } });
  }

  /** Parol kuchi: 0..4 */
  function strength(pw) {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
    if (pw.length < 8) s = Math.min(s, 1);
    return Math.min(s, 4);
  }

  function checkPassword(pw) {
    if (pw.length < 8) return "Parol kamida 8 ta belgidan iborat bo'lishi kerak.";
    if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return "Parolda kamida bitta harf va bitta raqam bo'lsin.";
    return null;
  }

  function startSession(user, remember) {
    const sess = {
      id: user.id,
      email: user.email,
      remember: !!remember,
      exp: Date.now() + (remember ? SESSION_DAYS * 864e5 : 12 * 36e5),
    };
    MS.store.del(K_SESSION); MS.store.sdel(K_SESSION);
    if (remember) MS.store.set(K_SESSION, sess); else MS.store.sset(K_SESSION, sess);
  }

  function current() {
    const s = MS.store.sget(K_SESSION, null) || MS.store.get(K_SESSION, null);
    if (!s || !s.email) return null;
    if (s.exp && s.exp < Date.now()) { logout(true); return null; }
    const u = users()[s.email];
    if (!u || u.id !== s.id) { logout(true); return null; }
    return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt };
  }

  function logout(silent) {
    MS.store.del(K_SESSION); MS.store.sdel(K_SESSION);
    if (!silent) emit();
  }

  async function register({ name, email, password }) {
    name = cleanName(name); email = norm(email);
    if (name.length < 2) throw new AuthError("name", "Ismingizni kiriting (kamida 2 ta belgi).");
    if (!validEmail(email)) throw new AuthError("email", "Email manzil noto'g'ri ko'rinadi.");
    const pwErr = checkPassword(password);
    if (pwErr) throw new AuthError("password", pwErr);
    const all = users();
    if (all[email]) throw new AuthError("exists", "Bu email bilan hisob allaqachon mavjud. Kirishga urinib ko'ring.");

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await derive(password, salt);
    const user = { id: randomHex(8), name, email, salt: b64(salt), hash, iter: ITER, createdAt: Date.now() };
    all[email] = user;
    saveUsers(all);
    startSession(user, true);
    emit();
    return current();
  }

  async function login({ email, password, remember }) {
    email = norm(email);
    const fails = MS.store.get(K_FAILS, {});
    const f = fails[email];
    if (f && f.until && f.until > Date.now()) {
      const sec = Math.ceil((f.until - Date.now()) / 1000);
      throw new AuthError("locked", `Juda ko'p urinish. ${sec} soniyadan keyin qayta urinib ko'ring.`);
    }
    const u = users()[email];
    // Foydalanuvchi bo'lmasa ham hash hisoblaymiz: javob vaqti bo'yicha email mavjudligi sezilmasin
    const salt = u ? unb64(u.salt) : crypto.getRandomValues(new Uint8Array(16));
    const hash = await derive(String(password || ""), salt);
    const ok = !!u && safeEqual(hash, u.hash);
    if (!ok) {
      const n = ((f && f.n) || 0) + 1;
      fails[email] = { n: n >= MAX_FAILS ? 0 : n, until: n >= MAX_FAILS ? Date.now() + LOCK_MS : 0 };
      MS.store.set(K_FAILS, fails);
      throw new AuthError("bad", "Email yoki parol noto'g'ri.");
    }
    delete fails[email];
    MS.store.set(K_FAILS, fails);
    startSession(u, remember);
    emit();
    return current();
  }

  async function updateProfile({ name }) {
    const cur = current();
    if (!cur) throw new AuthError("auth", "Avval tizimga kiring.");
    name = cleanName(name);
    if (name.length < 2) throw new AuthError("name", "Ism kamida 2 ta belgidan iborat bo'lsin.");
    const all = users();
    all[cur.email].name = name;
    saveUsers(all);
    emit();
    return current();
  }

  async function verifyPassword(email, password) {
    const u = users()[email];
    if (!u) return false;
    const hash = await derive(String(password || ""), unb64(u.salt));
    return safeEqual(hash, u.hash);
  }

  async function changePassword({ oldPassword, newPassword }) {
    const cur = current();
    if (!cur) throw new AuthError("auth", "Avval tizimga kiring.");
    if (!(await verifyPassword(cur.email, oldPassword))) throw new AuthError("bad", "Joriy parol noto'g'ri.");
    const pwErr = checkPassword(newPassword);
    if (pwErr) throw new AuthError("password", pwErr);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const all = users();
    all[cur.email].salt = b64(salt);
    all[cur.email].hash = await derive(newPassword, salt);
    saveUsers(all);
  }

  async function deleteAccount(password) {
    const cur = current();
    if (!cur) throw new AuthError("auth", "Avval tizimga kiring.");
    if (!(await verifyPassword(cur.email, password))) throw new AuthError("bad", "Parol noto'g'ri.");
    const all = users();
    delete all[cur.email];
    saveUsers(all);
    MS.store.del("ms_dl_" + cur.id);
    const tickets = MS.store.get("ms_tickets", []).filter((t) => t.userId !== cur.id);
    MS.store.set("ms_tickets", tickets);
    logout();
  }

  return {
    AuthError, register, login, logout, current, updateProfile, changePassword, deleteAccount,
    strength, checkPassword, validEmail,
    onChange(fn) { listeners.push(fn); },
  };
})();
