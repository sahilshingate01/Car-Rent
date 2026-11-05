"use client";

import React, { useEffect, useRef, useState } from "react";
import { soundFx } from "@/utils/sound";
import { Calendar, MapPin, Gauge, Sparkles, ArrowRight, ShieldCheck, Flame, KeyRound } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  onSearch: (city: string, category: string) => void;
  onOpenBooking: () => void;
}

export default function Hero({ onSearch, onOpenBooking }: HeroProps) {
  const [city, setCity] = useState("Los Angeles, CA");
  const [category, setCategory] = useState("All");
  const [pickupDate, setPickupDate] = useState("Tomorrow, 10:00 AM");

  const heroRef = useRef<HTMLDivElement | null>(null);

  // GSAP Entrance & Floating Bobbing Animations from Two26 / Rekeep
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Stagger in stickers with elastic bounce
      gsap.from(".hero-headline-line", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-sticker", {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(2)",
      });

      gsap.from(".hero-illustration-box", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // 2. Continuous playful floating bobbing on hero stickers with sine loops
      gsap.to(".hero-sticker-1", {
        y: -9,
        rotation: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-sticker-2", {
        y: 10,
        rotation: 6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(".hero-sticker-3", {
        y: -8,
        rotation: -4,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      gsap.to(".hero-sticker-4", {
        y: 8,
        rotation: 7,
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playThrottle();
    onSearch(city, category);
    const fleetEl = document.getElementById("fleet");
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 bg-[#F8EEE8]"
    >
      {/* Background Stylized Orange Vector Loops (Matching Two26 & Rekeep Image 1) */}
      <div className="absolute top-20 left-[-20px] md:left-6 w-56 h-[480px] pointer-events-none opacity-85 z-0 hidden sm:block">
        <svg viewBox="0 0 220 540" fill="none" className="w-full h-full">
          <path
            d="M-40 40C80 40 180 120 180 240C180 380 40 420 20 480C2 530 60 560 120 560"
            stroke="#FF5400"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute top-24 right-[-20px] md:right-6 w-64 h-[480px] pointer-events-none opacity-85 z-0 hidden sm:block">
        <svg viewBox="0 0 320 500" fill="none" className="w-full h-full">
          <path
            d="M340 50C210 50 110 130 110 240C110 370 240 400 260 460C275 510 220 540 160 540"
            stroke="#FF5400"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[rgba(15,30,19,0.08)] text-xs font-bold uppercase tracking-wider text-[#FF5400] mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Anti-Airport Car Rental Studio</span>
        </div>

        {/* Giant Headline with Overlapping Floating Sticker Badges */}
        <div className="relative inline-block w-full select-none mb-6">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-black tracking-[-0.035em] leading-[0.92] text-[#FF5400] uppercase">
            <span className="hero-headline-line block">LOOKING</span>
            <span className="hero-headline-line block">SUSPICIOUSLY GOOD</span>
          </h1>

          {/* Floating Pill Badges Overlapping the Words (Two26 Style) */}
          <div
            onClick={() => soundFx.playClick()}
            className="hero-sticker hero-sticker-1 absolute top-[6%] left-[6%] sm:left-[16%] px-4 py-1.5 rounded-full bg-[#101412] text-white text-xs sm:text-sm font-bold tracking-tight shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
          >
            Zero Paperwork
          </div>

          <div
            onClick={() => soundFx.playClick()}
            className="hero-sticker hero-sticker-2 absolute top-[4%] right-[8%] sm:right-[18%] px-4 py-1.5 rounded-full bg-[#101412] text-white text-xs sm:text-sm font-bold tracking-tight shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
          >
            Keyless 60s Drop
          </div>

          <div
            onClick={() => soundFx.playClick()}
            className="hero-sticker hero-sticker-3 absolute bottom-[4%] left-[10%] sm:left-[22%] px-4 py-1.5 rounded-full bg-[#101412] text-white text-xs sm:text-sm font-bold tracking-tight shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
          >
            Curated Supercars
          </div>

          <div
            onClick={() => soundFx.playClick()}
            className="hero-sticker hero-sticker-4 absolute bottom-[6%] right-[8%] sm:right-[15%] px-4 py-1.5 rounded-full bg-[#101412] text-white text-xs sm:text-sm font-bold tracking-tight shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
          >
            No Hidden BS
          </div>
        </div>

        {/* Editorial Illustration with Walking Characters & Cats (from Rekeep/Two26 Image 1) */}
        <div className="hero-illustration-box relative max-w-4xl mx-auto my-6 px-2 sm:px-4">
          <div className="relative bg-[#FAF3EE] rounded-3xl p-5 sm:p-8 border border-[rgba(15,30,19,0.08)] shadow-xs overflow-hidden">
            {/* SVG Artwork with Left Person (TWO), Right Person (26), Speedster, and Cats */}
            <div className="relative w-full max-w-3xl mx-auto">
              <svg
                viewBox="0 0 860 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-sm select-none"
              >
                {/* Left Walking Driver Carrying 'TWO' sign */}
                <g id="person-left">
                  <path d="M220 90C220 75 235 65 250 70C265 75 265 90 260 105C255 120 240 125 230 115C220 105 220 95 220 90Z" fill="#141715"/>
                  <rect x="240" y="85" width="22" height="10" rx="3" fill="#000000"/>
                  <path d="M205 125L265 115L285 220L225 230L205 125Z" fill="#FF5400"/>
                  <path d="M225 230L210 310L235 315L250 230Z" fill="#F9E2E1"/>
                  <path d="M255 230L280 300L260 315L245 230Z" fill="#FF5400"/>
                  <path d="M200 310H240V330H200Z" fill="#141715"/>
                  <path d="M260 305H295V325H260Z" fill="#141715"/>
                  
                  {/* Cardboard Sign 'TWO' */}
                  <g id="sign-two" transform="rotate(-4 160 140)">
                    <rect x="140" y="140" width="155" height="98" rx="6" fill="#F3D5C5" stroke="#E3BCA8" strokeWidth="2"/>
                    <path d="M155 155L200 190L280 170" stroke="#E3BCA8" strokeWidth="2" fill="none"/>
                    <text x="165" y="210" fontFamily="'Mdnichrometest', sans-serif" fontWeight="900" fontSize="56" fill="rgba(255, 84, 0, 0.55)" letterSpacing="-2">TWO</text>
                  </g>
                </g>

                {/* Center Retro Speedster Car Illustration */}
                <g id="center-car" transform="translate(300, 140)">
                  <path
                    d="M10 65 Q35 35 85 28 L155 26 Q185 28 205 45 L230 60 Q245 65 245 74 L240 84 Q235 90 220 90 L20 90 Q5 90 2 82 L2 72 Z"
                    fill="#FF5400"
                    stroke="#0A0A0A"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  {/* Windshield */}
                  <path d="M90 32 L130 31 L120 54 L75 54 Z" fill="#FFFBF8" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Cockpit Window */}
                  <path d="M138 32 L168 33 Q182 36 190 54 L130 54 Z" fill="#FFFBF8" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Driver in Helmet */}
                  <circle cx="110" cy="42" r="7" fill="#0A0A0A" />
                  <path d="M106 41 Q113 38 116 41" stroke="#FF5400" strokeWidth="1.5" />
                  {/* Racing Number 26 */}
                  <circle cx="150" cy="70" r="11" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
                  <text x="150" y="74" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#0A0A0A" textAnchor="middle">26</text>
                  {/* Front & Rear Wheels */}
                  <g>
                    <circle cx="55" cy="88" r="17" fill="#141715" stroke="#0A0A0A" strokeWidth="2.5" />
                    <circle cx="55" cy="88" r="8" fill="#E2E2E2" stroke="#0A0A0A" strokeWidth="1.5" />
                    <circle cx="55" cy="88" r="2.5" fill="#FF5400" />
                  </g>
                  <g>
                    <circle cx="195" cy="88" r="17" fill="#141715" stroke="#0A0A0A" strokeWidth="2.5" />
                    <circle cx="195" cy="88" r="8" fill="#E2E2E2" stroke="#0A0A0A" strokeWidth="1.5" />
                    <circle cx="195" cy="88" r="2.5" fill="#FF5400" />
                  </g>
                </g>

                {/* Right Walking Driver Carrying '26' sign */}
                <g id="person-right">
                  <circle cx="630" cy="85" r="24" fill="#141715"/>
                  <path d="M610 85C610 65 630 65 645 75C660 85 650 110 635 110C620 110 610 95 610 85Z" fill="#F4BAA2"/>
                  <path d="M590 120L650 110L675 200L615 205Z" fill="#FFFBF8"/>
                  <path d="M615 205L555 315L585 325L640 210Z" fill="#FF5400"/>
                  <path d="M645 205L685 320L715 310L665 205Z" fill="#FF5400"/>
                  <path d="M540 315H585V335H540Z" fill="#141715"/>
                  <path d="M685 315H730V335H685Z" fill="#141715"/>

                  {/* Cardboard Sign '26' */}
                  <g id="sign-26" transform="rotate(4 590 130)">
                    <rect x="585" y="130" width="165" height="98" rx="6" fill="#F3D5C5" stroke="#E3BCA8" strokeWidth="2"/>
                    <path d="M600 150L670 195L740 160" stroke="#E3BCA8" strokeWidth="2" fill="none"/>
                    <text x="605" y="202" fontFamily="'Mdnichrometest', sans-serif" fontWeight="900" fontSize="56" fill="rgba(255, 84, 0, 0.55)" letterSpacing="-1">26</text>
                  </g>
                </g>

                {/* Orange Cat Walking on Left */}
                <g id="cat-left">
                  <path d="M70 300L70 270L80 250L85 270L95 275L100 260L105 275L115 285L130 285L150 300L145 330L125 330L120 305L95 305L85 330L65 330L70 300Z" fill="#FF5400"/>
                  <path d="M70 270C65 230 75 220 80 220C85 220 80 240 75 270Z" fill="#FF5400"/>
                </g>

                {/* Black Cat Walking on Right */}
                <g id="cat-right">
                  <path d="M770 300L785 280L795 270L805 280L820 285L840 300L860 315L845 330L830 330L825 310L800 310L790 330L770 330L770 300Z" fill="#141715"/>
                  <path d="M770 300C755 250 770 230 775 230C780 230 775 260 770 300Z" fill="#141715"/>
                  <circle cx="775" cy="232" r="5" fill="#FF5400"/>
                </g>
              </svg>
            </div>

            {/* Micro Highlights Pill Row */}
            <div className="mt-4 pt-4 border-t border-[rgba(15,30,19,0.08)] flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-black/75">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#FF5400]" />
                Keyless 60s Unlock
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5400]" />
                Zero Deductible Options
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF5400]" />
                Curated GPS Canyon Passes
              </span>
            </div>
          </div>
        </div>

        {/* Quick Search Reservation Bar */}
        <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 border border-[rgba(15,30,19,0.12)] shadow-xl">
          <form
            onSubmit={handleSubmitSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5"
          >
            {/* City */}
            <div className="flex-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[rgba(15,30,19,0.08)] text-left">
              <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-0.5">
                Delivery Hub
              </label>
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <MapPin className="w-4 h-4 text-[#FF5400] shrink-0" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent font-bold text-black outline-none w-full cursor-pointer"
                >
                  <option value="Los Angeles, CA">Los Angeles (LAX & Beverly Hills)</option>
                  <option value="Miami, FL">Miami (South Beach & Executive)</option>
                  <option value="New York, NY">New York (Manhattan & JFK Ramp)</option>
                  <option value="San Francisco, CA">San Francisco (Marina & SFO)</option>
                  <option value="Las Vegas, NV">Las Vegas (Strip & Henderson)</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="flex-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[rgba(15,30,19,0.08)] text-left">
              <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-0.5">
                Chassis Category
              </label>
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <Gauge className="w-4 h-4 text-[#FF5400] shrink-0" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent font-bold text-black outline-none w-full cursor-pointer"
                >
                  <option value="All">All Categories (8 Machines)</option>
                  <option value="Exotics">Exotics & Supercars</option>
                  <option value="Classics">Classic Restomods & Muscle</option>
                  <option value="Hyper Electric">Hyper Electric Missiles</option>
                  <option value="SUVs">Executive & G-Wagon SUVs</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="flex-1 px-4 py-2 text-left">
              <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-0.5">
                Rental Window
              </label>
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <Calendar className="w-4 h-4 text-[#FF5400] shrink-0" />
                <span className="truncate text-xs sm:text-sm font-semibold text-black/80">
                  {pickupDate}
                </span>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl sm:rounded-full bg-[#FF5400] hover:bg-[#E04800] text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
