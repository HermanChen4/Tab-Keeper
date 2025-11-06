import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2.5 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 ${widthClass} ${className} ${error ? 'border-[var(--red-500)]' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--red-500)]">{error}</p>
      )}
    </div>
  );
};
