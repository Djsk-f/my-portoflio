"use client";

import { motion } from "framer-motion";
import { projects } from "../app/mocks/projects.mock";

export default function Projects() {
  return (
    <div id="projects" className="projects-section">
      <h2 className="section-title">
        <span className="title-number">04</span> PROJETS
      </h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
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
                  DE_PLOY_VIEW
                </a>
              </div>
            </div>
            
            <div className="project-info">
              <div className="project-tags">
                {project.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}