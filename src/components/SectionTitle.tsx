import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  id?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, id }) => {
  return (
    <motion.h2 
      id={id}
      className="section-title text-white"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-primary mr-2">/</span> {title}
    </motion.h2>
  );
};

export default SectionTitle;