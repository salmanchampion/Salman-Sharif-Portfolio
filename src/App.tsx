import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { BackgroundAnimation } from "./components/BackgroundAnimation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CVModal from "./components/CVModal";
import GDSConsole from "./components/GDSConsole";
import TravelFAQ from "./components/TravelFAQ";
import QuickQuoteForm from "./components/QuickQuoteForm";
import AirlinesPartners from "./components/AirlinesPartners";
import ModernAdminPanel from "./components/ModernAdminPanel";
import SecurityKeypad from "./components/SecurityKeypad";
import BudgetCalculator from "./components/BudgetCalculator";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import TravelBlog from "./components/TravelBlog";
import { Achievements } from "./components/Achievements";
import { portfolioData } from "./data";
import { Compass, ShieldCheck, Plane, Award, Sparkles, Flame, CheckCircle, ArrowRight } from "lucide-react";
import { getActiveThemeId, applyTheme } from "./themes";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>(() => getActiveThemeId());
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme dynamically on theme change
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Fetch portfolio data from database
  useEffect(() => {
    fetch("/api/portfolio-data")
      .then(r => r.json())
      .then(res => {
        if (res.data) {
           // We'll update the object reference dynamically
           Object.keys(res.data).forEach((key) => {
             (portfolioData as any)[key] = (res.data as any)[key];
           });
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch data:", e);
        setIsLoading(false);
      });
  }, []);

  // Monitor keyboard key sequences sequentially to unlock when *045# is entered
  useEffect(() => {
    let typedSequence = "";
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key.length === 1) {
        typedSequence += key;
        if (typedSequence.length > 5) {
          typedSequence = typedSequence.substring(typedSequence.length - 5);
        }
        if (typedSequence === "*045#") {
          setIsAdminOpen(true);
          typedSequence = ""; // reset
          
          // Play classic sound beep of unlocking a terminal system
          try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(659.25, context.currentTime); // E5
            osc.frequency.setValueAtTime(987.77, context.currentTime + 0.12); // B5
            gain.gain.setValueAtTime(0.08, context.currentTime);
            osc.connect(gain);
            gain.connect(context.destination);
            osc.start();
            osc.stop(context.currentTime + 0.3);
          } catch (_) {}
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Render Page Content based on current page state (Multi Page feeling)
  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="space-y-0 animate-fadeIn">
            <Hero setCurrentPage={setCurrentPage} onOpenCVModal={() => setIsCVModalOpen(true)} />
            
            <Statistics />
            
            {/* Quick Home Feature Panel */}
            <section className="py-20 px-4 bg-[#0a0e1a] relative overflow-hidden text-left border-b border-white/5">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>কেন আমার সেবা বেছে নেবেন?</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                    নিখুঁত টিকেটিং কনসালট্যান্সি ও আধুনিক ট্রাভেল সিস্টেম সার্ভিস
                  </h2>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    আমি শুধু বিমান টিকিট কাটার কাজ করি না, বরং Sabre বা Galileo-এর গভীর ডাটাবেজ অপ্টিমাইজেশন ব্যবহার করে গ্রাহকদের সর্বোচ্চ সুবিধা পৌঁছে দিই। প্রতিটি ওমরাহ এবং নিয়মিত ভিসা প্রসেসে আমরা শতভাগ সততা নিশ্চিত করি।
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-gray-300 font-light">
                        <strong className="text-white font-medium">ব্যয় সাশ্রয়ী এয়ারফেয়ার:</strong> কাস্টম রুট স্প্লিট এবং লো-কস্ট ক্যারিয়ার ইন্টিগ্রেশন।
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-gray-300 font-light">
                        <strong className="text-white font-medium">নিখুঁত ভিসা হ্যান্ডলিং:</strong> শেনজেন, যুক্তরাজ্য ও মার্কিন ভিসার সফল বায়োডাটা চেক।
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-gray-300 font-light">
                        <strong className="text-white font-medium">ট্রাভেল আইটি অটোমেশন:</strong> এজেন্সি সাইট ও সিআরএম ডেভলপমেন্ট সেবা।
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setCurrentPage("about")}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-dark-bg font-bold text-xs inline-flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer"
                    >
                      আমার বায়ো ও দক্ষতা দেখুন
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right highlight column - GDS Terminal Badge */}
                <div className="p-1 rounded-3xl bg-gradient-to-tr from-primary/20 via-accent/20 to-[#111625] border border-white/5 relative overflow-hidden group">
                  <div className="p-6 bg-[#111625]/90 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Plane className="w-5 h-5 text-primary rotate-[45deg]" />
                        <span className="text-xs text-white font-bold uppercase tracking-wider">Sabre/Galileo Authority BD</span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      "সালমান শরীফ দেশের কাস্টমারদের জন্য আন্তর্জাতিক ট্রাভেল সিস্টেম ব্যবহার করে বিমান কনফার্মেশন ও জটিল ফেয়ার শিট মেলাতে অভূতপূর্ব পেশাদারিত্ব দেখিয়েছেন।"
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/20 text-primary flex items-center justify-center font-bold text-xs">
                        CS
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">চ্যাম্পিয়ন ট্রাভেলস ম্যানেজমেন্ট</h4>
                        <p className="text-[10px] text-gray-500">ঢাকা অফিস সোর্সিং</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* LIVE GDS TERMINAL DEMO ROW */}
            <section className="py-20 px-4 bg-[#080b13] relative overflow-hidden border-b border-white/5">
              <div className="max-w-7xl mx-auto">
                <GDSConsole />
              </div>
            </section>

            {/* FLIGHT QUOTE REQUEST WIDGET & HAJJ-UMRAH SPOTLIGHT */}
            <section className="py-20 px-4 bg-[#0a0d18] relative overflow-hidden border-b border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                <div className="lg:col-span-7">
                  <QuickQuoteForm />
                </div>
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/20 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    হজ্জ ও ওমরাহ স্পেশালিস্ট গাইড
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    সম্মানিত হাজীদের জন্য ওয়ান-স্টপ ওমরাহ ও ভিসা প্যাকেজ
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস-এর অনুমোদিত এজেন্ট হিসেবে সালমান শরীফ সম্মানিত ওমরাহ পালনকারীদের জন্য সৌদি আরব ই-মিনিস্ট্রি পোর্টালের মাধ্যমে অতি দ্রুত বায়োমেট্রিক ও ই-ভিসা প্রসেস নিশ্চিত করে থাকেন।
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-md shrink-0">
                        🕌
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">মক্কা ও মদিনার কাস্টম হোটেল সোর্সিং</h4>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-normal">
                          কাবা শরীফ ও মসজিদে নববীর নিকটবর্তী ৩-তারকা থেকে ৫-তারকা মানের সুবিধাজনক হোটেল অত্যন্ত সাশ্রয়ী লাইভ মূল্যে বুকিং ব্যবস্থা।
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-md shrink-0">
                        📄
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">নিখুঁত ডকুমেন্টেশন ও সরাসরি ভিসা সাবমিশন</h4>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-normal">
                          কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি এজেন্সী আইডির আওতায় সৌদি পররাষ্ট্র মন্ত্রণালয়ের ‘মাকাতিল’ পোর্টাল থেকে ইমার্জেন্সি ওমরাহ ভিসা অনুমোদন।
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-md shrink-0">
                        🚌
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">জেদ্দা-মক্কা-মদিনা ইন্টার-সিটি ট্রান্সফার</h4>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-normal">
                          আধুনিক শীতাতপ নিয়ন্ত্রিত জিএমসি বা প্রাইভেট বাস বুকিং ব্যবস্থা জিয়ারত ও বিমানবন্দর যাতায়াত সহজ করতে নির্ভরযোগ্য সাপোর্ট।
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[10px] sm:text-xs text-amber-200/90 leading-relaxed italic">
                    * প্রিয় গ্রাহক, মক্কা ও মদিনায় মৌসুমের ভিত্তিতে হোটেল ভাড়া পরিবর্তিত হয়। রমজান বা জিলহজ্জ মাসের টিকিট ৫-৬ মাস পূর্বেই অগ্রিম বুক করার জোর সুপারিশ করা হলো।
                  </div>
                </div>
              </div>
            </section>

            {/* SMART BUDGET CALCULATOR & PLANNER SECTION */}
            <section className="py-20 px-4 bg-[#080b14] relative overflow-hidden border-b border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
              <div className="max-w-7xl mx-auto relative z-10">
                <BudgetCalculator />
              </div>
            </section>

            {/* AIRLINES PARTNERS CODE GRIDS/STRIPS */}
            <section className="py-20 px-4 bg-[#090c14] relative overflow-hidden border-b border-white/5">
              <div className="max-w-7xl mx-auto">
                <AirlinesPartners />
              </div>
            </section>

            {/* TRAVEL DIARY / BLOG PREVIEW SECTION */}
            <TravelBlog setCurrentPage={setCurrentPage} />

            {/* EXPERT WORKFLOW FAQs ACCORDION LIST */}
            <section className="py-20 px-4 bg-[#0c101d] relative overflow-hidden border-b border-white/5">
              <div className="max-w-7xl mx-auto">
                <TravelFAQ />
              </div>
            </section>

            <Testimonials />
          </div>
        );
      case "about":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <About />
            <Skills />
          </div>
        );
      case "services":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <Services />
          </div>
        );
      case "experience":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <Experience />
            <Achievements />
          </div>
        );
      case "portfolio":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <Projects />
          </div>
        );
      case "blog":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <TravelBlog setCurrentPage={setCurrentPage} />
          </div>
        );
      case "contact":
        return (
          <div className="space-y-0 animate-fadeIn pt-16">
            <Contact />
          </div>
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} onOpenCVModal={() => setIsCVModalOpen(true)} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b13] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 flex flex-col justify-between relative" id="app-container">
      <BackgroundAnimation />
      
      {/* Dynamic Header */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
      />

      {/* Dynamic Content Frame */}
      <main className="flex-1 w-full bg-[#0b0f19]">
        {renderPageContent()}
      </main>

      {/* Dynamic Footer */}
      <Footer setCurrentPage={setCurrentPage} onOpenKeypad={() => setIsKeypadOpen(true)} />

      {/* CV Modal PDF panel */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />

      {/* Admin Panel Data customizer */}
      <ModernAdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Secret Security keypad dialer for keyboardless/mobile entry */}
      <SecurityKeypad 
        isOpen={isKeypadOpen} 
        onClose={() => setIsKeypadOpen(false)} 
        onSuccess={() => setIsAdminOpen(true)} 
      />

      {/* Interactive Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
