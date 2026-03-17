"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    Search,
    Trash2,
    FileText,
    MoreVertical,
    Download,
    ExternalLink,
    Filter,
    Loader2,
    BookOpen
} from "lucide-react";

type Material = {
    _id: string;
    title: string;
    subject: string;
    examType: "TRB" | "NET" | "SET" | string;
    pdfKey: string;
};

export default function AdminMaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMaterials = async () => {
        try {
            const res = await axios.get("/api/materials");
            setMaterials(res.data || []);
        } catch (err) {
            setError("Failed to fetch library data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will remove the file from S3 and the database.")) return;
        try {
            await axios.delete(`/api/materials/${id}`);
            setMaterials((prev) => prev.filter((m) => m._id !== id));
        } catch (err) {
            alert("Deletion failed.");
        }
    };

    const filteredMaterials = materials.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Material Library</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage and monitor all uploaded TRB study resources.</p>
                </div>

                <Link href="/admin/materials/upload" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                    <BookOpen size={14} /> Upload New Material
                </Link>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">

                {/* Search Bar Row */}
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search title or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing library...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-500 font-bold">{error}</div>
                ) : filteredMaterials.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <FileText className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A]">No materials found</h3>
                        <p className="text-slate-500 text-sm font-medium">Try adjusting your search or upload a new file.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="p-6 pl-10">Document</th>
                                    <th className="p-6">Subject</th>
                                    <th className="p-6">Exam Type</th>
                                    <th className="p-6 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredMaterials.map((item) => (
                                    <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-6 pl-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#0F172A] leading-none">{item.title}</p>
                                                    <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">PDF Document</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-sm text-slate-600 font-bold">{item.subject}</span>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase border
                                                ${item.examType === 'TRB' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    item.examType === 'NET' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                        'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                                {item.examType}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right pr-10">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-100 rounded-xl transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-100 rounded-xl transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="px-10 py-5 bg-slate-50/50 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredMaterials.length} results</p>
                </div>
            </div>
        </div>
    );
}