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
    BellRing
} from "lucide-react";

type Announcement = {
    _id: string;
    message: string;
    isActive: boolean;
    createdAt: string;
};

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            // Fetch all announcements for the admin, not just active ones
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
            // Add the new announcement to the top of the list
            setAnnouncements([res.data, ...announcements]);
            setNewMessage(""); // Clear input
        } catch (error) {
            alert("Failed to publish announcement");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            // Optimistic UI update
            setAnnouncements(announcements.map(a =>
                a._id === id ? { ...a, isActive: !currentStatus } : a
            ));
            await axios.patch(`/api/announcements/${id}`, { isActive: !currentStatus });
        } catch (error) {
            alert("Failed to update status");
            fetchAnnouncements(); // Revert on failure
        }
    };

    const deleteAnnouncement = async (id: string) => {
        if (!confirm("Are you sure you want to permanently delete this announcement?")) return;

        try {
            // Optimistic UI update
            setAnnouncements(announcements.filter(a => a._id !== id));
            await axios.delete(`/api/announcements/${id}`);
        } catch (error) {
            alert("Failed to delete announcement");
            fetchAnnouncements(); // Revert on failure
        }
    };

    if (loading) return (
        <div className="h-full min-h-[50vh] flex items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Announcements</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage the scrolling marquee alerts on the student homepage</p>
                </div>
            </div>

            {/* Quick Publish Bar */}
            <div className="bg-[#0F172A] rounded-[2rem] p-8 md:p-10 mb-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-600 rounded-xl">
                            <Megaphone className="text-white w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-white">Broadcast New Message</h2>
                    </div>

                    <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            required
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="e.g., Flash Sale: Get 50% off all TRB Materials this weekend!"
                            className="flex-1 bg-white/10 border border-white/10 text-white placeholder-slate-400 rounded-xl py-4 px-6 font-bold outline-none focus:ring-4 focus:ring-blue-500/30 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send size={16} /> Publish Now</>}
                        </button>
                    </form>
                </div>
            </div>

            {/* Announcements List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center gap-3">
                    <BellRing className="text-blue-600 w-5 h-5" />
                    <h3 className="text-lg font-black text-[#0F172A]">Active & Past Broadcasts</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-6 pl-10">Broadcast Message</th>
                                <th className="p-6">Date Posted</th>
                                <th className="p-6">Visibility</th>
                                <th className="p-6 text-right pr-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {announcements.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-slate-400 font-bold text-sm">
                                        No announcements have been published yet.
                                    </td>
                                </tr>
                            ) : (
                                announcements.map((item) => (
                                    <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">

                                        {/* Message */}
                                        <td className="p-6 pl-10 max-w-md">
                                            <p className="font-bold text-[#0F172A] leading-relaxed">{item.message}</p>
                                        </td>

                                        {/* Date */}
                                        <td className="p-6 text-sm font-bold text-slate-500">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>

                                        {/* Status Toggle */}
                                        <td className="p-6">
                                            <button
                                                onClick={() => toggleStatus(item._id, item.isActive)}
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border
                                                    ${item.isActive
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                                                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'
                                                    }`}
                                            >
                                                {item.isActive ? <><CheckCircle2 size={14} /> Visible</> : <><XCircle size={14} /> Hidden</>}
                                            </button>
                                        </td>

                                        {/* Delete Action */}
                                        <td className="p-6 text-right pr-10">
                                            <button
                                                onClick={() => deleteAnnouncement(item._id)}
                                                className="p-2 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete Announcement"
                                            >
                                                <Trash2 size={16} />
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
    );
}