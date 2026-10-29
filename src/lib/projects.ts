import { useTranslations } from "next-intl";
import { projects } from "@/app/mocks/projects.mock";
import { Project } from "@/app/models/projects.model";

// Projets dont les textes sont traduits dans messages/*.json (Projects.items.<clé>)
const projectKeys: Record<string, string> = {
  "click-cadyst": "cadyst",
  "fly-banking": "fly",
  "mon-panier": "panier",
  "cimencam-sfa": "cimencam",
};

// Clients des projets livrés chez Londo Technology
export const CLIENTS = ["Cimencam", "Groupe Cadyst", "BCI Congo", "Ecobank"];

export const getProjectById = (id: string) => projects.find(project => project.id === id);

// Les projets avec capture d'abord, les vignettes génériques en fin de liste
const sortByImage = (list: Project[]) =>
  [...list].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));

// Ordre d'affichage commun à l'accueil, à /projects et à la navigation du détail
export const featuredProjects = projects.filter(project => project.featured);
export const otherProjects = sortByImage(projects.filter(project => !project.featured));
export const orderedProjects = [...featuredProjects, ...otherProjects];

// Domaine affiché sur les cartes ; un profil GitHub n'est pas un site en production
export const getDomain = (url?: string) => {
  if (!url) return "";
  try {
    const { hostname } = new URL(url);
    return hostname === "github.com" ? "" : hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

// Projets en production : sites publics et outils internes de clients
export const liveProjectsCount = () =>
  projects.filter(project => project.confidential || getDomain(project.link?.url)).length;

export const getInitials = (title: string) =>
  title
    .replace(/\(.*?\)/g, "")
    .split(/[\s—&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();

// Textes d'un projet dans la langue courante, avec repli sur le mock quand la traduction manque
export function useProjectText(project: Project) {
  const t = useTranslations("Projects");
  const key = projectKeys[project.id];
  const tr = (field: string, fallback?: string) =>
    key && t.has(`items.${key}.${field}`) ? t(`items.${key}.${field}`) : fallback;

  const translatedResults =
    key && t.has(`items.${key}.results`) ? (t.raw(`items.${key}.results`) as string[]) : [];

  return {
    title: tr("title", project.title) ?? project.title,
    description: tr("desc", project.description) ?? project.description,
    role: tr("role", project.role),
    context: tr("context", project.context),
    problem: tr("problem", project.problem),
    solution: tr("solution", project.solution),
    architecture: project.architecture,
    results: project.results && project.results.length > 0 ? project.results : translatedResults,
  };
}
