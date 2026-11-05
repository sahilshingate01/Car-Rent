"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RibbonMarquee() {
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const unitRef = useRef<SVGTSpanElement | null>(null);

  useEffect(() => {
    const textPath = textPathRef.current;
    const unit = unitRef.current;
    if (!textPath) return;

    let unitLength = 1600;
    try {
      if (unit && typeof unit.getComputedTextLength === "function") {
        unitLength = unit.getComputedTextLength() || 1600;
      }
    } catch {
      unitLength = 1600;
    }

    const duration = unitLength / 65; // Relaxed readable speed from Rekeep

    const anim = gsap.to(textPath, {
      attr: { startOffset: -unitLength },
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const marqueeSnippet =
    "UNLIMITED MILES INCLUDED • FULL DAMAGE PROTECTION • KEYLESS 60-SEC UNLOCK • 24/7 ROADSIDE CONCIERGE • HAND-WASHED & VALET DELIVERED • ZERO DEPOSIT BS • 100% CHASSIS GUARANTEE • ";

  return (
    <div className="relative w-full overflow-hidden my-6 py-2 select-none pointer-events-none">
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto block overflow-visible"
      >
        <defs>
          <path
            id="hero-marquee-curve"
            d="M-40 210 C180 120 460 70 710 50 C940 32 1170 38 1480 65 L 5000 350"
            fill="none"
          />
        </defs>

        {/* Background Thick Orange Ribbon Stroke */}
        <path
          d="M-40 210 C180 120 460 70 710 50 C940 32 1170 38 1480 65"
          stroke="#FF5400"
          strokeWidth="110"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Text Along Path using Mdnichrometest font */}
        <text
          fill="#FFFFFF"
          fontSize="34"
          fontWeight="900"
          letterSpacing="0.05em"
          dominantBaseline="central"
          className="font-display uppercase"
          style={{ dominantBaseline: "central" }}
        >
          <textPath
            ref={textPathRef}
            href="#hero-marquee-curve"
            className="hero-marquee-tp"
            startOffset="0px"
          >
            <tspan ref={unitRef} className="marquee-unit">
              {marqueeSnippet}
            </tspan>
            <tspan>{marqueeSnippet}</tspan>
            <tspan>{marqueeSnippet}</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
