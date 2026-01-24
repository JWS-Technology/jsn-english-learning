"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Timer,
    ShieldCheck,
    BookOpenCheck,
    ArrowRight,
    Rocket,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function OnlineTestsComingSoon() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 pt-32 pb-20 overflow-hidden relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                            <Rocket size={14} className="animate-bounce" /> Under Development
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-[0.9]">
                                CBT Mode <br />
                                <span className="text-orange-500 italic">Coming Soon.</span>
                            </h1>
                            <p className="mt-6 text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                                We are building a high-precision Computer Based Test (CBT) engine tailored specifically for TRB, NET, and SET English aspirants.
                            </p>
                        </motion.div>

                        {/* Features Preview */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
                        >
                            <FeatureItem icon={<Timer size={16} />} text="Timed Mock Exams" />
                            <FeatureItem icon={<ShieldCheck size={16} />} text="Anti-Cheat System" />
                            <FeatureItem icon={<BookOpenCheck size={16} />} text="Instant Result Analysis" />
                            <FeatureItem icon={<CheckCircle2 size={16} />} text="Unit-wise Practice" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
                        >
                            <Link href="/materials" className="w-full sm:w-auto bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-blue-900/10">
                                Explore Study Materials <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side: Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-white p-8 rounded-[4rem] shadow-2xl border border-slate-100 relative z-20 overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500" />

                            {/* Mock UI Element */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                    <div className="w-12 h-3 bg-slate-100 rounded-full" />
                                    <div className="w-20 h-6 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <div className="w-12 h-2 bg-orange-200 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-full h-4 bg-slate-50 rounded-lg" />
                                    <div className="w-[80%] h-4 bg-slate-50 rounded-lg" />
                                </div>
                                <div className="grid grid-cols-1 gap-3 pt-4">
                                    <div className="w-full h-12 border-2 border-slate-50 rounded-2xl flex items-center px-4">
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 mr-3" />
                                        <div className="w-24 h-2 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="w-full h-12 border-2 border-orange-100 bg-orange-50 rounded-2xl flex items-center px-4">
                                        <div className="w-4 h-4 rounded-full border-2 border-orange-500 mr-3 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                        </div>
                                        <div className="w-32 h-2 bg-orange-200 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Overlay Blur for "Coming Soon" effect */}
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                                <div className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl rotate-[-5deg] group-hover:rotate-0 transition-transform">
                                    Deploying 2026
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500 rounded-[2rem] -z-10 animate-pulse opacity-20" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 border-4 border-[#0F172A]/5 rounded-[3rem] -z-10" />
                    </motion.div>

                </div>
            </div>
        </main>
    );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-orange-500">
                {icon}
            </div>
            <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-wider">{text}</span>
        </div>
    );
}