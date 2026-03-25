import { motion } from "framer-motion";
import { projects } from "../app/mocks/projects.mock";
import { useTranslations } from "next-intl";

export default function Projects({ isDetailed = false }: { isDetailed?: boolean }) {
  const t = useTranslations("Projects");

  const getProjectKey = (title: string) => {
    if (title.includes("CADYST")) return "cadyst";
    if (title.includes("BCI MOBILE")) return "bci_mobile";
    if (title.includes("CIMENCAM")) return "cimencam";
    if (title.includes("BCI NET")) return "bci_net";
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
                  <a 
                    href={project.link?.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                  >
                    {t("deploy")}
                  </a>
                </div>
              </div>
              
              <div className="project-info">
                <div className="project-tags">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <h3 className="project-title">{key ? t(`items.${key}.title`) : project.title}</h3>
                <p className="project-description">{key ? t(`items.${key}.desc`) : project.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}