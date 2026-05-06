"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, ClipboardCheck, BellRing, Smartphone } from "lucide-react"; // Added Smartphone icon
import axios from "axios";

export default function WelcomePoster() {
    const [isOpen, setIsOpen] = useState(false);
    const [schedule, setSchedule] = useState<any>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await axios.get("/api/schedule");

                if (res.data && res.data.isActive) {
                    setSchedule(res.data);
                    setTimeout(() => setIsOpen(true), 800);
                }
            } catch (error) {
                console.error("Failed to load schedule");
            }
        };

        fetchSchedule();
    }, []);

    const closePoster = () => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
    };

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!schedule || !schedule.isActive) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6">
                    {/* Dark Cinematic Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePoster}
                        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md cursor-zoom-out"
                    />

                    {/* Main Poster Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-4xl max-h-[95vh] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden z-10 flex flex-col border border-white/20"
                    >
                        {/* Header Banner */}
                        <div className="bg-[#0F172A] p-6 md:p-10 text-center relative shrink-0 overflow-hidden">
                            <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-blue-600/30 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-orange-600/20 blur-[80px] rounded-full pointer-events-none" />

                            <button
                                onClick={closePoster}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md active:scale-90"
                            >
                                <X size={20} />
                            </button>

                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl relative z-10"
                            >
                                <BellRing className="text-white w-6 h-6 md:w-8 md:h-8" />
                            </motion.div>

                            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter relative z-10">
                                Current Schedule
                            </h2>
                            <p className="text-blue-300 text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2 relative z-10">
                                JSN English Academy
                            </p>
                        </div>

                        {/* Two-Column Grid */}
                        <div className="p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-[#F8FAFC] overflow-y-auto">

                            {/* Class Box */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                                className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-blue-100/50 shadow-sm flex flex-col h-full hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 shrink-0">
                                    <div className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <CalendarDays className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="font-black uppercase tracking-widest text-[10px] md:text-xs text-slate-400">Class Portion</h3>
                                </div>
                                <p className="text-base sm:text-lg md:text-2xl font-black text-slate-900 mb-6 flex-1 leading-snug md:leading-tight tracking-tight">
                                    {schedule.classUnit}
                                </p>
                                <div className="mt-auto pt-4 md:pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                    <div className="px-2 md:px-3 py-1.5 bg-blue-50 rounded-lg text-[9px] md:text-[10px] font-black text-blue-700 uppercase tracking-widest break-words text-center flex-1">
                                        {schedule.classFromDate}
                                    </div>
                                    <span className="text-slate-300 font-bold hidden sm:block">—</span>
                                    <div className="px-2 md:px-3 py-1.5 bg-blue-50 rounded-lg text-[9px] md:text-[10px] font-black text-blue-700 uppercase tracking-widest break-words text-center flex-1">
                                        {schedule.classToDate}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Test Box */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-orange-100/50 shadow-sm flex flex-col h-full hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 shrink-0">
                                    <div className="p-2 md:p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="font-black uppercase tracking-widest text-[10px] md:text-xs text-slate-400">Upcoming Test</h3>
                                </div>
                                <p className="text-base sm:text-lg md:text-2xl font-black text-slate-900 mb-6 flex-1 leading-snug md:leading-tight tracking-tight">
                                    {schedule.testUnit}
                                </p>
                                <div className="mt-auto pt-4 md:pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2 md:gap-3">
                                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Date:</span>
                                    <div className="px-3 py-1.5 bg-orange-50 rounded-lg text-[9px] md:text-[10px] font-black text-orange-700 uppercase tracking-widest flex-1 text-center">
                                        {schedule.testDate}
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                        {/* Footer / Actions */}
                        <div className="p-4 sm:p-6 md:px-10 md:pb-10 pt-0 bg-[#F8FAFC] shrink-0 border-t border-slate-100 md:border-none flex flex-col gap-3 md:gap-4">
                            {/* App Download Link */}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.jsnenglish.jsn_english_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 md:py-4 bg-blue-50 text-blue-700 rounded-xl md:rounded-2xl font-bold text-[11px] md:text-sm hover:bg-blue-100 transition-all flex justify-center items-center gap-2 border border-blue-100"
                            >
                                <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                                Download our Android App for the Best Experience
                            </a>

                            {/* Enter Portal Button */}
                            <button
                                onClick={closePoster}
                                className="w-full py-4 md:py-6 bg-[#0F172A] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 md:gap-3"
                            >
                                Acknowledge & Enter Portal
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}