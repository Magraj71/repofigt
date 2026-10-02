'use client';

import { useEffect, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const PALETTE = [
  '#a855f7', // purple
  '#c084fc', // lavender
  '#ec4899', // pink
  '#f472b6', // rose
  '#eab308', // warm yellow
  '#fef08a', // light yellow
  '#3b82f6', // soft blue
  '#60a5fa', // sky
  '#10b981', // mint
  '#34d399', // emerald
  '#f97316', // peach
  '#fb923c', // orange
];

/* Duration window (ms) that the effect runs */
const LIFETIME_MS = 4500;

export default function Confetti({ active = true, onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [pieces, setPieces] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------------- Detect small screens ---------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  /* ---------------- Generate particles ---------------- */
  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    // Respect reduced-motion: fewer, slower, opaque particles instead of a storm
    const count = prefersReducedMotion ? 24 : isMobile ? 55 : 100;
    const shapes = ['rect', 'circle', 'ribbon', 'star', 'square'];

    const build = () =>
      Array.from({ length: count }).map((_, i) => {
        // Depth tiers: far (0) → near (2). Drives size, blur, opacity, and speed.
        const depth = Math.random() < 0.4 ? 2 : Math.random() < 0.6 ? 1 : 0;

        const baseSize = depth === 2 ? 10 : depth === 1 ? 8 : 6;
        const size = baseSize + Math.random() * (depth === 2 ? 10 : depth === 1 ? 6 : 4);

        const duration = (depth === 2 ? 2.4 : depth === 1 ? 3.2 : 4.2) + Math.random() * 1.2;
        const delay = Math.random() * (prefersReducedMotion ? 0.3 : 0.9);

        // Drift grows with depth — near particles swing wider
        const drift = (Math.random() - 0.5) * (depth === 2 ? 140 : depth === 1 ? 100 : 60);
        const swayAmp = 6 + Math.random() * 14;

        return {
          id: i,
          x: Math.random() * 100,
          y: -12 - Math.random() * 25,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size,
          duration,
          delay,
          rotation: Math.random() * 360,
          rotationSpeed: 360 + Math.random() * 720,
          drift,
          swayAmp,
          swayDur: 1 + Math.random() * 1.6,
          opacity: depth === 2 ? 1 : depth === 1 ? 0.85 : 0.65,
          blur: depth === 0 ? 1.2 : depth === 1 ? 0.4 : 0,
          depth,
        };
      });

    setPieces(build());

    const timer = setTimeout(() => {
      setPieces([]);
      onComplete?.();
    }, LIFETIME_MS);

    return () => clearTimeout(timer);
  }, [active, onComplete, prefersReducedMotion, isMobile]);

  /* ---------------- Don't render if nothing to show ---------------- */
  if (!pieces.length) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => {
        const isRibbon = p.shape === 'ribbon';
        const isStar = p.shape === 'star';
        const isCircle = p.shape === 'circle';

        const width = isRibbon ? `${p.size * 0.35}px` : `${p.size}px`;
        const height = isRibbon ? `${p.size * 1.6}px` : `${p.size}px`;
        const radius = isCircle ? '50%' : isRibbon ? '2px' : p.shape === 'square' ? '1px' : '3px';

        return (
          <span
            key={p.id}
            className="absolute block will-change-transform"
            style={{
              left: `${p.x}vw`,
              top: `${p.y}vh`,
              width: isStar ? `${p.size * 1.2}px` : width,
              height: isStar ? `${p.size * 1.2}px` : height,
              backgroundColor: isStar ? 'transparent' : p.color,
              color: isStar ? p.color : undefined,
              borderRadius: isStar ? '0' : radius,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              // CSS custom properties drive the keyframes
              '--drift': `${p.drift}px`,
              '--sway': `${p.swayAmp}px`,
              '--rot': `${p.rotationSpeed}deg`,
              '--rot-start': `${p.rotation}deg`,
              animation: `
                confettiFall ${p.duration}s cubic-bezier(0.22, 1, 0.36, 1) ${p.delay}s forwards,
                confettiSway ${p.swayDur}s ease-in-out ${p.delay}s infinite alternate
              `,
              transformOrigin: 'center center',
            }}
          >
            {isStar && (
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6-4.8-4.6 6.6-.9L12 2.5z" />
              </svg>
            )}
          </span>
        );
      })}

      {/* Injected keyframes — no globals.css changes required */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--rot-start, 0deg));
          }
          100% {
            transform: translate3d(var(--drift, 0px), 118vh, 0)
              rotate(calc(var(--rot-start, 0deg) + var(--rot, 720deg)));
          }
        }

        @keyframes confettiSway {
          0% {
            margin-left: calc(var(--sway, 0px) * -1);
          }
          100% {
            margin-left: var(--sway, 0px);
          }
        }
      `}</style>
    </div>
  );
}