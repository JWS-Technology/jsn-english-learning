import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";

export default function PDFPreview({ url }: { url: string }) {
    const [iframeLoading, setIframeLoading] = useState(true);

    return (
        <div className="h-full p-4 md:p-8 flex flex-col">
            <div className="bg-white rounded-[2.5rem] shadow-2xl flex-1 overflow-hidden border border-slate-200 relative min-h-[500px]">

                {/* Mobile Floating Access */}
                <div className="lg:hidden absolute bottom-6 left-6 right-6 z-20 bg-[#0F172A]/90 backdrop-blur p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Digital Sample</span>
                    <a href={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`} target="_blank" className="text-[10px] font-black text-orange-500 uppercase flex items-center gap-2">
                        Fullscreen <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                {iframeLoading && (
                    <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-4">Rendering Preview...</p>
                    </div>
                )}

                <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                    className={`w-full h-full border-none transition-opacity duration-700 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIframeLoading(false)}
                />
            </div>
        </div>
    );
}