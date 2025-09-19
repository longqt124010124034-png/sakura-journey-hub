import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { MessageCircle } from 'lucide-react'

const FAQ = () => {
  const { t } = useTranslation()

  const faqs = [
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    },
    {
      question: t('faq.schedule.question'),
      answer: t('faq.schedule.answer')
    },
    {
      question: t('faq.jlpt.question'),
      answer: t('faq.jlpt.answer')
    },
    {
      question: 'Trung tâm có học online không?',
      answer: 'Hiện tại chúng tôi chủ yếu tổ chức lớp học offline để tương tác trực tiếp. Tuy nhiên, trong trường hợp đặc biệt, chúng tôi có thể hỗ trợ học online qua Zoom.'
    },
    {
      question: 'Có cần kiến thức nền không?',
      answer: 'Không cần kiến thức nền. Chúng tôi có khóa PreN5 dành riêng cho người mới bắt đầu, bắt đầu từ bảng chữ cái Hiragana, Katakana.'
    },
    {
      question: 'Thời gian học bao lâu để đạt N5?',
      answer: 'Thường mất 4-6 tháng để hoàn thành trình độ N5, tùy thuộc vào khả năng tiếp thu và thời gian học tại nhà của học viên.'
    },
    {
      question: 'Có hỗ trợ tìm việc làm không?',
      answer: 'Chúng tôi có mạng lưới đối tác doanh nghiệp Nhật Bản và sẽ giới thiệu cơ hội việc làm phù hợp cho học viên đã hoàn thành khóa học N3 trở lên.'
    },
    {
      question: 'Có thể thay đổi lịch học không?',
      answer: 'Có thể thay đổi lịch học với thông báo trước 24 giờ. Chúng tôi sẽ sắp xếp lịch bù phù hợp hoặc chuyển sang lớp khác cùng trình độ.'
    }
  ]

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-japanese">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Những câu hỏi thường gặp từ học viên và phụ huynh
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sakura to-sunrise flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Câu hỏi & Giải đáp</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-4 hover:border-sakura/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:text-sakura transition-colors hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>

          {/* Contact for more questions */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="p-6 shadow-card bg-gradient-to-r from-sakura/5 to-sunrise/5 border-sakura/20">
              <h3 className="text-xl font-bold mb-3">Vẫn còn thắc mắc?</h3>
              <p className="text-muted-foreground mb-4">
                Liên hệ trực tiếp với chúng tôi để được tư vấn chi tiết
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">📞</span>
                  <span className="text-sm font-medium">0123 456 789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">✉️</span>
                  <span className="text-sm font-medium">info@quangdungjapanese.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">💬</span>
                  <span className="text-sm font-medium">Zalo: 0123 456 789</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ