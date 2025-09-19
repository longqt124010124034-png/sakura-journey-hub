import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { BookOpen, Heart, Users, Award } from 'lucide-react'

const About = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: BookOpen,
      title: 'Phương pháp hiện đại',
      description: 'Kết hợp manga, anime và văn hóa Nhật Bản trong giảng dạy'
    },
    {
      icon: Heart,
      title: 'Đam mê giảng dạy',
      description: 'Biến việc học thành niềm vui và sự khám phá'
    },
    {
      icon: Users,
      title: 'Lớp học nhỏ',
      description: 'Đảm bảo sự chú ý và tương tác tối đa'
    },
    {
      icon: Award,
      title: 'Cam kết chất lượng',
      description: 'Hỗ trợ học viên đến khi đạt mục tiêu'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl font-bold mb-6 text-sakura">
              {t('about.mission')}
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t('about.mission.text')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sakura rounded-full"></div>
                <span>Học tiếng Nhật qua manga và anime</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sakura rounded-full"></div>
                <span>Luyện thi JLPT hiệu quả N5-N3</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sakura rounded-full"></div>
                <span>Hiểu sâu văn hóa Nhật Bản</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 shadow-card hover:shadow-glow transition-smooth group cursor-pointer"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-sakura transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Numbers */}
        <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sakura mb-2">5+</div>
              <div className="text-muted-foreground">Năm kinh nghiệm</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sakura mb-2">300+</div>
              <div className="text-muted-foreground">Học viên thành công</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sakura mb-2">95%</div>
              <div className="text-muted-foreground">Tỷ lệ đỗ JLPT</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sakura mb-2">24/7</div>
              <div className="text-muted-foreground">Hỗ trợ học tập</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About