"use client";

import { Box, Flex, Text, Link, Icon, Stack } from "@chakra-ui/react";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Contact() {
  return (
    <footer className="contact-footer">
      <Box py={6} px={{ base: 4, md: 16 }} bg="#030631" color="white">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          <Text fontSize="md" mb={{ base: 3, md: 0 }}>
            © {new Date().getFullYear()} Fidele Loffou. Tous droits réservés.
          </Text>
          <Stack direction="row" spacing={6}>
            <Link
              href="https://www.linkedin.com/in/ton-profil-linkedin"
              isExternal
              aria-label="LinkedIn"
              _hover={{ color: "#00e0ff" }}
            >
              <Icon as={FaLinkedin} boxSize={6} />
            </Link>
            <Link
              href="https://www.facebook.com/ton-profil-facebook"
              isExternal
              aria-label="Facebook"
              _hover={{ color: "#00e0ff" }}
            >
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
          </Stack>
        </Flex>
      </Box>
    </footer>
  );
}