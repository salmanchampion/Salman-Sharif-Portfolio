import React from "react";
import { Plane, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

interface Airline {
  name: string;
  code: string;
  hubs: string;
  baggage: string;
  logo: string;
  class: string;
}

export default function AirlinesPartners() {
  const airlines: Airline[] = [
    {
      name: "Saudi Arabian Airlines",
      code: "SV / Saudia",
      hubs: "জেদ্দা / রিয়াদ",
      baggage: "৪৬ কেজি (দুইটি ব্যাগে)",
      logo: "🇸🇦",
      class: "ওমরাহ ও হজ্ব স্পেশাল"
    },
    {
      name: "Emirates",
      code: "EK / Dubai",
      hubs: "দুবাই ইন্টারন্যাশনাল",
      baggage: "৩০ কেজি থেকে ৪৬ কেজি",
      logo: "🇦🇪",
      class: "প্রিমিয়াম গ্লোবাল"
    },
    {
      name: "Qatar Airways",
      code: "QR / Qatar",
      hubs: "দোহা হামাদ এয়ারপোর্ট",
      baggage: "৩৫ কেজি বা তার বেশি",
      logo: "🇶🇦",
      class: "ফাইভ স্টার সার্ভিস"
    },
    {
      name: "Biman Bangladesh Airlines",
      code: "BG / Biman",
      hubs: "ঢাকা হযরত শাহজালাল",
      baggage: "৩০ কেজি থেকে ৪০ কেজি",
      logo: "🇧🇩",
      class: "আমাদের জাতীয় পতাকাবাহী"
    },
    {
      name: "US-Bangla Airlines",
      code: "BS / US-Bangla",
      hubs: "ঢাকা / কলকাতা / মাস্কাট",
      baggage: "২০ কেজি থেকে ৩০ কেজি",
      logo: "✈️",
      class: "অভ্যন্তরীণ ও রিজিওনাল"
    },
    {
      name: "Gulf Air",
      code: "GF / Bahrain",
      hubs: "বাহরাইন ইন্টার",
      baggage: "৩০ কেজি থেকে ৪০ কেজি",
      logo: "🇧🇭",
      class: "মধ্যপ্রাচ্য স্পেশাল ফেয়ার"
    },
    {
      name: "Flydubai",
      code: "FZ / Dubai",
      hubs: "দুবাই টার্মিনাল ২",
      baggage: "২০ কেজি থেকে ৩০ কেজি",
      logo: "🇦🇪",
      class: "বাজেট ফ্রেন্ডলি"
    },
    {
      name: "Singapore Airlines",
      code: "SQ / Singapore",
      hubs: "সিঙ্গাপুর চাঙ্গি",
      baggage: "৩০ কেজি লাগেজ সুবিধা",
      logo: "🇸🇬",
      class: "লাক্সারি ও এশিয়ান রুট"
    }
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs text-primary font-bold">
          <Plane className="w-3.5 h-3.5 rotate-[45deg]" />
          <span>অনুমোদিত এয়ারলাইন্স পার্টনারস</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          প্রধান বিমান এয়ারলাইন্সসমূহ ও ব্যাগেজ রেগুলেশনস
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
          সালমান শরীফ বিশ্বের প্রায় সকল শীর্ষ এয়ারলাইন্সের টিকিট বুক করেন। নিচে ঢাকা থেকে সবচেয়ে জনপ্রিয় কয়েকটি এয়ারলাইন্সের স্ট্যান্ডার্ড রুট হাব এবং আনুমানিক চেক-ইন লাগেজ নিয়ম দেয়া হলো:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {airlines.map((air, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all hover:-translate-y-1 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full pointer-events-none" />
            
            {/* Logo flag block */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl filter drop-shadow select-none">{air.logo}</span>
              <span className="text-[9px] text-primary/70 bg-primary/5 border border-primary/15 px-2 py-0.5 rounded-full font-bold">
                {air.class}
              </span>
            </div>

            {/* Content info */}
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors flex items-center gap-1">
                {air.name}
              </h4>
              <p className="text-xs font-mono text-gray-400 font-semibold">{air.code}</p>
              
              <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-gray-500 font-light">
                <p>
                  <strong className="text-gray-400 font-medium">রুট হাবস:</strong> {air.hubs}
                </p>
                <p>
                  <strong className="text-gray-400 font-medium">লাগেজ কন্ডিশন:</strong> {air.baggage}
                </p>
              </div>
            </div>
            
            {/* Bottom highlight outline */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] text-indigo-200/90 leading-relaxed">
        💡 <strong className="text-white font-medium">বিশেষ পরামর্শ:</strong> এয়ারলাইন্সগুলো অন-সিজন ও অফ-সিজনে লাগেজ ব্যাগেজের সীমা আপডেট করতে পারে। শিশু এবং মাল্টি-স্টপ ট্রানজিটের ক্ষেত্রে সুনির্দিষ্ট লাগেজ নিয়ম ও কড়াকড়ি জানতে টিকিট ইস্যুর পূর্বে সালমান শরীফের সাথে নিশ্চিত হয়ে নিন।
      </div>
    </div>
  );
}
