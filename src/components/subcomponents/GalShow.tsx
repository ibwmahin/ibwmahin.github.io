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
    src: "/DemoImg/digital_pathways_ai.png",
    title: "DigitalPathways",
    description:
      "A modern WordPress website designed to elevate your consulting agency’s presence.",
    demo: "https://digitalpathways.ai/",
    repo: "",
  },
  {
    src: "/DemoImg/pear-ni.png",
    title: "Pear-NI",
    description:
      "Modern Netural Inteliggents for the future earth and march eco system and evulation.",
    demo: "https://pearni.netlify.app/",
    repo: "https://github.com/ibwmahin/pearni-genesis-ui",
  },
  {
    src: "/DemoImg/dev_board.png",
    title: "Task Manager App",
    description: "Ui Dev-Board Desing with NextJs and Shad-CN.",
    demo: "https://ibw-nextdev.netlify.app/",
    repo: "https://github.com/you/task-manager",
  },
  {
    src: "/DemoImg/visqode.png",
    title: "Modern Digital Agency",
    description: "A Modern Development & consulting agency for everyone.",
    demo: "https://visqode.netlify.app/",
    repo: "https://github.com/you/portfolio-site",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.075, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.97,
    transition: { duration: 0.075, ease: "easeIn" },
  },
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
    <section className="px-4 pt-2 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Made by Me
          </h3>
          {images.length > initialCount && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-4 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-75 font-medium"
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
              const index = images.indexOf(item);
              return (
                <motion.div
                  key={item.src + index}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-75 bg-slate-50 dark:bg-slate-800"
                  onClick={() => setActive(index)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.img
                    src={item.src}
                    alt={item.title ?? `project-${index}`}
                    className="w-full h-36 md:h-44 object-cover rounded-lg"
                    loading="lazy"
                    whileHover={{ y: -4, rotate: [0, -1, 1, 0] }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-75 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                    <span className="px-3 py-2 rounded bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 text-sm font-medium">
                      View
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Click any project to view details. Use ← → or Esc in the lightbox.{" "}
          <a
            href="/projects"
            className="underline font-semibold hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-75"
          >
            See More!
          </a>
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.075 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.075 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal content */}
            <motion.div
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 max-w-4xl w-full bg-white dark:bg-slate-900 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left: Image */}
                <div className="lg:w-2/3 w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 p-6 flex-shrink-0">
                  <img
                    src={images[active].src}
                    alt={images[active].title ?? `project-${active}`}
                    className="w-full max-h-[50vh] object-contain rounded-lg shadow"
                    loading="lazy"
                  />
                </div>

                {/* Right: Details */}
                <div className="lg:w-1/3 w-full p-6 flex flex-col gap-4 overflow-y-auto relative">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-75 text-slate-700 dark:text-slate-200"
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {images[active].title ?? "Untitled Project"}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {images[active].description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    {images[active].demo ? (
                      <a
                        href={images[active].demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors duration-75"
                      >
                        Live Demo
                      </a>
                    ) : null}

                    {images[active].repo ? (
                      <a
                        href={images[active].repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors duration-75"
                      >
                        Repository
                      </a>
                    ) : null}
                  </div>

                  {/* if neither demo nor repo, show subtle external link to image source */}
                  {!images[active].demo && !images[active].repo && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      No live demo or repository available for this project.
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>
                  {active + 1} / {images.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActive((s) => (s! > 0 ? s! - 1 : s))}
                    className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-75"
                    aria-label="Previous project"
                  >
                    ‹ Prev
                  </button>
                  <button
                    onClick={() =>
                      setActive((s) => (s! < images.length - 1 ? s! + 1 : s))
                    }
                    className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-75"
                    aria-label="Next project"
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
