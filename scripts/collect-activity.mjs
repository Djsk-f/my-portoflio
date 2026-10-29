// Compte les commits quotidiens dans les dépôts git locaux hébergés hors GitHub
// (Bitbucket, GitLab…), que le calendrier GitHub ne peut pas voir.
// Seuls des totaux par jour sont écrits : ni code, ni message, ni nom de dépôt.
//
// Usage : npm run activity  (ou node scripts/collect-activity.mjs [dossierDesDépôts])

import { execFileSync } from "node:child_process";
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.argv[2] ?? "..");
const OUTPUT = resolve("src/data/activity.json");
const AUTHORS = ["koungafidele@gmail.com", "Fidele", "Loffou"];
const DAYS = 371; // 53 semaines, comme le calendrier GitHub

const git = (repo, args) =>
  execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

const since = new Date(Date.now() - DAYS * 86_400_000).toISOString().slice(0, 10);
const days = {};
let repoCount = 0;

for (const name of readdirSync(ROOT)) {
  const repo = join(ROOT, name);
  if (!existsSync(join(repo, ".git"))) continue;

  let remote = "";
  try {
    remote = git(repo, ["remote", "get-url", "origin"]);
  } catch {
    continue; // pas de remote : dépôt purement local, ignoré
  }
  // Les dépôts GitHub sont déjà comptés par le calendrier GitHub
  if (remote.includes("github.com")) continue;

  const dates = git(repo, [
    "log", "--all", `--since=${since}`, "--format=%ad", "--date=short",
    ...AUTHORS.map(author => `--author=${author}`),
  ]).split("\n").filter(Boolean);

  if (dates.length === 0) continue;
  repoCount += 1;
  for (const date of dates) days[date] = (days[date] ?? 0) + 1;
}

const sorted = Object.fromEntries(Object.entries(days).sort(([a], [b]) => a.localeCompare(b)));
const totalCommits = Object.values(sorted).reduce((sum, count) => sum + count, 0);

writeFileSync(
  OUTPUT,
  JSON.stringify({ generatedAt: new Date().toISOString(), repoCount, totalCommits, days: sorted }, null, 2) + "\n",
);

console.log(`${totalCommits} commits sur ${Object.keys(sorted).length} jours (${repoCount} dépôts hors GitHub) -> ${OUTPUT}`);
