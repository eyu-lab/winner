/* =========================================================
   WINNER — site configuration
   ========================================================= */
window.WINNER_CONFIG = {
  /* URL ของ Google Apps Script (Web App) สำหรับบันทึกข้อมูลฟอร์มลง Google Sheets
     ดูวิธีตั้งค่าใน README.md → "ตั้งค่าเก็บข้อมูลฟอร์ม"
     ถ้าเว้นว่างไว้ ฟอร์มจะทำงานแบบ demo (บันทึกไว้ใน browser เท่านั้น) */
  formEndpoint: "https://script.google.com/macros/s/AKfycbzGaGSW4jC6zJav6lOXSyYYldEizdmboirA_zsEAgvC_zeOPAm16sLBc-XWI8Oz0kaBww/exec",

  /* แสดงชื่อไฟล์รูปที่ยังไม่ได้ใส่ (มุมขวาล่างของกรอบรูป) — ปิดเป็น false ก่อนขึ้นเว็บจริง */
  showImageHints: false,

  contact: {
    /* เบอร์โทรติดต่อ (แสดงทุกเบอร์ในรายการนี้: ท้ายเว็บ, หน้า About, กล่องติดต่อหน้า Internship) */
    phones: [
      { name: "อารีน่า (ALINA)", tel: "0649607917", display: "064-9607917" },
      { name: "อัลเฟรด (ALFRED)", tel: "0649607827", display: "064-9607827" }
    ],
    line: "@winnerhr",
    lineUrl: "https://line.me/R/ti/p/@winnerhr",
    email: "winner96mp@gmail.com",
    address: "80 K.A.N. Place, Room 104, 1st Floor,<br>Soi Narathiwarajanakarin 8,<br>Thungwatdon, Sathorn, BKK 10120",
    /* Facebook แยก 2 เพจ (แสดงในส่วน Follow Us ท้ายเว็บ) */
    facebookHr: "https://www.facebook.com/profile.php?id=61584116334081&sk=photos",
    facebookManpower: "https://www.facebook.com/profile.php?id=61580811710779"
  }
};
