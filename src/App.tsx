/**
 * 聖經智慧卡片遊戲主應用
 *
 * 功能：
 * - 管理遊戲狀態 (菜單、遊戲中、結束)
 * - 處理卡片篩選邏輯 (全部/舊約/新約)
 * - 實現計分系統
 * - 管理本地排行榜 (localStorage)
 *
 * 開發調整點：
 * - CARDS_PER_GAME: 每次遊戲的題數（目前為 5 題，開發階段可調整）
 */

import { useState, useRef, useEffect } from 'react';
import { bibleCards, translations, BibleCard } from './database';
import { Background, Footer } from './components';
import { MenuScreen, GameScreen, FinishedScreen } from './screens';

// --- Types ---
interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  mode: string;
}

type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'all' | 'old' | 'new';

// 🎯 開發階段調整點：修改此數值以改變每次遊戲的題數
const CARDS_PER_GAME = 5;
const BASE_SCORE = 10;

// --- Main App Component ---
export default function App() {
  // State Management
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState<GameMode>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('leaderboard');
    return saved ? JSON.parse(saved) : [];
  });

  // 🔒 使用 Ref 儲存遊戲卡片列表，確保遊戲中不會重新生成
  const gameCardsRef = useRef<BibleCard[]>([]);
  const [cardsReady, setCardsReady] = useState(false);

  // 初始化遊戲卡片（只在遊戲開始時執行一次）
  useEffect(() => {
    if (gameState === 'playing' && gameCardsRef.current.length === 0) {
      // 📋 題目選擇邏輯：
      // 1. 根據遊戲模式篩選卡片 (all/old/new)
      // 2. Fisher-Yates 隨機打亂順序
      // 3. 取前 N 題 (CARDS_PER_GAME = 5)

      // 步驟 1: 根據模式篩選卡片
      let filtered = bibleCards.filter((card) => {
        if (gameMode === 'all') return true;
        return card.testament === gameMode;
      });

      // 步驟 2: Fisher-Yates 隨機打亂算法
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);

      // 步驟 3: 取前 CARDS_PER_GAME 題
      gameCardsRef.current = shuffled.slice(0, CARDS_PER_GAME);
      setCardsReady(true);
    }
  }, [gameState, gameMode]);

  // 獲取當前遊戲卡片列表
  const filteredCards = gameCardsRef.current;

  const startGame = () => {
    // 重置所有遊戲狀態
    setScore(0);
    setCurrentCardIndex(0);
    setAnswered(false);
    setSelectedAnswer(null);
    // 清空 Ref，讓 useEffect 重新生成遊戲卡片
    gameCardsRef.current = [];
    setGameState('playing');
  };

  const handleAnswer = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === filteredCards[currentCardIndex].answer) {
      setScore((prev) => prev + BASE_SCORE);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const newEntry: LeaderboardEntry = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString('zh-TW'),
      mode: gameMode,
    };

    const updatedLeaderboard = [newEntry, ...leaderboard].slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    setCardsReady(false);
    setGameState('finished');
  };

  const resetGame = () => {
    gameCardsRef.current = [];
    setCardsReady(false);
    setPlayerName('');
    setGameState('menu');
    setGameMode('all');
    setScore(0);
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const t = translations;

  // Menu State
  if (gameState === 'menu') {
    return (
      <Background>
        <MenuScreen
          playerName={playerName}
          gameMode={gameMode}
          leaderboard={leaderboard}
          translations={t}
          onPlayerNameChange={setPlayerName}
          onGameModeChange={setGameMode}
          onStartGame={startGame}
        />
        <Footer />
      </Background>
    );
  }

  // Game State
  if (gameState === 'playing' && filteredCards.length > 0 && cardsReady) {
    const currentCard = filteredCards[currentCardIndex];

    return (
      <Background>
        <GameScreen
          currentCard={currentCard}
          currentCardIndex={currentCardIndex}
          totalCards={filteredCards.length}
          score={score}
          answered={answered}
          selectedAnswer={selectedAnswer}
          translations={t}
          onAnswer={handleAnswer}
          onNextCard={nextCard}
          onBack={() => setGameState('menu')}
        />
        <Footer />
      </Background>
    );
  }

  // Finished State
  if (gameState === 'finished') {
    const accuracy =
      filteredCards.length > 0
        ? Math.round((score / (filteredCards.length * BASE_SCORE)) * 100)
        : 0;

    return (
      <Background>
        <FinishedScreen
          score={score}
          filteredCardsLength={filteredCards.length}
          accuracy={accuracy}
          playerName={playerName}
          leaderboard={leaderboard}
          translations={t}
          onBackToMenu={resetGame}
        />
        <Footer />
      </Background>
    );
  }

  return null;
}
