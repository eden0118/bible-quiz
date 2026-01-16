/**
 * 遊戲邏輯模組 - 分離業務邏輯和 UI 邏輯
 *
 * 職責：
 * - 分數計算規則
 * - 卡片篩選和隨機排序
 * - 遊戲時間計算
 * - 準確度計算
 */

import { BibleCard } from '../database';

// 計時計分規則
// 3秒內 10分，5秒內 9分，10秒內8分，15秒內7分，20秒內6分，超過20秒 5分
const SCORE_TIERS = [
  { timeLimit: 3, score: 10 },
  { timeLimit: 5, score: 9 },
  { timeLimit: 10, score: 8 },
  { timeLimit: 15, score: 7 },
  { timeLimit: 20, score: 6 },
];
const BASE_SCORE = 5;

/**
 * 根據答題時間計算分數
 */
export const calculateScore = (timeInSeconds: number): number => {
  for (const tier of SCORE_TIERS) {
    if (timeInSeconds <= tier.timeLimit) {
      return tier.score;
    }
  }
  return BASE_SCORE;
};

/**
 * 使用 Fisher-Yates 演算法打亂卡片順序
 */
export const shuffleCards = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * 根據遊戲模式篩選卡片
 * @param cards 所有卡片
 * @param mode 遊戲模式: 'all' | 'old' | 'new'
 * @param limit 最多選擇幾張卡片
 */
export const filterCards = (
  cards: BibleCard[],
  mode: 'all' | 'old' | 'new',
  limit: number
): BibleCard[] => {
  // 步驟 1: 根據模式篩選卡片
  let filtered = cards.filter((card) => {
    if (mode === 'all') return true;
    return card.testament === mode;
  });

  // 步驟 2: 隨機打亂
  const shuffled = shuffleCards(filtered);

  // 步驟 3: 取前 limit 張
  return shuffled.slice(0, limit);
};

/**
 * 計算準確度 (百分比)
 */
export const calculateAccuracy = (correctCount: number, totalCount: number): number => {
  if (totalCount === 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
};

/**
 * 計算遊戲耗時 (秒)
 */
export const calculateGameTime = (startTime: number | null): number => {
  if (!startTime) return 0;
  return Math.round((Date.now() - startTime) / 1000);
};
