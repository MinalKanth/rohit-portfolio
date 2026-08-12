import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Rohit",
          from_email: form.email,
          to_email: "kevatrohit63@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] surface p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Let's build something</p>
        <h3 className={styles.sectionHeadText}>
          Get In Touch<span className="text-accent">.</span>
        </h3>

        <p className="mt-4 text-secondary text-[15px]">
          Surat, Gujarat, India &nbsp;·&nbsp; +91 8896561419
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white-100 font-medium mb-3 text-[14px]">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-black-100 py-4 px-5 placeholder:text-secondary text-white-100 rounded-xl outline-none border border-line focus:border-accent transition-colors font-medium text-[14px]"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white-100 font-medium mb-3 text-[14px]">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-black-100 py-4 px-5 placeholder:text-secondary text-white-100 rounded-xl outline-none border border-line focus:border-accent transition-colors font-medium text-[14px]"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white-100 font-medium mb-3 text-[14px]">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-black-100 py-4 px-5 placeholder:text-secondary text-white-100 rounded-xl outline-none border border-line focus:border-accent transition-colors font-medium text-[14px]"
            />
          </label>

          <button type="submit" className="btn-premium w-fit">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");