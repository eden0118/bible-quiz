/**
 * 菜單畫面元件
 *
 * 功能：
 * - 玩家輸入名稱
 * - 選擇遊戲模式 (全部/舊約/新約)
 * - 顯示本地排行榜 (前 5 名)
 * - 開始遊戲
 *
 * 交互邏輯：
 * - 名稱為空時，開始按鈕禁用
 * - 回車鍵可快速開始遊戲
 * - 排行榜自動高亮當前玩家
 */

import { GlassCard } from '../components/GlassCard';
import { FaHandPointLeft } from 'react-icons/fa';

interface MenuScreenProps {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  gameDifficulty: 'beginner' | 'advanced';
  translations: any;
  onPlayerNameChange: (name: string) => void;
  onGameModeChange: (mode: 'all' | 'old' | 'new') => void;
  onGameDifficultyChange: (difficulty: 'beginner' | 'advanced') => void;
  onStartGame: () => void;
}

export const MenuScreen = ({
  playerName,
  gameMode,
  gameDifficulty,
  translations: t,
  onPlayerNameChange,
  onGameModeChange,
  onGameDifficultyChange,
  onStartGame,
}: MenuScreenProps) => (
  <div className="mx-auto flex w-full max-w-xl min-w-sm flex-1 flex-col space-y-5 p-6 sm:space-y-8 lg:p-8">
    <GlassCard className="relative w-full border-white/10 p-10">
      {/* Header */}
      <div className="mb-12 text-left">
        <div className="mb-4 flex items-center gap-2">
          {/* deco */}
          <div className="bg-primary h-1 w-8 rounded-full"></div>
          {/* version */}
          <div className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
            {t.title.resources}
          </div>
        </div>

        {/* title */}
        <h1 className="mb-4 text-6xl leading-[0.85] font-bold tracking-tighter md:text-7xl">
          <span className="text-white">{t.title.main.split(' ')[0]}</span>
          <br />
          <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            {t.title.main.split(' ')[1]}
          </span>
        </h1>

        <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
          {t.title.sub}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name Input */}
        <div className="relative">
          <input
            type="text"
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && onStartGame()}
            placeholder={t.menu.namePlaceholder}
            className="input cursor-pointer"
          />
          <label className="input-label">{t.menu.nameLabel}</label>
          {/* 手指動畫提示 */}
          {!playerName && (
            <div className="pointer-events-none absolute top-1 right-3 -rotate-45 select-none">
              <div className="animate-finger-point text-accent text-2xl">
                <FaHandPointLeft />
              </div>
            </div>
          )}
        </div>

        {/* Mode Selection */}
        <div>
          <label className="text-foreground mb-3 block text-xs tracking-[0.2em] uppercase">
            {t.menu.modeLabel}
          </label>
          <div className="flex gap-4">
            {(['old', 'new', 'all'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onGameModeChange(mode)}
                className={`small-btn ${gameMode === mode ? 'bg-primary' : 'bg-primary-transparent border-muted-foreground border'}`}
              >
                {t.menu.modes[mode]}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="text-foreground mb-3 block text-xs tracking-[0.2em] uppercase">
            難度選擇
          </label>
          <div className="flex gap-4">
            {(['beginner', 'advanced'] as const).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onGameDifficultyChange(difficulty)}
                className={`small-btn ${gameDifficulty === difficulty ? 'bg-primary' : 'bg-primary-transparent border-muted-foreground border'}`}
              >
                {difficulty === 'beginner' ? '入門' : '進階'}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          disabled={!playerName.trim()}
          className="button primary-btn mt-1"
          onClick={onStartGame}
        >
          {t.menu.startBtn}
        </button>
      </div>
    </GlassCard>
  </div>
);
