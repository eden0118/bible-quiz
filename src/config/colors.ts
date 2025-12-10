/**
 * 聖經問答應用 - 統一顏色主題系統
 * 支援 Light/Dark 模式
 */

export type ColorMode = 'light' | 'dark';

// 主色調調色板
export const colorPalette = {
  primary: {
    light: 'orange',
    dark: 'orange',
  },
  secondary: {
    light: 'red',
    dark: 'red',
  },
  accent: {
    light: 'purple',
    dark: 'purple',
  },
};

// Light 模式色彩配置
export const lightTheme = {
  // 背景色
  bg: {
    primary: '#F2F2F2', // 淺灰主背景
    secondary: '#FFFFFF', // 白色卡片
    overlay: 'bg-white/70', // 玻璃態覆蓋
  },
  // 文字色
  text: {
    primary: 'text-neutral-900', // 深灰標題
    secondary: 'text-neutral-600', // 中灰描述
    muted: 'text-neutral-500', // 淡灰輔助
  },
  // 邊框色
  border: {
    primary: 'border-neutral-300', // 深邊框
    secondary: 'border-white/50', // 淡邊框
  },
  // UI 元件
  card: {
    bg: 'bg-white/70',
    border: 'border-white/50',
    shadow: 'shadow-orange-500/10',
  },
  button: {
    primary: {
      bg: 'bg-linear-to-r from-orange-400 to-red-500',
      text: 'text-white',
      hover: 'hover:shadow-lg hover:shadow-orange-500/50',
    },
    secondary: {
      bg: 'bg-neutral-200/50',
      text: 'text-neutral-900',
      hover: 'hover:bg-neutral-300/50',
    },
  },
  // 狀態色
  status: {
    success: 'border-green-500 bg-green-500/20 text-green-700',
    error: 'border-red-500 bg-red-500/20 text-red-700',
    info: 'border-blue-500/50 bg-blue-500/10 text-blue-700',
  },
};

// Dark 模式色彩配置
export const darkTheme = {
  // 背景色
  bg: {
    primary: '#050505', // 純黑主背景
    secondary: '#1a1a1a', // 深灰卡片
    overlay: 'bg-neutral-900/60', // 玻璃態覆蓋
  },
  // 文字色
  text: {
    primary: 'text-white', // 白色標題
    secondary: 'text-neutral-400', // 灰色描述
    muted: 'text-neutral-500', // 淡灰輔助
  },
  // 邊框色
  border: {
    primary: 'border-white/20', // 淡邊框
    secondary: 'border-white/10', // 極淡邊框
  },
  // UI 元件
  card: {
    bg: 'bg-neutral-900/60',
    border: 'border-white/10',
    shadow: 'shadow-black/50',
  },
  button: {
    primary: {
      bg: 'bg-linear-to-r from-orange-400 to-red-500',
      text: 'text-white',
      hover: 'hover:shadow-lg hover:shadow-orange-500/50',
    },
    secondary: {
      bg: 'bg-neutral-800/50',
      text: 'text-white',
      hover: 'hover:bg-neutral-700/50',
    },
  },
  // 狀態色
  status: {
    success: 'border-green-500 bg-green-500/20 text-green-300',
    error: 'border-red-500 bg-red-500/20 text-red-300',
    info: 'border-blue-500/50 bg-blue-500/20 text-blue-300',
  },
};

// 漸層定義（用於標題和強調元素）
export const gradients = {
  primary: 'bg-linear-to-r from-orange-400 via-red-500 to-purple-600',
  secondary: 'bg-linear-to-r from-orange-400 to-red-500',
  accent: 'bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500',
  warm: 'bg-linear-to-r from-amber-300 to-orange-500',
};

// 背景漸層形狀
export const backgroundShapes = {
  shape1: {
    gradient: 'bg-linear-to-br from-orange-400 via-red-500 to-purple-600',
    position: 'absolute -top-[10%] -right-[10%]',
    size: 'h-[60vh] w-[60vh]',
    opacity: {
      light: 'opacity-60',
      dark: 'dark:opacity-50',
    },
  },
  shape2: {
    gradient: 'bg-linear-to-tr from-blue-600 via-indigo-500 to-purple-500',
    position: 'absolute -bottom-[10%] -left-[10%]',
    size: 'h-[70vh] w-[70vh]',
    opacity: {
      light: 'opacity-60',
      dark: 'dark:opacity-40',
    },
  },
  shape3: {
    gradient: 'bg-linear-to-r from-amber-300 to-orange-500',
    position: 'absolute top-[30%] left-[30%]',
    size: 'h-[40vh] w-[40vh]',
    opacity: {
      light: 'opacity-40',
      dark: 'dark:opacity-20',
    },
  },
};

// 響應式間距配置
export const spacing = {
  // 容器寬度
  container: {
    full: 'max-w-full',
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-2xl',
  },
  // 內部填充
  padding: {
    xs: 'p-4',
    sm: 'sm:p-6',
    md: 'sm:p-8',
    lg: 'lg:p-12',
  },
  // 外部間距
  margin: {
    xs: 'mb-4',
    sm: 'sm:mb-6',
    md: 'lg:mb-8',
    lg: 'lg:mb-12',
  },
};

// 圓角半徑
export const borderRadius = {
  sm: 'rounded-lg',
  md: 'sm:rounded-xl',
  lg: 'lg:rounded-2xl',
  full: 'rounded-full',
  card: 'rounded-[2.5rem]',
};

// 字體大小（響應式）
export const fontSize = {
  h1: 'text-4xl sm:text-6xl lg:text-8xl',
  h2: 'text-2xl sm:text-4xl lg:text-5xl',
  h3: 'text-lg sm:text-xl lg:text-3xl',
  body: 'text-xs sm:text-sm lg:text-base',
  small: 'text-xs sm:text-xs lg:text-sm',
};

// 陰影配置
export const shadows = {
  card: 'shadow-2xl shadow-orange-500/10 dark:shadow-black/50',
  button: 'hover:shadow-lg hover:shadow-orange-500/50',
  none: 'shadow-none',
};

// 動畫配置
export const animations = {
  transition: 'transition-all duration-300',
  fadeIn: 'animate-fade-in',
  pulse: 'animate-pulse',
};

/**
 * 獲取當前模式的主題色
 */
export const getTheme = (mode: ColorMode) => {
  return mode === 'light' ? lightTheme : darkTheme;
};

/**
 * 合併主題色（用於動態 className）
 */
export const mergeThemeClasses = (
  mode: ColorMode,
  baseClass: string,
  lightClass: string,
  darkClass: string
): string => {
  if (mode === 'light') {
    return `${baseClass} ${lightClass}`;
  }
  return `${baseClass} ${darkClass}`;
};
