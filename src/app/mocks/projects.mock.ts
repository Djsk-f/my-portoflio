import { Project } from "../models/projects.model";

export const projects: Project[] = [
  {
    title: "ClICK CADYST",
    role: "Full-Stack Developer",
    description: "Application de gestion des commandes de sacs de farine pour l'entreprise PASTA. Développement en full-stack avec intégration d'API sécurisées.",
    stack: ["Ionic", "Angular", "NestJS", "MongoDB"],
    image: "/assets/images/cadyst_mobile.png",
    link: { url: "https://play.google.com/store/apps/details?id=com.clickcadyst.mobile", label: "Play Store" },
  },
  {
    title: "Fly-Banking & Opération Visa",
    role: "Full-Stack Developer",
    description: "Gestion des demandes d'augmentation des plafonds bancaires pour les clients effectuant des transactions hors zone CEMAC. APIs robustes et sécurisées.",
    stack: ["Angular", "Node.js", "Express.js", "MySQL"],
    image: "/assets/images/bci_mobile.png", // Assuming this image is relevant for banking
    link: { url: "https://github.com/fidele007", label: "GitHub" },
  },
  {
    title: "Mon Panier",
    role: "Full-Stack Developer",
    description: "Plateforme e-commerce complète avec catalogue dynamique, panier et suivi de paiements.",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    image: "/assets/images/cimencam.png", // Using existing e-commerce image
    link: { url: "https://github.com/fidele007", label: "GitHub" },
  },
];