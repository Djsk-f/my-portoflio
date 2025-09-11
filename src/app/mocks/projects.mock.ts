import { FaGooglePlay } from "react-icons/fa";
import { Project } from "../models/projects.model";
// import "/assets/images/cadyst_mobile";

export const projects: Project[] = [
  {
    title: "ClICK CADYST",
    role: "Full-Stack Developer",
    description:
      "Développement d'une application web et mobile pour la gestion des commandes internes de sacs de farine chez PASTA. UI réalisée avec Ionic & Angular, API sécurisée en Node.js, base de données MongoDB.",
    link: {
      url: "https://play.google.com/store/apps/details?id=com.pasta.clickcadyst",
      label: "Version mobile sur Google Play",
      icon: FaGooglePlay,
    },
    stack: ["Ionic", "Angular", "Node.js", "MongoDB"],
    image: "/assets/images/cadyst_mobile.png",
  },
  {
    title: "BCI MOBILE",
    role: "Full-Stack Developer",
    description:
      "API pour demandes d’augmentation de plafond de paiement hors zone CEMAC. Intégration dans le portail client avec suivi, notification et reporting. Réalisé avec Node.js, MongoDB, et Angular.",
    link: {
      url: "#",
      label: "Fly Banking BICEC",
    },
    stack: ["Node.js", "MongoDB", "Angular"],
    image: "/assets/images/bci_mobile.png",
  },
  {
    title: "My CIMENCAM",
    role: "Full-Stack Developer",
    description:
      "Plateforme e-commerce web pour la gestion des commandes, du catalogue produits et des paiements. Stack utilisée : Angular, Node.js, MongoDB.",
    stack: ["Angular", "Node.js", "MongoDB"],
    image: "/assets/images/cimencam.png",
  },
  {
    title: "BCI NET",
    role: "Full-Stack Developer",
    description:
      "Plateforme e-commerce web pour la gestion des commandes, du catalogue produits et des paiements. Stack utilisée : Angular, Node.js, MongoDB.",
    stack: ["Angular", "Node.js", "MongoDB"],
    image: "/assets/images/bcinet.png",
  },

];