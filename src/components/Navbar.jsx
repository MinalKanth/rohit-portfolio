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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-30 transition-all duration-500 ${
        scrolled ? "nav-glass border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          <p className="text-white-100 text-[15px] font-semibold cursor-pointer tracking-tight">
            Rohit
            <span className="text-secondary font-normal"> — iOS Developer</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="relative text-[14px] font-medium cursor-pointer group"
              onClick={() => setActive(link.title)}
            >
              <a
                href={`#${link.id}`}
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  active === link.title ? "text-white-100" : "text-secondary hover:text-white-100"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full bg-accent transition-opacity duration-200 ${
                    active === link.title ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                />
                {link.title}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-ghost !py-2 !px-5 text-[13px]">
              Let's talk
            </a>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[22px] h-[22px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 surface-elevated absolute top-16 right-0 mx-4 my-2 min-w-[170px] z-10 rounded-2xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[14px] ${
                    active === nav.title ? "text-accent" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
