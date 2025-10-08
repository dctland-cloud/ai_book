import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type Suit = "hearts" | "diamonds" | "clubs" | "spades";

interface CardFace {
  code: string;
  rank: string;
  suit: Suit;
}

interface Card extends CardFace {
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const suitSymbols: Record<Suit, { icon: string; color: string }> = {
  hearts: { icon: "♥", color: "text-rose-500" },
  diamonds: { icon: "♦", color: "text-rose-500" },
  clubs: { icon: "♣", color: "text-emerald-500" },
  spades: { icon: "♠", color: "text-emerald-500" },
};

function shuffleArray<T>(input: T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createDeck(): Card[] {
  const fullDeck: CardFace[] = suits
    .flatMap((suit) => ranks.map((rank) => ({ rank, suit, code: `${rank}-${suit}` })))
    .slice();

  const selectedFaces = shuffleArray(fullDeck).slice(0, 26);

  const pairedCards = selectedFaces.flatMap((card) => [
    {
      ...card,
      id: `${card.code}-a`,
      isFlipped: false,
      isMatched: false,
    },
    {
      ...card,
      id: `${card.code}-b`,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffleArray(pairedCards);
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const totalPairs = useMemo(() => cards.length / 2, [cards.length]);
  const remainingPairs = totalPairs - matches;

  const resetGame = useCallback(() => {
    setCards(createDeck());
    setSelectedIds([]);
    setIsProcessing(false);
    setTurns(0);
    setMatches(0);
    setGameComplete(false);
  }, []);

  useEffect(() => {
    if (selectedIds.length !== 2) {
      return;
    }

    const [firstId, secondId] = selectedIds;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) {
      setSelectedIds([]);
      setIsProcessing(false);
      return;
    }

    if (firstCard.code === secondCard.code) {
      setCards((prev) =>
        prev.map((card) =>
          card.code === firstCard.code ? { ...card, isMatched: true } : card,
        ),
      );
      setMatches((prev) => prev + 1);
      setSelectedIds([]);
      setIsProcessing(false);
    } else {
      const timeout = window.setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        setSelectedIds([]);
        setIsProcessing(false);
      }, 900);

      return () => window.clearTimeout(timeout);
    }
  }, [selectedIds, cards]);

  useEffect(() => {
    if (matches > 0 && matches === totalPairs) {
      setGameComplete(true);
    }
  }, [matches, totalPairs]);

  useEffect(() => {
    document.title = "카드 짝 맞추기 게임";
    return () => {
      document.title = "LearnFlow";
    };
  }, []);

  const handleCardClick = (card: Card) => {
    if (isProcessing || card.isFlipped || card.isMatched) {
      return;
    }

    setCards((prev) =>
      prev.map((item) =>
        item.id === card.id ? { ...item, isFlipped: true } : item,
      ),
    );

    setSelectedIds((prev) => {
      const next = [...prev, card.id];
      if (next.length === 2) {
        setIsProcessing(true);
        setTurns((prevTurns) => prevTurns + 1);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="text-slate-200">
              <Link href="/">
                <span className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  메인으로 돌아가기
                </span>
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold md:text-3xl">
              52장 카드 짝 맞추기 게임
            </h1>
          </div>
          <Button
            onClick={resetGame}
            variant="secondary"
            className="bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> 다시 섞기
          </Button>
        </header>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <div className="grid gap-2 md:grid-cols-4 md:items-center">
            <p className="text-sm text-slate-300 md:col-span-2">
              52장의 카드를 무작위로 섞어 앞면이 보이지 않게 놓았습니다. 카드를 두 장씩
              뒤집어 같은 카드면 가져가세요. 모든 짝을 찾으면 게임이 끝납니다.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                <p className="text-xs text-slate-400">시도 횟수</p>
                <p className="text-xl font-semibold">{turns}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                <p className="text-xs text-slate-400">획득한 짝</p>
                <p className="text-xl font-semibold">
                  {matches} / {totalPairs}
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                <p className="text-xs text-slate-400">남은 짝</p>
                <p className="text-xl font-semibold">{remainingPairs}</p>
              </div>
            </div>
          </div>

          {gameComplete ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
              <h2 className="text-xl font-semibold text-emerald-300">
                축하합니다! 모든 짝을 완성했습니다.
              </h2>
              <p className="text-sm text-emerald-200">
                총 {turns}번의 시도로 {totalPairs}개의 짝을 모두 찾았어요.
              </p>
              <Button
                onClick={resetGame}
                className="bg-emerald-500 text-emerald-900 hover:bg-emerald-400"
              >
                한 번 더 플레이하기
              </Button>
            </div>
          ) : null}
        </section>

        <section
          className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner"
          aria-label="카드 그리드"
        >
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
            {cards.map((card) => {
              const isFaceUp = card.isFlipped || card.isMatched;
              const suitStyle = suitSymbols[card.suit];

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  disabled={isProcessing || card.isFlipped || card.isMatched}
                  className={`relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-slate-800 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isProcessing || card.isMatched ? "" : "hover:-translate-y-1"
                  } ${card.isMatched ? "border-emerald-400/60" : ""}`}
                >
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-between rounded-2xl bg-gradient-to-br p-3 text-center text-lg font-semibold transition-all duration-300 ${
                      isFaceUp
                        ? "from-slate-100 to-slate-200 text-slate-900"
                        : "from-slate-900 to-slate-950"
                    }`}
                  >
                    {isFaceUp ? (
                      <>
                        <span className={`text-left text-sm ${suitStyle.color}`}>
                          {card.rank}
                        </span>
                        <span className={`text-4xl ${suitStyle.color}`}>
                          {suitStyle.icon}
                        </span>
                        <span className={`text-right text-sm ${suitStyle.color}`}>
                          {card.rank}
                        </span>
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                        <span className="text-2xl text-slate-500">?</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
