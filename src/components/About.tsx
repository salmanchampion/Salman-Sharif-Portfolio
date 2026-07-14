import React from "react";
import { portfolioData } from "../data";
import { MapPin, Phone, Mail, Award, CheckCircle, ShieldCheck, HelpCircle } from "lucide-react";

export default function About() {
  const highlightPoints = [
    { title: "GDS সিস্টেমে প্রশিক্ষণ", text: "Sabre & Galileo সার্টিফাইড" },
    { title: "টিকিটিং দক্ষতা", text: "রি-ইস্যু, রিফান্ড ও ফেয়ার ক্যালকুলেশন" },
    { title: "হজ্জ ও ওমরাহ", text: "পূর্ণাঙ্গ ও কাস্টমাইজড কোঅর্ডিনেশন সল্যুশন" },
    { title: "ট্রাভেল অটোমেশন", text: "ওয়ার্ডপ্রেস ও এআই মেকানিজম ইন্টিগ্রেশন" },
  ];

  return (
    <section id="about-section" className="py-20 lg:py-28 px-4 bg-[#0a0e1a] relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            আমার পরিচিতি
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            সালমান শরীফ সম্পর্কে বিস্তারিত
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Image with visual accent */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group max-w-xs sm:max-w-sm w-full aspect-square">
              {/* Card visual background block */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary-grad rounded-3xl opacity-20 group-hover:opacity-35 transition-all blur-md" />
              
              {/* Main glass card block */}
              <div className="absolute inset-0.5 rounded-3xl bg-[#111625]/95 p-4 border border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl relative">
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-2xl shadow-lg">
                    <i className="fa-solid fa-kaaba" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">চ্যাম্পিয়ন ট্রাভেলস</h3>
                    <p className="text-xs text-primary/80 font-medium">নয়া পল্টন, ঢাকা, বাংলাদেশ</p>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    আমরা নিবেদিত এয়ার টিকেটিং, হজ্জ-ওমরাহ এবং বিশ্বস্ত ভিসা প্রসেসিং দল হিসেবে গ্রাহকদের শতভাগ নির্ভরযোগ্য সহায়তা প্রদান করছি।
                  </p>
                </div>
                
                {/* Embedded dynamic badge */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-[11px] text-accent font-semibold">১০০% ভেরিফাইড ট্রাভেল কনসালট্যান্সি</span>
                </div>
              </div>

              {/* Decorative extra badges */}
              <div className="absolute -top-4 -right-4 bg-accent p-3 rounded-2xl text-dark-bg font-bold text-xs shadow-lg animate-float-slow flex flex-col items-center">
                <span>৪.৮+</span>
                <span className="text-[9px] uppercase font-light text-gray-800">রেটিং</span>
              </div>
            </div>
          </div>

          {/* Right Column - Text Bio and Quick Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4 text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                অগ্রগামী ট্রাভেল সিস্টেমস ও ডিজিটাল সল্যুশনের নির্ভরযোগ্য পার্টনার
              </h3>
              
              <p className="text-gray-300 text-base sm:text-md leading-relaxed font-light">
                আমি একজন পেশাদার এয়ার টিকেটিং এক্সপার্ট ও ট্রাভেল কনসালট্যান্ট। <strong className="text-white font-medium">Sabre, Galileo এবং Amadeus GDS-এ</strong> প্রশিক্ষিত হিসেবে আন্তর্জাতিক ও অভ্যন্তরীণ বিমান টিকেটিং, Reissue, Refund, Fare Calculation, Visa Processing, Hajj ও Umrah Packages এবং Corporate Travel Solutions প্রদান করি। 
              </p>
              
              <p className="text-gray-300 text-base sm:text-md leading-relaxed font-light">
                পাশাপাশি আধুনিক Travel Business কে ডিজিটালাইজড করার জন্য <strong className="text-white font-medium">WordPress, Blogger এবং AI Tools</strong> ব্যবহার করে ট্রাভেল প্রতিষ্ঠানের জন্য অত্যাধুনিক ওয়েবসাইট এবং ইন্টেলিজেন্ট অটোমেশন সল্যুশন ডেভেলপমেন্টে আমার গভীর দক্ষতা রয়েছে।
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlightPoints.map((pt, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{pt.title}</h4>
                    <p className="text-xs text-gray-400 font-light">{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Profile Variables info summary table */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">লোকেশন</p>
                  <p className="text-sm font-semibold text-white">{portfolioData.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">ফোন নম্বর</p>
                  <p className="text-sm font-semibold text-white">
                    <a href={`tel:${portfolioData.phone}`} className="hover:text-primary transition-colors">{portfolioData.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">ইমেইল অ্যাড্রেস</p>
                  <p className="text-sm font-semibold text-white break-all text-wrap">
                    <a href={`mailto:${portfolioData.email}`} className="hover:text-primary transition-colors">{portfolioData.email}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">প্রতিষ্ঠানের নাম</p>
                  <p className="text-sm font-semibold text-white">{portfolioData.institution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
