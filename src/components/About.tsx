
import { Code, Shield, Rocket, Coffee, Database, Server, Globe, GitBranch } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that follows industry best practices",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Security Focus",
      description: "OWASP Top 10 awareness and implementing secure authentication systems",
      color: "from-red-500 to-orange-600"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed, SEO, and user experience",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Coffee,
      title: "Passion",
      description: "Constantly learning new technologies and improving development skills",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const skills = [
    { name: "React.js", level: 95, icon: Code, color: "from-blue-400 to-blue-600" },
    { name: "Node.js", level: 90, icon: Server, color: "from-green-400 to-green-600" },
    { name: "MongoDB", level: 85, icon: Database, color: "from-emerald-400 to-emerald-600" },
    { name: "JavaScript", level: 95, icon: Globe, color: "from-yellow-400 to-yellow-600" },
    { name: "Express.js", level: 88, icon: Server, color: "from-gray-400 to-gray-600" },
    { name: "Git & GitHub", level: 92, icon: GitBranch, color: "from-orange-400 to-orange-600" },
    { name: "Security", level: 80, icon: Shield, color: "from-red-400 to-red-600" },
    { name: "Performance", level: 87, icon: Rocket, color: "from-purple-400 to-purple-600" }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isWheelRotating, setIsWheelRotating] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
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
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Passionate full-stack developer crafting digital experiences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left side - Text content with glass panel */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
            >
              {/* Glass Effect Panel with Mission Statement */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.02, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full opacity-80" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full opacity-60" />
                
                <blockquote className="text-xl font-medium text-foreground mb-4 italic">
                  "Every line of code tells a story. My mission is to write stories that transform businesses and delight users."
                </blockquote>
                <cite className="text-sm text-primary font-semibold">— My Development Philosophy</cite>
              </motion.div>

              <div className="prose prose-lg text-foreground/80 space-y-4">
                <motion.p 
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
                  }}
                >
                  I'm a passionate full-stack web developer with expertise in <span className="text-primary font-semibold">React.js</span>, <span className="text-primary font-semibold">Node.js</span>, <span className="text-primary font-semibold">Express</span>, and <span className="text-primary font-semibold">MongoDB</span>. My journey started with CLI and Git fundamentals, evolving into comprehensive full-stack development and deployment mastery.
                </motion.p>
                
                <motion.p 
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }
                  }}
                >
                  I specialize in creating clean, responsive, and secure web solutions. My focus extends beyond just writing code – I'm deeply interested in performance optimization, security best practices including <span className="text-accent font-semibold">OWASP Top 10</span>, and delivering exceptional user experiences.
                </motion.p>

                <motion.p 
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } }
                  }}
                >
                  From concept to deployment, I handle the entire development lifecycle, ensuring every project meets modern web standards and exceeds client expectations.
                </motion.p>
              </div>
            </motion.div>

            {/* Right side - 3D Rotating Skill Wheel */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } }
              }}
            >
              <div className="relative w-80 h-80 perspective-1000">
                {/* Central Hub */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center z-10 cursor-pointer"
                  whileHover={{ scale: 1.1, rotateZ: 180 }}
                  onClick={() => setIsWheelRotating(!isWheelRotating)}
                  animate={{ rotateZ: isWheelRotating ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isWheelRotating ? Infinity : 0, ease: "linear" }}
                >
                  <Code className="w-8 h-8 text-white" />
                </motion.div>

                {/* Skill Nodes */}
                {skills.map((skill, index) => {
                  const angle = (index * 360) / skills.length;
                  const radius = 120;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute w-16 h-16 -mt-8 -ml-8 cursor-pointer"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      initial={{ scale: 0, rotateZ: 0 }}
                      animate={{ 
                        scale: 1, 
                        rotateZ: isWheelRotating ? -360 : 0,
                        rotateY: selectedSkill === index ? 360 : 0
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.1,
                        repeat: isWheelRotating ? Infinity : 0,
                        ease: "linear"
                      }}
                      whileHover={{ scale: 1.2, z: 20 }}
                      onClick={() => setSelectedSkill(index)}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${skill.color} rounded-full shadow-xl flex items-center justify-center border-2 border-white/20 backdrop-blur-sm`}>
                        <skill.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Skill tooltip */}
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: selectedSkill === index ? 1 : 0,
                          y: selectedSkill === index ? 0 : 10
                        }}
                      >
                        <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-border text-xs font-medium">
                          {skill.name}: {skill.level}%
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Orbital rings */}
                <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-pulse" />
                <div className="absolute inset-4 border border-accent/10 rounded-full" style={{ animation: "spin 20s linear infinite reverse" }} />
                <div className="absolute inset-8 border border-primary/5 rounded-full" style={{ animation: "spin 15s linear infinite" }} />
              </div>

              {/* Selected Skill Display */}
              <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-center">
                  <h4 className="font-semibold text-lg mb-2">{skills[selectedSkill].name}</h4>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${skills[selectedSkill].color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skills[selectedSkill].level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-sm text-foreground/70 mt-1 block">{skills[selectedSkill].level}% Proficiency</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Highlights grid with 3D effects */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, staggerChildren: 0.1 } }
            }}
          >
            {highlights.map((item, index) => (
              <motion.div 
                key={item.title}
                className="relative group perspective-1000"
                variants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover-lift hover-glow group overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${item.color} rounded-2xl`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/60 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
