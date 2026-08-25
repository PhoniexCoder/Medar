import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyle = 'rounded-xl p-6 transition-all duration-200';
  const variantStyles = {
    default: 'bg-slate-900/60 border border-slate-800 hover:border-slate-700',
    bordered: 'bg-slate-950 border border-amber-500/20 hover:border-amber-500/40',
    glass: 'bg-slate-900/40 backdrop-blur-md border border-slate-800/80 shadow-xl'
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
