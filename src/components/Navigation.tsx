import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  pages: Array<{ id: string; title: string }>;
  currentPage: number;
  onPageChange: (index: number) => void;
  isDark: boolean;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  pages, 
  currentPage, 
  onPageChange, 
  isDark,
  className = ""
}) => {
  return (
    <nav className={`flex space-x-3.5 ${className}`}>
      {pages.map((page, index) => (
        <motion.button
          key={page.id}
          onClick={() => onPageChange(index)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            index === currentPage
              ? 'bg-latte-blue dark:bg-mocha-blue text-latte-base dark:text-mocha-base'
              : 'text-latte-subtext1 dark:text-mocha-subtext1 hover:text-latte-blue dark:hover:text-mocha-blue hover:bg-latte-surface0 dark:hover:bg-mocha-surface0'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page.title}
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;