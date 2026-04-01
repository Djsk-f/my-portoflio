"use client";

import { motion } from "framer-motion";
import { projects } from "../../mocks/projects.mock";
import { Project } from "../../models/projects.model";
import { ExternalLink, Github, Layers, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("Projects");
  const tCommon = useTranslations("Common");

  const getProjectKey = (title: string) => {
    const t = title.toUpperCase();
    if (t.includes("CADYST")) return "cadyst";
    if (t.includes("FLY") || t.includes("BCI")) return "fly";
    if (t.includes("PANIER")) return "panier";
    if (t.includes("CIMENCAM")) return "cimencam";
    return "";
  };

  return (
    <div className="projects-page">
      <div className="modern-container">
        <section className="projects-detailed">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
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

          <div className="project-showcase">
            {projects.map((project: Project, index: number) => {
              const key = getProjectKey(project.title);
              return (
                <motion.div
                  key={project.id || project.title}
                  id={project.id}
                  className="project-entry"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="entry-media">
                    <div className="media-container">
                      {project.image ? (
                        <img src={project.image} alt={project.title} />
                      ) : (
                        <div className="project-image-placeholder">
                          <div className="placeholder-content">
                            <code className="placeholder-text">{tCommon("noImage")}</code>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {project.version && (
                      <div className="metadata">
                        <span className="version-badge">v{project.version}</span>
                      </div>
                    )}

                    <div className="entry-overlay">
                      <div className="stack-preview">
                        {project.stack.slice(0, 3).map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="entry-content">
                    <div className="content-header">
                      <span className="label">[{t("label")}]</span>
                      <h2>{key ? t(`items.${key}.title`) : project.title}</h2>
                      <div className="role-info">
                        <User size={14} />
                        <span>{project.role}</span>
                      </div>
                    </div>

                    <p className="desc">
                      {key ? t(`items.${key}.desc`) : project.description}
                    </p>

                    <div className="stack-tags">
                      {project.stack.map(tech => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="actions">
                      <button className="main-action">
                        {t("details")} <ExternalLink size={16} />
                      </button>
                      {project.link?.url && (
                        <a 
                          href={project.link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="icon-action" 
                          aria-label="Github link"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
