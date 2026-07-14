import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import { portfolioData } from "../data";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Show the tooltip after 3 seconds for grabbing user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const messageText = "হ্যালো সালমান ভাই, আমি একটি ফ্লাইটের কোটেশন নিতে চাই।";
  const whatsappUrl = `${portfolioData.socialLinks.whatsapp}?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3.5 pointer-events-none">
      {/* Interactive Tooltip Chat Prompt */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            className="pointer-events-auto bg-[#131b31] border border-emerald-500/30 text-white rounded-2xl shadow-2xl p-4 max-w-[280px] sm:max-w-[320px] relative flex flex-col gap-2.5 backdrop-blur-md"
            style={{ boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.15)" }}
          >
            {/* Close Tooltip Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Profile Row */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={portfolioData.profileImage}
                  alt={portfolioData.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-emerald-500/40 object-cover bg-slate-900"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#131b31] rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-none">{portfolioData.name}</span>
                <span className="text-[9px] text-emerald-400 font-medium mt-0.5">অনলাইনে আছেন (Active)</span>
              </div>
            </div>

            {/* Message bubble */}
            <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 relative">
              {/* Little arrow */}
              <div className="absolute right-4 -top-1.5 w-3 h-3 bg-slate-900/60 border-t border-l border-white/5 rotate-45" />
              <p className="text-xs font-light text-gray-200 leading-relaxed">
                {messageText}
              </p>
            </div>

            {/* Quick Action button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowTooltip(false)}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-[#070b13] font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
            >
              <Send className="w-3 h-3 stroke-[2.5]" />
              মেসেজ পাঠান (WhatsApp)
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Action Button (FAB) */}
      <motion.a
        id="whatsapp-floating-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 text-[#070b13] flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] cursor-pointer select-none"
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        title="সালমান ভাইয়ের সাথে হোয়াটসঅ্যাপে চ্যাট করুন"
      >
        {/* Pulsing ring background wave */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" style={{ animationDuration: "2s" }} />
        
        {/* WhatsApp FontAwesome Icon */}
        <i className="fa-brands fa-whatsapp text-2xl md:text-3xl relative z-10 text-[#070b13]" />

        {/* Notification indicator */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-emerald-500 flex items-center justify-center">
          <span className="w-1 h-1 bg-white rounded-full animate-ping" />
        </span>
      </motion.a>
    </div>
  );
}
