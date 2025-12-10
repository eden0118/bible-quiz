import React from 'react';

export const Button = ({
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  children,
}: {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}) => {
  const baseStyle =
    'px-8 py-3 font-bold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyle =
    variant === 'primary'
      ? 'bg-linear-to-r from-orange-400 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50 active:scale-95'
      : 'bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 active:scale-95';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};
