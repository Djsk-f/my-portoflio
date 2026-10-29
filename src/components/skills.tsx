import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Bot, Code2, Database, Server, Terminal } from "lucide-react";
import { skillGroups, SkillGroup } from "@/app/mocks/skills.mock";

export const skillGroupIcons: Record<SkillGroup["id"], typeof Server> = {
  backend: Server,
  frontend: Code2,
  data: Database,
  devops: Terminal,
  ai: Bot,
};

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <div id="skills" className="skills-section">
      <h2 className="section-title">
        <span className="title-number">02</span> {t("expertise")}
      </h2>
      <div className="skill-groups">
        {skillGroups.map((group, index) => {
          const Icon = skillGroupIcons[group.id];
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="skill-group"
            >
              <span className="skill-group-title">
                <Icon size={13} /> {t(`groups.${group.id}.title`)}
              </span>
              <div className="skill-chips">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-chip">{skill}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
