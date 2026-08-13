import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { styles } from "../styles";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const TechCard = ({ technology, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    mouseX.set((percentX - 0.5) * 10);
    mouseY.set((percentY - 0.5) * -10);

    cardRef.current.style.setProperty(
      "--mouse-x",
      `${percentX * 100}%`
    );

    cardRef.current.style.setProperty(
      "--mouse-y",
      `${percentY * 100}%`
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.07, 0.65)}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        animate={{
          y: hovered ? -10 : 0,
          scale: hovered ? 1.025 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        className="
          group
          relative
          w-[150px]
          h-[190px]
          sm:w-[165px]
          sm:h-[205px]
          cursor-pointer
        "
      >
        {/* Outer glow */}
        <div
          className={`
            absolute
            -inset-[1px]
            rounded-[28px]
            transition-all
            duration-500
            ${
              hovered
                ? "bg-gradient-to-br from-[#4F7FFF]/80 via-[#4F7FFF]/20 to-transparent"
                : "bg-white/[0.06]"
            }
          `}
        />

        {/* Card */}
        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[27px]
            border
            border-white/[0.07]
            bg-[#0B0C10]/95
            backdrop-blur-2xl
            shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]
          "
        >
          {/* Cursor spotlight */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
            style={{
              background:
                "radial-gradient(220px circle at var(--mouse-x) var(--mouse-y), rgba(79,127,255,0.18), transparent 65%)",
            }}
          />

          {/* Fine grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
              bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
              bg-[size:24px_24px]
            "
          />

          {/* Top metadata */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/25">
              TECH_{String(index + 1).padStart(2, "0")}
            </span>

            <motion.span
              animate={{
                scale: hovered ? [1, 1.4, 1] : 1,
                opacity: hovered ? 1 : 0.35,
              }}
              transition={{
                duration: 1.4,
                repeat: hovered ? Infinity : 0,
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#4F7FFF]
                shadow-[0_0_12px_rgba(79,127,255,0.9)]
              "
            />
          </div>

          {/* Icon area */}
          <div className="absolute left-0 right-0 top-[28px] flex justify-center">
            <motion.div
              animate={{
                y: hovered ? -4 : 0,
                scale: hovered ? 1.08 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 15,
              }}
              className="relative h-[115px] w-[115px]"
            >
              {/* Halo */}
              <motion.div
                animate={{
                  scale: hovered ? 1.25 : 1,
                  opacity: hovered ? 0.28 : 0.08,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  absolute
                  inset-[15px]
                  rounded-full
                  bg-[#4F7FFF]
                  blur-3xl
                "
              />

              <div className="relative h-full w-full flex items-center justify-center">
                {isMobile ? (
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <BallCanvas icon={technology.icon} />
                )}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className="
              absolute
              left-5
              right-5
              bottom-[52px]
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
            "
          />

          {/* Technology name */}
          <div className="absolute bottom-5 left-4 right-4 z-20 text-center">
            <motion.p
              animate={{
                color: hovered ? "#FFFFFF" : "#9A9AA3",
              }}
              className="
                text-[12px]
                font-semibold
                tracking-wide
              "
            >
              {technology.name}
            </motion.p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
            >
              Core Technology
            </p>
          </div>

          {/* Active bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute
              bottom-0
              left-5
              right-5
              h-[2px]
              origin-center
              bg-gradient-to-r
              from-transparent
              via-[#4F7FFF]
              to-transparent
            "
          />

          {/* Moving shine */}
          <motion.div
            initial={{
              x: "-120%",
              opacity: 0,
            }}
            animate={{
              x: hovered ? "120%" : "-120%",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              top-0
              bottom-0
              w-[40%]
              rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/[0.07]
              to-transparent
            "
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <>
      {/* Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#4F7FFF]" />

          <p className={styles.sectionSubText}>
            Tools, frameworks & platforms
          </p>
        </div>

        <h2 className={styles.sectionHeadText}>
          Tech Stack
          <span className="text-[#4F7FFF]">.</span>
        </h2>
      </motion.div>

      {/* Introduction */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-3xl"
      >
        <p className="text-secondary text-[15px] sm:text-[16px] leading-[28px]">
          A production-focused toolkit built around native iOS development,
          modern backend services, real-time communication, payments, and
          cloud infrastructure.
        </p>
      </motion.div>

      {/* Stack */}
      <div className="relative mt-16 sm:mt-20">
        {/* Ambient center glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#4F7FFF]
            blur-[140px]
          "
        />

        {/* Orbital rings */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            hidden
            lg:block
            h-[520px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/[0.025]
          "
        >
          <span
            className="
              absolute
              -top-1
              left-1/2
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-[#4F7FFF]
              shadow-[0_0_20px_rgba(79,127,255,0.9)]
            "
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            hidden
            lg:block
            h-[380px]
            w-[380px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/[0.02]
          "
        >
          <span
            className="
              absolute
              bottom-8
              right-8
              h-1
              w-1
              rounded-full
              bg-white/30
            "
          />
        </motion.div>

        {/* Center pulse */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            hidden
            lg:flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
          "
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-24
              w-24
              rounded-full
              border
              border-[#4F7FFF]/20
              bg-[#4F7FFF]/[0.025]
              backdrop-blur-sm
            "
          />

          <div
            className="
              absolute
              h-2
              w-2
              rounded-full
              bg-[#4F7FFF]
              shadow-[0_0_25px_rgba(79,127,255,1)]
            "
          />
        </div>

        {/* Cards */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            max-w-6xl
            flex-wrap
            justify-center
            gap-5
            sm:gap-7
            lg:gap-8
          "
        >
          {technologies.map((technology, index) => (
            <TechCard
              key={technology.name}
              technology={technology}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        variants={fadeIn("", "", 0.25, 1)}
        className="mt-14 flex justify-center"
      >
        <div
          className="
            flex
            items-center
            gap-3
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.02]
            px-5
            py-2.5
            backdrop-blur-sm
          "
        >
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#4F7FFF]
              shadow-[0_0_10px_rgba(79,127,255,0.8)]
            "
          />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            Move your cursor to explore
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "");