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
 * ข้อมูลจะแยกเป็น 2 แท็บอัตโนมัติ: "Internship" และ "Job"
 * หัวคอลัมน์จะสร้างเองตามชื่อช่องในฟอร์ม (เพิ่มช่องใหม่ในฟอร์มได้เลย ไม่ต้องแก้สคริปต์)
 *
 * ไฟล์แนบ (เช่น ผลสอบภาษา) จะถูกเก็บในโฟลเดอร์ "Winner - ไฟล์แนบผู้สมัคร" ใน Google Drive
 * และในชีตจะเป็นลิงก์ไปยังไฟล์
 *
 * ⚠ เมื่อแก้โค้ดนี้แล้ว ต้อง Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy
 *   (URL เดิมยังใช้ได้) — ก่อน deploy ให้เลือกฟังก์ชัน authorizeDrive แล้วกด Run 1 ครั้งเพื่ออนุญาตสิทธิ์ Google Drive
 *
 * (ไม่บังคับ) ใส่อีเมลใน NOTIFY_EMAIL เพื่อรับแจ้งเตือนทุกครั้งที่มีคนสมัคร
 */
const NOTIFY_EMAIL = ""; // เช่น "winner96mp@gmail.com"

const SHEET_NAMES = { internship: "Internship", job: "Job" };

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = Object.assign({}, e.parameter);
    const type = data.formType || "other";
    delete data.formType;
    saveUploads(data);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const name = SHEET_NAMES[type] || "Other";
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);

    // หัวตาราง: ใช้ของเดิม + เพิ่มคอลัมน์ใหม่ถ้ามีช่องใหม่
    let headers = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String)
      : [];
    if (headers.length === 0 && data["วันที่ส่ง"]) headers.push("วันที่ส่ง");
    Object.keys(data).forEach(function (k) { if (headers.indexOf(k) === -1) headers.push(k); });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#0b2f86").setFontColor("#ffffff");
    sheet.setFrozenRows(1);

    // เขียนเป็นข้อความทั้งหมด (กันเบอร์โทรเลข 0 นำหน้าหาย)
    const row = headers.map(function (h) { return data[h] !== undefined ? String(data[h]) : ""; });
    const r = sheet.getLastRow() + 1;
    sheet.getRange(r, 1, 1, row.length).setNumberFormat("@").setValues([row]);

    if (NOTIFY_EMAIL) {
      const body = headers.map(function (h) { return h + ": " + (data[h] || "-"); }).join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, "[Winner] ใบสมัครใหม่ — " + name, body);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
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

function doGet() {
  return ContentService.createTextOutput("Winner form endpoint is running.");
}

/** รันฟังก์ชันนี้ 1 ครั้งในหน้า Apps Script (เลือก authorizeDrive → Run) เพื่ออนุญาตสิทธิ์ Google Drive */
function authorizeDrive() {
  Logger.log("Upload folder: " + getUploadFolder().getUrl());
}
