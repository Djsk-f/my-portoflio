import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function About({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("About");

  return (
    <div id="about" className="about-section">
      <h2 className="section-title">
        <span className="title-number">01</span> {t("title")}
      </h2>
      <div className="about-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="about-bio"
        >
          <p className="bio-intro">
            <span className="hello-tag">{t("bio.hello")}</span> {t("bio.intro")}
          </p>
          <div className="bio-details">
            <p>
              {t("bio.detail1")}
            </p>
            <p>
              {t("bio.detail2")}
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
            <span className="stat-label">{t("stats.years")}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">15+</span>
            <span className="stat-label">{t("stats.projects")}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">10+</span>
            <span className="stat-label">{t("stats.tech")}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}