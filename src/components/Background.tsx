import React, { useEffect, useState } from 'react';

export const Background = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // 檢查 html 元素是否有 dark class
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // 初始檢查
    checkDarkMode();

    // 監聽 html class 的變化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden font-sans text-neutral-900 transition-colors duration-500 selection:bg-orange-500 selection:text-white dark:text-white"
      style={{
        backgroundColor: isDark ? '#050505' : '#F0F0F0'
      }}
    >
      {/* Cinematic Geometric Shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Shape 1: The 'Sun' - Top Right */}
        <div className="animate-blob absolute -top-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-linear-to-br from-orange-400 via-red-500 to-purple-600 opacity-60 blur-[80px] dark:opacity-50"></div>

        {/* Shape 2: The 'Moon' - Bottom Left */}
        <div className="animate-blob animation-delay-2000 absolute -bottom-[10%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-linear-to-tr from-blue-600 via-indigo-500 to-purple-500 opacity-60 blur-[90px] dark:opacity-40"></div>

        {/* Shape 3: Accent - Center */}
        <div className="animate-blob animation-delay-4000 absolute top-[30%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-linear-to-r from-amber-300 to-orange-500 opacity-40 blur-[100px] dark:opacity-20"></div>

        {/* Grid Overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 flex h-full min-h-screen w-full flex-col">{children}</div>
    </div>
  );
};
