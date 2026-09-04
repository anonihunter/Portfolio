"use client";

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Menu,
  X,
  Check,
  Sparkles,
  FileText,
} from 'lucide-react';

import AmbientBackground from './components/AmbientBackground';
import Reveal from './components/Reveal';
import { SoundProvider, useSound } from './components/SoundProvider';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './types';



const projects: ProjectItem[] = [
  {
    name: 'Smart File Manager',
    description:
      'A modular Python CLI application that automatically organizes files by type, computes cryptographic hashes for deduplication, and supports configurable behavior through JSON.',
    stack: ['Python', 'pathlib', 'shutil', 'hashlib', 'watchdog'],
    featured: true,
  },
  {
    name: 'Interactive Data Dashboard',
    description:
      'An exploratory interactive web dashboard for CSV dataset analysis, dynamic parameter filtering, statistical distributions, and high-performance charting.',
    stack: ['Streamlit', 'Pandas', 'Plotly', 'Python'],
  },
];

function PortfolioContent() {
  const { enabled: soundEnabled, toggleSound, playClick, playHover, playSuccess } = useSound();

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.add('light');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    playClick();
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
    if (next === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    playSuccess();
    navigator.clipboard.writeText('abhishekkumar62437@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <>
      {/* Ambient starry mesh background */}
      <AmbientBackground />

      <main>
        {/* Navigation Header */}
        <header className="nav">
          <a
            href="#top"
            className="brand flex items-center gap-1.5"
            onClick={() => {
              playClick();
              setMobileMenuOpen(false);
            }}
          >
            <span>AK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktopNav">
            <a href="#about" onClick={playHover}>About</a>
            <a href="#skills" onClick={playHover}>Skills</a>
            <a href="#projects" onClick={playHover}>Projects</a>
            <a href="#experience" onClick={playHover}>Experience</a>
            <a href="#education" onClick={playHover}>Education</a>
            <button
              onClick={() => {
                playClick();
                setResumeOpen(true);
              }}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <span>Resume</span>
              <FileText size={12} className="text-cyan-400" />
            </button>
          </nav>

          {/* Desktop Control Actions */}
          <div className="navActions desktopActions">
            <button
              aria-label="Change theme"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              aria-label="Toggle sound"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Synthesizer Chimes'}
            >
              {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* Mobile Actions Button Bar */}
          <div className="mobileActions">
            <button
              aria-label="Change theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              aria-label="Toggle sound"
              onClick={toggleSound}
            >
              {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
            </button>

            <button
              className="menuButton"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <motion.nav
              className="mobileNav"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#education" onClick={() => setMobileMenuOpen(false)}>Education</a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="flex items-center justify-between"
              >
                <span>View Resume</span>
                <FileText size={14} className="text-cyan-400" />
              </button>
            </motion.nav>
          )}
        </header>

        {/* Hero Section */}
        <section id="top" className="hero section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow">
              <span>SOFTWARE ENGINEERING · DATA · ML</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-mono">
                <Sparkles size={10} /> IIT Madras
              </span>
            </div>

            <h1>
              Abhishek
              <br />
              <span>Kumar.</span>
            </h1>

            <p className="heroText">
              Software Engineering student at <strong>IIT Madras</strong> focused on Python,
              backend systems engineering, data science, and machine learning.
              Passionate about building performant tools, scalable architectures, and contributing to open source.
            </p>

            <div className="actions">
              <a
                href="#projects"
                className="button primary group"
                onClick={() => playClick()}
              >
                <span>View Projects</span>
                <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => {
                  playClick();
                  setResumeOpen(true);
                }}
                className="button"
              >
                <FileText size={15} className="text-cyan-400" />
                <span>Resume</span>
              </button>

              <a
                href="#contact"
                className="button"
                onClick={() => playClick()}
              >
                <Mail size={15} />
                <span>Get in touch</span>
              </a>
            </div>

            <div className="socials">
              <a
                className="button"
                href="https://github.com/anonihunter"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={16} />
                <span>GitHub</span>
            </a>

            <a
              className="button"
              href="https://www.linkedin.com/in/the-abhishek-kr/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={16} />
              <span>LinkedIn</span>
            </a>

              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Mail size={14} className="text-neutral-400" />
                )}
                <span>{copiedEmail ? 'Email Copied!' : 'abhishekkumar62437@gmail.com'}</span>
              </button>
            </div>
          </motion.div>

          <div className="heroMeta">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              Based in India · Open to Internships
            </span>
            <span>IIT Madras BS Data Science & Applications</span>
          </div>
        </section>

        {/* 01 — About Section */}
        <section id="about" className="section split">
          <div className="sectionLabel">01 — ABOUT</div>

          <div>
            <Reveal>
              <h2>
                Building useful software with a strong engineering foundation.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p>
                Motivated Software Engineering student at <strong>IIT Madras</strong> with a solid foundation
                in Python, Data Structures & Algorithms, Object-Oriented Programming, and Database Management Systems.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                Experienced in developing command-line utilities, real-time filesystem listeners, data visualization dashboards,
                and collaborating with distributed engineering teams on GitHub.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/10">
                  <div className="text-xs text-cyan-400 font-mono mb-1">01 / FOUNDATION</div>
                  <h4 className="text-sm font-semibold text-white">Algorithms & Systems</h4>
                  <p className="text-xs text-neutral-400 mt-1">Clean OOP principles, complexity analysis, and modular codebases.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/10">
                  <div className="text-xs text-emerald-400 font-mono mb-1">02 / OPEN SOURCE</div>
                  <h4 className="text-sm font-semibold text-white">Public Contributions</h4>
                  <p className="text-xs text-neutral-400 mt-1">Direct pull requests merged into Ray and aviation flight networks.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/10">
                  <div className="text-xs text-amber-400 font-mono mb-1">03 / CTF FINALIST</div>
                  <h4 className="text-sm font-semibold text-white">Security & Problem Solving</h4>
                  <p className="text-xs text-neutral-400 mt-1">Rank 19 in IIT Madras Margazhi Cyber CTF (85.4% score).</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02 — Skills Section */}
        <section id="skills" className="section">
          <div className="sectionLabel">02 — SKILLS</div>

          <Reveal>
            <div className="skillGrid">
              <div className="skillCard">
                <p>Languages</p>
                <div>
                  <span>Python</span>
                  <span>C</span>
                  <span>JavaScript</span>
                  <span>SQL</span>
                  <span>Bash</span>
                </div>
              </div>

              <div className="skillCard">
                <p>Frameworks & Libraries</p>
                <div>
                  <span>NumPy</span>
                  <span>Pandas</span>
                  <span>Streamlit</span>
                  <span>Matplotlib</span>
                  <span>Watchdog</span>
                  <span>Plotly</span>
                </div>
              </div>

              <div className="skillCard">
                <p>Databases</p>
                <div>
                  <span>MySQL</span>
                  <span>MongoDB</span>
                  <span>Relational Schema</span>
                  <span>Query Optimization</span>
                </div>
              </div>

              <div className="skillCard">
                <p>Core Computer Science</p>
                <div>
                  <span>Object-Oriented Programming (OOP)</span>
                  <span>DBMS</span>
                  <span>Data Structures</span>
                  <span>Operating Systems Concepts</span>
                </div>
              </div>

              <div className="skillCard">
                <p>Developer Tools</p>
                <div>
                  <span>VS Code</span>
                  <span>Git</span>
                  <span>GitHub</span>
                  <span>Jupyter Notebook</span>
                  <span>Linux / Terminal</span>
                </div>
              </div>

              <div className="skillCard">
                <p>Currently Learning & Exploring</p>
                <div>
                  <span>Advanced DSA</span>
                  <span>Supervised ML</span>
                  <span>Scikit-learn</span>
                  <span>Model Pipelines</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 03 — Projects Section */}
        <section id="projects" className="section">
          <div className="sectionLabel">03 — PROJECTS</div>

          <Reveal>
            <div className="projectGrid">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  className={`projectCard ${index === 0 ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    playClick();
                    setSelectedProject(project);
                  }}
                >
                  <div className="projectTop">
                    <span className="font-mono text-cyan-400">
                      {index === 0 ? '★ FEATURED CLI UTILITY' : 'PROJECT / DATA TOOL'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors">
                      Details <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="tags">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 04 — Open Source Experience Section */}
        <section id="experience" className="section">
          <div className="sectionLabel">04 — OPEN SOURCE</div>

          <Reveal>
            <div className="timeline">
              <article>
                <div className="dot" />
                <div>
                  <p className="date">JAN 2026 — FEB 2026</p>
                  <div className="flex items-center gap-2">
                    <h3>Ray — Documentation Contributor</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">Distributed AI</span>
                  </div>
                  <p>
                    Contributed documentation improvements related to <strong>job-level checkpointing</strong> in Ray Data.
                    Worked directly with upstream project maintainers through technical review feedback,
                    pull requests, and documentation build verification.
                  </p>
                </div>
              </article>

              <article>
                <div className="dot" />
                <div>
                  <p className="date">JAN 2026</p>
                  <div className="flex items-center gap-2">
                    <h3>VATSIM UK — Open Source Contributor</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300">Aviation Data</span>
                  </div>
                  <p>
                    Contributed an <strong>AIRAC navigation data update</strong> by validating and correcting runway headings
                    for EGHE (St Mary&apos;s Airport, Isles of Scilly), ensuring virtual radar simulation data matches official civil aviation publications.
                  </p>
                </div>
              </article>
            </div>
          </Reveal>
        </section>

        {/* 05 — Education Section */}
        <section id="education" className="section">
          <div className="sectionLabel">05 — EDUCATION</div>

          <Reveal>
            <div className="education">
              <article>
                <p className="date">JAN 2025 — JUL 2028 · ONGOING</p>
                <div className="flex items-center justify-between">
                  <h3>Indian Institute of Technology, Madras</h3>
                  <span className="text-[10px] font-mono text-cyan-400">IITM</span>
                </div>
                <p>Bachelor of Science in Data Science and Applications</p>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-neutral-400 flex flex-wrap gap-2">
                  <span>Python Programming</span>
                  <span>•</span>
                  <span>Database Systems</span>
                  <span>•</span>
                  <span>Mathematics for Data Science</span>
                </div>
              </article>

              <article>
                <p className="date">JUL 2021 — MAY 2025</p>
                <div className="flex items-center justify-between">
                  <h3>Indira Gandhi National Open University</h3>
                  <span className="text-[10px] font-mono text-neutral-400">IGNOU</span>
                </div>
                <p>Bachelor of Arts in Public Administration Honours</p>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-neutral-400 flex flex-wrap gap-2">
                  <span>Governance</span>
                  <span>•</span>
                  <span>Organizational Policy</span>
                  <span>•</span>
                  <span>Public Systems</span>
                </div>
              </article>
            </div>
          </Reveal>
        </section>

        {/* 06 — Achievement Section */}
        <section className="section achievement">
          <div className="sectionLabel">06 — ACHIEVEMENT</div>

          <Reveal>
            <div
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer group"
              onClick={(e) => {
                playSuccess();
                const rect = e.currentTarget.getBoundingClientRect();
                window.dispatchEvent(
                  new CustomEvent('particle-burst', {
                    detail: {
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                      count: 40,
                    },
                  })
                );
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="date m-0 text-cyan-400 font-mono">2026 COMPETITION · CYBERSECURITY</p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                  Rank 19 Finalist
                </span>
              </div>

              <h2>Margazhi Cyber CTF — IIT Madras</h2>

              <p>
                Cleared the rigorous 24-hour Round 1 security hacking challenge to qualify for the 24-hour Round 2 CTF.
                Scored <strong>700 out of 820 points (~85.4%)</strong>, solving cryptography, reverse engineering, and web vulnerability challenges.
              </p>

              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-400 group-hover:underline">
                <Sparkles size={13} />
                <span>Tap for celebration sparkle</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <Reveal>
            <p className="eyebrow">LET&apos;S CONNECT</p>

            <h2>Let&apos;s build something useful.</h2>

            <button
              onClick={copyEmailToClipboard}
              className="contactMail group cursor-pointer bg-transparent border-0"
              title="Click to copy email address"
            >
              <span>abhishekkumar62437@gmail.com</span>
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-cyan-400" />
            </button>

            {copiedEmail && (
              <p className="text-xs text-emerald-400 mt-2 font-medium animate-bounce">
                ✓ Email copied to clipboard!
              </p>
            )}

            <p className="phone">
              <a href="tel:+917499241436" className="hover:text-white transition-colors">
                +91 7499241436
              </a>
            </p>

            <div className="actions">
              <a
                className="button primary"
                href="mailto:abhishekkumar62437@gmail.com"
                onClick={playClick}
              >
                <Mail size={16} />
                <span>Email Me</span>
              </a>

              <button
                onClick={() => {
                  playClick();
                  setResumeOpen(true);
                }}
                className="button"
              >
                <FileText size={15} />
                <span>View Full Resume</span>
              </button>

              <a
                className="button"
                href="https://github.com/anonihunter"
                target="_blank"
                rel="noreferrer"
                onClick={playHover}
              >
                <FaGithub size={16} />
                <span>GitHub</span>
              </a>

              <a
                className="button"
                href="https://www.linkedin.com/in/the-abhishek-kr/"
                target="_blank"
                rel="noreferrer"
                onClick={playHover}
              >
                <FaLinkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer>
          <div className="flex items-center gap-3">
            <span>ABHISHEK KUMAR</span>
            <span>•</span>
            <span>IIT MADRAS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Opportunities</span>
          </div>

          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>

      {/* Interactive Modals */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <PortfolioContent />
    </SoundProvider>
  );
}
