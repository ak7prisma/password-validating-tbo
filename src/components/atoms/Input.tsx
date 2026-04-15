import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="text-sm font-semibold tracking-wide text-gray-300">
        {label}
      </label>
      <input
        className={`bg-[#111] border-b-2 ${error ? 'border-[#ff003c]' : 'border-gray-700'} text-white focus:outline-none focus:border-[#f7931e] transition-colors duration-300 py-2 px-3 placeholder-gray-600 ${className || ''}`}
        {...props}
      />
      {error && <span className="text-xs text-[#ff003c] absolute -bottom-5 left-0">{error}</span>}
    </div>
  );
};
