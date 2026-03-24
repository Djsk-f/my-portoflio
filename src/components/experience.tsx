"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Londo Technology",
    role: "Full-Stack Developer",
    period: "2023 - PRÉSENT",
    description: "Conception d'architectures scalables et intégration d'écosystèmes financiers complexes.",
  },
  {
    company: "INNO-SOFT",
    role: "Full-Stack Developer",
    period: "2021 - 2023",
    description: "Optimisation de flux e-commerce et développement d'outils de gestion intelligents.",
  },
];

export default function Experience() {
  return (
    <div id="experience" className="experience-section">
      <h2 className="section-title">
        <span className="title-number">03</span> EXPÉRIENCE
      </h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="experience-item"
          >
            <div className="exp-indicator">
              <div className="exp-dot"></div>
              <div className="exp-line"></div>
            </div>
            <div className="exp-content">
              <div className="exp-header">
                <span className="exp-period">{exp.period}</span>
                <h3 className="exp-role">{exp.role}</h3>
                <h4 className="exp-company">{exp.company}</h4>
              </div>
              <p className="exp-description">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
