"use client";

import { createContext, useContext, useRef } from "react";

type SoundContextType = {
  click: () => void;
  hover: () => void;
  success: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioContext = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    return audioContext.current;
  };

  const playTone = (
    frequency: number,
    duration: number,
    volume: number,
    type: OscillatorType = "sine"
  ) => {
    const ctx = getContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);

    gain.gain.exponentialRampToValueAtTime(
      volume,
      ctx.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  };

  const click = () => {
    playTone(520, 0.06, 0.035, "sine");
  };

  const hover = () => {
    playTone(760, 0.035, 0.012, "sine");
  };

  const success = () => {
    playTone(520, 0.08, 0.025);
    
    setTimeout(() => {
      playTone(720, 0.1, 0.02);
    }, 60);
  };

  return (
    <SoundContext.Provider
      value={{
        click,
        hover,
        success,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error(
      "useSound must be used inside SoundProvider"
    );
  }

  return context;
}