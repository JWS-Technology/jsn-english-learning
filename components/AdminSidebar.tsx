"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    MonitorPlay,
    BookOpen,
    Package,
    LogOut,
    ShieldCheck,
    Home
} from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Test", href: "/admin/tests", icon: MonitorPlay },
    { name: "Manage Student", href: "/admin/users", icon: Users },
    { name: "Study Materials", href: "/admin/materials", icon: BookOpen },
    { name: "Physical Orders", href: "/admin/orders", icon: Package },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-[#0F172A] text-white h-screen flex flex-col shrink-0 sticky top-0 hidden lg:flex">
            {/* Sidebar Header */}
            <div className="h-24 flex items-center px-8 border-b border-white/10 shrink-0">
                {/* Fixed the link here to point to /admin/dashboard */}
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black tracking-widest uppercase text-white">Admin Portal</h2>
                        <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Command Center</p>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Management</p>

                {navItems.map((item) => {
                    // ✅ FIX: Strict match for "/", startsWith for everything else
                    const isActive = item.href === '/'
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Footer */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>
    );
}