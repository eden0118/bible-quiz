/**
 * 遊戲結束畫面元件
 *
 * 功能：
 * - 顯示最終成績（分數、正確率、答題數）
 * - 根據準確度顯示表情獎牌
 * - 展示回答的所有問題及時間
 * - 正確題目只顯示答案，錯誤題目顯示選擇和正確答案
 * - 展示錯誤題目的詳細信息
 *
 * 排行邏輯：
 * - 自動排序：分數由高到低
 * - 名次提示：金銀銅牌 (🥇🥈🥉)
 * - 從 Supabase 雲端讀取
 */

import { GlassCard } from '../components/GlassCard';
import { BibleCard } from '../database';

interface WrongAnswer {
  card: BibleCard;
  selectedIndex: number;
  timeElapsed: number;
}

interface FinishedScreenProps {
  score: number;
  totalCards: number;
  accuracy: number;
  playerName: string;
  translations: any;
  onBackToMenu: () => void;
  wrongAnswers?: WrongAnswer[];
  gameCards?: BibleCard[];
  cardTimes?: number[];
  accumulatedGameTime?: number;
}

export const FinishedScreen = ({
  score,
  totalCards,
  accuracy,
  playerName,
  translations: t,
  onBackToMenu,
  wrongAnswers = [],
  gameCards = [],
  cardTimes = [],
  accumulatedGameTime = 0,
}: FinishedScreenProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  // 判斷某題是否答錯
  const isWrongAnswer = (cardIndex: number): WrongAnswer | undefined => {
    return wrongAnswers.find(
      (wa) => gameCards[cardIndex] && wa.card.id === gameCards[cardIndex].id
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-xl min-w-sm flex-1 flex-col items-center justify-center space-y-5 p-6 sm:space-y-8 lg:p-8">
      {/* Result Card */}
      <GlassCard className="psm:max-w-xl mx-auto flex w-full flex-col gap-6 space-y-5 overflow-hidden px-6 py-8 sm:space-y-8 lg:max-w-lg">
        {/* Decorative gradient line */}
        <div className="from-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r via-red-500 to-purple-600"></div>

        <div>
          <h2 className="from-primary to-error bg-linear-to-r bg-clip-text text-center text-3xl font-black text-transparent sm:text-4xl lg:text-5xl">
            {accuracy >= 80
              ? t.finished.subtitle('🎉')
              : accuracy >= 60
                ? t.finished.subtitle('👍')
                : t.finished.subtitle('💪')}
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="score-badge">{t.game.score}</span>
            <span className="text-6xl font-black text-orange-500 lg:text-[8rem]">{score}</span>
          </div>

          <div className="mx-auto h-1 w-16 rounded-full bg-neutral-700"></div>

          <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col items-center">
              <p className="score-badge">{t.finished.answers}</p>
              <span className="text-2xl font-black text-white lg:text-4xl">{totalCards}</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="score-badge">{t.finished.accuracy}</p>
              <span className="text-2xl font-black text-orange-500 lg:text-4xl">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Game Stats with Time */}
        <div className="space-y-2 pt-2 sm:space-y-3 sm:pt-4">
          <div className="flex items-center justify-center gap-6 rounded-lg bg-neutral-800/50 p-3 text-center">
            <div>
              <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                {t.game.time || '遊戲時間'}
              </p>
              <p className="text-lg font-bold text-orange-500">{formatTime(accumulatedGameTime)}</p>
            </div>
            <div className="h-8 w-px bg-neutral-600"></div>
            <div>
              <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                {t.finished.avgTime || '平均用時'}
              </p>
              <p className="text-lg font-bold text-cyan-400">
                {totalCards > 0 ? formatTime(accumulatedGameTime / totalCards) : '0:00'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4 sm:space-y-3 sm:pt-6 lg:space-y-4">
          <button
            onClick={onBackToMenu}
            className="from-primary to-accent hover:shadow-primary/50 w-full rounded-lg bg-linear-to-r py-2 font-medium text-white transition-all hover:shadow-lg active:scale-95 sm:py-3 sm:text-base lg:py-4 lg:text-lg"
          >
            {t.finished.backBtn}
          </button>
        </div>
      </GlassCard>

      {/* All Answers Section */}
      {gameCards && gameCards.length > 0 && (
        <GlassCard className="psm:max-w-xl mx-auto w-full flex-col space-y-4 overflow-hidden px-6 py-8 sm:space-y-6 lg:max-w-lg">
          <h3 className="text-foreground text-lg font-bold sm:text-xl">{t.finished.allAnswers}</h3>

          <div className="space-y-3">
            {gameCards.map((card, idx) => {
              const wrong = isWrongAnswer(idx);
              const timeSpent = cardTimes[idx] || 0;
              const content = card.content;
              const isCorrect = !wrong;

              return (
                <div
                  key={idx}
                  className={`space-y-3 rounded p-3 ${isCorrect ? 'bg-success/5' : 'bg-error/10'}`}
                >
                  {/* Question Header with Time */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${isCorrect ? 'text-success' : 'text-error'}`}
                        >
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400">{content.reference}</span>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-bold text-neutral-500">
                        {formatTime(timeSpent)}
                      </span>
                    </div>
                  </div>

                  {/* Verse and Question */}
                  <div>
                    <p className="mb-2 border-l-2 border-neutral-700 pl-2 text-xs text-neutral-300 italic">
                      "{content.verse}"
                    </p>
                    <p className="text-sm text-white">{content.question}</p>
                  </div>

                  {/* Answer Display */}
                  {isCorrect ? (
                    // 正確答案：只顯示答案
                    <div className="bg-success/10 border-success/70 flex gap-1 rounded border p-2">
                      <p className="text-success text-xs font-bold tracking-widest uppercase">
                        {t.finished.answer}
                      </p>
                      <p className="text-xs text-white">{content.options[card.answer]}</p>
                    </div>
                  ) : (
                    // 錯誤答案：顯示選擇的和正確的
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="bg-error/20 border-error flex gap-1 rounded border p-2">
                        <p className="text-error text-xs font-bold tracking-widest uppercase">
                          {t.finished.yourAnswer || '你的答案'}
                        </p>
                        <p className="text-xs text-white">
                          {content.options[wrong!.selectedIndex]}
                        </p>
                      </div>
                      <div className="bg-success/20 border-success rounded border p-2">
                        <p className="text-success mb-1 text-xs font-bold tracking-widest uppercase">
                          {t.finished.correctAnswer || '正確答案'}
                        </p>
                        <p className="text-xs text-white">{content.options[card.answer]}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
