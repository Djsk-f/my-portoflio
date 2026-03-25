"use client";

import Skills from "@/components/skills";
import { Code2, Server, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SkillsPage() {
  const t = useTranslations("Skills");

  const categories = [
    {
      title: t("categories.fe.title"),
      icon: <Code2 size={24} />,
      skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Chakra UI"],
      description: t("categories.fe.desc")
    },
    {
      title: t("categories.be.title"),
      icon: <Server size={24} />,
      skills: ["Node.js / Express", "NestJS", "PostgreSQL", "MongoDB", "Prisma / TypeORM"],
      description: t("categories.be.desc")
    },
    {
      title: t("categories.devops.title"),
      icon: <Terminal size={24} />,
      skills: ["Docker", "Git / GitHub Actions", "Vercel / AWS", "Unit Testing (Jest)", "Microservices"],
      description: t("categories.devops.desc")
    }
  ];

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

          <motion.div 
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="hitech-title text-2xl mb-10 text-center uppercase tracking-widest font-bold">
              {t("statsTitle")}
            </h3>
            <Skills isDetailed />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
