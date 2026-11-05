"use client";

import React, { useEffect, useRef } from "react";
import { soundFx } from "@/utils/sound";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Milestone {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  align: "left" | "right";
  bulletPoints: string[];
}

const MILESTONES: Milestone[] = [
  {
    step: "01",
    title: "PICK YOUR POISON",
    subtitle: "No 'or similar' downgrade surprises",
    description:
      "Select your exact dream machine down to the VIN, exterior paint, and exhaust note. Whether you want a 9,000 RPM track scalpel or a vintage open-top Bronco, you get the exact keys you chose.",
    badge: "100% Guaranteed Model",
    icon: "🏎️",
    align: "left",
    bulletPoints: ["Guaranteed VIN & spec", "Hand-detailed & sanitised", "93-Octane full tank"],
  },
  {
    step: "02",
    title: "DIGITAL HANDOVER",
    subtitle: "60-second curb drop-off",
    description:
      "Skip the airport shuttle and the neon-lit basement counter. Our concierge drops your car at your hotel driveway or airport curbside. Tap 'Unlock' on your phone and you are immediately on the road.",
    badge: "Keyless Smartphone Unlock",
    icon: "📱",
    align: "right",
    bulletPoints: ["No counter paperwork", "Real-time valet tracking", "Instant NFC key pairing"],
  },
  {
    step: "03",
    title: "CURATED SCENIC ROUTES",
    subtitle: "Pre-programmed navigation",
    description:
      "Don't waste time in gridlocked commuter traffic. Every vehicle comes pre-loaded with custom GPS canyon loops, cliffside coastal runs, and scenic mountain lookouts with verified smooth asphalt.",
    badge: "The Driver's Route Map",
    icon: "🗺️",
    align: "left",
    bulletPoints: ["Malibu canyon passes", "Pacific Coast Highway guides", "Mountain espresso waypoints"],
  },
  {
    step: "04",
    title: "UNRESTRICTED FREEDOM",
    subtitle: "Zero-deductible peace of mind",
    description:
      "Enjoy the throttle with confidence. All rentals feature comprehensive protection options, complimentary toll transponders, 24/7 flatbed roadside dispatch, and generous daily miles.",
    badge: "Zero Hidden Deductibles",
    icon: "🛡️",
    align: "right",
    bulletPoints: ["Comprehensive damage protection", "Automated highway toll transponder", "24/7 rapid dispatch crew"],
  },
  {
    step: "05",
    title: "DROP & FLY RETURN",
    subtitle: "Zero return friction",
    description:
      "When your joyride concludes, pull up directly to any partner airport valet terminal or hotel concierge. Leave the virtual key, walk straight to your gate, and return on empty with zero fuel penalty gouging.",
    badge: "No Return Headaches",
    icon: "✈️",
    align: "left",
    bulletPoints: ["Terminal valet drop-off", "Zero fuel surcharge gouging", "Digital inspection receipt in 5 mins"],
  },
];

export default function WindingRoadSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const darkPathRef = useRef<SVGPathElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const roadDarkPath = darkPathRef.current;
    const follower = followerRef.current;
    const container = containerRef.current;
    if (!section || !roadDarkPath || !container) return;

    const ctx = gsap.context(() => {
      const pathLength = roadDarkPath.getTotalLength();
      roadDarkPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      roadDarkPath.style.strokeDashoffset = `${pathLength}`;

      const roadTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 45%",
          end: "bottom 85%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            if (follower && pathLength) {
              const currentDist = progress * pathLength;
              const pt = roadDarkPath.getPointAtLength(currentDist);
              const containerRect = container.getBoundingClientRect();

              const scaleX = containerRect.width / 1320;
              const scaleY = containerRect.height / 2200;

              const posX = pt.x * scaleX;
              const posY = pt.y * scaleY;

              follower.style.transform = `translate(${posX - 24}px, ${posY - 24}px)`;
            }
          },
        },
      });

      roadTl.to(roadDarkPath, {
        strokeDashoffset: 0,
        ease: "none",
      });

      // Station proximity reveals with elastic bounce (from Rekeep / Two26)
      const stations = section.querySelectorAll(".road-station");
      stations.forEach((station) => {
        gsap.from(station, {
          scrollTrigger: {
            trigger: station,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.6)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const roadD =
    "M 1250 80 C 1200 80, 850 140, 750 320 C 650 500, 250 540, 150 720 C 50 900, 120 1150, 480 1200 C 840 1250, 1200 1320, 1150 1550 C 1100 1780, 750 1850, 450 1950 C 200 2030, 100 2150, 60 2200";

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#FAF3EE] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto relative">
        {/* Section Heading */}
        <div className="text-center mb-20 sm:mb-28">
          <div className="inline-block text-xs font-black tracking-widest text-[#FF5400] uppercase px-4 py-1.5 rounded-full bg-white border border-[rgba(15,30,19,0.08)] mb-3 shadow-xs">
            The Two26 Experience
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-black uppercase tracking-tight">
            THE SCENIC <span className="text-[#FF5400]">ROADMAP</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-black/60 max-w-xl mx-auto font-medium">
            From the moment you reserve to the final canyon apex — zero friction, zero paperwork, all throttle.
          </p>
        </div>

        {/* Winding Road Container with exact SVG Path & Follower */}
        <div ref={containerRef} className="winding-road-container relative min-h-[2000px]">
          {/* Background Peach SVG Road Track */}
          <svg
            className="road-svg-bg hidden md:block"
            viewBox="0 0 1320 2200"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d={roadD} />
          </svg>

          {/* Foreground Animated Orange Road Stroke */}
          <svg
            className="road-svg-dark hidden md:block"
            viewBox="0 0 1320 2200"
            fill="none"
            preserveAspectRatio="none"
          >
            <path ref={darkPathRef} d={roadD} />
          </svg>

          {/* The Follower Miniature Sports Car */}
          <div
            ref={followerRef}
            className="road-follower hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black text-white text-xl shadow-2xl border-2 border-[#FF5400] transition-transform duration-75"
          >
            🏎️
          </div>

          {/* Milestones Distributed along the Road */}
          <div className="space-y-24 sm:space-y-36 relative z-10 pt-10">
            {MILESTONES.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={m.step}
                  className={`road-station flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full max-w-lg">
                    <div
                      onClick={() => soundFx.playClick()}
                      className="group bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(15,30,19,0.08)] hover:border-[#FF5400] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      {/* Step & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-display text-4xl sm:text-5xl font-black text-[#FF5400]">
                          {m.step}
                        </span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FAF3EE] text-black/80 border border-black/5">
                          {m.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-black group-hover:text-[#FF5400] transition-colors uppercase tracking-tight">
                        {m.title}
                      </h3>
                      <div className="text-xs font-bold text-[#FF5400] mt-1 mb-3">
                        {m.subtitle}
                      </div>
                      <p className="text-sm text-black/70 font-medium leading-relaxed">
                        {m.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="mt-5 pt-4 border-t border-[rgba(15,30,19,0.08)] space-y-2">
                        {m.bulletPoints.map((pt) => (
                          <div key={pt} className="flex items-center gap-2 text-xs font-semibold text-black/80">
                            <span className="w-4 h-4 rounded-full bg-[#F8EEE8] text-[#FF5400] flex items-center justify-center text-[10px] shrink-0 font-bold">
                              ✓
                            </span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="shrink-0 w-16 h-16 rounded-full bg-white border-2 border-[rgba(15,30,19,0.1)] flex items-center justify-center text-2xl shadow-md z-20 group-hover:border-[#FF5400] group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>

                  {/* Spacer for balance */}
                  <div className="hidden md:block flex-1 max-w-lg" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
