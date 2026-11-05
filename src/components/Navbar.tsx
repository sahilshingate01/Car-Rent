"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundFx } from "@/utils/sound";
import { Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [soundActive, setSoundActive] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const ctaBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button physics from Rekeep / Two26
  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.4)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const toggleSound = () => {
    const next = soundFx.toggleSound();
    setSoundActive(next);
  };

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 ${
        isScrolled
          ? "bg-[#F8EEE8]/92 backdrop-blur-xl py-3 border-b border-[rgba(15,30,19,0.08)] shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left Navigation Pills */}
        <div className="hidden lg:flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => handleNavClick("fleet")}
            className="nav-pill-btn"
          >
            The Fleet
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="nav-pill-btn"
          >
            Manifesto
          </button>
          <button
            onClick={() => handleNavClick("journey")}
            className="nav-pill-btn"
          >
            The Route
          </button>
          <button
            onClick={() => handleNavClick("testimonials")}
            className="nav-pill-btn"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick("calculator")}
            className="nav-pill-btn"
          >
            Estimator
          </button>
        </div>

        {/* Center Brand Title */}
        <div className="pointer-events-auto">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              soundFx.playThrottle();
            }}
            className="flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-[rgba(15,30,19,0.08)] shadow-xs hover:border-[#FF5400]/40 transition-all hover:-translate-y-0.5 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded-full bg-[#FF5400] text-white flex items-center justify-center font-black text-xs shadow-xs">
              26
            </div>
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-black">
              TWO 26 <span className="text-[#FF5400]">DRIVE</span>
            </span>
          </a>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3.5 pointer-events-auto">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-black/70">
            <span className="navbar-status-dot" />
            <span>14 Cars Available</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF3EE] border border-[rgba(15,30,19,0.08)] text-black flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-xs"
            title={soundActive ? "Mute audio effects" : "Enable audio effects"}
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-[#FF5400]" />
            ) : (
              <VolumeX className="w-4 h-4 text-black/40" />
            )}
          </button>

          {/* Magnetic CTA Button */}
          <button
            ref={ctaBtnRef}
            onClick={() => {
              soundFx.playThrottle();
              onOpenBooking();
            }}
            className="cta-pill-btn group"
          >
            <span className="font-bold text-xs sm:text-sm">Reserve Keys</span>
            <div className="cta-arrow-badge">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
