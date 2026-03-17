"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    Loader2,
    Search,
    Package,
    ArrowRight,
    Clock,
    Truck,
    CheckCircle2,
    XCircle,
    Filter
} from "lucide-react";

type Order = {
    _id: string;
    customerName: string;
    phoneNumber: string;
    email: string;
    amount: number;
    status: "PENDING" | "VERIFIED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    trackingId?: string;
    createdAt: string;
    material: {
        title: string;
        subject: string;
    };
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Assuming your GET /api/orders endpoint returns all orders for the admin
            const res = await axios.get("/api/orders");
            setOrders(res.data || []);
        } catch (error) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        const originalOrders = [...orders];
        try {
            // Optimistic UI update
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus as any } : o));

            await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
        } catch (error) {
            alert("Failed to update order status.");
            setOrders(originalOrders); // Revert on failure
        }
    };

    // Filter Logic
    const filteredOrders = orders.filter(o => {
        const matchesSearch =
            o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            o.phoneNumber?.includes(search) ||
            o.material?.title?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Helper for status styling
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
            case "VERIFIED": return "bg-blue-100 text-blue-700 border-blue-200";
            case "SHIPPED": return "bg-purple-100 text-purple-700 border-purple-200";
            case "DELIVERED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "CANCELLED": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-600 border-slate-200";
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
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Physical Orders</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage and track courier shipments to students</p>
                </div>

                {/* Quick Stats Summary */}
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-amber-500" />
                        <span className="text-xs font-black text-[#0F172A]">{orders.filter(o => o.status === 'PENDING').length} Pending</span>
                    </div>
                    <div className="w-px h-6 bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <Truck size={16} className="text-purple-500" />
                        <span className="text-xs font-black text-[#0F172A]">{orders.filter(o => o.status === 'SHIPPED').length} In Transit</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">

                {/* Search & Filter Bar */}
                <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search name, phone, or book..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-black bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-[#0F172A] outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PENDING">Pending (Requires Action)</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="SHIPPED">Shipped (In Transit)</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-6 pl-10">Customer Details</th>
                                <th className="p-6">Material Ordered</th>
                                <th className="p-6">Amount & Date</th>
                                <th className="p-6">Fulfillment Status</th>
                                <th className="p-6 text-right pr-10">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-slate-400 font-bold text-sm">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-blue-50/30 transition-colors group">

                                        {/* Customer Info */}
                                        <td className="p-6 pl-10">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#0F172A]">{order.customerName}</span>
                                                <span className="text-xs text-slate-500 font-medium">{order.phoneNumber}</span>
                                            </div>
                                        </td>

                                        {/* Material Info */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Package className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#0F172A] line-clamp-1">{order.material?.title || "Removed Material"}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.material?.subject}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Amount & Date */}
                                        <td className="p-6">
                                            <span className="font-black text-[#0F172A]">₹{order.amount}</span>
                                            <p className="text-xs font-bold text-slate-400 mt-1">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>

                                        {/* Dynamic Status Dropdown */}
                                        <td className="p-6">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                className={`text-[10px] font-black px-3 py-2 rounded-lg uppercase tracking-widest border outline-none cursor-pointer transition-all ${getStatusStyle(order.status)}`}
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="VERIFIED">VERIFIED</option>
                                                <option value="SHIPPED">SHIPPED</option>
                                                <option value="DELIVERED">DELIVERED</option>
                                                <option value="CANCELLED">CANCELLED</option>
                                            </select>

                                            {/* Tracking ID Preview if available */}
                                            {order.trackingId && (
                                                <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                                                    <Truck size={10} /> ID: {order.trackingId}
                                                </p>
                                            )}
                                        </td>

                                        {/* Actions / View Details */}
                                        <td className="p-6 text-right pr-10">
                                            <Link
                                                href={`/orders/${order._id}`}
                                                className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                                            >
                                                <ArrowRight size={16} />
                                            </Link>
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