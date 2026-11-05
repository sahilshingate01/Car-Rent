"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { soundFx } from "@/utils/sound";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

export default function TestimonialsDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = TESTIMONIALS_DATA.length;
  const angles = [-5.5, 5.2, -4.2, 6.0, -5.0];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    soundFx.playClick();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsAnimating(false);
    }, 280);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    soundFx.playClick();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsAnimating(false);
    }, 280);
  };

  return (
    <section id="testimonials" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-[#FDF8F5]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching Image 5 */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-black tracking-widest text-black/50 uppercase mb-2">
            Testimonials
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-black uppercase tracking-tight">
            APPARENTLY, <span className="text-[#FF5400]">THEY LIKE US</span>
          </h2>
        </div>

        {/* Orange Container matching Image 5 */}
        <div className="relative w-full rounded-3xl sm:rounded-[40px] bg-[#FF5400] p-6 sm:p-12 md:p-16 shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between">
          {/* Subtle curved background lines */}
          <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-white stroke-2">
              <circle cx="90" cy="10" r="70" />
            </svg>
          </div>

          {/* Top Bar inside Orange container */}
          <div className="relative z-10 flex items-center justify-between text-white/90 pb-6 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Verified Joyrides • 4.98 / 5.0
              </span>
            </div>

            {/* Dynamic Sidebar Horizontal Ticks (Signature Two26) */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "32px" : "12px",
                    backgroundColor: "#FFFFFF",
                    opacity: i === currentIndex ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Interactive Stacked Card Deck */}
          <div className="relative z-10 my-8 flex items-center justify-center min-h-[360px] sm:min-h-[380px]">
            {TESTIMONIALS_DATA.map((item, idx) => {
              const offset = (idx - currentIndex + total) % total;
              const isTop = offset === 0;
              const isSecond = offset === 1;
              const isThird = offset === 2;

              if (offset > 2 && offset < total - 1) return null;

              const rot = isTop ? 0 : angles[idx % angles.length];
              const scale = isTop ? 1 : isSecond ? 0.96 : 0.92;
              const translateY = isTop ? 0 : isSecond ? 14 : 26;
              const opacity = isTop ? 1 : isSecond ? 0.92 : 0.8;
              const zIndex = total - offset;

              return (
                <div
                  key={item.id}
                  onClick={handleNext}
                  className={`absolute inset-x-0 mx-auto max-w-2xl bg-[#FDF8F5] rounded-3xl p-6 sm:p-10 border-2 border-black/10 shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none ${
                    isTop && isAnimating ? "-translate-y-24 opacity-0 scale-95" : ""
                  }`}
                  style={{
                    transform: `translateY(${translateY}px) rotate(${rot}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  {/* Quote Headline */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-[#FF5400] leading-snug tracking-tight">
                      &ldquo;{item.headline}&rdquo;
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-[#F8EEE8] shrink-0 flex items-center justify-center text-[#FF5400]">
                      <Quote className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  {/* Body paragraph */}
                  <p className="mt-4 text-xs sm:text-sm text-black/75 font-medium leading-relaxed">
                    {item.quote}
                  </p>

                  {/* Author footer */}
                  <div className="mt-6 pt-5 border-t border-black/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#FF5400]">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-black">{item.author}</div>
                        <div className="text-[11px] text-black/50 font-medium">
                          {item.role} • {item.location}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F8EEE8] text-[#FF5400] border border-[#FF5400]/20">
                        Rented: {item.carRented}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation Pill Buttons */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-white">
            <span className="text-xs font-semibold text-white/80">
              Click anywhere on the card to cycle to next driver
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label="Previous review"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-[#0A0A0A] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label="Next review"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
