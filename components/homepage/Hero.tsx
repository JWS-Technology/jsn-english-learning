"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, Trophy, Users, GraduationCap, FileText, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen lg:min-h-[95vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#0F172A]">

            {/* --- Visual Polish: Background Elements --- */}
            <div
                className="absolute inset-0 z-0 opacity-[0.15]"
                style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }}
            />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* --- Left Content: Text & CTA --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center lg:text-left"
                >
                    {/* Badge for Trust */}
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
                        <Star className="w-3 h-3 fill-orange-500" /> Tamil Nadu's #1 TRB Academy
                    </div> */}

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                        Master Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic font-serif">
                            TRB Dreams
                        </span>
                    </h1>

                    <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Join <span className="text-white font-bold">8,000+ aspirants</span> guided by Dr. S. Jerald Sagaya Nathan.
                        Transform your teaching career with our premium digital resources.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            href="/materials"
                            className="group bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                        >
                            Explore Library
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/youtube"
                            className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <PlayCircle className="w-5 h-5 text-orange-500" /> Video Lectures
                        </Link>
                    </div>

                    {/* --- Mobile-Only Stats: Clean & Minimal --- */}
                    {/* <div className="mt-12 flex lg:hidden items-center justify-center gap-8 border-t border-white/5 pt-8">
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">95%</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Success</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">8k+</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Students</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">13+ </p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Years Exp</p>
                        </div>
                    </div> */}
                </motion.div>

                {/* --- Right Content: Desktop Only Bento Grid --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden lg:grid grid-cols-2 gap-4 relative"
                >
                    <StatCard icon={<Trophy />} value="95%" label="Success Rate" light />
                    <StatCard icon={<Users />} value="8k+" label="Aspirants" />
                    <StatCard icon={<GraduationCap />} value="13+" label="Experience" />

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-orange-500/20 group cursor-default">
                        <FileText className="mb-4 w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                        <p className="text-2xl font-black leading-tight tracking-tighter">100+ PREMIUM <br />PDF UNITS</p>
                        <p className="text-xs mt-2 text-orange-100 font-medium">Updated for 2026 Cycle</p>
                    </div>

                    {/* Background Glow for the Grid */}
                    <div className="absolute inset-0 bg-orange-500/20 blur-[100px] -z-10 rounded-full" />
                </motion.div>

            </div>
        </section>
    );
}

function StatCard({ icon, value, label, light = false }: { icon: any, value: string, label: string, light?: boolean }) {
    return (
        <div className={`
      ${light ? 'bg-white text-slate-900 shadow-2xl' : 'bg-white/5 text-white border border-white/10 backdrop-blur-md'} 
      p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-all duration-300 cursor-default
    `}>
            <div className="text-orange-500 mb-4 bg-orange-500/5 p-3 rounded-2xl">
                {icon}
            </div>
            <p className="text-4xl font-black tracking-tighter">{value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
        </div>
    );
}