/**
 * 遊戲結束畫面元件
 *
 * 功能：
 * - 顯示最終成績（分數、正確率、答題數）
 * - 根據準確度顯示表情獎牌
 * - 展示前 5 名排行榜
 * - 高亮顯示當前玩家成績
 *
 * 排行邏輯：
 * - 自動排序：分數由高到低
 * - 名次提示：金銀銅牌 (🥇🥈🥉)
 * - 從 Supabase 雲端讀取
 */

import { GlassCard } from '../components/GlassCard';
import { Leaderboard } from '../components/Leaderboard';

interface FinishedScreenProps {
  score: number;
  filteredCardsLength: number;
  accuracy: number;
  playerName: string;
  translations: any;
  onBackToMenu: () => void;
}

export const FinishedScreen = ({
  score,
  filteredCardsLength,
  accuracy,
  playerName,
  translations: t,
  onBackToMenu,
}: FinishedScreenProps) => (
  <div className="fle mx-auto w-full max-w-6xl flex-1 flex-col items-center justify-center space-y-5 p-6 sm:space-y-8 lg:p-8">
    {/* Result Card */}
    <GlassCard className="psm:max-w-xl mx-auto flex w-full flex-col gap-6 space-y-5 overflow-hidden px-6 py-8 sm:space-y-8 lg:max-w-lg">
      {/* Decorative gradient line */}
      <div className="from-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r via-red-500 to-purple-600"></div>

      <div>
        <h2 className="from-primary to-error bg-linear-to-r bg-clip-text text-center text-3xl font-black text-transparent sm:text-4xl lg:text-5xl">
          {accuracy >= 80 ? '🎉 ' : accuracy >= 60 ? '👍 ' : '💪 '}
          挑戰完成
        </h2>
      </div>

      <div className="flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-6">
        <div className="flex flex-col items-center gap-1">
          <span className="score-badge">{t.game.score}</span>
          <span className="text-6xl font-black text-orange-500 lg:text-[8rem]">{score}</span>
        </div>

        <div className="mx-auto h-1 w-12 bg-neutral-700"></div>

        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col items-center">
            <p className="score-badge">{t.finished.answers}</p>
            <span className="text-2xl font-black text-white lg:text-4xl">
              {filteredCardsLength}
            </span>
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
          返回首頁
        </button>
      </div>
    </GlassCard>

    {/* Updated Leaderboard */}
    <GlassCard className="psm:max-w-xl mx-auto flex w-full flex-col gap-6 space-y-5 overflow-hidden px-6 py-8 sm:space-y-8 lg:max-w-lg">
      <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-purple-600"></div>

      <div className="pt-4 sm:pt-6">
        <h3 className="mb-4 text-center text-xs font-black tracking-[0.2em] text-neutral-400 uppercase sm:mb-6 lg:mb-8">
          🏆 排行榜 TOP 5
        </h3>
        <Leaderboard playerName={playerName} limit={5} />
      </div>
    </GlassCard>
  </div>
);
