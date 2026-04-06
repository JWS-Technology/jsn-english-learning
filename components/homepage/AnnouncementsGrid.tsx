"use client";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

export default function AnnouncementsGrid({ announcements }: { announcements: any[] }) {
    if (!announcements.length) return null;

    return (
        <section className="py-20 bg-slate-50 border-b border-slate-100 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">Stay Updated</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mt-2 flex items-center gap-3">
                            <Megaphone className="w-8 h-8 text-orange-500" /> Latest Announcements
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-slate-800 font-bold leading-relaxed text-lg">{item.message}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}