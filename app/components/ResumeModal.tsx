import React from 'react';
import { X, Download, GraduationCap, Briefcase, Award, Code2, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundProvider';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const sound = typeof useSound === 'function' ? useSound() : null;
  const playClick = sound?.playClick || (() => {});
  const playSuccess = sound?.playSuccess || (() => {});

  if (!isOpen) return null;

  const handleDownload = () => {
    playSuccess();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0d0f] border border-white/10 text-white shadow-2xl p-6 sm:p-8 custom-scrollbar"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm tracking-tighter">
                AK
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Abhishek Kumar</h2>
                <p className="text-xs text-neutral-400">Software Engineering Student · IIT Madras</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
                title="Print or Save as PDF"
              >
                <Download size={14} />
                <span>Save / Print</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Contact bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 text-xs text-neutral-400 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-neutral-500" />
              <span>abhishekkumar62437@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-neutral-500" />
              <span>+91 7499241436</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-neutral-500" />
              <span>Chennai / India</span>
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-6 pt-6">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                <GraduationCap size={16} className="text-white" />
                <span>Education</span>
              </div>
              <div className="space-y-3 pl-6 border-l border-white/10">
                <div>
                  <div className="flex flex-wrap justify-between text-sm font-medium">
                    <span className="text-white">Indian Institute of Technology, Madras</span>
                    <span className="text-xs text-neutral-400">Jan 2025 — Jul 2028 · Ongoing</span>
                  </div>
                  <p className="text-xs text-neutral-400">Bachelor of Science in Data Science and Applications</p>
                </div>
                <div>
                  <div className="flex flex-wrap justify-between text-sm font-medium">
                    <span className="text-white">Indira Gandhi National Open University</span>
                    <span className="text-xs text-neutral-400">Jul 2021 — May 2025</span>
                  </div>
                  <p className="text-xs text-neutral-400">Bachelor of Arts in Public Administration Honours</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                <Code2 size={16} className="text-white" />
                <span>Technical Skills</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-neutral-400 block mb-1 font-semibold uppercase text-[10px]">Languages</span>
                  <span className="text-neutral-200">Python, C, JavaScript, SQL</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-neutral-400 block mb-1 font-semibold uppercase text-[10px]">Libraries & Frameworks</span>
                  <span className="text-neutral-200">NumPy, Pandas, Streamlit, Matplotlib, Watchdog</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-neutral-400 block mb-1 font-semibold uppercase text-[10px]">Databases & Core CS</span>
                  <span className="text-neutral-200">MySQL, MongoDB, OOP, DBMS, DSA</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-neutral-400 block mb-1 font-semibold uppercase text-[10px]">Developer Tools</span>
                  <span className="text-neutral-200">Git, GitHub, VS Code, Jupyter, Linux CLI</span>
                </div>
              </div>
            </div>

            {/* Open Source Experience */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                <Briefcase size={16} className="text-white" />
                <span>Open Source Contributions</span>
              </div>
              <div className="space-y-4 pl-6 border-l border-white/10 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-sm text-white">
                    <span>Ray — Documentation Contributor</span>
                    <span className="text-neutral-400 text-xs">Jan 2026 — Feb 2026</span>
                  </div>
                  <p className="text-neutral-400 mt-1">
                    Contributed documentation improvements for job-level checkpointing in Ray Data, collaborating through GitHub review feedback and official doc builds.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between font-medium text-sm text-white">
                    <span>VATSIM UK — Open Source Contributor</span>
                    <span className="text-neutral-400 text-xs">Jan 2026</span>
                  </div>
                  <p className="text-neutral-400 mt-1">
                    Contributed an AIRAC data update by correcting runway headings for EGHE (Scilly Isles Airport), matching official civil aviation authority publications.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                <Award size={16} className="text-white" />
                <span>Selected Projects & CTF</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between text-sm font-medium text-white mb-1">
                    <span>Smart File Manager (Python CLI)</span>
                    <span className="text-neutral-400 text-xs">Python · watchdog · hashlib</span>
                  </div>
                  <p className="text-neutral-400">
                    Modular CLI that organizes files automatically with file hashing, event monitoring, and custom JSON rules.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between text-sm font-medium text-white mb-1">
                    <span>Margazhi Cyber CTF — IIT Madras</span>
                    <span className="text-emerald-400 text-xs font-semibold">Rank 19 Finalist</span>
                  </div>
                  <p className="text-neutral-400">
                    Qualified in 24-hour round 1 and competed in round 2 CTF, scoring 700/820 points (~85.4%).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-full text-xs font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
