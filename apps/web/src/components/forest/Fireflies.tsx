import { useEffect, useRef } from 'react';

/*
 * Canvas fireflies that drift, blink and gather around the pointer.
 * Ported from David's portfolio (components/forest/Fireflies.tsx).
 */

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  blink: number;
}

interface FirefliesProps {
  count?: number;
  /** "r, g, b" */
  color?: string;
  className?: string;
}

const MAX_SPEED = 0.45;
const POINTER_RADIUS = 170;

function createSprite(rgb: string) {
  const sprite = document.createElement('canvas');
  sprite.width = 64;
  sprite.height = 64;
  const ctx = sprite.getContext('2d');
  if (!ctx) return sprite;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, `rgba(${rgb}, 1)`);
  gradient.addColorStop(0.18, `rgba(${rgb}, 0.85)`);
  gradient.addColorStop(0.45, `rgba(${rgb}, 0.18)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return sprite;
}

/** Fills its positioned parent, and listens to the pointer over that parent. */
export function Fireflies({ count = 40, color = '217, 249, 157', className }: FirefliesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sprite = createSprite(color);
    const pointer = { x: 0, y: 0, active: false };
    let flies: Firefly[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const spawn = (): Firefly => ({
      x: Math.random() * width,
      y: height * 0.15 + Math.random() * height * 0.8,
      vx: (Math.random() - 0.5) * MAX_SPEED,
      vy: (Math.random() - 0.5) * MAX_SPEED,
      size: 10 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      blink: 0.01 + Math.random() * 0.025,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (flies.length === 0) flies = Array.from({ length: count }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      for (const fly of flies) {
        // Real fireflies idle dim and pulse briefly, hence the cubed sine.
        const glow = Math.pow((Math.sin(fly.phase) + 1) / 2, 3);
        let boost = 0;
        if (pointer.active) {
          const dist = Math.hypot(pointer.x - fly.x, pointer.y - fly.y);
          if (dist < POINTER_RADIUS) boost = 1 - dist / POINTER_RADIUS;
        }
        ctx.globalAlpha = Math.min(1, 0.12 + glow * 0.88 + boost * 0.5);
        const size = fly.size * (1 + boost * 0.4);
        ctx.drawImage(sprite, fly.x - size / 2, fly.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const step = () => {
      for (const fly of flies) {
        fly.phase += fly.blink;
        fly.vx += (Math.random() - 0.5) * 0.03;
        fly.vy += (Math.random() - 0.5) * 0.03;

        if (pointer.active) {
          const dx = pointer.x - fly.x;
          const dy = pointer.y - fly.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < POINTER_RADIUS) {
            // Drawn toward the cursor, but scatter if it gets too close.
            const pull = dist < 36 ? -0.06 : 0.018 * (1 - dist / POINTER_RADIUS);
            fly.vx += (dx / dist) * pull;
            fly.vy += (dy / dist) * pull;
          }
        }

        const speed = Math.hypot(fly.vx, fly.vy);
        const limit = pointer.active ? MAX_SPEED * 2 : MAX_SPEED;
        if (speed > limit) {
          fly.vx = (fly.vx / speed) * limit;
          fly.vy = (fly.vy / speed) * limit;
        }
        fly.x += fly.vx;
        fly.y += fly.vy;

        if (fly.x < -20) fly.x = width + 20;
        else if (fly.x > width + 20) fly.x = -20;
        if (fly.y < -20) fly.y = height + 20;
        else if (fly.y > height + 20) fly.y = -20;
      }
    };

    const loop = () => {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(host);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [count, color]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
