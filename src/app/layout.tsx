import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TWO26 DRIVE | Driving Suspiciously Good | Curated Exotics & Classics",
  description:
    "An unapologetic car rental studio for pure driving joy. Keyless 60-second curb delivery, zero paperwork, curated exotics, and unlimited miles included.",
  keywords: [
    "luxury car rental",
    "exotic car rental",
    "porsche 911 rental",
    "classic car rental",
    "keyless car hire",
    "two26 drive",
  ],
  openGraph: {
    title: "TWO26 DRIVE | Driving Suspiciously Good",
    description: "Curated exotics & classics delivered to your curb. No paperwork. Unlimited smiles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#FDF8F5] text-[#0A0A0A] font-sans antialiased selection:bg-[#FF5400] selection:text-white">
        {children}
      </body>
    </html>
  );
}
