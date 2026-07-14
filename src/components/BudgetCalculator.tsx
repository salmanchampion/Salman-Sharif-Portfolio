import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  MapPin, 
  Plane, 
  Sparkles, 
  Clock, 
  Coins, 
  ArrowRight, 
  Compass, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Award,
  Globe
} from "lucide-react";
import { portfolioData } from "../data";

interface CostBreakdown {
  flights: number;
  visa: number;
  hotels: number;
  sightseeing: number;
}

interface DestinationSuggestion {
  name: string;
  banglaName: string;
  description: string;
  highlights: string[];
  image: string;
}

export default function BudgetCalculator() {
  // Budget calculator input states
  const [category, setCategory] = useState<string>("asia");
  const [duration, setDuration] = useState<string>("medium"); // "short" (3-5 days), "medium" (7-10 days), "long" (11-15 days)
  const [standard, setStandard] = useState<string>("standard"); // "economy", "standard", "luxury"
  const [userBudget, setUserBudget] = useState<number>(120000); // Default budget in BDT

  // Category Configuration
  const categories = [
    { id: "asia", label: "এশিয়া ট্যুর (Asia Tour)", icon: "🌏" },
    { id: "europe", label: "ইউরোপ ট্যুর (Europe Tour)", icon: "🏰" },
    { id: "honeymoon", label: "হানিমুন স্পেশাল (Honeymoon)", icon: "💖" },
    { id: "umrah", label: "ওমরাহ ও মিডল ইস্ট", icon: "🕌" },
    { id: "americas", label: "আমেরিকা ও দূরপাল্লা", icon: "✈️" }
  ];

  // Dynamic calculations based on selections
  const calculations = useMemo(() => {
    // 1. Base cost of flight ticket based on Category and Standard
    let flightBase = 35000;
    let visaCost = 6000;
    let hotelCostPerNight = 4500;
    let localExpPerDay = 3000;

    switch (category) {
      case "asia":
        flightBase = 30000;
        visaCost = 6500;
        hotelCostPerNight = 3500;
        localExpPerDay = 3000;
        break;
      case "europe":
        flightBase = 85000;
        visaCost = 18000;
        hotelCostPerNight = 9000;
        localExpPerDay = 8000;
        break;
      case "honeymoon":
        flightBase = 45000;
        visaCost = 8000;
        hotelCostPerNight = 8000; // Romantic / Honeymoon hotels are costlier
        localExpPerDay = 6000;
        break;
      case "umrah":
        flightBase = 78000;
        visaCost = 16500;
        hotelCostPerNight = 6000;
        localExpPerDay = 4000;
        break;
      case "americas":
        flightBase = 145000;
        visaCost = 22000;
        hotelCostPerNight = 10000;
        localExpPerDay = 9000;
        break;
    }

    // Adjust based on class / standard
    let multiplier = 1.0;
    if (standard === "economy") {
      multiplier = 0.75;
      hotelCostPerNight *= 0.65;
      localExpPerDay *= 0.8;
    } else if (standard === "luxury") {
      multiplier = 1.7;
      hotelCostPerNight *= 1.8;
      localExpPerDay *= 1.5;
    }

    // Adjust based on duration
    let daysCount = 7;
    if (duration === "short") {
      daysCount = 4;
    } else if (duration === "long") {
      daysCount = 13;
    }

    // Calculations
    const flights = Math.round(flightBase * multiplier);
    const visa = Math.round(visaCost);
    const hotels = Math.round(hotelCostPerNight * daysCount);
    const sightseeing = Math.round(localExpPerDay * daysCount);
    const totalEstCost = flights + visa + hotels + sightseeing;

    // Suggested Destinations
    let suggestedDestinations: DestinationSuggestion[] = [];
    if (category === "asia") {
      if (userBudget < 65000) {
        suggestedDestinations = [
          {
            name: "India (Kolkata & Darjeeling)",
            banglaName: "ভারত (কলকাতা ও দার্জিলিং)",
            description: "কম বাজেটে ঐতিহ্য, হিমালয়ের অপরূপ রূপ ও কাঞ্চনজঙ্ঘার সান্নিধ্য পাওয়ার সেরা প্যাকেজ।",
            highlights: ["কাঞ্চনজঙ্ঘা সানরাইজ", "দার্জিলিং হিমালয়ান রেল", "ভিক্টোরিয়া মেমোরিয়াল"],
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Nepal (Kathmandu & Pokhara)",
            banglaName: "নেপাল (কাঠমান্ডু ও পোখরা)",
            description: "পাহাড়ি সৌন্দর্য, শান্ত লেক ও এডভেঞ্চারপ্রিয় ট্রাভেলারদের জন্য স্বর্গরাজ্য। ভিসা অত্যন্ত সহজ ও বাজেটবান্ধব।",
            highlights: ["ফেওয়া লেক বোট রাইড", "পোখরা প্যারাগ্লাইডিং", "পশুপতিনাথ মন্দির"],
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80"
          }
        ];
      } else if (userBudget <= 130000) {
        suggestedDestinations = [
          {
            name: "Thailand (Bangkok & Phuket)",
            banglaName: "থাইল্যান্ড (ব্যাংকক ও ফুকেট)",
            description: "সমুদ্র সৈকত, ঐতিহ্যবাহী বৌদ্ধ মন্দির ও চমৎকার স্ট্রিট ফুডের চমৎকার কম্বিনেশন।",
            highlights: ["ফুকেট সী-ক্রুজ", "ব্যাংকক শপিং মলস", "সাফারি ওয়ার্ল্ড ট্যুর"],
            image: "https://images.unsplash.com/photo-1528181304800-2f1738b24a62?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Vietnam (Hanoi & Halong Bay)",
            banglaName: "ভিয়েতনাম (হ্যানয় ও হা লং বে)",
            description: "ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইটের অনন্য দৃশ্য ও চমৎকার সাশ্রয়ী সংস্কৃতির দেশ।",
            highlights: ["হা লং বে ক্রুজ", "হ্যানয় ওল্ড কোয়ার্টার", "দা নাং গোল্ডেন ব্রিজ"],
            image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80"
          }
        ];
      } else {
        suggestedDestinations = [
          {
            name: "Maldives Premium Island Resort",
            banglaName: "মালদ্বীপ লাক্সারি রিসোর্ট",
            description: "নীল সমুদ্রের ওপর প্রাইভেট ওয়াটার ভিলা ও রোমান্টিক ডাইনিংয়ের অনন্য অভিজ্ঞতা।",
            highlights: ["প্রাইভেট ওভারওয়াটার ভিলা", "স্নরকেলিং ও কোরাল ট্যুর", "সানসেট ডলফিন ক্রুজ"],
            image: "https://images.unsplash.com/photo-1514282401047-d895c5a21d13?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Singapore & Malaysia Highlights",
            banglaName: "সিঙ্গাপুর ও মালয়েশিয়া",
            description: "আল্ট্রা-মডার্ন স্কাইস্ক্র্যাপার ও ফ্যামিলি বিনোদনের আধুনিক ট্রাভেল এক্সপেরিয়েন্স।",
            highlights: ["ইউনিভার্সাল স্টুডিওস", "টুইন টাওয়ার কুয়ালালামপুর", "মেরিনা বে স্যান্ডস"],
            image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=400&q=80"
          }
        ];
      }
    } else if (category === "europe") {
      if (userBudget < 200000) {
        suggestedDestinations = [
          {
            name: "Turkey (Istanbul & Cappadocia)",
            banglaName: "তুরস্ক (ইস্তাম্বুল ও কাপাদোকিয়া)",
            description: "ইউরোপ ও এশিয়ার সংযোগস্থল। অসাধারণ ইতিহাস, গুহা হোটেল ও হট এয়ার বেলুনের স্বপ্নিল দেশ।",
            highlights: ["হট এয়ার বেলুন রাইড", "হাজিয়া সোফিয়া গ্র্যান্ড মস্ক", "বসফরাস রিভার ক্রুজ"],
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80"
          }
        ];
      } else {
        suggestedDestinations = [
          {
            name: "Switzerland (Zurich & Interlaken)",
            banglaName: "সুইজারল্যান্ড (ইন্টারলাকেন)",
            description: "আল্পস পর্বতমালার বরফে ঢাকা চূড়া, ক্রিস্টাল হ্রদ ও ইউরোপীয় আভিজাত্যের শেষ কথা।",
            highlights: ["মাউন্ট টিটলিস ক্যাবল কার", "সুইশ সিনিক ট্রেন জার্নি", "লেক জেনেভা ক্রুজ"],
            image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Paris & Italy Classic Tour",
            banglaName: "প্যারিস ও ইতালীয় রোমাঞ্চ",
            description: "শিল্প, রোমান্স ও স্থাপত্যের এক অপূর্ব মেলবন্ধন। আইফেল টাওয়ার থেকে শুরু করে রোমের কোলিসিয়াম।",
            highlights: ["আইফেল টাওয়ার ডাইনিং", "ভেনিস গন্ডোলা রাইড", "কোলিসিয়াম হিস্ট্রি ওয়াক"],
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80"
          }
        ];
      }
    } else if (category === "honeymoon") {
      if (userBudget < 100000) {
        suggestedDestinations = [
          {
            name: "Sajek Valley & Cox's Bazar Premium",
            banglaName: "সাজেক ভ্যালি ও কক্সবাজার প্রিমিয়াম",
            description: "মেঘের দেশে মেঘের ওপর আভিজাত্যময় রিসোর্ট ও দেশের সেরা সী-ভিউ ৫-তারকা হোটেলে হানিমুন কাটানোর সুযোগ।",
            highlights: ["কক্সবাজার মারমেইড বিচ ইকো রিসোর্ট", "সাজেক মেঘের বিলাসী ভিলা", "ইনানি প্রাইভেট ক্যান্ডেল লাইট ডিনার"],
            image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=400&q=80"
          }
        ];
      } else {
        suggestedDestinations = [
          {
            name: "Bali Island Romantic Gateway",
            banglaName: "বালি আইল্যান্ড (ইন্দোনেশিয়া)",
            description: "পাহাড়ি ঝর্ণা, সবুজ ধানের আইল ও ট্রপিক্যাল সমুদ্র সৈকতে প্রাইভেট সুইমিং পুলসহ হানিমুন ভিলা।",
            highlights: ["প্রাইভেট পুল ভিলা উইথ ফ্লোটিং ব্রেকফাস্ট", "উবুদ সুইং ও কাপল স্পা", "তানাহ লট সূর্যাস্ত দর্শন"],
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Maldives Overwater Paradise",
            banglaName: "মালদ্বীপ ওভারওয়াটার প্যারাডাইস",
            description: "বিশ্বের সেরা হানিমুন গন্তব্য। ওয়াটার রিসোর্ট থেকে সরাসরি ক্রিস্টাল ক্লিয়ার সমুদ্রে ঝাঁপ দেওয়ার দারুণ ট্রিপ।",
            highlights: ["ওয়াটার ভিলা ক্যান্ডেল ডিনার", "হাফ-বোর্ড প্রিমিয়াম ফুড", "সী-প্লেন রাইড এক্সপেরিয়েন্স"],
            image: "https://images.unsplash.com/photo-1514282401047-d895c5a21d13?auto=format&fit=crop&w=400&q=80"
          }
        ];
      }
    } else if (category === "umrah") {
      suggestedDestinations = [
        {
          name: "Makkah & Madinah Umrah Package",
          banglaName: "পবিত্র ওমরাহ কাস্টম প্যাকেজ (সৌদি আরব)",
          description: "সম্মানিত ওমরাহ পালনকারীদের জন্য ওয়ান-স্টপ বায়োমেট্রিক ই-ভিসা, নিকটবর্তী হোটেল ও এয়ার টিকিট প্যাকেজ।",
          highlights: ["কাবা শরীফের পাশে হোটেল বুকিং", "বিলাসবহুল ট্রান্সপোর্টেশন সাপোর্ট", "অভিজ্ঞ ট্রাভেল এসিস্ট্যান্স"],
          image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80"
        }
      ];
    } else {
      suggestedDestinations = [
        {
          name: "USA Tourist Visa & Tour Portfolio",
          banglaName: "আমেরিকা (নিউ ইয়র্ক ও ক্যালিফোর্নিয়া)",
          description: "কঠিন ভিসার জন্য সালমান শরীফের বিশেষ সঠিক কভার লেটার ও বুকিং প্রোটোকল সার্ভিস প্যাকেজ।",
          highlights: ["নিউ ইয়র্ক টাইমস স্কয়ার ট্যুর", "স্ট্যাচু অব লিবার্টি ক্রুজ", "সঠিক ভিসা ফাইল ও কভার লেটার প্রস্তুত"],
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Canada East Coast Explorer",
          banglaName: "কানাডা ভ্যাঙ্কুভার ও টরন্টো এক্সপ্লোরার",
          description: "মনোরম রকি মাউন্টেন, নায়াগ্রা জলপ্রপাত ও বিশ্বের অন্যতম শান্ত প্রকৃতির দেশে স্বপ্নের ভ্রমণ।",
          highlights: ["নায়াগ্রা জলপ্রপাত সী-ভিউ", "কানাডিয়ান ভিসা কনসালটেন্সি", "বেস্ট রুটিং ফ্লাইট টিকিট"],
          image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80"
        }
      ];
    }

    return {
      flights,
      visa,
      hotels,
      sightseeing,
      totalEstCost,
      daysCount,
      suggestedDestinations
    };
  }, [category, duration, standard, userBudget]);

  // Determine Budget Status
  const budgetStatus = useMemo(() => {
    const diff = userBudget - calculations.totalEstCost;
    if (diff >= 15000) {
      return {
        type: "success",
        title: "দারুণ বাজেট! (Under Budget)",
        desc: "আপনার বাজেটের মধ্যে সহজেই এই ভ্রমণটি সালমান শরীফের মাধ্যমে কমপ্লিট করা যাবে। কিছু বাড়তি সেভিংসও থাকবে!",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      };
    } else if (diff >= -15000) {
      return {
        type: "warning",
        title: "যথোপযুক্ত বাজেট (Perfect Match)",
        desc: "আপনার সেট করা বাজেট এবং আনুমানিক খরচের ব্যবধান খুবই নগণ্য। সালমান শরীফ সাশ্রয়ী বিমানের সিট বুকিং করে এই বাজেটের মধ্যে মিলাতে পারবেন!",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
      };
    } else {
      return {
        type: "danger",
        title: "বাজেট আরেকটু বাড়ানো প্রয়োজন",
        desc: "আপনার নির্বাচিত ক্যাটাগরিতে আনুমানিক খরচ আপনার নির্ধারিত বাজেটের চেয়ে বেশি। সাজেস্টেড প্যাকেজের মান সামান্য ইকোনমি করতে পারেন অথবা বাজেট বাড়াতে পারেন।",
        color: "text-red-400 bg-red-500/10 border-red-500/20"
      };
    }
  }, [userBudget, calculations.totalEstCost]);

  const handleWhatsAppInquiry = (destination: string) => {
    const durBeng = duration === "short" ? "৩-৫ দিন" : duration === "medium" ? "৭-১০ দিন" : "১১-১৫ দিন";
    const stdBeng = standard === "economy" ? "ইকোনমি" : standard === "standard" ? "স্ট্যান্ডার্ড" : "লাক্সারি / প্রিমিয়াম";
    
    const textMessage = `হ্যালো সালমান শরীফ ভাই, আমি আপনার ওয়েবসাইটের "ট্যুর বাজেট ক্যালকুলেটর" ব্যবহার করে আমার ট্যুর বাজেট হিসেব করেছি। \n\n📋 বিবরণ:\n- ট্যুর ক্যাটাগরি: ${categories.find(c => c.id === category)?.label || category}\n- লক্ষ্যবস্তু গন্তব্য: ${destination}\n- সময়কাল: ${durBeng} (${calculations.daysCount} দিন)\n- ট্যুর স্ট্যান্ডার্ড: ${stdBeng}\n- আমার বাজেট: ${userBudget.toLocaleString("bn-BD")} টাকা\n- আনুমানিক খরচ: ${calculations.totalEstCost.toLocaleString("bn-BD")} টাকা\n\nদয়া করে আমার এই বুকিং ও টিকিটিং সার্ভিস প্রসেসিং এর জন্য একটি সঠিক প্ল্যান ও সহযোগিতা প্রদান করবেন। ধন্যবাদ!`;
    const encoded = encodeURIComponent(textMessage);
    window.open(`${portfolioData.socialLinks.whatsapp}&text=${encoded}`, "_blank");
  };

  return (
    <div id="travel-budget-calculator-section" className="space-y-12">
      {/* Heading Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          স্মার্ট বাজেট প্ল্যানার
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
          ট্যুর বাজেট ক্যালকুলেটর ও সম্ভাব্য কস্ট গাইড
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
          আপনার পছন্দসই ট্রাভেল ক্যাটাগরি, দিন সংখ্যা এবং বাজেট সিলেক্ট করে মুহূর্তেই এয়ার টিকিট, ভিসা প্রসেসিং ও আনুমানিক খরচের সুবিন্যস্ত গাইড সংগ্রহ করুন।
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Inputs Form (col-span-5) */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#12162a] to-[#0c0e18] border border-white/10 p-5 sm:p-7 shadow-2xl space-y-6 text-left">
          
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <h3 className="text-md sm:text-lg font-bold text-white">ভ্রমণের প্যারামিটার নির্বাচন</h3>
          </div>

          {/* 1. Category selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              ১. ভ্রমণের ক্যাটাগরি (Travel Category)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 px-3 rounded-xl text-left border text-xs font-semibold flex items-center gap-2 transition-all ${
                    category === cat.id
                      ? "bg-primary text-dark-bg border-primary shadow-lg shadow-primary/25 font-bold"
                      : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/[0.06] hover:border-white/10"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.label.split(" (")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Duration Choice */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              ২. ভ্রমণের সময়কাল (Duration)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "short", label: "৩-৫ দিন", detail: "Short Trip" },
                { id: "medium", label: "৭-১০ দিন", detail: "Standard" },
                { id: "long", label: "১১-১৫ দিন", detail: "Long Stay" }
              ].map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setDuration(dur.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-all ${
                    duration === dur.id
                      ? "bg-accent text-dark-bg border-accent font-bold"
                      : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-xs font-bold">{dur.label}</div>
                  <div className={`text-[9px] font-medium opacity-75 ${duration === dur.id ? "text-dark-bg" : "text-gray-500"}`}>
                    {dur.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Class Standard */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              ৩. হোটেল ও ট্রাভেল স্ট্যান্ডার্ড
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "economy", label: "ইকোনমি", detail: "বাজেট ফ্রেন্ডলি" },
                { id: "standard", label: "স্ট্যান্ডার্ড", detail: "৩-স্টার প্লাস" },
                { id: "luxury", label: "লাক্সারি", detail: "৫-স্টার প্লাস" }
              ].map((std) => (
                <button
                  key={std.id}
                  onClick={() => setStandard(std.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-all ${
                    standard === std.id
                      ? "bg-gradient-to-r from-primary to-accent text-dark-bg border-transparent font-bold"
                      : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-xs font-bold">{std.label}</div>
                  <div className={`text-[9px] font-medium opacity-75 ${standard === std.id ? "text-dark-bg" : "text-gray-500"}`}>
                    {std.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Budget Slider input */}
          <div className="space-y-3.5 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                ৪. আপনার সর্বোচ্চ টার্গেট বাজেট
              </label>
              <span className="text-sm font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                ৳ {userBudget.toLocaleString("bn-BD")}
              </span>
            </div>
            
            <input
              type="range"
              min={25000}
              max={600000}
              step={5000}
              value={userBudget}
              onChange={(e) => setUserBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-primary border border-white/5"
            />
            
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>৳ ২৫,০০০</span>
              <span>৳ ৩,০০,০০০</span>
              <span>৳ ৬,০০,০০০</span>
            </div>
          </div>

        </div>

        {/* Right Side suggestion engine outputs (col-span-7) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Card Wrapper for cost outputs */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0c0e18] via-[#12162a] to-[#0d101e] border border-white/10 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Selected Profile Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary text-base">
                  ✈️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                    {categories.find(c => c.id === category)?.label.split(" (")[0]}
                    <span className="text-[10px] text-gray-400 font-normal">
                      • {calculations.daysCount} দিন ({standard === "economy" ? "ইকোনমি" : standard === "standard" ? "স্ট্যান্ডার্ড" : "লাক্সারি"})
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 font-light">প্রসেস ও বুকিং পার্টনার: সালমান শরীফ</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">আনুমানিক মোট খরচ</span>
                <span className="text-xl sm:text-2xl font-black text-white bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ৳ {calculations.totalEstCost.toLocaleString("bn-BD")}
                </span>
              </div>
            </div>

            {/* Dynamic visual bars showing cost breakdown */}
            <div className="space-y-4 pt-5">
              <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-accent" />
                ব্যয়ের আনুমানিক ব্রেকডাউন (Cost Splitup)
              </h5>

              {/* Bar 1: Flights */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-primary shrink-0 rotate-[45deg]" />
                    এয়ার টিকিট (Flight Booking)
                  </span>
                  <span className="text-white font-bold">৳ {calculations.flights.toLocaleString("bn-BD")}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (calculations.flights / calculations.totalEstCost) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  * IATA ফেয়ার কন্ডিশন অনুযায়ী সালমান শরীফের Sabre/Galileo অথোরিটি প্রাইস যুক্ত করা।
                </p>
              </div>

              {/* Bar 2: Visa */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    ভিসা প্রসেসিং ও এ্যাম্বেসি ফি (Visa Fee)
                  </span>
                  <span className="text-white font-bold">৳ {calculations.visa.toLocaleString("bn-BD")}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-orange-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (calculations.visa / calculations.totalEstCost) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  * কভার লেটার তৈরি, ডকুমেন্ট যাচাইকরণ ও সরাসরি সরকারি ভিসা পোর্টালের নিখুঁত ফি অন্তর্ভুক্ত।
                </p>
              </div>

              {/* Bar 3: Hotel */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    হোটেল ও নিরাপদ আবাসন ({calculations.daysCount} রাত)
                  </span>
                  <span className="text-white font-bold">৳ {calculations.hotels.toLocaleString("bn-BD")}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (calculations.hotels / calculations.totalEstCost) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Bar 4: Meals/Sightseeing */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-accent shrink-0" />
                    লোকাল সাইটসিইং, অভ্যন্তরীণ ট্যাক্সি ও আহার খরচ
                  </span>
                  <span className="text-white font-bold">৳ {calculations.sightseeing.toLocaleString("bn-BD")}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (calculations.sightseeing / calculations.totalEstCost) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Budget status alert matching indicator */}
            <div className={`mt-6 p-4 rounded-2xl border text-xs leading-relaxed transition-all duration-300 ${budgetStatus.color}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {budgetStatus.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                {budgetStatus.type === "warning" && <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />}
                {budgetStatus.type === "danger" && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                <span>{budgetStatus.title}</span>
              </div>
              <p className="font-light">{budgetStatus.desc}</p>
            </div>

          </div>

          {/* Dynamic Destination Suggestions Container */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-primary animate-spin-slow" />
              আপনার বাজেটের উপযুক্ত সম্ভাব্য ট্যুর প্ল্যান ও ডেস্টিনেশন
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {calculations.suggestedDestinations.map((dest, dIdx) => (
                  <motion.div
                    key={`${dest.name}-${dIdx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: dIdx * 0.1 }}
                    className="group/card rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all p-3.5 relative flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      {/* Image placeholder styled with CSS gradient or overlay */}
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-900 border border-white/5 relative">
                        <img 
                          src={dest.image} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-80"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                          <span className="text-[10px] font-semibold text-white tracking-wider flex items-center gap-1 bg-dark-bg/60 px-2 py-0.5 rounded-md backdrop-blur-md">
                            <MapPin className="w-2.5 h-2.5 text-primary shrink-0" />
                            {dest.name.split(" (")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover/card:text-primary transition-all">
                          {dest.banglaName}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-light leading-normal pt-1 h-12 overflow-hidden line-clamp-2">
                          {dest.description}
                        </p>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-1">
                        {dest.highlights.map((hl, hlIdx) => (
                          <div key={hlIdx} className="flex gap-1.5 items-center text-[10px] text-gray-300">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <button
                        onClick={() => handleWhatsAppInquiry(dest.banglaName)}
                        className="w-full py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-dark-bg font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-primary/20 hover:border-transparent"
                      >
                        কনসালটেন্সি বুক করুন
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

      {/* Helpful Hint box in Bangla */}
      <div className="p-4 rounded-2xl bg-[#12162a]/40 border border-white/5 text-xs text-gray-400 leading-relaxed text-left flex gap-3.5 items-start">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          💡
        </div>
        <div>
          <strong className="text-white">গুরুত্বপূর্ণ পরামর্শ:</strong> এই বাজেট ক্যালকুলেটরটি আপনাকে একটি সাধারণ ও সম্ভাব্য ধারণা দেওয়ার জন্য প্রস্তুত করা হয়েছে। লাইভ সিজনাল এয়ার টিকিটের মূল্য পরিবর্তন সাপেক্ষ। তাই আপনার ভ্রমণের নির্ধারিত তারিখ অনুসারে একদম সঠিক বিমান টিকিট কোটেশন ও ভিসা ডকুমেন্টস ফাইল যাচাই করতে সরাসরি সালমানের সাথে ফ্রী ওয়ান-অন-ওয়ান কন্সাল্টেন্সি করতে পারেন।
        </div>
      </div>
    </div>
  );
}
