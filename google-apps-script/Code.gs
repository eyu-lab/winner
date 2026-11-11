/**
 * WINNER — รับข้อมูลฟอร์มจากเว็บไซต์ แล้วบันทึกลง Google Sheets
 *
 * วิธีติดตั้ง (ทำครั้งเดียว):
 * 1. สร้าง Google Sheet ใหม่ → เมนู Extensions → Apps Script
 * 2. ลบโค้ดเดิม แล้ววางโค้ดไฟล์นี้ทั้งหมด → Save
 * 3. Deploy → New deployment → เลือกประเภท "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. กด Deploy → อนุญาตสิทธิ์ → คัดลอก "Web app URL"
 * 5. นำ URL ไปใส่ใน js/config.js → formEndpoint: "https://script.google.com/macros/s/....../exec"
 *
 * ข้อมูลจะแยกเป็น 2 แท็บอัตโนมัติ: "Internship" และ "Manpower"
 * หัวคอลัมน์จะสร้างเองตามชื่อช่องในฟอร์ม (เพิ่มช่องใหม่ในฟอร์มได้เลย ไม่ต้องแก้สคริปต์)
 *
 * ไฟล์แนบ (เช่น ผลสอบภาษา) จะถูกเก็บในโฟลเดอร์ "Winner - ไฟล์แนบผู้สมัคร" ใน Google Drive
 * และในชีตจะเป็นลิงก์ไปยังไฟล์
 *
 * ⚠ เมื่อแก้โค้ดนี้แล้ว ต้อง Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy
 *   (URL เดิมยังใช้ได้) — ก่อน deploy ให้เลือกฟังก์ชัน authorizeDrive แล้วกด Run 1 ครั้งเพื่ออนุญาตสิทธิ์ Google Drive
 *
 * ใบสมัคร MANPOWER → PDF อัตโนมัติ (ตั้งค่าครั้งเดียว):
 *   1. อัปโหลดไฟล์ google-apps-script/แม่แบบใบสมัคร Manpower.docx ขึ้น Google Drive (บัญชีเดียวกับเจ้าของสคริปต์)
 *   2. เปิดไฟล์นั้น → File → Save as Google Docs → ตั้งชื่อไฟล์ใหม่ว่า "แม่แบบใบสมัคร Manpower" (ตรงกับ JOB_TEMPLATE_NAME)
 *      (แก้หน้าตาแม่แบบใน Google Docs ได้ตามสบาย แค่อย่าแก้ข้อความ {{...}})
 *   3. ใน Apps Script เลือกฟังก์ชัน authorizeDrive → Run → อนุญาตสิทธิ์ (Drive + Docs)
 *   4. Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy
 *   ทุกใบสมัครจากหน้า MANPOWER จะได้ PDF ในโฟลเดอร์ "Winner - ใบสมัคร PDF" และลิงก์ในคอลัมน์ "ใบสมัคร PDF"
 *   ใบสมัครเก่า: เลือกแถวในแท็บ Manpower → เมนู Winner → สร้าง PDF ใบสมัคร (แถวที่เลือก)
 *
 * (ไม่บังคับ) ใส่อีเมลใน NOTIFY_EMAIL เพื่อรับแจ้งเตือนทุกครั้งที่มีคนสมัคร
 */
const NOTIFY_EMAIL = ""; // เช่น "winner96mp@gmail.com"

const SHEET_NAMES = { internship: "Internship", job: "Manpower" };
const LEGACY_SHEET_NAMES = { job: "Job" }; // ชื่อแท็บเดิม — ถ้ายังมีอยู่จะถูกเปลี่ยนชื่อเป็นชื่อใหม่ให้อัตโนมัติ (ข้อมูลเดิมไม่หาย)

/** หาประเภทฟอร์ม: จาก formType ก่อน ถ้าไม่รู้จักให้ดูจากหน้าเว็บที่ส่งมา */
function detectType(rawType, data) {
  const t = String(rawType || "").toLowerCase().trim();
  const ALIASES = { job: "job", manpower: "job", internship: "internship" };
  if (ALIASES[t]) return ALIASES[t];
  const page = String(data["หน้าเว็บ"] || "");
  if (/^job/i.test(page)) return "job";
  if (/^internship/i.test(page)) return "internship";
  return "other";
}

/** เพิ่ม 1 แถวลงแท็บของประเภทนั้น (สร้างแท็บ/คอลัมน์ใหม่ให้อัตโนมัติ) → คืน { sheet, row, headers } */
function appendRecord(ss, type, data) {
  const name = SHEET_NAMES[type] || "Other";
  const legacy = LEGACY_SHEET_NAMES[type] && ss.getSheetByName(LEGACY_SHEET_NAMES[type]);
  if (!ss.getSheetByName(name) && legacy) legacy.setName(name);
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);

  // หัวตาราง: ใช้ของเดิม + เพิ่มคอลัมน์ใหม่ถ้ามีช่องใหม่
  const headers = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String)
    : [];
  if (headers.length === 0 && data["วันที่ส่ง"]) headers.push("วันที่ส่ง");
  Object.keys(data).forEach(function (k) { if (headers.indexOf(k) === -1) headers.push(k); });
  if (type === "job" && headers.indexOf(PDF_COLUMN) === -1) headers.push(PDF_COLUMN);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#0b2f86").setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  // เขียนเป็นข้อความทั้งหมด (กันเบอร์โทรเลข 0 นำหน้าหาย)
  const row = headers.map(function (h) { return data[h] !== undefined ? String(data[h]) : ""; });
  const r = sheet.getLastRow() + 1;
  sheet.getRange(r, 1, 1, row.length).setNumberFormat("@").setValues([row]);
  return { sheet: sheet, row: r, headers: headers };
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = Object.assign({}, e.parameter);
    const rawType = data.formType;
    delete data.formType;
    const type = detectType(rawType, data);
    if (type === "other") data["formType (ไม่รู้จัก)"] = rawType || "(ไม่มี)"; // ไว้ตรวจสอบว่าทำไมไปลงแท็บ Other
    saveUploads(data);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const name = SHEET_NAMES[type] || "Other";
    const saved = appendRecord(ss, type, data);
    const sheet = saved.sheet, r = saved.row, headers = saved.headers;
    SpreadsheetApp.flush();
    lock.releaseLock(); // บันทึกแถวเสร็จแล้ว ปล่อยให้ใบสมัครอื่นเข้าได้ ระหว่างสร้าง PDF

    // MANPOWER: เติมข้อมูลลงแม่แบบใบสมัคร → บันทึก PDF → ใส่ลิงก์ในคอลัมน์ "ใบสมัคร PDF"
    let pdfUrl = "";
    if (type === "job") {
      try {
        pdfUrl = makeJobPdf(data);
      } catch (err) {
        pdfUrl = "สร้าง PDF ไม่สำเร็จ: " + err;
      }
      sheet.getRange(r, headers.indexOf(PDF_COLUMN) + 1).setValue(pdfUrl);
    }

    if (NOTIFY_EMAIL) {
      const body = headers.map(function (h) { return h + ": " + ((h === PDF_COLUMN ? pdfUrl : data[h]) || "-"); }).join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, "[Winner] ใบสมัครใหม่ — " + name, body);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

/* =========================================================
   ใบสมัคร MANPOWER → PDF (เติมข้อมูลลงแม่แบบ Google Docs อัตโนมัติ)
   แม่แบบมีช่อง {{...}} ตามรายการใน jobFillValues() ด้านล่าง
   ช่องที่ไม่มีในเว็บ (เลขบัตร, ชื่อเล่น, สุขภาพ ฯลฯ) จะเว้นว่างไว้ให้เขียนด้วยมือ
   ========================================================= */
const JOB_TEMPLATE_ID = "";                          // ID ของ Google Docs แม่แบบ (ถ้าว่าง จะค้นหาจากชื่อด้านล่าง)
const JOB_TEMPLATE_NAME = "แม่แบบใบสมัคร Manpower";  // ชื่อไฟล์แม่แบบใน Google Drive
const PDF_FOLDER = "Winner - ใบสมัคร PDF";
const PDF_COLUMN = "ใบสมัคร PDF";
const THAI_MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

/** แปลงข้อมูลจากฟอร์ม → ค่าที่จะเติมแทน {{key}} ในแม่แบบ */
function jobFillValues(data) {
  const g = function (k) { return data[k] === undefined || data[k] === null ? "" : String(data[k]).trim(); };

  // วันเกิดจากเว็บมาเป็น "25 ธันวาคม 2543" (พ.ศ.)
  const dob = g("วันเกิด").split(/\s+/);
  const mi = THAI_MONTHS.indexOf(dob[1] || "");
  // วันที่ส่ง: "11/11/2569 13:48:55" → "11/11/2569"
  const sent = g("วันที่ส่ง").split(/\s+/)[0] ||
    Utilities.formatDate(new Date(), "Asia/Bangkok", "d/M/") + (Number(Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyy")) + 543);
  const addr = g("ที่อยู่ที่ติดต่อได้");
  const zip = (addr.match(/\d{5}(?!.*\d{5})/) || [""])[0];
  const abroad = g("ประสบการณ์ต่างประเทศ") === "มี";
  const ex = function (kind, n, f) { return g("ประสบการณ์" + kind + " " + n + " - " + f); };

  return {
    date: sent,
    country: g("ประเทศ"),
    position: g("ตำแหน่ง"),
    name_th: g("ชื่อ-นามสกุล"),
    name_en: g("ชื่อ-นามสกุล (อังกฤษ)"),
    d: dob[0] || "",
    m: mi >= 0 ? String(mi + 1) : "",
    month: mi >= 0 ? THAI_MONTHS[mi] : "",
    y: dob[2] || "",
    age: g("อายุ"),
    cm: g("ส่วนสูง (ซม.)"),
    addr_id: g("ที่อยู่ตามบัตรประชาชน"),
    addr: addr,
    postcode: zip,
    tel: g("เบอร์โทร"),
    edu: g("ระดับการศึกษาสูงสุด"),
    school: g("สถานศึกษา"),
    l1_co: ex("ในประเทศ", 1, "บริษัท"), l1_pos: ex("ในประเทศ", 1, "ตำแหน่ง"), l1_dur: ex("ในประเทศ", 1, "ระยะเวลา"),
    l2_co: ex("ในประเทศ", 2, "บริษัท"), l2_pos: ex("ในประเทศ", 2, "ตำแหน่ง"), l2_dur: ex("ในประเทศ", 2, "ระยะเวลา"),
    a1_country: ex("ต่างประเทศ", 1, "ประเทศ"), a1_co: ex("ต่างประเทศ", 1, "บริษัท"), a1_pos: ex("ต่างประเทศ", 1, "ตำแหน่ง"), a1_dur: ex("ต่างประเทศ", 1, "ระยะเวลา"),
    a2_country: ex("ต่างประเทศ", 2, "ประเทศ"), a2_co: ex("ต่างประเทศ", 2, "บริษัท"), a2_pos: ex("ต่างประเทศ", 2, "ตำแหน่ง"), a2_dur: ex("ต่างประเทศ", 2, "ระยะเวลา"),
    abroad_yes: abroad ? "☑" : "☐",
    abroad_no: g("ประสบการณ์ต่างประเทศ") === "ไม่มี" ? "☑" : "☐"
  };
}

/** สร้าง PDF ใบสมัครจากข้อมูล 1 คน แล้วคืนลิงก์ไฟล์ PDF */
function makeJobPdf(data) {
  const template = getJobTemplate();
  const folder = getFolder(PDF_FOLDER);
  const who = (data["ชื่อ-นามสกุล (อังกฤษ)"] || data["ชื่อ-นามสกุล"] || "applicant").toString().trim();
  const stamp = Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyyMMdd-HHmmss");
  const fileName = "ใบสมัคร_" + who + "_" + stamp;

  const copy = template.makeCopy(fileName, folder);
  try {
    const doc = DocumentApp.openById(copy.getId());
    const body = doc.getBody();
    const values = jobFillValues(data);
    Object.keys(values).forEach(function (k) {
      body.replaceText("\\{\\{" + k + "\\}\\}", values[k].replace(/\$/g, "＄"));
    });
    body.replaceText("\\{\\{[A-Za-z0-9_]+\\}\\}", ""); // ช่องที่ไม่มีข้อมูล → เว้นว่าง
    doc.saveAndClose();
    const pdf = folder.createFile(copy.getAs(MimeType.PDF)).setName(fileName + ".pdf");
    return pdf.getUrl();
  } finally {
    copy.setTrashed(true); // ลบสำเนา Google Docs ชั่วคราว เก็บไว้แค่ PDF
  }
}

function getJobTemplate() {
  if (JOB_TEMPLATE_ID) return DriveApp.getFileById(JOB_TEMPLATE_ID);
  const it = DriveApp.getFilesByName(JOB_TEMPLATE_NAME);
  while (it.hasNext()) {
    const f = it.next();
    if (f.getMimeType() === MimeType.GOOGLE_DOCS && !f.isTrashed()) return f;
  }
  throw new Error('ไม่พบแม่แบบ Google Docs ชื่อ "' + JOB_TEMPLATE_NAME + '" (ถ้าอัปโหลดเป็น .docx ต้องเปิดแล้วเลือก File → Save as Google Docs)');
}

function getFolder(name) {
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

/** เมนู "Winner" ใน Google Sheet: สร้าง PDF ใหม่ให้แถวที่เลือก (ใช้กับใบสมัครเก่า หรือเมื่อแก้แม่แบบ) */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Winner")
    .addItem("สร้าง PDF ใบสมัคร (แถวที่เลือก)", "makePdfForSelectedRows")
    .addItem("ย้ายใบสมัครจากแท็บ Other ไปแท็บที่ถูกต้อง", "moveOtherRows")
    .addToUi();
}

/** ย้ายแถวในแท็บ "Other" ไป Manpower / Internship ตามหน้าเว็บที่ส่งมา (ใบ Manpower จะสร้าง PDF ให้ด้วย) */
function moveOtherRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const other = ss.getSheetByName("Other");
  if (!other || other.getLastRow() < 2) { ss.toast("ไม่มีแถวในแท็บ Other", "Winner"); return; }
  const values = other.getDataRange().getDisplayValues();
  const headers = values[0];
  const moved = [];
  for (let i = 1; i < values.length; i++) {
    const data = {};
    headers.forEach(function (h, c) { if (h && h !== "formType (ไม่รู้จัก)" && h !== PDF_COLUMN && values[i][c] !== "") data[h] = values[i][c]; });
    const type = detectType("", data);
    if (type === "other") continue;
    const saved = appendRecord(ss, type, data);
    if (type === "job") {
      let url;
      try { url = makeJobPdf(data); } catch (err) { url = "สร้าง PDF ไม่สำเร็จ: " + err; }
      saved.sheet.getRange(saved.row, saved.headers.indexOf(PDF_COLUMN) + 1).setValue(url);
    }
    moved.push(i + 1);
  }
  for (let k = moved.length - 1; k >= 0; k--) other.deleteRow(moved[k]); // ลบจากล่างขึ้นบน
  ss.toast("ย้ายแล้ว " + moved.length + " แถว" + (other.getLastRow() < 2 ? " (แท็บ Other ว่างแล้ว ลบทิ้งได้)" : ""), "Winner");
}

function makePdfForSelectedRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  if (sheet.getName() !== SHEET_NAMES.job) { ui.alert('กรุณาเลือกแถวในแท็บ "' + SHEET_NAMES.job + '"'); return; }

  let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let col = headers.indexOf(PDF_COLUMN) + 1;
  if (!col) { col = headers.length + 1; sheet.getRange(1, col).setValue(PDF_COLUMN).setFontWeight("bold").setBackground("#0b2f86").setFontColor("#ffffff"); }

  const range = sheet.getActiveRange();
  let done = 0;
  for (let r = Math.max(2, range.getRow()); r <= range.getLastRow(); r++) {
    const vals = sheet.getRange(r, 1, 1, headers.length).getDisplayValues()[0];
    const data = {};
    headers.forEach(function (h, i) { if (h) data[h] = vals[i]; });
    if (!data["ชื่อ-นามสกุล"]) continue;
    try { sheet.getRange(r, col).setValue(makeJobPdf(data)); done++; }
    catch (err) { sheet.getRange(r, col).setValue("สร้าง PDF ไม่สำเร็จ: " + err); }
  }
  ss.toast("สร้าง PDF แล้ว " + done + " ใบ", "Winner");
}

/**
 * ไฟล์แนบจากเว็บ (เช่น ไฟล์ผลสอบภาษา) มาในช่อง "_file:<ชื่อช่อง>" เป็น JSON {name, type, data(base64)}
 * บันทึกลงโฟลเดอร์ UPLOAD_FOLDER ใน Google Drive ของเจ้าของสคริปต์ แล้วแทนค่าช่องนั้นด้วยลิงก์ไฟล์
 * ไฟล์เป็นแบบส่วนตัว (เปิดได้เฉพาะเจ้าของ Drive / คนที่แชร์โฟลเดอร์ให้)
 */
const UPLOAD_FOLDER = "Winner - ไฟล์แนบผู้สมัคร";
const MAX_UPLOAD_MB = 5;

function saveUploads(data) {
  Object.keys(data).forEach(function (key) {
    if (key.indexOf("_file:") !== 0) return;
    const field = key.slice(6);
    try {
      const f = JSON.parse(data[key]);
      const bytes = Utilities.base64Decode(f.data);
      if (bytes.length > MAX_UPLOAD_MB * 1024 * 1024) throw new Error("ไฟล์ใหญ่เกิน " + MAX_UPLOAD_MB + " MB");
      const who = data["ชื่อ-นามสกุล (อังกฤษ)"] || data["ชื่อ-นามสกุล (ไทย)"] || data["ชื่อ-นามสกุล"] || "applicant";
      const stamp = Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyyMMdd-HHmmss");
      const blob = Utilities.newBlob(bytes, f.type, stamp + "_" + who + "_" + f.name);
      data[field] = getUploadFolder().createFile(blob).getUrl();
    } catch (err) {
      data[field] = "อัปโหลดไม่สำเร็จ: " + err;
    }
    delete data[key];
  });
}

function getUploadFolder() {
  const it = DriveApp.getFoldersByName(UPLOAD_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(UPLOAD_FOLDER);
}

/** เปิด URL /exec ในเบราว์เซอร์เพื่อตรวจว่าโค้ดเวอร์ชันไหน deploy อยู่ (ไม่บันทึกอะไรลงชีต)
 *  เติม ?formType=job ท้าย URL เพื่อดูว่าใบสมัครประเภทนั้นจะไปลงแท็บไหน */
const CODE_VERSION = "2026-11-11 manpower-v3";

function doGet(e) {
  const p = (e && e.parameter) || {};
  const out = { ok: true, message: "Winner form endpoint is running.", version: CODE_VERSION, sheets: SHEET_NAMES };
  if (p.formType !== undefined || p["หน้าเว็บ"] !== undefined) {
    const type = detectType(p.formType, p);
    out.test = { formType: p.formType, type: type, sheet: SHEET_NAMES[type] || "Other" };
  }
  try { out.template = getJobTemplate().getName(); } catch (err) { out.template = "⚠ " + err.message; }
  return ContentService.createTextOutput(JSON.stringify(out, null, 2)).setMimeType(ContentService.MimeType.JSON);
}

/** รันฟังก์ชันนี้ 1 ครั้งในหน้า Apps Script (เลือก authorizeDrive → Run) เพื่ออนุญาตสิทธิ์ Google Drive */
function authorizeDrive() {
  Logger.log("Upload folder: " + getUploadFolder().getUrl());
  Logger.log("PDF folder: " + getFolder(PDF_FOLDER).getUrl());
  try { Logger.log("Template: " + DocumentApp.openById(getJobTemplate().getId()).getName()); }
  catch (err) { Logger.log("⚠ " + err); }
}
