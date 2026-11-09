# Winner — เว็บไซต์ฝึกงาน & จัดหางานต่างประเทศ

เว็บ static (HTML / CSS / JavaScript ล้วน) ไม่ต้อง build — เปิด `index.html` ได้เลย หรืออัปโหลดทั้งโฟลเดอร์ขึ้น hosting ใดก็ได้ (Netlify, Vercel, GitHub Pages, cPanel ฯลฯ)

## โครงสร้างหน้า

| หน้า | ไฟล์ | โลโก้ |
|---|---|---|
| Home | `index.html` | ไม่มีโลโก้ (เว็บรวม) |
| Internship (ไต้หวัน) + ฟอร์มลงทะเบียน | `internship.html` | Winner HR |
| Job — เลือกประเทศ | `job.html` | Winner 96 |
| Job — รายละเอียดประเทศ + ฟอร์มสมัคร | `job-country.html?c=albania` | Winner 96 |
| About Us | `about.html` | ไม่มีโลโก้ (แสดงทั้ง 2 บริษัทในเนื้อหา) |

เมนู **JOB** มี dropdown รายชื่อประเทศ (ดึงจาก `js/jobs-data.js`)

## สิ่งที่ต้องทำก่อนขึ้นเว็บจริง

### 1. ใส่โลโก้จริง
แทนที่ไฟล์ placeholder:
- `assets/logo-winner-hr.svg` → โลโก้ Winner HR (ใช้ .png ได้ แต่ต้องแก้ path ใน `js/layout.js` → `LOGOS`)
- `assets/logo-winner96.svg` → โลโก้ Winner 96

### 2. ใส่รูปภาพ
วางรูปในโฟลเดอร์ `assets/images/` ตามชื่อด้านล่าง — ถ้ายังไม่มีรูป เว็บจะแสดงกราฟิกสำรองแทน (และมีป้ายชื่อไฟล์เล็กๆ มุมขวาล่าง)
เมื่อใส่รูปครบแล้ว ให้ตั้ง `showImageHints: false` ใน `js/config.js`

| ไฟล์ | ใช้ที่ | ขนาดแนะนำ |
|---|---|---|
| `banner-home-1.jpg`, `banner-home-2.jpg`, `banner-home-3.jpg` | สไลด์หน้า Home (เช่น banner วันปิยมหาราช, ฝึกงานต่างประเทศ) | 1440×560 |
| `banner-job.jpg` | แบนเนอร์ Winner 96 หน้า Job | 1440×560 |
| `card-job.jpg`, `card-internship.jpg`, `card-exchange.jpg` | การ์ด 3 หมวด (มีสีทับอัตโนมัติ) | 800×860 |
| `taiwan-fnb-poster.jpg` | โปสเตอร์ Intern F&B & Kitchen | 1000×800 |
| `taiwan-hours.jpg` | การ์ดเล็ก "ชั่วโมงการฝึกงาน" | 600×400 |
| `why-1.jpg`, `why-2.jpg` | รูปประกอบ Why Choose | 600×600 |
| `taiwan-main.jpg` | รูปใหญ่ขวา hero หน้า Internship ("Let's Study & Travel in Taiwan") | 900×1000 |
| `taiwan-1.jpg` … `taiwan-5.jpg` | รูปคอลลาจซ้าย hero หน้า Internship | 900×500 / 450×300 |
| `job-albania-hero.jpg` | พื้นหลัง hero หน้าแอลเบเนีย | 1600×700 |

> สไลด์ / รูปที่ใส่แล้ว ข้อความสำรองที่เขียนทับจะถูกซ่อนอัตโนมัติ — ดังนั้นรูป banner ที่มีข้อความในตัวอยู่แล้วใช้ได้เลย

### 3. ตั้งค่าเก็บข้อมูลฟอร์ม (Google Sheets)
ฟอร์มในหน้า Internship และหน้า Job ส่งข้อมูลไปที่ Google Sheets ผ่าน Google Apps Script (ฟรี):

1. สร้าง Google Sheet ใหม่ → **Extensions → Apps Script**
2. วางโค้ดจาก `google-apps-script/Code.gs` → Save
3. **Deploy → New deployment → Web app** · Execute as: *Me* · Who has access: *Anyone* → Deploy
4. คัดลอก Web app URL มาใส่ใน `js/config.js`:
   ```js
   formEndpoint: "https://script.google.com/macros/s/XXXX/exec",
   ```
ข้อมูลจะแยกแท็บ `Internship` / `Job` อัตโนมัติ และหัวคอลัมน์จะสร้างตามชื่อช่องในฟอร์ม
(ใส่อีเมลใน `NOTIFY_EMAIL` ใน Code.gs ถ้าต้องการให้แจ้งเตือนทางอีเมลทุกครั้งที่มีคนสมัคร)

ถ้ายังไม่ได้ตั้งค่า ฟอร์มจะทำงานใน **โหมดทดสอบ** — ข้อมูลเก็บไว้ใน browser (localStorage key `winner_submissions`) และจะมีข้อความแจ้งหลังส่ง

### 4. ข้อมูลติดต่อ
แก้เบอร์โทร / Line / อีเมล / ที่อยู่ / ลิงก์โซเชียล ได้ที่ `js/config.js` → `contact`

## เพิ่มประเทศใหม่ในหน้า JOB
แก้ไฟล์ `js/jobs-data.js` → คัดลอก object ของ `albania` แล้วเปลี่ยน:
- `slug` (ใช้ใน URL), `nameTh`, `nameEn`, `flag` (รหัส ISO 2 ตัว เช่น `pl`, `jp`), `region`
- `positions` (ตำแหน่ง, เพศ, อายุ, เงินเดือน, `hot: true` = ไฮไลต์)
- `benefits` (icon ที่ใช้ได้: home, utensils, shield, shieldCheck, globe, coins, award, users, briefcase, plane)
- `active: false` = แสดงเป็น "เร็วๆ นี้" ใน dropdown

ประเทศใหม่จะขึ้นใน dropdown เมนู, หน้า `job.html` และมีหน้ารายละเอียด + ฟอร์มสมัครให้อัตโนมัติ

## ไฟล์
```
index.html, internship.html, job.html, job-country.html, about.html
css/style.css            — สไตล์ทั้งหมด
js/config.js             — ตั้งค่า (endpoint ฟอร์ม, ข้อมูลติดต่อ)
js/jobs-data.js          — ข้อมูลประเทศ/ตำแหน่งงาน
js/layout.js             — header / footer / dropdown / search ที่ใช้ร่วมกัน
js/forms.js              — ตรวจสอบและส่งฟอร์ม
google-apps-script/Code.gs — สคริปต์รับข้อมูลลง Google Sheets
assets/                  — โลโก้และรูปภาพ
```
"# winner" 
