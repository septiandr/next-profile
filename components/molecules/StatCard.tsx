import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface StatCardProps {
  value: string | number;
  label: string;
  index?: number;
  rotateX?: number;
  rotateY?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  index = 0,
  rotateX,
  rotateY,
}) => {
  return (
    <Card
      className="text-center transform-gpu"
      hover={false}
      animate={false}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2"
      >
        {value}
      </motion.div>
      <p className="text-sm sm:text-base text-gray-300">{label}</p>
    </Card>
  );
};

export default StatCard; 