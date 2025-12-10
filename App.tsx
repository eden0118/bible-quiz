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
  <div className="min-h-screen relative overflow-hidden bg-[#F2F2F2] dark:bg-[#050505] text-neutral-900 dark:text-white font-sans selection:bg-orange-500 selection:text-white transition-colors duration-500">
    
    {/* Cinematic Geometric Shapes */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Shape 1: The 'Sun' - Top Right */}
      <div className="absolute -top-[10%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 blur-[80px] opacity-60 dark:opacity-50 animate-blob"></div>
      
      {/* Shape 2: The 'Moon' - Bottom Left */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 blur-[90px] opacity-60 dark:opacity-40 animate-blob animation-delay-2000"></div>
      
      {/* Shape 3: Accent - Center */}
      <div className="absolute top-[30%] left-[30%] w-[40vh] h-[40vh] rounded-full bg-gradient-to-r from-amber-300 to-orange-500 blur-[100px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000"></div>

      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>

    <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
       {children}
    </div>
  </div>
);

// Modern Dark/Light Glass Card
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-2xl bg-white/70 dark:bg-neutral-900/60 border border-white/50 dark:border-white/10 shadow-2xl shadow-orange-500/10 dark:shadow-black/50 rounded-[2.5rem] transition-colors duration-300 ${className}`}>
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
  <div className="absolute top-6 right-6 z-50 flex gap-3">
    <button 
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="px-4 py-2 rounded-full bg-white/10 border border-neutral-200/20 dark:border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-neutral-600 dark:text-neutral-400 backdrop-blur-md"
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-neutral-200/20 dark:border-white/10 text-sm hover:bg-white/20 transition-all text-neutral-600 dark:text-neutral-400 backdrop-blur-md"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </div>
);

// --- App Component ---
function App() {
  // Global Settings
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<ThemeMode>('dark'); // Default to Dark for the vibe

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
          <GlassCard className="p-8 md:p-12 w-full max-w-lg animate-fade-in flex flex-col items-center text-center border-t-4 border-t-orange-500">
            
            <div className="mb-4 uppercase tracking-[0.3em] text-[10px] font-black text-orange-500">
              {t.title.resources}
            </div>
            
            <h1 className="text-6xl font-black text-neutral-900 dark:text-white mb-2 tracking-tighter leading-[0.9]">
              {score}<span className="text-orange-500 text-4xl align-top">+</span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">
              {t.finish.totalScore}
            </p>

            <div className="w-full bg-neutral-100/50 dark:bg-black/20 rounded-2xl p-6 mb-8 border border-neutral-200 dark:border-white/5">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 text-left pl-2">
                {t.finish.leaderboard}
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {leaderboard.length === 0 ? (
                  <p className="text-neutral-400 text-sm italic">{t.finish.emptyLeaderboard}</p>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-xl transition-all ${entry.name === userName && entry.score === score ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-white/50 dark:bg-white/5 border border-transparent'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`
                          w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black
                          ${idx === 0 ? 'bg-orange-400 text-black' : 
                            idx === 1 ? 'bg-neutral-300 text-neutral-800' :
                            idx === 2 ? 'bg-orange-900 text-orange-200' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}
                        `}>
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <div className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-tight">{entry.name}</div>
                          <div className="text-[9px] text-neutral-400 uppercase font-black tracking-wider opacity-70">{entry.mode}</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{entry.score}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-500/20"
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
          <GlassCard className="p-10 md:p-16 max-w-md w-full relative z-10 border-white/60 dark:border-white/10">
            <div className="text-left mb-12">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
                 <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
                    {t.title.resources}
                 </div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black text-neutral-900 dark:text-white leading-[0.85] tracking-tighter mb-4">
                BIBLE<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 dark:from-orange-400 dark:to-orange-600">
                   WISDOM
                </span>
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-widest">
                {t.title.sub}
              </p>
            </div>

            <div className="space-y-8">
              {/* Name Input */}
              <div className="group relative">
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-lg font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors placeholder-transparent"
                />
                <label className="absolute left-0 -top-3.5 text-xs font-bold text-orange-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-orange-500 uppercase tracking-wider">
                  {t.menu.nameLabel}
                </label>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3">
                  {t.menu.modeLabel}
                </label>
                <div className="flex gap-4">
                  {(['old', 'new', 'all'] as const).map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setGameMode(mode)}
                      className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                        gameMode === mode 
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30' 
                          : 'bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-orange-500/50 hover:text-orange-500'
                      }`}
                    >
                      {t.menu.modes[mode]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!userName.trim()}
                className={`w-full py-5 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
                  !userName.trim() 
                    ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed' 
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] shadow-2xl hover:shadow-orange-500/20'
                }`}
                onClick={startGame}
              >
                {t.menu.startBtn}
              </button>
            </div>
          </GlassCard>
          
          <div className="mt-12 text-neutral-400 dark:text-neutral-600 text-[10px] font-black tracking-[0.3em] uppercase opacity-50">
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
        <div className="w-full max-w-3xl flex justify-between items-end mb-10 px-4">
           <div>
             <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">
               {t.game.progress}
             </div>
             <div className="text-4xl font-black text-neutral-900 dark:text-white leading-none">
               {String(currentIndex + 1).padStart(2, '0')} <span className="text-neutral-300 dark:text-neutral-700 text-xl font-bold">/ {String(shuffledCards.length).padStart(2, '0')}</span>
             </div>
           </div>
           
           <div className="flex flex-col items-end">
             <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">
               {t.game.score}
             </div>
             <div className="text-4xl font-black text-orange-500 leading-none">{score}</div>
           </div>
        </div>

        {/* Card Container */}
        <GlassCard className="p-0 max-w-3xl w-full overflow-hidden flex flex-col min-h-[550px] relative">
          
          {/* Decorative Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600"></div>

          <div className="p-8 md:p-14 flex-1 flex flex-col">
            {/* Top Tag & Timer */}
            <div className="flex justify-between items-center mb-10">
               <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                {currentCard.testament === 'old' ? t.game.testaments.old : t.game.testaments.new}
               </span>
               <div className="flex items-center gap-3">
                 <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Time</div>
                 <div className={`font-mono font-bold text-xl ${timeLeft < 5 ? 'text-red-500' : 'text-neutral-900 dark:text-white'}`}>
                   {Math.max(0, timeLeft).toFixed(1)}
                 </div>
                 {/* Circular Timer Visual */}
                 <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-200 dark:text-neutral-800"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className={`${timeLeft < 5 ? 'text-red-500' : 'text-orange-500'} transition-all duration-100 ease-linear`}
                      strokeDasharray={`${(Math.max(0, timeLeft) / TIMER_SECONDS) * 100}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                 </svg>
               </div>
            </div>

            {/* Verse */}
            <div className="flex-1 flex items-center justify-center py-4 mb-8">
              <blockquote className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white leading-tight text-center tracking-tight">
                "{cardContent.verse}"
              </blockquote>
            </div>

            {/* Question */}
            <h2 className="text-center text-orange-500 font-bold uppercase tracking-[0.15em] text-xs mb-8">
              {cardContent.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cardContent.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect = index === currentCard.answer;
                const isReveal = selected !== null && isCorrect;
                
                let btnClass = "p-5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-between group border-2 ";
                
                if (selected === null) {
                  btnClass += "bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 cursor-pointer";
                } else if (isSelected && isCorrect) {
                  btnClass += "bg-emerald-500 border-emerald-500 text-white shadow-lg scale-[1.02]";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-red-500 border-red-500 text-white opacity-90";
                } else if (isReveal) {
                  btnClass += "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                } else {
                  btnClass += "bg-neutral-50 dark:bg-neutral-900/50 border-transparent text-neutral-300 dark:text-neutral-700";
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
                      <span className="text-lg bg-white/20 rounded-full w-6 h-6 flex items-center justify-center font-black">
                        {isCorrect ? '✓' : isSelected ? '✕' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Feedback Footer */}
            <div className={`mt-8 h-6 text-center transition-all duration-500 ${selected !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
               <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
                 {t.game.answer} — <span className="text-orange-500 text-xs">{cardContent.reference}</span>
               </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </Background>
  );
}

export default App;
