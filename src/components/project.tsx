import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { projects } from "../app/mocks/projects.mock";
import { featuredProjects as featured, otherProjects as others } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

// Nombre de projets secondaires affichés sur l'accueil, le reste est sur /projects
const HOME_GRID_LIMIT = 3;

export default function Projects() {
  const t = useTranslations("Projects");
  const hiddenCount = others.length - HOME_GRID_LIMIT;

  return (
    <div id="projects" className="projects-section">
      <h2 className="section-title">
        <span className="title-number">04</span> {t("title")}
      </h2>

      <div className="projects-featured">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} featured />
        ))}
      </div>

      <div className="projects-grid">
        {others.slice(0, HOME_GRID_LIMIT).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="projects-more">
          <Link href="/projects" className="projects-more-btn">
            {t("viewAll", { count: projects.length })}
            <span className="more-count">+{hiddenCount}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
