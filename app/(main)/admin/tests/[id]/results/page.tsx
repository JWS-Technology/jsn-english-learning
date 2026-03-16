"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, ArrowLeft, Trophy, Search, ExternalLink } from "lucide-react";

export default function TestResultsLeaderboard({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`/api/admin/tests/${id}/results`);
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch test results");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
    );

    if (!data || !data.test) return <div className="p-20 text-center font-bold">Test not found.</div>;

    const { test, results } = data;

    const filteredResults = results.filter((r: any) =>
        r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin/tests" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Back to Analytics
                    </Link>
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-2">{test.title}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        {test.examType} • {test.subject} • {test.totalQuestions} Questions
                    </p>
                </div>

                {/* Search & Leaderboard Table */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-[#0F172A] font-black text-lg">
                            <Trophy className="text-orange-500" /> Performance Roster
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search student name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="p-6 pl-10">Rank</th>
                                    <th className="p-6">Student Name</th>
                                    <th className="p-6">Score</th>
                                    <th className="p-6">Accuracy</th>
                                    <th className="p-6">Date Taken</th>
                                    <th className="p-6 text-right pr-10">Detailed View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredResults.length === 0 ? (
                                    <tr><td colSpan={6} className="p-10 text-center text-slate-400 font-bold">No results found.</td></tr>
                                ) : (
                                    filteredResults.map((result: any, index: number) => {
                                        const percentage = Math.round((result.score / test.totalQuestions) * 100);
                                        const isPass = percentage >= 50;

                                        return (
                                            <tr key={result._id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-6 pl-10 font-black text-slate-400">#{index + 1}</td>
                                                <td className="p-6">
                                                    <p className="font-bold text-[#0F172A]">{result.user?.name || "Deleted User"}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{result.user?.email}</p>
                                                </td>
                                                <td className="p-6 font-black text-[#0F172A]">{result.score} <span className="text-slate-400 text-xs">/ {test.totalQuestions}</span></td>
                                                <td className="p-6">
                                                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${isPass ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                        {percentage}%
                                                    </span>
                                                </td>
                                                <td className="p-6 text-xs font-bold text-slate-500">
                                                    {new Date(result.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-6 text-right pr-10">
                                                    <Link
                                                        href={`/test-review/${result._id}`}
                                                        target="_blank" // Opens in a new tab so admin doesn't lose their place!
                                                        className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    );
}