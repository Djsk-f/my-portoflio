// Compétences alignées sur la section « Compétences techniques » du CV.
// Les titres et descriptions des familles sont traduits dans messages/*.json (Skills.groups.<id>).
export interface SkillGroup {
  id: "backend" | "frontend" | "data" | "devops" | "ai";
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    skills: ["Java", "Spring Boot", "Node.js", "NestJS", "Express.js", "API REST", "JWT"],
  },
  {
    id: "frontend",
    skills: ["React.js", "Angular", "Next.js", "TypeScript", "Ionic", "React Native"],
  },
  {
    id: "data",
    skills: ["PostgreSQL", "MySQL / SQL", "MongoDB", "Redis"],
  },
  {
    id: "devops",
    skills: ["Docker", "Docker Compose", "Portainer", "Jenkins", "Git / GitHub", "Linux"],
  },
  {
    id: "ai",
    skills: ["LLM", "MCP", "AI Agents", "Workflow automation"],
  },
];
