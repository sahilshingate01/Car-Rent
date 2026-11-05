"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPinned() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const para = textRef.current;
    if (!section || !para) return;

    const ctx = gsap.context(() => {
      const getPinDistance = () => {
        if (typeof window === "undefined") return 1500;
        const width = window.innerWidth;
        if (width < 480) return 900;
        if (width < 992) return 1300;
        return 1800; // Desktop scroll scrub distance
      };

      const rawText = para.textContent || "";
      para.innerHTML = rawText
        .split("")
        .map(
          (c) =>
            `<span class="about-char" style="display:inline-block;">${
              c === " " ? "&nbsp;" : c
            }</span>`
        )
        .join("");

      const chars = para.querySelectorAll(".about-char");
      const pills = section.querySelectorAll(".about-pill");

      // Initial character state
      gsap.set(chars, {
        color: "rgba(255, 84, 0, 0.45)",
        scale: 1,
        rotation: 0,
        display: "inline-block",
        transformOrigin: "center center",
        textShadow: "0px 0px 0px rgba(255,84,0,0)",
        willChange: "transform, color",
        backfaceVisibility: "hidden",
      });

      if (pills.length) {
        gsap.set(pills, {
          opacity: 0,
          scale: 0.6,
          y: 24,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        });
      }

      // Scrubbed Pinned Timeline (Screens pauses while reading)
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const totalChars = chars.length;
      const letterAnimSpan = 85;

      chars.forEach((char, i) => {
        const startTime = (i / totalChars) * letterAnimSpan;

        // Stage 1: Glow saturated orange with subtle pop
        pinTl.to(
          char,
          {
            color: "#FF5400",
            scale: 1.12,
            rotation: () => gsap.utils.random(-3.5, 3.5),
            textShadow: "0.5px 0.5px 0 #FF5400, -0.5px -0.5px 0 #FF5400",
            duration: 3.5,
            ease: "power1.out",
          },
          startTime
        );

        // Stage 2: Settle to clean crisp black #000000
        pinTl.to(
          char,
          {
            color: "#000000",
            scale: 1,
            rotation: 0,
            textShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 3.5,
            ease: "power1.inOut",
          },
          startTime + 3.5
        );
      });

      // Pop-in floating metric stickers at scroll milestones
      if (pills[0]) {
        pinTl.to(
          pills[0],
          { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
          28
        );
      }
      if (pills[1]) {
        pinTl.to(
          pills[1],
          { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
          60
        );
      }
      if (pills[2]) {
        pinTl.to(
          pills[2],
          { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
          88
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-about relative w-full min-h-screen py-24 px-4 sm:px-6 md:px-8 bg-[#F8EEE8] flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        {/* Subheader Pill */}
        <div className="mb-8">
          <span className="inline-block text-xs font-black tracking-widest text-black/70 uppercase px-4 py-1.5 rounded-full bg-white border border-[rgba(15,30,19,0.08)] shadow-xs">
            A Bit About Us
          </span>
        </div>

        {/* Big Pinned Paragraph with Kinetic Wave (Rekeep / Two26 Signature) */}
        <div className="max-w-4xl mx-auto px-2">
          <p
            ref={textRef}
            className="about-para font-display text-2xl sm:text-4xl md:text-5xl font-black leading-[1.25] tracking-tight text-[#FF5400] select-none"
          >
            We believe renting an extraordinary automobile shouldn&apos;t feel
            like standing in an airport basement queue signing sixteen
            carbon-copy waivers. That&apos;s why we eliminated the counters,
            killed the surprise fees, and curated an unapologetic fleet of
            thoroughbred machines. Hand-detailed, delivered straight to your
            curb with a full tank and ready for the throttle.
          </p>
        </div>

        {/* Milestone Pop-in Pills that appear during character scrub */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mt-14">
          <div className="about-pill bg-white p-5 rounded-3xl border border-[rgba(15,30,19,0.08)] shadow-lg text-center">
            <div className="font-display text-3xl sm:text-4xl font-black text-[#FF5400]">
              0 min
            </div>
            <div className="text-xs font-bold text-black uppercase tracking-wider mt-1">
              Counter Wait
            </div>
            <div className="text-[11px] text-black/50">Runway to driver seat</div>
          </div>

          <div className="about-pill bg-white p-5 rounded-3xl border border-[rgba(15,30,19,0.08)] shadow-lg text-center">
            <div className="font-display text-3xl sm:text-4xl font-black text-black">
              100%
            </div>
            <div className="text-xs font-bold text-black uppercase tracking-wider mt-1">
              Exact Chassis
            </div>
            <div className="text-[11px] text-black/50">No downgrade excuses</div>
          </div>

          <div className="about-pill bg-white p-5 rounded-3xl border border-[rgba(15,30,19,0.08)] shadow-lg text-center">
            <div className="font-display text-3xl sm:text-4xl font-black text-[#FF5400]">
              4.98 ★
            </div>
            <div className="text-xs font-bold text-black uppercase tracking-wider mt-1">
              Driver Rating
            </div>
            <div className="text-[11px] text-black/50">4,200+ California joyrides</div>
          </div>
        </div>
      </div>
    </section>
  );
}
