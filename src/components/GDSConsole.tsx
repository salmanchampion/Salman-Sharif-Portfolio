import React, { useState, useEffect } from "react";
import { Terminal, Plane, ShieldCheck, RefreshCw, Cpu, Database } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "accent" | "success" | "warning";
}

export default function GDSConsole() {
  const [activeTab, setActiveTab] = useState<"jeddah" | "london" | "tricks">("jeddah");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const jeddahQuery = async () => {
    setIsTyping(true);
    setTerminalLines([
      { text: "SYSTEM OVERVIEW: READY FOR INPUT", type: "accent" },
    ]);

    const steps = [
      { cmd: "> A25JUN-DACJED-SV", line: "Searching airline database for Dhaka (DAC) to Jeddah (JED) on Saudia Airlines..." },
      { cmd: "OUTPUT", line: " SV 805  Y9 B8 M9 H9 Q9 K9  DACJED  12:30  16:30  B777 *D* (Direct Flight)" },
      { cmd: "OUTPUT", line: " SV 807  Y7 B4 M2 H0 Q0 K0  DACJED  19:15  23:15  B777 *D* " },
      { cmd: "> SS1Y1", line: "Selling 1 economy seat on SV805 flight in Y inventory bucket..." },
      { cmd: "OUTPUT", line: " PNR SPECIFICATION CREATED: UNCONFIRMED HOLD (SV-HQ8U9Z)" },
      { cmd: "> WP", line: "Running low-fare calendar matching and pricing engine..." },
      { cmd: "RESULT", line: " BASE AIRFARE: BDT 54,300 || TAXES: BDT 16,846 || TOTAL: BDT 71,146" },
      { cmd: "RESULT", line: " BAGGAGE LIMIT: 2PC (23KG x 2) Approved. MEAL: Halal Standard Included." },
      { cmd: "RESULT", line: " STATUS: 72HR HOLD TIME LIMIT GRANTED OVER GDS GATEWAY." },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (steps[i].cmd.startsWith(">")) {
        setTerminalLines((prev) => [...prev, { text: steps[i].cmd, type: "input" }]);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      setTerminalLines((prev) => [
        ...prev,
        {
          text: steps[i].line,
          type: steps[i].cmd === "RESULT" ? "success" : steps[i].cmd === "OUTPUT" ? "output" : "warning"
        }
      ]);
    }
    setIsTyping(false);
  };

  const londonQuery = async () => {
    setIsTyping(true);
    setTerminalLines([
      { text: "SYSTEM OVERVIEW: DOCK INITIATED FOR LHR REROUTING", type: "accent" },
    ]);

    const steps = [
      { cmd: "> A15JUL-DACLHR-QR", line: "Querying Qatar Airways multi-city options Dhaka to London Heathrow..." },
      { cmd: "OUTPUT", line: " QR 643  Y9 B9 M9 H9  DACDOH  20:00  22:45  B77x (Transit 2h 15m DOH)" },
      { cmd: "OUTPUT", line: " QR 003  Y9 B8 M7 H6  DOHLHR  01:00  06:25  A380 *D* (London Landing)" },
      { cmd: "> WPQP/S2", line: "Searching cheapest fares with multi-carrier codeshare options (Air India, Gulf Air)..." },
      { cmd: "RESULT", line: " QR 643 COMPREHENSIVE COMBINED FARE: BDT 92,400 TAX INCLUSIVE" },
      { cmd: "RESULT", line: " PREMIUM SERVICE CHEAPEST UPGRADE: BDT 145,000 (EXCLUSIVE REBATE PROMO)" },
      { cmd: "RESULT", line: " LUGGAGE: 35KG TOTAL CHECK-IN + 7KG CABIN BAG APPROVED IN GDS FILE." },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (steps[i].cmd.startsWith(">")) {
        setTerminalLines((prev) => [...prev, { text: steps[i].cmd, type: "input" }]);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      setTerminalLines((prev) => [
        ...prev,
        {
          text: steps[i].line,
          type: steps[i].cmd === "RESULT" ? "success" : steps[i].cmd === "OUTPUT" ? "output" : "warning"
        }
      ]);
    }
    setIsTyping(false);
  };

  const tricksQuery = async () => {
    setIsTyping(true);
    setTerminalLines([
      { text: "DEBUNKING TRAVEL AGENCY COST SECRETS", type: "accent" },
    ]);

    const steps = [
      { cmd: "> GDS/LOW-FARE-HACKS/LOAD", line: "Booting low-fare configuration parameters & split PNR formulas..." },
      { cmd: "RESULT", line: " 💡 ট্রিক ১: স্প্লিট বুকিং পদ্ধতি - ৩ জনের অধিক পরিবার একসাথে টিকিট বুকিং করলে এয়ারলাইন্স জোর করে সর্বোচ্চ সিটের ভাড়া হিসেব করে। আলাদা বুকিং করে PNR লিংক করলে গড়ে ১০-১৫% ভাড়া বাঁচে।" },
      { cmd: "RESULT", line: " 💡 ট্রিক ২: টাইম জোন ম্যাজিক - মঙ্গলবার রাত ২টা ও বুধবার ভোর ৩টায় গ্লোবাল এআই ডেটাবেজ বুকিং রিলিজ করা হয়। সালমান এই টাইমে Sabre ব্যবহার করে ড্রপড ফেয়ার হোল্ড করেন।" },
      { cmd: "RESULT", line: " 💡 ট্রিক ৩: পিএনআর ফিক্স হোল্ডিং - টিকিট বুকিংয়ের পর ট্রাভেলারকে দ্রুত টিকিট ইস্যুর চাপ না দিয়ে কাস্টম ডেডিকেটেড ‘Hold Limit Extension’ কমান্ড ব্যবহার করে ৭২ ঘণ্টার কম ফিয়ারে সিট লক রাখার টেকনিক।" },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      if (steps[i].cmd.startsWith(">")) {
        setTerminalLines((prev) => [...prev, { text: steps[i].cmd, type: "input" }]);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      setTerminalLines((prev) => [
        ...prev,
        {
          text: steps[i].line,
          type: steps[i].cmd === "RESULT" ? "success" : "warning"
        }
      ]);
    }
    setIsTyping(false);
  };

  useEffect(() => {
    if (activeTab === "jeddah") {
      jeddahQuery();
    } else if (activeTab === "london") {
      londonQuery();
    } else if (activeTab === "tricks") {
      tricksQuery();
    }
  }, [activeTab]);

  return (
    <div id="gds-console-section" className="rounded-3xl bg-[#090b14]/90 border border-white/5 p-6 space-y-6 shadow-2xl relative overflow-hidden text-left">
      {/* Visual background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98105_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Section info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <Cpu className="w-3 h-3 animate-spin" />
            <span>লাইভ ডেটা কানেকশন</span>
          </div>
          <h3 className="text-md sm:text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            Sabre & Galileo GDS টিকেটিং টার্মিনাল ডেমো
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">
            সালমান শরীফ কীভাবে বিমান ডেটাবেজে সরাসরি কোড চালিয়ে কম দামি ফ্লাইট হোল্ড ও ফেয়ার শিট তৈরি করেন তা নিজ চোখে দেখুন:
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2.5 shrink-0 self-stretch md:self-auto">
          <button
            onClick={() => !isTyping && setActiveTab("jeddah")}
            disabled={isTyping}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === "jeddah"
                ? "bg-emerald-500 text-dark-bg shadow-lg shadow-emerald-500/35"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            } ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Plane className="w-3.5 h-3.5 rotate-[45deg]" />
            ঢাকা - জেদ্দা ওমরাহ
          </button>
          <button
            onClick={() => !isTyping && setActiveTab("london")}
            disabled={isTyping}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === "london"
                ? "bg-emerald-500 text-dark-bg shadow-lg shadow-emerald-500/35"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            } ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Database className="w-3.5 h-3.5-1.5" />
            ঢাকা - লন্ডন রুট
          </button>
          <button
            onClick={() => !isTyping && setActiveTab("tricks")}
            disabled={isTyping}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === "tricks"
                ? "bg-emerald-500 text-dark-bg shadow-lg shadow-emerald-500/35"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            } ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            সাশ্রয়ী টিকেটিং ট্রিকস
          </button>
        </div>
      </div>

      {/* Actual Terminal Box */}
      <div id="gds-mock-terminal" className="bg-[#03060c] border border-white/10 rounded-2xl p-4 sm:p-5 font-mono text-xs text-slate-300 min-h-[280px] flex flex-col justify-between relative shadow-inner">
        {/* Terminal Dot Controls */}
        <div className="flex gap-1.5 items-center absolute top-4 right-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>

        {/* Lines display */}
        <div className="space-y-2 flex-1">
          {terminalLines.map((line, index) => {
            if (line.type === "input") {
              return (
                <div key={index} className="text-emerald-400 font-bold flex items-start gap-1 py-0.5">
                  <span className="text-emerald-500 select-none">&gt;&gt;</span>
                  <span>{line.text.replace(">", "")}</span>
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div key={index} className="text-emerald-400 bg-emerald-500/5 border-l-2 border-emerald-500 pl-2.5 py-1 text-[11px] sm:text-xs">
                  {line.text}
                </div>
              );
            }
            if (line.type === "warning") {
              return (
                <div key={index} className="text-amber-300 font-light italic pl-1 text-[11px]">
                  * {line.text}
                </div>
              );
            }
            if (line.type === "accent") {
              return (
                <div key={index} className="text-blue-400 font-semibold tracking-wider text-[11px] uppercase border-b border-white/5 pb-1 select-none">
                  ⚡ {line.text}
                </div>
              );
            }
            return (
              <div key={index} className="text-slate-400 pl-4 py-0.5 text-[11px] leading-relaxed break-words whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse pl-1 pt-1.5 font-bold text-[11px]">
              <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse inline-block" />
              <span>GDS HOST QUERY RUNNING...</span>
            </div>
          )}
        </div>

        {/* System footer metadata */}
        <div className="border-t border-white/5 pt-3 mt-4 text-[10px] text-gray-500 flex flex-wrap justify-between items-center gap-2 select-none">
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            SSL Encrypted Connection to Sabrenet BD Gateway-V5
          </p>
          <p className="text-slate-500 font-semibold uppercase">API STATUS: PASSIVE HOLD (HOLD LIMIT ENABLED)</p>
        </div>
      </div>
    </div>
  );
}
