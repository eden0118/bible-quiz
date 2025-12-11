interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  mode: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  playerName: string;
}

export const Leaderboard = ({ leaderboard, playerName }: LeaderboardProps) => {
  if (leaderboard.length === 0) {
    return <p className="text-sm text-neutral-400 italic">暫無排行</p>;
  }

  return (
    <div className="max-h-48 space-y-3 overflow-y-auto pr-2">
      {leaderboard.slice(0, 5).map((entry, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between rounded-xl p-3 transition-all ${
            entry.name === playerName
              ? 'border border-orange-500/30 bg-orange-500/10'
              : 'border border-transparent bg-white/5'
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${
                idx === 0
                  ? 'bg-orange-400 text-black'
                  : idx === 1
                    ? 'bg-neutral-300 text-neutral-800'
                    : idx === 2
                      ? 'bg-orange-900 text-orange-200'
                      : 'bg-neutral-800 text-neutral-500'
              }`}
            >
              {idx + 1}
            </span>
            <div className="text-left">
              <div className="text-sm leading-tight font-bold text-neutral-200">{entry.name}</div>
              <div className="text-[9px] font-black tracking-wider text-neutral-400 uppercase opacity-70">
                {entry.mode}
              </div>
            </div>
          </div>
          <span className="font-mono font-bold text-orange-400">{entry.score}</span>
        </div>
      ))}
    </div>
  );
};
