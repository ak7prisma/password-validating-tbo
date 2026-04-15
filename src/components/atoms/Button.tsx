import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = "relative font-bold uppercase tracking-wider text-sm py-3 px-6 text-white overflow-hidden transition-all duration-300 pointer-events-auto [clip-path:polygon(10%_0%,100%_0%,100%_70%,90%_100%,0%_100%,0%_30%)]";
  
  const variantsClasses = {
    primary: "bg-[#ff003c] hover:bg-[#ff003c]/90 shadow-[0_0_15px_#ff003c]",
    secondary: "bg-[#f7931e] hover:bg-[#f7931e]/90 shadow-[0_0_15px_#f7931e]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantsClasses[variant]} ${className || ''}`}
      {...props}
    >
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
      {children}
    </motion.button>
  );
};
