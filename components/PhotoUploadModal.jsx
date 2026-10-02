'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1];

const TABS = [
  { key: 'teacher', label: 'Teacher Photo', icon: '🎂' },
  { key: 'memories', label: 'Museum', icon: '📸' },
  { key: 'info', label: 'Name', icon: '✏️' },
];

export default function PhotoUploadModal({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onResetPhotos,
  teacherName,
  onUpdateTeacherName,
}) {
  const prefersReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState('teacher');
  const [tempName, setTempName] = useState(teacherName);
  const [dragKey, setDragKey] = useState(null);
  const modalRef = useRef(null);
  const firstFocusRef = useRef(null);

  const memoryKeys = [
    { key: 'memory1', label: 'Memory Photo 1', caption: 'That unforgettable class' },
    { key: 'memory2', label: 'Memory Photo 2', caption: 'Before the exam panic' },
    { key: 'memory3', label: 'Memory Photo 3', caption: 'Learning + laughing' },
    { key: 'memory4', label: 'Memory Photo 4', caption: 'One for the memories' },
    { key: 'memory5', label: 'Memory Photo 5', caption: 'Classroom chaos 😂' },
  ];

  /* ---------------- Keep tempName synced when modal opens ---------------- */
  useEffect(() => {
    if (isOpen) setTempName(teacherName);
  }, [isOpen, teacherName]);

  /* ---------------- ESC to close + focus trap ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();

      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const nodes = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Focus first interactive element
    setTimeout(() => firstFocusRef.current?.focus(), 60);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  /* ---------------- File handling ---------------- */
  const processFile = useCallback(
    (key, file) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Please pick an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo is a bit large! Please pick an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result;
        if (typeof dataUrl === 'string') onUpdatePhoto(key, dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onUpdatePhoto]
  );

  const handleFileUpload = (key, event) => {
    const file = event.target.files?.[0];
    processFile(key, file);
    event.target.value = '';
  };

  const handleDrop = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragKey(null);
    const file = e.dataTransfer.files?.[0];
    processFile(key, file);
  };

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    onUpdateTeacherName(tempName.trim());
    alert('Teacher name updated!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-md select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[min(100vw,540px)] bg-white/90 backdrop-blur-2xl rounded-t-[28px] sm:rounded-[32px] p-5 sm:p-7 border-t border-x sm:border border-white/70 shadow-[0_-10px_60px_-15px_rgba(110,65,160,0.5)] sm:shadow-[0_30px_80px_-22px_rgba(110,65,160,0.55)] max-h-[92dvh] sm:max-h-[88dvh] flex flex-col overflow-hidden"
          >
            {/* Inner sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/50" />

            {/* Mobile grab handle */}
            <div className="sm:hidden mx-auto mb-3 h-1.5 w-10 rounded-full bg-purple-200" aria-hidden="true" />

            {/* Washi tape */}
            <div className="washi-tape washi-tape-yellow absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg] hidden sm:block" />

            <div className="relative flex flex-col flex-1 min-h-0">

              {/* ---------------- Header ---------------- */}
              <div className="flex items-start justify-between gap-3 border-b-2 border-dashed border-purple-200/80 pb-3 mb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex-none flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white text-lg shadow-md">
                    📸
                  </span>
                  <div className="min-w-0">
                    <h2
                      id="upload-modal-title"
                      className="text-base sm:text-xl font-extrabold font-poppins bg-gradient-to-r from-purple-700 to-fuchsia-600 bg-clip-text text-transparent leading-tight truncate"
                    >
                      Upload Real Photos
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-purple-600/90 font-poppins leading-snug">
                      Swap in real pictures of your teacher &amp; memories
                    </p>
                  </div>
                </div>

                <button
                  ref={firstFocusRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex-none h-9 w-9 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-sm transition-all hover:scale-105 active:scale-95 touch-manipulation"
                >
                  ✕
                </button>
              </div>

              {/* ---------------- Tabs ---------------- */}
              <div className="relative flex gap-1 mb-4 bg-purple-50/80 p-1 rounded-2xl border border-purple-200/70">
                {TABS.map((tab) => {
                  const active = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative flex-1 py-2 rounded-xl font-poppins font-bold text-[11px] sm:text-xs transition-colors touch-manipulation ${
                        active ? 'text-white' : 'text-purple-700 hover:text-purple-900'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="tab-pill"
                          transition={{ duration: 0.35, ease: EASE_OUT }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-md"
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-1">
                        <span>{tab.icon}</span>
                        <span className="hidden xs:inline">{tab.label}</span>
                        <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ---------------- Content ---------------- */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs font-poppins min-h-0">

                {/* TAB 1: TEACHER PHOTO */}
                <AnimatePresence mode="wait">
                  {activeTab === 'teacher' && (
                    <motion.div
                      key="tab-teacher"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="space-y-3"
                    >
                      <p className="text-purple-800 leading-relaxed">
                        This photo appears in the{' '}
                        <strong className="text-purple-900">scalloped frame</strong> on the unlock
                        screen and the <strong className="text-purple-900">polaroid museum</strong>.
                      </p>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragKey('teacher');
                        }}
                        onDragLeave={() => setDragKey(null)}
                        onDrop={(e) => handleDrop('teacher', e)}
                        className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-colors ${
                          dragKey === 'teacher'
                            ? 'bg-purple-100/70 border-purple-400'
                            : 'bg-gradient-to-br from-purple-50/80 to-pink-50/60 border-purple-200'
                        }`}
                      >
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-white ring-1 ring-purple-200">
                          <img
                            src={photos.teacher}
                            alt="Teacher"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-xs hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all shadow-md touch-manipulation">
                            <span>📁</span>
                            <span>Choose Teacher Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('teacher', e)}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[10px] text-purple-600 mt-2 leading-relaxed">
                            JPG, PNG, or WEBP · or drag &amp; drop · max 5MB
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: MEMORIES */}
                  {activeTab === 'memories' && (
                    <motion.div
                      key="tab-memories"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="space-y-3"
                    >
                      <p className="text-purple-800 leading-relaxed">
                        Upload classroom memories, event photos, or fun moments with your teacher:
                      </p>

                      {memoryKeys.map((item, i) => (
                        <motion.div
                          key={item.key}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.03 * i, duration: 0.3, ease: EASE_OUT }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragKey(item.key);
                          }}
                          onDragLeave={() => setDragKey(null)}
                          onDrop={(e) => handleDrop(item.key, e)}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-colors ${
                            dragKey === item.key
                              ? 'bg-purple-100/70 border-purple-400'
                              : 'bg-gradient-to-br from-purple-50/80 to-pink-50/60 border-purple-200/80'
                          }`}
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-white ring-1 ring-purple-200">
                            <img
                              src={photos[item.key]}
                              alt={item.label}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-purple-900 block text-[11px] sm:text-xs truncate">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-purple-600 font-caveat text-sm block truncate">
                              &ldquo;{item.caption}&rdquo;
                            </span>
                          </div>

                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 hover:border-purple-400 font-bold text-[10px] sm:text-[11px] transition-all shadow-sm flex-shrink-0 hover:scale-105 active:scale-95 touch-manipulation">
                            Replace
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(item.key, e)}
                              className="hidden"
                            />
                          </label>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: TEACHER INFO */}
                  {activeTab === 'info' && (
                    <motion.div
                      key="tab-info"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="teacher-name-input"
                          className="block text-purple-900 font-bold mb-1.5 text-xs"
                        >
                          Teacher&apos;s Full Name / Salutation:
                        </label>
                        <div className="flex flex-col xs:flex-row gap-2">
                          <input
                            id="teacher-name-input"
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                            placeholder="e.g. Professor Vance or Mrs. Sharma"
                            className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-purple-200 bg-white text-purple-900 font-medium text-xs focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-purple-300"
                          />
                          <button
                            type="button"
                            onClick={handleSaveName}
                            disabled={!tempName.trim() || tempName === teacherName}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-xs hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md touch-manipulation"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200/70 text-purple-800 text-[11px] leading-relaxed shadow-inner">
                        <span className="font-bold">💡 Tip:</span> All uploaded photos and changes are
                        automatically saved right in your browser. You can test and view them instantly!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ---------------- Footer ---------------- */}
              <div className="border-t border-purple-100 pt-3 mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onResetPhotos}
                  className="text-[10px] sm:text-[11px] font-poppins font-bold text-red-500 hover:text-red-700 underline decoration-red-200 underline-offset-2 transition-colors touch-manipulation"
                >
                  Reset to Sample Photos
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="group relative px-5 sm:px-6 py-2.5 rounded-full text-white font-poppins font-bold text-xs shadow-[0_10px_24px_-10px_rgba(122,72,187,0.85)] hover:shadow-[0_14px_32px_-10px_rgba(122,72,187,1)] transition-all overflow-hidden touch-manipulation"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#7a48bb] via-[#b76ee8] to-[#7a48bb] bg-[length:220%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
                  <span className="absolute inset-0 rounded-full border-2 border-white/25" />
                  <span className="relative flex items-center gap-1.5">
                    <span>Done</span>
                    <span className="text-sm">✨</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}