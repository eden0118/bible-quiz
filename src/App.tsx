/**
 * 聖經智慧卡片遊戲主應用
 *
 * 功能：
 * - 管理遊戲狀態 (菜單、遊戲中、結束)
 * - 處理卡片篩選邏輯 (全部/舊約/新約)
 * - 實現計分系統
 * - 管理本地排行榜 (localStorage)
 *
 * 架構設計：
 * - 業務邏輯分離在 gameLogic.ts
 * - 本地存儲在 storage.ts
 * - 狀態管理使用 Zustand (gameStore.ts)
 * - UI 文字集中管理在 i18n.ts
 */

import { useEffect, useRef } from 'react';
import { bibleCards, translations, BibleCard } from './database';
import { Background, Footer } from './components';
import { MenuScreen, GameScreen, FinishedScreen } from './pages';
import { saveGameRecord } from './lib/storage';
import { filterCards, calculateScore, calculateGameTime, calculateAccuracy } from './lib/gameLogic';
import { useGameStore } from './lib/gameStore';

//  開發階段調整點：修改此數值以改變每次遊戲的題數
const CARDS_PER_GAME = 10;

const t = translations;

// --- Main App Component ---
export default function App() {
  // ========== 使用 Zustand Store 管理狀態 ==========
  const {
    gameState,
    playerName,
    gameMode,
    currentCardIndex,
    answered,
    selectedAnswer,
    score,
    correctCount,
    gameCards,
    cardsReady,
    gameStartTime,
    cardStartTime,
    setGameState,
    setPlayerName,
    setGameMode,
    setCurrentCardIndex,
    setAnswered,
    setSelectedAnswer,
    addScore,
    incrementCorrectCount,
    setGameCards,
    setCardsReady,
    setCardStartTime,
    startGame,
    endGame,
    resetGame,
    loadSavedProgress,
    loadSavedResult,
    saveProgress,
    setGameResult,
    nextCard: storeNextCard,
  } = useGameStore();

  // ========== 時間計算 Ref ==========
  const cardStartTimeRef = useRef<number | null>(cardStartTime);
  const gameStartTimeRef = useRef<number | null>(gameStartTime);

  // ========== 初始化：檢查是否有已保存的遊戲進度或結果 ==========
  useEffect(() => {
    // 先檢查是否有已保存的結果（結束狀態）
    if (!loadSavedResult()) {
      // 若沒有結果，檢查是否有已保存的遊戲進度（進行中）
      loadSavedProgress();
    }
  }, []);

  // 初始化遊戲卡片（只在遊戲開始時執行一次）
  useEffect(() => {
    if (gameState === 'playing' && gameCards.length === 0) {
      // 使用 gameLogic.ts 中的篩選函數
      const filteredCards = filterCards(bibleCards, gameMode, CARDS_PER_GAME);
      setGameCards(filteredCards);
      setCardsReady(true);
      setCardStartTime(Date.now());
    }
  }, [gameState, gameMode, gameCards.length, setGameCards, setCardsReady, setCardStartTime]);

  // 當卡片索引改變時，重新計時
  useEffect(() => {
    if (gameState === 'playing' && cardsReady && !answered) {
      cardStartTimeRef.current = Date.now();
      setCardStartTime(Date.now());
    }
  }, [currentCardIndex, gameState, cardsReady, answered, setCardStartTime]);

  // ========== 自動保存遊戲進度 ==========
  useEffect(() => {
    saveProgress();
  }, [
    gameState,
    currentCardIndex,
    score,
    correctCount,
    selectedAnswer,
    answered,
    playerName,
    gameMode,
    cardsReady,
    saveProgress,
  ]);

  // ========== 遊戲事件處理 ==========

  const handleStartGame = () => {
    startGame();
  };

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return;

    const currentCard = gameCards[currentCardIndex];
    const isCorrect = selectedIndex === currentCard.answer;

    setSelectedAnswer(selectedIndex);
    setAnswered(true);

    // 計算答題時間並加分
    const timeElapsed = cardStartTimeRef.current
      ? (Date.now() - cardStartTimeRef.current) / 1000
      : 0;

    if (isCorrect) {
      const points = calculateScore(timeElapsed);
      addScore(points);
      incrementCorrectCount();
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < gameCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      handleEndGame();
    }
  };

  const handleEndGame = () => {
    // 保存遊戲記錄到本地
    const quizTimeInSeconds = calculateGameTime(gameStartTimeRef.current);
    const accuracy = calculateAccuracy(correctCount, gameCards.length);

    const result = {
      playerName,
      score,
      quizTime: quizTimeInSeconds,
      gameMode,
      correctCount,
      totalQuestions: gameCards.length,
      accuracy,
    };

    // 保存遊戲記錄到排行榜
    saveGameRecord(result);

    // 保存結果狀態到 localStorage，以便刷新後能恢復
    setGameResult(result);
  };

  const handleResetGame = () => {
    resetGame();
  };

  // ========== 渲染邏輯 ==========

  // 菜單畫面
  if (gameState === 'menu') {
    return (
      <Background>
        <MenuScreen
          playerName={playerName}
          gameMode={gameMode}
          translations={t}
          onPlayerNameChange={setPlayerName}
          onGameModeChange={setGameMode}
          onStartGame={handleStartGame}
        />
        <Footer />
      </Background>
    );
  }

  // 遊戲畫面
  if (gameState === 'playing' && gameCards.length > 0 && cardsReady) {
    const currentCard = gameCards[currentCardIndex];

    return (
      <Background>
        <GameScreen
          currentCard={currentCard}
          currentCardIndex={currentCardIndex}
          totalCards={gameCards.length}
          score={score}
          answered={answered}
          selectedAnswer={selectedAnswer}
          translations={t}
          onAnswer={handleAnswer}
          onNextCard={handleNextCard}
          onBack={() => setGameState('menu')}
        />
        <Footer />
      </Background>
    );
  }

  // 結束畫面
  if (gameState === 'finished') {
    const accuracy = calculateAccuracy(correctCount, gameCards.length);

    return (
      <Background>
        <FinishedScreen
          score={score}
          totalCards={gameCards.length}
          accuracy={accuracy}
          playerName={playerName}
          translations={t}
          onBackToMenu={handleResetGame}
        />
        <Footer />
      </Background>
    );
  }

  return null;
}
