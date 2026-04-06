"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Lock, BookOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import TestDownloadButton from "@/components/TestDownloadButton";

export default function TestCard({ item, user, index }: { item: any, user: any, index: number }) {
    const href = user ? `/take-test/${item._id}` : `/login?redirect=/take-test/${item._id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            layout
        >
            <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all hover:border-blue-200 hover:shadow-2xl flex flex-col h-full relative overflow-visible">

                {/* Absolute positioned download button */}
                <TestDownloadButton
                    testId={item._id}
                    title={item.title}
                    examType={item.examType}
                    subject={item.subject}
                    user={user}
                />

                <Link href={href} className="flex flex-col h-full">
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
            </div>
        </motion.div>
    );
}