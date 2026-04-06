"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
        >
            {/* Email Card */}
            <a
                href="mailto:jsnathan1981@gmail.com"
                className="block bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-all group active:scale-[0.98]"
            >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</h3>
                <p className="text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">jsnathan1981@gmail.com</p>
                <p className="text-xs text-slate-400 mt-2 font-medium">Tap to send an email</p>
            </a>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-colors group">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                    <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Call Us</h3>
                <div className="space-y-4">
                    <a
                        href="tel:+919843287913"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 transition-colors group/link"
                    >
                        <span className="text-lg font-bold text-[#0F172A] group-hover/link:text-orange-600">+91 98432 87913</span>
                        <span className="text-[10px] font-black uppercase text-orange-400 opacity-0 group-hover/link:opacity-100 transition-opacity">Call</span>
                    </a>
                    <a
                        href="tel:+919629287913"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 transition-colors group/link"
                    >
                        <span className="text-lg font-bold text-[#0F172A] group-hover/link:text-orange-600">+91 96292 87913</span>
                        <span className="text-[10px] font-black uppercase text-orange-400 opacity-0 group-hover/link:opacity-100 transition-opacity">Call</span>
                    </a>
                </div>
            </div>

            {/* Address Card (Non-clickable unless you want to link to Google Maps) */}
            <div className="bg-[#0F172A] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-3">Headquarters</h3>
                    <p className="text-white font-medium text-sm leading-relaxed">
                        245/8, Astalakshmi Avenue, Vasan Valley,<br />
                        Tiruchirappalli – 620102, Tamil Nadu, India
                    </p>
                </div>
            </div>
        </motion.div>
    );
}