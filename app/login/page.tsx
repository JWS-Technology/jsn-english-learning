"use client";

import { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Loader2, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// 1. Separate the logic that uses useSearchParams into its own component
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect");
    const justRegistered = searchParams.get("registered") === "true";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });

            if (redirectTo) {
                router.push(redirectTo);
            } else if (res.data.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/materials");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-8 md:p-10 space-y-6">
            <div className="space-y-2 text-center mb-4">
                <h1 className="text-xl font-black text-[#0F172A]">Welcome Back</h1>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Secure Authentication</p>
            </div>

            {justRegistered && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-[10px] font-bold flex items-center gap-2 mb-6 border border-emerald-100 animate-in fade-in zoom-in-95">
                    <CheckCircle2 className="w-4 h-4" />
                    Account created! You can now log in.
                </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border text-slate-400 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white outline-none transition-all"
                        placeholder="name@example.com"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border text-slate-400 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-red-100">
                    <div className="w-1 h-1 bg-red-600 rounded-full" />
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-[0.97] disabled:opacity-50 shadow-xl shadow-orange-950/20"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        Sign In Access <ChevronRight className="w-4 h-4" />
                    </>
                )}
            </button>

            <div className="text-center">
                <Link href="/register" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0F172A] transition-colors">
                    New to JSN? <span className="text-orange-600">Create Account</span>
                </Link>
            </div>
        </form>
    );
}

// 2. Main Page Component
export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0F172A] text-white rounded-2xl shadow-xl mb-4">
                    <ShieldCheck className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">JSN English Learning</h2>
                <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-widest text-[10px]">Student & Admin Portal</p>
            </div>

            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <Suspense fallback={
                    <div className="p-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest flex flex-col items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                        Loading Secure Portal...
                    </div>
                }>
                    <LoginForm />
                </Suspense>

                <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        Protected by JSN Security Protocol 2026
                    </p>
                </div>
            </div>

            <Link href="/" className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0F172A] transition-colors flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back to Homepage
            </Link>
        </main>
    );
}

function ChevronLeft({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
}