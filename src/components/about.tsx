import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="stat-value"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {target}{suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

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
            <p>{t("bio.detail1")}</p>
            <p>{t("bio.detail2")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="about-stats-container"
        >
          <div className="stat-card fintech-stat">
            <div className="stat-header">
              <span className="stat-label">{t("stats.years")}</span>
              <span className="live-dot" />
            </div>
            <AnimatedCounter target={3} suffix="+" />
            <div className="stat-footer">
              <span className="stat-change positive">EXPAND</span>
              <span className="stat-suffix">ANNÉES</span>
            </div>
          </div>

          <div className="stat-card fintech-stat">
            <div className="stat-header">
              <span className="stat-label">{t("stats.projects")}</span>
              <span className="live-dot" />
            </div>
            <AnimatedCounter target={15} suffix="+" />
            <div className="stat-footer">
              <span className="stat-change positive">+3 THIS YEAR</span>
              <span className="stat-suffix">PROJETS</span>
            </div>
          </div>

          <div className="stat-card fintech-stat">
            <div className="stat-header">
              <span className="stat-label">{t("stats.tech")}</span>
              <span className="live-dot" />
            </div>
            <AnimatedCounter target={10} suffix="+" />
            <div className="stat-footer">
              <span className="stat-change positive">GROWING</span>
              <span className="stat-suffix">TECH STACK</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
