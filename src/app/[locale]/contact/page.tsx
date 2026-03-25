"use client";

import SendMailModal from "@/components/sendMail";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");
  return (
    <div className="contact-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="modern-container">
        <section className="contact-detailed">
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>{t("headerPrefix")} <span className="gradient-text">{t("headerAccent")}</span>_</h1>
            <p>
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div 
            className="contact-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="status-indicator">
              {t("status")}
            </div>
            <SendMailModal />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
