import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-sm border border-[var(--gray-200)]';
  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
