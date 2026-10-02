'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function MemoryMuseum({ onNext, photos, onOpenUpload }) {
  const prefersReducedMotion = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  const closeRef = useRef(null);

  const memories = [
    {
      id: 1,
      image: photos?.memory1 || '/images/memory1.jpg',
      caption: 'That unforgettable class',
      rotate: '-rotate-2',
      tapeColor: 'washi-tape-yellow',
      floatDur: 5.2,
      floatAmp: 6,
    },
    {
      id: 2,
      image: photos?.memory2 || '/images/memory2.jpg',
      caption: 'Before the exam panic',
      rotate: 'rotate-3',
      tapeColor: 'washi-tape-pink',
      floatDur: 6.0,
      floatAmp: 5,
    },
    {
      id: 3,
      image: photos?.memory3 || '/images/memory3.jpg',
      caption: 'Learning + laughing',
      rotate: '-rotate-3',
      tapeColor: 'washi-tape',
      floatDur: 4.8,
      floatAmp: 7,
    },
    {
      id: 4,
      image: photos?.memory4 || '/images/memory4.jpg',
      caption: 'One for the memories',
      rotate: 'rotate-2',
      tapeColor: 'washi-tape-yellow',
      floatDur: 5.8,
      floatAmp: 5,
    },
    {
      id: 5,
      image: photos?.memory5 || '/images/memory5.jpg',
      caption: 'Classroom chaos 😂',
      rotate: '-rotate-1',
      tapeColor: 'washi-tape-pink',
      floatDur: 5.4,
      floatAmp: 6,
    },
    {
      id: 6,
      image: photos?.teacher || '/images/teacher.jpg',
      caption: "Moments I'll cherish forever",
      rotate: 'rotate-2',
      tapeColor: 'washi-tape',
      floatDur: 6.2,
      floatAmp: 5,
    },
  ];

  const markBroken = useCallback((id) => {
    setBrokenImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const nextPhoto = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % memories.length));
  }, [memories.length]);
  const prevPhoto = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + memories.length) % memories.length));
  }, [memories.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextPhoto();
      else if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, closeLightbox, nextPhoto, prevPhoto]);

  const selectedMemory = selectedIndex !== null ? memories[selectedIndex] : null;

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
            className="w-full bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-4 sm:p-8 lg:p-12 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] text-center relative overflow-hidden"
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
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/70 text-purple-800 text-[10px] sm:text-xs font-extrabold tracking-[0.14em] uppercase mb-3 font-poppins shadow-sm"
                >
                  <span>🏛️</span>
                  <span>Handmade Gallery</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins tracking-tight uppercase leading-[1.1]"
                >
                  <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                    <Typewriter text="Museum of Memories" delay={150} speed={45} />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: EASE_OUT }}
                  className="text-sm sm:text-lg font-caveat font-bold text-[#8349c7] mt-2"
                >
                  A few moments worth keeping forever.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-4"
                >
                  <button
                    type="button"
                    onClick={onOpenUpload}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-xl hover:bg-white text-purple-800 text-[11px] sm:text-xs font-poppins font-bold border border-white/70 shadow-[0_8px_24px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_12px_32px_-10px_rgba(139,92,246,0.7)] hover:scale-[1.03] active:scale-95 transition-all touch-manipulation"
                  >
                    <span>📷</span>
                    <span>Upload / Replace Real Photos</span>
                  </button>
                </motion.div>
              </div>

              {/* ---------------- 3D TILT + INDEPENDENT FLOATING POLAROIDS (Requirement #3, #16) ---------------- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 my-4 sm:my-6">
                {memories.map((m, i) => (
                  <TiltCard
                    key={m.id}
                    maxTilt={13}
                    breathe={false}
                    scaleOnHover={1.04}
                    className="rounded-lg"
                  >
                    {/* Independent floating loop for each polaroid (Requirement #16) */}
                    <motion.div
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                      animate={{
                        opacity: 1,
                        y: prefersReducedMotion
                          ? 0
                          : [-m.floatAmp, m.floatAmp, -m.floatAmp],
                      }}
                      transition={{
                        opacity: { delay: 0.35 + i * 0.1, duration: 0.5 },
                        y: {
                          duration: m.floatDur,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedIndex(i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedIndex(i);
                        }
                      }}
                      className={`polaroid-card cursor-pointer transform ${m.rotate} relative group transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-purple-300/70 focus-visible:ring-offset-2 rounded-md hover:shadow-[0_22px_45px_-10px_rgba(110,65,160,0.45)]`}
                      aria-label={`Open ${m.caption}`}
                    >
                      {/* Washi tape on polaroid top */}
                      <div
                        className={`washi-tape ${m.tapeColor} -top-2 left-1/2 -translate-x-1/2 rotate-[-1deg] w-14 sm:w-16 h-3.5 sm:h-4`}
                      />

                      {/* Photo */}
                      <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-purple-100 border border-slate-200">
                        {!brokenImages[m.id] ? (
                          <img
                            src={m.image}
                            alt={m.caption}
                            loading="lazy"
                            onError={() => markBroken(m.id)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 p-3 text-center">
                            <span className="text-3xl mb-1">📸</span>
                            <span className="font-caveat font-bold text-base sm:text-lg leading-tight">
                              {m.caption}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Caption */}
                      <div className="mt-2.5 sm:mt-3 text-center">
                        <p className="font-caveat font-bold text-xl sm:text-2xl text-[#4a2373] tracking-wide">
                          {m.caption}
                        </p>
                        <span className="inline-block text-[10px] text-purple-500 font-poppins opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                          Click to enlarge 🔍
                        </span>
                      </div>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>

              {/* CTA button with spring micro-interaction */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: EASE_OUT }}
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
                    <span>ONE LAST THING</span>
                    <motion.span
                      animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-base sm:text-lg"
                    >
                      💜
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="mt-6 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
              >
                6 moments · kept forever
              </motion.p>
            </div>
          </motion.div>
        </TiltCard>
      </div>

      {/* Lightbox Modal with spring physics */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/95 backdrop-blur-2xl p-3 sm:p-5 pb-5 sm:pb-7 rounded-[24px] sm:rounded-[28px] max-w-[min(94vw,720px)] w-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] cursor-default border border-white/70"
            >
              {/* Close */}
              <button
                ref={closeRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close preview"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 h-9 w-9 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 touch-manipulation"
              >
                ✕
              </button>

              {/* Counter */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-[10px] sm:text-xs font-poppins font-bold shadow-md backdrop-blur-sm">
                {selectedIndex + 1} / {memories.length}
              </div>

              {/* Photo */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 mt-2">
                {!brokenImages[selectedMemory.id] ? (
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-purple-700 p-4 text-center">
                    <span className="text-5xl mb-2">📸</span>
                    <span className="font-caveat font-bold text-2xl">
                      {selectedMemory.caption}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mt-3 sm:mt-4 text-center font-caveat font-bold text-xl sm:text-3xl text-purple-900">
                {selectedMemory.caption}
              </div>

              {/* Nav arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                aria-label="Previous photo"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/90 hover:bg-white text-purple-800 flex items-center justify-center shadow-lg border border-purple-200 transition-all hover:scale-105 active:scale-95 touch-manipulation"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                aria-label="Next photo"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/90 hover:bg-white text-purple-800 flex items-center justify-center shadow-lg border border-purple-200 transition-all hover:scale-105 active:scale-95 touch-manipulation"
              >
                ›
              </button>

              <p className="hidden sm:block mt-3 text-center text-[10px] text-purple-400 font-poppins tracking-wider">
                Use ← → to navigate · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}