"use client";

import { headerVariants, itemVariants, navItemVariants, scrollVariants } from "../app/animations/header.animation";
import { ThemeToggleSelect } from "./ui/color-mode";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Breakpoint pour le menu mobile
const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Gestion du scroll avec throttling pour les performances
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 50);
  }, []);

  // Gestion du redimensionnement de la fenêtre
  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(isMobileView);

    // Fermer le menu mobile si on passe en desktop
    if (!isMobileView && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Toggle du menu mobile
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Fermer le menu lors du clic sur un lien
  const handleNavClick = useCallback((href: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Fermer le menu mobile
      setIsMobileMenuOpen(false);

      // Navigation smooth
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };
  }, []);

  // Gestion des événements de redimensionnement et de scroll
  useEffect(() => {
    // Initialisation
    handleResize();

    // Écouteurs d'événements avec options pour les performances
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup au démontage
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Navigation items
  const navigationItems = [
    { href: "#about", text: "À propos" },
    { href: "#skills", text: "Compétences" },
    { href: "#experience", text: "Expérience" },
    { href: "#projects", text: "Projets" },
    { href: "#contact", text: "Contact" },
  ];

  // Variantes d'animation pour le menu mobile
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
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

        {/* Navigation Desktop - cachée sur mobile */}
        {!isMobile && (
          <motion.nav className="cv-navbar" variants={itemVariants}>
            <motion.ul className="cv-navbar__list" variants={headerVariants}>
              {navigationItems.map((item, index) => (
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
                    onClick={handleNavClick(item.href)}
                  >
                    {item.text}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}

        <div className="cv-header__actions">
          {/* Toggle de thème */}
          <motion.div className="translate" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggleSelect isScrolled={isScrolled} />
            </motion.div>
          </motion.div>

          {/* Bouton menu hamburger - visible uniquement sur mobile */}
          {isMobile && (
            <motion.button
              className="cv-header__menu-toggle"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Menu mobile - Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            {/* Overlay de fond */}
            <motion.div
              className="cv-header__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Navigation mobile */}
            <motion.nav
              id="mobile-navigation"
              className="cv-navbar--mobile"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.ul className="cv-navbar__list--mobile">
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    className="cv-navbar__item--mobile"
                    variants={mobileMenuItemVariants}
                  >
                    <motion.a
                      href={item.href}
                      onClick={handleNavClick(item.href)}
                      whileHover={{
                        color: "#007bff",
                        x: 10,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.text}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}