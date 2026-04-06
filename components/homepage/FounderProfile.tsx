"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const skills = [
    "Ph.D. in English Literature",
    "UGC-NET & TNSET Qualified",
    "Assistant Professor of English",
    "13+ Years Coaching Experience",
    "Proven 95% Success Rate",
    "Professional Mentor"
];

export default function FounderProfile() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#0F172A] rounded-[4rem] p-8 md:p-20 text-white relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]" />
                    <div className="grid lg:grid-cols-5 gap-16 items-center relative z-10">
                        <div className="lg:col-span-3">
                            <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">Academic Lead</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-6 leading-tight tracking-tight">
                                Meet Dr. S. Jerald <br /> Sagaya Nathan
                            </h2>
                            <p className="mt-8 text-slate-400 text-lg leading-relaxed font-medium">
                                Assistant Professor of English with 13+ years of dedicated TRB coaching. A Ph.D., UGC-NET, and TNSET qualified scholar who has transformed the careers of 8,000+ teachers.
                            </p>
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
                                {skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 text-orange-500" />
                                        </div>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                            <Link href="/about" className="inline-flex mt-12 items-center gap-3 text-white font-black uppercase text-[10px] tracking-[0.3em] border-b-2 border-orange-500 pb-2 hover:text-orange-500 transition-colors group">
                                Learn More About Dr. Nathan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-500/20 rounded-[3rem] blur-2xl group-hover:bg-orange-500/30 transition-all" />
                                <div className="relative aspect-[4/5] bg-slate-800 rounded-[3rem] border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-8">
                                    <Image src="/images/dr-jerald-nathan.jpg" alt="Dr. Jerald Sagaya Nathan" fill className="object-cover opacity-60 transition-all duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0F172A] to-transparent">
                                        <p className="text-xs font-black text-orange-500 uppercase tracking-widest">The Founder</p>
                                        <p className="text-xl font-black text-white mt-1 uppercase">Dr. S. Jerald Nathan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}