"use client";

// Simple Analytics utility for Senior Portfolio
// Uses LocalStorage to simulate a persistence layer for demonstration
export const trackEvent = (eventName: string, metadata: any = {}) => {
  if (typeof window === "undefined") return;
  
  const now = new Date().toISOString();
  const event = { eventName, metadata, timestamp: now };
  
  // 1. Log to console (Senior vibe: observability)
  console.log(`[Analytics] ${eventName}`, metadata);
  
  // 2. Persist to LocalStorage for the Internal Dashboard
  const history = JSON.parse(localStorage.getItem("portfolio_analytics") || "[]");
  history.push(event);
  
  // Keep only last 100 events to avoid bloating localStorage
  if (history.length > 100) history.shift();
  
  localStorage.setItem("portfolio_analytics", JSON.stringify(history));
  
  // 3. Dispatch event for real-time UI updates
  window.dispatchEvent(new CustomEvent("analyticsUpdate", { detail: event }));
};

export const getAnalyticsStats = () => {
  if (typeof window === "undefined") return { totalEvents: 0, byType: {} };
  
  const history = JSON.parse(localStorage.getItem("portfolio_analytics") || "[]");
  const stats = history.reduce((acc: any, event: any) => {
    acc.totalEvents++;
    acc.byType[event.eventName] = (acc.byType[event.eventName] || 0) + 1;
    return acc;
  }, { totalEvents: 0, byType: {} });
  
  return stats;
};
