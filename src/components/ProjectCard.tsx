"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, Globe, Lock, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Project } from "@/app/models/projects.model";
import { getDomain, getInitials, useProjectText } from "@/lib/projects";

export function ProjectVisual({ project, alt }: { project: Project; alt: string }) {
  return project.image ? (
    <img src={project.image} alt={alt} loading="lazy" />
  ) : (
    <div className="project-image-placeholder">
      <span className="placeholder-initials">{getInitials(project.title)}</span>
      <span className="placeholder-stack">{project.stack.slice(0, 3).join(" · ")}</span>
    </div>
  );
}

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  const t = useTranslations("Projects");
  const { title, description } = useProjectText(project);
  const domain = getDomain(project.link?.url);
  const detailHref = `/projects/${project.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 6) * 0.06 }}
      viewport={{ once: true }}
      className={`project-card${featured ? " is-featured" : ""}`}
    >
      <Link href={detailHref} className="project-image-box" aria-label={title}>
        <ProjectVisual project={project} alt={title} />
        <div className="project-badges">
          {featured && (
            <span className="badge-featured">
              <Star size={10} /> {t("featured")}
            </span>
          )}
          {domain && <span className="badge-live">{t("live")}</span>}
          {project.confidential && (
            <span className="badge-internal">
              <Lock size={10} /> {t("internal")}
            </span>
          )}
        </div>
      </Link>

      <div className="project-info">
        {project.sector && <span className="project-sector">{t(`sectors.${project.sector}`)}</span>}
        <h3 className="project-title">
          <Link href={detailHref}>{title}</Link>
        </h3>
        {domain && (
          <span className="project-domain">
            <Globe size={11} /> {domain}
          </span>
        )}
        <p className="project-description">{description}</p>

        <div className="project-tags">
          {project.stack.slice(0, featured ? 5 : 3).map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {!featured && project.stack.length > 3 && (
            <span className="tech-tag more">+{project.stack.length - 3}</span>
          )}
        </div>

        <div className="project-actions">
          <Link href={detailHref} className="project-link">
            {t("viewDetails")} <ArrowRight size={13} />
          </Link>
          {domain && project.link?.url && (
            <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="project-link secondary">
              {t("visitSite")} <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
