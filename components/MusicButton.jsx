'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1];

/* Soft pentatonic notes (C major / A minor) */
const PENTATONIC_NOTES = [261.63, 329.63, 392.0, 440.0, 523.25, 659.25];

export default function MusicButton() {
  const prefersReducedMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [source, setSource] = useState(null); // 'file' | 'synth' | null
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const [hasFailedFile, setHasFailedFile] = useState(false);

  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const volumeTimeoutRef = useRef(null);

  /* ---------------- Initialize audio element ---------------- */
  useEffect(() => {
    try {
      const audio = new Audio('/music/music.mp3');
      audio.loop = true;
      audio.volume = volume;

      audio.onerror = () => {
        setHasFailedFile(true);
        audioRef.current = null;
      };

      audioRef.current = audio;
    } catch {
      setHasFailedFile(true);
      audioRef.current = null;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Sync volume ---------------- */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* ---------------- Web Audio ambient synth fallback ---------------- */
  const startWebAudioMusic = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      const ctx = new AudioCtx();

      let step = 0;
      let timer = null;
      let stopped = false;

      const playNextChord = () => {
        if (stopped) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const note = PENTATONIC_NOTES[step % PENTATONIC_NOTES.length];
        step = (step + 1) % PENTATONIC_NOTES.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        const peak = 0.08 * (volume * 2); // synth respects user volume
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.001, peak), ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.9);

        timer = setTimeout(playNextChord, 800);
      };

      playNextChord();

      synthRef.current = {
        stop: () => {
          stopped = true;
          if (timer) clearTimeout(timer);
          try {
            ctx.close();
          } catch {}
        },
      };
      return true;
    } catch {
      return false;
    }
  }, [volume]);

  /* ---------------- Toggle ---------------- */
  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      // Stop
      if (audioRef.current) audioRef.current.pause();
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      setSource(null);
      setIsPlaying(false);
      return;
    }

    // Start — try file first, fallback to synth
    if (audioRef.current && !hasFailedFile) {
      audioRef.current
        .play()
        .then(() => {
          setSource('file');
          setIsPlaying(true);
        })
        .catch(() => {
          const ok = startWebAudioMusic();
          if (ok) {
            setSource('synth');
            setIsPlaying(true);
          }
        });
    } else {
      const ok = startWebAudioMusic();
      if (ok) {
        setSource('synth');
        setIsPlaying(true);
      }
    }
  }, [isPlaying, hasFailedFile, startWebAudioMusic]);

  /* ---------------- Volume popover auto-hide ---------------- */
  const revealVolume = useCallback(() => {
    setShowVolume(true);
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => setShowVolume(false), 3200);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2">

      {/* ---------------- Volume popover ---------------- */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="relative flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-[0_14px_38px_-12px_rgba(139,92,246,0.4)] px-3.5 py-2.5 font-poppins"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm text-purple-700" aria-hidden="true">
              {volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.75 ? '🔉' : '🔊'}
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                revealVolume();
              }}
              className="w-28 sm:w-32 h-1.5 accent-purple-600 cursor-pointer"
              aria-label="Volume"
            />
            <span className="text-[10px] tabular-nums text-purple-500/80 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Main pill ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE_OUT }}
        className="flex items-center gap-1.5"
      >
        {/* Volume toggle (small circle) */}
        <button
          type="button"
          onClick={revealVolume}
          aria-label="Adjust volume"
          title="Adjust volume"
          className={`group flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full backdrop-blur-xl border transition-all duration-300 touch-manipulation shadow-[0_10px_28px_-10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 ${
            showVolume
              ? 'bg-purple-600 border-purple-400 text-white'
              : 'bg-white/80 border-white/70 text-purple-700 hover:bg-white/95'
          }`}
        >
          <span className="text-sm sm:text-base">
            {volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.75 ? '🔉' : '🔊'}
          </span>
        </button>

        {/* Music pill */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          aria-pressed={isPlaying}
          title={isPlaying ? 'Pause music' : 'Play gentle music ♫'}
          className={`group relative flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 sm:pl-2 sm:pr-4 sm:py-2 rounded-full backdrop-blur-xl border transition-all duration-300 font-poppins text-[11px] sm:text-xs font-bold select-none touch-manipulation shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] hover:scale-[1.04] active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-white/40'
              : 'bg-white/80 hover:bg-white/95 text-purple-800 border-white/70'
          }`}
        >
          {/* Icon badge */}
          <span
            className={`relative flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-white/20 text-white'
                : 'bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white'
            }`}
          >
            <motion.span
              animate={
                isPlaying && !prefersReducedMotion
                  ? { rotate: [0, 8, -8, 0] }
                  : { rotate: 0 }
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-sm sm:text-base"
              aria-hidden="true"
            >
              ♫
            </motion.span>
          </span>

          <span className="hidden sm:inline tracking-wide whitespace-nowrap">
            {isPlaying ? 'Music ON' : 'Play Music'}
          </span>
          <span className="sm:hidden tracking-wide whitespace-nowrap">
            {isPlaying ? 'ON' : 'Music'}
          </span>

          {/* Equalizer bars */}
          {isPlaying && (
            <span className="flex gap-[3px] items-end h-3 ml-0.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-white/90"
                  animate={
                    prefersReducedMotion
                      ? { height: 8 }
                      : { height: [4, 12, 6, 10, 4] }
                  }
                  transition={{
                    duration: 1.1,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </span>
          )}
        </button>
      </motion.div>
    </div>
  );
}