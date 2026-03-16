"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, MinusCircle, ArrowLeft } from "lucide-react";

export default function DetailedReviewPage({ params }: { params: Promise<{ resultId: string }> }) {
    const { resultId } = use(params);
    const [resultData, setResultData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`/api/tests/results/${resultId}`);
                setResultData(res.data);
            } catch (err) {
                console.error("Failed to fetch result for review", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [resultId]);

    if (loading) return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Review Mode...</p>
        </div>
    );

    if (!resultData) return <div className="p-10 text-center">Data unavailable.</div>;

    const test = resultData.test;
    const userAnswers = resultData.answers;

    return (
        <main className="h-screen w-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 shrink-0">
                <div>
                    <h1 className="text-lg md:text-xl font-black text-[#0F172A] leading-none">Review Mode</h1>
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                        {test.title}
                    </span>
                </div>
                <Link
                    href={`/test-result/${resultId}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                    <ArrowLeft size={14} /> Back to Summary
                </Link>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
                <div className="max-w-3xl mx-auto space-y-8 pb-24">
                    {test.questions.map((q: any, idx: number) => {
                        // Find what the user submitted for this specific question
                        const userAnswerRecord = userAnswers.find((a: any) => a.questionId.toString() === q._id.toString());
                        const isSkipped = !userAnswerRecord || userAnswerRecord.selectedOption === null;
                        const isCorrect = userAnswerRecord ? userAnswerRecord.isCorrect : false;

                        return (
                            <div key={q._id} className={`bg-white border-2 rounded-[2rem] p-8 shadow-sm 
                                ${isCorrect ? 'border-emerald-100' : isSkipped ? 'border-slate-200' : 'border-red-100'}`}>

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-8 bg-slate-100 text-[#0F172A] rounded-lg flex items-center justify-center font-black text-xs">
                                        {idx + 1}
                                    </span>
                                    {isCorrect ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black uppercase tracking-widest">
                                            <CheckCircle2 size={12} /> Correct
                                        </span>
                                    ) : isSkipped ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest">
                                            <MinusCircle size={12} /> Skipped
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-md text-[10px] font-black uppercase tracking-widest">
                                            <XCircle size={12} /> Incorrect
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-[#0F172A] mb-8 leading-relaxed">
                                    {q.questionText}
                                </h2>

                                <div className="grid gap-3">
                                    {/* Note: We show original option order here for clarity during review */}
                                    {q.options.map((optText: string, optIdx: number) => {
                                        const isActualCorrectAnswer = optIdx === q.correctAnswer;
                                        const isUserSelectedAnswer = userAnswerRecord && optIdx === userAnswerRecord.selectedOption;

                                        let borderStyle = "border-slate-100 bg-white";
                                        let icon = null;

                                        if (isActualCorrectAnswer) {
                                            borderStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-sm";
                                            icon = <CheckCircle2 className="text-emerald-500" size={20} />;
                                        } else if (isUserSelectedAnswer && !isActualCorrectAnswer) {
                                            borderStyle = "border-red-500 bg-red-50 text-red-900";
                                            icon = <XCircle className="text-red-500" size={20} />;
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                className={`text-left w-full p-5 rounded-2xl border-2 font-semibold flex items-center justify-between ${borderStyle}`}
                                            >
                                                <span className={isUserSelectedAnswer && !isActualCorrectAnswer ? 'line-through opacity-70' : ''}>
                                                    {optText}
                                                </span>
                                                {icon && <div className="shrink-0 ml-4">{icon}</div>}
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