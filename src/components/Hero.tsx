import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(rotateX, springConfig);
  const y = useSpring(rotateY, springConfig);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document
        .getElementById("hero-section")
        ?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tech Pattern Layer */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            y: useTransform(() => scrollY * 0.5),
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Animated background elements with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          style={{ y: useTransform(() => scrollY * 0.3) }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ y: useTransform(() => scrollY * 0.2) }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Photo and intro */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* 3D Floating Avatar Card */}
              <motion.div
                className="relative mx-auto w-80 h-96 perspective-1000"
                style={{ rotateX: x, rotateY: y }}
              >
                {/* Glassmorphism Photo Frame */}
                <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop&crop=face"
                      alt="Abdulla Al Mahin"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Personal Message */}
                  <div className="mt-4 text-center">
                    <motion.p
                      className="text-sm text-foreground/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      "Building digital experiences that matter. From concept to
                      deployment, I craft web solutions that stand the test of
                      time."
                    </motion.p>
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse" />
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Text content */}
            <div className="text-left lg:text-left">
              {/* Name with stagger animation */}
              <motion.h1
                className="text-responsive-xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gradient">Abdulla Al Mahin</span>
              </motion.h1>

              {/* Role with delay */}
              <motion.h2
                className="text-responsive-lg font-semibold text-foreground/90 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Web Developer & Designer
              </motion.h2>

              {/* Subtitle with glass effect */}
              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                    Helping Brands Stand Out With Clean, Responsive & Secure Web
                    Solutions
                  </p>
                </div>
              </motion.div>

              {/* CTA Buttons with 3D hover effects */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-start items-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-button-gradient hover:scale-105 transition-all duration-300 glow-primary text-lg px-8 py-3 group perspective-1000"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Hire Me Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-3 group backdrop-blur-sm"
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    See My Work
                    <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator with animation */}
          <motion.div
            className="absolute -bottom-56 right-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
