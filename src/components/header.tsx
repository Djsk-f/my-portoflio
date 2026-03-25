"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleSelect } from "./ui/color-mode";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");

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
    { href: "/", text: t("home") },
    { href: "/skills", text: t("skills") },
    { href: "/experience", text: t("experience") },
    { href: "/projects", text: t("projects") },
    { href: "/contact", text: t("contact") },
  ] as const;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`cv-header ${isScrolled ? "scrolled" : ""}`}
    >
      <div className={`cv-header__container ${isScrolled ? "compact" : ""}`}>
        <Link href="/">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            FIDELE<span className="dot">.</span>
          </motion.div>
        </Link>

        {!isMobile && (
          <nav>
            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? "active" : ""}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="cv-header__actions">
          <LocaleSwitcher />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-nav"
            transition={{ duration: 0.3 }}
          >
            <ul>
              {navigationItems.map((item, index) => (
                <motion.li 
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={pathname === item.href ? "active" : ""}
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}