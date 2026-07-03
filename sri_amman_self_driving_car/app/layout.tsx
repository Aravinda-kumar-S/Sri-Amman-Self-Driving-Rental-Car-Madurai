import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Amman Self Driving Rental Car Madurai - CNG & Affordable Wagon R Rental",
  description: "Most affordable CNG & petrol Maruti Suzuki Wagon R self-drive car rental in Madurai. Save up to 50% on fuel with CNG option. Clean, hygienic, 24/7 doorstep delivery. Book instantly via WhatsApp or call +91 70105 32307.",
  keywords: [
    "self drive car rental Madurai",
    "CNG car rental Madurai",
    "affordable self drive Madurai",
    "cheap car rental Madurai",
    "Sri Amman car rental Madurai",
    "rent Wagon R Madurai",
    "self drive Wagon R Madurai",
    "car hire Madurai",
    "Nelpettai car rental",
    "cost effective car rental Madurai",
    "affordable car rental Madurai",
    "CNG Wagon R rental Madurai",
    "family trip car rental Madurai",
    "outstation car rental Madurai"
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

