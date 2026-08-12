import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ index, testimonial }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    setRotation({
      x: rotateX,
      y: rotateY,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.7)}
      className="group w-full sm:w-[380px] lg:w-[390px]"
      style={{
        perspective: "1400px",
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          y: isHovered ? -10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
          mass: 0.7,
        }}
        className="
          relative
          min-h-[390px]
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.08]
          bg-[#0c0d12]
          p-7
          cursor-default
          transform-gpu
          shadow-[0_25px_80px_-35px_rgba(0,0,0,0.9)]
          transition-shadow
          duration-500
          group-hover:shadow-[0_35px_100px_-30px_rgba(79,127,255,0.35)]
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated ambient glow */}
        <motion.div
          animate={{
            x: isHovered ? 20 : 0,
            y: isHovered ? -15 : 0,
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.35 : 0.16,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-[#4F7FFF]
            blur-[90px]
          "
          style={{
            transform: "translateZ(-30px)",
          }}
        />

        {/* Secondary glow */}
        <motion.div
          animate={{
            x: isHovered ? -10 : 0,
            opacity: isHovered ? 0.2 : 0.08,
          }}
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-24
            h-56
            w-56
            rounded-full
            bg-violet-500
            blur-[100px]
          "
          style={{
            transform: "translateZ(-35px)",
          }}
        />

        {/* Premium grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            bg-[size:30px_30px]
          "
          style={{
            transform: "translateZ(-15px)",
          }}
        />

        {/* Top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <div
          className="relative z-10 h-full"
          style={{
            transform: "translateZ(40px)",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.045]
                text-2xl
                font-black
                text-[#4F7FFF]
                shadow-[0_10px_30px_-10px_rgba(79,127,255,0.5)]
              "
            >
              “
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Verified
              </span>
            </div>
          </div>

          {/* Company */}
          <div className="mt-6">
            <span className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-[#4F7FFF]">
                {testimonial.company}
              </span>
            </span>
          </div>

          {/* Testimonial */}
          <div className="mt-5">
            <p className="text-[15px] leading-[26px] tracking-[0.01em] text-white/80">
              {testimonial.testimonial}
            </p>
          </div>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          {/* Person */}
          <div className="flex items-center gap-4">
            <div
              className="
                relative
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-gradient-to-br
                from-[#4F7FFF]
                via-[#6366F1]
                to-[#8B5CF6]
                text-[13px]
                font-bold
                text-white
                shadow-[0_10px_30px_-8px_rgba(79,127,255,0.8)]
              "
            >
              {testimonial.initials}

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-white">
                {testimonial.name}
              </p>

              <p className="mt-1 truncate text-[11px] text-white/45">
                {testimonial.designation}
              </p>

              <p className="mt-1 truncate text-[9px] uppercase tracking-[0.14em] text-white/25">
                {testimonial.company}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-2.5
                  py-1
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-white/35
                  transition-all
                  duration-300
                  group-hover:border-[#4F7FFF]/20
                  group-hover:text-white/55
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Mouse-follow shine */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white
            via-transparent
            to-transparent
          "
        />

        {/* Bottom edge glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scaleX: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.35 }}
          className="
            absolute
            bottom-0
            left-[15%]
            right-[15%]
            h-px
            origin-center
            bg-gradient-to-r
            from-transparent
            via-[#4F7FFF]
            to-transparent
            shadow-[0_0_20px_#4F7FFF]
          "
        />
      </motion.div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[32px] bg-[#08090d]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#4F7FFF]/[0.06]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-violet-500/[0.05]
            blur-[120px]
          "
        />
      </div>

      {/* Header */}
      <div
        className={`
          relative
          z-10
          ${styles.padding}
          min-h-[320px]
          rounded-[28px]
          border
          border-white/[0.05]
          bg-white/[0.015]
        `}
      >
        <motion.div variants={textVariant()}>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#4F7FFF]" />

            <p className={styles.sectionSubText}>
              What people say
            </p>
          </div>

          <h2 className={`${styles.sectionHeadText} mt-2`}>
            Testimonials
            <span className="text-[#4F7FFF]">.</span>
          </h2>

          <motion.p
            variants={fadeIn("", "", 0.15, 0.8)}
            className="
              mt-5
              max-w-2xl
              text-[14px]
              leading-7
              text-secondary
            "
          >
            A few perspectives from the people and teams I've worked with
            while designing, building, and shipping production iOS products.
          </motion.p>

          {/* Small status row */}
          <motion.div
            variants={fadeIn("", "", 0.25, 0.8)}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                Production experience
              </span>
            </div>

            <div className="h-3 w-px bg-white/10" />

            <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
              iOS · Swift · Product
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards */}
      <div
        className={`
          relative
          z-10
          -mt-16
          flex
          flex-wrap
          justify-center
          gap-8
          px-5
          pb-20
          sm:px-10
          lg:px-14
        `}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={`${testimonial.name}-${index}`}
            index={index}
            testimonial={testimonial}
          />
        ))}
      </div>

      {/* Bottom atmosphere */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090d] to-transparent" />
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");