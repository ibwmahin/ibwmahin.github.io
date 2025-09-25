import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Main App Component
 *
 * Root component that sets up routing, theme management, and global providers.
 * Includes navigation, theme switching, and animated page transitions.
 * Also initializes Lenis for smooth, juicy scrolling.
 */
function App() {
  useEffect(() => {
    // initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // higher -> smoother/floatier feel
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
      normalizeWheel: true,
      wheelMultiplier: 1.0,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
