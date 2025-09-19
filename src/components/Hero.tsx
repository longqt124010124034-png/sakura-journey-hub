import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import heroImage from '@/assets/hero-japan.jpg'

const Hero = () => {
  const { t } = useTranslation()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Floating Sakura Petals Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sakura-fall opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div className="w-4 h-4 bg-sakura rounded-full shadow-glow"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-japanese">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-2">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground font-japanese">
            日本語を学ぼう • Let's Learn Japanese
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection('#contact')}
            className="sunrise-gradient hover:shadow-glow transition-bounce text-lg px-8 py-6 group"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('#about')}
            className="glass-effect border-white/20 text-foreground hover:bg-white/10 transition-smooth text-lg px-8 py-6 group"
          >
            <Play className="mr-2 h-5 w-5" />
            Tìm hiểu thêm
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="text-3xl font-bold text-sakura mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
          </div>
          <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-3xl font-bold text-sakura mb-2">300+</div>
            <div className="text-sm text-muted-foreground">Học viên</div>
          </div>
          <div className="text-center animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="text-3xl font-bold text-sakura mb-2">N5-N3</div>
            <div className="text-sm text-muted-foreground">Cấp độ JLPT</div>
          </div>
          <div className="text-center animate-float" style={{ animationDelay: '2s' }}>
            <div className="text-3xl font-bold text-sakura mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Cam kết chất lượng</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero