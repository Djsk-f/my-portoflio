import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Experience({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("Experience");

  const experiences = [
    {
      company: "Londo Technology",
      role: "Full-Stack Developer",
      period: `2023 - ${t("present")}`,
      description: t("londo.desc"),
    },
    {
      company: "INNO-SOFT",
      role: "Full-Stack Developer",
      period: "2021 - 2023",
      description: t("inno.desc"),
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
