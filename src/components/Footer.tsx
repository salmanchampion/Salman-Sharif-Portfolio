import React from "react";
import { portfolioData } from "../data";
import { ArrowUp, Plane, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onOpenKeypad?: () => void;
}

export default function Footer({ setCurrentPage, onOpenKeypad }: FooterProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="website-footer" className="bg-[#080b14] border-t border-white/5 py-12 px-4 relative overflow-hidden">
      {/* Footer background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Left block logo / copy */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-sm shadow">
              <Plane className="w-4 h-4 rotate-[45deg]" />
            </div>
            <span className="text-md sm:text-lg font-bold text-white tracking-tight">
              {portfolioData.name}
            </span>
          </div>
          
          <p className="text-[11px] text-gray-500 font-light flex items-center justify-center md:justify-start gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস অনুমোদিত এজেন্ট</span>
          </p>
          
          <p 
            onDoubleClick={onOpenKeypad}
            className="text-xs text-gray-500 font-light tracking-wide cursor-pointer hover:text-primary transition-colors select-none"
            title="ডাবল ক্লিক করুন সিক্রেট কিপ্যাড ওপেন করতে"
          >
            © {currentYear} {portfolioData.englishName}. সর্বস্বত্ব সংরক্ষিত। 
          </p>
        </div>

        {/* Center Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
          <button onClick={() => { setCurrentPage("home"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">নীড়</button>
          <button onClick={() => { setCurrentPage("about"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">আমার পরিচিতি</button>
          <button onClick={() => { setCurrentPage("services"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">সেবাসমূহ</button>
          <button onClick={() => { setCurrentPage("experience"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">অভিজ্ঞতা ও সার্টিফিকেট</button>
          <button onClick={() => { setCurrentPage("portfolio"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">কাজসমূহ</button>
          <button onClick={() => { setCurrentPage("contact"); scrollToTop(); }} className="text-gray-400 hover:text-white transition-all cursor-pointer">যোগাযোগ</button>
        </div>

        {/* Right social & back to top */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social icons */}
          <div className="flex gap-3">
            <a href={portfolioData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center text-sm transition-all hover:-translate-y-0.5">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center text-sm transition-all hover:-translate-y-0.5">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a href={portfolioData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent text-gray-400 hover:text-accent flex items-center justify-center text-sm transition-all hover:-translate-y-0.5">
              <i className="fa-brands fa-whatsapp" />
            </a>
            <a href={portfolioData.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 hover:border-red-500 text-gray-400 hover:text-red-500 flex items-center justify-center text-sm transition-all hover:-translate-y-0.5">
              <i className="fa-brands fa-youtube" />
            </a>
          </div>

          {/* Scroll top btn triggered */}
          <button
            id="back-to-top-footer"
            onClick={scrollToTop}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-dark-bg font-bold text-xs rounded-xl flex items-center gap-1 hover:opacity-95 active:scale-95 shadow transition-all cursor-pointer"
          >
            উপরে স্ক্রোল করুন
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
