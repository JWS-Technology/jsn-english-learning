"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// Homepage Components
import Hero from "@/components/homepage/Hero";
import AnnouncementMarquee from "@/components/homepage/AnnouncementMarquee";
import AnnouncementsGrid from "@/components/homepage/AnnouncementsGrid";
import StatsBar from "@/components/homepage/StatsBar";
import Features from "@/components/homepage/Features";
import FounderProfile from "@/components/homepage/FounderProfile";
import SuccessWall from "@/components/homepage/SuccessWall";
import SpotlightAnnouncements from "@/components/homepage/Spotlight";
import TextTestimonials from "@/components/homepage/TestimonialSlider";

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("/api/announcements?active=true");
        setAnnouncements(res.data);
      } catch (error) {
        console.error("Failed to load announcements", error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <main className="flex flex-col bg-white">
      {/* Hero & Sliding Marquee wrapper */}
      <div className="relative">
        <Hero />
        <AnnouncementMarquee announcements={announcements} />
      </div>

      {/* Grid of Announcements */}
      <AnnouncementsGrid announcements={announcements} />
      {/* High-level Stats */}
      <StatsBar />
      <TextTestimonials />
      <SpotlightAnnouncements />
      <SuccessWall />
      {/* Why Choose Us Features */}
      <Features />

      {/* Founder Section */}
      <FounderProfile />
    </main>
  );
}