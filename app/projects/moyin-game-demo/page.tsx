'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Scene / Story Data
// ---------------------------------------------------------------------------

interface Choice {
  text: string;
  nextScene: string;
}

interface Scene {
  id: string;
  speaker: string;
  text: string;
  choices: Choice[];
  bg: string; // gradient background
}

const SCENES: Record<string, Scene> = {
  scene1: {
    id: 'scene1',
    speaker: 'Narrator',
    text: 'You find yourself in a mysterious library filled with ancient books. The air is thick with the scent of old parchment, and a soft, otherworldly glow emanates from somewhere deep within the shelves...',
    choices: [
      { text: 'Examine the glowing book', nextScene: 'scene2a' },
      { text: 'Look for an exit', nextScene: 'scene2b' },
    ],
    bg: 'from-indigo-950 via-purple-950 to-slate-950',
  },
  scene2a: {
    id: 'scene2a',
    speaker: 'Narrator',
    text: 'You reach out and touch the glowing book. It opens on its own, pages fluttering in an invisible breeze. Ancient text rearranges itself before your eyes, revealing a detailed map to a hidden garden beyond the library walls...',
    choices: [{ text: 'Follow the map', nextScene: 'scene3' }],
    bg: 'from-violet-950 via-indigo-950 to-blue-950',
  },
  scene2b: {
    id: 'scene2b',
    speaker: 'Narrator',
    text: 'You navigate through the towering bookshelves, searching for a way out. At last, you find a heavy wooden door -- but it is locked. Carved into its surface is an intricate puzzle: rotating rings of symbols that seem to pulse with faint light...',
    choices: [{ text: 'Solve the puzzle', nextScene: 'scene3' }],
    bg: 'from-slate-950 via-gray-900 to-zinc-950',
  },
  scene3: {
    id: 'scene3',
    speaker: 'Narrator',
    text: 'You step through into a breathtaking garden bathed in moonlight. Cherry blossom petals drift gently through the cool night air, landing softly on a stone path that winds towards a serene pond. The stars above seem brighter here, as if the garden exists closer to the heavens...',
    choices: [{ text: 'Play again', nextScene: 'scene1' }],
    bg: 'from-purple-950 via-fuchsia-950 to-pink-950',
  },
};

// ---------------------------------------------------------------------------
// Sakura Petals
// ---------------------------------------------------------------------------

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  sway: number;
}

function useSakuraPetals(count: number): Petal[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.4,
      sway: -30 + Math.random() * 60,
    }));
  }, [count]);
}

function SakuraPetals({ petals }: { petals: Petal[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.sway, -petal.sway / 2, petal.sway / 3],
            rotate: [0, 360, 720],
            opacity: [petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
            <path
              d="M10 0C10 0 14 6 14 10C14 14 10 16 10 16C10 16 6 14 6 10C6 6 10 0 10 0Z"
              fill="#ffc0d3"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Typewriter Hook
// ---------------------------------------------------------------------------

function useTypewriter(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fullTextRef = useRef(text);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const skipToEnd = useCallback(() => {
    clearTimer();
    setDisplayedText(fullTextRef.current);
    setIsTyping(false);
  }, [clearTimer]);

  useEffect(() => {
    fullTextRef.current = text;
    clearTimer();

    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);

    const tick = () => {
      indexRef.current += 1;
      const next = fullTextRef.current.slice(0, indexRef.current);
      setDisplayedText(next);

      if (indexRef.current >= fullTextRef.current.length) {
        setIsTyping(false);
        timerRef.current = null;
        return;
      }

      const char = fullTextRef.current[indexRef.current - 1];
      let delay = speed;
      if ('.,;:'.includes(char)) delay = 120;
      if ('!?'.includes(char)) delay = 200;
      if (char === '\n') delay = 150;
      if (char === '\u2026') delay = 280; // ellipsis

      timerRef.current = setTimeout(tick, delay);
    };

    timerRef.current = setTimeout(tick, speed);

    return () => clearTimer();
  }, [text, speed, clearTimer]);

  return { displayedText, isTyping, skipToEnd };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoyinGameDemoPage() {
  const [currentSceneId, setCurrentSceneId] = useState('scene1');
  const [sceneKey, setSceneKey] = useState(0); // force re-render on scene change
  const scene = SCENES[currentSceneId];
  const petals = useSakuraPetals(7);

  const { displayedText, isTyping, skipToEnd } = useTypewriter(scene.text, 30);

  const handleChoice = useCallback(
    (nextScene: string) => {
      setCurrentSceneId(nextScene);
      setSceneKey((k) => k + 1);
    },
    [],
  );

  const handleDialogueClick = useCallback(() => {
    if (isTyping) {
      skipToEnd();
    }
  }, [isTyping, skipToEnd]);

  return (
    <section className="section-container min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-moyin-text-secondary hover:text-moyin-pink transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">Moyin-Game</span>
              <span className="text-moyin-text-secondary text-lg ml-3 font-normal">Visual Novel Engine</span>
            </h1>
            <p className="text-moyin-text-hint text-sm mt-1">AI-driven narrative system with dynamic storytelling</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Demo &mdash; Mock Data
            </span>
            <a
              href="https://github.com/AtsushiHarimoto/moyin-game"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-moyin-text-secondary hover:text-moyin-pink-light border border-white/10 hover:border-moyin-pink/30 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              Source
            </a>
          </div>
        </div>
      </motion.div>

      {/* Visual Novel Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06]"
        style={{ aspectRatio: '16/9', minHeight: 420 }}
      >
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${sceneKey}`}
            className={`absolute inset-0 bg-gradient-to-br ${scene.bg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtle texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Sakura petals (only on scene3) */}
        {currentSceneId === 'scene3' && <SakuraPetals petals={petals} />}

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Speaker name (top area) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`speaker-${sceneKey}`}
            className="absolute top-0 left-0 right-0 z-[10] p-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {scene.speaker && (
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
                <h2
                  className="text-sm md:text-base font-bold tracking-[0.15em] uppercase"
                  style={{
                    color: '#ffc0d3',
                    textShadow: '0 0 10px rgba(255,192,211,0.4), 0 0 20px rgba(255,192,211,0.2)',
                  }}
                >
                  {scene.speaker}
                </h2>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dialogue Box (bottom) */}
        <div
          className="absolute inset-x-0 bottom-0 z-[20] p-4 md:p-6 flex flex-col"
          onClick={handleDialogueClick}
          style={{ cursor: isTyping ? 'pointer' : 'default' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`dialogue-${sceneKey}`}
              className="glass-card p-5 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(26,22,37,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Top gradient line */}
              <div
                className="absolute inset-x-0 top-0 h-px opacity-50"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,192,211,0.5), transparent)',
                }}
              />

              {/* Text area */}
              <div
                className="text-sm md:text-base leading-[1.8] tracking-[0.02em] text-moyin-text-primary min-h-[60px]"
                aria-live="polite"
              >
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-0.5 h-4 bg-moyin-pink ml-0.5 animate-pulse align-text-bottom" />
                )}
              </div>

              {/* Next indicator when typing is done and there are no choices yet visible */}
              {!isTyping && scene.choices.length === 0 && (
                <div className="absolute bottom-3 right-4 text-moyin-pink animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}

              {/* Click hint */}
              {isTyping && (
                <div className="absolute bottom-2 right-3 text-[10px] text-moyin-text-muted opacity-60">
                  Click to skip
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Choice Buttons */}
          <AnimatePresence>
            {!isTyping && scene.choices.length > 0 && (
              <motion.div
                className="flex flex-col gap-3 mt-4 max-w-xl mx-auto w-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {scene.choices.map((choice, i) => (
                  <motion.button
                    key={`${currentSceneId}-${i}`}
                    type="button"
                    className="group relative w-full cursor-pointer overflow-hidden rounded-xl border px-6 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    style={{
                      borderColor: 'rgba(255,192,211,0.25)',
                      background: 'rgba(26,22,37,0.7)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoice(choice.nextScene);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Dot pattern overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,192,211,0.3) 1px, transparent 0)`,
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-moyin-pink/[0.04] to-moyin-purple/[0.04]" />

                    <div className="relative z-[1] flex items-center gap-3">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold"
                        style={{
                          borderColor: 'rgba(255,192,211,0.4)',
                          color: '#ffc0d3',
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm md:text-base font-medium text-moyin-text-primary leading-relaxed">
                        {choice.text}
                      </span>
                    </div>

                    {/* Right arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <svg className="w-4 h-4 text-moyin-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scene indicator (top-right) */}
        <div className="absolute top-4 right-4 z-[10]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-moyin-pink animate-pulse" />
            <span className="text-[10px] font-mono text-moyin-text-muted uppercase tracking-wider">
              Scene {currentSceneId.replace('scene', '').toUpperCase()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-moyin-text-muted">
          Click the dialogue box to skip typewriter animation. Choose an option to advance the story.
        </p>
      </motion.div>
    </section>
  );
}
