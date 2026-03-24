"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div id="about" className="about-section">
      <h2 className="section-title">
        <span className="title-number">01</span> À PROPOS
      </h2>
      <div className="about-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="about-bio"
        >
          <p className="bio-intro">
            <span className="hello-tag">Hello !</span> Je m’appelle{" "}
            <span className="highlight">Fidèle Loffou</span>, développeur Web Full-Stack passionné par
            la création de solutions digitales de haute précision.
          </p>
          <div className="bio-details">
            <p>
              Ancré dans une culture d'excellence technique, j'accompagne mes clients vers 
              des architectures robustes et des interfaces d'exception.
            </p>
            <p>
              Expertise forgée au sein d’écosystèmes exigeants comme <strong>INNO-SOFT</strong> 
              et <strong>Londo Technology</strong>.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="about-stats-container"
        >
          <div className="stat-card">
            <span className="stat-value">3+</span>
            <span className="stat-label">ANNÉES D'EXP</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">15+</span>
            <span className="stat-label">PROJETS_LIVRÉS</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">10+</span>
            <span className="stat-label">TECH_EXPERTISE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}