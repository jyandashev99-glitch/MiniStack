/* Umumiy qobiq: ikonkalar, header/footer, mavzu, toast/modal, scroll animatsiyalari. */
window.MS = window.MS || {};

/* ---------- Ikonkalar (Feather uslubi, 24x24 stroke) ---------- */
MS.icons = {
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  chevron: '<polyline points="6 9 12 15 18 9"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  package: '<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  "wifi-off": '<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
};

MS.icon = function (name) {
  const p = MS.icons[name] || "";
  return '<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg></span>";
};

MS.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
};

MS.hydrateIcons = function (root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    el.insertAdjacentHTML("afterbegin", MS.icon(el.dataset.icon));
    if (el.classList.contains("ico-only")) el.firstElementChild.style.cssText = "width:100%;height:100%";
  });
};

/* ---------- Mavzu ---------- */
MS.theme = {
  get() { return document.documentElement.getAttribute("data-theme") || "dark"; },
  set(t) {
    document.documentElement.setAttribute("data-theme", t);
    MS.store.set("ms_theme", t);
    const b = document.getElementById("theme-btn");
    if (b) { b.innerHTML = MS.icon(t === "dark" ? "sun" : "moon"); b.setAttribute("aria-label", t === "dark" ? "Yorug' mavzuga o'tish" : "Qorong'i mavzuga o'tish"); }
  },
};

/* ---------- Toast va modal ---------- */
MS.ui = (function () {
  function toast(message, type) {
    let box = document.querySelector(".toasts");
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast " + (type || "");
    t.innerHTML = MS.icon(type === "err" ? "alert" : type === "ok" ? "check" : "info") + "<span>" + MS.esc(message) + "</span>";
    box.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 260); }, 4200);
  }

  function modal({ title, body, actions }) {
    const back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-label="' + MS.esc(title) + '"><h2 style="font-size:1.5rem">' + MS.esc(title) + "</h2>" + (body || "") + '<div class="row" style="justify-content:flex-end;gap:10px" data-actions></div></div>';
    const bar = back.querySelector("[data-actions]");
    const prev = document.activeElement;
    function close() { document.removeEventListener("keydown", onKey); back.remove(); if (prev && prev.focus) prev.focus(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    (actions || [{ label: "Yopish", cls: "btn-primary" }]).forEach((a) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn " + (a.cls || "btn-ghost");
      b.textContent = a.label;
      b.addEventListener("click", () => { if (!a.onClick || a.onClick() !== false) close(); });
      bar.appendChild(b);
    });
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(back);
    MS.hydrateIcons(back);
    const first = bar.querySelector("button");
    if (first) first.focus();
    return close;
  }

  async function copy(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e2) { /* ignore */ }
      ta.remove();
    }
    toast(okMsg || "Nusxalandi", "ok");
  }

  return { toast, modal, copy };
})();

/* ---------- Header / footer ---------- */
MS.layout = (function () {
  const NAV = [
    ["home", "index.html", "Bosh sahifa"],
    ["about", "antivirus.html", "Antivirus haqida"],
    ["download", "download.html", "Yuklab olish"],
    ["support", "support.html", "Yordam"],
  ];

  function initials(name) {
    const parts = String(name || "?").trim().split(/\s+/);
    return ((parts[0] || "?")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }

  function authArea() {
    const u = MS.auth.current();
    if (!u) {
      return '<a class="btn btn-ghost btn-sm" href="auth.html">Kirish</a><a class="btn btn-primary btn-sm" href="auth.html?mode=register">Ro\'yxatdan o\'tish</a>';
    }
    return (
      '<div class="user-menu" id="user-menu"><button class="user-chip" type="button" aria-haspopup="true" aria-expanded="false">' +
      '<span class="avatar">' + MS.esc(initials(u.name)) + "</span><span>" + MS.esc(u.name.split(" ")[0]) + "</span></button>" +
      '<div class="dropdown"><div class="who"><b>' + MS.esc(u.name) + "</b><small>" + MS.esc(u.email) + "</small></div>" +
      '<a href="account.html">' + MS.icon("user") + 'Profil</a><a href="download.html">' + MS.icon("download") + 'Yuklab olish</a>' +
      '<a href="support.html#murojaat">' + MS.icon("message") + 'Murojaatlarim</a><button type="button" id="logout-btn">' + MS.icon("logout") + "Chiqish</button></div></div>"
    );
  }

  function render() {
    const page = document.body.dataset.page;
    const h = document.getElementById("site-header");
    if (h) {
      h.className = "header";
      h.innerHTML =
        '<div class="container"><a class="brand" href="index.html"><img src="assets/img/logo.png" alt="" width="34" height="34">MiniStack</a>' +
        '<nav class="nav" id="nav" aria-label="Asosiy menyu">' +
        NAV.map((n) => '<a href="' + n[1] + '"' + (n[0] === page ? ' class="active" aria-current="page"' : "") + ">" + n[2] + "</a>").join("") +
        (MS.auth.current() ? "" : '<a class="nav-auth" href="auth.html">Kirish</a><a class="nav-auth primary" href="auth.html?mode=register">Ro\'yxatdan o\'tish</a>') +
        '</nav><div class="header-actions"><button class="icon-btn" id="theme-btn" type="button"></button>' + authArea() +
        '<button class="icon-btn burger" id="burger" type="button" aria-label="Menyu" aria-expanded="false">' + MS.icon("menu") + "</button></div></div>";
      MS.theme.set(MS.theme.get());
      bind();
    }
    const f = document.getElementById("site-footer");
    if (f) {
      f.className = "footer";
      const pf = MS.config.platforms;
      f.innerHTML =
        '<div class="container"><div class="footer-grid"><div><a class="brand" href="index.html"><img src="assets/img/logo.png" alt="" width="34" height="34">MiniStack</a>' +
        "<p style=\"margin-top:14px\">Android va Windows uchun yengil va shaffof antivirus. Android ilovasi internet ruxsatiga ega emas: tekshiruv butunlay telefoningizda bajariladi.</p></div>" +
        '<div><h4>Mahsulot</h4><ul><li><a href="index.html">Bosh sahifa</a></li><li><a href="antivirus.html">Antivirus haqida</a></li><li><a href="download.html">Yuklab olish</a></li></ul></div>' +
        '<div><h4>Yordam</h4><ul><li><a href="support.html#faq">Savol-javob</a></li><li><a href="support.html#murojaat">Murojaat yuborish</a></li><li><a href="antivirus.html#ruxsatlar">Ruxsatlar tushuntirishi</a></li></ul></div>' +
        '<div><h4>Hisob</h4><ul><li><a href="auth.html">Kirish</a></li><li><a href="auth.html?mode=register">Ro\'yxatdan o\'tish</a></li><li><a href="account.html">Profil</a></li></ul></div></div>' +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " MiniStack · Android v" + MS.esc(pf.android.version) + " · Windows v" + MS.esc(pf.windows.version) + '</span><span>Google Play Protect o\'rnini bosmaydi, uni to\'ldiradi.</span></div></div>';
    }
  }

  function bind() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (burger && nav) {
      burger.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        burger.setAttribute("aria-expanded", String(open));
        burger.innerHTML = MS.icon(open ? "x" : "menu");
      });
      nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });
    }
    document.getElementById("theme-btn").addEventListener("click", () => MS.theme.set(MS.theme.get() === "dark" ? "light" : "dark"));

    const um = document.getElementById("user-menu");
    if (um) {
      const chip = um.querySelector(".user-chip");
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = um.classList.toggle("open");
        chip.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", (e) => { if (!um.contains(e.target)) um.classList.remove("open"); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") um.classList.remove("open"); });
      document.getElementById("logout-btn").addEventListener("click", () => {
        MS.auth.logout();
        MS.ui.toast("Tizimdan chiqdingiz", "ok");
        if (/account\.html$/.test(location.pathname)) location.href = "index.html";
        else render();
      });
    }
  }

  return { render };
})();

/* ---------- Scroll animatsiyalari va hisoblagichlar ---------- */
MS.effects = (function () {
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec).replace(".", ",") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function init() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal, [data-count]");
    if (!("IntersectionObserver" in window) || reduce) {
      items.forEach((el) => {
        el.classList.add("in");
        if (el.dataset.count) el.textContent = parseFloat(el.dataset.count).toFixed(parseInt(el.dataset.decimals || "0", 10)).replace(".", ",") + (el.dataset.suffix || "");
      });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.dataset.count) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  }
  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  MS.layout.render();
  MS.hydrateIcons();
  MS.effects.init();
});
