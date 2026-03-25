import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const allSkills = [
  { name: "React", level: 95, category: "Frontend" },
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "Angular", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Language" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "NestJS", level: 85, category: "Backend" },
  { name: "PHP", level: 80, category: "Backend" },
  { name: "MongoDB", level: 82, category: "Backend" },
  { name: "MySQL", level: 85, category: "Backend" },
  { name: "Ionic", level: 88, category: "Frontend" },
  { name: "Bootstrap", level: 90, category: "Frontend" },
  { name: "Chakra UI", level: 85, category: "Frontend" },
  { name: "Docker", level: 75, category: "DevOps" },
];

const categoryColor: Record<string, string> = {
  Frontend: "var(--accent-primary)",
  Backend: "var(--accent-secondary)",
  Language: "#22d3ee",
  DevOps: "#a3e635",
};

export default function Skills({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("Skills");

  return (
    <div id="skills" className="skills-section">
      <h2 className="section-title">
        <span className="title-number">02</span> {t("expertise")}
      </h2>
      <div className="skills-grid">
        {allSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="skill-item"
          >
            <div className="skill-info">
              <div className="skill-name-row">
                <span className="skill-name">{skill.name}</span>
                <span
                  className="skill-category"
                  style={{ color: categoryColor[skill.category] }}
                >
                  {skill.category}
                </span>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar-bg">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
                viewport={{ once: true }}
                style={{ background: `linear-gradient(90deg, ${categoryColor[skill.category]}, var(--accent-glow))` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}