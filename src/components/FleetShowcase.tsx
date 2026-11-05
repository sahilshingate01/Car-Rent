"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FLEET_DATA, Car } from "@/data/cars";
import { soundFx } from "@/utils/sound";
import { ArrowUpRight, Gauge, Zap, Flame, SlidersHorizontal, LayoutGrid, Rows } from "lucide-react";

interface FleetShowcaseProps {
  onSelectCar: (car: Car) => void;
  selectedCategory?: string;
}

export default function FleetShowcase({ onSelectCar, selectedCategory = "All" }: FleetShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const categories = ["All", "Exotics", "Classics", "Hyper Electric", "SUVs"];

  const filteredCars =
    activeCategory === "All"
      ? FLEET_DATA
      : FLEET_DATA.filter((c) => c.category === activeCategory);

  const handleCarClick = (car: Car) => {
    soundFx.playThrottle();
    onSelectCar(car);
  };

  return (
    <section id="fleet" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#FDF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header matching Image 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-black tracking-widest text-[#FF5400] uppercase mb-2">
              Featured Machines
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black uppercase leading-none">
              SELECTED <span className="text-[#FF5400]">WORKS</span>
            </h2>
          </div>

          {/* Category Filter Pills & View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#F8EEE8] border border-black/5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveCategory(cat);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0A0A0A] text-white shadow-md"
                        : "text-black/70 hover:text-black hover:bg-white/60"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Grid / Carousel Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-[#F8EEE8] border border-black/5">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setViewMode("grid");
                }}
                title="Grid view"
                className={`p-2 rounded-full cursor-pointer transition-all ${
                  viewMode === "grid" ? "bg-white text-black shadow-xs" : "text-black/50 hover:text-black"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setViewMode("carousel");
                }}
                title="Marquee row view"
                className={`p-2 rounded-full cursor-pointer transition-all ${
                  viewMode === "carousel" ? "bg-white text-black shadow-xs" : "text-black/50 hover:text-black"
                }`}
              >
                <Rows className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cars Layout */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onSelect={() => handleCarClick(car)} />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
            {filteredCars.map((car) => (
              <div key={car.id} className="min-w-[320px] sm:min-w-[380px] snap-center">
                <CarCard car={car} onSelect={() => handleCarClick(car)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CarCard({ car, onSelect }: { car: Car; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-6 border-2 border-black/10 hover:border-[#FF5400] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top badges & price */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#F8EEE8] text-black/80 border border-black/5">
            {car.category}
          </span>
          <div className="text-right">
            <span className="font-display text-2xl font-black text-[#FF5400]">
              ${car.pricePerDay}
            </span>
            <span className="text-[11px] text-black/50 font-bold ml-1">/day</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl font-black text-black group-hover:text-[#FF5400] transition-colors line-clamp-1">
          {car.name}
        </h3>
        <p className="text-xs text-black/60 font-medium line-clamp-2 mt-1">
          {car.tagline}
        </p>

        {/* Car Image with hover zoom */}
        <div className="relative w-full h-52 sm:h-56 my-4 rounded-2xl overflow-hidden bg-[#F8EEE8]">
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge Pill on image */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {car.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-bold text-white bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Performance Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#FDF8F5] border border-black/5 text-center text-xs">
          <div>
            <span className="block text-[10px] font-bold text-black/40 uppercase">0-60 MPH</span>
            <span className="font-display font-black text-black text-sm">{car.specs.acceleration}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-black/40 uppercase">POWER</span>
            <span className="font-display font-black text-[#FF5400] text-sm">{car.specs.hp} HP</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-black/40 uppercase">TOP SPEED</span>
            <span className="font-display font-black text-black text-sm">{car.specs.topSpeed}</span>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between">
        <span className="text-xs font-semibold text-black/60 group-hover:text-black transition-colors">
          Instant Keyless Unlock
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0A] group-hover:bg-[#FF5400] text-white text-xs font-bold transition-all duration-300 shadow-sm"
        >
          <span>Reserve</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
}
