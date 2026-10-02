'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

const NO_TAUNTS = [
  'That option mysteriously disappeared 😭',
  'Are you sure? Try again... 🤔',
  "Nice try! It ran away 🏃💨",
  'Oops! The NO button is shy 🙈',
  "It's impossible to say no 💜",
];

export default function SurpriseQuestion({ onYes }) {
  const prefersReducedMotion = useReducedMotion();

  const [noClicked, setNoClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [tauntIndex, setTauntIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [yesPulse, setYesPulse] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [envelopeHovered, setEnvelopeHovered] = useState(false);

  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  /* Compute safe random offset for runaway NO button */
  const moveNo = useCallback(() => {
    const container = containerRef.current;
    const button = noButtonRef.current;
    if (!container || !button) return;

    const cRect = container.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();
    const padding = 16;

    const maxX = Math.max(0, (cRect.width - bRect.width) / 2 - padding);
    const maxY = Math.max(0, (cRect.height - bRect.height) / 2 - padding);

    const isSmall = window.innerWidth < 640;
    const scale = isSmall ? 0.55 : 1;

    const nextX = (Math.random() - 0.5) * 2 * maxX * scale;
    const nextY = (Math.random() - 0.5) * 2 * maxY * scale;

    setNoPosition({ x: nextX, y: nextY });
    setNoCount((c) => c + 1);
    setTauntIndex((i) => (i + 1) % NO_TAUNTS.length);
    setNoClicked(true);
  }, []);

  useEffect(() => {
    if (noCount >= 3) {
      setYesPulse(true);
      const t = setTimeout(() => setYesPulse(false), 2200);
      return () => clearTimeout(t);
    }
  }, [noCount]);

  const handleEnvelopeClick = () => {
    setEnvelopeOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 select-none overflow-hidden">
      {/* Ambient soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-purple-300/30 blur-[120px]"
        />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-pink-300/25 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-[min(94vw,560px)]">
        <TiltCard maxTilt={10} breathe={true} className="w-full">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.92, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[28px] sm:rounded-[40px] p-6 sm:p-9 md:p-11 border border-white/70 shadow-[0_28px_70px_-20px_rgba(110,65,160,0.4)] text-center relative overflow-hidden"
          >
            {/* Inner sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

            {/* Washi tapes */}
            <div className="washi-tape washi-tape-yellow absolute -top-3 left-6 sm:left-10 rotate-[-3deg]" />
            <div className="washi-tape washi-tape-pink absolute -top-3 right-6 sm:right-10 rotate-[4deg]" />

            <div className="relative">
              {/* Top animated emoji row */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex items-center justify-center gap-2 sm:gap-3 mb-2 text-xl sm:text-2xl"
              >
                <motion.span
                  animate={prefersReducedMotion ? {} : { rotate: [-14, 14, -14], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-3xl sm:text-4xl drop-shadow-sm"
                >
                  💌
                </motion.span>
                <motion.span
                  animate={prefersReducedMotion ? {} : { rotate: [14, -14, 14], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ⭐
                </motion.span>
              </motion.div>

              {/* Script heading with Typewriter */}
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="font-caveat font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent mb-1"
              >
                <Typewriter text="I made something for you..." delay={200} speed={40} />
              </motion.h3>

              {/* Main question with Typewriter */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-[#562a88] font-poppins mb-6 leading-[1.15] tracking-tight px-1"
              >
                <Typewriter text="Wanna see the surprise?" delay={900} speed={45} />
              </motion.h1>

              {/* ---------------- REAL-TIME ENVELOPE INTERACTION (Requirement #18) ---------------- */}
              <div className="relative my-5 flex flex-col items-center justify-center">
                <motion.div
                  onMouseEnter={() => setEnvelopeHovered(true)}
                  onMouseLeave={() => setEnvelopeHovered(false)}
                  onClick={handleEnvelopeClick}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : envelopeHovered && !envelopeOpen
                      ? {
                          rotate: [-3, 3, -3],
                          scale: 1.06,
                        }
                      : {
                          scale: [1, 1.03, 1],
                        }
                  }
                  transition={
                    envelopeHovered && !envelopeOpen
                      ? { duration: 0.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  whileTap={{ scale: 0.96 }}
                  className="relative cursor-pointer w-48 sm:w-56 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-[#eed8ff] via-[#f7ebff] to-[#edd6ff] border-2 border-purple-300 shadow-[0_14px_30px_-8px_rgba(139,92,246,0.35)] flex items-center justify-center overflow-hidden touch-manipulation group"
                  title="Click to open the surprise envelope!"
                >
                  {/* Glowing halo */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-yellow-300/20 transition-opacity duration-300 ${
                      envelopeHovered ? 'opacity-100' : 'opacity-40'
                    }`}
                  />

                  {/* Envelope folded flaps */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg viewBox="0 0 200 130" className="w-full h-full text-purple-300/60" fill="currentColor">
                      <polygon points="0,0 100,65 200,0" fill="#dfbeff" />
                      <polygon points="0,0 0,130 100,65" fill="#e9ceff" opacity="0.6" />
                      <polygon points="200,0 200,130 100,65" fill="#e9ceff" opacity="0.6" />
                      <polygon points="0,130 100,65 200,130" fill="#f2ddff" />
                    </svg>
                  </div>

                  {/* Envelope Top Flap that springs open */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top pointer-events-none z-20"
                    animate={envelopeOpen ? { rotateX: -160, opacity: 0.4 } : { rotateX: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  >
                    <svg viewBox="0 0 200 65" className="w-full h-full text-[#cfa5f8]" fill="currentColor">
                      <polygon points="0,0 100,65 200,0" />
                    </svg>
                  </motion.div>

                  {/* Secret letter that slides out on tap */}
                  <motion.div
                    className="absolute z-10 w-40 sm:w-48 bg-white rounded-xl shadow-lg border border-purple-200 p-2.5 text-center pointer-events-none"
                    initial={{ y: 20, opacity: 0, scale: 0.85 }}
                    animate={
                      envelopeOpen
                        ? { y: -30, opacity: 1, scale: 1 }
                        : { y: 20, opacity: 0, scale: 0.85 }
                    }
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                  >
                    <span className="text-xl">🎂</span>
                    <p className="font-caveat font-bold text-sm sm:text-base text-purple-900 leading-tight">
                      A Special Birthday Tribute!
                    </p>
                    <span className="text-[10px] text-fuchsia-600 font-poppins font-bold">
                      Tap YES to begin ✨
                    </span>
                  </motion.div>

                  {/* Wax seal heart on envelope */}
                  {!envelopeOpen && (
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-30 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md flex items-center justify-center text-sm border-2 border-white"
                    >
                      💜
                    </motion.div>
                  )}
                </motion.div>

                {/* Subtitle prompt */}
                <p className="mt-2 text-[11px] font-poppins text-purple-600 font-semibold tracking-wide">
                  {envelopeOpen ? '🎉 Letter revealed! Tap YES below' : 'Tap envelope to peek inside 💌'}
                </p>
              </div>

              {/* Buttons area */}
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 min-h-[120px] sm:min-h-[100px] mt-2">
                {/* YES button with spring physics */}
                <motion.button
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.06,
                          y: -3,
                          boxShadow: '0 20px 48px -10px rgba(122,72,187,1)',
                          transition: { type: 'spring', stiffness: 260, damping: 14 },
                        }
                  }
                  whileTap={{ scale: 0.94 }}
                  animate={
                    yesPulse && !prefersReducedMotion
                      ? {
                          boxShadow: [
                            '0 10px 30px -8px rgba(122,72,187,0.7)',
                            '0 0 0 14px rgba(217,70,239,0.22)',
                            '0 10px 30px -8px rgba(122,72,187,0.7)',
                          ],
                          scale: [1, 1.05, 1],
                        }
                      : {}
                  }
                  transition={
                    yesPulse && !prefersReducedMotion
                      ? { duration: 1.6, repeat: 1, ease: 'easeInOut' }
                      : {}
                  }
                  type="button"
                  onClick={onYes}
                  className="group relative w-full sm:w-auto px-9 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation order-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                  <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                  <span className="relative flex items-center justify-center gap-2 tracking-wide">
                    <span>YES</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { scale: [1, 1.25, 1, 1.2, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-base sm:text-lg"
                    >
                      💜
                    </motion.span>
                  </span>
                </motion.button>

                {/* NO button — escapes within safe bounds */}
                <motion.button
                  ref={noButtonRef}
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.1 }
                      : { type: 'spring', stiffness: 360, damping: 20, mass: 0.7 }
                  }
                  onMouseEnter={moveNo}
                  onFocus={moveNo}
                  onClick={moveNo}
                  type="button"
                  aria-label="No (good luck catching it)"
                  className="relative z-20 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/95 text-purple-700 font-poppins font-semibold text-sm border-2 border-purple-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-colors touch-manipulation order-2"
                >
                  NO 🙈
                </motion.button>
              </div>

              {/* Taunt bubble */}
              <AnimatePresence mode="wait">
                {noClicked && (
                  <motion.div
                    key={tauntIndex}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 shadow-sm"
                  >
                    <span className="text-lg">💭</span>
                    <span className="font-caveat font-bold text-lg sm:text-xl text-pink-700 leading-tight">
                      {NO_TAUNTS[tauntIndex]}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Attempt counter */}
              <AnimatePresence>
                {noCount >= 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
                  >
                    Attempts to say no: {noCount} · Hint: just tap YES 💜
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}