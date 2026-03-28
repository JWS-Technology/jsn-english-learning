"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, CheckCircle2, FileSearch, ArrowLeft, Lock } from "lucide-react";

export default function TestResultSummary({ params }: { params: Promise<{ resultId: string }> }) {
    const { resultId } = use(params);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentError, setPaymentError] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // Fetch user & result concurrently
                const [authRes, resultRes] = await Promise.all([
                    axios.get("/api/auth/me"),
                    axios.get(`/api/tests/results/${resultId}`)
                ]);

                const currentUser = authRes.data.user;

                // ✅ Schema Access Check
                if (currentUser?.role !== 'admin' && !currentUser?.access?.tests) {
                    setPaymentError(true);
                    setLoading(false);
                    return;
                }

                setResult(resultRes.data);
            } catch (err) {
                console.error("Failed to fetch result", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [resultId]);

    if (loading) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Calculating Score...</p>
        </div>
    );

    // ✅ Error Screen for unauthorized access
    if (paymentError) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-4">Test Access Required</h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
                Your account does not have permission to view test results. Please contact the administrator.
            </p>
            <Link href="/online-tests" className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                Return to Dashboard
            </Link>
        </div>
    );

    if (!result) return <div className="p-10 text-center font-bold text-slate-500">Result not found.</div>;

    const percentage = Math.round((result.score / result.totalMarks) * 100);

    return (
        <div className="h-[100dvh] w-screen flex flex-col items-center justify-center bg-[#0F172A] p-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-lg w-full relative z-10">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
                    <CheckCircle2 size={48} />
                </div>

                <h1 className="text-4xl font-black text-[#0F172A] mb-2 tracking-tight">Exam Complete!</h1>
                <p className="text-slate-500 font-medium mb-10">Your answers have been securely recorded.</p>

                <div className="bg-[#F8FAFC] p-8 rounded-[2rem] mb-10 border border-slate-100 shadow-inner">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Final Score</p>
                    <h2 className="text-6xl font-black text-[#0F172A] mb-2 tracking-tighter">
                        {result.score} <span className="text-2xl text-slate-400">/ {result.totalMarks}</span>
                    </h2>
                    <p className={`font-black uppercase tracking-widest text-xs inline-flex px-4 py-1.5 rounded-xl ${percentage >= 50 ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                        {percentage}% Accuracy
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/test-review/${resultId}`}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                    >
                        <FileSearch size={16} /> Review Answers
                    </Link>

                    <Link href="/online-tests" className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-[#0F172A] border border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">
                        <ArrowLeft size={16} /> Return to Tests
                    </Link>
                </div>
            </div>
        </div>
    );
}