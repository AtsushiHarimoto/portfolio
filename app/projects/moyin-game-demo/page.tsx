'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BackLink from '@/components/BackLink';

// ---------------------------------------------------------------------------
// Base Path Helper
// ---------------------------------------------------------------------------

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

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
  bgImage?: string; // optional background image path
  showCharacter?: boolean; // whether to show character sprite
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
    bgImage: `${basePath}/img/school.png`,
    showCharacter: true,
  },
  scene2a: {
    id: 'scene2a',
    speaker: 'Narrator',
    text: 'You reach out and touch the glowing book. It opens on its own, pages fluttering in an invisible breeze. Ancient text rearranges itself before your eyes, revealing a detailed map to a hidden garden beyond the library walls...',
    choices: [{ text: 'Follow the map', nextScene: 'scene3' }],
    bg: 'from-violet-950 via-indigo-950 to-blue-950',
    bgImage: `${basePath}/img/school.png`,
    showCharacter: true,
  },
  scene2b: {
    id: 'scene2b',
    speaker: 'Narrator',
    text: 'You navigate through the towering bookshelves, searching for a way out. At last, you find a heavy wooden door -- but it is locked. Carved into its surface is an intricate puzzle: rotating rings of symbols that seem to pulse with faint light...',
    choices: [{ text: 'Solve the puzzle', nextScene: 'scene3' }],
    bg: 'from-slate-950 via-gray-900 to-zinc-950',
    showCharacter: false,
  },
  scene3: {
    id: 'scene3',
    speaker: 'Narrator',
    text: 'You step through into a breathtaking garden bathed in moonlight. Cherry blossom petals drift gently through the cool night air, landing softly on a stone path that winds towards a serene pond. The stars above seem brighter here, as if the garden exists closer to the heavens...',
    choices: [{ text: 'Play again', nextScene: 'scene1' }],
    bg: 'from-purple-950 via-fuchsia-950 to-pink-950',
    showCharacter: true,
  },
};

// ---------------------------------------------------------------------------
// Backlog Entry
// ---------------------------------------------------------------------------

interface BacklogEntry {
  speaker: string;
  text: string;
  sceneId: string;
}

// ---------------------------------------------------------------------------
// Text Speed Config
// ---------------------------------------------------------------------------

type TextSpeedLabel = 'slow' | 'normal' | 'fast';

const TEXT_SPEED_MAP: Record<TextSpeedLabel, number> = {
  slow: 60,
  normal: 30,
  fast: 10,
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
// Toast Component
// ---------------------------------------------------------------------------

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2 px-6 py-3 rounded-xl border border-white/10 text-sm text-moyin-text-primary"
      style={{
        background: 'rgba(26,22,37,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      initial={{ opacity: 0, y: 20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 10, x: '-50%' }}
    >
      {message}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// System Menu Panel
// ---------------------------------------------------------------------------

interface SystemMenuProps {
  onClose: () => void;
  onSave: () => void;
  onLoad: () => void;
  onSettings: () => void;
  onBacklog: () => void;
  onTitle: () => void;
}

function SystemMenu({ onClose, onSave, onLoad, onSettings, onBacklog, onTitle }: SystemMenuProps) {
  const items = [
    { label: 'Save', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4', action: onSave },
    { label: 'Load', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', action: onLoad },
    { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', action: onSettings },
    { label: 'Backlog', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', action: onBacklog },
    { label: 'Title', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', action: onTitle },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="relative z-[1] w-[280px] rounded-2xl border border-white/[0.08] p-6"
        style={{
          background: 'rgba(26,22,37,0.9)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <h3
          className="text-sm font-bold tracking-[0.12em] uppercase mb-5 text-center"
          style={{ color: '#ffc0d3' }}
        >
          System Menu
        </h3>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.action();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-moyin-text-secondary hover:text-moyin-pink-light hover:bg-white/[0.04] transition-all duration-200 group"
            >
              <svg className="w-4 h-4 shrink-0 text-moyin-text-muted group-hover:text-moyin-pink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 text-xs text-moyin-text-muted hover:text-moyin-text-secondary transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Backlog Panel
// ---------------------------------------------------------------------------

function BacklogPanel({ entries, onClose }: { entries: BacklogEntry[]; onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(26,22,37,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      />

      {/* Header */}
      <div className="relative z-[1] flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <h3
          className="text-sm font-bold tracking-[0.12em] uppercase"
          style={{ color: '#ffc0d3' }}
        >
          Backlog
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-moyin-text-muted hover:text-moyin-pink transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable entries */}
      <div className="relative z-[1] flex-1 overflow-y-auto px-6 py-4">
        {entries.length === 0 ? (
          <p className="text-moyin-text-muted text-sm text-center mt-8">No history yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map((entry, i) => (
              <div key={i} className="flex flex-col gap-1 pb-4 border-b border-white/[0.04] last:border-b-0">
                <span
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{ color: '#ffc0d3' }}
                >
                  {entry.speaker}
                </span>
                <p className="text-sm leading-relaxed text-moyin-text-secondary">
                  {entry.text}
                </p>
                <span className="text-[10px] text-moyin-text-muted font-mono">
                  {entry.sceneId}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Settings Panel
// ---------------------------------------------------------------------------

interface SettingsPanelProps {
  onClose: () => void;
  textSpeed: TextSpeedLabel;
  onTextSpeedChange: (speed: TextSpeedLabel) => void;
  autoMode: boolean;
  onAutoModeChange: (enabled: boolean) => void;
  bgmVolume: number;
  onBgmVolumeChange: (v: number) => void;
  seVolume: number;
  onSeVolumeChange: (v: number) => void;
}

function SettingsPanel({
  onClose,
  textSpeed,
  onTextSpeedChange,
  autoMode,
  onAutoModeChange,
  bgmVolume,
  onBgmVolumeChange,
  seVolume,
  onSeVolumeChange,
}: SettingsPanelProps) {
  const speedOptions: TextSpeedLabel[] = ['slow', 'normal', 'fast'];

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="relative z-[1] w-[340px] rounded-2xl border border-white/[0.08] p-6"
        style={{
          background: 'rgba(26,22,37,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
      >
        <h3
          className="text-sm font-bold tracking-[0.12em] uppercase mb-6 text-center"
          style={{ color: '#ffc0d3' }}
        >
          Settings
        </h3>

        <div className="flex flex-col gap-5">
          {/* Text Speed */}
          <div>
            <label className="block text-xs text-moyin-text-muted uppercase tracking-wider mb-2">
              Text Speed
            </label>
            <div className="flex gap-2">
              {speedOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onTextSpeedChange(opt)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-200 border ${
                    textSpeed === opt
                      ? 'border-moyin-pink/50 text-moyin-pink-light bg-moyin-pink/10'
                      : 'border-white/[0.06] text-moyin-text-secondary hover:border-white/10 hover:text-moyin-text-primary'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Mode */}
          <div className="flex items-center justify-between">
            <label className="text-xs text-moyin-text-muted uppercase tracking-wider">
              Auto Mode
            </label>
            <button
              type="button"
              onClick={() => onAutoModeChange(!autoMode)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                autoMode ? 'bg-moyin-pink/60' : 'bg-white/10'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                  autoMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* BGM Volume */}
          <div>
            <label className="block text-xs text-moyin-text-muted uppercase tracking-wider mb-2">
              BGM Volume
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={bgmVolume}
              onChange={(e) => onBgmVolumeChange(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-moyin-pink"
              style={{
                background: `linear-gradient(to right, #ffc0d3 ${bgmVolume}%, rgba(255,255,255,0.1) ${bgmVolume}%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-moyin-text-muted mt-1">
              <span>0</span>
              <span>{bgmVolume}%</span>
              <span>100</span>
            </div>
          </div>

          {/* SE Volume */}
          <div>
            <label className="block text-xs text-moyin-text-muted uppercase tracking-wider mb-2">
              SE Volume
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={seVolume}
              onChange={(e) => onSeVolumeChange(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-moyin-pink"
              style={{
                background: `linear-gradient(to right, #ffc0d3 ${seVolume}%, rgba(255,255,255,0.1) ${seVolume}%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-moyin-text-muted mt-1">
              <span>0</span>
              <span>{seVolume}%</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl text-xs font-medium text-moyin-text-secondary border border-white/[0.08] hover:border-moyin-pink/30 hover:text-moyin-pink-light transition-all duration-200"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Save/Load Panel
// ---------------------------------------------------------------------------

function SaveLoadPanel({ mode, onClose }: { mode: 'save' | 'load'; onClose: () => void }) {
  const title = mode === 'save' ? 'Save Game' : 'Load Game';
  const slots = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="relative z-[1] w-[380px] rounded-2xl border border-white/[0.08] p-6"
        style={{
          background: 'rgba(26,22,37,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
      >
        <h3
          className="text-sm font-bold tracking-[0.12em] uppercase mb-5 text-center"
          style={{ color: '#ffc0d3' }}
        >
          {title}
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] py-5 px-3 hover:border-white/10 transition-all duration-200 group"
              style={{ background: 'rgba(255,255,255,0.02)' }}
              onClick={onClose}
            >
              <span className="text-moyin-text-muted text-xs font-mono">Slot {slot}</span>
              <span className="text-[10px] text-moyin-text-muted/60">No Data</span>
              <span className="text-moyin-text-muted/40 group-hover:text-moyin-text-muted/60 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-[10px] text-moyin-text-muted/60">
          Demo mode &mdash; save/load is not available
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl text-xs font-medium text-moyin-text-secondary border border-white/[0.08] hover:border-moyin-pink/30 hover:text-moyin-pink-light transition-all duration-200"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoyinGameDemoPage() {
  const [currentSceneId, setCurrentSceneId] = useState('scene1');
  const [sceneKey, setSceneKey] = useState(0); // force re-render on scene change
  const scene = SCENES[currentSceneId];
  const petals = useSakuraPetals(7);

  // Settings state
  const [textSpeed, setTextSpeed] = useState<TextSpeedLabel>('normal');
  const [autoMode, setAutoMode] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(80);
  const [seVolume, setSeVolume] = useState(80);

  // Panel state
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSaveLoad, setShowSaveLoad] = useState<'save' | 'load' | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Backlog
  const [backlog, setBacklog] = useState<BacklogEntry[]>([]);

  const { displayedText, isTyping, skipToEnd } = useTypewriter(
    scene.text,
    TEXT_SPEED_MAP[textSpeed],
  );

  // Auto mode timer
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current !== null) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  // Track scene changes for backlog
  const prevSceneKeyRef = useRef(sceneKey);
  useEffect(() => {
    if (sceneKey !== prevSceneKeyRef.current || sceneKey === 0) {
      // Add current scene text to backlog when we arrive at a new scene
      if (sceneKey === 0 && backlog.length === 0) {
        // First scene on mount
        setBacklog([{ speaker: scene.speaker, text: scene.text, sceneId: scene.id }]);
      } else if (sceneKey !== prevSceneKeyRef.current) {
        setBacklog((prev) => [...prev, { speaker: scene.speaker, text: scene.text, sceneId: scene.id }]);
      }
      prevSceneKeyRef.current = sceneKey;
    }
  }, [sceneKey, scene, backlog.length]);

  // Auto mode: advance after typewriter finishes
  useEffect(() => {
    clearAutoTimer();
    if (autoMode && !isTyping && scene.choices.length > 0) {
      // Only auto-advance if there is exactly 1 choice (to avoid selecting among multiple)
      // For multiple choices, user must click
      if (scene.choices.length === 1) {
        autoTimerRef.current = setTimeout(() => {
          handleChoice(scene.choices[0].nextScene);
        }, 3000);
      }
    }
    return () => clearAutoTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMode, isTyping, currentSceneId, sceneKey]);

  const handleChoice = useCallback(
    (nextScene: string) => {
      clearAutoTimer();
      setCurrentSceneId(nextScene);
      setSceneKey((k) => k + 1);
    },
    [clearAutoTimer],
  );

  const handleDialogueClick = useCallback(() => {
    if (isTyping) {
      skipToEnd();
    }
  }, [isTyping, skipToEnd]);

  // Close all panels helper
  const closeAllPanels = useCallback(() => {
    setShowSystemMenu(false);
    setShowBacklog(false);
    setShowSettings(false);
    setShowSaveLoad(null);
  }, []);

  // System menu actions
  const handleSave = useCallback(() => {
    setShowSystemMenu(false);
    setShowSaveLoad('save');
  }, []);

  const handleLoad = useCallback(() => {
    setShowSystemMenu(false);
    setShowSaveLoad('load');
  }, []);

  const handleOpenSettings = useCallback(() => {
    setShowSystemMenu(false);
    setShowSettings(true);
  }, []);

  const handleOpenBacklog = useCallback(() => {
    setShowSystemMenu(false);
    setShowBacklog(true);
  }, []);

  const handleTitle = useCallback(() => {
    closeAllPanels();
    clearAutoTimer();
    setCurrentSceneId('scene1');
    setSceneKey((k) => k + 1);
    setBacklog([]);
  }, [closeAllPanels, clearAutoTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const anyPanelOpen = showSystemMenu || showBacklog || showSettings || showSaveLoad !== null;

    const handleKey = (e: KeyboardEvent) => {
      // Escape: toggle system menu / close panels
      if (e.key === 'Escape') {
        e.preventDefault();
        if (anyPanelOpen) {
          closeAllPanels();
        } else {
          setShowSystemMenu(true);
        }
        return;
      }

      // Don't process shortcuts while panels are open
      if (anyPanelOpen) return;

      // Space or Enter: advance text
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (isTyping) {
          skipToEnd();
        } else if (!isTyping && scene.choices.length > 0) {
          // Click first choice when not typing and choices available
          // Only if there's exactly 1 choice, auto-click it
          if (scene.choices.length === 1) {
            handleChoice(scene.choices[0].nextScene);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isTyping, skipToEnd, scene, handleChoice, showSystemMenu, showBacklog, showSettings, showSaveLoad, closeAllPanels]);

  const isAnyPanelOpen = showSystemMenu || showBacklog || showSettings || showSaveLoad !== null;

  return (
    <section className="section-container min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <BackLink />

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
            className={`absolute inset-0 ${scene.bgImage ? '' : `bg-gradient-to-br ${scene.bg}`}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={
              scene.bgImage
                ? {
                    backgroundImage: `url(${scene.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            {/* Gradient overlay when using background image */}
            {scene.bgImage && (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${scene.bg} opacity-40`}
              />
            )}
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

        {/* Character Sprite */}
        <AnimatePresence mode="wait">
          {scene.showCharacter && (
            <motion.div
              key={`char-${sceneKey}`}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none flex items-end justify-center"
              style={{ height: '75%', bottom: '20%' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/img/girl.png`}
                alt="Character"
                className="h-full w-auto object-contain drop-shadow-2xl"
                style={{ maxHeight: '60%', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
            {/* Auto mode indicator */}
            <AnimatePresence>
              {autoMode && (
                <motion.span
                  className="text-[10px] font-mono text-moyin-pink uppercase tracking-wider ml-1"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                >
                  AUTO
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger Menu Button (top-left) */}
        <div className="absolute top-4 left-4 z-[50]">
          <button
            type="button"
            onClick={() => {
              if (isAnyPanelOpen) {
                closeAllPanels();
              } else {
                setShowSystemMenu(true);
              }
            }}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.06] text-moyin-text-muted hover:text-moyin-pink transition-colors"
            aria-label="System Menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isAnyPanelOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ---- Overlay Panels ---- */}

        {/* System Menu */}
        <AnimatePresence>
          {showSystemMenu && (
            <SystemMenu
              onClose={() => setShowSystemMenu(false)}
              onSave={handleSave}
              onLoad={handleLoad}
              onSettings={handleOpenSettings}
              onBacklog={handleOpenBacklog}
              onTitle={handleTitle}
            />
          )}
        </AnimatePresence>

        {/* Backlog */}
        <AnimatePresence>
          {showBacklog && (
            <BacklogPanel entries={backlog} onClose={() => setShowBacklog(false)} />
          )}
        </AnimatePresence>

        {/* Settings */}
        <AnimatePresence>
          {showSettings && (
            <SettingsPanel
              onClose={() => setShowSettings(false)}
              textSpeed={textSpeed}
              onTextSpeedChange={setTextSpeed}
              autoMode={autoMode}
              onAutoModeChange={setAutoMode}
              bgmVolume={bgmVolume}
              onBgmVolumeChange={setBgmVolume}
              seVolume={seVolume}
              onSeVolumeChange={setSeVolume}
            />
          )}
        </AnimatePresence>

        {/* Save/Load */}
        <AnimatePresence>
          {showSaveLoad !== null && (
            <SaveLoadPanel mode={showSaveLoad} onClose={() => setShowSaveLoad(null)} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onDone={() => setToastMessage(null)} />
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-moyin-text-muted">
          Click the dialogue box to skip typewriter animation. Choose an option to advance the story.
          <span className="hidden md:inline">
            {' '}Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">Space</kbd> to advance, <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">Esc</kbd> for menu.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
