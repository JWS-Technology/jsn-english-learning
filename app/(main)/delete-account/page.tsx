"use client";

import Link from "next/link";
import { Trash2, Mail, ArrowLeft, ShieldAlert, Clock, Database, ChevronRight, AlertCircle } from "lucide-react";

export default function DeleteAccount() {
    return (
        <main className="min-h-screen bg-white text-slate-900">

            <div className="max-w-7xl mx-auto pt-30 px-6 py-20 lg:py-32 grid lg:grid-cols-12 gap-20">

                {/* Left Side: Warning Header */}
                <aside className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
                        <ShieldAlert className="w-3.5 h-3.5" /> Irreversible Action
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-slate-950">
                        Delete <br /> Account
                    </h1>
                    <p className="mt-8 text-slate-500 font-medium leading-relaxed max-w-sm">
                        Request the permanent removal of your academic profile and all associated exam data from our servers.
                    </p>

                    <div className="mt-10 p-6 rounded-2xl bg-amber-50 border border-amber-100">
                        <div className="flex items-center gap-2 text-amber-800 mb-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">Warning</span>
                        </div>
                        <p className="text-xs text-amber-700 font-medium leading-relaxed">
                            Once processed, your score history, mock exam analytics, and library access cannot be recovered.
                        </p>
                    </div>
                </aside>

                {/* Right Side: Process Content */}
                <div className="lg:col-span-8">
                    <div className="max-w-2xl space-y-20">

                        {/* Section 1: The Request */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-slate-950 m-0">01. Request Procedure</h2>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                To ensure security, all deletion requests must be verified. Please send a formal request from your **registered email address**.
                            </p>

                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                <div className="relative bg-white border border-slate-200 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Official Support Channel</p>
                                        <p className="text-xl font-black text-slate-900 underline decoration-red-500/30">jsnathan1981@gmail.com</p>
                                    </div>
                                    <a href="mailto:jsnathan1981@gmail.com" className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors text-center">
                                        Send Request
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Data Scope */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                    <Database className="w-4 h-4" />
                                </div>
                                <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-slate-950 m-0">02. Scope of Deletion</h2>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { title: "Identity Data", desc: "Your email, full name, and profile metadata." },
                                    { title: "Academic History", desc: "Complete mock exam results and performance tracking." },
                                    { title: "Security Credentials", desc: "Stored hashed passwords and active session tokens." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start justify-between p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: Timeline */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-slate-950 m-0">03. Verification & Timeline</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Upon receiving your email, our compliance team will initiate a verification process. Following successful identification, your data will be purged from our active databases and backup cycles within <span className="text-slate-950 font-bold">7 business days</span>.
                            </p>
                        </section>

                    </div>
                </div>
            </div>


        </main>
    );
}