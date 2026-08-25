import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-md px-4 py-2';
  const variantStyles = {
    primary: 'bg-amber-600 text-white hover:bg-amber-500 active:bg-amber-700 shadow-md shadow-amber-600/20 font-semibold',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-900 border border-slate-700',
    outline: 'border border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800 hover:border-slate-500 hover:text-white',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/60'
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
