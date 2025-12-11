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
 * - 本地儲存：前 10 筆紀錄
 */

import { GlassCard } from '../components/GlassCard';

interface FinishedScreenProps {
  score: number;
  filteredCardsLength: number;
  accuracy: number;
  playerName: string;
  leaderboard: Array<{ name: string; score: number; date: string; mode: string }>;
  translations: any;
  onBackToMenu: () => void;
}

export const FinishedScreen = ({
  score,
  filteredCardsLength,
  accuracy,
  playerName,
  leaderboard,
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
    {leaderboard.length > 0 && (
      <>
        <GlassCard className="psm:max-w-xl mx-auto flex w-full flex-col gap-6 space-y-5 overflow-hidden px-6 py-8 sm:space-y-8 lg:max-w-lg">
          <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-purple-600"></div>

          <div className="pt-4 sm:pt-6">
            <h3 className="mb-4 text-center text-xs font-black tracking-[0.2em] text-neutral-400 uppercase sm:mb-6 lg:mb-8">
              🏆 排行榜 TOP 5
            </h3>
            <div className="space-y-3 sm:space-y-4 lg:space-y-4">
              {leaderboard.slice(0, 5).map((entry, idx) => {
                const getMedalColor = (index: number) => {
                  if (index === 0) return 'bg-yellow-400/30 border-yellow-400/50';
                  if (index === 1) return 'bg-gray-300/30 border-gray-300/50';
                  if (index === 2) return 'bg-orange-400/30 border-orange-400/50';
                  return 'bg-white/20 border-white/20';
                };

                const getMedalEmoji = (index: number) => {
                  if (index === 0) return '🥇';
                  if (index === 1) return '🥈';
                  if (index === 2) return '🥉';
                  return '';
                };

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between rounded-lg border p-3 transition-all sm:rounded-lg sm:p-4 lg:rounded-xl lg:p-5 ${
                      entry.name === playerName && entry.score === score
                        ? 'border-2 border-orange-500 bg-orange-500/20'
                        : getMedalColor(idx)
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="text-xl sm:text-2xl">{getMedalEmoji(idx)}</span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-white sm:text-sm lg:text-base">
                          {idx + 1}. {entry.name}
                        </p>
                        <p className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
                          {entry.mode}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-lg font-black text-orange-500 sm:text-xl lg:text-2xl">
                        {entry.score}
                      </p>
                      <p className="text-[10px] text-neutral-400">{entry.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </>
    )}
  </div>
);
