"use client";
import { motion } from "framer-motion";
import { MonitorPlay } from "lucide-react";

export default function TestsHero() {
    return (
        <section className="relative pt-32 pb-44 px-6 bg-[#0F172A] overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8 text-blue-400">
                    <MonitorPlay className="w-3.5 h-3.5" /> Computer Based Testing Engine
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-8xl font-black text-white leading-[1.05] mb-8">
                    Simulated <br /> <span className="text-blue-500 italic font-serif font-normal">Mock Exams.</span>
                </motion.h1>
            </div>
        </section>
    );
}