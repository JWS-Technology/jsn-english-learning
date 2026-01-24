"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    PackageCheck,
    ShoppingCart,
    CheckCircle2,
    Info,
    Clock,
    Package,
    Loader2
} from "lucide-react";
import CheckoutModal from "./CheckoutModal";

export default function OrderSidebar({ material }: { material: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [existingOrder, setExistingOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await axios.get(`/api/orders/check?materialId=${material._id}`);
                if (res.data.isOrdered) setExistingOrder(res.data.order);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        checkStatus();
    }, [material._id]);
    if (loading) return (
        <div className="p-8 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Checking Registry...</p>
        </div>
    );

    return (
        <div className="p-6 md:p-8 space-y-8 bg-white rounded-[2.5rem]">
            {/* SECTION 1: HEADER & PRICE */}
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                    <PackageCheck className="w-3.5 h-3.5" /> Physical Courier Copy
                </div>
                <h2 className="text-xl font-black text-[#0F172A] leading-tight tracking-tighter">
                    {material.title}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-[#0F172A]">₹{material.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Incl. Shipping</span>
                </div>
            </div>

            {/* SECTION 2: MATERIAL SPECS */}
            <div className="grid grid-cols-3 gap-2">
                <SpecItem label="Pages" value={`${material.totalPages || 0} pgs`} />
                <SpecItem label="Subject" value={material.subject} />
                <SpecItem label="Exam" value={material.examType} />
            </div>

            {/* SECTION 3: DESCRIPTION */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-orange-500 rounded-full" />
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Description</h4>
                </div>
                <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {material.description || "Expert-curated study material for competitive exams."}
                    </p>
                </div>
            </div>

            {/* SECTION 4: DYNAMIC FOOTER (BUY OR STATUS) */}
            {/* SECTION 4: DYNAMIC FOOTER (BUY OR STATUS) */}
            <div className="border-t border-slate-100 pt-6">
                {existingOrder ? (
                    <div className="space-y-4">
                        {/* Status Header Badge */}
                        <div className={`p-4 rounded-2xl text-center border ${existingOrder.status === 'CANCELLED' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
                            }`}>
                            <CheckCircle2 className={`w-6 h-6 mx-auto mb-1 ${existingOrder.status === 'CANCELLED' ? 'text-red-500' : 'text-emerald-500'
                                }`} />
                            <h4 className={`text-[10px] font-black uppercase tracking-widest ${existingOrder.status === 'CANCELLED' ? 'text-red-900' : 'text-emerald-900'
                                }`}>
                                {existingOrder.status === 'CANCELLED' ? 'Order Cancelled' : 'Order Active'}
                            </h4>
                        </div>

                        {/* Verification Status */}
                        <StatusRow
                            label="Verification"
                            status={
                                existingOrder.status === "PENDING" ? "Checking Payment" :
                                    existingOrder.status === "CANCELLED" ? "Failed" : "Payment Verified"
                            }
                            active={existingOrder.status !== "PENDING" && existingOrder.status !== "CANCELLED"}
                            error={existingOrder.status === "CANCELLED"}
                        />

                        {/* Courier Status */}
                        <StatusRow
                            label="Courier"
                            status={
                                existingOrder.status === "DELIVERED" ? "Handed Over" :
                                    existingOrder.status === "SHIPPED" ? "In Transit" :
                                        existingOrder.status === "CANCELLED" ? "N/A" : "Preparing Package"
                            }
                            active={existingOrder.status === "SHIPPED" || existingOrder.status === "DELIVERED"}
                        />

                        {/* Tracking ID Display */}
                        {existingOrder.trackingId && existingOrder.status !== "CANCELLED" && (
                            <div className="p-3 bg-[#0F172A] rounded-xl text-white text-center shadow-lg shadow-blue-900/10">
                                <p className="text-[7px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">Live Tracking ID</p>
                                <p className="text-[10px] font-black tracking-widest">{existingOrder.trackingId}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* ... Buy Button Code remains the same ... */
                    <div className="space-y-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-orange-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-950/20 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <ShoppingCart className="w-4 h-4" /> Buy Now & Ship
                        </button>
                    </div>
                )}
            </div>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                material={material}
                onSuccess={(order: any) => setExistingOrder(order)}
            />
        </div>
    );
}

// Helpers
function SpecItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
            <p className="text-[7px] font-black text-slate-400 uppercase">{label}</p>
            <p className="text-[10px] font-black text-slate-900 truncate">{value}</p>
        </div>
    );
}

function StatusRow({ label, status, active }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
                {label === "Verification" ? <Clock size={14} className="text-orange-500" /> : <Package size={14} className="text-slate-400" />}
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            </div>
            <span className={`text-[8px] font-black px-2 py-1 rounded uppercase ${active ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                {status}
            </span>
        </div>
    );
}