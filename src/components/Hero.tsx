import React, { useState, useEffect } from "react";
import { portfolioData } from "../data";
import { ArrowRight, Download, Calendar, Mail, Compass, Plane, FileText, CheckCircle2 } from "lucide-react";

interface HeroProps {
  setCurrentPage: (page: string) => void;
  onOpenCVModal: () => void;
}

export default function Hero({ setCurrentPage, onOpenCVModal }: HeroProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const words = portfolioData.subtitles && portfolioData.subtitles.length > 0 
    ? portfolioData.subtitles 
    : ["এয়ার টিকেটিং এক্সপার্ট"];
  const loopSpeed = isDeleting ? 40 : 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[textIndex] || "";

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, Math.min(currentText.length + 1, fullWord.length)));
        if (currentText === fullWord) {
          // Pause at full word
          timer = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, loopSpeed);
    } else {
      // Deleting
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, Math.max(currentText.length - 1, 0)));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % words.length);
        }
      }, loopSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, words, loopSpeed]);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#0c101d]">
      {/* Decorative Floating Background Spheres */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary-grad/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column info */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-xs sm:text-sm animate-bounce">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="tracking-wide">২০২৬ স্পেশাল ট্রাভেল ডিসকাউন্ট অফার অবমুক্ত!</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              হ্যালো, আমি <br />
              <span className="text-glow bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent font-extrabold">
                {portfolioData.name}
              </span>
            </h1>
            
            {/* Dynamic Typing Subtitle */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-lg sm:text-2xl font-semibold text-gray-300">আমি একজন&nbsp;</span>
              <span className="text-lg sm:text-2xl font-bold text-primary border-r-2 border-primary animate-pulse pr-1 text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currentText}
              </span>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {portfolioData.tagline}
            </p>
          </div>

          {/* Core Credentials Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mr-4 sm:mr-0">
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 shadow-inner">
              <i className="fa-solid fa-plane text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-400 font-light">সার্টিফাইড</p>
                <p className="text-sm font-semibold text-white">এয়ার টিকিটিং</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 shadow-inner">
              <i className="fa-solid fa-kaaba text-accent text-lg" />
              <div>
                <p className="text-xs text-gray-400 font-light">হজ্জ ও ওমরাহ</p>
                <p className="text-sm font-semibold text-white">স্পেশালিস্ট</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 shadow-inner col-span-2 sm:col-span-1">
              <i className="fa-solid fa-passport text-secondary-grad text-lg" />
              <div>
                <p className="text-xs text-gray-400 font-light">পেশাদার</p>
                <p className="text-sm font-semibold text-white">ভিসা কনসাল্ট্যান্ট</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              id="hero-cta-services"
              onClick={() => setCurrentPage("services")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary-grad hover:opacity-95 text-white font-medium text-sm transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              আমার সেবাসমূহ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              id="hero-cta-portfolio"
              onClick={() => setCurrentPage("portfolio")}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10 hover:border-white/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              আমার কাজ দেখুন
              <Compass className="w-4 h-4 text-primary" />
            </button>

            <button
              id="hero-cta-contact"
              onClick={() => setCurrentPage("contact")}
              className="px-6 py-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-medium text-sm transition-all border border-indigo-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              যোগাযোগ করুন
              <Mail className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-cv"
              onClick={onOpenCVModal}
              className="px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-medium text-sm transition-all border border-emerald-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              CV ডাউনলোড করুন
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Social Icons inside hero */}
          <div className="flex items-center gap-5 pt-4">
            <span className="text-gray-400 text-sm font-medium">আমাকে খুঁজুন:</span>
            <div className="flex gap-4">
              <a href={portfolioData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:border-primary/50 hover:text-primary list-none flex items-center justify-center text-gray-300 transition-all hover:-translate-y-1">
                <i className="fa-brands fa-facebook text-lg" />
              </a>
              <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:border-primary/50 hover:text-primary list-none flex items-center justify-center text-gray-300 transition-all hover:-translate-y-1">
                <i className="fa-brands fa-linkedin text-lg" />
              </a>
              <a href={portfolioData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:border-accent/50 hover:text-accent list-none flex items-center justify-center text-gray-300 transition-all hover:-translate-y-1">
                <i className="fa-brands fa-whatsapp text-lg" />
              </a>
              <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:border-primary/50 hover:text-blue-400 list-none flex items-center justify-center text-gray-300 transition-all hover:-translate-y-1">
                <i className="fa-brands fa-github text-lg" />
              </a>
              <a href={portfolioData.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:border-red-500/50 hover:text-red-500 list-none flex items-center justify-center text-gray-300 transition-all hover:-translate-y-1">
                <i className="fa-brands fa-youtube text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Gorgeous Profile Card with Glassmorphism */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-72 sm:w-80 md:w-96 aspect-square max-w-full">
            {/* Outer Glow Circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary-grad to-accent rounded-2xl blur-[12px] opacity-40 animate-pulse" />
            
            {/* Glassmorphic border container */}
            <div className="absolute inset-0.5 rounded-2xl bg-[#111625]/90 border border-white/10 flex items-center justify-center p-4 relative overflow-hidden group">
              {/* Backing accent lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,134,255,0.15),transparent)]" />
              
              {/* Profile Image container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-primary/10 to-transparent flex items-end justify-center pt-8 border border-white/5">
                <img
                  referrerPolicy="no-referrer"
                  src={portfolioData.profileImage}
                  alt={portfolioData.name}
                  className="w-full h-full object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] brightness-[1.05] transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              {/* Float Widget inside card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{portfolioData.institution}</h4>
                    <p className="text-[11px] text-gray-400">এয়ার টিকেটিং ও ট্রাভেল সল্যুশন</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tiny Floating decorative dots */}
            <div className="absolute top-10 -left-6 w-12 h-12 rounded-full bg-accent/20 border border-accent/20 backdrop-blur-md flex items-center justify-center animate-float-slow text-accent text-sm shadow">
              <i className="fa-solid fa-kaaba" />
            </div>
            <div className="absolute -bottom-4 -right-2 w-14 h-14 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-md flex items-center justify-center animate-float-delayed text-primary text-lg shadow">
              <i className="fa-solid fa-passport" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
