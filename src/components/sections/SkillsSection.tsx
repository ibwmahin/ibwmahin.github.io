
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
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

  const skills = [
    {
      name: "React",
      level: 95,
      icon: "⚛️",
      description: "Building dynamic UIs with hooks, context, and modern patterns"
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: "🎨",
      description: "Utility-first CSS framework for rapid UI development"
    },
    {
      name: "JavaScript",
      level: 88,
      icon: "📜",
      description: "ES6+, async/await, DOM manipulation, and modern JS features"
    },
    {
      name: "HTML5",
      level: 95,
      icon: "🏗️",
      description: "Semantic markup, accessibility, and modern HTML standards"
    },
    {
      name: "CSS3",
      level: 85,
      icon: "🎯",
      description: "Flexbox, Grid, animations, and responsive design"
    },
    {
      name: "TypeScript",
      level: 80,
      icon: "🔷",
      description: "Type-safe JavaScript with modern development practices"
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I specialize in modern web technologies and frameworks to build 
            scalable, performant, and beautiful applications.
          </p>
        </motion.div>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{skill.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.level}% Proficiency
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {skill.description}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-6 text-foreground">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Git & GitHub", "Responsive Design", "RESTful APIs", 
              "Framer Motion", "GSAP", "Figma", "VS Code", "npm/yarn"
            ].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
