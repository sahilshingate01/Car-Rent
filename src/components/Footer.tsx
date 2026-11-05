"use client";

import React from "react";
import { soundFx } from "@/utils/sound";
import { ArrowUpRight, Phone, Mail, MapPin, Sparkles, Heart } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-20 pb-12 px-4 sm:px-6 md:px-8 bg-[#0A0A0A] text-white overflow-hidden rounded-t-[40px] sm:rounded-t-[60px]">
      {/* Background vector glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF5400]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Giant Hero CTA Header */}
        <div className="text-center py-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#FF5400] uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Throttle Guaranteed</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.9] text-white">
            READY TO <br />
            <span className="text-[#FF5400]">HIT THE GAS?</span>
          </h2>

          <p className="mt-6 text-sm sm:text-lg text-white/70 max-w-xl mx-auto font-medium">
            No lines. No carbon-copy forms. Just pick your machine and we deliver the keys directly to your curb.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                soundFx.playThrottle();
                onOpenBooking();
              }}
              className="group inline-flex items-center gap-3 pl-8 pr-3 py-4 rounded-full bg-[#FF5400] hover:bg-[#D94400] text-white text-base sm:text-lg font-bold tracking-wide transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Reserve Your Chassis Now</span>
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* Studio Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs sm:text-sm font-medium text-white/70">
          {/* Col 1 */}
          <div>
            <div className="font-display text-2xl font-black text-white tracking-tight mb-3">
              TWO 26 <span className="text-[#FF5400]">DRIVE</span>
            </div>
            <p className="leading-relaxed text-white/60">
              An unapologetic boutique car rental studio based in California & Florida. Designed for real driving enthusiasts.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-3 text-xs text-[#FF5400]">
              Active Vault Hubs
            </div>
            <ul className="space-y-1.5 text-white/80">
              <li>• Los Angeles (Beverly Hills / LAX)</li>
              <li>• Miami (South Beach / Executive)</li>
              <li>• New York (Manhattan / JFK)</li>
              <li>• San Francisco (Marina / SFO)</li>
              <li>• Las Vegas (The Strip / Henderson)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-3 text-xs text-[#FF5400]">
              24/7 Concierge Hotline
            </div>
            <div className="space-y-2">
              <a
                href="tel:18002263748"
                className="flex items-center gap-2 text-white hover:text-[#FF5400] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF5400]" />
                <span>+1 (800) 226-DRIVE</span>
              </a>
              <a
                href="mailto:keys@two26.drive"
                className="flex items-center gap-2 text-white hover:text-[#FF5400] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF5400]" />
                <span>keys@two26.drive</span>
              </a>
              <div className="text-[11px] text-white/40 pt-1">
                Mon–Sun 24/7/365 Emergency Dispatch
              </div>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-3 text-xs text-[#FF5400]">
              Studio Standards
            </div>
            <p className="text-white/60 leading-relaxed">
              100% exact chassis guarantee. Pre-loaded scenic GPS canyon loops. Zero hidden deposit hold surprises.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} TWO26 DRIVE STUDIOS LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" onClick={handleScrollTop} className="hover:text-white transition-colors cursor-pointer">
              Back to top ↑
            </a>
            <span className="text-white/20">|</span>
            <span>Inspired by Two26 Studio aesthetics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
