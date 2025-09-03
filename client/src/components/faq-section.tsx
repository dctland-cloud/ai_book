import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "이 학습법은 어떤 사람에게 적합한가요?",
    answer: "학생, 직장인, 전문가 등 누구나 적용할 수 있습니다. 특히 효율적인 학습을 원하는 분들께 매우 유용합니다. 나이와 배경에 상관없이 적용 가능한 보편적인 방법론입니다."
  },
  {
    question: "얼마나 빨리 효과를 볼 수 있나요?",
    answer: "개인차가 있지만, 대부분의 사용자가 2-3주 내에 명확한 변화를 경험합니다. 일부는 첫 주부터 학습 속도의 향상을 느낄 수 있습니다."
  },
  {
    question: "추가 도구나 장비가 필요한가요?",
    answer: "특별한 도구는 필요하지 않습니다. 책과 노트, 펜만 있으면 충분합니다. 선택적으로 디지털 도구를 활용할 수 있지만 필수는 아닙니다."
  },
  {
    question: "환불이나 보장 정책이 있나요?",
    answer: "30일 무조건 환불 보장 정책을 제공합니다. 만족하지 않으시면 구매일로부터 30일 이내에 전액 환불받으실 수 있습니다."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 relative" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="faq-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-faq-title">
            자주 묻는 질문
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-faq-subtitle">
            궁금한 점들을 미리 확인해보세요
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`faq-item-${index}`}
            >
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
                onClick={() => toggleFAQ(index)}
                data-testid={`button-faq-${index}`}
              >
                <span className="text-lg font-semibold text-foreground" data-testid={`text-faq-question-${index}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <motion.div 
                  className="p-6 pt-0 border-t border-border/20"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`faq-answer-${index}`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
