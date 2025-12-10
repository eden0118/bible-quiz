import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * ========================================
 * BUTTON: Pragmatic Component Pattern
 * ========================================
 *
 * 簡單的按鈕元件，使用 CVA 管理變體。
 * Dark Mode 通過 CSS Variables 自動切換，無需額外的 dark: modifier。
 *
 * 特色：
 * - 極簡邏輯，專注於樣式變體
 * - CVA 提供型別安全的變體組合
 * - Dark Mode 自動適應（通過 CSS Variables）
 */

const buttonVariants = cva(
  // 基礎樣式
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:disabled-state',
  {
    variants: {
      variant: {
        // Primary: 主要 CTA（漸層橙紅）
        primary:
          'bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] text-white hover:shadow-lg hover:shadow-primary/50 active:scale-95',

        // Secondary: 次要操作（淺色背景）
        secondary:
          'bg-secondary text-foreground hover:bg-secondary/90 active:scale-95',

        // Ghost: 最小化樣式（僅邊框）
        ghost:
          'border border-border text-foreground hover:bg-muted/50 active:scale-95',

        // Danger: 危險操作（紅色警告）
        danger:
          'bg-error text-white hover:shadow-lg hover:shadow-error/50 active:scale-95',

        // Accent: 強調色
        accent:
          'bg-accent text-white hover:shadow-lg hover:shadow-accent/50 active:scale-95',
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
 * Button 元件
 *
 * 用法:
 * <Button variant="primary" size="lg" fullWidth>
 *   主要按鈕
 * </Button>
 *
 * <Button variant="ghost" size="sm">
 *   次要操作
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

