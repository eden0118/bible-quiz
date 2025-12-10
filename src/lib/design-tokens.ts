/**
 * 設計系統 - 語意化色彩 Token
 *
 * 此檔案記錄所有在 globals.css 中定義的設計 Token
 * 用於在 TypeScript 中參考色彩名稱
 */

export const colorTokens = {
  // 語意化色彩
  primary: 'hsl(var(--color-primary) / <alpha-value>)',
  primaryHover: 'hsl(var(--color-primary-hover) / <alpha-value>)',
  primaryActive: 'hsl(var(--color-primary-active) / <alpha-value>)',

  secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
  secondaryHover: 'hsl(var(--color-secondary-hover) / <alpha-value>)',
  secondaryActive: 'hsl(var(--color-secondary-active) / <alpha-value>)',

  accent: 'hsl(var(--color-accent) / <alpha-value>)',

  // 語意化狀態色
  success: 'hsl(var(--color-success) / <alpha-value>)',
  warning: 'hsl(var(--color-warning) / <alpha-value>)',
  error: 'hsl(var(--color-error) / <alpha-value>)',

  // 背景與前景
  background: 'hsl(var(--color-background) / <alpha-value>)',
  foreground: 'hsl(var(--color-foreground) / <alpha-value>)',

  muted: 'hsl(var(--color-muted) / <alpha-value>)',
  mutedForeground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',

  border: 'hsl(var(--color-border) / <alpha-value>)',

  // 卡片
  cardBg: 'hsl(var(--color-card-bg) / <alpha-value>)',
  cardBorder: 'hsl(var(--color-card-border) / <alpha-value>)',
} as const;

/**
 * 間距 Token
 * 基於 Tailwind 的 4px 基礎單位
 */
export const spacingTokens = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
} as const;

/**
 * 圓角 Token
 */
export const radiusTokens = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  full: '9999px',
} as const;

/**
 * 陰影 Token
 */
export const shadowTokens = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;

/**
 * 排版 Token
 */
export const typographyTokens = {
  fontSans: "'Noto Sans TC', sans-serif",
  fontSerif: "'Noto Serif TC', serif",
} as const;

/**
 * 動畫 Token
 */
export const animationTokens = {
  duration: {
    fast: '100ms',
    base: '300ms',
    slow: '500ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
