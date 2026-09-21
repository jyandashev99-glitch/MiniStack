/* Profil sahifasi. */
(function () {
  let user = MS.auth.current();
  if (!user) { location.replace("auth.html?next=account.html"); return; }

  const $ = (s) => document.querySelector(s);
  const NAMES = { android: "Android", windows: "Windows" };

  function initials(n) {
    const p = n.trim().split(/\s+/);
    return ((p[0] || "?")[0] + (p[1] ? p[1][0] : "")).toUpperCase();
  }

  function render() {
    user = MS.auth.current();
    if (!user) { location.replace("auth.html"); return; }
    $("#p-avatar").textContent = initials(user.name);
    $("#p-name").textContent = user.name;
    $("#p-email").textContent = user.email;
    $("#p-since").textContent = MS.fmtDate(user.createdAt, { short: true });
    $("#s-name").value = user.name;
    $("#s-email").value = user.email;

    const dl = MS.store.get("ms_dl_" + user.id, []);
    const tk = MS.store.get("ms_tickets", []).filter((t) => t.userId === user.id);
    $("#p-dl").textContent = dl.length;
    $("#p-tk").textContent = tk.length;

    $("#a-history").innerHTML = dl.length
      ? dl.slice().reverse().slice(0, 8).map((d) => {
        const pl = d.p || "android";
        return '<div class="history-item"><span style="display:flex;gap:10px;align-items:center">' + MS.icon(pl === "windows" ? "monitor" : "smartphone") +
          "<b>MiniStack " + MS.esc(NAMES[pl] || pl) + " v" + MS.esc(d.v) + '</b></span><span class="muted">' +
          MS.esc(MS.fmtDate(d.t, { short: true, time: true })) + "</span></div>";
      }).join("")
      : '<div class="empty">Hali hech narsa yuklab olinmagan.</div>';

    $("#a-tickets").innerHTML = tk.length
      ? tk.slice().reverse().slice(0, 6).map((t) =>
        '<div class="ticket"><div class="top"><b>#' + MS.esc(t.id) + " · " + MS.esc(t.cat) + '</b><span class="chip green">Qabul qilindi</span></div><p>' +
        MS.esc(t.message.length > 160 ? t.message.slice(0, 160) + "…" : t.message) + '</p><small class="muted">' + MS.esc(t.platform) + "</small></div>").join("")
      : '<div class="empty">Murojaatlar yo\'q.</div>';
  }

  // Tablar
  document.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("[data-tab]").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll("[data-panel-id]").forEach((p) => p.classList.toggle("on", p.dataset.panelId === b.dataset.tab));
  }));

  $("#p-logout").addEventListener("click", () => {
    MS.auth.logout();
    location.href = "index.html";
  });

  function fieldErr(form, name, msg) {
    const field = form.elements[name].closest(".field");
    field.classList.toggle("err", !!msg);
    field.querySelector(".msg").textContent = msg || "";
  }

  // Ism
  $("#profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    fieldErr(f, "name", "");
    try {
      await MS.auth.updateProfile({ name: f.elements.name.value });
      MS.ui.toast("Profil saqlandi", "ok");
      MS.layout.render();
      render();
    } catch (err) {
      fieldErr(f, "name", err.message);
    }
  });

  // Parol
  const pwForm = $("#pw-form");
  pwForm.elements.new.addEventListener("input", (e) => {
    pwForm.querySelector("[data-strength]").dataset.s = e.target.value ? Math.max(1, MS.auth.strength(e.target.value)) : 0;
  });
  pwForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    fieldErr(f, "old", ""); fieldErr(f, "new", "");
    const box = f.querySelector("[data-error]");
    box.classList.remove("show");
    try {
      await MS.auth.changePassword({ oldPassword: f.elements.old.value, newPassword: f.elements.new.value });
      f.reset();
      f.querySelector("[data-strength]").dataset.s = 0;
      MS.ui.toast("Parol yangilandi", "ok");
    } catch (err) {
      if (err.code === "bad") fieldErr(f, "old", err.message);
      else if (err.code === "password") fieldErr(f, "new", err.message);
      else { box.textContent = err.message; box.classList.add("show"); }
    }
  });

  // Hisobni o'chirish
  $("#delete-btn").addEventListener("click", () => {
    const close = MS.ui.modal({
      title: "Hisobni o'chirish",
      body:
        '<p class="muted" style="margin:8px 0 18px">Tasdiqlash uchun parolingizni kiriting. Bu amalni qaytarib bo\'lmaydi.</p>' +
        '<div class="field"><label for="del-pw">Parol</label><input id="del-pw" type="password" autocomplete="current-password"><div class="msg" id="del-msg"></div></div>',
      actions: [
        { label: "Bekor qilish", cls: "btn-ghost" },
        {
          label: "Hisobni o'chirish", cls: "btn-danger",
          onClick() {
            const pw = document.getElementById("del-pw").value;
            MS.auth.deleteAccount(pw).then(() => {
              close();
              MS.ui.toast("Hisob o'chirildi", "ok");
              setTimeout(() => (location.href = "index.html"), 600);
            }).catch((err) => { document.getElementById("del-msg").textContent = err.message; });
            return false;
          },
        },
      ],
    });
  });

  render();
})();
