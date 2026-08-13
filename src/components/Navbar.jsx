import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setToggle(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (title) => {
    setActive(title);
    setToggle(false);
  };

  return (
    <>
      <nav
        className={`
          ${styles.paddingX}
          fixed
          top-0
          left-0
          w-full
          z-50
          transition-all
          duration-500
          ease-out
          ${
            scrolled
              ? "py-3"
              : "py-5"
          }
        `}
        style={{ paddingTop: `max(${scrolled ? "0.75rem" : "1.25rem"}, env(safe-area-inset-top))` }}
      >
        <div
          className={`
            max-w-7xl
            mx-auto
            relative
            flex
            items-center
            justify-between
            rounded-2xl
            px-4
            sm:px-5
            transition-all
            duration-500
            ${
              scrolled
                ? "nav-glass border border-white/[0.08] shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)]"
                : "bg-transparent"
            }
          `}
        >
          {/* Subtle top highlight */}
          {scrolled && (
            <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#4F7FFF]/60 to-transparent" />
          )}

          {/* Logo */}
          <Link
            to="/"
            className="group relative flex items-center gap-3 py-2"
            onClick={() => {
              setActive("");
              setToggle(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute h-9 w-9 rounded-full bg-[#4F7FFF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                  transition-all
                  duration-300
                  group-hover:border-[#4F7FFF]/40
                  group-hover:bg-[#4F7FFF]/10
                  group-hover:scale-105
                "
              >
                <img
                  src={logo}
                  alt="Rohit logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>

            <div className="hidden xs:block">
              <p className="text-white-100 text-[15px] font-semibold tracking-tight leading-none">
                Rohit
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-secondary">
                iOS Developer
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.title;

              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => handleNavClick(link.title)}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-4
                      py-2.5
                      text-[13px]
                      font-medium
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-secondary hover:text-white"
                      }
                    `}
                  >
                    {/* Active background */}
                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-xl
                        bg-white/[0.045]
                        border
                        border-white/[0.06]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                    {/* Active dot */}
                    <span
                      className={`
                        relative
                        z-10
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#4F7FFF]
                        shadow-[0_0_10px_rgba(79,127,255,0.9)]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-100"
                        }
                      `}
                    />

                    <span className="relative z-10">{link.title}</span>

                    {/* Bottom active line */}
                    <span
                      className={`
                        absolute
                        bottom-1
                        left-1/2
                        h-px
                        -translate-x-1/2
                        rounded-full
                        bg-gradient-to-r
                        from-transparent
                        via-[#4F7FFF]
                        to-transparent
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "w-5 opacity-100"
                            : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                        }
                      `}
                    />
                  </a>
                </li>
              );
            })}

            {/* CTA */}
            <li className="ml-3">
              <a
                href="#contact"
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#4F7FFF]/30
                  bg-[#4F7FFF]/10
                  px-4
                  py-2.5
                  text-[12px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#4F7FFF]/60
                  hover:bg-[#4F7FFF]/20
                  hover:shadow-[0_0_30px_rgba(79,127,255,0.2)]
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#4F7FFF] shadow-[0_0_8px_#4F7FFF]" />

                <span className="relative z-10">Let's talk</span>

                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
            className="
              sm:hidden
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              transition-all
              duration-300
              hover:border-[#4F7FFF]/40
              hover:bg-[#4F7FFF]/10
            "
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-[20px] h-[20px] object-contain"
            />
          </button>

          {/* Mobile navigation */}
          <div
            className={`
              sm:hidden
              absolute
              top-[calc(100%+10px)]
              left-0
              right-0
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0b0b10]/95
              backdrop-blur-2xl
              shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)]
              transition-all
              duration-400
              origin-top
              ${
                toggle
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-[0.98] -translate-y-2 pointer-events-none"
              }
            `}
          >
            {/* Mobile glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#4F7FFF]/10 blur-3xl" />

            <div className="relative p-4">
              <div className="mb-3 px-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-secondary">
                  Navigation
                </p>
              </div>

              <ul className="flex flex-col gap-1">
                {navLinks.map((nav) => {
                  const isActive = active === nav.title;

                  return (
                    <li key={nav.id}>
                      <a
                        href={`#${nav.id}`}
                        onClick={() => handleNavClick(nav.title)}
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3.5
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "bg-white/[0.06] text-white"
                              : "text-secondary hover:bg-white/[0.04] hover:text-white"
                          }
                        `}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-[#4F7FFF]
                              transition-all
                              ${
                                isActive
                                  ? "opacity-100 shadow-[0_0_10px_#4F7FFF]"
                                  : "opacity-0 group-hover:opacity-60"
                              }
                            `}
                          />

                          <span className="text-[13px] font-medium">
                            {nav.title}
                          </span>
                        </span>

                        <span
                          className={`
                            text-[13px]
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "text-[#4F7FFF] translate-x-0"
                                : "text-white/20 -translate-x-1 group-hover:text-white/50 group-hover:translate-x-0"
                            }
                          `}
                        >
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <a
                href="#contact"
                onClick={() => setToggle(false)}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#4F7FFF]/30
                  bg-[#4F7FFF]/10
                  px-4
                  py-3.5
                  text-[12px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#4F7FFF]/20
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F7FFF] shadow-[0_0_8px_#4F7FFF]" />
                Let's talk
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;