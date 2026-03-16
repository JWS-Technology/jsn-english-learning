"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  PlayCircle,
  FileText,
  Star
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#0F172A]">
        {/* Senior UI Detail: Background Texture & Glows */}
        <div className="absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                Verified TRB Success Portal 2026
              </span>
            </div> */}

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter">
              Master Your <br />
              <span className="text-orange-500 italic font-serif">TRB Dreams</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Join 8,000+ successful aspirants guided by Dr. S. Jerald Sagaya Nathan. 13+ years of expertise now distilled into a premium digital library.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/materials"
                className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/40 active:scale-95 group"
              >
                Explore Library <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/youtube"
                className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                <PlayCircle className="w-5 h-5 text-orange-500" /> Video Lectures
              </Link>
            </div>
          </motion.div>

          {/* Right Content: The Impact Bento Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            {/* Stat Card 1: Success */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center text-center border border-slate-100 hover:scale-105 transition-transform cursor-default">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">95%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Success Rate</p>
            </div>

            {/* Stat Card 2: Students */}
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center items-center text-center mt-8 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">8k+</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Aspirants</p>
            </div>

            {/* Stat Card 3: Experience */}
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center items-center text-center -mt-8 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">13+</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Years Exp.</p>
            </div>

            {/* Stat Card 4: Materials */}
            <div className="bg-orange-500 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-orange-950/30 flex flex-col justify-center items-center text-center hover:bg-orange-600 transition-colors group">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xl font-black text-white leading-tight uppercase tracking-tighter">100+ PDF <br /> UNITS</p>
              <Link href="/materials" className="text-[10px] font-black text-orange-100 uppercase tracking-widest mt-2 underline opacity-0 group-hover:opacity-100 transition-opacity">
                Browse
              </Link>
            </div>

            {/* Decorative Background Glow */}
            <div className="absolute inset-0 bg-orange-600/20 blur-[120px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Successful Results", value: "95%", icon: Trophy },
              { label: "Students Trained", value: "8000+", icon: Users },
              { label: "Academic Exp.", value: "13+ Yrs", icon: GraduationCap },
              { label: "E-Resources", value: "100+", icon: BookOpen },
            ].map((stat, i) => (
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

      {/* --- WHY CHOOSE SECTION --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em]">Excellence Redefined</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-4 tracking-tight">
              Why Professionals Trust <br /> JSN English Learning
            </h2>
            <p className="mt-6 text-slate-500 font-medium">Experience excellence in TRB preparation with our comprehensive approach, expert guidance, and proven track record.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Curated Materials", desc: "100+ units of premium study materials updated for the 2026 exam cycle.", icon: "📚" },
              { title: "Expert Mentorship", desc: "Direct guidance from a Ph.D. qualified UGC-NET & TNSET professional educator.", icon: "🎓" },
              { title: "Success Record", desc: "Join thousands of successful TRB qualifiers who achieved their dreams with us.", icon: "🏆" },
              { title: "Supportive Learning", desc: "Individualized attention with doubt-clearing sessions and tracker tools.", icon: "🤝" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group relative overflow-hidden"
              >
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-bold text-xl text-slate-950">{item.title}</h3>
                <p className="mt-4 text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER PROFILE --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0F172A] rounded-[4rem] p-8 md:p-20 text-white relative">
            {/* Background Accent */}
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
                  {[
                    "Ph.D. in English Literature",
                    "UGC-NET & TNSET Qualified",
                    "Assistant Professor of English",
                    "13+ Years Coaching Experience",
                    "Proven 95% Success Rate",
                    "Professional Mentor"
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-orange-500" />
                      </div>
                      {skill}
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-flex mt-12 items-center gap-3 text-white font-black uppercase text-[10px] tracking-[0.3em] border-b-2 border-orange-500 pb-2 hover:text-orange-500 transition-colors group"
                >
                  Learn More About Dr. Nathan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-orange-500/20 rounded-[3rem] blur-2xl group-hover:bg-orange-500/30 transition-all" />
                  <div className="relative aspect-[4/5] bg-slate-800 rounded-[3rem] border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-8">
                    <Image
                      src="/images/dr-jerald-nathan.jpg"
                      alt="Dr. Jerald Sagaya Nathan"
                      fill
                      className="object-cover opacity-60 transition-all duration-700"
                    />
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
    </main>
  );
}