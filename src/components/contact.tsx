"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/fidele-loffou", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/fidele-loffou", label: "GitHub" },
    { icon: <FaTwitter />, href: "https://twitter.com/fidele-loffou", label: "Twitter" },
    { icon: <FaEnvelope />, href: "mailto:contact@fideleloffou.com", label: "Email" },
  ];

  return (
    <footer id="contact" className="contact-footer">
      <div className="modern-container">
        <div className="footer-content tech-card">
          <div className="footer-info">
            <h3 className="footer-logo">FIDELE<span className="dot">.</span></h3>
            <p className="footer-tagline">Construire le futur, une ligne de code à la fois.</p>
          </div>

          <div className="footer-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "var(--accent-primary)" }}
                className="social-link"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <div className="footer-bottom">
            <p>© {currentYear} Fidele Loffou. Tous droits réservés.</p>
          </div>
        </div>
      </div>

    </footer>
  );
}