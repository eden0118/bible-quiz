import React, { useState, useEffect, useRef } from 'react';
import { bibleCards } from './data';
import { translations, Language } from './i18n';
import { applyTheme, loadTheme, saveTheme } from './theme';
import type { ThemeMode } from './theme';
import { Background, MenuScreen, GameScreen, FinishedScreen } from './components';

// --- Types ---
interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  mode: string;
}

type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'all' | 'old' | 'new';

const TIMER_SECONDS = 15;
const BASE_SCORE = 10;

// --- Main App Component ---
export default function App() {
  // State Management
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState<GameMode>('all');
  const [language, setLanguage] = useState<Language>('zh');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('leaderboard');
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameStartedRef = useRef(false);

  // Initialize theme on mount only
  useEffect(() => {
    const savedTheme = loadTheme();
    applyTheme(savedTheme);
    setThemeMode(savedTheme);
  }, []);

  // Listen for theme changes and update DOM + localStorage
  useEffect(() => {
    applyTheme(themeMode);
    saveTheme(themeMode);
  }, [themeMode]);

  // Get filtered cards based on game mode
  const filteredCards = bibleCards.filter((card) => {
    if (gameMode === 'all') return true;
    return card.testament === gameMode;
  });

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && !answered) {
      if (!gameStartedRef.current) {
        gameStartedRef.current = true;
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setAnswered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState, answered]);

  // Answer timeout after 3 seconds of showing result
  useEffect(() => {
    if (answered && gameState === 'playing') {
      const timeout = setTimeout(() => {
        if (currentCardIndex < filteredCards.length - 1) {
          nextCard();
        } else {
          endGame();
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [answered, currentCardIndex, filteredCards.length, gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentCardIndex(0);
    setTimeLeft(TIMER_SECONDS);
    setAnswered(false);
    setSelectedAnswer(null);
    gameStartedRef.current = false;
  };

  const handleAnswer = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === filteredCards[currentCardIndex].answer) {
      setScore((prev) => prev + BASE_SCORE);
    }

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setTimeLeft(TIMER_SECONDS);
      setAnswered(false);
      setSelectedAnswer(null);
      gameStartedRef.current = false;
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const newEntry: LeaderboardEntry = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US'),
      mode: gameMode,
    };

    const updatedLeaderboard = [newEntry, ...leaderboard].slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    setGameState('finished');
  };

  const resetGame = () => {
    setPlayerName('');
    setGameState('menu');
    setGameMode('all');
    setScore(0);
    setCurrentCardIndex(0);
    setTimeLeft(TIMER_SECONDS);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const t = translations[language];

  // Menu State
  if (gameState === 'menu') {
    return (
      <Background>
        <MenuScreen
          playerName={playerName}
          gameMode={gameMode}
          language={language}
          themeMode={themeMode}
          leaderboard={leaderboard}
          translations={t}
          onPlayerNameChange={setPlayerName}
          onGameModeChange={setGameMode}
          onStartGame={startGame}
          onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          onToggleLanguage={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        />
      </Background>
    );
  }

  // Game State
  if (gameState === 'playing' && filteredCards.length > 0) {
    const currentCard = filteredCards[currentCardIndex];

    return (
      <Background>
        <div className="absolute top-6 right-6 z-50 flex gap-3">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="rounded-full border border-neutral-200/20 bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-neutral-900 uppercase backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:text-white"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/20 bg-white/10 text-sm text-neutral-900 backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:text-white"
          >
            {themeMode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <GameScreen
          currentCard={currentCard}
          currentCardIndex={currentCardIndex}
          totalCards={filteredCards.length}
          score={score}
          timeLeft={timeLeft}
          language={language}
          answered={answered}
          selectedAnswer={selectedAnswer}
          translations={t}
          onAnswer={handleAnswer}
          onNextCard={nextCard}
          onBack={() => setGameState('menu')}
        />
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
        <div className="absolute top-6 right-6 z-50 flex gap-3">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="rounded-full border border-neutral-200/20 bg-white/10 px-4 py-2 text-xs font-black tracking-widest text-neutral-900 uppercase backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:text-white"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/20 bg-white/10 text-sm text-neutral-900 backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:text-white"
          >
            {themeMode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <FinishedScreen
          score={score}
          filteredCardsLength={filteredCards.length}
          accuracy={accuracy}
          language={language}
          playerName={playerName}
          leaderboard={leaderboard}
          translations={t}
          onBackToMenu={resetGame}
        />
      </Background>
    );
  }

  return null;
}
