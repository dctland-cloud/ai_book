import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "김민수",
    role: "스타트업 대표",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    content: "이 방법을 적용한 후 업무 효율성이 놀랍게 향상되었습니다. 단 3개월 만에 완전히 새로운 분야를 마스터할 수 있었어요."
  },
  {
    name: "이지영",
    role: "대학교 교수",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    content: "학생들에게 이 방법론을 적용해본 결과, 학업 성취도가 크게 향상되었습니다. 정말 혁신적인 접근법이라고 생각해요."
  },
  {
    name: "박종현",
    role: "연구원",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    content: "복잡한 연구 주제도 이제 쉽게 이해할 수 있게 되었습니다. 학습의 질이 완전히 달라졌어요."
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 relative" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="testimonials-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-testimonials-title">
            실제 경험담
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-testimonials-subtitle">
            이미 수많은 사람들이 경험한 놀라운 변화
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glass-effect rounded-3xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`testimonial-card-${index}`}
            >
              <div className="flex items-center mb-6" data-testid={`testimonial-profile-${index}`}>
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name} 프로필`}
                  className="w-16 h-16 rounded-full object-cover"
                  data-testid={`img-testimonial-${index}`}
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-foreground" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm" data-testid={`text-testimonial-role-${index}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote className="text-foreground italic text-lg leading-relaxed mb-4" data-testid={`text-testimonial-content-${index}`}>
                "{testimonial.content}"
              </blockquote>
              <div className="flex text-primary" data-testid={`rating-${index}`}>
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
