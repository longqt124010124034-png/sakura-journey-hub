import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

const Contact = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  })

  const courses = [
    'Tiếng Nhật cơ bản (Pre-N5)',
    'Tiếng Nhật sơ cấp (N5)',
    'Tiếng Nhật trung cấp (N4)',
    'Tiếng Nhật trung cấp cao (N3)',
    'Luyện thi JLPT N5',
    'Luyện thi JLPT N4', 
    'Luyện thi JLPT N3',
    'Tiếng Nhật qua Manga & Anime'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "🎉 Đăng ký thành công!",
        description: t('contact.success'),
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      })
    } catch (error) {
      toast({
        title: "❌ Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Số điện thoại',
      details: '+84 123 456 789',
      subtitle: 'Thời gian: 8:00 - 21:00 (T2-CN)'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@quangdungjapanese.com',
      subtitle: 'Phản hồi trong 24h'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      details: '123 Đường ABC, Quận 1, TP.HCM',
      subtitle: 'Gần BV Chợ Rẫy, dễ dàng di chuyển'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Đăng ký ngay để nhận tư vấn miễn phí và ưu đãi đặc biệt
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Form đăng ký</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contact.name')} *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 transition-smooth focus:ring-sakura focus:border-sakura"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contact.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 transition-smooth focus:ring-sakura focus:border-sakura"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t('contact.phone')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 transition-smooth focus:ring-sakura focus:border-sakura"
                    placeholder="0123 456 789"
                  />
                </div>

                <div>
                  <Label htmlFor="course">{t('contact.course')} *</Label>
                  <Select required onValueChange={(value) => handleInputChange('course', value)}>
                    <SelectTrigger className="mt-1 transition-smooth focus:ring-sakura focus:border-sakura">
                      <SelectValue placeholder="Chọn khóa học bạn quan tâm" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course, index) => (
                        <SelectItem key={index} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Tin nhắn (tùy chọn)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-1 transition-smooth focus:ring-sakura focus:border-sakura"
                    placeholder="Chia sẻ mục tiêu học tập hoặc câu hỏi của bạn..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sunrise-gradient hover:shadow-glow transition-smooth text-lg py-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>{t('contact.submit')}</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Thông tin liên hệ</h3>
              <p className="text-muted-foreground">
                Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn bất cứ lúc nào
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-glow transition-smooth group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-sakura transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-foreground font-medium">{info.details}</p>
                    <p className="text-sm text-muted-foreground mt-1">{info.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card className="p-6 shadow-card">
              <h4 className="font-semibold mb-4">Kết nối với chúng tôi</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <span className="text-sm font-bold">Y</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <span className="text-sm font-bold">Z</span>
                </a>
              </div>
            </Card>

            {/* Special Offer */}
            <Card className="p-6 shadow-card bg-gradient-to-r from-sakura/5 to-sunrise/5 border-sakura/20">
              <div className="text-center">
                <h4 className="text-lg font-bold text-sakura mb-2">🎉 Ưu đãi đặc biệt</h4>
                <p className="text-sm mb-3">
                  Giảm 20% học phí cho 20 học viên đăng ký đầu tiên trong tháng này
                </p>
                <p className="text-xs text-muted-foreground">
                  * Áp dụng cho khóa học 3 tháng trở lên
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact