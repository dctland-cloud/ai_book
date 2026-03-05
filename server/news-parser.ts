export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  sentiment?: "positive" | "negative" | "neutral";
  source?: string;
}

export interface ParsedNews {
  date: string;
  title: string;
  items: NewsItem[];
  generatedAt: string;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "주식/증시": ["코스피", "코스닥", "나스닥", "다우", "S&P", "주가", "증시", "상장", "IPO", "주식", "KOSPI", "KOSDAQ"],
  "부동산": ["부동산", "아파트", "주택", "전세", "월세", "분양", "매매", "집값"],
  "금리/통화": ["금리", "환율", "달러", "원화", "기준금리", "한은", "Fed", "연준", "통화", "인플레이션", "CPI"],
  "산업/기업": ["삼성", "현대", "SK", "LG", "애플", "테슬라", "매출", "영업이익", "실적", "인수", "합병"],
  "정책/규제": ["정부", "정책", "규제", "법안", "세금", "세제", "예산", "재정"],
  "글로벌": ["미국", "중국", "일본", "유럽", "EU", "무역", "관세", "수출", "수입"],
  "암호화폐": ["비트코인", "이더리움", "코인", "암호화폐", "가상자산", "블록체인"],
  "AI/테크": ["AI", "인공지능", "ChatGPT", "반도체", "칩", "GPU", "클라우드"],
};

const POSITIVE_KEYWORDS = ["상승", "증가", "성장", "호조", "개선", "최고", "돌파", "반등", "호재", "강세", "수혜"];
const NEGATIVE_KEYWORDS = ["하락", "감소", "위축", "악화", "최저", "폭락", "하락세", "약세", "악재", "리스크", "위기"];

function detectCategory(text: string): string {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return category;
    }
  }
  return "경제 일반";
}

function detectSentiment(text: string): "positive" | "negative" | "neutral" {
  const posCount = POSITIVE_KEYWORDS.filter((kw) => text.includes(kw)).length;
  const negCount = NEGATIVE_KEYWORDS.filter((kw) => text.includes(kw)).length;
  if (posCount > negCount) return "positive";
  if (negCount > posCount) return "negative";
  return "neutral";
}

export function parseNewsText(rawText: string): ParsedNews {
  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const items: NewsItem[] = [];
  let currentTitle = "";
  let currentSummary = "";
  let id = 1;

  for (const line of lines) {
    // Detect numbered items or bullet points as new items
    const numberedMatch = line.match(/^(\d+[\.\)]\s*|[-•▶►●]\s*|#+\s*)(.+)/);

    if (numberedMatch) {
      // Save previous item if exists
      if (currentTitle) {
        const fullText = currentTitle + " " + currentSummary;
        items.push({
          id: id++,
          title: currentTitle,
          summary: currentSummary.trim(),
          category: detectCategory(fullText),
          sentiment: detectSentiment(fullText),
        });
      }
      currentTitle = numberedMatch[2].trim();
      currentSummary = "";
    } else if (currentTitle) {
      // continuation of current item's summary
      currentSummary += (currentSummary ? " " : "") + line;
    } else {
      // first line might be a standalone title/item
      currentTitle = line;
      currentSummary = "";
    }
  }

  // Push the last item
  if (currentTitle) {
    const fullText = currentTitle + " " + currentSummary;
    items.push({
      id: id++,
      title: currentTitle,
      summary: currentSummary.trim(),
      category: detectCategory(fullText),
      sentiment: detectSentiment(fullText),
    });
  }

  // If only one item with a long text, try splitting by sentences
  if (items.length === 1 && items[0].summary.length > 200) {
    const sentences = items[0].summary.split(/(?<=[.!?])\s+/);
    if (sentences.length >= 3) {
      const splitItems: NewsItem[] = [];
      let itemId = 1;
      for (const sentence of sentences) {
        if (sentence.length > 15) {
          splitItems.push({
            id: itemId++,
            title: sentence.length > 60 ? sentence.slice(0, 57) + "..." : sentence,
            summary: sentence,
            category: detectCategory(sentence),
            sentiment: detectSentiment(sentence),
          });
        }
      }
      if (splitItems.length >= 2) {
        return {
          date: new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          }),
          title: items[0].title,
          items: splitItems,
          generatedAt: new Date().toISOString(),
        };
      }
    }
  }

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return {
    date: today,
    title: "오늘의 경제 뉴스 브리핑",
    items,
    generatedAt: new Date().toISOString(),
  };
}
