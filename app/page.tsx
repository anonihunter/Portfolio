"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import AmbientBackground from "./components/AmbientBackground";
import Reveal from "./components/Reveal";
import {
  ArrowUpRight,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

const projects = [
  {
    name: "Smart File Manager",
    description:
      "A modular Python CLI application that automatically organizes files by type and supports configurable behavior through JSON.",
    stack: [
      "Python",
      "pathlib",
      "shutil",
      "hashlib",
      "watchdog",
    ],
  },
  {
    name: "Interactive Data Dashboard",
    description:
      "An interactive dashboard for CSV data exploration and visualization.",
    stack: ["Streamlit", "Pandas", "Plotly"],
  },
];

export default function Home() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [sound, setSound] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const audio = useRef<AudioContext | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    setMounted(true);

    const savedSound = localStorage.getItem("portfolio-sound");

    setSound(savedSound === "on");

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  function playSound(frequency = 420) {
    if (!sound) return;

    try {
      audio.current ??= new AudioContext();

      const context = audio.current;

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(
        0.025,
        context.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.07
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();

      oscillator.stop(
        context.currentTime + 0.07
      );
    } catch {
      // Sound is optional.
    }
  }

  function toggleSound() {
    const next = !sound;

    setSound(next);

    localStorage.setItem(
      "portfolio-sound",
      next ? "on" : "off"
    );

    if (next) {
      playSound(520);
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    playSound(360);
  }

  const themeIcon =
    !mounted || theme === "dark" ? (
      <Moon size={16} />
    ) : (
      <Sun size={16} />
    );

  return (
    <>
      <AmbientBackground />

      <main>
      {/* Custom cursor */}
      <motion.div
        className="cursor"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Navbar */}
      <header className="nav">
        <a
          href="#top"
          className="brand"
          onClick={() => {
            playSound();
            setMobileMenuOpen(false);
          }}
        >
          AK<span>.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktopNav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="navActions desktopActions">
          <button
            aria-label="Change theme"
            onClick={toggleTheme}
          >
            {themeIcon}
          </button>

          <button
            aria-label="Toggle sound"
            onClick={toggleSound}
          >
            {sound ? (
              <Volume2 size={16} />
            ) : (
              <VolumeX size={16} />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobileActions">
          <button
            aria-label="Change theme"
            onClick={toggleTheme}
          >
            {themeIcon}
          </button>

          <button
            aria-label="Toggle sound"
            onClick={toggleSound}
          >
            {sound ? (
              <Volume2 size={16} />
            ) : (
              <VolumeX size={16} />
            )}
          </button>

          <button
            className="menuButton"
            aria-label={
              mobileMenuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
          >
            {mobileMenuOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            className="mobileNav"
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>

            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>

            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experience
            </a>

            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
            >
              Education
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </a>
          </motion.nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="hero section">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p className="eyebrow">
            SOFTWARE ENGINEERING · DATA · ML
          </p>

          <h1>
            Abhishek
            <br />
            <span>Kumar.</span>
          </h1>

          <p className="heroText">
            Software Engineering student at IIT Madras
            focused on Python, backend engineering,
            data science and machine learning.
          </p>

          <div className="actions">
            <a
              href="#projects"
              className="button primary"
              onClick={() => playSound(500)}
            >
              View Projects
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#contact"
              className="button"
              onClick={() => playSound(500)}
            >
              Get in touch
              <Mail size={16} />
            </a>
          </div>

          <div className="socials">
            <a
              href="https://github.com/anonihunter"
              target="_blank"
              rel="noreferrer"
            >
              <span className="socialIcon">GH</span>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/the-abhishek-kr/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="socialIcon">in</span>
              LinkedIn
            </a>

            <a href="mailto:abhishekkumar62437@gmail.com">
              <Mail size={17} />
              Email
            </a>
          </div>
        </motion.div>

        <div className="heroMeta">
          <span>Based in India</span>
          <span>Open-source contributor</span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section split">
        <div className="sectionLabel">
          01 — ABOUT
        </div>
        
        <div>
          <Reveal>
            <h2>
              Building useful software with a strong
              engineering foundation.
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Motivated Software Engineering student at
              IIT Madras with a strong foundation in
              Python, Data Structures, OOP and DBMS.
            </p>
          </Reveal>

          <Reveal>
            <p>
              Experienced in building Python applications,
              interactive tools and contributing to
              open-source projects through GitHub
              collaboration.
            </p>
          </Reveal>

        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="sectionLabel">
          02 — SKILLS
        </div>

        <Reveal>
          <div className="skillGrid">
            <div className="skillCard">
              <p>Languages</p>

              <div>
                <span>C</span>
                <span>Python</span>
                <span>JavaScript</span>
              </div>
            </div>

            
            <div className="skillCard">
              <p>Frameworks & Libraries</p>

              <div>
                <span>NumPy</span>
                <span>Pandas</span>
                <span>Streamlit</span>
                <span>Matplotlib</span>
              </div>
            </div>

            <div className="skillCard">
              <p>Databases</p>

              <div>
                <span>MySQL</span>
                <span>MongoDB</span>
              </div>
            </div>

            <div className="skillCard">
              <p>Core CS</p>

              <div>
                <span>OOP</span>
                <span>DBMS</span>
              </div>
            </div>

            <div className="skillCard">
              <p>Tools</p>

              <div>
                <span>VS Code</span>
                <span>Git</span>
                <span>GitHub</span>
                <span>Jupyter Notebook</span>
              </div>
            </div>

            <div className="skillCard">
              <p>Currently Learning</p>

              <div>
                <span>DSA</span>
                <span>Supervised ML</span>
                <span>Scikit-learn</span>
              </div>
            </div>
          </div>
        </Reveal>

      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="sectionLabel">
          03 — PROJECTS
        </div>

        <Reveal>
          <div className="projectGrid">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className={`projectCard ${
                  index === 0 ? "featured" : ""
                }`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -5,
                }}
                onClick={() => playSound(300)}
              >
                <div className="projectTop">
                  <span>
                    {index === 0
                      ? "FEATURED"
                      : "PROJECT"}
                  </span>

                  <ArrowUpRight size={18} />
                </div>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <div className="tags">
                  {project.stack.map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

      </section>

      {/* Experience */}
      <section
        id="experience"
        className="section"
      >
        <div className="sectionLabel">
          04 — OPEN SOURCE
        </div>

        <Reveal>
          <div className="timeline">
            <article>
              <div className="dot" />

              <div>
                <p className="date">
                  JAN 2026 — FEB 2026
                </p>

                <h3>
                  Ray — Documentation Contributor
                </h3>

                <p>
                  Contributed documentation improvements
                  related to job-level checkpointing in
                  Ray Data and worked with project
                  maintainers through review feedback,
                  pull requests and documentation updates.
                </p>
              </div>
            </article>

            <article>
              <div className="dot" />

              <div>
                <p className="date">
                  JAN 2026
                </p>

                <h3>
                  VATSIM UK — Open Source Contributor
                </h3>

                <p>
                  Contributed an AIRAC data update by
                  correcting runway headings for EGHE
                  (Scilly Isles Airport), ensuring airport
                  data matched official aviation
                  publications.
                </p>
              </div>
            </article>
          </div>
        </Reveal>

      </section>

      {/* Education */}
      <section
        id="education"
        className="section"
      >
        <div className="sectionLabel">
          05 — EDUCATION
        </div>

        <Reveal>
          <div className="education">
            <article>
              <p className="date">
                JAN 2025 — JUL 2028 · ONGOING
              </p>

              <h3>
                Indian Institute of Technology, Madras
              </h3>

              <p>
                Bachelor of Science, Data Science and
                Applications
              </p>
            </article>

            <article>
              <p className="date">
                JUL 2021 — MAY 2025
              </p>

              <h3>
                Indira Gandhi National Open University
              </h3>

              <p>
                Bachelor of Arts, Public Administration
                Honours
              </p>
            </article>
          </div>
        </Reveal>

      </section>

      {/* Achievement */}
      <section className="section achievement">
        <div className="sectionLabel">
          06 — ACHIEVEMENT
        </div>
        
        <Reveal>
          <div>
            <p className="date">
              2026
            </p>

            <h2>
              Margazhi Cyber CTF — IIT Madras
            </h2>

            <p>
              Finalist, Rank 19. Cleared the 24-hour
              Round 1 hacking challenge and qualified for
              the 24-hour Round 2 CTF, scoring 700/820
              points (~85.4%).
            </p>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="contact section"
      >
        <Reveal>
          <p className="eyebrow">
            LET&apos;S CONNECT
          </p>

          <h2>
            Let&apos;s build something useful.
          </h2>

          <a
            className="contactMail"
            href="mailto:abhishekkumar62437@gmail.com"
          >
            abhishekkumar62437@gmail.com
            <ArrowUpRight size={22} />
          </a>

          <p className="phone">
            +91 7499241436
          </p>

          <div className="actions">
            <a
              className="button primary"
              href="mailto:abhishekkumar62437@gmail.com"
            >
              Email Me
              <Mail size={16} />
            </a>

            <a
              className="button"
              href="https://github.com/anonihunter"
              target="_blank"
              rel="noreferrer"
            >
              <span className="socialIcon">GH</span>
              GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <footer>
        <span>ABHISHEK KUMAR</span>

        <span>
          Built with Next.js + Motion
        </span>

        <span>
          © {new Date().getFullYear()}
        </span>
      </footer>
    </main>
    </>
    
  );
}
