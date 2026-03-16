"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
    BookOpen, IndianRupee, Package, Clock,
    ArrowUpRight, ArrowRight, ShieldCheck, Loader2, LayoutDashboard, Search
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/admin/stats");
                setData(res.data);
            } catch (err) {
                console.error("Dashboard fetch error");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-4 text-slate-400">Decrypting Command Center...</p>
        </div>
    );

    const { stats, recentOrders } = data;

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* PAGE HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Administrator Portal</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">System Overview</h1>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/admin/users" className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-95">
                            Users
                        </Link>
                        <Link href="/admin/test/upload" className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-95">
                            New Test
                        </Link>
                        <Link href="/admin/tests" className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-95">
                            Test Results
                        </Link>
                        <Link href="/admin/materials/upload" className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-95">
                            New Material
                        </Link>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard label="Materials" value={stats.totalMaterials} icon={<BookOpen />} trend="Live Library" />
                    <StatCard label="Orders" value={stats.totalOrders} icon={<Package />} trend="Total Sales" />
                    <StatCard label="Revenue" value={`₹${stats.totalRevenue}`} icon={<IndianRupee />} trend="Net Earnings" />
                    <StatCard label="Pending" value={stats.pendingOrders} icon={<Clock />} trend="Needs Action" />
                </div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* TRANSACTIONS TABLE */}
                    <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest">Latest Transactions</h3>
                            <Link href="/admin/orders" className="p-2 hover:bg-slate-50 rounded-full transition-colors"><Search size={18} className="text-slate-400" /></Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <th className="p-6 pl-10">Student</th>
                                        <th className="p-6">Material</th>
                                        <th className="p-6">Status</th>
                                        <th className="p-6 text-right pr-10">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentOrders.map((order: any) => (
                                        <tr key={order._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 pl-10">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0F172A]">{order.customerName}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold">{order.phoneNumber}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-xs font-black text-slate-500 uppercase">{order.material?.title || "Removed"}</td>
                                            <td className="p-6">
                                                <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-orange-500 text-white' : 'bg-[#0F172A] text-white'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <Link href={`/admin/orders/${order._id}`} className="inline-flex items-center justify-center w-10 h-10 bg-slate-400 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all">
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* QUICK SHORTCUTS */}
                    <div className="space-y-6">
                        <div className="bg-[#0F172A] rounded-[3rem] p-8 text-white shadow-2xl">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Quick Management</h3>
                            <div className="space-y-4">
                                {/* <QuickLink href="/admin/orders" label="All Orders" count={stats.pendingOrders} /> */}
                                <QuickLink href="/admin/materials" label="Manage Library" />
                                {/* <QuickLink href="/admin/users" label="Student List" /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value, icon, trend }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-orange-500/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors text-orange-500">{icon}</div>
                <ArrowUpRight className="w-4 h-4 text-slate-200" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <h4 className="text-3xl font-black text-[#0F172A] tracking-tighter">{value}</h4>
            <p className="text-[10px] font-black text-orange-600 mt-2 uppercase">{trend}</p>
        </div>
    );
}

function QuickLink({ href, label, count }: any) {
    return (
        <Link href={href} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                {count > 0 && <span className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full">{count}</span>}
            </div>
            <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}