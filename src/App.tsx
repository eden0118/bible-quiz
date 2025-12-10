import React, { useState, useEffect, useRef } from 'react';
import { bibleCards, BibleCard } from './data';
import { translations, Language } from './i18n';
import { ThemeMode, applyTheme } from './theme';

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

// --- Components ---

// Geometric Gradient Background
const Background = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen overflow-hidden bg-[#F2F2F2] font-sans text-neutral-900 transition-colors duration-500 selection:bg-orange-500 selection:text-white dark:bg-[#050505] dark:text-white">
    {/* Cinematic Geometric Shapes */}
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Shape 1: The 'Sun' - Top Right */}
      <div className="animate-blob absolute -top-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 opacity-60 blur-[80px] dark:opacity-50"></div>

      {/* Shape 2: The 'Moon' - Bottom Left */}
      <div className="animate-blob animation-delay-2000 absolute -bottom-[10%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 opacity-60 blur-[90px] dark:opacity-40"></div>

      {/* Shape 3: Accent - Center */}
      <div className="animate-blob animation-delay-4000 absolute top-[30%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-gradient-to-r from-amber-300 to-orange-500 opacity-40 blur-[100px] dark:opacity-20"></div>

      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150"></div>
    </div>

    <div className="relative z-10 flex h-full min-h-screen w-full flex-col">{children}</div>
  </div>
);

// Modern Dark/Light Glass Card
const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[2.5rem] border border-white/50 bg-white/70 shadow-2xl shadow-orange-500/10 backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-black/50 ${className}`}
  >
    {children}
  </div>
);

// Button
const Button = ({
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  children,
}: {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}) => {
  const baseStyle =
    'px-8 py-4 font-bold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyle =
    variant === 'primary'
      ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50 active:scale-95'
      : 'bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 active:scale-95';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [filteredCards, setFilteredCards] = useState<BibleCard[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
    const savedLeaderboard = localStorage.getItem('leaderboard');

    if (savedTheme) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }

    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    applyTheme(themeMode);
  }, [themeMode]);

  // Game Logic
  useEffect(() => {
    if (gameMode === 'all') {
      setFilteredCards(bibleCards);
    } else {
      setFilteredCards(bibleCards.filter((card) => card.testament === gameMode));
    }
    setCurrentCardIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
  }, [gameMode]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing' || answered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAnswered(true);
          setSelectedAnswer(-1); // Timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = timer;
    return () => clearInterval(timer);
  }, [gameState, answered]);

  // Event Handlers
  const startGame = () => {
    if (!playerName.trim()) return;
    setGameState('playing');
    setCurrentCardIndex(0);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const currentCard = filteredCards[currentCardIndex];
    if (optionIndex === currentCard.answer) {
      const earnedScore = Math.max(BASE_SCORE - Math.floor((TIMER_SECONDS - timeLeft) / 2), 1);
      setScore((prev) => prev + earnedScore);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setTimeLeft(TIMER_SECONDS);
      setSelectedAnswer(null);
      setAnswered(false);
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
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          {/* Title */}
          <div className="mb-12 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-8xl font-black text-transparent">
              {t.title.line1}
            </h1>
            <h2 className="mb-4 text-5xl font-black text-orange-500">{t.title.line2}</h2>
            <p className="mb-2 text-xl text-neutral-600 dark:text-neutral-400">{t.title.sub}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{t.title.resources}</p>
          </div>

          {/* Input Card */}
          <GlassCard className="mb-8 w-full max-w-2xl space-y-6 p-12">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold">{t.menu.nameLabel}</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startGame()}
                placeholder={t.menu.namePlaceholder}
                className="w-full rounded-2xl border border-neutral-300 bg-white/50 px-6 py-4 text-lg focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800/50 dark:focus:ring-orange-400"
              />
            </div>

            {/* Mode Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold">{t.menu.modeLabel}</label>
              <div className="flex gap-4">
                {(['old', 'new', 'all'] as GameMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGameMode(mode)}
                    className={`flex-1 rounded-2xl border-2 px-6 py-4 font-bold transition-all duration-300 ${
                      gameMode === mode
                        ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                        : 'border-neutral-300 bg-white/30 hover:bg-white/50 dark:border-neutral-700 dark:bg-neutral-800/30 dark:hover:bg-neutral-700/50'
                    }`}
                  >
                    {t.menu.modes[mode]}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              onClick={startGame}
              disabled={!playerName.trim()}
              className="w-full py-5 text-xl"
            >
              {t.menu.startBtn}
            </Button>
          </GlassCard>

          {/* Theme & Language Toggle */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              variant="secondary"
              className="text-sm"
            >
              {themeMode === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              variant="secondary"
              className="text-sm"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </Button>
          </div>

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="mt-12 w-full max-w-2xl">
              <GlassCard className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-orange-500">
                  🏆 {language === 'zh' ? '排行榜' : 'Leaderboard'}
                </h3>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-white/20 bg-white/30 p-4 dark:border-neutral-700/50 dark:bg-neutral-800/30"
                    >
                      <div>
                        <p className="text-lg font-bold">
                          {idx + 1}. {entry.name}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {entry.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-orange-500">{entry.score}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {entry.mode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </Background>
    );
  }

  // Game State
  if (gameState === 'playing' && filteredCards.length > 0) {
    const currentCard = filteredCards[currentCardIndex];
    const cardContent = currentCard.content[language];
    const progressPercent = ((currentCardIndex + 1) / filteredCards.length) * 100;

    return (
      <Background>
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          {/* Header */}
          <div className="mb-8 w-full max-w-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {t.game.progress}
                  </p>
                  <p className="text-3xl font-black text-orange-500">
                    {currentCardIndex + 1}/{filteredCards.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {t.game.score}
                  </p>
                  <p className="text-3xl font-black text-orange-500">{score}</p>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">⏱️</p>
                  <p
                    className={`text-3xl font-black ${timeLeft <= 5 ? 'animate-pulse text-red-500' : 'text-orange-500'}`}
                  >
                    {timeLeft}s
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {t.game.testaments[currentCard.testament]}
                </p>
                <Button
                  onClick={() => setGameState('menu')}
                  variant="secondary"
                  className="text-sm"
                >
                  {language === 'zh' ? '返回' : 'Back'}
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Card */}
          <GlassCard className="mb-8 w-full max-w-2xl p-12">
            {/* Verse */}
            <p className="mb-8 border-l-4 border-orange-500 pl-6 text-lg leading-relaxed text-neutral-700 italic dark:text-neutral-300">
              "{cardContent.verse}"
            </p>

            {/* Question */}
            <h3 className="mb-8 text-center text-3xl font-bold">{cardContent.question}</h3>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {cardContent.options.map((option, idx) => {
                const isCorrect = idx === currentCard.answer;
                const isSelected = idx === selectedAnswer;
                const showResult = answered && isSelected;
                const showCorrect = answered && isCorrect && !isSelected;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`rounded-2xl border-2 p-6 text-left text-lg font-semibold transition-all duration-300 ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/20 text-green-700 dark:text-green-300'
                          : 'border-red-500 bg-red-500/20 text-red-700 dark:text-red-300'
                        : showCorrect
                          ? 'border-green-500 bg-green-500/20 text-green-700 dark:text-green-300'
                          : `${
                              answered
                                ? 'cursor-not-allowed border-neutral-400 bg-neutral-200/30 dark:border-neutral-600 dark:bg-neutral-800/30'
                                : 'cursor-pointer border-neutral-300 bg-white/30 hover:bg-white/50 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/30 dark:hover:bg-neutral-700/50'
                            }`
                    }`}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {answered && (
              <div className="mt-8 rounded-2xl border-2 border-blue-500/50 bg-blue-500/10 p-6 dark:bg-blue-500/20">
                <p className="mb-2 font-bold text-blue-700 dark:text-blue-300">{t.game.answer}</p>
                <p className="text-blue-700 dark:text-blue-300">
                  {cardContent.options[currentCard.answer]}
                </p>
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  {cardContent.reference}
                </p>
              </div>
            )}
          </GlassCard>

          {/* Action Button */}
          {answered && (
            <Button onClick={nextCard} className="px-12 py-5 text-xl">
              {currentCardIndex < filteredCards.length - 1
                ? language === 'zh'
                  ? '下一題'
                  : 'Next'
                : language === 'zh'
                  ? '完成'
                  : 'Finish'}
            </Button>
          )}
        </div>
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
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          {/* Result Card */}
          <GlassCard className="mb-8 w-full max-w-2xl p-12 text-center">
            <h2 className="mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-5xl font-black text-transparent">
              {accuracy >= 80 ? '🎉 ' : accuracy >= 60 ? '👍 ' : '💪 '}
              {language === 'zh' ? '挑戰完成' : 'Challenge Complete'}
            </h2>

            <div className="mb-8 space-y-6">
              <div>
                <p className="mb-2 text-neutral-600 dark:text-neutral-400">{t.game.score}</p>
                <p className="text-6xl font-black text-orange-500">{score}</p>
              </div>

              <div className="h-1 w-full bg-neutral-300 dark:bg-neutral-700"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {language === 'zh' ? '答題數' : 'Questions'}
                  </p>
                  <p className="text-2xl font-bold">{filteredCards.length}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {language === 'zh' ? '正確率' : 'Accuracy'}
                  </p>
                  <p className="text-2xl font-bold text-orange-500">{accuracy}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full py-4 text-lg">
                {language === 'zh' ? '返回首頁' : 'Back to Menu'}
              </Button>
            </div>
          </GlassCard>

          {/* Updated Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="w-full max-w-2xl">
              <GlassCard className="p-8">
                <h3 className="mb-6 text-center text-2xl font-bold text-orange-500">🏆 Top 5</h3>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((entry, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between rounded-xl border p-4 ${
                        entry.name === playerName && entry.score === score
                          ? 'border-2 border-orange-500 bg-orange-500/20'
                          : 'border border-white/20 bg-white/30 dark:border-neutral-700/50 dark:bg-neutral-800/30'
                      }`}
                    >
                      <div>
                        <p className="text-lg font-bold">
                          {idx + 1}. {entry.name}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {entry.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-orange-500">{entry.score}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {entry.mode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </Background>
    );
  }

  return null;
}
