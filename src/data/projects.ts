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
  subtitle?: string; // short tagline shown near title (optional)
  description: string;
  icon: IconDefinition;
  url: string;
  category: "Projects" | "Products";
  src?: string; // added for hover image (optional)
  tags?: string[]; // optional tags used by the UI
  date?: string; // ISO date or any parseable date string (optional)
}

export const projects: Project[] = [
  {
    id: "digital-pathways",
    title: "Digital Pathways",
    subtitle: "AI-driven learning",
    description:
      "AI-powered educational platform designed to personalize learning experiences for students worldwide.",
    icon: faRocket,
    url: "https://digitalpathways.ai/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "EdTech", "Personalization"],
    date: "2024-10-01",
  },
  {
    id: "visqodev2",
    title: "VisqoDev2",
    subtitle: "Modern portfolio",
    description:
      "Modern web development showcase with advanced features and responsive design.",
    icon: faCode,
    url: "https://visqodev2.netlify.app/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1561336313-0dc4f3b1a1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Tailwind", "Responsive"],
    date: "2024-06-15",
  },
  {
    id: "ibw-nextdev",
    title: "iBW NextDev",
    subtitle: "SSR + integrations",
    description:
      "Next.js powered application with server-side rendering and API integrations.",
    icon: faCode,
    url: "https://ibw-nextdev.netlify.app/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "SSR", "APIs"],
    date: "2024-08-03",
  },
  {
    id: "gaming-website",
    title: "Gaming Website",
    subtitle: "Community & play",
    description:
      "Interactive gaming platform featuring immersive experiences and community-driven content creation.",
    icon: faGamepad,
    url: "https://ibwmahin.github.io/Gaming_Website/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Games", "Canvas", "UX"],
    date: "2023-12-10",
  },
  {
    id: "dotflow-clone",
    title: "Dotflow Clone",
    subtitle: "Design tool replica",
    description:
      "High-fidelity clone of a popular design tool with custom animations and UI components.",
    icon: faShoppingCart,
    url: "https://ibwmahin.github.io/dotflow-clone/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["UI", "Animation", "Prototype"],
    date: "2024-01-22",
  },
  {
    id: "pearni",
    title: "Pearni",
    subtitle: "Interactive courses",
    description:
      "Learning platform offering interactive courses, progress tracking, and certification upon completion.",
    icon: faBook,
    url: "https://pearni.netlify.app/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Courses", "Progress", "Certifications"],
    date: "2024-05-07",
  },
  {
    id: "cyber-scan-guardian-shield",
    title: "Cyber Scan Guardian Shield",
    subtitle: "Real-time threat detection",
    description:
      "Security tool providing real-time threat detection, vulnerability scanning, and automated remediation.",
    icon: faShieldAlt,
    url: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1632427635820-24f8b7e0d4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Security", "Scanning", "Automation"],
    date: "2024-02-14",
  },
  {
    id: "devboard",
    title: "DevBoard",
    subtitle: "Team collaboration",
    description:
      "Collaborative development board for teams with real-time updates and task management.",
    icon: faCode,
    url: "https://ibwmahin.github.io/DevBoard/",
    category: "Products",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Realtime", "PM", "Collaboration"],
    date: "2023-11-01",
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
