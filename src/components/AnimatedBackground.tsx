import { useEffect, useRef, RefObject, memo, useState } from "react";

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  particleCount?: number; // 8..80
  maxRadius?: number; // px
  verticalDrift?: number; // px per second
  tint?: string; // CSS color for glows (e.g. "90,160,220" or "255,200,180")
};

type Particle = {
  x: number;
  y: number;
  baseY: number;
  radius: number;
  driftPhase: number;
  speed: number;
  slowVX: number;
  slowVY: number;
  alpha: number;
};

const DEFAULTS = {
  particleCount: 22,
  maxRadius: 46,
  verticalDrift: 6,
  tint: "90,160,220", // green-ish; use "200,160,120" for warm
} as const;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default memo(function MinimalCalmBackground({
  containerRef,
  particleCount = DEFAULTS.particleCount,
  maxRadius = DEFAULTS.maxRadius,
  verticalDrift = DEFAULTS.verticalDrift,
  tint = DEFAULTS.tint,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const dimsRef = useRef({ w: 0, h: 0, px: 1 });
  const bgGradRef = useRef<CanvasGradient | null>(null);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Clamp DPR for smoother perf on low-end devices
  const getDPR = () => Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));

  // Setup canvas and gradients (run on resize)
  const setup = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return false;

    const rect = container.getBoundingClientRect();
    const px = getDPR();
    canvas.width = Math.round(rect.width * px);
    canvas.height = Math.round(rect.height * px);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.setTransform(px, 0, 0, px, 0, 0);

    dimsRef.current = { w: rect.width, h: rect.height, px };

    // soft vertical gradient once per resize
    bgGradRef.current = ctx.createLinearGradient(0, 0, 0, rect.height);
    bgGradRef.current.addColorStop(0, "rgba(6,8,12,0.7)");
    bgGradRef.current.addColorStop(1, "rgba(12,14,18,0.85)");

    return true;
  };

  // Initialize calm particles
  const initParticles = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const count = clamp(Math.floor(particleCount), 6, 80);
    const arr: Particle[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.pow(Math.random(), 1.6) * (maxRadius - 8); // bias to smaller
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      arr[i] = {
        x,
        y,
        baseY: y,
        radius,
        driftPhase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.6, // slower speeds
        slowVX: (Math.random() - 0.5) * 0.12,
        slowVY: (Math.random() - 0.5) * 0.08,
        alpha: 0.06 + Math.random() * 0.18,
      };
    }
    particlesRef.current = arr;
  };

  const drawStaticBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h, px } = dimsRef.current;
    if (bgGradRef.current) {
      ctx.setTransform(px, 0, 0, px, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bgGradRef.current;
      ctx.fillRect(0, 0, w, h);
    }
  };

  // gentle pointer parallax — optional and subtle
  const pointer = useRef({ x: 0, y: 0, active: false });
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.current.x = (e.clientX - r.left) / r.width; // 0..1
      pointer.current.y = (e.clientY - r.top) / r.height;
      pointer.current.active = true;
    };
    const onLeave = () => (pointer.current.active = false);

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave);
    container.addEventListener("pointercancel", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointercancel", onLeave);
    };
  }, [containerRef, isDesktop]);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let last = performance.now();
    let lastResize = 0;
    const onResize = () => {
      const now = performance.now();
      if (now - lastResize < 80) return;
      lastResize = now;
      if (setup()) {
        if (isDesktop) {
          initParticles();
        } else {
          drawStaticBackground();
        }
      }
    };
    window.addEventListener("resize", onResize);

    setup();
    if (isDesktop) {
      initParticles();
    } else {
      drawStaticBackground();
    }

    const step = (t: number) => {
      const dt = Math.max(0.001, (t - last) / 1000);
      last = t;
      const { w, h } = dimsRef.current;

      // Background
      ctx.clearRect(0, 0, w, h);
      if (bgGradRef.current) {
        ctx.fillStyle = bgGradRef.current;
        ctx.fillRect(0, 0, w, h);
      }

      // subtle overlay texture (very faint)
      // draw only 1-2 pixels to avoid noise; keep minimal
      if (Math.random() < 0.01) {
        ctx.fillStyle = "rgba(255,255,255,0.002)";
        ctx.fillRect(0, Math.random() * h, w, 1);
      }

      const particles = particlesRef.current;
      // parallax factor from pointer (tiny)
      const parx = pointer.current.active ? (pointer.current.x - 0.5) * 6 : 0;
      const pary = pointer.current.active ? (pointer.current.y - 0.5) * 4 : 0;

      // draw particles (soft orbs)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // vertical gentle breathing using sin + small drift
        p.driftPhase += dt * 0.6 * p.speed;
        const drift = Math.sin(p.driftPhase) * (verticalDrift * 0.5);

        // slow wandering velocity
        p.x += p.slowVX * dt * 60;
        p.y += p.slowVY * dt * 60;

        // slight easing towards baseY + drift
        const targetY = p.baseY + drift;
        p.y += (targetY - p.y) * 0.02 * p.speed;

        // wrap edges softly to keep density consistent
        if (p.x < -p.radius) p.x = w + p.radius;
        if (p.x > w + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = h + p.radius;
        if (p.y > h + p.radius) p.y = -p.radius;

        // draw glow: use shadowBlur + single arc fill (cheap & calm)
        const glow = p.radius * 1.8;
        ctx.save();
        // subtle additive blend
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.shadowBlur = glow;
        ctx.shadowColor = `rgba(${tint},${(p.alpha * 0.65).toFixed(3)})`;
        ctx.fillStyle = `rgba(${tint},${(p.alpha * 0.5).toFixed(3)})`;

        // apply tiny parallax offset depending on particle index for depth
        const depthOffsetX = parx * (0.02 + (i % 5) * 0.006);
        const depthOffsetY = pary * (0.02 + (i % 7) * 0.004);

        ctx.arc(
          p.x + depthOffsetX,
          p.y + depthOffsetY,
          Math.max(2, p.radius * 0.28),
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    if (isDesktop) {
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef, particleCount, maxRadius, verticalDrift, tint, isDesktop]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
});
