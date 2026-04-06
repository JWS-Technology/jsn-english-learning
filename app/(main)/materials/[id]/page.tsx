"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Loader2, ChevronLeft } from "lucide-react";
import PDFPreview from "@/components/materials/PDFPreview";
import OrderSidebar from "@/components/materials/OrderSidebar";

export default function MaterialDetail() {
    const { id } = useParams();
    const [material, setMaterial] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchAllData = async () => {
            try {
                const { data } = await axios.get(`/api/materials/${id}`);
                setMaterial(data);
                const preview = await axios.get(`/api/materials/download?key=${encodeURIComponent(data.pdfKey)}&id=${data._id}`);
                setPreviewUrl(preview.data.url);
            } catch (err) { setError(true); } finally { setLoading(false); }
        };
        fetchAllData();
    }, [id]);

    if (error) return notFound();
    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-[#0F172A]" />
            <p className="text-slate-400 font-black tracking-widest uppercase text-[10px] mt-4">Establishing Secure Stream...</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-24 md:pt-28 pb-12">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 w-full space-y-6">
                        <Link href="/materials" className="group flex items-center gap-2 text-slate-400 hover:text-[#0F172A]">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all"><ChevronLeft size={16} /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Return to Library</span>
                        </Link>
                        <div className="h-[600px] md:h-[800px] sticky top-28"><PDFPreview url={previewUrl} /></div>
                    </div>
                    <aside className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-28">
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden"><OrderSidebar material={material} /></div>
                    </aside>
                </div>
            </div>
        </main>
    );
}