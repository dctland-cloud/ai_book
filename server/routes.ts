import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { parseNewsText } from "./news-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ 
        success: true, 
        message: "메시지가 성공적으로 전송되었습니다.",
        contact: { id: contact.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "입력 정보를 확인해주세요.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
        });
      }
    }
  });

  // Get contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "연락처 정보를 불러오는데 실패했습니다." 
      });
    }
  });

  // News infographic API
  app.post("/api/news/parse", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "뉴스 텍스트를 입력해주세요.",
        });
      }
      const parsed = parseNewsText(text.trim());
      res.json({ success: true, data: parsed });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "뉴스 파싱 중 오류가 발생했습니다.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
