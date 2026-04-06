"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import MaterialsHero from "@/components/materials/MaterialsHero";
import MaterialCard from "@/components/materials/MaterialCard";

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mRes, authRes] = await Promise.allSettled([
                    axios.get("/api/materials"),
                    axios.get("/api/auth/me")
                ]);

                if (mRes.status === 'fulfilled') setMaterials(mRes.value.data || []);
                if (authRes.status === 'fulfilled' && authRes.value.data.success) setUser(authRes.value.data.user);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const filtered = materials.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "ALL" || m.examType === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <MaterialsHero />

            {/* SEARCH BAR */}
            <div className="max-w-6xl mx-auto px-6 -mt-14 text-black relative z-30">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-4 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input type="text" placeholder="Search..." className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 outline-none" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex bg-slate-50 p-2 rounded-3xl  gap-1">
                        {["ALL", "TRB", "NET", "SET"].map((type) => (
                            <button key={type} onClick={() => setFilter(type)} className={`px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest ${filter === type ? 'bg-[#0F172A] text-white' : 'text-slate-500'}`}>{type}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* GRID */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="flex flex-col items-center py-20 gap-4"><Loader2 className="animate-spin text-orange-500" /><p className="text-[10px] tracking-widest uppercase">Syncing Library...</p></div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filtered.map((item, index) => (
                                <MaterialCard key={item._id} item={item} user={user} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>
        </main>
    );
}