"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

function App() {
  useEffect(() => {
    // Enhanced fade-in animations with more dynamic effects
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="bg-white overflow-hidden">
      <Header />
      <main className="lg:ml-64 xl:ml-64 2xl:ml-64">
        <div className="container mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
