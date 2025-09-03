import { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-[30px]" 
          : "bg-white/80 backdrop-blur-[20px]"
      } border-b border-white/30`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2" data-testid="logo">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">LearnFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-about"
            >
              소개
            </button>
            <button 
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-features"
            >
              특징
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-testimonials"
            >
              후기
            </button>
            <button 
              onClick={() => scrollToSection("author")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-author"
            >
              저자
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-contact"
            >
              문의
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection("purchase")}
              className="primary-button text-primary-foreground px-6 py-2 rounded-full font-medium hidden md:inline-flex"
              data-testid="button-purchase"
            >
              구매하기
            </Button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass-button p-2 rounded-lg"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-effect rounded-2xl p-4" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
                data-testid="mobile-link-about"
              >
                소개
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
                data-testid="mobile-link-features"
              >
                특징
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
                data-testid="mobile-link-testimonials"
              >
                후기
              </button>
              <button 
                onClick={() => scrollToSection("author")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
                data-testid="mobile-link-author"
              >
                저자
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
                data-testid="mobile-link-contact"
              >
                문의
              </button>
              <Button 
                onClick={() => scrollToSection("purchase")}
                className="primary-button text-primary-foreground px-6 py-2 rounded-full font-medium w-full"
                data-testid="mobile-button-purchase"
              >
                구매하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
