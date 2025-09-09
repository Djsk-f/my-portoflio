"use client";

import { Button } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { ThemeToggleSelect } from "./ui/color-mode"; // ✅ importe ton bouton

// MotionButton pour pouvoir animer le Chakra Button
const MotionButton = motion(Button);

// Animation variants
const headerVariants: Variants = {
  // hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const navItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  hover: {
    y: -3,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Variantes pour l'animation du header lors du scroll
const scrollVariants: Variants = {
  top: {
    backgroundColor: "transparent",
    filter: "blur(0px)",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  scrolled: {
    // backgroundColor: "rgba(3, 6, 49, 0.95)",
    backgroundColor: "#030631",
    // filter: "blur(5px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`cv-header ${isScrolled ? "scrolled" : ""}`}
      animate={isScrolled ? "scrolled" : "top"}
      variants={{ ...headerVariants, ...scrollVariants }}
      // style={{
      //   transform: `translateY(${Math.min(scrollY * -0.1, 0)}px)`,
      // }}
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
          {/* ✅ Remplace ton MotionButton Français par le ThemeToggleButton */}
          <ThemeToggleSelect isScrolled={isScrolled} />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
