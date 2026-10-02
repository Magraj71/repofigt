'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

const GIFTS = [
  {
    id: 1,
    name: 'Mystery Box 1',
    color: 'from-[#d8b4fe] to-[#c084fc]',
    lidColor: 'bg-[#a855f7]',
    ribbonColor: 'bg-[#fef08a]',
    bowColor: 'text-[#facc15]',
    glow: 'from-purple-400/50 to-fuchsia-400/40',
    label: 'Box #1',
    badge: '✨ Birthday Gift 1',
    hint: 'A little something sweet',
  },
  {
    id: 2,
    name: 'Mystery Box 2',
    color: 'from-[#fbcfe8] to-[#f472b6]',
    lidColor: 'bg-[#ec4899]',
    ribbonColor: 'bg-[#ede9fe]',
    bowColor: 'text-[#c084fc]',
    glow: 'from-pink-400/50 to-rose-400/40',
    label: 'Box #2',
    badge: '⭐ Birthday Gift 2',
    hint: 'Made with extra love',
  },
  {
    id: 3,
    name: 'Mystery Box 3',
    color: 'from-[#fef08a] to-[#facc15]',
    lidColor: 'bg-[#eab308]',
    ribbonColor: 'bg-[#f3e8ff]',
    bowColor: 'text-[#9333ea]',
    glow: 'from-amber-300/50 to-yellow-400/40',
    label: 'Box #3',
    badge: '🎀 Birthday Gift 3',
    hint: 'The sweetest surprise',
  },
];

export default function GiftScreen({ onSelectGift }) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);

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

      <div className="relative z-10 w-full max-w-[min(96vw,1000px)]">
        <TiltCard maxTilt={8} breathe={true} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: prefersReducedMotion ? 0 : 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-5 sm:p-10 lg:p-12 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
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
              <div className="mb-6 sm:mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins capitalize leading-[1.1] mb-2 sm:mb-3"
                >
                  <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                    <Typewriter text="Select your birthday gift" delay={150} speed={45} />
                  </span>{' '}
                  <motion.span
                    animate={prefersReducedMotion ? {} : { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    🎁
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: EASE_OUT }}
                  className="text-base sm:text-lg lg:text-xl font-caveat font-bold text-[#8c57cf]"
                >
                  A special token from Chhavi on your birthday 💜
                </motion.p>
              </div>

              {/* ---------------- GIFT GRID WITH 3D TILT & HOVER REACTIONS (Requirement #3, #15, #17) ---------------- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 my-5 sm:my-7">
                {GIFTS.map((g, i) => {
                  const isHovered = hoveredId === g.id;
                  return (
                    <TiltCard
                      key={g.id}
                      maxTilt={14}
                      breathe={true}
                      breatheDistance={3}
                      breatheDuration={6 + i}
                      scaleOnHover={1.04}
                      className="rounded-3xl"
                    >
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4 + i * 0.12,
                          type: 'spring',
                          stiffness: 170,
                          damping: 16,
                        }}
                        whileTap={{ scale: 0.94 }}
                        onHoverStart={() => setHoveredId(g.id)}
                        onHoverEnd={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(g.id)}
                        onBlur={() => setHoveredId(null)}
                        onClick={() => onSelectGift(g.id)}
                        aria-label={`Select ${g.label}, ${g.name}`}
                        className="group w-full relative flex flex-col items-center p-4 sm:p-5 lg:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 hover:border-purple-200 shadow-[0_14px_40px_-16px_rgba(139,92,246,0.45)] hover:shadow-[0_22px_55px_-12px_rgba(139,92,246,0.65)] transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-purple-300/70 touch-manipulation overflow-hidden"
                      >
                        {/* Ambient glow behind card */}
                        <span
                          className={`pointer-events-none absolute -inset-8 rounded-[40px] bg-gradient-to-br ${g.glow} blur-3xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500`}
                          aria-hidden="true"
                        />

                        {/* Orbiting sparkles around the gift box (Requirement #15) */}
                        {!prefersReducedMotion && (
                          <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
                            {[
                              { top: '15%', left: '10%', delay: 0, sym: '✨' },
                              { top: '20%', right: '12%', delay: 0.8, sym: '✦' },
                              { bottom: '25%', left: '8%', delay: 1.6, sym: '⭐' },
                              { bottom: '30%', right: '10%', delay: 2.2, sym: '💫' },
                            ].map((sp, sIdx) => (
                              <motion.span
                                key={sIdx}
                                style={{ top: sp.top, left: sp.left, right: sp.right }}
                                animate={{
                                  opacity: isHovered ? [0.4, 1, 0.4] : [0.2, 0.8, 0.2],
                                  scale: isHovered ? [0.9, 1.3, 0.9] : [0.8, 1.1, 0.8],
                                  y: [-2, 2, -2],
                                }}
                                transition={{
                                  duration: 2.2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: sp.delay,
                                }}
                                className="absolute text-xs sm:text-sm text-purple-400"
                              >
                                {sp.sym}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        <div className="relative flex flex-col items-center w-full">
                          {/* Badge */}
                          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200/80 text-[10px] sm:text-[11px] font-poppins font-extrabold text-purple-800 tracking-wide shadow-sm">
                            {g.badge}
                          </div>

                          {/* Gift box with Real-time Reaction (Requirement #17) */}
                          <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex flex-col items-center justify-end my-2">
                            {/* Bow bounces on top */}
                            <motion.div
                              className="absolute top-0 z-30 flex items-center justify-center"
                              animate={
                                isHovered && !prefersReducedMotion
                                  ? {
                                      y: [-3, -9, -3],
                                      rotate: [-8, 8, -8],
                                      scale: 1.15,
                                    }
                                  : { y: 0, rotate: 0, scale: 1 }
                              }
                              transition={{
                                duration: 0.8,
                                repeat: isHovered ? Infinity : 0,
                                ease: 'easeInOut',
                              }}
                            >
                              <div className={`text-3xl sm:text-4xl ${g.bowColor} drop-shadow-sm`}>
                                🎀
                              </div>
                            </motion.div>

                            {/* Lid lifts with spring physics when hovered */}
                            <motion.div
                              className={`relative w-28 sm:w-32 lg:w-36 h-7 sm:h-8 rounded-lg ${g.lidColor} shadow-md z-20 flex items-center justify-center border-t border-white/40`}
                              animate={
                                isHovered && !prefersReducedMotion
                                  ? { y: -8, rotate: -3 }
                                  : { y: 0, rotate: 0 }
                              }
                              transition={{ type: 'spring', stiffness: 280, damping: 14 }}
                            >
                              <div className={`w-4 sm:w-5 h-full ${g.ribbonColor} shadow-inner`} />
                            </motion.div>

                            {/* Body lifts slightly */}
                            <motion.div
                              animate={
                                isHovered && !prefersReducedMotion
                                  ? { y: -3 }
                                  : { y: 0 }
                              }
                              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                              className={`w-24 sm:w-28 lg:w-32 h-20 sm:h-22 lg:h-24 rounded-b-xl bg-gradient-to-b ${g.color} shadow-lg z-10 relative flex items-center justify-center overflow-hidden border-b-2 border-black/10`}
                            >
                              <div className={`w-4 sm:w-5 h-full ${g.ribbonColor} shadow-sm`} />
                              <div className={`absolute w-full h-4 sm:h-5 ${g.ribbonColor} shadow-sm`} />

                              <span className="absolute top-2 left-2 text-[10px] opacity-60">✦</span>
                              <span className="absolute bottom-3 right-3 text-[10px] opacity-60">✦</span>
                            </motion.div>

                            {/* Shadow beneath box widens as box lifts */}
                            <motion.div
                              className="h-2.5 sm:h-3 bg-purple-950/20 rounded-full blur-[4px] -mt-1 z-0"
                              animate={
                                isHovered && !prefersReducedMotion
                                  ? { width: '92%', opacity: 0.75, scaleY: 1.2 }
                                  : { width: '70%', opacity: 0.5, scaleY: 1 }
                              }
                              transition={{ duration: 0.35, ease: EASE_OUT }}
                            />

                            {/* Sparkles burst from behind box on hover */}
                            {isHovered && !prefersReducedMotion && (
                              <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
                                {['✨', '⭐', '✨', '💫'].map((s, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="absolute text-sm sm:text-base"
                                    style={{
                                      left: `${20 + idx * 20}%`,
                                      top: '30%',
                                    }}
                                    initial={{ opacity: 0, y: 0, scale: 0.4 }}
                                    animate={{
                                      opacity: [0, 1, 0],
                                      y: [-4, -36 - idx * 6],
                                      scale: [0.4, 1.2, 0.8],
                                    }}
                                    transition={{
                                      duration: 1.2,
                                      delay: idx * 0.1,
                                      repeat: Infinity,
                                      repeatDelay: 0.5,
                                      ease: 'easeOut',
                                    }}
                                  >
                                    {s}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Label */}
                          <div className="mt-4 sm:mt-5 font-caveat font-bold text-xl sm:text-2xl text-[#602d9c] group-hover:text-purple-900 transition-colors">
                            {g.label}
                          </div>

                          <div className="text-[10px] sm:text-[11px] text-purple-600/80 font-poppins mt-0.5">
                            {g.hint}
                          </div>

                          {/* CTA hint with spring micro-interaction */}
                          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-poppins font-bold text-purple-700/90 uppercase tracking-[0.14em] group-hover:text-purple-900 transition-colors">
                            <span>Tap to unwrap</span>
                            <motion.span
                              animate={isHovered ? { rotate: [-15, 15, -15], scale: 1.2 } : {}}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="text-sm"
                            >
                              🎁
                            </motion.span>
                          </div>
                        </div>
                      </motion.button>
                    </TiltCard>
                  );
                })}
              </div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-5 sm:mt-7 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                ✨ Each box holds a heartfelt birthday surprise
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}