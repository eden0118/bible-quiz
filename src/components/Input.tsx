import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Input CVA 變體定義
 * 統一的文字輸入元件樣式
 */
const inputVariants = cva(
  // 基礎樣式
  'w-full rounded-lg border px-4 py-2 text-base font-medium transition-colors duration-300 placeholder:text-muted-foreground/70 focus:outline-none focus-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      inputSize: {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-base px-4',
        lg: 'h-12 text-lg px-5',
      },
      variant: {
        default: 'border-border bg-background text-foreground focus:border-primary',
        secondary:
          'border-border bg-muted text-foreground focus:border-primary dark:bg-muted/50',
      },
    },

    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  inputSize?: 'sm' | 'md' | 'lg';
}

/**
 * 語意化的 Input 元件
 * 自動適應 Light/Dark mode，支援多個尺寸和變體
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

