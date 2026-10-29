// Données GitHub côté serveur (route /api/github), mises en cache une heure.
// Avec GITHUB_TOKEN, le calendrier vient de l'API GraphQL (et inclut les contributions privées
// si l'option est activée sur le profil) ; sans token, on lit le calendrier public.
import localActivity from "@/data/activity.json";
import { GITHUB_USER } from "@/lib/profiles";

// Seuls ces dépôts publics sont affichés : un dépôt privé, ou rendu public par erreur,
// n'apparaît jamais sur le portfolio sans avoir été ajouté ici.
const SHOWCASED_REPOS = ["taskflow", "gego-api-v1", "gego-mobile", "my-portoflio"];
const REVALIDATE = 3600;

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface ActivityDay {
  date: string;
  github: number;
  local: number;
}

export interface GithubActivity {
  profileUrl: string;
  publicRepos: number;
  repos: GithubRepo[];
  days: ActivityDay[];
  totals: { github: number; local: number };
  localGeneratedAt: string;
}

const headers = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "fidele-loffou-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { ...headers(), ...init?.headers }, next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`GitHub ${res.status} sur ${url}`);
  return res.json() as Promise<T>;
}

async function fetchCalendarGraphql(): Promise<Record<string, number>> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar { weeks { contributionDays { date contributionCount } } }
      }
    }
  }`;
  const data = await fetchJson<{
    data: { user: { contributionsCollection: { contributionCalendar: { weeks: { contributionDays: { date: string; contributionCount: number }[] }[] } } } };
  }>("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
  });
  const counts: Record<string, number> = {};
  for (const week of data.data.user.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) counts[day.date] = day.contributionCount;
  }
  return counts;
}

// Repli sans token : la page publique du calendrier expose une cellule par jour et une infobulle
// « N contributions on <date> » reliée à la cellule par son id.
async function fetchCalendarPublic(): Promise<Record<string, number>> {
  const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
    headers: { "User-Agent": "fidele-loffou-portfolio" },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} sur le calendrier public`);
  const html = await res.text();

  const dateById: Record<string, string> = {};
  for (const [, attrs] of html.matchAll(/<td([^>]*ContributionCalendar-day[^>]*)>/g)) {
    const date = attrs.match(/data-date="([^"]+)"/)?.[1];
    const id = attrs.match(/id="([^"]+)"/)?.[1];
    if (date && id) dateById[id] = date;
  }

  const counts: Record<string, number> = {};
  for (const date of Object.values(dateById)) counts[date] = 0;
  for (const [, id, label] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const date = dateById[id];
    const count = label.match(/^(\d+) contributions?/)?.[1];
    if (date && count) counts[date] = Number(count);
  }
  return counts;
}

export async function getGithubActivity(): Promise<GithubActivity> {
  const [profile, rawRepos, githubDays] = await Promise.all([
    fetchJson<{ public_repos: number; html_url: string }>(`https://api.github.com/users/${GITHUB_USER}`),
    fetchJson<
      {
        name: string;
        description: string | null;
        html_url: string;
        language: string | null;
        stargazers_count: number;
        pushed_at: string;
        fork: boolean;
        private: boolean;
      }[]
    >(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`),
    process.env.GITHUB_TOKEN ? fetchCalendarGraphql() : fetchCalendarPublic(),
  ]);

  const repos = rawRepos
    .filter(repo => !repo.private && !repo.fork && SHOWCASED_REPOS.includes(repo.name))
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    }));

  // Fenêtre de 53 semaines alignée sur le calendrier GitHub
  const dates = Object.keys(githubDays).sort();
  const localDays = localActivity.days as Record<string, number>;
  const days = dates.map(date => ({ date, github: githubDays[date] ?? 0, local: localDays[date] ?? 0 }));

  return {
    profileUrl: profile.html_url,
    publicRepos: profile.public_repos,
    repos,
    days,
    totals: {
      github: days.reduce((sum, day) => sum + day.github, 0),
      local: days.reduce((sum, day) => sum + day.local, 0),
    },
    localGeneratedAt: localActivity.generatedAt,
  };
}
