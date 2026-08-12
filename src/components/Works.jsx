
import { motion } from "framer-motion";

import { styles } from "../styles";
import { appstore } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.12, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative"
    >
      {/* Outer glow */}
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-accent/0 via-accent/20 to-violet-500/0 opacity-0 blur-sm transition-all duration-700 group-hover:opacity-100" />

      <div
  className="
    relative z-10 sm:w-[360px] w-full
    transition-transform duration-500 ease-out
    [transform-style:preserve-3d]
    group-hover:-translate-y-1
    group-hover:scale-[1.015]
  "
>
        <div
          className="
            relative overflow-hidden rounded-[24px]
            border border-white/[0.08]
            bg-[#0d0e13]/90
            backdrop-blur-xl
            shadow-[0_20px_70px_-30px_rgba(0,0,0,0.8)]
            transition-all duration-500
            group-hover:border-accent/30
            group-hover:shadow-[0_30px_90px_-30px_rgba(79,127,255,0.28)]
          "
        >
          {/* Cursor-like ambient glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/10 blur-3xl transition-all duration-700 group-hover:bg-accent/20" />

          {/* Top accent line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* App preview */}
          <div className="relative m-3 overflow-hidden rounded-[18px] border border-white/[0.06] bg-black">
            <div className="relative h-[230px] w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.08]
                "
              />

              {/* Image gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

              {/* Hover color wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* App Store button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => window.open(source_code_link, "_blank")}
                className="
                  absolute right-3 top-3
                  flex h-11 w-11 items-center justify-center
                  rounded-full
                  border border-white/15
                  bg-black/60
                  backdrop-blur-xl
                  shadow-lg
                  transition-all duration-300
                  hover:border-accent/60
                  hover:bg-accent/20
                "
                aria-label={`Open ${name} on the App Store`}
              >
                <img
                  src={appstore}
                  alt=""
                  className="h-5 w-5 object-contain"
                />
              </motion.button>

              {/* Bottom app label */}
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                  App Store
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative px-5 pb-5 pt-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className="
                    text-[20px] font-semibold tracking-tight text-white
                    transition-colors duration-300
                    group-hover:text-accent
                  "
                >
                  {name}
                </h3>

                <div className="mt-2 h-px w-8 bg-accent/60 transition-all duration-500 group-hover:w-14" />
              </div>

              {/* Arrow */}
              <div
                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full border border-white/10
                  text-white/40
                  transition-all duration-500
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:border-accent/40
                  group-hover:text-accent
                "
              >
                ↗
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-[22px] text-secondary">
              {description}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${name}-${tag.name}`}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.12 + tagIndex * 0.04,
                    duration: 0.3,
                  }}
                  viewport={{ once: true }}
                  className={`
                    rounded-full
                    border border-white/[0.06]
                    bg-white/[0.025]
                    px-2.5 py-1
                    text-[11px]
                    ${tag.color}
                    transition-all duration-300
                    hover:border-accent/30
                    hover:bg-accent/10
                  `}
                >
                  #{tag.name}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      {/* Heading */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <p className={styles.sectionSubText}>Shipped to the App Store</p>
        </div>

        <h2 className={styles.sectionHeadText}>
          My Apps<span className="text-accent">.</span>
        </h2>
      </motion.div>

      {/* Intro */}
      <div className="mt-6 w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="
            max-w-3xl
            text-[15px]
            leading-[26px]
            text-secondary
            sm:text-[16px]
            sm:leading-[28px]
          "
        >
          11+ production iOS apps shipped across telehealth, AI,
          fintech-style payments, and live social/streaming platforms —
          spanning real-time video, chat, in-app purchases, and
          CloudKit-backed sync.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.2, 1)}
          className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(79,127,255,0.8)]" />
          Hover a project to explore
        </motion.div>
      </div>

      {/* Projects */}
      <div className="mt-14 grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "apps");