/* =========================================================
   ข้อมูลประเทศสำหรับหน้า JOB (Winner 96)
   เพิ่มประเทศใหม่ = คัดลอก object ของ albania แล้วแก้ข้อมูล
   - slug     : ใช้ใน URL → job-country.html?c=<slug>
   - flag     : รหัสประเทศ 2 ตัว (ISO) ใช้ดึงธงจาก flagcdn.com
   - active   : false = แสดงเป็น "เร็วๆ นี้" ใน dropdown
   ========================================================= */
window.JOB_COUNTRIES = [
  {
    slug: "albania",
    active: true,
    nameTh: "แอลเบเนีย",
    nameEn: "Albania",
    flag: "al",
    region: "ยุโรป",
    heroImage: "assets/images/job-albania-hero.jpg",
    lead: "โอกาสสร้างรายได้สูงและใช้ชีวิตในยุโรปอย่างมั่นคง กับเครือข่ายพาร์ทเนอร์นายจ้างที่ได้มาตรฐาน สัญญาจ้างถูกต้องตามกฎหมายแรงงาน",
    phone: "064-960-7187",
    email: "winner96group@gmail.com",
    positions: [
      { th: "เชฟ อาหารเมดิเตอร์เรเนียน", en: "Chef", gender: "ชาย", age: "30–45 ปี", salary: "76,000 - 114,000", hot: true },
      { th: "กุ๊ก / ผู้ช่วยครัว", en: "Cook", gender: "หญิง", age: "25–40 ปี", salary: "26,800 - 30,650" },
      { th: "ผู้ช่วยครัวฟาสต์ฟู้ด", en: "Fast Food Helper", gender: "หญิง", age: "25–35 ปี", salary: "22,990 - 24,900" },
      { th: "พนักงานทำความสะอาด", en: "Cleaner", gender: "หญิง", age: "23–50 ปี", salary: "34,400 - 38,300" },
      { th: "ช่างทำผม", en: "Hairdresser", gender: "หญิง", age: "30–40 ปี", salary: "30,400 - 38,000", hot: true },
      { th: "ช่างทำเล็บ", en: "Nail Tech", gender: "หญิง", age: "25–35 ปี", salary: "24,900 - 26,800" },
      { th: "ช่างซ่อมกระเป๋าแบรนด์เนม", en: "Bag Repair", gender: "ชาย-หญิง", age: "ไม่เกิน 50 ปี", salary: "26,600" },
      { th: "บาริสต้า", en: "Barista", gender: "หญิง", age: "25–38 ปี", salary: "24,700" },
      { th: "พี่เลี้ยงเด็ก", en: "Nanny", gender: "หญิง", age: "25–45 ปี", salary: "22,800" },
      { th: "พนักงานนวด", en: "Massage Therapist", gender: "หญิง", age: "25–40 ปี", salary: "30,600 - 34,400", hot: true },
      { th: "ช่างติดตั้งเสาสัญญาณ", en: "Signal Installer", gender: "ชาย", age: "23–35 ปี", salary: "45,980 - 57,470", hot: true },
      { th: "ช่างติดตั้งผนังยิปซั่ม", en: "Drywall Installer", gender: "ชาย", age: "23–40 ปี", salary: "34,480 - 45,980" },
      { th: "ช่างสีและปูนพลาสเตอร์", en: "Painter", gender: "ชาย", age: "23–40 ปี", salary: "34,000 - 49,000" },
      { th: "ช่างปูกระเบื้อง", en: "Tiler", gender: "ชาย", age: "23–40 ปี", salary: "34,000 - 49,000" },
      { th: "ช่างไฟฟ้า", en: "Electrician", gender: "ชาย", age: "23–40 ปี", salary: "32,000 - 36,000" }
    ],
    benefits: [
      { icon: "home", title: "ฟรี! ที่พักมาตรฐานพนักงาน", desc: "ที่พักสะอาด ปลอดภัย มีระบบสาธารณูปโภคครบครัน ดูแลโดยนายจ้างตลอดอายุสัญญา" },
      { icon: "utensils", title: "ฟรี! อาหารและมื้อหลักฟรีทุกวัน", desc: "สวัสดิการอาหารฟรีในวันทำงาน ช่วยประหยัดค่าครองชีพและอาหารในชีวิตประจำวัน" },
      { icon: "shield", title: "สิทธิ์การรักษาพยาบาลฟรี", desc: "เข้าถึงระบบสาธารณสุขของรัฐบาลแอลเบเนียอย่างเป็นทางการและปลอดภัยสูงสุด" },
      { icon: "shieldCheck", title: "ประกันภัยอุบัติเหตุครอบคลุม 1 ปี", desc: "ดูแลครอบคลุมตลอดระยะเวลาทำสัญญา รองรับให้คุณมั่นใจในทุกนาทีที่ใช้ชีวิต" }
    ]
  }

  /* ตัวอย่างประเทศถัดไป (ยังไม่เปิด) — เอา comment ออกเมื่อพร้อม
  ,{
    slug: "poland", active: false, nameTh: "โปแลนด์", nameEn: "Poland", flag: "pl", region: "ยุโรป",
    heroImage: "assets/images/job-poland-hero.jpg", lead: "", phone: "064-960-7187", email: "winner96group@gmail.com",
    positions: [], benefits: []
  }
  */
];
