"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Award } from "lucide-react";

export default function TextTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get("/api/testimonials");
                setTestimonials(res.data);
            } catch (err) {
                console.error("Testimonial Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const nextTrigger = useCallback(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevTrigger = useCallback(() => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // Auto-play functionality
    useEffect(() => {
        if (testimonials.length <= 1 || isHovered) return;
        const timer = setInterval(nextTrigger, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length, isHovered, nextTrigger]);

    // Swipe confidence threshold for mobile drag
    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -100) nextTrigger();
        else if (swipe > 100) prevTrigger();
    };

    if (loading || testimonials.length === 0) return null;

    const current = testimonials[index];

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden w-full max-w-[100vw]">
            {/* Animated Artistic Background Accents */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-slate-900/10"
                    >
                        <Award size={14} className="text-orange-400" /> Academic Excellence
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none"
                    >
                        Student <span className="text-blue-600">Testimonials.</span>
                    </motion.h2>
                </div>

                {/* Main Slider Area - Padded to prevent arrow overflow */}
                <div
                    className="relative px-0 md:px-16"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative min-h-[350px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                className="w-full bg-white/60 backdrop-blur-xl border border-slate-100 p-8 sm:p-12 md:p-20 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative text-center cursor-grab active:cursor-grabbing"
                            >
                                <Quote className="absolute top-6 left-6 md:top-10 md:left-10 text-blue-50 w-16 h-16 md:w-24 md:h-24 -z-10" />

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex justify-center gap-1.5 mb-6 md:mb-8"
                                >
                                    {[...Array(current.rating || 5)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-orange-400 text-orange-400 drop-shadow-sm" />
                                    ))}
                                </motion.div>

                                <blockquote className="text-lg sm:text-xl md:text-3xl font-medium text-slate-800 leading-relaxed italic mb-8 md:mb-12 break-words">
                                    "{current.content}"
                                </blockquote>

                                <div className="flex flex-col items-center">
                                    <h4 className="text-lg md:text-xl font-black text-slate-950 tracking-tight">{current.name}</h4>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mt-2 bg-blue-50 px-3 py-1 rounded-full">
                                        {current.role || "JSN Aspirant"}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Desktop Navigation Arrows (Moved strictly inside bounds) */}
                        <button
                            onClick={prevTrigger}
                            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-slate-100 rounded-full items-center justify-center shadow-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:scale-110 transition-all z-20"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextTrigger}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-slate-100 rounded-full items-center justify-center shadow-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:scale-110 transition-all z-20"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation Dots & Mobile Controls */}
                <div className="mt-12 flex flex-col items-center gap-6">
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 ${index === i ? 'w-10 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                            />
                        ))}
                    </div>

                    {/* Mobile Navigation Arrows */}
                    <div className="flex md:hidden gap-4 mt-4">
                        <button
                            onClick={prevTrigger}
                            className="p-4 bg-white shadow-lg border border-slate-50 rounded-2xl text-slate-600 active:scale-95 transition-transform"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextTrigger}
                            className="p-4 bg-white shadow-lg border border-slate-50 rounded-2xl text-slate-600 active:scale-95 transition-transform"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}