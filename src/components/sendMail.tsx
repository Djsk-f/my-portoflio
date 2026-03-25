"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";

export default function SendMailModal() {
  const t = useTranslations("Contact.modal");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xxxxxx",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xxxxxx",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "user_xxxxxx"
      );

      toast({
        title: t("success"),
        description: t("successDesc"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setFormData({ name: "", email: "", message: "" });
      onClose();
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorDesc"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn-primary">
        {t("title")}
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered 
        size="md"
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent 
          bg="var(--bg-secondary)" 
          backdropFilter="blur(20px)" 
          border="1px solid var(--border-tech)"
          borderRadius="0"
          color="var(--text-primary)"
          className="tech-card"
        >
          <ModalHeader fontSize="xl" fontWeight="800" fontFamily="'JetBrains Mono', monospace">
            {t("title")}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody className="send-mail-container">
            <form id="contact-form" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <div className="form-group w-full">
                  <label htmlFor="name">{t("labelName")}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="tech-input"
                    placeholder={t("placeholderName")}
                  />
                </div>

                <div className="form-group w-full">
                  <label htmlFor="email">{t("labelEmail")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="tech-input"
                    placeholder={t("placeholderEmail")}
                  />
                </div>

                <div className="form-group w-full">
                  <label htmlFor="message">{t("labelMessage")}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="tech-input tech-textarea"
                    placeholder={t("placeholderMessage")}
                  />
                  <div className="chars-count">
                    {formData.message.length} chars
                  </div>
                </div>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter borderTop="1px solid var(--border-tech)">
            <button
              type="submit"
              form="contact-form"
              disabled={isSending}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              {isSending ? t("sending") : t("submit")}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}