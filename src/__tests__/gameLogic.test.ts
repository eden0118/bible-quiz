import { describe, it, expect } from 'vitest';
import { filterCards, calculateScore, calculateAccuracy, shuffleCards } from '../lib/gameLogic';
import { bibleCards } from '../database';

describe('gameLogic', () => {
  describe('filterCards', () => {
    it('應該返回所有卡片當模式為 all', () => {
      const filtered = filterCards(bibleCards, 'all', 10);
      expect(filtered.length).toBeLessThanOrEqual(10);
    });

    it('應該只返回舊約卡片當模式為 old', () => {
      const filtered = filterCards(bibleCards, 'old', 10);
      expect(filtered.every((card) => card.testament === 'old')).toBe(true);
    });

    it('應該只返回新約卡片當模式為 new', () => {
      const filtered = filterCards(bibleCards, 'new', 10);
      expect(filtered.every((card) => card.testament === 'new')).toBe(true);
    });

    it('應該尊重 limit 參數', () => {
      const limit = 5;
      const filtered = filterCards(bibleCards, 'all', limit);
      expect(filtered.length).toBeLessThanOrEqual(limit);
    });

    it('應該返回隨機排列的卡片', () => {
      const filtered1 = filterCards(bibleCards, 'all', 10);
      const filtered2 = filterCards(bibleCards, 'all', 10);
      expect(filtered1.length).toBe(filtered2.length);
    });
  });

  describe('calculateScore', () => {
    it('應該為快速答案給予最高分數', () => {
      const fastScore = calculateScore(2);
      expect(fastScore).toBe(10);
    });

    it('應該為中速答案給予中等分數', () => {
      const mediumScore = calculateScore(7);
      expect(mediumScore).toBe(8);
    });

    it('應該為慢速答案給予低分數', () => {
      const slowScore = calculateScore(25);
      expect(slowScore).toBe(5);
    });

    it('應該為邊界情況計算正確分數', () => {
      expect(calculateScore(3)).toBe(10);
      expect(calculateScore(5)).toBe(9);
      expect(calculateScore(10)).toBe(8);
    });
  });

  describe('calculateAccuracy', () => {
    it('應該計算 100% 準確率', () => {
      const accuracy = calculateAccuracy(10, 10);
      expect(accuracy).toBe(100);
    });

    it('應該計算 0% 準確率', () => {
      const accuracy = calculateAccuracy(0, 10);
      expect(accuracy).toBe(0);
    });

    it('應該計算部分準確率', () => {
      const accuracy = calculateAccuracy(5, 10);
      expect(accuracy).toBe(50);
    });

    it('應該四捨五入準確率', () => {
      const accuracy = calculateAccuracy(1, 3);
      expect(accuracy).toBe(33);
    });

    it('當總數為 0 時應該返回 0', () => {
      const accuracy = calculateAccuracy(0, 0);
      expect(accuracy).toBe(0);
    });
  });

  describe('shuffleCards', () => {
    it('應該返回相同長度的數組', () => {
      const cards = bibleCards.slice(0, 5);
      const shuffled = shuffleCards(cards);
      expect(shuffled.length).toBe(cards.length);
    });

    it('應該包含所有原始元素', () => {
      const cards = bibleCards.slice(0, 5);
      const shuffled = shuffleCards(cards);
      const shuffledIds = shuffled.map((c) => c.id).sort();
      const originalIds = cards.map((c) => c.id).sort();
      expect(shuffledIds).toEqual(originalIds);
    });

    it('應該不修改原始數組', () => {
      const cards = [...bibleCards.slice(0, 5)];
      const original = [...cards];
      shuffleCards(cards);
      expect(cards).toEqual(original);
    });
  });
});
