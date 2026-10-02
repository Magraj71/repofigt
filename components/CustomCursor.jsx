'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom glowing cursor trailing the mouse with spring smoothing.
 * On desktop only. Disabled on mobile/touch and when prefersReducedMotion is active.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring smoothing for weighted trailing motion
  const springX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect fine pointer (mouse)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasPointer);

    if (!hasPointer || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, prefersReducedMotion]);

  if (!isPointerDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer soft glowing halo */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/35 via-fuchsia-400/30 to-pink-500/35 blur-xl pointer-events-none"
      />
      {/* Inner sparkling orb */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-4 h-4 rounded-full bg-gradient-to-tr from-purple-400/80 via-pink-300/90 to-yellow-200/90 shadow-[0_0_12px_rgba(168,85,247,0.7)] pointer-events-none border border-white/60"
      />
    </div>
  );
}
