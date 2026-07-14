import React, { useRef, useState } from "react";
import { portfolioData } from "../data";
import { 
  X, Printer, Download, MapPin, Phone, Mail, Award, CheckCircle2, 
  Sparkles, Globe, Calendar, Briefcase, BookOpen, Star, HelpCircle 
} from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [lang, setLang] = useState<"bn" | "en">("bn");
  const modalContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Bilingual resume content database
  const cvData = {
    bn: {
      name: portfolioData.name,
      title: "সিনিয়র এয়ার টিকেটিং কনসালট্যান্ট ও ট্রাভেল আইটি প্রফেশনাল",
      institution: "চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস (আইএটিএ অনুমোদিত এজেন্ট)",
      contact: {
        phone: portfolioData.phone,
        email: portfolioData.email,
        location: portfolioData.location,
        linkedin: "linkedin.com/in/salmansharif",
        facebook: "facebook.com/mohammadsalmansharif37"
      },
      objective: {
        heading: "পেশাদার বিবরণী (Objective)",
        text: "আমি ট্রাভেল ও এভিয়েশন সেক্টরে দীর্ঘ ৪ বছরের প্র্যাকটিক্যাল অভিজ্ঞতাসম্পন্ন একজন সুদক্ষ এয়ার টিকেটিং বিশেষজ্ঞ। Sabre, Galileo এবং Amadeus GDS সিস্টেমে টিকিট সার্চ, পিএনআর ক্রিয়েশন, ফেয়ার ক্যালকুলেশন, রি-ইস্যু ও ইনস্ট্যান্ট রিফান্ড ম্যানেজমেন্টে আমার উচ্চতর দক্ষতা রয়েছে। এয়ার টিকেটিং সার্ভিসের পাশাপাশি কাস্টম ট্রাভেল ওয়েবসাইট ডেভলপমেন্ট, এসইও এবং এআই প্রম্পট ইঞ্জিনিয়ারিংয়ের সমন্বয়ে আধুনিক ট্রাভেল এজেন্সী অটোমেশন সেটআপে আমি পারদর্শী।"
      },
      skills: {
        heading: "পেশাদার দক্ষতাসমূহ (Skills)",
        gdsTitle: "✈️ টিকেটিং ও এভিয়েশন GDS দক্ষতা",
        gds: [
          { name: "Sabre GDS Expert", level: "৯৬%" },
          { name: "Galileo GDS Certified", level: "৯৪%" },
          { name: "Amadeus Web Booking", level: "৯০%" },
          { name: "PNR Creation & Split PNR", level: "৯৮%" },
          { name: "Ticket Reissue & Refund pricing", level: "৯৫%" },
          { name: "IATA Air Ticketing Rules", level: "৯২%" },
          { name: "Hajj & Umrah Saudi Portal Operation", level: "৯৬%" }
        ],
        techTitle: "💻 ডিজিটাল ও ট্রাভেল আইটি দক্ষতা",
        tech: [
          { name: "WordPress Premium Web Development", level: "৮৫%" },
          { name: "Blogger Custom Template Markup", level: "৯০%" },
          { name: "AI Prompt Engineering & GPTs", level: "৮৮%" },
          { name: "MS Excel & Advanced fare sheets", level: "৯২%" },
          { name: "Digital Customer Lead Generation", level: "৯৫%" }
        ]
      },
      experience: {
        heading: "কর্মসংস্থান ইতিহাস (Work Experience)",
        list: [
          {
            role: "সিনিয়র এয়ার টিকেটিং কনসাল্ট্যান্ট ও ট্রাভেল টেকনোলজি প্রফেশনাল",
            company: "চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস (নয়া পল্টন, ঢাকা)",
            duration: "২০২২ - বর্তমান",
            description: "আমি কোম্পানির মূল টিকেটিং ডেস্ক এবং ট্রাভেল আইটি প্রজেক্টগুলো সফলভাবে পরিচালনা করছি।",
            bullets: [
              "প্রতিদিন Sabre এবং Galileo সিস্টেম ব্যবহার করে আন্তর্জাতিক ও হজ্জ ফ্লাইটের টিকিট ইস্যু ও সাশ্রয়ী রুট স্প্লিট ফেয়ার শিট তৈরি করা।",
              "সৌদি পররাষ্ট্র মন্ত্রণালয়ের সরাসরি পোর্টাল থেকে ওমরাহ ভিসা প্রক্রিয়াকরণ ও মক্কা-মদিনার হোটেল সোর্সিং তদারকি করা।",
              "গ্রাহকদের জন্য ইনস্ট্যান্ট টিকেটিং কোয়্যারি রিসিভ করার জন্য এজেন্সি ওয়েবসাইট ডেভলপমেন্ট ও কাস্টমাইজেশন করা।"
            ]
          },
          {
            role: "ওয়ার্ডপ্রেস ওয়েব ডেভেলপার ও ট্রাভেল আইটি অ্যাসোসিয়েট",
            company: "ফ্রিল্যান্স ট্রাভেল সল্যুশন এজেন্সি",
            duration: "২০২০ - ২০২২",
            description: "বিভিন্ন ট্রাভেল স্টার্টআপের জন্য আধুনিক বুকিং ইন্টিগ্রেটেড পোর্টাল চালুকরণের দায়িত্ব পালন করি।",
            bullets: [
              "১০টির বেশি আইএটিএ সাব-এজেন্টের ব্লগিং সাইট ও প্রমোশনাল ইউজার ল্যান্ডিং পেজ সফলভাবে তৈরি।",
              "এআই চ্যাটবট এবং ইমেইল ট্রাভেল লিড অটোমেশন চালুর মাধ্যমে সেলস লিড কনভার্শন ৪০% বৃদ্ধি।"
            ]
          }
        ]
      },
      education: {
        heading: "শিক্ষাগত যোগ্যতা (Education)",
        degree: "ব্যবসায় শিক্ষা স্নাতক (BBA - চলমান)",
        inst: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
        add: "ডিপ্লোমা ইন ট্যুরিজম অ্যান্ড ট্রাভেল টেকনোলজি"
      },
      certifications: {
        heading: "অর্জন ও সার্টিফিকেটসমূহ (Certifications)",
        list: [
          { title: "Sabre GDS Advanced Ticketing and Reservation License", issuer: "Sabre Bangladesh", year: "২০২১" },
          { title: "Galileo GDS Professional Fare System Certificate", issuer: "Travelport Bangladesh", year: "২০২০" },
          { title: "AI Prompt Engineering Specialist for Travel Automation", issuer: "Digital Tech Lab", year: "২০২৩" }
        ]
      },
      languages: {
        heading: "যোগাযোগের ভাষা (Languages)",
        list: ["বাংলা (মাতৃভাষা)", "ইংরেজি (পেশাদার কাজ)", "আরবি (ভ্রমণ সংক্রান্ত কথোপকথন)"]
      }
    },
    en: {
      name: portfolioData.englishName,
      title: "Senior Air Ticketing Consultant & Travel IT Professional",
      institution: "Champion Travels & Tours (IATA Approved Agent)",
      contact: {
        phone: portfolioData.phone,
        email: portfolioData.email,
        location: "Naya Paltan, Dhaka, Bangladesh",
        linkedin: "linkedin.com/in/salmansharif",
        facebook: "facebook.com/mohammadsalmansharif37"
      },
      objective: {
        heading: "Professional Summary",
        text: "Highly accomplished Air Ticketing Specialist with over 4 years of hands-on experience optimizing flight reservation systems. Mastery in Global Distribution Systems (GDS) including Sabre, Galileo, and Amadeus. Proven expert in drafting complex multi-city flight PNRs, configuring lowest airfare combinations, managing swift reissues and maximum refund calculation. Expert in bridging travel agency workflows with digital toolchains including WordPress development, AI Prompts, and CRM customization."
      },
      skills: {
        heading: "Core Skills",
        gdsTitle: "✈️ Travel & Aviation GDS Competency",
        gds: [
          { name: "Sabre GDS Expert", level: "96%" },
          { name: "Galileo GDS Certified", level: "94%" },
          { name: "Amadeus Web Booking", level: "90%" },
          { name: "PNR Creation & Split PNR", level: "98%" },
          { name: "Ticket Reissue & Refund pricing", level: "95%" },
          { name: "IATA Air Ticketing Rules", level: "92%" },
          { name: "Hajj & Umrah Saudi Portal Operation", level: "96%" }
        ],
        techTitle: "💻 Digital & Travel IT Solutions",
        tech: [
          { name: "WordPress Premium Web Development", level: "85%" },
          { name: "Blogger Custom Template Markup", level: "90%" },
          { name: "AI Prompt Engineering & GPTs", level: "88%" },
          { name: "MS Excel & Advanced fare sheets", level: "92%" },
          { name: "Digital Customer Lead Generation", level: "95%" }
        ]
      },
      experience: {
        heading: "Professional Experience",
        list: [
          {
            role: "Senior Air Ticketing Consultant & Travel Technology Professional",
            company: "Champion Travels & Tours (Dhaka, Bangladesh)",
            duration: "2022 - Present",
            description: "Directing core flight booking desk and leading travel IT developments for premium accounts.",
            bullets: [
              "Harnessing Sabre & Galileo systems to generate low-cost split airfares and complex multi-carrier routings daily.",
              "Supervising official Saudi MoFA Portal visa submission, umrah bio-checks, and direct hotel contract sourcing.",
              "Designed, tailored, and maintained local sub-agent website systems including dynamic ticketing inquiry tools."
            ]
          },
          {
            role: "WordPress Web Developer & Travel IT Associate",
            company: "Freelance Travel Solutions Group",
            duration: "2020 - 2022",
            description: "Built search engine optimized flight web portals, landing pages, and API inquiry channels for travel startups.",
            bullets: [
              "Successfully launched 10+ custom agency blogging templates and user landing pages with responsive designs.",
              "Integrated conversational AI agents to automate standard client queries, increasing sales lead generation by 40%."
            ]
          }
        ]
      },
      education: {
        heading: "Education & Academics",
        degree: "Bachelor of Business Administration (BBA - Ongoing)",
        inst: "National University, Bangladesh",
        add: "Professional Diploma in Aviation & Travel Technology"
      },
      certifications: {
        heading: "Professional Certifications",
        list: [
          { title: "Sabre GDS Advanced Ticketing and Reservation License", issuer: "Sabre Bangladesh", year: "2021" },
          { title: "Galileo GDS Professional Fare System Certificate", issuer: "Travelport Bangladesh", year: "2020" },
          { title: "AI Prompt Engineering Specialist for Travel Automation", issuer: "Digital Tech Lab", year: "2023" }
        ]
      },
      languages: {
        heading: "Language Proficiency",
        list: ["Bengali (Native Fluent)", "English (Professional Working Proficiency)", "Arabic (Travel terms & Conversational)"]
      }
    }
  };

  const current = cvData[lang];

  // Outstandingly robust printing method using direct iframe style targeting
  const triggerPrint = () => {
    const printContent = modalContentRef.current?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${current.name} - Professional CV Resume</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap');
              body {
                font-family: 'Hind Siliguri', 'Inter', sans-serif;
                background-color: #ffffff;
                color: #1f2937;
                padding: 10px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @media print {
                @page {
                  size: A4;
                  margin: 15mm;
                }
                .no-print { display: none !important; }
                body {
                  background-color: #ffffff !important;
                }
              }
            </style>
          </head>
          <body onload="setTimeout(function(){ window.print(); window.close(); }, 350);">
            <div class="max-w-4xl mx-auto">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Fallback: print direct
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
      {/* Print-only CSS rules injected inside page to allow screen-level printing override gracefully */}
      <style>{`
        @media print {
          /* Hide all external app items */
          #app-container, header, footer, main, .fixed, .modal-backdrop, #website-footer, #root, .z-55 {
            display: none !important;
          }
          /* Show print wrapper */
          #print-cv-wrapper {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      <div className="rounded-3xl bg-[#090b14]/95 border border-white/10 w-full max-w-4xl p-4 sm:p-6 relative max-h-[96vh] overflow-hidden flex flex-col justify-between shadow-2xl">
        
        {/* Toggle Panel & Toolbar header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5 mb-4 shrink-0">
          <div>
            <h3 className="text-md sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {lang === "bn" ? "প্রফেশনাল জীবনবৃত্তান্ত (CV)" : "Professional Resume (CV)"}
            </h3>
            <p className="text-[11px] text-gray-400">
              {lang === "bn" ? "বাংলা ও ইংরেজি উভয় ভাষায় ডাউনলোড বা প্রিন্ট করার সুবিধা" : "Download or Print instantly in Bangla or English"}
            </p>
          </div>
          
          {/* Controls Block */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Language Selection Switcher */}
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/5 text-[11px] font-bold">
              <button
                onClick={() => setLang("bn")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  lang === "bn" ? "bg-primary text-dark-bg" : "text-gray-400 hover:text-white"
                }`}
              >
                বাংলা (BN)
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  lang === "en" ? "bg-primary text-dark-bg" : "text-gray-400 hover:text-white"
                }`}
              >
                English (EN)
              </button>
            </div>

            {/* Print/Download button */}
            <button
              onClick={triggerPrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primary to-accent text-dark-bg font-extrabold text-[11px] flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all shadow-md cursor-pointer"
              title={lang === "bn" ? "Resume প্রিন্ট বা PDF ডাউনলোড করুন" : "Print or Download Resume as PDF"}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "প্রিন্ট / PDF নিন" : "Print / PDF Download"}</span>
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document View (Optimized with high professional contrast layout styling) */}
        <div className="flex-1 overflow-y-auto pr-1.5 space-y-4" id="cv-print-scroller">
          <div 
            ref={modalContentRef} 
            className="bg-white text-gray-800 rounded-2xl p-4 sm:p-8 shadow-2xl relative border border-gray-150 overflow-hidden"
          >
            {/* Blue accent stamp bar */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-600" />

            {/* Outer Grid system: Left Info Section & Right Experience Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              
              {/* LEFT HIGHLIGHT STRIP (Cols: 4) - Containing Name, Contact & skills */}
              <div className="md:col-span-4 border-r-0 md:border-r border-gray-200 pr-0 md:pr-5 space-y-5 text-left">
                
                {/* Profile Brand Head */}
                <div className="space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-md font-extrabold shadow-sm">
                    SS
                  </div>
                  <h1 className="text-xl font-extrabold text-gray-900 tracking-tight pt-1.5">{current.name}</h1>
                  <p className="text-[10px] sm:text-[11px] text-blue-700 font-bold uppercase tracking-wide leading-tight">{current.title}</p>
                </div>

                {/* Contact strip Info */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-[11px] text-gray-600">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="font-semibold text-gray-800">{current.contact.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="break-all font-medium">{current.contact.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{current.contact.location}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <Globe className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="text-gray-500 hover:underline cursor-pointer">{current.contact.linkedin}</span>
                  </p>
                </div>

                {/* Core GDS levels */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1 bg-gray-50 p-1.5 rounded-lg border-l-2 border-blue-700">
                    <Award className="w-3.5 h-3.5 text-blue-700" />
                    {lang === "bn" ? "এভিয়েশন GDS দক্ষতা" : "Aviation GDS Skills"}
                  </h3>
                  <div className="space-y-2">
                    {current.skills.gds.map((gdsSkill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-700">
                          <span>{gdsSkill.name}</span>
                          <span className="text-blue-700">{gdsSkill.level}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-700 h-full rounded-full transition-all" 
                            style={{ width: gdsSkill.level === "৯৬%" || gdsSkill.level === "96%" ? "96%" : gdsSkill.level === "৯৪%" || gdsSkill.level === "94%" ? "94%" : gdsSkill.level === "৯৮%" || gdsSkill.level === "98%" ? "98%" : "90%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core digital tools */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1 bg-gray-50 p-1.5 rounded-lg border-l-2 border-blue-700">
                    <Star className="w-3.5 h-3.5 text-blue-700" />
                    {lang === "bn" ? "আইটি ও মিডিয়া দক্ষতা" : "Digital IT Skills"}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {current.skills.tech.map((techSkill, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-150"
                      >
                        {techSkill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages List */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    {current.languages.heading}
                  </h3>
                  <ul className="space-y-1 text-[11px] text-gray-600 font-medium">
                    {current.languages.list.map((langText, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                        {langText}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* RIGHT MAIN PANEL (Cols: 8) - Containing Objective, Achievements & experience */}
              <div className="md:col-span-8 space-y-6 text-left">
                
                {/* objective text */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-blue-700 border-b border-gray-200 pb-1 uppercase tracking-widest">
                    {current.objective.heading}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed font-light text-justify">
                    {current.objective.text}
                  </p>
                </div>

                {/* Experience History timeline */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold text-blue-700 border-b border-gray-200 pb-1 uppercase tracking-widest flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {current.experience.heading}
                  </h2>

                  <div className="space-y-4">
                    {current.experience.list.map((job, idx) => (
                      <div key={idx} className="space-y-1.5 relative pl-4 border-l-2 border-blue-100">
                        {/* Bullet circle */}
                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-700 border border-white" />
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                              {job.role}
                            </h4>
                            <p className="text-[11px] text-blue-700 font-bold">{job.company}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-105 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {job.duration}
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-600 italic font-light leading-snug">
                          {job.description}
                        </p>

                        <ul className="space-y-1 text-xs text-gray-600 font-light list-disc list-inside">
                          {job.bullets.map((bulletLine, bIdx) => (
                            <li key={bIdx} className="leading-relaxed pl-1">
                              {bulletLine}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Educations */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-blue-700 border-b border-gray-200 pb-1 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {current.education.heading}
                  </h2>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-start text-xs text-gray-700">
                    <div>
                      <p className="font-bold text-gray-900">{current.education.degree}</p>
                      <p className="text-gray-500 mt-0.5">{current.education.inst}</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50/70 border border-blue-100 px-2 py-0.5 rounded-full uppercase shrink-0">
                      Ongoing
                    </span>
                  </div>
                </div>

                {/* Certifications and credentials list */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold text-blue-700 border-b border-gray-200 pb-1 uppercase tracking-widest">
                    {current.certifications.heading}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-600 leading-normal">
                    {current.certifications.list.map((cert, certIdx) => (
                      <div key={certIdx} className="flex gap-2 p-2 bg-gray-50 rounded-xl border border-gray-150">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800 leading-tight">{cert.title}</p>
                          <p className="text-[9px] text-gray-500 mt-0.5">{cert.issuer} ({cert.year})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Resume print footer message for authentic visual signature */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center text-[9px] text-gray-500 font-medium">
              <p>Certified Sabre BD Relay Connection | IATA Sourced Verification Code: #SMS-9801</p>
              <p>© {new Date().getFullYear()} {portfolioData.englishName}</p>
            </div>

          </div>
        </div>

        {/* Footer actions inside modal */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
          <button
            onClick={triggerPrint}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-dark-bg font-extrabold text-xs sm:text-sm text-center rounded-xl hover:opacity-95 transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            {lang === "bn" ? "অফিসিয়াল কপি ডাউনলোড / প্রিন্ট নিন" : "Print / Download PDF Officemall Copy"}
          </button>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {lang === "bn" ? "বন্ধ করুন" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
}
