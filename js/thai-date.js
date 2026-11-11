/* =========================================================
   ปฏิทินภาษาไทย (เดือนไทย + ปี พ.ศ.) ใช้ร่วมกันทุกหน้า
   ใช้งาน: <input data-thai-date name="วันเกิด" required
                data-min="1950-01-01" data-max="today" data-view-years-ago="25">
   - ช่องจะแสดง/ส่งค่าเป็นข้อความไทย เช่น "25 ธันวาคม 2543"
   - ค่าแบบ ค.ศ. (YYYY-MM-DD) เก็บใน input.dataset.iso ไว้ให้สคริปต์อื่นใช้ (เช่น คำนวณอายุ)
   ========================================================= */
(function () {
  const MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const MONTHS_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const BE = 543;
  window.THAI_DATE = { MONTHS, MONTHS_SHORT, BE };

  const CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => {
    if (!s) return null;
    if (s === "today") { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const thaiText = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear() + BE}`;

  function enhance(input) {
    if (input.dataset.thaiReady) return;
    input.dataset.thaiReady = "1";
    input.type = "text";
    input.readOnly = true;
    input.autocomplete = "off";
    input.classList.add("tdp-input");
    if (!input.placeholder) input.placeholder = "เลือกวันที่ (พ.ศ.)";
    input.setAttribute("aria-haspopup", "dialog");
    input.setAttribute("aria-expanded", "false");

    const min = parse(input.dataset.min) || new Date(1940, 0, 1);
    const max = parse(input.dataset.max) || new Date(new Date().getFullYear() + 5, 11, 31);
    const yearsAgo = parseInt(input.dataset.viewYearsAgo || "0", 10);

    const wrap = document.createElement("div");
    wrap.className = "tdp";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    const ic = document.createElement("span");
    ic.className = "tdp-ic";
    ic.innerHTML = CAL_ICON;
    wrap.appendChild(ic);

    const pop = document.createElement("div");
    pop.className = "mp-pop tdp-pop";
    pop.hidden = true;
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "เลือกวันที่");
    let yearOpts = "";
    for (let y = max.getFullYear(); y >= min.getFullYear(); y--) yearOpts += `<option value="${y}">${y + BE}</option>`;
    pop.innerHTML = `
      <div class="mp-head tdp-head">
        <button type="button" class="mp-nav" data-step="-1" aria-label="เดือนก่อนหน้า">‹</button>
        <div class="tdp-selects">
          <select class="tdp-month" aria-label="เดือน">${MONTHS.map((m, i) => `<option value="${i}">${m}</option>`).join("")}</select>
          <select class="tdp-year" aria-label="ปี พ.ศ.">${yearOpts}</select>
        </div>
        <button type="button" class="mp-nav" data-step="1" aria-label="เดือนถัดไป">›</button>
      </div>
      <div class="tdp-dow">${DAYS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="tdp-grid"></div>`;
    wrap.appendChild(pop);

    const mSel = pop.querySelector(".tdp-month"), ySel = pop.querySelector(".tdp-year"), grid = pop.querySelector(".tdp-grid");
    let selected = null, vy, vm;

    const clampView = () => {
      const idx = Math.min(Math.max(vy * 12 + vm, min.getFullYear() * 12 + min.getMonth()), max.getFullYear() * 12 + max.getMonth());
      vy = Math.floor(idx / 12); vm = idx % 12;
    };

    function render() {
      clampView();
      mSel.value = vm; ySel.value = vy;
      const first = new Date(vy, vm, 1), days = new Date(vy, vm + 1, 0).getDate();
      const today = iso(new Date());
      let html = "";
      for (let i = 0; i < first.getDay(); i++) html += "<span></span>";
      for (let d = 1; d <= days; d++) {
        const dt = new Date(vy, vm, d), k = iso(dt);
        const off = dt < min || dt > max;
        const cls = ["tdp-day", selected && k === iso(selected) ? "on" : "", k === today ? "now" : ""].join(" ");
        html += `<button type="button" class="${cls}" data-d="${d}"${off ? " disabled" : ""} aria-label="${thaiText(dt)}">${d}</button>`;
      }
      grid.innerHTML = html;
      const vIdx = vy * 12 + vm;
      pop.querySelector('[data-step="-1"]').disabled = vIdx <= min.getFullYear() * 12 + min.getMonth();
      pop.querySelector('[data-step="1"]').disabled = vIdx >= max.getFullYear() * 12 + max.getMonth();
    }

    function open() {
      const base = selected || (yearsAgo ? new Date(max.getFullYear() - yearsAgo, max.getMonth(), 1) : max < new Date() ? max : new Date());
      vy = base.getFullYear(); vm = base.getMonth();
      render();
      pop.hidden = false;
      input.setAttribute("aria-expanded", "true");
      wrap.classList.add("open");
    }
    function close(refocus) {
      pop.hidden = true;
      input.setAttribute("aria-expanded", "false");
      wrap.classList.remove("open");
      if (refocus) input.focus();
    }
    function choose(d) {
      selected = d;
      input.value = d ? thaiText(d) : "";
      if (d) input.dataset.iso = iso(d); else delete input.dataset.iso;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.closest(".field")?.classList.remove("invalid");
    }

    input.addEventListener("click", () => (pop.hidden ? open() : close()));
    ic.addEventListener("click", () => (pop.hidden ? open() : close()));
    input.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " " || e.key === "ArrowDown") && pop.hidden) { e.preventDefault(); open(); }
    });
    wrap.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) { e.preventDefault(); close(true); } });
    pop.addEventListener("click", (e) => {
      const nav = e.target.closest(".mp-nav");
      if (nav && !nav.disabled) { vm += +nav.dataset.step; if (vm < 0) { vm = 11; vy--; } if (vm > 11) { vm = 0; vy++; } render(); return; }
      const day = e.target.closest(".tdp-day");
      if (day && !day.disabled) { choose(new Date(vy, vm, +day.dataset.d)); close(true); }
    });
    mSel.addEventListener("change", () => { vm = +mSel.value; render(); });
    ySel.addEventListener("change", () => { vy = +ySel.value; render(); });
    document.addEventListener("click", (e) => { if (!pop.hidden && !wrap.contains(e.target)) close(); });
    input.form?.addEventListener("reset", () => setTimeout(() => { selected = null; delete input.dataset.iso; }));
  }

  function init(root) { (root || document).querySelectorAll("input[data-thai-date]").forEach(enhance); }
  window.ThaiDatePicker = { init, enhance };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
  else init();
})();
