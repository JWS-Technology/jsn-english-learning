"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, ShieldCheck, FileText, ArrowRight, BarChart3, Users } from "lucide-react";

export default function AdminTestAnalyticsPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get("/api/admin/tests/analytics");
                setTests(res.data);
            } catch (error) {
                console.error("Failed to fetch test analytics");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Administrator Portal</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">Test Analytics</h1>
                    </div>
                    <Link href="/admin/test/upload" className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center gap-2">
                        <FileText size={16} /> Upload New Test
                    </Link>
                </div>

                {/* List of Tests */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div key={test._id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col">

                            <div className="mb-6">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 inline-block">
                                    {test.examType} • {test.subject}
                                </span>
                                <h2 className="text-xl font-black text-[#0F172A] leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                                    {test.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-6 mt-auto py-6 border-y border-slate-50">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><Users size={12} /> Takers</p>
                                    <p className="text-2xl font-black text-[#0F172A]">{test.participants}</p>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><BarChart3 size={12} /> Avg Score</p>
                                    <p className="text-2xl font-black text-[#0F172A]">{test.avgScore} <span className="text-sm text-slate-400">/ {test.totalQuestions}</span></p>
                                </div>
                            </div>

                            <Link
                                href={`/admin/tests/${test._id}/results`}
                                className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#0F172A] group-hover:text-orange-500 transition-colors"
                            >
                                View Student Roster <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}