import React, { useState } from "react";
import { portfolioData } from "../data";
import { Award, X, ZoomIn } from "lucide-react";

export const Achievements: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!portfolioData.achievements || portfolioData.achievements.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-[#080b13] relative overflow-hidden border-b border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
          <Award size={14} />
          <span>অ্যাচিভমেন্ট এবং সার্টিফিকেট</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
          অর্জন এবং <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">স্বীকৃতি</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
          পেশাগত দক্ষতা এবং জ্ঞান অর্জনের বিভিন্ন মাইলফলকসমূহ।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {portfolioData.achievements.map((achv) => (
            <div key={achv.id} className="group relative bg-[#0d1220] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col">
              <div 
                className="aspect-[4/3] w-full overflow-hidden bg-black/40 relative cursor-pointer"
                onClick={() => setSelectedImage(achv.image)}
              >
                <img
                  src={achv.image}
                  alt={achv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <ZoomIn className="text-white w-10 h-10" />
                </div>
              </div>
              <div className="p-6 relative z-10 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {achv.title}
                </h3>
                {achv.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {achv.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Certificate Fullscreen" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};
