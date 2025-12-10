import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface FinishedScreenProps {
  score: number;
  filteredCardsLength: number;
  accuracy: number;
  language: 'zh' | 'en';
  playerName: string;
  leaderboard: Array<{ name: string; score: number; date: string; mode: string }>;
  translations: any;
  onBackToMenu: () => void;
}

export const FinishedScreen = ({
  score,
  filteredCardsLength,
  accuracy,
  language,
  playerName,
  leaderboard,
  translations: t,
  onBackToMenu,
}: FinishedScreenProps) => (
  <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
    {/* Result Card */}
    <GlassCard className="relative mb-4 w-full max-w-full space-y-4 overflow-hidden p-4 text-center sm:mb-6 sm:max-w-2xl sm:space-y-6 sm:p-8 lg:mb-8 lg:space-y-8 lg:p-12">
      {/* Decorative gradient line */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-purple-600"></div>

      <div className="pt-2 sm:pt-4">
        <h2 className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-2xl font-black text-transparent sm:text-3xl lg:text-5xl">
          {accuracy >= 80 ? '🎉 ' : accuracy >= 60 ? '👍 ' : '💪 '}
          {language === 'zh' ? '挑戰完成' : 'Challenge Complete'}
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
            {t.game.score}
          </p>
          <p className="text-3xl font-black text-orange-500 sm:text-4xl lg:text-6xl">{score}</p>
        </div>

        <div className="mx-auto h-1 w-12 bg-neutral-700"></div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {language === 'zh' ? '答題數' : 'Questions'}
            </p>
            <p className="text-2xl font-black text-white lg:text-4xl">
              {filteredCardsLength}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {language === 'zh' ? '正確率' : 'Accuracy'}
            </p>
            <p className="text-2xl font-black text-orange-500 lg:text-4xl">{accuracy}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 sm:space-y-3 sm:pt-6 lg:space-y-4">
        <Button
          onClick={onBackToMenu}
          className="w-full py-2 text-sm sm:py-3 sm:text-base lg:py-4 lg:text-lg"
        >
          {language === 'zh' ? '返回首頁' : 'Back to Menu'}
        </Button>
      </div>
    </GlassCard>

    {/* Updated Leaderboard */}
    {leaderboard.length > 0 && (
      <div className="w-full max-w-full sm:max-w-2xl">
        <GlassCard className="relative overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-orange-500 via-red-500 to-purple-600"></div>

          <div className="pt-4 sm:pt-6">
            <h3 className="mb-4 text-center text-xs font-black tracking-[0.2em] text-neutral-400 uppercase sm:mb-6 lg:mb-8">
              🏆 {language === 'zh' ? '排行榜 TOP 5' : 'Leaderboard Top 5'}
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
                      <p className="text-[10px] text-neutral-400">
                        {entry.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    )}
  </div>
);
