import React, { useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

/* ---------------------------------------------
   Interactive Experience Card
--------------------------------------------- */

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set(((x - centerX) / centerX) * 4);
    mouseY.set(-((y - centerY) / centerY) * 4);

    card.style.setProperty(
      "--mouse-x",
      `${(x / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--mouse-y",
      `${(y / rect.height) * 100}%`
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "transparent",
        padding: 0,
        boxShadow: "none",
      }}
      contentArrowStyle={{
        borderRight: "7px solid #111116",
      }}
      date={experience.date}
      dateClassName="experience-date"
      iconStyle={{
        background: "#111116",
        boxShadow:
          "0 0 0 4px #4F7FFF, 0 0 35px rgba(79,127,255,0.35)",
      }}
      icon={
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            type: "spring",
          }}
          className="relative flex justify-center items-center w-full h-full"
        >
          {/* Icon glow */}
          <div className="absolute inset-1 rounded-full bg-[#4F7FFF]/10 blur-md" />

          <div className="relative w-[88%] h-[88%] rounded-full bg-white flex items-center justify-center p-1">
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-[92%] h-[92%] object-contain rounded-full overflow-hidden"
            />
          </div>
        </motion.div>
      }
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="experience-card group relative overflow-hidden rounded-3xl p-[1px]"
      >
        {/* Mouse-following spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(79,127,255,0.14), transparent 40%)",
          }}
        />

        {/* Animated border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4F7FFF]/40 via-white/[0.04] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative rounded-3xl bg-[#101014]/95 backdrop-blur-xl border border-white/[0.06] p-7 sm:p-8 overflow-hidden">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#4F7FFF]/10 blur-[90px] opacity-40 group-hover:opacity-80 transition-opacity duration-700" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#8B5CF6]/5 blur-[90px]" />

          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:30px_30px]" />

          {/* Top row */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div>
              <motion.h3
                whileHover={{ x: 3 }}
                className="text-white text-[24px] font-bold tracking-tight"
              >
                {experience.title}
              </motion.h3>

              <p
                className="mt-1 text-[#4F7FFF] text-[15px] font-semibold"
                style={{ marginBottom: 0 }}
              >
                {experience.company_name}
              </p>
            </div>

            {/* Active indicator */}
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F7FFF] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4F7FFF]" />
              </span>

              <span className="text-[10px] text-secondary uppercase tracking-[0.15em]">
                Experience
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-10 mt-6 h-[1px] bg-gradient-to-r from-[#4F7FFF]/30 via-white/[0.08] to-transparent" />

          {/* Timeline points */}
          <ul className="relative z-10 mt-6 space-y-4">
            {experience.points.map((point, pointIndex) => (
              <motion.li
                key={`experience-point-${index}-${pointIndex}`}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1 + pointIndex * 0.08,
                }}
                className="group/point flex items-start gap-3"
              >
                {/* Bullet */}
                <span className="relative mt-[7px] flex-shrink-0 w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#4F7FFF]/30 blur-sm" />

                  <span className="relative block w-2 h-2 rounded-full bg-[#4F7FFF] transition-transform duration-300 group-hover/point:scale-150" />
                </span>

                <span className="text-white/75 text-[14px] leading-[23px] tracking-wide group-hover/point:text-white/95 transition-colors duration-300">
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div className="relative z-10 mt-7 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-white/[0.06]" />

            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-[#4F7FFF]" />
              <span className="w-1 h-1 rounded-full bg-[#4F7FFF]/50" />
              <span className="w-1 h-1 rounded-full bg-[#4F7FFF]/20" />
            </div>
          </div>

          {/* Hover shine */}
          <div className="pointer-events-none absolute -inset-[100%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent group-hover:translate-x-[200%] transition-transform duration-[1400ms]" />
        </div>
      </motion.div>
    </VerticalTimelineElement>
  );
};

/* ---------------------------------------------
   Experience Section
--------------------------------------------- */

const Experience = () => {
  return (
    <>
      {/* Heading */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          4+ years of shipping iOS apps
        </p>

        <h2 className={styles.sectionHeadText}>
          Work Experience
          <span className="text-[#4F7FFF]">.</span>
        </h2>
      </motion.div>

      {/* Intro */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-5 max-w-3xl"
      >
        <p className="text-secondary text-[16px] leading-[28px]">
          A track record of building, shipping, and maintaining production
          iOS applications across healthcare, AI, social, and
          real-time communication.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="mt-20 relative">
        {/* Ambient glow behind timeline */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[700px] rounded-full bg-[#4F7FFF]/5 blur-[140px]" />

        <VerticalTimeline
          lineColor="rgba(79,127,255,0.22)"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </VerticalTimeline>
      </div>

      {/* Bottom indicator */}
      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-8 flex justify-center"
      >
        <div className="flex items-center gap-3 text-secondary text-[10px] uppercase tracking-[0.2em]">
          <span className="w-8 h-[1px] bg-line" />
          Career journey
          <span className="w-8 h-[1px] bg-line" />
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "work");