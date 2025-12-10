import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * ========================================
 * CARD: Compound Component Pattern
 * ========================================
 *
 * Single File 中包含 Card, CardHeader, CardContent, CardFooter
 * 使用 CVA 管理樣式變體，配合 CSS Variables 自動適應 Dark Mode
 *
 * 優勢:
 * - 邏輯內聚：Card 的所有子元件定義在同一個檔案
 * - 樣式集中：CVA 變體清晰可見
 * - 無需 props drilling：直接使用 className utilities
 * - Dark Mode：CSS Variables 自動切換，無需額外邏輯
 */

/* ========== CVA 樣式定義 ========== */
const cardVariants = cva(
  'glass rounded-2xl border shadow-lg transition-colors duration-300',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-xl',
        subtle: 'shadow-sm',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

const cardHeaderVariants = cva('', {
  variants: {
    spacing: {
      sm: 'pb-3',
      md: 'pb-4',
      lg: 'pb-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

const cardContentVariants = cva('', {
  variants: {
    spacing: {
      sm: 'py-2',
      md: 'py-4',
      lg: 'py-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

const cardFooterVariants = cva('', {
  variants: {
    spacing: {
      sm: 'pt-3',
      md: 'pt-4',
      lg: 'pt-6',
      none: '',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

/* ========== TypeScript Interfaces ========== */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

/* ========== Card Components ========== */

/**
 * Card - 基礎容器
 *
 * 例子:
 * <Card variant="elevated" padding="lg">
 *   <CardHeader spacing="md">
 *     <h2 className="text-h3">標題</h2>
 *   </CardHeader>
 *   <CardContent>
 *     <p className="text-body">內容</p>
 *   </CardContent>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

/**
 * CardHeader - 卡片標題區域
 * 預設有下邊距分隔
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-b border-border/20',
        cardHeaderVariants({ spacing }),
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * CardContent - 卡片內容區域
 * 主要內容區，自動處理內部垂直間距
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  CardContentProps
>(({ className, spacing, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardContentVariants({ spacing }), className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

/**
 * CardFooter - 卡片底部區域
 * 常用於放置按鈕或動作
 *
 * 例子:
 * <CardFooter spacing="md" className="flex gap-3 justify-end">
 *   <Button variant="secondary">取消</Button>
 *   <Button variant="primary">確認</Button>
 * </CardFooter>
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-t border-border/20',
        cardFooterVariants({ spacing }),
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

/* ========== Compound Component Export ========== */
export const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
