"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects } from "../../mocks/projects.mock";
import { ProjectSector } from "../../models/projects.model";
import { orderedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const SECTORS: ProjectSector[] = ["banking", "industry", "ecommerce"];

export default function ProjectsPage() {
  const t = useTranslations("Projects");
  const [sector, setSector] = useState<ProjectSector | "all">("all");

  const visible = orderedProjects.filter(project => sector === "all" || project.sector === sector);

  const countFor = (value: ProjectSector | "all") =>
    value === "all" ? projects.length : projects.filter(project => project.sector === value).length;

  return (
    <div className="projects-page">
      <div className="modern-container">
        <section className="projects-detailed">
          <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {t("title")}
          </motion.h1>

          <motion.p
            className="header-description"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>

          <div className="projects-filters" role="tablist">
            {(["all", ...SECTORS] as const).map(value => (
              <button
                key={value}
                role="tab"
                aria-selected={sector === value}
                className={`filter-chip${sector === value ? " active" : ""}`}
                onClick={() => setSector(value)}
              >
                {value === "all" ? t("sectors.all") : t(`sectors.${value}`)}
                <span className="filter-count">{countFor(value)}</span>
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured={project.featured} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
