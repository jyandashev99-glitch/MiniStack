/* Yordam sahifasi: savol-javob (qidiruv + kategoriya) va murojaat formasi. */
(function () {
  const FAQ = [
    // O'rnatish
    { c: "O'rnatish", q: "O'rnatishda nega \"noma'lum dasturchi\" ogohlantirishi chiqadi?", a: "<p>Ilova Google Play'dan tashqarida tarqatilgani uchun Android shunday ogohlantiradi. Yuklab olish sahifasidagi SHA-256 va sertifikat izini faylingiz bilan solishtiring: mos kelsa, fayl aynan biz chiqargan fayl. Keyin <b>Baribir o'rnatish</b> tugmasini bosing.</p>" },
    { c: "O'rnatish", q: "\"Ilova o'rnatilmadi\" (App not installed) deb chiqsa nima qilaman?", a: "<p>Odatiy sabablar: 1) telefonda shu ilovaning boshqa imzodagi eski nusxasi bor, avval uni o'chiring; 2) xotira yetarli emas; 3) Android versiyasi 8.0 dan past; 4) fayl to'liq yuklanmagan, hashni tekshirib, qayta yuklab oling.</p>" },
    { c: "O'rnatish", q: "Yangi versiyani qanday o'rnataman?", a: "<p>Yangi APK ni eskisining ustiga o'rnating. Imzo bir xil bo'lgani uchun sozlamalaringiz va ishonchli ro'yxat saqlanadi.</p>" },
    // Ruxsatlar
    { c: "Ruxsatlar", q: "Nega \"Barcha fayllarga kirish\" ruxsati kerak?", a: "<p>Android 11 va undan yangisida bu ruxsatsiz boshqa ilovalar yuklagan fayllarni (masalan, Yuklamalardagi APK) o'qib va karantinga ko'chirib bo'lmaydi. Ruxsat bermasangiz, faqat o'rnatilgan ilovalar tekshiriladi. Batafsil: <a href=\"antivirus.html#ruxsatlar\">ruxsatlar jadvali</a>.</p>" },
    { c: "Ruxsatlar", q: "Bu ruxsatni qayerda beraman?", a: "<p>MiniStack ichidagi Bosh sahifada <b>Ruxsat berish</b> tugmasini bosing, u to'g'ridan-to'g'ri kerakli sozlamalarni ochadi. Qo'lda: <b>Sozlamalar → Ilovalar → MiniStack → Maxsus ruxsatlar → Barcha fayllarga kirish</b>. Nomlar ishlab chiqaruvchiga qarab biroz farq qiladi.</p>" },
    { c: "Ruxsatlar", q: "Xavf haqida bildirishnoma kelmayapti", a: "<p>Android 13+ da bildirishnoma ruxsatini bering (Sozlamalar → Bildirishnomalar tugmasi). Ba'zi telefonlar (Xiaomi, Huawei, Oppo va boshqalar) fon ilovalarini batareya tejash rejimida to'xtatadi: MiniStack uchun batareya optimizatsiyasini o'chiring va avtoyuklashga ruxsat bering.</p>" },
    // Tekshiruv
    { c: "Tekshiruv", q: "Oddiy, ishonchli ilovani xavfli deb topdi. Nima qilaman?", a: "<p>Kartochkadagi sabablarni o'qing, ular nima uchun shubhali ekanini ko'rsatadi. Ilovani bilsangiz, <b>Ishonchli</b> tugmasini bosing. Ilova ro'yxatga olinadi, uning yangi versiyasi esa qayta tekshiriladi. Shuningdek, ilova nomi va paket nomini <a href=\"#murojaat\">murojaat</a> orqali yuboring, yolg'on signallarni tuzatib boramiz.</p>" },
    { c: "Tekshiruv", q: "\"Shubhali\" va \"Zararli\" nima farq qiladi?", a: "<p><b>Zararli</b>: aniq imzo yoki hash topildi (masalan, ma'lum RAT izi). <b>Shubhali</b>: bir nechta belgi yig'ilib 6 balldan oshdi, lekin aniq zararli isboti yo'q. Shubhali topilmalarni ko'rib chiqing, hech qachon avtomatik o'chirilmaydi.</p>" },
    { c: "Tekshiruv", q: "Zararli ilovani qanday o'chiraman?", a: "<p><b>O'chirish</b> tugmasi Android'ning o'z o'chirish oynasini ochadi (Android ilovaga jimgina o'chirishga ruxsat bermaydi). Agar \"o'chirib bo'lmaydi\" deb chiqsa, ilova qurilma administratori bo'lishi mumkin: <b>Sozlamalar → Xavfsizlik → Qurilma administratorlari</b> bo'limida uning ruxsatini olib tashlang, keyin qayta o'chiring.</p>" },
    { c: "Tekshiruv", q: "To'liq tekshiruv juda uzoq davom etyapti", a: "<p>To'liq tekshiruv xotiradagi barcha fayllarni ko'radi, shuning uchun fayl ko'p bo'lsa vaqt oladi. Tekshiruv paytida ekran o'chmaydi. Kundalik foydalanish uchun <b>Tezkor</b> tekshiruv yetarli: u ilovalar va xavfli papkalarni ko'radi.</p>" },
    { c: "Tekshiruv", q: "Antivirus ishlayotganini qanday sinab ko'raman?", a: "<p>Ilovada <b>Sozlamalar → EICAR test faylini yaratish</b> tugmasini bosing. EICAR antivirus sinovi uchun maxsus zararsiz fayl: real vaqt himoyasi yoqilgan bo'lsa, u darhol topilib karantinga olinadi.</p>" },
    // Maxfiylik
    { c: "Maxfiylik", q: "Ma'lumotlarim serverga yuboriladimi?", a: "<p>Yo'q. Android ilovasida <b>INTERNET ruxsati umuman yo'q</b>, u tarmoqqa chiqa olmaydi. Tekshiruv butunlay telefoningizda bajariladi. Buni APK manifestidan tekshirishingiz mumkin.</p>" },
    { c: "Maxfiylik", q: "Imzo bazasini qanday yangilayman yoki o'zimniki qo'shaman?", a: "<p>Ilovada <b>Sozlamalar → Imzo bazasi → Import (.db)</b>. Fayl oddiy matn: sha256, hex, str, sus va allow qatorlari (format uchun <a href=\"antivirus.html#imzolar\">Antivirus haqida</a> sahifasiga qarang). Yaroqli qoida topilmasa, baza o'zgarmaydi. <b>Standart</b> tugmasi asl bazani tiklaydi.</p>" },
    // Windows
    { c: "Windows", q: "Windows \"Windows protected your PC\" (SmartScreen) chiqardi", a: "<p>Dastur hali raqamli imzolanmagan, shuning uchun yangi faylga SmartScreen ogohlantirish beradi. Saytdagi SHA-256 fayl hashiga mos kelsa: <b>More info → Run anyway</b> ni bosing.</p>" },
    { c: "Windows", q: "Dastur \"imzolar yuklanmadi\" yoki qoidalar soni 0 deb ko'rsatyapti", a: "<p><code>signatures.db</code> fayli <code>MiniStack.exe</code> bilan <b>bir papkada</b> bo'lishi kerak. ZIP ni to'liq chiqaring (arxiv ichidan ishga tushirmang) va fayllarni alohida-alohida ko'chirmang.</p>" },
    { c: "Windows", q: "ClamAV nima va uni o'rnatish shartmi?", a: "<p>ClamAV millionlab imzoli ochiq antivirus dvigateli. U ixtiyoriy: Windows dasturi ichidan o'rnatiladi (~215 MB, internet kerak) va MiniStack dvigateliga qo'shimcha kuchli tekshiruv beradi. Usiz ham dastur to'liq ishlaydi.</p>" },
  ];

  const $ = (s) => document.querySelector(s);
  let cat = "Hammasi";
  let query = "";

  // ---- Savol-javob ----
  const cats = ["Hammasi"].concat(Array.from(new Set(FAQ.map((f) => f.c))));
  const catBox = $("#cats");
  catBox.innerHTML = cats.map((c) => '<button class="cat-btn' + (c === cat ? " on" : "") + '" type="button" role="tab" data-cat="' + MS.esc(c) + '">' + MS.esc(c) + "</button>").join("");
  catBox.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    cat = b.dataset.cat;
    catBox.querySelectorAll(".cat-btn").forEach((x) => x.classList.toggle("on", x === b));
    filter();
  });

  const list = $("#faq-list");
  list.innerHTML = FAQ.map((f, i) =>
    '<details class="qa" data-c="' + MS.esc(f.c) + '" id="f' + i + '"><summary>' + MS.esc(f.q) + MS.icon("chevron") + '</summary><div class="ans">' + f.a + "</div></details>").join("");

  function filter() {
    const q = query.trim().toLowerCase();
    let shown = 0;
    list.querySelectorAll("details.qa").forEach((d) => {
      const ok = (cat === "Hammasi" || d.dataset.c === cat) && (!q || d.textContent.toLowerCase().includes(q));
      d.hidden = !ok;
      if (ok) shown++;
    });
    $("#faq-empty").hidden = shown > 0;
  }
  $("#q").addEventListener("input", (e) => { query = e.target.value; filter(); });
  filter();

  // ---- Qo'shimcha aloqa kanallari (config bo'yicha) ----
  const cfg = MS.config.support;
  const extra = $("#extra-channels");
  if (cfg.email) extra.insertAdjacentHTML("beforeend", '<a class="btn btn-ghost" href="mailto:' + MS.esc(cfg.email) + '"><span data-icon="mail"></span>' + MS.esc(cfg.email) + "</a>");
  if (cfg.telegram) extra.insertAdjacentHTML("beforeend", '<a class="btn btn-ghost" href="' + MS.esc(cfg.telegram) + '" target="_blank" rel="noopener"><span data-icon="message"></span>Telegram orqali yozish</a>');
  MS.hydrateIcons(extra);

  // ---- Murojaat formasi ----
  const form = $("#ticket-form");
  const note = $("#t-note");
  note.innerHTML = MS.icon("info") + "<span>" + (cfg.email
    ? "Yuborganingizda email ilovangiz tayyor xabar bilan ochiladi. Murojaat nusxasi shu brauzerda ham saqlanadi."
    : "Demo rejim: murojaatlar hozircha faqat shu brauzerda saqlanadi (server ulanmagan).") + "</span>";

  function fill() {
    const u = MS.auth.current();
    if (u) {
      if (!form.elements.name.value) form.elements.name.value = u.name;
      if (!form.elements.email.value) form.elements.email.value = u.email;
    }
  }
  fill();
  MS.auth.onChange(fill);

  function setErr(name, msg) {
    const field = form.elements[name].closest(".field");
    field.classList.toggle("err", !!msg);
    field.querySelector(".msg").textContent = msg || "";
  }

  function myTickets() {
    const u = MS.auth.current();
    return MS.store.get("ms_tickets", []).filter((t) => (u ? t.userId === u.id : !t.userId)).reverse();
  }
  function renderTickets() {
    const items = myTickets();
    $("#my-tickets-card").hidden = items.length === 0;
    $("#my-tickets").innerHTML = items.slice(0, 6).map((t) =>
      '<div class="ticket"><div class="top"><b>#' + MS.esc(t.id) + " · " + MS.esc(t.cat) + '</b><span class="chip green">Qabul qilindi</span></div>' +
      "<p>" + MS.esc(t.message.length > 160 ? t.message.slice(0, 160) + "…" : t.message) + '</p><small class="muted">' + MS.esc(t.platform) + " · " +
      MS.esc(MS.fmtDate(t.t, { short: true, noYear: true, time: true })) + "</small></div>").join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    let bad = false;
    setErr("name", d.name.trim().length < 2 ? "Ismingizni kiriting." : ""); bad = bad || d.name.trim().length < 2;
    const emailBad = !MS.auth.validEmail(d.email.trim());
    setErr("email", emailBad ? "Email manzil noto'g'ri." : ""); bad = bad || emailBad;
    const msgBad = d.message.trim().length < 10;
    setErr("message", msgBad ? "Kamida 10 ta belgi yozing." : ""); bad = bad || msgBad;
    if (bad) return;

    const u = MS.auth.current();
    const ticket = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      t: Date.now(),
      userId: u ? u.id : null,
      name: d.name.trim(), email: d.email.trim().toLowerCase(),
      platform: d.platform, cat: d.cat, message: d.message.trim(),
      env: $("#t-env").checked ? navigator.userAgent : "",
    };
    const all = MS.store.get("ms_tickets", []);
    all.push(ticket);
    MS.store.set("ms_tickets", all.slice(-100));

    if (cfg.email) {
      const body = ticket.message + "\n\n---\nIsm: " + ticket.name + "\nEmail: " + ticket.email + "\nPlatforma: " + ticket.platform + (ticket.env ? "\nBrauzer: " + ticket.env : "");
      location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("[MiniStack #" + ticket.id + "] " + ticket.cat) + "&body=" + encodeURIComponent(body);
    }
    form.elements.message.value = "";
    renderTickets();
    MS.ui.toast("Murojaatingiz saqlandi. Raqam: #" + ticket.id, "ok");
  });

  MS.auth.onChange(renderTickets);
  renderTickets();

  // #f5 kabi havola bilan kelinsa, savolni ochamiz
  if (/^#f\d+$/.test(location.hash)) { const d = document.querySelector(location.hash); if (d) d.open = true; }
})();
