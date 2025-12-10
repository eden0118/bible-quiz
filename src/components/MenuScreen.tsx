import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface MenuProps {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  language: 'zh' | 'en';
  themeMode: 'light' | 'dark';
  leaderboard: Array<{ name: string; score: number; date: string; mode: string }>;
  translations: any;
  onPlayerNameChange: (name: string) => void;
  onGameModeChange: (mode: 'all' | 'old' | 'new') => void;
  onStartGame: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
}

export const MenuScreen = ({
  playerName,
  gameMode,
  language,
  themeMode,
  leaderboard,
  translations: t,
  onPlayerNameChange,
  onGameModeChange,
  onStartGame,
  onToggleTheme,
  onToggleLanguage,
}: MenuProps) => (
  <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
    {/* Title */}
    <div className="mb-6 text-center sm:mb-8 lg:mb-12">
      <h1 className="mb-1 bg-linear-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-4xl font-black text-transparent sm:mb-2 sm:text-6xl lg:text-8xl">
        {t.title.line1}
      </h1>
      <h2 className="mb-2 text-2xl font-black text-orange-500 sm:mb-4 sm:text-4xl lg:text-5xl">
        {t.title.line2}
      </h2>
      <p className="mb-1 text-xs text-neutral-600 sm:mb-2 sm:text-lg lg:text-xl dark:text-neutral-400">
        {t.title.sub}
      </p>
      <p className="text-xs text-neutral-500 sm:text-sm lg:text-sm dark:text-neutral-500">
        {t.title.resources}
      </p>
    </div>

    {/* Input Card */}
    <GlassCard className="mb-4 w-full max-w-full space-y-5 p-6 sm:mb-6 sm:max-w-2xl  sm:p-8 lg:mb-8 lg:p-12">
      {/* Name Input */}
      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2">
        <label className="block text-sm font-semibold sm:text-base lg:text-lg">
          {t.menu.nameLabel}
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onStartGame()}
          placeholder={t.menu.namePlaceholder}
          className="w-full rounded-lg border border-neutral-300 bg-white/50 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 sm:text-base lg:rounded-2xl lg:px-6 lg:py-4 lg:text-lg dark:border-neutral-700 dark:bg-neutral-800/50 dark:focus:ring-orange-400"
        />
      </div>

      {/* Mode Selection */}
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        <label className="block text-sm font-semibold sm:text-base lg:text-lg">
          {t.menu.modeLabel}
        </label>
        <div className="flex gap-2 sm:gap-3 lg:gap-4">
          {(['old', 'new', 'all'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onGameModeChange(mode)}
              className={`flex-1 rounded-lg border-2 px-2 py-2 text-xs font-bold transition-all duration-300 sm:rounded-lg sm:px-3 sm:py-3 sm:text-sm lg:rounded-2xl lg:px-6 lg:py-4 lg:text-base ${
                gameMode === mode
                  ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                  : 'border-neutral-300 bg-white/30 hover:bg-white/50 dark:border-neutral-700 dark:bg-neutral-800/30 dark:hover:bg-neutral-700/50'
              }`}
            >
              {t.menu.modes[mode]}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={onStartGame}
        disabled={!playerName.trim()}
        className="w-full py-3 text-sm sm:py-4 sm:text-base lg:py-5 lg:text-xl"
      >
        {t.menu.startBtn}
      </Button>
    </GlassCard>

    {/* Theme & Language Toggle */}
    <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4">
      <Button onClick={onToggleTheme} variant="secondary" className="text-xs sm:text-sm lg:text-sm">
        {themeMode === 'dark' ? '☀️' : '🌙'}
      </Button>
      <Button
        onClick={onToggleLanguage}
        variant="secondary"
        className="text-xs sm:text-sm lg:text-sm"
      >
        {language === 'zh' ? 'EN' : '中文'}
      </Button>
    </div>

    {/* Leaderboard */}
    {leaderboard.length > 0 && (
      <div className="mt-6 w-full max-w-full sm:mt-8 sm:max-w-2xl lg:mt-12">
        <GlassCard className="p-4 sm:p-6 lg:p-8">
          <h3 className="mb-3 text-center text-lg font-bold text-orange-500 sm:mb-4 sm:text-xl lg:mb-6 lg:text-2xl">
            🏆 {language === 'zh' ? '排行榜' : 'Leaderboard'}
          </h3>
          <div className="space-y-2 sm:space-y-2 lg:space-y-3">
            {leaderboard.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-white/20 bg-white/30 p-2 sm:rounded-lg sm:p-3 lg:rounded-xl lg:p-4 dark:border-neutral-700/50 dark:bg-neutral-800/30"
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
