import { motion } from "framer-motion";
import { Book, Tablet, Headphones, Store, ShoppingCart, BookAudio } from "lucide-react";
import { Button } from "@/components/ui/button";

const purchaseOptions = [
  {
    icon: Book,
    title: "종이책",
    description: "전통적인 독서의 감성을 그대로",
    price: "₩24,000",
    buttonText: "주문하기",
    color: "text-primary"
  },
  {
    icon: Tablet,
    title: "전자책",
    description: "언제 어디서나 편리하게",
    price: "₩18,000",
    buttonText: "즉시 다운로드",
    color: "text-secondary",
    recommended: true
  },
  {
    icon: Headphones,
    title: "오디오북",
    description: "이동 중에도 학습 가능",
    price: "₩22,000",
    buttonText: "구독하기",
    color: "text-accent"
  }
];

const bookstores = [
  { icon: Store, name: "교보문고" },
  { icon: ShoppingCart, name: "Yes24" },
  { icon: BookAudio, name: "알라딘" },
  { icon: Store, name: "Amazon" },
  { icon: Tablet, name: "리디북스" }
];

export default function PurchaseSection() {
  return (
    <section id="purchase" className="py-20 relative" data-testid="purchase-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="purchase-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-purchase-title">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-purchase-subtitle">
            다양한 방법으로 책을 만나보실 수 있습니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {purchaseOptions.map((option, index) => (
            <motion.div
              key={option.title}
              className={`glass-effect rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 relative ${
                option.recommended ? 'ring-2 ring-secondary' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`purchase-option-${index}`}
            >
              {option.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2" data-testid="recommended-badge">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    추천
                  </div>
                </div>
              )}
              <option.icon className={`${option.color} text-4xl mx-auto mb-6`} />
              <h3 className="text-xl font-bold text-foreground mb-4" data-testid={`text-option-title-${index}`}>
                {option.title}
              </h3>
              <p className="text-muted-foreground mb-6" data-testid={`text-option-description-${index}`}>
                {option.description}
              </p>
              <p className={`text-3xl font-bold ${option.color} mb-6`} data-testid={`text-option-price-${index}`}>
                {option.price}
              </p>
              <Button 
                className={`w-full py-3 rounded-full font-semibold ${
                  option.recommended 
                    ? 'primary-button text-primary-foreground' 
                    : 'glass-button text-foreground'
                }`}
                data-testid={`button-purchase-${index}`}
              >
                {option.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          data-testid="bookstores"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8" data-testid="text-bookstores-title">
            구매 가능 서점
          </h3>
          <div className="glass-effect rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              {bookstores.map((store, index) => (
                <div key={index} className="text-center" data-testid={`bookstore-${index}`}>
                  <store.icon className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{store.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
