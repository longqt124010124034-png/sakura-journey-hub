import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  vi: {
    translation: {
      // Header
      "header.home": "Trang chủ",
      "header.about": "Giới thiệu", 
      "header.courses": "Khóa học",
      "header.team": "Đội ngũ",
      "header.pricing": "Học phí",
      "header.faq": "FAQ",
      "header.contact": "Liên hệ",
      "header.register": "Đăng ký ngay",
      
      // Hero
      "hero.title": "Trung tâm tiếng Nhật Quang Dũng",
      "hero.subtitle": "Biến việc học thành hành trình khám phá thú vị",
      "hero.cta": "Đăng ký khóa học ngay hôm nay",
      
      // About
      "about.title": "Về Trung tâm Quang Dũng",
      "about.mission": "Sứ mệnh của chúng tôi",
      "about.description": "Với hơn 5 năm kinh nghiệm giảng dạy và dịch thuật manga/anime, thầy Nguyễn Quang Triệu (Quang Dũng) đã giúp hàng trăm học viên chinh phục tiếng Nhật một cách hiệu quả và thú vị.",
      "about.mission.text": "Biến việc học tiếng Nhật thành sự tò mò và khám phá, giúp học viên không chỉ nắm vững ngữ pháp mà còn hiểu sâu về văn hóa Nhật Bản.",
      
      // Team
      "team.title": "Đội ngũ Giáo viên",
      "team.quang_dung.name": "Thầy Nguyễn Quang Triệu",
      "team.quang_dung.role": "Founder & Giảng viên chính",
      "team.quang_dung.description": "5+ năm kinh nghiệm giảng dạy, Dịch giả manga/anime chuyên nghiệp, Chuyên gia luyện thi JLPT N5-N3",
      "team.dinh_tan.name": "Thầy Lê Đình Tân", 
      "team.dinh_tan.role": "Giảng viên tiếng Nhật",
      "team.dinh_tan.description": "Chuyên môn sâu về ngữ pháp tiếng Nhật, Kinh nghiệm luyện thi JLPT, Phương pháp giảng dạy sinh động",
      
      // Courses
      "courses.title": "Các Khóa học",
      "courses.filter.all": "Tất cả",
      "courses.filter.preN5": "Pre-N5",
      "courses.filter.N5": "N5", 
      "courses.filter.N4": "N4",
      "courses.filter.N3": "N3",
      "courses.code": "Mã môn",
      "courses.name": "Tên môn học",
      "courses.material": "Tài liệu",
      "courses.level": "Trình độ JLPT",
      
      // Pricing
      "pricing.title": "Học phí & Thông tin tuyển sinh",
      "pricing.hour": "1 giờ học",
      "pricing.month": "1 tháng (12 buổi)",
      "pricing.payment.title": "Quy định đóng học phí",
      "pricing.payment.advance": "Đóng trước 1 tháng học phí",
      "pricing.payment.syntax": "Cú pháp chuyển khoản: [Họ tên] - [Tháng/năm]",
      "pricing.payment.example": "Ví dụ: Nguyễn Văn A - 12/2024",
      
      // FAQ
      "faq.title": "Câu hỏi thường gặp",
      "faq.payment.question": "Làm thế nào để thanh toán học phí?",
      "faq.payment.answer": "Học viên có thể chuyển khoản qua ngân hàng hoặc thanh toán trực tiếp tại trung tâm. Vui lòng đóng trước 1 tháng học phí.",
      "faq.schedule.question": "Lịch học như thế nào?",
      "faq.schedule.answer": "Lịch học linh hoạt theo yêu cầu học viên. Thường là 3 buổi/tuần, mỗi buổi 1.5-2 giờ.",
      "faq.jlpt.question": "Trung tâm có hỗ trợ luyện thi JLPT không?",
      "faq.jlpt.answer": "Có, chúng tôi có các khóa luyện thi JLPT từ N5 đến N3 với phương pháp học hiệu quả và tài liệu cập nhật.",
      
      // Contact
      "contact.title": "Đăng ký Khóa học",
      "contact.name": "Họ và tên",
      "contact.email": "Email",
      "contact.phone": "Số điện thoại",
      "contact.course": "Khóa học quan tâm",
      "contact.submit": "Đăng ký ngay",
      "contact.success": "Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      
      // Footer
      "footer.contact.title": "Thông tin liên hệ",
      "footer.social.title": "Mạng xã hội",
      "footer.back_to_top": "Lên đầu trang",
      
      // Common
      "common.loading": "Đang tải...",
      "common.error": "Có lỗi xảy ra",
    }
  },
  ja: {
    translation: {
      // Header
      "header.home": "ホーム",
      "header.about": "紹介",
      "header.courses": "コース",
      "header.team": "チーム",
      "header.pricing": "料金",
      "header.faq": "よくある質問",
      "header.contact": "お問い合わせ",
      "header.register": "今すぐ登録",
      
      // Hero
      "hero.title": "クアンユン日本語センター",
      "hero.subtitle": "学習を興味深い発見の旅に変える",
      "hero.cta": "今日からコースに登録しよう",
      
      // About
      "about.title": "クアンユンセンターについて",
      "about.mission": "私たちの使命",
      "about.description": "5年以上の教育経験とマンガ・アニメ翻訳の経験を持つグエン・クアン・チエウ先生（クアンユン）は、数百人の学生が効果的で楽しく日本語を習得できるよう支援してきました。",
      "about.mission.text": "日本語学習を好奇心と発見に変え、学生が文法を習得するだけでなく、日本文化を深く理解できるよう支援する。",
      
      // Team
      "team.title": "講師陣",
      "team.quang_dung.name": "グエン・クアン・チエウ先生",
      "team.quang_dung.role": "創設者・メイン講師",
      "team.quang_dung.description": "5年以上の教育経験、プロのマンガ・アニメ翻訳者、JLPT N5-N3試験対策専門家",
      "team.dinh_tan.name": "レ・ディン・タン先生",
      "team.dinh_tan.role": "日本語講師",
      "team.dinh_tan.description": "日本語文法の深い専門知識、JLPT試験対策経験、活発な教育方法",
      
      // Courses
      "courses.title": "コース",
      "courses.filter.all": "すべて",
      "courses.filter.preN5": "Pre-N5",
      "courses.filter.N5": "N5",
      "courses.filter.N4": "N4", 
      "courses.filter.N3": "N3",
      "courses.code": "科目コード",
      "courses.name": "科目名",
      "courses.material": "教材",
      "courses.level": "JLPTレベル",
      
      // Pricing
      "pricing.title": "授業料・入学情報",
      "pricing.hour": "1時間授業",
      "pricing.month": "1ヶ月（12回）",
      "pricing.payment.title": "授業料支払い規定",
      "pricing.payment.advance": "1ヶ月前の授業料前払い",
      "pricing.payment.syntax": "振込構文：【氏名】- 【月/年】",
      "pricing.payment.example": "例：グエン・ヴァン・A - 12/2024",
      
      // FAQ
      "faq.title": "よくある質問",
      "faq.payment.question": "授業料の支払い方法は？",
      "faq.payment.answer": "銀行振込またはセンターでの直接支払いが可能です。1ヶ月前の授業料をお支払いください。",
      "faq.schedule.question": "授業スケジュールはどのようになっていますか？",
      "faq.schedule.answer": "学生の要求に応じた柔軟なスケジュール。通常週3回、1回1.5-2時間です。",
      "faq.jlpt.question": "JLPT試験対策サポートはありますか？",
      "faq.jlpt.answer": "はい、効果的な学習方法と最新の教材を使ったN5からN3までのJLPT対策コースがあります。",
      
      // Contact
      "contact.title": "コース登録",
      "contact.name": "氏名",
      "contact.email": "メールアドレス",
      "contact.phone": "電話番号",
      "contact.course": "興味のあるコース",
      "contact.submit": "今すぐ登録",
      "contact.success": "登録成功！できるだけ早くご連絡いたします。",
      
      // Footer
      "footer.contact.title": "連絡先",
      "footer.social.title": "ソーシャルメディア",
      "footer.back_to_top": "トップへ戻る",
      
      // Common
      "common.loading": "読み込み中...",
      "common.error": "エラーが発生しました",
    }
  },
  en: {
    translation: {
      // Header
      "header.home": "Home",
      "header.about": "About",
      "header.courses": "Courses", 
      "header.team": "Team",
      "header.pricing": "Pricing",
      "header.faq": "FAQ",
      "header.contact": "Contact",
      "header.register": "Register Now",
      
      // Hero
      "hero.title": "Quang Dũng Japanese Center",
      "hero.subtitle": "Transform learning into an exciting journey of discovery",
      "hero.cta": "Register for courses today",
      
      // About
      "about.title": "About Quang Dũng Center", 
      "about.mission": "Our Mission",
      "about.description": "With over 5 years of teaching experience and manga/anime translation expertise, Mr. Nguyen Quang Trieu (Quang Dũng) has helped hundreds of students master Japanese effectively and enjoyably.",
      "about.mission.text": "Transform Japanese learning into curiosity and discovery, helping students not only master grammar but also deeply understand Japanese culture.",
      
      // Team
      "team.title": "Our Teachers",
      "team.quang_dung.name": "Mr. Nguyen Quang Trieu",
      "team.quang_dung.role": "Founder & Main Instructor",
      "team.quang_dung.description": "5+ years teaching experience, Professional manga/anime translator, JLPT N5-N3 exam specialist",
      "team.dinh_tan.name": "Mr. Le Dinh Tan",
      "team.dinh_tan.role": "Japanese Language Instructor", 
      "team.dinh_tan.description": "Deep expertise in Japanese grammar, JLPT exam preparation experience, Dynamic teaching methodology",
      
      // Courses
      "courses.title": "Our Courses",
      "courses.filter.all": "All",
      "courses.filter.preN5": "Pre-N5",
      "courses.filter.N5": "N5",
      "courses.filter.N4": "N4",
      "courses.filter.N3": "N3", 
      "courses.code": "Course Code",
      "courses.name": "Course Name",
      "courses.material": "Materials", 
      "courses.level": "JLPT Level",
      
      // Pricing
      "pricing.title": "Tuition & Enrollment Information",
      "pricing.hour": "1 hour class",
      "pricing.month": "1 month (12 sessions)",
      "pricing.payment.title": "Tuition Payment Policy",
      "pricing.payment.advance": "Pay 1 month tuition in advance",
      "pricing.payment.syntax": "Transfer syntax: [Full Name] - [Month/Year]",
      "pricing.payment.example": "Example: Nguyen Van A - 12/2024",
      
      // FAQ
      "faq.title": "Frequently Asked Questions",
      "faq.payment.question": "How to pay tuition fees?",
      "faq.payment.answer": "Students can transfer via bank or pay directly at the center. Please pay 1 month tuition in advance.",
      "faq.schedule.question": "What is the class schedule?",
      "faq.schedule.answer": "Flexible schedule according to student needs. Usually 3 sessions/week, each session 1.5-2 hours.",
      "faq.jlpt.question": "Does the center support JLPT exam preparation?",
      "faq.jlpt.answer": "Yes, we have JLPT preparation courses from N5 to N3 with effective learning methods and updated materials.",
      
      // Contact
      "contact.title": "Course Registration",
      "contact.name": "Full Name",
      "contact.email": "Email",
      "contact.phone": "Phone Number",
      "contact.course": "Course of Interest",
      "contact.submit": "Register Now",
      "contact.success": "Registration successful! We will contact you soon.",
      
      // Footer  
      "footer.contact.title": "Contact Information",
      "footer.social.title": "Social Media",
      "footer.back_to_top": "Back to Top",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "An error occurred",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // default language
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;