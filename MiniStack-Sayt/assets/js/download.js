/* Yuklab olish sahifasi: platforma almashtirgich, ma'lumotlar, yuklash tarixi, nusxalash. */
(function () {
  const P = MS.config.platforms;
  const NAMES = { android: "Android", windows: "Windows" };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const set = (sel, txt) => $$(sel).forEach((e) => (e.textContent = txt));

  function detect() {
    const q = new URLSearchParams(location.search).get("p") || location.hash.replace("#", "");
    if (P[q]) return q;
    const ua = navigator.userAgent || "";
    if (/Android/i.test(ua)) return "android";
    if (/Windows/i.test(ua)) return "windows";
    return "android";
  }

  let current = detect();

  function histKey() {
    const u = MS.auth.current();
    return u ? "ms_dl_" + u.id : "ms_dl_guest";
  }
  function fmt(ts) { return MS.fmtDate(ts, { short: true, time: true }); }

  function renderHistory() {
    const list = MS.store.get(histKey(), []);
    const box = $("#history");
    const u = MS.auth.current();
    $("#hist-sub").innerHTML = u
      ? "Hisobingiz: <b>" + MS.esc(u.email) + "</b>"
      : 'Hozircha bu brauzerdagi tarix ko\'rsatilmoqda. <a href="auth.html?next=download.html">Kiring</a>, shunda tarix hisobingizga bog\'lanadi.';
    if (!list.length) {
      box.innerHTML = '<div class="empty">Hali hech narsa yuklab olinmagan.</div>';
      return;
    }
    box.innerHTML = list.slice().reverse().slice(0, 8).map((d) => {
      const pl = d.p || "android"; // eski yozuvlar Android edi
      return '<div class="history-item"><span style="display:flex;gap:10px;align-items:center">' + MS.icon(pl === "windows" ? "monitor" : "smartphone") +
        "<b>MiniStack " + MS.esc(NAMES[pl] || pl) + " v" + MS.esc(d.v) + '</b></span><span class="muted">' + MS.esc(fmt(d.t)) + "</span></div>";
    }).join("");
  }

  function render() {
    const p = P[current];
    $$("[data-platform]").forEach((b) => {
      const on = b.dataset.platform === current;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", String(on));
    });
    $$("[data-panel]").forEach((el) => { el.hidden = el.dataset.panel !== current; });
    $$("[data-only]").forEach((el) => { el.hidden = el.dataset.only !== current; });

    set("[data-title]", p.title);
    set("[data-v]", "v" + p.version);
    set("[data-size]", MS.fmtSize(p.sizeBytes));
    set("[data-kind]", p.kind);
    set("[data-req]", p.requirement);
    set("[data-date]", MS.fmtDate(p.released));
    set("[data-btn-label]", NAMES[current] + " uchun yuklab olish");
    $("#h-file").textContent = p.sha256;
    $("#h-cert").textContent = P.android.certSha256;
    $("#h-exe").textContent = P.windows.exeSha256;
    $("#cmd-win").textContent = "certutil -hashfile " + p.fileName + " SHA256";
    $("#cmd-nix").textContent = "sha256sum " + p.fileName;
    const btn = $("#dl-btn");
    btn.href = p.file;
    btn.setAttribute("download", p.fileName);
    history.replaceState(null, "", "?p=" + current);
  }

  $$("[data-platform]").forEach((b) => b.addEventListener("click", () => { current = b.dataset.platform; render(); }));
  $$("[data-copy]").forEach((b) => {
    b.addEventListener("click", () => MS.ui.copy(document.getElementById(b.dataset.copy).textContent, "Nusxalandi"));
  });

  $("#dl-btn").addEventListener("click", () => {
    const p = P[current];
    const key = histKey();
    const list = MS.store.get(key, []);
    list.push({ p: current, v: p.version, t: Date.now() });
    MS.store.set(key, list.slice(-50));
    renderHistory();

    const android =
      '<ul class="steps-mini"><li><span><b>APK faylni oching</b><br><small class="muted">Yuklamalar papkasida ' + MS.esc(p.fileName) + "</small></span></li>" +
      "<li><span><b>\"Shu manbadan o'rnatish\"</b> ruxsatini yoqing<br><small class=\"muted\">Android so'rasa, ruxsat bering va O'rnatish tugmasini bosing</small></span></li>" +
      "<li><span><b>\"Barcha fayllarga kirish\"</b> ruxsatini bering<br><small class=\"muted\">Ilova ichida Bosh sahifadagi ogohlantirish orqali</small></span></li></ul>";
    const windows =
      '<ul class="steps-mini"><li><span><b>ZIP ni to\'liq chiqaring</b><br><small class="muted">O\'ng tugma → Extract All. Faylni arxiv ichidan ishga tushirmang</small></span></li>' +
      "<li><span><b>MiniStack.exe ni oching</b><br><small class=\"muted\">SmartScreen chiqsa: More info → Run anyway</small></span></li>" +
      "<li><span><b>\"Tezkor tekshiruv\"ni boshlang</b><br><small class=\"muted\">signatures.db exe yonida turishi kerak</small></span></li></ul>";

    MS.ui.modal({
      title: "Yuklash boshlandi",
      body: '<p class="muted" style="margin-top:6px">Fayl tugagach, quyidagilarni bajaring:</p>' + (current === "windows" ? windows : android),
      actions: [{ label: "Tushunarli", cls: "btn-primary" }],
    });
  });

  MS.auth.onChange(renderHistory);
  render();
  renderHistory();
})();
