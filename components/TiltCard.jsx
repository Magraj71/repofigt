'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * 3D Tilt Card with Framer Motion spring physics.
 * Tilts in 3D toward the cursor (capped at 10-14 degrees).
 * Resets smoothly when cursor leaves.
 * Includes optional breathing idle loop (3-5px on 6-8s loop)
 * and diagonal shimmer sweep every 4-6 seconds.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 12, // 10-14 degrees cap
  scaleOnHover = 1.02,
  shimmer = true,
  breathe = true,
  breatheDuration = 7,
  breatheDistance = 4,
  disabled = false,
  style = {},
  onClick,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -1 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs with stiffness between 180-260 and damping between 16-22
  const springConfig = { stiffness: 220, damping: 18 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback((e) => {
    if (disabled || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Value between -0.5 and 0.5
    const normalizedX = mouseX / width - 0.5;
    const normalizedY = mouseY / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  }, [disabled, prefersReducedMotion, x, y]);

  const handleMouseEnter = () => {
    if (!disabled && !prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion || disabled) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={`relative ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1100 }}
      className="relative inline-block w-full"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...style,
        }}
        animate={
          breathe && !isHovered
            ? {
                y: [-breatheDistance / 2, breatheDistance / 2, -breatheDistance / 2],
              }
            : {
                y: isHovered ? -2 : 0,
              }
        }
        transition={
          breathe && !isHovered
            ? {
                y: {
                  duration: breatheDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : {
                y: { duration: 0.3, ease: 'easeOut' },
              }
        }
        whileHover={{
          scale: scaleOnHover,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        className={`relative ${className} overflow-hidden`}
        {...props}
      >
        {children}

        {/* Shimmer sweep: sweeps diagonally across glass cards every 5 seconds */}
        {shimmer && (
          <motion.div
            className="pointer-events-none absolute -inset-full w-[250%] h-[250%] z-20"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%)',
              transform: 'rotate(25deg)',
            }}
            animate={{
              x: ['-120%', '160%'],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 4.5,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}
