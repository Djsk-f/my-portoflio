import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "@/i18n/routing";
import { CLIENTS, liveProjectsCount } from "@/lib/projects";
import { getCvFileName, getCvUrl } from "@/app/services/commonservice";

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();

  const facts = [
    { value: "3+", label: t("stats.years") },
    { value: String(liveProjectsCount()), label: t("stats.live") },
    { value: String(CLIENTS.length), label: t("stats.clients") },
  ];

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
          <p className="bio-intro">{t("bio.intro")}</p>
          <p className="bio-detail">{t("bio.detail1")}</p>
          <p className="bio-detail">{t("bio.detail2")}</p>

          <div className="about-actions">
            <Link href="/contact" className="about-btn primary">
              {t("contact")} <ArrowRight size={15} />
            </Link>
            <a href={getCvUrl(locale)} download={getCvFileName(locale)} className="about-btn secondary">
              <Download size={15} /> {t("cv")}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="about-facts"
        >
          <div className="about-status">
            <span className="status-dot" />
            {t("status")}
          </div>
          <dl className="facts-list">
            {facts.map(fact => (
              <div key={fact.label} className="fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
