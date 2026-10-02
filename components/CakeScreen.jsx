'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Confetti from '@/components/Confetti';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function CakeScreen({ onOpenGift, teacherName }) {
  const prefersReducedMotion = useReducedMotion();
  const [blown, setBlown] = useState(false);
  const [extinguishedFlames, setExtinguishedFlames] = useState([false, false, false]);
  const [cakeBouncing, setCakeBouncing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micSupported, setMicSupported] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  /* Check mic support */
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
      setMicSupported(true);
    }
  }, []);

  /* Sequential extinguishing with cake bounce & confetti */
  const handleBlowCandles = useCallback(() => {
    if (blown) return;
    setBlown(true);

    // Flame 0 extinguishes
    setExtinguishedFlames([true, false, false]);

    // Flame 1 extinguishes after 180ms
    setTimeout(() => {
      setExtinguishedFlames([true, true, false]);
    }, 180);

    // Flame 2 extinguishes after 360ms
    setTimeout(() => {
      setExtinguishedFlames([true, true, true]);
      // Cake physically bounces when all flames are out
      setCakeBouncing(true);
      setShowConfetti(true);
      setTimeout(() => setCakeBouncing(false), 900);
    }, 360);

    // Turn off mic if active
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      setMicActive(false);
    }
  }, [blown]);

  /* Real-time Microphone Blow Detection (Requirement #22) */
  const toggleMicDetection = async () => {
    if (micActive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setMicActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setMicActive(true);

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Breath / blow energy threshold
        if (average > 55) {
          handleBlowCandles();
          return;
        }
        animFrameRef.current = requestAnimationFrame(detectBlow);
      };

      animFrameRef.current = requestAnimationFrame(detectBlow);
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      setMicActive(false);
    }
  };

  // Cleanup mic on unmount
  useEffect(() => {
    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-8 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* Real-time confetti burst */}
      <Confetti active={showConfetti} />

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

      <div className="relative z-10 w-full max-w-[min(94vw,660px)]">
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
            <div className="washi-tape washi-tape-yellow absolute -top-3 left-6 sm:left-10 rotate-[-3deg]" />
            <div className="washi-tape washi-tape-pink absolute -top-3 right-6 sm:right-10 rotate-[2deg]" />

            <div className="relative">
              {/* Header with Typewriter */}
              <motion.h1
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-poppins leading-[1.15] tracking-tight mb-2"
              >
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                  <Typewriter text="Make a birthday wish" delay={150} speed={45} />
                </span>{' '}
                <motion.span
                  animate={prefersReducedMotion ? {} : { rotate: [0, -14, 14, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  ✨
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease: EASE_OUT }}
                className="text-xs xs:text-sm sm:text-base text-purple-700/80 font-poppins mb-5 sm:mb-7 max-w-md mx-auto leading-relaxed"
              >
                Close your eyes, make a special wish, and blow the candles for{' '}
                <span className="font-bold text-purple-800">{teacherName}</span>!
              </motion.p>

              {/* ---------------- REAL-TIME CAKE & INDEPENDENT FLICKER CANDLES (Requirement #12) ---------------- */}
              <div className="relative flex flex-col items-center justify-center my-4 sm:my-6 min-h-[240px] sm:min-h-[280px]">
                {/* Real-time floating orbiting sparkles around cake (Requirement #15) */}
                {!prefersReducedMotion && (
                  <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
                    {[
                      { left: '10%', top: '15%', delay: 0, symbol: '✦', color: 'text-amber-400' },
                      { left: '85%', top: '20%', delay: 0.7, symbol: '✨', color: 'text-purple-400' },
                      { left: '16%', top: '70%', delay: 1.4, symbol: '⭐', color: 'text-yellow-400' },
                      { left: '80%', top: '75%', delay: 2.1, symbol: '✦', color: 'text-fuchsia-400' },
                      { left: '50%', top: '2%', delay: 1.0, symbol: '💫', color: 'text-pink-400' },
                    ].map((s, i) => (
                      <motion.span
                        key={i}
                        className={`absolute text-sm sm:text-base ${s.color}`}
                        style={{ left: s.left, top: s.top }}
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1.25, 0.8],
                          y: [-4, 4, -4],
                          rotate: [-15, 15, -15],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: s.delay,
                        }}
                      >
                        {s.symbol}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Cake Plate */}
                <div className="absolute bottom-0 w-56 sm:w-72 h-3.5 sm:h-4 bg-gradient-to-r from-[#eddffc] via-[#f6ecff] to-[#eddffc] border-2 border-[#bfa2e8] rounded-full shadow-md z-0" />
                <div className="absolute bottom-[-8px] w-24 sm:w-28 h-2.5 sm:h-3 bg-[#dbc5f6] border border-[#ab89dc] rounded-b-xl z-0" />

                {/* Candles Container */}
                <div className="flex gap-6 sm:gap-10 mb-[-4px] z-20">
                  {[0, 1, 2].map((i) => {
                    const isExtinguished = extinguishedFlames[i];
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <AnimatePresence mode="wait">
                          {!isExtinguished ? (
                            <motion.div
                              key="flame"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                                ...(prefersReducedMotion
                                  ? {}
                                  : {
                                      // Real-time asynchronous continuous flicker
                                      scaleY: [1, 1.18, 0.92, 1.12, 1],
                                      scaleX: [1, 0.94, 1.08, 0.96, 1],
                                      y: [0, -1.8, 0.8, -1.2, 0],
                                      rotate: [-2, 3, -1, 2, -2],
                                    }),
                              }}
                              exit={{ scale: 0, opacity: 0, y: -16 }}
                              transition={{
                                default: { duration: 0.4, ease: EASE_OUT },
                                scaleY: {
                                  duration: 0.65 + i * 0.15, // unique non-sync flicker rate
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.23,
                                },
                                scaleX: {
                                  duration: 0.75 + i * 0.12,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.18,
                                },
                                y: {
                                  duration: 0.7 + i * 0.14,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.2,
                                },
                                rotate: {
                                  duration: 0.85 + i * 0.1,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.15,
                                },
                              }}
                              className="relative mb-[-2px] origin-bottom"
                            >
                              {/* Pulsing flame halo */}
                              <div
                                className="absolute inset-0 -m-2 rounded-full bg-gradient-to-t from-orange-400/60 via-amber-300/50 to-yellow-200/40 blur-md pointer-events-none"
                                aria-hidden="true"
                              />
                              <div className="relative w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_14px_#fbbf24]" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="smoke"
                              initial={{ opacity: 0.9, y: 0, scale: 0.5, x: 0 }}
                              animate={{ opacity: 0, y: -34, scale: 1.8, x: (i - 1) * 6 }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                              className="text-gray-400 text-sm sm:text-base pointer-events-none"
                            >
                              ☁️
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Wick */}
                        <div className="w-0.5 h-1.5 sm:h-2 bg-slate-800" />

                        {/* Candle body */}
                        <div
                          className={`w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-sm shadow-sm border border-purple-300/80 ${
                            i === 1 ? 'bg-[#d8b4fe]' : i === 0 ? 'bg-[#fbcfe8]' : 'bg-[#fef08a]'
                          }`}
                        >
                          <div className="w-full h-1.5 sm:h-2 bg-white/40 my-1 rotate-12" />
                          <div className="w-full h-1.5 sm:h-2 bg-white/40 my-1 rotate-12" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cake structure with physical bounce when flames go out */}
                <motion.div
                  animate={
                    cakeBouncing && !prefersReducedMotion
                      ? {
                          y: [0, -18, 6, -3, 0],
                          scale: [1, 1.07, 0.97, 1.02, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.7, type: 'spring', stiffness: 240, damping: 14 }}
                  className="flex flex-col items-center z-10"
                >
                  {/* Layer 1 (top) */}
                  <div className="w-28 sm:w-40 h-11 sm:h-14 bg-gradient-to-b from-[#fde2e4] to-[#f8cdd3] rounded-t-2xl border-2 border-[#e8a5b8] relative overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="w-full h-4 sm:h-5 bg-white rounded-b-xl border-b-2 border-[#e8a5b8] flex justify-around">
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full -mb-1 shadow-sm" />
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full -mb-1.5 shadow-sm" />
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full -mb-1 shadow-sm" />
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full -mb-1.5 shadow-sm" />
                    </div>
                    <div className="flex justify-around px-2 text-[7px] sm:text-[8px] opacity-75">
                      <span>🍬</span>
                      <span>✨</span>
                      <span>🍓</span>
                    </div>
                  </div>

                  {/* Layer 2 (middle) */}
                  <div className="w-40 sm:w-52 h-13 sm:h-16 bg-gradient-to-b from-[#e0ccf8] to-[#d1b8f1] border-2 border-[#b290df] relative overflow-hidden shadow-sm flex flex-col justify-between -mt-1">
                    <div className="w-full h-5 sm:h-6 bg-white rounded-b-xl border-b-2 border-[#b290df] flex justify-around">
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full -mb-1.5 shadow-sm" />
                      <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full -mb-2 shadow-sm" />
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full -mb-1.5 shadow-sm" />
                      <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full -mb-2 shadow-sm" />
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full -mb-1.5 shadow-sm" />
                    </div>
                    <div className="flex justify-around px-3 text-[9px] sm:text-[10px] text-purple-700 font-bold opacity-85">
                      <span>★</span>
                      <span>⭐</span>
                      <span>★</span>
                      <span>⭐</span>
                    </div>
                  </div>

                  {/* Layer 3 (base) */}
                  <div className="w-52 sm:w-64 h-13 sm:h-16 bg-gradient-to-b from-[#fff2b2] to-[#fce588] rounded-b-xl border-2 border-[#d9bf59] relative overflow-hidden shadow-md flex flex-col justify-between -mt-1">
                    <div className="w-full h-5 sm:h-6 bg-white rounded-b-xl border-b-2 border-[#d9bf59] flex justify-around">
                      <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full -mb-2 shadow-sm" />
                      <span className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full -mb-1.5 shadow-sm" />
                      <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full -mb-2 shadow-sm" />
                      <span className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full -mb-1.5 shadow-sm" />
                      <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full -mb-2 shadow-sm" />
                    </div>
                    <div className="text-center pb-1 text-[10px] sm:text-[12px] font-caveat font-bold text-amber-800 px-2 truncate">
                      🎂 Happy Birthday, {teacherName}!
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Area */}
              <AnimatePresence mode="wait">
                {!blown ? (
                  <motion.div
                    key="before-blow"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: EASE_OUT }}
                    className="mt-4 sm:mt-5 flex flex-col items-center gap-3"
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
                      onClick={handleBlowCandles}
                      className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_34px_-10px_rgba(122,72,187,0.85)] transition-all overflow-hidden touch-manipulation"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                      <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                      <span className="relative flex items-center justify-center gap-2">
                        <span>BLOW THE CANDLES</span>
                        <motion.span
                          animate={prefersReducedMotion ? {} : { rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                          className="text-base sm:text-lg"
                        >
                          🕯️
                        </motion.span>
                      </span>
                    </motion.button>

                    {/* Microphone Blow Detection Toggle (Requirement #22) */}
                    {micSupported && (
                      <button
                        type="button"
                        onClick={toggleMicDetection}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-poppins font-semibold border transition-all ${
                          micActive
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse'
                            : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        <span>{micActive ? '🎙️ Listening: Blow on your mic!' : '🎙️ Or Blow Into Your Microphone'}</span>
                      </button>
                    )}

                    <p className="text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80">
                      Tap button or blow into mic · Then open your gift 🎁
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after-blow"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className="mt-4 sm:mt-5 space-y-4"
                  >
                    {/* Wish granted chip */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 18 }}
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-amber-100/80 border border-purple-200/70 text-[#6b21a8] font-caveat font-bold text-xl sm:text-2xl lg:text-3xl shadow-sm"
                    >
                      <span>Birthday wish granted!</span>
                      <motion.span
                        animate={prefersReducedMotion ? {} : { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                      >
                        🎂
                      </motion.span>
                    </motion.div>

                    {/* Gift CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: EASE_OUT }}
                    >
                      <motion.button
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : {
                                scale: 1.05,
                                y: -3,
                                boxShadow: '0 20px 48px -10px rgba(139,82,212,1)',
                                transition: { type: 'spring', stiffness: 260, damping: 14 },
                              }
                        }
                        whileTap={{ scale: 0.94 }}
                        type="button"
                        onClick={onOpenGift}
                        className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-[0_14px_34px_-10px_rgba(139,82,212,0.9)] transition-all overflow-hidden touch-manipulation"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#8c52d4] via-[#b378e8] to-[#8c52d4] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                        <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                        <span className="relative flex items-center justify-center gap-2">
                          <span>OPEN YOUR BIRTHDAY GIFT</span>
                          <motion.span
                            animate={prefersReducedMotion ? {} : { rotate: [0, -14, 14, 0], scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-base sm:text-lg"
                          >
                            🎁
                          </motion.span>
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Footer caption */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="pt-2 text-[10px] sm:text-[11px] font-poppins font-semibold tracking-[0.18em] uppercase text-purple-400/80"
                    >
                      🎉 Something special awaits
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}