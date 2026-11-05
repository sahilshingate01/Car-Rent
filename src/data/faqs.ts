export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  badge?: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I get the EXACT car in the photos, or 'similar'?",
    answer:
      "You get the exact vehicle, exact VIN, exact colorway, and exact exhaust tone shown on our site. We despise the airport bait-and-switch where you reserve an AMG and end up in a rental beige crossover. If you book the Shark Blue GT3 RS, you drive the Shark Blue GT3 RS.",
    badge: "100% Guaranteed",
  },
  {
    id: "faq-2",
    question: "How does the 60-second curb delivery work?",
    answer:
      "Select your delivery location (your hotel driveway, terminal curb, or private air hangar). Our valet drops the spotless car 15 minutes before your arrival and pings you. When you walk up, tap 'Unlock' inside your Two26 web app. The digital key is paired with your phone, and you are immediately on the road.",
    badge: "Keyless Magic",
  },
  {
    id: "faq-3",
    question: "What is the minimum age requirement?",
    answer:
      "Drivers must be 21 or older with a valid, clean driver's license for classics and performance SUVs. For high-powered exotic supercars (Ferrari 296 GTB, GT3 RS), the minimum age is 25, or 21+ with verified track day experience or an existing sports car insurance policy.",
    badge: "21+ Clean Record",
  },
  {
    id: "faq-4",
    question: "Can I take the car on canyon roads or track days?",
    answer:
      "Canyon carving and scenic road trips are what these cars were built for! Every rental includes pre-loaded GPS scenic waypoints through coastal highways and twisties. For closed-circuit track use (Laguna Seca, Willow Springs), simply select our optional 'Apex Track Pack' during booking which unlocks track insurance and telemetry logging.",
    badge: "Pure Driving Joy",
  },
  {
    id: "faq-5",
    question: "What happens if I return the car on empty?",
    answer:
      "No penalty gouging. While airport rental companies bill you $11/gallon, we simply bill the exact local pump price with zero surcharge. Or better yet: add the pre-paid tank add-on for flat cost and drop off with the fuel needle on E.",
    badge: "Fair Fuel Policy",
  },
  {
    id: "faq-6",
    question: "What insurance and protection is included?",
    answer:
      "All rentals include standard third-party liability and 24/7 flatbed concierge dispatch. We also offer our 'Peace of Mind' zero-deductible comprehensive waiver and 'White-Glove Wheel & Glass' package so you can attack twisty apexes with total confidence.",
    badge: "Zero Deductible",
  },
];
