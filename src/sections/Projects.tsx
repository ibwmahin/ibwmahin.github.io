import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";

// Project data
const projects = [
  {
    id: 1,
    title: "DevBoard",
    description: "A Developer Board for Making Development Faster.",
    image:
      "https://raw.githubusercontent.com/ibwmahin/DevBoard/main/src/image/devboard.png",
    tags: ["React", "TailWindCss", "TypeScript", "Javascript"],
    category: "Web Development",
    demoLink: "https://ibwmahin.github.io/DevBoard/",
    githubLink: "https://github.com/ibwmahin/DevBoard",
  },
  {
    id: 2,
    title: "GamingWebClone",
    description: "A One page clone website of illuvium.io",
    image:
      "https://raw.githubusercontent.com/ibwmahin/Gaming_Website/main/public/images/gaming-website.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web Development",
    demoLink: "https://ibwmahin.github.io/Gaming_Website/",
    githubLink: "https://github.com/ibwmahin/Gaming_Website/",
  },
  {
    id: 3,
    title: "Vulnerability Scanner",
    description:
      "Automated tools for scanning common web vulnerabilities and security flaws.",
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Security", "OWASP"],
    category: "Cybersecurity",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    title: "udbudo",
    description:
      "Premium digital assets for developers. Build better applications with our UI kits, components, and templates designed for the modern web.",
    image:
      "https://raw.githubusercontent.com/ibwmahin/udbudo/refs/heads/main/public/udbudo.png",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    category: "Web Development",
    demoLink: "https://ibwmahin.github.io/udbudo/",
    githubLink: "https://github.com/ibwmahin/udbudo.git",
  },
  {
    id: 5,
    title: "Linux Config Manager",
    description:
      "A tool to manage and deploy Linux configurations for system admins.",
    image:
      "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Bash", "Linux", "DevOps"],
    category: "Tools & Utilities",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 6,
    title: "API Security Gateway",
    description:
      "Protects backend APIs from common security vulnerabilities with rate-limiting.",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Node.js", "Express", "Security", "API"],
    category: "Cybersecurity",
    demoLink: "#",
    githubLink: "#",
  },
];

// Categories for filtering
const categories = [
  "All Projects",
  "Web Development",
  "Cybersecurity",
  "Tools & Utilities",
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="section-container">
      <SectionTitle title="Projects" />

      <p className="text-gray-300 mb-8 max-w-3xl">
        A selection of projects that showcase my skills and interests in web
        development, cybersecurity, and software engineering.
      </p>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-background-glass text-gray-300 hover:bg-primary/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
        transition={{ duration: 0.3 }}
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            demoLink={project.demoLink}
            githubLink={project.githubLink}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
