/* =========================================================
   WINNER — shared layout (header, footer, CTA, helpers)
   <body data-page="home|internship|job|about" data-brand="none|hr|w96">
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Icons (inline SVG, Lucide-style) ---------- */
  const p = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    search: p('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    chevDown: p('<path d="m6 9 6 6 6-6"/>'),
    chevLeft: p('<path d="m15 18-6-6 6-6"/>'),
    chevRight: p('<path d="m9 18 6-6-6-6"/>'),
    menu: p('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    close: p('<path d="M18 6 6 18M6 6l12 12"/>'),
    phone: p('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    chat: p('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>'),
    mail: p('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    like: p('<path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z"/>'),
    camera: p('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>'),
    play: p('<polygon points="7 4 20 12 7 20 7 4" fill="currentColor"/>'),
    utensils: p('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>'),
    shield: p('<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>'),
    shieldCheck: p('<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    home: p('<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
    grad: p('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
    globe: p('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    languages: p('<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>'),
    coins: p('<circle cx="8" cy="8" r="6"/><path d="M18.1 10.4A6 6 0 1 1 10.3 18M7 6h1v4M16.7 13.9l.7.7-2.8 2.8"/>'),
    users: p('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    award: p('<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>'),
    headset: p('<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>'),
    plane: p('<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>'),
    briefcase: p('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    file: p('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5M9 15l2 2 4-4"/>'),
    check: p('<path d="M20 6 9 17l-5-5"/>'),
    upload: p('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'),
    star: p('<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>'),
    arrowRight: p('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    mapPin: p('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    bell: p('<path d="M3 20h18M5 20a7 7 0 0 1 14 0M12 9V7M10 7h4"/>'),
    bed: p('<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>'),
    chefHat: p('<path d="M17 21a1 1 0 0 0 1-1v-5.4a1 1 0 0 1 .6-.9A4 4 0 0 0 16.3 6 4 4 0 0 0 12 3a4 4 0 0 0-4.3 3 4 4 0 0 0-2.3 7.7 1 1 0 0 1 .6.9V20a1 1 0 0 0 1 1zM6 17h12"/>'),
    wine: p('<path d="M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/>'),
    tray: p('<path d="M2 18h20M4 18a8 8 0 0 1 16 0M12 10V8"/><circle cx="12" cy="7" r="1"/><path d="M20 22H4"/>'),
    calendar: p('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>'),
    clock: p('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    moon: p('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>'),
    wallet: p('<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>')
  };
  window.ICONS = ICONS;

  const CFG = window.WINNER_CONFIG || { contact: {} };
  const C = CFG.contact;
  const COUNTRIES = window.JOB_COUNTRIES || [];
  const body = document.body;
  const page = body.dataset.page || "";
  const brand = body.dataset.brand || "none";
  const params = new URLSearchParams(location.search);

  const LOGOS = {
    hr: { src: "assets/logo-winner-hr.jpg", alt: "Winner HR International Co.,Ltd", home: "internship.html" },
    w96: { src: "assets/logo-winner96.jpg", alt: "Winner 96 Management Manpower Co.,Ltd", home: "job.html" }
  };
  const logo = LOGOS[brand];

  window.flagUrl = (code, w = 160) => `https://flagcdn.com/w${w}/${code}.png`;

  /* ---------- Header ---------- */
  function countryLinks() {
    const current = params.get("c");
    const items = COUNTRIES.map((c) =>
      c.active
        ? `<a href="job-country.html?c=${c.slug}" class="${current === c.slug ? "current" : ""}"><img class="flag" src="${flagUrl(c.flag, 40)}" alt="">${c.nameTh} <span style="color:var(--muted);font-size:12px">(${c.nameEn})</span></a>`
        : `<span class="disabled"><img class="flag" src="${flagUrl(c.flag, 40)}" alt="" style="opacity:.5">${c.nameTh} — เร็วๆ นี้</span>`
    ).join("");
    return `<div class="dd-label">เลือกประเทศ</div>${items}<hr><a href="job.html">ดูทุกประเทศ</a>`;
  }

  const searchForm = (cls) => `
    <form class="search ${cls}" role="search">
      <input type="search" name="q" placeholder="SEARCH..." aria-label="ค้นหา">
      <button type="submit" aria-label="ค้นหา">${ICONS.search}</button>
    </form>`;

  const header = `
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${logo ? logo.home : "index.html"}" aria-label="${logo ? logo.alt : "Winner"}">
        ${logo ? `<img src="${logo.src}" alt="${logo.alt}">` : ""}
      </a>
      <nav class="main-nav" id="main-nav" aria-label="เมนูหลัก">
        <a href="index.html" class="${page === "home" ? "active" : ""}">HOME</a>
        <a href="internship.html" class="${page === "internship" ? "active" : ""}">INTERNSHIP</a>
        <div class="nav-dropdown">
          <a href="job.html" class="nav-link ${page === "job" ? "active" : ""}" aria-haspopup="true">JOB ${ICONS.chevDown.replace("<svg", '<svg class="chev"')}</a>
          <div class="dropdown-menu">${countryLinks()}</div>
        </div>
        <a href="about.html" class="${page === "about" ? "active" : ""}">ABOUT US</a>
        ${searchForm("search-mobile")}
      </nav>
      ${searchForm("")}
      <button class="nav-toggle" aria-label="เปิดเมนู" aria-controls="main-nav" aria-expanded="false">${ICONS.menu}</button>
    </div>
  </header>`;

  /* ---------- CTA band + Footer ---------- */
  /* ---------- Licence card (Winner 96 / Job pages only) ---------- */
  const LICENCE = {
    title: "บริษัทจัดหางานที่ได้รับอนุญาตถูกต้องตามกฎหมาย",
    desc: "Winner 96 Management Manpower Co.,Ltd ได้รับใบอนุญาตจัดหางานเพื่อไปทำงานต่างประเทศ ตรวจสอบข้อมูลบริษัทได้ก่อนตัดสินใจสมัครงาน",
    items: [
      { value: "ต.1299/2568", label: "ใบอนุญาตจัดหางานให้คนหางานเพื่อไปทำงานต่างประเทศ" },
      { value: "Accredited List", label: "Overseas Manpower Recruitment Agency" },
      { value: "W-12", label: "Organization · วันที่ 20260604" }
    ]
  };
  const applyHref = page === "job" && document.getElementById("country-page") ? "#apply" : "job.html#country-grid";
  const licenceCard = brand !== "w96" ? "" : `
  <section class="licence-section">
    <div class="container">
      <div class="licence-card">
        <span class="licence-check">${ICONS.check}</span>
        <div class="licence-text">
          <h2>${LICENCE.title}</h2>
          <p>${LICENCE.desc}</p>
          <a href="${applyHref}">สอบถาม / สมัครงานกับเรา →</a>
        </div>
        <div class="licence-items">
          ${LICENCE.items.map((i) => `<div class="licence-item"><b>${i.value}</b><span>${i.label}</span></div>`).join("")}
        </div>
      </div>
    </div>
  </section>`;

  const footer = `${licenceCard}
  <section class="cta-band">
    <div class="container">
      <h2>Winner HR International | เปิดประตูสู่อนาคตที่มั่นคง<br>
      ด้วยโอกาสฝึกงานและทำงานต่างประเทศอย่างถูกต้องตามกฎหมาย<br>
      เพราะอนาคตและความมั่นคงของเด็กไทยคือสิ่งสำคัญ</h2>
      <p>Winner HR International พร้อมเป็นสะพานเชื่อมโอกาสสู่เวทีระดับสากล การันตีด้วยเครือข่ายพาร์ทเนอร์โรงแรมระดับ 4-5 ดาวในประเทศไต้หวัน พร้อมบริการจัดหางานและดูแลด้านแรงงานครบวงจร ให้ทุกก้าวสู่ต่างประเทศของคุณปลอดภัยและเติบโตอย่างมั่นคง</p>
    </div>
  </section>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo ? `<img src="${logo.src}" alt="${logo.alt}">` : `<div class="footer-name">Winner HR International Co.,Ltd</div>`}
        <p>${C.address || ""}</p>
      </div>
      <div class="footer-col">
        <h4>Programs</h4>
        <a href="job.html">Job</a>
        <a href="internship.html">Internships</a>
        <a href="index.html#programs">Other Exchange Programs</a>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <a href="tel:${C.hotline}">${ICONS.phone} Hotline: ${C.hotline}</a>
        <a href="${C.lineUrl}" target="_blank" rel="noopener">${ICONS.chat} Line: ${C.line}</a>
        <a href="mailto:${C.email}">${ICONS.mail} ${C.email}</a>
      </div>
      <div class="footer-col">
        <h4>Follow Us</h4>
        <div class="socials">
          <a href="${C.facebook}" aria-label="Facebook">${ICONS.like}</a>
          <a href="${C.instagram}" aria-label="Instagram">${ICONS.camera}</a>
          <a href="${C.youtube}" aria-label="YouTube">${ICONS.play}</a>
        </div>
      </div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} Winner HR International Co.,Ltd. All Rights Reserved.</div>
  </footer>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  const hSlot = document.getElementById("site-header");
  const fSlot = document.getElementById("site-footer");
  if (hSlot) hSlot.outerHTML = header;
  if (fSlot) fSlot.outerHTML = footer;

  /* ---------- Toast ---------- */
  let toastTimer;
  window.showToast = function (msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  };

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  document.querySelectorAll(".nav-dropdown > .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  /* ---------- Search ---------- */
  const ROUTES = [
    { keys: ["taiwan", "ไต้หวัน", "intern", "ฝึกงาน", "โรงแรม", "hotel", "f&b", "kitchen", "นักศึกษา"], url: "internship.html" },
    { keys: ["about", "เกี่ยวกับ", "ติดต่อ", "contact", "บริษัท"], url: "about.html" },
    { keys: ["job", "งาน", "สมัครงาน", "winner 96", "winner96", "ต่างประเทศ"], url: "job.html" }
  ];
  document.querySelectorAll("form.search").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = (f.q.value || "").trim().toLowerCase();
      if (!q) return;
      const country = COUNTRIES.find((c) => c.active && (c.nameTh.includes(q) || c.nameEn.toLowerCase().includes(q) || c.slug.includes(q)));
      if (country) return (location.href = `job-country.html?c=${country.slug}`);
      for (const c of COUNTRIES) {
        const pos = (c.positions || []).find((x) => x.th.includes(q) || x.en.toLowerCase().includes(q));
        if (c.active && pos) return (location.href = `job-country.html?c=${c.slug}#positions`);
      }
      const r = ROUTES.find((r) => r.keys.some((k) => q.includes(k) || k.includes(q)));
      if (r) return (location.href = r.url);
      showToast(`ไม่พบผลลัพธ์สำหรับ “${f.q.value}”`);
    })
  );

  /* ---------- Media slots: load image if it exists, else keep designed fallback ---------- */
  window.initMedia = function (root = document) {
    root.querySelectorAll(".media[data-img]:not([data-ready])").forEach((el) => {
      el.dataset.ready = "1";
      const src = el.dataset.img;
      const img = new Image();
      img.onload = () => {
        el.style.setProperty("--img", `url("${src}")`);
        el.classList.add("has-img");
      };
      img.src = src;
      if (CFG.showImageHints) {
        const hint = document.createElement("span");
        hint.className = "img-hint";
        hint.textContent = src.split("/").pop();
        el.appendChild(hint);
      }
    });
  };

  /* ---------- Reveal on scroll ---------- */
  window.initReveal = function (root = document) {
    const els = root.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  };

  /* ---------- Fill [data-icon] placeholders ---------- */
  window.initIcons = function (root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => {
      if (!el.innerHTML.trim()) el.innerHTML = ICONS[el.dataset.icon] || "";
    });
  };

  /* ---------- "Coming soon" links ---------- */
  document.addEventListener("click", (e) => {
    const soon = e.target.closest("[data-soon]");
    if (soon) {
      e.preventDefault();
      showToast("โปรแกรมนี้กำลังจะเปิดเร็วๆ นี้ — สอบถามเพิ่มเติมได้ที่ Line " + C.line);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    initIcons();
    initMedia();
    initReveal();
  });
})();
