import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full p-[1px] rounded-[20px] shadow-card bg-gradient-to-br from-[#FA7343] via-[#2DD4BF] to-transparent"
    >
      <div className="bg-tertiary/90 backdrop-blur-sm rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(250,115,67,0.4)]">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>
          Overview<span className="text-[#FA7343]">.</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a dynamic, detail-oriented iOS Developer with 4+ years of experience
        building robust, user-friendly mobile applications in Swift and
        Objective-C. I've shipped 11+ apps across telehealth, AI, social/live
        streaming, and fintech-adjacent domains — from real-time video
        consultations to live broadcasting platforms — with a proven track
        record of delivering on time without compromising code quality. I'm
        currently working directly with a US-based healthcare client,
        maintaining and enhancing their production iOS applications for
        clinicians and patients.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");