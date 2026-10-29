"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, GitBranch, Star } from "lucide-react";
import type { ActivityDay, GithubActivity as GithubActivityData } from "@/lib/github";
import { GITHUB_URL } from "@/lib/profiles";
import { longDateFormat, parseDay } from "@/lib/dates";

// Paliers de couleur du calendrier (séquentiel, une seule teinte)
const levelOf = (count: number) => (count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4);

const longestStreak = (days: ActivityDay[]) => {
  let best = 0;
  let current = 0;
  for (const day of days) {
    current = day.github + day.local > 0 ? current + 1 : 0;
    best = Math.max(best, current);
  }
  return best;
};

// Découpe en colonnes de 7 jours (dimanche en tête), comme le calendrier GitHub
const toWeeks = (days: ActivityDay[]) => {
  const weeks: (ActivityDay | null)[][] = [];
  const offset = days.length ? parseDay(days[0].date).getDay() : 0;
  const padded: (ActivityDay | null)[] = [...Array(offset).fill(null), ...days];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
};

export default function GithubActivity() {
  const t = useTranslations("Activity");
  const locale = useLocale();
  const [data, setData] = useState<GithubActivityData | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<{ day: ActivityDay; x: number; y: number } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github")
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const dateFormat = useMemo(() => longDateFormat(locale), [locale]);
  const monthFormat = useMemo(() => new Intl.DateTimeFormat(locale, { month: "short" }), [locale]);

  const weeks = useMemo(() => (data ? toWeeks(data.days) : []), [data]);

  // Sur petit écran le calendrier défile : on l'ouvre sur les semaines les plus récentes
  useEffect(() => {
    if (calendarRef.current) calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
  }, [weeks]);
  const stats = useMemo(() => {
    if (!data) return null;
    return {
      total: data.totals.github + data.totals.local,
      activeDays: data.days.filter(day => day.github + day.local > 0).length,
      streak: longestStreak(data.days),
    };
  }, [data]);

  // Libellé de mois au-dessus de la première semaine de chaque mois
  const monthLabels = useMemo(
    () =>
      weeks.map((week, index) => {
        const first = week.find(Boolean);
        if (!first) return "";
        const month = first.date.slice(0, 7);
        const previous = weeks[index - 1]?.find(Boolean)?.date.slice(0, 7);
        return month !== previous && index > 0 ? monthFormat.format(parseDay(first.date)) : "";
      }),
    [weeks, monthFormat],
  );

  if (failed) {
    return (
      <div id="activity" className="activity-section">
        <h2 className="section-title">
          <span className="title-number">05</span> {t("title")}
        </h2>
        <p className="activity-fallback">
          {t("unavailable")}{" "}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">{GITHUB_URL.replace("https://", "")}</a>
        </p>
      </div>
    );
  }

  return (
    <div id="activity" className="activity-section">
      <h2 className="section-title">
        <span className="title-number">05</span> {t("title")}
      </h2>

      {!data || !stats ? (
        <div className="activity-skeleton" aria-busy="true" aria-label={t("loading")} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <dl className="activity-stats">
            <div>
              <dt>{t("stats.total")}</dt>
              <dd>{stats.total.toLocaleString(locale)}</dd>
            </div>
            <div>
              <dt>{t("stats.activeDays")}</dt>
              <dd>{stats.activeDays}</dd>
            </div>
            <div>
              <dt>{t("stats.streak")}</dt>
              <dd>{t("stats.days", { count: stats.streak })}</dd>
            </div>
            <div>
              <dt>{t("stats.repos")}</dt>
              <dd>{data.publicRepos}</dd>
            </div>
          </dl>

          <div className="activity-calendar-card">
            <div
              ref={calendarRef}
              className="activity-calendar"
              role="img"
              aria-label={t("calendarLabel", { total: stats.total, days: stats.activeDays })}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="calendar-months" aria-hidden="true">
                {monthLabels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>
              <div className="calendar-grid" aria-hidden="true">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="calendar-week">
                    {week.map((day, dayIndex) =>
                      day ? (
                        <span
                          key={day.date}
                          className={`calendar-day level-${levelOf(day.github + day.local)}`}
                          onMouseEnter={event => {
                            const cell = event.currentTarget.getBoundingClientRect();
                            const box = event.currentTarget.closest(".activity-calendar")!.getBoundingClientRect();
                            setHovered({ day, x: cell.left - box.left + cell.width / 2, y: cell.top - box.top });
                          }}
                        />
                      ) : (
                        <span key={`empty-${dayIndex}`} className="calendar-day empty" />
                      ),
                    )}
                  </div>
                ))}
              </div>

              {hovered && (
                <div className="calendar-tooltip" style={{ left: hovered.x, top: hovered.y }}>
                  <strong>
                    {t("tooltip.total", { count: hovered.day.github + hovered.day.local })}
                  </strong>{" "}
                  · {dateFormat.format(parseDay(hovered.day.date))}
                  {hovered.day.github + hovered.day.local > 0 && (
                    <span className="tooltip-split">
                      {t("tooltip.split", { local: hovered.day.local, github: hovered.day.github })}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="calendar-footer">
              <p className="calendar-source">
                {t("source", { date: dateFormat.format(new Date(data.localGeneratedAt)) })}
              </p>
              <div className="calendar-legend" aria-hidden="true">
                {t("less")}
                {[0, 1, 2, 3, 4].map(level => (
                  <span key={level} className={`calendar-day level-${level}`} />
                ))}
                {t("more")}
              </div>
            </div>
          </div>

          <div className="activity-repos">
            {data.repos.map(repo => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-card">
                <span className="repo-name">
                  <GitBranch size={13} /> {repo.name}
                </span>
                <span className="repo-description">{repo.description ?? t("noDescription")}</span>
                <span className="repo-meta">
                  {repo.language && <span className="repo-language">{repo.language}</span>}
                  {repo.stars > 0 && (
                    <span>
                      <Star size={11} /> {repo.stars}
                    </span>
                  )}
                  <span>{t("updated", { date: dateFormat.format(new Date(repo.pushedAt)) })}</span>
                </span>
              </a>
            ))}
          </div>

          <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="activity-profile-link">
            {t("profile")} <ArrowUpRight size={14} />
          </a>
        </motion.div>
      )}
    </div>
  );
}
