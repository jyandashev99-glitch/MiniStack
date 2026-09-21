/* Kirish / ro'yxatdan o'tish sahifasi. */
(function () {
  const params = new URLSearchParams(location.search);
  // Faqat shu saytdagi .html sahifalarga yo'naltiramiz (ochiq redirect'ga yo'l qo'ymaslik uchun)
  const rawNext = params.get("next") || "";
  const next = /^[a-z0-9-]+\.html(\?[\w=&-]*)?(#[\w-]*)?$/i.test(rawNext) ? rawNext : "account.html";

  if (MS.auth.current()) { location.replace(next); return; }

  const forms = { login: document.getElementById("login-form"), register: document.getElementById("register-form") };
  const tabs = document.querySelectorAll("[data-mode]");
  let mode = params.get("mode") === "register" ? "register" : "login";

  function show(m) {
    mode = m;
    Object.keys(forms).forEach((k) => { forms[k].hidden = k !== m; });
    tabs.forEach((t) => { const on = t.dataset.mode === m; t.classList.toggle("on", on); t.setAttribute("aria-selected", String(on)); });
    document.title = (m === "login" ? "Kirish" : "Ro'yxatdan o'tish") + " · MiniStack";
    const q = new URLSearchParams(location.search);
    q.set("mode", m);
    history.replaceState(null, "", "?" + q.toString());
    clearAll(forms[m]);
    const first = forms[m].querySelector("input");
    if (first && matchMedia("(hover: hover)").matches) first.focus();
  }
  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.mode)));
  document.querySelectorAll("[data-switch]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); show(a.dataset.switch); }));

  function fieldErr(form, name, msg) {
    const el = form.elements[name];
    if (!el) return;
    const field = el.closest(".field");
    field.classList.toggle("err", !!msg);
    field.querySelector(".msg").textContent = msg || "";
  }
  function clearAll(form) {
    form.querySelectorAll(".field").forEach((f) => { f.classList.remove("err"); f.querySelector(".msg").textContent = ""; });
    const e = form.querySelector("[data-error]");
    e.classList.remove("show"); e.textContent = "";
  }
  function formError(form, msg) {
    const e = form.querySelector("[data-error]");
    e.textContent = msg; e.classList.add("show");
  }
  function busy(form, on, label) {
    const b = form.querySelector("[data-submit]");
    b.disabled = on;
    b.textContent = on ? "Iltimos, kuting…" : label;
  }

  // Parolni ko'rsatish/yashirish
  document.querySelectorAll("[data-toggle-pw]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.innerHTML = MS.icon(show ? "eye-off" : "eye");
      btn.setAttribute("aria-label", show ? "Parolni yashirish" : "Parolni ko'rsatish");
    });
  });

  // Parol kuchi
  const strengthLabels = ["Juda oddiy", "Zaif", "O'rtacha", "Yaxshi", "Kuchli"];
  const regForm = forms.register;
  regForm.elements.password.addEventListener("input", (e) => {
    const s = e.target.value ? Math.max(1, MS.auth.strength(e.target.value)) : 0;
    regForm.querySelector("[data-strength]").dataset.s = s;
    regForm.querySelector("[data-strength-text]").textContent = e.target.value ? "Parol kuchi: " + strengthLabels[s] : "Kamida 8 ta belgi, harf va raqam bilan.";
  });

  function handleError(form, err) {
    if (!(err instanceof MS.auth.AuthError)) { formError(form, "Kutilmagan xato yuz berdi. Qayta urinib ko'ring."); console.error(err); return; }
    if (["name", "email", "password"].includes(err.code) && form.elements[err.code]) fieldErr(form, err.code, err.message);
    else formError(form, err.message);
  }

  // LOGIN
  forms.login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = forms.login;
    clearAll(f);
    const email = f.elements.email.value.trim();
    const password = f.elements.password.value;
    let bad = false;
    if (!MS.auth.validEmail(email.toLowerCase())) { fieldErr(f, "email", "Email manzilni to'g'ri kiriting."); bad = true; }
    if (!password) { fieldErr(f, "password", "Parolni kiriting."); bad = true; }
    if (bad) return;
    busy(f, true);
    try {
      const u = await MS.auth.login({ email, password, remember: f.elements.remember.checked });
      MS.ui.toast("Xush kelibsiz, " + u.name.split(" ")[0] + "!", "ok");
      setTimeout(() => location.replace(next), 400);
    } catch (err) {
      handleError(f, err);
      busy(f, false, "Kirish");
    }
  });

  // REGISTER
  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = regForm;
    clearAll(f);
    const v = { name: f.elements.name.value, email: f.elements.email.value, password: f.elements.password.value };
    if (v.password !== f.elements.confirm.value) { fieldErr(f, "confirm", "Parollar mos kelmadi."); return; }
    busy(f, true);
    try {
      const u = await MS.auth.register(v);
      MS.ui.toast("Hisob ochildi. Xush kelibsiz, " + u.name.split(" ")[0] + "!", "ok");
      setTimeout(() => location.replace(next), 500);
    } catch (err) {
      handleError(f, err);
      busy(f, false, "Hisob ochish");
    }
  });

  show(mode);
})();
