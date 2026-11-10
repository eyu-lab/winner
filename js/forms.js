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
      if (el.type === "file") {
        const file = el.files[0];
        if (el.required && !file) {
          setInvalid(el, "กรุณาแนบไฟล์");
          firstBad = firstBad || el;
        } else if (file) {
          const max = parseFloat(el.dataset.maxMb || "5");
          const okType = /\.(pdf|jpe?g|png)$/i.test(file.name);
          if (!okType) { setInvalid(el, "รองรับเฉพาะไฟล์ PDF, JPG หรือ PNG"); firstBad = firstBad || el; }
          else if (file.size > max * 1024 * 1024) { setInvalid(el, `ไฟล์ใหญ่เกิน ${max} MB กรุณาลดขนาดไฟล์`); firstBad = firstBad || el; }
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

  const readBase64 = (file) => new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

  /* ไฟล์แนบ: ส่งเป็น base64 ในช่อง "_file:<ชื่อช่อง>" → Apps Script บันทึกลง Google Drive แล้วใส่ลิงก์ในชีต */
  async function collect(form) {
    const data = {};
    for (const el of form.querySelectorAll('input[type="file"]')) {
      const file = !el.disabled && el.files[0];
      if (!file) continue;
      data[el.name] = file.name;
      data["_file:" + el.name] = JSON.stringify({ name: file.name, type: file.type || "application/octet-stream", data: await readBase64(file) });
    }
    new FormData(form).forEach((value, key) => {
      if (typeof value !== "string") return; // ไฟล์จัดการด้านบนแล้ว
      value = value.trim();
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
        const slim = {};
        Object.keys(data).forEach((k) => { if (!k.startsWith("_file:")) slim[k] = data[k]; }); // ไม่เก็บไฟล์ใน browser
        list.push(slim);
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

  /* กล่องแนบไฟล์: แสดงชื่อไฟล์ที่เลือก + รองรับลากไฟล์มาวาง */
  document.querySelectorAll(".file-drop").forEach((drop) => {
    const input = drop.querySelector('input[type="file"]');
    const nameEl = drop.querySelector(".file-name");
    const empty = nameEl.textContent;
    const show = () => {
      const f = input.files[0];
      const size = f && (f.size < 1048576 ? `${Math.max(1, Math.round(f.size / 1024))} KB` : `${(f.size / 1048576).toFixed(1)} MB`);
      nameEl.textContent = f ? `${f.name} (${size})` : empty;
      drop.classList.toggle("has-file", !!f);
    };
    input.addEventListener("change", show);
    ["dragenter", "dragover"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add("drag"); }));
    ["dragleave", "drop"].forEach((t) => drop.addEventListener(t, () => drop.classList.remove("drag")));
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      if (input.disabled || !e.dataTransfer.files.length) return;
      input.files = e.dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    input.form?.addEventListener("reset", () => setTimeout(show));
  });

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
        const res = await send(await collect(form));
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
