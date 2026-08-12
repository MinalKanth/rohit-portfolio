import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

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
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) {
      setStatus(null);
    }
  };

  const openMailClient = () => {
    const subject = `New portfolio enquiry from ${form.name}`;

    const body = `Hello Rohit,

You have received a new message through your portfolio.

Name: ${form.name}
Email: ${form.email}

Message:
${form.message}

--------------------------------
Sent from your portfolio website.
`;

    const mailtoUrl =
      `mailto:kevatrohit63@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please complete all fields before sending.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Rohit",
          from_email: form.email,
          to_email: "kevatrohit63@gmail.com",
          message: form.message,
          reply_to: form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);

      setStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon.",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);

      setLoading(false);

      setStatus({
        type: "error",
        message:
          "Unable to send the message right now. Please use the email option below.",
      });
    }
  };

  return (
    <div className="relative xl:mt-12 flex xl:flex-row flex-col-reverse gap-12 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[350px] w-[350px] rounded-full bg-[#4F7FFF]/10 blur-[140px]" />

      {/* Contact form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="
          relative
          z-10
          flex-[0.75]
          overflow-hidden
          rounded-[30px]
          border
          border-white/[0.08]
          bg-[#0B0C10]/90
          p-7
          sm:p-9
          backdrop-blur-2xl
          shadow-[0_30px_100px_-35px_rgba(0,0,0,0.9)]
        "
      >
        {/* Background grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            bg-[size:32px_32px]
          "
        />

        {/* Top glow */}
        <div
          className="
            pointer-events-none
            absolute
            -top-32
            right-[-80px]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#4F7FFF]/10
            blur-[100px]
          "
        />

        <div className="relative z-10">
          {/* Heading */}
          <div>
            <div className="flex items-center gap-3">
              <motion.span
                animate={{
                  opacity: [0.35, 1, 0.35],
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
                  shadow-[0_0_12px_rgba(79,127,255,0.9)]
                "
              />

              <p className={styles.sectionSubText}>
                Let's build something
              </p>
            </div>

            <h3 className={`${styles.sectionHeadText} mt-2`}>
              Get In Touch
              <span className="text-[#4F7FFF]">.</span>
            </h3>

            <p className="mt-5 max-w-xl text-[14px] leading-6 text-secondary">
              Have an idea, product, or iOS project in mind? Tell me what
              you're building and let's turn it into something people love
              to use.
            </p>
          </div>

          {/* Contact information */}
          <div className="mt-7 flex flex-wrap gap-3">
            <div
              className="
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-4
                py-2
                text-[11px]
                text-secondary
                backdrop-blur-sm
              "
            >
              Surat, Gujarat, India
            </div>

            <a
              href="tel:+918896561419"
              className="
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-4
                py-2
                text-[11px]
                text-secondary
                transition-colors
                hover:border-[#4F7FFF]/40
                hover:text-white
              "
            >
              +91 8896561419
            </a>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6"
          >
            {/* Name */}
            <label className="group flex flex-col">
              <span
                className="
                  mb-2.5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-secondary
                  transition-colors
                  group-focus-within:text-[#4F7FFF]
                "
              >
                Your Name
              </span>

              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/30
                  px-5
                  py-4
                  text-[14px]
                  font-medium
                  text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all
                  duration-300
                  focus:border-[#4F7FFF]/60
                  focus:bg-[#4F7FFF]/[0.025]
                  focus:shadow-[0_0_30px_rgba(79,127,255,0.08)]
                "
              />
            </label>

            {/* Email */}
            <label className="group flex flex-col">
              <span
                className="
                  mb-2.5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-secondary
                  transition-colors
                  group-focus-within:text-[#4F7FFF]
                "
              >
                Email Address
              </span>

              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/30
                  px-5
                  py-4
                  text-[14px]
                  font-medium
                  text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all
                  duration-300
                  focus:border-[#4F7FFF]/60
                  focus:bg-[#4F7FFF]/[0.025]
                  focus:shadow-[0_0_30px_rgba(79,127,255,0.08)]
                "
              />
            </label>

            {/* Message */}
            <label className="group flex flex-col">
              <div className="mb-2.5 flex items-center justify-between">
                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-secondary
                    transition-colors
                    group-focus-within:text-[#4F7FFF]
                  "
                >
                  Your Message
                </span>

                <span className="text-[10px] text-white/20">
                  {form.message.length}/1000
                </span>
              </div>

              <textarea
                required
                maxLength={1000}
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="
                  resize-none
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/30
                  px-5
                  py-4
                  text-[14px]
                  font-medium
                  leading-6
                  text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all
                  duration-300
                  focus:border-[#4F7FFF]/60
                  focus:bg-[#4F7FFF]/[0.025]
                  focus:shadow-[0_0_30px_rgba(79,127,255,0.08)]
                "
              />
            </label>

            {/* Status */}
            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className={`
                    rounded-2xl
                    border
                    px-4
                    py-3
                    text-[12px]
                    ${
                      status.type === "success"
                        ? "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300"
                        : "border-red-400/20 bg-red-400/[0.05] text-red-300"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                          status.type === "success"
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }
                      `}
                    />

                    {status.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.02,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#4F7FFF]/30
                  bg-[#4F7FFF]
                  px-7
                  py-4
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_15px_40px_-15px_rgba(79,127,255,0.8)]
                  transition-all
                  duration-300
                  hover:bg-[#5c89ff]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Message

                    <span className="text-white/70">→</span>
                  </>
                )}

                {/* Shine */}
                {!loading && (
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-[100%]
                      w-1/2
                      rotate-12
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform
                      duration-700
                      hover:left-[150%]
                    "
                  />
                )}
              </motion.button>

              {/* Mail fallback */}
              <button
                type="button"
                onClick={openMailClient}
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-7
                  py-4
                  text-[13px]
                  font-semibold
                  text-secondary
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-white/[0.16]
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                Open Mail App
              </button>
            </div>
          </form>

          {/* Bottom note */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Usually replies within 24h
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Earth */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="
          relative
          xl:flex-1
          xl:h-auto
          md:h-[550px]
          h-[380px]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            bg-[#4F7FFF]/[0.04]
            blur-[100px]
          "
        />

        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");