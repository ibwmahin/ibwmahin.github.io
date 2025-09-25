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
  category: "Projects" | "Products";
  src: string; // Added for hover image
}

export const projects: Project[] = [
  {
    id: "digital-pathways",
    title: "Digital Pathways",
    description:
      "AI-powered educational platform designed to personalize learning experiences for students worldwide.",
    icon: faRocket,
    url: "https://digitalpathways.ai/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "visqodev2",
    title: "VisqoDev2",
    description:
      "Modern web development showcase with advanced features and responsive design.",
    icon: faCode,
    url: "https://visqodev2.netlify.app/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1561336313-0dc4f3b1a1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ibw-nextdev",
    title: "iBW NextDev",
    description:
      "Next.js powered application with server-side rendering and API integrations.",
    icon: faCode,
    url: "https://ibw-nextdev.netlify.app/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gaming-website",
    title: "Gaming Website",
    description:
      "Interactive gaming platform featuring immersive experiences and community-driven content creation.",
    icon: faGamepad,
    url: "https://ibwmahin.github.io/Gaming_Website/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dotflow-clone",
    title: "Dotflow Clone",
    description:
      "High-fidelity clone of a popular design tool with custom animations and UI components.",
    icon: faShoppingCart,
    url: "https://ibwmahin.github.io/dotflow-clone/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pearni",
    title: "Pearni",
    description:
      "Learning platform offering interactive courses, progress tracking, and certification upon completion.",
    icon: faBook,
    url: "https://pearni.netlify.app/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cyber-scan-guardian-shield",
    title: "Cyber Scan Guardian Shield",
    description:
      "Security tool providing real-time threat detection, vulnerability scanning, and automated remediation.",
    icon: faShieldAlt,
    url: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1632427635820-24f8b7e0d4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "devboard",
    title: "DevBoard",
    description:
      "Collaborative development board for teams with real-time updates and task management.",
    icon: faCode,
    url: "https://ibwmahin.github.io/DevBoard/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
