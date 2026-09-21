# MiniStack sayti

Toza HTML + CSS + JavaScript (framework va build kerak emas). Android (APK) va Windows (ZIP) versiyalarini tarqatadi.

## Ishga tushirish
Mahalliy ko'rish:

    node serve.js          # http://localhost:5173

Yoki papkani istalgan statik hostingga (Nginx, Netlify, Cloudflare Pages, GitHub Pages...) yuklang.
**HTTPS shart**: parol hash qilish (`crypto.subtle`) faqat xavfsiz kontekstda (https yoki localhost) ishlaydi.

## Sahifalar
| Fayl | Nima |
|---|---|
| `index.html` | Bosh sahifa: hero, imkoniyatlar, jonli namuna, maxfiylik, FAQ |
| `antivirus.html` | Antivirus haqida: tekshiruv turlari, ball tizimi, ruxsatlar, cheklovlar, imzo formati |
| `download.html` | Android/Windows yuklab olish, SHA-256 tekshirish, yuklashlar tarixi |
| `support.html` | Savol-javob (qidiruv, kategoriya) va murojaat formasi |
| `auth.html` | Kirish / ro'yxatdan o'tish |
| `account.html` | Profil: tarix, murojaatlar, ism/parol, hisobni o'chirish |

## Yangi versiya chiqarish
1. Yangi faylni `downloads/` ga qo'ying.
2. Hash va hajmni oling (PowerShell):

       Get-FileHash downloads\MiniStack-Android-v1.0.apk -Algorithm SHA256
       (Get-Item downloads\MiniStack-Android-v1.0.apk).Length

3. `assets/js/config.js` dagi `platforms.android` / `platforms.windows` qiymatlarini yangilang
   (`version`, `file`, `fileName`, `sizeBytes`, `sha256`, `released`). Sahifalar shu joydan o'qiydi.

Hozirgi fayllar: `MiniStack-Android-v1.0.apk` (imzo sertifikati SHA-256 config'da), `MiniStack-Windows-v1.1.zip`
(MiniStack.exe, ministack-cli.exe, signatures.db, start-protection.bat, README.txt).

## Yordam kanallari
`config.js` dagi `support.email` va `support.telegram` ni to'ldiring. To'ldirilsa, Yordam sahifasida tugmalar chiqadi
va murojaat yuborilganda email ilovasi tayyor xabar bilan ochiladi.

## MUHIM: hozir backend yo'q
- **Hisoblar** (`assets/js/auth.js`) va **murojaatlar**, **yuklashlar tarixi** foydalanuvchining o'z brauzerida (`localStorage`) saqlanadi.
  Parol PBKDF2-SHA256 (150 000 iteratsiya, tasodifiy salt) bilan hash qilinadi, ochiq saqlanmaydi, lekin bu **haqiqiy server xavfsizligi emas**:
  hisoblar qurilmalar orasida sinxronlanmaydi, brauzer ma'lumotlarini tozalasa yo'qoladi.
- Murojaatlar operatorga **o'zi yetib bormaydi** (faqat email sozlangan bo'lsa, email ilovasi orqali).
- Haqiqiy backend ulash: `auth.js` dagi `register / login / logout / current / updateProfile / changePassword / deleteAccount`
  va `support.js` dagi murojaatni saqlash qismini `fetch()` chaqiruvlariga almashtiring. Sahifalar faqat shu interfeysdan foydalanadi.
  Serverda parolni **server tomonida** hash qiling (argon2/bcrypt), sessiyani `HttpOnly` cookie bilan yuriting.
- APK/ZIP hajmi katta bo'lsa yoki trafik ko'p bo'lsa, fayllarni CDN/obyekt saqlash (S3, R2) orqali tarqating.
