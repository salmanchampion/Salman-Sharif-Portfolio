import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Tag, 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  AlertTriangle, 
  Lightbulb, 
  Plane, 
  Bookmark, 
  ChevronRight,
  Sparkles,
  Award,
  ArrowRight,
  BadgeAlert,
  Send,
  X
} from "lucide-react";
import { portfolioData } from "../data";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "visa" | "tickets" | "tips" | "hajj" | string;
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  imagePrompt: string; // Used conceptually or illustrated
  icon?: React.ReactNode;
  content: string | React.ReactNode;
}

export default function TravelBlog({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [tipPredictorDays, setTipPredictorDays] = useState<string>("");
  const [predictedTip, setPredictedTip] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "সব ব্লগ" },
    { id: "visa", label: "ভিসা প্রসেসিং" },
    { id: "tickets", label: "ফ্লাইট টিকিট হ্যাকস" },
    { id: "tips", label: "ভ্রমণ গাইড ও টিপস" },
    { id: "hajj", label: "হজ্জ ও ওমরাহ" }
  ];

  // Dynamically load blogs from portfolioData, mapping default icons
  const blogPosts: BlogPost[] = useMemo(() => {
    const dataBlogs = portfolioData.blogs || [];
    return dataBlogs.map(blog => {
      let icon = <BookOpen className="w-5 h-5 text-primary" />;
      if (blog.category === "visa") {
        icon = <BadgeAlert className="w-5 h-5 text-rose-400" />;
      } else if (blog.category === "tickets") {
        icon = <Plane className="w-5 h-5 text-emerald-400" />;
      } else if (blog.category === "tips") {
        icon = <Award className="w-5 h-5 text-accent" />;
      } else if (blog.category === "hajj") {
        icon = <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />;
      }
      return {
        ...blog,
        icon
      };
    });
  }, [portfolioData.blogs]);

  const handleToggleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleToggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handlePredictDay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipPredictorDays) {
      setPredictedTip("দয়া করে যেকোনো একটি গন্তব্য বা দিন সিলেক্ট করুন।");
      return;
    }
    const val = tipPredictorDays.toLowerCase();
    if (val.includes("থাই") || val.includes("thail")) {
      setPredictedTip("থাইল্যান্ডের ফ্লাইট সাধারণত বুধবারের পরিবর্তে সোম বা মঙ্গলবারে বুক করলে গড়ে ১২% ভাড়া কম পাওয়া যায়। অফ-পিক মাস: সেপ্টেম্বর ও অক্টোবর।");
    } else if (val.includes("সৌদি") || val.includes("saudi") || val.includes("oman") || val.includes("ওমান")) {
      setPredictedTip("মধ্যপ্রাচ্যের ফ্লাইটের জন্য উইকএন্ডে টিকিট বুকিং এড়িয়ে চলুন। বৃহস্পতিবার রাতে ও শুক্রবার সকালে রিয়াদ/জেদ্দা রুটের ভাড়া সর্বোচ্চ থাকে। মঙ্গলবার দুপুর হলো বেস্ট টাইম।");
    } else {
      setPredictedTip("যেকোনো আন্তর্জাতিক গন্তব্যের ক্ষেত্রে ভ্রমণের কমপক্ষে ৪৫ দিন পূর্বে বুক করুন এবং উইকডে (মঙ্গল বা বুধবার) ফ্লাইট টাইম চুজ করুন। অফ-পিক ট্রাভেল মাসে টিকিটের মূল্য ২০% পর্যন্ত হ্রাস পায়।");
    }
  };

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchSearch = searchQuery.trim() === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-20 px-4 bg-[#070a13] relative overflow-hidden" id="travel-blog-section">
      {/* Visual Ambiance Lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 text-left">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              ট্রাভেল ডায়েরি ও গাইড ব্লগ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              সালমান শরীফের ভ্রমণ অভিজ্ঞতা ও টিপস
            </h2>
            <p className="text-gray-400 text-sm font-light max-w-2xl leading-relaxed">
              ভিসার আবেদন সহজে সম্পন্ন করার ট্রিকস, সাশ্রয়ী বিমান টিকিট কাটার চমৎকার হ্যাকস এবং আমার দীর্ঘদিনের এভিয়েশন কন্সালটেন্সি ক্যারিয়ারের বাস্তবিক কিছু দিকনির্দেশনা নিচে তুলে ধরলাম।
            </p>
          </div>

          {/* Interactive Quick Ticket Predictor Widget */}
          <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 max-w-sm w-full space-y-3 shrink-0">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-accent animate-bounce" />
              স্মার্ট টিকিট ফেয়ার প্রেডিক্টর
            </span>
            <form onSubmit={handlePredictDay} className="flex gap-2">
              <input 
                type="text"
                placeholder="গন্তব্য লিখুন (উদা: থাইল্যান্ড বা ওমান)"
                value={tipPredictorDays}
                onChange={(e) => setTipPredictorDays(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/10 focus:border-primary text-white placeholder-gray-500 outline-none"
              />
              <button 
                type="submit"
                className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-dark-bg font-extrabold text-xs rounded-lg transition-transform active:scale-95 shrink-0"
              >
                টিপস নিন
              </button>
            </form>
            {predictedTip && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-[11px] text-gray-300 font-light leading-normal"
              >
                {predictedTip}
              </motion.div>
            )}
          </div>
        </div>

        {/* SEARCH AND CATEGORIES FILTERS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories Tab Pill Controllers */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? "bg-primary text-dark-bg border-primary font-bold shadow-md shadow-primary/10"
                    : "bg-white/[0.02] text-gray-400 border-white/5 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Realtime Blog Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ব্লগ বা ট্রাভেল টিপস খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-white placeholder-gray-500 focus:border-primary outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* BLOG POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              const isBookmarked = !!bookmarkedPosts[post.id];
              return (
                <motion.div
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  className="rounded-2xl bg-[#0f1324]/50 hover:bg-[#11172a]/80 border border-white/5 hover:border-primary/20 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="space-y-4">
                    {/* Category Label and Action Indicators */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.03] text-[10px] text-primary border border-white/5 font-semibold">
                        {post.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleBookmark(post.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            isBookmarked ? "text-amber-400 bg-amber-400/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                          }`}
                          title="বুকমার্ক করুন"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            isLiked ? "text-rose-500 bg-rose-500/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                          }`}
                          title="লাইক করুন"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Blog Excerpt */}
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] text-gray-500 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta & Button */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {post.readTime}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="px-3.5 py-1.5 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-dark-bg font-bold text-xs inline-flex items-center gap-1 transition-all"
                    >
                      বিস্তারিত পড়ুন
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="md:col-span-2 text-center py-16 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <p className="text-gray-400 font-medium">কোন ব্লগ বা ট্রাভেল টিপস পাওয়া যায়নি।</p>
              <p className="text-xs text-gray-500 font-light">অনুগ্রহ করে ভিন্ন কোনো শব্দ লিখে সার্চ করুন।</p>
            </div>
          )}
        </div>

        {/* BOTTOM PROMOTIONAL BANNER */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              ভ্রমণ পরামর্শ এবং কুয়েরি এসিস্ট্যান্স
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white leading-normal">
              আপনার কি কোনো সুনির্দিষ্ট দেশ নিয়ে ভ্রমণ পরিকল্পনা রয়েছে?
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              সরাসরি সালমান ভাইয়ের সাথে আপনার ফাইল বা প্রয়োজনীয় নথিপত্র নিয়ে আলোচনা করতে এবং কম খরচে ফ্লাইটের রুট নির্বাচন করতে এখনই আপনার কাস্টম মেসেজ সেন্ড করুন।
            </p>
          </div>
          
          <a
            href={`${portfolioData.socialLinks.whatsapp}?text=হ্যালো সালমান ভাই, আমি আপনার ট্রাভেল ব্লগের টিপসগুলো পড়েছি এবং একটি ট্রিপ নিয়ে সুনির্দিষ্ট পরামর্শ পেতে চাই।`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-[#070b13] font-bold text-xs shrink-0 flex items-center gap-2 shadow-lg shadow-emerald-500/15"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            সরাসরি পরামর্শ নিন (WhatsApp)
          </a>
        </div>

      </div>

      {/* DETAILED BLOG POPUP MODAL (EXPANDED READ) */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#0c101e] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 text-left">
                {/* Meta Header */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 text-[10px] text-primary border border-primary/20 font-bold">
                      {selectedPost.categoryLabel}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {selectedPost.date}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {selectedPost.title}
                  </h3>

                  {/* Author Line */}
                  <div className="flex items-center gap-2.5 pt-1 pb-4 border-b border-white/5">
                    <img 
                      src={portfolioData.profileImage}
                      alt={selectedPost.author}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-primary/20"
                    />
                    <div className="text-[11px] sm:text-xs">
                      <span className="text-gray-400">লিখেছেন: </span>
                      <strong className="text-white font-medium">{selectedPost.author}</strong>
                      <span className="text-gray-500"> • {portfolioData.institution}</span>
                    </div>
                  </div>
                </div>

                {/* Main Text Content */}
                <div className="prose prose-invert max-w-none text-gray-300">
                  {typeof selectedPost.content === "string" ? (
                    <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-light">
                      {selectedPost.content}
                    </div>
                  ) : (
                    selectedPost.content
                  )}
                </div>

                {/* Footer Actions inside Modal */}
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  {/* Share button */}
                  <a
                    href={`${portfolioData.socialLinks.whatsapp}?text=হ্যালো সালমান ভাই, আমি আপনার এই সুন্দর ট্রাভেল ব্লগটি পড়েছি: "${selectedPost.title}"। এটি অত্যন্ত কাজের!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition-all flex items-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    হোয়াটসঅ্যাপে শেয়ার করুন
                  </a>

                  {/* Consultation trigger */}
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      if (setCurrentPage) {
                        setCurrentPage("contact");
                      }
                    }}
                    className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-dark-bg font-extrabold text-xs inline-flex items-center gap-1.5 transition-transform hover:scale-102"
                  >
                    ভ্রমণ পরামর্শ বুক করুন
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
