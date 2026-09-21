/* Bosh sahifa: hajm yozuvlari va tekshiruv simulyatsiyasi. */
(function () {
  document.querySelectorAll("[data-size]").forEach((el) => { el.textContent = "· " + MS.fmtSize(MS.config.app.sizeBytes); });
  const rules = document.getElementById("stat-rules");
  if (rules) rules.dataset.count = String(MS.config.app.rules);

  const btn = document.getElementById("scan-btn");
  if (!btn) return;
  const bar = document.getElementById("scan-bar");
  const pct = document.getElementById("scan-pct");
  const cur = document.getElementById("scan-current");
  const log = document.getElementById("scan-log");
  const note = document.getElementById("scan-note");
  const prog = document.querySelector("#scanner .progress");

  // Xayoliy namuna ma'lumotlari (haqiqiy fayllar emas)
  const steps = [
    { t: "Ilovalar ro'yxati o'qilmoqda…", p: 8 },
    { t: "com.android.chrome", p: 20, ok: "Toza" },
    { t: "org.telegram.messenger", p: 34, ok: "Toza" },
    { t: "Download/hisob-faktura.pdf.apk", p: 52, warn: "Ikki kengaytma (+5) · niqoblangan APK (+4)", tag: "SHUBHALI" },
    { t: "Download/oyin-mod.apk", p: 70, ok: "Toza" },
    { t: "Yangi ilova: com.example.fastclean", p: 86, warn: "Accessibility (+3) · overlay (+2) · SMS (+2)", tag: "SHUBHALI" },
    { t: "Yakuniy hisobot tuzilmoqda…", p: 100 },
  ];

  let running = false;
  function li(cls, icon, text, tag) {
    const el = document.createElement("li");
    el.className = cls;
    el.innerHTML = MS.icon(icon) + "<span>" + MS.esc(text) + "</span>" + (tag ? '<small class="chip ' + (cls === "warn" ? "amber" : "green") + '">' + MS.esc(tag) + "</small>" : "");
    return el;
  }
  function setPct(p) {
    bar.style.width = p + "%";
    pct.textContent = p + "%";
    prog.setAttribute("aria-valuenow", p);
  }

  btn.addEventListener("click", () => {
    if (running) return;
    running = true;
    btn.disabled = true;
    log.innerHTML = "";
    setPct(0);
    note.textContent = "Tekshirilmoqda…";
    let i = 0;
    const timer = setInterval(() => {
      const s = steps[i++];
      cur.textContent = s.t;
      setPct(s.p);
      if (s.ok) log.appendChild(li("ok", "check", s.t, s.ok));
      if (s.warn) log.appendChild(li("warn", "alert", s.t + ": " + s.warn, s.tag));
      if (i >= steps.length) {
        clearInterval(timer);
        cur.textContent = "Tugadi: 2 ta shubhali topildi";
        note.textContent = "Namunadagi fayl nomlari xayoliy.";
        btn.disabled = false;
        btn.lastChild.textContent = "Qayta ishga tushirish";
        running = false;
      }
    }, 650);
  });
})();
