import React, { useState } from "react";
import { portfolioData } from "../data";
import { MapPin, Phone, Mail, Send, CheckCircle2, ShieldCheck, HelpCircle, Loader2, Copy, Check } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [integrationSteps, setIntegrationSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const googleAppsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastColumn() == 0) {
      sheet.appendRow([
        "তারিখ (Date/Time)", 
        "উৎস (Source)", 
        "নাম (Name)", 
        "ফোন নম্বর (Phone)", 
        "ইমেইল (Email)", 
        "ভ্রমণ শুরুর স্থান (From)", 
        "গন্তব্যস্থল (To)", 
        "যাত্রার তারিখ (Travel Date)", 
        "ফেরার তারিখ (Return Date)", 
        "ট্রিপ ধরণ (Trip Type)", 
        "কেবিন ক্লাস (Class)", 
        "যাত্রী সংখ্যা (Passengers)", 
        "মেসেজ / ক্যোয়ারী (Message)"
      ]);
    }
    
    // Append the lead data to the Google Sheet
    sheet.appendRow([
      new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"}),
      data.source || "Contact Form",
      data.name || "",
      "'" + (data.phone || ""), // Prefix with single quote to preserve leading zeros
      data.email || "",
      data.from || "N/A",
      data.to || "N/A",
      data.date || "N/A",
      data.returnDate || "N/A",
      data.tripType || "N/A",
      data.class || "N/A",
      data.passengers || "N/A",
      data.message || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("দয়া করে নাম, ফোন নম্বর এবং মেসেজ ফিল্ড পূরণ করুন।");
      return;
    }

    setStatus("sending");

    // Construct the Telegram payload
    const textMessage = `
🔔 *নতুন পোর্টফোলিও মেসেজ!*
👤 নাম: ${name}
📞 ফোন: ${phone}
📧 ইমেল: ${email || "দেওয়া হয়নি"}
💬 মেসেজ: ${message}
🌐 সোর্স: সালমান শরীফ পোর্টফোলিও
    `;

    // Sheets payload
    const sheetsPayload = {
      source: "Homepage Contact Section",
      name,
      phone,
      email: email || "N/A",
      message
    };

    try {
      // 1. Optional Real Telegram Integration
      if (portfolioData.telegramBotToken && portfolioData.telegramChatId) {
        const tgUrl = `https://api.telegram.org/bot${portfolioData.telegramBotToken}/sendMessage`;
        await fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: portfolioData.telegramChatId,
            text: textMessage,
            parse_mode: "Markdown",
          }),
        });
      }

      // 2. Google Script Integration (if configured in Admin)
      const targetScriptURL = portfolioData.googleScriptURL || "https://script.google.com/macros/s/AKfycbzDFdwN8GfrlvWrDLIlpyLOP2TSIOGr5-A_jc20H9tBqq3JLRxveA-2ArvbZ2EzxCW-/exec";
      if (targetScriptURL) {
        await fetch(targetScriptURL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsPayload),
        });
      }

      // Simulate network wait for standard luxury aesthetic feedback
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      
      // Clear variables
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact-section" className="py-20 lg:py-28 px-4 bg-[#0a0e1a] relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            যোগাযোগ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            যেকোনো ভ্রমণ ক্যোয়ারী বা বুকিং এর জন্য যোগাযোগ করুন
          </h2>
          <p className="text-gray-400 text-sm font-light">
            আমি চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস এ কর্মরত আছি। সরাসরি ইনকোয়ারী ফর্ম পূরণ করে আপনার প্রয়োজনীয় এয়ার ফেয়ার মেসেজ পাঠান।
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Form and info row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Card Info Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-xl font-bold text-white mb-2">চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
              আমরা এয়ারলাইন্স সিট কনফার্মেশন ও ভিসা প্রসেসিং কার্যক্রমে বিশ্বস্ত। আমাদের নয়া পল্টনের অফিসে ভিজিট করতে পারেন কিংবা সরাসরি ফোন/হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">লোকেশন / অফিস</p>
                  <p className="text-sm font-semibold text-white">{portfolioData.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">কল করুন (হোয়াটসঅ্যাপ)</p>
                  <p className="text-sm font-semibold text-white">
                    <a href={`tel:${portfolioData.phone}`} className="hover:text-primary transition-colors">{portfolioData.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">অফিসিয়াল ইমেইল</p>
                  <p className="text-sm font-semibold text-white break-all text-wrap">
                    <a href={`mailto:${portfolioData.email}`} className="hover:text-primary transition-colors">{portfolioData.email}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated verification and setup docs for GDS traveler */}
            <div className="bg-gradient-to-br from-primary/10 via-white/[0.01] to-[#111625] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <h4 className="text-sm font-semibold text-white">অটোমেশন ইন্টিগ্রেশন ইনফো</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light mb-4">
                এই সাইটে রিয়েল-টাইম ডাটা ইন্টিগ্রেশন রয়েছে। ফর্ম পূরণ করলে সরাসরি চ্যাম্পিয়ন্স ব্যাকএন্ড ড্যাশবোর্ড এবং এজেন্টের টেলিগ্রাম নোটিফিকেশনে রিকোয়েস্ট চলে যায়।
              </p>
              <button
                id="integration-info-btn"
                onClick={() => setIntegrationSteps(!integrationSteps)}
                className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
              >
                {integrationSteps ? "ইন্টিগ্রেশন গাইড লুকান" : "কীভাবে ইন্টিগ্রেট করবেন? দেখুন"}
              </button>

              {integrationSteps && (
                <div id="integration-drawer" className="mt-4 p-4 rounded-xl bg-black/60 border border-white/5 text-[11px] text-gray-300 space-y-3.5 leading-relaxed animate-fadeIn max-h-[350px] overflow-y-auto custom-scrollbar">
                  <div>
                    <p className="font-bold text-accent text-xs mb-1">📋 গুগল শিট কানেকশন গাইড (৩ সহজ ধাপে):</p>
                    <p className="text-gray-400">আপনার ওয়েবসাইট ফর্মের সমস্ত ডাটা অটোমেটিকালি গুগল শিটে জমা করতে নিচের নির্দেশাবলী অনুসরণ করুন:</p>
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <p><strong className="text-primary">ধাপ ১:</strong> একটি নতুন <strong className="text-white">Google Sheet</strong> তৈরি করুন।</p>
                    <p><strong className="text-primary">ধাপ ২:</strong> শিটের উপরের মেনুবার থেকে <strong className="text-white">Extensions &gt; Apps Script</strong>-এ ক্লিক করুন।</p>
                    <p><strong className="text-primary">ধাপ ৩:</strong> সেখানকার ডিফল্ট কোড মুছে নিচের কোডটি সম্পূর্ণ কপি করে বসান:</p>
                  </div>

                  {/* Copy Code Section */}
                  <div className="relative mt-2 p-2 rounded-lg bg-slate-950 border border-white/5 text-[10px] font-mono text-emerald-400 overflow-x-auto">
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        title="কোড কপি করুন"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[9px]">কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[9px]">কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-left text-wrap select-all pr-12 text-slate-300 select-all max-h-[140px] overflow-y-auto">
                      {googleAppsScriptCode}
                    </pre>
                  </div>

                  <div className="space-y-2 text-left pt-1 border-t border-white/5">
                    <p><strong className="text-primary">ধাপ ৪:</strong> Apps Script-এর উপরে <strong className="text-white">Deploy &gt; New Deployment</strong>-এ যান।</p>
                    <p><strong className="text-primary">ধাপ ৫:</strong> Select type থেকে <strong className="text-white">Web app</strong> সিলেক্ট করে, <strong className="text-gray-400">Execute as: Me</strong> এবং <strong className="text-gray-400">Who has access: Anyone</strong> সিলেক্ট করে Deploy ক্লিক করুন।</p>
                    <p><strong className="text-primary">ধাপ ৬:</strong> প্রাপ্ত <strong className="text-accent">Web app URL</strong>-টি কপি করে নিন। এবার অ্যাডমিন প্যানেলের সিকিউরিটি কিপ্যাড (১২৩৪৫৬) দিয়ে প্রবেশ করে <strong>🔌 ব্যাকএন্ড ইন্টিগ্রেশন</strong> ট্যাবে <strong>Google Apps Script Webhook URL</strong>-এ লিংকটি পেস্ট করে সেভ করুন!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-7 bg-[#111625]/60 hover:bg-[#111625]/90 border border-white/5 hover:border-primary/10 p-6 md:p-8 rounded-3xl glass-panel text-left transition-all duration-300 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-4.5 h-4.5 text-primary rotate-[-20deg]" />
              আপনার ট্রাভেল কুয়েরী পাঠান
            </h3>

            {status === "success" ? (
              <div id="form-success-alert" className="p-6 rounded-2xl bg-[#06d6a0]/15 border border-[#06d6a0]/20 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-accent text-dark-bg flex items-center justify-center mx-auto text-lg font-bold">
                  <i className="fa-solid fa-check" />
                </div>
                <div>
                  <h4 className="text-md sm:text-lg font-semibold text-white">মেসেজ সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-1.5 leading-normal">
                    ধন্যবাদ, সালমান শরীফ অত্যন্ত শীঘ্রই আপনার সাথে সরাসরি হোয়াটসঅ্যাপ বা ইমেলের মাধ্যমে যোগাযোগ করবেন।
                  </p>
                </div>
                <button
                  id="reset-form-btn"
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  নতুন মেসেজ পাঠান
                </button>
              </div>
            ) : (
              <form id="contact-submission-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label id="lbl-form-name" className="text-xs font-semibold text-gray-300">নাম <span className="text-red-500">*</span></label>
                    <input
                      id="ip-form-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-primary/50 text-white focus:outline-none transition-all placeholder:text-gray-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label id="lbl-form-phone" className="text-xs font-semibold text-gray-300">ফোন নম্বর <span className="text-red-500">*</span></label>
                    <input
                      id="ip-form-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="আপনার ফোন নম্বর"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-primary/50 text-white focus:outline-none transition-all placeholder:text-gray-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label id="lbl-form-email" className="text-xs font-semibold text-gray-300">ইমেইল অ্যাড্রেস</label>
                  <input
                    id="ip-form-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার সচল ইমেইল অ্যাড্রেস লিখুন"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-primary/50 text-white focus:outline-none transition-all placeholder:text-gray-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label id="lbl-form-msg" className="text-xs font-semibold text-gray-300">মেসেজ / মতামত <span className="text-red-500">*</span></label>
                  <textarea
                    id="ip-form-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="কোথায় ভ্রমণ করতে চান, বিমানের ডেট এবং ভিসা বিবরণী উল্লেখ করতে পারেন..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-primary/50 text-white focus:outline-none transition-all placeholder:text-gray-500 text-xs sm:text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p id="form-error-txt" className="text-xs text-red-400 font-semibold">
                    * দুঃখিত! কোনো ত্রুটি ঘটেছে, পুনরায় চেষ্টা করুন বা সরাসরি হোয়াটসঅ্যাপ চ্যাট করুন।
                  </p>
                )}

                <button
                  id="submit-form-btn"
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary-grad hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary/25 hover:shadow-primary/35 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-glow text-accent" />
                      মেসেজ প্রসেস হচ্ছে...
                    </>
                  ) : (
                    <>
                      মেসেজ পাঠান (টেলিগ্রাম / গুগল শিট)
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Google Map */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 text-left">
            <MapPin className="w-5 h-5 text-accent animate-bounce" />
            <h4 className="text-base font-bold text-white">কালেক্টিভ লোকেশন ম্যাপ (Chinatown Market, Naya Paltan, Dhaka, Bangladesh)</h4>
          </div>
          
          <div className="rounded-3xl overflow-hidden border border-white/10 glass-panel p-2 shadow-2xl h-80 sm:h-96 w-full">
            <iframe
              title="Google Map Location of Salman Sharif - Chinatown Market, Naya Paltan, Dhaka"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.243577312154!2d90.4105083!3d23.7337142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85ee13ae877%3A0xb1a766ef876798e8!2sChinatown%20Market!5e0!3m2!1sen!2sbd!4v1716290000000!5m2!1sen!2sbd"
              className="w-full h-full rounded-2xl filter invert-[90%] hue-rotate-[180deg] brightness-[90%] contrast-[100%]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
