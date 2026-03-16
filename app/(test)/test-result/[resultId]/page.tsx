"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, CheckCircle2, FileSearch, ArrowLeft } from "lucide-react";

export default function TestResultSummary({ params }: { params: Promise<{ resultId: string }> }) {
    const { resultId } = use(params);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`/api/tests/results/${resultId}`);
                setResult(res.data);
            } catch (err) {
                console.error("Failed to fetch result", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [resultId]);

    if (loading) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
        </div>
    );

    if (!result) return <div className="p-10 text-center">Result not found.</div>;

    const percentage = Math.round((result.score / result.totalMarks) * 100);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg w-full relative overflow-hidden">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-4xl font-black text-[#0F172A] mb-2">Exam Complete!</h1>
                <p className="text-slate-500 font-medium mb-10">Your answers have been securely recorded.</p>

                <div className="bg-slate-50 p-8 rounded-[2rem] mb-8 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Final Score</p>
                    <h2 className="text-6xl font-black text-[#0F172A] mb-2">
                        {result.score} <span className="text-2xl text-slate-400">/ {result.totalMarks}</span>
                    </h2>
                    <p className={`font-bold ${percentage >= 50 ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {percentage}% Accuracy
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/test-review/${resultId}`}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
                    >
                        <FileSearch size={16} /> Review Answers
                    </Link>
                    <Link href="/user/dashboard" className="w-full flex items-center justify-center gap-2 py-4 bg-[#0F172A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all">
                        <ArrowLeft size={16} /> Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}