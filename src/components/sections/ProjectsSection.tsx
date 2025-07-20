
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with React and Tailwind CSS featuring user authentication, shopping cart, and payment integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Stripe API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/ibwmahin/ecommerce-platform",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A productivity app with drag-and-drop functionality, real-time updates, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "CSS3", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/ibwmahin/task-manager",
      featured: true
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["React", "Tailwind CSS", "OpenWeather API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/ibwmahin/weather-dashboard",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills with smooth animations and responsive design.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["React", "Framer Motion", "GSAP", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/ibwmahin/portfolio",
      featured: false
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion 
            for creating exceptional web experiences.
          </p>
        </motion.div>

        <div ref={projectsRef} className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.02 }}
              className={`grid grid-cols-1 ${
                project.featured ? 'lg:grid-cols-2' : 'md:grid-cols-1'
              } gap-8 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300`}
            >
              {/* Project Image */}
              <div className="relative group overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Links Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-background transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-background transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/ibwmahin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-all duration-300 hover:transform hover:scale-105"
          >
            <Github className="h-5 w-5" />
            <span>View More Projects</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
