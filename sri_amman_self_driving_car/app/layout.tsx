import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Amman Self Driving Rental Car Madurai - Maruti Suzuki Wagon R Rental",
  description: "Affordable, reliable, and premium self-drive Maruti Suzuki Wagon R car rental in Madurai. Clean, hygienic, 24/7 delivery. Book instantly via WhatsApp or call +91 70105 32307.",
  keywords: [
    "self drive car rental Madurai",
    "Sri Amman car rental Madurai",
    "rent Wagon R Madurai",
    "self drive Wagon R Madurai",
    "car hire Madurai",
    "Nelpettai car rental",
    "affordable car rental Madurai",
    "family trip car rental Madurai"
  ],
  authors: [{ name: "Sri Amman Self Driving Rental Car" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#080808] text-white font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

