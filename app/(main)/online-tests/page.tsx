"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

// Clean Components
import TestsHero from "@/components/tests/TestsHero";
import TestCard from "@/components/tests/TestCard";

type TestItem = {
    _id: string;
    title: string;
    subject: string;
    examType: string;
};

export default function TestsListingPage() {
    const [tests, setTests] = useState<TestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tRes, authRes] = await Promise.allSettled([
                    axios.get("/api/tests"),
                    axios.get("/api/auth/me")
                ]);
                if (tRes.status === 'fulfilled') setTests(tRes.value.data || []);
                if (authRes.status === 'fulfilled' && authRes.value.data.success) setUser(authRes.value.data.user);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const filtered = tests.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "ALL" || t.examType === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <TestsHero />

            {/* SEARCH & FILTER */}
            <div className="max-w-6xl mx-auto px-6 -mt-14 text-black relative z-30">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-4 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input type="text" placeholder="Search tests..." className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 outline-none" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex bg-slate-50 p-2 rounded-3xl gap-1 overflow-x-auto">
                        {["ALL", "UG TRB", "PG TRB", "NET", "SET"].map((type) => (
                            <button key={type} onClick={() => setFilter(type)} className={`px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest whitespace-nowrap ${filter === type ? 'bg-[#0F172A] text-white' : 'text-slate-500'}`}>{type}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* GRID */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="flex flex-col items-center py-20 gap-4"><Loader2 className="animate-spin text-blue-500" /><p className="text-[10px] tracking-widest uppercase">Loading CBT Engine...</p></div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filtered.map((item, index) => (
                                <TestCard key={item._id} item={item} user={user} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>
        </main>
    );
}