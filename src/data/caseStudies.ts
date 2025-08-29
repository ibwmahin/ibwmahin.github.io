// src/data/caseStudies.ts
export type Section = {
  heading: string;
  content?: string; // text or HTML
  code?: string; // optional code snippet
  images?: string[]; // optional images
};

export type CaseStudy = {
  id: string; // unique, kebab-case, used in URL
  title: string;
  tagline?: string;
  updated?: string;
  tech?: string[];
  sections?: Section[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "dev-tracker",
    title: "Dev Tracker",
    tagline: "Track projects & progress — minimal, no-nonsense.",
    updated: "2025-08-30",
    tech: ["React", "Node.js", "Tailwind"],
    sections: [
      {
        heading: "Problem",
        content:
          "Developers needed a lightweight, clear way to track tasks and project progress without complex dashboards.",
      },
      {
        heading: "Solution",
        content:
          "Built a minimal React dashboard with reusable components, fast load times, and clear status indicators.",
      },
      {
        heading: "Code Snippet",
        code: `function trackProgress(project) {
  project.tasks.forEach(t => console.log('[TASK]', t.name, '-', t.status));
}`,
      },
      {
        heading: "Results",
        content: "Improved clarity and reduced onboarding time by ~40%.",
      },
    ],
  },
  {
    id: "ui-kit",
    title: "Atomic UI Kit",
    tagline: "Reusable components for fast prototyping.",
    updated: "2025-07-12",
    tech: ["React", "Tailwind", "Storybook"],
    sections: [
      {
        heading: "Problem",
        content:
          "Teams wasted time recreating buttons, inputs, and modals in every project.",
      },
      {
        heading: "Solution",
        content:
          "Created a library of atomic components with consistent design tokens. Components are composable and documented in Storybook.",
        images: ["/images/ui-kit-1.png", "/images/ui-kit-2.png"],
      },
      {
        heading: "Code Example",
        code: `export function Button({ children }) {
  return <button className="border-2 border-black px-3 py-1 font-mono">{children}</button>;
}`,
      },
      {
        heading: "Results",
        content: "Reduced UI bugs and sped up prototype development by 60%.",
      },
    ],
  },
  {
    id: "analytics",
    title: "Tiny Analytics",
    tagline: "Privacy-first lightweight analytics.",
    updated: "2025-06-05",
    tech: ["Vanilla JS", "Node", "SQLite"],
    sections: [
      {
        heading: "Problem",
        content:
          "Existing analytics tools were heavy, privacy-invasive, and slowed down websites.",
      },
      {
        heading: "Solution",
        content:
          "Built a small on-premise analytics service with event sampling and clear dashboards.",
      },
      {
        heading: "Code Snippet",
        code: `fetch('/api/track', { method: 'POST', body: JSON.stringify({ e: 'click' }) });`,
      },
      {
        heading: "Results",
        content:
          "Reduced client JS by 95%, maintained full privacy compliance.",
      },
    ],
  },
];

export default caseStudies;
