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
    title: "DigitalPathways.ai",
    subtitle: "AI Consulting & Transformation",
    description:
      "DigitalPathways.ai is a digital consulting and AI transformation agency helping organizations innovate with AI.",
    icon: faRocket,
    url: "https://digitalpathways.ai/",
    category: "Products",
    src: "/DemoImg/digital_pathways_ai.png",
    tags: ["Consulting", "Transformation"],
    date: "2025-7-01",
  },
  {
    id: "pearni",
    title: "Pearni",
    subtitle: "AI-Powered Sustainable Innovation",
    description:
      "Revolutionizing the future with AI-driven sustainable practices,  and cutting-edge environmental solutions for a greener tomorrow.",
    icon: faBook,
    url: "https://pearni.netlify.app/",
    category: "Products",
    src: "/DemoImg/pear-ni.png",
    tags: ["Hackathon", "AI", "NASA"],
    date: "2024-01-07",
  },
  {
    id: "ibw-nextdev",
    title: "iBW NextDev",
    subtitle: "Minimal Dashboard",
    description:
      "A minimal dashboard built with Next.js, GSAP animations, and advanced data visualizations using graph libraries.",
    icon: faCode,
    url: "https://ibw-nextdev.netlify.app/",
    category: "Projects",
    src: "/DemoImg/dev_board.png",
    tags: ["Next.js", "GSAP", "Dashboard"],
    date: "2024-08-03",
  },
  {
    id: "visqodev2",
    title: "VisqoDev2",
    subtitle: "Digital Agency Website",
    description:
      "A full-blown online digital agency website providing solutions for every digital task.",
    icon: faCode,
    url: "https://visqodev2.netlify.app/",
    category: "Projects",
    src: "/DemoImg/visqo2.png",
    tags: ["Agency", "WebDev", "Services"],
    date: "2024-06-15",
  },
  {
    id: "gaming-website",
    title: "Gaming Website",
    subtitle: "Illuvium Clone",
    description:
      "A gaming website clone inspired by Illuvium, showcasing immersive visuals and game-like interactions.",
    icon: faGamepad,
    url: "https://ibwmahin.github.io/Gaming_Website/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Games", "Clone", "Immersive"],
    date: "2023-12-10",
  },
  {
    id: "dotflow-clone",
    title: "Dotflow Clone",
    subtitle: "n8n Workflow Replica",
    description:
      "A clone of the n8n workflow automation website built entirely with raw HTML, CSS, and JavaScript.",
    icon: faShoppingCart,
    url: "https://ibwmahin.github.io/dotflow-clone/",
    category: "Projects",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript"],
    date: "2024-01-22",
  },
  {
    id: "cyber-scan-guardian-shield",
    title: "Cyber Scan Guardian Shield",
    subtitle: "Vulnerability Scanner",
    description:
      "Identify security vulnerabilities and misconfigurations in web applications with this real-time scanning tool.",
    icon: faShieldAlt,
    url: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
    category: "Products",
    src: "/DemoImg/gurd.png",
    tags: ["Security", "Vulnerability", "Scanner"],
    date: "2024-02-14",
  },
  {
    id: "dataxpie",
    title: "Dataxpie",
    subtitle: "WordPress Digital Agency",
    description:
      "A full-blown digital agency website built using WordPress, Elementor Pro, and Liqued themes.",
    icon: faCode,
    url: "https://www.dataxpie.com/",
    category: "Projects",
    src: "/DemoImg/dataxpie.png",
    tags: ["WordPress", "Agency", "Elementor"],
    date: "2024-09-20",
  },
  {
    id: "devboard",
    title: "DevBoard",
    subtitle: "Team Collaboration",
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
