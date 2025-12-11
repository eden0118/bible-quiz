import { useState } from 'react';
import { bibleCards, translations } from './database';
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

  // Get filtered cards based on game mode
  const filteredCards = bibleCards.filter((card) => {
    if (gameMode === 'all') return true;
    return card.testament === gameMode;
  });

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentCardIndex(0);
    setAnswered(false);
    setSelectedAnswer(null);
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
    setGameState('finished');
  };

  const resetGame = () => {
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
  if (gameState === 'playing' && filteredCards.length > 0) {
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
