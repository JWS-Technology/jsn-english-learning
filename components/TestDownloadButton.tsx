"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Download, FileText, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

interface TestDownloadButtonProps {
    testId: string;
    title: string;
    examType: string;
    subject: string;
    user: any;
}

export default function TestDownloadButton({ testId, title, examType, subject, user }: TestDownloadButtonProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadTestPDF = async (e: React.MouseEvent, withAnswers: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);

        try {
            setIsDownloading(true);

            const res = await axios.get(`/api/admin/tests/${testId}`);
            const fullTest = res.data;

            if (!fullTest.questions || fullTest.questions.length === 0) {
                alert("No questions found for this test.");
                setIsDownloading(false);
                return;
            }

            const doc = new jsPDF();
            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 40;

            const drawPageBackground = (isFirstPage: boolean) => {
                // Page Border
                doc.setDrawColor(15, 23, 42);
                doc.setLineWidth(0.5);
                doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

                // ✅ Watermark - properly centered and diagonal using transform
                doc.saveGraphicsState();
                (doc as any).setGState(new (doc as any).GState({ opacity: 0.12 }));
                doc.setTextColor(15, 23, 42);
                doc.setFont("times", "bold"); // ✅ Changed to times

                // Line 1: Institution name — centered on page, rotated 45°
                doc.setFontSize(42);
                doc.text(
                    "JSN ENGLISH LEARNING",
                    pageWidth / 2,
                    pageHeight / 2 - 8,
                    { angle: 45, align: "center" }
                );

                // Line 2: Phone number — slightly below, same angle
                doc.setFontSize(35);
                doc.text(
                    "+91 98432 87913",
                    pageWidth / 2,
                    pageHeight / 2 + 12,
                    { angle: 45, align: "center" }
                );

                doc.restoreGraphicsState();

                // Footer
                doc.setTextColor(100, 116, 139);
                doc.setFontSize(9);
                doc.setFont("times", "bold"); // ✅ Changed to times
                doc.text("Dr. S. Jerald Sagaya Nathan - 9843287913", 15, pageHeight - 15);
                doc.text(`Page ${(doc as any).internal.getNumberOfPages()}`, pageWidth - 15, pageHeight - 15, { align: "right" });

                // Header
                if (isFirstPage) {
                    doc.setTextColor(15, 23, 42);
                    doc.setFontSize(14);
                    doc.setFont("times", "bold"); // ✅ Changed to times
                    doc.text(`${examType.toUpperCase()} ENGLISH`, pageWidth / 2, 22, { align: "center" });

                    const documentType = withAnswers ? "Answer Key" : "Question Paper";
                    doc.setFontSize(11);
                    doc.setFont("times", "normal"); // ✅ Changed to times
                    doc.text(`${subject} - ${title} (${documentType})`, pageWidth / 2, 28, { align: "center" });

                    doc.setDrawColor(200, 200, 200);
                    doc.line(15, 32, pageWidth - 15, 32);
                }
            };

            drawPageBackground(true);

            fullTest.questions.forEach((q: any, index: number) => {
                if (yPos > pageHeight - 40) {
                    doc.addPage();
                    drawPageBackground(false);
                    yPos = 25;
                }

                // Question text — bold, normal letter spacing
                doc.setFont("times", "bold"); // ✅ Changed to times
                doc.setTextColor(15, 23, 42);
                doc.setFontSize(10.5);
                const qText = `${index + 1}. ${q.questionText}`;
                const qLines = doc.splitTextToSize(qText, pageWidth - 30);
                doc.text(qLines, 15, yPos);
                yPos += (qLines.length * 6) + 2;

                q.options.forEach((opt: string, optIndex: number) => {
                    if (yPos > pageHeight - 30) {
                        doc.addPage();
                        drawPageBackground(false);
                        yPos = 25;
                    }

                    const isCorrect = q.correctAnswer === optIndex;
                    const letter = String.fromCharCode(65 + optIndex);

                    // Options — normal weight, bold only for correct answer in answer key
                    if (isCorrect && withAnswers) {
                        doc.setFont("times", "bold"); // ✅ Changed to times
                        doc.setTextColor(22, 163, 74); // Green for correct
                    } else {
                        doc.setFont("times", "normal"); // ✅ Changed to times
                        doc.setTextColor(71, 85, 105); // Slate
                    }

                    doc.setFontSize(10); // Slightly smaller than question for visual hierarchy

                    const baseOptText = opt.startsWith(`${letter})`) ? opt : `${letter}) ${opt}`;
                    const optText = (isCorrect && withAnswers) ? `${baseOptText}` : baseOptText;

                    const optLines = doc.splitTextToSize(optText, pageWidth - 35);
                    doc.text(optLines, 20, yPos);

                    yPos += (optLines.length * 5) + 2;
                });

                yPos += 6;
            });

            const fileNameSuffix = withAnswers ? "Answer_Key" : "Question_Paper";
            doc.save(`${title.replace(/\s+/g, '_')}_${fileNameSuffix}.pdf`);

        } catch (error) {
            console.error("Download Error:", error);
            alert("Failed to download document.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            router.push(`/login?redirect=/online-tests`);
            return;
        }

        if (user.role !== 'admin' && !user.access?.tests) {
            alert("Premium Access Required: You need an approved Test Series account to download test papers. Please contact the administrator.");
            return;
        }

        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-6 right-6 z-20">
            {/* Download Button */}
            <button
                onClick={handleToggle}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm"
                title="Download Options"
            >
                {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-20"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-12 right-0 w-56 bg-white border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-2xl p-2 z-30 flex flex-col gap-1"
                        >
                            <button
                                onClick={(e) => downloadTestPDF(e, false)}
                                className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors group/btn"
                            >
                                <FileText className="w-4 h-4 text-slate-400 group-hover/btn:text-slate-600" />
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-700">Question Paper</div>
                                    <div className="text-[9px] font-medium text-slate-400">Without answers</div>
                                </div>
                            </button>

                            <button
                                onClick={(e) => downloadTestPDF(e, true)}
                                className="flex items-center gap-3 px-4 py-3 text-left hover:bg-emerald-50 rounded-xl transition-colors group/btn"
                            >
                                <CheckSquare className="w-4 h-4 text-emerald-400 group-hover/btn:text-emerald-600" />
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Answer Key</div>
                                    <div className="text-[9px] font-medium text-emerald-500/80">With correct answers</div>
                                </div>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}