"use client";

import { motion } from "framer-motion";
import About from "@/components/about";
import Projects from "@/components/project";
import SendMailModal from "@/components/sendMail";
import Skills from "@/components/skills";

// Animations variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6
    }
  }
};

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="container">
      <div className="home">
        <motion.div 
          className="presentation"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="presentation__text" variants={textVariants}>
            <motion.h2 
              className="presentation__text--name"
              variants={titleVariants}
            >
              Fidele Loffou
            </motion.h2>
            <motion.div 
              className="presentation__text--title"
              variants={titleVariants}
            > 
              Developpeur Web <span> Full-Stack </span>
            </motion.div>
            <motion.p 
              className="presentation__text--description"
              variants={textVariants}
            >
              Je suis un développeur web passionné par la création d'applications
              web modernes et réactives. J'ai une solide expérience dans le
              développement front-end et back-end, et je suis toujours à la recherche
              de nouveaux défis.
            </motion.p>

            <motion.div 
              className="presentation__text--links"
              variants={textVariants}
            >
              <SendMailModal />
            </motion.div>
          </motion.div>

          <motion.div 
            className="presentation__image"
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <img
              src="/assets/images/fidele.jpg"
              alt="Fidele Loffou"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Export components with stagger animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <About />
        <Skills />
        <Projects />
      </motion.div>
    </div>
  );
}