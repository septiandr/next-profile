import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  animate = true,
  onClick,
}) => {
  const baseStyles = 'bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50 p-4 sm:p-6';
  const cardClasses = `${baseStyles} ${className}`;

  const MotionComponent = animate ? motion.div : 'div';
  const motionProps = animate ? {
    whileHover: hover ? { scale: 1.02 } : undefined,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <MotionComponent
      className={cardClasses}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
};

export default Card; 