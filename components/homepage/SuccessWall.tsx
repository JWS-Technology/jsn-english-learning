"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SuccessCard from "./SuccessCard";
import { Loader2, Trophy, LayoutGrid, List, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SuccessWall() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get("/api/admin/gallery");
                setItems(res.data || []);
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const selectedMedia = selectedIndex !== null ? items[selectedIndex] : null;

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
        document.body.style.overflow = "unset";
    }, []);

    const nextMedia = useCallback((e?: any) => {
        e?.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((prev) => (prev! + 1) % items.length);
    }, [items.length, selectedIndex]);

    const prevMedia = useCallback((e?: any) => {
        e?.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((prev) => (prev! - 1 + items.length) % items.length);
    }, [items.length, selectedIndex]);

    // Handle ESC and Arrows
    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextMedia();
            if (e.key === "ArrowLeft") prevMedia();
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [selectedIndex, closeModal, nextMedia, prevMedia]);

    if (loading) return (
        <div className="py-40 flex flex-col items-center justify-center gap-4 bg-white">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Hall of Fame...</p>
        </div>
    );

    return (
        <section className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* --- Adaptive Header --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Trophy className="w-3.5 h-3.5" /> JSN Proven Excellence
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[0.85]">
                            Hall of <br className="hidden md:block" /> <span className="text-blue-600 italic font-serif font-normal md:not-italic md:font-sans">Excellence.</span>
                        </h2>
                    </div>

                    <div className="hidden sm:flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* --- Adaptive Grid/List Container --- */}
                <div className={`grid ${viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                        : "grid-cols-1 gap-4 max-w-4xl mx-auto"
                    }`}>
                    {items.map((item, index) => (
                        <SuccessCard
                            key={item._id}
                            item={item}
                            index={index}
                            isList={viewMode === "list"}
                            onClick={() => {
                                setSelectedIndex(index);
                                document.body.style.overflow = "hidden";
                            }}
                        />
                    ))}
                </div>

                {/* --- Advanced Modal (Lightbox) --- */}
                <AnimatePresence>
                    {selectedMedia && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
                        >
                            {/* Controls */}
                            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[110]">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                    {selectedIndex! + 1} / {items.length}
                                </p>
                                <button onClick={closeModal} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Nav Arrows (Desktop) */}
                            <button onClick={prevMedia} className="hidden md:flex absolute left-8 p-6 text-white/20 hover:text-white transition-all"><ChevronLeft size={64} /></button>
                            <button onClick={nextMedia} className="hidden md:flex absolute right-8 p-6 text-white/20 hover:text-white transition-all"><ChevronRight size={64} /></button>

                            {/* Main Content Area */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-6xl h-fit max-h-[75vh] md:h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-black shadow-2xl border border-white/10 cursor-default"
                            >
                                {selectedMedia.mediaType === 'video' ? (
                                    <video controls autoPlay className="w-full h-full object-contain">
                                        <source src={selectedMedia.mediaUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={selectedMedia.mediaUrl} className="w-full h-full object-contain" alt="Success proof" />
                                )}

                                {/* Caption Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black via-black/40 to-transparent">
                                    <h4 className="text-xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                        {selectedMedia.title}
                                    </h4>
                                    <p className="text-[10px] md:text-sm font-black text-blue-400 uppercase tracking-[0.3em] mt-3 flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        Official Academic Verification
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}