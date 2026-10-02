'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SCREEN_STEPS = {
  unlock: 1,
  'wrong-password': 1,
  question: 2,
  celebration: 3,
  cake: 4,
  gift: 5,
  'gift-reveal': 6,
  message: 7,
  fun: 8,
  museum: 9,
  final: 10,
  replay: 11,
};

const TOTAL_STEPS = 11;

export default function ProgressBar({ currentScreen = 'unlock' }) {
  const prefersReducedMotion = useReducedMotion();
  const currentStep = SCREEN_STEPS[currentScreen] || 1;
  const progressPercent = Math.min(100, Math.round((currentStep / TOTAL_STEPS) * 100));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Background track */}
      <div className="w-full h-1.5 sm:h-2 bg-purple-900/10 backdrop-blur-sm relative overflow-hidden">
        {/* Glowing spring progress fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-r-full shadow-[0_0_12px_rgba(217,70,239,0.8)] relative"
          initial={{ width: '9%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0.1 }
              : { type: 'spring', stiffness: 220, damping: 22 }
          }
        >
          {/* Leading sparkle orb */}
          {!prefersReducedMotion && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff] -mr-1"
            />
          )}
        </motion.div>
      </div>

      {/* Floating step pill badge */}
      <div className="flex justify-end px-4 sm:px-6 pt-2">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.8, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="pointer-events-auto px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/70 shadow-sm text-[10px] font-poppins font-bold text-purple-800 flex items-center gap-1.5"
        >
          <motion.span
            animate={prefersReducedMotion ? {} : { scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6 }}
            className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"
          />
          <span>{currentStep} / {TOTAL_STEPS}</span>
        </motion.div>
      </div>
    </div>
  );
}
