import { motion } from "framer-motion";
import { Award, Book, GraduationCap, University, FlaskConical, Globe } from "lucide-react";

const achievements = [
  { icon: Award, text: "교육부 우수연구자상 수상" },
  { icon: Book, text: "베스트셀러 저자 (누적 판매 50만부)" },
  { icon: GraduationCap, text: "서울대학교 교육학과 교수" }
];

const affiliations = [
  { icon: University, text: "서울대학교" },
  { icon: FlaskConical, text: "한국과학기술원" },
  { icon: Globe, text: "MIT 연구소" },
  { icon: GraduationCap, text: "한국교육개발원" }
];

export default function AuthorSection() {
  return (
    <section id="author" className="py-20 relative" data-testid="author-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="author-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-author-title">
            저자 소개
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="author-image"
          >
            <div className="glass-effect rounded-3xl p-6">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
                alt="저자 프로필 사진" 
                className="rounded-2xl w-80 h-96 object-cover"
                data-testid="img-author-profile"
              />
            </div>
          </motion.div>

          <motion.div 
            className="glass-effect rounded-3xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="author-info"
          >
            <h3 className="text-3xl font-bold text-foreground mb-6" data-testid="text-author-name">Dr. 최혁신</h3>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-muted-foreground" data-testid="text-author-bio-1">
                하버드 교육심리학 박사, 스탠포드 인지과학 연구소 연구원을 거쳐 
                현재 서울대학교 교육학과 교수로 재직 중입니다.
              </p>
              <p className="text-lg text-muted-foreground" data-testid="text-author-bio-2">
                15년간 학습 방법론 연구에 전념해온 전문가로, 
                국내외 주요 학술지에 50여 편의 논문을 발표했습니다.
              </p>
            </div>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`achievement-${index}`}>
                  <achievement.icon className="text-primary" />
                  <span className="text-foreground">{achievement.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          data-testid="author-affiliations"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8" data-testid="text-affiliations-title">
            연구 기관 및 협력사
          </h3>
          <div className="glass-effect rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {affiliations.map((affiliation, index) => (
                <div key={index} className="text-center" data-testid={`affiliation-${index}`}>
                  <affiliation.icon className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{affiliation.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
