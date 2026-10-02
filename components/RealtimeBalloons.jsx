'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BALLOON_COLORS = [
  { bg: 'from-purple-400 to-indigo-500', string: '#818cf8', highlight: '#e0e7ff' },
  { bg: 'from-pink-400 to-rose-500', string: '#fb7185', highlight: '#ffe4e6' },
  { bg: 'from-amber-300 to-yellow-500', string: '#facc15', highlight: '#fef9c3' },
  { bg: 'from-fuchsia-400 to-purple-600', string: '#c084fc', highlight: '#f5d0fe' },
  { bg: 'from-sky-300 to-blue-400', string: '#38bdf8', highlight: '#e0f2fe' },
  { bg: 'from-emerald-300 to-teal-400', string: '#2dd4bf', highlight: '#ccfbf1' },
];

export default function RealtimeBalloons() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const balloons = useMemo(() => {
    const count = isMobile ? 8 : 16;
    return Array.from({ length: count }).map((_, i) => {
      const color = BALLOON_COLORS[i % BALLOON_COLORS.length];
      const left = `${5 + Math.random() * 90}%`;
      const size = 36 + Math.random() * 26; // width in px
      const duration = 7 + Math.random() * 6; // 7-13s
      const delay = Math.random() * 8; // staggered launch
      const swayOffset = 14 + Math.random() * 22;
      const swayDuration = 2 + Math.random() * 2;

      return {
        id: i,
        color,
        left,
        size,
        duration,
        delay,
        swayOffset,
        swayDuration,
      };
    });
  }, [isMobile]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute flex flex-col items-center"
          style={{ left: b.left }}
          initial={{ y: '115vh', opacity: 0 }}
          animate={{
            y: '-25vh',
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear',
            },
            opacity: {
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              times: [0, 0.1, 0.85, 1],
              ease: 'easeInOut',
            },
          }}
        >
          {/* Balloon body with side-to-side sway */}
          <motion.div
            animate={{
              x: [-b.swayOffset, b.swayOffset, -b.swayOffset],
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: b.swayDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center"
          >
            {/* Balloon oval */}
            <div
              className={`relative rounded-full bg-gradient-to-br ${b.color.bg} shadow-md overflow-hidden`}
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
              }}
            >
              {/* Highlight sheen */}
              <div
                className="absolute top-2 left-2 rounded-full opacity-60"
                style={{
                  width: `${b.size * 0.28}px`,
                  height: `${b.size * 0.45}px`,
                  backgroundColor: b.color.highlight,
                  transform: 'rotate(-25deg)',
                }}
              />
            </div>

            {/* Balloon knot */}
            <div
              className="w-1.5 h-1.5 bg-black/20 -mt-0.5 rounded-full"
            />

            {/* Balloon string */}
            <div
              className="w-0.5 h-14 opacity-50"
              style={{ backgroundColor: b.color.string }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
