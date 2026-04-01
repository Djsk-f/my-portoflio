"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const t = useTranslations("Common");
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    document.body.style.overflow = 'hidden';
    
    // Total duration 2000ms
    const totalDuration = 2000;
    const increment = 1;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, totalDuration / 100);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, totalDuration + 300); // Small buffer for exit animation
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(20px)",
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="splash-content">
            <motion.div 
              className="splash-logo-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="logo-glass">
                <span className="logo-text">FL</span>
              </div>
              <div className="logo-ring"></div>
            </motion.div>

            <motion.div 
              className="splash-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="status-label">{t("loading")}</span>
              <span className="status-percent">{progress}%</span>
            </motion.div>
            
            <div className="splash-progress">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
              <div className="progress-track"></div>
            </div>
          </div>

          <div className="splash-background">
            <div className="grid-overlay"></div>
            <div className="orb-decoration"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
