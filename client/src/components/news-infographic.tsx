import { forwardRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Globe,
  Building2,
  Landmark,
  Bitcoin,
  Cpu,
  Home,
  Scale,
  BarChart3,
  Newspaper,
} from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  sentiment?: "positive" | "negative" | "neutral";
}

interface ParsedNews {
  date: string;
  title: string;
  items: NewsItem[];
  generatedAt: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "주식/증시": <BarChart3 className="w-5 h-5" />,
  "부동산": <Home className="w-5 h-5" />,
  "금리/통화": <Landmark className="w-5 h-5" />,
  "산업/기업": <Building2 className="w-5 h-5" />,
  "정책/규제": <Scale className="w-5 h-5" />,
  "글로벌": <Globe className="w-5 h-5" />,
  "암호화폐": <Bitcoin className="w-5 h-5" />,
  "AI/테크": <Cpu className="w-5 h-5" />,
  "경제 일반": <Newspaper className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  "주식/증시": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", accent: "bg-blue-500" },
  "부동산": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", accent: "bg-emerald-500" },
  "금리/통화": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", accent: "bg-purple-500" },
  "산업/기업": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", accent: "bg-orange-500" },
  "정책/규제": { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", accent: "bg-slate-500" },
  "글로벌": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", accent: "bg-cyan-500" },
  "암호화폐": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", accent: "bg-amber-500" },
  "AI/테크": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", accent: "bg-violet-500" },
  "경제 일반": { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", accent: "bg-gray-500" },
};

function SentimentIcon({ sentiment }: { sentiment?: string }) {
  if (sentiment === "positive") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (sentiment === "negative") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
}

function getSentimentLabel(sentiment?: string) {
  if (sentiment === "positive") return "긍정";
  if (sentiment === "negative") return "부정";
  return "중립";
}

interface NewsInfographicProps {
  data: ParsedNews;
}

const NewsInfographic = forwardRef<HTMLDivElement, NewsInfographicProps>(
  ({ data }, ref) => {
    const categoryStats = data.items.reduce(
      (acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const sentimentStats = data.items.reduce(
      (acc, item) => {
        const s = item.sentiment || "neutral";
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 } as Record<string, number>,
    );

    return (
      <div
        ref={ref}
        className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl"
        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-8 py-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-32 h-32 border border-white/30 rounded-full" />
            <div className="absolute bottom-4 left-12 w-20 h-20 border border-white/20 rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
              <BarChart3 className="w-4 h-4" />
              DAILY ECONOMIC BRIEFING
            </div>
            <h1 className="text-2xl font-bold mb-1">{data.title}</h1>
            <p className="text-blue-200 text-sm">{data.date}</p>

            {/* Sentiment summary bar */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-green-200">긍정 {sentimentStats.positive}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="text-red-200">부정 {sentimentStats.negative}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="text-gray-300">중립 {sentimentStats.neutral}</span>
              </div>
              <div className="ml-auto text-xs text-blue-300">
                총 {data.items.length}건
              </div>
            </div>
            {/* Sentiment bar visualization */}
            <div className="mt-2 flex h-1.5 rounded-full overflow-hidden bg-white/10">
              {sentimentStats.positive > 0 && (
                <div
                  className="bg-green-400 transition-all"
                  style={{ width: `${(sentimentStats.positive / data.items.length) * 100}%` }}
                />
              )}
              {sentimentStats.neutral > 0 && (
                <div
                  className="bg-gray-400 transition-all"
                  style={{ width: `${(sentimentStats.neutral / data.items.length) * 100}%` }}
                />
              )}
              {sentimentStats.negative > 0 && (
                <div
                  className="bg-red-400 transition-all"
                  style={{ width: `${(sentimentStats.negative / data.items.length) * 100}%` }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Category tags */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-2">
          {Object.entries(categoryStats).map(([cat, count]) => {
            const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS["경제 일반"];
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}
              >
                {CATEGORY_ICONS[cat] || <Newspaper className="w-3 h-3" />}
                {cat} ({count})
              </span>
            );
          })}
        </div>

        {/* News items */}
        <div className="px-8 py-6 space-y-4">
          {data.items.map((item, index) => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS["경제 일반"];
            return (
              <div
                key={item.id}
                className={`relative pl-5 border-l-3 ${colors.border} py-1`}
                style={{ borderLeftWidth: "3px" }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${colors.bg} ${colors.text}`}
                      >
                        {item.category}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                        <SentimentIcon sentiment={item.sentiment} />
                        {getSentimentLabel(item.sentiment)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    {item.summary && item.summary !== item.title && (
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-[10px] text-gray-400">
            Powered by Perplexity AI + News Infographic Generator
          </div>
          <div className="text-[10px] text-gray-400">
            {new Date(data.generatedAt).toLocaleTimeString("ko-KR")} 생성
          </div>
        </div>
      </div>
    );
  },
);

NewsInfographic.displayName = "NewsInfographic";

export default NewsInfographic;
