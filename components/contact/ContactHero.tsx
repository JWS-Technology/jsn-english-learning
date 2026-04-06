"use client";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ContactHero() {
    return (
        <section className="relative pt-32 pb-24 px-6 bg-[#0F172A] overflow-hidden shrink-0">
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 text-blue-400">
                    <MessageSquare className="w-3.5 h-3.5" /> 24/7 Support Desk
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                    Get in Touch with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 italic font-serif font-normal">Dr. Jerald Sagaya Nathan.</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                    Reach out for personalized academic support, course information, or any TRB-related inquiries.
                </motion.p>
            </div>
        </section>
    );
}