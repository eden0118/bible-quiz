// Theme Configuration
// In a full Tailwind v4 setup, these would map to CSS variables in index.css

export const themeColors = {
  // Light Mode Colors
  light: {
    background: '#F3F0FF',
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-500',
    accent: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    cardBg: 'bg-white/40',
    cardBorder: 'border-white/60',
  },
  // Dark Mode Colors
  dark: {
    background: '#0F172A', // Slate 900
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accent: 'violet',
    gradient: 'from-violet-400 to-fuchsia-400',
    cardBg: 'bg-slate-800/40',
    cardBorder: 'border-slate-700/50',
  }
};

export type ThemeMode = 'light' | 'dark';

// Helper to toggle theme class on HTML element
export const applyTheme = (mode: ThemeMode) => {
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
