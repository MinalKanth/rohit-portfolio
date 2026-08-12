import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    value: "4+",
    label: "Years of experience",
    description: "Building production software",
  },
  {
    value: "11+",
    label: "Apps shipped",
    description: "Across multiple industries",
  },
  {
    value: "20+",
    label: "Technologies",
    description: "Tools & platforms mastered",
  },
  {
    value: "01",
    label: "Healthcare client",
    description: "Production-scale software",
  },
];

/* =========================================================
   MOUSE SPOTLIGHT HOOK
========================================================= */

const useSpotlight = () => {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return {
    ref,
    handleMouseMove,
  };
};

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = ({ index, title, icon }) => {
  const [hovered, setHovered] = useState(false);

  const { ref, handleMouseMove } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.12, 0.7)}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -12,
        scale: 1.025,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className="
        group
        relative
        h-[260px]
        overflow-hidden
        rounded-[28px]
        cursor-pointer
        transform-gpu
      "
      style={{
        background: `
          radial-gradient(
            180px circle at var(--mouse-x) var(--mouse-y),
            rgba(79,127,255,0.16),
            transparent 70%
          ),
          rgba(13,13,18,0.92)
        `,
      }}
    >
      {/* Outer border */}

      <div
        className="
          absolute
          inset-0
          rounded-[28px]
          border
          border-white/[0.07]
          transition-all
          duration-500
          group-hover:border-[#4F7FFF]/40
        "
      />

      {/* Animated glow */}

      <motion.div
        animate={{
          opacity: hovered ? 0.35 : 0,
          scale: hovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#4F7FFF]/20
          blur-[70px]
        "
      />

      {/* Grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
          bg-[size:30px_30px]
        "
      />

      {/* Number */}

      <div className="absolute right-6 top-6 z-10">
        <span
          className={`
            text-[9px]
            font-semibold
            tracking-[0.25em]
            uppercase
            transition-colors
            duration-300
            ${
              hovered
                ? "text-[#4F7FFF]"
                : "text-white/20"
            }
          `}
        >
          0{index + 1}
        </span>
      </div>

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col justify-between p-7">

        {/* Icon */}

        <motion.div
          animate={{
            y: hovered ? -5 : 0,
            rotate: hovered ? 6 : 0,
            scale: hovered ? 1.08 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
          }}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            backdrop-blur-xl
            shadow-[0_10px_40px_-20px_rgba(79,127,255,0.8)]
            group-hover:border-[#4F7FFF]/30
          "
        >
          <img
            src={icon}
            alt={title}
            className="
              h-9
              w-9
              object-contain
              opacity-80
              transition-all
              duration-500
              group-hover:opacity-100
            "
          />
        </motion.div>

        {/* Bottom */}

        <div>
          <div className="mb-4 flex items-center gap-3">

            <span className="h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-14 group-hover:bg-[#4F7FFF]/60" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/25">
              Capability
            </span>

          </div>

          <h3
            className="
              text-[18px]
              font-semibold
              tracking-tight
              text-white
              transition-all
              duration-300
              group-hover:text-[#F5F7FF]
            "
          >
            {title}
          </h3>

          {/* Active line */}

          <motion.div
            animate={{
              width: hovered ? "100%" : "18%",
            }}
            transition={{ duration: 0.4 }}
            className="
              mt-5
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-[#4F7FFF]
              via-[#7C8FFF]
              to-transparent
            "
          />
        </div>
      </div>

      {/* Shine */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-[100%]
          rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/[0.06]
          to-transparent
          transition-transform
          duration-[1200ms]
          group-hover:translate-x-[200%]
        "
      />
    </motion.div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ stat, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.7)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        group
        relative
        overflow-hidden
        border-r
        border-white/[0.06]
        px-5
        py-9
        last:border-r-0
        sm:px-7
      "
    >
      {/* Background */}

      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-[#4F7FFF]/[0.08]
          to-transparent
        "
      />

      {/* Number */}

      <div className="relative z-10">

        <motion.div
          animate={{
            y: hovered ? -3 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
          }}
          className="
            font-display
            text-[34px]
            font-bold
            leading-none
            tracking-[-0.04em]
            text-white
            transition-colors
            duration-300
            group-hover:text-[#4F7FFF]
          "
        >
          {stat.value}
        </motion.div>

        <p className="mt-3 text-[12px] font-medium text-white/55">
          {stat.label}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-white/20">
          {stat.description}
        </p>
      </div>

      {/* Bottom indicator */}

      <motion.div
        animate={{
          width: hovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.45 }}
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          bg-gradient-to-r
          from-[#4F7FFF]
          via-[#7C8FFF]
          to-transparent
        "
      />
    </motion.div>
  );
};

/* =========================================================
   ABOUT
========================================================= */

const About = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative"
    >

      {/* =====================================================
          GLOBAL SECTION SPOTLIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-0
          transition-opacity
          duration-500
          lg:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              420px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(79,127,255,0.055),
              transparent 70%
            )
          `,
        }}
      />

      <div className="relative z-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div variants={textVariant()}>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[#4F7FFF]
                    opacity-40
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-[#4F7FFF]
                    shadow-[0_0_14px_rgba(79,127,255,0.9)]
                  "
                />

              </span>

              <p className={styles.sectionSubText}>
                Introduction
              </p>

            </div>

          </div>

          <h2 className={styles.sectionHeadText}>
            Overview
            <span className="text-[#4F7FFF]">.</span>
          </h2>

        </motion.div>

        {/* =====================================================
            INTRODUCTION
        ===================================================== */}

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.8fr_1fr]">

          {/* Main card */}

          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{
              y: -5,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.07]
              bg-[#0D0D12]/80
              p-7
              backdrop-blur-2xl
              sm:p-9
            "
          >

            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -left-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-[#4F7FFF]/[0.07]
                blur-[90px]
                transition-all
                duration-700
                group-hover:bg-[#4F7FFF]/[0.13]
              "
            />

            {/* Border accent */}

            <div
              className="
                absolute
                bottom-8
                left-0
                top-8
                w-[2px]
                bg-gradient-to-b
                from-[#4F7FFF]
                via-[#4F7FFF]/40
                to-transparent
              "
            />

            <div className="relative z-10">

              {/* Label */}

              <div className="mb-7 flex items-center gap-3">

                <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Profile
                </span>

                <div className="h-px w-10 bg-white/10" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-[#4F7FFF]/70">
                  iOS Engineering
                </span>

              </div>

              <p className="max-w-3xl text-[15px] leading-[29px] text-white/55 sm:text-[16px]">

                I'm a dynamic, detail-oriented iOS Developer with 4+ years of
                experience building robust, user-friendly mobile applications
                in Swift and Objective-C. I've shipped 11+ apps across
                telehealth, AI, social/live streaming, and fintech-adjacent
                domains — from real-time video consultations to live
                broadcasting platforms — with a proven track record of
                delivering on time without compromising code quality.

                <br />
                <br />

                I'm currently working directly with a US-based healthcare
                client, maintaining and enhancing their production iOS
                applications for clinicians and patients.

              </p>

              {/* Status */}

              <div className="mt-8 flex items-center gap-3">

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2">

                  <span className="relative flex h-1.5 w-1.5">

                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                  </span>

                  <span className="text-[9px] uppercase tracking-[0.16em] text-emerald-300/60">
                    Currently building
                  </span>

                </div>

                <span className="text-[10px] text-white/20">
                  Production iOS software
                </span>

              </div>

            </div>

          </motion.div>

          {/* Philosophy */}

          <motion.div
            variants={fadeIn("left", "spring", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{
              y: -7,
              scale: 1.01,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.07]
              bg-[#0D0D12]/80
              p-7
              backdrop-blur-2xl
              sm:p-8
            "
          >

            {/* Violet glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-64
                w-64
                rounded-full
                bg-violet-500/[0.08]
                blur-[90px]
                transition-all
                duration-700
                group-hover:bg-violet-500/[0.15]
              "
            />

            <div className="relative z-10 flex h-full flex-col justify-between">

              <div>

                <div className="mb-5 flex items-center justify-between">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#4F7FFF]">
                    Philosophy
                  </p>

                  <span className="text-[9px] text-white/15">
                    01
                  </span>

                </div>

                <div className="mb-1 font-serif text-[60px] leading-none text-white/[0.08]">
                  “
                </div>

                <p className="text-[18px] font-medium leading-[29px] text-white/80">
                  Ship products that feel inevitable — fast, stable, and
                  quietly well-engineered under the hood.
                </p>

              </div>

              <div className="mt-10 flex items-center gap-3">

                <div className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                  Engineering mindset
                </span>

              </div>

            </div>

          </motion.div>

        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-10 overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0B0B10]/70 backdrop-blur-xl">

          <div className="grid grid-cols-2 sm:grid-cols-4">

            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
              />
            ))}

          </div>

        </div>

        {/* =====================================================
            CAPABILITIES HEADER
        ===================================================== */}

        <motion.div
          variants={fadeIn("", "", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-7 mt-16 flex items-center gap-4"
        >

          <div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#4F7FFF]">
              What I do
            </p>

            <p className="mt-1 text-[13px] text-white/30">
              Core capabilities
            </p>

          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />

          <div className="hidden items-center gap-2 sm:flex">

            <span className="h-1 w-1 rounded-full bg-[#4F7FFF]" />

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
              Interactive
            </span>

          </div>

        </motion.div>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
            />
          ))}

        </div>

        {/* =====================================================
            BOTTOM SIGNATURE
        ===================================================== */}

        <motion.div
          variants={fadeIn("", "", 0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >

          <div className="flex items-center gap-4">

            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
              Crafted with precision
            </span>

            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default SectionWrapper(About, "about");