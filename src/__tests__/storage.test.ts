import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  GameRecord,
  saveGameRecord,
  getAllRecords,
  getLeaderboard,
  getPlayerRecords,
  GameProgressState,
  saveGameProgress,
  loadGameProgress,
  clearGameProgress,
  GameResultState,
  saveGameResult,
  loadGameResult,
  clearGameResult,
} from '../lib/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('GameRecord operations', () => {
    it('應該保存遊戲記錄', () => {
      const record: GameRecord = {
        playerName: 'Eden',
        score: 100,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 8,
        totalQuestions: 10,
        accuracy: 80,
        id: '123',
        createdAt: new Date().toISOString(),
      };

      saveGameRecord(record);
      const allRecords = getAllRecords();
      expect(allRecords.length).toBe(1);
      expect(allRecords[0].playerName).toBe('Eden');
    });

    it('應該獲取所有記錄', () => {
      const record1: GameRecord = {
        playerName: 'Player1',
        score: 100,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 8,
        totalQuestions: 10,
        accuracy: 80,
        id: '1',
        createdAt: new Date().toISOString(),
      };

      const record2: GameRecord = {
        playerName: 'Player2',
        score: 90,
        quizTime: 55,
        gameMode: 'all',
        correctCount: 7,
        totalQuestions: 10,
        accuracy: 70,
        id: '2',
        createdAt: new Date().toISOString(),
      };

      saveGameRecord(record1);
      saveGameRecord(record2);
      const allRecords = getAllRecords();
      expect(allRecords.length).toBe(2);
    });

    it('應該按分數排序排行榜', () => {
      const record1: GameRecord = {
        playerName: 'Player1',
        score: 50,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 5,
        totalQuestions: 10,
        accuracy: 50,
        id: '1',
        createdAt: new Date().toISOString(),
      };

      const record2: GameRecord = {
        playerName: 'Player2',
        score: 100,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 10,
        totalQuestions: 10,
        accuracy: 100,
        id: '2',
        createdAt: new Date().toISOString(),
      };

      saveGameRecord(record1);
      saveGameRecord(record2);
      const leaderboard = getLeaderboard();
      expect(leaderboard[0].score).toBe(100);
      expect(leaderboard[1].score).toBe(50);
    });

    it('應該獲取特定玩家的記錄', () => {
      const record1: GameRecord = {
        playerName: 'Eden',
        score: 100,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 8,
        totalQuestions: 10,
        accuracy: 80,
        id: '1',
        createdAt: new Date().toISOString(),
      };

      const record2: GameRecord = {
        playerName: 'Other',
        score: 50,
        quizTime: 60,
        gameMode: 'all',
        correctCount: 5,
        totalQuestions: 10,
        accuracy: 50,
        id: '2',
        createdAt: new Date().toISOString(),
      };

      saveGameRecord(record1);
      saveGameRecord(record2);
      const playerRecords = getPlayerRecords('Eden');
      expect(playerRecords.length).toBe(1);
      expect(playerRecords[0].playerName).toBe('Eden');
    });
  });

  describe('GameProgress operations', () => {
    it('應該保存和讀取遊戲進度', () => {
      const progress: GameProgressState = {
        playerName: 'TestPlayer',
        gameMode: 'all',
        currentCardIndex: 2,
        answered: false,
        selectedAnswer: null,
        score: 50,
        correctCount: 1,
        gameCards: [],
        gameStartTime: Date.now(),
        cardStartTime: Date.now(),
        cardTimes: [5, 3],
        accumulatedGameTime: 8,
        wrongAnswers: [],
      };

      saveGameProgress(progress);
      const loaded = loadGameProgress();
      expect(loaded).not.toBeNull();
      expect(loaded?.playerName).toBe('TestPlayer');
      expect(loaded?.score).toBe(50);
    });

    it('應該清除遊戲進度', () => {
      const progress: GameProgressState = {
        playerName: 'TestPlayer',
        gameMode: 'all',
        currentCardIndex: 0,
        answered: false,
        selectedAnswer: null,
        score: 0,
        correctCount: 0,
        gameCards: [],
        gameStartTime: Date.now(),
        cardStartTime: null,
        cardTimes: [],
        accumulatedGameTime: 0,
        wrongAnswers: [],
      };

      saveGameProgress(progress);
      clearGameProgress();
      const loaded = loadGameProgress();
      expect(loaded).toBeNull();
    });
  });

  describe('GameResult operations', () => {
    it('應該保存和讀取遊戲結果', () => {
      const result: GameResultState = {
        playerName: 'TestPlayer',
        score: 80,
        quizTime: 120,
        correctCount: 8,
        totalQuestions: 10,
        accuracy: 80,
        gameMode: 'all',
        cardTimes: [10, 12, 8],
        wrongAnswers: [],
        accumulatedGameTime: 30,
      };

      saveGameResult(result);
      const loaded = loadGameResult();
      expect(loaded).not.toBeNull();
      expect(loaded?.score).toBe(80);
      expect(loaded?.accuracy).toBe(80);
    });

    it('應該清除遊戲結果', () => {
      const result: GameResultState = {
        playerName: 'TestPlayer',
        score: 80,
        quizTime: 120,
        correctCount: 8,
        totalQuestions: 10,
        accuracy: 80,
        gameMode: 'all',
        cardTimes: [],
        wrongAnswers: [],
        accumulatedGameTime: 120,
      };

      saveGameResult(result);
      clearGameResult();
      const loaded = loadGameResult();
      expect(loaded).toBeNull();
    });
  });
});
