"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-15 pb-12 overflow-hidden">

            {/* --- Cinematic Video Background --- */}
            <div className="absolute inset-0 z-0 bg-[#0F172A]">
                {/* Note: Replace this src with your actual video link (e.g., from your S3 bucket).
                  Using a placeholder library video for now. 
                */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="/bg-video.mp4" type="video/mp4" />
                </video>

                {/* Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Admissions Open for 2026
                    </div> */}

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                        Master Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic font-serif">
                            TRB Dreams
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        Join <span className="text-white font-bold">8,000+ aspirants</span> guided by Dr. S. Jerald Sagaya Nathan.
                        Transform your teaching career with our premium digital resources.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/materials"
                            className="group bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] active:scale-95"
                        >
                            Explore Library
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/youtube"
                            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95"
                        >
                            <PlayCircle className="w-4 h-4 text-orange-500" /> Video Lectures
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}