import { useRef, useState, useEffect } from "react";

/**
 * Small native Intersection Observer hook (no external deps)
 * returns { ref, inView } where ref is attached to an element
 */

export function useInView({
  options,
}: { options?: IntersectionObserverInit } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      options ?? { threshold: 0.2 },
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, JSON.stringify(options ?? { threshold: 0.2 })]);

  return { ref, inView };
}
