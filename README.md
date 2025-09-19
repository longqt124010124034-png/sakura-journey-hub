# 🌸 Trung tâm tiếng Nhật Quang Dũng

> Landing Page hiện đại, responsive cho trung tâm dạy tiếng Nhật hàng đầu

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quang-dung-japanese-center)

## 📋 Tổng quan

**Trung tâm tiếng Nhật Quang Dũng** là website landing page được xây dựng bằng React + Vite + TypeScript, tối ưu cho việc thu hút và chuyển đổi học viên. Trang web hỗ trợ đa ngôn ngữ (Tiếng Việt, 日本語, English) với thiết kế lấy cảm hứng từ văn hóa Nhật Bản.

### ✨ Tính năng chính

- 🌓 **Dark/Light Mode** - Chuyển đổi giao diện mượt mà
- 🌐 **Đa ngôn ngữ** - Hỗ trợ 3 ngôn ngữ (VI/JP/EN)
- 📱 **Responsive** - Tối ưu trên mọi thiết bị
- 🎨 **UI/UX hiện đại** - Thiết kế theo phong cách Nhật Bản
- 📊 **Google Sheets Integration** - Lưu trữ dữ liệu đăng ký
- 📧 **Email Notifications** - Thông báo tự động
- 🚀 **SEO Optimized** - Tối ưu công cụ tìm kiếm
- ⚡ **Performance** - Tải nhanh, trải nghiệm mượt mà

## 🛠 Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Animation**: Framer Motion + CSS Animations
- **Internationalization**: i18next + react-i18next
- **Form Handling**: React Hook Form + Zod
- **Theme**: next-themes
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)

## 🚀 Bắt đầu nhanh

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0

### Cài đặt

```bash
# Clone repository
git clone https://github.com/yourusername/quang-dung-japanese-center.git
cd quang-dung-japanese-center

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt tại http://localhost:5173
```

### Scripts có sẵn

```bash
npm run dev          # Khởi chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Kiểm tra code với ESLint
```

## 📊 Tích hợp Google Sheets

### Bước 1: Tạo Google Apps Script

1. Truy cập [Google Apps Script](https://script.google.com/)
2. Tạo project mới và paste code sau:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.course,
      data.message || ''
    ]);
    
    // Gửi email thông báo (tùy chọn)
    MailApp.sendEmail({
      to: 'admin@quangdungjapanese.com',
      subject: 'Đăng ký khóa học mới',
      body: `
        Học viên mới đăng ký:
        - Họ tên: ${data.name}
        - Email: ${data.email}
        - Điện thoại: ${data.phone}
        - Khóa học: ${data.course}
        - Tin nhắn: ${data.message}
      `
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Đăng ký thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Bước 2: Cấu hình Google Sheet

1. Tạo Google Sheet mới với các cột:
   - A: Thời gian
   - B: Họ tên
   - C: Email
   - D: Điện thoại
   - E: Khóa học
   - F: Tin nhắn

2. Sao chép Sheet ID từ URL (đoạn giữa `/d/` và `/edit`)

### Bước 3: Deploy Apps Script

1. Trong Apps Script, click **Deploy** → **New deployment**
2. Chọn type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** và copy **Web app URL**

### Bước 4: Cập nhật Frontend

Tạo file `.env.local` trong thư mục root:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 🎨 Tùy chỉnh thiết kế

### Colors & Theme

Chỉnh sửa file `src/index.css` và `tailwind.config.ts`:

```css
/* src/index.css */
:root {
  --sakura: 350 75% 65%;     /* Màu hoa anh đào */
  --sunrise: 15 85% 60%;     /* Màu mặt trời mọc */
  --forest: 145 25% 25%;     /* Màu rừng xanh */
}
```

### Fonts

Project sử dụng 2 font chính:
- **Inter**: Font chính cho nội dung
- **Noto Sans JP**: Font hỗ trợ tiếng Nhật

## 🌐 Quản lý nội dung đa ngôn ngữ

### Thêm ngôn ngữ mới

1. Tạo file translation trong `src/i18n/locales/`
2. Cập nhật `src/i18n/i18n.ts`
3. Thêm flag icon trong `LanguageToggle`

### Cấu trúc translation

```json
{
  "nav": {
    "home": "Trang chủ",
    "about": "Giới thiệu",
    "courses": "Khóa học"
  },
  "hero": {
    "title": "Trung tâm tiếng Nhật Quang Dũng",
    "subtitle": "Biến việc học thành hành trình khám phá thú vị"
  }
}
```

## 📱 SEO & Performance

### Meta Tags

File `index.html` đã được tối ưu với:
- Title tags có từ khóa chính
- Meta description dưới 160 ký tự
- Open Graph tags cho social media
- Structured data (JSON-LD)

### Performance Optimization

- ⚡ **Vite** - Build tool cực nhanh
- 🖼️ **Image Optimization** - Lazy loading, WebP format
- 📦 **Code Splitting** - React.lazy() cho các components lớn
- 🗜️ **Bundle Analysis** - Tối ưu bundle size

### Lighthouse Score

Target scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🚀 Deploy lên Vercel

### Tự động (Recommended)

1. Push code lên GitHub/GitLab
2. Kết nối repository với Vercel
3. Vercel sẽ tự động deploy mọi lần commit

### Manual Deployment

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Build project
npm run build

# Deploy
vercel --prod
```

### Environment Variables

Trong Vercel Dashboard, thêm các biến môi trường:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_SITE_URL=https://your-domain.com
```

### Custom Domain

1. Trong Vercel Dashboard → Settings → Domains
2. Thêm domain của bạn
3. Cấu hình DNS records theo hướng dẫn

## 📧 Email Marketing Integration

### Mailchimp

```javascript
// src/utils/mailchimp.js
export const subscribeToNewsletter = async (email) => {
  const response = await fetch('/api/mailchimp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};
```

### SendGrid

```javascript
// src/utils/sendgrid.js
export const sendWelcomeEmail = async (userData) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};
```

## 🔧 Troubleshooting

### Lỗi thường gặp

**1. Build fails với TypeScript errors**
```bash
npm run build -- --mode development
```

**2. i18n không load được translations**
```bash
# Kiểm tra đường dẫn file
ls src/i18n/locales/
```

**3. Google Sheets không nhận được data**
- Kiểm tra CORS settings trong Apps Script
- Verify Web app permissions
- Test với Postman trước

### Performance Issues

```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer dist/assets/*.js
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

**Trung tâm tiếng Nhật Quang Dũng**

- 📧 Email: info@quangdungjapanese.com
- 📱 Điện thoại: +84 123 456 789
- 🌐 Website: https://quangdungjapanese.com
- 📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM

---

⭐ **Nếu project này hữu ích, hãy star repository để ủng hộ chúng tôi!**

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Student dashboard
- [ ] Online lesson booking system  
- [ ] Progress tracking
- [ ] Mobile app (React Native)
- [ ] AI chatbot support
- [ ] Video testimonials
- [ ] Blog/News section