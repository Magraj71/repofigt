'use client';

import { useMemo, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

export default function FloatingDecorations() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { decorX, decorY } = useParallax();

  /* Detect small screens */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Decoration set */
  const items = useMemo(() => {
    const base = [
      // Top band
      { symbol: '⭐', top: '6%',  left: '4%',  size: 'text-lg sm:text-xl',      delay: '0s',   duration: 7,   drift: 18, depth: 1.0, rotate: -8 },
      { symbol: '✨', top: '10%', right: '6%', size: 'text-xl sm:text-2xl',     delay: '0.6s', duration: 6.5, drift: 22, depth: 1.2, rotate: 12 },
      { symbol: '💜', top: '18%', left: '7%',  size: 'text-base sm:text-lg',   delay: '1.2s', duration: 8,   drift: 16, depth: 0.9, rotate: -12 },

      // Mid band
      { symbol: '🌸', top: '38%', right: '4%', size: 'text-lg sm:text-xl',      delay: '0.3s', duration: 7.5, drift: 20, depth: 1.1, rotate: 6 },
      { symbol: '♡',  top: '52%', left: '5%',  size: 'text-xl sm:text-2xl',     delay: '1.5s', duration: 6.2, drift: 24, depth: 1.3, rotate: -6 },
      { symbol: '🎀', top: '62%', right: '8%', size: 'text-base sm:text-xl',   delay: '2.1s', duration: 8.5, drift: 18, depth: 0.8, rotate: 10 },

      // Bottom band
      { symbol: '✨', top: '78%', left: '10%', size: 'text-lg sm:text-xl',      delay: '2.7s', duration: 5.8, drift: 20, depth: 1.0, rotate: -10 },
      { symbol: '⭐', top: '88%', right: '12%', size: 'text-base sm:text-lg',  delay: '1.0s', duration: 6.8, drift: 16, depth: 1.15, rotate: 8 },
    ];

    if (isMobile) {
      return base.filter((_, i) => i % 2 === 0);
    }
    return base;
  }, [isMobile]);

  const driftStyle = useMemo(() => (drift, depth, rotate) => ({
    '--drift': `${drift}px`,
    '--drift-soft': `${drift * 0.55}px`,
    '--depth': depth,
    '--rot': `${rotate}deg`,
  }), []);

  return (
    <motion.div
      style={prefersReducedMotion ? {} : { x: decorX, y: decorY }}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <div
          key={`${item.symbol}-${index}`}
          className={`absolute ${item.size} will-change-transform`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            opacity: prefersReducedMotion ? 0.5 : 0.55 + item.depth * 0.15,
            filter: `blur(${Math.max(0, (1.3 - item.depth) * 1.6)}px) drop-shadow(0 2px 6px rgba(139, 92, 246, 0.15))`,
            animation: prefersReducedMotion
              ? 'none'
              : `floatOrganic ${item.duration}s ease-in-out ${item.delay} infinite`,
            ...driftStyle(item.drift, item.depth, item.rotate),
          }}
        >
          {item.symbol}
        </div>
      ))}

      <style jsx>{`
        @keyframes floatOrganic {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate3d(calc(var(--drift) * 0.6), calc(var(--drift-soft) * -0.8), 0)
              rotate(calc(var(--rot) * 0.7)) scale(1.06);
          }
          50% {
            transform: translate3d(calc(var(--drift) * -0.4), calc(var(--drift-soft) * -1), 0)
              rotate(calc(var(--rot) * -1)) scale(0.96);
          }
          75% {
            transform: translate3d(calc(var(--drift) * -0.7), calc(var(--drift-soft) * 0.6), 0)
              rotate(calc(var(--rot) * 0.5)) scale(1.03);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </motion.div>
  );
}