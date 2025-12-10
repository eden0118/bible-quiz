import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Leaderboard } from '../components/Leaderboard';

interface MenuScreenProps {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  language: 'zh' | 'en';
  leaderboard: Array<{ name: string; score: number; date: string; mode: string }>;
  translations: any;
  onPlayerNameChange: (name: string) => void;
  onGameModeChange: (mode: 'all' | 'old' | 'new') => void;
  onStartGame: () => void;
  onToggleLanguage: () => void;
}

export const MenuScreen = ({
  playerName,
  gameMode,
  language,
  leaderboard,
  translations: t,
  onPlayerNameChange,
  onGameModeChange,
  onStartGame,
  onToggleLanguage,
}: MenuScreenProps) => (
  <>
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <GlassCard className="relative z-10 w-full max-w-md border-white/10 p-10 md:p-16">
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-orange-500"></div>
            <div className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
              {t.title.resources}
            </div>
          </div>

          <h1 className="mb-4 text-6xl font-black leading-[0.85] tracking-tighter md:text-7xl">
            <span className="text-white">BIBLE</span>
            <br />
            <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              WISDOM
            </span>
          </h1>

          <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
            {t.title.sub}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onStartGame()}
              placeholder=" "
              className="peer w-full border-b-2 border-neutral-700 bg-transparent py-3 text-lg font-bold text-white placeholder-transparent transition-colors focus:border-orange-500 focus:outline-none"
            />
            <label className="absolute -top-3.5 left-0 text-xs font-bold tracking-wider text-orange-500 uppercase transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-orange-500">
              {t.menu.nameLabel}
            </label>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="mb-3 block text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.menu.modeLabel}
            </label>
            <div className="flex gap-4">
              {(['old', 'new', 'all'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onGameModeChange(mode)}
                  className={`flex-1 rounded-xl border py-4 text-xs font-black tracking-widest uppercase transition-all ${
                    gameMode === mode
                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'border-neutral-700 bg-transparent text-neutral-500 hover:border-orange-500/50 hover:text-orange-500'
                  }`}
                >
                  {t.menu.modes[mode]}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            disabled={!playerName.trim()}
            className={`flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-black tracking-widest uppercase transition-all ${
              !playerName.trim()
                ? 'cursor-not-allowed bg-neutral-800 text-neutral-400'
                : 'bg-white text-black shadow-2xl hover:scale-[1.02] hover:shadow-orange-500/20'
            }`}
            onClick={onStartGame}
          >
            {t.menu.startBtn}
          </button>
        </div>
      </GlassCard>

      {/* Leaderboard Section */}
      {leaderboard.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <div className="rounded-2xl border border-white/5 bg-black/20 p-6">
            <h3 className="mb-6 pl-2 text-left text-xs font-black tracking-widest text-neutral-400 uppercase">
              🏆 {language === 'zh' ? '排行榜' : 'Leaderboard'}
            </h3>
            <Leaderboard leaderboard={leaderboard} playerName={playerName} language={language} />
          </div>
        </div>
      )}
    </div>
  </>
);
