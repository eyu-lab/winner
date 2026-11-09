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

function doGet() {
  return ContentService.createTextOutput("Winner form endpoint is running.");
}
