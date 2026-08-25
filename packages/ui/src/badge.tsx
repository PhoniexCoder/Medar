import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'navy' | 'outline' | 'success';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors';
  const variantStyles = {
    gold: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    navy: 'bg-slate-800 text-slate-200 border border-slate-700',
    outline: 'border border-slate-600 text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
