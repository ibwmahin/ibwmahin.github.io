import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  aboutText?: string;
  stats?: Stat[];
  videoUrl?: string; // full youtube url or id
  imgSrc?: string;
}

const getYouTubeEmbed = (u?: string) => {
  if (!u) return "";
  if (!/^https?:\/\//i.test(u))
    return `https://www.youtube.com/embed/${u}?autoplay=1`;
  try {
    const url = new URL(u);
    const v = url.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
  } catch {
    return "";
  }
  return u;
};

const About = ({
  aboutText = `Turning ideas into stunning digital experiences that help businesses grow.
Whether you need a landing page, a complete redesign, or marketing videos to boost engagement, I combine technical skill with creativity to make it happen — fast.
`,

  stats = [
    {
      value: "+32",
      label: "More Then just Coding, it's about the Dream You have.",
    },
    {
      value: "+28",
      label:
        "My step-by-step to simplify your Excellent Project. Our step-by-step to simplify",
    },
  ],
  videoUrl = "https://youtu.be/C1wHOQU5a3o?si=9guwywLQlcVrbAb9",
  imgSrc = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop",
}: AboutProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const embed = getYouTubeEmbed(videoUrl);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      },
      { threshold: 0.18 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="about" ref={ref} className="section-padding animate-fade-up">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: badge, heading, large video image */}
          <div className="space-y-6">
            <div className="flex justify-start items-start">
              <span className="flex items-center  space-x-6 px-4 py-2 border-2 border-[hsl(var(--dark))] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300">
                About Me
              </span>
            </div>

            <h2 className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold max-w-lg">
              Code builds it, design defines it—and for me, both are pure
              passion.
            </h2>

            <div className="relative max-w-4xl">
              <button
                onClick={() => setOpen(true)}
                aria-label="Play video"
                className="group w-full overflow-hidden aspect-[5/3] focus:outline-none    border-2 border-[hsl(var(--dark))] text-sm font-bold uppercase  hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] hover:animate-glitch transition-all duration-300"
                type="button"
              >
                <img
                  src={imgSrc}
                  alt="Design preview — click to play"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />

                {/* Play overlay circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="pointer-events-none w-10 h-10 md:w-14 md:h-14 bg-white/95 flex items-center justify-center shadow-lg transform transition-all group-hover:scale-105 border-2 border-[hsl(var(--dark))] ">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7-11-7z" fill="black" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT: small micro-copy and stacked stats */}
          <div className="flex flex-col items-end justify-start space-y-8 pt-6 lg:pt-20">
            <div className="text-right text-sm text-gray-500 max-w-xs">
              {aboutText}
            </div>

            <div className="w-full max-w-xs">
              <div className="flex flex-col items-end gap-10">
                {stats.map((s, i) => (
                  <div key={`${s.value}-${i}`} className="text-right">
                    <div className="text-[clamp(2.5rem,7vw,3.75rem)] font-extrabold leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-500 leading-relaxed max-w-[22rem]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 rounded-full bg-white p-2 shadow"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <iframe
              title="About video"
              src={embed}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
