import { PortfolioData } from "./types";

const defaultPortfolioData: PortfolioData = {
  name: "সালমান শরীফ",
  englishName: "Salman Sharif",
  title: "পেশাদার এয়ার টিকেটিং এক্সপার্ট ও ট্রাভেল কনসালট্যান্ট",
  subtitles: [
    "এয়ার টিকেটিং এক্সপার্ট",
    "ট্রাভেল কনসালট্যান্ট",
    "হজ্জ ও ওমরাহ স্পেশালিস্ট",
    "ভিসা প্রসেসিং কনসালট্যান্ট",
    "GDS স্পেশালিস্ট (Sabre, Galileo, Amadeus)",
    "ট্রাভেল টেকনোলজি প্রফেশনাল"
  ],
  tagline: "আন্তর্জাতিক ও অভ্যন্তরীণ বিমান টিকেটিং, Hajj & Umrah, Visa Processing এবং Travel Technology Solutions-এর নির্ভরযোগ্য অংশীদার।",
  phone: "+8801901922368",
  email: "mohammadsalmansharif37@gmail.com",
  location: "নয়া পল্টন, ঢাকা, বাংলাদেশ",
  institution: "চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস",
  profileImage: "https://i.postimg.cc/d0xGRhzG/1731592803581-1-4-removebg-preview.png",
  cvUrl: "#", // Click will trigger PDF generation or visual CV Resume view modal!
  
  services: [
    {
      id: "intl-domestic-ticketing",
      title: "আন্তর্জাতিক ও অভ্যন্তরীণ এয়ার টিকেটিং",
      description: "Sabre GDS, Galileo GDS এবং Amadeus GDS ব্যবহার করে সর্বনিম্ম মূল্যে বিশ্বের যেকোনো রুটের এয়ার টিকিট বুকিং ও ইস্যু সুবিধা। ওয়ান-ওয়ে, রাউন্ড ট্রিপ এবং জটিল মাল্টি-সিটি ট্রিপ সুনিপুণভাবে বুকিং করা হয়।",
      icon: "fa-solid fa-plane-departure",
      features: ["ওয়ান-ওয়ে ও রাউন্ড ট্রিপ টিকিট", "মাল্টি-সিটি জটিল বুকিং", "ইন-স্ট্যান্ট সিট ও মিল সিলেকশন", "সহজ রি-ইস্যু ও রিফান্ড ম্যানেজমেন্ট"]
    },
    {
      id: "hajj-umrah",
      title: "হজ্জ ও ওমরাহ প্যাকেজ",
      description: "সম্মানিত হাজীদের জন্য প্রফেশনাল গাইডেন্স, মানসম্মত হোটেল ও বিমান টিকিটসহ নির্ভরযোগ্য ও কাস্টমাইজড হজ্জ এবং ওমরাহ প্যাকেজ সেবা। আমরা প্রতিটি ইবাদত নিশ্চিন্তে সম্পন্ন করার ব্যবস্থার করার চেষ্টা করি।",
      icon: "fa-solid fa-kaaba",
      features: ["পছন্দমতো ক্যাটাগরির হোটেল বুকিং", "সবচেয়ে সুবিধাজনক এয়ারলাইন্সের টিকিট", "জেদ্দা/মদিনা এয়ারপোর্ট ট্রান্সফার সাপোর্ট", "নিখুঁত হজ্ব ও ওমরাহ গাইডেন্স"]
    },
    {
      id: "visa-processing",
      title: "ভিসা প্রসেসিং সার্ভিস",
      description: "বিশ্বের বিভিন্ন দেশের সঠিক ও দ্রুত ভিসা প্রসেস করার অভিজ্ঞতা। প্রফেশনাল ডকুমেন্ট চেক, ফাইল প্রস্তুত, কভার লেটার লিখন ও ইন্টারভিউ গাইড সাপোর্ট সহ ভিসা প্রাপ্তি সহজ করতে আমরা কাজ করি।",
      icon: "fa-solid fa-passport",
      features: ["ট্যুরিস্ট ও বিজনেস ভিসা ফাইল প্রিপারেশন", "আমন্ত্রণপত্র এবং ট্রাভেল ইন্স্যুরেন্স সাপোর্ট", "ইন্টারভিউ এবং বায়োমেট্রিক স্লট বুকিং", "সরাসরি ডকুমেন্ট চেক লিস্ট সরবরাহ"]
    },
    {
      id: "hotel-reservations",
      title: "হোটেল রিজার্ভেশন",
      description: "আপনার চাহিদামতো এবং বাজেট ফ্রেন্ডলি আরামদায়ক আন্তর্জাতিক ও ঘরোয়া হোটেল রুম সহজে এবং তাত্ক্ষণিক নিশ্চয়তাসহ বুকিং করার নির্ভরযোগ্য সেবা।",
      icon: "fa-solid fa-hotel",
      features: ["বিশ্বব্যাপী হোটেল বুকিং সুবিধা", "৫ তারকা থেকে বাজেট ফ্রেন্ডলি হোটেল ক্যাটাগরি", "তাত্ক্ষণিক বুকিং রসিদ", "গ্রুপ ডিসকাউন্ট বুকিং"]
    },
    {
      id: "travel-insurance",
      title: "ট্রাভেল ইন্স্যুরেন্স",
      description: "বিদেশ ভ্রমণের সময় যেকোনো অপ্রত্যাশিত দুর্ঘটনা, লাগেজ হারানো কিংবা চিকিৎসাজনিত জরুরি পরিস্থিতির খরচ বহনের জন্য সঠিক দেশের জন্য উপযুক্ত ট্রাভেল ইন্স্যুরেন্স সুবিধা।",
      icon: "fa-solid fa-shield-halved",
      features: ["শেনজেন ও মার্কিন স্ট্যান্ডার্ড ইন্স্যুরেন্স", "মেডিকেল ইমার্জেন্সি কভারেজ", "ফ্লাইট ক্যাবিনেট/লাগেজ বিলম্ব সাপোর্ট", "সহজ এবং দ্রুত পলিসি আপডেট"]
    },
    {
      id: "corporate-travel",
      title: "কর্পোরেট ট্রাভেল সল্যুশন",
      description: "প্রতিষ্ঠানসমূহের বার্ষিক ও নিয়মিত ভ্রমণের ব্যয় সাশ্রয়ের জন্য নিখুঁত কর্পোরেট ভ্রমণ ম্যানেজমেন্ট। সাশ্রয়ী প্যাকেজ ও মাসিক অ্যাকাউন্ট বিলিং পদ্ধতিতে পেশাদার সেবা প্রদান করা হয়।",
      icon: "fa-solid fa-briefcase",
      features: ["মাসিক ট্রাভেল স্টেটমেন্টস", "কর্পোরেট কাস্টম ডিল ও ছাড়", "২৪/৭ ইমার্জেন্সি কল ও সাপোর্ট ডেস্ক", "পরিবারের সুবিধাজনক ভ্রমণ সমন্বয়"]
    },
    {
      id: "group-booking",
      title: "গ্রুপ টিকিট এবং ট্যুর প্ল্যানিং",
      description: "পরিবার, প্রতিষ্ঠান বা বন্ধুদের সাথে দলগত ভ্রমণের জন্য বিশেষ গ্রুপ ডিসকাউন্ট সুবিধা এবং সম্পূর্ণ কাস্টমাইজ ট্যুর প্ল্যান তৈরি করে দেওয়ার বিশ্বস্ত সহযোগী।",
      icon: "fa-solid fa-users",
      features: ["কমপক্ষে ১০ জনের দলগত বুকিং ছাড়", "সম্পূর্ণ ট্রানজিট ও চার্টার ব্যাকআপ", "পেশাদার ট্যুর গাইড এবং ফুড অ্যারেঞ্জমেন্ট", "কাস্টমাইজড ইভেন্ট ও টিম-বিল্ডিং অ্যাক্টিভিটি"]
    },
    {
      id: "agency-web-dev",
      title: "ট্রাভেল এজেন্সী ওয়েবসাইট উন্নয়ন",
      description: "ট্রাভেল এজেন্সি ও বুকিং পোর্টাল ডেভেলপমেন্টের জন্য বিশেষ WordPress এবং Blogger থিম কাস্টমাইজেশন সার্ভিস। যেখানে টিকিট এপিআই, পেমেন্ট গেটওয়ে এবং কাস্টমার ডাটাবেজ ইন্টিগ্রেট থাকবে।",
      icon: "fa-solid fa-laptop-code",
      features: ["রিয়েল-টাইম কুয়েরি এবং ফর্ম", "ইউজার ফ্রেন্ডলি রেসপন্সিভ ডিজাইন", "সহজ এডমিন কন্ট্রোল ও ড্যাশবোর্ড", "এসইও অপ্টিমাইজড ফাস্ট লোডিং"]
    },
    {
      id: "ai-automation",
      title: "AI অটোমেশন সল্যুশন",
      description: "ট্রাভেল এজেন্সীর দৈনন্দিন কার্যক্রম পরিচালনা করতে এআই টুলের মাধ্যমে মেসেজ রিপ্লাই অটোমেশন, সোশ্যাল মিডিয়া কন্টেন্ট ডিজাইন এবং প্রম্পট ইঞ্জিনিয়ারিং ইন্টিগ্রেশন সল্যুশন।",
      icon: "fa-solid fa-robot",
      features: ["এআই চালিত মেসেঞ্জার বট ও কাস্টমার রেসপন্স", "সহজ কনটেন্ট ক্রিয়েশন প্রম্পট", "অটোমেটেড ইমেইল ক্যাম্পেইন সেটআপ", "ম্যানুয়াল ডাটাবেজ প্রসেস অটোমেশন"]
    }
  ],

  skillCategories: [
    {
      categoryName: "এয়ার টিকেটিং ও ট্রাভেল GDS দক্ষতা",
      icon: "fa-solid fa-plane-departure",
      skills: [
        { name: "Sabre GDS", level: 96 },
        { name: "Galileo GDS", level: 94 },
        { name: "Amadeus GDS", level: 90 },
        { name: "IATA Air Ticketing Rules", level: 92 },
        { name: "PNR Creation & Managing", level: 98 },
        { name: "Reissue & Refund Process", level: 95 },
        { name: "Fare Calculation & Split PNR", level: 93 },
        { name: "Multi-City Complex Booking", level: 91 }
      ]
    },
    {
      categoryName: "ভ্রমণ ব্যবস্থাপনা ও ক্লায়েন্ট কনসালট্যান্সি",
      icon: "fa-solid fa-passport",
      skills: [
        { name: "Visa File & Documents Processing", level: 95 },
        { name: "Hajj & Umrah Tour Operations", level: 97 },
        { name: "Corporate Travel Planning", level: 90 },
        { name: "Hotel & Resort Group Sourcing", level: 88 },
        { name: "Travel Insurance Documentation", level: 92 },
        { name: "Client Dispute & Instant Support", level: 96 }
      ]
    },
    {
      categoryName: "সহায়ক ডিজিটাল ও টেকনোলজি স্কিল",
      icon: "fa-solid fa-code",
      skills: [
        { name: "WordPress Premium Theme Development", level: 85 },
        { name: "Blogger Custom Template Customization", level: 90 },
        { name: "AI Prompt Engineering & GPT Automation", level: 88 },
        { name: "Microsoft Word (Document Drafting)", level: 95 },
        { name: "Microsoft Excel (Fare Sheets, Ledger)", level: 92 }
      ]
    }
  ],

  projects: [
    {
      id: "travel-agency-web",
      title: "মডার্ন ট্রাভেল এজেন্সী ওয়েব পোর্টাল",
      description: "রিয়েল-টাইম ফ্লাইট ওভারভিউ, কান্ট্রি ইনফো, টিকিট বুকিং ফর্ম এবং হোয়াটসঅ্যাপ সংযোগ সমৃদ্ধ ট্রাভেল সেবার জন্য প্রিমিয়াম ডার্ক/লাইট ইন্টারফেস সমৃদ্ধ ওয়ান-স্টপ ওয়েবসাইট।",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
      tags: ["WordPress", "Custom Design", "Live Query System", "Travel Technology"],
      liveLink: "https://championtravelsbd.com",
      githubLink: "#",
      details: "WordPress দিয়ে তৈরি Champion Travels-এর ডিজাইন কোড যেখানে কাস্টম সিএসএস, প্রফেশনাল হেডার ও বুকিং ইউআই যুক্ত রয়েছে।"
    },
    {
      id: "hajj-umrah-booking-web",
      title: "হজ্জ ও ওমরাহ ইন্টারেক্টিভ কাস্টম ওয়েবসাইট",
      description: "মুমিনদের জন্য প্যাকেজ ফিল্টারিং অপশন, ক্যাটাগরি অনুসারে হোটেল দূরত্ব ক্যালকুলেটর, হজ্জ যাত্রীর তথ্য ফর্ম সহ একটি সম্পূর্ণ আধ্যাত্মিক এবং পেশাদার ডিজাইনের বুকিং প্ল্যাটফর্ম।",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      tags: ["Blogger Custom", "CSS Grid", "Clean Layout", "Smooth Transitions"],
      liveLink: "#",
      githubLink: "#",
      details: "এই প্রোজেক্টে ব্লগার টেমপ্লেট ব্যবহার করে অত্যন্ত লাইটওয়েট এবং ফাস্ট-লোডিং হজ্জ বুকিং ল্যান্ডিং পেজ তৈরি করা হয়েছে।"
    },
    {
      id: "visa-processing-web",
      title: "ভিসা প্রসেস অ্যাসিস্ট্যান্স হাব",
      description: "ভিপি চেকলিস্ট জেনারেটর প্ল্যাটফর্ম। যেখানে ইউজার যে দেশে যেতে চান তা সিলেক্ট করলে সে দেশের ট্যুরিস্ট বা স্টুডেন্ট ভিসার জন্য প্রয়োজনীয় ডকুমেন্টের তালিকা নিখুঁতভাবে ডিসপ্লে করে।",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      tags: ["React-JS", "Tailwind CSS", "Filter API", "Responsive Interface"],
      liveLink: "#",
      githubLink: "#",
      details: "একটি সম্পূর্ণ ডিজিটাল ডিরেক্টরি যা শেনজেন, কান্ট্রি গ্রুপ ও মধ্যপ্রাচ্যের ভিসার যাবতীয় ফর্ম ফিলাপ ম্যানুয়াল গাইড প্রদান করে।"
    },
    {
      id: "corporate-travel-mgmt-web",
      title: "কর্পোরেট ট্রাভেল ম্যানেজমেন্ট ড্যাশবোর্ড",
      description: "ব্যবসায়িক ট্রিপের হিসেব রাখা, গ্রুপ টিকিট বুকিং রিকোয়েস্ট উইজেট, ডেডিকেটেড সাপোর্ট টিকিটিং মেকানিজম এবং মাসিক ট্রাভেল কস্ট এস্টিমেটর টুলস।",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      tags: ["WordPress Elementor", "Cost Estimator", "Client Dashboard"],
      liveLink: "#",
      githubLink: "#",
      details: "কর্পোরেট ট্র্যাভেলারদের জন্য মাল্টিপল লাগেজ ক্যালকুলেটর এবং ইনস্ট্যান্ট রি-ইস্যু ফর্ম যুক্ত করা হয়েছে এই ইন্টারফেসে।"
    },
    {
      id: "professional-portfolio",
      title: "এক্সক্লুসিভ প্রফেশনাল পোর্টফোলিও ওয়েবসাইট",
      description: "সালমান শরীফের ক্যারিয়ার প্রোফাইল প্রদর্শনের জন্য ২০২৩-২০২৬ মেয়াদে নির্মিত ওয়ান-স্টপ রেসপন্সিভ গ্লাসমরফিক ডিজাইন। যা দ্রুত লোড হয় এবং প্রফেশনাল ক্রেডিবিলিটি ফুটিয়ে তোলে।",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Motion Animation", "Tailwind v4", "Hind Siliguri Font"],
      liveLink: "https://mohammadsalmansharif.com",
      githubLink: "#",
      details: "সম্পূর্ণ ইউজার ফ্রেন্ডলি এবং রেসপন্সিভ সিঙ্গেল ফাইল ও রেন্ডারিং মেকানিজম সমৃদ্ধ পোর্টফোলিও আর্কিটেকচার।"
    },
    {
      id: "blogger-custom-theme",
      title: "ব্লগার প্রিমিয়াম ট্রাভেল অ্যান্ড নিউজ থিম",
      description: "ব্লগিং মাধ্যমে ট্রাভেল বুকিংয়ের পাশাপাশি আধুনিক লেআউট সম্বলিত কাস্টম ब्लॉगर টেমপ্লেট। যা এসইও ফ্রেন্ডলি, ফাস্ট লোড এবং বিজ্ঞাপনের জন্য সম্পূর্ণ রেডি।",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      tags: ["Blogger XML", "Ad-Ready", "Ultra Fast-load", "Clean-coded"],
      liveLink: "#",
      githubLink: "#",
      details: "মোবাইল স্কোর ৯৯% সম্বলিত একটি ব্লগার থিম যা রেগুলার ব্লগ বা সার্ভিস সল্যুশনের জন্য একদম নিখুঁত।"
    }
  ],

  experiences: [
    {
      id: "exp-1",
      company: "চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস",
      role: "সিনিয়র এয়ার টিকেটিং কনসাল্ট্যান্ট ও ট্রাভেল টেকনোলজি প্রফেশনাল",
      duration: "২০২২ - বর্তমান",
      description: "চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস-এ কর্মরত অবস্থায় আন্তর্জাতিক বিমান বুকিং, ভিসা ফাইল প্রক্রিয়াকরণ এবং সামগ্রিক ট্রাভেল টেকনোলজি অবকাঠামো কাস্টমাইজেশনের দায়িত্ব দক্ষতার সাথে পালন করে আসছি।",
      bullets: [
        "Sabre এবং Galileo ট্রাভেল সিস্টেমের মাধ্যমে জটিল আন্তর্জাতিক টিকিট বুকিং ও সফল রি-ইস্যু কার্যক্রম পরিচালনা।",
        "হজ্জ ও ওমরাহ যাত্রীদের ভিসা পোর্টাল পরিচালনা এবং গ্রুপ টিকিট বুকিং শিডিউল তদারকি।",
        "কোম্পানির ক্লায়েন্ট সম্পর্ক উন্নত করতে অটোমেটেড ট্রাভেল কুয়েরী ম্যানেজমেন্ট পোর্টাল চালুকরণ।",
        "কর্পোরেট ক্লায়েন্টদের জন্য সাশ্রয়ী মাল্টি-সিটি এয়ারফেয়ার ক্যালকুলেশন ডিজাইন ও এয়ারফেয়ার অপ্টিমাইজেশন।"
      ],
      icon: "fa-solid fa-briefcase"
    },
    {
      id: "exp-2",
      company: "ফ্রিল্যান্স ট্রাভেল টেক কনসালট্যান্সি",
      role: "WordPress & AI Prompt Engineer",
      duration: "২০২০ - ২০২২",
      description: "বিভিন্ন ট্রাভেল স্টার্টআপ ও এজেন্সির জন্য কাস্টম ওয়ার্ডপ্রেস বুকিং থিম ডেভলপমেন্ট এবং দৈনন্দিন কাস্টমার সার্ভিস সল্যুশন এআই চালিত প্রম্পট ও মেকানিজমে ট্রানসফর্মেশন করার কাজ সম্পন্ন করি।",
      bullets: [
        "১০টির বেশি বুকিং ইন্টিগ্রেশন এবং ট্রাভেল এজেন্সি ক্যুরিয়াল ব্লগ থিম সফলভাবে লাইভ ডেলিভারি।",
        "সোশ্যাল মিডিয়া ট্রাভেল কন্টেন্ট প্ল্যানিংয়ের জন্য কাস্টম জিপিটি প্রম্পট ও কন্টেন্ট গাইড প্রস্তুত।",
        "সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO) এর মাধ্যমে অর্গানিক কাস্টমার লিড জেনারেশন ৪০% বৃদ্ধি করার ট্র্যাক রেকর্ড।"
      ],
      icon: "fa-solid fa-globe"
    }
  ],

  certifications: [
    {
      id: "cert-sabre",
      title: "Sabre GDS Advanced Ticketing and Reservation Certificate",
      issuer: "Sabre Training Academy Bangladesh",
      year: "২০২১",
      icon: "fa-solid fa-certificate"
    },
    {
      id: "cert-galileo",
      title: "Galileo GDS Professional Fare System and Booking Certificate",
      issuer: "Travelport Academy",
      year: "২০২০",
      icon: "fa-solid fa-certificate"
    },
    {
      id: "cert-amadeus",
      title: "Amadeus Practical Knowledge and Reservation Masterclass",
      issuer: "GDS Travel Tech Forum",
      year: "২০২২",
      icon: "fa-solid fa-award"
    },
    {
      id: "cert-ai",
      title: "AI Prompt Engineering Specialist for Travel Automation",
      issuer: "Tech Academy & Digital Tech Lab",
      year: "২০২৩",
      icon: "fa-solid fa-microchip"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "ডা. আরিফুল ইসলাম",
      role: "ওহুদ গ্রুপ ট্যুর লিডার",
      company: "মেডিসিন স্পেশালিস্ট",
      text: "সালমান শরীফের সুনিপুণ ওমরাহ ভিসা প্রক্রিয়াকরণ ও মদিনার হোটেল বুকিং সেবায় আমরা অত্যন্ত সন্তুষ্ট। আমাদের গ্রুপটির প্রায় ২৪ জন সদস্য কোনো রকম ঝামেলা ছাড়া সুন্দরভাবে ইবাদত সম্পন্ন করতে সক্ষম হয়েছি। ওনার GDS টিকেটিংয়ের গভীর দক্ষতা সত্যিই প্রশংসনীয়!",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-2",
      name: "কামরুল হাসান চৌধুরী",
      role: "ব্যবস্থাপনা পরিচালক",
      company: "চৌধুরী টেক্সটাইলস লিমিটেড",
      text: "আমাদের কর্পোরেট ট্যুর বুকিংয়ের একমাত্র নির্ভরযোগ্য ব্যক্তি সালমান শরীফ। মাল্টি-সিটি বুকিং কিংবা রি-ইস্যু টিকিট অত্যন্ত দ্রুততার সাথে সম্পন্ন করে দেন। ওনার এজেন্সী কাস্টমাইজড পোর্টালটির ব্যবহারও বেশ সাবলীল।",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-3",
      name: "তানজিলা রহমান",
      role: "ইউজার এক্সপেরিয়েন্স ডিজাইনার",
      company: "ট্রাভেল এস্কেপস বাংলাদেশ",
      text: "সালমান আমাদের এজেন্সীর জন্য কাস্টম ব্লগার পোর্টাল রি-ডিজাইন ও এআই ইমেইল ক্যাম্পেইন সেটআপ করে দিয়েছেন। কাজগুলো অত্যন্ত নিখুঁত ও যথাসময়ে বুঝিয়ে দিয়েছেন। সালমান ট্রাভেল সেক্টরের পাশাপাশি ডিজিটাল স্কিলেও দারুণ অগ্রগামী!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ],

  statistics: [
    {
      id: "stat-1",
      label: "সন্তুষ্ট ক্লায়েন্টস",
      value: 1250,
      suffix: "+",
      icon: "fa-solid fa-face-smile"
    },
    {
      id: "stat-2",
      label: "ইস্যু করা এয়ার টিকিট",
      value: 4800,
      suffix: "+",
      icon: "fa-solid fa-ticket"
    },
    {
      id: "stat-3",
      label: "প্রসেস করা সফল ভিসা",
      value: 950,
      suffix: "+",
      icon: "fa-solid fa-passport"
    },
    {
      id: "stat-4",
      label: "হজ্জ ও ওমরাহ যাত্রী সহায়তা",
      value: 620,
      suffix: "+",
      icon: "fa-solid fa-kaaba"
    },
    {
      id: "stat-5",
      label: "সম্পন্ন ডিজিটাল প্রজেক্ট",
      value: 45,
      suffix: "+",
      icon: "fa-solid fa-laptop-code"
    }
  ],

  blogs: [
    {
      id: "visa-mistakes",
      title: "ভিসা রিজেকশন এড়াতে ৫টি সাধারণ ভুল যা অধিকাংশ আবেদনকারী করেন",
      excerpt: "ব্যাংক স্টেটমেন্ট, এনওসি (NOC) বা হোটেল বুকিংয়ের ছোট্ট ভুলে কিভাবে পাসপোর্ট রিজেক্ট হয় এবং তা সংশোধনের সহজ নিয়ম জানুন।",
      category: "visa",
      categoryLabel: "ভিসা প্রসেসিং",
      readTime: "৫ মিনিট",
      date: "১০ জুলাই, ২০২৬",
      author: "সালমান শরীফ",
      tags: ["ভিসা টিপস", "ডকুমেন্টেশন", "ভিসা রিজেকশন"],
      imagePrompt: "visa_documentation_stamp_on_passport",
      content: `একটি সুন্দর ভ্রমণের প্রথম ও সবচেয়ে গুরুত্বপূর্ণ ধাপ হলো ভিসা প্রাপ্তি। কিন্তু অনেক সময়ই আমাদের অসাবধানতার কারণে ভিসা রিজেক্ট বা প্রত্যাখ্যান হয়ে থাকে। নিচে এমন ৫টি ভুল তুলে ধরা হলো যা সংশোধন করলে ভিসা পাওয়ার সম্ভাবনা ৯০% বৃদ্ধি পাবে:

১. ব্যাংক স্টেটমেন্ট এবং সোর্সিংয়ের গরমিল (Mismatched Bank Statement)
ভিসা অফিসাররা মূলত দেখেন আপনার অ্যাকাউন্টে টাকা কিভাবে এসেছে। ভিসার ১ সপ্তাহ আগে হঠাৎ করে অ্যাকাউন্টে বড় অঙ্কের টাকা জমা দেওয়া রিজেকশনের প্রধান কারণ। টাকা আসার স্পষ্ট উৎস (যেমন: বেতন, ব্যবসা থেকে লাভ বা লভ্যাংশ) ব্যাংক স্টেটমেন্টে পরিষ্কার থাকতে হবে।

২. অস্পষ্ট ও ভুয়া নো-অবজেকশন সার্টিফিকেট (NOC/Trade License)
চাকরিজীবীদের ক্ষেত্রে NOC লেটারে অবশ্যই কোম্পানির অফিশিয়াল সিল, এইচআর ম্যানেজারের সঠিক ফোন নম্বর ও সাইন থাকতে হবে। অনেক সময় এম্বাসি থেকে কল দিয়ে তথ্য ভেরিফাই করা হয়। ব্যবসায়ীদের ক্ষেত্রে ট্রেড লাইসেন্সের ইংরেজি অনুবাদ অবশ্যই অনুমোদিত নোটারি পাবলিক দ্বারা সত্যায়িত হওয়া আবশ্যক।

৩. ডামি হোটেল বুকিং বাতিল হয়ে যাওয়া (Dummy Hotel Cancellation)
ভিসা ফাইল করার সময় আমরা অনেকেই বুকিং ডট কম বা অন্য সাইটে ‘ফ্রি ক্যানসেলেশন’ হোটেল বুকিং দিয়ে রাখি। এম্বাসি ফাইল প্রসেস করার সময় যদি সেই বুকিংটি অটোমেটিক বাতিল হয়ে যায়, তবে ভিসা নিশ্চিতভাবে রিজেক্ট হবে। সর্বদা বিশ্বস্ত এজেন্টের মাধ্যমে বুকিং স্ট্যাটাস লাইভ রাখুন।

৪. কভার লেটারে ভ্রমণের উদ্দেশ্যের অস্পষ্টতা (Vague Cover Letter)
শেনজেন বা ইউএসএ ভিসার জন্য কভার লেটার অত্যন্ত গুরুত্বপূর্ণ। আপনার ডে-টু-ডে আইটেনারী বা কোন দিন কোথায় ঘুরবেন তা কভার লেটারে বিস্তারিত লিখুন। আপনার বাংলাদেশে ফিরে আসার শক্ত কারণ বা ‘টাইজ’ (যেমন: পরিবার, স্থায়ী চাকরি, ব্যবসা) অবশ্যই জোর দিয়ে উল্লেখ করতে হবে।

৫. ছবির ভুল সাইজ ও পুরনো ছবি ব্যবহার (Incorrect Photo Specs)
বিভিন্ন দেশের ছবির রিকোয়ারমেন্ট আলাদা। যেমন থাইল্যান্ডের জন্য ৩৫x৪৫ মিমি আর ইন্ডিয়া বা ইউএসএ এর জন্য ২x২ ইঞ্চি। একই ছবি বিগত ১ বছরের বেশি পূর্বে তোলা ছবি হলে বা কানের লতি ঢেকে থাকলে পাসপোর্ট ফিরিয়ে দেওয়া হয়।

সালমান ভাইয়ের এক্সপার্ট পরামর্শ:
ভিসার ফাইল জমা দেওয়ার পূর্বে কোনো পেশাদারের মাধ্যমে রি-চেক করিয়ে নেওয়া বুদ্ধিমানের কাজ। আপনার ডকুমেন্টস তৈরি থাকলে যেকোনো সময় আমার সাথে পরামর্শ করতে পারেন।`
    },
    {
      id: "ticket-hacks",
      title: "অফ-পিক সিজনে জলের দামে আন্তর্জাতিক বিমান টিকিট কাটার ৩টি গোপন সিক্রেট",
      excerpt: "বিমানের টিকিটের মূল্য সেকেন্ডে সেকেন্ডে কেন বাড়ে? কম দামে এয়ার টিকিট কাটার জন্য কোন দিন ও কোন সময় সবচেয়ে সেরা তা জেনে নিন।",
      category: "tickets",
      categoryLabel: "ফ্লাইট টিকিট হ্যাকস",
      readTime: "৪ মিনিট",
      date: "০৮ জুলাই, ২০২৬",
      author: "সালমান শরীফ",
      tags: ["এয়ার টিকিট", "ফ্লাইট হ্যাক্স", "সাশ্রয়ী ভ্রমণ"],
      imagePrompt: "flight_ticket_laptop_booking_plane_background",
      content: `বিমান ভাড়া আপনার সামগ্রিক ট্রাভেল বাজেটের প্রায় ৫০% থেকে ৬০% দখল করে নেয়। কিন্তু কিছু টেকনিক্যাল হ্যাক্স ব্যবহার করলে আপনি ২৫% থেকে ৪০% পর্যন্ত কম খরচে একই সিটের টিকিট বুক করতে পারেন। এখানে ৩টি সুপার হ্যাকস দেয়া হলো:

১. মঙ্গলবার ও বুধবারের যাদু (The Mid-Week Rule)
সাধারণত মানুষ ছুটির দিনে (বৃহস্পতিবার ও শুক্রবার) ভ্রমণ করতে পছন্দ করে। এই কারণে উইকেন্ডে বিমান ভাড়া আকাশচুম্বী থাকে। পরিসংখ্যান বলে, মঙ্গলবার এবং বুধবার সবচেয়ে কম দামে বিমানের আসন খালি থাকে। তাই আপনার ট্রাভেল ডেট এই দিনগুলোতে নির্বাচন করুন।

২. কো-শেয়ারিং ও স্প্লিট টিকেটিং (Codeshare & Split Ticketing)
সরাসরি ঢাকা থেকে লন্ডন বা নিউ ইয়র্ক না কেটে আপনি যদি ভায়া রুট ধরেন (যেমন জাজিরা এয়ারলাইন্স বা কুয়েত এয়ারওয়েজ ভায়া কুয়েত/শারজাহ), তবে ভাড়া অনেক কম পড়বে। এছাড়া অনেক সময় ওয়ান-ওয়ে আলাদাভাবে দুবার কাটলে রিটার্ন টিকিট কাটার চেয়েও সাশ্রয়ী হয়, যাকে স্প্লিট টিকেটিং বলা হয়।

৩. ইনকগনিটো ব্রাউজার এবং জিডিএস এজেন্ট কন্সাল্টিং
অনলাইন পোর্টালগুলোতে বার বার একই ফ্লাইট সার্চ করলে কুকিজ ট্র্যাক করে টিকিটের দাম বাড়িয়ে দেয়। সবসময় ইনকগনিটো মুডে সার্চ করুন। আর সবচেয়ে বড় সিক্রেট হলো, ট্রাভেল পোর্টালগুলোতে যে রেট দেখায়, Sabre বা Galileo GDS সিস্টেমে অথরাইজড এজেন্টের কাছে স্পেশাল ফেয়ার (IT/Consolidator Fare) থাকে যা রিটেইল সাইটে পাওয়া যায় না।

এভিয়েশন প্রো-টিপ:
ফ্লাইটের টিকিট যাত্রার অন্তত ৪৫ থেকে ৬০ দিন পূর্বে কাটুন। শেষ মুহূর্তে টিকিটের দাম ট্রিপল হয়ে যাওয়ার সম্ভাবনা থাকে। আমাদের কাস্টম কুয়েরি সিস্টেমে সার্চ করতে নিচের কুয়েরি ফর্মটি ব্যবহার করতে পারেন।`
    },
    {
      id: "cover-letter",
      title: "শেনজেন ও ইউএসএ ভিসার জন্য একটি নিখুঁত কভারিং লেটার যেভাবে লিখবেন",
      excerpt: "ভিসা অফিসারের মন জয় করতে এবং আপনার ভ্রমণের উদ্দেশ্য সঠিকভাবে ফুটিয়ে তুলতে একটি কার্যকর কভার লেটার লেখার স্ট্যান্ডার্ড ড্রাফটিং স্টাইল।",
      category: "tips",
      categoryLabel: "ভ্রমণ গাইড ও টিপস",
      readTime: "৫ মিনিট",
      date: "০৫ জুলাই, ২০২৬",
      author: "সালমান শরীফ",
      tags: ["শেনজেন ভিসা", "কভার লেটার", "ইউএসএ ভিসা"],
      imagePrompt: "writing_cover_letter_travel_itinerary",
      content: `শেনজেন বা ইউএসএ ভিসা আবেদনে কভার লেটারকে বলা হয় আপনার আবেদনের মুখপত্র বা ‘Personal Statement’। visa অফিসার আপনার হাজারো কাগজের ভিড়ে প্রথমে এই কভার লেটারটি পড়ে থাকেন। এটি যেন অতিরিক্ত বড় না হয়, আবার যেন গুরুত্বপূর্ণ তথ্য বাদ না পড়ে। নিচে একটি প্রফেশনাল ফরম্যাট দেওয়া হলো:

ধাপ ১: সুনির্দিষ্ট পরিচয় ও আবেদনের টাইটেল
চিঠির শুরুতেই আপনার পাসপোর্ট নম্বর, পেশা এবং ভ্রমণের মূল ক্যাটাগরি (ট্যুরিস্ট/বিজনেস/ফ্যামিলি ভিজিট) উল্লেখ করুন।

ধাপ ২: প্রতিদিনের সুনির্দিষ্ট ট্যুর আইটেনারী
চিঠির মাঝের অংশে একটি টেবিল বা পয়েন্ট আকারে লিখুন। যেমন: Day 1: Arrival in Paris & Hotel check-in. Day 2: Eiffel Tower & Louvre Museum. Day 3: Train to Brussels. এটি প্রমাণ করে আপনার ভ্রমণ নিয়ে পরিষ্কার পরিকল্পনা রয়েছে।

ধাপ ৩: বাংলাদেশে ফিরে আসার কারণ (Home Ties)
এটি শেনজেন ভিসার জন্য সবচেয়ে ক্রুশিয়াল। আপনার সন্তান, সম্পত্তি, চাকরি বা রানিং প্রজেক্টের কথা উল্লেখ করুন যা নিশ্চিত করে যে আপনি ভ্রমণ শেষে বাংলাদেশে ফিরে আসতে বাধ্য।

* মনে রাখবেন, কভার লেটারে কখনো মিথ্যা তথ্য বা কাল্পনিক হোটেলের নাম দিবেন না। আমরা আমাদের ক্লায়েন্টদের জন্য কাস্টমাইজড প্রফেশনাল কভার লেটার ড্রাফট করে থাকি।`
    },
    {
      id: "umrah-e-visa",
      title: "সৌদি ওমরাহ ই-ভিসা প্রসেসিংয়ের খুঁটিনাটি ও নিজে আবেদন করার নিয়ম",
      excerpt: "সৌদি আরবের বর্তমান নিয়মে নিজে নিজে ওমরাহ ভিসা করার নিয়ম এবং বায়োমেট্রিক রেজিস্ট্রেশনের সঠিক গাইডলাইন।",
      category: "hajj",
      categoryLabel: "হজ্জ ও ওমরাহ",
      readTime: "৬ মিনিট",
      date: "০১ জুলাই, ২০২৬",
      author: "সালমান শরীফ",
      tags: ["ওমরাহ ভিসা", "সৌদি আরব", "বায়োমেট্রিক"],
      imagePrompt: "mecca_madina_holy_mosque_saudi_visa",
      content: `সৌদি হজ্ব ও ওমরাহ মন্ত্রণালয় এখন ওমরাহ প্রসেসিং অত্যন্ত সহজ করে দিয়েছে। আপনি চাইলে যেকোনো ট্রাভেল কনসালট্যান্ট বা অথরাইজড ট্রাভেল এজেন্সীর মাধ্যমে সরাসরি সৌদি পররাষ্ট্র মন্ত্রণালয়ের (MoFA) লাইভ সংযোগে ই-ভিসা সংগ্রহ করতে পারেন।

ওমরাহ ভিসা পাওয়ার প্রয়োজনীয় শর্তসমূহ:
- ন্যূনতম ৬ মাস মেয়াদ সম্বলিত স্পষ্ট পাসপোর্ট কপি।
- সউদি পররাষ্ট্র মন্ত্রণালয় অনুমোদিত বায়ো-ওমরাহ অ্যাপ (Tasheer) এর মাধ্যমে আঙুলের ছাপ ভেরিফিকেশন।
- ভ্যাকসিন সার্টিফিকেট এবং ফিরতি বিমানের কনফার্ম টিকিট।
- মক্কা ও মদিনার জন্য সৌদি সরকারের নুসুখ (Nusuk) পোর্টালে নিবন্ধিত hotel বুকিং।

আমরা সরাসরি সৌদি ওমরাহ পোর্টাল ইন্টিগ্রেশনের মাধ্যমে কোনো প্রকার ঝামেলা ছাড়াই মাত্র ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিখুঁতভাবে ওমরাহ ভিসা প্রসেস করে থাকি। মক্কা ও মদিনার বাজেট-বান্ধব হোটেল ও পরিবহনের জন্য আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।`
    }
  ],

  socialLinks: {
    facebook: "https://www.facebook.com/mohammadsalmansharif37",
    linkedin: "https://www.linkedin.com/in/salmansharif",
    github: "https://github.com/salmansharif-tech",
    whatsapp: "https://wa.me/8801901922368",
    youtube: "https://youtube.com/@salman_sharif"
  },
  
  telegramBotToken: "", // To be configured by user via secrets if needed
  telegramChatId: "", // To be configured by user
  googleScriptURL: "https://script.google.com/macros/s/AKfycbzDFdwN8GfrlvWrDLIlpyLOP2TSIOGr5-A_jc20H9tBqq3JLRxveA-2ArvbZ2EzxCW-/exec" // Default Apps Script Webhook URL
};

// Load dynamic overrides from local storage
const loadPortfolioData = (): PortfolioData => {
  const base = { ...defaultPortfolioData };
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("salman_portfolio_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          const merged = { ...base, ...parsed };
          
          // Fallback to default googleScriptURL if saved one is empty/undefined
          if (!merged.googleScriptURL) {
            merged.googleScriptURL = defaultPortfolioData.googleScriptURL;
          }
          
          // Safeguard list arrays to never be empty or non-arrays
          const arrayKeys: Array<keyof PortfolioData> = [
            "subtitles", "services", "projects", "experiences", 
            "certifications", "testimonials", "statistics", "skillCategories", "blogs"
          ];
          
          for (const key of arrayKeys) {
            if (!Array.isArray(merged[key]) || (merged[key] as any).length === 0) {
              (merged as any)[key] = [...(defaultPortfolioData[key] as any)];
            }
          }
          
          // Ensure socialLinks is fully populated
          if (!merged.socialLinks || typeof merged.socialLinks !== "object") {
            merged.socialLinks = { ...defaultPortfolioData.socialLinks };
          } else {
            merged.socialLinks = {
              ...defaultPortfolioData.socialLinks,
              ...merged.socialLinks
            };
          }
          
          return merged;
        }
      } catch (e) {
        console.error("Error parsing saved portfolio data", e);
      }
    }
  }
  return base;
};

export const portfolioData: PortfolioData = loadPortfolioData();

export const updatePortfolioData = (newData: PortfolioData) => {
  // Update the exported object reference's fields in-place to update any direct imports dynamically without reload delays
  Object.keys(newData).forEach((key) => {
    (portfolioData as any)[key] = (newData as any)[key];
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("salman_portfolio_data", JSON.stringify(newData));
  }
};

