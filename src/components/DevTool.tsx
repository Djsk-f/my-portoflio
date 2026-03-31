"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Activity, Shield, Terminal, X, Check, AlertCircle, BarChart3 } from "lucide-react";
import { getFlags, setFlag, FeatureFlags } from "@/lib/flags";
import { getAnalyticsStats } from "@/lib/analytics";

import { useTranslations } from "next-intl";

export default function DevTool() {
  const t = useTranslations("DevTool");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"flags" | "analytics">("flags");
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [metrics, setMetrics] = useState({ fps: 0, memory: 0, loadTime: 0 });
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // 1. Global Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === "D") {
        setIsVisible(prev => !prev);
      }
    };
    
    // 2. Data Synchronization
    const syncData = () => {
      setFlags(getFlags());
      setStats(getAnalyticsStats());
    };

    // 3. Performance Monitoring Loop
    let frames = 0;
    let lastTime = performance.now();
    let rafId: number;

    const updateFPS = () => {
      frames++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setMetrics(prev => ({ 
          ...prev, 
          fps: Math.round((frames * 1000) / (now - lastTime)) 
        }));
        frames = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(updateFPS);
    };

    // Initialize
    syncData();
    const loadTime = window.performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));
    rafId = requestAnimationFrame(updateFPS);

    // Event Listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("flagsUpdate", syncData);
    window.addEventListener("analyticsUpdate", syncData);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("flagsUpdate", syncData);
      window.removeEventListener("analyticsUpdate", syncData);
      cancelAnimationFrame(rafId);
    };
  }, []);


  if (!isVisible) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="dev-tool-trigger"
        title={`${t("title")} (Shift+Alt+D)`}
      >
        <Terminal size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="dev-panel"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="dev-header">
              <h3><Terminal size={16} /> {t("title")}</h3>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            <div className="dev-tabs">
              <button 
                className={activeTab === "flags" ? "active" : ""} 
                onClick={() => setActiveTab("flags")}
              >
                <Settings size={14} /> {t("tabs.flags")}
              </button>
              <button 
                className={activeTab === "analytics" ? "active" : ""} 
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 size={14} /> {t("tabs.analytics")}
              </button>
            </div>

            <div className="dev-content">
              {activeTab === "flags" ? (
                <>
                  <section>
                    <h4><Activity size={14} /> {t("sections.health")}</h4>
                    <div className="metric-grid">
                      <div className="metric">
                        <span>{t("metrics.performance")}</span>
                        <span className={metrics.fps < 30 ? "text-red" : "text-green"}>{metrics.fps} FPS</span>
                      </div>
                      <div className="metric">
                        <span>{t("metrics.loadTime")}</span>
                        <span>{Math.round(metrics.loadTime)}ms</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4><Shield size={14} /> {t("sections.flags")}</h4>
                    {flags && Object.entries(flags).map(([key, value]) => (
                      <div key={key} className="flag-item">
                        <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <button 
                          className={`toggle ${value ? 'on' : 'off'}`}
                          onClick={() => setFlag(key as keyof FeatureFlags, !value)}
                        >
                          {value ? <Check size={12} /> : <X size={12} />}
                        </button>
                      </div>
                    ))}
                  </section>
                </>
              ) : (
                <section>
                  <h4><BarChart3 size={14} /> {t("sections.stats")}</h4>
                  <div className="stats-list">
                    <div className="stat-card">
                      <span className="label">{t("stats.totalEvents")}</span>
                      <span className="value">{stats?.totalEvents || 0}</span>
                    </div>
                    {stats?.byType && Object.entries(stats.byType).map(([type, count]) => (
                      <div key={type} className="stat-card">
                        <span className="label">{type.replace("_", " ")}</span>
                        <span className="value">{count as number}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="dev-footer">
                <AlertCircle size={12} /> {t("footerNote")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}

