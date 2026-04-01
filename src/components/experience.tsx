import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

export default function Experience({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("Experience");

  const experiences = [
    {
      company: "Londo Technology",
      role: t("roles.fullstack"),
      period: `2024 - ${t("present")}`,
      description: t("londo.desc"),
      highlights: t.raw("londo.highlights") as string[],
    },
    {
      company: "INNO-SOFT",
      role: t("roles.trainer"),
      period: "2023 - 2024",
      description: t("inno.desc"),
      highlights: t.raw("inno.highlights") as string[],
    },
    {
      company: "MINPOSTEL-EST",
      role: t("roles.intern"),
      period: "2021",
      description: t("minpostel.desc"),
      highlights: t.raw("minpostel.highlights") as string[],
    },
  ];

  return (
    <div id="experience" className="experience-section">
      <h2 className="section-title">
        <span className="title-number">03</span> {t("title")}
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
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="exp-highlights">
                  {exp.highlights.slice(0, 3).map((item, i) => (
                    <li key={i} className="exp-highlight-item">
                      <FiCheck className="exp-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
