// src/data/posts.ts
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string; // can be a path to public/images or external url
  content: string; // for now plain text or HTML string
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2025-09-15",
    excerpt:
      "A friendly guide to the basics of React and building your first Vite app.",
    cover: "/images/covers/react-1.jpg",
    content: `This is the full post content for Getting Started With React.\n\nReplace with real content or markdown later.`,
    featured: true,
  },
  {
    slug: "tailwind-css-guide",
    title: "Why Tailwind CSS is Awesome",
    date: "2025-09-10",
    excerpt: "Exploring utility-first CSS with real-world examples.",
    cover: "/images/covers/tailwind.jpg",
    content: `Tailwind notes...`,
  },
  {
    slug: "framer-motion-animations",
    title: "Animating with Framer Motion",
    date: "2025-09-05",
    excerpt:
      "How to add smooth, delightful animations to your React components.",
    cover: "/images/covers/framer.jpg",
    content: `Framer Motion examples...`,
  },
  {
    slug: "applish-ui-patterns",
    title: "Designing an Applish UI",
    date: "2025-08-28",
    excerpt: "Patterns to make your web UI feel like a native app.",
    cover: "/images/covers/app-like.jpg",
    content: `Applish UI notes...`,
  },
  {
    slug: "how-i-built-my-portfolio",
    title: "How I Built My Portfolio",
    date: "2025-09-18",
    excerpt: "A step-by-step of building a fast portfolio with Vite + React.",
    cover: "/images/covers/portfolio.jpg", // put image in public/images/covers/
    content: `I built my portfolio using Vite, Tailwind and Framer Motion...\n\nMore content here.`,
    featured: false,
  },
];
