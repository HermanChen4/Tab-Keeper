import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white',
    secondary: 'bg-[var(--secondary)] hover:bg-[#ff4515] text-white',
    outline: 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)]',
    ghost: 'text-[var(--gray-700)] hover:bg-[var(--gray-100)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
