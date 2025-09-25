/**
 * Projects Data Configuration
 *
 * Centralized configuration for all projects.
 * Easy to add/remove projects by modifying this array.
 */

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faCode,
  faGamepad,
  faShoppingCart,
  faBook,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: IconDefinition;
  url: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "digital-pathways",
    title: "Digital Pathways",
    description: "AI-powered educational platform",
    icon: faRocket,
    url: "https://digitalpathways.ai/",
    category: "Web Development",
  },
  {
    id: "lazy-nvim",
    title: "LazyNvim Config",
    description: "Custom Neovim configuration",
    icon: faCode,
    url: "https://github.com/ibwmahin/LazyNvim",
    category: "Open Source",
  },
  {
    id: "gaming-website",
    title: "Gaming Website",
    description: "Interactive gaming platform",
    icon: faGamepad,
    url: "https://ibwmahin.github.io/Gaming_Website/",
    category: "Frontend Development",
  },
  {
    id: "manae-shopping",
    title: "Manae Shopping Mart",
    description: "E-commerce platform",
    icon: faShoppingCart,
    url: "https://manaeshoppingmartllc.com/",
    category: "Full Stack Development",
  },
  {
    id: "pearni",
    title: "Pearni",
    description: "Learning Platform",
    icon: faBook,
    url: "https://pearni.netlify.app/",
    category: "Educational Tool",
  },
  {
    id: "cyber-scan-guardian-shield",
    title: "Cyber Scan Guardian Shield",
    description: "Security Tool",
    icon: faShieldAlt,
    url: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
    category: "Security Application",
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
