"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="about-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      <div className="modern-container">
        <section className="about-detailed">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="detailed-header"
          >
            <span className="text-accent-primary font-mono font-bold tracking-[0.3em] text-sm block mb-4">
              [SYSTEM_IDENTITY]
            </span>
            <h1>{t("title")}</h1>
          </motion.div>

          <div className="mission-philosophy">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="info-card"
            >
              <h3>{t("missionTitle")}</h3>
              <p>
                {t("missionDesc")}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="info-card"
            >
              <h3>{t("philTitle")}</h3>
              <p>
                {t("philDesc")}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="journey-section"
          >
            <h3>{t("journeyTitle")}</h3>
            <div className="journey-text">
              <p>
                {t("journeyDesc1")}
              </p>
              <p>
                {t("journeyDesc2")}
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
