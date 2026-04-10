import { type HTMLMotionProps, motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline';
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyle = "w-full py-3 px-4 font-bold tracking-widest uppercase transition-colors duration-300";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 [clip-path:polygon(0_0,95%_0,100%_25%,100%_100%,5%_100%,0_75%)]",
    outline: "bg-transparent border border-gray-500 text-gray-300 hover:bg-white/5",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};