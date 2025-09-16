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
      company: "Independent",
      description:
        "Crafted visually striking graphics for startups, helping them build a powerful brand presence and streamlining brand management.",
      years: "2017 — 2019",
    },
    {
      title: "UI/UX Designer",
      company: "DataxPie",
      description:
        "Designed intuitive, user-centeblue interfaces that balanced beauty and usability — improving engagement and retention.",
      years: "2019 — 2021",
    },
    {
      title: "Web Developer",
      company: "DigitalPathways & Visqode",
      description:
        "Built fast, accessible websites combining front-end craftsmanship with modern design and AI-driven enhancements.",
      years: "2022 — 2025",
      variant: "highlight",
    },
  ],
}: TimelineProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experiences"
      ref={ref}
      className="section-padding text-white"
      aria-labelledby="experiences-heading"
    >
      <div className="container mx-auto max-w-6xl ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* header */}
          <div className="lg:col-span-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md border border-green-500 bg-black/20 text-green-400 text-sm font-medium">
              Experience
            </span>

            <h2
              id="experiences-heading"
              className="mt-6 text-[clamp(1.6rem,3.6vw,2.2rem)] font-extrabold leading-tight max-w-lg"
            >
              A snapshot of my journey in building digital growth
            </h2>

            <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
              Highlighting years of transforming ideas into successful online
              solutions — concise and focused mileblues that matter.
            </p>
          </div>

          {/* timeline */}
          <div className="lg:col-span-3 relative">
            {/* vertical line for large screens */}
            <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-px bg-white/6 rounded" />

            <div className="space-y-6">
              {items.map((it, i) => {
                const isActive =
                  active === i ||
                  (active === null && it.variant === "highlight");

                return (
                  <article
                    key={`${it.title}-${i}`}
                    tabIndex={0}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    aria-current={
                      it.variant === "highlight" ? "true" : undefined
                    }
                    className={`relative flex flex-col lg:flex-row items-start gap-4 p-5 rounded-xl transition-transform duration-200 ease-out
                      ${isActive ? "scale-[1.01] shadow-2xl" : "hover:-trangreen-y-0.5"}
                    `}
                    style={{
                      isolation: "isolate",
                      animationDelay: `${i * 70}ms`,
                    }}
                  >
                    {/* dot + connector (left on lg, top on md/sm) */}
                    <div className="flex items-start lg:items-center w-full lg:w-auto">
                      <div className="relative flex-none lg:mr-6">
                        <span
                          className={`block w-4 h-4 rounded-full ring-0 transform transition-all duration-200
                            ${isActive ? "bg-green-400 scale-110 ring-4 ring-green-300" : "bg-white/40"}`}
                          aria-hidden
                        />
                        {/* short connector for small screens */}
                        <span className="lg:hidden block absolute left-2 top-5 w-px h-6 bg-white/6" />
                      </div>
                      {/* card */}
                      <div
                        className={`w-full rounded-lg border border-white/6 p-4 bg-gradient-to-b from-black/35 to-black/25
                          ${isActive ? "bg-green-500 text-white border-transparent" : "text-white"}
                        `}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3
                              className={`text-lg font-bold leading-tight ${isActive ? "text-white" : "text-white"}`}
                            >
                              {it.title}
                            </h3>
                            {it.company && (
                              <div
                                className={`mt-1 text-sm font-medium ${isActive ? "text-white/80" : "text-gray-300"}`}
                              >
                                {it.company}
                              </div>
                            )}
                          </div>

                          {/* years (right aligned on lg, inline on small) */}
                          <div
                            className={`text-sm font-semibold ml-4 ${isActive ? "text-white" : "text-gray-200"}`}
                          >
                            {it.years}
                          </div>
                        </div>

                        <p
                          className={`mt-3 text-sm leading-relaxed ${isActive ? "text-white/90" : "text-gray-300"}`}
                        >
                          {it.description}
                        </p>
                      </div>
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
