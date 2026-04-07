"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
    Loader2, Trophy, LayoutGrid, List, ChevronLeft,
    ChevronRight, X, Filter, Camera, Video, ShieldCheck
} from "lucide-react";
import SuccessCard from "@/components/homepage/SuccessCard"; // Make sure this path is correct

type FilterType = "all" | "video" | "image" | "screenshot";

export default function PublicGalleryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

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

    // Apply Filter
    const filteredItems = items.filter(item =>
        activeFilter === "all" ? true : item.mediaType === activeFilter
    );

    const selectedMedia = selectedIndex !== null ? filteredItems[selectedIndex] : null;

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
        document.body.style.overflow = "unset";
    }, []);

    const nextMedia = useCallback((e?: any) => {
        e?.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
    }, [filteredItems.length, selectedIndex]);

    const prevMedia = useCallback((e?: any) => {
        e?.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }, [filteredItems.length, selectedIndex]);

    // Handle ESC and Arrows for Lightbox
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
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Hall of Fame...</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#FDFEFF] pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- PAGE HERO HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100"
                    >
                        <Trophy size={14} /> JSN Proven Excellence
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                        The Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 italic font-serif">Excellence.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed px-4">
                        Explore verified results, video testimonials, and success screenshots from thousands of candidates who cracked their exams with Dr. Nathan.
                    </p>
                </div>

                {/* --- CONTROL BAR (Filters & View Toggles) --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm st icky top-24 z-30">

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
                        <div className="hidden md:flex items-center gap-2 px-4 text-slate-400 border-r border-slate-100 mr-2">
                            <Filter size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
                        </div>

                        <FilterButton label="All" active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
                        <FilterButton label="Videos" icon={<Video size={14} />} active={activeFilter === "video"} onClick={() => setActiveFilter("video")} />
                        <FilterButton label="Images" icon={<Camera size={14} />} active={activeFilter === "image"} onClick={() => setActiveFilter("image")} />
                        <FilterButton label="Screenshots" icon={<ShieldCheck size={14} />} active={activeFilter === "screenshot"} onClick={() => setActiveFilter("screenshot")} />
                    </div>

                    {/* View Toggles (Desktop Only) */}
                    <div className="hidden sm:flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                        <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}>
                            <LayoutGrid size={18} />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}>
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* --- GALLERY GRID / LIST --- */}
                {filteredItems.length === 0 ? (
                    <div className="py-32 text-center bg-slate-50 rounded-[3rem] border border-slate-100">
                        <Camera className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-slate-900">No media found</h3>
                        <p className="text-slate-500 font-medium mt-2">Try selecting a different filter category.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className={`grid ${viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                            : "grid-cols-1 gap-4 max-w-4xl mx-auto"
                            }`}
                    >
                        <AnimatePresence>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SuccessCard
                                        item={item}
                                        index={index}
                                        isList={viewMode === "list"}
                                        onClick={() => {
                                            setSelectedIndex(index);
                                            document.body.style.overflow = "hidden";
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* --- ADVANCED MODAL (LIGHTBOX) --- */}
                <AnimatePresence>
                    {selectedMedia && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
                        >
                            {/* Top Controls */}
                            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[110]">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                                    {selectedIndex! + 1} / {filteredItems.length}
                                </p>
                                <button onClick={closeModal} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Nav Arrows */}
                            <button onClick={prevMedia} className="hidden md:flex absolute left-8 p-6 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all z-[110]"><ChevronLeft size={64} /></button>
                            <button onClick={nextMedia} className="hidden md:flex absolute right-8 p-6 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all z-[110]"><ChevronRight size={64} /></button>

                            {/* Content Area */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-6xl h-fit max-h-[80vh] md:h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-black shadow-2xl border border-white/10 cursor-default flex items-center justify-center"
                            >
                                {selectedMedia.mediaType === 'video' ? (
                                    <video controls autoPlay className="w-full max-h-full object-contain">
                                        <source src={selectedMedia.mediaUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={selectedMedia.mediaUrl} className="w-full max-h-full object-contain" alt="Success proof" />
                                )}

                                {/* Bottom Caption */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent">
                                    <h4 className="text-xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                        {selectedMedia.title}
                                    </h4>
                                    <p className="text-[10px] md:text-sm font-black text-blue-400 uppercase tracking-[0.3em] mt-3 flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        Official {selectedMedia.mediaType} Verification
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </main>
    );
}

// --- Helper Component for the Filters ---
function FilterButton({ label, icon, active, onClick }: { label: string, icon?: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                ${active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
        >
            {icon} {label}
        </button>
    );
}