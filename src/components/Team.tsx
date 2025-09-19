import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Award, BookOpen } from 'lucide-react'
import teacherQuangDung from '@/assets/teacher-quang-dung.jpg'
import teacherDinhTan from '@/assets/teacher-dinh-tan.jpg'

const Team = () => {
  const { t } = useTranslation()

  const teachers = [
    {
      name: t('team.quang_dung.name'),
      role: t('team.quang_dung.role'),
      description: t('team.quang_dung.description'),
      image: teacherQuangDung,
      specialties: ['JLPT N5-N3', 'Manga Translation', 'Business Japanese', 'Cultural Studies'],
      experience: '5+ năm',
      rating: 4.9
    },
    {
      name: t('team.dinh_tan.name'),
      role: t('team.dinh_tan.role'), 
      description: t('team.dinh_tan.description'),
      image: teacherDinhTan,
      specialties: ['Japanese Grammar', 'JLPT Preparation', 'Conversation', 'Pronunciation'],
      experience: '4+ năm',
      rating: 4.8
    }
  ]

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('team.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Đội ngũ giáo viên giàu kinh nghiệm và đam mê giảng dạy tiếng Nhật
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teachers.map((teacher, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-card hover:shadow-glow transition-smooth group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-elegant">
                      <img 
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-sakura to-sunrise rounded-full flex items-center justify-center shadow-glow">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-sakura transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-sakura font-medium mb-2 font-japanese">
                      {teacher.role}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{teacher.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-sunrise fill-current" />
                        <span>{teacher.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
                  {teacher.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-sakura/10 text-sakura border-sakura/20 hover:bg-sakura/20 transition-colors"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials from students about teachers */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-center mb-8">Học viên nói gì về giáo viên</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-sunrise fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground italic mb-4">
                "Thầy Quang Dũng dạy rất sinh động, sử dụng manga để giải thích văn hóa Nhật rất hay. Em đã đỗ N5 sau 6 tháng học."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sakura to-sunrise rounded-full flex items-center justify-center text-white text-sm font-bold">
                  H
                </div>
                <div>
                  <p className="font-medium">Hoàng Minh</p>
                  <p className="text-sm text-muted-foreground">Học viên khóa N5</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-sunrise fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground italic mb-4">
                "Thầy Tân giải thích ngữ pháp rất rõ ràng, luyện tập nhiều. Cảm ơn thầy đã giúp em đỗ N4!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sakura to-sunrise rounded-full flex items-center justify-center text-white text-sm font-bold">
                  T
                </div>
                <div>
                  <p className="font-medium">Thu Thảo</p>
                  <p className="text-sm text-muted-foreground">Học viên khóa N4</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team