import { Variants } from "framer-motion";

export const headerVariants: Variants = {
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

export const itemVariants: Variants = {
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

export const navItemVariants: Variants = {
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
export const scrollVariants: Variants = {
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
    backgroundColor: "#030631",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};