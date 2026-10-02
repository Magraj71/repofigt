'use client';

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Hook providing weighted spring-smoothed parallax coordinates for mouse (desktop)
 * and device tilt (mobile).
 * Background drifts the most, decorations drift medium, content drifts least.
 */
export function useParallax() {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth springs for weighted, non-twitchy motion
  const springConfig = { stiffness: 120, damping: 18 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      rawX.set(normX);
      rawY.set(normY);
    };

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-to-right tilt in degrees [-90, 90]
        // beta is front-to-back tilt in degrees [-180, 180]
        const normX = Math.max(-0.5, Math.min(0.5, (e.gamma || 0) / 60));
        const normY = Math.max(-0.5, Math.min(0.5, ((e.beta || 0) - 45) / 60));
        rawX.set(normX * 0.6); // Reduced intensity on mobile
        rawY.set(normY * 0.6);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [rawX, rawY, prefersReducedMotion]);

  // Different layer drift ranges:
  // Background drifts the most (up to 32px)
  const bgX = useTransform(smoothX, [-0.5, 0.5], isMobile ? [-14, 14] : [-32, 32]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], isMobile ? [-14, 14] : [-32, 32]);

  // Floating decor drifts medium (up to 18px)
  const decorX = useTransform(smoothX, [-0.5, 0.5], isMobile ? [-8, 8] : [-18, 18]);
  const decorY = useTransform(smoothY, [-0.5, 0.5], isMobile ? [-8, 8] : [-18, 18]);

  // Content cards drift the least (up to 6px)
  const contentX = useTransform(smoothX, [-0.5, 0.5], isMobile ? [-3, 3] : [-6, 6]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], isMobile ? [-3, 3] : [-6, 6]);

  return { bgX, bgY, decorX, decorY, contentX, contentY, isMobile };
}
