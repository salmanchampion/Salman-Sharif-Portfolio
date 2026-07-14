import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, Calendar, ShieldCheck, HeartHandshake } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function TravelFAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "পাসপোর্ট ও টিকিট বুকিং",
      question: "এয়ার টিকিট কেনার পূর্বে পাসপোর্টের সর্বনিম্ন কত দিনের মেয়াদ প্রয়োজন?",
      answer: "আন্তর্জাতিক সিভিল এভিয়েশন অর্গানাইজেশনের (ICAO) নিয়ম অনুযায়ী, আপনি যে তারিখে ভ্রমণ করছেন সেদিন থেকে পাসপোর্টে কমপক্ষে ৬ মাসের (১৮০ দিন) মেয়াদ থাকতে হবে। পাসপোর্ট ছয় মাসের কম মেয়াদী হলে এয়ার ট্রাভেলারকে বোর্ডিং পাস দেওয়া হয় না এবং অফলাইন ইমিগ্রেশনেই ফেরত দেওয়া হয়। টিকিট বুক করার আগে আপনার পাসপোর্ট মেয়াদ অবশ্যই যাচাই করে নিন।"
    },
    {
      id: 2,
      category: "পাসপোর্ট ও টিকিট বুকিং",
      question: "টিকিট কাটার পর টাইম-লিমিট (Hold Limit) কী এবং এটি কেন গুরুত্বপূর্ণ?",
      answer: "GDS সিস্টেমে কোনো বিমান সিট বুকিং করলে এয়ারলাইন আপনাকে টাকা পরিশোধ করার পূর্বে বুকিংটি ধরে রাখার জন্য নির্দিষ্ট সময় দেয়, একে ‘Time Limit’ বলে। সালমান শরীফ তার Sabre ও Galileo রিলে অ্যাকাউন্টে ১ দিন থেকে সর্বোচ্চ ৩ দিন পর্যন্ত সিটটি Hold রাখতে পারেন (এয়ারলাইন সিআইডি ক্লাসভেদে)। এই সময়ের মধ্যে কারেন্সি ওঠানামা বা ফেয়ার ডিসকাউন্ট হলে সেরা ফেয়ারে টিকিট কনফার্ম করতে দারুণ সাহায্য করে!"
    },
    {
      id: 3,
      category: "ভিসা ও ওমরাহ",
      question: "ওমরাহ ই-ভিসা পেতে সাধারণত কত দিন সময় লাগে এবং প্রয়োজনীয় ডকুমেন্টস কী?",
      answer: "সাধারণত প্রয়োজনীয় তথ্য এবং ক্লিয়ার ডকুমেন্টস জমা দিলে ওমরাহ ই-ভিসা ২৪ থেকে ৭২ ঘণ্টার মধ্যে প্রস্তুত হয়ে যায়। ওমরাহ ভিসার প্রধান আবশ্যিক কন্ডিশনগুলো হলো: ১. হোয়াইট ব্যাকগ্রাউন্ডের পাসপোর্ট সাইজ ছবি ২. কমপক্ষে ৬ মাস মেয়াদী স্ক্যান করা পাসপোর্ট কপি এবং ৩. কোভিড/অন্যান্য স্বাস্থ্যসম্মত ট্রাভেল ইন্স্যুরেন্স। সালমান শরীফ চ্যাম্পিয়ন ট্রাভেলসের হয়ে সরাসরি সউদী ই-পোর্টালে কাজ করার কারণে অন-টাইম ওমরাহ ভিসা নিশ্চিত করতে সক্ষম।"
    },
    {
      id: 4,
      category: "লাগেজ ও ব্যাগেজ লিমিট",
      question: "আন্তর্জাতিক ফ্লাইটে চেক-ইন লাগেজ ও হ্যান্ড লাগেজের স্ট্যান্ডার্ড লিমিট কত?",
      answer: "রুট এবং এয়ারলাইন্সের ভিত্তিতে লাগেজ লিমিট পরিবর্তিত হতে পারে। সৌদিয়া, ইমারাত কিংবা কাতার এয়ারওয়েজে সাধারণত ইকোনমি ক্লাসে ৩০ কেজি থেকে ৪৬ কেজি (২টি ব্যাগে সর্বোচ্চ ২৩ কেজি করে) ফ্রি চেক-ইন লাগেজ দেওয়া হয়। তবে হ্যান্ড লাগেজ বা কেবিন ক্যারির জন্য সর্বোচ্চ ৭ কেজি গ্রহণযোগ্য (কিছু ক্ষেত্রে ল্যাপটপ ব্যাগ অতিরিক্ত সুযোগ দেয়া হয়)। সালমান শরীফ আপনার টিকিট বুক করার সময়ে এয়ারলাইন্সের নির্ধারিত সবচেয়ে বড় লাগেজ স্লটটি বাছাই করে বুক করে থাকেন।"
    },
    {
      id: 5,
      category: "রিফান্ড ও রি-ইস্যু পলিসি",
      question: "বিমানের টিকিটের নাম ভুল হলে কিংবা ডেট চেঞ্জ অবধারিত হলে কী করণীয়?",
      answer: "পাসপোর্ট নামের স্পেলিং অনুযায়ী হুবহু টিকিটের নাম হওয়া বাধ্যতামূলক, নাম ভুল হলে আপনি ট্রাভেল করতে পারবেন না এবং টিকিট পুরোপুরি বাতিল করতে হতে পারে। তবে স্পেলিং এ ১ বা ২ টি অক্ষরের ভুল থাকলে এয়ারপোর্টে ডেডিকেটেড ‘Name Correction Penalty’ দিয়ে বোর্ড করার সুযোগ মিললেও বড় নাম ঠিক করতে হয়। আর ডেট চেঞ্জের ক্ষেত্রে যাত্রার কমপক্ষে ২৪ ঘণ্টা পূর্বে রি-ইস্যু পেনাল্টি ফিস এবং এয়ার কাটার ফেয়ার ডিফারেন্স টিকিট হোল্ডারকে বহন করতে হয়। আমাদের ২৪/৭ সাপোর্ট টিম Sabre GDS ফিক্সার কোড দিয়ে ইনস্ট্যান্টলি রি-ইস্যু ও রিফান্ড ক্যালকুলেট করে দেয়।"
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Intro tag line */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 text-xs text-accent font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>ভ্রমণকারীদের সহায়ক তথ্যাবলী</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          জরুরি ভ্রমণ নির্দেশিকা ও সাধারণ জিজ্ঞাসাসমূহ 
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
          পাসপোর্ট তৈরিকরণ, বিমান ট্রাভেল গাইডলাইন্স, লাগেজ ম্যানেজমেন্ট কিংবা রিফান্ড রি-ইস্যু নিয়ে আমাদের ক্লায়েন্টদের সচরাচর জিজ্ঞাসিত প্রশ্নগুলোর স্পষ্ট উত্তর নিচে দেওয়া হলো।
        </p>
      </div>

      {/* Accordion container */}
      <div className="space-y-4 max-w-4xl">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-[#111526]/90 border-primary/30 shadow-lg shadow-primary/5"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
              >
                <div className="space-y-1 pr-2">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wide">
                    {faq.category}
                  </span>
                  <h4 className="text-sm sm:text-md font-bold text-white leading-snug">
                    {faq.question}
                  </h4>
                </div>
                <div className="shrink-0 p-1.5 rounded-lg bg-white/5 text-gray-400">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Collapsed body */}
              <div
                className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                  isOpen ? "max-h-[300px] border-t border-white/5 py-4" : "max-h-0"
                }`}
              >
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
                
                {/* Visual extra warning */}
                <div className="mt-3.5 flex gap-2 p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-orange-200/90 italic">
                  <AlertCircle className="w-4 h-4 shrink-0 text-orange-400" />
                  <span>তথ্যসূত্র: চ্যাম্পিয়ন ট্রাভেলস অথরাইজড রিকমেন্ডেশনস অব আইএটিএ ও বিমান সিভিল এভিয়েশন রুলস বাংলাদেশ।</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust elements line */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-4xl-none">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-white mb-0.5">১০০% ভেরিফাইড রুট</h5>
            <p className="text-[11px] text-gray-400 font-light">আমাদের প্রস্তুতকৃত প্রতিটি বিমান টিকিট সরাসরি আইএটিএ ডাটাবেজে রেকর্ড করা হয়।</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
          <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-white mb-0.5">৭২ ঘণ্টা ফেয়ার লক</h5>
            <p className="text-[11px] text-gray-400 font-light">জরুরি বিমান ফেয়ার ওঠানামার ঝুঁকি থেকে ক্লায়েন্টকে সুরক্ষা দিতে হোল্ড অপশন।</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
          <HeartHandshake className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-white mb-0.5">২৪/৭ ওয়ান-স্টপ সাপোর্ট</h5>
            <p className="text-[11px] text-gray-400 font-light">ভ্রমণকালীন ট্রানজিট এয়ারপোর্টের যেকোনো সমস্যা সমাধানে আমরা সদা প্রস্তুত।</p>
          </div>
        </div>
      </div>

    </div>
  );
}
