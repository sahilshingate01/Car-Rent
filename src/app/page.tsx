"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/sound";
import { FLEET_DATA, Car } from "@/data/cars";
import {
  Volume2,
  VolumeX,
  ArrowUpRight,
  Sparkles,
  KeyRound,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Gauge,
  X,
  ArrowRight,
  ArrowLeft,
  Sliders,
} from "lucide-react";

export default function Home() {
  const [soundActive, setSoundActive] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Los Angeles (LAX & Beverly Hills)");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCar, setActiveCar] = useState<Car>(FLEET_DATA[0]);
  const [modalStep, setModalStep] = useState(1);
  const [rentalDays, setRentalDays] = useState(3);
  const [protectionPlan, setProtectionPlan] = useState("peace");
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);

  // Accordion active state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Refs for animations
  const pageRef = useRef<HTMLDivElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const unitRef = useRef<SVGTSpanElement | null>(null);
  const darkPathRef = useRef<SVGPathElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const roadContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLParagraphElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  // Sound toggle
  const toggleSound = () => {
    const next = soundFx.toggleSound();
    setSoundActive(next);
  };

  const lenisRef = useRef<Lenis | null>(null);

  // Open booking modal
  const handleOpenBooking = (car?: Car) => {
    soundFx.playThrottle();
    if (car) setActiveCar(car);
    setModalStep(1);
    setIsModalOpen(true);
  };

  // Scroll to section with Lenis kinetic smoothing
  const scrollToId = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          offset: -20,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // ==========================================================================
  // GSAP + LENIS + SCROLLTRIGGER KINETIC ANIMATION ENGINE (From Rekeep main.js)
  // ==========================================================================
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for all internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#" || href === "#!") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        soundFx.playClick();
        lenis.scrollTo(el as HTMLElement, {
          offset: -20,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Navbar scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // GSAP Context for section animations
    const ctx = gsap.context(() => {
      // 2. Hero Section Animations & Floating Sticker Sine Loops
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".hero-headline", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          delay: 0.15,
        })
        .from(
          ".hero-sticker",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.6"
        )
        .from(
          ".hero-illustration-wrap",
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-search-wrap",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        );

      // Continuous playful floating bobbing on hero stickers with sine loops
      gsap.to(".hero-sticker-1", {
        y: -8,
        rotation: -9,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-sticker-2", {
        y: 9,
        rotation: 5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(".hero-sticker-3", {
        y: -7,
        rotation: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      // 3. Curved Ribbon Marquee Loop (startOffset loop)
      const textPath = textPathRef.current;
      const unit = unitRef.current;
      if (textPath) {
        let unitLength = 1400;
        try {
          if (unit && typeof unit.getComputedTextLength === "function") {
            unitLength = unit.getComputedTextLength() || 1400;
          }
        } catch {
          unitLength = 1400;
        }
        const duration = unitLength / 65;

        gsap.to(textPath, {
          attr: { startOffset: -unitLength },
          duration: duration,
          ease: "none",
          repeat: -1,
        });
      }

      // 4. Kinetic Character Scrub & Pinned Screen Wave
      const aboutSection = aboutSectionRef.current;
      const aboutPara = aboutTextRef.current;
      if (aboutSection && aboutPara) {
        const getPinDistance = () => {
          if (typeof window === "undefined") return 1500;
          const width = window.innerWidth;
          if (width < 480) return 1100;
          if (width < 992) return 1500;
          return 2100; // Desktop scroll distance from Rekeep
        };

        gsap.set(aboutSection, {
          willChange: "transform",
          backfaceVisibility: "hidden",
          force3D: true,
        });

        const rawText = aboutPara.textContent?.trim() || "";
        aboutPara.innerHTML = rawText
          .split("")
          .map(
            (c) =>
              `<span class="about-char" style="display:inline-block;">${
                c === " " ? "&nbsp;" : c
              }</span>`
          )
          .join("");

        const chars = aboutPara.querySelectorAll(".about-char");
        const pills = aboutSection.querySelectorAll(".about-pill");

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

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: "top top",
            end: () => `+=${getPinDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: window.innerWidth < 992 ? 0.6 : 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        const totalChars = chars.length;
        const letterAnimSpan = 85;

        chars.forEach((char, i) => {
          const startTime = (i / totalChars) * letterAnimSpan;

          pinTl.to(
            char,
            {
              color: "#FF5400",
              scale: 1.1,
              rotation: () => gsap.utils.random(-3.5, 3.5),
              textShadow: "0.5px 0.5px 0 #FF5400, -0.5px -0.5px 0 #FF5400",
              duration: 3.5,
              ease: "power1.out",
            },
            startTime
          );

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

        if (pills[0]) {
          pinTl.to(
            pills[0],
            { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
            32
          );
        }
        if (pills[1]) {
          pinTl.to(
            pills[1],
            { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
            68
          );
        }
        if (pills[2]) {
          pinTl.to(
            pills[2],
            { opacity: 1, scale: 1, y: 0, duration: 6, ease: "back.out(2)" },
            94
          );
        }
      }

      // 5. Interactive Winding Road SVG Draw & Follower
      const roadDarkPath = darkPathRef.current;
      const follower = followerRef.current;
      const roadContainer = roadContainerRef.current;
      if (roadDarkPath && follower && roadContainer) {
        const pathLength = roadDarkPath.getTotalLength();
        roadDarkPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        roadDarkPath.style.strokeDashoffset = `${pathLength}`;

        const roadTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#pathway",
            start: "top 40%",
            end: "bottom 85%",
            scrub: 0.8,
            onUpdate: (self) => {
              const progress = self.progress;
              if (follower && pathLength) {
                const currentDist = progress * pathLength;
                const pt = roadDarkPath.getPointAtLength(currentDist);
                const containerRect = roadContainer.getBoundingClientRect();

                const scaleX = containerRect.width / 1320;
                const scaleY = containerRect.height / 2200;

                const posX = pt.x * scaleX;
                const posY = pt.y * scaleY;

                follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
              }
            },
          },
        });

        roadTl.to(roadDarkPath, {
          strokeDashoffset: 0,
          ease: "none",
        });

        // Station Proximity Reveals
        const stations = document.querySelectorAll(".road-station");
        stations.forEach((station) => {
          gsap.from(station, {
            scrollTrigger: {
              trigger: station,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: "back.out(1.6)",
          });
        });
      }

      // 6. Magnetic Button Cursor Physics
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const magneticBtns = document.querySelectorAll(
          ".cta-pill-btn, .btn-primary-orange, .nav-pill-btn"
        );

        magneticBtns.forEach((btn) => {
          const moveHandler = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = btn as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            gsap.to(target, {
              x: x * 0.28,
              y: y * 0.28,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const leaveHandler = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1.2, 0.4)",
            });
          };

          btn.addEventListener("mousemove", moveHandler);
          btn.addEventListener("mouseleave", leaveHandler);
        });
      }
    }, pageRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Pricing Calculation
  const baseRate = activeCar.pricePerDay * rentalDays;
  const protectionDaily = protectionPlan === "base" ? 0 : protectionPlan === "peace" ? 49 : 95;
  const protectionCost = protectionDaily * rentalDays;
  const curbsideDrop = 75;
  const subtotal = baseRate + protectionCost + curbsideDrop;
  const studioPromoDiscount = Math.round(subtotal * 0.15);
  const finalPrice = subtotal - studioPromoDiscount;

  const handleBookingComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !driverEmail) {
      alert("Please provide driver name and email.");
      return;
    }
    soundFx.playThrottle();
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#FF5400", "#000000", "#FFFFFF", "#F9E2E1"],
    });
    setModalStep(3);
  };

  return (
    <div ref={pageRef} className="page selection-orange">
      {/* ==========================================================================
           1. NAVIGATION BAR (100% Matching Rekeep & Two26)
           ========================================================================== */}
      <header className={`navbar-wrap ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="navbar-links">
            <button onClick={() => scrollToId("about")} className="nav-pill-btn">
              About
            </button>
            <button onClick={() => scrollToId("showcase")} className="nav-pill-btn">
              The Stable
            </button>
            <button onClick={() => scrollToId("pathway")} className="nav-pill-btn">
              The Pathway
            </button>
            <button onClick={() => scrollToId("features")} className="nav-pill-btn">
              Standards
            </button>
            <button onClick={() => scrollToId("pricing")} className="nav-pill-btn">
              Fleet Rates
            </button>
            <button onClick={() => scrollToId("faq")} className="nav-pill-btn">
              FAQ
            </button>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              soundFx.playThrottle();
            }}
            className="navbar-logo-wrap"
          >
            <div className="navbar-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
                <line x1="12" y1="2" x2="12" y2="9"/>
                <line x1="12" y1="15" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="9.88" y2="9.88"/>
                <line x1="14.12" y1="14.12" x2="19.07" y2="19.07"/>
              </svg>
            </div>
            <span className="navbar-logo-text">TWO26 DRIVE</span>
          </a>

          <div className="navbar-right">
            <div className="navbar-status">
              <span className="navbar-status-dot" />
              <span>14 Cars Available Today</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle Sound Effects"
              className="sound-toggle-btn"
              title={soundActive ? "Mute engine sounds" : "Enable engine sounds"}
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-[#FF5400]" />
              ) : (
                <VolumeX className="w-4 h-4 text-black/40" />
              )}
            </button>

            <button
              onClick={() => handleOpenBooking()}
              className="cta-pill-btn"
            >
              <span>Reserve Keys</span>
              <div className="cta-arrow-badge">↗</div>
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* ==========================================================================
             2. HERO SECTION (100% Matching Rekeep Image 1 with Headline & SVG)
             ========================================================================== */}
        <section className="section-hero" id="hero">
          {/* Left Decorative Orange Curved Loop Doodle */}
          <div className="hero-path-left">
            <svg viewBox="0 0 220 540" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M-40 40C80 40 180 120 180 240C180 380 40 420 20 480C2 530 60 560 120 560"
                stroke="#FF5400"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M-20 160C40 160 100 210 100 290C100 370 20 390 10 440"
                stroke="#FF5400"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Right Decorative Orange Curved Loop Doodle */}
          <div className="hero-path-right">
            <svg viewBox="0 0 320 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M340 50C210 50 110 130 110 240C110 370 240 400 260 460C275 510 220 540 160 540"
                stroke="#FF5400"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <circle
                cx="280"
                cy="240"
                r="140"
                stroke="#FF5400"
                strokeWidth="10"
                strokeDasharray="16 16"
                opacity="0.25"
              />
            </svg>
          </div>

          <div className="container hero-content">
            <div className="hero-headline-wrap">
              {/* Floating Angled Dark Pill Stickers Overlapping Headline */}
              <div
                onClick={() => soundFx.playClick()}
                className="hero-sticker hero-sticker-1 cursor-pointer"
              >
                Zero Paperwork BS
              </div>
              <div
                onClick={() => soundFx.playClick()}
                className="hero-sticker hero-sticker-2 cursor-pointer"
              >
                Keyless 60s Drop
              </div>
              <div
                onClick={() => soundFx.playClick()}
                className="hero-sticker hero-sticker-3 cursor-pointer"
              >
                Guaranteed Chassis Spec
              </div>

              <h1 className="hero-headline">
                <span className="block">DRIVING</span>
                <span className="block">SUSPICIOUSLY GOOD</span>
              </h1>
            </div>

            {/* Stylized Papercut Figures Walking Carrying Signage + Speedster & Cats (Image 1 Artwork) */}
            <div className="hero-illustration-wrap">
              <svg
                className="hero-illustration-svg"
                viewBox="0 0 860 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Person carrying 'TWO' sign */}
                <g id="person-left">
                  <path
                    d="M310 90C310 75 325 65 340 70C355 75 355 90 350 105C345 120 330 125 320 115C310 105 310 95 310 90Z"
                    fill="#141715"
                  />
                  <rect x="330" y="85" width="22" height="10" rx="3" fill="#000000" />
                  <path d="M295 125L355 115L375 220L315 230L295 125Z" fill="#FF5400" />
                  <path d="M315 230L300 310L325 315L340 230Z" fill="#F9E2E1" />
                  <path d="M345 230L370 300L350 315L335 230Z" fill="#FF5400" />
                  <path d="M290 310H330V330H290Z" fill="#141715" />
                  <path d="M350 305H385V325H350Z" fill="#141715" />

                  {/* Cardboard Signboard 'TWO' */}
                  <g id="sign-two" transform="rotate(-3 240 140)">
                    <rect
                      x="230"
                      y="140"
                      width="165"
                      height="105"
                      rx="6"
                      fill="#F3D5C5"
                      stroke="#E3BCA8"
                      strokeWidth="2"
                    />
                    <path d="M245 155L290 190L370 170" stroke="#E3BCA8" strokeWidth="2" fill="none" />
                    <text
                      x="250"
                      y="215"
                      fontFamily="'Mdnichrometest', sans-serif"
                      fontWeight="900"
                      fontSize="58"
                      fill="rgba(255, 84, 0, 0.45)"
                      letterSpacing="-2"
                    >
                      TWO
                    </text>
                  </g>
                </g>

                {/* Right Person carrying '26' sign */}
                <g id="person-right">
                  <circle cx="530" cy="85" r="24" fill="#141715" />
                  <path
                    d="M510 85C510 65 530 65 545 75C560 85 550 110 535 110C520 110 510 95 510 85Z"
                    fill="#F4BAA2"
                  />
                  <path d="M490 120L550 110L575 200L515 205Z" fill="#FAF3EE" />
                  <path d="M515 205L455 315L485 325L540 210Z" fill="#FF5400" />
                  <path d="M545 205L585 320L615 310L565 205Z" fill="#FF5400" />
                  <path d="M440 315H485V335H440Z" fill="#141715" />
                  <path d="M585 315H630V335H585Z" fill="#141715" />

                  {/* Cardboard Signboard '26' */}
                  <g id="sign-26" transform="rotate(4 480 130)">
                    <rect
                      x="475"
                      y="130"
                      width="180"
                      height="105"
                      rx="6"
                      fill="#F3D5C5"
                      stroke="#E3BCA8"
                      strokeWidth="2"
                    />
                    <path d="M490 150L560 195L630 160" stroke="#E3BCA8" strokeWidth="2" fill="none" />
                    <text
                      x="510"
                      y="205"
                      fontFamily="'Mdnichrometest', sans-serif"
                      fontWeight="900"
                      fontSize="58"
                      fill="rgba(255, 84, 0, 0.45)"
                      letterSpacing="-1"
                    >
                      26
                    </text>
                  </g>
                </g>

                {/* Orange Origami Cat on Left */}
                <g id="cat-left">
                  <path
                    d="M90 310L90 280L100 260L105 280L115 285L120 270L125 285L135 295L150 295L170 310L165 340L145 340L140 315L115 315L105 340L85 340L90 310Z"
                    fill="#FF5400"
                  />
                  <path d="M90 280C85 240 95 230 100 230C105 230 100 250 95 280Z" fill="#FF5400" />
                </g>

                {/* Black Stylized Cat on Right with Raised Tail */}
                <g id="cat-right">
                  <path
                    d="M720 310L735 290L745 280L755 290L770 295L790 310L810 325L795 340L780 340L775 320L750 320L740 340L720 340L720 310Z"
                    fill="#141715"
                  />
                  <path d="M720 310C705 260 720 240 725 240C730 240 725 270 720 310Z" fill="#141715" />
                  <circle cx="725" cy="242" r="5" fill="#FF5400" />
                </g>
              </svg>
            </div>

            {/* Quick Search Reservation Bar */}
            <div className="hero-search-wrap">
              <div className="hero-search-col">
                <span className="hero-search-label">Delivery Hub</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="hero-search-select"
                >
                  <option value="Los Angeles (LAX & Beverly Hills)">Los Angeles (LAX & Beverly Hills)</option>
                  <option value="Miami (South Beach & Executive)">Miami (South Beach & Executive)</option>
                  <option value="New York (Tribeca & JFK Ramp)">New York (Tribeca & JFK Ramp)</option>
                  <option value="San Francisco (Marina & SFO)">San Francisco (Marina & SFO)</option>
                  <option value="Las Vegas (Strip & Henderson)">Las Vegas (Strip & Henderson)</option>
                </select>
              </div>

              <div className="hero-search-col">
                <span className="hero-search-label">Chassis Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="hero-search-select"
                >
                  <option value="All">All Machines (8 Thoroughbreds)</option>
                  <option value="Exotics">Exotics & Supercars</option>
                  <option value="Classics">Classic Restomods & V8s</option>
                  <option value="Hyper Electric">Hyper Electric Missiles</option>
                  <option value="SUVs">Commanding SUVs</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playThrottle();
                  scrollToId("showcase");
                }}
                className="hero-search-btn"
              >
                <span>Find My Ride</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             3. CURVED RIBBON MARQUEE (Matching Rekeep Image 2)
             ========================================================================== */}
        <section className="section-ribbon-marquee">
          <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMid meet">
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

            {/* Text Along Path */}
            <text
              fill="#FFFFFF"
              fontSize="34"
              fontWeight="900"
              letterSpacing="0.04em"
              dominantBaseline="central"
              fontFamily="'Mdnichrometest', sans-serif"
            >
              <textPath
                ref={textPathRef}
                className="hero-marquee-tp"
                href="#hero-marquee-curve"
                startOffset="0px"
              >
                <tspan ref={unitRef} className="marquee-unit">
                  UNLIMITED MILES INCLUDED • FULL DAMAGE PROTECTION • KEYLESS 60-SEC UNLOCK • 24/7 ROADSIDE CONCIERGE • HAND-WASHED & VALET DELIVERED • ZERO DEPOSIT BS • 100% CHASSIS GUARANTEE • PURE ADRENALINE •{" "}
                </tspan>
                <tspan>
                  UNLIMITED MILES INCLUDED • FULL DAMAGE PROTECTION • KEYLESS 60-SEC UNLOCK • 24/7 ROADSIDE CONCIERGE • HAND-WASHED & VALET DELIVERED • ZERO DEPOSIT BS • 100% CHASSIS GUARANTEE • PURE ADRENALINE •{" "}
                </tspan>
              </textPath>
            </text>
          </svg>
        </section>

        {/* ==========================================================================
             4. ABOUT PINNED MANIFESTO WITH KINETIC CHARACTER SCRUB (Rekeep Image 3/4)
             ========================================================================== */}
        <section ref={aboutSectionRef} className="section-about" id="about">
          <div className="container">
            <div className="about-label">A Bit About Us</div>

            <p ref={aboutTextRef} className="about-para">
              We believe renting an extraordinary automobile shouldn&apos;t feel
              like standing in an airport basement queue signing sixteen
              carbon-copy waivers. That&apos;s why we eliminated the counters,
              killed the surprise deposit holds, and curated an unapologetic fleet
              of thoroughbred machines. Hand-detailed, delivered straight to your
              curb with a full tank and ready for the throttle.
            </p>

            <div className="about-pills-row">
              <div className="about-pill">
                <span className="about-pill-metric">0 min</span>
                <span className="about-pill-text">Counter Wait</span>
              </div>
              <div className="about-pill">
                <span className="about-pill-metric">100%</span>
                <span className="about-pill-text">Chassis Guaranteed</span>
              </div>
              <div className="about-pill">
                <span className="about-pill-metric">4.98 ★</span>
                <span className="about-pill-text">Driver Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             5. SHOWCASE SECTION (Device Dock, Spotlight Cards & Running Gallery)
             ========================================================================== */}
        <section className="section-showcase" id="showcase">
          <div className="container">
            <div className="showcase-header">
              <div className="section-label">Interactive Fleet Preview</div>
              <h2 className="section-title">Built for Speed. Zero Waiting Rooms.</h2>
              <p className="section-subtitle">
                Experience the actual car rental app in action. From keyless curbside unlock to pre-loaded canyon GPS routes, Two26 turns rental headaches into pure driving joy.
              </p>
            </div>

            {/* Device Mockup & Feature Spotlights Dock */}
            <div className="showcase-dock">
              {/* Left Spotlight Cards */}
              <div className="spotlight-cards-col">
                <div
                  onClick={() => soundFx.playClick()}
                  className="spotlight-card cursor-pointer"
                >
                  <div className="spotlight-card-icon">⚡</div>
                  <h3 className="spotlight-card-title">Instant Keyless Unlock</h3>
                  <p className="spotlight-card-desc">
                    Walk up to the car and tap &apos;Unlock&apos; on your smartphone. Rekeep-powered Bluetooth/NFC key activates in 400 milliseconds. Zero lines, zero physical keys.
                  </p>
                </div>

                <div
                  onClick={() => soundFx.playClick()}
                  className="spotlight-card cursor-pointer"
                >
                  <div className="spotlight-card-icon">🗺️</div>
                  <h3 className="spotlight-card-title">Curated Canyon GPS Routes</h3>
                  <p className="spotlight-card-desc">
                    Every ride comes pre-loaded with local canyon loops through Malibu, Angeles Crest, and Pacific Coast Highway with verified clean asphalt and scenic espresso lookouts.
                  </p>
                </div>
              </div>

              {/* Center Phone Mockup with Interactive Digital Cockpit App */}
              <div className="phone-mockup-frame">
                <div className="phone-island" />
                <div className="phone-screen">
                  <div className="cockpit-screen-wrap">
                    <div className="cockpit-header">
                      <span>TWO26 DIGITAL KEY</span>
                      <span className="text-[#FF5400] font-bold">CONNECTED</span>
                    </div>

                    <div className="my-2">
                      <div className="font-display text-lg font-black text-white">
                        {activeCar.name}
                      </div>
                      <div className="text-[11px] text-white/50 font-bold">
                        {activeCar.specs.hp} HP • {activeCar.color}
                      </div>
                    </div>

                    <div className="cockpit-car-image">
                      <Image
                        src={activeCar.image}
                        alt={activeCar.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/5 p-2 rounded-xl border border-white/10 mb-2">
                      <div>
                        <span className="text-white/40 block">0-60 MPH</span>
                        <span className="font-bold text-white">{activeCar.specs.acceleration}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block">FUEL / CHARGE</span>
                        <span className="font-bold text-emerald-400">100% Full</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playThrottle();
                        setPhoneUnlocked(!phoneUnlocked);
                      }}
                      className="cockpit-unlock-btn"
                    >
                      <span>{phoneUnlocked ? "DOORS UNLOCKED" : "HOLD TO UNLOCK"}</span>
                      <span>{phoneUnlocked ? "🔓" : "⚡"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Spotlight Cards */}
              <div className="spotlight-cards-col">
                <div
                  onClick={() => soundFx.playClick()}
                  className="spotlight-card cursor-pointer"
                >
                  <div className="spotlight-card-icon">🎯</div>
                  <h3 className="spotlight-card-title">100% Chassis Guarantee</h3>
                  <p className="spotlight-card-desc">
                    No &apos;or similar&apos; bait and switch. If you reserve the Shark Blue GT3 RS or 1974 Bronco Restomod, that exact VIN and exhaust note will be waiting curbside.
                  </p>
                </div>

                <div
                  onClick={() => soundFx.playClick()}
                  className="spotlight-card cursor-pointer"
                >
                  <div className="spotlight-card-icon">✈️</div>
                  <h3 className="spotlight-card-title">Drop & Fly Return</h3>
                  <p className="spotlight-card-desc">
                    Pull up directly to any airport terminal valet or downtown partner hub. Leave the keys, walk onto your flight, and return on empty with zero fuel price gouging.
                  </p>
                </div>
              </div>
            </div>

            {/* Horizontal Running Car Gallery Marquee */}
            <div className="marquee-shots-wrap">
              <div className="marquee-shots-track">
                {FLEET_DATA.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      soundFx.playThrottle();
                      setActiveCar(car);
                    }}
                    className="shot-card cursor-pointer"
                  >
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={360}
                      height={240}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                {/* Duplicate track for seamless infinite marquee */}
                {FLEET_DATA.map((car) => (
                  <div
                    key={`dup-${car.id}`}
                    onClick={() => {
                      soundFx.playThrottle();
                      setActiveCar(car);
                    }}
                    className="shot-card cursor-pointer"
                  >
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={360}
                      height={240}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             6. THE WINDING ROAD PATHWAY (100% Matching Rekeep Image 5)
             ========================================================================== */}
        <section className="section-services" id="pathway">
          <div className="container">
            <div className="services-header">
              <div className="section-label">The Two26 Pathway</div>
              <h2 className="services-giant-title">
                THIS IS <span className="orange">OUR ROUTE</span>
              </h2>
              <p className="section-subtitle">
                How Two26 delivers pure automotive joy in four effortless beats.
              </p>
            </div>

            {/* Winding Road Interactive Canvas */}
            <div ref={roadContainerRef} className="winding-road-container">
              {/* Faint Peach Background Track SVG */}
              <svg className="road-svg-bg" viewBox="0 0 1320 2200" fill="none">
                <path
                  d="M 1250 80 
                     C 1200 80, 850 140, 750 320 
                     C 650 500, 250 540, 150 720 
                     C 50 900, 120 1150, 480 1200 
                     C 840 1250, 1200 1320, 1150 1550 
                     C 1100 1780, 750 1850, 450 1950 
                     C 200 2030, 100 2150, 60 2200"
                />
              </svg>

              {/* Saturated Bold Orange Foreground Path Drawn on Scroll */}
              <svg className="road-svg-dark" viewBox="0 0 1320 2200" fill="none">
                <path
                  ref={darkPathRef}
                  d="M 1250 80 
                     C 1200 80, 850 140, 750 320 
                     C 650 500, 250 540, 150 720 
                     C 50 900, 120 1150, 480 1200 
                     C 840 1250, 1200 1320, 1150 1550 
                     C 1100 1780, 750 1850, 450 1950 
                     C 200 2030, 100 2150, 60 2200"
                />
              </svg>

              {/* Animated Follower Sports Car along the path */}
              <div ref={followerRef} className="road-follower">
                <div className="w-11 h-11 rounded-full bg-black border-2 border-[#FF5400] text-white flex items-center justify-center text-lg shadow-2xl">
                  🏎️
                </div>
              </div>

              {/* Station 1: Select Your Weapon */}
              <div className="road-station station-1">
                <div className="station-badge-3d">
                  <svg viewBox="0 0 64 64" fill="none">
                    <path d="M32 8L16 36H32L28 56L48 28H32L36 8H32Z" fill="#FF5400" />
                  </svg>
                </div>
                <div>
                  <h3 className="station-headline">PICK YOUR POISON</h3>
                  <div className="station-card">
                    <div className="station-card-step">Station 01</div>
                    Select your exact dream machine down to the chassis VIN, exterior paint, and exhaust note. Whether you crave a 9,000 RPM track scalpel or a vintage open-top Bronco, you get the exact keys you chose.
                  </div>
                </div>
              </div>

              {/* Station 2: Digital Handover */}
              <div className="road-station station-2">
                <div className="station-badge-3d">
                  <svg viewBox="0 0 64 64" fill="none">
                    <path d="M18 46L14 50V42L36 20L44 28L18 46Z" fill="#FF5400" />
                    <path d="M42 14L46 10C48 8 52 8 54 10L56 12C58 14 58 18 56 20L52 24L42 14Z" fill="#0F1E13" />
                  </svg>
                </div>
                <div>
                  <h3 className="station-headline">DIGITAL HANDOVER</h3>
                  <div className="station-card">
                    <div className="station-card-step">Station 02</div>
                    Skip the airport shuttle and fluorescent basement counter. Our concierge drops your car at your hotel driveway or airport curbside. Tap &apos;Unlock&apos; on your phone and you are immediately rolling.
                  </div>
                </div>
              </div>

              {/* Station 3: Canyon Apex Passes */}
              <div className="road-station station-3">
                <div className="station-badge-3d">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="34" r="20" stroke="#FF5400" strokeWidth="5" fill="#FAF3EE" />
                    <polyline points="32 22 32 34 40 38" stroke="#0F1E13" strokeWidth="4" strokeLinecap="round" />
                    <path d="M16 14L22 20" stroke="#FF5400" strokeWidth="4" strokeLinecap="round" />
                    <path d="M48 14L42 20" stroke="#FF5400" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="station-headline">CANYON APEX PASSES</h3>
                  <div className="station-card">
                    <div className="station-card-step">Station 03</div>
                    Don&apos;t waste time in gridlocked commuter traffic. Every vehicle comes pre-loaded with custom GPS canyon loops, cliffside coastal runs, and scenic mountain lookouts with verified smooth asphalt.
                  </div>
                </div>
              </div>

              {/* Station 4: Drop & Fly Return */}
              <div className="road-station station-4">
                <div className="station-badge-3d">
                  <svg viewBox="0 0 64 64" fill="none">
                    <path d="M12 20C12 16 16 14 20 14H28L34 20H48C52 20 54 22 54 26V46C54 50 50 52 46 52H18C14 52 12 48 12 44V20Z" fill="#FF5400" />
                  </svg>
                </div>
                <div>
                  <h3 className="station-headline">DROP & FLY RETURN</h3>
                  <div className="station-card">
                    <div className="station-card-step">Station 04</div>
                    When your joyride concludes, pull up directly to any partner airport valet terminal or hotel concierge. Leave the virtual key, walk straight to your gate, and return on empty with zero fuel surcharge gouging.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             7. FEATURES GRID (Core Architecture matching Rekeep)
             ========================================================================== */}
        <section className="section-features" id="features">
          <div className="container">
            <div className="showcase-header">
              <div className="section-label">Core Architecture</div>
              <h2 className="section-title">ENGINEERED FOR REAL DRIVERS</h2>
              <p className="section-subtitle">
                Every standard is built around one single goal: delivering pure, unadulterated automotive thrill without the rental corporate bullshit.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-box">
                <span className="feature-box-tag">No Downgrades</span>
                <h3 className="feature-box-title">100% Guaranteed Exact Chassis</h3>
                <p className="feature-box-desc">
                  We despise airport bait-and-switch where you reserve an AMG and get a beige crossover. If you book the Shark Blue GT3 RS, you drive the Shark Blue GT3 RS.
                </p>
              </div>

              <div className="feature-box">
                <span className="feature-box-tag">Fastest Handover</span>
                <h3 className="feature-box-title">Runway to Driver Seat in 60s</h3>
                <p className="feature-box-desc">
                  Curbside valet drops the spotless car 15 minutes before your arrival. Tap &apos;Unlock&apos; on your smartphone and you are immediately on the road.
                </p>
              </div>

              <div className="feature-box">
                <span className="feature-box-tag">Generous Limits</span>
                <h3 className="feature-box-title">500+ Daily Miles Included</h3>
                <p className="feature-box-desc">
                  Coastlines, desert sweeps, and mountain passes deserve freedom. Enjoy uncapped smiles with complimentary automated toll transponders.
                </p>
              </div>

              <div className="feature-box">
                <span className="feature-box-tag">Honest Fuel Policy</span>
                <h3 className="feature-box-title">Zero Fuel Surcharge Gouging</h3>
                <p className="feature-box-desc">
                  While airport counters gouge you $11/gallon, we bill the exact local pump price down to the penny if you return on empty. No penalty markup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             8. FLEET PRICING & CHASSIS TIERS (Matching Rekeep Pricing Grid)
             ========================================================================== */}
        <section className="section-pricing" id="pricing">
          <div className="container">
            <div className="showcase-header">
              <div className="section-label">Fleet Rates</div>
              <h2 className="section-title">CHOOSE YOUR JOYRIDE TIER</h2>
              <p className="section-subtitle">
                Transparent daily rates, zero hidden airport fees, and instant keyless booking.
              </p>
            </div>

            <div className="pricing-grid">
              {/* Tier 1 */}
              <div className="pricing-card">
                <div>
                  <div className="pricing-card-header">
                    <h3 className="pricing-plan-name">Canyon Classic</h3>
                    <p className="pricing-plan-desc">For vintage lovers & open-air beach cruising.</p>
                  </div>

                  <div className="pricing-price-wrap">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">440</span>
                    <span className="pricing-period">/ day</span>
                  </div>

                  <ul className="pricing-features">
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>1974 Ford Bronco Restomod V8</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>460 HP Coyote V8 engine</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Open-air safari top</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Keyless smartphone unlock</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Unlimited California miles</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(FLEET_DATA[2])}
                  className="pricing-btn pricing-btn-secondary"
                >
                  <span>Reserve Classic</span>
                  <span>→</span>
                </button>
              </div>

              {/* Tier 2: MOST POPULAR */}
              <div className="pricing-card is-featured">
                <div
                  className="pricing-card-badge"
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    maxWidth: "max-content",
                  }}
                >
                  MOST POPULAR
                </div>

                <div>
                  <div className="pricing-card-header">
                    <h3 className="pricing-plan-name">Track Thoroughbred</h3>
                    <p className="pricing-plan-desc">For apex scalpel precision & spine-tingling acoustic roar.</p>
                  </div>

                  <div className="pricing-price-wrap">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">720</span>
                    <span className="pricing-period">/ day</span>
                  </div>

                  <ul className="pricing-features">
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Porsche 911 GT3 RS (992)</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>9,000 RPM 518 HP Flat-6</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>0-60 MPH in 3.0 seconds</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Curated GPS canyon passes</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Peace of Mind zero deductible waiver</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Curbside valet delivery</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(FLEET_DATA[0])}
                  className="pricing-btn pricing-btn-primary"
                >
                  <span>Reserve GT3 RS</span>
                  <span>⚡</span>
                </button>
              </div>

              {/* Tier 3: Exotic Masterpiece */}
              <div className="pricing-card">
                <div
                  className="pricing-card-badge"
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#10B981",
                    width: "auto",
                    maxWidth: "max-content",
                  }}
                >
                  Exotic Tier
                </div>

                <div>
                  <div className="pricing-card-header">
                    <h3 className="pricing-plan-name">Maranello Hyper</h3>
                    <p className="pricing-plan-desc">Twin-turbo hybrid power with spine-chilling Italian theater.</p>
                  </div>

                  <div className="pricing-price-wrap">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">1,150</span>
                    <span className="pricing-period">/ day</span>
                  </div>

                  <ul className="pricing-features">
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Ferrari 296 GTB Assetto Fiorano</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>819 HP Twin-Turbo Hybrid</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>0-60 MPH in 2.8 seconds</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Private aviation ramp delivery</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      <span>Dedicated 24/7 concierge pit crew</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(FLEET_DATA[1])}
                  className="pricing-btn pricing-btn-primary"
                  style={{ background: "var(--brand-black)" }}
                >
                  <span>Reserve Ferrari</span>
                  <span>💎</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             9. TESTIMONIALS SECTION (Matching Rekeep & Two26 Style)
             ========================================================================== */}
        <section className="section-testimonials">
          <div className="container">
            <div className="showcase-header">
              <div className="section-label">Testimonials</div>
              <h2 className="section-title">APPARENTLY, THEY LIKE US</h2>
              <p className="section-subtitle">
                Hear from drivers, designers, and travelers who abandoned the airport rental counter forever.
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  &ldquo;Renting the GT3 RS for Big Sur ruined all other rental cars for me forever. Delivered to my Santa Monica hotel valet with 93-octane gas and keys on my phone. The 9,000 RPM howl was religious.&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#FF5400]">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Elena Rostova"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Elena Rostova</div>
                    <div className="testimonial-role">Creative Director • Porsche 911 GT3 RS</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  &ldquo;Landed at Miami Executive, tapped Unlock on my phone, and the Matte Black G63 was purring outside the hangar door. Zero clipboard, no fingerprints on credit card, side pipes rumbling down Ocean Drive.&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#FF5400]">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      alt="Marcus Vance"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Marcus Vance</div>
                    <div className="testimonial-role">Angel Investor • Mercedes-AMG G63</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  &ldquo;We took the vintage Bronco restomod into Joshua Tree for our 5th anniversary. The Coyote V8 sounds like roaring thunder and open safari top under desert stars was unforgettable. Best weekend trip ever.&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#FF5400]">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                      alt="Sarah & Liam"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Sarah &amp; Liam Davies</div>
                    <div className="testimonial-role">Architects • Ford Bronco 1974 Restomod</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             10. FAQ SECTION (With Playful Editorial Vector Cat Artwork from Rekeep)
             ========================================================================== */}
        <section className="section-faq" id="faq">
          <div className="container">
            <div className="faq-layout">
              {/* Left Column: Title + Vector Cat Art */}
              <div className="faq-intro">
                <div className="section-label">FAQ &amp; Answers</div>
                <h2 className="section-title">QUESTIONS? NO STUPID ONES.</h2>
                <p className="section-subtitle" style={{ textAlign: "left", margin: "0 0 24px 0" }}>
                  Got questions about digital keys, speed camera policies, or canyon passes? We keep our answers refreshingly honest.
                </p>

                {/* Editorial Cat Artwork from Rekeep SVG 14 */}
                <div className="faq-cat-art">
                  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M60 160C45 130 50 80 80 60C110 40 145 65 155 90C165 70 195 55 220 70C250 85 255 125 240 155C225 185 180 195 140 190C100 185 75 180 60 160Z"
                      fill="#0F1E13"
                    />
                    <polygon points="75,65 90,25 110,55" fill="#FF5400" />
                    <polygon points="125,55 145,25 160,65" fill="#FF5400" />
                    <circle cx="100" cy="85" r="9" fill="#FFFFFF" />
                    <circle cx="102" cy="85" r="5" fill="#0F1E13" />
                    <circle cx="135" cy="85" r="9" fill="#FFFFFF" />
                    <circle cx="137" cy="85" r="5" fill="#0F1E13" />
                    <line x1="60" y1="95" x2="25" y2="90" stroke="#0F1E13" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="60" y1="102" x2="20" y2="105" stroke="#0F1E13" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="175" y1="95" x2="210" y2="90" stroke="#0F1E13" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="175" y1="102" x2="215" y2="105" stroke="#0F1E13" strokeWidth="2.5" strokeLinecap="round" />
                    <path
                      d="M240 155C270 145 295 120 290 85C285 55 260 60 260 75C260 90 275 110 240 135"
                      stroke="#0F1E13"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="280" cy="70" r="8" fill="#FF5400" />
                  </svg>
                </div>
              </div>

              {/* Right Column: Animated Accordions */}
              <div className="accordion-wrap">
                {[
                  {
                    q: "Do I get the EXACT car in the photos, or 'similar'?",
                    a: "You get the exact vehicle, exact VIN, exact colorway, and exact exhaust tone shown on our site. We despise the airport bait-and-switch where you reserve an AMG and end up in a rental beige crossover. If you book the Shark Blue GT3 RS, you drive the Shark Blue GT3 RS.",
                  },
                  {
                    q: "How does the 60-second curb delivery work?",
                    a: "Select your delivery location (your hotel driveway, terminal curb, or private air hangar). Our valet drops the spotless car 15 minutes before your arrival and pings you. When you walk up, tap 'Unlock' inside your Two26 web app. The digital key is paired with your phone, and you are immediately on the road.",
                  },
                  {
                    q: "What is the minimum age requirement?",
                    a: "Drivers must be 21 or older with a valid, clean driver's license for classics and performance SUVs. For high-powered exotic supercars (Ferrari 296 GTB, GT3 RS), the minimum age is 25, or 21+ with verified track day experience or an existing sports car insurance policy.",
                  },
                  {
                    q: "Can I take the car on canyon roads or track days?",
                    a: "Canyon carving and scenic road trips are what these cars were built for! Every rental includes pre-loaded GPS scenic waypoints through coastal highways and twisties. For closed-circuit track use (Laguna Seca, Willow Springs), simply select our optional 'Apex Track Pack' during booking which unlocks track insurance and telemetry logging.",
                  },
                  {
                    q: "What happens if I return the car on empty?",
                    a: "No penalty gouging. While airport rental companies bill you $11/gallon, we simply bill the exact local pump price with zero surcharge. Or better yet: add the pre-paid tank add-on for flat cost and drop off with the fuel needle on E.",
                  },
                  {
                    q: "What insurance and protection is included?",
                    a: "All rentals include standard third-party liability and 24/7 flatbed concierge dispatch. We also offer our 'Peace of Mind' zero-deductible comprehensive waiver and 'White-Glove Wheel & Glass' package so you can attack twisty apexes with total confidence.",
                  },
                ].map((item, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`accordion-item ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        className="accordion-trigger"
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setActiveFaq(isOpen ? null : idx);
                        }}
                      >
                        <span>{item.q}</span>
                        <div className="accordion-icon">{isOpen ? "−" : "+"}</div>
                      </button>
                      <div
                        className="accordion-body"
                        style={{ maxHeight: isOpen ? "240px" : "0px" }}
                      >
                        <div className="accordion-content">{item.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
             11. FOOTER (Matching Rekeep's Punchy Closing Headline & Layout)
             ========================================================================== */}
        <footer className="footer" id="download">
          <div className="container">
            <div className="footer-top">
              <div>
                <h2 className="footer-heading">
                  READY TO HIT THE <span className="orange">GAS?</span>
                </h2>
                <p className="footer-desc">
                  Stop waiting in fluorescent airport queues. Reserve your dream chassis today with zero paperwork, instant curbside handover, and pure driving joy.
                </p>

                <div className="hero-cta-group" style={{ justifyContent: "flex-start" }}>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playRev();
                      handleOpenBooking();
                    }}
                    className="btn-primary-orange cursor-pointer border-0"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                    <span>Reserve Chassis Now</span>
                  </button>
                </div>
              </div>

              {/* Direct Booking Cards & NFC Key QR Block */}
              <div className="footer-downloads-wrap">
                {/* Chassis 1: Porsche GT3 RS */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    handleOpenBooking(FLEET_DATA[0]);
                  }}
                  className="apk-download-card cursor-pointer"
                >
                  <div>
                    <div className="apk-info-title">Porsche 911 GT3 RS (992)</div>
                    <div className="apk-info-meta">518 HP • Shark Blue • $720/day • Curbside Ready</div>
                  </div>
                  <div className="cta-arrow-badge">⚡</div>
                </div>

                {/* Chassis 2: Ferrari 296 GTB */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    handleOpenBooking(FLEET_DATA[1]);
                  }}
                  className="apk-download-card cursor-pointer"
                >
                  <div>
                    <div className="apk-info-title">Ferrari 296 GTB Assetto</div>
                    <div className="apk-info-meta">819 HP Twin-Turbo • Rosso Corsa • $1,150/day</div>
                  </div>
                  <div className="cta-arrow-badge">⚡</div>
                </div>

                {/* Chassis 3: Ford Bronco Restomod */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    handleOpenBooking(FLEET_DATA[2]);
                  }}
                  className="apk-download-card cursor-pointer"
                >
                  <div>
                    <div className="apk-info-title">Ford Bronco 1974 Restomod</div>
                    <div className="apk-info-meta">460 HP Coyote V8 • Open Top Safari • $440/day</div>
                  </div>
                  <div className="cta-arrow-badge">⚡</div>
                </div>

                {/* Instant NFC Wallet Key QR Block */}
                <div className="footer-qr-block">
                  <div className="footer-qr-img">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="#FFFFFF" />
                      <rect x="10" y="10" width="26" height="26" stroke="#0F1E13" strokeWidth="4" fill="none" />
                      <rect x="17" y="17" width="12" height="12" fill="#0F1E13" />
                      <rect x="64" y="10" width="26" height="26" stroke="#0F1E13" strokeWidth="4" fill="none" />
                      <rect x="71" y="17" width="12" height="12" fill="#0F1E13" />
                      <rect x="10" y="64" width="26" height="26" stroke="#0F1E13" strokeWidth="4" fill="none" />
                      <rect x="17" y="71" width="12" height="12" fill="#0F1E13" />
                      <rect x="42" y="14" width="6" height="6" fill="#FF5400" />
                      <rect x="52" y="24" width="6" height="6" fill="#0F1E13" />
                      <rect x="42" y="34" width="6" height="6" fill="#0F1E13" />
                      <rect x="48" y="48" width="8" height="8" fill="#FF5400" />
                      <rect x="24" y="46" width="6" height="6" fill="#0F1E13" />
                      <rect x="70" y="48" width="6" height="6" fill="#0F1E13" />
                      <rect x="80" y="58" width="6" height="6" fill="#FF5400" />
                      <rect x="48" y="66" width="6" height="6" fill="#0F1E13" />
                      <rect x="60" y="76" width="8" height="8" fill="#0F1E13" />
                      <rect x="78" y="76" width="6" height="6" fill="#FF5400" />
                    </svg>
                  </div>
                  <div className="footer-qr-text">
                    <strong>Scan for 60s Digital Mobile Key</strong>
                    Instant Apple Wallet &amp; Android NFC pass generation. Walk up and drive.
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Hubs, Hotline & Guarantee Info */}
            <div className="footer-meta-grid">
              <div className="footer-meta-col">
                <div className="footer-meta-col-title">TWO26 DRIVE</div>
                <p className="footer-meta-text">
                  An unapologetic boutique car rental studio based in California &amp; Florida. Built for pure driving joy with keyless instant drop-off.
                </p>
              </div>

              <div className="footer-meta-col">
                <div className="footer-meta-col-title">Active Vault Hubs</div>
                <div className="footer-meta-text">
                  <div>• Los Angeles (Beverly Hills &amp; LAX)</div>
                  <div>• Miami (South Beach &amp; Executive)</div>
                  <div>• New York (Manhattan &amp; JFK)</div>
                  <div>• San Francisco (Marina &amp; SFO)</div>
                  <div>• Las Vegas (The Strip &amp; Henderson)</div>
                </div>
              </div>

              <div className="footer-meta-col">
                <div className="footer-meta-col-title">24/7 Concierge Hotline</div>
                <div>
                  <a href="tel:18002263748" className="footer-meta-link" style={{ color: "var(--brand-orange)", fontWeight: 700 }}>
                    📞 +1 (800) 226-DRIVE
                  </a>
                  <a href="mailto:keys@two26.drive" className="footer-meta-link">
                    ✉️ keys@two26.drive
                  </a>
                  <div className="footer-meta-text" style={{ opacity: 0.6, marginTop: 4 }}>
                    Mon–Sun 24/7/365 Emergency Dispatch
                  </div>
                </div>
              </div>

              <div className="footer-meta-col">
                <div className="footer-meta-col-title">Studio Guarantee</div>
                <p className="footer-meta-text">
                  100% exact chassis guarantee. Pre-loaded scenic GPS canyon loops. Zero hidden deposit hold surprises.
                </p>
              </div>
            </div>

            {/* Giant Stretched Watermark Logo */}
            <div className="footer-giant-logo" aria-hidden="true">
              TWO26 DRIVE
            </div>

            {/* Bottom Meta & Rights */}
            <div className="footer-bottom">
              <div className="footer-rights">
                © {new Date().getFullYear()} TWO26 DRIVE STUDIOS LLC. All rights reserved.
              </div>
              <div className="footer-bottom-links">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    soundFx.playClick();
                  }}
                >
                  Back to Top ↑
                </a>
                <a href="#about">About</a>
                <a href="#showcase">The Stable</a>
                <a href="#pathway">The Pathway</a>
                <a href="#pricing">Fleet Rates</a>
                <a href="#faq">FAQ &amp; Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ==========================================================================
           12. INTERACTIVE BOOKING / RESERVATION MODAL (Matching Payment Modal)
           ========================================================================== */}
      {isModalOpen && (
        <div
          className="payment-modal-backdrop modal-backdrop-blur"
          style={{ display: "flex" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="payment-modal-card" style={{ maxWidth: "560px", width: "90%" }}>
            {modalStep === 1 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FF5400]">
                    Step 1 of 2 • Confirm Chassis &amp; Window
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-black/50 hover:text-black font-bold text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="payment-modal-title" style={{ textAlign: "left", marginBottom: "8px" }}>
                  {activeCar.name}
                </h3>
                <p className="payment-modal-desc" style={{ textAlign: "left", marginBottom: "16px" }}>
                  {activeCar.specs.hp} HP • {activeCar.color} • {activeCar.specs.acceleration} 0-60 MPH • VIN Guaranteed
                </p>

                {/* Car Image Preview */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-[#F8EEE8]">
                  <Image
                    src={activeCar.image}
                    alt={activeCar.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Duration Slider */}
                <div className="mb-4 text-left">
                  <div className="flex justify-between text-xs font-bold text-black mb-1">
                    <span>Rental Duration</span>
                    <span className="text-[#FF5400] font-black">{rentalDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    className="w-full accent-[#FF5400] cursor-pointer"
                  />
                </div>

                {/* Protection selector */}
                <div className="mb-5 text-left">
                  <span className="block text-xs font-bold text-black mb-1.5 uppercase">
                    Protection Tier
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProtectionPlan("peace")}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold cursor-pointer transition-all ${
                        protectionPlan === "peace"
                          ? "border-[#FF5400] bg-[#FAF3EE] text-[#FF5400]"
                          : "border-black/10 text-black hover:border-black/20"
                      }`}
                    >
                      <div>Peace of Mind ($49/day)</div>
                      <div className="text-[10px] text-black/50 font-normal">Zero deductible waiver</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProtectionPlan("track")}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold cursor-pointer transition-all ${
                        protectionPlan === "track"
                          ? "border-[#FF5400] bg-[#FAF3EE] text-[#FF5400]"
                          : "border-black/10 text-black hover:border-black/20"
                      }`}
                    >
                      <div>Track &amp; Canyon ($95/day)</div>
                      <div className="text-[10px] text-black/50 font-normal">Telemetry + track waiver</div>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setModalStep(2);
                  }}
                  className="btn-primary-orange"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>Continue to Driver Info</span>
                  <span>→</span>
                </button>
              </div>
            )}

            {modalStep === 2 && (
              <form onSubmit={handleBookingComplete}>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FF5400]">
                    Step 2 of 2 • Driver Verification
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalStep(1)}
                    className="text-black/50 hover:text-black font-bold text-sm cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                <h3 className="payment-modal-title" style={{ textAlign: "left", marginBottom: "8px" }}>
                  WHO IS DRIVING?
                </h3>
                <p className="payment-modal-desc" style={{ textAlign: "left", marginBottom: "16px" }}>
                  We pair your mobile key with your verified phone number for 60-second curb unlock.
                </p>

                <div className="space-y-3 mb-4 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-black/60 uppercase mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm font-semibold text-black outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-black/60 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      placeholder="alex@mercer.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm font-semibold text-black outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-black/60 uppercase mb-1">
                      Phone Number (NFC Mobile Pass)
                    </label>
                    <input
                      type="tel"
                      required
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm font-semibold text-black outline-none focus:border-[#FF5400]"
                    />
                  </div>
                </div>

                {/* Price summary */}
                <div className="bg-[#FAF3EE] p-3.5 rounded-2xl border border-black/5 text-xs font-semibold text-black/80 space-y-1 mb-4 text-left">
                  <div className="flex justify-between">
                    <span>{activeCar.name} ({rentalDays} Days)</span>
                    <span>${baseRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protection + Curbside Drop</span>
                    <span>${protectionCost + curbsideDrop}</span>
                  </div>
                  <div className="flex justify-between text-[#FF5400] font-bold">
                    <span>Studio Promo &apos;TWO26&apos; (15% OFF)</span>
                    <span>-${studioPromoDiscount}</span>
                  </div>
                  <div className="pt-2 border-t border-black/10 flex justify-between font-display text-sm font-black text-black">
                    <span>Total Amount</span>
                    <span className="text-[#FF5400] text-base">${finalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary-orange"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>Authorize &amp; Issue Digital Key</span>
                  <span>⚡</span>
                </button>
              </form>
            )}

            {modalStep === 3 && (
              <div>
                <div className="payment-modal-icon">✓</div>
                <h3 className="payment-modal-title">KEYS ISSUED! YOU&apos;RE READY TO ROLL</h3>
                <p className="payment-modal-desc">
                  Thank you, <strong>{driverName || "Driver"}</strong>. Your reservation for the <strong>{activeCar.name}</strong> is confirmed. Our valet will drop the spotless machine at your curb.
                </p>

                <div className="payment-modal-id-badge" id="payment-id-display">
                  PASS ID: TWO26-KEY-{Math.floor(100000 + Math.random() * 900000)}
                </div>

                <div className="bg-[#FAF3EE] rounded-2xl p-4 mb-4 text-left border border-black/10 text-xs">
                  <div className="font-bold text-black mb-1">📲 NFC Smartphone Key Activated</div>
                  <div className="text-black/60">
                    Hold your phone within 2 inches of the driver-side door handle to unlock. Pre-loaded GPS canyon routes ready on infotainment.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-primary-orange"
                  style={{ width: "100%", justifyContent: "center", marginBottom: "8px" }}
                >
                  <span>Return to Two26 Studio</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
