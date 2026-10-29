"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import posts from "@/data/linkedin-posts.json";
import { LINKEDIN_URL } from "@/lib/profiles";
import { longDateFormat, parseDay } from "@/lib/dates";

const VISIBLE_POSTS = 3;

interface LinkedinPost {
  urn: string;
  date: string;
  excerpt?: string;
}

export default function LinkedinPosts() {
  const t = useTranslations("Linkedin");
  const locale = useLocale();
  // Les lecteurs LinkedIn ne sont chargés qu'à la demande : aucune requête vers LinkedIn avant le clic
  const [loaded, setLoaded] = useState(false);

  const recent = (posts as LinkedinPost[]).slice(0, VISIBLE_POSTS);
  if (recent.length === 0) return null;

  const dateFormat = longDateFormat(locale);

  return (
    <div id="publications" className="linkedin-section">
      <h2 className="section-title">
        <span className="title-number">06</span> {t("title")}
      </h2>

      <div className="linkedin-grid">
        {recent.map((post, index) => (
          <motion.article
            key={post.urn}
            className={`linkedin-card${loaded ? " is-loaded" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            {loaded ? (
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/${post.urn}`}
                title={t("embedTitle", { date: dateFormat.format(parseDay(post.date)) })}
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="linkedin-preview">
                <span className="linkedin-meta">
                  <FaLinkedin /> {dateFormat.format(parseDay(post.date))}
                </span>
                <p>{post.excerpt ?? t("placeholder")}</p>
              </div>
            )}
            <a
              href={`https://www.linkedin.com/feed/update/${post.urn}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-open"
            >
              {t("open")} <ArrowUpRight size={13} />
            </a>
          </motion.article>
        ))}
      </div>

      <div className="linkedin-actions">
        {!loaded && (
          <button type="button" className="linkedin-load" onClick={() => setLoaded(true)}>
            <FaLinkedin /> {t("load")}
          </button>
        )}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="linkedin-profile">
          {t("profile")} <ArrowUpRight size={14} />
        </a>
      </div>
      {!loaded && <p className="linkedin-privacy">{t("privacy")}</p>}
    </div>
  );
}
