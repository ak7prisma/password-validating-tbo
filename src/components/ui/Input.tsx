import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    const [show, setShow] = useState(false);
    
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && show ? 'text' : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          className={`w-full bg-black/40 border border-gray-800 border-l-4 border-l-orange-500 text-white py-3 px-4 outline-none focus:border-red-600 focus:border-l-red-600 focus:translate-x-1 transition-all duration-300 ${
            isPasswordType ? 'pr-12' : '' 
          } ${className || ''}`}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
          >
            {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';