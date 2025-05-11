import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

// Import icons from lucide-react as needed
import { 
  Code as CodeIcon, 
  Globe, 
  Server, 
  Database, 
  Terminal, 
  ShieldCheck 
} from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <CodeIcon className="text-primary" size={20} />,
      skills: ["JavaScript", "TypeScript", "Python", "PHP", "C++"]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="text-primary" size={20} />,
      skills: ["React.js", "HTML5/CSS3", "Tailwind CSS", "Bootstrap", "Vue.js"]
    },
    {
      title: "Backend Development",
      icon: <Server className="text-primary" size={20} />,
      skills: ["Node.js", "Express.js", "PHP", "REST APIs"]
    },
    {
      title: "Database Technologies",
      icon: <Database className="text-primary" size={20} />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"]
    },
    {
      title: "DevOps & Tools",
      icon: <Terminal className="text-primary" size={20} />,
      skills: ["Git", "Docker", "Linux", "Nginx"]
    },
    {
      title: "Cybersecurity",
      icon: <ShieldCheck className="text-primary" size={20} />,
      skills: ["Penetration Testing", "Web Security", "JWT Authentication", "OWASP Top 10", "SSL/TLS"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section-container">
      <SectionTitle title="Skills & Services" />
      
      <p className="text-gray-300 mb-12 max-w-3xl">
        All the skills and core services I can provide you basically. No need to run through to the agency. All In one Solution!
      </p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="glass-panel p-6 card-hover"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              {category.icon}
              <h3 className="text-white font-bold ml-2">{category.title}</h3>
            </div>
            
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Currently Learning Section */}
      <div className="mt-16 glass-panel p-6">
        <h3 className="text-xl font-bold mb-6 text-white">Currently Learning:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-primary/20 p-2 rounded mr-4">
              <Terminal size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Advanced Docker & Kubernetes</h4>
              <p className="text-gray-400 text-sm">Learning the latest web technologies and best practices</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/20 p-2 rounded mr-4">
              <ShieldCheck size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">OWASP Top 10 and secure coding practices</h4>
              <p className="text-gray-400 text-sm">Deepening security knowledge for safer applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;