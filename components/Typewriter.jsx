'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Custom hook to type out text character-by-character at 45ms per character.
 * Supports chaining via `active` flag and `onComplete` callback.
 * Degrades gracefully when prefersReducedMotion is enabled.
 */
export function useTypewriter(text = '', options = {}) {
  const {
    speed = 45,
    delay = 150,
    active = true,
    onComplete = null,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : '');
  const [isTyping, setIsTyping] = useState(!prefersReducedMotion && active);
  const [isComplete, setIsComplete] = useState(prefersReducedMotion);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const skipToEnd = useCallback(() => {
    setDisplayText(text);
    setIsTyping(false);
    setIsComplete(true);
    if (onCompleteRef.current) onCompleteRef.current();
  }, [text]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsTyping(false);
      setIsComplete(true);
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    if (!active || !text) {
      return;
    }

    setDisplayText('');
    setIsComplete(false);
    setIsTyping(true);

    let currentIndex = 0;
    let timer = null;
    let delayTimer = null;

    delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        currentIndex++;
        setDisplayText(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          clearInterval(timer);
          setIsTyping(false);
          setIsComplete(true);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay, active, prefersReducedMotion]);

  return { displayText, isTyping, isComplete, skipToEnd };
}

/**
 * Reusable Typewriter Component
 * Renders animated text with a soft glowing blinking cursor.
 */
export default function Typewriter({
  text = '',
  speed = 45,
  delay = 150,
  active = true,
  onComplete,
  className = '',
  as = 'span',
  cursor = true,
  cursorClassName = 'text-purple-500 font-normal',
  showCursorWhenDone = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const { displayText, isTyping, isComplete, skipToEnd } = useTypewriter(text, {
    speed,
    delay,
    active,
    onComplete,
  });

  const Component = motion[as] || motion.span;

  if (prefersReducedMotion) {
    const PlainTag = as;
    return <PlainTag className={className}>{text}</PlainTag>;
  }

  return (
    <Component
      onClick={skipToEnd}
      className={`inline-block cursor-pointer select-none ${className}`}
      title="Click to reveal full text"
    >
      <span>{displayText}</span>
      {cursor && (isTyping || (showCursorWhenDone && isComplete)) && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
          className={`inline-block ml-0.5 font-mono select-none ${cursorClassName}`}
          aria-hidden="true"
        >
          |
        </motion.span>
      )}
    </Component>
  );
}
