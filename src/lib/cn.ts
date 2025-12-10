/**
 * 統一的 CSS class 合併工具
 * 結合 clsx 和 tailwind-merge，確保 Tailwind class 優先級正確
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
