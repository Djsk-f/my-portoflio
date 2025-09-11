"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Link,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { projects } from "../app/mocks/projects.mock";
import { JSX } from "react/jsx-runtime";


export default function Projects(): JSX.Element {
  return (
    <Box as="section" id="projects" py={12} px={{ base: 4, md: 16 }}>
      <Heading as="h1" id="title" size="xl" mb={8} color={useColorModeValue("blue.900", "blue.200")}>
        Projets réalisés
      </Heading>
      <div>
        {projects.map((project) => (
          <Box
            key={project.title}
            bg='transparent'
            p={6}
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
            className="box"
          >
            <img className="projects__image-container" src={project.image} alt={project.title} />
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="blue.700">
                {project.title}
              </Heading>
              <Badge colorScheme="blue" w="fit-content" px={2} py={1} borderRadius="md">
                {project.role}
              </Badge>
              <Text>{project.description}</Text>
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
      </div>
    </Box>
  );
}