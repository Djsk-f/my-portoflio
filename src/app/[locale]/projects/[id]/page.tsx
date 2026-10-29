"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Globe,
  Layers,
  Lightbulb,
  Lock,
  Rocket,
  Target,
  User,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Project } from "@/app/models/projects.model";
import { getDomain, orderedProjects, useProjectText } from "@/lib/projects";
import { ProjectVisual } from "@/components/ProjectCard";

function NeighbourLink({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const t = useTranslations("Projects");
  const { title } = useProjectText(project);

  return (
    <Link href={`/projects/${project.id}`} className={`neighbour-link ${direction}`}>
      <span className="neighbour-label">
        {direction === "prev" && <ArrowLeft size={14} />}
        {t(direction === "prev" ? "previous" : "next")}
        {direction === "next" && <ArrowRight size={14} />}
      </span>
      <span className="neighbour-title">{title}</span>
    </Link>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("Projects");
  const index = orderedProjects.findIndex(project => project.id === id);
  const project = orderedProjects[index];

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="modern-container detail-not-found">
          <h1>{t("notFound")}</h1>
          <Link href="/projects" className="back-link">
            <ArrowLeft size={14} /> {t("backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectDetail project={project} index={index} />;
}

function ProjectDetail({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("Projects");
  const text = useProjectText(project);
  const domain = getDomain(project.link?.url);
  const prev = orderedProjects[(index - 1 + orderedProjects.length) % orderedProjects.length];
  const next = orderedProjects[(index + 1) % orderedProjects.length];

  const caseBlocks = [
    { label: t("context"), icon: Target, value: text.context },
    { label: t("problem"), icon: Lightbulb, value: text.problem },
    { label: t("solution"), icon: Rocket, value: text.solution },
    { label: t("architecture"), icon: Layers, value: text.architecture },
  ].filter(block => block.value);

  return (
    <div className="project-detail-page">
      <div className="modern-container">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={14} /> {t("backToProjects")}
        </Link>

        <motion.div
          className="detail-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="detail-meta">
            {project.sector && <span className="project-sector">{t(`sectors.${project.sector}`)}</span>}
            {domain && <span className="badge-live">{t("live")}</span>}
            {project.confidential && (
              <span className="badge-internal">
                <Lock size={11} /> {t("internal")}
              </span>
            )}
            {project.version && <span className="version-badge">v{project.version}</span>}
          </div>
          <h1>{text.title}</h1>
          <p className="detail-lead">{text.description}</p>
        </motion.div>

        <motion.div
          className={`detail-visual${project.image ? "" : " is-placeholder"}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProjectVisual project={project} alt={text.title} />
        </motion.div>

        <div className="detail-body">
          <div className="detail-main">
            {caseBlocks.length > 0 ? (
              caseBlocks.map(({ label, icon: Icon, value }) => (
                <div key={label} className="detail-block">
                  <h2>
                    <Icon size={16} /> {label}
                  </h2>
                  <p>{value}</p>
                </div>
              ))
            ) : (
              <div className="detail-block">
                <p>{text.description}</p>
              </div>
            )}

            {text.results.length > 0 && (
              <div className="detail-block results">
                <h2>
                  <BarChart3 size={16} /> {t("results")}
                </h2>
                <ul>
                  {text.results.map(result => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="detail-aside">
            {text.role && (
              <div className="aside-item">
                <span className="aside-label">
                  <User size={13} /> {t("role")}
                </span>
                <span className="aside-value">{text.role}</span>
              </div>
            )}

            <div className="aside-item">
              <span className="aside-label">
                <Layers size={13} /> {t("stack")}
              </span>
              <div className="project-tags">
                {project.stack.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {domain && project.link?.url && (
              <div className="aside-item">
                <span className="aside-label">
                  <Globe size={13} /> {t("website")}
                </span>
                <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="aside-cta">
                  {t("visitSite")} <ArrowUpRight size={14} />
                </a>
                <span className="aside-domain">{domain}</span>
              </div>
            )}
            {project.confidential && (
              <div className="aside-item">
                <span className="aside-label">
                  <Lock size={13} /> {t("access")}
                </span>
                <span className="aside-note">{t("internalNote")}</span>
              </div>
            )}
          </aside>
        </div>

        <nav className="detail-neighbours">
          <NeighbourLink project={prev} direction="prev" />
          <NeighbourLink project={next} direction="next" />
        </nav>
      </div>
    </div>
  );
}
