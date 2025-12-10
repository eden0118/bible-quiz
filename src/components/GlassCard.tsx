import React from 'react';

export const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[2.5rem] border border-white/50 bg-white/70 shadow-2xl shadow-orange-500/10 backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-black/50 ${className}`}
  >
    {children}
  </div>
);
