"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Trash2,
    Loader2,
    Plus,
    ShieldCheck,
    CheckCircle2,
    X,
    LayoutGrid,
    MessageSquareQuote,
    Star,
    Quote
} from "lucide-react";

type TestimonialItem = {
    _id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    isActive: boolean;
    createdAt: string;
};

export default function AdminTestimonialRegistry() {
    const [items, setItems] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    // Form State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "JSN Aspirant",
        content: "",
        rating: 5
    });

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get("/api/testimonials");
            setItems(res.data || []);
        } catch (err) {
            console.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will permanently remove the review from the homepage.")) return;
        try {
            // Assumes you create a DELETE method in your /api/testimonials route or /api/testimonials/[id]
            await axios.delete(`/api/testimonials?id=${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            alert("Deletion failed.");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.content) {
            alert("Name and Content are required.");
            return;
        }
        setIsSubmitting(true);
        try {
            await axios.post("/api/testimonials", formData);
            await fetchTestimonials();
            setShowUpload(false);
            setFormData({ name: "", role: "JSN Aspirant", content: "", rating: 5 }); // Reset
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to save testimonial.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter flex items-center gap-3">
                        Testimonial Registry
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage student reviews, feedback, and academic excellence stories.</p>
                </div>

                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2"
                >
                    {showUpload ? <X size={16} /> : <Plus size={16} />}
                    {showUpload ? "Close Registry" : "Register New Voice"}
                </button>
            </div>

            {/* --- UPLOAD/ADD SECTION (CONDITIONAL) --- */}
            {showUpload && (
                <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleFormSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <MessageSquareQuote size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Publish New Testimonial</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Appears directly on the homepage slider</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Student Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    placeholder="e.g. John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Role / Achievement</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    placeholder="e.g. UG TRB Rank 15"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">The Review / Quote</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={4}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                                placeholder="Write the student's exact testimonial here..."
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Rating (1-5 Stars)</label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                className="w-full md:w-1/3 p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                            >
                                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                            {isSubmitting ? "Publishing..." : "Publish to Homepage"}
                        </button>
                    </form>
                </div>
            )}

            {/* --- CONTENT GRID --- */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Testimonials</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Total: {items.length}
                    </span>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing database...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-32 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-100 text-slate-300">
                            <MessageSquareQuote size={32} />
                        </div>
                        <h3 className="text-xl font-black text-[#0F172A]">No reviews published</h3>
                        <p className="text-slate-500 text-sm font-medium mt-1">Register your first student review to display on the slider.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1 bg-slate-50">
                        {items.map((item) => (
                            <div key={item._id} className="bg-white p-8 flex flex-col group transition-all hover:z-10 hover:shadow-2xl rounded-[2.5rem] border border-transparent hover:border-slate-100 relative overflow-hidden">

                                <Quote className="absolute top-6 right-6 text-slate-50 w-16 h-16 -z-0 group-hover:text-blue-50 transition-colors" />

                                <div className="relative z-10 flex-1">
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(item.rating || 5)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-black text-[#0F172A] leading-tight mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">
                                        {item.role}
                                    </p>

                                    <p className="text-sm font-medium text-slate-500 italic line-clamp-4 leading-relaxed mb-6">
                                        "{item.content}"
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl">
                                        <ShieldCheck className="w-3 h-3" /> Live on Site
                                    </p>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center group/btn"
                                        title="Delete Testimonial"
                                    >
                                        <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Bar */}
                <div className="p-8 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        &copy; 2026 JWS Technologies Security Protocol
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                        <CheckCircle2 size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">MongoDB Synced</span>
                    </div>
                </div>
            </div>
        </div>
    );
}