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
    <GlassCard className="mb-4 w-full max-w-full space-y-4 p-4 text-center sm:mb-6 sm:max-w-2xl sm:space-y-6 sm:p-8 lg:mb-8 lg:space-y-8 lg:p-12">
      <h2 className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-2xl font-black text-transparent sm:text-3xl lg:text-5xl">
        {accuracy >= 80 ? '🎉 ' : accuracy >= 60 ? '👍 ' : '💪 '}
        {language === 'zh' ? '挑戰完成' : 'Challenge Complete'}
      </h2>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div>
          <p className="text-xs text-neutral-600 sm:text-sm lg:text-base dark:text-neutral-400">
            {t.game.score}
          </p>
          <p className="text-3xl font-black text-orange-500 sm:text-4xl lg:text-6xl">{score}</p>
        </div>

        <div className="h-1 w-full bg-neutral-300 dark:bg-neutral-700"></div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {language === 'zh' ? '答題數' : 'Questions'}
            </p>
            <p className="text-lg font-bold sm:text-xl lg:text-2xl">{filteredCardsLength}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {language === 'zh' ? '正確率' : 'Accuracy'}
            </p>
            <p className="text-lg font-bold text-orange-500 sm:text-xl lg:text-2xl">{accuracy}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
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
        <GlassCard className="p-4 sm:p-6 lg:p-8">
          <h3 className="mb-3 text-center text-base font-bold text-orange-500 sm:mb-4 sm:text-lg lg:mb-6 lg:text-2xl">
            🏆 Top 5
          </h3>
          <div className="space-y-2 sm:space-y-2 lg:space-y-3">
            {leaderboard.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-lg border p-2 sm:rounded-lg sm:p-3 lg:rounded-xl lg:p-4 ${
                  entry.name === playerName && entry.score === score
                    ? 'border-2 border-orange-500 bg-orange-500/20'
                    : 'border border-white/20 bg-white/30 dark:border-neutral-700/50 dark:bg-neutral-800/30'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold sm:text-sm lg:text-lg">
                    {idx + 1}. {entry.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-orange-500 sm:text-lg lg:text-2xl">
                    {entry.score}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{entry.mode}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    )}
  </div>
);
