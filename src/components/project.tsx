import { motion } from "framer-motion";
import { projects } from "../app/mocks/projects.mock";
import { useTranslations } from "next-intl";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("Projects");

  const getProjectKey = (title: string) => {
    const t = title.toUpperCase();
    if (t.includes("CADYST")) return "cadyst";
    if (t.includes("FLY-BANKING")) return "fly";
    if (t.includes("PANIER")) return "panier";
    return "";
  };

  return (
    <div id="projects" className="projects-section">
      <h2 className="section-title">
        <span className="title-number">04</span> {t("title")}
      </h2>
      <div className="projects-grid">
        {projects.map((project, index) => {
          const key = getProjectKey(project.title);
          const roleText = key ? t(`items.${key}.role`) : project.role;
          const descText = key ? t(`items.${key}.desc`) : project.description;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card"
            >
              <div className="project-image-box">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  {project.link?.url && (
                    <a
                      href={project.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FaGithub /> {t("viewGithub")}
                    </a>
                  )}
                </div>
              </div>

              <div className="project-info">
                <div className="project-tags">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <h3 className="project-title">{key ? t(`items.${key}.title`) : project.title}</h3>
                {roleText && <p className="project-role">{roleText}</p>}
                <p className="project-description">{descText}</p>
                {project.link?.url && (
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub size={14} /> GitHub
                    <FaExternalLinkAlt size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}