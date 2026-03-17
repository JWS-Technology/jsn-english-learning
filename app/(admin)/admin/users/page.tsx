"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, ShieldCheck, UserPlus, CheckCircle2, XCircle, Search, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/api/admin/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const togglePaidStatus = async (userId: string, currentStatus: boolean) => {
        try {
            // Optimistic UI update
            setUsers(users.map(u => u._id === userId ? { ...u, isPaidUser: !currentStatus } : u));
            await axios.patch(`/api/admin/users/${userId}`, { isPaidUser: !currentStatus });
        } catch (error) {
            alert("Failed to update status");
            fetchUsers();
        }
    };

    // Delete User Function
    const deleteUser = async (userId: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this user? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            // Optimistic UI removal
            setUsers(users.filter(u => u._id !== userId));
            await axios.delete(`/api/admin/users/${userId}`);
        } catch (error) {
            alert("Failed to delete user.");
            fetchUsers(); // Revert on failure
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

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
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Student Roster</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Manage platform access and user accounts</p>
                </div>
                <Link href="/admin/users/create" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                    <UserPlus size={14} /> Register New Student
                </Link>
            </div>

            {/* Search & List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-50 text-black border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-6 pl-10">Student Name</th>
                                <th className="p-6">Email Address</th>
                                <th className="p-6">Role</th>
                                <th className="p-6 text-right pr-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-slate-400 font-bold text-sm">No users found matching your search.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-6 pl-10 font-bold text-[#0F172A]">{user.name}</td>
                                        <td className="p-6 text-sm text-slate-500 font-medium">{user.email}</td>
                                        <td className="p-6">
                                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        {/* Action buttons (Toggle Paid + Delete) */}
                                        <td className="p-6 text-right pr-10 flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => togglePaidStatus(user._id, user.isPaidUser)}
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.isPaidUser ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100 hover:text-slate-600'}`}
                                            >
                                                {user.isPaidUser ? <><CheckCircle2 size={14} /> Approved</> : <><XCircle size={14} /> Revoked</>}
                                            </button>

                                            {/* Delete Button (Disable deletion of admins as a safety net) */}
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    className="p-2 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
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