import React from 'react';
import {FaGithub} from 'react-icons/fa';
import { X, ExternalLink, Terminal, Layers} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';
import { useSound } from './SoundProvider';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playClick } = useSound();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#0f0f12] border border-white/10 text-white shadow-2xl p-6 sm:p-7 custom-scrollbar"
        >
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                {project.featured ? 'Featured Project' : 'Project Showcase'}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">{project.name}</h3>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="py-4 space-y-4 text-sm text-neutral-300">
            <p className="leading-relaxed">{project.description}</p>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <Terminal size={14} className="text-cyan-400" />
                <span>Key Highlights & Engineering</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5 pl-4 list-disc">
                {project.name.includes('File') ? (
                  <>
                    <li>Automated filesystem event polling with the Python watchdog package.</li>
                    <li>Cryptographic hash verification (SHA-256) with hashlib for deduplication.</li>
                    <li>Clean CLI arguments and customizable categorization rules via JSON configuration.</li>
                  </>
                ) : (
                  <>
                    <li>Dynamic exploratory data analysis for uploaded CSV files with Pandas.</li>
                    <li>Real-time visualization metrics rendered via Plotly chart engines.</li>
                    <li>Lightweight, responsive web dashboard built natively with Streamlit.</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                <Layers size={13} />
                <span>Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="https://github.com/anonihunter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <FaGithub size={14} />
              <span>Explore GitHub Repository</span>
              <ExternalLink size={12} />
            </a>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
