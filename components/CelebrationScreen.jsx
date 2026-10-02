'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';
import RealtimeBalloons from '@/components/RealtimeBalloons';

const EASE_OUT = [0.22, 1, 0.36, 1];

const FLOATING_EMOJIS = [
  { emoji: '🎈', duration: 2.0, offset: 4 },
  { emoji: '🎂', duration: 2.2, offset: -4 },
  { emoji: '✨', duration: 1.8, offset: 0 },
  { emoji: '🎁', duration: 2.4, offset: 4 },
  { emoji: '🎈', duration: 2.1, offset: -4 },
];

export default function CelebrationScreen({ onContinue, teacherName }) {
  const prefersReducedMotion = useReducedMotion();

  /* Stagger helper with spring physics */
  const stagger = (delay) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, type: 'spring', stiffness: 180, damping: 16 },
  });

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-8 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* ---------------- REAL-TIME BALLOON DRIFT (Requirement #14) ---------------- */}
      <RealtimeBalloons />

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
        <TiltCard maxTilt={10} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-6 sm:p-10 lg:p-12 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
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
              {/* Floating emoji row with wobbling */}
              <div className="flex justify-center items-center gap-2 sm:gap-4 text-3xl sm:text-4xl lg:text-5xl mb-5 sm:mb-6">
                {FLOATING_EMOJIS.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.4, y: -16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      type: 'spring',
                      stiffness: 240,
                      damping: 14,
                    }}
                    className="inline-block drop-shadow-sm"
                    aria-hidden="true"
                  >
                    <motion.span
                      animate={
                        prefersReducedMotion
                          ? {}
                          : item.emoji === '✨'
                          ? { scale: [1, 1.25, 1], rotate: [-10, 10, -10] }
                          : { y: [item.offset * -1, item.offset, item.offset * -1], rotate: [-4, 4, -4] }
                      }
                      transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="inline-block"
                    >
                      {item.emoji}
                    </motion.span>
                  </motion.span>
                ))}
              </div>

              {/* Heading with Typewriter */}
              <motion.h1
                {...stagger(0.2)}
                className="font-extrabold font-poppins tracking-tight uppercase leading-[1.05] mb-3 sm:mb-4"
              >
                <span className="block text-3xl xs:text-4xl sm:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                    <Typewriter text="Happy" delay={200} speed={60} />
                  </span>
                </span>
                <span className="block font-caveat font-bold lowercase tracking-normal text-4xl xs:text-5xl sm:text-6xl lg:text-7xl mt-1">
                  <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    <Typewriter text="birthday!" delay={600} speed={55} />
                  </span>{' '}
                  <motion.span
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { rotate: [0, -14, 14, 0], scale: [1, 1.15, 1] }
                    }
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                    className="inline-block"
                    aria-hidden="true"
                  >
                    🎂
                  </motion.span>
                </span>
              </motion.h1>

              {/* Greeting chip */}
              <motion.div
                {...stagger(0.4)}
                className="inline-flex items-center gap-1.5 my-3 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-amber-100/80 border border-purple-200/70 text-purple-800 font-caveat font-bold text-base sm:text-xl lg:text-2xl shadow-sm"
              >
                <span>To my favorite teacher, {teacherName}</span>
                <motion.span
                  animate={prefersReducedMotion ? {} : { rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  ⭐
                </motion.span>
              </motion.div>

              {/* Primary message with Typewriter */}
              <motion.p
                {...stagger(0.55)}
                className="mt-4 sm:mt-5 text-sm xs:text-base sm:text-lg lg:text-xl font-poppins font-medium text-[#4c2479] max-w-lg mx-auto leading-relaxed"
              >
                <Typewriter
                  text="Wishing the happiest birthday to the teacher who somehow makes even the most confusing topics feel simple and fun. 💜"
                  delay={1200}
                  speed={35}
                />
              </motion.p>

              {/* Additional note card with 3D tilt */}
              <motion.div
                {...stagger(0.7)}
                className="relative mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50/80 via-pink-50/70 to-amber-50/80 border border-purple-200/70 font-caveat text-lg sm:text-xl lg:text-2xl text-[#65339f] max-w-md mx-auto leading-relaxed shadow-inner"
              >
                {/* Floating gift badge */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: [-6, 6, -6], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -left-3 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white text-base sm:text-lg flex items-center justify-center shadow-md"
                  aria-hidden="true"
                >
                  🎁
                </motion.div>

                <p>
                  May this year bring you endless joy, peace, and as much inspiration as you give to me every single day!
                </p>
              </motion.div>

              {/* CTA button with spring micro-interactions */}
              <motion.div {...stagger(0.85)} className="mt-6 sm:mt-8">
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
                  onClick={onContinue}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                  <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span>CONTINUE TO CAKE</span>
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
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                🎉 Let the celebration begin
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}