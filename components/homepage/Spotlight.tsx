"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    IndianRupee,
    BookOpen,
    ClipboardCheck,
    ArrowRight,
    Sparkles
} from "lucide-react";

const infoCards = [
    {
        title: "Course Fee Structure",
        icon: IndianRupee,
        type: "list",
        details: [
            { label: "Online Class Alone", price: "₹7,999" },
            { label: "Class + Website Test", price: "₹8,999" },
            { label: "Test Series Only", price: "₹1,999" }
        ],
        tag: "UG TRB 2026-27",
        highlight: true
    },
    {
        title: "Test Portions",
        icon: ClipboardCheck,
        type: "text",
        details: "Unit-wise cumulative tests covering Chaucer to Post-Modernism. Weekly schedule updated in portal.",
        tag: "Weekly Update",
        highlight: false
    },
    {
        title: "Class Portions",
        icon: BookOpen,
        type: "text",
        details: "Ongoing: Unit IX & X (American & Commonwealth Literature). Morning/Evening batches available.",
        tag: "Live Now",
        highlight: false
    }
];

export default function SpotlightAnnouncements() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- Section Heading --- */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-orange-100"
                    >
                        <Sparkles className="w-3 h-3 fill-orange-600" /> Spotlight Announcements
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                        Course Plans & <span className="text-blue-600">Syllabus.</span>
                    </h2>
                </div>

                {/* --- Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {infoCards.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center mb-8 transition-all duration-500 
                                ${item.highlight
                                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-200 scale-110'
                                    : 'bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                <item.icon className="w-8 h-8" />
                            </div>

                            {/* Tag */}
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                                {item.tag}
                            </span>

                            {/* Title */}
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                                {item.title}
                            </h3>

                            {/* Details Area */}
                            <div className="w-full flex-1">
                                {/* Fix: Use Array.isArray to satisfy TypeScript */}
                                {Array.isArray(item.details) ? (
                                    <div className="space-y-2">
                                        {item.details.map((d: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                                                <span className="text-[10px] font-black uppercase text-slate-500 text-left leading-tight max-w-[100px]">{d.label}</span>
                                                <span className="text-lg font-black text-slate-900 tracking-tighter">{d.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed font-bold text-slate-500 px-4">
                                        {item.details}
                                    </p>
                                )}
                            </div>

                            {/* Footer Link for Fee Card */}
                            {item.highlight && (
                                <Link
                                    href="/pricing"
                                    className="mt-8 flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-widest group/link"
                                >
                                    Full Pricing Structure
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}