"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative pt-32 pb-24 px-6 bg-[#0F172A] overflow-hidden shrink-0">
                {/* Background Grid & Glows */}
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 backdrop-blur-md text-blue-400"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        24/7 Support Desk
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6"
                    >
                        Get in Touch with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 italic font-serif font-normal">
                            Dr. Jerald Sagaya Nathan.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Reach out for personalized academic support, course information, or any TRB-related inquiries. We are here to guide your success.
                    </motion.p>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 w-full flex-1 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                    {/* Left: Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact Card 1: Email */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors group">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</h3>
                            <p className="text-lg font-bold text-[#0F172A]">jsnathan1981@gmail.com</p>
                            <p className="text-sm text-slate-500 mt-2 font-medium">We usually respond within 24 hours.</p>
                        </div>

                        {/* Contact Card 2: Phone */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:border-orange-200 transition-colors group">
                            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</h3>
                            <p className="text-lg font-bold text-[#0F172A]">+91 98432 87913</p>
                            <p className="text-lg font-bold text-[#0F172A]">+91 96292 87913</p>
                        </div>

                        {/* Contact Card 3: Address */}
                        <div className="bg-[#0F172A] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-3">Headquarters</h3>
                                <p className="text-white font-medium leading-relaxed">
                                    245/8, Astalakshmi Avenue,<br />
                                    First Main Road, Vasan Valley,<br />
                                    Rettaivaikal Post,<br />
                                    Tiruchirappalli – 620102,<br />
                                    Tamil Nadu, India
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100"
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
                                Send Us a Message
                            </h2>
                            <p className="mt-3 text-slate-500 font-medium text-lg">
                                Fill out the form below and our academic support team will get back to you immediately.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Dr. John Doe"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A] placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="john@university.edu"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A] placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A] placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Category</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A] appearance-none cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>TRB Coaching & Materials</option>
                                        <option>Premium Account Access</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message *</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you achieve your TRB goals?"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A] placeholder:text-slate-300 placeholder:font-medium resize-none"
                                />
                            </div>

                            {/* Upgraded Button (Still disabled, but looks beautiful) */}
                            <button
                                type="button"
                                disabled
                                className="w-full bg-slate-100 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 cursor-not-allowed border border-slate-200"
                            >
                                <Send className="w-4 h-4" /> Message System Offline (Coming Soon)
                            </button>

                            {/* Alternate Contact Prompts */}
                            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Need immediate assistance?
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href="tel:+919843287913"
                                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                    >
                                        Call Directly <ArrowRight className="w-3 h-3" />
                                    </Link>
                                    <Link
                                        href="mailto:jsnathan1981@gmail.com"
                                        className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-800 transition-colors flex items-center gap-1"
                                    >
                                        Email Support <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}