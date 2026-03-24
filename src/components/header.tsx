"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleSelect } from "./ui/color-mode";

const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(isMobileView);
    if (!isMobileView && isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { href: "#about", text: "À propos" },
    { href: "#skills", text: "Compétences" },
    { href: "#experience", text: "Expérience" },
    { href: "#projects", text: "Projets" },
    { href: "#contact", text: "Contact" },
  ];

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`cv-header ${isScrolled ? "scrolled" : ""}`}
    >
      <div className={`cv-header__container ${isScrolled ? "compact" : ""}`}>
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          FIDELE<span className="dot">.</span>
        </motion.div>

        {!isMobile && (
          <nav>
            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="cv-header__actions">
          <ThemeToggleSelect isScrolled={isScrolled} />
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`cv-header__menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mobile-nav"
          >
            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}