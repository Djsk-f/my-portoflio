"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundEffect() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [isMounted, setIsMounted] = React.useState(false);

  // Parallax Transfroms for Orbs
  const orb1Y = useTransform(scrollY, [0, 2000], [0, -300]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, 300]);

  React.useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="global-background-container" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: -1 }}>
      {/* Drifting Orbs with Parallax */}
      <motion.div style={{ y: orb1Y }} className="orb orb-1"></motion.div>
      <motion.div style={{ y: orb2Y }} className="orb orb-2"></motion.div>
    </div>
  );
}
