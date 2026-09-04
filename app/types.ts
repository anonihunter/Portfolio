export type ParticleColorPalette = 'rainbow' | 'cyber' | 'sunset' | 'aurora';

export interface ColorfulParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  life: number;
  maxLife: number;
  angle?: number;
  speed?: number;
  orbitRadius?: number;
  orbitAngle?: number;
  orbitSpeed?: number;
}

export interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export interface ProjectItem {
  name: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
