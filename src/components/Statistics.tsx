import React, { useState, useEffect } from "react";
import { portfolioData } from "../data";

export default function Statistics() {
  const stats = portfolioData.statistics && portfolioData.statistics.length > 0
    ? portfolioData.statistics
    : [];
  const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    if (stats.length === 0) return;
    // Elegant incremental counter effect representing realistic counts
    const duration = 2000; // ms
    const steps = 40;
    const intervalTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextCounts = stats.map((stat) => {
        const target = stat.value;
        const progress = currentStep / steps;
        return Math.min(Math.round(target * progress), target);
      });
      
      setCounts(nextCounts);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stats.length]);

  return (
    <section id="statistics-section" className="relative py-16 bg-gradient-to-r from-primary/10 via-secondary-grad/5 to-[#0b0f19] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[#0c101d]/10 backdrop-blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, idx) => (
            <div
              id={`stat-container-${stat.id}`}
              key={stat.id}
              className="text-center space-y-2 group"
            >
              {/* Animated Floating Icon Background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/15 flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                <i className={`${stat.icon} text-lg text-primary`} />
              </div>

              {/* Number Value Counter */}
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-glow bg-gradient-to-r from-white via-blue-50 to-primary bg-clip-text">
                {counts[idx]}
                <span className="text-accent ml-0.5 font-bold">{stat.suffix}</span>
              </p>

              {/* Label Name in Bengali */}
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
