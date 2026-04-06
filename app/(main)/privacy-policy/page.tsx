import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, Lock, Database, Eye, ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white text-slate-900">


            <div className="max-w-7xl mx-auto pt-30 px-6 py-20 lg:py-32 grid lg:grid-cols-12 gap-20">

                {/* Left Side: Floating Header */}
                <aside className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Security
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-slate-950">
                        Privacy <br /> Policy
                    </h1>
                    <p className="mt-8 text-slate-500 font-medium leading-relaxed max-w-sm">
                        This policy outlines our commitment to managing your data with transparency and absolute security.
                    </p>
                    <div className="mt-10 pt-10 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Effective Date</p>
                        <p className="text-sm font-bold text-slate-900 mt-1">March 24, 2026</p>
                    </div>
                </aside>

                {/* Right Side: Clean Structured Content */}
                <div className="lg:col-span-8">
                    <div className="prose prose-slate max-w-none">

                        <p className="text-xl text-slate-600 leading-relaxed font-medium mb-20">
                            JSN English Learning (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This document explains the specific data points we handle and your rights as a student on our platform.
                        </p>

                        <div className="space-y-24">

                            {/* Section 1 */}
                            <section id="collect" className="scroll-mt-32">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                        <Database className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight m-0 uppercase text-[14px] tracking-[0.1em]">01. Information Collection</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We collect information necessary to maintain your academic progress and secure your account access.
                                </p>
                                <div className="mt-8 space-y-4">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                                        <div>
                                            <p className="font-bold text-slate-900 m-0">Account Authentication</p>
                                            <p className="text-sm text-slate-500 m-0 mt-1">Direct provision of your email address and a salt-hashed cryptographic representation of your password.</p>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                                        <div>
                                            <p className="font-bold text-slate-900 m-0">Performance Metrics</p>
                                            <p className="text-sm text-slate-500 m-0 mt-1">Metadata associated with mock exams, including duration, selected answers, and final scores for analytical review.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="usage" className="scroll-mt-32">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight m-0 uppercase text-[14px] tracking-[0.1em]">02. Data Utilization</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {["Identity Verification", "Service Optimization", "Predictive Analytics", "Security Auditing"].map((item) => (
                                        <div key={item} className="flex items-center justify-between p-4 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-700">{item}</span>
                                            <ChevronRight className="w-4 h-4 text-blue-600" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="security" className="scroll-mt-32">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight m-0 uppercase text-[14px] tracking-[0.1em]">03. Security Infrastructure</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    We implement SOC2-standard conceptual security measures. Your data is stored in encrypted clusters, and we enforce strict Least Privilege Access (LPA) policies for our internal database management.
                                </p>
                            </section>

                            {/* Footer Section */}
                            <section className="pt-20 border-t border-slate-100">
                                <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white">
                                    <h2 className="text-3xl font-black tracking-tighter m-0 text-white">Have questions?</h2>
                                    <p className="text-blue-100 font-medium mt-4">Our compliance team is ready to help you with any data-related inquiries.</p>
                                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                        <a href="mailto:jsnathan1981@gmail.com" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors text-center">
                                            Email Compliance
                                        </a>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
}