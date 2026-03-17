"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, FileText, ArrowRight, BarChart3, Users, Trash2 } from "lucide-react";

export default function AdminTestAnalyticsPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

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

    // ✅ Delete Test Function
    const deleteTest = async (testId: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this test? This will also wipe all student results for this exam. This cannot be undone.");
        if (!confirmDelete) return;

        try {
            // Optimistic UI removal
            setTests(tests.filter(t => t._id !== testId));
            await axios.delete(`/api/admin/tests/${testId}`);
        } catch (error) {
            alert("Failed to delete test.");
            fetchAnalytics(); // Revert on failure
        }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center bg-[#F8FAFC] min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Test Analytics</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage exams and monitor performance</p>
                </div>
                <Link href="/admin/tests/upload" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                    <FileText size={14} /> Upload New Test
                </Link>
            </div>

            {/* List of Tests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tests.map((test) => (
                    <div key={test._id} className="relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col">

                        {/* Delete Test Button (Top Right) */}
                        <button
                            onClick={() => deleteTest(test._id)}
                            className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm "
                            title="Delete Test"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="mb-6 pr-10">
                            <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 inline-block border border-slate-100">
                                {test.examType} • {test.subject}
                            </span>
                            <h2 className="text-xl font-black text-[#0F172A] leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                {test.title}
                            </h2>
                        </div>

                        <div className="flex items-center gap-6 mt-auto py-6 border-y border-slate-50">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <Users size={12} className="text-blue-500" /> Takers
                                </p>
                                <p className="text-2xl font-black text-[#0F172A]">{test.participants}</p>
                            </div>
                            <div className="w-px h-10 bg-slate-100" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                    <BarChart3 size={12} className="text-blue-500" /> Avg Score
                                </p>
                                <p className="text-2xl font-black text-[#0F172A]">{test.avgScore} <span className="text-sm text-slate-400">/ {test.totalQuestions}</span></p>
                            </div>
                        </div>

                        <Link
                            href={`/admin/tests/${test._id}/results`}
                            className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-600 transition-colors"
                        >
                            View Student Roster <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                ))}
            </div>

            {tests.length === 0 && (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center">
                    <p className="text-slate-400 font-bold mb-4">No tests uploaded yet.</p>
                </div>
            )}
        </div>
    );
}