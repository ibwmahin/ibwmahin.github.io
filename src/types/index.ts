export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'mobile' | 'fullstack' | 'backend';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: number;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'section' | 'project' | 'skill';
  href: string;
}