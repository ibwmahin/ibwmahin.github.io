import { Project, Skill } from "../types";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Next.js E-commerce Platform",
    description:
      "Full-stack e-commerce solution with Stripe integration, admin dashboard, and real-time inventory management.",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js 14, featuring server-side rendering, dynamic product catalogs, secure payment processing, and a complete admin dashboard for inventory management.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    imageUrl:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "fullstack",
  },
  {
    id: "ai-chat-app",
    title: "AI-Powered Chat Application",
    description:
      "Real-time chat application with AI integration, websocket connections, and intelligent message suggestions.",
    longDescription:
      "A sophisticated chat application featuring real-time messaging, AI-powered conversation assistance, file sharing, and advanced user management with role-based permissions.",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "OpenAI API",
      "MongoDB",
      "Redis",
    ],
    imageUrl:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example-chat.com",
    githubUrl: "https://github.com/username/ai-chat-app",
    category: "fullstack",
  },
  {
    id: "task-management",
    title: "Team Task Management System",
    description:
      "Collaborative project management tool with kanban boards, time tracking, and team analytics.",
    longDescription:
      "A comprehensive task management system designed for teams, featuring drag-and-drop kanban boards, time tracking, project analytics, and integration with popular development tools.",
    technologies: [
      "Vue.js",
      "Express.js",
      "PostgreSQL",
      "JWT",
      "Chart.js",
      "Docker",
    ],
    imageUrl:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example-tasks.com",
    githubUrl: "https://github.com/username/task-management",
    category: "web",
  },
  {
    id: "mobile-fitness",
    title: "React Native Fitness App",
    description:
      "Cross-platform mobile app for workout tracking, nutrition planning, and progress visualization.",
    longDescription:
      "A comprehensive fitness application built with React Native, featuring workout tracking, meal planning, progress charts, social features, and integration with health platforms.",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "Redux",
      "Chart.js",
      "HealthKit",
    ],
    imageUrl:
      "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example-fitness.com",
    githubUrl: "https://github.com/username/fitness-app",
    category: "mobile",
  },
];
export const skills = [
  // Frontend
  { name: "React", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 88 },
  { name: "Vue.js", category: "frontend", level: 85 },
  { name: "Tailwind CSS", category: "frontend", level: 92 },
  { name: "Framer Motion", category: "frontend", level: 80 },
  // Backend
  { name: "Node.js", category: "backend", level: 90 },
  { name: "Express.js", category: "backend", level: 88 },
  { name: "Python", category: "backend", level: 85 },
  { name: "FastAPI", category: "backend", level: 80 },
  { name: "GraphQL", category: "backend", level: 75 },
  // Database
  { name: "PostgreSQL", category: "database", level: 88 },
  { name: "MongoDB", category: "database", level: 85 },
  { name: "Redis", category: "database", level: 80 },
  { name: "Prisma", category: "database", level: 85 },
  // Tools
  { name: "Docker", category: "tools", level: 82 },
  { name: "AWS", category: "tools", level: 78 },
  { name: "Git", category: "tools", level: 90 },
  { name: "Vercel", category: "tools", level: 85 },
];
