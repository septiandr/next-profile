import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variants = {
    primary: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
    secondary: 'bg-gray-800/50 text-gray-300 border-gray-700/50',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs sm:text-sm',
  };

  const baseStyles = 'rounded-full border inline-flex items-center justify-center';
  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={badgeClasses}
    >
      {children}
    </motion.span>
  );
};

export default Badge; 