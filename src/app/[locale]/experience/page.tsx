"use client";

import { Briefcase, Calendar, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ExperiencePage() {
  const t = useTranslations("Experience");

  const detailedExperiences = [
    {
      company: "Londo Technology",
      role: "Full-Stack Developer",
      period: `2023 - ${t("present")}`,
      highlights: t.raw("londo.highlights") as string[],
      tech: ["NestJS", "Next.js", "PostgreSQL", "Docker", "AWS"]
    },
    {
      company: "INNO-SOFT",
      role: "Full-Stack Developer",
      period: "2021 - 2023",
      highlights: t.raw("inno.highlights") as string[],
      tech: ["React", "Node.js", "Express", "MongoDB", "Redux"]
    }
  ];

  return (
    <div className="experience-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="modern-container">
        <section className="experience-detailed">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("title")}
          </motion.h1>

          <div className="space-y-16">
            {detailedExperiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="exp-case-study"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-icon">
                  <Briefcase />
                </div>

                <div className="exp-header">
                  <div className="role-info">
                    <h2>{exp.role}</h2>
                    <h3>{exp.company}</h3>
                  </div>
                  <div className="period-badge">
                    <Calendar size={18} />
                    {exp.period}
                  </div>
                </div>

                <div className="exp-grid">
                  <div className="highlights">
                    <h4>
                      <Target size={20} className="text-accent-primary" />
                      {t("highlightsTitle")}
                    </h4>
                    <ul>
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="stack-list">
                    <h4>{t("stackTitle")}</h4>
                    <div className="tags-container">
                      {exp.tech.map(te => (
                        <span key={te} className="tech-tag">
                          {te}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
