import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import SkillCard from '../components/SkillCard';
import { Code, Shield, Lightbulb, PenTool } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="section-container relative">
      <SectionTitle title="About" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Text content */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Developer & Cybersecurity Enthusiast</h3>
          <p className="text-gray-300 mb-6">
            I'm AbdulLa Al Mahin - a passionate Web Developer who specializes in clean high-end optimized websites, landing pages, and web applications. I work with tech like React.js, Node.js, and TypeScript. My code isn't just functional—it's clean, maintainable, and follows best practices.
          </p>
          <p className="text-gray-300 mb-6">
            Beyond development, I have a deep interest in cybersecurity, currently focusing on skills with the OWASP Top 10 and secure coding practices. I approach security thoughtfully, creating stunning and efficient but also secure solutions.
          </p>
          <p className="text-primary font-medium cursor-pointer hover:text-accent transition-colors">
            Let's connect and create something extraordinary together!
          </p>
        </motion.div>
        
        {/* Skills cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <SkillCard 
            icon={<Code size={28} />}
            title="Clean Code"
            description="Writing well-structured, readable, and maintainable code that follows best practices."
          />
          
          <SkillCard 
            icon={<Shield size={28} />}
            title="Security First"
            description="Building applications with security in mind from day one to protect from common web vulnerabilities."
          />
          
          <SkillCard 
            icon={<Lightbulb size={28} />}
            title="Innovation"
            description="Researching, learning, and implementing cutting-edge technologies."
          />
          
          <SkillCard 
            icon={<PenTool size={28} />}
            title="Open Source"
            description="Contributing to and maintaining open-source projects and tools."
          />
        </div>
      </div>
    </section>
  );
};

export default About;