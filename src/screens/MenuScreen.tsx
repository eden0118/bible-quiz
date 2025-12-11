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
import { Leaderboard } from '../components/Leaderboard';
import { FaHandPointLeft } from 'react-icons/fa';

interface MenuScreenProps {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  translations: any;
  onPlayerNameChange: (name: string) => void;
  onGameModeChange: (mode: 'all' | 'old' | 'new') => void;
  onStartGame: () => void;
}

export const MenuScreen = ({
  playerName,
  gameMode,
  translations: t,
  onPlayerNameChange,
  onGameModeChange,
  onStartGame,
}: MenuScreenProps) => (
  <div className="mx-auto flex max-w-6xl flex-1 flex-col space-y-5 p-6 sm:space-y-8 lg:p-8">
    <GlassCard className="relative w-full border-white/10 p-10">
      {/* Header */}
      <div className="mb-12 text-left">
        <div className="mb-4 flex items-center gap-2">
          <div className="bg-primary h-1 w-8 rounded-full"></div>
          <div className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
            {t.title.resources}
          </div>
        </div>

        <h1 className="mb-4 text-6xl leading-[0.85] font-bold tracking-tighter md:text-7xl">
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
        <div className="relative">
          <input
            type="text"
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onStartGame()}
            placeholder=" "
            className="input"
          />
          <label className="input-label">{t.menu.nameLabel}</label>
          {/* 手指動畫提示 */}
          {!playerName && (
            <div className="pointer-events-none absolute top-1 left-15 -rotate-45 select-none">
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

        {/* Start Button */}
        <button disabled={!playerName.trim()} className="button primary-btn" onClick={onStartGame}>
          {t.menu.startBtn}
        </button>
      </div>
    </GlassCard>

    {/* Leaderboard Section */}
    <div className="mt-8 w-full max-w-md">
      <div className="rounded-2xl border border-white/5 bg-black/20 p-6">
        <h3 className="mb-6 pl-2 text-left text-xs font-black tracking-widest text-neutral-400 uppercase">
          🏆 排行榜
        </h3>
        <Leaderboard playerName={playerName} limit={5} />
      </div>
    </div>
  </div>
);
