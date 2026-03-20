"use client";

import { useEffect, useState, use, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert, ChevronRight, ChevronLeft, CheckCircle2, Clock, Grid3X3, Lock } from "lucide-react";
import Link from "next/link";

const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function ActiveTestPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [testData, setTestData] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Ref for the mobile scrollable palette
    const mobilePaletteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const verifyAccessAndFetch = async () => {
            try {
                const authRes = await axios.get("/api/auth/me");
                const currentUser = authRes.data.user;

                if (!currentUser) {
                    setAuthError(true);
                    return router.replace(`/login?redirect=/take-test/${id}`);
                }

                if (!currentUser.isPaidUser) {
                    setPaymentError(true);
                    setLoading(false);
                    return;
                }

                setUser(currentUser);

                const testRes = await axios.get(`/api/tests/${id}`);
                const data = testRes.data;
                setTestData(data);
                setTimeLeft(data.durationInMinutes * 60);
                setIsTimerRunning(true);

                const processedQuestions = data.questions.map((q: any) => {
                    const optionsWithIndex = q.options.map((opt: string, idx: number) => ({
                        text: opt, originalIndex: idx
                    }));
                    return { ...q, shuffledOptions: shuffleArray(optionsWithIndex) };
                });

                setQuestions(shuffleArray(processedQuestions));
            } catch (err) {
                console.error("Test fetch failed");
                setAuthError(true);
            } finally {
                setLoading(false);
            }
        };
        verifyAccessAndFetch();
    }, [id, router]);

    useEffect(() => {
        if (!isTimerRunning || timeLeft <= 0) return;
        const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(intervalId);
    }, [isTimerRunning, timeLeft]);

    useEffect(() => {
        if (isTimerRunning && timeLeft === 0) submitTest(true);
    }, [timeLeft, isTimerRunning]);

    // Scroll mobile palette to keep active question visible
    useEffect(() => {
        if (mobilePaletteRef.current) {
            const activeButton = mobilePaletteRef.current.children[currentIndex] as HTMLElement;
            if (activeButton) {
                activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [currentIndex]);

    const handleSelectOption = (questionId: string, originalIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: originalIndex }));
    };

    const submitTest = async (isAutoSubmit = false) => {
        if (!isAutoSubmit && !confirm("Are you sure you want to submit your test?")) return;

        setIsTimerRunning(false);
        setSubmitting(true);

        try {
            const res = await axios.post("/api/tests/submit", {
                testId: id,
                userId: user._id || user.id,
                answers: answers
            });
            router.replace(`/test-result/${res.data.resultId}`);
        } catch (error) {
            alert("Failed to submit test. Please check your connection.");
            setIsTimerRunning(true);
            setSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // --- RENDER SCREENS ---

    if (loading) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Exam Engine...</p>
        </div>
    );

    if (authError) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2">Access Restricted</h1>
        </div>
    );

    if (paymentError) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-4">Premium Access Required</h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
                Your account has not been approved for CBT mock exams yet. Please contact the administrator to upgrade your account.
            </p>
            <Link href="/online-tests" className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                Return to Dashboard
            </Link>
        </div>
    );

    const currentQuestion = questions[currentIndex];

    return (
        <main className="h-[100dvh] w-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-slate-200 z-50 shrink-0 shadow-sm">
                <div className="flex-1 truncate pr-4">
                    <h1 className="text-base md:text-xl font-black text-[#0F172A] leading-tight truncate">{testData.title}</h1>
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-orange-500">
                        {testData.examType} • {testData.subject}
                    </span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm font-mono font-bold shadow-sm transition-colors shrink-0
                    ${timeLeft < 300 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
                    <Clock size={16} /> {formatTime(timeLeft)}
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">

                {/* --- LEFT SIDEBAR: Question Palette (Desktop Only) --- */}
                <aside className="hidden md:flex w-80 bg-white border-r border-slate-200 p-6 overflow-y-auto shrink-0 flex-col">
                    <div className="flex items-center gap-2 mb-6 text-slate-400">
                        <Grid3X3 size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Question Palette</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-8">
                        {questions.map((q, idx) => {
                            const isAnswered = answers[q._id] !== undefined;
                            const isCurrent = currentIndex === idx;
                            return (
                                <button
                                    key={q._id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-full aspect-square rounded-xl text-xs font-black transition-all flex items-center justify-center border-2
                                        ${isCurrent ? 'border-[#0F172A] ring-4 text-amber-500 bg-amber-100 ring-slate-100' :
                                            isAnswered ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100'}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-auto bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            <span>Answered</span>
                            <span className="text-emerald-500">{Object.keys(answers).length}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>Pending</span>
                            <span className="text-orange-500">{questions.length - Object.keys(answers).length}</span>
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT PANEL: Active Question Area --- */}
                <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F8FAFC]">

                    {/* STICKY QUESTION BLOCK */}
                    <div className="bg-white border-b border-slate-200 px-4 py-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] shrink-0 max-h-[40vh] overflow-y-auto">
                        <div className="max-w-3xl mx-auto flex gap-4">
                            {/* Question Number Badge */}
                            <span className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-[#0F172A] text-white rounded-xl flex items-center justify-center font-black text-sm">
                                {currentIndex + 1}
                            </span>
                            {/* Question Text */}
                            <h2 className="text-lg md:text-2xl font-bold text-[#0F172A] leading-relaxed mt-0.5 md:mt-1">
                                {currentQuestion.questionText}
                            </h2>
                        </div>
                    </div>

                    {/* SCROLLABLE OPTIONS BLOCK */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="grid gap-3 md:gap-4">
                                {currentQuestion.shuffledOptions.map((opt: any, i: number) => {
                                    const isSelected = answers[currentQuestion._id] === opt.originalIndex;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleSelectOption(currentQuestion._id, opt.originalIndex)}
                                            className={`text-left w-full p-4 md:p-6 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between group
                                                ${isSelected ? 'border-orange-500 bg-orange-50/50 text-orange-900 shadow-md' : 'border-slate-100 bg-white hover:border-orange-200 hover:bg-slate-50 text-slate-700'}`}
                                        >
                                            <span className="text-sm md:text-base pr-4 leading-relaxed">{opt.text}</span>

                                            {/* Custom Radio Circle */}
                                            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                                                ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-300 group-hover:border-orange-300'}`}>
                                                {isSelected && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ✅ NEW: BOTTOM NAVIGATION & MOBILE PALETTE */}
                    <div className="bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-40 shrink-0">

                        {/* MOBILE QUESTION PALETTE (Horizontal Scroll, hidden on desktop) */}
                        <div
                            ref={mobilePaletteRef}
                            className="md:hidden flex items-center gap-2 px-4 py-3 overflow-x-auto bg-slate-50 border-b border-slate-100 hide-scrollbar"
                        >
                            {questions.map((q, idx) => {
                                const isAnswered = answers[q._id] !== undefined;
                                const isCurrent = currentIndex === idx;
                                return (
                                    <button
                                        key={q._id}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-10 h-10 shrink-0 rounded-xl text-xs font-black transition-all flex items-center justify-center border-2
                                            ${isCurrent ? 'border-[#0F172A] ring-2 text-amber-500 bg-amber-100 ring-slate-100' :
                                                isAnswered ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        {/* PREV / NEXT / SUBMIT BUTTONS */}
                        <div className="px-4 py-4 md:px-8 md:py-6">
                            <div className="max-w-3xl mx-auto flex items-center justify-between">
                                <button
                                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentIndex === 0}
                                    className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                                >
                                    <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span>
                                </button>

                                {currentIndex === questions.length - 1 ? (
                                    <button
                                        onClick={() => submitTest()}
                                        disabled={submitting}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 size={16} />}
                                        {submitting ? 'Grading...' : 'Submit'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest bg-[#0F172A] text-white hover:bg-black shadow-lg shadow-slate-900/20 transition-all"
                                    >
                                        <span className="hidden sm:inline">Next</span> <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Custom CSS to hide scrollbar but keep functionality for the horizontal strip */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}