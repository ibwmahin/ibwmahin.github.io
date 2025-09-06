import { useEffect, useRef, RefObject } from "react";

// Electrical-style animated background for a hero section (darker variant).
// Features:
// - small nodes (particles) that softly glow
// - connecting electric lines between close nodes
// - interactive electric "bolts" spawned toward the pointer
// - dim/professional base styling with cyan electric accents

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  particleCount?: number;
  maxParticleSize?: number;
  pointerSensitivity?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  flicker: number;
};

type Bolt = {
  points: { x: number; y: number }[];
  life: number; // decreasing to 0
  intensity: number;
};

export default function AnimatedBackground({
  containerRef,
  particleCount = 36,
  maxParticleSize = 10,
  pointerSensitivity = 0.28,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const boltsRef = useRef<Bolt[]>([]);
  const pointer = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = () => Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const px = dpr();
      canvas.width = Math.round(rect.width * px);
      canvas.height = Math.round(rect.height * px);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(px, 0, 0, px, 0, 0);
    };

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // initialize particles with tiny motion and flicker
    const rect = container.getBoundingClientRect();
    particlesRef.current = Array.from({ length: particleCount }).map(() => {
      const base = Math.random() * (maxParticleSize - 2) + 2;
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: base,
        baseSize: base,
        flicker: Math.random() * Math.PI * 2,
      };
    });

    // pointer handlers
    const handlePointer = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.current.x = e.clientX - r.left;
      pointer.current.y = e.clientY - r.top;
      pointer.current.active = true;

      // Spawn a bolt toward a nearby node occasionally for immediate feedback
      if (Math.random() < 0.25) {
        spawnBolt(pointer.current.x, pointer.current.y);
      }
    };
    const handleLeave = () => (pointer.current.active = false);

    container.addEventListener("pointermove", handlePointer);
    container.addEventListener("pointerleave", handleLeave);
    container.addEventListener("pointercancel", handleLeave);

    // bolt generator: create jagged segmented bolt from pointer to a chosen particle
    const spawnBolt = (sx: number, sy: number) => {
      const particles = particlesRef.current;
      if (!particles.length) return;
      // choose nearest particle within a radius, fallback to random
      let target = particles[Math.floor(Math.random() * particles.length)];
      let minD = Infinity;
      for (const p of particles) {
        const dx = p.x - sx;
        const dy = p.y - sy;
        const d = dx * dx + dy * dy;
        if (d < minD) {
          minD = d;
          target = p;
        }
      }

      const tx = target.x;
      const ty = target.y;

      const segments = Math.max(3, Math.floor(Math.random() * 6) + 3);
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        // linear interpolation
        let x = sx + (tx - sx) * t;
        let y = sy + (ty - sy) * t;
        // add jagged offset perpendicular to the line
        const offset = (Math.random() - 0.5) * 18 * (1 - Math.abs(0.5 - t) * 2);
        const nx = tx - sx;
        const ny = ty - sy;
        const len = Math.sqrt(nx * nx + ny * ny) || 1;
        // perpendicular
        const px = -ny / len;
        const py = nx / len;
        x += px * offset;
        y += py * offset;
        points.push({ x, y });
      }

      boltsRef.current.push({
        points,
        life: 1.0,
        intensity: 1 + Math.random() * 0.8,
      });
      // cap bolts to avoid perf hit
      if (boltsRef.current.length > 10) boltsRef.current.shift();
    };

    // main animation step
    const step = () => {
      const particles = particlesRef.current;
      const bolts = boltsRef.current;
      const w = canvas.width / dpr();
      const h = canvas.height / dpr();

      // paint base darker background
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      // darker stops
      bg.addColorStop(0, "#000202");
      bg.addColorStop(1, "#03040a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // stronger vignette to darken edges further
      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.12,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.95,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // update & draw links between close particles (darker, thinner)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < Math.min(w, h) * 0.18) {
            const alpha = 1 - dist / (Math.min(w, h) * 0.18);
            // darker, more subtle cyan line
            ctx.beginPath();
            ctx.strokeStyle = `rgba(60,180,200,${(alpha * 0.08).toFixed(3)})`;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw bolts (electric arcs)
      for (let k = bolts.length - 1; k >= 0; k--) {
        const bolt = bolts[k];
        bolt.life -= 0.02 * (1 + Math.random() * 0.6);
        if (bolt.life <= 0) {
          bolts.splice(k, 1);
          continue;
        }

        const fall = Math.pow(bolt.life, 1.6);
        // white core (slightly dimmer)
        ctx.lineWidth = 1.8 * bolt.intensity * (0.5 + fall * 0.5);
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const p = bolt.points[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${(0.7 * fall).toFixed(2)})`;
        ctx.shadowBlur = 10 * bolt.intensity * (0.5 + fall * 0.4);
        ctx.shadowColor = `rgba(90,200,255,${(0.55 * fall).toFixed(2)})`;
        ctx.stroke();

        // cyan outer glow (more subtle)
        ctx.lineWidth = 3.0 * bolt.intensity * (0.5 + fall * 0.5);
        ctx.beginPath();
        for (let i = 0; i < bolt.points.length; i++) {
          const p = bolt.points[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(70,220,255,${(0.1 * fall).toFixed(3)})`;
        ctx.shadowBlur = 18 * bolt.intensity * (0.5 + fall * 0.4);
        ctx.shadowColor = `rgba(70,220,255,${(0.45 * fall).toFixed(2)})`;
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // update particles and draw glows
      for (const p of particles) {
        // slight flicker and breathing
        p.flicker += 0.06 + Math.random() * 0.02;
        const flick = 0.85 + Math.sin(p.flicker) * 0.12;

        // pointer interaction: attract or repel depending on distance
        if (pointer.current.active) {
          const dx = p.x - pointer.current.x;
          const dy = p.y - pointer.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const radius = Math.min(w, h) * 0.28;
          if (dist < radius) {
            const force = (1 - dist / radius) * pointerSensitivity;
            // electrical effect: quick nudge towards pointer (like charge shifting)
            p.vx += (dx / dist) * -force * 0.08;
            p.vy += (dy / dist) * -force * 0.08;
            // occasionally spawn a bolt between pointer and node
            if (Math.random() < 0.015) {
              boltsRef.current.push({
                points: [
                  {
                    x: pointer.current.x + (Math.random() - 0.5) * 6,
                    y: pointer.current.y + (Math.random() - 0.5) * 6,
                  },
                  { x: p.x, y: p.y },
                ],
                life: 0.9 + Math.random() * 0.4,
                intensity: 0.9 + Math.random() * 0.8,
              });
              if (boltsRef.current.length > 12) boltsRef.current.shift();
            }
            p.size = Math.min(
              p.baseSize * (1 + force * 0.9),
              maxParticleSize * 1.2,
            );
          } else {
            p.size += (p.baseSize - p.size) * 0.06;
          }
        } else {
          p.size += (p.baseSize - p.size) * 0.06;
        }

        p.x += p.vx;
        p.y += p.vy;

        // gentle damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        // wrap
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        // draw glow (tight core + softer halo)
        const r = Math.max(0.6, p.size * flick);

        // outer soft halo (dimmer)
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        halo.addColorStop(0, `rgba(40,140,170,${(0.07 * flick).toFixed(3)})`);
        halo.addColorStop(0.3, `rgba(40,140,170,${(0.03 * flick).toFixed(3)})`);
        halo.addColorStop(1, "rgba(40,140,170,0)");
        ctx.beginPath();
        ctx.fillStyle = halo;
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // tight bright core (slightly dimmer)
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,235,245,${(0.7 * flick).toFixed(2)})`;
        ctx.arc(p.x, p.y, Math.max(0.6, r * 0.32), 0, Math.PI * 2);
        ctx.fill();
      }

      // occasional faint scan lines for texture (very subtle)
      if (Math.random() < 0.02) {
        ctx.fillStyle = "rgba(255,255,255,0.0025)";
        ctx.fillRect(0, Math.random() * h, w, 1);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", handlePointer);
      container.removeEventListener("pointerleave", handleLeave);
      container.removeEventListener("pointercancel", handleLeave);
    };
  }, [containerRef, particleCount, maxParticleSize, pointerSensitivity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
}
