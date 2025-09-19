import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Users, Award } from 'lucide-react'

const Courses = () => {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const courses = [
    {
      code: 'JPN-001',
      name: 'Tiếng Nhật cơ bản (Pre-N5)',
      material: 'Minna no Nihongo 1',
      level: 'PreN5',
      duration: '3 tháng',
      students: '8-12 học viên',
      description: 'Khóa học dành cho người mới bắt đầu, học Hiragana, Katakana và từ vựng cơ bản.',
      highlights: ['Bảng chữ cái Nhật', 'Từ vựng cơ bản', 'Ngữ pháp N5', 'Giao tiếp hằng ngày']
    },
    {
      code: 'JPN-002', 
      name: 'Tiếng Nhật sơ cấp (N5)',
      material: 'Minna no Nihongo 2',
      level: 'N5',
      duration: '4 tháng',
      students: '8-12 học viên', 
      description: 'Hoàn thiện kiến thức N5, chuẩn bị thi JLPT N5.',
      highlights: ['Ngữ pháp N5 đầy đủ', 'Từ vựng 800 từ', 'Luyện thi JLPT', 'Đọc hiểu cơ bản']
    },
    {
      code: 'JPN-003',
      name: 'Tiếng Nhật trung cấp (N4)',
      material: 'Minna no Nihongo Trung cấp 1',
      level: 'N4', 
      duration: '5 tháng',
      students: '6-10 học viên',
      description: 'Nâng cao khả năng giao tiếp, đọc hiểu văn bản phức tạp hơn.',
      highlights: ['Ngữ pháp N4', 'Từ vựng 1500 từ', 'Kanji 300 chữ', 'Nghe hiểu nâng cao']
    },
    {
      code: 'JPN-004',
      name: 'Tiếng Nhật trung cấp cao (N3)',
      material: 'Minna no Nihongo Trung cấp 2', 
      level: 'N3',
      duration: '6 tháng',
      students: '6-8 học viên',
      description: 'Đạt trình độ giao tiếp tốt, có thể làm việc trong môi trường Nhật Bản.',
      highlights: ['Ngữ pháp N3', 'Từ vựng 3000 từ', 'Kanji 650 chữ', 'Đọc hiểu văn bản']
    },
    {
      code: 'JPN-005',
      name: 'Luyện thi JLPT N5',
      material: 'Đề thi thật + Tài liệu riêng',
      level: 'N5',
      duration: '1 tháng',
      students: '4-8 học viên',
      description: 'Khóa intensive luyện thi, làm đề thi thật, tips thi cử.',
      highlights: ['Đề thi thật', 'Kỹ thuật làm bài', 'Mock test', 'Chữa đề chi tiết']
    },
    {
      code: 'JPN-006',
      name: 'Luyện thi JLPT N4',
      material: 'Đề thi thật + Tài liệu riêng',
      level: 'N4',
      duration: '1.5 tháng', 
      students: '4-8 học viên',
      description: 'Khóa intensive luyện thi N4, đảm bảo kỹ năng và tâm lý thi cử.',
      highlights: ['Đề thi thật N4', 'Nghe hiểu intensive', 'Đọc hiểu nhanh', 'Strategy thi']
    },
    {
      code: 'JPN-007',
      name: 'Luyện thi JLPT N3',
      material: 'Đề thi thật + Tài liệu riêng',
      level: 'N3',
      duration: '2 tháng',
      students: '4-6 học viên',
      description: 'Khóa intensive luyện thi N3, tập trung vào các kỹ năng khó.',
      highlights: ['Đề thi thật N3', 'Kanji intensive', 'Ngữ pháp phức tạp', 'Tâm lý thi cử']
    },
    {
      code: 'JPN-008',
      name: 'Tiếng Nhật qua Manga & Anime',
      material: 'Manga chọn lọc + Video',
      level: 'N4-N3',
      duration: '3 tháng',
      students: '6-10 học viên',
      description: 'Học tiếng Nhật qua manga, anime, hiểu văn hóa pop Nhật Bản.',
      highlights: ['Manga nổi tiếng', 'Từ vựng anime', 'Văn hóa pop', 'Giao tiếp tự nhiên']
    }
  ]

  const filters = [
    { key: 'all', label: t('courses.filter.all') },
    { key: 'PreN5', label: t('courses.filter.preN5') },
    { key: 'N5', label: t('courses.filter.N5') },
    { key: 'N4', label: t('courses.filter.N4') },
    { key: 'N3', label: t('courses.filter.N3') }
  ]

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.level === activeFilter)

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('courses.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Các khóa học được thiết kế chuyên biệt từ cơ bản đến nâng cao, phù hợp mọi trình độ
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className={`transition-smooth ${
                activeFilter === filter.key 
                  ? 'sunrise-gradient shadow-glow' 
                  : 'hover:bg-accent/20'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.code}
              className="overflow-hidden shadow-card hover:shadow-glow transition-smooth group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-sakura/10 text-sakura border-sakura/20"
                      >
                        {course.code}
                      </Badge>
                      <Badge 
                        className={`
                          ${course.level === 'PreN5' ? 'bg-green-500/10 text-green-600' : ''}
                          ${course.level === 'N5' ? 'bg-blue-500/10 text-blue-600' : ''}
                          ${course.level === 'N4' ? 'bg-orange-500/10 text-orange-600' : ''}
                          ${course.level === 'N3' ? 'bg-purple-500/10 text-purple-600' : ''}
                        `}
                      >
                        {course.level}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-sakura transition-colors">
                      {course.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-sakura" />
                    <span>{course.material}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-sakura" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-sakura" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Highlights */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-medium text-sm">Nội dung chính:</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.highlights.map((highlight, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs border-sakura/30 text-sakura/80"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={scrollToContact}
                  className="w-full sunrise-gradient hover:shadow-glow transition-smooth"
                >
                  Đăng ký khóa học
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Không chắc khóa học phù hợp?</h3>
            <p className="text-muted-foreground mb-6">
              Liên hệ với chúng tôi để được tư vấn khóa học phù hợp với trình độ và mục tiêu của bạn
            </p>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="sunrise-gradient hover:shadow-glow transition-smooth"
            >
              Tư vấn miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Courses