/* =========================================================
   WINNER — application forms
   <form data-form="internship|job"> ... </form>
   ส่งข้อมูลไปที่ WINNER_CONFIG.formEndpoint (Google Apps Script)
   ========================================================= */
(function () {
  "use strict";
  const CFG = window.WINNER_CONFIG || {};

  function setInvalid(field, msg) {
    const wrap = field.closest(".field");
    if (!wrap) return;
    wrap.classList.add("invalid");
    let err = wrap.querySelector(".err");
    if (!err) {
      err = document.createElement("span");
      err.className = "err";
      wrap.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearInvalid(field) {
    const wrap = field.closest(".field");
    if (wrap) wrap.classList.remove("invalid");
  }

  function validate(form) {
    let firstBad = null;
    form.querySelectorAll(".field.invalid").forEach((f) => f.classList.remove("invalid"));
    const checkedGroups = new Set();

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.type === "hidden" || el.disabled) return;
      if ((el.type === "radio" || el.type === "checkbox") && el.required) {
        if (checkedGroups.has(el.name)) return;
        checkedGroups.add(el.name);
        if (!form.querySelector(`[name="${CSS.escape(el.name)}"]:checked`)) {
          if (el.type === "checkbox" && el.closest(".consent")) {
            showToast("กรุณายอมรับเงื่อนไขการเก็บข้อมูลส่วนบุคคล");
          } else setInvalid(el, "กรุณาเลือกอย่างน้อย 1 ตัวเลือก");
          firstBad = firstBad || el;
        }
        return;
      }
      const v = (el.value || "").trim();
      if (el.required && !v) {
        setInvalid(el, "กรุณากรอกข้อมูลช่องนี้");
        firstBad = firstBad || el;
        return;
      }
      if (!v) return;
      if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        setInvalid(el, "รูปแบบอีเมลไม่ถูกต้อง");
        firstBad = firstBad || el;
      }
      if (el.type === "tel" && !/^0\d{8,9}$/.test(v.replace(/[\s-]/g, ""))) {
        setInvalid(el, "กรุณากรอกเบอร์โทรศัพท์ 9-10 หลัก เช่น 0812345678");
        firstBad = firstBad || el;
      }
    });

    if (firstBad) {
      const target = firstBad.closest(".field") || firstBad;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => firstBad.focus({ preventScroll: true }), 350);
      return false;
    }
    return true;
  }

  function collect(form) {
    const data = {};
    new FormData(form).forEach((value, key) => {
      value = typeof value === "string" ? value.trim() : value;
      data[key] = data[key] ? `${data[key]}, ${value}` : value;
    });
    data["วันที่ส่ง"] = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    data["formType"] = form.dataset.form;
    data["หน้าเว็บ"] = location.pathname.split("/").pop() + location.search;
    return data;
  }

  async function send(data) {
    if (!CFG.formEndpoint) {
      // Demo mode — เก็บไว้ใน browser เพื่อทดสอบเท่านั้น
      try {
        const key = "winner_submissions";
        const list = JSON.parse(localStorage.getItem(key) || "[]");
        list.push(data);
        localStorage.setItem(key, JSON.stringify(list));
      } catch (_) { /* storage blocked */ }
      console.info("[Winner form · demo mode] ยังไม่ได้ตั้งค่า formEndpoint ใน js/config.js", data);
      await new Promise((r) => setTimeout(r, 600));
      return { demo: true };
    }
    // Google Apps Script ไม่รองรับ CORS preflight → ส่งแบบ no-cors (form-urlencoded)
    await fetch(CFG.formEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams(data).toString()
    });
    return { demo: false };
  }

  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.noValidate = true;
    form.addEventListener("input", (e) => clearInvalid(e.target));
    form.addEventListener("change", (e) => clearInvalid(e.target));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const btn = form.querySelector('[type="submit"]');
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = "กำลังส่งข้อมูล...";
      try {
        const res = await send(collect(form));
        const card = form.closest(".form-card");
        card.classList.add("done");
        const note = card.querySelector(".demo-note");
        if (note) note.hidden = !res.demo;
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        form.reset();
      } catch (err) {
        console.error(err);
        showToast("ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อทาง Line");
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  });

  document.querySelectorAll("[data-form-again]").forEach((b) =>
    b.addEventListener("click", () => b.closest(".form-card").classList.remove("done"))
  );
})();
