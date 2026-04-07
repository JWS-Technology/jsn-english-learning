"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Loader2,
    Megaphone,
    Trash2,
    CheckCircle2,
    XCircle,
    Send,
    BellRing,
    LayoutTemplate
} from "lucide-react";

// Import the Schedule Editor component we just created
import ScheduleEditor from "@/components/admin/ScheduleEditor";

type Announcement = {
    _id: string;
    message: string;
    isActive: boolean;
    createdAt: string;
};

export default function AdminCommunicationsHub() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get("/api/announcements");
            setAnnouncements(res.data);
        } catch (error) {
            console.error("Failed to fetch announcements");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSubmitting(true);
        try {
            const res = await axios.post("/api/announcements", { message: newMessage });
            setAnnouncements([res.data, ...announcements]);
            setNewMessage("");
        } catch (error) {
            alert("Failed to publish announcement");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setAnnouncements(announcements.map(a =>
                a._id === id ? { ...a, isActive: !currentStatus } : a
            ));
            await axios.patch(`/api/announcements/${id}`, { isActive: !currentStatus });
        } catch (error) {
            alert("Failed to update status");
            fetchAnnouncements();
        }
    };

    const deleteAnnouncement = async (id: string) => {
        if (!confirm("Are you sure you want to permanently delete this announcement?")) return;
        try {
            setAnnouncements(announcements.filter(a => a._id !== id));
            await axios.delete(`/api/announcements/${id}`);
        } catch (error) {
            alert("Failed to delete announcement");
            fetchAnnouncements();
        }
    };

    if (loading) return (
        <div className="h-full min-h-[70vh] flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Command Center...</p>
        </div>
    );

    return (
        <div className="p-8 md:p-12 max-w-[1200px] mx-auto min-h-screen">

            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3">
                        <LayoutTemplate size={14} /> Homepage Content
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter">Communications Hub</h1>
                    <p className="text-slate-500 font-medium text-sm mt-2">
                        Manage the Welcome Poster and Scrolling Marquee alerts for your students.
                    </p>
                </div>
            </div>

            {/* --- SECTION 1: WELCOME POSTER (Schedule) --- */}
            <div className="mb-20">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <BellRing className="text-orange-500 w-6 h-6" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">1. Welcome Poster Schedule</h2>
                </div>
                {/* Mounts the dynamic editor you just built */}
                <ScheduleEditor />
            </div>

            <hr className="border-slate-200/60 mb-20" />

            {/* --- SECTION 2: SCROLLING MARQUEE ANNOUNCEMENTS --- */}
            <div>
                <div className="flex items-center gap-3 mb-6 px-2">
                    <Megaphone className="text-blue-600 w-6 h-6" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">2. Scrolling Marquee Broadcasts</h2>
                </div>

                {/* Quick Publish Bar */}
                <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-10 mb-8 shadow-2xl relative overflow-hidden border border-slate-800">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-black text-white mb-2">Publish New Broadcast</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Instantly appears in the scrolling ticker</p>

                        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                required
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="e.g., Flash Sale: Get 50% off all TRB Materials this weekend!"
                                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl py-5 px-6 font-bold outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send size={18} /> Push Live</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Announcements Table */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="p-6 pl-10">Broadcast Message</th>
                                    <th className="p-6">Date Posted</th>
                                    <th className="p-6">Visibility</th>
                                    <th className="p-6 text-right pr-10">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {announcements.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-16 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                <Megaphone size={24} />
                                            </div>
                                            <p className="text-slate-900 font-black text-lg">No Broadcasts Active</p>
                                            <p className="text-slate-400 font-medium text-sm mt-1">Use the panel above to push your first message.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    announcements.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                            {/* Message */}
                                            <td className="p-6 pl-10 max-w-md">
                                                <p className="font-bold text-[#0F172A] leading-relaxed line-clamp-2">{item.message}</p>
                                            </td>

                                            {/* Date */}
                                            <td className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>

                                            {/* Status Toggle */}
                                            <td className="p-6">
                                                <button
                                                    onClick={() => toggleStatus(item._id, item.isActive)}
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                                                        ${item.isActive
                                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 shadow-sm'
                                                            : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600'
                                                        }`}
                                                >
                                                    {item.isActive ? <><CheckCircle2 size={14} /> Visible</> : <><XCircle size={14} /> Hidden</>}
                                                </button>
                                            </td>

                                            {/* Delete Action */}
                                            <td className="p-6 text-right pr-10">
                                                <button
                                                    onClick={() => deleteAnnouncement(item._id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all group-hover:opacity-100 shadow-sm"
                                                    title="Delete Announcement"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}