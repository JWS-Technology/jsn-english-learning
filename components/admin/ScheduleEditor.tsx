"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CalendarDays, ClipboardCheck, BellRing, Save, ToggleRight, ToggleLeft } from "lucide-react";

export default function ScheduleEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        isActive: true,
        classFromDate: "",
        classToDate: "",
        classUnit: "",
        testDate: "",
        testUnit: ""
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await axios.get("/api/schedule");
                if (res.data) setFormData(res.data);
            } catch (err) {
                console.error("Failed to fetch schedule");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post("/api/schedule", formData);
            alert("Schedule updated! Changes are live on the homepage.");
        } catch (error) {
            alert("Failed to update schedule.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>;

    return (
        <form onSubmit={handleSave} className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col mx-auto mb-8">

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 md:p-8 text-center relative shrink-0">
                <div className="absolute top-4 right-4 md:top-6 md:right-8 flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-3">
                    <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">
                        {formData.isActive ? "Poster is Live" : "Poster is Hidden"}
                    </span>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        className={`transition-all active:scale-95 ${formData.isActive ? "text-emerald-400" : "text-slate-500"}`}
                    >
                        {formData.isActive ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                    </button>
                </div>

                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 backdrop-blur-md">
                    <BellRing className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">Live Poster Editor</h2>
                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2">Update the text below</p>
            </div>

            {/* Editable Content Area */}
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">

                {/* Class Portion Editable Box */}
                <div className="bg-blue-100/50 p-5 md:p-6 rounded-[1.5rem] border border-blue-200 flex flex-col h-full shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-blue-700">
                        <CalendarDays size={20} />
                        <h3 className="font-black uppercase tracking-widest text-xs">Edit Class Portion</h3>
                    </div>

                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Syllabus / Unit Name</label>
                    <textarea
                        value={formData.classUnit}
                        onChange={(e) => setFormData({ ...formData, classUnit: e.target.value })}
                        className="w-full bg-white text-base md:text-lg font-bold text-slate-900 mb-4 p-4 rounded-xl border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none outline-none transition-all shadow-sm"
                        placeholder="e.g. Unit IX: American Literature"
                        rows={3}
                        required
                    />

                    <div className="mt-auto pt-4 border-t border-blue-200/50 grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">From</label>
                            <input
                                value={formData.classFromDate}
                                onChange={(e) => setFormData({ ...formData, classFromDate: e.target.value })}
                                className="w-full bg-white text-xs md:text-sm font-black text-blue-700 p-3 rounded-lg border border-blue-100 focus:border-blue-500 outline-none shadow-sm text-center"
                                placeholder="10 April" required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">To</label>
                            <input
                                value={formData.classToDate}
                                onChange={(e) => setFormData({ ...formData, classToDate: e.target.value })}
                                className="w-full bg-white text-xs md:text-sm font-black text-blue-700 p-3 rounded-lg border border-blue-100 focus:border-blue-500 outline-none shadow-sm text-center"
                                placeholder="15 April" required
                            />
                        </div>
                    </div>
                </div>

                {/* Test Portion Editable Box */}
                <div className="bg-orange-100/50 p-5 md:p-6 rounded-[1.5rem] border border-orange-200 flex flex-col h-full shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-orange-700">
                        <ClipboardCheck size={20} />
                        <h3 className="font-black uppercase tracking-widest text-xs">Edit Upcoming Test</h3>
                    </div>

                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Test Topic / Unit</label>
                    <textarea
                        value={formData.testUnit}
                        onChange={(e) => setFormData({ ...formData, testUnit: e.target.value })}
                        className="w-full bg-white text-base md:text-lg font-bold text-slate-900 mb-4 p-4 rounded-xl border border-orange-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none outline-none transition-all shadow-sm"
                        placeholder="e.g. Unit IX Cumulative Test"
                        rows={3}
                        required
                    />

                    <div className="mt-auto pt-4 border-t border-orange-200/50">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Test Date & Time</label>
                        <input
                            value={formData.testDate}
                            onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                            className="w-full bg-white text-xs md:text-sm font-black text-orange-700 p-3 rounded-lg border border-orange-100 focus:border-orange-500 outline-none shadow-sm text-center"
                            placeholder="e.g. 16 April 2026 (Sunday)" required
                        />
                    </div>
                </div>

            </div>

            {/* Save Button */}
            <div className="p-4 md:p-8 bg-white shrink-0 border-t border-slate-100">
                <button
                    type="submit" disabled={saving}
                    className="w-full py-4 md:py-5 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 active:scale-95"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4 md:w-5 md:h-5" /> : <Save className="w-4 h-4 md:w-5 md:h-5" />}
                    {saving ? "Publishing to Website..." : "Save & Push to Homepage"}
                </button>
            </div>
        </form>
    );
}