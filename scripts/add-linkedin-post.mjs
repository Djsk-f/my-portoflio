// Ajoute un post LinkedIn à src/data/linkedin-posts.json.
//
// Usage : npm run linkedin:add -- "<lien du post ou code d'intégration>" ["phrase d'accroche"]
// Formats acceptés :
//   https://www.linkedin.com/posts/<profil>_<titre>-activity-7123456789012345678-AbCd
//   https://www.linkedin.com/feed/update/urn:li:activity:7123456789012345678/
//   <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7123456789012345678" ...>

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FILE = resolve("src/data/linkedin-posts.json");
const [input = "", excerpt] = process.argv.slice(2).map(arg => arg.trim());

if (!input) {
  console.error('Usage : npm run linkedin:add -- "<lien du post LinkedIn>"');
  process.exit(1);
}

const match =
  input.match(/urn:li:(activity|share|ugcPost):(\d{15,25})/) ??
  input.match(/-(activity)-(\d{15,25})/) ??
  input.match(/urn%3Ali%3A(activity|share|ugcPost)%3A(\d{15,25})/);

if (!match) {
  console.error("Lien non reconnu : copiez le lien du post (menu « … » > « Copier le lien du post »).");
  process.exit(1);
}

const [, type, id] = match;
const urn = `urn:li:${type}:${id}`;

// Les identifiants LinkedIn contiennent l'horodatage de création dans leurs 41 premiers bits
const date = new Date(Number(BigInt(id) >> 22n)).toISOString().slice(0, 10);

const posts = JSON.parse(readFileSync(FILE, "utf8"));
if (posts.some(post => post.urn === urn)) {
  console.log(`Déjà présent : ${urn}`);
  process.exit(0);
}

posts.push(excerpt ? { urn, date, excerpt } : { urn, date });
posts.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(FILE, JSON.stringify(posts, null, 2) + "\n");

console.log(`Ajouté : ${urn} (publié le ${date}) — ${posts.length} post(s) au total`);
