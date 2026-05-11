"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Youtube, PlayCircle, CheckCircle2, ArrowRight, BellRing } from "lucide-react";

export default function YouTubeClient({ videos }: { videos: any[] }) {
    const features = [
        "TRB-focused English Grammar lessons",
        "Literature explanations & critical questions",
        "Proven exam strategies and time-management tips",
        "Free, high-quality learning resources"
    ];

    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative pt-32 pb-24 px-6 bg-[#0F172A] overflow-hidden shrink-0">
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 backdrop-blur-md text-red-400"
                    >
                        <Youtube className="w-3.5 h-3.5" />
                        Official Video Channel
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6"
                    >
                        JSN English Learning <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic font-serif font-normal">
                            on YouTube.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Access free TRB preparation videos, deep-dive grammar lessons, and expert guidance directly from Dr. S. Jerald Sagaya Nathan.
                    </motion.p>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 w-full flex-1">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Video Embed with Premium Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group w-full"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative rounded-[2rem] p-2 bg-white shadow-2xl border border-slate-100">
                            <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden bg-slate-900 relative">
                                <iframe
                                    src="https://www.youtube.com/embed/gKz7aWidqRc?si=sRFtDJFMQPrmaob9"
                                    title="JSN English Learning YouTube Channel"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text + CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
                            Learn Anytime, Anywhere.
                        </h2>

                        <p className="mt-6 text-slate-500 leading-relaxed font-medium text-lg">
                            Our YouTube channel offers high-quality educational content designed specifically for TRB aspirants. Learn at your own pace with structured lessons, exam-focused explanations, and real-world insights from 13+ years of teaching experience.
                        </p>

                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-sm font-bold text-slate-700 leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="https://www.youtube.com/channel/UCNNSpJYEmcJDzQPajGWecqw"
                                target="_blank"
                                className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                <BellRing className="w-4 h-4 group-hover:animate-bounce" /> Subscribe Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- DYNAMIC LATEST VIDEOS API SECTION --- */}
            <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-4">
                            Latest Masterclasses
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Automatically fetched from the official channel. Catch up on the newest lessons.
                        </p>
                    </div>

                    {videos.length === 0 ? (
                        <div className="text-center text-slate-500 p-10 bg-white rounded-3xl border border-slate-200">
                            Unable to load videos right now. Please check back later!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {videos.map((video, idx) => {
                                const videoId = video.id.videoId;
                                const title = video.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
                                const thumbnail = video.snippet.thumbnails.high.url;
                                const date = new Date(video.snippet.publishedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                });

                                return (
                                    <motion.a
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={videoId}
                                        href={`https://www.youtube.com/watch?v=${videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                                            <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                                <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all drop-shadow-lg" />
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                                            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
                                                {date}
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                                                {title}
                                            </h3>
                                            <div className="mt-auto pt-4 border-t border-slate-100 font-semibold text-sm text-red-600 flex items-center gap-2">
                                                Watch on YouTube &rarr;
                                            </div>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}