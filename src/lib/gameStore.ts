/**
 * Zustand 遊戲狀態管理 Store
 *
 * 職責：
 * - 集中管理所有遊戲狀態
 * - 提供狀態更新方法
 * - 整合 localStorage 持久化
 */

import { create } from 'zustand';
import { BibleCard } from '../database';
import {
  saveGameProgress,
  loadGameProgress,
  clearGameProgress,
  saveGameResult,
  loadGameResult,
  clearGameResult,
  GameResultState,
} from './storage';

// ========== 類型定義 ==========
export type GameState = 'menu' | 'playing' | 'finished';
export type GameMode = 'all' | 'old' | 'new';

export interface GameStoreState {
  // ========== 基礎狀態 ==========
  gameState: GameState;
  playerName: string;
  gameMode: GameMode;

  // ========== 遊戲進度狀態 ==========
  currentCardIndex: number;
  answered: boolean;
  selectedAnswer: number | null;

  // ========== 計分狀態 ==========
  score: number;
  correctCount: number;

  // ========== 卡片管理 ==========
  gameCards: BibleCard[];
  cardsReady: boolean;

  // ========== 時間計算 ==========
  gameStartTime: number | null;
  cardStartTime: number | null;

  // ========== 時間追蹤 ==========
  cardTimes: number[]; // 每個題目花費的時間（秒）

  // ========== 錯誤追蹤 ==========
  wrongAnswers: Array<{
    card: BibleCard;
    selectedIndex: number;
    timeElapsed: number;
  }>;

  // ========== 狀態更新方法 ==========
  setGameState: (state: GameState) => void;
  setPlayerName: (name: string) => void;
  setGameMode: (mode: GameMode) => void;
  setCurrentCardIndex: (index: number) => void;
  setAnswered: (answered: boolean) => void;
  setSelectedAnswer: (index: number | null) => void;
  setScore: (score: number) => void;
  addScore: (points: number) => void;
  setCorrectCount: (count: number) => void;
  incrementCorrectCount: () => void;
  setGameCards: (cards: BibleCard[]) => void;
  setCardsReady: (ready: boolean) => void;
  setGameStartTime: (time: number | null) => void;
  setCardStartTime: (time: number | null) => void;
  addCardTime: (time: number) => void;
  addWrongAnswer: (card: BibleCard, selectedIndex: number, timeElapsed: number) => void;
  clearCardTimes: () => void;
  clearWrongAnswers: () => void;

  // ========== 複合操作 ==========
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  loadSavedProgress: () => boolean;
  loadSavedResult: () => boolean;
  saveProgress: () => void;
  setGameResult: (result: GameResultState) => void;
  handleAnswer: (
    selectedIndex: number,
    timeElapsed: number,
    isCorrect: boolean,
    points: number
  ) => void;
  nextCard: () => void;
}

// ========== Store 創建 ==========
export const useGameStore = create<GameStoreState>((set, get) => ({
  // ========== 初始狀態 ==========
  gameState: 'menu',
  playerName: '',
  gameMode: 'all',
  currentCardIndex: 0,
  answered: false,
  selectedAnswer: null,
  score: 0,
  correctCount: 0,
  gameCards: [],
  cardsReady: false,
  gameStartTime: null,
  cardStartTime: null,
  cardTimes: [],
  wrongAnswers: [],

  // ========== 單個狀態更新 ==========
  setGameState: (state) => set({ gameState: state }),
  setPlayerName: (name) => set({ playerName: name }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
  setAnswered: (answered) => set({ answered }),
  setSelectedAnswer: (index) => set({ selectedAnswer: index }),
  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setCorrectCount: (count) => set({ correctCount: count }),
  incrementCorrectCount: () => set((state) => ({ correctCount: state.correctCount + 1 })),
  setGameCards: (cards) => set({ gameCards: cards }),
  setCardsReady: (ready) => set({ cardsReady: ready }),
  setGameStartTime: (time) => set({ gameStartTime: time }),
  setCardStartTime: (time) => set({ cardStartTime: time }),
  addCardTime: (time) =>
    set((state) => ({
      cardTimes: [...state.cardTimes, time],
    })),
  addWrongAnswer: (card, selectedIndex, timeElapsed) =>
    set((state) => ({
      wrongAnswers: [...state.wrongAnswers, { card, selectedIndex, timeElapsed }],
    })),
  clearCardTimes: () => set({ cardTimes: [] }),
  clearWrongAnswers: () => set({ wrongAnswers: [] }),

  // ========== 複合操作 ==========
  startGame: () => {
    clearGameProgress();
    set({
      gameState: 'playing',
      score: 0,
      correctCount: 0,
      currentCardIndex: 0,
      answered: false,
      selectedAnswer: null,
      gameCards: [],
      cardsReady: false,
      gameStartTime: Date.now(),
      cardStartTime: null,
      cardTimes: [],
      wrongAnswers: [],
    });
  },

  endGame: () => {
    clearGameProgress();
    set({ gameState: 'finished' });
  },

  resetGame: () => {
    clearGameProgress();
    clearGameResult();
    set({
      gameState: 'menu',
      playerName: '',
      gameMode: 'all',
      currentCardIndex: 0,
      answered: false,
      selectedAnswer: null,
      score: 0,
      correctCount: 0,
      gameCards: [],
      cardsReady: false,
      gameStartTime: null,
      cardStartTime: null,
      cardTimes: [],
      wrongAnswers: [],
    });
  },

  loadSavedProgress: () => {
    const savedProgress = loadGameProgress();
    if (savedProgress) {
      set({
        playerName: savedProgress.playerName,
        gameMode: savedProgress.gameMode,
        currentCardIndex: savedProgress.currentCardIndex,
        score: savedProgress.score,
        correctCount: savedProgress.correctCount,
        selectedAnswer: savedProgress.selectedAnswer,
        answered: savedProgress.answered,
        gameCards: savedProgress.gameCards,
        gameStartTime: savedProgress.gameStartTime,
        cardStartTime: savedProgress.cardStartTime,
        cardTimes: savedProgress.cardTimes || [],
        wrongAnswers: savedProgress.wrongAnswers || [],
        cardsReady: true,
        gameState: 'playing',
      });
      console.log('✅ 已恢復遊戲進度');
      return true;
    }
    return false;
  },

  loadSavedResult: () => {
    const savedResult = loadGameResult();
    if (savedResult) {
      set({
        playerName: savedResult.playerName,
        gameMode: savedResult.gameMode,
        score: savedResult.score,
        correctCount: savedResult.correctCount,
        gameCards: [],
        gameState: 'finished',
      });
      console.log('✅ 已恢復遊戲結果');
      return true;
    }
    return false;
  },

  saveProgress: () => {
    const state = get();
    if (state.gameState === 'playing' && state.cardsReady && state.gameCards.length > 0) {
      saveGameProgress({
        playerName: state.playerName,
        gameMode: state.gameMode,
        currentCardIndex: state.currentCardIndex,
        score: state.score,
        correctCount: state.correctCount,
        selectedAnswer: state.selectedAnswer,
        answered: state.answered,
        gameCards: state.gameCards,
        gameStartTime: state.gameStartTime,
        cardStartTime: state.cardStartTime,
        cardTimes: state.cardTimes,
        wrongAnswers: state.wrongAnswers,
      });
    }
  },

  setGameResult: (result: GameResultState) => {
    saveGameResult(result);
    set({
      playerName: result.playerName,
      gameMode: result.gameMode,
      score: result.score,
      correctCount: result.correctCount,
      gameState: 'finished',
      cardTimes: result.cardTimes || [],
      wrongAnswers: result.wrongAnswers || [],
    });
  },

  handleAnswer: (selectedIndex, timeElapsed, isCorrect, points) => {
    const state = get();
    set({ selectedAnswer: selectedIndex, answered: true });

    if (isCorrect) {
      set((s) => ({
        score: s.score + points,
        correctCount: s.correctCount + 1,
      }));
    }
  },

  nextCard: () => {
    const state = get();
    if (state.currentCardIndex < state.gameCards.length - 1) {
      set({
        currentCardIndex: state.currentCardIndex + 1,
        answered: false,
        selectedAnswer: null,
      });
    } else {
      set({ gameState: 'finished' });
      clearGameProgress();
    }
  },
}));
