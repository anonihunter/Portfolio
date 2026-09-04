"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface SoundContextType {
  enabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
  playParticleBurst: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-sound');
    if (saved === 'on') {
      setEnabled(true);
    }
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playTone = (frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch {
      // Audio is non-blocking
    }
  };

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('portfolio-sound', next ? 'on' : 'off');
    if (next) {
      // Immediate gentle feedback chime
      setTimeout(() => {
        playTone(520, 0.08, 0.05, 'sine');
      }, 50);
    }
  };

  const playClick = () => {
    playTone(480, 0.05, 0.045, 'sine');
  };

  const playHover = () => {
    playTone(720, 0.03, 0.015, 'sine');
  };

  const playSuccess = () => {
    playTone(520, 0.08, 0.035, 'sine');
    setTimeout(() => {
      playTone(680, 0.08, 0.03, 'sine');
    }, 50);
    setTimeout(() => {
      playTone(880, 0.12, 0.025, 'sine');
    }, 100);
  };

  const playParticleBurst = () => {
    playTone(640, 0.04, 0.02, 'sine');
  };

  return (
    <SoundContext.Provider value={{ enabled, toggleSound, playClick, playHover, playSuccess, playParticleBurst }}>
      {children}
    </SoundContext.Provider>
  );
};

const defaultSoundState: SoundContextType = {
  enabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {},
  playParticleBurst: () => {},
};

export function useSound(): SoundContextType {
  const context = useContext(SoundContext);
  return context || defaultSoundState;
}
