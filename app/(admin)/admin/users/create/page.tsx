"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft, ShieldCheck, User, Mail, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminCreateUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        isPaidUser: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post("/api/admin/users", form);
            router.push("/users"); // ✅ Updated routing to match new folder structure
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create user");
            setLoading(false);
        }
    };

    return (
        <div className="p-8 md:p-12 max-w-2xl mx-auto">
            <div className="w-full bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">

                {/* --- HEADER --- */}
                <div className="bg-[#0F172A] px-10 py-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <Link href="/admin/users" className="relative z-10 inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Back to Roster
                    </Link>

                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">New Student</h1>
                            <p className="text-slate-400 mt-2 font-medium">Manually provision an account.</p>
                        </div>
                        <ShieldCheck className="w-12 h-12 text-blue-500 opacity-80" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-7">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-100 text-center animate-in slide-in-from-bottom-2">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                required
                                type="text"
                                value={form.name}
                                placeholder="Name"
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                required
                                placeholder="Email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                required
                                placeholder="Password"
                                type="text"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Premium Exam Access Toggle */}
                    <div className="flex items-center justify-between p-5 bg-blue-50/50 border border-blue-100 rounded-2xl mt-4">
                        <div>
                            <p className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-600" /> Grant Exam Access
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">Sets "isPaidUser" to true instantly.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={form.isPaidUser}
                                onChange={(e) => setForm({ ...form, isPaidUser: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}