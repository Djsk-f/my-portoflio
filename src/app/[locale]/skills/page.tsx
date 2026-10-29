"use client";

import { skillGroupIcons } from "@/components/skills";
import { skillGroups } from "../../mocks/skills.mock";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SkillsPage() {
  const t = useTranslations("Skills");

  const categories = skillGroups.map(group => {
    const Icon = skillGroupIcons[group.id];
    return {
      title: t(`groups.${group.id}.title`),
      icon: <Icon size={24} />,
      skills: group.skills,
      description: t(`groups.${group.id}.desc`),
    };
  });

  return (
    <div className="skills-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="modern-container">
        <section className="skills-detailed">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {t("title")}
          </motion.h1>
          
          <div className="skills-categories">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat.title} 
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="cat-header">
                  <div className="cat-icon">
                    {cat.icon}
                  </div>
                  <h3>{cat.title}</h3>
                </div>
                <p className="cat-desc">{cat.description}</p>
                <div className="cat-tags">
                  {cat.skills.map(skill => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </section>
      </div>
    </div>
  );
}
