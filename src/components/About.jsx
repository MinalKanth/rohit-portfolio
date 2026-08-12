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
    className="surface rounded-2xl p-8 flex flex-col gap-6 transition-colors duration-300 hover:border-accent/40"
  >
    <img src={icon} alt={title} className="w-10 h-10 object-contain opacity-90" />
    <h3 className="text-white-100 text-[17px] font-semibold tracking-tight">{title}</h3>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className="mt-6 grid lg:grid-cols-3 gap-10 items-start">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="lg:col-span-2 text-secondary text-[16px] leading-[28px]"
        >
          I'm a dynamic, detail-oriented iOS Developer with 4+ years of
          experience building robust, user-friendly mobile applications in
          Swift and Objective-C. I've shipped 11+ apps across telehealth, AI,
          social/live streaming, and fintech-adjacent domains — from
          real-time video consultations to live broadcasting platforms —
          with a proven track record of delivering on time without
          compromising code quality. I'm currently working directly with a
          US-based healthcare client, maintaining and enhancing their
          production iOS applications for clinicians and patients.
        </motion.p>

        <motion.div
          variants={fadeIn("left", "spring", 0.2, 1)}
          className="surface rounded-2xl p-6"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-accent font-semibold mb-5">
            Philosophy
          </p>
          <p className="text-white-100 text-[15px] leading-[24px]">
            Ship products that feel inevitable — fast, stable, and quietly
            well-engineered under the hood.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 border-y border-line py-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeIn("up", "spring", i * 0.1, 0.6)}
            className="flex flex-col"
          >
            <span className="text-white-100 font-display font-bold text-[32px] leading-none">
              {stat.value}
            </span>
            <span className="mt-2 text-secondary text-[13px]">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
