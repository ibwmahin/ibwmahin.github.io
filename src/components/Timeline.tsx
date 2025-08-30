import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  title: string;
  company: string;
  description: string;
  years: string;
  variant?: "default" | "highlight";
}

interface TimelineProps {
  items?: TimelineItem[];
}

const Timeline = ({
  items = [
    {
      title: "Freelance Graphic Designer",
      company: "",
      description:
        "Crafted visually striking graphics for startups, helping them build a powerful brand presence. Designed eye-catching visuals that boosted marketing impact and streamlined brand management.",
      years: "2017 - 2019",
    },
    {
      title: "UI/UX Designer at DataxPie",
      company: "",
      description:
        "Designed intuitive and engaging digital experiences, blending functionality with aesthetics. Focused on user-centered design to deliver seamless interfaces that elevate customer satisfaction.",
      years: "2019 - 2021",
    },
    {
      title: "Web Developer at DigitalPathways & Visqode",
      company: "",
      description:
        "Developed dynamic and visually captivating websites by merging expertise in UI/UX, graphic design, and creative video editing. Integrated innovative AI solutions to create modern, high-performing digital platforms.",
      years: "2022 - 2025",
    },
  ],
}: TimelineProps) => {
  const timelineRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.2 },
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={timelineRef} className="section-padding animate-fade-up">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="flex items-center space-x-6 px-4 py-2 border-2 border-[hsl(var(--dark))] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300">
                Experience
              </span>
            </div>

            <h2 className="text-h1 leading-tight">
              A snapshot of my journey in building digital growth
            </h2>

            <p className="text-[hsl(var(--muted))] text-sm leading-relaxed max-w-sm">
              Highlighting years of transforming ideas into successful online
              solutions.
            </p>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-3 space-y-8 relative">
            {items.map((item, index) => (
              <div
                key={`${item.title}-${item.years}`}
                className={`border-2 border-[hsl(var(--dark))]  relative grid grid-cols-4 gap-8 py-6 px-4 border-b last:border-b-0 group cursor-pointer transition-all duration-300 ease-in-out
                  hover:scale-[1.03] hover:shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)]
                  ${
                    hoveredIndex === null && item.variant === "highlight"
                      ? "bg-[hsl(var(--dark))] text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]"
                      : hoveredIndex === index
                        ? "bg-[hsl(var(--dark))] text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]"
                        : "bg-[hsl(var(--background))] shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] hover:bg-[hsl(var(--muted-light))]"
                  } `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full transition-all duration-300 group-hover:animate-pulse
                      ${
                        (hoveredIndex === null &&
                          item.variant === "highlight") ||
                        hoveredIndex === index
                          ? "bg-gradient-to-r from-white to-gray-500 scale-125"
                          : "bg-[hsl(var(--foreground))] scale-100"
                      }`}
                  ></div>
                </div>

                {/* Content - Left side */}
                <div className="col-span-3 space-y-2 pl-6">
                  <h3
                    className={`font-bold text-lg tracking-tight ${
                      (hoveredIndex === null && item.variant === "highlight") ||
                      hoveredIndex === index
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600"
                        : "text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed font-medium ${
                      (hoveredIndex === null && item.variant === "highlight") ||
                      hoveredIndex === index
                        ? "text-white/80"
                        : "text-[hsl(var(--muted))]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Years - Right aligned */}
                <div className="text-right">
                  <span
                    className={`font-bold text-lg ${
                      (hoveredIndex === null && item.variant === "highlight") ||
                      hoveredIndex === index
                        ? "text-white"
                        : "text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {item.years}
                  </span>
                </div>

                {/* Connector Line (visible on hover) */}
                <div
                  className={`absolute left-[-8px] top-0 bottom-0 w-1 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-b from-white to-gray-200 scale-y-100"
                      : "bg-transparent scale-y-0"
                  } origin-top`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
