import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const allSkills = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "Angular", level: 85 },
  { name: "TypeScript", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "NestJS", level: 85 },
  { name: "MongoDB", level: 82 },
  { name: "Docker", level: 75 },
];

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
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar-bg">
              <motion.div 
                className="skill-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}