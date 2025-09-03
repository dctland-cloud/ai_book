import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import AuthorSection from "@/components/author-section";
import PurchaseSection from "@/components/purchase-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Add scroll-smooth behavior to html element
    document.documentElement.classList.add("scroll-smooth");
    
    return () => {
      document.documentElement.classList.remove("scroll-smooth");
    };
  }, []);

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AuthorSection />
      <PurchaseSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
