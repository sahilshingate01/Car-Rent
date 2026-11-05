export interface Car {
  id: string;
  name: string;
  tagline: string;
  category: "Exotics" | "Classics" | "Hyper Electric" | "SUVs";
  pricePerDay: number;
  specs: {
    hp: number;
    acceleration: string; // 0-60
    topSpeed: string;
    transmission: string;
    engine: string;
    seats: number;
  };
  badges: string[];
  color: string;
  image: string;
  description: string;
  popularFor: string;
}

export const FLEET_DATA: Car[] = [
  {
    id: "porsche-gt3-rs",
    name: "Porsche 911 GT3 RS (992)",
    tagline: "Atmospheric 9,000 RPM track scalpel with swan-neck active aero",
    category: "Exotics",
    pricePerDay: 720,
    specs: {
      hp: 518,
      acceleration: "3.0s",
      topSpeed: "184 mph",
      transmission: "7-Speed PDK",
      engine: "4.0L Naturally Aspirated Flat-6",
      seats: 2,
    },
    badges: ["Track Pack", "9,000 RPM", "Active Aero"],
    color: "Shark Blue",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
    description: "The benchmark of motorsport precision on public roads. DRS wing, carbon-ceramic brakes, and an intoxicating naturally aspirated howl all the way to 9,000 RPM.",
    popularFor: "Malibu Canyons & Angeles Crest Highway",
  },
  {
    id: "ferrari-296-gtb",
    name: "Ferrari 296 GTB Assetto Fiorano",
    tagline: "819 HP twin-turbo V6 hybrid masterpiece in classic Rosso Corsa",
    category: "Exotics",
    pricePerDay: 1150,
    specs: {
      hp: 819,
      acceleration: "2.8s",
      topSpeed: "205 mph",
      transmission: "8-Speed Dual Clutch",
      engine: "3.0L Twin-Turbo 120° V6 + E-Motor",
      seats: 2,
    },
    badges: ["819 HP", "Assetto Fiorano", "Hybrid Surge"],
    color: "Rosso Corsa",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
    description: "Nicknamed 'Piccolo V12' by Maranello engineers for its spine-tingling acoustic profile. Instant hybrid electric torque married to 819 horsepower of pure Italian drama.",
    popularFor: "Pacific Coast Highway sunset sprint",
  },
  {
    id: "bronco-1974-restomod",
    name: "Ford Bronco 1974 Restomod V8",
    tagline: "Iconic vintage California off-roader with modern Coyote 5.0L power",
    category: "Classics",
    pricePerDay: 440,
    specs: {
      hp: 460,
      acceleration: "4.6s",
      topSpeed: "120 mph",
      transmission: "10-Speed Automatic",
      engine: "5.0L Gen 3 Coyote V8",
      seats: 4,
    },
    badges: ["Open Top", "V8 Coyote", "Vintage Icon"],
    color: "Wimbledon White & Sky",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "The ultimate beach cruiser and desert explorer. Open-air safari top, custom baseball glove leather interior, Bluetooth Marshall audio, and a roaring V8 under the retro hood.",
    popularFor: "Venice Beach boulevard cruising & Joshua Tree weekends",
  },
  {
    id: "amg-g63-magno",
    name: "Mercedes-AMG G63 Night Magno",
    tagline: "Matte black bi-turbo V8 fortress with side-exit roar",
    category: "SUVs",
    pricePerDay: 580,
    specs: {
      hp: 577,
      acceleration: "4.4s",
      topSpeed: "149 mph",
      transmission: "9-Speed AMG Speedshift",
      engine: "4.0L Handcrafted Bi-Turbo V8",
      seats: 5,
    },
    badges: ["Side Pipes", "Triple Lockers", "Night Package"],
    color: "Matte Black Magno",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
    description: "The gold standard of commanding luxury. Side-pipe exhausts that rumble through your chest, diamond-quilted massage seats, and supreme road presence.",
    popularFor: "Aspen ski getaways & Beverly Hills arrivals",
  },
  {
    id: "aston-martin-vantage",
    name: "Aston Martin Vantage V8",
    tagline: "British Racing Green grand tourer with muscle and sophistication",
    category: "Exotics",
    pricePerDay: 790,
    specs: {
      hp: 656,
      acceleration: "3.4s",
      topSpeed: "202 mph",
      transmission: "8-Speed ZF Sport",
      engine: "4.0L Twin-Turbo V8",
      seats: 2,
    },
    badges: ["British Green", "James Bond Vibe", "656 HP"],
    color: "British Racing Green",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    description: "Wider, louder, and sharper than ever. Hand-stitched Bridge of Weir leather cockpit paired with an intoxicating AMG-derived twin-turbo powerplant tuned by Aston Martin.",
    popularFor: "Napa Valley wine country & coastal scenic sweeps",
  },
  {
    id: "shelby-cobra-427",
    name: "1965 Shelby Cobra 427 S/C",
    tagline: "Raw, unfiltered American muscle with side pipes and zero driver assists",
    category: "Classics",
    pricePerDay: 620,
    specs: {
      hp: 485,
      acceleration: "3.8s",
      topSpeed: "165 mph",
      transmission: "4-Speed Manual Toploader",
      engine: "7.0L Ford FE 427 Big Block V8",
      seats: 2,
    },
    badges: ["Big Block 427", "Manual Gearbox", "Pure Nostalgia"],
    color: "Guardsman Blue",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    description: "Zero traction control. Zero power steering. Just 485 thunderous horses, lightweight aluminum bodywork, and dual white racing stripes. A time machine of pure adrenaline.",
    popularFor: "Sunday morning sunrise canyon runs",
  },
  {
    id: "taycan-turbo-s",
    name: "Porsche Taycan Turbo S Cross",
    tagline: "750 HP electric missile with gravel mode and launch control G-forces",
    category: "Hyper Electric",
    pricePerDay: 510,
    specs: {
      hp: 750,
      acceleration: "2.6s",
      topSpeed: "161 mph",
      transmission: "2-Speed Rear Axle",
      engine: "Dual Permanent Magnet E-Motors",
      seats: 5,
    },
    badges: ["0-60 in 2.6s", "Electric Launch", "Cross Turismo"],
    color: "Chalk Grey",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "Neck-snapping acceleration with zero lag. All-wheel drive, air suspension with gravel ride-height lift, and enough luggage room for an effortless weekend in Big Sur.",
    popularFor: "Silicon Valley escapes & Big Sur coastal glamping",
  },
  {
    id: "audi-rs6-avant",
    name: "Audi RS6 Avant Performance",
    tagline: "The undisputed king of super-wagons in aggressive Nardo Grey",
    category: "SUVs",
    pricePerDay: 540,
    specs: {
      hp: 621,
      acceleration: "3.3s",
      topSpeed: "190 mph",
      transmission: "8-Speed Tiptronic Quattro",
      engine: "4.0L Bi-Turbo TFSI V8",
      seats: 5,
    },
    badges: ["Quattro AWD", "Super Wagon", "621 HP"],
    color: "Nardo Grey",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    description: "Flared fenders, quattro all-wheel drive stability, twin-turbo V8 roar, and room for 5 adults plus all their luggage. The ultimate stealth missile for high-speed cross-country cruising.",
    popularFor: "Lake Tahoe ski runs & long distance road rallies",
  },
];
