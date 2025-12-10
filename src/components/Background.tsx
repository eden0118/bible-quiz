import React from 'react';
import { cn } from '../lib/cn';

export interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Background 元件 - 提供 Blob 動畫背景
 *
 * 包含:
 * - 3 個漸層 Blob 動畫形狀
 * - 紋理疊加效果
 * - 語意化色彩自動適應 Light/Dark mode
 *
 * 使用方式:
 * <Background>
 *   <AppContent />
 * </Background>
 */
export const Background = React.forwardRef<
  HTMLDivElement,
  BackgroundProps
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative min-h-screen overflow-hidden font-sans transition-colors duration-300',
        'bg-background text-foreground',
        'selection:bg-primary selection:text-white',
        className
      )}
    >
      {/* Cinematic Geometric Shapes - 背景層 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Shape 1: The 'Sun' - Top Right */}
        <div className="animate-blob absolute -top-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-linear-to-br from-orange-400 via-red-500 to-purple-600 opacity-60 blur-[80px] dark:opacity-50" />

        {/* Shape 2: The 'Moon' - Bottom Left */}
        <div className="animate-blob animation-delay-2000 absolute -bottom-[10%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-linear-to-tr from-blue-600 via-indigo-500 to-purple-500 opacity-60 blur-[90px] dark:opacity-40" />

        {/* Shape 3: Accent - Center */}
        <div className="animate-blob animation-delay-4000 absolute top-[30%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-linear-to-r from-amber-300 to-orange-500 opacity-40 blur-[100px] dark:opacity-20" />

        {/* 紋理疊加 */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150" />
      </div>

      {/* 內容層 */}
      <div className="relative z-10 flex h-full min-h-screen w-full flex-col">
        {children}
      </div>
    </div>
  );
});

Background.displayName = 'Background';
