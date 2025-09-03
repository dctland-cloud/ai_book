import { motion } from "framer-motion";
import { BookOpen, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 relative" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="glass-effect rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="footer-content"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left" data-testid="footer-brand">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold text-foreground">LearnFlow</span>
              </div>
              <p className="text-muted-foreground" data-testid="text-footer-tagline">혁신적인 학습의 새로운 시작</p>
            </div>
            
            <div className="text-center" data-testid="footer-social">
              <div className="flex justify-center space-x-6">
                <a 
                  href="#" 
                  className="glass-effect rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                  data-testid="link-twitter"
                >
                  <Twitter className="text-primary" />
                </a>
                <a 
                  href="#" 
                  className="glass-effect rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                  data-testid="link-facebook"
                >
                  <Facebook className="text-primary" />
                </a>
                <a 
                  href="#" 
                  className="glass-effect rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                  data-testid="link-instagram"
                >
                  <Instagram className="text-primary" />
                </a>
                <a 
                  href="#" 
                  className="glass-effect rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                  data-testid="link-youtube"
                >
                  <Youtube className="text-primary" />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right" data-testid="footer-copyright">
              <p className="text-muted-foreground text-sm">
                © 2024 LearnFlow. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                Powered by Innovation & Design
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
