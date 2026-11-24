import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'subtle' | 'warning' | 'glass';
  size?: 'xs' | 'sm';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded';

  const variants = {
    default: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
    primary: 'bg-brand text-white',
    subtle: 'bg-zinc-800 text-zinc-300',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    glass: 'bg-black/70 text-white backdrop-blur-sm',
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 leading-tight',
    sm: 'text-xs px-2 py-0.5 leading-normal',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
