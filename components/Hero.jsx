"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const Hero = () => {
  const containerRef = useRef(null);
  const shapeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      gsap.registerPlugin(ScrollTrigger, TextPlugin);
    } catch (e) {
      // safe fallback if a plugin isn't available
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (shapeRef.current) {
        gsap.set(shapeRef.current, { scale: 0, rotation: -45 });
        tl.to(shapeRef.current, {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });

        if (ScrollTrigger) {
          gsap.to(shapeRef.current, {
            y: -30,
            rotation: 5,
            scrollTrigger: {
              trigger: shapeRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          }
        );

        gsap.to(imageRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
        );
      }

      if (titleRef.current) {
        const titleEl = titleRef.current;
        const rawText = titleEl.textContent || "";
        titleEl.innerHTML = rawText
          .split("")
          .map((c) =>
            c === " "
              ? `<span class="char">&nbsp;</span>`
              : `<span class="char">${c}</span>`
          )
          .join("");

        const chars = titleEl.querySelectorAll(".char");
        if (chars.length) {
          gsap.fromTo(
            chars,
            { opacity: 0, y: 100, rotationX: -90 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.05,
              delay: 0.8,
              ease: "back.out(1.7)",
            }
          );
        }
      }

      if (skillsRef.current) {
        const skillChildren = Array.from(skillsRef.current.children || []);
        if (skillChildren.length) {
          gsap.fromTo(
            skillChildren,
            { opacity: 0, y: 50, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              delay: 1.2,
              ease: "power3.out",
            }
          );
        }
      }
    }, containerRef);

    return () => {
      try {
        ctx.revert();
      } catch (e) {}
      try {
        if (ScrollTrigger && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        }
      } catch (e) {}
    };
  }, []);

  const skills = [
    {
      number: "01",
      title: "UX / UI Design",
      description:
        "User-first interfaces, prototyping, and design systems — Figma, user testing and accessibility-focused design.",
    },
    {
      number: "02",
      title: "Video Editing",
      description:
        "Short-form and promo videos, motion cuts and color grading — Premiere Pro & After Effects workflows.",
    },
    {
      number: "03",
      title: "Web Development",
      description:
        "Modern front-end development with Next.js, React and Tailwind — performance, SEO and responsive-first builds.",
    },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative overflow-hidden"
      data-text="01"
    >
      <div className="absolute top-10 sm:top-16 md:top-20 right-5 sm:right-8 md:right-10 w-16 sm:w-24 md:w-32 lg:w-36 xl:w-40 2xl:w-44 h-16 sm:h-24 md:h-32 lg:h-36 xl:h-40 2xl:h-44 bg-teal-100 rounded-full opacity-20 parallax-bg" />
      <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-5 sm:left-8 md:left-10 w-12 sm:w-18 md:w-24 lg:w-28 xl:w-32 2xl:w-36 h-12 sm:h-18 md:h-24 lg:h-28 xl:h-32 2xl:h-36 bg-amber-100 rounded-full opacity-30 parallax-bg" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center">
        <div className="text-center order-1 lg:order-1 fade-in">
          <div className="relative inline-block">
            <div
              ref={shapeRef}
              className="absolute inset-0 bg-amber-400 transform scale-125 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px]"
              style={{
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                top: "-40px",
                left: "-40px",
              }}
            />
            <img
              ref={imageRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2002.18.11_f8dd750c-Photoroom-TZmcTlozNQCAxnGaJDjLEzI6XUe7kH.png"
              alt="Mahin"
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 rounded-full object-cover object-center mx-auto"
            />
          </div>
        </div>

        <div className="my-4 pt-4 sm:my-6 sm:pt-6 md:my-8 md:pt-8 lg:my-20 lg:pt-20 xl:my-24 xl:pt-24 2xl:my-28 2xl:pt-28 order-2 lg:order-2 text-center lg:text-left">
          <span
            ref={subtitleRef}
            className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-medium tracking-wider uppercase"
          >
            AI-powered Creative Web Developer
          </span>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-gray-900 leading-none mb-4 sm:mb-6 md:mb-8"
          >
            Mahin
          </h1>

          {/* Short bio (3 years experience) */}
          <p className="mt-4 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg text-gray-700 max-w-2xl">
            I’m an AI-powered creative web developer with{" "}
            <strong>3 years of experience</strong> crafting user-focused
            websites, polished UI/UX and compelling videos. I combine modern
            front-end development (Next.js, React, Tailwind) with UX design and
            video editing to deliver end-to-end digital experiences that perform
            and delight.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-gray-600">
            Specialties: UX/UI Design · Video Editing · Web Development ·
            AI-assisted workflows
          </p>
        </div>
      </div>

      <div
        ref={skillsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28"
      >
        {skills.map((skill) => (
          <div
            key={skill.title}
            className="icon-box group cursor-pointer p-4 sm:p-5 md:p-6 lg:p-4 xl:p-6 2xl:p-8 bg-white shadow-sm rounded"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -10,
                scale: 1.03,
                duration: 0.28,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                scale: 1,
                duration: 0.28,
                ease: "power2.out",
              });
            }}
          >
            <span className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg text-gray-400 font-medium">
              {skill.number}
            </span>
            <h3 className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-amber-600 transition-colors">
              {skill.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg text-gray-600 leading-relaxed">
              {skill.description}
            </p>
          </div>
        ))}

        <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 2xl:col-span-1 flex justify-center lg:justify-start">
          <a
            href="#contact"
            className="
            flex justify-center items-center rounded-lg 
            magnetic bg-gray-900 hover:bg-gray-800 text-white
            text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 
            2xl:text-lg font-medium tracking-wider uppercase py-3
            px-6 sm:py-4 sm:px-8 md:py-4 md:px-8 lg:py-4 lg:px-8
            xl:py-5 xl:px-10 2xl:py-6 2xl:px-12 transition-all 
            duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
