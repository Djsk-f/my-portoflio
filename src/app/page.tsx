"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Database, Zap } from "lucide-react";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/project";
import Experience from "@/components/experience";
import SendMailModal from "@/components/sendMail";
import { uploadMyCv } from "./services/commonservice";

export default function Home() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="modern-layout" style={{ 
      "--mouse-x": `${mousePos.x}%`, 
      "--mouse-y": `${mousePos.y}%` 
    } as React.CSSProperties}>
      
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

      {/* Alive Background Orbs */}
      <motion.div style={{ y: orb1Y }} className="orb orb-1"></motion.div>
      <motion.div style={{ y: orb2Y }} className="orb orb-2"></motion.div>

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
                <span className="pulse"></span> [LIVE] SYSTEM STATUS_OPTIMIZED
              </div>
              
              <h1 className="hitech-title">
                <span className="name">Fidèle Loffou</span> <br />
                <span className="gradient-text">Full-Stack Architect</span>
              </h1>
              
              <p>
                Engineering high-precision digital ecosystems with a focus on impact, 
                elegance, and technical excellence.
              </p>

              <div className="hero__actions">
                <SendMailModal />
                <button onClick={uploadMyCv} className="btn-secondary">
                  DE_PLOY RESUME
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
                  <img src="/assets/images/fidele.jpg" alt="Fidèle Loffou" />
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
            style={{ y: bentoY1 }}
            className="bento-item bento-about"
          >
            <About />
          </motion.div>
          
          {/* Skills - Subtle Parallax Up */}
          <motion.div 
            style={{ y: bentoY2 }}
            className="bento-item bento-skills"
          >
            <Skills />
          </motion.div>

          {/* Experience - Medium Parallax Up */}
          <motion.div 
            style={{ y: bentoY3 }}
            className="bento-item bento-experience"
          >
            <Experience />
          </motion.div>
          
          {/* Projects - Fixed or very slight parallax handled by overflow container */}
          <motion.div 
            className="bento-item bento-projects"
          >
            <Projects />
          </motion.div>
        </div>
      </section>
    </div>
  );
}