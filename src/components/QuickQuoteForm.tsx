import React, { useState } from "react";
import { Send, PlaneTakeoff, PlaneLanding, Calendar, Users, Briefcase, CheckCircle, Flame, MessageSquare } from "lucide-react";
import { portfolioData } from "../data";

export default function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fromAirport: "Dhaka (DAC)",
    toAirport: "",
    travelDate: "",
    returnDate: "",
    tripType: "One-Way", // "One-Way" | "Round-Trip"
    cabinClass: "Economy", // "Economy" | "Premium" | "Business"
    passengers: "1",
    extraMessage: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.toAirport || !formData.travelDate) {
      setErrorMessage("দয়া করে তারকাচিহ্নিত (*) বাধ্যতামূলক তথ্যসমূহ পূরণ করুন।");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const scriptURL = portfolioData.googleScriptURL || "https://script.google.com/macros/s/AKfycbzDFdwN8GfrlvWrDLIlpyLOP2TSIOGr5-A_jc20H9tBqq3JLRxveA-2ArvbZ2EzxCW-/exec";
      
      // Combine query string or payload format depending on standard Webhook
      const payload = {
        source: "Homepage Quick Quote Form",
        name: formData.name,
        phone: formData.phone,
        from: formData.fromAirport,
        to: formData.toAirport,
        date: formData.travelDate,
        returnDate: formData.returnDate || "N/A",
        tripType: formData.tripType,
        class: formData.cabinClass,
        passengers: formData.passengers,
        message: formData.extraMessage || "Quick Quote Request"
      };

      // Submit to Google sheet macro direct
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Bypass standard CORS restriction on spreadsheet macro
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        fromAirport: "Dhaka (DAC)",
        toAirport: "",
        travelDate: "",
        returnDate: "",
        tripType: "One-Way",
        cabinClass: "Economy",
        passengers: "1",
        extraMessage: ""
      });
    } catch (err) {
      console.error(err);
      setErrorMessage("দুঃখিত, তথ্যটি পাঠানো সম্ভব হয়নি। দয়া করে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const textMessage = `হ্যালো সালমান শরীফ ভাই, আমি আপনার ওয়েবসাইট থেকে ফ্লাইট কোটেশন রিকোয়েস্ট করছি। \nভ্রমণকারী: ${formData.name || "অতিথি"}\nমোবাইল: ${formData.phone || "কোনো নম্বর নেই"}\nরুট: ${formData.fromAirport} থেকে ${formData.toAirport || "জানানো হয়নি"}\nতারিখ: ${formData.travelDate || "জানানো হয়নি"}\nযাত্রীর সংখ্যা: ${formData.passengers} জন।\nদয়া করে বিমানের সাশ্রয়ী সিট বুকিংয়ের ব্যবস্থা নিবেন।`;
    const encoded = encodeURIComponent(textMessage);
    window.open(`${portfolioData.socialLinks.whatsapp}&text=${encoded}`, "_blank");
  };

  return (
    <div id="quick-quote-container" className="rounded-3xl bg-gradient-to-br from-[#12162a] to-[#0c0e18] border border-white/10 p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left">
      {/* Decorative colored glow borders inside */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
      
      <div className="space-y-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>ইনস্ট্যান্ট টিকেটিং কোটেশন</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
            জরুরি বিমান ভাড়ার খসড়া ও সিট চেক করুন
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            আপনার কাঙ্ক্ষিত গন্তব্যের তথ্য নিচে দিন। সালমান শরীফ Sabre GDS লাইভ ডেটাবেজ চেক করে সর্বনিম্ন মূল্যে সবচেয়ে সেরা ফ্লাইট খুঁজে আপনার সাথে যোগাযোগ করবেন।
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 text-center py-10">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-md sm:text-lg font-bold text-white">কোটেশন রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-slate-300 font-light max-w-sm mx-auto">
                ধন্যবাদ! আপনার সাবমিট করা তথ্যটি সালমান শরীফের স্প্রেডশীট ডেটাবেজে সংরক্ষিত হয়েছে। খুব শীঘ্রই আপনার মোবাইল বা ইমেইলে ফিডব্যাক পাঠানো হবে।
              </p>
            </div>
            
            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-all"
              >
                নতুন কোটেশন ফর্ম দেখুন
              </button>
              <button
                onClick={handleWhatsAppRedirect}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-dark-bg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                সরাসরি হোয়াটসঅ্যাপ মেসেজ দিন
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMessage && (
              <p className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-bold">
                ⚠️ {errorMessage}
              </p>
            )}

            {/* Trip type selector */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold bg-[#0a0c16] rounded-xl p-1 relative border border-white/5">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, tripType: "One-Way" }))}
                className={`py-2 rounded-lg text-center transition-all ${
                  formData.tripType === "One-Way" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                ওয়ান-ওয়ে (একমুখী)
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, tripType: "Round-Trip" }))}
                className={`py-2 rounded-lg text-center transition-all ${
                  formData.tripType === "Round-Trip" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                রাউন্ড ট্রিপ (দ্বিমুখী)
              </button>
            </div>

            {/* From & To inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <PlaneTakeoff className="w-3 h-3 text-primary" />
                  ভ্রমণ শুরু (Flying From) *
                </label>
                <input
                  type="text"
                  name="fromAirport"
                  value={formData.fromAirport}
                  onChange={handleChange}
                  placeholder="যেমন: Dhaka (DAC)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <PlaneLanding className="w-3 h-3 text-accent" />
                  গন্তব্যস্থল (Flying To) *
                </label>
                <input
                  type="text"
                  name="toAirport"
                  value={formData.toAirport}
                  onChange={handleChange}
                  placeholder="যেমন: Jeddah (JED), London (LHR)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Travel Date & Cabin specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" />
                  যাত্রার তারিখ *
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  ফেরার তারিখ {formData.tripType === "Round-Trip" && "*"}
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  disabled={formData.tripType === "One-Way"}
                  placeholder="ঐচ্ছিক"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <Users className="w-3 h-3 text-accent" />
                  যাত্রী সংখ্যা *
                </label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0d0f1a] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                >
                  <option value="1">১ জন যাত্রী (1 Pax)</option>
                  <option value="2">২ জন যাত্রী (2 Pax)</option>
                  <option value="3">৩ জন যাত্রী (3 Pax)</option>
                  <option value="4">৪ জন যাত্রী (4 Pax)</option>
                  <option value="5">৫ জন বা তার বেশি (Group)</option>
                </select>
              </div>
            </div>

            {/* Cabin select and User Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-primary" />
                  কেবিন ক্লাস *
                </label>
                <select
                  name="cabinClass"
                  value={formData.cabinClass}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0d0f1a] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none"
                >
                  <option value="Economy">ইকোনমি ক্লাস (Economic)</option>
                  <option value="Premium">প্রিমিয়াম ইকোনমি (Premium)</option>
                  <option value="Business">বিজনেস ক্লাস (Business Suite)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold">আমার নাম *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার নাম"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold">ফোন / হোয়াটসঅ্যাপ নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="যেমন: +8801700000000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-primary/50 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Form actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-dark-bg font-bold text-xs sm:text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "ডেটা সাবমিট হচ্ছে..." : "ফ্লাইট রেট খুজুন ও সাবমিট করুন"}
              </button>
              
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs transition-all border border-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                তথ্য পাঠিয়ে হোয়াটসঅ্যাপে চ্যাট করুন
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
