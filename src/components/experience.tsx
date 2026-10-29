import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Briefcase, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { CLIENTS } from "@/lib/projects";
import { experiences, formatPeriod } from "@/app/mocks/experience.mock";

export default function Experience() {
  const t = useTranslations("Experience");
  const locale = useLocale();
  const [current, ...previous] = experiences;

  return (
    <div id="experience" className="experience-section">
      <h2 className="section-title">
        <span className="title-number">03</span> {t("title")}
      </h2>

      <div className="exp-layout">
        <motion.article
          className="exp-current"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <header className="exp-current-header">
            <span className="exp-avatar">LT</span>
            <div className="exp-heading">
              <h3>{t(`roles.${current.id}`)}</h3>
              <span className="exp-company">
                {current.company}
                {current.location && <span className="exp-location"> · {current.location}</span>}
              </span>
            </div>
            <div className="exp-when">
              <span className="exp-badge">{t("current")}</span>
              <span className="exp-period">{formatPeriod(current, locale, t("present"))}</span>
            </div>
          </header>

          <p className="exp-description">{t(`${current.id}.desc`)}</p>

          <ul className="exp-highlights">
            {(t.raw(`${current.id}.highlights`) as string[]).map(item => (
              <li key={item}>
                <Check size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <footer className="exp-current-footer">
            <div className="exp-clients">
              <span className="exp-label">{t("clients")}</span>
              <div className="exp-client-list">
                {CLIENTS.map(client => (
                  <span key={client} className="exp-client">{client}</span>
                ))}
              </div>
            </div>
            <Link href="/projects" className="exp-link">
              {t("seeProjects")} <ArrowRight size={14} />
            </Link>
          </footer>
        </motion.article>

        <div className="exp-previous">
          <span className="exp-label">{t("previous")}</span>
          <ol className="exp-timeline">
            {previous.map((exp, index) => (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="exp-period">{formatPeriod(exp, locale, t("present"))}</span>
                <h4>{t(`roles.${exp.id}`)}</h4>
                <span className="exp-company">
                  <Briefcase size={12} /> {exp.company}
                </span>
                <p>{t(`${exp.id}.desc`)}</p>
              </motion.li>
            ))}
          </ol>
          <Link href="/experience" className="exp-link">
            {t("viewFull")} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
