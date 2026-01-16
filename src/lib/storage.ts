/**
 * 本地存儲模組 - 使用 localStorage 存儲遊戲記錄
 *
 * 功能：
 * - 保存遊戲記錄到 localStorage
 * - 讀取排行榜 (按分數排序)
 * - 讀取特定玩家的記錄
 * - 自動管理數據序列化/反序列化
 */

export interface GameRecord {
  id: string;
  playerName: string;
  score: number;
  quizTime: number; // 單位：秒
  gameMode: 'all' | 'old' | 'new';
  correctCount: number;
  totalQuestions: number;
  accuracy: number; // 百分比
  createdAt: string; // ISO timestamp
}

const STORAGE_KEY = 'bible_quiz_records';

/**
 * 保存遊戲記錄到 localStorage
 */
export const saveGameRecord = (record: Omit<GameRecord, 'id' | 'createdAt'>): GameRecord => {
  try {
    const newRecord: GameRecord = {
      ...record,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const records = getAllRecords();
    records.push(newRecord);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    console.log('✅ 遊戲記錄已保存到本地:', newRecord);

    return newRecord;
  } catch (err) {
    console.error('保存遊戲記錄失敗:', err);
    throw err;
  }
};

/**
 * 獲取所有遊戲記錄
 */
export const getAllRecords = (): GameRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('讀取遊戲記錄失敗:', err);
    return [];
  }
};

/**
 * 獲取排行榜 (前 N 筆，按分數排序)
 */
export const getLeaderboard = (limit: number = 10): GameRecord[] => {
  try {
    const records = getAllRecords();
    return records
      .sort(
        (a, b) =>
          b.score - a.score || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  } catch (err) {
    console.error('獲取排行榜失敗:', err);
    return [];
  }
};

/**
 * 獲取特定玩家的記錄
 */
export const getPlayerRecords = (playerName: string): GameRecord[] => {
  try {
    const records = getAllRecords();
    return records
      .filter((r) => r.playerName === playerName)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.error('獲取玩家記錄失敗:', err);
    return [];
  }
};

/**
 * 清除所有遊戲記錄 (開發用)
 */
export const clearAllRecords = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ 已清除所有遊戲記錄');
  } catch (err) {
    console.error('清除記錄失敗:', err);
  }
};

/**
 * 遊戲進度狀態接口
 */
export interface GameProgressState {
  playerName: string;
  gameMode: 'all' | 'old' | 'new';
  currentCardIndex: number;
  score: number;
  correctCount: number;
  selectedAnswer: number | null;
  answered: boolean;
  gameCards: any[]; // 當前遊戲的卡片陣列
  gameStartTime: number | null;
  cardStartTime: number | null;
  cardTimes?: number[]; // 每個題目花費的時間（秒）
  wrongAnswers?: Array<{
    card: any;
    selectedIndex: number;
    timeElapsed: number;
  }>;
}

const GAME_PROGRESS_KEY = 'bible_quiz_progress';

/**
 * 保存遊戲進度到 localStorage
 */
export const saveGameProgress = (progress: GameProgressState): void => {
  try {
    localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(progress));
    console.log('✅ 遊戲進度已保存');
  } catch (err) {
    console.error('保存遊戲進度失敗:', err);
  }
};

/**
 * 讀取已保存的遊戲進度
 */
export const loadGameProgress = (): GameProgressState | null => {
  try {
    const data = localStorage.getItem(GAME_PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('讀取遊戲進度失敗:', err);
    return null;
  }
};

/**
 * 清除已保存的遊戲進度
 */
export const clearGameProgress = (): void => {
  try {
    localStorage.removeItem(GAME_PROGRESS_KEY);
    console.log('✅ 遊戲進度已清除');
  } catch (err) {
    console.error('清除遊戲進度失敗:', err);
  }
};

/**
 * 遊戲結果狀態接口
 */
export interface GameResultState {
  playerName: string;
  score: number;
  quizTime: number;
  gameMode: 'all' | 'old' | 'new';
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
  cardTimes?: number[]; // 每個題目花費的時間（秒）
  wrongAnswers?: Array<{
    card: any;
    selectedIndex: number;
    timeElapsed: number;
  }>;
}

const GAME_RESULT_KEY = 'bible_quiz_result';

/**
 * 保存遊戲結果到 localStorage
 */
export const saveGameResult = (result: GameResultState): void => {
  try {
    localStorage.setItem(GAME_RESULT_KEY, JSON.stringify(result));
    console.log('✅ 遊戲結果已保存');
  } catch (err) {
    console.error('保存遊戲結果失敗:', err);
  }
};

/**
 * 讀取已保存的遊戲結果
 */
export const loadGameResult = (): GameResultState | null => {
  try {
    const data = localStorage.getItem(GAME_RESULT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('讀取遊戲結果失敗:', err);
    return null;
  }
};

/**
 * 清除已保存的遊戲結果
 */
export const clearGameResult = (): void => {
  try {
    localStorage.removeItem(GAME_RESULT_KEY);
    console.log('✅ 遊戲結果已清除');
  } catch (err) {
    console.error('清除遊戲結果失敗:', err);
  }
};
