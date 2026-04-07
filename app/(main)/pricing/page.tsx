"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, Zap, Smartphone, Globe, BookOpen,
    ShieldCheck, ArrowRight, UserPlus, MessageCircle,
    Send, X
} from "lucide-react";

const plans = [
    {
        name: "Test Series Only",
        price: "1,999",
        description: "Self-assessment for serious aspirants who have already completed their syllabus.",
        features: [
            "Unit-wise Cumulative Tests",
            "Real-time Performance Analytics",
            "PDF Answer Keys with Explanations",
            "Standard Website Access",
            "Doubt Clearing via Comments"
        ],
        cta: "Enroll in Tests",
        highlight: false,
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        name: "Online Class Alone",
        price: "7,999",
        description: "Comprehensive coaching by Dr. S. Jerald Sagaya Nathan for deep concept mastery.",
        features: [
            "Daily Live Interactive Batches",
            "Recorded Session Archives",
            "Exclusive Unit-wise PDF Notes",
            "13+ Years Expert Guidance",
            "Personalized Batch Interaction",
            "Priority Support"
        ],
        cta: "Join Live Classes",
        highlight: false,
        icon: <Globe className="w-6 h-6" />
    },
    {
        name: "Premium Combo",
        price: "8,999",
        description: "The complete ecosystem. Includes live coaching and the advanced testing engine.",
        features: [
            "All 'Online Class' Features",
            "Full Access to Test Series",
            "Future Mobile App Integration",
            "1-on-1 Guidance for NET/SET",
            "Hardcopy Material Discounts",
            "Lifetime Community Access"
        ],
        cta: "Get Full Access",
        highlight: true,
        icon: <Zap className="w-6 h-6" />
    }
];

export default function PricingPage() {
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");

    const handleWhatsAppRedirect = () => {
        if (!studentName.trim()) {
            alert("Please enter your name to proceed.");
            return;
        }

        const phoneNumber = "919843287913";
        const message = `Hello Dr. Nathan, I am ${studentName}. I would like to enroll in the ${selectedPlan}. I have registered on the website. Please guide me with the next steps.`;
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
        setShowWhatsAppModal(false);
        setStudentName(""); // Reset for next time
    };

    const openEnrollment = (planName: string) => {
        setSelectedPlan(planName);
        setShowWhatsAppModal(true);
    };

    return (
        <main className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Header Section --- */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100"
                    >
                        <ShieldCheck size={14} /> Official 2026-2027 Enrollment Portal
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                        Ready to <span className="text-blue-600">Level Up?</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed px-4">
                        Follow our streamlined process to secure your seat in the upcoming batch.
                    </p>
                </div>

                {/* --- The Enrollment Steps --- */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { step: "01", title: "Register Account", desc: "Create your profile on our official website to access the dashboard.", icon: <UserPlus /> },
                        { step: "02", title: "Notify Admin", desc: "Use the 'Notify Admin' button in your dashboard after registration.", icon: <Zap /> },
                        { step: "03", title: "Confirm on WhatsApp", desc: "Send your details to Dr. Nathan for immediate batch allocation.", icon: <MessageCircle /> },
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative group">
                            <span className="absolute top-8 right-8 text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">{item.step}</span>
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">{item.icon}</div>
                            <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* --- Pricing Cards --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-10 rounded-[3.5rem] border transition-all duration-500 group
                                ${plan.highlight
                                    ? 'bg-slate-950 border-white/10 shadow-2xl scale-105 z-10'
                                    : 'bg-white border-slate-100 shadow-sm hover:border-blue-200'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8
                                ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-slate-50 text-blue-600'}`}>
                                {plan.icon}
                            </div>

                            <h3 className={`text-2xl font-black mb-3 tracking-tight ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                                {plan.name}
                            </h3>

                            <div className="flex items-baseline gap-1 mb-6">
                                <span className={`text-5xl font-black tracking-tighter ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                                    ₹{plan.price}
                                </span>
                            </div>

                            <div className={`space-y-4 mb-10 pt-8 border-t ${plan.highlight ? 'border-white/10' : 'border-slate-50'}`}>
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <Check size={14} className={`mt-1 shrink-0 ${plan.highlight ? 'text-blue-400' : 'text-blue-600'}`} />
                                        <span className={`text-xs font-bold ${plan.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => openEnrollment(plan.name)}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all
                                ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                            >
                                Enroll Now <ArrowRight size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* --- WhatsApp Modal --- */}
                <AnimatePresence>
                    {showWhatsAppModal && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl"
                            >
                                <button onClick={() => setShowWhatsAppModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>

                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                    <MessageCircle size={32} />
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Final Step</h3>
                                <p className="text-sm font-medium text-slate-500 mb-8">Please enter your full name to generate your enrollment message for Dr. Nathan.</p>

                                <input
                                    type="text"
                                    placeholder="Enter Student Name"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                                />

                                <button
                                    onClick={handleWhatsAppRedirect}
                                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                                >
                                    Confirm & Chat <Send size={14} />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* --- FOOTER SUPPORT SECTION (Green WhatsApp Style) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 md:p-12 rounded-[3.5rem] bg-[#25D366] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-emerald-200"
                >
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                    />

                    <div className="max-w-xl relative z-10 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <div className="p-3 bg-white/20 rounded-2xl">
                                <MessageCircle size={28} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black/10 px-3 py-1 rounded-full">
                                Direct Assistance
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4">
                            Confused about <br /> the enrollment?
                        </h2>
                        <p className="text-emerald-50 font-medium text-sm md:text-base">
                            Chat directly with Dr. Nathan's team. We'll help you pick the right batch and complete your registration in minutes.
                        </p>
                    </div>

                    <div className="relative z-10 shrink-0 w-full md:w-auto">
                        <button
                            onClick={() => {
                                setSelectedPlan("General Inquiry");
                                setShowWhatsAppModal(true);
                            }}
                            className="w-full md:w-auto px-10 py-6 bg-white text-[#25D366] rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all shadow-xl active:scale-95"
                        >
                            Chat with Admin <Send size={18} />
                        </button>
                    </div>
                </motion.div>

                {/* --- Secondary Admin Numbers --- */}
                <div className="mt-8 flex justify-center opacity-50">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex flex-wrap justify-center gap-x-2">
                        <span>Official Support:</span>
                        <a
                            href="tel:+919843287913"
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            +91 98432 87913
                        </a>
                        <span className="text-slate-300">|</span>
                        <a
                            href="tel:+919629287913"
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            +91 96292 87913
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}