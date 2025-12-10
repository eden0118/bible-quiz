import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * GlassCard CVA 變體定義
 */
const glassCardVariants = cva(
  // 基礎玻璃態效果樣式
  'glass rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl transition-colors duration-300',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-xl',
        subtle: 'shadow-sm',
      },

      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },

      rounded: {
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
      },
    },

    defaultVariants: {
      variant: 'default',
      padding: 'md',
      rounded: 'lg',
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  children: React.ReactNode;
}

/**
 * 重構後的 GlassCard 元件
 * 提供統一的玻璃態樣式，支援多個變體組合
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, variant, padding, rounded, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          glassCardVariants({ variant, padding, rounded }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

