"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Loader2,
    BookOpen,
    Award,
    FileSearch,
    Package,
    Clock,
    CheckCircle2,
    Truck,
    ArrowRight
} from "lucide-react";

export default function StudentDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState({ orders: [], testResults: [] });
    const [activeTab, setActiveTab] = useState<"TESTS" | "MATERIALS">("TESTS");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Verify User
                const authRes = await axios.get("/api/auth/me");
                const currentUser = authRes.data.user;

                if (!currentUser) {
                    return router.replace("/login?redirect=/dashboard");
                }
                setUser(currentUser);

                // 2. Fetch Dashboard Data
                const userId = currentUser._id || currentUser.id;
                const dashRes = await axios.get(`/api/user/dashboard?userId=${userId}`);
                setDashboardData(dashRes.data);

            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Your Portal...</p>
        </div>
    );

    const { orders, testResults } = dashboardData;

    // Calculate Stats
    const totalTests = testResults.length;
    const avgScore = totalTests > 0
        ? Math.round(testResults.reduce((acc: number, curr: any) => acc + (curr.score / curr.totalMarks), 0) / totalTests * 100)
        : 0;
    const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length;

    return (
        <main className="min-h-screen bg-[#F8FAFC] pb-24 pt-32">
            <div className="max-w-6xl mx-auto px-6">

                {/* --- WELCOME BANNER --- */}
                <div className="bg-[#0F172A] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden mb-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                            Welcome back, <span className="text-orange-500">{user?.name?.split(' ')[0] || 'Student'}</span>!
                        </h1>
                        <p className="text-slate-400 font-medium max-w-xl text-lg">
                            Track your physical study material shipments and review your performance on recent CBT mock exams.
                        </p>
                    </div>
                </div>

                {/* --- QUICK STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<Award className="text-emerald-500" />}
                        label="Average Score"
                        value={totalTests > 0 ? `${avgScore}%` : "N/A"}
                        bgColor="bg-emerald-50"
                    />
                    <StatCard
                        icon={<FileSearch className="text-blue-500" />}
                        label="Exams Completed"
                        value={totalTests}
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        icon={<Package className="text-orange-500" />}
                        label="Active Orders"
                        value={pendingOrders}
                        bgColor="bg-orange-50"
                    />
                </div>

                {/* --- TABS --- */}
                <div className="flex gap-4 mb-8 border-b border-slate-200 pb-px">
                    <button
                        onClick={() => setActiveTab("TESTS")}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'TESTS' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        My Test Results
                    </button>
                    <button
                        onClick={() => setActiveTab("MATERIALS")}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'MATERIALS' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        Material Orders
                    </button>
                </div>

                {/* --- TAB CONTENT --- */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* TEST RESULTS VIEW */}
                    {activeTab === "TESTS" && (
                        <div className="space-y-4">
                            {testResults.length === 0 ? (
                                <EmptyState message="You haven't taken any mock exams yet." link="/online-tests" btnText="Explore Tests" />
                            ) : (
                                testResults.map((result: any) => {
                                    const percentage = Math.round((result.score / result.totalMarks) * 100);
                                    const isPass = percentage >= 50;

                                    return (
                                        <div key={result._id} className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-orange-100 transition-all group">
                                            <div className="flex items-start gap-5">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isPass ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                                    {isPass ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-[#0F172A] mb-1 group-hover:text-orange-500 transition-colors">
                                                        {result.test?.title || "Deleted Exam"}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                        <span>{result.test?.examType || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
                                                    <p className="text-lg font-black text-[#0F172A]">{result.score} <span className="text-slate-400 text-sm">/ {result.totalMarks}</span></p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Accuracy</p>
                                                    <p className={`text-lg font-black ${isPass ? 'text-emerald-500' : 'text-red-500'}`}>{percentage}%</p>
                                                </div>
                                                <Link
                                                    href={`/test-review/${result._id}`}
                                                    className="w-12 h-12 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors shadow-md"
                                                >
                                                    <ArrowRight size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {/* MATERIAL ORDERS VIEW */}
                    {activeTab === "MATERIALS" && (
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <EmptyState message="You haven't ordered any physical study materials." link="/materials" btnText="Browse Library" />
                            ) : (
                                orders.map((order: any) => {
                                    const statusColors: any = {
                                        PENDING: "bg-orange-100 text-orange-600",
                                        VERIFIED: "bg-blue-100 text-blue-600",
                                        SHIPPED: "bg-purple-100 text-purple-600",
                                        DELIVERED: "bg-emerald-100 text-emerald-600",
                                    };

                                    return (
                                        <div key={order._id} className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all group">
                                            <div className="flex items-start gap-5">
                                                <div className="w-14 h-14 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center shrink-0">
                                                    <BookOpen size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-[#0F172A] mb-1">
                                                        {order.material?.title || "Removed Material"}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        <span>Ord: {new Date(order.createdAt).toLocaleDateString()}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                        <span>₹{order.amount}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                                                    {order.status}
                                                </div>

                                                {order.trackingId ? (
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl">
                                                        <Truck size={14} className="text-orange-500" /> ID: {order.trackingId}
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        Tracking TBD
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </motion.div>

            </div>
        </main>
    );
}

// Sub-components for cleaner code
function StatCard({ icon, label, value, bgColor }: any) {
    return (
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${bgColor}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                <h3 className="text-3xl font-black text-[#0F172A]">{value}</h3>
            </div>
        </div>
    );
}

function EmptyState({ message, link, btnText }: any) {
    return (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSearch className="text-slate-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#0F172A] mb-2">No Records Found</h3>
            <p className="text-slate-400 font-medium mb-8 max-w-sm mx-auto">{message}</p>
            <Link href={link} className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                {btnText} <ArrowRight size={14} />
            </Link>
        </div>
    );
}