"use client";

import { headerVariants, itemVariants, navItemVariants, scrollVariants } from "../app/animations/header.animation";
import { ThemeToggleSelect } from "./ui/color-mode";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`cv-header ${isScrolled ? "scrolled" : ""}`}
      animate={isScrolled ? "scrolled" : "top"}
      variants={{ ...headerVariants, ...scrollVariants }}
    >
      <motion.span
        className="myName"
        variants={itemVariants}
        whileHover={{
          scale: 1.05,
          color: "#007bff",
          transition: { duration: 0.2 },
        }}
        animate={{
          fontSize: isScrolled ? "1.1rem" : "1.2rem",
        }}
        transition={{ duration: 0.3 }}
      >
        Fidele Loffou
      </motion.span>

      <motion.nav className="cv-navbar" variants={itemVariants}>
        <motion.ul className="cv-navbar__list" variants={headerVariants}>
          {[
            { href: "#about", text: "À propos" },
            { href: "#skills", text: "Compétences" },
            { href: "#experience", text: "Expérience" },
            { href: "#projects", text: "Projets" },
            { href: "#contact", text: "Contact" },
          ].map((item, index) => (
            <motion.li
              key={item.href}
              className="cv-navbar__item"
              variants={navItemVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.a
                href={item.href}
                whileHover={{
                  color: "#007bff",
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
                animate={{
                  fontSize: isScrolled ? "0.9rem" : "1rem",
                }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(
                    item.href
                  ) as HTMLElement | null;
                  if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {item.text}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      <motion.div className="translate" variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThemeToggleSelect isScrolled={isScrolled} />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
