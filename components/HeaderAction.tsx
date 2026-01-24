"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderActionProps {
    title: string;
    type: string;
}

export default function HeaderAction({ title, type }: HeaderActionProps) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Check out this ${type} study material on JSN English Learning`,
                url: window.location.href,
            });
        }
    };

    return (
        <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 md:px-8 z-20 shrink-0 shadow-sm">
            <div className="flex items-center gap-2 md:gap-6">
                {/* Back Button */}
                <Link
                    href="/materials"
                    className="p-2 hover:bg-slate-50 rounded-xl transition-all group flex items-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-[#0F172A] group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#0F172A]">
                        Back to Library
                    </span>
                </Link>

                <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

                {/* Material Title & Badge */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="hidden sm:flex w-8 h-8 bg-[#0F172A] rounded-lg items-center justify-center text-white shrink-0">
                        <ShieldCheck size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h1 className="text-sm font-black text-[#0F172A] truncate max-w-[150px] md:max-w-md leading-none">
                            {title}
                        </h1>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            Verified JSN Resource
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Exam Type Badge */}
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hidden xs:block text-[10px] font-black bg-orange-500 text-white px-3 py-1 rounded-lg uppercase tracking-tighter shadow-lg shadow-orange-950/10"
                >
                    {type}
                </motion.span>

                <button
                    onClick={handleShare}
                    className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-all"
                    title="Share Material"
                >
                    <Share2 size={18} />
                </button>
            </div>
        </header>
    );
}