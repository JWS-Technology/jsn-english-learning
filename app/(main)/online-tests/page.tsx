"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Clock,
    ArrowRight,
    BookOpen,
    Loader2,
    Lock,
    PlayCircle,
    CheckCircle2,
    MonitorPlay,
    Download
} from "lucide-react";

import jsPDF from "jspdf";

type Test = {
    _id: string;
    title: string;
    subject: string;
    examType: string;
    durationInMinutes: number;
    totalQuestions: number;
    isPremium: boolean;
};

export default function TestsListingPage() {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/tests");
                setTests(res.data || []);

                try {
                    const authRes = await axios.get("/api/auth/me");
                    if (authRes.data.success) {
                        setUser(authRes.data.user);
                    }
                } catch (authErr) {
                    setUser(null);
                }
            } catch (err) {
                console.error("Critical Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = tests.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "ALL" || t.examType === filter;
        return matchesSearch && matchesFilter;
    });

    // ✅ UPDATED: PDF Generator with True Center Watermark & Bolder Answers
    const downloadAnswerKeyPDF = async (e: React.MouseEvent, testId: string, title: string, examType: string, subject: string) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setDownloadingId(testId);

            const res = await axios.get(`/api/admin/tests/${testId}`);
            const fullTest = res.data;
            // console.log("Test", fullTest);
            if (!fullTest.questions || fullTest.questions.length === 0) {
                alert("No questions found for this test.");
                setDownloadingId(null);
                return;
            }

            const doc = new jsPDF();
            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 40;

            const drawPageBackground = (isFirstPage: boolean) => {
                // 1. Page Border
                doc.setDrawColor(15, 23, 42);
                doc.setLineWidth(0.5);
                doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

                // 2. TRUE Center Diagonal Watermark
                doc.saveGraphicsState();
                // TS Fix: cast doc to any for advanced GState usage
                (doc as any).setGState(new (doc as any).GState({ opacity: 0.08 }));
                doc.setTextColor(15, 23, 42);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(55);
                // perfectly center X and Y, align center, baseline middle
                doc.text("JSN ENGLISH LEARNING", pageWidth / 2, pageHeight / 2, {
                    angle: 45,
                    align: "center",
                    baseline: "middle"
                });

                doc.restoreGraphicsState(); // Restore opacity to normal for text

                // 3. Footer
                doc.setTextColor(100, 116, 139);
                doc.setFontSize(9);
                doc.setFont("helvetica", "bold");
                doc.text("Dr. S. Jerald Sagaya Nathan - 9843287913", 15, pageHeight - 15);
                // doc.text("Dr. S. Jerald Sagaya Nathan", pageWidth / 2, pageHeight - 15, { align: "center" });
                doc.text(`Page ${(doc as any).internal.getNumberOfPages()}`, pageWidth - 15, pageHeight - 15, { align: "right" });

                // 4. Header
                if (isFirstPage) {
                    doc.setTextColor(15, 23, 42);
                    doc.setFontSize(14);
                    doc.text(`${examType.toUpperCase()} ENGLISH`, pageWidth / 2, 22, { align: "center" });
                    doc.setFontSize(11);
                    doc.setFont("helvetica", "normal");
                    doc.text(`${subject} - ${title}`, pageWidth / 2, 28, { align: "center" });

                    doc.setDrawColor(200, 200, 200);
                    doc.line(15, 32, pageWidth - 15, 32);
                }
            };

            // Initialize first page
            drawPageBackground(true);

            // --- RENDER QUESTIONS ---
            fullTest.questions.forEach((q: any, index: number) => {

                if (yPos > pageHeight - 40) {
                    doc.addPage();
                    drawPageBackground(false);
                    yPos = 25;
                }

                // Question Text (Black & Bold)
                doc.setFont("helvetica", "bold");
                doc.setTextColor(15, 23, 42);
                doc.setFontSize(11);
                const qText = `${index + 1}. ${q.questionText}`;
                const qLines = doc.splitTextToSize(qText, pageWidth - 30);
                doc.text(qLines, 15, yPos);
                yPos += (qLines.length * 6) + 2;

                // Answer Options
                q.options.forEach((opt: string, optIndex: number) => {
                    if (yPos > pageHeight - 30) {
                        doc.addPage();
                        drawPageBackground(false);
                        yPos = 25;
                    }

                    const isCorrect = q.correctAnswer === optIndex;
                    const letter = String.fromCharCode(65 + optIndex); // A, B, C, D

                    // ✅ All answers are now bolded
                    doc.setFont("helvetica", "bold");

                    if (isCorrect) {
                        doc.setTextColor(22, 163, 74); // Emerald Green for correct answer
                    } else {
                        doc.setTextColor(71, 85, 105); // Slate/Dark Gray for other answers
                    }

                    // Format: "A) William Wordsworth"
                    const baseOptText = opt.startsWith(`${letter})`) ? opt : `${letter}) ${opt}`;
                    const optText = isCorrect ? `${baseOptText}` : baseOptText;

                    const optLines = doc.splitTextToSize(optText, pageWidth - 35);
                    doc.text(optLines, 20, yPos);

                    yPos += (optLines.length * 5) + 2;
                });

                yPos += 6; // Extra space between full questions
            });

            // Trigger Download
            doc.save(`${title.replace(/\s+/g, '_')}_Answer_Key.pdf`);

        } catch (error) {
            console.error("Download Error:", error);
            alert("Failed to download answer key.");
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-44 px-6 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md text-blue-400"
                    >
                        <MonitorPlay className="w-3.5 h-3.5" />
                        Computer Based Testing Engine
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-8"
                    >
                        Simulated <br />
                        <span className="text-blue-500 italic font-serif font-normal">Mock Exams.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Experience the exact environment of TRB, NET, and SET exams. Timed, structured, and instantly graded.
                    </motion.p>
                </div>
            </section>

            {/* --- SEARCH & FILTER BAR --- */}
            <div className="max-w-6xl mx-auto px-6 -mt-14 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 p-4 flex flex-col lg:flex-row gap-4"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tests or subjects..."
                            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 border-none focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex bg-slate-50 p-2 rounded-3xl items-center gap-1 border border-slate-100">
                        {["ALL", "UG TRB", "PG TRB", "NET", "SET"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest transition-all ${filter === type
                                    ? 'bg-[#0F172A] text-white shadow-xl'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* --- TESTS GRID --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-6">
                        <Loader2 className="animate-spin w-16 h-16 text-blue-500" />
                        <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">Loading CBT Engine...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filtered.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    layout
                                >
                                    <Link
                                        href={user ? `/take-test/${item._id}` : `/login?redirect=/take-test/${item._id}`}
                                        className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all hover:border-blue-200 hover:shadow-2xl flex flex-col h-full relative overflow-hidden"
                                    >

                                        {/* ✅ PDF Download Button */}
                                        <button
                                            onClick={(e) => downloadAnswerKeyPDF(e, item._id, item.title, item.examType, item.subject)}
                                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm z-20"
                                            title="Download PDF Answer Key"
                                        >
                                            {downloadingId === item._id ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Download size={16} />
                                            )}
                                        </button>

                                        <div className="mb-8 flex items-center justify-between relative z-10 pr-12">
                                            <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                                {user ? <PlayCircle className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                                            </div>
                                            <span className="px-4 py-1.5 rounded-xl text-[9px] font-black tracking-[0.2em] uppercase bg-[#0F172A] text-white shadow-sm">
                                                {item.examType}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-[1.2] tracking-tight">
                                            {item.title}
                                        </h3>

                                        <div className="space-y-4 mt-auto pt-8 border-t border-slate-50 relative z-10">
                                            <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <BookOpen className="w-4 h-4 mr-3 text-blue-500" /> {item.subject}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                    <Clock className="w-4 h-4 mr-2" /> {item.durationInMinutes} Mins
                                                </div>
                                                <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 className="w-4 h-4 mr-2" /> {item.totalQuestions} Qs
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 flex items-center text-slate-900 font-black text-xs uppercase tracking-widest group-hover:text-blue-600 transition-all">
                                            {user ? "Start Exam Now" : "Login to Start Exam"}
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-3" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>
        </main>
    );
}