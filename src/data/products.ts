/**
 * Products Data Configuration
 * 
 * Centralized configuration for all products.
 * Easy to add/remove products by modifying this array.
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  icon: string;
  url: string;
  description?: string;
  featured?: boolean;
}

/**
 * Products array - easily manageable product list
 * Add or remove products by modifying this array
 */
export const products: Product[] = [
  {
    id: 'pearni',
    title: 'Pearni',
    category: 'Learning Platform',
    icon: '📚',
    url: 'https://pearni.netlify.app/',
    description: 'Interactive learning platform for students',
    featured: true
  },
  {
    id: 'cyber-scan-guardian',
    title: 'Cyber Scan Guardian Shield',
    category: 'Security Tool',
    icon: '🛡️',
    url: 'https://ibwmahin.github.io/cyber-scan-guardian-shield/',
    description: 'Advanced cybersecurity scanning tool',
    featured: true
  }
];

/**
 * Get featured products
 */
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

/**
 * Get all products
 */
export const getAllProducts = (): Product[] => {
  return products;
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};