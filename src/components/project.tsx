"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Link,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaGooglePlay } from "react-icons/fa";

const projects = [
  {
    title: "Click Cadyst (PASTA)",
    role: "Full-Stack Web & Mobile Developer",
    description:
      "Développement d'une application web et mobile pour la gestion des commandes internes de sacs de farine chez PASTA. UI réalisée avec Ionic & Angular, API sécurisée en Node.js, base de données MongoDB.",
    link: {
      url: "https://play.google.com/store/apps/details?id=com.pasta.clickcadyst", // Remplace par le vrai lien si besoin
      label: "Version mobile sur Google Play",
      icon: FaGooglePlay,
    },
    stack: ["Ionic", "Angular", "Node.js", "MongoDB"],
  },
  {
    title: "Fly-Banking & Opération Visa (BICEC)",
    role: "Backend Developer / Intégration Web",
    description:
      "API pour demandes d’augmentation de plafond de paiement hors zone CEMAC. Intégration dans le portail client avec suivi, notification et reporting. Réalisé avec Node.js, MongoDB, et Angular.",
    link: {
      url: "#", // Remplace par le vrai lien si besoin
      label: "Fly Banking BICEC",
    },
    stack: ["Node.js", "MongoDB", "Angular"],
  },
  {
    title: "Mon Panier",
    role: "Full-Stack Developer",
    description:
      "Plateforme e-commerce web pour la gestion des commandes, du catalogue produits et des paiements. Stack utilisée : Angular, Node.js, MongoDB.",
    stack: ["Angular", "Node.js", "MongoDB"],
  },
];

export default function Projects() {
  return (
    <Box as="section" id="projects" py={12} px={{ base: 4, md: 16 }}>
      <Heading as="h1" size="xl" mb={8} color={useColorModeValue("blue.900", "blue.200")}>
        Projets réalisés
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projects.map((project) => (
          <Box
            key={project.title}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="md"
            borderRadius="lg"
            p={6}
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
          >
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="blue.700">
                {project.title}
              </Heading>
              <Badge colorScheme="blue" w="fit-content" px={2} py={1} borderRadius="md">
                {project.role}
              </Badge>
              <Text color={useColorModeValue("gray.700", "gray.200")}>{project.description}</Text>
              <Stack direction="row" spacing={2} mt={2}>
                {project.stack.map((tech) => (
                  <Badge key={tech} colorScheme="purple" variant="subtle">
                    {tech}
                  </Badge>
                ))}
              </Stack>
              {project.link && (
                <Link
                  href={project.link.url}
                  isExternal
                  color="blue.500"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  mt={2}
                  _hover={{ textDecoration: "underline" }}
                >
                  {project.link.icon && (
                    <Icon as={project.link.icon} boxSize={5} mr={2} />
                  )}
                  {project.link.label}
                </Link>
              )}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}