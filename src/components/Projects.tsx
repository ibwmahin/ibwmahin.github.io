import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, Shield, Smartphone } from 'lucide-react';

interface ProjectsProps {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const Projects: React.FC<ProjectsProps> = ({ nextPage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and real-time inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com",
      demo: "https://demo.com",
      color: "from-latte-blue to-latte-sapphire dark:from-mocha-blue dark:to-mocha-sapphire"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "TypeScript", "Socket.io", "Express", "PostgreSQL"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com",
      demo: "https://demo.com",
      color: "from-latte-mauve to-latte-pink dark:from-mocha-mauve dark:to-mocha-pink"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that provides detailed forecasts, interactive maps, and location-based weather alerts using multiple weather APIs.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind CSS"],
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com",
      demo: "https://demo.com",
      color: "from-latte-green to-latte-teal dark:from-mocha-green dark:to-mocha-teal"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "A comprehensive analytics platform for social media management with advanced reporting, scheduling, and audience insights.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com",
      demo: "https://demo.com",
      color: "from-latte-peach to-latte-yellow dark:from-mocha-peach dark:to-mocha-yellow"
    }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: "High Performance",
      description: "Optimized for speed and efficiency"
    },
    {
      icon: <Shield size={24} />,
      title: "Secure",
      description: "Built with security best practices"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Responsive",
      description: "Works perfectly on all devices"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-latte-text dark:text-mocha-text mb-4">
              My Projects
            </h2>
            <p className="text-xl text-latte-subtext1 dark:text-mocha-subtext1 max-w-3xl mx-auto">
              A collection of projects that showcase my skills and passion for creating meaningful digital experiences.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-latte-text dark:text-mocha-text">
                    {project.title}
                  </h3>
                  
                  <p className="text-latte-subtext1 dark:text-mocha-subtext1 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-latte-surface1 dark:bg-mocha-surface1 text-latte-text dark:text-mocha-text text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <a
                      href={project.demo}
                      className="inline-flex items-center px-4 py-2 bg-latte-blue dark:bg-mocha-blue text-latte-base dark:text-mocha-base rounded-lg hover:shadow-lg transition-shadow text-sm"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="inline-flex items-center px-4 py-2 bg-latte-surface1 dark:bg-mocha-surface1 text-latte-text dark:text-mocha-text rounded-lg hover:bg-latte-surface2 dark:hover:bg-mocha-surface2 transition-colors text-sm"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold text-latte-text dark:text-mocha-text text-center">
              What I Focus On
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-latte-blue dark:text-mocha-blue mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-latte-text dark:text-mocha-text mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-latte-subtext1 dark:text-mocha-subtext1 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              onClick={nextPage}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve text-latte-base dark:text-mocha-base font-semibold rounded-full hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;