import { createClient } from '@supabase/supabase-js';

// Supabase 設定
// 請在 .env.local 或 .env 中設置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 遊戲記錄類型
export interface GameRecord {
  id?: string;
  player_name: string;
  score: number;
  quiz_time: number; // 單位：秒
  game_mode: string; // 'all' | 'old' | 'new'
  correct_count: number;
  total_questions: number;
  accuracy: number; // 百分比
  created_at?: string;
}

/**
 * 保存遊戲記錄到 Supabase
 */
export const saveGameRecord = async (record: GameRecord): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('game_records').insert([
      {
        player_name: record.player_name,
        score: record.score,
        quiz_time: record.quiz_time,
        game_mode: record.game_mode,
        correct_count: record.correct_count,
        total_questions: record.total_questions,
        accuracy: record.accuracy,
      },
    ]);

    if (error) {
      console.error('儲存遊戲記錄失敗:', error);
      return false;
    }

    console.log('遊戲記錄已保存:', data);
    return true;
  } catch (err) {
    console.error('保存遊戲記錄時出錯:', err);
    return false;
  }
};

/**
 * 獲取排行榜 (前 10 筆)
 */
export const getLeaderboard = async (): Promise<GameRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('game_records')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) {
      console.error('獲取排行榜失敗:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('獲取排行榜時出錯:', err);
    return [];
  }
};

/**
 * 獲取特定玩家的記錄
 */
export const getPlayerRecords = async (playerName: string): Promise<GameRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('game_records')
      .select('*')
      .eq('player_name', playerName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('獲取玩家記錄失敗:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('獲取玩家記錄時出錯:', err);
    return [];
  }
};
