import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
};

type TestimonialsSectionProps = {
  testimonials?: Testimonial[];
  // pixels per second for autoplay
  speed?: number;
};

const sampleTestimonials: Testimonial[] = [
  {
    quote:
      "Mahin’s WordPress skills shine with fast, reliable, and clean work—delivered without hesitation, for the best experience.",
    author: "Abdul Hakim",
    role: "Founder & CEO",
  },
  {
    quote:
      "Mahin's React expertise turned our vision into a fast, delightful product. They shipped clean code and polished animations.",
    author: "Sofia Rahman",
    role: "Product Manager",
  },
  {
    quote:
      "A joy to work with — thoughtful UI, excellent engineering and a real eye for detail. Highly recommended.",
    author: "Arif Khan",
    role: "Founder",
  },
  {
    quote:
      "Delivered on time and exceeded expectations. Their components are reusable and beautifully designed.",
    author: "Nadia Ahmed",
    role: "CTO",
  },
];

export default function TestimonialsSection({
  testimonials = sampleTestimonials,
  speed = 60, // px per second
}: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // duplicate list so we can create a seamless loop
  const items = testimonials.length ? [...testimonials, ...testimonials] : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || testimonials.length === 0) return;

    // set initial scroll position to start of first copy
    if (container.scrollLeft === 0) {
      container.scrollLeft = 0;
    }

    function step(ts: number) {
      if (!container) return;
      if (isPaused || isDragging) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const last = lastTsRef.current ?? ts;
      const delta = ts - last;
      // distance to move (px) this frame
      const distance = (speed * delta) / 1000;
      container.scrollLeft += distance;

      // If we've scrolled past half (one copy) reset back by half to create loop
      const half = container.scrollWidth / 2;
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      }

      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, isPaused, isDragging, testimonials]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Words That Matter</h3>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden w-full cursor-grab"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        // drag behaviour
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
      >
        <div
          className="flex gap-6 select-none"
          style={{ width: "max-content" }}
        >
          {items.map((t, idx) => (
            <motion.article
              key={`${t.author ?? "person"}-${idx}`}
              className="min-w-[320px] max-w-sm p-6 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-sm"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              aria-label={`Testimonial from ${t.author}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={`${t.author} avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={faQuoteLeft} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 leading-6">
                    "{t.quote}"
                  </p>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="font-medium">{t.author}</div>
                    {t.role && <div className="text-xs">{t.role}</div>}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
