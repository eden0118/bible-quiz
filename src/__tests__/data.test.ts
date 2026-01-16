import { describe, it, expect } from 'vitest';
import { bibleCards } from '../database/data';
import { translations } from '../database/i18n';

describe('數據驗證', () => {
  describe('bibleCards', () => {
    it('應該有卡片', () => {
      expect(bibleCards.length).toBeGreaterThan(0);
    });

    it('每張卡片都應該有必需的字段', () => {
      bibleCards.forEach((card) => {
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('testament');
        expect(card).toHaveProperty('answer');
        expect(card).toHaveProperty('content');
      });
    });

    it('每張卡片的內容應該有必需的字段', () => {
      bibleCards.forEach((card) => {
        expect(card.content).toHaveProperty('verse');
        expect(card.content).toHaveProperty('question');
        expect(card.content).toHaveProperty('options');
        expect(card.content).toHaveProperty('reference');
      });
    });

    it('選項數應該至少為 2', () => {
      bibleCards.forEach((card) => {
        expect(card.content.options.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('正確答案索引應該有效', () => {
      bibleCards.forEach((card) => {
        const { answer } = card;
        const { options } = card.content;
        expect(answer).toBeGreaterThanOrEqual(0);
        expect(answer).toBeLessThan(options.length);
      });
    });

    it('testament 值應該是 old 或 new', () => {
      bibleCards.forEach((card) => {
        expect(['old', 'new']).toContain(card.testament);
      });
    });

    it('卡片 ID 應該唯一', () => {
      const ids = bibleCards.map((card) => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('translations', () => {
    it('應該有所有必需的翻譯分類', () => {
      expect(translations).toHaveProperty('title');
      expect(translations).toHaveProperty('menu');
      expect(translations).toHaveProperty('game');
      expect(translations).toHaveProperty('finished');
      expect(translations).toHaveProperty('leaderboard');
      expect(translations).toHaveProperty('common');
    });

    it('menu 應該有所有必需的字段', () => {
      const { menu } = translations;
      expect(menu).toHaveProperty('nameLabel');
      expect(menu).toHaveProperty('namePlaceholder');
      expect(menu).toHaveProperty('modeLabel');
      expect(menu).toHaveProperty('startBtn');
    });

    it('game 應該有所有必需的字段', () => {
      const { game } = translations;
      expect(game).toHaveProperty('progress');
      expect(game).toHaveProperty('score');
      expect(game).toHaveProperty('answer');
      expect(game).toHaveProperty('option');
      expect(game).toHaveProperty('time');
      expect(game).toHaveProperty('cardTime');
    });

    it('finished 應該有所有必需的字段', () => {
      const { finished } = translations;
      expect(finished).toHaveProperty('title');
      expect(finished).toHaveProperty('subtitle');
      expect(finished).toHaveProperty('score');
      expect(finished).toHaveProperty('answers');
      expect(finished).toHaveProperty('accuracy');
      expect(finished).toHaveProperty('allAnswers');
    });
  });
});
