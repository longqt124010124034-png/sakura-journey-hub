import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Sunrise, Facebook, Youtube, MessageCircle, ArrowUp } from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-br from-sakura to-sunrise shadow-glow">
                <Sunrise className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-japanese">
                  Quang Dũng Japanese Center
                </h3>
                <p className="text-sm text-muted-foreground font-japanese">
                  クアンユン日本語センター
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed max-w-md">
              Trung tâm tiếng Nhật hàng đầu với phương pháp giảng dạy hiện đại, 
              kết hợp văn hóa manga và anime để tạo hứng thú học tập.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-smooth hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-smooth hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white transition-smooth hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sakura">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {[
                { key: 'home', href: '#home', label: 'Trang chủ' },
                { key: 'about', href: '#about', label: 'Giới thiệu' },
                { key: 'courses', href: '#courses', label: 'Khóa học' },
                { key: 'team', href: '#team', label: 'Đội ngũ' },
                { key: 'pricing', href: '#pricing', label: 'Học phí' },
                { key: 'faq', href: '#faq', label: 'FAQ' }
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-sakura transition-smooth text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-sakura">{t('footer.contact.title')}</h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span>📞</span>
                  <span className="font-medium">+84 123 456 789</span>
                </div>
                <p className="text-muted-foreground text-xs ml-6">
                  Thứ 2 - Chủ nhật: 8:00 - 21:00
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span>✉️</span>
                  <span className="font-medium">info@quangdungjapanese.com</span>
                </div>
                <p className="text-muted-foreground text-xs ml-6">
                  Phản hồi trong 24 giờ
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span>📍</span>
                  <span className="font-medium">123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
                <p className="text-muted-foreground text-xs ml-6">
                  Gần BV Chợ Rẫy
                </p>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={() => scrollToSection('#contact')}
                  variant="outline"
                  size="sm"
                  className="border-sakura/30 text-sakura hover:bg-sakura/10 transition-smooth"
                >
                  Liên hệ ngay
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Quang Dũng Japanese Center. Tất cả quyền được bảo lưu.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Được thiết kế với ❤️ cho việc học tiếng Nhật
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="group hover:bg-accent/20 transition-smooth"
              >
                <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                {t('footer.back_to_top')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer