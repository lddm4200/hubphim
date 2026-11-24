import React, { forwardRef } from 'react';
import { X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', leftIcon, rightIcon, onClear, value, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-zinc-400 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            value={value}
            className={`w-full bg-surface-subtle border text-zinc-100 rounded-lg text-sm transition-colors placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 min-h-[42px] ${
              error ? 'border-red-500/60' : 'border-surface-border'
            } ${leftIcon ? 'pl-9' : 'pl-3.5'} ${
              onClear && value ? 'pr-9' : rightIcon ? 'pr-9' : 'pr-3.5'
            } py-2 ${className}`}
            {...props}
          />
          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2.5 text-zinc-400 hover:text-zinc-200 p-1.5 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!onClear && rightIcon && (
            <div className="absolute right-3 text-zinc-400 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
