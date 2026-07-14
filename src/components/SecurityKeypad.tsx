import React, { useState } from "react";
import { X, Delete, PhoneCall, ShieldAlert, Sparkles, Terminal } from "lucide-react";

interface SecurityKeypadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SecurityKeypad({ isOpen, onClose, onSuccess }: SecurityKeypadProps) {
  const [dialText, setDialText] = useState<string>("");
  const [errorWord, setErrorWord] = useState<string>("");
  const [successWord, setSuccessWord] = useState<string>("");

  if (!isOpen) return null;

  const playBeep = (freq: number, duration: number, type: OscillatorType = "sine") => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, context.currentTime);
      gain.gain.setValueAtTime(0.08, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration - 0.05);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + duration);
    } catch (e) {
      // Audio might fail due to user interaction policies
    }
  };

  const handleKeyPress = (num: string) => {
    playBeep(650, 0.1);
    setErrorWord("");
    
    if (dialText.length >= 6) return; // limit input length
    
    const nextVal = dialText + num;
    setDialText(nextVal);

    if (nextVal === "*045#") {
      playBeep(880, 0.35, "triangle");
      setTimeout(() => playBeep(1318.51, 0.45, "sine"), 120);
      setSuccessWord("অ্যাক্সেস অনুমোদিত! সিস্টেম আনলক অপরাধ...");
      setTimeout(() => {
        onSuccess();
        onClose();
        setDialText("");
        setSuccessWord("");
      }, 1000);
    }
  };

  const clearCode = () => {
    playBeep(350, 0.15);
    setDialText("");
    setErrorWord("");
  };

  const dialManual = () => {
    if (dialText === "*045#") {
      // Covered above instantly, but in case
      onSuccess();
      onClose();
    } else {
      playBeep(220, 0.4, "sawtooth");
      setErrorWord("রং সিক্রেট সিকোয়েন্স কোড! পুনরায় ট্রাই করুন।");
      setDialText("");
    }
  };

  return (
    <div id="security-keypad-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn text-left">
      <div className="rounded-3xl bg-[#090b14] border border-white/10 p-5 sm:p-6 w-full max-w-xs shadow-2xl relative">
        
        {/* Top bar with close */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>সিকিউরিটি ডায়ালপ্যাড</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LED Green Terminal Display screen */}
        <div className="bg-[#031508] border border-emerald-500/30 rounded-2xl p-3 sm:p-4 mb-4 font-mono text-center relative overflow-hidden shadow-inner flex flex-col justify-between h-20">
          <div className="absolute inset-0 bg-radial pointer-events-none bg-emerald-500/5" />
          <div className="text-[9px] text-emerald-500/40 text-left uppercase tracking-widest flex items-center justify-between">
            <span>Terminal Port #GDS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="text-lg font-bold tracking-widest text-[#00ff41] select-none h-6 flex items-center justify-center">
            {dialText || <span className="opacity-30 tracking-widest">* * * *</span>}
          </div>

          <div className="text-[10px] text-[#00ff41]/90 min-h-[12px] truncate leading-none">
            {successWord ? (
              <span className="text-emerald-400 font-bold">{successWord}</span>
            ) : errorWord ? (
              <span className="text-rose-500 font-bold">{errorWord}</span>
            ) : (
              <span className="text-emerald-600/70">ইনপুট কোড ডায়াল করুন</span>
            )}
          </div>
        </div>

        {/* Tactile Round Keys layout */}
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleKeyPress(btn)}
              className="h-12 w-12 rounded-full mx-auto bg-gradient-to-b from-[#161a29] to-[#0e111d] text-white font-mono text-sm font-extrabold hover:text-primary hover:border-primary/40 active:scale-90 transition-all border border-white/5 shadow-md flex items-center justify-center cursor-pointer select-none"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* bottom action dials */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={clearCode}
            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Delete className="w-3.5 h-3.5" />
            <span>মুছে ফেলুন</span>
          </button>

          <button
            onClick={dialManual}
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-accent text-dark-bg font-extrabold text-[11px] uppercase transition-all flex items-center justify-center gap-1 shadow-lg active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>ডায়াল</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-gray-500 font-light text-center flex items-center justify-center gap-1">
          <ShieldAlert className="w-3 h-3 text-accent" />
          <span>ডবল ট্যাপ Copyright ক্লিক করে সচল করা হয়েছে</span>
        </div>

      </div>
    </div>
  );
}
