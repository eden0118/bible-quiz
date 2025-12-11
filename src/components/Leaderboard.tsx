import { useEffect, useState } from 'react';
import { getLeaderboard, GameRecord } from '../lib/supabase';

interface LeaderboardProps {
  playerName?: string;
  limit?: number;
  refreshTrigger?: number;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return '無日期';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '無日期';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('日期格式化失敗:', dateString, error);
    return '無日期';
  }
};

export const Leaderboard = ({
  playerName = '',
  limit = 5,
  refreshTrigger = 0,
}: LeaderboardProps) => {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await getLeaderboard();
      setRecords(data);
      setLoading(false);

      console.log('排行榜數據:', data);
    };

    fetchLeaderboard();
  }, [refreshTrigger]);

  if (loading) {
    return <p className="text-sm text-neutral-400 italic">加載中...</p>;
  }

  if (records.length === 0) {
    return <p className="text-sm text-neutral-400 italic">暫無排行</p>;
  }

  return (
    <div className="max-h-120 space-y-3 overflow-y-auto">
      {records.slice(0, limit).map((entry, idx) => (
        <div
          key={entry.id || idx}
          className={`flex items-center justify-between rounded-xl p-3 transition-all ${
            entry.player_name === playerName
              ? 'border border-orange-500/30 bg-orange-500/10'
              : 'border border-transparent bg-white/5'
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-black ${
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
              <div className="text-sm leading-tight font-bold text-neutral-200">
                {entry.player_name}
              </div>
              <div className="text-[9px] font-black tracking-wider text-neutral-400 uppercase opacity-70">
                {entry.game_mode}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-orange-400">{entry.score}</span>
            <span className="text-xs text-neutral-500"> {formatDate(entry.created_at)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
