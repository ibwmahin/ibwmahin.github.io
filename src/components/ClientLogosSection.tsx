import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type ClientLogo = {
  name: string;
  src: string;
  url?: string;
};

type ClientLogosSectionProps = {
  logos?: ClientLogo[];
  // px per second
  speed?: number;
};

const sampleLogos: ClientLogo[] = [
  {
    name: "DigitalPathways.ai",
    src: "https://via.placeholder.com/160x40/4F46E5/FFFFFF?text=DigitalPathways.ai",
    url: "https://digitalpathways.ai",
  },
  {
    name: "Dataxpie",
    src: "https://via.placeholder.com/140x40/059669/FFFFFF?text=Dataxpie",
    url: "https://dataxpie.com",
  },
  {
    name: "Netlify",
    src: "https://via.placeholder.com/120x40/00C7B7/FFFFFF?text=Netlify",
  },
  {
    name: "GitHub",
    src: "https://via.placeholder.com/120x40/181717/FFFFFF?text=GitHub",
  },
  {
    name: "Vercel",
    src: "https://via.placeholder.com/120x40/000000/FFFFFF?text=Vercel",
  },
];

const ClientLogosSection: React.FC<ClientLogosSectionProps> = ({
  logos = sampleLogos,
  speed = 40,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // pointer drag helpers
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const items = logos.length ? [...logos, ...logos] : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || logos.length === 0) return;

    // ensure there's no weird fractional scroll on mount
    if (container.scrollLeft === 0) container.scrollLeft = 0;

    function step(ts: number) {
      if (!container) return;
      if (isPaused || isDragging) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const last = lastTsRef.current ?? ts;
      const delta = ts - last;
      const distance = (speed * delta) / 1000; // px to move this frame
      container.scrollLeft += distance;

      const half = container.scrollWidth / 2; // because we duplicated
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      }

      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [speed, isPaused, isDragging, logos]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  // pointer drag handlers (so users can swipe/drag the marquee)
  const onPointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isPointerDownRef.current = true;
    container.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startScrollRef.current = container.scrollLeft;
    setIsDragging(true);
    setIsPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !isPointerDownRef.current) return;
    const dx = e.clientX - startXRef.current;
    // reverse direction so dragging left moves content right like a normal scroll
    container.scrollLeft = startScrollRef.current - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isPointerDownRef.current = false;
    try {
      container.releasePointerCapture(e.pointerId);
    } catch (err) {
      // ignore if pointer not captured
    }
    setIsDragging(false);
    setIsPaused(false);
  };

  if (logos.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-semibold">Trusted by</h3>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden w-full touch-pan-x cursor-grab"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="region"
          aria-label="Client logos carousel — auto scrolling"
        >
          <div
            className="flex items-center gap-8 select-none"
            style={{ width: "max-content" }}
          >
            {items.map((logo, idx) => {
              const key = `${logo.name}-${idx}`;
              const img = (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-10 w-auto opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
                />
              );

              return (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.03, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex-shrink-0"
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${logo.name} in a new tab`}
                    >
                      {img}
                    </a>
                  ) : (
                    <div>{img}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
