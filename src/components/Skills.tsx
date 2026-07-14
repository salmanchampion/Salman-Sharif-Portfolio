import React, { useState } from "react";
import { portfolioData } from "../data";
import { Compass, Database, MonitorCheck, TrendingUp, Layers } from "lucide-react";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills-section" className="py-20 lg:py-28 px-4 bg-[#0c101e] relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary-grad/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            আমার কাজের পরিধি
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            विशेषज्ञ লেভেল প্রফেশনাল স্কিলস
          </h2>
          <p className="text-gray-400 text-sm font-light">
            আমি Sabre, Galileo এবং Amadeus GDS-এ আন্তর্জাতিক মানের ফ্লাইং বুকিং দক্ষতা অর্জন করেছি। কাস্টম গ্লাসমরফিক ডিজাইন ভিউতে আমার দক্ষতা পরিমাপ করুন।
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Skill categories columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(portfolioData?.skillCategories || []).map((category, idx) => (
            <div
              id={`skill-category-card-${idx}`}
              key={idx}
              className="rounded-2xl glass-panel p-6 border border-white/5 bg-[#12182b]/50 hover:bg-[#12182b]/80 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header for Category */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/15 to-secondary-grad/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <i className={`${category.icon || "fa-solid fa-layer-group"} text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`} />
                  </div>
                  <h3 className="text-md sm:text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {category.categoryName}
                  </h3>
                </div>

                {/* Progress bars Grid */}
                <div className="space-y-5">
                  {(category.skills || []).map((skill, sIdx) => {
                    const progressStyle = { width: `${skill.level || 0}%` };
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <div
                        id={`skill-bar-${idx}-${sIdx}`}
                        key={sIdx}
                        className="space-y-2 text-left"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className={`transition-all ${isHovered ? "text-primary scale-102" : "text-gray-300"}`}>
                            {skill.name}
                          </span>
                          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md text-[10px]">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Track */}
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                          {/* Progress */}
                          <div
                            className={`h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ${
                              isHovered ? "shadow-[0_0_10px_rgba(58,134,255,0.8)]" : ""
                            }`}
                            style={progressStyle}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-light">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-accent" />
                  সার্বক্ষণিক আপডেটেড
                </span>
                <span>প্রফেশনাল গ্রেড</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic GDS booking visual simulator to demonstrate GDS knowledge */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-white/5 bg-gradient-to-r from-slate-900/40 via-blue-950/20 to-slate-900/40 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-white/5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#06d6a0] bg-[#06d6a0]/10 px-2 py-1 rounded-md">
                GDS Sabre/Galileo ইন্টার্যাক্টিভ শোকেস
              </span>
              <h3 className="text-lg font-bold text-white mt-1">GDS PNR এয়ারলাইন কমান্ড সিমুলেটর</h3>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              STATUS: <span className="text-glow text-accent font-semibold">● ACTIVE TERM CONSOLE</span>
            </div>
          </div>

          <div className="bg-black/75 rounded-xl p-4.5 font-mono text-xs text-emerald-400 border border-emerald-500/15 overflow-x-auto min-h-[140px] leading-relaxed relative">
            <div className="absolute top-4 right-4 text-xs text-gray-600">SABRE v3.42</div>
            <p className="text-gray-500">// এন্টার করুন এবং স্যান্ডবক্স কমান্ড রান করুন...</p>
            <p className="text-blue-300">
              <span className="text-gray-400">&gt;</span> 1S.DAC/JED/25MAY/BG
            </p>
            <p className="text-glow text-emerald-300">
              BG 035  DAC-JED  A9 Y9 M8 H7 Q6 L5 S4 O3 T2  0930  1355  77W 0 /E<br />
              1S.PNR-A38FL92 / SHARIF.SALMAN
            </p>
            <p className="text-gray-400">&gt; 01Y1 * BG1 / SS3</p>
            <p className="text-emerald-400">
              1.1SHARIF/SALMAN MR <br />
              1 BG 035Y 25MAY DACJED SS1 0930 1355 /E-TKT<br />
              T-A19MAY-T2*
            </p>
            <p className="text-yellow-400 text-[10px] mt-2 italic bg-yellow-500/10 inline-block px-2 py-0.5 rounded">
              * নোট: উপরের সিগন্যালটি Sabre GDS-এ ফ্লাইট পিএনআর ক্রিয়েশন এবং এভেইলেবিলিটি চেক করার আসল ডেমো কোড।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
