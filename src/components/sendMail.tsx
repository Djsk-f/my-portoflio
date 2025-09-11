"use client";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "@/../public/assets/scss/layouts/_sendMail.scss";
import { useRef, useState } from "react";

export default function SendMailModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ici tu peux intégrer emailjs, nodemailer, ou une API tierce
    setTimeout(() => {
      setLoading(false);
      onClose();
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message, je vous répondrai rapidement.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <Button className="btn-send" onClick={onOpen}>
        <span className="btn-text"> Contact </span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        size="md"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Envoyer un message</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Nom</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Votre nom"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Votre email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Votre message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={loading}>
                Envoyer
              </Button>
              <Button onClick={onClose} variant="ghost">
                Annuler
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}