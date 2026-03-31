"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, Briefcase, Code, FileText } from "lucide-react";
import Fuse from "fuse.js";
import { projects } from "@/app/mocks/projects.mock";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SearchResult {
  item: any;
  refIndex: number;
  type: 'project' | 'skill' | 'page';
}

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "NestJS", "React Native", "Java Spring Boot", "SQL", "Docker", "Linux"
];

export default function SearchDialog() {
  const t = useTranslations("Search");
  const tNav = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const pages = useMemo(() => [
    { title: tNav("home"), href: "/" },
    { title: tNav("skills"), href: "/skills" },
    { title: tNav("experience"), href: "/experience" },
    { title: tNav("projects"), href: "/projects" },
    { title: tNav("contact"), href: "/contact" },
  ], [tNav]);

  const searchData = useMemo(() => [
    ...projects.map(p => ({ ...p, type: 'project' })),
    ...skills.map(s => ({ title: s, type: 'skill' })),
    ...pages.map(p => ({ ...p, type: 'page' })),
  ], [pages]);

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ["title", "description", "stack", "role", "context"],
    threshold: 0.4,
    distance: 100,
    ignoreLocation: true,
  }), [searchData]);



  const toggleSearch = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
      setResults([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch(true);
      }
      if (e.key === "Escape") {
        toggleSearch(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const searchResults = fuse.search(value).slice(0, 8);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <button
        onClick={() => toggleSearch(true)}
        className="search-trigger-btn"
        aria-label={t("placeholder")}
      >
        <Search size={18} />
        <span className="shortcut">⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="search-overlay">
            <motion.div
              className="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleSearch(false)}
            />

            <motion.div
              className="search-modal"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
            >
              <div className="search-header">
                <Search className="search-icon" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t("placeholder")}
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="close-btn" onClick={() => toggleSearch(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="search-body">
                {results.length > 0 ? (
                  <div className="results-list">
                    {results.map(({ item }, index) => (
                      <Link
                        key={index}
                        href={item.type === 'project' ? `/projects#${item.id}` : item.href || '/skills'}
                        onClick={() => toggleSearch(false)}
                        className="result-item"
                      >

                        <div className="item-icon">
                          {item.type === 'project' && <Briefcase size={16} />}
                          {item.type === 'skill' && <Code size={16} />}
                          {item.type === 'page' && <FileText size={16} />}
                        </div>
                        <div className="item-info">
                          <span className="item-title">{item.title}</span>
                          <span className="item-type">{item.type}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query.length > 1 ? (
                  <div className="no-results">{t("noResults", { query })}</div>
                ) : (
                  <div className="search-suggestions">
                    <p>{t("suggestions")}</p>
                    <div className="suggestion-chips">
                      <button onClick={() => handleSearch("Next.js")}>Next.js</button>
                      <button onClick={() => handleSearch("NestJS")}>NestJS</button>
                      <button onClick={() => handleSearch("Microservices")}>Microservices</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="search-footer">
                <div className="footer-item">
                  <Command size={12} /> + K {t("footerOpen")}
                </div>
                <div className="footer-item">
                  <span>ESC</span> {t("footerClose")}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}

