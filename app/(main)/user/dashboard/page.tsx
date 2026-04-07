"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Loader2,
    BookOpen,
    Award,
    FileSearch,
    Package,
    ArrowUpRight,
    Zap,
    MessageCircle,
    UserCheck,
    ChevronRight,
    ShieldCheck,
    MapPin // <-- Added missing import here
} from "lucide-react";

export default function StudentDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState({ orders: [], testResults: [] });
    const [activeTab, setActiveTab] = useState<"TESTS" | "MATERIALS">("TESTS");

    // --- Enrollment Steps Data ---
    const enrollmentSteps = [
        { id: "01", title: "Account Active", desc: "Profile created successfully.", icon: <UserCheck className="text-emerald-500" />, completed: true },
        { id: "02", title: "Notify Admin", desc: "Alert Dr. Nathan of your registration.", icon: <Zap className="text-orange-500" />, action: "NOTIFY" },
        { id: "03", title: "WhatsApp Sync", desc: "Finalize batch allocation.", icon: <MessageCircle className="text-blue-500" />, action: "WHATSAPP" },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const authRes = await axios.get("/api/auth/me");
                const currentUser = authRes.data.user;
                if (!currentUser) return router.replace("/login?redirect=/dashboard");
                setUser(currentUser);

                const userId = currentUser._id || currentUser.id;
                const dashRes = await axios.get(`/api/user/dashboard?userId=${userId}`);
                setDashboardData(dashRes.data);
            } catch (error) {
                console.error("Dashboard Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [router]);

    const handleNotifyAdmin = async () => {
        try {
            // Mock API call to notify admin
            alert("Notification sent to Dr. Nathan! Please proceed to WhatsApp for faster processing.");
        } catch (e) { console.error(e); }
    };

    const handleWhatsAppSync = () => {
        const msg = `Hello Dr. Nathan, I am ${user?.name}. I have registered on the JSN website and notified the admin. Please allocate my batch.`;
        window.open(`https://wa.me/919843287913?text=${encodeURIComponent(msg)}`, "_blank");
    };

    if (loading) return <LoadingState />;

    return (
        <main className="min-h-screen bg-[#FDFEFF] pb-24 pt-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- TOP HEADER & ACTIONS --- */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter">
                            Welcome, <span className="text-blue-600 italic font-serif font-normal">{user?.name?.split(' ')[0]}</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-2">Student ID: #{user?._id?.slice(-6).toUpperCase()}</p>
                    </div>

                    {/* Quick WhatsApp Support */}
                    <button
                        onClick={handleWhatsAppSync}
                        className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                    >
                        <MessageCircle size={18} /> Support Desk
                    </button>
                </header>

                {/* --- NEW: ENROLLMENT PROGRESS STEPS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {enrollmentSteps.map((step) => (
                        <div key={step.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-200 transition-all shadow-sm">
                            <span className="absolute -bottom-4 -right-2 text-7xl font-black text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">{step.id}</span>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <h4 className="text-lg font-black text-[#0F172A]">{step.title}</h4>
                            </div>
                            <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">{step.desc}</p>

                            {step.completed ? (
                                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck size={14} /> Completed
                                </div>
                            ) : (
                                <button
                                    onClick={step.action === "NOTIFY" ? handleNotifyAdmin : handleWhatsAppSync}
                                    className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all"
                                >
                                    Proceed Now <ChevronRight size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* --- STATS & PERFORMANCE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-8 mb-8 border-b border-slate-100">
                            {["TESTS", "MATERIALS"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400'
                                        }`}
                                >
                                    {tab === "TESTS" ? "Academic History" : "Resource Shipments"}
                                    {activeTab === tab && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {activeTab === "TESTS" ? (
                                    <TestListView results={dashboardData.testResults} />
                                ) : (
                                    <OrderTimelineView orders={dashboardData.orders} /> /* <-- Fixed name here */
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Ad/Context */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[3rem] text-white shadow-2xl">
                            <BookOpen className="mb-6 opacity-50" size={32} />
                            <h3 className="text-2xl font-black leading-tight mb-4 text-white">Upgrade to Premium?</h3>
                            <p className="text-sm font-medium text-blue-100 mb-8 leading-relaxed">
                                Unlock the full test engine and 100+ PDF units by upgrading to the Elite Batch.
                            </p>
                            <Link href="/pricing" className="block text-center py-4 bg-white text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                View Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}


function LoadingState() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Dashboard...</p>
        </div>
    );
}
// --- SUB-VIEWS ---

function TestListView({ results }: { results: any[] }) {
    if (results.length === 0) return <EmptyState label="No Exams Taken" sub="Start a mock test to track your performance." link="/online-tests" />;

    return (
        <div className="grid gap-4">
            {results.map((res) => (
                <div key={res._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                    <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${res.score / res.totalMarks >= 0.5 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            <FileSearch size={24} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-[#0F172A]">{res.test?.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                Attempted on {new Date(res.createdAt).toLocaleDateString()} • {res.test?.examType}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-12 mt-6 md:mt-0">
                        <div className="text-center">
                            <p className="text-2xl font-black text-[#0F172A]">{res.score}<span className="text-slate-300 text-sm">/{res.totalMarks}</span></p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Score</p>
                        </div>
                        <Link href={`/test-review/${res._id}`} className="p-4 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-all">
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

function OrderTimelineView({ orders }: { orders: any[] }) {
    if (orders.length === 0) return <EmptyState label="No Orders Yet" sub="Explore our library to order physical study materials." link="/materials" />;

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order._id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-900">{order.material?.title}</h4>
                                <p className="text-xs text-slate-400">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {order.status}
                        </div>
                    </div>

                    {/* Shipment Tracker Visual */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="h-1.5 rounded-full bg-blue-600" />
                        <div className={`h-1.5 rounded-full ${order.status !== 'PENDING' ? 'bg-blue-600' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 rounded-full ${order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'bg-blue-600' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                    </div>

                    {order.trackingId && (
                        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-600">
                            <MapPin size={14} className="text-blue-600" /> Tracking: <span className="text-[#0F172A]">{order.trackingId}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// --- UTILS ---

function StatCard({ icon, label, value, trend, color = 'blue' }: any) {
    const colors = color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600';
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-lg transition-all">
            <div className={`w-12 h-12 ${colors} rounded-xl flex items-center justify-center mb-6`}>
                {icon}
            </div>
            <p className="text-4xl font-black text-[#0F172A] tracking-tighter">{value}</p>
            <div className="flex flex-col mt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{trend}</span>
            </div>
        </div>
    );
}

function EmptyState({ label, sub, link }: any) {
    return (
        <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <FileSearch className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{label}</h3>
            <p className="text-slate-400 text-sm mt-1 mb-8">{sub}</p>
            <Link href={link} className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                Explore Now
            </Link>
        </div>
    );
}