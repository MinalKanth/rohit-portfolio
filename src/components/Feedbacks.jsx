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

    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;

    setRotation({
      x: rotateX,
      y: rotateY,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.25, 0.75)}
      className="group w-full xs:w-[350px]"
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          translateY: isHovered ? -8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
          mass: 0.7,
        }}
        className="
          relative
          min-h-[360px]
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-black-200
          p-8
          shadow-2xl
          transform-gpu
          cursor-default
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.35 : 0.15,
          }}
          className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#4F7FFF] blur-3xl"
          style={{
            transform: "translateZ(-20px)",
          }}
        />

        {/* Decorative grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            bg-[size:32px_32px]
          "
          style={{
            transform: "translateZ(-10px)",
          }}
        />

        {/* Quote */}
        <div
          className="relative z-10"
          style={{
            transform: "translateZ(45px)",
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-5xl font-black leading-none text-white/20">
              “
            </span>

            <div className="max-w-[180px] rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-secondary">
                {testimonial.company}
              </span>
            </div>
          </div>

          <p className="text-[16px] leading-7 tracking-wide text-white/90">
            {testimonial.testimonial}
          </p>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Person */}
          <div className="flex items-center gap-4 pb-10">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#4F7FFF]
                to-[#6d28d9]
                text-sm
                font-bold
                text-white
                shadow-lg
              "
            >
              {testimonial.initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-white">
                {testimonial.name}
              </p>

              <p className="mt-1 truncate text-[11px] text-secondary">
                {testimonial.designation}
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">
                {testimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tech tags */}
            <div
              className="absolute bottom-6 left-8 right-8 flex flex-wrap gap-2"
              style={{
                transform: "translateZ(30px)",
              }}
            >
              {testimonial.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-black/30
                    px-2.5
                    py-1
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-white/50
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

        {/* Shine */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.12 : 0,
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
      </motion.div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="mt-12 rounded-[20px] bg-black-100">
      <div
        className={`rounded-2xl bg-tertiary ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>

          <h2 className={styles.sectionHeadText}>
            Testimonials.
          </h2>

          <p className="mt-5 max-w-2xl text-[14px] leading-6 text-secondary">
            A few sample perspectives based on the kind of products,
            teams, and production environments I have worked with.
          </p>
          
        </motion.div>
      </div>

      <div
        className={`
          -mt-20
          flex
          flex-wrap
          justify-center
          gap-7
          pb-14
          ${styles.paddingX}
        `}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");