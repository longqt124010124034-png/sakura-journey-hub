import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Team from '@/components/Team'
import Courses from '@/components/Courses'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <Courses />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
