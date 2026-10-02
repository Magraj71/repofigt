'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';
import { surpriseConfig } from '@/config/surprise';

const EASE_OUT = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    id: 1,
    badge: '🥇 Gold Medal',
    text: 'Explaining it again... and again... and again. 😭',
    bg: 'from-rose-50/90 to-pink-50/70',
    border: 'border-rose-200/80',
    glow: 'from-rose-400/40 to-pink-400/30',
    chip: 'from-rose-500 to-pink-500',
    emoji: '🔁',
  },
  {
    id: 2,
    badge: '🛡️ Bravery Ribbon',
    text: 'Surviving our endless doubts! 🙋‍♀️',
    bg: 'from-emerald-50/90 to-teal-50/70',
    border: 'border-emerald-200/80',
    glow: 'from-emerald-400/40 to-teal-400/30',
    chip: 'from-emerald-500 to-teal-500',
    emoji: '💪',
  },
  {
    id: 3,
    badge: '🕵️ Sixth Sense',
    text: "Knowing exactly who didn't do the homework. 👀",
    bg: 'from-yellow-50/90 to-amber-50/70',
    border: 'border-yellow-200/80',
    glow: 'from-yellow-400/40 to-amber-400/30',
    chip: 'from-yellow-500 to-amber-500',
    emoji: '👀',
  },
  {
    id: 4,
    badge: '🪄 Magic Wand',
    text: 'Making difficult topics sound simple.',
    bg: 'from-purple-50/90 to-fuchsia-50/70',
    border: 'border-purple-200/80',
    glow: 'from-purple-400/40 to-fuchsia-400/30',
    chip: 'from-purple-500 to-fuchsia-500',
    emoji: '✨',
  },
  {
    id: 5,
    badge: '💖 Pure Heart',
    text: 'Giving motivation when marks said otherwise.',
    bg: 'from-pink-50/90 to-rose-50/70',
    border: 'border-pink-200/80',
    glow: 'from-pink-400/40 to-rose-400/30',
    chip: 'from-pink-500 to-rose-500',
    emoji: '📈',
  },
  {
    id: 6,
    badge: '🧘 Zen Master',
    text: 'Teaching me patience... while I tested it daily! 😂',
    bg: 'from-blue-50/90 to-indigo-50/70',
    border: 'border-blue-200/80',
    glow: 'from-blue-400/40 to-indigo-400/30',
    chip: 'from-blue-500 to-indigo-500',
    emoji: '☕',
  },
];

/* Animated counter easing up to target value */
function useCountUp(target, duration = 1400, start = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}

export default function FunTeacherScreen({ onNext }) {
  const prefersReducedMotion = useReducedMotion();
  const [ratingRevealed, setRatingRevealed] = useState(false);
  const ratingRef = useRef(null);

  const score = useCountUp(10, 1400, ratingRevealed);

  useEffect(() => {
    const node = ratingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRatingRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-8 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 h-[380px] w-[380px] rounded-full bg-purple-300/30 blur-[120px]"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-pink-300/25 blur-[110px]"
        />
        <div className="absolute top-1/2 -left-24 h-[280px] w-[280px] rounded-full bg-amber-200/25 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-[min(96vw,1080px)]">
        <TiltCard maxTilt={6} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: prefersReducedMotion ? 0 : 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-5 sm:p-8 lg:p-12 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
          >
            {/* Inner sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

            {/* Decorative rings */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full border border-purple-200/50" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full border border-pink-200/50" />

            {/* Washi tapes */}
            <div className="washi-tape washi-tape-yellow absolute -top-3 left-6 sm:left-10 rotate-[-2deg]" />
            <div className="washi-tape washi-tape-pink absolute -top-3 right-6 sm:right-10 rotate-[3deg]" />

            <div className="relative">
              {/* Header with Typewriter */}
              <div className="mb-6 sm:mb-9">
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 14 }}
                  className="relative inline-flex items-center justify-center mb-3"
                >
                  <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-amber-300/50 to-yellow-300/40 blur-2xl" aria-hidden="true" />
                  <motion.span
                    animate={prefersReducedMotion ? {} : { rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative text-4xl sm:text-5xl drop-shadow-sm"
                  >
                    🏆
                  </motion.span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT }}
                  className="text-xl xs:text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-poppins leading-[1.15] tracking-tight mb-2"
                >
                  <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                    <Typewriter text="Things you deserve an award for" delay={150} speed={40} />
                  </span>{' '}
                  <span className="inline-block">🏆</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.5, ease: EASE_OUT }}
                  className="text-[11px] sm:text-sm text-purple-700/80 font-poppins max-w-md mx-auto leading-relaxed"
                >
                  Birthday Special Edition — awarded with all our gratitude, {surpriseConfig.studentName}
                </motion.p>
              </div>

              {/* ---------------- 3D TILT AWARDS GRID (Requirement #3, #10) ---------------- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-5 sm:my-7 text-left">
                {CARDS.map((c, idx) => (
                  <TiltCard
                    key={c.id}
                    maxTilt={12}
                    breathe={true}
                    breatheDistance={3}
                    breatheDuration={6 + idx * 0.5}
                    scaleOnHover={1.04}
                    className="rounded-2xl"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.35 + idx * 0.1, // 100ms orchestrated stagger
                        type: 'spring',
                        stiffness: 170,
                        damping: 16,
                      }}
                      tabIndex={0}
                      role="figure"
                      aria-label={c.badge}
                      className={`group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} shadow-[0_10px_30px_-14px_rgba(139,92,246,0.4)] hover:shadow-[0_20px_45px_-12px_rgba(139,92,246,0.55)] transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-purple-300/70 flex flex-col justify-between overflow-hidden h-full`}
                    >
                      {/* Hover glow */}
                      <span
                        className={`pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br ${c.glow} blur-3xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                      />

                      <div className="relative">
                        {/* Header row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`text-[10px] sm:text-[11px] font-poppins font-extrabold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${c.chip} shadow-sm tracking-wide whitespace-nowrap`}
                          >
                            {c.badge}
                          </span>
                          <motion.span
                            animate={
                              prefersReducedMotion
                                ? {}
                                : { rotate: [-6, 6, -6], scale: [1, 1.1, 1] }
                            }
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                            className="text-lg sm:text-xl flex-shrink-0"
                            aria-hidden="true"
                          >
                            {c.emoji}
                          </motion.span>
                        </div>

                        {/* Quote */}
                        <p className="font-caveat font-bold text-xl sm:text-2xl text-[#4a2373] leading-snug">
                          &ldquo;{c.text}&rdquo;
                        </p>
                      </div>

                      {/* Bottom line flourish */}
                      <div
                        className="relative mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </TiltCard>
                ))}
              </div>

              {/* Official rating box with 3D tilt */}
              <TiltCard maxTilt={8} breathe={true} className="max-w-lg mx-auto">
                <motion.div
                  ref={ratingRef}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 180, damping: 18 }}
                  className="relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50/90 via-pink-50/80 to-amber-50/70 border-2 border-dashed border-purple-300/80 shadow-inner overflow-hidden"
                >
                  {/* Floating seal with bounce */}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: [10, 16, 10], scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-3 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white"
                    aria-hidden="true"
                  >
                    🏅
                  </motion.div>

                  <div className="text-[10px] sm:text-xs uppercase font-poppins font-extrabold tracking-[0.16em] text-purple-600 mb-2">
                    {surpriseConfig.studentName}&apos;s official birthday rating:
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.1, type: 'spring', stiffness: 300, damping: 18 }}
                      className="text-4xl sm:text-6xl font-black font-poppins bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent tabular-nums"
                    >
                      ∞
                    </motion.span>
                    <span className="text-2xl sm:text-4xl font-black text-purple-300 font-poppins">/</span>
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 18 }}
                      className="text-4xl sm:text-6xl font-black font-poppins text-[#7a48bb] tabular-nums"
                    >
                      {score}
                    </motion.span>

                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.4, type: 'spring', stiffness: 250, damping: 14 }}
                      className="text-2xl sm:text-4xl drop-shadow-md"
                      aria-hidden="true"
                    >
                      ⭐
                    </motion.span>
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-purple-700/70 font-poppins mt-2 italic">
                    (Certified 100% genuine &amp; non-negotiable)
                  </div>
                </motion.div>
              </TiltCard>

              {/* CTA button with spring micro-interaction */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.55, ease: EASE_OUT }}
                className="mt-6 sm:mt-9"
              >
                <motion.button
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.05,
                          y: -3,
                          boxShadow: '0 20px 48px -10px rgba(122,72,187,1)',
                          transition: { type: 'spring', stiffness: 260, damping: 14 },
                        }
                  }
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={onNext}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                  <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span>NEXT: MEMORIES</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-base sm:text-lg"
                    >
                      📸
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35, duration: 0.5 }}
                className="mt-6 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                6 awards · 1 legendary teacher
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}