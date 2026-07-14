import React, { useState, useEffect } from "react";
import { portfolioData } from "../data";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = portfolioData.testimonials && portfolioData.testimonials.length > 0
    ? portfolioData.testimonials
    : [];

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const currentTestimonial = testimonials[activeIndex] || {
    rating: 5,
    text: "কোনো মতামত পাওয়া যায়নি।",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    name: "মেহমান",
    role: "গ্রাহক",
    company: "বাংলাদেশ"
  };

  return (
    <section id="testimonials-section" className="py-20 lg:py-28 px-4 bg-[#0c101e] relative overflow-hidden">
      {/* Glow Lights */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary-grad/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            টেস্টিমোনিয়াল
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            কাস্টমার ও পার্টনারদের মতামত
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Testimonials Slider Body block */}
        <div id="testimonials-panel" className="relative p-6 sm:p-10 rounded-3xl glass-panel bg-[#111625]/60 border border-white/5 shadow-2xl max-w-3xl mx-auto min-h-[300px] flex flex-col justify-between">
          
          {/* Quote icon illustration */}
          <div className="text-primary/15 absolute top-6 left-6 pointer-events-none">
            <Quote className="w-16 h-16 transform -scale-y-100" />
          </div>

          <div className="space-y-6 relative z-10 text-left pt-6 sm:pt-4">
            
            {/* Stars rating */}
            <div className="flex gap-1">
              {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Testimonials Quote Text */}
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic font-light">
              "{currentTestimonial.text}"
            </p>

            {/* User Bio Block */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 shadow-md"
              />
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {currentTestimonial.name}
                </h4>
                <p className="text-[11px] text-gray-400 font-light">
                  {currentTestimonial.role}, <span className="text-primary">{currentTestimonial.company}</span>
                </p>
              </div>
            </div>

          </div>

          {/* Navigation Controllers */}
          <div className="flex items-center justify-end gap-3 mt-8 relative z-10">
            <button
              id="testimonial-prev-btn"
              onClick={prevSlide}
              className="p-2 ml-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  id={`testimonial-dot-${idx}`}
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === idx ? "bg-primary w-4" : "bg-white/15"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              id="testimonial-next-btn"
              onClick={nextSlide}
              className="p-2 mr-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
