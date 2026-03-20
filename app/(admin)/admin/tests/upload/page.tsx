"use client";

import { useState, useRef } from "react";
import axios from "axios";
import {
    Upload,
    FileText,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
    Type,
    Book,
    Clock,
    ShieldCheck,
    FileUp,
    Zap,
    Download
} from "lucide-react";
// ✅ IMPORT THE DOCX LIBRARIES
import {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    Table, TableRow, TableCell, WidthType
} from "docx";
import { saveAs } from "file-saver";

export default function AdminTestUploadPage() {
    const [form, setForm] = useState({
        title: "",
        subject: "",
        examType: "UG TRB",
        durationInMinutes: "",
        isPremium: true,
    });

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // ✅ FIX: Generates Word Tables exactly formatted for the backend parser
    const generateAndDownloadTemplate = async () => {

        // Helper function to create a standardized question table
        const createQuestionTable = (questionText: string, options: { text: string, grade: string }[]) => {
            return new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    // Row 0: The Question
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ text: questionText, style: "Strong" })],
                                columnSpan: 3,
                            }),
                        ],
                    }),
                    // Row 1: The Header Row (Required by backend regex)
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ text: "ID", style: "Strong" })] }),
                            new TableCell({ children: [new Paragraph({ text: "Answers", style: "Strong" })] }),
                            new TableCell({ children: [new Paragraph({ text: "Grade", style: "Strong" })] }),
                        ],
                    }),
                    // Rows 2+: The Options
                    ...options.map(opt => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("")] }), // Empty ID column
                            new TableCell({ children: [new Paragraph(opt.text)] }), // The answer text
                            new TableCell({ children: [new Paragraph(opt.grade)] }), // The grade (100 = correct)
                        ],
                    }))
                ]
            });
        };

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            text: "JSN English Learning - Standard CBT Upload Template",
                            heading: HeadingLevel.HEADING_2,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            text: "Instructions: Copy the tables below for each question. Place the question text in the top row. Put your answers in the 'Answers' column. Type '100' in the 'Grade' column next to the correct answer. Keep other grades blank or '0'.",
                            spacing: { after: 400 },
                        }),

                        // --- Table 1 ---
                        createQuestionTable("Who is the author of the poem 'Kubla Khan'?", [
                            { text: "A) William Wordsworth", grade: "0" },
                            { text: "B) Samuel Taylor Coleridge", grade: "100" },
                            { text: "C) John Keats", grade: "0" },
                            { text: "D) Lord Byron", grade: "0" },
                        ]),
                        new Paragraph({ text: "", spacing: { after: 400 } }), // Blank spacing between tables

                        // --- Table 2 ---
                        createQuestionTable("In which year was the Lyrical Ballads published?", [
                            { text: "A) 1798", grade: "100" },
                            { text: "B) 1800", grade: "0" },
                            { text: "C) 1789", grade: "0" },
                            { text: "D) 1802", grade: "0" },
                        ]),
                        new Paragraph({ text: "", spacing: { after: 400 } }),

                        // --- Table 3 ---
                        createQuestionTable("Which of the following is an element of a Shakespearean sonnet?", [
                            { text: "A) ABBA ABBA CDE CDE rhyme scheme", grade: "0" },
                            { text: "B) Written in dactylic hexameter", grade: "0" },
                            { text: "C) Ends with a rhyming couplet", grade: "100" },
                            { text: "D) Contains exactly 12 lines", grade: "0" },
                        ]),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "JSN_Test_Template.docx");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!file) {
            setError("Please select a Word document (.docx) to proceed.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("subject", form.subject);
            formData.append("examType", form.examType);
            formData.append("durationInMinutes", form.durationInMinutes);
            formData.append("isPremium", form.isPremium.toString());
            formData.append("file", file);

            await axios.post("/api/admin/tests/upload", formData);

            setSuccess("Test deployed successfully to the CBT engine!");

            setForm({ title: "", subject: "", examType: "UG TRB", durationInMinutes: "", isPremium: true });
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (err: any) {
            setError(err?.response?.data?.message || "Upload failed. Check server connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 md:p-6 max-w-3xl mx-auto">

            <div className="w-full bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">

                {/* --- HEADER --- */}
                <div className="bg-[#0F172A] px-8 py-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">CBT Registry</h1>
                        </div>
                        <ShieldCheck className="w-12 h-12 text-blue-500 opacity-80" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-7">

                    {/* Title & Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Test Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Unit 1: Mock Test"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit</label>
                            <div className="relative">
                                <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder="e.g. Unit I"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Exam Type & Settings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                            <div className="flex gap-2">
                                {["UG TRB", "PG TRB", "NET", "SET"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setForm({ ...form, examType: type })}
                                        className={`flex-1 py-3.5 rounded-xl font-black text-[10px] tracking-widest transition-all border ${form.examType === type
                                            ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg'
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 col-span-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration (Mins)</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                                <input
                                    required
                                    type="number"
                                    value={form.durationInMinutes}
                                    onChange={(e) => setForm({ ...form, durationInMinutes: e.target.value })}
                                    placeholder="e.g. 60"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Premium Toggle */}
                    <div className="flex items-center justify-between p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                        <div>
                            <p className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-600" /> Premium Test Gate
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">Require users to have "isPaidUser" status to access.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={form.isPremium}
                                onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    {/* File Upload Container with GENERATE Template Button */}
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 ml-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Test Template (Word .docx)</label>
                            <button
                                type="button"
                                onClick={generateAndDownloadTemplate}
                                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                                <Download size={14} /> Generate & Download Template
                            </button>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`group border-2 border-dashed rounded-[2.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center
                                ${file ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/30'}`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />

                            {file ? (
                                <div className="flex items-center gap-4 animate-in fade-in zoom-in-95">
                                    <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-200">
                                        <FileText className="text-white w-7 h-7" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-[#0F172A] truncate max-w-[240px]">{file.name}</p>
                                        <p className="text-[10px] font-black text-blue-600 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="ml-4 p-2 hover:bg-blue-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-blue-700" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-sm border border-slate-100">
                                        <FileUp className="w-7 h-7 text-blue-500" />
                                    </div>
                                    <p className="text-sm font-black text-[#0F172A]">Drop QUIZ Template here</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest text-center">
                                        Ensure format matches: Question, Answers, Grade (100 = Correct)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Messages */}
                    <AnimateMessages error={error} success={success} />

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Parsing Document & Deploying...
                            </span>
                        ) : (
                            "Upload Test"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

function AnimateMessages({ error, success }: { error: string, success: string }) {
    if (error) return (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-100 animate-in slide-in-from-bottom-2">
            <AlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
    );
    if (success) return (
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 animate-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" /> {success}
        </div>
    );
    return null;
}