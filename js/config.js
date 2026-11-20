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
    email: "winner96mp@gmail.com",
    /* ที่อยู่แยก 2 บริษัท (th = แสดงตอนเลือกภาษาไทย, en = ตอนเลือก EN)
       ท้ายเว็บ: หน้า Internship → Winner HR, หน้า Manpower → Winner 96, หน้าอื่นแสดงทั้งสอง · หน้า About แสดงทั้งสอง */
    addresses: {
      hr: {
        company: "Winner HR International Co.,Ltd",
        th: "เลขที่ 317 อาคารกมลสุโกศล ห้องเลขที่ 8 ดี ชั้นที่ 8 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
        en: "317 Kamolsukosol Building, Room 8D, 8th Floor, Silom Road, Silom Subdistrict, Bang Rak District, Bangkok 10500"
      },
      w96: {
        company: "Winner 96 Management Manpower Co.,Ltd",
        th: "เลขที่ 170/124 หมู่ที่ 3 ตำบลเสม็ด อำเภอเมืองชลบุรี จังหวัดชลบุรี 20000",
        en: "170/124, Moo 3, Samet Subdistrict, Mueang Chon Buri District, Chon Buri Province 20000"
      }
    },
    /* Facebook แยก 2 เพจ (แสดงในส่วน Follow Us ท้ายเว็บ) */
    facebookHr: "https://www.facebook.com/profile.php?id=61584116334081&sk=photos",
    facebookManpower: "https://www.facebook.com/profile.php?id=61580811710779"
  }
};
