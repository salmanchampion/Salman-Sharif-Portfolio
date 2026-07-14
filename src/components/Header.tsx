import React, { useState } from "react";
import { portfolioData } from "../data";
import { Menu, X, Plane, Mail, Phone, Palette, ChevronDown, Globe } from "lucide-react";
import { themes } from "../themes";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  currentTheme?: string;
  onChangeTheme?: (themeId: string) => void;
}

export default function Header({ currentPage, setCurrentPage, currentTheme, onChangeTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState("bn");

  React.useEffect(() => {
    // Read current language from Google Translate cookie
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match && match[1]) {
      const lang = match[1].split('/')[2];
      if (lang) {
        setCurrentLangCode(lang);
      }
    }
  }, []);

  const languages = [
    { code: "bn", name: "বাংলা", native: "বাংলা" },
    { code: "en", name: "English", native: "English" },
    { code: "ar", name: "Arabic", native: "العربية" },
    { code: "es", name: "Spanish", native: "Español" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "fr", name: "French", native: "Français" },
    { code: "ur", name: "Urdu", native: "اردو" }
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLangCode(langCode);
    setIsLangOpen(false);
    
    if (langCode === "bn") {
      // Clear Google Translate cookies to revert to original
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
      window.location.reload();
      return;
    }

    // Trigger Google Translate hidden select
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  const handleCycleTheme = () => {
    if (!onChangeTheme) return;
    const currentIndex = themes.findIndex((t) => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    onChangeTheme(themes[nextIndex].id);
  };

  const navItems = [
    { id: "home", label: "নীড় (Home)" },
    { id: "about", label: "আমার সম্পর্কে (About Me)" },
    { id: "services", label: "সেবাসমূহ (Services)" },
    { id: "experience", label: "অভিজ্ঞতা ও সার্টিফিকেট (Experience)" },
    { id: "portfolio", label: "পোর্টফোলিও (Projects)" },
    { id: "blog", label: "ট্রাভেল ডায়েরি (Blog)" },
    { id: "contact", label: "যোগাযোগ (Contact)" },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    
    // Smooth scroll to top of window when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header id="app-header" className="fixed top-0 left-0 w-full z-50 glass-nav">
      {/* Top mini-bar for instant contacts */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary-grad/20 text-xs py-2 px-4 shadow-inner hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <a href={`tel:${portfolioData.phone}`}>{portfolioData.phone}</a>
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-gray-400 font-medium">ভ্রমণ সল্যুশনের জন্য উপলব্ধ</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div id="website-logo" className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick("home")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary-grad flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Plane className="w-5 h-5 rotate-[45deg] animate-pulse" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-primary bg-clip-text text-transparent">
              {portfolioData.name}
            </span>
            <p className="text-[10px] text-gray-400 tracking-wider font-light uppercase hidden sm:block">
              {portfolioData.institution}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.filter(item => item.id !== "contact").map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative capitalize ${
                currentPage === item.id
                  ? "text-primary bg-primary/10 shadow-sm shadow-primary/5"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span id={`active-indicator-${item.id}`} className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-secondary-grad rounded-full" />
              )}
            </button>
          ))}
          
          {/* Theme Selector Dropdown */}
          <div className="relative ml-2 mr-1">
            <button
              id="theme-dropdown-btn"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all border border-white/5 cursor-pointer text-xs font-semibold uppercase tracking-wider"
              title="থিম পরিবর্তন করুন"
            >
              <Palette className="w-3.5 h-3.5 text-primary" />
              <span className="hidden xl:inline">{activeTheme.icon} {activeTheme.name}</span>
              <span className="xl:hidden">{activeTheme.icon} থিম</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isThemeOpen ? "rotate-180" : ""}`} />
            </button>

            {isThemeOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsThemeOpen(false)} />
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0b0f19] border border-white/10 p-2.5 shadow-2xl backdrop-blur-2xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3.5 py-2 text-[10px] uppercase font-extrabold text-gray-400 tracking-widest border-b border-white/5">
                    ৬টি আকর্ষণীয় থিম নির্বাচন করুন
                  </div>
                  {themes.map((theme) => {
                    const isSelected = theme.id === currentTheme;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          onChangeTheme?.(theme.id);
                          setIsThemeOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                          isSelected 
                            ? "bg-primary/10 text-primary font-bold" 
                            : "hover:bg-white/5 text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{theme.icon}</span>
                          <div>
                            <div className="text-xs font-semibold">{theme.name}</div>
                            <div className="text-[10px] text-gray-400 font-light flex items-center gap-1.5 mt-0.5">
                              {/* Tiny Color Dots Preview */}
                              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondaryGrad }} />
                              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                              <span className="text-[9px] text-gray-500">কালার স্কিম</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          
          {/* Language Selector Dropdown */}
          <div className="relative mr-1">
            <button
              id="lang-dropdown-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all border border-white/5 cursor-pointer text-xs font-semibold uppercase tracking-wider"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-secondary-grad" />
              <span className="hidden xl:inline">{languages.find(l => l.code === currentLangCode)?.name || "Language"}</span>
              <span className="xl:hidden">{languages.find(l => l.code === currentLangCode)?.code.toUpperCase()}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0b0f19] border border-white/10 p-2.5 shadow-2xl backdrop-blur-2xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3.5 py-2 text-[10px] uppercase font-extrabold text-gray-400 tracking-widest border-b border-white/5">
                    Select Language
                  </div>
                  {languages.map((lang) => {
                    const isSelected = lang.code === currentLangCode;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                          isSelected 
                            ? "bg-secondary-grad/10 text-secondary-grad font-bold" 
                            : "hover:bg-white/5 text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div>
                            <div className="text-xs font-semibold">{lang.name}</div>
                            <div className="text-[10px] text-gray-400 font-light">{lang.native}</div>
                          </div>
                        </div>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-secondary-grad" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          
          <button
            id="nav-cta-contact"
            onClick={() => handleNavClick("contact")}
            className="ml-2 px-4.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-primary to-secondary-grad text-white hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            যোগাযোগ করুন
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-theme-cycle-btn"
            onClick={handleCycleTheme}
            className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-primary hover:text-white transition-colors cursor-pointer"
            title="থিম পরিবর্তন"
          >
            <Palette className="w-5 h-5" />
          </button>
          
          <button
            id="nav-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-nav-panel" className="lg:hidden absolute top-full left-0 w-full bg-[#0b0f19]/95 border-b border-white/5 shadow-2xl backdrop-blur-2xl transition-all duration-300 animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-3 px-4 rounded-xl text-left text-base font-medium transition-colors flex items-center justify-between ${
                    currentPage === item.id
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && <span id={`mobile-active-${item.id}`} className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
            
            {/* Mobile Drawer Theme Selector Grid */}
            <div className="py-4 border-t border-b border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 px-1 text-xs text-gray-300 font-semibold">
                <Palette className="w-4 h-4 text-primary" />
                <span>ওয়েবসাইটের থিম পরিবর্তন করুন</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const isSelected = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onChangeTheme?.(theme.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl transition-all text-xs border text-left cursor-pointer ${
                        isSelected 
                          ? "bg-primary/10 border-primary text-primary font-bold shadow-md" 
                          : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-sm shrink-0">{theme.icon}</span>
                      <div className="truncate">
                        <div className="font-semibold truncate">{theme.name}</div>
                        <div className="flex gap-1 mt-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.secondaryGrad }} />
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile Drawer Language Selector Grid */}
            <div className="py-2 border-b border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 px-1 text-xs text-gray-300 font-semibold">
                <Globe className="w-4 h-4 text-secondary-grad" />
                <span>Change Language / ভাষা পরিবর্তন</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => {
                  const isSelected = lang.code === currentLangCode;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex flex-col items-start gap-0.5 p-3 rounded-xl transition-all text-xs border text-left cursor-pointer ${
                        isSelected 
                          ? "bg-secondary-grad/10 border-secondary-grad text-secondary-grad font-bold shadow-md" 
                          : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <div className="font-semibold truncate w-full">{lang.name}</div>
                      <div className="text-[10px] opacity-70">{lang.native}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex justify-around text-center text-xs text-gray-400 py-1">
                <span>{portfolioData.phone}</span>
                <span>•</span>
                <span>{portfolioData.email}</span>
              </div>
              <button
                id="mobile-nav-cta"
                onClick={() => handleNavClick("contact")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary-grad text-white font-semibold text-center text-sm shadow-lg shadow-primary/15"
              >
                ফ্রি কনসালটেশন নিন
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
