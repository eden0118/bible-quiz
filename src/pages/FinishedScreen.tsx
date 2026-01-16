/**
 * 遊戲結束畫面元件
 *
 * 功能：
 * - 顯示最終成績（分數、正確率、答題數）
 * - 根據準確度顯示表情獎牌
 * - 展示前 5 名排行榜
 * - 高亮顯示當前玩家成績
 * - 顯示錯誤的題目與正確答案
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
}

export const FinishedScreen = ({
  score,
  totalCards,
  accuracy,
  playerName,
  translations: t,
  onBackToMenu,
  wrongAnswers = [],
}: FinishedScreenProps) => (
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

      <div className="space-y-2 pt-4 sm:space-y-3 sm:pt-6 lg:space-y-4">
        <button
          onClick={onBackToMenu}
          className="from-primary to-accent hover:shadow-primary/50 w-full rounded-lg bg-linear-to-r py-2 font-medium text-white transition-all hover:shadow-lg active:scale-95 sm:py-3 sm:text-base lg:py-4 lg:text-lg"
        >
          {t.finished.backBtn}
        </button>
      </div>
    </GlassCard>

    {/* Wrong Answers Section */}
    {wrongAnswers && wrongAnswers.length > 0 && (
      <GlassCard className="psm:max-w-xl mx-auto w-full flex-col space-y-4 overflow-hidden px-6 py-8 sm:space-y-6 lg:max-w-lg">
        <h3 className="text-error text-lg font-bold sm:text-xl">
          {t.finished.wrongAnswers || '答錯的題目'} ({wrongAnswers.length})
        </h3>

        <div className="space-y-4">
          {wrongAnswers.map((wrong, idx) => {
            const card = wrong.card;
            const content = card.content;
            const selectedOption = content.options[wrong.selectedIndex];
            const correctOption = content.options[card.answer];

            return (
              <div key={idx} className="border-error bg-error/10 space-y-3 rounded border-l-4 p-3">
                <p className="border-error/30 border-b pb-2 text-sm text-neutral-300 italic">
                  "{content.verse}"
                </p>

                <div>
                  <p className="mb-1 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                    {t.finished.question || '問題'}
                  </p>
                  <p className="text-sm font-medium text-white">{content.question}</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="bg-error/20 border-error rounded border p-2">
                    <p className="text-error mb-1 text-xs font-bold tracking-widest uppercase">
                      ✗ {t.finished.yourAnswer || '你的答案'}
                    </p>
                    <p className="text-xs text-white">{selectedOption}</p>
                  </div>
                  <div className="bg-success/20 border-success rounded border p-2">
                    <p className="text-success mb-1 text-xs font-bold tracking-widest uppercase">
                      ✓ {t.finished.correctAnswer || '正確答案'}
                    </p>
                    <p className="text-xs text-white">{correctOption}</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400">
                  {t.finished.timeSpent || '耗時'}: {(wrong.timeElapsed || 0).toFixed(1)}秒
                </p>
              </div>
            );
          })}
        </div>
      </GlassCard>
    )}
  </div>
);
