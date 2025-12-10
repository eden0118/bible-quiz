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

// Background Wrapper with Grid Pattern
const Background = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen relative overflow-hidden bg-[#F3F0FF] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans selection:bg-purple-200 dark:selection:bg-purple-900 transition-colors duration-500">
    {/* CSS Grid Pattern - Adapted for Dark Mode via opacity/color blend */}
    <div className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.1]"
         style={{
           backgroundImage: 'linear-gradient(to right, #E9D5FF 1px, transparent 1px), linear-gradient(to bottom, #E9D5FF 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
    </div>
    
    {/* Soft Blobs - Colors shift slightly for dark mode */}
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-20 animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-violet-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-200 dark:bg-fuchsia-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000"></div>

    <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
       {children}
    </div>
  </div>
);

// Glass Card Component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_32px_0_rgba(139,92,246,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-[2rem] transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

// Settings Toggle Bar
const SettingsBar = ({ 
  lang, setLang, theme, setTheme 
}: { 
  lang: Language, setLang: (l: Language) => void, 
  theme: ThemeMode, setTheme: (t: ThemeMode) => void 
}) => (
  <div className="absolute top-4 right-4 z-50 flex gap-2">
    <button 
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="px-3 py-1 rounded-full bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all text-slate-600 dark:text-slate-300 backdrop-blur-md"
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-3 py-1 rounded-full bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all text-slate-600 dark:text-slate-300 backdrop-blur-md"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </div>
);

// --- App Component ---
function App() {
  // Global Settings
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Game State
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('all');
  const [userName, setUserName] = useState('');
  
  // Play State
  const [shuffledCards, setShuffledCards] = useState<BibleCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  
  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Refs
  const timerRef = useRef<number | null>(null);

  // Apply Theme
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Load Leaderboard on Mount
  useEffect(() => {
    const saved = localStorage.getItem('bible_flashcards_leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (gameState === 'playing' && selected === null) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, selected, currentIndex]);

  const t = translations[lang];

  const startGame = () => {
    if (!userName.trim()) return;

    let cardsToPlay = bibleCards;
    if (gameMode === 'old') {
      cardsToPlay = bibleCards.filter(c => c.testament === 'old');
    } else if (gameMode === 'new') {
      cardsToPlay = bibleCards.filter(c => c.testament === 'new');
    }

    const shuffled = [...cardsToPlay].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    setSelected(null);
    setTimeLeft(TIMER_SECONDS);
  };

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelected(optionIndex);
    const currentCard = shuffledCards[currentIndex];
    const isCorrect = optionIndex === currentCard.answer;
    
    if (isCorrect) {
      const timeBonus = Math.floor(Math.max(0, timeLeft));
      setScore(s => s + BASE_SCORE + timeBonus);
    }
    
    setTimeout(() => {
      if (currentIndex < shuffledCards.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelected(null);
        setTimeLeft(TIMER_SECONDS);
      } else {
        finishGame();
      }
    }, 1500);
  };

  const finishGame = () => {
    setGameState('finished');
  };

  // Effect to save score when game finishes
  useEffect(() => {
    if (gameState === 'finished') {
      setLeaderboard(prev => {
        const newEntry: LeaderboardEntry = {
          name: userName,
          score: score,
          date: new Date().toLocaleDateString(),
          mode: gameMode === 'all' ? t.menu.modes.all : gameMode === 'old' ? t.menu.modes.old : t.menu.modes.new
        };
        const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
        localStorage.setItem('bible_flashcards_leaderboard', JSON.stringify(updated));
        return updated;
      });
    }
  }, [gameState]);

  const currentCard = shuffledCards[currentIndex] || bibleCards[0];
  const cardContent = currentCard?.content?.[lang] || currentCard?.content?.['en'];

  // --- RENDERERS ---

  // Render: Finished Screen
  if (gameState === 'finished') {
    return (
      <Background>
        <SettingsBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
        <div className="flex-1 flex items-center justify-center p-4">
          <GlassCard className="p-8 md:p-12 w-full max-w-lg animate-fade-in flex flex-col items-center text-center">
            
            <div className="mb-2 uppercase tracking-widest text-xs font-bold text-purple-500 dark:text-purple-400">
              {t.title.resources}
            </div>
            <h1 className="text-5xl font-black text-slate-800 dark:text-white mb-2 tracking-tight leading-tight">
              {t.finish.thankYou}<span className="text-purple-600 dark:text-purple-400">*</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500 dark:from-violet-400 dark:to-fuchsia-400">
                {t.finish.sub}
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-8">
              {t.finish.message}, {userName}
            </p>

            <div className="relative mb-10 w-full">
              <div className="absolute inset-0 bg-purple-200/30 dark:bg-purple-900/30 blur-xl rounded-full transform scale-75"></div>
              <div className="relative text-7xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">
                {score}
              </div>
              <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2">
                {t.finish.totalScore}
              </div>
            </div>

            <div className="w-full bg-white/40 dark:bg-slate-900/40 rounded-3xl p-6 mb-8 border border-white/60 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 text-left pl-2">
                {t.finish.leaderboard}
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {leaderboard.length === 0 ? (
                  <p className="text-slate-400 dark:text-slate-500 text-sm">{t.finish.emptyLeaderboard}</p>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl transition-all ${entry.name === userName && entry.score === score ? 'bg-purple-100/80 dark:bg-purple-900/50' : 'hover:bg-white/30 dark:hover:bg-white/10'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`
                          w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                          ${idx === 0 ? 'bg-yellow-300 text-yellow-800' : 
                            idx === 1 ? 'bg-slate-200 text-slate-600' :
                            idx === 2 ? 'bg-orange-200 text-orange-700' : 'bg-transparent text-slate-400 dark:text-slate-500'}
                        `}>
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <div className="font-bold text-slate-700 dark:text-slate-200 leading-tight">{entry.name}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold tracking-wider">{entry.mode}</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-lg">{entry.score}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
              onClick={() => setGameState('menu')}
            >
              {t.finish.backBtn}
            </button>
          </GlassCard>
        </div>
      </Background>
    );
  }

  // Render: Menu Screen
  if (gameState === 'menu') {
    return (
      <Background>
        <SettingsBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <GlassCard className="p-8 md:p-14 max-w-md w-full relative z-10 border-white/70 dark:border-slate-600">
            <div className="text-left mb-10">
              <div className="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-[0.2em] mb-3">
                {t.title.sub}
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white leading-[0.9] tracking-tight mb-2">
                {t.title.line1}<br/>
                <span className="text-purple-600 dark:text-purple-400">{t.title.line2}</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mt-4">
                v1.0 • 2025
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  {t.menu.nameLabel}
                </label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t.menu.namePlaceholder}
                  className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/50 dark:border-slate-600 focus:bg-white/80 dark:focus:bg-slate-900/80 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-700 dark:text-slate-200 font-bold"
                />
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  {t.menu.modeLabel}
                </label>
                <div className="flex gap-2 p-1 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-white/40 dark:border-slate-600">
                  {(['old', 'new', 'all'] as const).map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setGameMode(mode)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        gameMode === mode 
                          ? 'bg-purple-600 dark:bg-purple-500 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/20' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {t.menu.modes[mode]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!userName.trim()}
                className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                  !userName.trim() 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-500 dark:to-violet-500 text-white hover:shadow-xl hover:shadow-purple-200 dark:hover:shadow-purple-900/20 hover:-translate-y-1'
                }`}
                onClick={startGame}
              >
                {t.menu.startBtn}
              </button>
            </div>
          </GlassCard>
          
          <div className="mt-8 text-slate-400 dark:text-slate-600 text-xs font-bold tracking-[0.2em] opacity-60">
            {t.menu.footer}
          </div>
        </div>
      </Background>
    );
  }

  // Render: Playing Screen
  return (
    <Background>
      <SettingsBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Header */}
        <div className="w-full max-w-2xl flex justify-between items-end mb-8 px-2">
           <div>
             <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">
               {t.game.progress}
             </div>
             <div className="text-3xl font-black text-slate-800 dark:text-slate-200">
               {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-300 dark:text-slate-600 text-lg">/ {String(shuffledCards.length).padStart(2, '0')}</span>
             </div>
           </div>
           
           <div className="flex flex-col items-end">
             <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">
               {t.game.score}
             </div>
             <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{score}</div>
           </div>
        </div>

        {/* Card Container */}
        <GlassCard className="p-0 max-w-2xl w-full overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Timer Bar */}
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900">
            <div 
              className={`h-full transition-all duration-100 ease-linear ${timeLeft < 5 ? 'bg-rose-400' : 'bg-purple-500 dark:bg-purple-400'}`}
              style={{ width: `${(Math.max(0, timeLeft) / TIMER_SECONDS) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col">
            {/* Top Tag */}
            <div className="flex justify-between items-start mb-6">
               <span className="bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-purple-200 dark:border-purple-800">
                {currentCard.testament === 'old' ? t.game.testaments.old : t.game.testaments.new}
               </span>
               <span className={`font-mono font-bold text-lg ${timeLeft < 5 ? 'text-rose-500' : 'text-slate-300 dark:text-slate-600'}`}>
                 {Math.max(0, timeLeft).toFixed(1)}s
               </span>
            </div>

            {/* Verse */}
            <div className="flex-1 flex items-center justify-center py-6">
              <blockquote className="text-2xl md:text-3xl font-serif text-slate-700 dark:text-slate-200 leading-relaxed text-center">
                {cardContent.verse}
              </blockquote>
            </div>

            {/* Question */}
            <h2 className="text-center text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">
              {cardContent.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cardContent.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect = index === currentCard.answer;
                const isReveal = selected !== null && isCorrect;
                
                let btnClass = "p-5 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-between group border ";
                
                if (selected === null) {
                  btnClass += "bg-white/40 dark:bg-slate-900/40 border-transparent text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900/20 cursor-pointer";
                } else if (isSelected && isCorrect) {
                  btnClass += "bg-emerald-400/90 border-emerald-500 text-white shadow-lg scale-[1.02]";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-rose-400/90 border-rose-500 text-white opacity-90";
                } else if (isReveal) {
                  btnClass += "bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400";
                } else {
                  btnClass += "bg-slate-50/50 dark:bg-slate-900/20 border-transparent text-slate-300 dark:text-slate-600";
                }

                return (
                  <button
                    key={index}
                    disabled={selected !== null}
                    onClick={() => handleAnswer(index)}
                    className={btnClass}
                  >
                    <span>{option}</span>
                    {selected !== null && (isSelected || isCorrect) && (
                      <span className="text-lg bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
                        {isCorrect ? '✓' : isSelected ? '✕' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Feedback Footer */}
            <div className={`mt-6 h-6 text-center transition-all duration-500 ${selected !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
               <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                 {t.game.answer}: <span className="text-purple-600 dark:text-purple-400">{cardContent.reference}</span>
               </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </Background>
  );
}

export default App;
