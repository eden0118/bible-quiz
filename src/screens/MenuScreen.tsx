import { GlassCard } from '../components/GlassCard';
import { Leaderboard } from '../components/Leaderboard';

interface MenuScreenProps {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  leaderboard: Array<{ name: string; score: number; date: string; mode: string }>;
  translations: any;
  onPlayerNameChange: (name: string) => void;
  onGameModeChange: (mode: 'all' | 'old' | 'new') => void;
  onStartGame: () => void;
}

export const MenuScreen = ({
  playerName,
  gameMode,
  leaderboard,
  translations: t,
  onPlayerNameChange,
  onGameModeChange,
  onStartGame,
}: MenuScreenProps) => (
  <>
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <GlassCard className="relative z-10 w-full max-w-md border-white/10 p-10 md:p-16">
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
          </div>

          {/* Mode Selection */}
          <div>
            <label className="text-foreground mb-3 block text-[10px] font-black tracking-[0.2em] uppercase">
              {t.menu.modeLabel}
            </label>
            <div className="flex gap-4">
              {(['old', 'new', 'all'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onGameModeChange(mode)}
                  className={`button text-sm ${gameMode === mode ? 'primary-btn' : 'outline-btn'}`}
                >
                  {t.menu.modes[mode]}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            disabled={!playerName.trim()}
            className="button primary-btn"
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
              🏆 排行榜
            </h3>
            <Leaderboard leaderboard={leaderboard} playerName={playerName} />
          </div>
        </div>
      )}
    </div>
  </>
);
