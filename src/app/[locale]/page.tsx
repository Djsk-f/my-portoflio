"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus, TrendingUp, Activity, BarChart3, DollarSign, Building2, Layers, Container, Bot } from "lucide-react";
import { Link } from "@/i18n/routing";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/project";
import Experience from "@/components/experience";
import GithubActivity from "@/components/GithubActivity";
import LinkedinPosts from "@/components/LinkedinPosts";
import linkedinPosts from "@/data/linkedin-posts.json";
import SendMailModal from "@/components/sendMail";
import { uploadMyCv } from "../services/commonservice";
import { liveProjectsCount } from "@/lib/projects";
import { useLocale, useTranslations } from "next-intl";

// Faits issus du CV et des projets ; pas de métriques inventées
const tickerData = [
  { label: "BACKEND", value: "Java · Spring Boot", change: "NESTJS", positive: true },
  { label: "FRONTEND", value: "React · Angular", change: "NEXT.JS", positive: true },
  { label: "MOBILE", value: "Ionic", change: "REACT NATIVE", positive: true },
  { label: "CLIENTS", value: "BCI · Ecobank", change: "CIMENCAM · CADYST", positive: true },
  { label: "PROJECTS", value: String(liveProjectsCount()), change: "LIVE", positive: true },
  { label: "EXPERIENCE", value: "3+", change: "YEARS", positive: true },
  { label: "DEVOPS", value: "Docker", change: "PORTAINER · JENKINS", positive: true },
  { label: "AI", value: "LLM · MCP", change: "AGENTS", positive: true },
];

export default function Home() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);
  const t = useTranslations("Home");
  const locale = useLocale();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 50]);
  const bentoY1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const bentoY2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const bentoY3 = useTransform(scrollY, [0, 1000], [0, -40]);

  const iconY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const iconY2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const iconY3 = useTransform(scrollY, [0, 1000], [0, -250]);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="modern-layout">
      {/* ─── Ticker Bar ─── */}
      <div className="fintech-ticker">
        <div className="ticker-track">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div className="ticker-item" key={i}>
              <span className="ticker-label">{item.label}</span>
              <span className="ticker-value">{item.value}</span>
              <span className={`ticker-change ${item.positive ? "positive" : "negative"}`}>{item.change}</span>
              <span className="ticker-separator" />
            </div>
          ))}
        </div>
      </div>

      <motion.div style={{ y: backgroundY }} className="parallax-bg-decoration" />

      {/* Floating Icons */}
      <motion.div style={{ y: iconY1 }} className="floating-icon icon-1"><TrendingUp size={40} /></motion.div>
      <motion.div style={{ y: iconY2 }} className="floating-icon icon-2"><Activity size={60} /></motion.div>
      <motion.div style={{ y: iconY3 }} className="floating-icon icon-3"><BarChart3 size={50} /></motion.div>
      <motion.div style={{ y: iconY1 }} className="floating-icon icon-4"><DollarSign size={45} /></motion.div>

      {/* Hero Section */}
      <section className="hero">
        <div className="modern-container">
          <div className="hero__content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hero__text"
            >
              <div className="badge">
                <span className="pulse"></span> {t("status")}
              </div>

              <h1 className="hitech-title">
                <span className="name">{t("name")}</span> <br />
                <span className="gradient-text">{t("title")}</span>
              </h1>

              <p>{t("subtitle")}</p>

              <div className="hero__actions">
                <SendMailModal />
                <button onClick={event => uploadMyCv(event, locale)} className="btn-secondary">
                  {t("deployResume")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="hero__image-wrapper"
            >
              <div className="profile-container">
                <div className="profile-blob">
                  <img src="/assets/images/fidele.jpg" alt={t("name")} />
                </div>
                <div className="tech-ring"></div>
                <div className="tech-ring second"></div>
                <span className="corner-tr" />
                <span className="corner-bl" />
              </div>
              <span className="system-status-label">SYSTEM ONLINE</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY ME ─── */}
      <section className="why-section">
        <div className="modern-container">
          <div className="why-grid">
            <motion.div
              className="why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="why-icon"><Building2 size={20} /></div>
              <h3>{t("why.clients.title")}</h3>
              <p>{t("why.clients.desc")}</p>
            </motion.div>

            <motion.div
              className="why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="why-icon"><Layers size={20} /></div>
              <h3>{t("why.fullstack.title")}</h3>
              <p>{t("why.fullstack.desc")}</p>
            </motion.div>

            <motion.div
              className="why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="why-icon"><Container size={20} /></div>
              <h3>{t("why.devops.title")}</h3>
              <p>{t("why.devops.desc")}</p>
            </motion.div>

            <motion.div
              className="why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="why-icon"><Bot size={20} /></div>
              <h3>{t("why.ai.title")}</h3>
              <p>{t("why.ai.desc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Sections */}
      <section className="bento-sections modern-container">
        <div className="bento-grid">
          <motion.div style={{ y: isMobile ? 0 : bentoY1 }} className="bento-item bento-about scanlines">
            <Link href="/about" className="explore-btn" aria-label={t("aria.about")}>
              <Plus size={20} />
            </Link>
            <About />
          </motion.div>

          <motion.div style={{ y: isMobile ? 0 : bentoY2 }} className="bento-item bento-skills scanlines">
            <Link href="/skills" className="explore-btn" aria-label={t("aria.skills")}>
              <Plus size={20} />
            </Link>
            <Skills />
          </motion.div>

          <motion.div style={{ y: isMobile ? 0 : bentoY3 }} className="bento-item bento-experience scanlines">
            <Link href="/experience" className="explore-btn" aria-label={t("aria.experience")}>
              <Plus size={20} />
            </Link>
            <Experience />
          </motion.div>

          <motion.div className="bento-item bento-projects scanlines">
            <Link href="/projects" className="explore-btn" aria-label={t("aria.projects")}>
              <Plus size={20} />
            </Link>
            <Projects />
          </motion.div>

          <motion.div className="bento-item bento-activity scanlines">
            <GithubActivity />
          </motion.div>

          <LinkedinBento />
        </div>
      </section>
    </div>
  );
}

// La cellule n'existe que s'il y a des publications à afficher
function LinkedinBento() {
  if (linkedinPosts.length === 0) return null;
  return (
    <motion.div className="bento-item bento-linkedin scanlines">
      <LinkedinPosts />
    </motion.div>
  );
}
