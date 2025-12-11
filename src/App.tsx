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
import { saveGameRecord } from './lib/supabase';

// --- Types ---
type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'all' | 'old' | 'new';

// 🎯 開發階段調整點：修改此數值以改變每次遊戲的題數
const CARDS_PER_GAME = 5;

// ⏱️ 計時計分規則
// 3秒內 10分，5秒內 9分，10秒內8分，15秒內7分，20秒內6分，超過20秒 5分
const SCORE_BY_TIME = [
  { timeLimit: 3, score: 10 },
  { timeLimit: 5, score: 9 },
  { timeLimit: 10, score: 8 },
  { timeLimit: 15, score: 7 },
  { timeLimit: 20, score: 6 },
];
const BASE_SCORE = 5;

// 根據答題時間計算分數
const calculateScore = (timeInSeconds: number): number => {
  for (const tier of SCORE_BY_TIME) {
    if (timeInSeconds <= tier.timeLimit) {
      return tier.score;
    }
  }
  return BASE_SCORE;
};

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
  const [correctCount, setCorrectCount] = useState(0);

  // 🔒 使用 Ref 儲存遊戲卡片列表，確保遊戲中不會重新生成
  const gameCardsRef = useRef<BibleCard[]>([]);
  const [cardsReady, setCardsReady] = useState(false);

  // ⏱️ 計時相關狀態
  const [cardStartTime, setCardStartTime] = useState<number | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const cardTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      // 記錄第一題的開始時間
      setCardStartTime(Date.now());
    }
  }, [gameState, gameMode]);

  // 當卡片索引改變時，記錄新卡片的開始時間
  useEffect(() => {
    if (gameState === 'playing' && cardsReady && !answered) {
      setCardStartTime(Date.now());
    }
  }, [currentCardIndex, gameState, cardsReady, answered]);

  // 獲取當前遊戲卡片列表
  const filteredCards = gameCardsRef.current;

  const startGame = () => {
    // 重置所有遊戲狀態
    setScore(0);
    setCorrectCount(0);
    setCurrentCardIndex(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setCardStartTime(null);
    setGameStartTime(Date.now()); // 記錄遊戲開始時間
    // 清空 Ref，讓 useEffect 重新生成遊戲卡片
    gameCardsRef.current = [];
    setGameState('playing');
  };

  const handleAnswer = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    // 計算答題時間（秒）
    const timeElapsed = cardStartTime ? (Date.now() - cardStartTime) / 1000 : 0;

    // 只有答對才計分，分數根據時間決定
    if (index === filteredCards[currentCardIndex].answer) {
      const points = calculateScore(timeElapsed);
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
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
    // 📤 保存遊戲記錄到 Supabase
    const quizTimeInSeconds = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0;
    const accuracy =
      filteredCards.length > 0 ? Math.round((correctCount / filteredCards.length) * 100) : 0;

    saveGameRecord({
      player_name: playerName,
      score: score,
      quiz_time: quizTimeInSeconds,
      game_mode: gameMode,
      correct_count: correctCount,
      total_questions: filteredCards.length,
      accuracy: accuracy,
    }).then((success) => {
      if (success) {
        console.log('✅ 遊戲記錄已上傳到 Supabase');
      } else {
        console.log('⚠️ 遊戲記錄上傳失敗，已保存到本地');
      }
    });

    setCardsReady(false);
    setGameState('finished');
  };

  const resetGame = () => {
    gameCardsRef.current = [];
    setCardsReady(false);
    setCardStartTime(null);
    setGameStartTime(null);
    if (cardTimerRef.current) clearInterval(cardTimerRef.current);
    setPlayerName('');
    setGameState('menu');
    setGameMode('all');
    setScore(0);
    setCorrectCount(0);
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
      filteredCards.length > 0 ? Math.round((correctCount / filteredCards.length) * 100) : 0;

    return (
      <Background>
        <FinishedScreen
          score={score}
          filteredCardsLength={filteredCards.length}
          accuracy={accuracy}
          playerName={playerName}
          translations={t}
          onBackToMenu={resetGame}
        />
        <Footer />
      </Background>
    );
  }

  return null;
}
