/**
 * Product Card Component
 * 
 * Displays digital products and templates with external link indicators.
 * Used in the products section to showcase available templates and tools.
 */

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
  title: string;
  category: string;
  icon: string;
  href?: string;
}

/**
 * Product card for digital products and templates
 */
export function ProductCard({ title, category, icon, href }: ProductCardProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
  };

  return (
    <motion.div
      className="product-card group"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        {/* Product Icon */}
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center font-bold">
          {icon}
        </div>
        
        {/* Product Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            {category}
          </p>
        </div>
      </div>

      {/* External Link Icon */}
      <motion.div
        className="opacity-60 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </motion.div>
  );
}