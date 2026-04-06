"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Lock, BookOpen, Truck, ArrowRight } from "lucide-react";

export default function MaterialCard({ item, user, index }: { item: any, user: any, index: number }) {
    const href = user ? `/materials/${item._id}` : `/login?redirect=/materials/${item._id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            layout
        >
            <Link href={href} className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all hover:border-orange-200 hover:shadow-2xl flex flex-col h-full relative overflow-hidden">
                <div className="mb-8 flex items-center justify-between relative z-10">
                    <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm">
                        {user ? <FileText className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                    </div>
                    <span className="px-4 py-1.5 rounded-xl text-[9px] font-black tracking-[0.2em] uppercase bg-orange-500 text-white">
                        {item.examType}
                    </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors line-clamp-2 leading-[1.2] tracking-tight">
                    {item.title}
                </h3>

                <div className="space-y-4 mt-auto pt-8 border-t border-slate-50 relative z-10">
                    <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <BookOpen className="w-4 h-4 mr-3 text-orange-500" /> {item.subject}
                    </div>
                    <div className="flex items-center text-orange-600 text-[10px] font-black uppercase tracking-widest">
                        <Truck className="w-4 h-4 mr-3" /> Courier Delivery
                    </div>
                </div>

                <div className="mt-10 flex items-center text-slate-900 font-black text-xs uppercase tracking-widest group-hover:text-orange-600 transition-all">
                    {user ? "View Sample PDF" : "Login to Access Material"}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-3" />
                </div>
            </Link>
        </motion.div>
    );
}