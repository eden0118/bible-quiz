import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
type Testament = 'old' | 'new';

interface BibleCard {
  id: number;
  verse: string;
  question: string;
  options: string[];
  answer: number; // Index of the correct option
  reference: string;
  testament: Testament;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  mode: string;
}

type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'all' | 'old' | 'new';

// --- Data ---
const bibleCards: BibleCard[] = [
  {
    id: 1,
    verse: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。",
    question: "這節經文出自哪裡？",
    options: ["約翰福音 3:16", "馬太福音 5:3", "詩篇 23:1", "羅馬書 8:28"],
    answer: 0,
    reference: "約翰福音 3:16",
    testament: 'new'
  },
  {
    id: 2,
    verse: "耶和華是我的牧者，我必不致缺乏。",
    question: "這是大衛寫的詩，出自哪篇？",
    options: ["詩篇 1:1", "詩篇 23:1", "詩篇 119:105", "詩篇 91:1"],
    answer: 1,
    reference: "詩篇 23:1",
    testament: 'old'
  },
  {
    id: 3,
    verse: "起初，神創造天地。",
    question: "這是聖經的第一句話，位於？",
    options: ["約翰福音 1:1", "出埃及記 1:1", "啟示錄 1:1", "創世記 1:1"],
    answer: 3,
    reference: "創世記 1:1",
    testament: 'old'
  },
  {
    id: 4,
    verse: "我靠著那加給我力量的，凡事都能做。",
    question: "保羅在監獄中寫下的這句話出自？",
    options: ["以弗所書 2:8", "腓立比書 4:13", "加拉太書 2:20", "歌羅西書 3:23"],
    answer: 1,
    reference: "腓立比書 4:13",
    testament: 'new'
  },
  {
    id: 5,
    verse: "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。",
    question: "這節經文常被用來安慰信徒，出自？",
    options: ["羅馬書 8:28", "哥林多前書 10:13", "雅各書 1:2", "彼得前書 5:7"],
    answer: 0,
    reference: "羅馬書 8:28",
    testament: 'new'
  },
  {
    id: 6,
    verse: "你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上都要認定他，他必指引你的路。",
    question: "這句智慧的箴言出自？",
    options: ["傳道書 3:1", "箴言 3:5-6", "約伯記 42:2", "詩篇 37:5"],
    answer: 1,
    reference: "箴言 3:5-6",
    testament: 'old'
  },
  {
    id: 7,
    verse: "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂。",
    question: "這段著名的「愛篇」出自？",
    options: ["約翰一書 4:8", "哥林多前書 13:4", "馬可福音 12:30", "雅歌 8:7"],
    answer: 1,
    reference: "哥林多前書 13:4",
    testament: 'new'
  },
  {
    id: 8,
    verse: "聖靈所結的果子，就是仁愛、喜樂、和平、忍耐、恩慈、良善、信實、溫柔、節制。",
    question: "這段關於聖靈果子的經文出自？",
    options: ["加拉太書 5:22-23", "以弗所書 5:9", "歌羅西書 3:12", "羅馬書 12:2"],
    answer: 0,
    reference: "加拉太書 5:22-23",
    testament: 'new'
  },
  {
    id: 9,
    verse: "世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。",
    question: "這段先知書的教導出自？",
    options: ["以賽亞書 6:8", "耶利米書 29:11", "彌迦書 6:8", "阿摩司書 5:24"],
    answer: 2,
    reference: "彌迦書 6:8",
    testament: 'old'
  },
  {
    id: 10,
    verse: "你們要先求他的國和他的義，這些東西都要加給你們了。",
    question: "耶穌在登山寶訓中的教導，出自？",
    options: ["路加福音 10:27", "馬太福音 6:33", "馬可福音 8:36", "約翰福音 14:6"],
    answer: 1,
    reference: "馬太福音 6:33",
    testament: 'new'
  }
];

const TIMER_SECONDS = 15;
const BASE_SCORE = 10;

// --- Components ---

// Background Wrapper with Grid Pattern
const Background = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen relative overflow-hidden bg-[#F3F0FF] text-slate-800 font-sans selection:bg-purple-200">
    {/* CSS Grid Pattern */}
    <div className="absolute inset-0 z-0 opacity-[0.4]"
         style={{
           backgroundImage: 'linear-gradient(to right, #E9D5FF 1px, transparent 1px), linear-gradient(to bottom, #E9D5FF 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
    </div>
    
    {/* Soft Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

    <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
       {children}
    </div>
  </div>
);

// Glass Card Component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_0_rgba(139,92,246,0.1)] rounded-[2rem] ${className}`}>
    {children}
  </div>
);

// --- App Component ---
function App() {
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
          mode: gameMode === 'all' ? '全部' : gameMode === 'old' ? '舊約' : '新約'
        };
        const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
        localStorage.setItem('bible_flashcards_leaderboard', JSON.stringify(updated));
        return updated;
      });
    }
  }, [gameState]);

  const currentCard = shuffledCards[currentIndex] || bibleCards[0];

  // --- RENDERERS ---

  // Render: Finished Screen
  if (gameState === 'finished') {
    return (
      <Background>
        <div className="flex-1 flex items-center justify-center p-4">
          <GlassCard className="p-8 md:p-12 w-full max-w-lg animate-fade-in flex flex-col items-center text-center">
            
            <div className="mb-2 uppercase tracking-widest text-xs font-bold text-purple-500">Design Resources</div>
            <h1 className="text-5xl font-black text-slate-800 mb-2 tracking-tight leading-tight">
              Thank<span className="text-purple-600">*</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">You!</span>
            </h1>
            
            <p className="text-lg text-slate-500 font-medium mb-8">
              挑戰完成, {userName}
            </p>

            <div className="relative mb-10 w-full">
              <div className="absolute inset-0 bg-purple-200/30 blur-xl rounded-full transform scale-75"></div>
              <div className="relative text-7xl font-black text-slate-800 tracking-tighter">
                {score}
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Total Score</div>
            </div>

            <div className="w-full bg-white/40 rounded-3xl p-6 mb-8 border border-white/60">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-left pl-2">Leaderboard</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {leaderboard.length === 0 ? (
                  <p className="text-slate-400 text-sm">還沒有紀錄，你是第一個！</p>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl transition-all ${entry.name === userName && entry.score === score ? 'bg-purple-100/80' : 'hover:bg-white/30'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`
                          w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                          ${idx === 0 ? 'bg-yellow-300 text-yellow-800' : 
                            idx === 1 ? 'bg-slate-200 text-slate-600' :
                            idx === 2 ? 'bg-orange-200 text-orange-700' : 'bg-transparent text-slate-400'}
                        `}>
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <div className="font-bold text-slate-700 leading-tight">{entry.name}</div>
                          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">{entry.mode}</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-purple-600 text-lg">{entry.score}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-purple-200"
              onClick={() => setGameState('menu')}
            >
              Back to Menu
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
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <GlassCard className="p-8 md:p-14 max-w-md w-full relative z-10 border-white/70">
            <div className="text-left mb-10">
              <div className="text-xs font-bold text-purple-500 uppercase tracking-[0.2em] mb-3">Interactive Game</div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-[0.9] tracking-tight mb-2">
                Bible<br/>
                <span className="text-purple-600">Wisdom</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium mt-4">Flashcards & Quiz</p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Player Name</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/50 focus:bg-white/80 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-300 text-slate-700 font-bold"
                />
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Select Mode</label>
                <div className="flex gap-2 p-1 bg-white/40 rounded-2xl border border-white/40">
                  {(['old', 'new', 'all'] as const).map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setGameMode(mode)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        gameMode === mode 
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                          : 'text-slate-500 hover:bg-white/50'
                      }`}
                    >
                      {mode === 'old' ? 'Old' : mode === 'new' ? 'New' : 'All'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!userName.trim()}
                className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                  !userName.trim() 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1'
                }`}
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </GlassCard>
          
          <div className="mt-8 text-slate-400 text-xs font-bold tracking-[0.2em] opacity-60">
            DESIGN RESOURCES 2025
          </div>
        </div>
      </Background>
    );
  }

  // Render: Playing Screen
  return (
    <Background>
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Header */}
        <div className="w-full max-w-2xl flex justify-between items-end mb-8 px-2">
           <div>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Progress</div>
             <div className="text-3xl font-black text-slate-800">
               {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-300 text-lg">/ {String(shuffledCards.length).padStart(2, '0')}</span>
             </div>
           </div>
           
           <div className="flex flex-col items-end">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Score</div>
             <div className="text-3xl font-black text-purple-600">{score}</div>
           </div>
        </div>

        {/* Card Container */}
        <GlassCard className="p-0 max-w-2xl w-full overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Timer Bar */}
          <div className="w-full h-1.5 bg-slate-100">
            <div 
              className={`h-full transition-all duration-100 ease-linear ${timeLeft < 5 ? 'bg-rose-400' : 'bg-purple-500'}`}
              style={{ width: `${(Math.max(0, timeLeft) / TIMER_SECONDS) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col">
            {/* Top Tag */}
            <div className="flex justify-between items-start mb-6">
               <span className="bg-purple-100/80 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-purple-200">
                {currentCard.testament === 'old' ? 'Old Testament' : 'New Testament'}
               </span>
               <span className={`font-mono font-bold text-lg ${timeLeft < 5 ? 'text-rose-500' : 'text-slate-300'}`}>
                 {Math.max(0, timeLeft).toFixed(1)}s
               </span>
            </div>

            {/* Verse */}
            <div className="flex-1 flex items-center justify-center py-6">
              <blockquote className="text-2xl md:text-3xl font-serif text-slate-700 leading-relaxed text-center">
                {currentCard.verse}
              </blockquote>
            </div>

            {/* Question */}
            <h2 className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">
              {currentCard.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentCard.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect = index === currentCard.answer;
                const isReveal = selected !== null && isCorrect;
                
                let btnClass = "p-5 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-between group border ";
                
                if (selected === null) {
                  btnClass += "bg-white/40 border-transparent text-slate-600 hover:bg-white/80 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100 cursor-pointer";
                } else if (isSelected && isCorrect) {
                  btnClass += "bg-emerald-400/90 border-emerald-500 text-white shadow-lg scale-[1.02]";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-rose-400/90 border-rose-500 text-white opacity-90";
                } else if (isReveal) {
                  btnClass += "bg-emerald-100/50 border-emerald-200 text-emerald-700";
                } else {
                  btnClass += "bg-slate-50/50 border-transparent text-slate-300";
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
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                 Answer: <span className="text-purple-600">{currentCard.reference}</span>
               </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </Background>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
