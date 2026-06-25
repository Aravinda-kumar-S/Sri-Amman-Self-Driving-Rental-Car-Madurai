"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring 
} from "framer-motion";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Car, 
  Compass, 
  CheckCircle2, 
  ChevronDown, 
  ArrowUp, 
  ShieldCheck, 
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Users,
  Briefcase,
  Navigation
} from "lucide-react";

export default function Home() {
  // Loading state
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(100);


  // 360 degree rotator states
  const [activeAngle, setActiveAngle] = useState(0); // 0 = Front-Right, 1 = Front-Left, 2 = Rear

  // Booking Form states
  const [bookingData, setBookingData] = useState({
    name: "",
    mobile: "",
    location: "",
    destination: "",
    city: "Madurai",
    vehicle: "Maruti Suzuki Wagon R",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: ""
  });

  // Contact Form states
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Accordion active keys
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Preloader counter effect
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [loadingProgress]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WhatsApp Redirect Generator
  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, mobile, location, destination, city, vehicle, pickupDate, pickupTime, dropDate, dropTime } = bookingData;
    
    if (!name || !mobile || !pickupDate || !pickupTime || !dropDate || !dropTime) {
      alert("Please fill in all required fields (Name, Mobile, Pickup and Drop details).");
      return;
    }

    const message = `Hello Sri Amman Self Driving Rental Car,

Name: ${name}
Mobile: ${mobile}
Location: ${location || "Not Specified"}
Destination: ${destination || "Not Specified"}
City: ${city}
Vehicle: ${vehicle}
Pickup Date: ${pickupDate}
Pickup Time: ${pickupTime}
Drop Date: ${dropDate}
Drop Time: ${dropTime}

Please contact me regarding self drive car booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917010532307?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, message } = contactData;
    
    if (!name || !phone) {
      alert("Please fill out your Name and Phone Number.");
      return;
    }

    const waMessage = `Hello Sri Amman Self Driving Rental Car,

I have a new enquiry:
Name: ${name}
Phone: ${phone}
Message: ${message || "No message provided."}

Please contact me regarding this query.`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/917010532307?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactData({ name: "", phone: "", message: "" });
    }, 4000);
  };


  // Static specs for Wagon R
  const specs = [
    { name: "Comfortable Seating", desc: "Spacious 5-seater cabin with tall-boy design" },
    { name: "Excellent Mileage", desc: "Superb fuel efficiency, ideal for long journeys" },
    { name: "Air Conditioned", desc: "Powerful cooling for Tamil Nadu summers" },
    { name: "Power Steering", desc: "Effortless handling in city traffic & highways" },
    { name: "Family Friendly", desc: "Huge boot space & comfortable legroom for all" },
    { name: "Long Distance Ready", desc: "Fully serviced, clean & highway-tested engine" },
    { name: "City & Outstation Travel", desc: "Perfect size for narrow city roads and outer highways" }
  ];

  // Locations served
  const locations = [
    "Madurai Main", "Vakaikulam", "Sellur", "Koodal Nagar", 
    "Arappalayam", "Mattuthavani", "K Pudur", "Iyer Bungalow"
  ];

  // Image arrays for 360 viewer
  const carImages = [
    "/wagon_r_front_real.jpg", // Front
    "/wagon_r_side_real.jpg",  // Side
    "/wagon_r_rear_real.webp"  // Rear
  ];

  return (
    <div className="relative bg-[#080808] text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. Loader Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <div className="relative w-72 h-40 flex flex-col items-center justify-center">
              {/* Silhouette Vector Overlay */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[#D4AF37] mb-4 text-center font-montserrat tracking-widest text-lg font-bold"
              >
                SRI AMMAN SELF DRIVING
                <div className="text-xs text-red-500 font-sans tracking-normal mt-1">LOADING LUXURY RUNWAY...</div>
              </motion.div>
              
              {/* Progress bar */}
              <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              
              <div className="text-[#D4AF37] mt-3 font-mono text-sm tracking-widest">
                {loadingProgress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* WhatsApp Call to Action */}
        <motion.a 
          href="https://wa.me/917010532307"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/50 hover:bg-emerald-500 transition-colors border border-emerald-400/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </motion.a>
        
        {/* Quick Call */}
        <motion.a 
          href="tel:+917010532307"
          className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-950/50 hover:bg-red-500 transition-colors border border-red-400/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.a>

        {/* Back to top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-14 h-14 bg-zinc-900 border border-amber-500/30 rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-6 h-6 text-[#D4AF37]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-45 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0">
              <Image 
                src="/logo.png" 
                alt="Sri Amman Self Driving Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-lg font-extrabold tracking-wide text-white leading-none">
                SRI AMMAN
              </span>
              <span className="text-[9px] text-[#D4AF37] font-semibold tracking-wider uppercase mt-1">
                Self Driving Car
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#booking" className="hover:text-[#D4AF37] transition-colors">Book Now</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a>
            <a href="#why-choose-us" className="hover:text-[#D4AF37] transition-colors">Features</a>
            <a href="#showcase" className="hover:text-[#D4AF37] transition-colors">The Wagon R</a>
            <a href="#timeline" className="hover:text-[#D4AF37] transition-colors">How it Works</a>
            <a href="#service-areas" className="hover:text-[#D4AF37] transition-colors">Locations</a>
            <a href="#policies" className="hover:text-[#D4AF37] transition-colors">Policies</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="tel:+917010532307" 
              className="hidden sm:flex items-center gap-2 text-zinc-300 hover:text-white text-sm mr-2"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>+91 70105 32307</span>
            </a>
            <motion.a 
              href="#booking"
              className="bg-gradient-to-r from-amber-500 to-[#D4AF37] text-black font-semibold px-5 py-2.5 rounded-full text-sm hover:from-amber-400 hover:to-yellow-300 transition-all shadow-md shadow-amber-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </div>
        </div>
      </header>

      {/* 4. Full Screen Hero Section */}
      <section id="hero" className="relative min-h-screen pt-20 flex flex-col justify-between overflow-hidden">
        
        {/* Animated grid lines and background templates */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,40,40,0.15),transparent_60%)]"></div>
          {/* Temple skyline background silhouette */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-15 pointer-events-none select-none z-0">
            <Image 
              src="/temple_silhouette.png" 
              alt="Madurai Meenakshi Temple skyline backdrop" 
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
          {/* Highway scrolling animation container */}
          <div className="absolute bottom-0 left-0 w-full h-[350px] overflow-hidden opacity-40">
            <div className="highway-bg w-full h-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-red-950/40 border border-red-500/20 px-4 py-1.5 rounded-full text-xs text-red-400 font-semibold tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Best Self Drive Car Rental In Madurai
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-poppins font-black tracking-tight leading-none mb-6 max-w-5xl"
          >
            DRIVE YOUR FREEDOM. <br />
            <span className="gold-gradient-text">YOUR CAR.</span> <span className="red-gradient-text">YOUR JOURNEY.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-base sm:text-xl max-w-3xl leading-relaxed mb-8"
          >
            Affordable, reliable and premium Maruti Suzuki Wagon R self-drive car rentals for family trips, local travel, business excursions, and outstation journeys.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:w-auto px-4 mb-10"
          >
            <a 
              href="#booking"
              className="bg-[#D4AF37] hover:bg-[#ffe57f] text-black font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              BOOK NOW
            </a>
            <a 
              href="https://wa.me/917010532307"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/10 text-center flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              WHATSAPP BOOKING
            </a>
            <a 
              href="tel:+917010532307"
              className="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white font-extrabold px-8 py-4 rounded-xl text-center flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-red-500" />
              CALL NOW
            </a>
          </motion.div>

          {/* Feature Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-4"
          >
            {[
              "Instant Booking",
              "Doorstep Delivery",
              "24/7 Customer Support",
              "Clean Hygienic Cars"
            ].map((badge, idx) => (
              <div 
                key={idx} 
                className="glass-card-gold px-4 py-3 rounded-xl flex items-center justify-center gap-2 border border-amber-500/20 text-[#D4AF37] font-semibold text-xs tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>✓ {badge}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center Floating/Hovering Car */}
        <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center z-10 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
            className="relative w-[340px] sm:w-[500px] md:w-[680px] h-[220px] sm:h-[300px] md:h-[380px]"
          >
            {/* Soft Shadow underneath car */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/75 blur-md rounded-[100%]"></div>
            
            {/* The Floating Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-full h-full relative cursor-pointer"
            >
              <Image 
                src="/wagon_r_front_real.jpg"
                alt="Maruti Suzuki Wagon R - Sri Amman Self Driving"
                fill
                className="object-contain rounded-2xl border border-zinc-800/40 shadow-xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Counters & Stats Footer of Hero */}
        <div className="relative z-10 w-full bg-black/60 border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "50+", label: "Happy Customers" },
              { num: "50+", label: "Trips Completed" },
              { num: "24/7", label: "Customer Support" },
              { num: "100%", label: "Satisfaction Guaranteed" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col justify-center">
                <span className="text-3xl md:text-4xl font-poppins font-black text-[#D4AF37]">{stat.num}</span>
                <span className="text-zinc-400 text-xs sm:text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live Booking Section */}
      <section id="booking" className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_40%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mb-4">
              SECURE YOUR <span className="gold-gradient-text">WAGON R</span> INSTANTLY
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Submit your trip dates & details to automatically generate a pre-formatted booking dispatch for our WhatsApp agents.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-red rounded-3xl p-6 sm:p-10 border border-red-500/20"
          >
            <form onSubmit={handleWhatsAppBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    value={bookingData.name}
                    onChange={e => setBookingData({...bookingData, name: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Enter 10 digit number"
                    value={bookingData.mobile}
                    onChange={e => setBookingData({...bookingData, mobile: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> City <span className="text-zinc-500">(Default)</span>
                  </label>
                  <input 
                    type="text" 
                    readOnly
                    value={bookingData.city}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm cursor-not-allowed"
                  />
                </div>

                {/* Vehicle */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#D4AF37]" /> Pre-Selected Vehicle
                  </label>
                  <input 
                    type="text" 
                    readOnly
                    value={bookingData.vehicle}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm cursor-not-allowed"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Pickup Delivery Location
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mattuthavani, Sellur, Airport..."
                    value={bookingData.location}
                    onChange={e => setBookingData({...bookingData, location: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Destination */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> Travel Destination
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kodaikanal, Rameswaram, Local..."
                    value={bookingData.destination}
                    onChange={e => setBookingData({...bookingData, destination: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Pickup Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    required
                    value={bookingData.pickupDate}
                    onChange={e => setBookingData({...bookingData, pickupDate: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Pickup Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Pickup Time <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="time" 
                    required
                    value={bookingData.pickupTime}
                    onChange={e => setBookingData({...bookingData, pickupTime: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Drop Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Drop-Off Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    required
                    value={bookingData.dropDate}
                    onChange={e => setBookingData({...bookingData, dropDate: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Drop Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Drop-Off Time <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="time" 
                    required
                    value={bookingData.dropTime}
                    onChange={e => setBookingData({...bookingData, dropTime: e.target.value})}
                    className="bg-black/50 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Booking CTA */}
              <div className="pt-4">
                <motion.button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-3 text-base tracking-wide transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  BOOK INSTANTLY VIA WHATSAPP
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 6. About Us */}
      <section id="about" className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,40,40,0.05),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title / Description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
                About Sri Amman Self Driving Car
              </span>
              <h2 className="text-3xl sm:text-5xl font-poppins font-black leading-tight">
                AFFORDABLE & RELIABLE <span className="gold-gradient-text">CAR RENTAL</span> ACROSS MADURAI
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                Sri Amman Self Driving Rental Car offers premium self-drive vehicle services throughout Madurai. We are committed to rendering safe, fully-maintained, hygienic, and customer-friendly transit experiences tailored for diverse user requirements.
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                Whether you need a spacious, fuel-efficient vehicle for family gatherings, local business meetings, or outstation tours to the mountains, our custom-finished Maruti Suzuki Wagon R offers supreme comfort, high reliability, and maximum peace of mind.
              </p>

              {/* Service Areas */}
              <div className="pt-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37] block mb-3">
                  We Deliver Directly to Your Location:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {locations.map((loc, idx) => (
                    <div 
                      key={idx} 
                      className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 flex items-center gap-2 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-zinc-300 text-xs font-semibold">{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Block / Temples / Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card-gold rounded-3xl p-8 border border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
                <h3 className="text-xl font-poppins font-extrabold text-[#D4AF37] mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-500" />
                  OUR OPERATIONAL MISSION
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-sm">Flexible Pricing Packages</strong>
                      <span className="text-zinc-400 text-xs">Affordable rates tailored for daily, weekly, or custom duration trips.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-sm">Pristine Hygiene Standard</strong>
                      <span className="text-zinc-400 text-xs">Vehicles are comprehensively vacuumed, sanitized, and fragranced before handover.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-sm">Seamless Verification</strong>
                      <span className="text-zinc-400 text-xs">Transparent documentation policies with no hidden surprises.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Why Choose Us (3D Cards) */}
      <section id="why-choose-us" className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
              Why Choose Sri Amman
            </span>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mt-2">
              WHY DRIVERS PREFER <span className="gold-gradient-text">OUR ROAD SERVICE</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              We focus on premium deliverables to ensure that every self-drive trip you take with us is smooth, clean, and completely reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Fully Fragranced Cars", desc: "Experience a refreshing drive with our premium interior air fresheners." },
              { title: "24/7 Customer Support", desc: "Need assistance? Our helpdesk is open round-the-clock for real-time solutions." },
              { title: "Well Maintained Cars", desc: "No mechanical failures. Every car goes through extreme diagnostics before dispatch." },
              { title: "Customer Friendly Staff", desc: "We coordinate with polite, respectful executives to handle your pick-up and drops." },
              { title: "Clean Hygienic Interior", desc: "Deep cleaned seats, vacuumed foot mats, and sanitized surfaces." },
              { title: "Doorstep Delivery", desc: "We bring the Wagon R right to your home, railway station, or hotel in Madurai." },
              { title: "Quick Delivery Service", desc: "Punctual drivers ensure that your vehicle is delivered exactly on time." },
              { title: "Flexible Rental Plans", desc: "Choose rental terms that align with your custom traveling schedule." },
              { title: "Affordable Pricing", desc: "Premium driving feel at direct value-for-money rates." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card hover:glass-card-gold p-6 rounded-2xl border border-zinc-800 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#D4AF37]/20 flex items-center justify-center mb-4 text-[#D4AF37]">
                    <CheckCircle2 className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{card.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] uppercase font-semibold text-zinc-500 group-hover:text-red-500">
                  <span>Standard Feature</span>
                  <span>Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Vehicle Section (Interactive 360°) */}
      <section id="showcase" className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.04),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
              Primary Vehicle Model
            </span>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mt-2">
              MARUTI SUZUKI <span className="gold-gradient-text">WAGON R</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Rotate our customized Wagon R to explore different angles. The ultimate family-friendly vehicle for Tamil Nadu travel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive 3D Rotator Center */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-[540px] h-[260px] sm:h-[360px] flex items-center justify-center bg-zinc-950/60 rounded-3xl border border-zinc-900 p-4 relative overflow-hidden shadow-2xl">
                
                {/* Gold grid particles behind model */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAngle}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={carImages[activeAngle]} 
                      alt="Wagon R angle showcase" 
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Hotspot indicator overlay */}
                <div className="absolute bottom-4 left-4 bg-black/80 border border-zinc-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                  <span>360 VIEW ACTIVE</span>
                </div>
              </div>

              {/* Rotator Controls */}
              <div className="mt-6 flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 rounded-xl">
                <button 
                  onClick={() => setActiveAngle(0)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeAngle === 0 ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  Front-Right
                </button>
                <button 
                  onClick={() => setActiveAngle(1)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeAngle === 1 ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  Front-Left
                </button>
                <button 
                  onClick={() => setActiveAngle(2)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeAngle === 2 ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  Rear-3/4
                </button>
              </div>
            </div>

            {/* Vehicle Specifications */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-zinc-800">
                <h3 className="text-lg font-poppins font-bold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center gap-2">
                  <Car className="w-5 h-5 text-red-500" />
                  SPECIFICATIONS & UTILITIES
                </h3>
                
                <ul className="space-y-3">
                  {specs.map((spec, idx) => (
                    <li key={idx} className="flex justify-between items-start gap-4 border-b border-zinc-900/60 pb-2.5 last:border-b-0">
                      <span className="text-zinc-300 font-semibold text-sm">{spec.name}</span>
                      <span className="text-zinc-500 text-xs text-right">{spec.desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <motion.a
                    href="#booking"
                    className="w-full bg-[#C62828] hover:bg-red-500 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-center text-sm shadow-md transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    RENT THIS CAR NOW
                  </motion.a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. How It Works Timeline */}
      <section id="timeline" className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
              Seamless Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mt-2">
              HOW IT <span className="gold-gradient-text">WORKS</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              5 Simple Steps to reserve and hit the highway with our clean self-driving Wagon R.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Visual connecting highway line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hidden md:block -translate-y-1/2 opacity-20"></div>
            
            {[
              { step: "01", title: "BOOKING", desc: "Enter your pickup and drop timings and submit details." },
              { step: "02", title: "VERIFY DOCUMENTS", desc: "Upload original Aadhaar card, Driving License & employee ID." },
              { step: "03", title: "PICKUP VEHICLE", desc: "Retrieve keys at Nelpettai hub or choose convenient doorstep drop." },
              { step: "04", title: "ENJOY JOURNEY", desc: "Drive within speed limits (80-100 KM/H) with total freedom." },
              { step: "05", title: "RETURN VEHICLE", desc: "Return car with all papers at specified scheduling times." }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl relative z-10 border border-zinc-800 text-center flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-mono font-black text-red-600/30 block mb-4">{item.step}</span>
                  <h3 className="text-sm font-black text-[#D4AF37] mb-2 tracking-wider">{item.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-black border border-zinc-800 mx-auto mt-4 flex items-center justify-center text-[10px] text-zinc-500 font-bold">
                  ✓
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Service Areas & Google Map */}
      <section id="service-areas" className="py-24 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Location checklist */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
                Operational Areas
              </span>
              <h2 className="text-3xl sm:text-5xl font-poppins font-black leading-tight">
                VISIT US AT <span className="gold-gradient-text">NELPETTAI HUB</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our main administrative desk is located right near HDFC bank at East Veli Street, Madurai. We support doorstep delivery across Madurai Main, Vakaikulam, Sellur, Koodal Nagar, Arappalayam, Mattuthavani, K Pudur, Iyer Bungalow, and surrounding regions.
              </p>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <strong className="text-white block text-sm">Nelpettai Office Hub</strong>
                    <span className="text-zinc-400 text-xs">229-230, E Veli St, Near HDFC Bank, Nelpettai, Madurai Main, Tamil Nadu 625001</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <strong className="text-white block text-sm">Direct Phone/WhatsApp Line</strong>
                    <span className="text-zinc-400 text-xs">+91 70105 32307</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://www.google.com/maps/place/Sri+Amman+Self+Driving+Rental+Car+Madurai/@9.9213951,78.1250928,17z/data=!4m14!1m7!3m6!1s0x3b00c5d2423514b9:0x690b35cc9f00b09c!2sSri+Amman+Self+Driving+Rental+Car+Madurai!8m2!3d9.9213951!4d78.1250928!16s%2Fg%2F11njcygvd7!3m5!1s0x3b00c5d2423514b9:0x690b35cc9f00b09c!8m2!3d9.9213951!4d78.1250928!16s%2Fg%2F11njcygvd7?entry=ttu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#ffe57f] text-black font-extrabold px-6 py-3.5 rounded-xl text-sm transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  GET DIRECTIONS
                </a>

              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7">
              <div className="w-full h-[380px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative">
                {/* Embed */}
                <iframe 
                  src="https://maps.google.com/maps?q=Sri%20Amman%20Self%20Driving%20Rental%20Car%20Madurai&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"

                ></iframe>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Policy Center Accordion */}
      <section id="policies" className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
              Rental Rules
            </span>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mt-2">
              POLICIES & <span className="gold-gradient-text">TERMS</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
              Read through our cancellation, refund, damage coverages, and general terms of service.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "refund",
                title: "Refund Policy",
                icon: ShieldCheck,
                content: (
                  <div className="space-y-3 text-zinc-400 text-sm">
                    <p>• <strong>Document Verification:</strong> Original documents are mandatory at pickup. Bookings will be cancelled with no refund if files are missing or incomplete.</p>
                    <p>• <strong>Intoxication Policy:</strong> Booking is subject to immediate cancellation with zero refund if driver is under influence at pickup.</p>
                    <p>• <strong>Date Changes:</strong> Notifications submitted 48+ hours in advance are modified without charge. 48-24 hours attracts 30% fee. Within 24 hours matches zero-refund policy.</p>
                    <p>• <strong>Process Duration:</strong> Once refund requests are approved internally, money transfers back to bank accounts in 5-7 working days.</p>
                  </div>
                )
              },
              {
                id: "cancellation",
                title: "Cancellation Policy",
                icon: AlertTriangle,
                content: (
                  <div className="space-y-2 text-zinc-400 text-sm">
                    <p>• <strong>Before 24 Hours:</strong> Eligible for 50% refund.</p>
                    <p>• <strong>Within 24 Hours:</strong> Zero refund or modifications allowed.</p>
                    <p>• <strong>Missing ID Proofs:</strong> Treated as last-minute cancellation, zero refund.</p>
                    <p>• <strong>Drunk at Pickup:</strong> Immediate cancellation with no refund.</p>
                  </div>
                )
              },
              {
                id: "insurance",
                title: "Insurance Policy & Damages",
                icon: ShieldCheck,
                content: (
                  <div className="space-y-3 text-zinc-400 text-sm">
                    <p>• <strong>Damage Below ₹25,000:</strong> Renter bears the entire showroom repair invoice at pickup spot.</p>
                    <p>• <strong>Damage Above ₹25,000:</strong> Showroom insurance claim is initialized. The renter is responsible to pay depreciation charge of ₹25,000 and the difference amount between the showroom quote and the final insurance approval.</p>
                    <p>• <strong>Downtime Charges:</strong> Renter pays standard daily rental charges for all days the car is held under repairs inside showroom.</p>
                    <p>• <strong>Non-Claimable Scenarios:</strong> Violating speed limits, drunk driving, off-roading, and rash driving invalidate insurance. Renter pays full repair expenses in these scenarios.</p>
                  </div>
                )
              },
              {
                id: "terms",
                title: "Terms and Conditions (Complete Checklist)",
                icon: HelpCircle,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-400 text-xs leading-relaxed">
                    <div className="space-y-2">
                      <p>• Minimum age required to drive is 23 years.</p>
                      <p>• Original Driving License is deposited at the hub until return.</p>
                      <p>• Working Corporate ID & Aadhaar Card verified at delivery.</p>
                      <p>• Passport mandatory for NRI and foreign nationals.</p>
                      <p>• Carrying pets, tobacco, drugs, alcohol, or commercial goods strictly prohibited.</p>
                    </div>
                    <div className="space-y-2">
                      <p>• Renter must take photos and videos of the car before taking keys.</p>
                      <p>• Only authorized Maruti service centers can handle repairs.</p>
                      <p>• 300 KM daily limit applies. Fuel expenses are paid by customer.</p>
                      <p>• Speed limit: 80 to 100 KM/H. Above 110 KM/H incurs ₹1000 penalty per event.</p>
                      <p>• Advance payment blocks the vehicle; full payment required before hand-over.</p>
                    </div>
                  </div>
                )
              }
            ].map((policy) => {
              const Icon = policy.icon;
              const isOpen = activePolicy === policy.id;
              return (
                <div key={policy.id} className="glass-card rounded-2xl border border-zinc-800 overflow-hidden">
                  <button 
                    onClick={() => setActivePolicy(isOpen ? null : policy.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-zinc-900/40 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-red-500" />
                      <span className="font-poppins font-bold text-sm sm:text-base tracking-wide text-white">{policy.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-zinc-900 bg-zinc-950/40"
                      >
                        <div className="p-6">
                          {policy.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section id="faq" className="py-24 relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
              Help Center
            </span>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black mt-2">
              FREQUENTLY ASKED <span className="gold-gradient-text">QUESTIONS</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What documents are required during car delivery?",
                a: "You must show your original Aadhaar Card, Driving License, and Employment ID or Business GST Registration. Foreign Nationals and NRIs must submit passports."
              },
              {
                q: "How does doorstep delivery work?",
                a: "Doorstep delivery is available across Madurai. Delivery charges are calculated based on mileage distance from Nelpettai office hub. Our driver drives the vehicle directly to you."
              },
              {
                q: "Can I extend my booking period during the trip?",
                a: "Yes, but you must contact us at least 4 hours before your booking schedule closes. Extension depends on vehicle booking availability."
              },
              {
                q: "How is the security deposit and refund processed?",
                a: "Once approved, refunds are credited directly back to the client's bank account in 5-7 working days. Refund eligibility aligns with cancellation policies."
              },
              {
                q: "What happens during an accident or mechanical breakdown?",
                a: "You must secure yourself first, then contact Sri Amman support desk immediately. Renter must not touch engine parts or take it to local mechanics. Repairs are performed strictly at authorized Maruti dealerships."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-zinc-900 pb-4">
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 flex justify-between items-center text-left text-[#D4AF37] font-bold text-sm sm:text-base hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-zinc-400 text-xs sm:text-sm pt-2 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-950/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Card */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-red-500 font-extrabold uppercase tracking-[0.2em] text-xs">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-5xl font-poppins font-black leading-tight text-white">
                LET'S TALK <span className="gold-gradient-text">ABOUT YOUR TRIP</span>
              </h2>
              
              <div className="glass-card p-8 rounded-3xl border border-zinc-800 space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-950/40 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">Call or WhatsApp</span>
                    <a href="tel:+917010532307" className="text-white hover:text-[#D4AF37] font-bold text-lg block mt-1">+91 70105 32307</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-950/40 rounded-xl flex items-center justify-center text-[#D4AF37] border border-amber-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">Address Hub</span>
                    <p className="text-white text-sm font-semibold mt-1">229-230, E Veli Street, Near HDFC Bank, Nelpettai, Madurai Main, Tamil Nadu 625001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Query Form */}
            <div className="lg:col-span-7">
              <div className="glass-card-gold p-8 sm:p-10 rounded-3xl border border-amber-500/20">
                <h3 className="text-xl font-bold text-white mb-6 font-poppins">SEND A DIRECT ENQUIRY</h3>
                
                {contactSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-center text-emerald-400"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <strong className="block mb-1">Message Sent Successfully!</strong>
                    <span>Our customer relationship team will reach you shortly on WhatsApp.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-semibold">Name</label>
                        <input 
                          type="text" 
                          required
                          value={contactData.name}
                          onChange={e => setContactData({...contactData, name: e.target.value})}
                          placeholder="Your Name"
                          className="bg-black border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm outline-none text-white transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-semibold">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={contactData.phone}
                          onChange={e => setContactData({...contactData, phone: e.target.value})}
                          placeholder="Your Phone Number"
                          className="bg-black border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm outline-none text-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-zinc-400 text-xs font-semibold">Message</label>
                      <textarea 
                        rows={4}
                        value={contactData.message}
                        onChange={e => setContactData({...contactData, message: e.target.value})}
                        placeholder="Write your travel queries..."
                        className="bg-black border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm outline-none text-white transition-colors resize-none"
                      ></textarea>
                    </div>

                    <motion.button 
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-yellow-300 text-black font-extrabold py-3.5 px-6 rounded-xl text-center text-sm shadow-md transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      SUBMIT QUERY
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-16 h-16">
              <Image 
                src="/logo.png" 
                alt="Sri Amman Self Driving Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-red-500 text-xs font-semibold tracking-widest uppercase">
              Drive Your Freedom. Your Car. Your Journey.
            </span>
          </div>


          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400 font-semibold">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#booking" className="hover:text-white transition-colors">Booking</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#policies" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#policies" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-zinc-600 text-xs pt-4">
            Copyright © 2026 Sri Amman Self Driving Rental Car Madurai. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
