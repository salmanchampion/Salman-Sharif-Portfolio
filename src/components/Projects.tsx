import React, { useState } from "react";
import { portfolioData } from "../data";
import { Project } from "../types";
import { ArrowUpRight, Github, ExternalLink, HelpCircle } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter Categories
  const categories = [
    { id: "all", label: "সকল প্রজেক্টস" },
    { id: "WordPress", label: "ওয়ার্ডপ্রেস (WordPress)" },
    { id: "Blogger", label: "ব্লগার (Blogger)" },
    { id: "React", label: "রিয়েক্ট (React)" },
  ];

  // Projects filtration
  const filteredProjects = (portfolioData?.projects || []).filter((project) => {
    if (filter === "all") return true;
    return (project.tags || []).some((tag) => tag.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <section id="portfolio-section" className="py-20 lg:py-28 px-4 bg-[#0a0e1a] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            আমার কাজের পোর্টফোলিও
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            সম্পন্ন করা সফল প্রজেক্টসমূহ ও থিম
          </h2>
          <p className="text-gray-400 text-sm font-light">
            আমি ট্রাভেল ব্যবসার আধুনিকায়নে বিভিন্ন বুকিং সাইট, ব্লগার কাস্টম এক্সএমএল টেমপ্লেট এবং অটোমেশন ল্যান্ডিং পেজ তৈরি করেছি।
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Filter Categories Navbar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              id={`project-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                filter === cat.id
                  ? "bg-gradient-to-r from-primary to-accent text-[#0b0f19] font-bold shadow-md shadow-primary/25 scale-102"
                  : "bg-white/[0.03] border border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with dynamic hover screenshot scrolling effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              id={`project-card-${project.id}`}
              key={project.id}
              className="rounded-2xl glass-panel overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group p-0 bg-[#12182b]/60 hover:-translate-y-1.5 shadow-2xl"
            >
              <div>
                {/* Scrollable image container requested */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950/80 rounded-t-2xl border-b border-white/5 group-hover:cursor-ns-resize group/img">
                  {/* Floating tags */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                    {(project.tags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide bg-primary/20 text-white border border-primary/20 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Absolute Image with Hover Scrolling top to bottom */}
                  <img
                    referrerPolicy="no-referrer"
                    src={project.image}
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-auto max-h-none object-cover transition-transform duration-[4500ms] ease-in-out origin-top group-hover/img:translate-y-[-55%]"
                    style={{ minHeight: "100%" }}
                  />
                  
                  {/* Overlay help icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 bg-black/60 rounded-full border border-white/10 text-glow text-[10px] text-white flex items-center gap-1.5">
                      <i className="fa-solid fa-arrows-up-down animate-bounce text-primary" />
                      পূর্ণাঙ্গ লেআউট দেখতে হোভার করুন
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 text-left">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card CTA Actions */}
              <div className="px-6 pb-6 pt-2 text-left">
                <div className="flex gap-3 mt-4 border-t border-white/5 pt-4">
                  {project.liveLink && project.liveLink !== "#" ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary-grad text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow shadow-primary/10"
                    >
                      লাইভ দেখুন
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary-grad text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all shadow shadow-primary/10"
                    >
                      লাইভ ডেমো
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    বিস্তারিত
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detailed Description Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className="rounded-3xl bg-[#0e1222] border border-white/10 w-full max-w-xl p-6 md:p-8 text-left space-y-6 relative max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {selectedProject.tags.join(" | ")}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedProject.title}</h3>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>

              {/* Preview image static */}
              <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedProject.image}
                  className="w-full h-full object-cover"
                  alt={selectedProject.title}
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {selectedProject.details || selectedProject.description}
                </p>
                
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2">
                  <p className="text-xs text-gray-400 font-medium">কোর ফিচার সমূহ ও ইন্টিগ্রেশন:</p>
                  <ul className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 font-light">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      রেসপন্সিভ মোবাইল ফ্রেন্ডলি
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      হোয়াটসঅ্যাপ চ্যাট বাটন
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      এসইও কাস্টমাইজেশন রেডি
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      তাত্ক্ষণিক বুকিং রিকোয়েস্ট
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <a
                  href={`${portfolioData.socialLinks.whatsapp}?text=হ্যালো সালমান শরীফ, আমি আপনার "${selectedProject.title}" প্রজেক্টের অনুরূপ একটি কাজের ব্যাপারে আলোচনা করতে আগ্রহী।`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-[#0b0f19] font-bold text-center rounded-xl text-xs hover:opacity-95 transition-all shadow-md shadow-primary/10"
                >
                  এই প্রজেক্ট নিয়ে কথা বলুন
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold"
                >
                  অনুমোদন করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
