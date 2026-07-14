import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Save, RotateCcw, Plus, Trash2, Key, Sparkles, User, Globe, 
  Briefcase, Award, Smile, ChevronRight, CheckCircle, 
  Phone, Mail, MapPin, Code, MessageSquare, Flame, BarChart2, 
  ShieldAlert, Eye, Settings, HelpCircle, FileText, Check, AlertCircle,
  TrendingUp, Wifi, Zap
} from "lucide-react";
import { portfolioData, updatePortfolioData } from "../data";
import { PortfolioData, Service, Project, Experience, Certification, Testimonial, Statistic, BlogPost } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "overview" | "profile" | "services" | "projects" | "experiences" | "testimonials" | "blogs" | "integration";

export default function ModernAdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  // Clone current data state for editing
  const [editedData, setEditedData] = useState<PortfolioData>(() => {
    return JSON.parse(JSON.stringify(portfolioData));
  });

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [rawSubtitles, setRawSubtitles] = useState<string>(() => editedData.subtitles.join("\n"));
  
  // Accordion open/close state tracker for lists to keep UI organized
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Field validation helper state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Extract preview item for current editing tab
  const activeServicePreview = useMemo(() => {
    if (expandedIndex !== null && editedData.services[expandedIndex]) {
      return editedData.services[expandedIndex];
    }
    return editedData.services[0] || null;
  }, [expandedIndex, editedData.services]);

  const activeProjectPreview = useMemo(() => {
    if (expandedIndex !== null && editedData.projects[expandedIndex]) {
      return editedData.projects[expandedIndex];
    }
    return editedData.projects[0] || null;
  }, [expandedIndex, editedData.projects]);

  // Popular fontawesome travel & aviation icons list for quick picking
  const popularIcons = [
    { class: "fa-solid fa-plane-departure", label: "বিমান উড্ডয়ন" },
    { class: "fa-solid fa-plane-arrival", label: "বিমান অবতরণ" },
    { class: "fa-solid fa-passport", label: "পাসপোর্ট" },
    { class: "fa-solid fa-map-location-dot", label: "ভ্রমণ ম্যাপ" },
    { class: "fa-solid fa-hotel", label: "হোটেল বুকিং" },
    { class: "fa-solid fa-briefcase", label: "বিজনেস ট্যুর" },
    { class: "fa-solid fa-graduation-cap", label: "সার্টিফিকেট" },
    { class: "fa-solid fa-shield-halved", label: "ভিসা সেফটি" },
    { class: "fa-solid fa-clock", label: "সময়সূচী" },
    { class: "fa-solid fa-percent", label: "ডিসকাউন্ট" },
    { class: "fa-solid fa-kaaba", label: "কাবা শরীফ" },
    { class: "fa-solid fa-ticket", label: "টিকিট" },
    { class: "fa-solid fa-phone", label: "হেল্পলাইন" },
    { class: "fa-solid fa-globe", label: "বিশ্বব্যাপী" }
  ];

  if (!isOpen) return null;

  // Real-time fields validation checks
  const validateFields = (data: PortfolioData): boolean => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "বাংলা নাম আবশ্যক";
    if (!data.englishName.trim()) errors.englishName = "ইংরেজি নাম আবশ্যক";
    if (!data.title.trim()) errors.title = "প্রফেশনাল টাইটেল আবশ্যক";
    if (!data.email.trim() || !data.email.includes("@")) errors.email = "সঠিক ইমেইল এড্রেস প্রদান করুন";
    if (!data.phone.trim()) errors.phone = "ফোন নম্বর আবশ্যক";
    
    // Check social URL formats
    if (data.socialLinks.facebook && !data.socialLinks.facebook.startsWith("http")) {
      errors.facebook = "সঠিক ফেসবুক লিংক (http/https সহ) দিন";
    }
    if (data.socialLinks.whatsapp && !data.socialLinks.whatsapp.startsWith("http") && !data.socialLinks.whatsapp.startsWith("https://wa.me/")) {
      errors.whatsapp = "হোয়াটসঅ্যাপ লিংকটি সঠিক নয় (উদা: https://wa.me/8801...)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field: keyof PortfolioData, value: any) => {
    setEditedData(prev => {
      const next = { ...prev, [field]: value };
      validateFields(next);
      return next;
    });
  };

  const handleSocialChange = (field: keyof PortfolioData["socialLinks"], value: string) => {
    setEditedData(prev => {
      const next = {
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [field]: value
        }
      };
      validateFields(next);
      return next;
    });
  };

  const handleSubtitlesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawSubtitles(val);
    const split = val.split("\n").map(s => s.trim()).filter(s => s !== "");
    setEditedData(prev => ({
      ...prev,
      subtitles: split
    }));
  };

  // --- Services Management ---
  const handleServiceChange = (idx: number, key: keyof Service, val: any) => {
    const updated = [...editedData.services];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, services: updated }));
  };

  const handleServiceFeatureChange = (sIdx: number, fIdx: number, val: string) => {
    const updated = [...editedData.services];
    const features = [...updated[sIdx].features];
    features[fIdx] = val;
    updated[sIdx] = { ...updated[sIdx], features };
    setEditedData(prev => ({ ...prev, services: updated }));
  };

  const addServiceFeature = (sIdx: number) => {
    const updated = [...editedData.services];
    const features = [...updated[sIdx].features, "নতুন বৈশিষ্ট্য পয়েন্ট"];
    updated[sIdx] = { ...updated[sIdx], features };
    setEditedData(prev => ({ ...prev, services: updated }));
  };

  const removeServiceFeature = (sIdx: number, fIdx: number) => {
    const updated = [...editedData.services];
    const features = updated[sIdx].features.filter((_, idx) => idx !== fIdx);
    updated[sIdx] = { ...updated[sIdx], features };
    setEditedData(prev => ({ ...prev, services: updated }));
  };

  const addService = () => {
    const newService: Service = {
      id: "service-" + Date.now(),
      title: "নতুন ট্রাভেল প্যাকেজ ও এজেন্সি সেবা",
      description: "সেবার চমৎকার আকর্ষণীয় সংক্ষিপ্ত বিবরণী এখানে লিখুন।",
      icon: "fa-solid fa-plane-departure",
      features: ["ভিআইপি হোটেল সুবিধা", "অভিজ্ঞ গাইড সাপোর্ট", "দ্রুত ভিসা প্রসেসিং নিশ্চয়তা"]
    };
    setEditedData(prev => ({ ...prev, services: [...prev.services, newService] }));
    setExpandedIndex(editedData.services.length);
  };

  const removeService = (idx: number) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই সেবাটি ডিলিট করতে চান?")) {
      const updated = editedData.services.filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, services: updated }));
      setExpandedIndex(null);
    }
  };

  // --- Projects Management ---
  const handleProjectChange = (idx: number, key: keyof Project, val: any) => {
    const updated = [...editedData.projects];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newProj: Project = {
      id: "project-" + Date.now(),
      title: "নতুন এভিয়েশন প্রজেক্ট",
      description: "কাজের সংক্ষিপ্ত রূপরেখা এখানে যোগ করুন।",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
      tags: ["Sabre GDS", "Amadeus API", "NextJS"],
      liveLink: "#",
      githubLink: "#",
      details: "বিস্তারিত কন্টেন্ট বা কাজের গভীরতা যা পপআপ মোডালে প্রদর্শিত হবে।"
    };
    setEditedData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
    setExpandedIndex(editedData.projects.length);
  };

  const removeProject = (idx: number) => {
    if (confirm("এই প্রজেক্টটি ডিলিট করতে চান?")) {
      const updated = editedData.projects.filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, projects: updated }));
      setExpandedIndex(null);
    }
  };

  // --- Experiences Management ---
  const handleExpChange = (idx: number, key: keyof Experience, val: any) => {
    const updated = [...editedData.experiences];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, experiences: updated }));
  };

  const handleExpBulletChange = (eIdx: number, bIdx: number, val: string) => {
    const updated = [...editedData.experiences];
    const bullets = [...updated[eIdx].bullets];
    bullets[bIdx] = val;
    updated[eIdx] = { ...updated[eIdx], bullets };
    setEditedData(prev => ({ ...prev, experiences: updated }));
  };

  const addExpBullet = (eIdx: number) => {
    const updated = [...editedData.experiences];
    const bullets = [...updated[eIdx].bullets, "নতুন অর্জন বা কাজের পয়েন্ট"];
    updated[eIdx] = { ...updated[eIdx], bullets };
    setEditedData(prev => ({ ...prev, experiences: updated }));
  };

  const removeExpBullet = (eIdx: number, bIdx: number) => {
    const updated = [...editedData.experiences];
    const bullets = updated[eIdx].bullets.filter((_, idx) => idx !== bIdx);
    updated[eIdx] = { ...updated[eIdx], bullets };
    setEditedData(prev => ({ ...prev, experiences: updated }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: "exp-" + Date.now(),
      company: "প্রতিষ্ঠানের নাম / এজেন্সী",
      role: "আপনার অর্পিত দায়িত্ব",
      duration: "২০২৪ - বর্তমান",
      description: "পদের দায়িত্বের সংক্ষিপ্ত সারসংক্ষেপ।",
      bullets: ["কার্যকরী কাজের বিবরণী ১"],
      icon: "fa-solid fa-briefcase"
    };
    setEditedData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
    setExpandedIndex(editedData.experiences.length);
  };

  const removeExperience = (idx: number) => {
    if (confirm("এই অভিজ্ঞতাটি মুছে ফেলতে চান?")) {
      const updated = editedData.experiences.filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, experiences: updated }));
      setExpandedIndex(null);
    }
  };

  // --- Certifications Management ---
  const handleCertChange = (idx: number, key: keyof Certification, val: any) => {
    const updated = [...editedData.certifications];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, certifications: updated }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: "cert-" + Date.now(),
      title: "Sabre/Galileo GDS Professional Training",
      issuer: "চ্যাম্পিয়ন ট্রাভেলস একাডেমী (Authorized GDS Provider)",
      year: "২০২৪",
      credentialUrl: "#",
      icon: "fa-solid fa-graduation-cap"
    };
    setEditedData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const removeCertification = (idx: number) => {
    if (confirm("এই সার্টিফিকেশনটি মুছে ফেলতে চান?")) {
      const updated = editedData.certifications.filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, certifications: updated }));
    }
  };

  // --- Testimonials & Stats Management ---
  const handleTestimonialChange = (idx: number, key: keyof Testimonial, val: any) => {
    const updated = [...editedData.testimonials];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, testimonials: updated }));
  };

  const addTestimonial = () => {
    const newTest: Testimonial = {
      id: "test-" + Date.now(),
      name: "নতুন ক্লায়েন্টের নাম",
      role: "ব্যবস্থাপক / প্রোপরাইটার",
      company: "আল্ট্রা ট্রেডার্স বাংলাদেশ",
      text: "সালমান ভাই আমাদের সব সময়েই সবচেয়ে বেস্ট এয়ার টিকেটিং রেট এবং সার্ভিস দেন। ওমরাহ প্রসেসিং ও ছিল অসাধারণ!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5
    };
    setEditedData(prev => ({ ...prev, testimonials: [...prev.testimonials, newTest] }));
    setExpandedIndex(editedData.testimonials.length);
  };

  const removeTestimonial = (idx: number) => {
    if (confirm("এই ক্লায়েন্ট রিভিউটি ডিলিট করতে চান?")) {
      const updated = editedData.testimonials.filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, testimonials: updated }));
      setExpandedIndex(null);
    }
  };

  const handleStatChange = (idx: number, key: keyof Statistic, val: any) => {
    const updated = [...editedData.statistics];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, statistics: updated }));
  };

  // --- Blogs Management ---
  const handleBlogChange = (idx: number, key: keyof BlogPost, val: any) => {
    const updated = [...editedData.blogs];
    updated[idx] = { ...updated[idx], [key]: val };
    setEditedData(prev => ({ ...prev, blogs: updated }));
  };

  const handleBlogTagsChange = (idx: number, val: string) => {
    const updated = [...editedData.blogs];
    updated[idx] = { ...updated[idx], tags: val.split(",").map(t => t.trim()).filter(t => t !== "") };
    setEditedData(prev => ({ ...prev, blogs: updated }));
  };

  const handleBlogCategoryChange = (idx: number, catId: string) => {
    const updated = [...editedData.blogs];
    let label = "অন্যান্য";
    if (catId === "visa") label = "ভিসা প্রসেসিং";
    else if (catId === "tickets") label = "ফ্লাইট টিকিট হ্যাকস";
    else if (catId === "tips") label = "ভ্রমণ গাইড ও টিপস";
    else if (catId === "hajj") label = "হজ্জ ও ওমরাহ";
    
    updated[idx] = { 
      ...updated[idx], 
      category: catId,
      categoryLabel: label
    };
    setEditedData(prev => ({ ...prev, blogs: updated }));
  };

  const addBlog = () => {
    const newBlog: BlogPost = {
      id: "blog-" + Date.now(),
      title: "নতুন ট্রাভেল ব্লগ বা টিপস",
      excerpt: "ব্লগটির একটি চমৎকার আকর্ষণীয় সংক্ষিপ্ত বিবরণী এখানে লিখুন।",
      category: "tips",
      categoryLabel: "ভ্রমণ গাইড ও টিপস",
      readTime: "৫ মিনিট",
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: "সালমান শরীফ",
      tags: ["ভ্রমণ", "টিপস"],
      imagePrompt: "travel_lifestyle_passport",
      content: "আপনার ব্লগের সম্পূর্ণ মূল কনটেন্টটি এখানে টাইপ করুন..."
    };
    setEditedData(prev => ({ ...prev, blogs: [...(editedData.blogs || []), newBlog] }));
  };

  const removeBlog = (idx: number) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই ব্লগটি ডিলিট করতে চান?")) {
      const updated = (editedData.blogs || []).filter((_, i) => i !== idx);
      setEditedData(prev => ({ ...prev, blogs: updated }));
    }
  };

  // --- Master Save Action ---
  const handleSaveAll = () => {
    if (!validateFields(editedData)) {
      alert("ফরমের কিছু প্রয়োজনীয় ক্ষেত্রে ভুল তথ্য আছে। দয়া করে লাল মার্ক করা সেকশন চেক করুন!");
      return;
    }

    updatePortfolioData(editedData);
    setSaveSuccess(true);
    
    // Premium dual-tone chord audio feedback on success
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playTone = (freq: number, delay: number, dur: number) => {
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, context.currentTime + delay);
        gain.gain.setValueAtTime(0.08, context.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + delay + dur);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(context.currentTime + delay);
        osc.stop(context.currentTime + delay + dur);
      };

      playTone(523.25, 0, 0.25); // C5
      playTone(659.25, 0.1, 0.25); // E5
      playTone(783.99, 0.2, 0.4); // G5
      playTone(1046.50, 0.3, 0.5); // C6
    } catch (e) {}

    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
      window.location.reload();
    }, 1200);
  };

  // --- Reset to Default Site Configurations ---
  const handleResetToDefault = () => {
    if (confirm("আপনি কি নিশ্চিতভাবে ওয়েবসাইট ডেটা রিসেট করে সালমান শরীফের আসল প্রোফাইল ডেটা ফেরত আনতে চান? আপনার কাস্টমাইজ তথ্যগুলো মুছে যাবে!")) {
      localStorage.removeItem("salman_portfolio_data");
      
      // Sad descending synth feedback on reset
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, context.currentTime); // D5
        osc.frequency.setValueAtTime(440, context.currentTime + 0.15); // A4
        osc.frequency.setValueAtTime(293.66, context.currentTime + 0.3); // D4
        gain.gain.setValueAtTime(0.08, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + 0.5);
      } catch (e) {}

      window.location.reload();
    }
  };

  const isGoogleSheetConnected = !!editedData.googleScriptURL?.trim();
  const isTelegramConnected = !!(editedData.telegramBotToken?.trim() && editedData.telegramChatId?.trim());

  const handleAccordionToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div id="modern-admin-panel-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn text-left">
      <div className="rounded-3xl bg-[#030712] border border-white/10 w-full max-w-6xl h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
        
        {/* Glow light accents */}
        <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-cyan-500 via-primary to-accent blur-xl opacity-80" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* HEADER SECTION */}
        <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 bg-[#060a16]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black tracking-widest mb-1.5 uppercase">
              <Key className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>DASHBOARD SYSTEM V3.5</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none flex items-center gap-2">
              সালমান শরীফ ডাটাবেজ কন্ট্রোল সেন্টার
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1.5">
              ডাইনামিকালি ওয়েবসাইটের কনটেন্ট, কন্টাক্ট প্যারামিটার ও ইন্টিগ্রেশন সেটিং পরিবর্তন করুন।
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={handleResetToDefault}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title="ডিফল্ট ফ্যাক্টরি সেটিংসে রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফ্যাক্টরি রিসেট</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTAINER BODY ROW (TABS SIDEBAR + CONTENT FRAME) */}
        <div className="flex-1 flex flex-row overflow-hidden min-h-0">
          
          {/* TABS SIDEBAR (Responsive: icon-only on mobile, full text on sm+) */}
          <div className="w-16 sm:w-64 bg-[#02050c] border-r border-white/5 p-2 sm:p-4 flex flex-col gap-2 overflow-y-auto shrink-0 pt-6 scrollbar-none">
            
            {/* Group 1: ড্যাশবোর্ড ও প্রোফাইল */}
            <div className="text-[9px] uppercase font-bold tracking-widest text-cyan-500/80 px-2 mt-2 mb-1 hidden sm:block">
              📊 স্ট্যাটস ও প্রোফাইল
            </div>

            <button
              onClick={() => { setActiveTab("overview"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "overview" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="ড্যাশবোর্ড ওভারভিউ"
            >
              <BarChart2 className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">১. ড্যাশবোর্ড ওভারভিউ</span>
            </button>

            <button
              onClick={() => { setActiveTab("profile"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "profile" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="বেসিক প্রোফাইল ও সোশ্যাল"
            >
              <User className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">২. প্রোফাইল ও সোশ্যাল</span>
            </button>

            {/* Group 2: কন্টেন্ট এডিটর (নতুন) */}
            <div className="text-[9px] uppercase font-bold tracking-widest text-amber-500 px-2 mt-4 mb-1 hidden sm:block">
              ✍️ কন্টেন্ট পাবলিশিং
            </div>

            <button
              onClick={() => { setActiveTab("blogs"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-between gap-3 cursor-pointer border ${
                activeTab === "blogs" 
                  ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white font-extrabold shadow-lg shadow-amber-500/20 border-amber-400 border-l-4" 
                  : "text-amber-400/90 border-amber-500/20 bg-amber-500/[0.02] hover:text-white hover:bg-amber-500/10"
              }`}
              title="ভ্রমণ ব্লগ ও টিপস"
            >
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <FileText className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline font-extrabold">৩. ভ্রমণ ব্লগ ও টিপস</span>
              </div>
              <span className="hidden sm:inline px-1.5 py-0.5 text-[8px] font-black tracking-wider uppercase bg-amber-400 text-black rounded animate-pulse shrink-0">
                NEW
              </span>
            </button>

            {/* Group 3: এজেন্সি সার্ভিসসমূহ */}
            <div className="text-[9px] uppercase font-bold tracking-widest text-cyan-500/80 px-2 mt-4 mb-1 hidden sm:block">
              💼 বিজনেস ও সার্ভিসেস
            </div>

            <button
              onClick={() => { setActiveTab("services"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "services" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="এজেন্সি সেবাসমূহ"
            >
              <Briefcase className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">৪. এজেন্সি সেবাসমূহ</span>
            </button>

            <button
              onClick={() => { setActiveTab("projects"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "projects" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="বিবিধ প্রজেক্টস"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">৫. বিবিধ প্রজেক্টস</span>
            </button>

            {/* Group 4: অর্জন ও রিভিউ */}
            <div className="text-[9px] uppercase font-bold tracking-widest text-cyan-500/80 px-2 mt-4 mb-1 hidden sm:block">
              🏅 অর্জন ও বিশ্বাসযোগ্যতা
            </div>

            <button
              onClick={() => { setActiveTab("experiences"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "experiences" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="অভিজ্ঞতা ও অর্জন"
            >
              <Award className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">৬. অভিজ্ঞতা ও অর্জন</span>
            </button>

            <button
              onClick={() => { setActiveTab("testimonials"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "testimonials" ? "bg-gradient-to-r from-cyan-600 to-primary text-white font-extrabold shadow-lg shadow-cyan-500/10 border-l-4 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="রিভিউ ও স্ট্যাটস"
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="hidden sm:inline">৭. রিভিউ ও স্ট্যাটস</span>
            </button>

            {/* Group 5: অ্যাডভান্সড সেটিংস */}
            <div className="text-[9px] uppercase font-bold tracking-widest text-emerald-500/80 px-2 mt-4 mb-1 hidden sm:block">
              ⚙️ সেটিংস ও ইন্টিগ্রেশন
            </div>

            <button
              onClick={() => { setActiveTab("integration"); setExpandedIndex(0); }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left flex items-center justify-center sm:justify-start gap-3 cursor-pointer ${
                activeTab === "integration" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 border-l-4 border-emerald-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title="এপিআই ও গুগল শিট ইন্টিগ্রেশন"
            >
              <Code className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="hidden sm:inline font-extrabold text-emerald-400">৮. এপিআই ও গুগল শিট</span>
            </button>
          </div>

          {/* ACTIVE TAB CONTENT CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-[#040813] to-[#010307]">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-cyan-400 font-sans">
                    <BarChart2 className="w-5 h-5" />
                    পোর্টফোলিও ড্যাশবোর্ড ওভারভিউ ও স্ট্যাটাস
                  </h4>
                </div>

                {/* Dashboard grid metrics cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-24 hover:border-cyan-500/20 transition-all">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">টোটাল সেবাসমূহ</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{editedData.services.length}টি</span>
                      <span className="text-[10px] text-cyan-400">Active</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-24 hover:border-primary/20 transition-all">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">মোট প্রজেক্টস</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{editedData.projects.length}টি</span>
                      <span className="text-[10px] text-primary">Showcased</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-24 hover:border-emerald-500/20 transition-all">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">কর্ম অভিজ্ঞতা</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{editedData.experiences.length}টি</span>
                      <span className="text-[10px] text-emerald-400">Timeline</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-24 hover:border-amber-500/20 transition-all">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">মোট ক্লায়েন্ট রিভিউ</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{editedData.testimonials.length}টি</span>
                      <span className="text-[10px] text-amber-400">Verified</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-24 hover:border-sky-500/20 transition-all col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">মোট ভ্রমণ ব্লগ</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{(editedData.blogs || []).length}টি</span>
                      <span className="text-[10px] text-sky-400">Published</span>
                    </div>
                  </div>
                </div>

                {/* Integration Health Matrix */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-[#040814]/40 to-transparent border border-cyan-500/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-cyan-400" />
                    <h5 className="text-xs sm:text-sm font-bold text-white">বাহ্যিক ইন্টিগ্রেশন কানেকশন স্ট্যাটাস</h5>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#010307]/80 border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${isGoogleSheetConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">গুগল শিট লিড সিঙ্ক</span>
                          <span className="text-[10px] text-gray-400 font-light">Contact & Quote Forms Sync</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase ${isGoogleSheetConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {isGoogleSheetConnected ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Offline)"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#010307]/80 border border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${isTelegramConnected ? 'bg-[#10b981] animate-pulse' : 'bg-amber-500'}`} />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">টেলিগ্রাম নোটিফিকেশন বট</span>
                          <span className="text-[10px] text-gray-400 font-light">Instant Admin Alerts</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase ${isTelegramConnected ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-amber-500/10 text-amber-400'}`}>
                        {isTelegramConnected ? "সংযুক্ত (Connected)" : "কনফিগারড নয়"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expert quick tutorial card */}
                <div className="p-5 rounded-2xl bg-[#010307]/60 border border-white/5 flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white">ড্যাশবোর্ড দ্রুত এডিটিং গাইডলাইন</span>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      বামের মেন্যু থেকে যেকোনো ট্যাব নির্বাচন করুন। প্রতিটি সেকশনে প্রফেশনাল ডাটা ইনপুট ফর্ম পাবেন। জটিল ইনফরমেশন যেমন সেবা বা অভিজ্ঞতার আইকন সহজে নির্বাচন করতে আইকন পিকার ব্যবহার করুন। কাস্টমাইজেশন শেষ হলে নিচের <strong>&quot;কনফিগারেশন আপডেট করুন&quot;</strong> বাটনে ক্লিক করুন।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE & SOCIALS TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans">
                    <User className="w-4 h-4" />
                    👤 বেসিক প্রোফাইল ও যোগাযোগের তথ্য
                  </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Form fields */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">ক্লিয়ার বাংলা নাম *</label>
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400/50 ${validationErrors.name ? 'border-rose-500' : 'border-white/10'}`}
                        />
                        {validationErrors.name && <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.name}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">English Name *</label>
                        <input
                          type="text"
                          value={editedData.englishName}
                          onChange={(e) => handleFieldChange("englishName", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400/50 ${validationErrors.englishName ? 'border-rose-500' : 'border-white/10'}`}
                        />
                        {validationErrors.englishName && <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.englishName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">প্রফেশনাল মনোহর টাইটেল *</label>
                        <input
                          type="text"
                          value={editedData.title}
                          onChange={(e) => handleFieldChange("title", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400/50 ${validationErrors.title ? 'border-rose-500' : 'border-white/10'}`}
                        />
                        {validationErrors.title && <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.title}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">মূল এজেন্সীর নাম / কর্মস্থল *</label>
                        <input
                          type="text"
                          value={editedData.institution}
                          onChange={(e) => handleFieldChange("institution", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">মোবাইল ফোন নম্বর *</label>
                        <input
                          type="text"
                          value={editedData.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400/50 ${validationErrors.phone ? 'border-rose-500' : 'border-white/10'}`}
                        />
                        {validationErrors.phone && <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.phone}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">ইমেইল ঠিকানা *</label>
                        <input
                          type="email"
                          value={editedData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400/50 ${validationErrors.email ? 'border-rose-500' : 'border-white/10'}`}
                        />
                        {validationErrors.email && <span className="text-[10px] text-rose-400 block mt-0.5">{validationErrors.email}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">অফিস অবস্থান / লোকেশন *</label>
                        <input
                          type="text"
                          value={editedData.location}
                          onChange={(e) => handleFieldChange("location", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">প্রোফাইল পিকচার URL *</label>
                        <input
                          type="text"
                          value={editedData.profileImage}
                          onChange={(e) => handleFieldChange("profileImage", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50 font-mono text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">ট্যাগলাইন সামারী (Hero Area) *</label>
                      <textarea
                        rows={2}
                        value={editedData.tagline}
                        onChange={(e) => handleFieldChange("tagline", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50 resize-none"
                      />
                    </div>

                    {/* Social links block */}
                    <div className="pt-4 border-t border-white/5 space-y-4">
                      <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">সামাজিক যোগাযোগের লিংকসমূহ</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-450 font-bold uppercase">Facebook Profile URL</label>
                          <input
                            type="text"
                            value={editedData.socialLinks.facebook}
                            onChange={(e) => handleSocialChange("facebook", e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-cyan-400 ${validationErrors.facebook ? 'border-rose-500' : 'border-white/5'}`}
                          />
                          {validationErrors.facebook && <span className="text-[9px] text-rose-400 block">{validationErrors.facebook}</span>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-450 font-bold uppercase">Direct WhatsApp API Link</label>
                          <input
                            type="text"
                            value={editedData.socialLinks.whatsapp}
                            onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border text-xs text-white focus:outline-none focus:border-emerald-500 font-mono ${validationErrors.whatsapp ? 'border-rose-500' : 'border-white/5'}`}
                          />
                          {validationErrors.whatsapp && <span className="text-[9px] text-rose-400 block">{validationErrors.whatsapp}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-450 font-bold uppercase">LinkedIn URL</label>
                          <input
                            type="text"
                            value={editedData.socialLinks.linkedin}
                            onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/5 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-450 font-bold uppercase">YouTube Channel URL</label>
                          <input
                            type="text"
                            value={editedData.socialLinks.youtube}
                            onChange={(e) => handleSocialChange("youtube", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/5 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">টাইপরাইটার সাব-টাইটেলসমূহ (প্রতি লাইনে একটি করে)</label>
                      <textarea
                        rows={3}
                        value={rawSubtitles}
                        onChange={handleSubtitlesChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-emerald-400 focus:outline-none focus:border-emerald-500/50 resize-none font-mono"
                        placeholder="এয়ার টিকেটিং এক্সপার্ট&#10;ভিসা প্রসেসিং কনসালট্যান্ট..."
                      />
                      <p className="text-[10px] text-gray-500">হোমপেজে সালমান শরীফের নামের নিচে এই চমৎকার পয়েন্টগুলো একের পর এক এনিমেটেড টেক্সট হিসেবে ঘুরবে।</p>
                    </div>
                  </div>

                  {/* Live Avatar & Info Card Preview */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">লাইভ প্রোফাইল প্রিভিউ</span>
                    
                    <div className="p-5 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 text-center space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500" />
                      
                      <div className="mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/30 p-1 bg-black">
                        <img 
                          src={editedData.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                          alt="avatar preview"
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-sm font-bold text-white tracking-tight">{editedData.name || "নাম লিখুন"}</h5>
                        <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">{editedData.englishName || "English Name"}</p>
                        <p className="text-xs text-gray-300 font-medium pt-1 px-4 line-clamp-1">{editedData.title || "টাইটেল"}</p>
                        <span className="text-[10px] text-gray-500 block">{editedData.institution || "এজেন্সীর নাম"}</span>
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-2 text-left text-[11px] text-gray-400">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{editedData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{editedData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{editedData.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans">
                    <Briefcase className="w-4 h-4" />
                    💼 এজেন্সী ও এয়ার টিকেটিং সেবাসমূহ কাস্টমাইজেশন
                  </h4>
                  <button
                    onClick={addService}
                    className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-black font-extrabold text-[10px] rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-cyan-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    নতুন সেবা যোগ করুন
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Interactive Accordion Forms */}
                  <div className="lg:col-span-7 space-y-3.5">
                    {editedData.services.map((service, sIdx) => {
                      const isExpanded = expandedIndex === sIdx;
                      return (
                        <div key={service.id} className="rounded-2xl border border-white/5 bg-[#010307]/50 overflow-hidden">
                          {/* Accordion Trigger Head */}
                          <div 
                            onClick={() => handleAccordionToggle(sIdx)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.01] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs">
                                <i className={service.icon || "fa-solid fa-plane-departure"} />
                              </span>
                              <div className="text-left">
                                <h5 className="text-xs font-bold text-white">{service.title || "নতুন সেবা"}</h5>
                                <span className="text-[10px] text-gray-500 font-light truncate max-w-[200px] block">{service.description || "সেবার বিবরণ নেই"}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); removeService(sIdx); }}
                                className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                title="ডিলিট"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90 text-cyan-400' : ''}`} />
                            </div>
                          </div>

                          {/* Accordion Content Panels */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/5 p-4 bg-[#02050c]/50 space-y-3 text-xs"
                              >
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">সেবার নাম (বড় আকর্ষণীয় টাইটেল) *</label>
                                  <input
                                    type="text"
                                    value={service.title}
                                    onChange={(e) => handleServiceChange(sIdx, "title", e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">সেবার সংক্ষিপ্ত ও চটকদার বিবরণ *</label>
                                  <textarea
                                    rows={3}
                                    value={service.description}
                                    onChange={(e) => handleServiceChange(sIdx, "description", e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
                                  />
                                </div>

                                {/* Custom FontAwesome Icon Quick Selector */}
                                <div className="space-y-2">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">আইকন নির্বাচন করুন (FontAwesome Class)</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={service.icon}
                                      onChange={(e) => handleServiceChange(sIdx, "icon", e.target.value)}
                                      className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                                    />
                                    <span className="px-3.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center text-xs">
                                      <i className={service.icon || "fa-solid fa-plane-departure"} />
                                    </span>
                                  </div>
                                  
                                  {/* Beautiful Visual grid selector */}
                                  <div className="grid grid-cols-7 gap-1.5 p-2 bg-black/40 rounded-xl border border-white/5 max-h-24 overflow-y-auto scrollbar-thin">
                                    {popularIcons.map((ico, idx) => (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleServiceChange(sIdx, "icon", ico.class)}
                                        className={`p-2 rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cyan-500/20 ${service.icon === ico.class ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/45' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                                        title={ico.label}
                                      >
                                        <i className={ico.class} />
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Service bullet features array */}
                                <div className="space-y-2 pt-2 border-t border-white/5">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] text-gray-500 font-bold block uppercase">সেবার বিশেষ আকর্ষণীয় ৩/৪টি পয়েন্ট *</label>
                                    <button
                                      onClick={() => addServiceFeature(sIdx)}
                                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                      পয়েন্ট যোগ করুন
                                    </button>
                                  </div>

                                  <div className="space-y-1.5">
                                    {service.features.map((feature, fIdx) => (
                                      <div key={fIdx} className="flex gap-2">
                                        <input
                                          type="text"
                                          value={feature}
                                          onChange={(e) => handleServiceFeatureChange(sIdx, fIdx, e.target.value)}
                                          className="flex-1 bg-black/50 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-cyan-400/40"
                                        />
                                        <button
                                          onClick={() => removeServiceFeature(sIdx, fIdx)}
                                          className="text-rose-500 hover:text-rose-400 p-1 px-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-all cursor-pointer"
                                          title="মুছে ফেলুন"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Live Web Render Preview of Selected Service */}
                  <div className="lg:col-span-5 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">লাইভ সার্ভিস কার্ড প্রিভিউ</span>
                    
                    {activeServicePreview ? (
                      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0c1224] to-[#040815] border border-cyan-500/20 space-y-4 shadow-xl relative overflow-hidden group">
                        {/* Glow corner */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
                        
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl border border-cyan-500/20 shadow-md">
                          <i className={activeServicePreview.icon || "fa-solid fa-plane-departure"} />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-base font-black text-white leading-tight tracking-tight">{activeServicePreview.title || "সেবার নাম"}</h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-light">{activeServicePreview.description || "সেবার বিবরণী এখানে প্রদর্শন হবে।"}</p>
                        </div>

                        <div className="pt-3 border-t border-white/5 space-y-2">
                          {activeServicePreview.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-300">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-3xl bg-[#010307]/40 border border-white/5 text-center text-gray-500 text-xs font-light">
                        প্রিভিউ দেখার জন্য সেবা যোগ করুন
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans">
                    <Sparkles className="w-4 h-4" />
                    ✈️ ট্রাভেল এভিয়েশন পোর্টফোলিও প্রজেক্ট সেটিংস
                  </h4>
                  <button
                    onClick={addProject}
                    className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-black font-extrabold text-[10px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    নতুন প্রজেক্ট যোগ করুন
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left list */}
                  <div className="lg:col-span-7 space-y-3.5">
                    {editedData.projects.map((project, pIdx) => {
                      const isExpanded = expandedIndex === pIdx;
                      return (
                        <div key={project.id} className="rounded-2xl border border-white/5 bg-[#010307]/50 overflow-hidden">
                          <div 
                            onClick={() => handleAccordionToggle(pIdx)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.01]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-8 rounded-md bg-black border border-white/10 overflow-hidden shrink-0">
                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-bold text-white">{project.title || "নতুন প্রজেক্ট"}</h5>
                                <span className="text-[10px] text-gray-500 font-light truncate max-w-[200px] block">{project.description}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); removeProject(pIdx); }}
                                className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90 text-cyan-400' : ''}`} />
                            </div>
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/5 p-4 bg-[#02050c]/50 space-y-3 text-xs"
                              >
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">প্রজেক্টের নাম *</label>
                                  <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(pIdx, "title", e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">সংক্ষিপ্ত বিবরণী *</label>
                                  <textarea
                                    rows={2}
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(pIdx, "description", e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 font-bold block uppercase">প্রজেক্ট ব্যানার Image URL *</label>
                                    <input
                                      type="text"
                                      value={project.image}
                                      onChange={(e) => handleProjectChange(pIdx, "image", e.target.value)}
                                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 font-bold block uppercase">GDS / সিস্টেম ট্যাগসমূহ (কমা দিয়ে লিখুন)</label>
                                    <input
                                      type="text"
                                      placeholder="Sabre GDS, Amadeus, API"
                                      value={project.tags.join(", ")}
                                      onChange={(e) => handleProjectChange(pIdx, "tags", e.target.value.split(",").map(t => t.trim()))}
                                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 font-bold block uppercase">Live Link / বুকিং ডেমো URL</label>
                                    <input
                                      type="text"
                                      value={project.liveLink || ""}
                                      onChange={(e) => handleProjectChange(pIdx, "liveLink", e.target.value)}
                                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 font-bold block uppercase">GitHub Link (প্রযোজ্য ক্ষেত্রে)</label>
                                    <input
                                      type="text"
                                      value={project.githubLink || ""}
                                      onChange={(e) => handleProjectChange(pIdx, "githubLink", e.target.value)}
                                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500 font-bold block uppercase">ডিটেইলস পপআপ কন্টেন্ট (Modal details popup) *</label>
                                  <textarea
                                    rows={3}
                                    value={project.details || ""}
                                    onChange={(e) => handleProjectChange(pIdx, "details", e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Preview */}
                  <div className="lg:col-span-5 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">লাইভ প্রজেক্ট প্রিভিউ</span>
                    
                    {activeProjectPreview ? (
                      <div className="rounded-3xl bg-gradient-to-b from-[#0c1224] to-[#040815] border border-cyan-500/20 overflow-hidden shadow-xl relative group">
                        <div className="h-44 bg-black relative">
                          <img 
                            src={activeProjectPreview.image} 
                            alt="" 
                            className="w-full h-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#040815] via-transparent to-black/50" />
                        </div>

                        <div className="p-5 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {activeProjectPreview.tags.map((tag, idx) => (
                              <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase font-bold tracking-wider">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h4 className="text-base font-black text-white">{activeProjectPreview.title}</h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-light">{activeProjectPreview.description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-3xl bg-[#010307]/40 border border-white/5 text-center text-gray-500 text-xs font-light">
                        প্রজেক্ট যোগ করে লাইভ প্রিভিউ দেখুন
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCES & CERTIFICATIONS TAB */}
            {activeTab === "experiences" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Experiences block */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans border-b border-white/5 pb-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      👔 সালমান শরীফের ক্যারিয়ার ও এভিয়েশন অভিজ্ঞতা
                    </h4>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold text-[10px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3" />
                      অভিজ্ঞতা যোগ করুন
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editedData.experiences.map((exp, idx) => (
                      <div key={exp.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/10 relative space-y-3">
                        <button
                          onClick={() => removeExperience(idx)}
                          className="absolute top-4 right-4 text-rose-500 hover:text-rose-450 p-1.5 bg-rose-500/10 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">কোম্পানি / এজেন্সীর নাম *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExpChange(idx, "company", e.target.value)}
                              className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-white font-semibold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">আপনার অর্পিত দায়িত্ব / পদের নাম *</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleExpChange(idx, "role", e.target.value)}
                              className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">কাজের সময়কাল (Duration) *</label>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) => handleExpChange(idx, "duration", e.target.value)}
                              className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500 uppercase font-black block">মূল দায়িত্বের সংক্ষিপ্ত রূপরেখা</label>
                          <input
                            type="text"
                            value={exp.description}
                            onChange={(e) => handleExpChange(idx, "description", e.target.value)}
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-white text-xs"
                          />
                        </div>

                        {/* Experience bullet points duties */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] text-gray-500 uppercase font-black">অর্জিত অর্জন ও কাজের পয়েন্টসমূহ</label>
                            <button
                              onClick={() => addExpBullet(idx)}
                              className="text-[9px] text-cyan-400 hover:text-cyan-300 font-extrabold flex items-center gap-0.5 cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                              পয়েন্ট দিন
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => handleExpBulletChange(idx, bIdx, e.target.value)}
                                  className="flex-1 bg-black/50 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-gray-300"
                                />
                                <button
                                  onClick={() => removeExpBullet(idx, bIdx)}
                                  className="text-rose-500 hover:text-rose-450 p-1 px-2 hover:bg-rose-500/10 rounded-lg"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Certifications Section */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans">
                      🎓 প্রফেশনাল GDS এভিয়েশন সার্টিফিকেশন
                    </h4>
                    <button
                      onClick={addCertification}
                      className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-400 border border-cyan-500/30 font-extrabold text-[10px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      সার্টিফিকেট যোগ করুন
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {editedData.certifications.map((cert, cIdx) => (
                      <div key={cert.id} className="p-4 rounded-2xl bg-[#010307]/60 border border-white/10 space-y-2 relative">
                        <button
                          onClick={() => removeCertification(cIdx)}
                          className="absolute top-3 right-3 text-rose-500 hover:text-rose-400 p-1 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500 uppercase font-black">সার্টিফিকেশন বা কোর্সের নাম *</label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => handleCertChange(cIdx, "title", e.target.value)}
                            className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">প্রদানকারী সংস্থা *</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => handleCertChange(cIdx, "issuer", e.target.value)}
                              className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">অর্জনের বছর *</label>
                            <input
                              type="text"
                              value={cert.year}
                              onChange={(e) => handleCertChange(cIdx, "year", e.target.value)}
                              className="w-full bg-black/60 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TESTIMONIALS & STATS TAB */}
            {activeTab === "testimonials" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Dynamic live statistics */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans border-b border-white/5 pb-2">
                    <Flame className="w-4 h-4" />
                    🔥 ডাইনামিক লাইভ ইনফোগ্রাফিক্স এবং কাজের পরিসংখ্যান
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {editedData.statistics.map((stat, idx) => (
                      <div key={stat.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                        <label className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wide">{stat.label}</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={stat.value}
                            onChange={(e) => handleStatChange(idx, "value", parseInt(e.target.value) || 0)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#010307] border border-white/10 text-xs text-white font-mono"
                          />
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={(e) => handleStatChange(idx, "suffix", e.target.value)}
                            className="w-16 px-1.5 py-1.5 rounded-lg bg-[#010307] border border-white/10 text-xs text-white text-center font-bold"
                            placeholder="+"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clients testimonials review feedback */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-cyan-400 font-sans">
                      💬 ক্লায়েন্টদের প্রশংসাপত্র ও রিভিউ ফিডব্যাক
                    </h4>
                    <button
                      onClick={addTestimonial}
                      className="px-3 py-1 bg-cyan-500/25 hover:bg-cyan-500/35 text-cyan-300 font-extrabold text-[10px] rounded-xl transition-all border border-cyan-500/20 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3" />
                      রিভিউ যোগ করুন
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editedData.testimonials.map((test, tIdx) => (
                      <div key={test.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/10 relative space-y-3">
                        <button
                          onClick={() => removeTestimonial(tIdx)}
                          className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">ক্লায়েন্ট নাম *</label>
                            <input
                              type="text"
                              value={test.name}
                              onChange={(e) => handleTestimonialChange(tIdx, "name", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-2.5 py-1.5 rounded-lg text-white mt-0.5"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">পদবি (Role) *</label>
                            <input
                              type="text"
                              value={test.role}
                              onChange={(e) => handleTestimonialChange(tIdx, "role", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-2.5 py-1.5 rounded-lg text-white mt-0.5"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-500 uppercase font-black">কোম্পানি / এজেন্সী *</label>
                            <input
                              type="text"
                              value={test.company}
                              onChange={(e) => handleTestimonialChange(tIdx, "company", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-2.5 py-1.5 rounded-lg text-white mt-0.5"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500 uppercase font-black block">গ্রাহকের প্রশংসাবাণী কন্টেন্ট *</label>
                          <textarea
                            rows={2}
                            value={test.text}
                            onChange={(e) => handleTestimonialChange(tIdx, "text", e.target.value)}
                            className="w-full bg-[#010307] border border-white/10 px-3 py-2 rounded-xl text-white mt-0.5 text-xs resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-cyan-400 font-sans">
                    <FileText className="w-5 h-5" />
                    📝 ভ্রমণ ডায়েরি ও ট্রাভেল ব্লগ কন্টেন্ট এডিটর
                  </h4>
                  <button
                    onClick={addBlog}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-primary text-black font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    নতুন ব্লগ যোগ করুন
                  </button>
                </div>

                <div className="space-y-4">
                  {(!editedData.blogs || editedData.blogs.length === 0) ? (
                    <div className="p-12 text-center rounded-2xl bg-white/[0.01] border border-white/5 text-gray-500 font-light text-sm">
                      কোনো ব্লগ কন্টেন্ট পাওয়া যায়নি। নতুন ব্লগ তৈরি করতে ওপরের বাটনটি ব্যবহার করুন।
                    </div>
                  ) : (
                    editedData.blogs.map((blog, bIdx) => (
                      <div key={blog.id} className="p-5 sm:p-6 rounded-2xl bg-[#0a0f1d] border border-white/10 relative space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 font-semibold">
                            <Sparkles className="w-4 h-4 text-accent" />
                            ব্লগ #{bIdx + 1}: {blog.title || "নামহীন ব্লগ"}
                          </span>
                          
                          <button
                            onClick={() => removeBlog(bIdx)}
                            className="text-rose-500 hover:text-rose-400 p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            মুছে ফেলুন
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">ব্লগ শিরোনাম (Title) *</label>
                            <input
                              type="text"
                              value={blog.title || ""}
                              onChange={(e) => handleBlogChange(bIdx, "title", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-semibold"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">ক্যাটাগরি (Category) *</label>
                            <select
                              value={blog.category || "tips"}
                              onChange={(e) => handleBlogCategoryChange(bIdx, e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                            >
                              <option value="visa">ভিসা প্রসেসিং</option>
                              <option value="tickets">ফ্লাইট টিকিট হ্যাকস</option>
                              <option value="tips">ভ্রমণ গাইড ও টিপস</option>
                              <option value="hajj">হজ্জ ও ওমরাহ</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">পড়ার সময় (Read Time) *</label>
                            <input
                              type="text"
                              value={blog.readTime || ""}
                              onChange={(e) => handleBlogChange(bIdx, "readTime", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">প্রকাশের তারিখ (Date) *</label>
                            <input
                              type="text"
                              value={blog.date || ""}
                              onChange={(e) => handleBlogChange(bIdx, "date", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">লেখক (Author) *</label>
                            <input
                              type="text"
                              value={blog.author || ""}
                              onChange={(e) => handleBlogChange(bIdx, "author", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">ট্যাগসমূহ (কমা দিয়ে লিখুন, উদা: ভিসা, ওমরাহ, শেনজেন) *</label>
                            <input
                              type="text"
                              value={blog.tags ? blog.tags.join(", ") : ""}
                              onChange={(e) => handleBlogTagsChange(bIdx, e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase block">ইমেজ প্রম্পট (Image Prompt or ID) *</label>
                            <input
                              type="text"
                              value={blog.imagePrompt || ""}
                              onChange={(e) => handleBlogChange(bIdx, "imagePrompt", e.target.value)}
                              className="w-full bg-[#010307] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-400 font-bold uppercase block">সংক্ষিপ্ত সারাংশ (Excerpt) *</label>
                          <input
                            type="text"
                            value={blog.excerpt || ""}
                            onChange={(e) => handleBlogChange(bIdx, "excerpt", e.target.value)}
                            className="w-full bg-[#010307] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-400 font-bold uppercase block">মূল ব্লগ কন্টেন্ট (Full Content - supports multiline text) *</label>
                          <textarea
                            rows={8}
                            value={blog.content || ""}
                            onChange={(e) => handleBlogChange(bIdx, "content", e.target.value)}
                            className="w-full bg-[#010307] border border-white/10 px-3 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-light leading-relaxed font-sans"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* INTEGRATIONS & API SERVICES */}
            {activeTab === "integration" && (
              <div className="space-y-6 animate-fadeIn">
                
                <div className="space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-sans mb-1.5">
                      <Code className="w-5 h-5" />
                      📊 গুগল স্প্রেডশিট ও লিড ইন্টিগ্রেশন (Google Sheets Sync)
                    </h4>
                    <p className="text-xs text-gray-350 leading-relaxed font-light">
                      আপনার ওয়েবসাইটের <strong>যোগাযোগ ফরম</strong> এবং <strong>ইনস্ট্যান্ট টিকেটিং কোটেশন ফরম</strong>-এর সকল সাবমিশন সরাসরি গুগল শিটে সেভ করতে এবং আপনার টেলিগ্রাম চ্যানেলে নোটিফিকেশন পাঠাতে নিচের তথ্যগুলো পূরণ করুন।
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-white">গুগল শিট স্ক্রিপ্ট Webhook URL</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 block font-bold">Google Apps Script Webhook URL</label>
                        <input
                          type="text"
                          placeholder="https://script.google.com/macros/s/AKfycb..."
                          value={editedData.googleScriptURL || ""}
                          onChange={(e) => handleFieldChange("googleScriptURL", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-emerald-500/20 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono placeholder-gray-600"
                        />
                        <p className="text-[10px] text-emerald-400 font-light leading-relaxed">
                          * এখানে আপনার গুগল স্প্রেডশিট ম্যাক্রো বা ওয়েব অ্যাপ লিংকটি প্রদান করুন। কন্টাক্ট ফরম ও কুইক কোটেশন ফরমের সাবমিশনগুলো সরাসরি এই লিংকে পাঠানো হবে।
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 space-y-4">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        ✈️ টেলিগ্রাম চ্যাট নোটিফিকেশন সেটিংস (Instant Chat Alerts)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-gray-400 font-bold block">Telegram Bot API Token</label>
                          <input
                            type="password"
                            placeholder="7128362819:AAEyHcl_Y..."
                            value={editedData.telegramBotToken || ""}
                            onChange={(e) => handleFieldChange("telegramBotToken", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-gray-400 font-bold block">Telegram Chat Message ID</label>
                          <input
                            type="text"
                            placeholder="Your Chat ID (e.g. 5829124)"
                            value={editedData.telegramChatId || ""}
                            onChange={(e) => handleFieldChange("telegramChatId", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#010307] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
            
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 sm:p-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-[#060a16]">
          <p className="text-[10px] sm:text-xs text-gray-400 font-light leading-relaxed flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>সিকিউর এনক্রিপ্টেড ডাটাবেজ মডিউল। কনফিগারেশন আপডেট করলে সাইট রিলোড হবে।</span>
          </p>

          <button
            onClick={handleSaveAll}
            disabled={saveSuccess}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-black text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-950 animate-bounce" />
                <span>সংরক্ষণ সম্পন্ন হচ্ছে...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>কনফিগারেশন আপডেট করুন</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
