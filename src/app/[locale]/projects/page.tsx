"use client";

import { motion } from "framer-motion";
import { projects } from "../../mocks/projects.mock";
import { Project } from "../../models/projects.model";
import { ExternalLink, Github, Layers, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  const getProjectKey = (title: string) => {
    if (title.includes("CADYST")) return "cadyst";
    if (title.includes("BCI MOBILE")) return "bci_mobile";
    if (title.includes("CIMENCAM")) return "cimencam";
    if (title.includes("BCI NET")) return "bci_net";
    return "";
  };

  return (
    <div className="projects-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="modern-container">
        <section className="projects-detailed">
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>{t("title")}</h1>
            <p>
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="project-showcase">
            {projects.map((project: Project, index: number) => {
              const key = getProjectKey(project.title);
              return (
                <motion.div
                  key={project.id || project.title}
                  id={project.id}
                  className={`project-entry ${index % 2 !== 0 ? 'reverse' : ''}`}

                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="entry-media">
                    <div className="media-container">
                      <img
                        src={project.image}
                        alt={project.title}
                      />
                    </div>
                  </div>

                  <div className="entry-content">
                    <div className="metadata">
                      <div className="icon-wrapper">
                        <Layers size={18} />
                      </div>
                      <span className="label">{t("label")}</span>
                      {project.version && (
                        <span className="version-badge">v{project.version}</span>
                      )}
                    </div>

                    <h2>{key ? t(`items.${key}.title`) : project.title}</h2>

                    <div className="role-badge">
                      <User size={14} className="text-accent-primary" />
                      {project.role}
                    </div>

                    <p className="desc">
                      {key ? t(`items.${key}.desc`) : project.description}
                    </p>

                    {/* Case Study Details Section */}
                    {(project.context || project.problem || project.solution) && (
                      <div className="case-study-preview">
                        {project.context && (
                          <div className="study-item">
                            <span className="study-label">{t("context")}:</span> {project.context}
                          </div>
                        )}
                        {project.results && project.results.length > 0 && (
                          <div className="results-list">
                            <span className="study-label">{t("results")}:</span>
                            <ul>
                              {project.results.map((res, i) => (
                                <li key={i}>{res}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}


                    <div className="stack">
                      {project.stack.map(tech => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="actions">
                      <button className="btn-primary flex items-center gap-2">
                        {t("details")} <ExternalLink size={16} />
                      </button>
                      <button className="btn-secondary p-3" aria-label="Github link">
                        <Github size={20} />
                      </button>
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
