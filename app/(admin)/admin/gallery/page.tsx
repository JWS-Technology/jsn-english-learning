"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Upload,
    Trash2,
    PlayCircle,
    Image as ImageIcon,
    Camera,
    Loader2,
    Plus,
    ExternalLink,
    ShieldCheck,
    CheckCircle2,
    X,
    LayoutGrid
} from "lucide-react";
import GalleryUpload from "@/components/admin/GalleryUpload";

type GalleryItem = {
    _id: string;
    title: string;
    mediaUrl: string;
    mediaType: "image" | "video" | "screenshot";
    createdAt: string;
};

export default function AdminGalleryRegistry() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    const fetchGallery = async () => {
        try {
            const res = await axios.get("/api/admin/gallery");
            setItems(res.data || []);
        } catch (err) {
            console.error("Failed to fetch gallery");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will permanently remove the success story from the homepage and S3.")) return;
        try {
            await axios.delete(`/api/admin/gallery/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            alert("Deletion failed.");
        }
    };

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto min-h-screen">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter flex items-center gap-3">
                        Success Registry
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage student testimonials and visual proof of results.</p>
                </div>

                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2"
                >
                    {showUpload ? <X size={16} /> : <Plus size={16} />}
                    {showUpload ? "Close Registry" : "Register New Success"}
                </button>
            </div>

            {/* --- UPLOAD SECTION (CONDITIONAL) --- */}
            {showUpload && (
                <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                    <GalleryUpload onUploadSuccess={() => {
                        fetchGallery();
                        setShowUpload(false);
                    }} />
                </div>
            )}

            {/* --- CONTENT GRID --- */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Success Assets</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing success wall...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-32 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-100 text-slate-300">
                            <ImageIcon size={32} />
                        </div>
                        <h3 className="text-xl font-black text-[#0F172A]">No records found</h3>
                        <p className="text-slate-500 text-sm font-medium mt-1">Start by registering your first student testimonial.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1 bg-slate-50">
                        {items.map((item) => (
                            <div key={item._id} className="bg-white p-6 flex flex-col group transition-all hover:z-10 hover:shadow-2xl">

                                {/* Media Preview */}
                                <div className="aspect-video mb-6 rounded-[2rem] overflow-hidden bg-slate-900 relative border border-slate-100">
                                    {item.mediaType === "video" ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    ) : (
                                        <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    )}

                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black tracking-widest uppercase shadow-lg
                                            ${item.mediaType === 'video' ? 'bg-blue-600 text-white' :
                                                item.mediaType === 'image' ? 'bg-orange-500 text-white' :
                                                    'bg-emerald-500 text-white'}`}>
                                            {item.mediaType}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-black text-[#0F172A] leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Success
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex gap-1">
                                        <a
                                            href={item.mediaUrl}
                                            target="_blank"
                                            className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-8 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        &copy; 2026 JWS Technologies Security Protocol
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                        <CheckCircle2 size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">S3 Encrypted Connection</span>
                    </div>
                </div>
            </div>
        </div>
    );
}