import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  title: string;
  company?: string;
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
      variant: "highlight",
    },
  ],
}: TimelineProps) => {
  const timelineRef = useRef<HTMLElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      },
      { threshold: 0.18 },
    );

    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experiences"
      ref={timelineRef}
      className="section-padding animate-fade-up bg-black text-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-md border-2 border-sky-500 bg-black/40 text-sky-400 font-medium">
                Experience
              </span>
            </div>

            <h2 className="text-[clamp(1.6rem,3.6vw,2.2rem)] leading-tight font-semibold max-w-lg text-white">
              A snapshot of my journey in building digital growth
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Highlighting years of transforming ideas into successful online
              solutions.
            </p>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-3 relative">
            {/* vertical connector line */}
            <div className="hidden lg:block absolute left-6 top-6 bottom-6 w-[2px] bg-white/6 rounded-full" />

            <div className="space-y-8 relative">
              {items.map((item, index) => {
                const isActive =
                  hoveredIndex === index ||
                  (hoveredIndex === null && item.variant === "highlight");

                return (
                  <article
                    key={`${item.title}-${item.years}-${index}`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative grid grid-cols-4 gap-6 py-6 px-4 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-2xl
                      ${isActive ? "bg-sky-500 text-black shadow-xl scale-[1.02] border-transparent" : "bg-black text-white border border-white/6 hover:shadow-md hover:scale-105"}`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* dot (aligned to vertical line on lg) */}
                    <div className="absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 z-10">
                      <span
                        className={`inline-block w-4 h-4 rounded-full transition-all duration-300 ${isActive ? "bg-sky-500 ring-4 ring-sky-200/20 scale-125" : "bg-white/40 scale-100"}`}
                        aria-hidden
                      />
                    </div>

                    {/* Content */}
                    <div className="col-span-3 pl-6 space-y-2">
                      <h3
                        className={`font-bold text-lg tracking-tight ${isActive ? "text-black" : "text-white"}`}
                      >
                        {item.title}
                      </h3>
                      {item.company && (
                        <div
                          className={`text-sm font-medium ${isActive ? "text-black/80" : "text-gray-300"}`}
                        >
                          {item.company}
                        </div>
                      )}
                      <p
                        className={`text-sm leading-relaxed ${isActive ? "text-black/80" : "text-gray-400"}`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Years */}
                    <div className="text-right">
                      <span
                        className={`font-bold text-lg ${isActive ? "text-black" : "text-white"}`}
                      >
                        {item.years}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
