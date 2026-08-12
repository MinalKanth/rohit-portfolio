import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "11+", label: "Apps shipped" },
  { value: "20+", label: "Technologies used" },
  { value: "1", label: "Production healthcare client" },
];

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.6)}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.25 },
    }}
    className="group relative overflow-hidden surface rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_60px_-25px_rgba(250,115,67,0.35)]"
  >
    {/* Animated glow */}
    <div className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Subtle grid */}
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />

    <div className="relative z-10">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.12 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06] group-hover:border-accent/30 transition-colors duration-300"
      >
        <img
          src={icon}
          alt={title}
          className="w-10 h-10 object-contain opacity-90"
        />
      </motion.div>
    </div>

    <h3 className="relative z-10 text-white-100 text-[17px] font-semibold tracking-tight">
      {title}
    </h3>

    {/* Bottom accent */}
    <div className="relative z-10 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
  </motion.div>
);

const About = () => {
  return (
    <>
      {/* Section heading */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>

        <h2 className={styles.sectionHeadText}>
          Overview<span className="text-[#FA7343]">.</span>
        </h2>
      </motion.div>

      {/* Main introduction */}
      <div className="mt-8 grid lg:grid-cols-3 gap-10 items-stretch">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="lg:col-span-2 relative"
        >
          <div className="relative surface rounded-2xl p-7 sm:p-8 overflow-hidden">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

            {/* Decorative line */}
            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent" />

            <p className="relative z-10 text-secondary text-[16px] leading-[28px]">
              I'm a dynamic, detail-oriented iOS Developer with 4+ years of
              experience building robust, user-friendly mobile applications in
              Swift and Objective-C. I've shipped 11+ apps across telehealth,
              AI, social/live streaming, and fintech-adjacent domains — from
              real-time video consultations to live broadcasting platforms —
              with a proven track record of delivering on time without
              compromising code quality. I'm currently working directly with a
              US-based healthcare client, maintaining and enhancing their
              production iOS applications for clinicians and patients.
            </p>

            {/* Small status indicator */}
            <div className="relative z-10 mt-7 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>

              <span className="text-secondary text-[12px] tracking-wide">
                Currently building production iOS software
              </span>
            </div>
          </div>
        </motion.div>

        {/* Philosophy card */}
        <motion.div
          variants={fadeIn("left", "spring", 0.2, 1)}
          whileHover={{
            y: -5,
            transition: { duration: 0.3 },
          }}
          className="group relative overflow-hidden surface rounded-2xl p-7 flex flex-col justify-between"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 w-52 h-52 rounded-full bg-accent-violet/10 blur-3xl group-hover:bg-accent-violet/20 transition-all duration-500" />

          <div className="relative z-10">
            <p className="text-[12px] uppercase tracking-[0.22em] text-accent font-semibold mb-6">
              Philosophy
            </p>

            <div className="text-white/20 text-[52px] font-serif leading-none">
              “
            </div>

            <p className="text-white-100 text-[17px] leading-[27px] -mt-2">
              Ship products that feel inevitable — fast, stable, and quietly
              well-engineered under the hood.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-line" />
            <span className="text-[10px] text-secondary uppercase tracking-[0.18em]">
              Engineering mindset
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-0 border-y border-line">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeIn("up", "spring", i * 0.1, 0.6)}
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.025)",
            }}
            className="group relative px-5 sm:px-7 py-8 border-r border-line last:border-r-0 transition-colors duration-300"
          >
            <div className="flex flex-col">
              <span className="text-white-100 font-display font-bold text-[32px] leading-none group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </span>

              <span className="mt-3 text-secondary text-[12px] sm:text-[13px] leading-[18px]">
                {stat.label}
              </span>
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Capabilities */}
      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-16 mb-7 flex items-center gap-4"
      >
        <span className="text-secondary text-[11px] uppercase tracking-[0.22em]">
          Core capabilities
        </span>

        <div className="h-[1px] flex-1 bg-line" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");