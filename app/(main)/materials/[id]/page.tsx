"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Loader2, ChevronLeft } from "lucide-react";
import PDFPreview from "@/components/PDFPreview";
import OrderSidebar from "@/components/OrderSidebar";

export default function MaterialDetail() {
    const { id } = useParams();
    const [material, setMaterial] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/materials/${id}`);
                setMaterial(data);

                const preview = await axios.get(
                    `/api/materials/download?key=${encodeURIComponent(data.pdfKey)}&id=${data._id}`
                );
                setPreviewUrl(preview.data.url);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchAllData();
    }, [id]);
    console.log(material)
    if (error) return notFound();

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] pt-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#0F172A]" />
            <p className="text-slate-400 font-black tracking-widest uppercase text-[10px] mt-4">Establishing Secure Stream...</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-24 md:pt-28 pb-12">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* LEFT COLUMN: NAVIGATION & PDF PREVIEW */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Integrated Back Navigation */}
                        <div className="flex items-center justify-between">
                            <Link
                                href="/materials"
                                className="group flex items-center gap-2 text-slate-400 hover:text-[#0F172A] transition-colors"
                            >
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                    <ChevronLeft size={16} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Return to Library</span>
                            </Link>

                            {/* <span className="text-[9px] font-black bg-orange-500 text-white px-3 py-1 rounded-lg uppercase shadow-lg shadow-orange-950/10">
                                {material.examType}
                            </span> */}
                        </div>

                        {/* PDF Container - Given a fixed height on desktop to prevent page jumping */}
                        <div className="h-[600px] md:h-[800px] sticky top-28">
                            <PDFPreview url={previewUrl} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ORDER SIDEBAR */}
                    <aside className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-28">
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
                            <OrderSidebar material={material} />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}