import React from "react";
import { portfolioData } from "../data";
import { Calendar, Briefcase, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience-section" className="py-20 lg:py-28 px-4 bg-[#0c101e] relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary-grad/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Experience Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            আমার কাজের ইতিহাস
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            চাকুরির অভিজ্ঞতা ও টাইমলাইন
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative mb-24 text-left">
          {/* Vertical center bar for timeline */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary-grad to-accent opacity-20" />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {(portfolioData?.experiences || []).map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  id={`timeline-item-${exp.id}`}
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-stretch ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Circle Bubble Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[15px] sm:-translate-x-1/2 w-8 h-8 rounded-full bg-dark-bg border-4 border-primary flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                  </div>

                  {/* Left spacer block for desktop */}
                  <div className="sm:w-1/2 hidden sm:block" />

                  {/* Right Content Card block */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="rounded-2xl glass-panel p-6 bg-[#111625]/60 hover:bg-[#111625]/90 border border-white/5 hover:border-primary/25 transition-all duration-300">
                      
                      {/* Duration & Icon Indicator */}
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{exp.duration}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 block" />
                        <span className="text-primary font-semibold">{portfolioData.institution}</span>
                      </div>

                      {/* Role & Company info */}
                      <h3 className="text-lg font-bold text-white mb-1.5 text-glow">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-gray-400 font-light mb-4 pb-3 border-b border-white/5">
                        {exp.description}
                      </p>

                      {/* Feature bullets details */}
                      <ul className="space-y-2">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2 items-start text-xs text-gray-300 leading-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="border-t border-white/5 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#06d6a0] bg-[#06d6a0]/10 px-3.5 py-1.5 rounded-full">
              ক্রিডেন্সিয়াল
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              পেশাদার একাডেমী ড্রাইভিং সার্টিফিকেটসমূহ
            </h2>
            <p className="text-gray-400 text-sm font-light">
              আমরা Sabre ও Galileo সহ আন্তর্জাতিক GDS সিস্টেমে ভেরিফাইড প্রাতিষ্ঠানিক ডিগ্রি অর্জন করেছি।
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(portfolioData?.certifications || []).map((cert) => (
              <div
                id={`cert-card-${cert.id}`}
                key={cert.id}
                className="rounded-2xl glass-panel p-5 bg-[#12182b]/50 hover:bg-[#12182b]/95 border border-white/5 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Badge Icon Block */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform mb-5">
                    <i className={`${cert.icon} text-lg`} />
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 font-light mb-1">{cert.issuer}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    ইস্যু সাল: {cert.year}
                  </span>
                  <span className="text-accent">শতভাগ ভেরিফাইড</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
