// GalShow.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  src: string;
  title?: string;
  description?: string;
  demo?: string;
  repo?: string;
};

type GalShowProps = {
  images?: Project[];
  initialCount?: number;
};

const sampleProjects: Project[] = [
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    title: "Project One",
    description:
      "A short description of project one. Tech used: React, Tailwind.",
    demo: "https://example.com/demo1",
    repo: "https://github.com/you/project-one",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    title: "E-Commerce Platform",
    description:
      "Responsive online shopping site with cart functionality. Tech used: React, Tailwind, Stripe.",
    demo: "https://example-ecommerce.com",
    repo: "https://github.com/you/ecommerce-platform",
  },
  {
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    title: "Task Manager App",
    description:
      "Full-stack task management tool with real-time updates. Tech used: Next.js, Supabase.",
    demo: "https://example-taskmanager.com",
    repo: "https://github.com/you/task-manager",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    title: "Portfolio Site",
    description:
      "Personal portfolio with animated sections and blog. Tech used: Gatsby, Framer Motion.",
    demo: "https://example-portfolio.com",
    repo: "https://github.com/you/portfolio-site",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.97 },
};

export default function GalShow({
  images = sampleProjects,
  initialCount = 6,
}: GalShowProps) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft" && active !== null)
        setActive((s) => (s! > 0 ? s! - 1 : s));
      if (e.key === "ArrowRight" && active !== null)
        setActive((s) => (s! < images.length - 1 ? s! + 1 : s));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  const visibleImages = showAll ? images : images.slice(0, initialCount);

  return (
    <section className="px-4 pt-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Made by Me </h3>
          {images.length > initialCount && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-4 py-2 rounded-lg text-sm border border-border bg-background hover:bg-muted transition-colors"
            >
              {showAll
                ? "Show less"
                : `Show ${images.length - initialCount} more`}
            </button>
          )}
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {visibleImages.map((item) => {
              const fullIndex = images.indexOf(item);
              return (
                <motion.div
                  key={item.src + fullIndex}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative rounded-lg overflow-hidden cursor-pointer group bg-muted"
                  onClick={() => setActive(fullIndex)}
                  whileHover={{ scale: 1.05 }} // Little scale up on whole card hover
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.img
                    src={item.src}
                    alt={item.title ?? `project-${fullIndex}`}
                    className="w-full h-36 md:h-44 object-cover rounded-lg"
                    loading="lazy"
                    whileHover={{
                      y: -4,
                      rotate: [0, -1, 1, 0],
                      boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-2 rounded bg-background/95 text-foreground text-sm font-medium"
                    >
                      View
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-base text-muted-foreground text-center space-x-2">
          <p>
            Click any project to view details. Use ← → or Esc in the lightbox.
          </p>
          <button className="italic hover:underline transition duration-150">
            <a href="/projects" className="underline font-bold">
              See More!
            </a>
          </button>
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && active >= 0 && active < images.length && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal content */}
            <motion.div
              initial={{ y: 20, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 max-w-4xl w-full bg-background/80 backdrop-blur-lg border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left: Image */}
                <div className="lg:w-2/3 w-full flex items-center justify-center bg-muted p-6 flex-shrink-0">
                  <img
                    src={images[active].src}
                    alt={images[active].title ?? `project-${active}`}
                    className="w-full max-h-[40vh] lg:max-h-[50vh] object-contain rounded-lg shadow-xl"
                    loading="lazy"
                  />
                </div>

                {/* Right: Details */}
                <div className="lg:w-1/3 w-full p-6 flex flex-col gap-6 text-foreground relative flex-1 overflow-y-auto">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 p-3 rounded-xl bg-muted hover:bg-accent text-foreground font-bold transition-colors"
                  >
                    ✕
                  </button>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      {images[active].title ?? "Untitled Project"}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {images[active].description ?? "No description provided."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {images[active].demo && (
                      <a
                        href={images[active].demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-accent text-foreground text-sm font-medium transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {images[active].repo && (
                      <a
                        href={images[active].repo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-accent text-foreground text-sm font-medium transition-colors"
                      >
                        Repository
                      </a>
                    )}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          images[active].demo ??
                            images[active].repo ??
                            images[active].src,
                        )
                      }
                      className="px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-accent text-foreground text-sm font-medium transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation - Full width at bottom */}
              <div className="px-6 py-4 border-t border-border bg-background/50 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {active + 1} / {images.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActive((s) => (s! > 0 ? s! - 1 : s))}
                    className="px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-accent text-foreground transition-colors"
                  >
                    ‹ Prev
                  </button>
                  <button
                    onClick={() =>
                      setActive((s) => (s! < images.length - 1 ? s! + 1 : s))
                    }
                    className="px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-accent text-foreground transition-colors"
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
