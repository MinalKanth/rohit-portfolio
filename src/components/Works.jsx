import Tilt from "react-tilt";
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
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 12, scale: 1.01, speed: 450 }}
        className="surface p-5 rounded-2xl sm:w-[360px] w-full transition-colors duration-300 hover:border-accent/40"
      >
        <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-black-200/80 backdrop-blur-sm w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-line hover:border-accent transition-colors"
            >
              <img
                src={appstore}
                alt="View on App Store"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white-100 font-semibold text-[19px] tracking-tight">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-[22px]">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[12px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Shipped to the App Store</p>
        <h2 className={styles.sectionHeadText}>
          My Apps<span className="text-[#4F7FFF]">.</span>
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          11+ production iOS apps shipped across telehealth, AI, fintech-style
          payments, and live social/streaming platforms — spanning real-time
          video, chat, in-app purchases, and CloudKit-backed sync. Tap the App
          Store icon on any card to see it live.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "apps");