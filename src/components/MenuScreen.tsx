import React from 'react';
import { GlassCard } from './GlassCard';

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
  <>
    {/* Settings Bar */}
    <div className="absolute top-6 right-6 z-50 flex gap-3">
      <button
        onClick={onToggleLanguage}
        className="px-4 py-2 rounded-full bg-white/10 border border-neutral-200/20 dark:border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-neutral-600 dark:text-neutral-400 backdrop-blur-md"
      >
        {language === 'zh' ? 'EN' : '中文'}
      </button>
      <button
        onClick={onToggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-neutral-200/20 dark:border-white/10 text-sm hover:bg-white/20 transition-all text-neutral-600 dark:text-neutral-400 backdrop-blur-md"
      >
        {themeMode === 'light' ? '🌙' : '☀️'}
      </button>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <GlassCard className="p-10 md:p-16 max-w-md w-full relative z-10 border-white/60 dark:border-white/10">
        <div className="text-left mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
              {t.title.resources}
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-neutral-900 dark:text-white leading-[0.85] tracking-tighter mb-4">
            BIBLE
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 dark:from-orange-400 dark:to-orange-600">
              WISDOM
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-widest">
            {t.title.sub}
          </p>
        </div>

        <div className="space-y-8">
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onStartGame()}
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-lg font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors placeholder-transparent"
            />
            <label className="absolute left-0 -top-3.5 text-xs font-bold text-orange-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-orange-500 uppercase tracking-wider">
              {t.menu.nameLabel}
            </label>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3">
              {t.menu.modeLabel}
            </label>
            <div className="flex gap-4">
              {(['old', 'new', 'all'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onGameModeChange(mode)}
                  className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                    gameMode === mode
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-orange-500/50 hover:text-orange-500'
                  }`}
                >
                  {t.menu.modes[mode]}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!playerName.trim()}
            className={`w-full py-5 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
              !playerName.trim()
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                : 'bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] shadow-2xl hover:shadow-orange-500/20'
            }`}
            onClick={onStartGame}
          >
            {t.menu.startBtn}
          </button>
        </div>
      </GlassCard>

      <div className="mt-12 text-neutral-400 dark:text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase opacity-50">
        {t.title.resources}
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <div className="bg-neutral-100/50 dark:bg-black/20 rounded-2xl p-6 border border-neutral-200 dark:border-white/5">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 text-left pl-2">
              🏆 {language === 'zh' ? '排行榜' : 'Leaderboard'}
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {leaderboard.length === 0 ? (
                <p className="text-neutral-400 text-sm italic">
                  {language === 'zh' ? '暫無排行' : 'No leaderboard'}
                </p>
              ) : (
                leaderboard.slice(0, 5).map((entry, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                      entry.name === playerName
                        ? 'bg-orange-500/10 border border-orange-500/30'
                        : 'bg-white/50 dark:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${
                          idx === 0
                            ? 'bg-orange-400 text-black'
                            : idx === 1
                              ? 'bg-neutral-300 text-neutral-800'
                              : idx === 2
                                ? 'bg-orange-900 text-orange-200'
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="text-left">
                        <div className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-tight">
                          {entry.name}
                        </div>
                        <div className="text-[9px] text-neutral-400 uppercase font-black tracking-wider opacity-70">
                          {entry.mode}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                      {entry.score}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
