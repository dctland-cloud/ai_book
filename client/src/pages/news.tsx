import { useState, useRef, useCallback } from "react";
import { parseNewsText, type ParsedNews } from "@/lib/news-parser";
import NewsInfographic from "@/components/news-infographic";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Newspaper,
  Sparkles,
  Download,
  RotateCcw,
  ClipboardPaste,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import html2canvas from "html2canvas";

const SAMPLE_NEWS = `1. 한은, 기준금리 3.00%로 동결... "경기 하방 리스크 주시"
한국은행 금융통화위원회가 기준금리를 3.00%에서 동결했다. 이창용 총재는 "글로벌 경기 불확실성이 높아 신중한 접근이 필요하다"고 밝혔다.

2. 코스피 2,650 돌파, 외국인 3거래일 연속 순매수
외국인 투자자들의 적극적인 매수세에 힘입어 코스피가 2,650선을 넘었다. 반도체와 2차전지 업종이 상승을 주도했다.

3. 삼성전자, AI 반도체 HBM4 양산 시작
삼성전자가 차세대 고대역폭 메모리 HBM4의 양산을 시작했다고 발표했다. 엔비디아와의 공급 계약이 체결된 것으로 알려졌다.

4. 서울 아파트 매매가, 3주 연속 상승세
서울 아파트 매매가격이 3주 연속 오르며 회복세를 보이고 있다. 강남 3구를 중심으로 상승폭이 확대되고 있다.

5. 미 연준 파월 의장, "인플레이션 2% 목표 달성에 시간 필요"
파월 Fed 의장이 물가 안정에 대한 신중한 입장을 재확인했다. 시장은 올해 금리 인하 횟수를 2회로 전망하고 있다.`;

export default function NewsPage() {
  const [rawText, setRawText] = useState("");
  const [parsedData, setParsedData] = useState<ParsedNews | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const infographicRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGenerate = useCallback(() => {
    if (!rawText.trim()) {
      toast({
        title: "텍스트를 입력해주세요",
        description: "퍼플렉시티에서 받은 뉴스 요약을 붙여넣어 주세요.",
        variant: "destructive",
      });
      return;
    }
    const result = parseNewsText(rawText.trim());
    setParsedData(result);
    toast({
      title: "인포그래픽 생성 완료!",
      description: `${result.items.length}개의 뉴스 항목이 파싱되었습니다.`,
    });
  }, [rawText, toast]);

  const handleLoadSample = useCallback(() => {
    setRawText(SAMPLE_NEWS);
    toast({ title: "예시 뉴스가 로드되었습니다", description: "생성 버튼을 눌러 인포그래픽을 확인하세요." });
  }, [toast]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
      toast({ title: "클립보드에서 붙여넣기 완료" });
    } catch {
      toast({
        title: "붙여넣기 실패",
        description: "브라우저에서 클립보드 접근이 허용되지 않았습니다.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleDownloadImage = useCallback(async () => {
    if (!infographicRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(infographicRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `news-infographic-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "이미지 다운로드 완료!", description: "SNS에 바로 공유할 수 있습니다." });
    } catch {
      toast({ title: "다운로드 실패", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  }, [toast]);

  const handleReset = useCallback(() => {
    setParsedData(null);
    setRawText("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Top navigation */}
      <nav className="sticky top-0 z-50 nav-glass px-6 py-3 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </a>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <Newspaper className="w-4 h-4 text-blue-600" />
          뉴스 인포그래픽 생성기
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!parsedData ? (
          /* Input phase */
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-2">
                <Newspaper className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                뉴스 인포그래픽 생성기
              </h1>
              <p className="text-gray-500 max-w-md mx-auto">
                퍼플렉시티에서 받은 뉴스 요약을 붙여넣으면 깔끔한 인포그래픽으로 변환해드립니다.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  뉴스 텍스트 입력
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePaste}
                    className="text-xs"
                  >
                    <ClipboardPaste className="w-3 h-3 mr-1" />
                    붙여넣기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoadSample}
                    className="text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    예시 로드
                  </Button>
                </div>
              </div>
              <Textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={`퍼플렉시티에서 받은 뉴스 이메일 내용을 여기에 붙여넣으세요.\n\n예시:\n1. 한은, 기준금리 동결...\n2. 코스피 상승...\n3. 삼성전자 HBM4 양산 시작...`}
                className="min-h-[300px] text-sm leading-relaxed resize-y bg-white/60"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {rawText.length > 0 ? `${rawText.length}자 입력됨` : "텍스트를 입력해주세요"}
                </span>
                <Button
                  onClick={handleGenerate}
                  disabled={!rawText.trim()}
                  className="primary-button text-white px-6"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  인포그래픽 생성
                </Button>
              </div>
            </div>

            {/* How to use */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">사용 방법</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">뉴스 복사</p>
                    <p className="text-xs text-gray-500">퍼플렉시티 이메일에서 뉴스 내용을 복사하세요</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">붙여넣기</p>
                    <p className="text-xs text-gray-500">위 입력창에 붙여넣고 생성 버튼을 누르세요</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">다운로드</p>
                    <p className="text-xs text-gray-500">인포그래픽을 이미지로 저장해 SNS에 공유하세요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Result phase */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleReset}
                className="glass-button"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                새로 만들기
              </Button>
              <Button
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="primary-button text-white px-6"
              >
                {isDownloading ? (
                  "이미지 생성 중..."
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    이미지 다운로드
                  </>
                )}
              </Button>
            </div>

            {/* Infographic display */}
            <NewsInfographic ref={infographicRef} data={parsedData} />

            {/* SNS tip */}
            <div className="glass-effect rounded-xl p-4 flex items-start gap-3">
              <ImageIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">SNS 공유 팁</p>
                <p className="text-xs text-gray-500 mt-1">
                  다운로드한 이미지는 인스타그램 피드(1:1 비율 권장), 트위터, 또는 카카오톡으로 바로 공유할 수 있습니다.
                  고해상도(2x)로 생성되어 선명하게 보입니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
