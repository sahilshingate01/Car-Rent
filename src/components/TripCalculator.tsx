"use client";

import React, { useState } from "react";
import { FLEET_DATA, Car } from "@/data/cars";
import { soundFx } from "@/utils/sound";
import { Calculator, Shield, MapPin, Sparkles, Check, ArrowRight, Tag } from "lucide-react";

interface TripCalculatorProps {
  onBookWithEstimate: (details: {
    car: Car;
    days: number;
    protection: string;
    delivery: string;
    extras: string[];
    total: number;
  }) => void;
}

export default function TripCalculator({ onBookWithEstimate }: TripCalculatorProps) {
  const [selectedCarId, setSelectedCarId] = useState<string>(FLEET_DATA[0].id);
  const [days, setDays] = useState<number>(3);
  const [protection, setProtection] = useState<"base" | "peace" | "track">("peace");
  const [delivery, setDelivery] = useState<"hub" | "curb" | "jet">("curb");
  const [tankPrepaid, setTankPrepaid] = useState<boolean>(true);
  const [goProRig, setGoProRig] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("TWO26");
  const [promoApplied, setPromoApplied] = useState<boolean>(true);

  const selectedCar = FLEET_DATA.find((c) => c.id === selectedCarId) || FLEET_DATA[0];

  // Calculation
  const carRentalSubtotal = selectedCar.pricePerDay * days;
  const protectionCostPerDay = protection === "base" ? 0 : protection === "peace" ? 49 : 95;
  const protectionTotal = protectionCostPerDay * days;
  const deliveryCost = delivery === "hub" ? 0 : delivery === "curb" ? 75 : 120;
  const prepaidTankCost = tankPrepaid ? 85 : 0;
  const goProCost = goProRig ? 45 : 0;

  const rawTotal = carRentalSubtotal + protectionTotal + deliveryCost + prepaidTankCost + goProCost;
  const discountRate = promoApplied ? 0.15 : 0;
  const discountAmount = Math.round(rawTotal * discountRate);
  const finalTotal = rawTotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (promoCode.trim().toUpperCase() === "TWO26" || promoCode.trim().toUpperCase() === "JOYRIDE") {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      alert("Invalid code. Try 'TWO26' for 15% off!");
    }
  };

  const handleProceed = () => {
    soundFx.playThrottle();
    const extras: string[] = [];
    if (tankPrepaid) extras.push("Pre-paid Fuel Tank");
    if (goProRig) extras.push("GoPro 4K Cockpit Rig");
    onBookWithEstimate({
      car: selectedCar,
      days,
      protection,
      delivery,
      extras,
      total: finalTotal,
    });
  };

  return (
    <section id="calculator" className="relative w-full py-20 px-4 sm:px-6 md:px-8 bg-[#F8EEE8]/60">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-black tracking-widest text-[#FF5400] uppercase px-4 py-1.5 rounded-full bg-white border border-black/5 mb-3">
            Instant Estimate
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
            NO SNEAKY FEES. <span className="text-[#FF5400]">EVER.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-black/60 font-medium">
            Slide the days, select your machine, pick your protection. Real-time pricing down to the penny.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Pick Vehicle */}
            <div>
              <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                1. Select Chassis
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => {
                  soundFx.playClick();
                  setSelectedCarId(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-[#FDF8F5] border-2 border-black/10 text-sm font-bold text-black outline-none focus:border-[#FF5400] cursor-pointer"
              >
                {FLEET_DATA.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} — ${car.pricePerDay}/day ({car.specs.hp} HP)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-black/60 uppercase tracking-wider">
                  2. Rental Duration
                </label>
                <span className="font-display text-xl font-black text-[#FF5400]">
                  {days} {days === 1 ? "Day" : "Days"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-3 bg-[#F8EEE8] rounded-lg appearance-none cursor-pointer accent-[#FF5400]"
              />
              <div className="flex justify-between text-[11px] text-black/40 font-bold mt-1">
                <span>1 Day</span>
                <span>Weekend (3D)</span>
                <span>Week (7D)</span>
                <span>14 Days</span>
              </div>
            </div>

            {/* 3. Protection Tier */}
            <div>
              <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                3. Damage & Roadside Protection
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("base");
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    protection === "base"
                      ? "border-[#FF5400] bg-[#FDF8F5]"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="text-xs font-black text-black">Base Coverage</div>
                  <div className="text-[11px] text-black/50">$0 / day</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("peace");
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    protection === "peace"
                      ? "border-[#FF5400] bg-[#FDF8F5]"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="text-xs font-black text-[#FF5400]">Peace of Mind</div>
                  <div className="text-[11px] text-black/50">$49 / day</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setProtection("track");
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    protection === "track"
                      ? "border-[#FF5400] bg-[#FDF8F5]"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="text-xs font-black text-black">Track & Canyon</div>
                  <div className="text-[11px] text-black/50">$95 / day</div>
                </button>
              </div>
            </div>

            {/* 4. Delivery Method */}
            <div>
              <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                4. Curbside Handover Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setDelivery("hub");
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center text-xs font-bold cursor-pointer transition-all ${
                    delivery === "hub" ? "border-black bg-black text-white" : "border-black/10 text-black hover:bg-black/5"
                  }`}
                >
                  Vault Pickup ($0)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setDelivery("curb");
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center text-xs font-bold cursor-pointer transition-all ${
                    delivery === "curb" ? "border-[#FF5400] bg-[#FF5400] text-white" : "border-black/10 text-black hover:bg-black/5"
                  }`}
                >
                  Hotel / Curb ($75)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setDelivery("jet");
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center text-xs font-bold cursor-pointer transition-all ${
                    delivery === "jet" ? "border-black bg-black text-white" : "border-black/10 text-black hover:bg-black/5"
                  }`}
                >
                  Jet Ramp ($120)
                </button>
              </div>
            </div>

            {/* 5. Add-on Extras */}
            <div className="pt-2 border-t border-black/5 space-y-2">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF8F5] border border-black/5 cursor-pointer hover:border-black/20">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tankPrepaid}
                    onChange={(e) => setTankPrepaid(e.target.checked)}
                    className="w-4 h-4 accent-[#FF5400] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-black">
                    Pre-paid Gas Tank (Return with needle on E)
                  </span>
                </div>
                <span className="text-xs font-bold text-black/60">+$85</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF8F5] border border-black/5 cursor-pointer hover:border-black/20">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={goProRig}
                    onChange={(e) => setGoProRig(e.target.checked)}
                    className="w-4 h-4 accent-[#FF5400] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-black">
                    Dual 4K GoPro Cockpit Rig + 128GB SD Card
                  </span>
                </div>
                <span className="text-xs font-bold text-black/60">+$45</span>
              </label>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-[#FDF8F5] rounded-3xl p-6 border-2 border-black/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <span className="text-xs font-bold text-black/60 uppercase tracking-wider">
                  Summary
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FF5400] text-white">
                  {selectedCar.category}
                </span>
              </div>

              {/* Selected Car Preview */}
              <div className="my-4">
                <div className="font-display text-xl font-black text-black">
                  {selectedCar.name}
                </div>
                <div className="text-xs text-black/60 font-medium">
                  {selectedCar.specs.hp} HP • {selectedCar.specs.acceleration} 0-60 • {selectedCar.specs.transmission}
                </div>
              </div>

              {/* Cost Lines */}
              <div className="space-y-2.5 text-xs font-semibold text-black/70 pt-2 border-t border-black/5">
                <div className="flex justify-between">
                  <span>
                    Chassis Rental ({days} {days === 1 ? "day" : "days"})
                  </span>
                  <span className="text-black font-bold">${carRentalSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protection ({protection})</span>
                  <span className="text-black font-bold">${protectionTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Curbside Handover</span>
                  <span className="text-black font-bold">${deliveryCost}</span>
                </div>
                {tankPrepaid && (
                  <div className="flex justify-between">
                    <span>Pre-paid Fuel</span>
                    <span className="text-black font-bold">$85</span>
                  </div>
                )}
                {goProRig && (
                  <div className="flex justify-between">
                    <span>GoPro Cockpit Rig</span>
                    <span className="text-black font-bold">$45</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-[#FF5400] font-bold">
                    <span>Studio Promo &apos;TWO26&apos; (15% OFF)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
              </div>

              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2 text-xs uppercase font-bold rounded-xl bg-white border border-black/20 outline-none focus:border-[#FF5400]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-black text-white hover:bg-[#FF5400] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Total and CTA */}
            <div className="mt-6 pt-5 border-t-2 border-black/10">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-bold uppercase text-black/60">Total Estimated</span>
                <div className="text-right">
                  <span className="font-display text-3xl sm:text-4xl font-black text-[#FF5400]">
                    ${finalTotal}
                  </span>
                  <span className="text-xs text-black/50 block font-bold">All taxes & fees included</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-4 rounded-full bg-[#0A0A0A] hover:bg-[#FF5400] text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl active:scale-95 cursor-pointer"
              >
                <span>Lock In This Joyride</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
