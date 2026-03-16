"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Search,
    Trash2,
    FileText,
    MoreVertical,
    Download,
    ExternalLink,
    Filter,
    Loader2
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
        <main className="min-h-screen bg-[#f8fafc] py-12 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Material Library</h1>
                        <p className="text-gray-500 mt-1">Manage and monitor all uploaded TRB study resources.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search title or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            <p className="text-sm text-gray-500 font-medium">Syncing library...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-500">{error}</div>
                    ) : filteredMaterials.length === 0 ? (
                        <div className="py-24 text-center">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No materials found</h3>
                            <p className="text-gray-500">Try adjusting your search or upload a new file.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Document</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Exam Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredMaterials.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <FileText className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 leading-none">{item.title}</p>
                                                        <p className="text-xs text-gray-400 mt-1.5 uppercase font-medium tracking-wide">PDF Document</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm text-gray-600 font-medium">{item.subject}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase
                                                    ${item.examType === 'TRB' ? 'bg-orange-50 text-orange-600' :
                                                        item.examType === 'NET' ? 'bg-purple-50 text-purple-600' :
                                                            'bg-emerald-50 text-emerald-600'}`}>
                                                    {item.examType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Placeholder */}
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-medium italic">Showing {filteredMaterials.length} results</p>
                    </div>
                </div>
            </div>
        </main>
    );
}