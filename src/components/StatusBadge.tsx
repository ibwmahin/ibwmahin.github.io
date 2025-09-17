/**
 * Status Badge Component
 * 
 * Displays availability status with animated dot indicator.
 * Used to show "Available for work" status throughout the portfolio.
 */

import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: string;
  isAvailable?: boolean;
}

/**
 * Animated status badge with pulsing dot indicator
 */
export function StatusBadge({ status, isAvailable = true }: StatusBadgeProps) {
  return (
    <motion.div 
      className="status-badge"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <motion.div
        className="status-badge-dot"
        animate={isAvailable ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span>{status}</span>
    </motion.div>
  );
}