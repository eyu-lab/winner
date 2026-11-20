/* =========================================================
   WINNER — English translation (ปุ่ม TH / EN บนแถบเมนู)
   วิธีทำงาน: หน้าเว็บเขียนเป็นภาษาไทยตามปกติ เมื่อเลือก EN สคริปต์นี้จะ
   แทนข้อความไทยบนหน้าจอด้วยคำแปลในตาราง EN ด้านล่าง (กด TH → กลับเป็นข้อความเดิม)

   เพิ่ม/แก้คำแปล: ใส่ "ข้อความไทยตามที่เห็นบนหน้าเว็บ": "English",
   - ข้อความที่ถูกตัดด้วยตัวหนา/ลิงก์ จะแปลทีละท่อน (เช่น "ช่องที่มีเครื่องหมาย" กับ "จำเป็นต้องกรอก")
   - ข้อความที่คั่นด้วย " · " แปลแยกทีละส่วนได้ และวันที่ไทย (13 มี.ค. 69) แปลงเป็น 13 Mar 2026 ให้อัตโนมัติ
   - ข้อความที่ไม่มีในตาราง จะแสดงเป็นภาษาไทยเหมือนเดิม
   ค่าที่ส่งเข้า Google Sheet ยังเป็นภาษาไทยเหมือนเดิม (แปลเฉพาะสิ่งที่แสดงบนจอ)
   ========================================================= */
(function () {
  "use strict";

  const EN = {
    /* ---------- Header / footer / ทั่วไป ---------- */
    "เลือกประเทศ": "Choose a country",
    "ไต้หวัน": "Taiwan",
    "สิงคโปร์": "Singapore",
    "แอลเบเนีย": "Albania",
    "โปแลนด์": "Poland",
    "ดูทุกประเทศ": "All countries",
    "เมนูหลัก": "Main menu",
    "ค้นหา": "Search",
    "เลือกภาษา / Language": "Language",
    "เปิดเมนู": "Open menu",
    "ปิดเมนู": "Close menu",
    "ติดตามข่าวสาร": "Follow Us",
    "อารีน่า (ALINA)": "ALINA",
    "อัลเฟรด (ALFRED)": "ALFRED",
    "อารีน่า (ALINA):": "ALINA:",
    "อัลเฟรด (ALFRED):": "ALFRED:",
    "พันธมิตรที่เชื่อมโยงคน ศักยภาพ และโอกาส สู่ความสำเร็จที่เติบโตไปด้วยกัน": "A partner connecting people, potential and opportunity — for success we grow together",
    "บริษัทจัดหางานที่ได้รับอนุญาตถูกต้องตามกฎหมาย": "Legally licensed recruitment agency",
    "Winner 96 Management Manpower Co.,Ltd ได้รับใบอนุญาตจัดหางานเพื่อไปทำงานต่างประเทศ ตรวจสอบข้อมูลบริษัทได้ก่อนตัดสินใจสมัครงาน": "Winner 96 Management Manpower Co., Ltd. holds a license for the recruitment of personnel for overseas employment. You may verify the company's details before deciding to apply for a job.",
    "สอบถาม / สมัครงานกับเรา →": "Ask us / apply with us →",
    "ต.1299/2568": "Tor 1299/2568",
    "ใบอนุญาตจัดหางานให้คนหางานเพื่อไปทำงานต่างประเทศ": "License holder for overseas employment service",
    "Organization · วันที่ 20260604": "Organization · Date 20260604",
    "เร็วๆ นี้": "Coming soon",
    "ปิด": "Close",
    "ลบ": "Remove",
    "ใช่": "Yes",
    "มี": "Yes",
    "ไม่มี": "No",
    "มีแล้ว": "Yes, I have one",
    "ยังไม่มี": "Not yet",
    "อื่นๆ": "Other",
    "โปรดระบุ": "Please specify",
    "— เลือก —": "— Select —",
    "— ไม่เลือก —": "— None —",
    "โทร": "Tel.",

    /* ---------- Home ---------- */
    "Winner | ฝึกงานและทำงานต่างประเทศอย่างถูกกฎหมาย": "Winner | Legal Internships and Jobs Abroad",
    "แบนเนอร์": "Banners",
    "สไลด์ก่อนหน้า": "Previous slide",
    "สไลด์ถัดไป": "Next slide",
    "ใบอนุญาตเลขที่ ต.1299/2568": "License No. Tor 1299/2568",
    "อยากทำงานต่างประเทศ": "Want to work abroad?",
    "เริ่มต้นอย่างถูกต้องกับ": "Start the right way with",
    "เชื่อมต่อคนไทย สู่โอกาสการทำงานในต่างประเทศ · เดินทางปลอดภัย มั่นใจ ถูกกฎหมาย": "Connecting Thai workers with jobs abroad · Safe, reliable and fully legal",
    "Winner International Co.,Ltd มุ่งมั่นดำเนินงานอย่างมีประสิทธิภาพและการบริการที่มีคุณภาพ": "Winner International Co.,Ltd is committed to efficient work and quality service",
    "จัดหางานต่างประเทศ · Winner 96 →": "Overseas jobs · Winner 96 →",
    "จัดหางานต่างประเทศ": "Overseas Jobs",
    "งานต่างประเทศถูกกฎหมาย สัญญาจ้างชัดเจน ดูแลครบทุกขั้นตอนตั้งแต่สมัครจนถึงวันเดินทาง": "Legal jobs abroad with clear contracts. We support you at every step, from applying to departure day.",
    "ดูประกาศรับสมัคร": "View job openings",
    "ฝึกงานโรงแรมไต้หวัน · Winner HR →": "Hotel internships in Taiwan · Winner HR →",
    "ฝึกงานต่างประเทศ": "Overseas Internships",
    "ฝึกงานกับเครือข่ายโรงแรมระดับ 4–5 ดาวในไต้หวัน อย่างถูกต้องตามกฎหมาย เพื่อประสบการณ์ระดับสากล": "Intern legally with our network of 4–5 star hotels in Taiwan and gain international experience.",
    "โรงแรม 4–5 ดาว": "4–5 star hotels",
    "ดูรายละเอียดโครงการ": "View program details",
    "โครงการแลกเปลี่ยน": "Exchange Programs",
    "โครงการแลกเปลี่ยนและโอกาสใหม่ๆ ในต่างประเทศ กำลังจะเปิดให้สมัครเร็วๆ นี้": "Exchange programs and new opportunities abroad — opening for applications soon.",

    /* ---------- Internship ---------- */
    "Internship Taiwan | Winner HR International": "Internship Taiwan | Winner HR International",
    "โครงการฝึกงานโรงแรม ประเทศไต้หวัน": "Hotel Internship Program in Taiwan",
    "เราไม่ได้เพียงสร้างโอกาสในการฝึกงาน แต่กำลังสร้างสะพานเชื่อมโยงการศึกษา ประสบการณ์จากภาคอุตสาหกรรมบริการ และโอกาสในการทำงานอนาคต": "We don't just create internship opportunities. We build a bridge between education, hospitality industry experience and future employment.",
    "และ": "&",
    "กับภัตตาคารประเทศไต้หวัน": "with restaurants in Taiwan",
    "ระยะเวลา": "Duration",
    "เดือน": "months",
    "พร้อมเบี้ยเลี้ยง": "Allowance",
    "TWD/เดือน": "TWD/month",
    "เบี้ยเลี้ยง / เดือน": "Allowance / month",
    "6–12 เดือน": "6–12 months",
    "ระยะเวลาฝึกงาน": "Internship length",
    "5 ตำแหน่ง": "5 positions",
    "ให้เลือกสมัคร": "to choose from",
    "ฝึกงานโรงแรมระดับ 4–5 ดาว": "Intern at 4–5 star hotels",
    "รายละเอียดโปรแกรม": "Program details",
    "ทำงาน 5 วัน / สัปดาห์": "5 working days / week",
    "วันละ 8 ชม. (40 ชม. / สัปดาห์)": "8 hours a day (40 hours / week)",
    "ไม่มีกะดึก (22.00 – 06.00 น.)": "No night shifts (22:00 – 06:00)",
    "มีที่พักและอาหารให้": "Accommodation and meals provided",
    "มีประกันตลอดการฝึกงาน": "Insurance for the whole internship",
    "ถูกต้องตามกฎหมายแรงงานไต้หวัน": "Compliant with Taiwan labour law",
    "สมัครเลย": "Apply now",
    "ดูตำแหน่งที่เปิดรับ": "View open positions",
    "ตำแหน่งที่เปิดรับสมัคร": "Open positions",
    "พนักงานต้อนรับส่วนหน้า": "Front Office",
    "ต้อนรับแขก เช็คอิน–เช็คเอาท์ ให้ข้อมูลและประสานงานบริการภายในโรงแรม": "Welcome guests, handle check-in and check-out, give information and coordinate hotel services.",
    "สมัครตำแหน่งนี้ →": "Apply for this position →",
    "แผนกอาหารและเครื่องดื่ม": "Food & Beverage",
    "ดูแลงานบริการห้องอาหาร บาร์ และจัดเลี้ยง เรียนรู้มาตรฐานการบริการระดับสากล": "Serve in restaurants, bars and banquets, and learn international service standards.",
    "แผนกแม่บ้าน": "Housekeeping",
    "ดูแลความสะอาดและความเรียบร้อยของห้องพักและพื้นที่ส่วนกลางตามมาตรฐานโรงแรม": "Keep guest rooms and public areas clean and tidy to hotel standards.",
    "แผนกครัว": "Kitchen",
    "ช่วยเตรียมวัตถุดิบและประกอบอาหาร เรียนรู้ระบบครัวโรงแรมจากเชฟมืออาชีพ": "Help prepare ingredients and cook, and learn hotel kitchen systems from professional chefs.",
    "พนักงานเสิร์ฟ": "Waiter / Waitress",
    "ให้บริการอาหารและเครื่องดื่มแก่แขก รับออร์เดอร์ และดูแลความพึงพอใจของลูกค้า": "Serve food and drinks, take orders and look after guest satisfaction.",
    "สิ่งที่คุณจะได้รับจากโครงการ": "What you get from the program",
    "ประสบการณ์ทำงานจริง": "Real work experience",
    "สัมผัสระบบการทำงานโรงแรมระดับสากลในไต้หวัน เสริมทักษะและฝึกหน้างานจริง": "Work inside international hotel operations in Taiwan and build skills on the job.",
    "อัปสกิลภาษา": "Language skills",
    "ใช้ภาษาจีนกลางและภาษาอังกฤษในชีวิตจริงทุกวันอย่างมั่นใจ": "Use Mandarin and English with confidence every day.",
    "สวัสดิการและรายได้": "Benefits and income",
    "เบี้ยเลี้ยง 29,500 TWD/เดือน พร้อมที่พัก อาหาร และประกันตลอดระยะเวลาฝึกงาน": "Allowance of 29,500 TWD/month, plus accommodation, meals and insurance for the whole internship.",
    "คอนเนคชั่นนานาชาติ": "International network",
    "สร้างเครือข่ายเพื่อนร่วมงานและเพื่อนสนิทจากหลากหลายสัญชาติทั่วโลก": "Build a network of colleagues and friends from many countries.",
    "ใบรับรองการผ่านงาน": "Work certificate",
    "การันตีประสบการณ์จากแบรนด์โรงแรมชั้นนำ เพื่อต่อยอดอาชีพอย่างไร้ขีดจำกัด": "Proof of experience from leading hotel brands to grow your career.",
    "สนใจเข้าร่วมโครงการ? ลงทะเบียนเลย": "Interested? Register now",
    "กรอกข้อมูลเบื้องต้น ทีมงาน Winner HR จะติดต่อกลับเพื่อให้คำปรึกษาภายใน 1-2 วันทำการ": "Fill in your basic details and the Winner HR team will contact you within 1–2 working days.",
    "ขั้นตอนการสมัคร": "How to apply",
    "ง่ายๆ เพียง 4 ขั้นตอน ดูแลครบตั้งแต่สมัครจนถึงวันเดินทาง": "Just 4 simple steps — we support you from applying to departure.",
    "ลงทะเบียนออนไลน์": "Register online",
    "กรอกฟอร์มนี้เพื่อแสดงความสนใจ": "Fill in this form to show your interest",
    "ปรึกษา & คัดเลือกโปรแกรม": "Consultation & program matching",
    "เจ้าหน้าที่ติดต่อกลับ แนะนำตำแหน่งที่เหมาะสม": "Our staff call you back and suggest suitable positions",
    "สัมภาษณ์กับโรงแรม": "Hotel interview",
    "เตรียมเอกสารและฝึกสัมภาษณ์กับทีมงาน": "Prepare documents and practise interviews with our team",
    "ยื่นวีซ่า & เดินทาง": "Visa & departure",
    "ดูแลเอกสารถูกต้องตามกฎหมาย 100%": "100% legal documentation",
    "แบบฟอร์มลงทะเบียน · Taiwan Internship": "Registration form · Taiwan Internship",
    "ช่องที่มีเครื่องหมาย": "Fields marked",
    "จำเป็นต้องกรอก": "are required",
    "ข้อมูลส่วนตัว": "Personal information",
    "ชื่อ-นามสกุล (ภาษาไทย)": "Full name (Thai)",
    "ชื่อ-นามสกุล (ภาษาอังกฤษ)": "Full name (English)",
    "ชื่อเล่น": "Nickname",
    "เพศ": "Gender",
    "ชาย": "Male",
    "หญิง": "Female",
    "วันเกิด": "Date of birth",
    "อา": "Su", "จ": "Mo", "อ": "Tu", "พ": "We", "พฤ": "Th", "ศ": "Fr", "ส": "Sa",
    "อายุ (ปี)": "Age (years)",
    "ศาสนา": "Religion",
    "พุทธ": "Buddhist",
    "คริสต์": "Christian",
    "อิสลาม": "Muslim",
    "ไม่นับถือศาสนา": "No religion",
    "โปรดระบุศาสนา": "Please specify your religion",
    "ช่องทางติดต่อ": "Contact details",
    "เบอร์โทรศัพท์": "Phone number",
    "อีเมล": "Email",
    "การศึกษา": "Education",
    "สถาบันการศึกษา": "University / institution",
    "คณะ": "Faculty",
    "สาขาวิชา": "Major",
    "สถานะการศึกษา": "Study status",
    "กำลังศึกษา ปี 1": "Year 1 student",
    "กำลังศึกษา ปี 2": "Year 2 student",
    "กำลังศึกษา ปี 3": "Year 3 student",
    "กำลังศึกษา ปี 4": "Year 4 student",
    "จบการศึกษาแล้ว": "Graduated",
    "เกรดเฉลี่ยล่าสุด (GPA)": "Latest GPA",
    "เกรดเฉลี่ยสะสม (GPAX)": "Cumulative GPA (GPAX)",
    "แนบ Resume / CV": "Attach Resume / CV",
    "เลือกไฟล์ หรือลากไฟล์มาวางที่นี่": "Choose a file or drop it here",
    "PDF, Word, JPG หรือ PNG · ขนาดไม่เกิน 5 MB": "PDF, Word, JPG or PNG · max 5 MB",
    "PDF, JPG หรือ PNG · ขนาดไม่เกิน 5 MB": "PDF, JPG or PNG · max 5 MB",
    "ตรวจสอบคุณสมบัติผู้สมัคร": "Eligibility check",
    "นักศึกษามีอายุครบ 18 ปีบริบูรณ์ และอายุสอดคล้องกับระดับการศึกษา": "The student is at least 18 years old, and their age fits their level of study",
    "หลักสูตรที่ศึกษา": "Study program",
    "หลักสูตรปกติ": "Regular program",
    "หลักสูตรนานาชาติ": "International program",
    "สาขาที่เรียน": "Field of study",
    "การท่องเที่ยว": "Tourism",
    "การโรงแรม": "Hotel management",
    "อาหารและเครื่องดื่ม": "Food and beverage",
    "การกีฬาและนันทนาการ": "Sports and recreation",
    "คหกรรมศาสตร์": "Home economics",
    "อุตสาหกรรมบริการอื่นๆ ที่เกี่ยวข้อง": "Other related service industries",
    "โปรดระบุสาขา": "Please specify your field",
    "มีผลทดสอบวัดระดับภาษาที่ยังไม่หมดอายุ อย่างใดอย่างหนึ่ง": "Has one valid (unexpired) language test result",
    "ผลสอบภาษาจีนไต้หวัน (จีนกลาง) TOCFL ระดับ 2 หรือ": "Taiwanese Mandarin TOCFL level 2, or",
    "ผลสอบภาษาอังกฤษมาตรฐาน CEFR เทียบเท่าระดับ A2 เช่น TOEIC (Public Test), TOEFL หรือ IELTS": "English at CEFR level A2 or higher, e.g. TOEIC (Public Test), TOEFL or IELTS",
    "ผลสอบที่ 1": "Test result 1",
    "ผลสอบที่ 2": "Test result 2",
    "ผลสอบที่มี": "Test taken",
    "อื่นๆ (CEFR)": "Other (CEFR)",
    "แนบไฟล์ผลสอบ": "Attach test result",
    "+ เพิ่มผลสอบอีก 1 รายการ": "+ Add another test result",
    "แนะนำสถานที่สอบวัดระดับภาษา": "Where to take a language test",
    "(ยังสามารถส่งใบสมัครได้ แล้วยื่นผลสอบภายหลัง)": "(you can still apply now and send the result later)",
    "· ศูนย์แนะแนวการศึกษาไต้หวัน ประจำประเทศไทย (Taiwan Education Center, Thailand)": "· Taiwan Education Center, Thailand",
    "ต่อ 101 หรือ 108 (English language)": "ext. 101 or 108 (English language)",
    "โปรแกรมที่สนใจ": "Program of interest",
    "ตำแหน่งที่สนใจ อันดับ 1": "Position of interest — 1st choice",
    "ตำแหน่งที่สนใจ อันดับ 2": "Position of interest — 2nd choice",
    "ระยะเวลาที่ต้องการ": "Preferred duration",
    "6 เดือน": "6 months",
    "12 เดือน": "12 months",
    "ยังไม่แน่ใจ": "Not sure yet",
    "ช่วงเวลาฝึกงาน (เดือนที่เริ่ม)": "Internship start month",
    "— เลือกเดือน —": "— Select month —",
    "ต้องเตรียมการล่วงหน้าอย่างต่ำ 3 เดือน": "Needs at least 3 months to prepare",
    "เนื่องจากการฝึกงานตามโครงการนี้ ต้องมีการเตรียมการล่วงหน้าอย่างต่ำ 3 เดือน เพื่อดำเนินการด้านเอกสารจากทั้งไทยและไต้หวัน แต่คุณยังสามารถกรอกรายละเอียดจนจบ เพื่อขอรับข่าวประชาสัมพันธ์ตำแหน่งงานในต่างประเทศจากเรา": "This program needs at least 3 months of preparation for documents in both Thailand and Taiwan. You can still complete the form to receive news about overseas positions from us.",
    "ภายใน 3 เดือน อาจเตรียมการไม่ทัน": "Within 3 months — there may not be enough time to prepare",
    "รู้จักเราจากช่องทางใด": "How did you hear about us?",
    "อาจารย์ / มหาวิทยาลัย": "Teacher / university",
    "เพื่อนแนะนำ": "A friend",
    "คำถามหรือข้อมูลเพิ่มเติม": "Questions or more information",
    "ข้าพเจ้ายินยอมให้ Winner HR International Co.,Ltd เก็บและใช้ข้อมูลส่วนบุคคลข้างต้น เพื่อการติดต่อกลับและพิจารณาเข้าร่วมโครงการ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)": "I agree that Winner HR International Co.,Ltd may store and use the personal data above to contact me and consider my application, under Thailand's Personal Data Protection Act (PDPA).",
    "ส่งใบสมัคร": "Submit application",
    "ข้อมูลของคุณจะถูกเก็บเป็นความลับ": "Your information is kept confidential",
    "ส่งข้อมูลเรียบร้อยแล้ว!": "Application sent!",
    "ขอบคุณที่สนใจโครงการฝึกงานไต้หวัน ทีมงานจะติดต่อกลับภายใน 1-2 วันทำการ": "Thank you for your interest in the Taiwan internship. Our team will contact you within 1–2 working days.",
    "หากต้องการคำตอบเร็วขึ้น โทร 064-9607917 หรือ 064-9607827": "For a faster answer, call 064-9607917 or 064-9607827",
    "ลงทะเบียนอีกครั้ง": "Register again",
    "กิจกรรมและภาพการทำงานของเรา": "Our activities and work",
    "บรรยากาศการดูแลนักศึกษาตั้งแต่เตรียมตัว เดินทาง จนถึงฝึกงานจริงที่ไต้หวัน — กดที่อัลบั้มเพื่อดูภาพทั้งหมด": "How we support students from preparation and travel to the internship in Taiwan — tap an album to see all photos.",
    "รูปก่อนหน้า": "Previous photo",
    "รูปถัดไป": "Next photo",
    "ตามหนังสือเดินทาง": "As in your passport",
    "เลือกวันที่ (พ.ศ.)": "Select a date",
    "เลือกวันที่": "Select a date",
    "เดือนก่อนหน้า": "Previous month",
    "เดือนถัดไป": "Next month",
    "ปี พ.ศ.": "Year",
    "คำนวณจากวันเกิดอัตโนมัติ": "Calculated from date of birth",
    "เช่น คณะมนุษยศาสตร์": "e.g. Faculty of Humanities",
    "เช่น การโรงแรม": "e.g. Hotel management",
    "เช่น 3.25": "e.g. 3.25",
    "เช่น 3.10": "e.g. 3.10",
    "กรอกเกรดเฉลี่ย 0.00 – 4.00": "Enter a GPA from 0.00 to 4.00",
    "เช่น การจัดการธุรกิจการบิน": "e.g. Aviation business management",
    "เลือกเดือนที่เริ่มฝึกงาน": "Select the start month",
    "ปีก่อนหน้า": "Previous year",
    "ปีถัดไป": "Next year",
    "เช่น ประสบการณ์ทำงาน/ฝึกงานที่ผ่านมา หรือคำถามที่อยากถาม": "e.g. past work or internship experience, or any questions",
    "⚠ เตรียมการน้อยกว่า 3 เดือน": "⚠ Less than 3 months to prepare",
    /* อัลบั้มกิจกรรม */
    "เยี่ยมโรงแรมพาร์ทเนอร์": "Partner hotel visits",
    "ไทเป ไต้หวัน": "Taipei, Taiwan",
    "5 โรงแรม": "5 hotels",
    "แนะแนวมหาวิทยาลัย กรุงเทพฯ": "University roadshow, Bangkok",
    "ศรีปทุม": "Sripatum",
    "ม.กรุงเทพ": "Bangkok University",
    "มหิดล และอื่นๆ": "Mahidol and more",
    "ความร่วมมือ ม.บูรพา": "Burapha University partnership",
    "ประชุม": "Meetings",
    "แนะแนว": "Guidance",
    "แนะแนวภาคเหนือ เชียงใหม่": "Northern roadshow, Chiang Mai",
    "ราชภัฏเชียงใหม่": "Chiang Mai Rajabhat",
    "ม.พายัพ": "Payap University",
    "ความร่วมมือกับโรงเรียน": "School partnerships",
    "โครงการ 3+4": "3+4 program",
    "โรงเรียนจีน": "Chinese schools",
    "มอบทุนการศึกษา": "Scholarships",
    "สนับสนุนนักศึกษา 2 ทุน": "2 student scholarships",
    "มอบทุนการศึกษาแก่นักศึกษา 2 คน": "Scholarships for 2 students",
    "ม.ศรีปทุม กรุงเทพฯ": "Sripatum University, Bangkok",
    "ม.ศรีปทุม": "Sripatum University",
    "ม.มหิดล ศาลายา": "Mahidol University, Salaya",
    "ม.ธุรกิจบัณฑิตย์": "Dhurakij Pundit University",
    "คณะการโรงแรมและการท่องเที่ยว": "Faculty of Hospitality and Tourism",
    "ม.เซาธ์อีสท์บางกอก บางนา": "Southeast Bangkok University, Bangna",
    "วิทยาลัยดุสิตธานี": "Dusit Thani College",
    "ม.บูรพา": "Burapha University",
    "สาขาภาษาจีน ม.บูรพา": "Chinese Department, Burapha University",
    "ประชุม ม.บูรพา (หลักสูตรนานาชาติ)": "Meeting at Burapha University (international program)",
    "BBS ม.บูรพา": "BBS, Burapha University",
    "อุตสาหกรรมการท่องเที่ยวและบริการ": "Tourism and hospitality industry",
    "บริหารธุรกิจระหว่างประเทศ ม.บูรพา": "International Business, Burapha University",
    "ม.ราชภัฏเชียงใหม่": "Chiang Mai Rajabhat University",
    "ม.พายัพ คณะบริหารธุรกิจ": "Payap University, Faculty of Business",
    "ม.พายัพ (นานาชาติ)": "Payap University (international)",
    "โรงเรียนการบริบาลเชียงใหม่": "Chiang Mai Caregiving School",
    "โรงเรียนกวงฟูวิทยา": "Kwang Fu Wittaya School",
    "โรงเรียนชุมชนบ้านแม่สแลป (โรงเรียนจีน)": "Ban Mae Salap Community School (Chinese school)",

    /* ---------- Manpower (job.html) ---------- */
    "Manpower | Winner 96 Management Manpower": "Manpower | Winner 96 Management Manpower",
    "Winner 96 Management Manpower มุ่งมั่นดำเนินงานอย่างมีประสิทธิภาพและการบริการที่มีคุณภาพ": "Winner 96 Management Manpower is committed to efficient work and quality service",
    "จัดหางานต่างประเทศอย่างถูกต้องตามกฎหมาย ดูแลครบวงจรตั้งแต่สมัคร สัมภาษณ์ ทำเอกสาร จนถึงวันเดินทาง": "Legal overseas recruitment with full support — application, interview, documents and departure day.",
    "หางานต่างประเทศ": "Find a job abroad",
    "สำหรับนายจ้าง · Employers": "For employers",
    "เลือกประเภทผู้ใช้": "Choose who you are",
    "เลือกประเทศที่ต้องการทำงาน:": "Choose the country you want to work in:",
    "— เลือกประเทศ —": "— Select a country —",
    "ไต้หวัน (Taiwan)": "Taiwan",
    "สิงคโปร์ (Singapore)": "Singapore",
    "เอเชีย": "Asia",
    "ยุโรป": "Europe",
    "เปิดรับลงทะเบียน": "Registration open",
    "ดูรายละเอียด →": "View details →",
    "ประเทศอื่นๆ": "Other countries",
    "กำลังจะเปิดรับสมัครเร็วๆ นี้": "Opening for applications soon",
    "🔥 เปิดรับสมัคร": "🔥 Hiring now",

    /* ---------- About ---------- */
    "เกี่ยวกับเรา": "About us",
    "About | Winner": "About | Winner",
    "Winner คือศูนย์รวมโอกาสฝึกงานและทำงานต่างประเทศ ดำเนินงานโดยสองบริษัทในเครือ ที่ให้บริการอย่างถูกต้องตามกฎหมาย โปร่งใส และดูแลผู้สมัครทุกขั้นตอน": "Winner brings together internship and job opportunities abroad. It is run by two sister companies that work legally and transparently, and support applicants at every step.",
    "เชื่อมโยงการศึกษาเข้ากับประสบการณ์การทำงานจริง ผ่านโครงการฝึกประสบการณ์วิชาชีพในโรงแรมชั้นนำของไต้หวัน มุ่งพัฒนาทักษะ สร้างศักยภาพให้เหนือกว่าบรรทัดฐาน สู่โอกาสที่ดีในสายอาชีพในอนาคต": "We connect education with real work experience through professional internships at leading hotels in Taiwan, building skills and potential for a better career.",
    "เบี้ยเลี้ยง 29,500 TWD/เดือน พร้อมที่พัก อาหาร และประกัน": "Allowance of 29,500 TWD/month, plus accommodation, meals and insurance",
    "ระยะเวลา 6-12 เดือน พร้อมใบรับรอง": "6–12 months, with a certificate",
    "ดูโครงการฝึกงาน": "View the internship program",
    "บริษัทจัดหางานต่างประเทศ ได้รับใบอนุญาตเลขที่ ต.1299/2568 จัดส่งแรงงานไทยไปทำงานต่างประเทศอย่างปลอดภัย ถูกต้องตามกฎหมาย": "An overseas recruitment agency, License No. Tor 1299/2568, sending Thai workers abroad safely and legally.",
    "สัญญาจ้างถูกต้องตามกฎหมายแรงงาน": "Employment contracts that follow labour law",
    "นายจ้างผ่านการตรวจสอบ": "Verified employers",
    "ดูแลตั้งแต่สมัครจนถึงวันเดินทาง": "Support from application to departure",
    "ดูตำแหน่งงานต่างประเทศ": "View jobs abroad",
    "ติดต่อเรา": "Contact us",
    "ที่อยู่": "Address",
    "โทรศัพท์": "Phone",

    /* ---------- Country pages ---------- */
    "จัดหางานถูกกฎหมาย 100%": "100% legal recruitment",
    "เปิดรับสมัครงาน": "Now hiring in",
    "โอกาสทำงานในไต้หวันกับนายจ้างที่ผ่านการตรวจสอบ สัญญาจ้างถูกต้องตามกฎหมายแรงงาน ดูแลครบทุกขั้นตอนตั้งแต่สมัครจนถึงวันเดินทาง": "Work in Taiwan with verified employers and legal employment contracts. We support you at every step, from applying to departure day.",
    "โอกาสทำงานในสิงคโปร์กับนายจ้างที่ผ่านการตรวจสอบ สัญญาจ้างถูกต้องตามกฎหมายแรงงาน ดูแลครบทุกขั้นตอนตั้งแต่สมัครจนถึงวันเดินทาง": "Work in Singapore with verified employers and legal employment contracts. We support you at every step, from applying to departure day.",
    "สมัครงานตอนนี้": "Apply now",
    "เปิดรับสมัคร": "Open",
    "ประกาศ — กด": "posting(s) — tap",
    "“สมัครตำแหน่งนี้”": "“Apply for this position”",
    "เพื่อกรอกใบสมัครได้ทันที": "to apply right away",
    "ประกาศทั้งหมดปิดรับสมัครแล้ว —": "All postings are closed —",
    "ลงทะเบียนความสนใจไว้ก่อน": "register your interest",
    "เจ้าหน้าที่จะแจ้งเมื่อเปิดรอบใหม่": "and we will tell you when a new round opens",
    "เพื่อรับแจ้งเมื่อเปิดรอบใหม่": "to hear when a new round opens",
    "ประกาศนี้": "This posting is",
    "เปลี่ยนประเทศ:": "Change country:",
    "สมัครตำแหน่งนี้": "Apply for this position",
    "ดูประกาศ": "View posting",
    "หมดเขตรับสมัครแล้ว": "Applications closed",
    "ประกาศก่อนหน้า": "Previous posting",
    "ประกาศถัดไป": "Next posting",
    "รายการประกาศรับสมัครงาน": "Job postings",
    "ดูแลผู้สูงอายุที่ไต้หวัน": "Elderly caregiver in Taiwan",
    "อบรมภาษา + หลักสูตรเพิ่มเติม": "Language training + extra courses",
    "งานโรงงานกระดาษ ไต้หวัน": "Paper factory work, Taiwan",
    "เงินเดือนเริ่มต้น 29,500 TWD · มี OT ทุกวัน": "Starting salary 29,500 TWD · daily overtime",
    "SAA Symtek Automation Asia · ตำแหน่ง PLC": "SAA Symtek Automation Asia · PLC position",
    "เงินเดือน 35,000–50,000 บาท/เดือน": "Salary 35,000–50,000 THB/month",
    "ร่วมงานกับ SAA Symtek Automation Asia": "Join SAA Symtek Automation Asia",
    "ยินดีรับผู้มีประสบการณ์ PLC": "PLC experience welcome",
    "นายจ้างรับตรง งานก่อสร้าง สิงคโปร์": "Direct employer: construction work, Singapore",
    "รายได้ไม่ต่ำกว่า 40,000 บาท · ช่างไม้ ช่างผูกเหล็ก ช่างคอนกรีต": "Income from 40,000 THB · carpenters, steel fixers, concrete workers",
    "กรอกข้อมูลเบื้องต้น เจ้าหน้าที่ Winner 96 จะติดต่อกลับเพื่อสัมภาษณ์และแจ้งเอกสารที่ต้องใช้": "Fill in your basic details. Winner 96 staff will call you for an interview and tell you which documents you need.",
    "ดำเนินการถูกต้องตามกฎหมาย ดูแลครบทุกขั้นตอน": "Fully legal process, supported at every step",
    "ลงทะเบียนสมัครงาน": "Register to apply",
    "กรอกฟอร์มนี้เพื่อเลือกตำแหน่ง": "Fill in this form to choose a position",
    "สัมภาษณ์ & ตรวจสอบคุณสมบัติ": "Interview & eligibility check",
    "เจ้าหน้าที่ติดต่อกลับ": "Our staff call you back",
    "ยื่นเอกสาร & ทำวีซ่าทำงาน": "Documents & work visa",
    "อบรมก่อนเดินทาง & บินไปทำงาน": "Pre-departure training & flight",
    "มีทีมดูแลตลอดสัญญาจ้าง": "Our team supports you for the whole contract",
    "ตำแหน่งงานที่สนใจ": "Position of interest",
    "— เลือกตำแหน่ง —": "— Select a position —",
    "หนังสือเดินทาง": "Passport",
    "ส่วนสูง (ซม.)": "Height (cm)",
    "ที่อยู่และการติดต่อ": "Address and contact",
    "ที่อยู่ตามบัตรประชาชน": "Address on ID card",
    "ที่อยู่ที่สามารถติดต่อได้": "Contact address",
    "ใช้ที่อยู่เดียวกับบัตรประชาชน": "Same as ID card address",
    "ระดับการศึกษาสูงสุด": "Highest education",
    "ประถมศึกษา": "Primary school",
    "มัธยมศึกษาตอนต้น (ม.3)": "Lower secondary (M.3)",
    "มัธยมศึกษาตอนปลาย (ม.6)": "Upper secondary (M.6)",
    "ปวช.": "Vocational certificate",
    "ปวส. / อนุปริญญา": "Higher vocational / diploma",
    "ปริญญาตรี": "Bachelor's degree",
    "สูงกว่าปริญญาตรี": "Above bachelor's degree",
    "โรงเรียน / มหาวิทยาลัย": "School / university",
    "ประสบการณ์ทำงานในประเทศ": "Work experience in Thailand",
    "มีประสบการณ์ทำงานในประเทศหรือไม่": "Do you have work experience in Thailand?",
    "ใส่ได้สูงสุด 2 บริษัท (ล่าสุดก่อน) · บริษัทที่ 2 ไม่บังคับ": "Up to 2 companies (most recent first) · the 2nd is optional",
    "บริษัท": "Company",
    "ตำแหน่ง": "Position",
    "ประสบการณ์ทำงานต่างประเทศ": "Work experience abroad",
    "มีประสบการณ์ทำงานต่างประเทศหรือไม่": "Do you have work experience abroad?",
    "ประเทศ": "Country",
    "ข้อมูลเพิ่มเติม": "More information",
    "รายละเอียดเพิ่มเติม": "Additional details",
    "ข้าพเจ้ายินยอมให้ Winner 96 Management Manpower Co.,Ltd เก็บและใช้ข้อมูลส่วนบุคคลข้างต้น เพื่อการติดต่อกลับและพิจารณาการสมัครงาน ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)": "I agree that Winner 96 Management Manpower Co.,Ltd may store and use the personal data above to contact me and consider my job application, under Thailand's Personal Data Protection Act (PDPA).",
    "ส่งใบสมัครเรียบร้อยแล้ว!": "Application sent!",
    "ทีมงาน Winner 96 จะติดต่อกลับโดยเร็วที่สุด": "The Winner 96 team will contact you as soon as possible.",
    "สมัครอีกตำแหน่ง": "Apply for another position",
    "ดูประเทศทั้งหมด": "View all countries",
    "เช่น พนักงานโรงงาน, แม่บ้าน, ช่างเชื่อม": "e.g. factory worker, housekeeper, welder",
    "เช่น สมชาย ใจดี": "Name in Thai, e.g. สมชาย ใจดี",
    "เช่น Somchai Jaidee": "e.g. Somchai Jaidee",
    "เช่น 165": "e.g. 165",
    "บ้านเลขที่ หมู่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์": "House no., village, road, sub-district, district, province, postcode",
    "เช่น 2 ปี 6 เดือน": "e.g. 2 years 6 months",
    "เช่น ไต้หวัน": "e.g. Taiwan",
    "เช่น ทักษะพิเศษ ภาษา หรือคำถาม": "e.g. special skills, languages or questions",

    /* ---------- ข้อความแจ้งเตือนฟอร์ม (forms.js) ---------- */
    "กรุณากรอกข้อมูลช่องนี้": "Please fill in this field",
    "กรุณาเลือกอย่างน้อย 1 ตัวเลือก": "Please choose at least one option",
    "กรุณายอมรับเงื่อนไขการเก็บข้อมูลส่วนบุคคล": "Please accept the data consent to continue",
    "กรุณาแนบไฟล์": "Please attach a file",
    "รูปแบบอีเมลไม่ถูกต้อง": "Please enter a valid email address",
    "กรุณากรอกเบอร์โทรศัพท์ 9-10 หลัก เช่น 0812345678": "Please enter a 9–10 digit Thai phone number, e.g. 0812345678",
    "รูปแบบข้อมูลไม่ถูกต้อง": "Invalid format",
    "กำลังส่งข้อมูล...": "Sending...",
    "กำลังส่งใบสมัคร...": "Sending your application...",
    "กรุณารอสักครู่ และอย่าปิดหน้านี้": "Please wait and keep this page open",
    "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือโทรติดต่อเรา": "Could not send. Please try again or call us."
  };

  /* ---------- วันที่ไทย → อังกฤษ ---------- */
  const TH_MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const TH_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const EN_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const monthRe = new RegExp(`(${[...TH_MONTHS, ...TH_SHORT].sort((a, b) => b.length - a.length).map(escRe).join("|")})(?:\\s*(\\d{2,4}))?`, "g");
  const ceYear = (y) => { const n = +y; return n >= 2400 ? n - 543 : n < 100 ? n + 1957 : n; }; // พ.ศ. → ค.ศ. (69 = 2569 = 2026)
  const dates = (s) => s.replace(monthRe, (_, m, y) => {
    const long = TH_MONTHS.indexOf(m);
    const name = long > -1 ? EN_MONTHS[long] : EN_SHORT[TH_SHORT.indexOf(m)];
    return y ? `${name} ${ceYear(y)}` : name;
  });

  const TH = /[฀-๿]/;
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const t = (s) => translate(s) ?? s;

  /* ข้อความที่มีตัวเลขหรือชื่อเปลี่ยนได้ */
  const PATTERNS = [
    [/^[฀-๿]+ \(([A-Z]+)\)(.*)$/, (m) => m[1] + m[2]], // อารีน่า (ALINA): 064-... → ALINA: 064-...
    [/^(\d+) รูป$/,(m) => `${m[1]} photo${m[1] === "1" ? "" : "s"}`],
    [/^เปิดอัลบั้ม (.+) \((\d+) รูป\)$/, (m) => `Open album: ${t(m[1])} (${m[2]} photos)`],
    [/^(.+) รูปที่ (\d+)$/, (m) => `${t(m[1])} — photo ${m[2]}`],
    [/^รูปที่ (\d+)(?:: (.+))?$/, (m) => `Photo ${m[1]}${m[2] ? ": " + t(m[2]) : ""}`],
    [/^ไปสไลด์ที่ (\d+)$/, (m) => `Go to slide ${m[1]}`],
    [/^ไปที่ประกาศ (\d+)$/, (m) => `Go to posting ${m[1]}`],
    [/^ประกาศที่ (\d+)$/, (m) => `Posting ${m[1]}`],
    [/^ดูประกาศ (.+)$/, (m) => `View posting: ${t(m[1])}`],
    [/^ธงชาติ(.+)$/, (m) => `Flag of ${t(m[1])}`],
    [/^ธง(.+)$/, (m) => `Flag of ${t(m[1])}`],
    [/^(.+) — เร็วๆ นี้$/, (m) => `${t(m[1])} — coming soon`],
    [/^(\d+) ตำแหน่ง$/, (m) => `${m[1]} position${m[1] === "1" ? "" : "s"}`],
    [/^พ\.ศ\. (\d{4})$/, (m) => String(ceYear(m[1]))],
    [/^ฝึกงานประมาณ (.+)$/, (m) => `Internship approx. ${dates(m[1])}`],
    [/^ไม่พบผลลัพธ์สำหรับ “(.+)”$/, (m) => `No results for “${m[1]}”`],
    [/^โปรแกรมนี้กำลังจะเปิดเร็วๆ นี้ — สอบถามเพิ่มเติมได้ที่ (.+)$/, (m) => `This program is opening soon — for details call ${m[1]}`],
    [/^สมัครงานประเทศ.+ \((.+)\) \| Winner 96$/, (m) => `Jobs in ${m[1]} | Winner 96`],
    [/^สมัครงานประเทศ(.+)$/, (m) => `Apply for jobs in ${t(m[1])}`],
    [/^ประกาศรับสมัครงาน ประเทศ(.+)$/, (m) => `Job postings in ${t(m[1])}`],
    [/^ประกาศรับสมัครงาน · (.+)$/, (m) => `Job postings · ${t(m[1])}`],
    [/^ประเทศ(.+)$/, (m) => t(m[1])],
    [/^ใบสมัครงาน · (.+)$/, (m) => `Job application · ${m[1]}`],
    [/^ติดต่อสอบถามเพิ่มเติม: (.+)$/, (m) => `More information: ${m[1]}`],
    [/^อีเมลยื่นเอกสาร: (.+)$/, (m) => `Email for documents: ${m[1]}`],
    [/^ส่งเอกสารทางอีเมล (.+)$/, (m) => `Send documents by email to ${m[1]}`],
    [/^สอบถามเพิ่มเติม โทร (.+)$/, (m) => `Questions? Call ${m[1]}`],
    [/^หรือโทร (.+)$/, (m) => `or call ${m[1]}`],
    [/^(.+) (\d+)$/, (m) => (TH.test(m[1]) && EN[norm(m[1])] ? `${EN[norm(m[1])]} ${m[2]}` : null)],
    [/^(.+) ปี$/, (m) => (TH.test(m[1]) ? null : `${m[1]} years`)]
  ];

  function translate(raw) {
    const s = norm(raw);
    if (!TH.test(s)) return null;
    if (EN[s] !== undefined) return EN[s];
    for (const [re, fn] of PATTERNS) {
      const m = s.match(re);
      if (m) { const r = fn(m); if (r != null) return r; }
    }
    if (s.includes(" · ")) { // แปลทีละส่วน
      const parts = s.split(" · ").map((p) => translate(p) ?? dates(p));
      if (!parts.some((p) => TH.test(p))) return parts.join(" · ");
    }
    const d = dates(s);
    if (d !== s && !TH.test(d)) return d;
    return null;
  }

  /* ---------- ใช้กับหน้าเว็บ ---------- */
  const ATTRS = ["placeholder", "aria-label", "alt", "title"];
  const textOrig = new Map(); // text node → ข้อความไทยเดิม
  const attrOrig = new Map(); // element → { attr: ค่าไทยเดิม }
  let on = false;
  let titleOrig = null;

  function doText(node) {
    if (!node.parentElement || node.parentElement.closest("script, style, textarea")) return;
    const v = node.nodeValue;
    if (!TH.test(v)) return;
    const r = translate(v);
    if (r == null) return;
    const opt = node.parentElement.closest("option");
    if (opt && !opt.hasAttribute("value")) opt.setAttribute("value", opt.textContent); // ค่าที่ส่งยังเป็นภาษาไทย
    textOrig.set(node, v);
    const lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
    node.nodeValue = lead + r + trail;
  }
  function doYear(sel) { // ปฏิทิน: ปี พ.ศ. → ค.ศ.
    sel.querySelectorAll("option").forEach((o) => {
      if (/^\d{4}$/.test(o.textContent) && +o.textContent >= 2400) {
        if (!o.hasAttribute("value")) o.setAttribute("value", o.textContent);
        const n = o.firstChild;
        textOrig.set(n, n.nodeValue);
        n.nodeValue = String(ceYear(n.nodeValue));
      }
    });
  }
  function doAttrs(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v || !TH.test(v)) continue;
      const r = translate(v);
      if (r == null) continue;
      const store = attrOrig.get(el) || {};
      store[a] = v;
      attrOrig.set(el, store);
      el.setAttribute(a, r);
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    if (root.matches("script, style")) return;
    doAttrs(root);
    root.querySelectorAll("*").forEach(doAttrs);
    root.querySelectorAll("select.tdp-year").forEach(doYear);
    if (root.matches("select.tdp-year")) doYear(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) doText(n);
  }

  const mo = new MutationObserver((list) => {
    if (!on) return;
    for (const m of list) {
      if (m.type === "childList") m.addedNodes.forEach(walk);
      else if (m.type === "characterData") doText(m.target);
      else if (m.type === "attributes") doAttrs(m.target);
    }
    if (TH.test(document.title)) { const r = translate(document.title); if (r) { titleOrig = document.title; document.title = r; } }
  });

  const LANG0 = document.documentElement.getAttribute("lang") || "th"; // หน้า Employers เป็นภาษาอังกฤษอยู่แล้ว
  function apply(lang) {
    const en = lang === "en";
    document.documentElement.lang = en ? "en" : LANG0;
    if (en === on) return;
    on = en;
    if (en) {
      walk(document.body);
      const r = translate(document.title);
      if (r) { titleOrig = document.title; document.title = r; }
      mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    } else {
      mo.disconnect();
      textOrig.forEach((v, node) => { if (node.isConnected) node.nodeValue = v; });
      attrOrig.forEach((store, el) => { for (const a in store) el.setAttribute(a, store[a]); });
      textOrig.clear();
      attrOrig.clear();
      if (titleOrig) document.title = titleOrig;
    }
  }

  /* เพิ่มคำแปลจากไฟล์อื่น เช่น ที่อยู่ใน config.js: WINNER_I18N.add({ "ไทย": "English" }) */
  const add = (map) => Object.entries(map || {}).forEach(([th, en]) => { if (th && en) EN[norm(th)] = en; });

  window.WINNER_I18N = { apply, translate, add, isEn: () => on };
})();
