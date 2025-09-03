import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "메시지 전송 완료",
          description: data.message,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error: any) => {
      toast({
        title: "전송 실패",
        description: error.message || "메시지 전송에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 relative" data-testid="contact-section">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-testid="contact-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-contact-title">
            문의하기
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-contact-subtitle">
            궁금한 점이 있으시면 언제든 연락주세요
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            className="glass-effect rounded-3xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="contact-info"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8" data-testid="text-contact-info-title">연락처 정보</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4" data-testid="contact-email">
                <div className="glass-effect rounded-full w-12 h-12 flex items-center justify-center">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">이메일</p>
                  <p className="text-muted-foreground">contact@learnflow.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4" data-testid="contact-phone">
                <div className="glass-effect rounded-full w-12 h-12 flex items-center justify-center">
                  <Phone className="text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">전화</p>
                  <p className="text-muted-foreground">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-4" data-testid="contact-hours">
                <div className="glass-effect rounded-full w-12 h-12 flex items-center justify-center">
                  <Clock className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">운영시간</p>
                  <p className="text-muted-foreground">평일 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-effect rounded-3xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="contact-form"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8" data-testid="text-contact-form-title">메시지 보내기</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  이름
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="glass-effect w-full px-4 py-3 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="성함을 입력해주세요"
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="glass-effect w-full px-4 py-3 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="이메일을 입력해주세요"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  메시지
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="glass-effect w-full px-4 py-3 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                  placeholder="문의 내용을 입력해주세요"
                  data-testid="input-message"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="primary-button w-full py-4 rounded-full font-semibold text-primary-foreground text-lg"
                data-testid="button-send-message"
              >
                {contactMutation.isPending ? "전송 중..." : "메시지 보내기"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
