import React from 'react';

export const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-card-bg border-card-border shadow-card-shadow rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
