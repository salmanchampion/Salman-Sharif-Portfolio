import React, { useState, useMemo } from "react";
import { portfolioData } from "../data";
import { 
  Check, 
  ClipboardList, 
  Plane, 
  MapPin, 
  PhoneCall, 
  ArrowUpRight, 
  Search, 
  Camera, 
  DollarSign, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Award,
  AlertCircle
} from "lucide-react";

interface VisaCountryData {
  country: string;
  engName: string;
  docs: string[];
  fee: string;
  photo: string;
  note: string;
}

export default function Services() {
  const [selectedVisaCountry, setSelectedVisaCountry] = useState<string>("thailand");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, Record<number, boolean>>>({});

  const visaChecklists: Record<string, VisaCountryData> = {
    thailand: {
      country: "থাইল্যান্ড (Thailand)",
      engName: "Thailand Thai Thailend",
      docs: [
        "কমপক্ষে ৬ মাস মেয়াদ সম্বলিত মূল পাসপোর্ট এবং পূর্বের পাসপোর্ট (যদি থাকে)",
        "বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট (ন্যূনতম ব্যালেন্স জনপ্রতি ৬০,০০০ টাকা)",
        "চাকরিজীবীদের জন্য NOC ও ভিজিটিং কার্ড; ব্যবসায়ীদের জন্য নোটারিকৃত ট্রেড লাইসেন্স কপি এবং কোম্পানির প্যাড",
        "ছাত্রদের জন্য স্টুডেন্ট আইডি কার্ড বা কন্সেন্ট লেটার",
        "কনফার্মকৃত বিমানের রিটার্ন টিকিট এবং হোটেল বুকিং ভাউচার কপি"
      ],
      fee: "৳ ৫,৫০০ (ভিসা এম্বাসি ফি + সালমান শরীফ প্রিমিয়াম প্রসেসিং চার্জ)",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ৮০% ফেস জুম, ল্যাব প্রিন্ট, ৩ মাসের বেশি পুরনো নয়)",
      note: "থাইল্যান্ড ট্যুরিস্ট ভিসার জন্য সঠিক ব্যাংক স্টেটমেন্ট কন্ডিশন ও কভার লেটার খুবই গুরুত্বপূর্ণ ভূমিকা রাখে।"
    },
    singapore: {
      country: "সিঙ্গাপুর (Singapore)",
      engName: "Singapore Singapur",
      docs: [
        "কমপক্ষে ৬ মাস মেয়াদসহ মূল পাসপোর্ট",
        "সিঙ্গাপুরের স্থানীয় নাগরিক বা এজেন্সির অথরাইজড অফিশিয়াল ইনভাইটেশন লেটার (LOI - Letter of Introduction)",
        "বিগত ৬ মাসের পার্সোনাল ব্যাংক স্টেটমেন্ট এবং ব্যাংক সলভেন্সি সার্টিফিকেট",
        "চাকরিজীবীদের জন্য নো-অবজেকশন সার্টিফিকেট (NOC), পে-স্লিপ ও ভিজিটিং কার্ড",
        "ব্যবসায়ীদের জন্য হালনাগাদ ট্রেড লাইসেন্স (ইংরেজি অনুবাদ ও নোটারি) এবং কোম্পানির অফিশিয়াল প্যাড"
      ],
      fee: "৳ ৫,৮০০ (সরকারি ই-ভিসা ফি + অথরাইজড এজেন্সী এবং সালমান শরীফ প্রসেসিং সার্ভিস চার্জ)",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ম্যাট বা সেমি-ম্যাট ফিনিশ, সীমানাহীন বর্ডারলেস ল্যাব প্রিন্ট)",
      note: "সিঙ্গাপুরের ই-ভিসা সাধারণত অনুমোদিত লোকাল স্পন্সর (LOI) এর মাধ্যমে করতে হয়, যা সালমান শরীফ নিজেই প্রসেস করে থাকেন।"
    },
    oman: {
      country: "ওমান (Oman)",
      engName: "Oman Omann",
      docs: [
        "ন্যূনতম ৬ মাস মেয়াদসহ অরিজিনাল পাসপোর্ট স্ক্যান কপি (স্পষ্ট)",
        "পাসপোর্ট সাইজ ছবি ও ন্যাশনাল আইডি কার্ড (NID) রঙিন কপি",
        "রিটার্ন কনফার্মড এয়ার টিকিট বুকিং (Galileo/Sabre PNR)",
        "হোটেল রিজার্ভেশন বুকিং কনফার্মেশন স্লিপ",
        "ভ্যাকসিন সার্টিফিকেট বা প্রাসঙ্গিক হেলথ ডিক্লারেশন"
      ],
      fee: "৳ ৯,৫০০ (১০ দিনের সিঙ্গেল এন্ট্রি ই-ভিসা ফি ও সার্ভিস চার্জ অন্তর্ভুক্ত)",
      photo: "৪x৬ সেমি (সাদা ব্যাকগ্রাউন্ড, কোন চশমা বা ক্যাপ পরিহিত ছবি গ্রহণযোগ্য নয়, নিখুঁত ল্যাব প্রিন্ট)",
      note: "ওমান ই-ভিসা শতভাগ নিশ্চিত প্রসেসিং করতে বিমানের টিকিট ও ট্রাভেল ইন্স্যুরেন্স সঠিকভাবে লিংক করতে হবে।"
    },
    ksa: {
      country: "সৌদি আরব (Saudi Arabia)",
      engName: "Saudi Arabia KSA Saudi Arab Omrah Hajj",
      docs: [
        "কমপক্ষে ৬ মাস মেয়াদসহ অরিজিনাল পাসপোর্ট",
        "সাদা ব্যাকগ্রাউন্ডে ২ কপি সদ্য তোলা পাসপোর্ট সাইজ ছবি (২/২ ইঞ্চি)",
        "কোভিড-১৯ ভ্যাকসিন সার্টিফিকেট (প্রয়োজনীয় ক্ষেত্রে)",
        "পরিবারের ক্ষেত্রে সম্পর্কের প্রমাণপত্র (যেমন ম্যারেজ সার্টিফিকেট)",
        "ওমরাহ বায়োমেট্রিক কনফার্মেশন স্লিপ (সৌদি ওমরাহ কর্তৃপক্ষের নির্দেশিত)"
      ],
      fee: "৳ ১৭,৫০০ থেকে ৳ ২১,৫০০ (ভিসা ক্যাটাগরি, ইন্স্যুরেন্স ও ভ্যালিডিটি সাপেক্ষে)",
      photo: "২x২ ইঞ্চি (সাদা ব্যাকগ্রাউন্ড, ল্যাব প্রিন্ট, ম্যাট ফিনিশ, ৮০% ফেস জুম)",
      note: "আমরা সরাসরি রিয়াদ/জেদ্দা হজ্ব-ওমরাহ ডিরেক্টরি ইন্টিগ্রেশনের মাধ্যমে স্বল্প সময়ে এই ওমরাহ বা ট্যুরিস্ট ই-ভিসা প্রসেস সম্পন্ন করি।"
    },
    uae: {
      country: "সংযুক্ত আরব আমিরাত - দুবাই (UAE - Dubai)",
      engName: "Dubai UAE United Arab Emirates Dubaii",
      docs: [
        "পাসপোর্টের প্রথম পৃষ্ঠার হাই-রেজোলিউশন রঙ্গিন স্ক্যান কপি (মোবাইল স্ক্যান গ্রহণযোগ্য নয়)",
        "সাদা ব্যাকগ্রাউন্ডের সদ্য তোলা ল্যাব প্রিন্ট রঙিন ছবি স্ক্যান কপি",
        "যদি আগে ভ্রমণের রেকর্ড থাকে তবে পূর্ববর্তী যেকোনো দেশের ভিসা এবং এক্সিট সিল কপি",
        "রিটার্ন বিমান টিকিট বুকিং ও হোটেল কনফার্মেশন বিবরণী"
      ],
      fee: "৳ ১৩,৫০০ (৩০ দিনের ট্যুরিস্ট ই-ভিসা) | ৳ ২৫,৫০০ (৬০ দিনের ই-ভিসা)",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ল্যাব ডিজিটাল স্ক্যান কপি, রঙিন)",
      note: "দুবাই ই-ভিসা সাধারণত ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ইস্যু হয়ে যায়। এটি অত্যন্ত দ্রুত ও ঝামেলাহীন সার্ভিস।"
    },
    malaysia: {
      country: "মালয়েশিয়া (Malaysia)",
      engName: "Malaysia Malasia Maleysia Maleysya",
      docs: [
        "কমপক্ষে ৬ মাস মেয়াদ সম্বলিত স্পষ্ট পাসপোর্ট স্ক্যান কপি ও মূল পাসপোর্ট",
        "বিগত ৩ মাসের উপযুক্ত পার্সোনাল ব্যাংক স্টেটমেন্ট (ন্যূনতম ব্যালেন্স জনপ্রতি ৮০,০০০ টাকা)",
        "চাকরিজীবীদের ক্ষেত্রে NOC ও ব্যবসায়ীদের জন্য হালনাগাদ ট্রেড লাইসেন্স নোটারী অনুবাদ",
        "কনফার্মড আপ-ডাউন এয়ার টিকিট কপি (Sabre/Galileo PNR)",
        "হোটেল বুকিং কনফার্মেশন পেজ ভাউচার"
      ],
      fee: "৳ ৫,২0০ (মালয়েশিয়া ই-ভিসা অফিশিয়াল ফি + প্রসেসিং চার্জ)",
      photo: "৩৫x৫০ মিমি (সাদা ব্যাকগ্রাউন্ড, স্টুডিও ল্যাব ডিজিটাল হাই-কোয়ালিটি প্রিন্ট, ৮০% ফেস জুম)",
      note: "সাধারণত ৩ থেকে ৫ কার্যদিবসের মধ্যে মালয়েশিয়ার ই-ভিসা শতভাগ সফলতার সাথে ইস্যু করা সম্ভব।"
    },
    schengen: {
      country: "শেনজেন ইউরোপ (Schengen Europe)",
      engName: "Schengen Europe France Germany Italy Switzerland Spain",
      docs: [
        "যথাযথভাবে পূরণকৃত শেনজেন ভিসা আবেদন ফর্ম ও ৩ মাসের ব্যাংক স্টেটমেন্ট",
        "বিগত ৬ মাসের ব্যাংক সলভেন্সি এবং ন্যূনতম ব্যালেন্স ৫ থেকে ৭ লক্ষ টাকা প্রতি ব্যক্তি",
        "চাকরিজীবীদের ক্ষেত্রে NOC, পে-স্লিপ এবং ব্যবসায়ীদের ক্ষেত্রে ট্রেড লাইসেন্স ও কোম্পানির অডিট রিপোর্ট",
        "৩০০০০ ইউরো কভারেজ সম্বলিত উপযুক্ত ট্রাভেল হেলথ ইন্স্যুরেন্স",
        "কনফার্মকৃত এয়ারলাইন্স বুকিং (বোর্ডড ট্রাভেল রুট) এবং হোটেল রিজার্ভেশন ভাউচার"
      ],
      fee: "৳ ১২,৫০০ (সালমান শরীফ কনসালটেন্সি ও ফাইল প্রস্তুতি চার্জ) + এম্বাসি ফি আলাদাভাবে এম্বাসিতে দিতে হবে",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ম্যাট ফিনিশ, ৮০% ফেস, দুই কান স্পষ্ট এবং কপাল দৃশ্যমান হতে হবে)",
      note: "শেনজেন ভিসার জন্য ফাইল রেডি করার ক্ষেত্রে আমাদের সাফল্যের হার অত্যন্ত ঈর্ষণীয়। আমরা ডকুমেন্টস পারফেক্টলি সাজিয়ে দিই।"
    },
    ukgb: {
      country: "যুক্তরাজ্য (UK Visitor Visa)",
      engName: "UK United Kingdom Great Britain England London",
      docs: [
        "বায়োমেট্রিক পাসপোর্ট এবং বিগত সকল বাতিলকৃত বা পুরনো পাসপোর্টের কপি",
        "উৎস সহ পূর্ণাঙ্গ ট্যাক্স রিটার্ন ফাইল (Tax Return) এবং সম্পদ মূল্যায়ন বিবরণী",
        "যুক্তরাজ্যে ভ্রমণের বিস্তারিত ট্রাভেল আইটেনারী ও ইউনিক কভারিং লেটার",
        "স্পন্সরের ক্ষেত্রে আমন্ত্রণপত্র এবং স্পন্সরশিপের আর্থিক বিবরণী",
        "পারিবারিক সম্পর্কের প্রমাণপত্র ও ন্যাশনাল আইডি বা জন্ম নিবন্ধন সার্টিফিকেট"
      ],
      fee: "৳ ১৫,০০০ (কনসালটেন্সি ও ফাইল প্রস্তুতি ফি) + অফিশিয়াল এম্বাসি ভিজিটর ফি",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ম্যাট প্রিন্ট, ৩ মাসের কম সময়ের ছবি, কপাল ও কান আবৃত নয়)",
      note: "UK ভিজিটর ভিসার জটিল ফাইল প্রসেসিং এবং সঠিক ড্রাফট রিপ্রেজেন্টেশনে আমরা সম্পূর্ণ পেশাদার সহায়তা দিই।"
    },
    usa: {
      country: "যুক্তরাষ্ট্র (USA B1/B2 Visa)",
      engName: "USA United States America New York California Washington US",
      docs: [
        "সফলভাবে পুরণকৃত DS-160 অফিশিয়াল অনলাইন কনফার্মেশন পেইজ",
        "ইউএস এম্বাসি ফী পেমেন্ট স্লিপ ও ইন্টারভিউ অ্যাপয়েন্টমেন্ট কনফার্মেশন লেটার",
        "ভ্রমণের উদ্দেশ্য ও পেশাগত ব্যাকগ্রাউন্ড স্পষ্ট করে কাস্টম কভার লেটার",
        "আর্থিক স্বচ্ছলতার প্রমাণস্বরূপ যাবতীয় ব্যাংক স্টেটমেন্ট, এফডিআর ও ডিক্লারেশন",
        "চাকরিজীবী হলে NOC ও ৩ মাসের পে-স্লিপ; ব্যবসায়ী হলে ট্রেড লাইসেন্স ও কোম্পানির লেটারহেড প্যাড"
      ],
      fee: "৳ ১৮,৫০০ (DS-160 ফর্ম পূরণ, মক ইন্টারভিউ সেশন প্রিপারেশন, ফাইল মেকিং সার্ভিস চার্জ) + ইউএস এম্বাসি সরকারি ফি আলাদা",
      photo: "২x২ ইঞ্চি (৫১x৫১ মিমি), সাদা ব্যাকগ্রাউন্ড, চশমা ছাড়া, কান স্পষ্ট, হাই-রেজোলিউশন ছবি",
      note: "ইউএসএ ভিসার প্রধান ধাপ হলো ইন্টারভিউ। আমরা প্রতিটি ক্লায়েন্টকে রিয়েল ওয়ার্ল্ড মক ইন্টারভিউ সেশন প্রিপারেশন দিই।"
    },
    turkey: {
      country: "তুরস্ক (Turkey Sticker Visa)",
      engName: "Turkey Turkiye Istanbul",
      docs: [
        "কমপক্ষে ৭ মাস মেয়াদসহ অরিজিনাল পাসপোর্ট এবং পূর্বের পাসপোর্টসমূহ",
        "বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি (কোম্পানি এবং ব্যক্তিগত)",
        "চাকরিজীবীদের জন্য NOC, পে-স্লিপ, সরকারি চাকরিজীবী হলে জিও (GO) কপি",
        "ব্যবসায়ীদের জন্য কোম্পানির ট্রেড লাইসেন্স অনুবাদ ও নোটারি কপি",
        "পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (কিছু ক্ষেত্রে বিশেষ কন্ডিশন)",
        "ট্রাভেল ইন্স্যুরেন্স এবং হোটেল বুকিং স্লিপ"
      ],
      fee: "৳ ১৬,৫০০ (টার্কিশ অথরাইজড সাবমিশন সেন্টার ফি + সরকারি এম্বাসি ফি + সালমান শরীফ ফাইল প্রসেসিং)",
      photo: "৩৫x৪৫ মিমি (সাদা ব্যাকগ্রাউন্ড, ম্যাট বা সেমি-ম্যাট ফিনিশ, দুই কান দৃশ্যমান এবং হাসিমুখ নয়)",
      note: "তুরস্কের স্টিকার ভিসা ঢাকাস্থ এজেন্সির মাধ্যমে জমা দিতে হয়। সালমান শরীফ ফাইলটি রিজেকশন-ফ্রি করে সাজিয়ে দেবেন।"
    },
    india: {
      country: "ভারত (India - IVAC Visa)",
      engName: "India Bharat Delhi Kolkata Sikkim Kashmir Visa",
      docs: [
        "অনলাইন আবেদন ফর্মের প্রিন্ট কপি এবং কমপক্ষে ৬ মাস মেয়াদের পাসপোর্ট",
        "বিদ্যুৎ বিল/গ্যাস বিল/টেলিফোন বিলের কপি (হালনাগাদ ৩ মাসের)",
        "ব্যাংক স্টেটমেন্ট (ন্যূনতম ব্যালেন্স ২০,০০০ টাকা) অথবা ১৫০ ডলারের এন্ডোর্সমেন্ট স্লিপ",
        "পেশাজীবীদের জন্য NOC বা ব্যবসায়ীদের জন্য নোটারিকৃত ট্রেড লাইসেন্স"
      ],
      fee: "৳ ১,২০০ (ইভ্যাক পোর্টাল এন্ট্রি ফি ও আমাদের সালমান শরীফ ফাইল মেকিং কন্সাল্টেন্সি চার্জ)",
      photo: "২x২ ইঞ্চি (সাদা ব্যাকগ্রাউন্ড, রঙিন ছবি, দুই কান এবং পুরো মুখ স্পষ্টভাবে দৃশ্যমান হতে হবে)",
      note: "ভারতের আইভ্যাক পোর্টেলে দ্রুত সাবমিশন করতে বিদ্যুৎ বিলের ঠিকানা ও পাসপোর্টের ঠিকানার হুবহু মিল থাকতে হবে।"
    }
  };

  // Popular quick select list
  const popularCountries = ["thailand", "singapore", "oman", "ksa", "uae", "malaysia"];

  // Filter countries by search query
  const filteredCountriesList = useMemo(() => {
    return Object.entries(visaChecklists).filter(([key, value]) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        value.country.toLowerCase().includes(query) ||
        value.engName.toLowerCase().includes(query) ||
        key.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const currentChecklist = visaChecklists[selectedVisaCountry] || visaChecklists.thailand;

  // Toggle document checklist
  const handleToggleDoc = (idx: number) => {
    setCheckedDocs((prev) => {
      const countryDocs = prev[selectedVisaCountry] || {};
      return {
        ...prev,
        [selectedVisaCountry]: {
          ...countryDocs,
          [idx]: !countryDocs[idx]
        }
      };
    });
  };

  // Calculate readiness statistics
  const currentCheckedCount = useMemo(() => {
    const countryDocs = checkedDocs[selectedVisaCountry] || {};
    return Object.values(countryDocs).filter(Boolean).length;
  }, [checkedDocs, selectedVisaCountry]);

  const totalDocsCount = currentChecklist.docs.length;
  const progressPercent = Math.round((currentCheckedCount / totalDocsCount) * 100);

  return (
    <section id="services-section" className="py-20 lg:py-28 px-4 bg-[#0a0e1a] relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            আমার সেবাসমূহ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            প্রিমিয়াম ট্রাভেল ও টেকনোলজি সার্ভিসেস
          </h2>
          <p className="text-gray-400 text-sm font-light">
            আমি সর্বোচ্চ দক্ষতা ও নির্ভরযোগ্যতার সাথে আন্তর্জাতিক বিমান টিকেটিং, হজ্জ-ওমরাহ গাইড এবং ভিসার যাবতীয় বিষয় সমাধান করে থাকি।
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {(portfolioData?.services || []).map((service) => (
            <div
              id={`service-card-${service.id}`}
              key={service.id}
              className="rounded-2xl glass-panel p-6 bg-[#111625]/60 hover:bg-[#111625]/90 border border-white/5 hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/10 to-secondary-grad/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                  <i className={`${service.icon || "fa-solid fa-plane"} text-lg text-primary`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-all">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {(service.features || []).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instant WhatsApp Inquiry connection for each service */}
              <a
                href={`${portfolioData.socialLinks.whatsapp}?text=হ্যালো সালমান শরীফ, আমি আপনার "${service.title}" সেবাটি সম্পর্কে বিস্তারিত জানতে আগ্রহী।`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/5 hover:border-primary/30 transition-all mt-4 text-xs font-semibold text-center text-gray-300 hover:text-white flex items-center justify-center gap-1.5"
              >
                ইনকোয়ারী করুন
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </a>
            </div>
          ))}
        </div>

        {/* Interactive Visa Checklist Block */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d101e] to-[#0a0c16] border border-white/10 shadow-2xl text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="space-y-8">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-accent">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider">ডাইনামিক ভিসা ডিরেক্টরি</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  দেশ সিলেক্ট করুন ও তাৎক্ষণিক চেকলিস্ট দেখুন
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl leading-relaxed">
                  আপনার ভ্রমণের কাঙ্ক্ষিত দেশ সিলেক্ট করুন। প্রয়োজনীয় কাগজপত্র, সঠিক ফটো সাইজ রিকোয়ারমেন্ট এবং প্রসেসিং ফি এক ক্লিকেই সুবিন্যস্তভাবে জেনে নিন।
                </p>
              </div>
              
              {/* Country Selection Dropdown Controller */}
              <div className="relative w-full md:w-80 shrink-0">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  দেশ খুঁজুন বা নির্বাচন করুন (Select Country)
                </label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full py-3 pl-10 pr-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 text-xs text-white font-semibold flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <span>{currentChecklist.country}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>

                  {/* Dropdown panel */}
                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 rounded-2xl bg-[#0c0e18] border border-white/10 shadow-2xl p-2.5 space-y-2 max-h-64 overflow-y-auto">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="টাইপ করুন... (যেমন: ওমান, থাইল্যান্ড)"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/5 focus:border-primary text-white placeholder-gray-500 focus:outline-none mb-1.5"
                        onClick={(e) => e.stopPropagation()}
                      />
                      
                      <div className="space-y-1">
                        {filteredCountriesList.length > 0 ? (
                          filteredCountriesList.map(([key, val]) => (
                            <button
                              key={key}
                              onClick={() => {
                                setSelectedVisaCountry(key);
                                setIsDropdownOpen(false);
                                setSearchQuery("");
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                                selectedVisaCountry === key
                                  ? "bg-primary text-dark-bg font-bold"
                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span>{val.country}</span>
                              {selectedVisaCountry === key && <Check className="w-3.5 h-3.5 text-dark-bg" />}
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-4 text-xs text-gray-500">কোন দেশ পাওয়া যায়নি।</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Badges of Popular Countries */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">জনপ্রিয় দেশসমূহ:</span>
              {popularCountries.map((popKey) => {
                const item = visaChecklists[popKey];
                if (!item) return null;
                return (
                  <button
                    key={popKey}
                    onClick={() => {
                      setSelectedVisaCountry(popKey);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                      selectedVisaCountry === popKey
                        ? "bg-primary/20 text-primary border-primary/40 shadow-sm"
                        : "bg-white/[0.02] text-gray-400 border-white/5 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {item.country.split(" (")[0]}
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Details Layout Grid (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              
              {/* Left Column: Required Documents with Checklist Interaction */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex justify-between items-center pb-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    প্রয়োজনীয় কাগজপত্র ({totalDocsCount}টি আবশ্যক)
                  </h4>
                  {/* Readiness Progress Indicator */}
                  <span className="text-[11px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                    {currentCheckedCount} / {totalDocsCount} প্রস্তুত
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>প্রস্তুতি হার: {progressPercent}%</span>
                    <span>{progressPercent === 100 ? "দারুণ! সব রেডি" : "চেক বক্সে টিক দিয়ে যাচাই করুন"}</span>
                  </div>
                </div>

                {/* Checklist Cards */}
                <div className="space-y-2 pt-2">
                  {currentChecklist.docs.map((doc, idx) => {
                    const isChecked = !!(checkedDocs[selectedVisaCountry]?.[idx]);
                    return (
                      <div 
                        key={idx}
                        onClick={() => handleToggleDoc(idx)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked 
                            ? "bg-primary/[0.04] border-primary/30 shadow-md shadow-primary/[0.02]" 
                            : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          isChecked 
                            ? "bg-primary border-primary text-dark-bg" 
                            : "border-white/20 bg-transparent text-transparent group-hover:border-white/30"
                        }`}>
                          <Check className="w-3.5 h-3.5 font-bold stroke-[3px]" />
                        </div>
                        <span className={`text-xs sm:text-sm transition-all leading-relaxed ${
                          isChecked ? "text-white font-medium" : "text-gray-300 font-light"
                        }`}>
                          {doc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Processing Fee, Photo Specifications & Pre-Consultation */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Processing Fee Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12162a]/50 to-[#0e101a]/50 border border-white/5 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-300">আনুমানিক প্রসেসিং ও এ্যাম্বেসি ফি</h5>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {currentChecklist.fee}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    * অফিশিয়াল সরকারি চার্জ ও কুরিয়ার ফি সাপেক্ষে প্রসেসিং টাইমে পরিবর্তন বা সামান্য তারতম্য হতে পারে।
                  </p>
                </div>

                {/* 2. Photo Specs Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12162a]/50 to-[#0e101a]/50 border border-white/5 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Camera className="w-4 h-4 text-orange-400" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-300">ছবি রিকোয়ারমেন্টস (Photo Rules)</h5>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-gray-300 font-light leading-relaxed">
                    {currentChecklist.photo}
                  </div>
                  <div className="text-[10px] text-gray-500 leading-normal flex gap-1 items-start">
                    <AlertCircle className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                    <span>৩ মাসের বেশি পুরোনো বা পূর্বে অন্য কোনো ভিসায় ব্যবহৃত ছবি গ্রহণযোগ্য নয়।</span>
                  </div>
                </div>

                {/* 3. Pre-Consultation CTA card with WhatsApp integration */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/25 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <h5 className="text-xs font-bold uppercase tracking-wider text-white">সালমান শরীফ অ্যাসিস্ট্যান্স</h5>
                    </div>
                    <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                      * {currentChecklist.note}
                    </p>
                    
                    <a
                      href={`${portfolioData.socialLinks.whatsapp}?text=হ্যালো সালমান শরীফ ভাই, আমি আপনার ওয়েবসাইট থেকে "${currentChecklist.country}" এর visa checklist দেখেছি। আমার ${currentCheckedCount}/${totalDocsCount}টি ফাইল প্রস্তুত আছে। দয়া করে ফাইলগুলো চেক করে প্রসেস করতে সাহায্য করুন।`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-dark-bg font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 stroke-[2.5]" />
                      ফাইল যাচাই ও সাবমিট করুন
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
