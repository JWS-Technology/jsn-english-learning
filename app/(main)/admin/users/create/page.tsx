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
            router.push("/admin/users");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create user");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 py-20">
            <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-[#0F172A] px-10 py-12 text-white relative">
                    <Link href="/admin/users" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Back to Roster
                    </Link>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">New Student</h1>
                            <p className="text-slate-400 mt-2 font-medium">Manually provision an account.</p>
                        </div>
                        <ShieldCheck className="w-12 h-12 text-orange-500 opacity-80" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-slate-50 border   border-slate-100 text-black rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 text-black rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporary Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input required type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 text-black rounded-2xl pl-11 pr-4 py-4 font-bold text-[#0F172A] outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Premium Exam Access Toggle */}
                    <div className="flex items-center justify-between p-5 bg-orange-50/50 border border-orange-100 rounded-2xl mt-4">
                        <div>
                            <p className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 text-orange-500" /> Grant Exam Access
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">Sets 'isPaidUser' to true instantly.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={form.isPaidUser} onChange={(e) => setForm({ ...form, isPaidUser: e.target.checked })} />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>

                    <button disabled={loading} type="submit" className="w-full mt-4 bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 shadow-xl shadow-orange-950/20 transition-all disabled:opacity-50 flex justify-center">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                    </button>
                </form>
            </div>
        </main>
    );
}