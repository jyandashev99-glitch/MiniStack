/* Sayt sozlamalari. Yangi versiya chiqqanda faqat shu faylni yangilang. */
window.MS = window.MS || {};

MS.config = {
  platforms: {
    android: {
      id: "android",
      title: "MiniStack Mobile",
      version: "1.0",
      file: "downloads/MiniStack-Android-v1.0.apk",
      fileName: "MiniStack-Android-v1.0.apk",
      kind: "APK",
      sizeBytes: 8510886,
      // Yuklangan fayl SHA-256 (yuklab olingandan keyin tekshirish uchun)
      sha256: "6641de118b0fe3369932d68696ebc6a6ceab29ebe8627de29860ad90afaf848f",
      // APK imzolovchi sertifikat SHA-256 (apksigner verify --print-certs bilan solishtiring)
      certSha256: "a1e30f41e514d685f12be9ee683f9548f4dbcd0bcce468aa582db3ff9b8ca2df",
      requirement: "Android 8.0+",
      released: "2026-09-21",
      rules: 112,
    },
    windows: {
      id: "windows",
      title: "MiniStack Antivirus",
      version: "1.1",
      file: "downloads/MiniStack.exe",
      fileName: "MiniStack Windows",
      kind: "EXE",
      sizeBytes: 1763588,
      sha256: "9c642d6945f1e499b50ac57e31f145f6d7066d97eeff30f65e771f4666447b70",
      // ZIP ichidagi MiniStack.exe SHA-256
      exeSha256: "b948839822af5b313b6d01f498365d81b2b15733b266e2a1dfce48b6785fca81",
      requirement: "Windows 10/11 (64-bit)",
      released: "2026-09-19",
    },
  },
  // Yordam kanallari: bo'sh qoldirilsa, sahifada ko'rsatilmaydi.
  support: {
    email: "",     // masalan: "support@sizning-domeningiz.uz"
    telegram: "",  // masalan: "https://t.me/sizning_kanalingiz"
  },
};

// Eski kod bilan moslik: MS.config.app = Android
MS.config.app = MS.config.platforms.android;

MS.fmtSize = function (bytes) {
  return (bytes / 1048576).toFixed(1).replace(".", ",") + " MB";
};

// O'zbekcha sana (brauzerlarning uz-UZ qo'llovi bir xil emas, shuning uchun o'zimiz formatlaymiz)
MS.fmtDate = function (ts, opts) {
  opts = opts || {};
  const long = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktyabr", "noyabr", "dekabr"];
  // "2026-09-21" kabi sof sana UTC emas, mahalliy vaqt deb o'qiladi (aks holda vaqt mintaqasiga qarab bir kunga surilib ketadi)
  const m = typeof ts === "string" && /^(\d{4})-(\d{2})-(\d{2})$/.exec(ts);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(ts);
  const mon = opts.short ? long[d.getMonth()].slice(0, 3) : long[d.getMonth()];
  let out = d.getDate() + " " + mon + (opts.noYear ? "" : " " + d.getFullYear());
  if (opts.time) out += ", " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  return out;
};
