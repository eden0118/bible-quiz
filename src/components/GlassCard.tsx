import { forwardRef } from 'react';
import { cn } from '../lib/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'glass rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassCard.displayName = 'GlassCard';
