import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import BlogPreviewSection from "../components/sections/BlogPreviewSection";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogPreviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
