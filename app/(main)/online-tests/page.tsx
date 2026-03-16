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
    MonitorPlay
} from "lucide-react";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Tests 
                const res = await axios.get("/api/tests"); // Ensure you have a simple GET route for tests
                setTests(res.data || []);

                // 2. Verify Session
                try {
                    const authRes = await axios.get("/api/auth/me");
                    if (authRes.data.success) {
                        setUser(authRes.data.user);
                    }
                } catch (authErr) {
                    setUser(null); // Not logged in
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
                        {["ALL", "TRB", "NET", "SET"].map((type) => (
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
                                    {/* ✅ ROUTE TO THE DISTRACTION-FREE (test) FOLDER */}
                                    <Link
                                        href={user ? `/take-test/${item._id}` : `/login?redirect=/take-test/${item._id}`}
                                        className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all hover:border-blue-200 hover:shadow-2xl flex flex-col h-full relative overflow-hidden"
                                    >
                                        <div className="mb-8 flex items-center justify-between relative z-10">
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