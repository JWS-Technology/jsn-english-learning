"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, MinusCircle, ArrowLeft, Lock } from "lucide-react";

export default function DetailedReviewPage({ params }: { params: Promise<{ resultId: string }> }) {
    const { resultId } = use(params);
    const [resultData, setResultData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [paymentError, setPaymentError] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [authRes, resultRes] = await Promise.all([
                    axios.get("/api/auth/me"),
                    axios.get(`/api/tests/results/${resultId}`)
                ]);

                const currentUser = authRes.data.user;
                setUser(currentUser);

                // ✅ Schema Access Check
                if (currentUser?.role !== 'admin' && !currentUser?.access?.tests) {
                    setPaymentError(true);
                    setLoading(false);
                    return;
                }

                setResultData(resultRes.data);
            } catch (err) {
                console.error("Failed to fetch review data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [resultId]);

    if (loading) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Review Mode...</p>
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
                Your account does not have permission to review answers. Please upgrade your account.
            </p>
            <Link href="/online-tests" className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-slate-900/10">
                Return to Dashboard
            </Link>
        </div>
    );

    if (!resultData) return <div className="p-10 text-center font-bold text-slate-500">Data unavailable.</div>;

    const test = resultData.test;
    const userAnswers = resultData.answers;

    return (
        <main className="h-[100dvh] w-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
            <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-slate-200 z-50 shrink-0 shadow-sm">
                <div>
                    <h1 className="text-lg md:text-xl font-black text-[#0F172A] leading-none mb-1">Review Mode</h1>
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 line-clamp-1">
                        {test.title}
                    </span>
                </div>

                {user?.role === "admin" ? (
                    <Link href={`/admin/tests/${test._id}/results`} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all">
                        <ArrowLeft size={16} /> <span className="hidden sm:inline">Leaderboard</span>
                    </Link>
                ) : (
                    <Link href={`/test-result/${resultId}`} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all">
                        <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to Summary</span>
                    </Link>
                )}
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                <div className="max-w-3xl mx-auto space-y-6 pb-24">
                    {test.questions.map((q: any, idx: number) => {
                        const userAnswerRecord = userAnswers.find((a: any) => a.questionId.toString() === q._id.toString());
                        const isSkipped = !userAnswerRecord || userAnswerRecord.selectedOption === null;
                        const isCorrect = userAnswerRecord ? userAnswerRecord.isCorrect : false;

                        return (
                            <div key={q._id} className={`bg-white border-2 rounded-[2rem] p-6 md:p-8 shadow-sm transition-all
                                ${isCorrect ? 'border-emerald-100' : isSkipped ? 'border-slate-200' : 'border-red-100'}`}>

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 bg-[#0F172A] text-white rounded-lg flex items-center justify-center font-black text-xs shadow-sm">
                                        {idx + 1}
                                    </span>
                                    {isCorrect ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                            <CheckCircle2 size={12} /> Correct
                                        </span>
                                    ) : isSkipped ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                            <MinusCircle size={12} /> Skipped
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">
                                            <XCircle size={12} /> Incorrect
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-lg md:text-xl font-bold text-[#0F172A] mb-8 leading-relaxed">
                                    {q.questionText}
                                </h2>

                                <div className="grid gap-3">
                                    {q.options.map((optText: string, optIdx: number) => {
                                        const isActualCorrectAnswer = optIdx === q.correctAnswer;
                                        const isUserSelectedAnswer = userAnswerRecord && optIdx === userAnswerRecord.selectedOption;

                                        let borderStyle = "border-slate-100 bg-slate-50 text-slate-600";
                                        let icon = null;

                                        if (isActualCorrectAnswer) {
                                            borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500";
                                            icon = <CheckCircle2 className="text-emerald-500" size={20} />;
                                        } else if (isUserSelectedAnswer && !isActualCorrectAnswer) {
                                            borderStyle = "border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500";
                                            icon = <XCircle className="text-red-500" size={20} />;
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                className={`text-left w-full p-4 md:p-5 rounded-2xl border-2 font-semibold flex items-center justify-between transition-all ${borderStyle}`}
                                            >
                                                <span className={`${isUserSelectedAnswer && !isActualCorrectAnswer ? 'line-through opacity-70' : ''} pr-4 leading-relaxed`}>
                                                    {optText}
                                                </span>
                                                {icon && <div className="shrink-0 ml-2">{icon}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}