'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

type VfxContextType = {
  isVfxEnabled: boolean;
  toggleVfx: () => void;
};

const VfxContext = createContext<VfxContextType | undefined>(undefined);

export function VfxProvider({ children }: { children: React.ReactNode }) {
  const [isVfxEnabled, setIsVfxEnabled] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('moyin_vfx_enabled');
    if (saved !== null) {
      setIsVfxEnabled(saved === 'true');
    }
  }, []);

  // Update global animations disabled class
  useEffect(() => {
    if (isVfxEnabled) {
      document.documentElement.classList.remove('no-vfx');
    } else {
      document.documentElement.classList.add('no-vfx');
    }
  }, [isVfxEnabled]);

  const toggleVfx = () => {
    setIsVfxEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('moyin_vfx_enabled', String(next));
      return next;
    });
  };

  return (
    <VfxContext.Provider value={{ isVfxEnabled, toggleVfx }}>
      <MotionConfig transition={isVfxEnabled ? undefined : { duration: 0 }}>
        {children}
      </MotionConfig>
    </VfxContext.Provider>
  );
}

export function useVfx() {
  const context = useContext(VfxContext);
  if (context === undefined) {
    throw new Error('useVfx must be used within a VfxProvider');
  }
  return context;
}
