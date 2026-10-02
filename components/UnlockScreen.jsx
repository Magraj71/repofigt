'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function UnlockScreen({
  onSuccess,
  onError,
  teacherPhoto,
  teacherName,
  passcode,
  onOpenUpload,
}) {
  const prefersReducedMotion = useReducedMotion();

  const [pin, setPin] = useState('');
  const [imgError, setImgError] = useState(false);
  const [shake, setShake] = useState(false);
  const [keyPressShake, setKeyPressShake] = useState(0);
  const [photoDeveloped, setPhotoDeveloped] = useState(false);
  const pinLength = passcode?.length || 4;

  // Trigger real-time photo development simulation over 2 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      setPhotoDeveloped(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleKeyPress = useCallback(
    (val) => {
      setPin((prev) => {
        if (prev.length >= pinLength) return prev;
        // Trigger small micro-shake through keypad on keypress
        setKeyPressShake((s) => s + 1);
        return prev + val;
      });
    },
    [pinLength]
  );

  const handleBackspace = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
    setKeyPressShake((s) => s + 1);
  }, []);

  const handleClear = useCallback(() => {
    setPin('');
    setKeyPressShake((s) => s + 1);
  }, []);

  const handleEnter = useCallback(() => {
    if (pin === passcode) {
      onSuccess();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 550);
      onError();
    }
  }, [pin, passcode, onSuccess, onError]);

  /* Auto-submit when PIN is full */
  useEffect(() => {
    if (pin.length === pinLength) {
      const t = setTimeout(() => handleEnter(), 260);
      return () => clearTimeout(t);
    }
  }, [pin, pinLength, handleEnter]);

  /* Physical keyboard support */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') handleKeyPress(e.key);
      else if (e.key === '*' || e.key === '#') handleKeyPress(e.key);
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Enter') handleEnter();
      else if (e.key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleBackspace, handleEnter, handleClear]);

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['#', '0', '*'],
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-6 sm:px-6 sm:py-10 lg:p-8 select-none overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: prefersReducedMotion ? 0 : 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="relative z-10 w-full max-w-[min(96vw,980px)] bg-white/85 backdrop-blur-2xl rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-5 sm:p-8 lg:p-10 border border-white/70 shadow-[0_30px_80px_-22px_rgba(110,65,160,0.42)] overflow-hidden"
      >
        {/* Inner sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

        {/* Diagonal shimmer sweep */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-full w-[250%] h-[250%] z-20"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%)',
              transform: 'rotate(25deg)',
            }}
            animate={{ x: ['-120%', '160%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {/* Decorative washi tapes */}
        <div className="washi-tape washi-tape-yellow absolute -top-3 left-6 sm:left-10 rotate-[-4deg]" />
        <div className="washi-tape washi-tape-pink absolute -top-3 right-6 sm:right-10 rotate-[3deg]" />

        <div className="relative">
          {/* ---------------- Header with Typewriter ---------------- */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins leading-[1.05]"
            >
              <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
                <Typewriter text="unlock" delay={150} speed={55} />
              </span>{' '}
              <span className="inline-block font-caveat font-bold text-[#b07be0] italic transform -rotate-2 text-2xl sm:text-4xl lg:text-5xl align-middle">
                <Typewriter text="a birthday surprise" delay={650} speed={45} />
              </span>{' '}
              <motion.span
                animate={prefersReducedMotion ? {} : { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                className="inline-block text-2xl sm:text-4xl align-middle"
              >
                🎂
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5, ease: EASE_OUT }}
              className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-purple-700/80 font-poppins font-medium inline-flex items-center gap-1.5"
            >
              <Typewriter
                text="made with love for your birthday, from Chhavi"
                delay={1500}
                speed={35}
              />
              <motion.span
                animate={prefersReducedMotion ? {} : { scale: [1, 1.25, 1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                💜
              </motion.span>
            </motion.p>
          </div>

          {/* ---------------- Content Grid ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* LEFT: Photo with Real-time Photo Develop & Breathing Frame */}
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.2 }}
              className="md:col-span-5 flex flex-col items-center justify-center relative"
            >
              <TiltCard maxTilt={10} breathe={true} breatheDistance={4} className="flex flex-col items-center">
                {/* Scalloped circular frame */}
                <div className="relative w-40 h-40 xs:w-44 xs:h-44 sm:w-60 sm:h-60 flex items-center justify-center">
                  {/* Rotating scalloped border */}
                  <svg
                    className={`absolute inset-0 w-full h-full text-[#9c71d9] drop-shadow-md ${
                      prefersReducedMotion ? '' : 'animate-[spin_45s_linear_infinite]'
                    }`}
                    viewBox="0 0 200 200"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M100 0 C108 0 115 10 120 12 C128 15 137 12 143 17 C150 22 153 32 158 39 C164 45 174 46 178 54 C182 62 180 72 182 81 C185 89 193 95 194 104 C195 113 189 121 187 130 C186 139 190 148 186 156 C182 164 172 167 167 174 C162 181 160 191 153 196 C146 201 137 197 129 200 C122 203 114 212 105 212 C96 212 88 203 81 200 C73 197 64 201 57 196 C50 191 48 181 43 174 C38 167 28 164 24 156 C20 148 24 139 23 130 C21 121 15 113 16 104 C17 95 25 89 28 81 C30 72 28 62 32 54 C36 46 46 45 52 39 C57 32 60 22 67 17 C73 12 82 15 90 12 C95 10 102 0 100 0 Z"
                      transform="scale(0.92) translate(8, 8)"
                    />
                  </svg>

                  {/* Inner photo: Starts blurred & faded and develops into full clarity over 2 seconds */}
                  <div className="relative z-10 w-32 h-32 xs:w-36 xs:h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-[3px] sm:border-4 border-white shadow-inner bg-[#f6ecff] flex items-center justify-center group">
                    {!imgError ? (
                      <motion.img
                        src={teacherPhoto}
                        alt={teacherName}
                        onError={() => setImgError(true)}
                        initial={
                          prefersReducedMotion
                            ? {}
                            : { filter: 'blur(14px) contrast(65%) saturate(40%) brightness(125%)', opacity: 0.6 }
                        }
                        animate={{
                          filter: 'blur(0px) contrast(100%) saturate(100%) brightness(100%)',
                          opacity: 1,
                        }}
                        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <span className="text-3xl mb-1">🎂</span>
                        <span className="font-caveat font-bold text-base text-purple-800">
                          {teacherName}
                        </span>
                        <span className="text-[9px] text-purple-600 font-poppins">Birthday VIP</span>
                      </div>
                    )}

                    {/* Developing polaroid badge effect */}
                    {!photoDeveloped && !prefersReducedMotion && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-0 bg-amber-100/30 backdrop-blur-[2px]"
                      />
                    )}

                    {/* Upload overlay */}
                    <button
                      type="button"
                      onClick={onOpenUpload}
                      className="absolute inset-0 bg-purple-900/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-[10px] sm:text-xs font-poppins font-bold gap-1 cursor-pointer touch-manipulation"
                      title="Upload real photo"
                      aria-label="Change photo"
                    >
                      <span className="text-lg sm:text-xl">📷</span>
                      <span>Change Photo</span>
                    </button>
                  </div>
                </div>

                {/* Party cat sticker with gentle wobble */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [-2, 2, -2],
                          rotate: [-3, 3, -3],
                        }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.92 }}
                  className="absolute -bottom-2 -right-1 sm:bottom-0 sm:right-2 z-20 flex flex-col items-center filter drop-shadow-md cursor-pointer"
                  title="Happy Birthday Teacher!"
                  aria-hidden="true"
                >
                  <div className="relative">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 -mb-2 ml-4 relative z-10 transform -rotate-12">
                      <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-transparent border-r-[10px] sm:border-r-[12px] border-r-transparent border-b-[20px] sm:border-b-[24px] border-b-[#2563eb] relative">
                        <span className="absolute -top-1 left-[1px] text-[7px] sm:text-[8px] text-yellow-300">⭐</span>
                        <span className="absolute top-2 left-[-5px] text-[5px] sm:text-[6px] text-yellow-200">★</span>
                        <span className="absolute top-3 left-[2px] text-[6px] sm:text-[7px] text-yellow-300">★</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center text-xl sm:text-2xl overflow-hidden relative">
                      🐱
                    </div>
                  </div>
                </motion.div>

                {/* Caption + upload link */}
                <div className="mt-4 text-center flex flex-col items-center gap-1.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-100/80 text-purple-800 font-caveat font-bold text-base sm:text-lg border border-purple-200/70 shadow-sm">
                    🎂 Birthday Special: {teacherName}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenUpload}
                    className="text-[11px] sm:text-xs text-purple-700 hover:text-purple-900 underline font-poppins flex items-center gap-1 font-semibold touch-manipulation hover:scale-105 transition-transform"
                  >
                    <span>📷 Upload Real Photo</span>
                  </button>
                </div>
              </TiltCard>
            </motion.div>

            {/* RIGHT: Keypad card with 3D Tilt, Keypress Shake, and Spring Digits */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.3 }}
              className="md:col-span-7 flex justify-center w-full"
            >
              <TiltCard maxTilt={11} breathe={false} className="w-full max-w-[min(94vw,400px)]">
                <motion.div
                  key={keyPressShake}
                  animate={
                    shake && !prefersReducedMotion
                      ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                      : keyPressShake > 0 && !prefersReducedMotion
                      ? { x: [-2, 2, -1, 1, 0] }
                      : { x: 0 }
                  }
                  transition={{
                    duration: shake ? 0.5 : 0.18,
                    ease: 'easeInOut',
                  }}
                  className="w-full bg-gradient-to-br from-[#fff8db] to-[#fff3d1] border-[3px] sm:border-4 border-dashed border-[#b694ea] rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 shadow-[0_16px_40px_-18px_rgba(110,65,160,0.4)] relative"
                >
                  {/* Card title with typewriter */}
                  <div className="text-center mb-3 sm:mb-4">
                    <h2 className="text-base sm:text-lg font-extrabold font-poppins text-[#6a3da3] tracking-wide">
                      <Typewriter text="Enter passcode" delay={400} speed={40} />
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-purple-700/80 font-poppins mt-0.5">
                      Hint: Birthday passcode ({passcode})
                    </p>
                  </div>

                  {/* PIN boxes with spring pop */}
                  <div className="flex justify-center items-center gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
                    {Array.from({ length: pinLength }).map((_, index) => {
                      const isFilled = pin.length > index;
                      const isCurrent = pin.length === index;
                      return (
                        <motion.div
                          key={index}
                          animate={{
                            scale: isFilled ? 1.12 : isCurrent ? 1.05 : 1,
                            backgroundColor: isFilled ? '#8c5cd6' : '#ffffff',
                            borderColor: isCurrent ? '#a855f7' : '#8c5cd6',
                          }}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0.1 }
                              : { type: 'spring', stiffness: 400, damping: 20 }
                          }
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-2 flex items-center justify-center shadow-sm"
                        >
                          {isFilled ? (
                            <motion.span
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full block shadow-sm"
                            />
                          ) : isCurrent && pin.length < pinLength ? (
                            <motion.span
                              animate={prefersReducedMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                              className="w-1.5 h-1.5 rounded-full bg-purple-400 block"
                            />
                          ) : null}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Keypad grid with spring micro-interactions */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    {keys.map((row, rIdx) =>
                      row.map((digit) => (
                        <motion.button
                          key={`${rIdx}-${digit}`}
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : {
                                  scale: 1.06,
                                  y: -2,
                                  boxShadow: '0 8px 16px -4px rgba(124, 58, 237, 0.25)',
                                  transition: { type: 'spring', stiffness: 260, damping: 14 },
                                }
                          }
                          whileTap={{ scale: 0.94 }}
                          type="button"
                          onClick={() => handleKeyPress(digit)}
                          className="h-11 sm:h-12 rounded-xl bg-white text-[#5c2d91] font-poppins font-bold text-base sm:text-lg border border-purple-200 shadow-sm hover:border-purple-300 hover:bg-purple-50 flex items-center justify-center transition-colors touch-manipulation"
                          aria-label={`Digit ${digit}`}
                        >
                          {digit}
                        </motion.button>
                      ))
                    )}
                  </div>

                  {/* Bottom actions */}
                  <div className="flex items-stretch gap-2">
                    <motion.button
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              scale: 1.04,
                              y: -2,
                              transition: { type: 'spring', stiffness: 260, damping: 14 },
                            }
                      }
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={handleBackspace}
                      className="flex-1 h-11 sm:h-12 rounded-full bg-white text-purple-800 font-poppins text-[11px] sm:text-xs font-bold border border-purple-200 hover:bg-purple-50 hover:border-purple-300 shadow-sm transition-colors touch-manipulation flex items-center justify-center gap-1"
                      aria-label="Backspace"
                    >
                      <span className="text-sm">⌫</span>
                      <span>BACK</span>
                    </motion.button>

                    <motion.button
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              scale: 1.05,
                              y: -2,
                              boxShadow: '0 16px 36px -8px rgba(122,72,187,1)',
                              transition: { type: 'spring', stiffness: 260, damping: 14 },
                            }
                      }
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={handleEnter}
                      disabled={pin.length === 0}
                      className="group relative flex-[1.4] h-11 sm:h-12 rounded-full text-white font-poppins text-xs sm:text-sm font-extrabold tracking-wide shadow-[0_10px_26px_-10px_rgba(122,72,187,0.9)] transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none touch-manipulation flex items-center justify-center gap-1.5"
                      aria-label="Enter passcode"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                      <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                      <span className="relative flex items-center gap-1.5">
                        <span>ENTER</span>
                        <motion.span
                          animate={prefersReducedMotion ? {} : { rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-sm"
                        >
                          ✨
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>

                  {/* Hint footer */}
                  <p className="mt-3 text-center text-[10px] sm:text-[11px] font-poppins text-purple-500/80">
                    Tip: type on your keyboard too —{' '}
                    <span className="font-bold">0-9</span>,{' '}
                    <span className="font-bold">Enter</span>,{' '}
                    <span className="font-bold">Esc</span>
                  </p>
                </motion.div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}