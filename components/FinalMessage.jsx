'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { surpriseConfig } from '@/config/surprise';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function FinalMessage({ onNext }) {
  const prefersReducedMotion = useReducedMotion();

  const stagger = (delay) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
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

      <div className="relative z-10 w-full max-w-[min(94vw,640px)]">
        <TiltCard maxTilt={8} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: prefersReducedMotion ? 0 : 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-6 sm:p-11 lg:p-14 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
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
              {/* Cake badge with idle wobble */}
              <motion.div
                initial={{ scale: 0, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 220,
                  damping: 14,
                }}
                className="relative mx-auto mb-5 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
              >
                {/* Gradient halo */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-pink-200 to-purple-300 blur-xl opacity-90"
                  aria-hidden="true"
                />
                <div className="absolute inset-3 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 shadow-inner" />

                <motion.span
                  animate={prefersReducedMotion ? {} : { rotate: [-4, 4, -4], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative text-4xl sm:text-5xl drop-shadow-sm"
                >
                  🎂
                </motion.span>

                {/* Floating sparkles */}
                {!prefersReducedMotion && (
                  <>
                    <motion.span
                      animate={{ y: [-2, -8, -2], scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 right-2 text-lg sm:text-xl text-purple-400"
                      aria-hidden="true"
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      animate={{ y: [2, -6, 2], scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      className="absolute bottom-0 left-2 text-base sm:text-lg text-amber-400"
                      aria-hidden="true"
                    >
                      ⭐
                    </motion.span>
                  </>
                )}
              </motion.div>

              {/* Heading with Typewriter */}
              <motion.h1
                {...stagger(0.2)}
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-playfair leading-[1.15] tracking-tight mb-5 sm:mb-7 px-1"
              >
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                  <Typewriter text="One last birthday wish..." delay={150} speed={45} />
                </span>
              </motion.h1>

              {/* Letter body */}
              <div className="space-y-4 sm:space-y-6 font-caveat text-lg xs:text-xl sm:text-2xl lg:text-3xl text-[#4a2373] leading-relaxed">
                <motion.p {...stagger(0.35)}>
                  <Typewriter
                    text="Behind every confident student is often a teacher who kept saying:"
                    delay={800}
                    speed={35}
                  />
                </motion.p>

                {/* Quote spotlight with 3D tilt */}
                <TiltCard maxTilt={10} breathe={true} className="py-2 sm:py-3">
                  <div className="relative inline-block px-5 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-br from-[#f5eaff] to-[#fdf2ff] border-2 border-purple-200/90 text-[#672eab] font-bold text-2xl sm:text-4xl lg:text-[2.75rem] shadow-[0_14px_40px_-16px_rgba(139,92,246,0.6)]">
                    &ldquo;You can do it.&rdquo;
                  </div>
                </TiltCard>

                <motion.p {...stagger(0.65)} className="font-bold text-[#622a9f]">
                  Thank you for being that teacher. 💜
                </motion.p>

                {/* Divider */}
                <motion.div {...stagger(0.8)} className="flex items-center justify-center gap-3 py-1">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300" />
                  <span className="text-base sm:text-lg" aria-hidden="true">🌸</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
                </motion.div>

                {/* Closing lines */}
                <motion.p
                  {...stagger(0.95)}
                  className="text-base xs:text-lg sm:text-2xl lg:text-[1.7rem] text-[#603592] italic leading-snug"
                >
                  Some lessons end with a final bell.
                  <br />
                  Some teachers stay in our memory and heart forever.
                </motion.p>
              </div>

              {/* Signature with double-thump heart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.6 }}
                className="mt-6 sm:mt-9 pt-5 sm:pt-7 border-t border-purple-100/80 flex flex-col items-center justify-center gap-2"
              >
                <div className="flex items-center gap-1.5 font-poppins text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-purple-700">
                  <span>Made with love &amp; gratitude by {surpriseConfig.studentName}</span>
                  <motion.span
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { scale: [1, 1.25, 1, 1.2, 1] }
                    }
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      times: [0, 0.15, 0.3, 0.45, 1],
                      ease: 'easeInOut',
                    }}
                    className="inline-block text-sm sm:text-base"
                    aria-hidden="true"
                  >
                    ❤️
                  </motion.span>
                </div>

                <div className="font-caveat font-bold text-2xl sm:text-4xl lg:text-[2.6rem] bg-gradient-to-r from-[#7a48bb] via-fuchsia-500 to-[#7a48bb] bg-clip-text text-transparent">
                  — {surpriseConfig.studentName}
                </div>
              </motion.div>

              {/* CTA button with spring micro-interactions */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.55, ease: EASE_OUT }}
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
                    <span>REPLAY SURPRISE</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { rotate: [0, -12, 12, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                      className="text-base sm:text-lg"
                    >
                      🎂
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.55, duration: 0.5 }}
                className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                The end · until next time 💜
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}