'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function WrongPassword({ onRetry }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-8 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 h-[380px] w-[380px] rounded-full bg-purple-300/30 blur-[120px]"
        />
        <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-pink-300/25 blur-[110px]" />
        <div className="absolute top-1/2 -left-24 h-[280px] w-[280px] rounded-full bg-amber-200/25 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-[min(94vw,480px)]">
        <TiltCard maxTilt={10} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2, y: prefersReducedMotion ? 0 : 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: 0,
              x: prefersReducedMotion ? 0 : [-10, 10, -8, 8, -4, 4, 0],
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.4, ease: EASE_OUT },
              scale: { duration: 0.5, type: 'spring', stiffness: 200, damping: 18 },
              rotate: { duration: 0.5, ease: EASE_OUT },
              y: { duration: 0.5, ease: EASE_OUT },
              x: { duration: 0.55, ease: 'easeInOut', delay: 0.1 },
            }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] p-6 sm:p-10 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
          >
            {/* Inner sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

            {/* Decorative rings */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full border border-purple-200/50" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full border border-pink-200/50" />

            {/* Washi tape */}
            <div className="washi-tape washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

            <div className="relative">
              {/* Tear emoji with falling animated drops */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
                className="relative inline-flex items-center justify-center mb-5 sm:mb-6"
              >
                <div className="relative text-6xl sm:text-7xl drop-shadow-sm">
                  😭
                  {!prefersReducedMotion && (
                    <>
                      <motion.span
                        className="absolute text-lg sm:text-xl"
                        style={{ top: '40%', left: '20%' }}
                        animate={{ y: [0, 24], opacity: [1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn', delay: 0.2 }}
                      >
                        💧
                      </motion.span>
                      <motion.span
                        className="absolute text-lg sm:text-xl"
                        style={{ top: '40%', right: '20%' }}
                        animate={{ y: [0, 24], opacity: [1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn', delay: 0.8 }}
                      >
                        💧
                      </motion.span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Heading with Typewriter */}
              <motion.h2
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE_OUT }}
                className="text-3xl sm:text-4xl font-extrabold font-poppins mb-4 sm:mb-5 leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                  <Typewriter text="Nice try 😭" delay={150} speed={55} />
                </span>
              </motion.h2>

              {/* Joke block */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE_OUT }}
                className="relative rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200/70 p-4 sm:p-5 mb-5 sm:mb-6 shadow-inner"
              >
                <span className="absolute -top-2.5 -left-2 h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-xs flex items-center justify-center shadow-md">
                  🔒
                </span>

                <p className="font-caveat text-xl sm:text-2xl text-[#532e82] leading-relaxed">
                  Teachers give surprise tests...
                </p>
                <p className="mt-2 font-caveat font-bold text-xl sm:text-2xl text-[#703da9] leading-relaxed">
                  but Bhumi & Taniya give surprise websites. 😌
                </p>
              </motion.div>

              {/* Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="text-[11px] sm:text-xs text-purple-500/90 font-poppins mb-6 sm:mb-7 leading-relaxed px-1"
              >
                <span className="font-bold text-purple-700">Hint:</span> Check the year on the lock screen — or ask Bhumi & Taniya! 💜
              </motion.p>

              {/* CTA with spring micro-interaction */}
              <motion.button
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
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
                onClick={onRetry}
                className="group relative w-full py-3.5 sm:py-4 px-6 rounded-full text-white font-poppins font-bold text-sm tracking-wide shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                <span className="relative flex items-center justify-center gap-2 uppercase">
                  <span>Try Again</span>
                  <motion.span
                    animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-base"
                  >
                    💜
                  </motion.span>
                </span>
              </motion.button>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                No peeking allowed 😉
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}