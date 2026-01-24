"use client";

import { useState } from "react";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";

export default function DownloadButton({ pdfKey, title }: { pdfKey: string, title: string }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/materials/download?key=${encodeURIComponent(pdfKey)}`);
            if (res.data.url) {
                window.open(res.data.url, "_blank", "noopener,noreferrer");
            }
        } catch (err) {
            alert("Download failed. Please refresh.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            {loading ? "Preparing..." : "Download PDF"}
        </button>
    );
}