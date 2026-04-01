"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Database, Zap, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/project";
import Experience from "@/components/experience";
import SendMailModal from "@/components/sendMail";
import { uploadMyCv } from "../services/commonservice";
import { useTranslations } from "next-intl";

export default function Home() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);
  const t = useTranslations("Home");

  // Parallax Transfroms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 50]);
  const bentoY1 = useTransform(scrollY, [0, 1000], [0, -80]); // Sync speed for top row
  const bentoY2 = useTransform(scrollY, [0, 1000], [0, -80]); // Sync speed for top row
  const bentoY3 = useTransform(scrollY, [0, 1000], [0, -40]); // Different speed for individual row items
  const orb1Y = useTransform(scrollY, [0, 2000], [0, -300]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, 300]);
  
  // Icon Parallaxes
  const iconY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const iconY2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const iconY3 = useTransform(scrollY, [0, 1000], [0, -250]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="modern-layout">
      
      {/* Parallax Background Notebook Decoration */}
      <motion.div 
        style={{ y: backgroundY }}
        className="parallax-bg-decoration"
      />

      {/* Floating Tech Icons */}
      <motion.div style={{ y: iconY1 }} className="floating-icon icon-1"><Zap size={40} /></motion.div>
      <motion.div style={{ y: iconY2 }} className="floating-icon icon-2"><Code2 size={60} /></motion.div>
      <motion.div style={{ y: iconY3 }} className="floating-icon icon-3"><Cpu size={50} /></motion.div>
      <motion.div style={{ y: iconY1 }} className="floating-icon icon-4"><Database size={45} /></motion.div>


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
              
              <p>
                {t("subtitle")}
              </p>

              <div className="hero__actions">
                <SendMailModal />
                <button onClick={uploadMyCv} className="btn-secondary">
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
                {/* Tech Ring Decoration */}
                <div className="tech-ring"></div>
                <div className="tech-ring second"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Sections */}
      <section className="bento-sections modern-container">
        <div className="bento-grid">
          {/* About - Slow Parallax Up */}
          <motion.div 
            style={{ y: isMobile ? 0 : bentoY1 }}
            className="bento-item bento-about"
          >
            <Link href="/about" className="explore-btn" aria-label={t("aria.about")}>
              <Plus size={20} />
            </Link>
            <About />
          </motion.div>
          
          {/* Skills - Subtle Parallax Up */}
          <motion.div 
            style={{ y: isMobile ? 0 : bentoY2 }}
            className="bento-item bento-skills"
          >
            <Link href="/skills" className="explore-btn" aria-label={t("aria.skills")}>
              <Plus size={20} />
            </Link>
            <Skills />
          </motion.div>

          {/* Experience - Medium Parallax Up */}
          <motion.div 
            style={{ y: isMobile ? 0 : bentoY3 }}
            className="bento-item bento-experience"
          >
            <Link href="/experience" className="explore-btn" aria-label={t("aria.experience")}>
              <Plus size={20} />
            </Link>
            <Experience />
          </motion.div>
          
          {/* Projects - Fixed or very slight parallax handled by overflow container */}
          <motion.div 
            className="bento-item bento-projects"
          >
            <Link href="/projects" className="explore-btn" aria-label={t("aria.projects")}>
              <Plus size={20} />
            </Link>
            <Projects />
          </motion.div>
        </div>
      </section>
    </div>
  );
}