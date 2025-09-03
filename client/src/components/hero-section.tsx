import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" data-testid="hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-accent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="hero-content"
        >
          <div className="glass-effect rounded-3xl p-8 mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight" data-testid="text-hero-title">
              학습의 새로운<br />
              <span className="text-primary">패러다임</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              혁신적인 학습 방법론으로 당신의 잠재력을 깨워보세요.<br />
              효율적이고 지속가능한 학습의 비밀을 공개합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection("purchase")}
                className="primary-button text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
                data-testid="button-start-now"
              >
                지금 시작하기
              </Button>
              <Button 
                onClick={() => scrollToSection("about")}
                className="glass-button text-foreground px-8 py-4 rounded-full font-semibold text-lg"
                data-testid="button-learn-more"
              >
                더 알아보기
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="hero-image"
        >
          <div className="glass-effect rounded-3xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800" 
              alt="혁신적인 학습법 책 표지" 
              className="rounded-2xl shadow-2xl w-80 h-auto"
              data-testid="img-book-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
