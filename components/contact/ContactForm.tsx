"use client";
import { motion } from "framer-motion";
import { Send, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactForm() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Send Us a Message</h2>
                <p className="mt-3 text-slate-500 font-medium">Fill out the form below and our team will get back to you.</p>
            </div>

            <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Full Name *" placeholder="Dr. John Doe" />
                    <Input label="Email Address *" type="email" placeholder="john@university.edu" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Phone Number" placeholder="+91 98765 43210" />
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#0F172A] outline-none">
                            <option>General Inquiry</option>
                            <option>TRB Coaching</option>
                            <option>Technical Support</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message *</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none resize-none" placeholder="How can we help?" />
                </div>

                <button disabled className="w-full bg-slate-100 text-slate-400 py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 cursor-not-allowed border border-slate-200">
                    <Send className="w-4 h-4" /> Message System Offline
                </button>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Need immediate help?</p>
                    <div className="flex gap-4">
                        <Link href="tel:+919843287913" className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1">Call Directly <ArrowRight className="w-3 h-3" /></Link>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

function Input({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:border-blue-500 outline-none font-bold text-[#0F172A]" {...props} />
        </div>
    );
}