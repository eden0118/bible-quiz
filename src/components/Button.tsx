import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Button CVA 變體定義
 * 使用 class-variance-authority 管理所有可能的樣式組合
 */
const buttonVariants = cva(
  // 基礎樣式 (所有變體共用)
  'inline-flex items-center justify-center font-medium transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // 主要按鈕 - 漸層橙紅色，用於主要操作 (CTA)
        primary:
          'bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] text-white hover:shadow-lg hover:shadow-primary/50 active:scale-95 dark:hover:shadow-primary/30',

        // 次要按鈕 - 淺色背景，用於次要操作
        secondary:
          'bg-secondary text-foreground hover:bg-secondary/90 active:scale-95 dark:hover:bg-secondary/80',

        // 幽靈按鈕 - 僅邊框，用於非破壞性操作
        ghost:
          'border border-border text-foreground hover:bg-muted/50 active:scale-95 dark:hover:bg-muted/30',

        // 危險操作 - 紅色，用於刪除或其他危險操作
        danger:
          'bg-error text-white hover:shadow-lg hover:shadow-error/50 active:scale-95',
      },

      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-xl',
        xl: 'h-14 px-8 text-lg rounded-full',
      },

      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * 重構後的 Button 元件
 * 支援 variant、size、fullWidth 屬性，自動適應 Light/Dark mode
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

