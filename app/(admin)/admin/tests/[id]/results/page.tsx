"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, ArrowLeft, Trophy, Search, ExternalLink, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

    // ✅ Professional Transcript Export (First Attempt Only)
    const exportToPDF = () => {
        if (!data || !data.test || !data.results) return;

        const { test, results } = data;
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // --- 1. FILTER: KEEP ONLY FIRST ATTEMPT ---
        const chronologicalResults = [...results].sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const firstAttemptsMap = new Map();
        chronologicalResults.forEach((result: any) => {
            const userId = result.user?._id || result.user?.email || "unknown";
            if (!firstAttemptsMap.has(userId)) {
                firstAttemptsMap.set(userId, result);
            }
        });

        const uniqueResults = Array.from(firstAttemptsMap.values());

        // --- 2. INSTITUTION HEADER ---
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("JSN ENGLISH LEARNING", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        doc.text("Official Assessment Transcript", pageWidth / 2, 26, { align: "center" });

        // Divider Line
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 32, pageWidth - 14, 32);

        // --- 3. EXAM METADATA ---
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(`Assessment Module: ${test.title}`, 14, 42);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Subject Domain: ${test.subject}`, 14, 48);
        doc.text(`Evaluation Category: ${test.examType}`, 14, 54);

        doc.text(`Total Items: ${test.totalQuestions}`, pageWidth - 14, 48, { align: "right" });
        doc.text(`Candidates Evaluated: ${uniqueResults.length}`, pageWidth - 14, 54, { align: "right" });
        doc.text(`Date of Generation: ${new Date().toLocaleDateString()}`, pageWidth - 14, 60, { align: "right" });

        // --- 4. PREPARE TABLE DATA ---
        const tableColumn = ["S.No", "Candidate Name", "Registered Email", "Assessment Date", "Score Obtained"];
        const tableRows: any[] = [];

        const sortedUniqueResults = uniqueResults.sort((a, b) => {
            const nameA = a.user?.name || "Unknown";
            const nameB = b.user?.name || "Unknown";
            return nameA.localeCompare(nameB);
        });

        sortedUniqueResults.forEach((result: any, index: number) => {
            const rowData = [
                (index + 1).toString(),
                result.user?.name || "Deleted User",
                result.user?.email || "N/A",
                new Date(result.createdAt).toLocaleDateString(),
                `${result.score} / ${test.totalQuestions}`
            ];
            tableRows.push(rowData);
        });

        // --- 5. RENDER PROFESSIONAL TABLE ---
        autoTable(doc, {
            startY: 68,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
            bodyStyles: { textColor: [50, 50, 50] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                3: { halign: 'center' },
                4: { halign: 'center', fontStyle: 'bold' }
            },
            didDrawPage: function (data) {
                // ✅ TS FIX: Cast doc to 'any' to bypass strict internal typing
                const str = "Page " + (doc as any).internal.getNumberOfPages();
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(str, data.settings.margin.left, pageHeight - 10);
                doc.text("Generated by JSN English Learning Evaluation System", pageWidth - 14, pageHeight - 10, { align: "right" });
            }
        });

        // --- 6. SAVE PDF ---
        doc.save(`Assessment_Transcript_${test.title.replace(/\s+/g, '_')}.pdf`);
    };

    if (loading) return (
        <div className="h-full min-h-[50vh] flex items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
    );

    if (!data || !data.test) return <div className="p-20 text-center font-bold">Test not found.</div>;

    const { test, results } = data;

    const filteredResults = results.filter((r: any) =>
        r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto">

            {/* Header Area with Export Button */}
            <div className="mb-10">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 transition-colors">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-2">{test.title}</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            {test.examType} • {test.subject} • {test.totalQuestions} Questions
                        </p>
                    </div>

                    <button
                        onClick={exportToPDF}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 shrink-0"
                    >
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Search & Leaderboard Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[#0F172A] font-black text-lg">
                        <Trophy className="text-blue-600" /> Performance Roster
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search student name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-50 text-black border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-6 pl-10">Attempt Rank</th>
                                <th className="p-6">Candidate Name</th>
                                <th className="p-6">Score Obtained</th>
                                <th className="p-6">Accuracy</th>
                                <th className="p-6">Date of Assessment</th>
                                <th className="p-6 text-right pr-10">Detailed View</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredResults.length === 0 ? (
                                <tr><td colSpan={6} className="p-10 text-center text-slate-400 font-bold">No results found.</td></tr>
                            ) : (
                                filteredResults.map((result: any, index: number) => {
                                    const percentage = Math.round((result.score / test.totalQuestions) * 100);

                                    return (
                                        <tr key={result._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="p-6 pl-10 font-black text-slate-400">#{index + 1}</td>
                                            <td className="p-6">
                                                <p className="font-bold text-[#0F172A]">{result.user?.name || "Deleted User"}</p>
                                                <p className="text-xs text-slate-400 font-medium">{result.user?.email}</p>
                                            </td>
                                            <td className="p-6 font-black text-[#0F172A]">{result.score} <span className="text-slate-400 text-xs">/ {test.totalQuestions}</span></td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${percentage >= 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                    {percentage}%
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs font-bold text-slate-500">
                                                {new Date(result.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <Link
                                                    href={`/test-review/${result._id}`}
                                                    target="_blank"
                                                    className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
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
    );
}