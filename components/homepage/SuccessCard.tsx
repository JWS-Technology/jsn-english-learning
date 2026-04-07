"use client";

import { motion } from "framer-motion";
import { PlayCircle, Maximize2, Camera, ShieldCheck, Video, ArrowRight } from "lucide-react";

interface SuccessItem {
    _id: string;
    title: string;
    mediaUrl: string;
    mediaType: "image" | "video" | "screenshot";
}

interface SuccessCardProps {
    item: SuccessItem;
    index: number;
    onClick: () => void;
    isList?: boolean;
}

export default function SuccessCard({ item, index, onClick, isList }: SuccessCardProps) {
    const Icon = item.mediaType === 'video' ? Video : item.mediaType === 'screenshot' ? Camera : ShieldCheck;

    if (isList) {
        // --- PROFESSIONAL LIST VIEW ---
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={onClick}
                className="group flex items-center gap-4 md:gap-8 p-3 md:p-4 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] hover:bg-blue-50/50 hover:border-blue-100 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
                {/* Thumbnail */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-[1.5rem] overflow-hidden bg-slate-900 shrink-0 relative">
                    <img
                        src={item.mediaUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                        alt="Thumbnail"
                    />
                    {item.mediaType === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <PlayCircle size={20} className="text-white" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon size={12} className="text-blue-500" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Verified {item.mediaType}
                        </span>
                    </div>
                    <h3 className="text-sm md:text-xl font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {item.title}
                    </h3>
                </div>

                {/* Action Icon */}
                <div className="pr-2 md:pr-4">
                    <div className="p-2 md:p-3 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </motion.div>
        );
    }

    // --- ELITE GRID VIEW ---
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-[#0F172A] ring-1 ring-white/10 hover:ring-blue-500/50 transition-all duration-500 shadow-2xl"
        >
            <div className="aspect-[3/4] overflow-hidden">
                {item.mediaType === "video" ? (
                    <div className="relative h-full w-full bg-slate-900">
                        <video muted loop className="h-full w-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000">
                            <source src={item.mediaUrl} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                                <PlayCircle className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    />
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-95 group-hover:from-blue-950/90 transition-colors duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-3 h-3 text-blue-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-400/80">
                        Official {item.mediaType}
                    </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                    {item.title}
                </h3>
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">View Proof</span>
                    <Maximize2 size={14} className="text-blue-400" />
                </div>
            </div>
        </motion.div>
    );
}