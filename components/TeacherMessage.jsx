'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function TeacherMessage({ onNext, teacherName, studentName }) {
  const prefersReducedMotion = useReducedMotion();

  // Stagger helper with spring physics
  const stagger = (delay) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, type: 'spring', stiffness: 180, damping: 16 },
  });

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-8 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* Ambient glow orbs */}
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

      <div className="relative z-10 w-full max-w-[min(94vw,680px)]">
        <TiltCard maxTilt={8} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-5 sm:p-9 lg:p-12 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] overflow-hidden relative"
          >
            {/* Inner paper sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

            {/* Decorative concentric rings */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full border border-purple-200/50" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full border border-pink-200/50" />

            {/* Washi tapes */}
            <div className="washi-tape washi-tape-yellow absolute -top-3 left-6 sm:left-10 rotate-[-3deg]" />
            <div className="washi-tape washi-tape-pink absolute -top-3 right-6 sm:right-10 rotate-[4deg]" />

            <div className="relative">
              {/* Header stamp row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-purple-200/80 pb-3 sm:pb-4 mb-5 sm:mb-7">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={prefersReducedMotion ? {} : { rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-xl sm:text-2xl"
                  >
                    💌
                  </motion.span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.14em] font-poppins font-extrabold text-purple-700 bg-purple-100/80 border border-purple-200/70 px-2.5 py-1 rounded-full shadow-sm">
                    Birthday Letter
                  </span>
                </div>
                <div className="font-caveat text-base sm:text-lg text-purple-700 font-bold whitespace-nowrap">
                  From the heart ✨
                </div>
              </div>

              {/* Greeting with Typewriter */}
              <motion.h1
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
                className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold font-playfair mb-4 sm:mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                  <Typewriter text={`Dear ${teacherName},`} delay={150} speed={55} />
                </span>
              </motion.h1>

              {/* Letter body */}
              <div className="space-y-3 sm:space-y-4 font-caveat text-lg sm:text-xl lg:text-2xl text-[#4a2373] leading-relaxed">
                <motion.p {...stagger(0.3)}>
                  <Typewriter
                    text="We may forget a few formulas, some deadlines, and probably a couple of things you told us to remember..."
                    delay={700}
                    speed={30}
                  />
                </motion.p>

                <motion.p
                  {...stagger(0.5)}
                  className="relative font-bold text-[#5c2b92] bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-2xl border-l-4 border-[#9333ea] shadow-sm"
                >
                  <span className="absolute -top-2 -left-1 text-lg">✨</span>
                  <Typewriter
                    text="but we won't forget the way you made learning feel possible."
                    delay={2200}
                    speed={35}
                  />
                </motion.p>

                <motion.p {...stagger(0.7)}>
                  <Typewriter
                    text="Thank you for answering the same question for the third time, for correcting our mistakes, for believing in us when we sometimes didn't believe in ourselves, and for turning ordinary classes into memories we'll carry with us forever."
                    delay={3500}
                    speed={25}
                  />
                </motion.p>

                {/* Highlighted closing block */}
                <motion.div {...stagger(0.9)} className="relative pt-3 sm:pt-4">
                  <p className="font-poppins font-semibold text-[10px] sm:text-xs text-purple-800 uppercase tracking-[0.16em] mb-2">
                    On your special birthday, as your students {studentName || 'Bhumi & Taniya'}, we just want to say:
                  </p>

                  <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-100/80 via-pink-50/80 to-amber-50/80 border border-purple-200/70 p-4 sm:p-5 shadow-inner">
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: [-6, 6, -6], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-sm flex items-center justify-center shadow-md"
                    >
                      🎂
                    </motion.div>

                    <p className="font-extrabold text-[#5c2b92] text-lg sm:text-2xl lg:text-[1.65rem] leading-snug">
                      Happy Birthday! 🎉 <br />
                      Thank you for teaching. <br />
                      Thank you for guiding. <br />
                      And thank you for being someone we&apos;ll always remember. 💜
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ---------------- REAL-TIME HANDWRITING DRAW SIGNATURE (Requirement #20) ---------------- */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-6 sm:mt-8 pt-4 border-t border-purple-100/80 flex flex-col items-end"
              >
                <div className="text-right relative inline-block">
                  <span className="block text-[10px] sm:text-xs text-purple-600/90 font-poppins tracking-wide">
                    With endless respect &amp; birthday wishes,
                  </span>
                  <span className="font-caveat font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#7a48bb] to-fuchsia-500 bg-clip-text text-transparent">
                    — {studentName}
                  </span>

                  {/* SVG Animated Handwriting Underline */}
                  <div className="w-full h-4 mt-0.5 relative">
                    <svg viewBox="0 0 240 16" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="sigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7a48bb" />
                          <stop offset="50%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M 5,8 Q 60,14 120,6 T 235,9"
                        fill="none"
                        stroke="url(#sigGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.1 }
                            : { pathLength: { duration: 1.8, delay: 1.4, ease: 'easeInOut' }, opacity: { duration: 0.3, delay: 1.4 } }
                        }
                      />
                    </svg>

                    {/* Writing sparkle tip traveling with the line */}
                    {!prefersReducedMotion && (
                      <motion.span
                        initial={{ left: '0%', opacity: 0 }}
                        animate={{ left: '96%', opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.8, delay: 1.4, ease: 'easeInOut' }}
                        className="absolute -top-2 text-xs"
                      >
                        ✍️
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* CTA button with spring micro-interactions */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.55, ease: EASE_OUT }}
                className="mt-6 sm:mt-8 text-center"
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
                    <span>NEXT: BIRTHDAY AWARDS</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { rotate: [0, -12, 12, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
                      className="text-base sm:text-lg"
                    >
                      🏆
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80 text-center"
              >
                Made with 💜 for the best teacher
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}