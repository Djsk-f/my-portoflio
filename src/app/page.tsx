"use client";

import { containerVariants, imageVariants, circularImageVariants, textVariants, titleVariants } from "./animations/home.animations";
import { uploadMyCv } from "./services/commonservice";
import SendMailModal from "@/components/sendMail";
import Projects from "@/components/project";
import Skills from "@/components/skills";
import { motion } from "framer-motion";
import About from "@/components/about";


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
              <motion.button onClick={uploadMyCv} className="presentation__text--myCV" variants={imageVariants}>
                Mon CV
              </motion.button>
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