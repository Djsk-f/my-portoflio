import { Project } from "../models/projects.model";

export const projects: Project[] = [
  {
    title: "ClICK CADYST",
    role: "Full-Stack Developer",
    description:
      "Développement d'une application web et mobile pour la gestion des commandes internes de sacs de farine chez PASTA. UI réalisée avec Ionic & Angular-ionic, API sécurisée en Nest.js, base de données MongoDB.",
    stack: ["Ionic", "Angular-ionic", "Node.js", "MongoDB"],
    image: "/assets/images/cadyst_mobile.png",
  },
  {
    title: "BCI MOBILE",
    role: "Full-Stack Developer",
    description:
      "Plateforme mobile pour la gestion des operations bancaires des clients de la BCI. Réalisé avec Node.js, MongoDB, et Angular-ionic.",
    stack: ["Nest.js", "MongoDB", "Angular-ionic"],
    image: "/assets/images/bci_mobile.png",
  },
  {
    title: "My CIMENCAM",
    role: "Full-Stack Developer",
    description:
      "Plateforme de d'achats des sacs de ciment pour les clients de l'entreprise CIMENCAM. Stacks utilisées : Angular, Node.js, MongoDB.",
    stack: ["Angular", "Nest.js", "MongoDB"],
    image: "/assets/images/cimencam.png",
  },
  {
    title: "BCI NET",
    role: "Full-Stack Developer",
    description:
      "Plateforme de gestion des opérations bancaires de la BCI. Stacks utilisées : Angular, Node.js, MongoDB.",
    stack: ["Angular", "Node.js", "MongoDB"],
    image: "/assets/images/bcinet.png",
  },

];