import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, error, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        label={label}
        type={showPassword ? 'text' : 'password'}
        error={error}
        className={`pr-10 ${className || ''}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-3 text-gray-400 hover:text-[#f7931e] transition-colors"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
};
