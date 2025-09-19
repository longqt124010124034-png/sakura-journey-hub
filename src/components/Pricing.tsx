import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Star, Clock, CreditCard } from 'lucide-react'

const Pricing = () => {
  const { t } = useTranslation()

  const pricingPlans = [
    {
      title: 'Thanh toán theo giờ',
      price: '60,000',
      unit: '/ giờ',
      description: 'Phù hợp cho học thử hoặc lịch học không cố định',
      features: [
        'Học 1-1 hoặc nhóm nhỏ',
        'Linh hoạt thời gian', 
        'Tài liệu học tập',
        'Hỗ trợ sau giờ học'
      ],
      isPopular: false
    },
    {
      title: 'Thanh toán theo tháng',
      price: '700,000',
      unit: '/ tháng',
      description: 'Tiết kiệm hơn - Khuyến khích học đều đặn (12 buổi)',
      features: [
        'Tất cả quyền lợi gói giờ',
        'Giảm giá 2.8% so với theo giờ',
        'Ưu tiên đặt lịch học',
        'Mock test JLPT miễn phí',
        'Tư vấn học tập cá nhân',
        'Tài liệu bổ sung'
      ],
      isPopular: true
    }
  ]

  const paymentRules = [
    'Đóng trước 1 tháng học phí',
    'Chuyển khoản qua ngân hàng hoặc thanh toán trực tiếp',
    'Cú pháp: [Họ tên] - [Tháng/năm]',
    'Ví dụ: Nguyễn Văn A - 12/2024',
    'Học phí không hoàn lại khi nghỉ học'
  ]

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Học phí hợp lý, chất lượng đảm bảo. Đầu tư cho tương lai của bạn!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden shadow-card hover:shadow-glow transition-smooth group animate-fade-in-up ${
                plan.isPopular ? 'border-sakura shadow-glow' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-sakura to-sunrise text-white text-center py-2 text-sm font-medium">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Được chọn nhiều nhất</span>
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.isPopular ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-sakura transition-colors">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-sakura">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">VND</span>
                  </div>
                  <div className="text-muted-foreground text-sm">{plan.unit}</div>
                </div>

                <p className="text-center text-muted-foreground mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-sakura/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-sakura" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={scrollToContact}
                  className={`w-full transition-smooth ${
                    plan.isPopular 
                      ? 'sunrise-gradient hover:shadow-glow' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Chọn gói học
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Rules */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card className="p-8 shadow-card max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{t('pricing.payment.title')}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-sakura">Quy định chung:</h4>
                <ul className="space-y-2">
                  {paymentRules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sakura mt-2 flex-shrink-0"></div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-sakura">Thông tin chuyển khoản:</h4>
                <div className="bg-secondary/20 rounded-lg p-4 space-y-2 text-sm">
                  <div><strong>Ngân hàng:</strong> Vietcombank</div>
                  <div><strong>Số TK:</strong> 1234567890</div>
                  <div><strong>Chủ TK:</strong> Nguyễn Quang Triệu</div>
                  <div className="text-xs text-muted-foreground mt-3">
                    * Vui lòng ghi đúng cú pháp chuyển khoản để được xác nhận nhanh chóng
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-sakura/5 rounded-lg border border-sakura/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-sakura" />
                <span className="font-medium text-sakura">Ưu đãi đăng ký sớm</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Giảm 10% học phí cho 20 học viên đăng ký đầu tiên trong tháng này!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Pricing