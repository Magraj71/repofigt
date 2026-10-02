'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import FloatingDecorations from '@/components/FloatingDecorations';
import MusicButton from '@/components/MusicButton';
import PhotoUploadModal from '@/components/PhotoUploadModal';
import ProgressBar from '@/components/ProgressBar';
import CustomCursor from '@/components/CustomCursor';
import TiltCard from '@/components/TiltCard';
import Typewriter from '@/components/Typewriter';
import { useParallax } from '@/hooks/useParallax';
import UnlockScreen from '@/components/UnlockScreen';
import WrongPassword from '@/components/WrongPassword';
import SurpriseQuestion from '@/components/SurpriseQuestion';
import CelebrationScreen from '@/components/CelebrationScreen';
import CakeScreen from '@/components/CakeScreen';
import GiftScreen from '@/components/GiftScreen';
import GiftReveal from '@/components/GiftReveal';
import TeacherMessage from '@/components/TeacherMessage';
import FunTeacherScreen from '@/components/FunTeacherScreen';
import MemoryMuseum from '@/components/MemoryMuseum';
import FinalMessage from '@/components/FinalMessage';
import { surpriseConfig } from '@/config/surprise';

/* ---------------- Paper-unfold page transitions (Requirement #7) ---------------- */
const paperUnfoldVariants = {
  initial: {
    opacity: 0,
    scaleY: 0.6,
    scaleX: 0.98,
    y: 20,
    filter: 'blur(10px)',
    transformOrigin: 'top center',
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    y: 0,
    filter: 'blur(0px)',
    transformOrigin: 'top center',
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 140,
      damping: 18,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.6,
    scaleX: 0.98,
    y: -20,
    filter: 'blur(8px)',
    transformOrigin: 'bottom center',
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function Screen({ children }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : paperUnfoldVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full min-h-[100dvh]"
    >
      {children}
    </motion.div>
  );
}

export default function SurpriseApp() {
  const prefersReducedMotion = useReducedMotion();
  const [currentScreen, setCurrentScreen] = useState('unlock');
  const [selectedGift, setSelectedGift] = useState(1);
  const [photos, setPhotos] = useState(surpriseConfig.photos);
  const [teacherName, setTeacherName] = useState(surpriseConfig.teacherName);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Parallax coordinates for weighted mouse / device tilt drift (Requirement #2)
  const { bgX, bgY, isMobile } = useParallax();

  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('teacher_surprise_custom_photos');
      if (savedPhotos) {
        setPhotos((prev) => ({ ...prev, ...JSON.parse(savedPhotos) }));
      }
      const savedName = localStorage.getItem('teacher_surprise_custom_name');
      if (savedName && savedName !== 'Professor Vance' && savedName !== 'Professor Jonathan Vance') {
        setTeacherName(savedName);
      }
    } catch {}
  }, []);

  const handleUpdatePhoto = (key, dataUrl) => {
    setPhotos((prev) => {
      const updated = { ...prev, [key]: dataUrl };
      try {
        localStorage.setItem('teacher_surprise_custom_photos', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleUpdateTeacherName = (newName) => {
    if (!newName) return;
    setTeacherName(newName);
    try {
      localStorage.setItem('teacher_surprise_custom_name', newName);
    } catch {}
  };

  const handleResetPhotos = () => {
    setPhotos(surpriseConfig.photos);
    setTeacherName(surpriseConfig.teacherName);
    try {
      localStorage.removeItem('teacher_surprise_custom_photos');
      localStorage.removeItem('teacher_surprise_custom_name');
    } catch {}
    alert('Reset to default sample photos.');
  };

  const handleResetAll = () => {
    setSelectedGift(1);
    setCurrentScreen('unlock');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full bg-scrapbook-stripes overflow-x-hidden font-poppins selection:bg-purple-200 selection:text-purple-900">
      {/* ---------------- REAL-TIME PROGRESS BAR (Requirement #21) ---------------- */}
      <ProgressBar currentScreen={currentScreen} />

      {/* ---------------- CUSTOM GLOWING CURSOR (Requirement #9) ---------------- */}
      <CustomCursor />

      {/* ---------------- CINEMATIC BLACK FADE BETWEEN SCENES (Requirement #8) ---------------- */}
      {!prefersReducedMotion && (
        <AnimatePresence>
          <motion.div
            key={`black-fade-${currentScreen}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-40 bg-black"
            aria-hidden="true"
          />
        </AnimatePresence>
      )}

      {/* ---------------- MOUSE / DEVICE TILT PARALLAX ORBS (Requirement #2) ---------------- */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: bgX, y: bgY }}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-[460px] w-[460px] rounded-full bg-purple-300/30 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-pink-300/25 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 h-[440px] w-[440px] rounded-full bg-yellow-200/30 blur-[130px]" />
      </motion.div>

      {/* Subtle Floating Scrapbook Icons with parallax */}
      <FloatingDecorations />

      {/* Floating Upload Photos Button with physics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 220, damping: 18 }}
        className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40"
      >
        <motion.button
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 14px 40px rgba(139,92,246,0.35)',
                  transition: { type: 'spring', stiffness: 260, damping: 14 },
                }
          }
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/85 backdrop-blur-xl text-purple-800 border border-white/70 shadow-[0_8px_30px_rgba(139,92,246,0.18)] font-poppins text-[11px] sm:text-xs font-bold select-none touch-manipulation ring-1 ring-purple-100"
          title="Upload real photos of your teacher"
          aria-label="Upload real photos"
        >
          <span className="relative flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[11px] sm:text-sm shadow-inner transition-transform group-hover:rotate-12 group-hover:scale-110">
            📷
          </span>
          <span className="hidden sm:inline tracking-wide">Upload Real Photos</span>
          <span className="sm:hidden tracking-wide">Photos</span>
        </motion.button>
      </motion.div>

      <MusicButton />

      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUpdatePhoto}
        onResetPhotos={handleResetPhotos}
        teacherName={teacherName}
        onUpdateTeacherName={handleUpdateTeacherName}
      />

      {/* Screen Sequence with Paper-Unfold Transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === 'unlock' && (
          <Screen key="screen-unlock">
            <UnlockScreen
              onSuccess={() => setCurrentScreen('question')}
              onError={() => setCurrentScreen('wrong-password')}
              teacherPhoto={photos.teacher}
              teacherName={teacherName}
              passcode={surpriseConfig.passcode}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </Screen>
        )}

        {currentScreen === 'wrong-password' && (
          <Screen key="screen-wrong-password">
            <WrongPassword onRetry={() => setCurrentScreen('unlock')} />
          </Screen>
        )}

        {currentScreen === 'question' && (
          <Screen key="screen-question">
            <SurpriseQuestion onYes={() => setCurrentScreen('celebration')} />
          </Screen>
        )}

        {currentScreen === 'celebration' && (
          <Screen key="screen-celebration">
            <CelebrationScreen
              onContinue={() => setCurrentScreen('cake')}
              teacherName={teacherName}
            />
          </Screen>
        )}

        {currentScreen === 'cake' && (
          <Screen key="screen-cake">
            <CakeScreen
              onOpenGift={() => setCurrentScreen('gift')}
              teacherName={teacherName}
            />
          </Screen>
        )}

        {currentScreen === 'gift' && (
          <Screen key="screen-gift">
            <GiftScreen
              onSelectGift={(id) => {
                setSelectedGift(id);
                setCurrentScreen('gift-reveal');
              }}
            />
          </Screen>
        )}

        {currentScreen === 'gift-reveal' && (
          <Screen key="screen-gift-reveal">
            <GiftReveal
              selectedGift={selectedGift}
              onReadMessage={() => setCurrentScreen('message')}
            />
          </Screen>
        )}

        {currentScreen === 'message' && (
          <Screen key="screen-message">
            <TeacherMessage
              onNext={() => setCurrentScreen('fun')}
              teacherName={teacherName}
              studentName={surpriseConfig.studentName}
            />
          </Screen>
        )}

        {currentScreen === 'fun' && (
          <Screen key="screen-fun">
            <FunTeacherScreen onNext={() => setCurrentScreen('museum')} />
          </Screen>
        )}

        {currentScreen === 'museum' && (
          <Screen key="screen-museum">
            <MemoryMuseum
              onNext={() => setCurrentScreen('final')}
              photos={photos}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </Screen>
        )}

        {currentScreen === 'final' && (
          <Screen key="screen-final">
            <FinalMessage onNext={() => setCurrentScreen('replay')} />
          </Screen>
        )}

        {/* SCREEN 12: REPLAY SCREEN */}
        {currentScreen === 'replay' && (
          <Screen key="screen-replay">
            <div className="relative z-10 min-h-[100dvh] w-full flex items-center justify-center px-4 py-10 sm:px-6">
              <div className="relative w-full max-w-[min(94vw,580px)]">
                {/* Glow behind card */}
                <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-purple-400/30 via-pink-300/20 to-yellow-200/30 blur-2xl" />

                <TiltCard maxTilt={8} breathe={true} className="w-full">
                  <div className="relative bg-white/85 backdrop-blur-2xl rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 border border-white/70 shadow-[0_25px_70px_-15px_rgba(110,65,160,0.35)] text-center overflow-hidden">
                    {/* Inner soft sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-purple-50/40" />

                    {/* Washi tape accents */}
                    <div className="washi-tape washi-tape-yellow absolute -top-3 left-8 sm:left-12 rotate-[-4deg]" />
                    <div className="washi-tape washi-tape-pink absolute -top-3 right-8 sm:right-12 rotate-[5deg]" />

                    <div className="relative">
                      {/* Icon badge with wobble and bounce */}
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 14 }}
                        className="mx-auto mb-5 sm:mb-6 relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 blur-md opacity-80" />
                        <motion.div
                          animate={prefersReducedMotion ? {} : { rotate: [-4, 4, -4], scale: [1, 1.08, 1] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative text-4xl sm:text-5xl"
                        >
                          🎂
                        </motion.div>
                        <motion.span
                          animate={prefersReducedMotion ? {} : { y: [-2, 3, -2], rotate: [-10, 10, -10] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -top-1 -right-1 text-xl sm:text-2xl"
                        >
                          🎉
                        </motion.span>
                      </motion.div>

                      <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug font-poppins mb-3">
                        <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                          <Typewriter text="Would you like to replay" delay={150} speed={45} />
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-pink-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                          <Typewriter text="your birthday surprise?" delay={950} speed={45} />
                        </span>
                      </h2>

                      <p className="text-xs sm:text-sm text-purple-700/75 font-poppins mb-7 sm:mb-9 leading-relaxed max-w-sm mx-auto">
                        Relive the cake, wishes, memories, and gifts — anytime you want. 💜
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
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
                          onClick={handleResetAll}
                          className="group relative w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-poppins font-bold text-sm shadow-[0_10px_30px_-8px_rgba(122,72,187,0.7)] transition-all overflow-hidden touch-manipulation"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#9a5fd6] to-[#7a48bb] bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                          <span className="absolute inset-0 border-2 border-white/30 rounded-full" />
                          <span className="relative flex items-center justify-center gap-2 tracking-wide">
                            <span>YES, REPLAY</span>
                            <span className="text-base">✨</span>
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : {
                                  scale: 1.05,
                                  y: -3,
                                  boxShadow: '0 16px 36px -8px rgba(168,85,247,0.3)',
                                  transition: { type: 'spring', stiffness: 260, damping: 14 },
                                }
                          }
                          whileTap={{ scale: 0.94 }}
                          type="button"
                          onClick={handleResetAll}
                          className="group relative w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[#6b21a8] font-poppins font-bold text-sm bg-white/90 hover:bg-white border-2 border-purple-200 hover:border-purple-300 shadow-sm transition-all touch-manipulation"
                        >
                          <span className="flex items-center justify-center gap-2 tracking-wide">
                            <span>ONE MORE TIME</span>
                            <span className="text-base transition-transform group-hover:rotate-12">🎂</span>
                          </span>
                        </motion.button>
                      </div>

                      {/* Footer hint */}
                      <p className="mt-6 sm:mt-7 text-[10px] sm:text-[11px] font-poppins text-purple-400/80 tracking-wide uppercase">
                        Made with 💜 just for you by {surpriseConfig.studentName}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </Screen>
        )}
      </AnimatePresence>
    </main>
  );
}