import { motion } from "framer-motion";
import { Brain, TrendingUp, Clock } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="about-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
            왜 이 책인가?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-subtitle">
            10년간의 연구와 수천 명의 학습자들의 실제 경험을 바탕으로 완성된 혁신적인 학습 방법론
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="glass-effect rounded-3xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="about-features"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="text-scientific-evidence">과학적 근거</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4" data-testid="feature-brain-based">
                <div className="glass-effect rounded-full p-3">
                  <Brain className="text-primary text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">뇌과학 기반 학습법</h4>
                  <p className="text-muted-foreground">최신 뇌과학 연구를 바탕으로 한 효율적인 학습 방법</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4" data-testid="feature-proven-results">
                <div className="glass-effect rounded-full p-3">
                  <TrendingUp className="text-secondary text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">검증된 성과</h4>
                  <p className="text-muted-foreground">3000명의 학습자가 평균 300% 향상된 학습 효과를 경험</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="feature-time-saving">
                <div className="glass-effect rounded-full p-3">
                  <Clock className="text-accent text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">시간 절약</h4>
                  <p className="text-muted-foreground">기존 학습 시간의 50%로 동일한 성과 달성 가능</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="about-image"
          >
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="현대적인 도서관에서 공부하는 학생" 
              className="rounded-3xl shadow-2xl w-full h-auto"
              data-testid="img-studying-student"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
