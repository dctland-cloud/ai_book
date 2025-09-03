import { motion } from "framer-motion";
import { Rocket, Lightbulb, Target, Users, Smartphone, Infinity } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "빠른 학습",
    description: "기존보다 3배 빠른 속도로 핵심 내용을 습득할 수 있는 혁신적인 방법론",
    color: "text-primary"
  },
  {
    icon: Lightbulb,
    title: "창의적 사고",
    description: "단순 암기가 아닌 창의적 사고력을 기르는 체계적인 접근법",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "목표 달성",
    description: "명확한 목표 설정과 단계별 실행으로 확실한 성과 보장",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "협업 학습",
    description: "개인 학습과 그룹 학습의 최적 조합으로 시너지 효과 극대화",
    color: "text-primary"
  },
  {
    icon: Smartphone,
    title: "디지털 통합",
    description: "최신 디지털 도구와 전통적 학습법의 완벽한 결합",
    color: "text-secondary"
  },
  {
    icon: Infinity,
    title: "평생 학습",
    description: "나이와 상관없이 지속적으로 성장할 수 있는 학습 시스템",
    color: "text-accent"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="features-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-features-title">
            핵심 특징
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-features-subtitle">
            혁신적인 학습법의 주요 장점들을 확인해보세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-effect rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`feature-card-${index}`}
            >
              <div className="glass-effect rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <feature.icon className={`${feature.color} text-2xl`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid={`text-feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
