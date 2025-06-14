import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles = 'font-semibold rounded-lg transition duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/20',
    secondary: 'bg-gray-800/50 text-white hover:bg-gray-700/50',
    outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 sm:py-3 text-sm sm:text-base',
    lg: 'px-8 py-3 sm:py-4 text-base sm:text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
};

export default Button; 