// Theme Configuration

export const themeColors = {
  // Light Mode Colors (Adapted to match the geometric style but bright)
  light: {
    background: '#F0F0F0',
    textPrimary: 'text-neutral-900',
    textSecondary: 'text-neutral-500',
    cardBg: 'bg-white/60',
    cardBorder: 'border-white/80',
  },
  // Dark Mode Colors (The primary cinematic look)
  dark: {
    background: '#050505', // Deep Black
    textPrimary: 'text-white',
    textSecondary: 'text-neutral-400',
    cardBg: 'bg-neutral-900/60',
    cardBorder: 'border-white/10',
  }
};

export type ThemeMode = 'light' | 'dark';

export const applyTheme = (mode: ThemeMode) => {
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
