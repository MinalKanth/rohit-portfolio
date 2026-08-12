import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.69-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V8.98h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.48v6.28ZM5.34 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.57V8.98H3.56v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:kevatrohit63@gmail.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <path
            d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m3 7 9 6 9-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* =========================================================
          PREMIUM BACK TO TOP
      ========================================================= */}

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            initial={{
              opacity: 0,
              scale: 0.6,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              group
              fixed
              bottom-7
              right-7
              z-[100]
              flex
              h-14
              w-14
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/[0.10]
              bg-[#0B0D13]/85
              shadow-[0_15px_45px_-15px_rgba(0,0,0,0.8)]
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:border-[#4F7FFF]/50
              hover:shadow-[0_18px_50px_-12px_rgba(79,127,255,0.45)]
              sm:bottom-8
              sm:right-8
            "
          >
            {/* Ambient glow */}
            <span
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                bg-[#4F7FFF]/10
                opacity-0
                blur-xl
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            {/* Rotating outer ring */}
            <span
              className="
                pointer-events-none
                absolute
                inset-[2px]
                rounded-full
                border
                border-transparent
                border-t-[#4F7FFF]
                border-r-[#4F7FFF]/30
                opacity-80
                transition-transform
                duration-700
                group-hover:rotate-[180deg]
              "
            />

            {/* Inner ring */}
            <span
              className="
                pointer-events-none
                absolute
                inset-[7px]
                rounded-full
                border
                border-white/[0.05]
                transition-all
                duration-300
                group-hover:border-[#4F7FFF]/20
              "
            />

            {/* Arrow */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="
                relative
                z-10
                h-[18px]
                w-[18px]
                text-white/70
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:text-[#4F7FFF]
              "
            >
              <path
                d="M12 19V5M6 11L12 5L18 11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Bottom neon glow */}
            <span
              className="
                pointer-events-none
                absolute
                bottom-[4px]
                left-1/2
                h-[2px]
                w-7
                -translate-x-1/2
                rounded-full
                bg-[#4F7FFF]
                opacity-0
                blur-[3px]
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[#07080c]">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-0 h-[260px] w-[420px] rounded-full bg-[#4F7FFF]/[0.07] blur-[120px]" />

          <div className="absolute bottom-0 right-[10%] h-[220px] w-[350px] rounded-full bg-violet-500/[0.05] blur-[120px]" />

          {/* Grid */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              bg-[size:45px_45px]
            "
          />
        </div>

        {/* Top glow line */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4F7FFF]/60 to-transparent shadow-[0_0_25px_rgba(79,127,255,0.5)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Status */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Available for new projects
                </span>
              </div>

              {/* Name */}
              <h3 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                Rohit
                <span className="ml-2 text-white/30">—</span>{" "}
                <span className="bg-gradient-to-r from-[#4F7FFF] via-[#7C8FFF] to-[#A78BFA] bg-clip-text text-transparent">
                  iOS Developer
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/40">
                Designing and shipping thoughtful iOS experiences with Swift,
                SwiftUI, and a relentless attention to detail.
              </p>

              {/* Tech signature */}
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {["Swift", "SwiftUI", "iOS", "App Store"].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[0.12em]
                      text-white/30
                      transition-all
                      duration-300
                      hover:border-[#4F7FFF]/30
                      hover:bg-[#4F7FFF]/[0.06]
                      hover:text-[#4F7FFF]
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-start lg:items-end"
            >
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/25">
                Connect
              </p>

              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noreferrer"
                    }
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      group
                      flex
                      items-center
                      gap-2.5
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      px-4
                      py-3
                      text-white/40
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-[#4F7FFF]/30
                      hover:bg-[#4F7FFF]/[0.07]
                      hover:text-white
                      hover:shadow-[0_12px_35px_-15px_rgba(79,127,255,0.6)]
                    "
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-[#4F7FFF]">
                      {social.icon}
                    </span>

                    <span className="text-[11px] font-medium">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-[10px] tracking-wide text-white/20">
              © {new Date().getFullYear()} Rohit. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                Built with
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
                React
              </span>

              <span className="h-1 w-1 rounded-full bg-[#4F7FFF]/60" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Three.js
              </span>

              <span className="h-1 w-1 rounded-full bg-[#4F7FFF]/60" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
                Framer Motion
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;