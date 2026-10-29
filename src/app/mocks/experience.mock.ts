// Parcours aligné sur le CV (public/assets/files/cv-fidele-loffou-*.pdf).
// Rôles, descriptions et réalisations sont traduits dans messages/*.json (Experience.<id>).
export interface ExperienceEntry {
  id: "londo" | "inno" | "minpostel";
  company: string;
  location?: string;
  start: string; // AAAA-MM ou AAAA
  end?: string; // absent = poste actuel
  tech: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "londo",
    company: "Londo Technology",
    location: "Douala, Cameroun",
    start: "2024-10",
    tech: ["Angular", "TypeScript", "Ionic", "NestJS", "Node.js", "SQL", "MongoDB", "Redis", "Docker", "Portainer"],
  },
  {
    id: "inno",
    company: "Inno-Soft",
    location: "Bertoua, Cameroun",
    start: "2023-04",
    end: "2023-11",
    tech: ["React.js", "PHP", "SQL"],
  },
  {
    id: "minpostel",
    company: "MINPOSTEL-EST",
    start: "2021",
    end: "2021",
    tech: [],
  },
];

const formatDate = (value: string, locale: string) => {
  const [year, month] = value.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(year, month - 1));
};

export const formatPeriod = (entry: ExperienceEntry, locale: string, presentLabel: string) => {
  const start = formatDate(entry.start, locale);
  if (!entry.end) return `${start} — ${presentLabel}`;
  const end = formatDate(entry.end, locale);
  return start === end ? start : `${start} — ${end}`;
};
