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
    AlignLeft,
    IndianRupee, // Added for Price icon
    ShieldCheck
} from "lucide-react";

export default function AdminMaterialUploadPage() {
    const [form, setForm] = useState({
        title: "",
        subject: "",
        examType: "TRB",
        description: "",
        price: "",
        totalPages: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!file) {
            setError("Please select a PDF file to proceed.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("subject", form.subject);
            formData.append("examType", form.examType);
            formData.append("description", form.description);
            formData.append("price", form.price); // ✅ NEW: Price appended
            formData.append("totalPages", form.totalPages);
            formData.append("file", file);

            // API endpoint handles S3 upload and DB entry
            await axios.post("/api/materials", formData);

            setSuccess("Material published successfully to the student portal!");

            // Reset form
            setForm({ title: "", subject: "", examType: "TRB", description: "", price: "", totalPages: "" });
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (err: any) {
            setError(err?.response?.data?.message || "Upload failed. Check server connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 py-20">
            <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">

                {/* --- HEADER --- */}
                <div className="bg-[#0F172A] px-10 py-12 text-white relative">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">Library Registry</h1>
                            <p className="text-slate-400 mt-2 font-medium">Provision new TRB/NET/SET academic materials.</p>
                        </div>
                        <ShieldCheck className="w-12 h-12 text-orange-500 opacity-80" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-7">

                    {/* Title & Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Material Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Unit 1: Chaucer"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                            <div className="relative">
                                <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder="e.g. British Literature"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ✅ NEW: Exam Type & Price Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                            <div className="flex gap-2">
                                {["TRB", "NET", "SET"].map((type) => (
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
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (Rupees)</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                                <input
                                    required
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    placeholder="e.g. 499"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Pages</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                                <input
                                    required
                                    type="number"
                                    value={form.totalPages}
                                    onChange={(e) => setForm({ ...form, totalPages: e.target.value })}
                                    placeholder="e.g. 120"
                                    className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:border-orange-500 outline-none font-bold text-[#0F172A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Details about this courier-delivered package..."
                                rows={3}
                                className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-bold text-[#0F172A] resize-none"
                            />
                        </div>
                    </div>

                    {/* File Upload Container */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sample PDF (Digital Preview)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`group border-2 border-dashed rounded-[2.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center
                                ${file ? 'border-orange-200 bg-orange-50/20' : 'border-slate-100 hover:border-orange-500 hover:bg-orange-50/10'}`}
                        >
                            <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)} />

                            {file ? (
                                <div className="flex items-center gap-4 animate-in fade-in zoom-in-95">
                                    <div className="bg-orange-500 p-3 rounded-2xl shadow-xl shadow-orange-200">
                                        <FileText className="text-white w-7 h-7" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-[#0F172A] truncate max-w-[240px]">{file.name}</p>
                                        <p className="text-[10px] font-black text-orange-600 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="ml-4 p-2 hover:bg-orange-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-orange-700" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        <Upload className="w-7 h-7 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-black text-[#0F172A]">Drop study sample here</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">PDF format only</p>
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
                        className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 shadow-xl shadow-orange-950/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Registering Material...
                            </span>
                        ) : (
                            "Publish to Library"
                        )}
                    </button>
                </form>
            </div>
        </main>
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