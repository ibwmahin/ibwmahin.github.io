import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => {
  return (
    <motion.div 
      className="glass-panel p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Quote className="text-primary mb-4 opacity-50" size={24} />
      <p className="text-gray-300 italic mb-6">{quote}</p>
      <div className="flex items-center">
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;