"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
    ChevronLeft, Package, Truck,
    CheckCircle2, MapPin, User, Phone,
    IndianRupee, Loader2, Save
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Form State
    const [status, setStatus] = useState("");
    const [trackingId, setTrackingId] = useState("");

    useEffect(() => {
        axios.get(`/api/orders/${id}`).then((res) => {
            setOrder(res.data);
            setStatus(res.data.status);
            setTrackingId(res.data.trackingId || "");
            setLoading(false);
        });
    }, [id]);

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            await axios.patch(`/api/orders/${id}`, { status, trackingId });
            router.refresh();
            alert("Order updated successfully!");
        } catch (e) {
            alert("Failed to update order.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center pt-20"><Loader2 className="animate-spin text-orange-500" /></div>;

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-[#0F172A] transition-all">
                        <ChevronLeft size={16} /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${status === 'PENDING' ? 'bg-orange-500 text-white' : 'bg-[#0F172A] text-white'}`}>
                            {status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Student Info */}
                        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Shipping Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoBlock icon={<User size={16} />} label="Full Name" value={order.customerName} />
                                <InfoBlock icon={<Phone size={16} />} label="Phone Number" value={order.phoneNumber} />
                                <div className="md:col-span-2">
                                    <InfoBlock icon={<MapPin size={16} />} label="Delivery Address" value={order.shippingAddress} />
                                </div>
                            </div>
                        </section>

                        {/* Material Info */}
                        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-orange-500">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordered Material</p>
                                    <h4 className="font-black text-[#0F172A]">{order.material?.title}</h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount Paid</p>
                                <h4 className="font-black text-[#0F172A] flex items-center justify-end gap-1"><IndianRupee size={14} />{order.amount}</h4>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Management */}
                    <aside className="space-y-6">
                        <div className="bg-[#0F172A] p-8 rounded-[3rem] text-white shadow-2xl space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Update Status</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Process Phase</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold outline-none focus:border-orange-500 transition-all"
                                    >
                                        <option value="PENDING" className="text-black">Pending Verification</option>
                                        <option value="VERIFIED" className="text-black">Verified & Preparing</option>
                                        <option value="SHIPPED" className="text-black">Shipped (In Transit)</option>
                                        <option value="DELIVERED" className="text-black">Delivered</option>
                                        <option value="CANCELLED" className="text-black">Cancelled</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Tracking ID</label>
                                    <div className="relative">
                                        <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                                        <input
                                            type="text"
                                            value={trackingId}
                                            onChange={(e) => setTrackingId(e.target.value)}
                                            placeholder="Enter Courier ID"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-sm font-bold outline-none focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdate}
                                    disabled={updating}
                                    className="w-full bg-orange-500 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50"
                                >
                                    {updating ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> Update Ledger</>}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                                <CheckCircle2 size={20} />
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-tight">Updating status to "Shipped" will reflect instantly in the student portal.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function InfoBlock({ icon, label, value }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">{icon} {label}</p>
            <p className="font-bold text-[#0F172A]">{value}</p>
        </div>
    );
}