/**
 * Projects Data Configuration
 * 
 * Centralized configuration for all projects.
 * Easy to add/remove projects by modifying this array.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'morva' | 'rectangle' | 'simply' | 'glassdoor' | 'seven';
  url: string;
  category: string;
}

/**
 * Projects array - easily manageable project list
 * Add or remove projects by modifying this array
 */
export const projects: Project[] = [
  {
    id: 'digital-pathways',
    title: 'Digital Pathways',
    description: 'AI-powered educational platform',
    icon: '🚀',
    color: 'morva',
    url: 'https://digitalpathways.ai/',
    category: 'Web Development'
  },
  {
    id: 'lazy-nvim',
    title: 'LazyNvim Config',
    description: 'Custom Neovim configuration',
    icon: '⚡',
    color: 'rectangle',
    url: 'https://github.com/ibwmahin/LazyNvim',
    category: 'Open Source'
  },
  {
    id: 'gaming-website',
    title: 'Gaming Website',
    description: 'Interactive gaming platform',
    icon: '🎮',
    color: 'simply',
    url: 'https://ibwmahin.github.io/Gaming_Website/',
    category: 'Frontend Development'
  },
  {
    id: 'manae-shopping',
    title: 'Manae Shopping Mart',
    description: 'E-commerce platform',
    icon: '🛍️',
    color: 'glassdoor',
    url: 'https://manaeshoppingmartllc.com/',
    category: 'Full Stack Development'
  }
];

/**
 * Get featured projects (first 3 for home page)
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 3);
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};