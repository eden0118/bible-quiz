/**
 * 主題管理模組
 * 處理 Light/Dark 模式的切換
 */

import type { lightTheme, darkTheme } from './config/colors';

export type ThemeMode = 'light' | 'dark';

/**
 * 應用主題到 DOM
 * @param mode 主題模式 ('light' | 'dark')
 */
export const applyTheme = (mode: ThemeMode): void => {
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

/**
 * 獲取當前主題模式
 * @returns 當前主題模式
 */
export const getCurrentTheme = (): ThemeMode => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

/**
 * 保存主題到 localStorage
 * @param mode 主題模式
 */
export const saveTheme = (mode: ThemeMode): void => {
  localStorage.setItem('themeMode', mode);
};

/**
 * 從 localStorage 讀取主題
 * @returns 保存的主題模式，或默認值 'dark'
 */
export const loadTheme = (): ThemeMode => {
  const saved = localStorage.getItem('themeMode');
  return (saved as ThemeMode) || 'dark';
};

/**
 * 切換主題模式
 * @returns 新的主題模式
 */
export const toggleTheme = (): ThemeMode => {
  const current = getCurrentTheme();
  const newMode = current === 'dark' ? 'light' : 'dark';
  applyTheme(newMode);
  saveTheme(newMode);
  return newMode;
};
