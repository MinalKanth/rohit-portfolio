import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const stats = [
  { value: "4+", label: "Years shipping iOS" },
  { value: "11+", label: "Apps in the App Store" },
  { value: "1", label: "Healthcare client, live in prod" },
];

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:kevatrohit63@gmail.com" },
];

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Ambient system: fine grid + radial glow + drifting orbs */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[130px] animate-drift" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[380px] h-[380px] rounded-full bg-accent-violet/10 blur-[130px] animate-drift" style={{ animationDelay: "3s" }} />

      <div
        className={`absolute inset-0 top-[150px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-start`}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pill-badge"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          Available for new iOS projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.heroHeadText} mt-6`}
        >
          iOS Developer,
          <br />
          <span className="hero-text-gradient">building for the App Store.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.heroSubText} mt-6`}
        >
          I design and ship Swift apps with real-time video, chat, AI, and
          payments — from first line of code to App Store release.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a href="#apps" className="btn-premium">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Let's Connect
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex items-center gap-6"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-secondary text-[13px] font-medium hover:text-white-100 transition-colors border-b border-transparent hover:border-line pb-0.5"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-8 w-full max-w-xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-white-100 font-display font-bold text-[24px] leading-none">
                {stat.value}
              </span>
              <span className="mt-2 text-secondary text-[12px] tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[32px] h-[58px] rounded-3xl border border-line flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 22, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-accent mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
