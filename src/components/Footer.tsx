import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { Sunrise, Facebook, Youtube, MessageCircle, Instagram, Music2, ArrowUp, Phone, Mail, MapPin, Clock } from 'lucide-react'

type FooterData = {
  center_name_vn?: string | null; center_name_jp?: string | null; center_name_en?: string | null;
  description_vn?: string | null; description_jp?: string | null; description_en?: string | null;
  address?: string | null; phone?: string | null; email?: string | null; working_hours?: string | null;
  facebook_url?: string | null; youtube_url?: string | null; zalo_url?: string | null;
  instagram_url?: string | null; tiktok_url?: string | null; copyright_text?: string | null;
  logo_url?: string | null;
}

const Footer = () => {
  const { t, i18n } = useTranslation()
  const [data, setData] = useState<FooterData>({})

  useEffect(() => {
    supabase.from('footer_settings').select('*').limit(1).maybeSingle().then(({ data }) => {
      if (data) setData(data)
    })
  }, [])

  const lang = i18n.language?.startsWith('ja') ? 'jp' : i18n.language?.startsWith('en') ? 'en' : 'vn'
  const name = (data as any)[`center_name_${lang}`] || data.center_name_vn || 'Quang Dũng Japanese Center'
  const desc = (data as any)[`description_${lang}`] || data.description_vn || ''

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const socials = [
    { url: data.facebook_url, Icon: Facebook, color: 'bg-blue-600 hover:bg-blue-700' },
    { url: data.youtube_url, Icon: Youtube, color: 'bg-red-600 hover:bg-red-700' },
    { url: data.zalo_url, Icon: MessageCircle, color: 'bg-green-600 hover:bg-green-700' },
    { url: data.instagram_url, Icon: Instagram, color: 'bg-pink-600 hover:bg-pink-700' },
    { url: data.tiktok_url, Icon: Music2, color: 'bg-foreground hover:bg-foreground/80 text-background' },
  ].filter((s) => !!s.url)

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {data.logo_url ? (
                <img src={data.logo_url} alt="Logo" className="h-12 w-12 rounded-full object-cover shadow-glow" />
              ) : (
                <div className="p-2 rounded-full bg-gradient-to-br from-sakura to-sunrise shadow-glow">
                  <Sunrise className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold font-japanese">{name}</h3>
                {data.center_name_jp && lang !== 'jp' && (
                  <p className="text-sm text-muted-foreground font-japanese">{data.center_name_jp}</p>
                )}
              </div>
            </div>
            {desc && <p className="text-muted-foreground mb-4 leading-relaxed max-w-md">{desc}</p>}
            <div className="flex flex-wrap gap-3">
              {socials.map(({ url, Icon, color }, i) => (
                <a key={i} href={url!} target="_blank" rel="noopener noreferrer"
                   className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white transition-smooth hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sakura">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {[
                { href: '#home', label: 'Trang chủ' },
                { href: '#about', label: 'Giới thiệu' },
                { href: '#courses', label: 'Khóa học' },
                { href: '#team', label: 'Đội ngũ' },
                { href: '#pricing', label: 'Học phí' },
                { href: '#faq', label: 'FAQ' },
              ].map((item) => (
                <li key={item.href}>
                  <button onClick={() => scrollToSection(item.href)} className="text-muted-foreground hover:text-sakura transition-smooth text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sakura">{t('footer.contact.title')}</h4>
            <div className="space-y-3 text-sm">
              {data.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-sakura shrink-0" />
                  <a href={`tel:${data.phone}`} className="font-medium hover:text-sakura transition-smooth">{data.phone}</a>
                </div>
              )}
              {data.working_hours && (
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{data.working_hours}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-sakura shrink-0" />
                  <a href={`mailto:${data.email}`} className="font-medium hover:text-sakura transition-smooth break-all">{data.email}</a>
                </div>
              )}
              {data.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-sakura shrink-0" />
                  <span className="font-medium">{data.address}</span>
                </div>
              )}
              <div className="pt-2">
                <Button onClick={() => scrollToSection('#contact')} variant="outline" size="sm" className="border-sakura/30 text-sakura hover:bg-sakura/10 transition-smooth">
                  Liên hệ ngay
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {data.copyright_text || `© ${new Date().getFullYear()} ${name}. All rights reserved.`}
            </p>
            <Button variant="ghost" size="sm" onClick={scrollToTop} className="group hover:bg-accent/20 transition-smooth">
              <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
              {t('footer.back_to_top')}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
