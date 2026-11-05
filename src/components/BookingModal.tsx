"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { FLEET_DATA, Car } from "@/data/cars";
import { soundFx } from "@/utils/sound";
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Key, Shield, Calendar, MapPin, User, Phone, Mail } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: Car | null;
  initialEstimate?: {
    car: Car;
    days: number;
    protection: string;
    delivery: string;
    extras: string[];
    total: number;
  } | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedCar,
  initialEstimate,
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedCar, setSelectedCar] = useState<Car>(preselectedCar || initialEstimate?.car || FLEET_DATA[0]);
  const [days, setDays] = useState<number>(initialEstimate?.days || 3);
  const [city, setCity] = useState<string>("Los Angeles (Beverly Hills / LAX)");
  const [protection, setProtection] = useState<string>(initialEstimate?.protection || "peace");
  const [tankPrepaid, setTankPrepaid] = useState<boolean>(true);
  const [goProRig, setGoProRig] = useState<boolean>(false);

  // Driver details
  const [driverName, setDriverName] = useState<string>("");
  const [driverEmail, setDriverEmail] = useState<string>("");
  const [driverPhone, setDriverPhone] = useState<string>("");
  const [driverLicense, setDriverLicense] = useState<string>("");
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(true);

  // Sync when props change
  useEffect(() => {
    if (preselectedCar) {
      setSelectedCar(preselectedCar);
    } else if (initialEstimate?.car) {
      setSelectedCar(initialEstimate.car);
      setDays(initialEstimate.days);
    }
  }, [preselectedCar, initialEstimate]);

  if (!isOpen) return null;

  // Pricing math
  const baseRate = selectedCar.pricePerDay * days;
  const protectCost = protection === "base" ? 0 : protection === "peace" ? 49 * days : 95 * days;
  const deliveryCost = 75;
  const prepaidFuel = tankPrepaid ? 85 : 0;
  const goPro = goProRig ? 45 : 0;
  const subtotal = baseRate + protectCost + deliveryCost + prepaidFuel + goPro;
  const studioDiscount = Math.round(subtotal * 0.15);
  const finalPrice = subtotal - studioDiscount;

  const handleNextStep = () => {
    soundFx.playClick();
    if (step === 3) {
      if (!driverName || !driverEmail) {
        alert("Please enter your name and email to proceed.");
        return;
      }
      soundFx.playThrottle();
      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF5400", "#000000", "#FFFFFF", "#F9E2E1"],
      });
      setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    soundFx.playClick();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const resetAndClose = () => {
    soundFx.playClick();
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FDF8F5] rounded-3xl sm:rounded-[36px] border-2 border-black shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/10">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#FF5400] text-white flex items-center justify-center font-bold text-xs">
              26
            </span>
            <span className="font-display text-lg font-black tracking-tight text-black">
              RESERVE YOUR CHASSIS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step < 4 && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8EEE8] text-black/70">
                Step {step} of 3
              </span>
            )}
            <button
              onClick={resetAndClose}
              className="w-8 h-8 rounded-full bg-[#F8EEE8] hover:bg-black hover:text-white flex items-center justify-center text-black transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* STEP 1: Chassis & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-black text-black">
                  1. CHOOSE YOUR MACHINE & WINDOW
                </h3>
                <p className="text-xs text-black/60 font-medium">
                  Guaranteed exact VIN and colorway.
                </p>
              </div>

              {/* Car Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FLEET_DATA.map((car) => {
                  const isSelected = car.id === selectedCar.id;
                  return (
                    <div
                      key={car.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedCar(car);
                      }}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? "border-[#FF5400] bg-white shadow-md scale-102"
                          : "border-black/10 bg-white/60 hover:border-black/30"
                      }`}
                    >
                      <div className="relative w-full h-16 rounded-lg overflow-hidden mb-2 bg-[#F8EEE8]">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-display text-xs font-black text-black line-clamp-1">
                        {car.name}
                      </div>
                      <div className="text-[11px] font-bold text-[#FF5400]">
                        ${car.pricePerDay}/day
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Hub */}
              <div>
                <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                  Curbside Delivery City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400]"
                >
                  <option value="Los Angeles (Beverly Hills / LAX)">Los Angeles (Beverly Hills Hotel & LAX Curbside)</option>
                  <option value="Miami (South Beach / Executive)">Miami (South Beach & Executive Airport)</option>
                  <option value="New York (Tribeca / JFK)">New York (Tribeca Vault & JFK Ramp)</option>
                  <option value="San Francisco (Marina / SFO)">San Francisco (Marina District & SFO)</option>
                  <option value="Las Vegas (The Strip / Henderson)">Las Vegas (The Strip & Henderson Ramp)</option>
                </select>
              </div>

              {/* Rental Duration */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-black/60 uppercase tracking-wider">
                    Rental Duration
                  </span>
                  <span className="font-display text-lg font-black text-[#FF5400]">
                    {days} Days
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#F8EEE8] rounded-lg appearance-none cursor-pointer accent-[#FF5400]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Protection & Extras */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-black text-black">
                  2. PROTECTION & ROAD TRIP PACKS
                </h3>
                <p className="text-xs text-black/60 font-medium">
                  Attack canyon apexes with complete confidence.
                </p>
              </div>

              {/* Protection options */}
              <div className="space-y-3">
                <div
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("base");
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    protection === "base"
                      ? "border-[#FF5400] bg-white shadow-sm"
                      : "border-black/10 bg-white/50 hover:border-black/30"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-black">Base Third-Party Coverage</div>
                    <div className="text-xs text-black/50">Standard statutory state limits • $0 / day</div>
                  </div>
                  <div className="font-bold text-sm text-black">$0</div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("peace");
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    protection === "peace"
                      ? "border-[#FF5400] bg-white shadow-md ring-2 ring-[#FF5400]/20"
                      : "border-black/10 bg-white/50 hover:border-black/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FF5400]">Peace of Mind (Recommended)</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5400] text-white">
                        POPULAR
                      </span>
                    </div>
                    <div className="text-xs text-black/50">
                      Zero deductible collision damage waiver + rim & tire replacement
                    </div>
                  </div>
                  <div className="font-bold text-sm text-[#FF5400]">+$49 / day</div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("track");
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    protection === "track"
                      ? "border-[#FF5400] bg-white shadow-sm"
                      : "border-black/10 bg-white/50 hover:border-black/30"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-black">Apex Track & Canyon Pack</div>
                    <div className="text-xs text-black/50">
                      Telemetry logging, track waiver, plus helmet rental
                    </div>
                  </div>
                  <div className="font-bold text-sm text-black">+$95 / day</div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-black/10 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={tankPrepaid}
                      onChange={(e) => setTankPrepaid(e.target.checked)}
                      className="w-4 h-4 accent-[#FF5400] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-black">Pre-paid 93-Octane Fuel Tank</div>
                      <div className="text-[11px] text-black/50">Return with empty needle, zero surcharge</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-black">+$85</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-black/10 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={goProRig}
                      onChange={(e) => setGoProRig(e.target.checked)}
                      className="w-4 h-4 accent-[#FF5400] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-black">Cockpit Dual 4K GoPro Rig</div>
                      <div className="text-[11px] text-black/50">Record every canyon apex + 128GB SD card</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-black">+$45</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Driver Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-black text-black">
                  3. DRIVER INFORMATION
                </h3>
                <p className="text-xs text-black/60 font-medium">
                  We verify credentials digitally so you can unlock in 60 seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    placeholder="alex@mercer.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1">
                    Phone (for Curbside Unlock)
                  </label>
                  <input
                    type="tel"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1">
                    Driver&apos;s License Number / State
                  </label>
                  <input
                    type="text"
                    value={driverLicense}
                    onChange={(e) => setDriverLicense(e.target.value)}
                    placeholder="CA D8271924"
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400]"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-black/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF5400] cursor-pointer"
                />
                <span className="text-xs text-black/80 font-medium">
                  I confirm that I am at least 21 years old (25 for Exotics) and hold a valid, unexpired driver&apos;s license with a clean driving record.
                </span>
              </label>

              {/* Price Breakdown in Step 3 */}
              <div className="p-4 rounded-2xl bg-[#F8EEE8] border border-black/5 text-xs font-semibold text-black/80 space-y-1.5">
                <div className="flex justify-between">
                  <span>{selectedCar.name} ({days} days)</span>
                  <span>${baseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protection + Delivery + Add-ons</span>
                  <span>${protectCost + deliveryCost + prepaidFuel + goPro}</span>
                </div>
                <div className="flex justify-between text-[#FF5400] font-bold">
                  <span>Studio Promo &apos;TWO26&apos; (15% OFF)</span>
                  <span>-${studioDiscount}</span>
                </div>
                <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-black text-black">
                  <span>Total Due</span>
                  <span className="text-[#FF5400] text-base">${finalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Digital Key Pass */}
          {step === 4 && (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#FF5400] text-white flex items-center justify-center mx-auto shadow-xl">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#FF5400] px-3 py-1 rounded-full bg-[#F8EEE8] mb-2">
                  Reservation Confirmed
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-black tracking-tight">
                  YOUR KEYS ARE READY, {driverName.toUpperCase() || "DRIVER"}!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-black/60 max-w-md mx-auto font-medium">
                  Your digital key has been generated. When our curbside valet drops the chassis, simply tap &quot;Unlock&quot; from your mobile pass.
                </p>
              </div>

              {/* Digital Boarding Pass / Key Ticket */}
              <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border-2 border-black shadow-xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5400]/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <span className="text-[10px] font-bold text-black/50 uppercase">PASS ID</span>
                    <div className="font-mono text-xs font-black text-black">TWO26-DRV-{Math.floor(100000 + Math.random() * 900000)}</div>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    ACTIVE KEY
                  </span>
                </div>

                <div className="my-4">
                  <div className="font-display text-xl font-black text-black">
                    {selectedCar.name}
                  </div>
                  <div className="text-xs text-black/60 font-medium">
                    {selectedCar.color} • {selectedCar.specs.hp} HP • VIN Guaranteed
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs py-3 border-t border-b border-black/5">
                  <div>
                    <span className="text-[10px] text-black/40 font-bold block">LOCATION</span>
                    <span className="font-bold text-black">{city.split(" ")[0]} Hub</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-black/40 font-bold block">DURATION</span>
                    <span className="font-bold text-black">{days} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-black/40 font-bold block">DRIVER</span>
                    <span className="font-bold text-black">{driverName || "Alex Mercer"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-black/40 font-bold block">AMOUNT PAID</span>
                    <span className="font-bold text-[#FF5400]">${finalPrice}</span>
                  </div>
                </div>

                {/* Simulated QR Code for NFC Phone Unlock */}
                <div className="mt-4 pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black rounded-lg p-1 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5 w-8 h-8">
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-[#FF5400] rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                        <div className="bg-white rounded-xs" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black">NFC Digital Key</div>
                      <div className="text-[10px] text-black/50">Hold near driver handle</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playThrottle();
                      alert("Digital Key added to Apple Wallet / Google Wallet!");
                    }}
                    className="px-3 py-1.5 rounded-full bg-black hover:bg-[#FF5400] text-white text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Add to Wallet
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#FF5400] text-white text-sm font-bold transition-all shadow-md cursor-pointer"
                >
                  Return to Two26 Studio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer (Step navigation) */}
        {step < 4 && (
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-black/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-full bg-[#F8EEE8] hover:bg-black/10 text-black text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-7 py-3 rounded-full bg-[#FF5400] hover:bg-[#D94400] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{step === 3 ? "Complete & Unlock Keys" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
