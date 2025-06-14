import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl',
  };

  const baseStyles = 'rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold';
  const avatarClasses = `${baseStyles} ${sizes[size]} ${className}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={avatarClasses}
    >
      {initials}
    </motion.div>
  );
};

export default Avatar; 