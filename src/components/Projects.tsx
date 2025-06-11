
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Gaming Website",
      description: "Interactive gaming platform with modern UI/UX and responsive design for enhanced user experience",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
      liveDemo: "https://ibwmahin.github.io/Gaming_Website/",
      github: "https://github.com/ibwmahin/Gaming_Website"
    },
    {
      id: 2,
      title: "Cyber Scan Guardian Shield",
      description: "Advanced cybersecurity scanning tool with real-time threat detection and comprehensive security analysis",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      stack: ["JavaScript", "Security", "Real-time Scanning", "Threat Detection", "Web Security"],
      liveDemo: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
      github: "https://github.com/ibwmahin/cyber-scan-guardian-shield"
    },
    {
      id: 3,
      title: "DevBoard",
      description: "Developer dashboard with project management tools and analytics for enhanced productivity tracking",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
      stack: ["React", "Dashboard", "Analytics", "Project Management", "Developer Tools"],
      liveDemo: "https://ibwmahin.github.io/DevBoard/",
      github: "https://github.com/ibwmahin/DevBoard"
    },
    {
      id: 4,
      title: "Udbudo",
      description: "Modern web application with clean interface and optimized performance for seamless user interaction",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
      stack: ["Modern Web", "Clean UI", "Performance", "User Experience", "Optimization"],
      liveDemo: "https://ibwmahin.github.io/udbudo/",
      github: "https://github.com/ibwmahin/udbudo"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Showcasing my latest work in web development and design
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} variants={itemVariants} />
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8 } }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-3 backdrop-blur-sm"
                onClick={() => window.open('https://github.com/ibwmahin', '_blank')}
              >
                View All Projects on GitHub
                <Github className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, variants }: { project: any, index: number, variants: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  // Reduced tilt intensity from /10 to /20
  const tiltX = mousePosition.y / 20;
  const tiltY = -mousePosition.x / 20;

  return (
    <motion.div
      variants={variants}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
        animate={{
          rotateX: isHovered ? tiltX : 0,
          rotateY: isHovered ? tiltY : 0,
          scale: isHovered ? 1.01 : 1, // Reduced from 1.02 to 1.01
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Reduced floating particles from 8 to 4 */}
        {isHovered && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              y: [0, -20]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Project Image */}
        <div className="relative overflow-hidden h-64">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1, // Reduced from 1.1 to 1.05
            }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          
          {/* Overlay buttons */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/80 backdrop-blur-sm"
                onClick={() => window.open(project.liveDemo, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                size="sm" 
                variant="outline"
                className="border-white/30 hover:border-white/50 backdrop-blur-sm"
                onClick={() => window.open(project.github, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 relative" style={{ transform: "translateZ(20px)" }}>
          <motion.h3 
            className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors"
            animate={{ scale: isHovered ? 1.02 : 1 }} // Reduced from 1.05 to 1.02
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-foreground/70 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack with tooltip effect */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech, techIndex) => (
              <motion.span 
                key={tech}
                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                whileHover={{ scale: 1.05, rotateZ: 1 }} // Reduced rotation from 2 to 1
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <Button 
                size="sm" 
                className="w-full bg-button-gradient hover:scale-105 transition-transform"
                onClick={() => window.open(project.liveDemo, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </motion.div>
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <Button 
                size="sm" 
                variant="outline"
                className="w-full border-primary/50 hover:border-primary hover:bg-primary/10"
                onClick={() => window.open(project.github, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default Projects;
