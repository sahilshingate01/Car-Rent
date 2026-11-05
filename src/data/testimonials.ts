export interface Testimonial {
  id: string;
  headline: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  carRented: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "review-1",
    headline: "Renting the GT3 RS for Big Sur ruined all other rental cars for me forever",
    quote:
      "I was expecting the usual rental nightmare: waiting in a fluorescent line, arguing about damage waivers, and receiving a washed-out commuter car. Two26 delivered the GT3 RS directly to my hotel valet in Santa Monica with a warm engine, 93-octane gas, and the keys on my phone. The 9,000 RPM howl through the cliffs was religious.",
    author: "Elena Rostova",
    role: "Creative Director & Track Enthusiast",
    location: "Los Angeles, CA",
    carRented: "Porsche 911 GT3 RS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-2",
    headline: "The 60-second curb handover is pure witchcraft. Zero paperwork BS",
    quote:
      "Landed at Miami Executive, tapped 'Unlock' on my phone, and the Matte Black G63 was purring outside the hangar door. No clipboard, no fingerprinting my credit card, no two-hour wait. Drove straight down Ocean Drive with the side pipes rumbling. This is how renting cars should have always been.",
    author: "Marcus Vance",
    role: "Tech Founder & Angel Investor",
    location: "Miami, FL",
    carRented: "Mercedes-AMG G63",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-3",
    headline: "The 1974 Bronco turned more heads in Palm Springs than a brand-new Ferrari",
    quote:
      "We took the vintage Bronco restomod into Joshua Tree for our 5th anniversary. The Coyote V8 sounds like roaring thunder, the baseball-leather seats are sublime, and having an open-air safari top under the desert stars was unforgettable. Best weekend trip of our entire decade together.",
    author: "Chloe & Liam Davies",
    role: "Architectural Designers",
    location: "San Francisco, CA",
    carRented: "Ford Bronco 1974 Restomod",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-4",
    headline: "The pre-loaded GPS canyon routes were an unexpected masterclass",
    quote:
      "Most rental outfits hand you keys and say 'don't speed'. Two26 pre-programmed the navigation with 140 miles of secret twisties through Angeles Crest with scheduled lookout points and the best mountain espresso cabin. The Ferrari 296 GTB hybrid acceleration is mind-bending.",
    author: "David Sterling",
    role: "Automotive Journalist",
    location: "New York, NY",
    carRented: "Ferrari 296 GTB",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "review-5",
    headline: "Zero surprise deposit holds, zero fuel penalties. Truly honest hospitality",
    quote:
      "When they said 'drop off at the airport valet on empty', I thought there'd be an extortionate 10x gas surcharge buried on my statement. Checked the receipt: standard market gas price down to the penny. The Aston Martin Vantage was immaculate inside and out. Two26 is on speed dial for all my business trips.",
    author: "Siddharth Mehta",
    role: "Partner, Global Equity",
    location: "London & Zurich",
    carRented: "Aston Martin Vantage",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
  },
];
