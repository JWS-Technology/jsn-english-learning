"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, X, CheckCircle2, Loader2, PlayCircle, Image as ImageIcon, Camera } from "lucide-react";

export default function GalleryUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [mediaType, setMediaType] = useState<"image" | "video" | "screenshot">("image");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return setMessage("Please provide a title and file.");

        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("mediaType", mediaType);

        try {
            await axios.post("/api/admin/gallery", formData);
            setMessage("Upload successful!");
            setFile(null);
            setTitle("");
            onUploadSuccess(); // Refresh the list
        } catch (error) {
            setMessage("Upload failed. Check file size.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Upload className="text-blue-600" /> New Success Upload
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Success Title (e.g. PG TRB 2026 Batch)</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-900"
                        placeholder="Enter a descriptive title"
                    />
                </div>

                {/* Media Type Selector */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: "image", icon: ImageIcon, label: "Photo" },
                        { id: "video", icon: PlayCircle, label: "Video" },
                        { id: "screenshot", icon: Camera, label: "Result" },
                    ].map((type) => (
                        <button
                            key={type.id}
                            type="button"
                            onClick={() => setMediaType(type.id as any)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${mediaType === type.id
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"
                                }`}
                        >
                            <type.icon className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                        </button>
                    ))}
                </div>

                {/* File Dropzone */}
                <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
                    <input
                        type="file"
                        accept={mediaType === "video" ? "video/mp4" : "image/*"}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {file ? (
                        <div className="flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold truncate max-w-[200px]">{file.name}</span>
                            <button type="button" onClick={() => setFile(null)}><X className="w-4 h-4" /></button>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Select {mediaType.toUpperCase()}
                            </p>
                        </>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    disabled={uploading}
                    className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${uploading ? "bg-slate-100 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20"
                        }`}
                >
                    {uploading ? (
                        <><Loader2 className="animate-spin" /> Uploading to S3...</>
                    ) : (
                        "Add to Homepage"
                    )}
                </button>

                {message && (
                    <p className={`text-center text-xs font-bold mt-4 uppercase tracking-widest ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}