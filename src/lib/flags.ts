"use client";

// Simple Feature Flag system for Senior Portfolio
// In a real app, these would come from a DB or services like LaunchDarkly
const DEFAULT_FLAGS = {
  enableAIAssistant: false,
  enableAdvancedAnalytics: true,
  enableExperimentalUI: false,
  showPerformanceMetrics: false,
};

export type FeatureFlags = typeof DEFAULT_FLAGS;

export const getFlags = (): FeatureFlags => {
  if (typeof window === "undefined") return DEFAULT_FLAGS;
  
  const savedFlags = localStorage.getItem("portfolio_flags");
  if (savedFlags) {
    try {
      return { ...DEFAULT_FLAGS, ...JSON.parse(savedFlags) };
    } catch (e) {
      return DEFAULT_FLAGS;
    }
  }
  return DEFAULT_FLAGS;
};

export const setFlag = (key: keyof FeatureFlags, value: boolean) => {
  const flags = getFlags();
  flags[key] = value;
  localStorage.setItem("portfolio_flags", JSON.stringify(flags));
  window.dispatchEvent(new Event("flagsUpdate"));
};
