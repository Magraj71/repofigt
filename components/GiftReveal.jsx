'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

const GIFT_DETAILS = {
  1: {
    title: 'Gift of Gratitude',
    quote: 'Thank you for always being patient with me. Wishing you endless happiness today!',
    icon: '💜',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    glow: 'from-purple-400/50 to-fuchsia-400/40',
    badge: 'from-purple-600 to-fuchsia-600',
  },
  2: {
    title: 'Gift of Memories',
    quote: 'Some classes become lifelong memories. Happy Birthday to my favorite teacher!',
    icon: '📸',
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-500',
    glow: 'from-pink-400/50 to-rose-400/40',
    badge: 'from-pink-600 to-rose-600',
  },
  3: {
    title: 'Gift of Appreciation',
    quote: 'You taught more than just a subject; you taught me how to grow. Have the happiest birthday!',
    icon: '🌟',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    glow: 'from-amber-400/50 to-yellow-400/40',
    badge: 'from-amber-600 to-orange-600',
  },
};

export default function GiftReveal({ selectedGift = 1, onReadMessage }) {
  const prefersReducedMotion = useReducedMotion();
  const current = GIFT_DETAILS[selectedGift] || GIFT_DETAILS[1];

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

      <div className="relative z-10 w-full max-w-[min(94vw,620px)]">
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
              {/* Heart with real-time double-thump rhythm (Requirement #5) */}
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 220,
                  damping: 14,
                }}
                className="relative inline-flex items-center justify-center mb-5 sm:mb-6"
              >
                {/* Gradient halo behind heart */}
                <div
                  className={`absolute inset-0 -m-6 rounded-full bg-gradient-to-br ${current.glow} blur-2xl opacity-90`}
                  aria-hidden="true"
                />

                {/* Double-thump heartbeat idle animation */}
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { scale: [1, 1.18, 1, 1.28, 1] }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    times: [0, 0.15, 0.3, 0.45, 1],
                    ease: 'easeInOut',
                  }}
                  className="relative text-6xl xs:text-7xl sm:text-8xl drop-shadow-sm select-none"
                >
                  💜
                </motion.span>

                {/* Orbiting and twinkling sparkles */}
                {!prefersReducedMotion && (
                  <>
                    <motion.span
                      className="absolute text-xl sm:text-2xl text-purple-400"
                      style={{ top: '-4%', right: '-8%' }}
                      animate={{
                        y: [-3, 3, -3],
                        rotate: [-12, 12, -12],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      className="absolute text-lg sm:text-xl text-amber-400"
                      style={{ bottom: '-4%', left: '-8%' }}
                      animate={{
                        y: [2, -4, 2],
                        rotate: [10, -10, 10],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    >
                      ⭐
                    </motion.span>
                    <motion.span
                      className="absolute text-base sm:text-lg text-pink-400"
                      style={{ top: '10%', left: '-10%' }}
                      animate={{
                        y: [-2, 3, -2],
                        rotate: [-8, 8, -8],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    >
                      💫
                    </motion.span>
                  </>
                )}
              </motion.div>

              {/* Plot twist heading with Typewriter */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.55, ease: EASE_OUT }}
              >
                <div className="font-caveat font-bold text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  <Typewriter text="Plot twist..." delay={200} speed={45} />
                </div>

                <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold font-poppins mb-5 sm:mb-6 leading-[1.15] tracking-tight px-1">
                  <span className="bg-gradient-to-r from-[#5c2a93] via-fuchsia-700 to-[#5c2a93] bg-clip-text text-transparent">
                    <Typewriter text="The real gift is a little thank you." delay={800} speed={40} />
                  </span>{' '}
                  <span className="inline-block">💜</span>
                </h2>
              </motion.div>

              {/* Gift-specific quote block with 3D tilt */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 180, damping: 16 }}
                className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50/80 via-pink-50/70 to-amber-50/80 border border-purple-200/70 p-5 sm:p-6 mb-5 sm:mb-7 shadow-inner"
              >
                {/* Floating icon badge with wobble */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute -top-3 -left-3 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br ${current.gradient} text-white text-base sm:text-lg flex items-center justify-center shadow-md`}
                  aria-hidden="true"
                >
                  {current.icon}
                </motion.div>

                {/* Title chip */}
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${current.badge} text-white text-[10px] sm:text-[11px] font-poppins font-extrabold uppercase tracking-[0.14em] mb-3 shadow-sm`}
                >
                  {current.title}
                </div>

                {/* Quote */}
                <p className="font-caveat font-bold text-xl xs:text-2xl sm:text-3xl text-[#532684] leading-snug">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </motion.div>

              {/* CTA button with spring micro-interaction */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.55, ease: EASE_OUT }}
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
                  onClick={onReadMessage}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                  <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span>READ BIRTHDAY MESSAGE</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { y: [-1, 2, -1], rotate: [-6, 6, -6] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-base sm:text-lg"
                    >
                      💌
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                Unwrapped with love 💜
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}