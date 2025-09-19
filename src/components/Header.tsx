import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { Menu, X, Sunrise } from 'lucide-react'

const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'courses', href: '#courses' },
    { key: 'team', href: '#team' },
    { key: 'pricing', href: '#pricing' },
    { key: 'faq', href: '#faq' },
    { key: 'contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? 'glass-effect shadow-elegant' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-sakura to-sunrise shadow-glow">
              <Sunrise className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-japanese">
                Quang Dũng Japanese Center
              </h1>
              <p className="text-xs text-muted-foreground font-japanese">
                クアンユン日本語センター
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-sakura transition-smooth relative group"
              >
                {t(`header.${item.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sakura transition-smooth group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="sunrise-gradient hover:shadow-glow transition-smooth font-medium"
            >
              {t('header.register')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-smooth"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-sakura transition-smooth py-2"
                >
                  {t(`header.${item.key}`)}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="sunrise-gradient hover:shadow-glow transition-smooth font-medium mt-4 w-full"
              >
                {t('header.register')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header