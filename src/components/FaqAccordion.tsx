"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/faqs";
import { soundFx } from "@/utils/sound";
import { Plus } from "lucide-react";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);

  const toggle = (id: string) => {
    soundFx.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 md:px-8 bg-[#F8EEE8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-black tracking-widest text-[#FF5400] uppercase px-4 py-1.5 rounded-full bg-white border border-[rgba(15,30,19,0.08)] mb-3 shadow-xs">
            Clear Answers
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-black uppercase tracking-tight">
            QUESTIONS? <span className="text-[#FF5400]">NO STUPID ONES.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-black/60 font-medium">
            Everything you need to know about our keys, policies, and the throttle.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-white border-[#FF5400] shadow-md"
                    : "bg-white/70 border-[rgba(15,30,19,0.08)] hover:border-[rgba(15,30,19,0.2)] hover:bg-white"
                }`}
                onClick={() => toggle(faq.id)}
              >
                <div className="flex items-center justify-between p-6 sm:p-7 gap-4">
                  <div className="flex items-center gap-3">
                    {faq.badge && (
                      <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF3EE] text-[#FF5400]">
                        {faq.badge}
                      </span>
                    )}
                    <h3 className="font-display text-lg sm:text-xl font-black text-black tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF5400] text-white rotate-45"
                        : "bg-[#FAF3EE] text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 pt-0 text-sm text-black/70 font-medium leading-relaxed border-t border-[rgba(15,30,19,0.06)] mt-1">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
