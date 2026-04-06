"use client";
import { motion } from "framer-motion";
import { Trophy, Users, GraduationCap, BookOpen } from "lucide-react";

const stats = [
    { label: "Successful Results", value: "95%", icon: Trophy },
    { label: "Students Trained", value: "8000+", icon: Users },
    { label: "Academic Exp.", value: "13+ Yrs", icon: GraduationCap },
    { label: "E-Resources", value: "100+", icon: BookOpen },
];

export default function StatsBar() {
    return (
        <section className="py-20 bg-white relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter">
                                {stat.value}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}