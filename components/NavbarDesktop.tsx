"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Book, ChevronDown, LogOut, ShieldCheck } from "lucide-react";

type NavLink = { label: string; href: string };

// 1. ADD PROPS TYPE
type NavbarDesktopProps = {
    links: NavLink[];
    user: { name: string; role: string } | null;
    handleLogout: () => void;
};

// 2. UPDATE COMPONENT DEFINITION
const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ links, user, handleLogout }) => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!navRef.current) return;
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    return (
        <nav
            ref={navRef}
            className={`rounded-full flex items-center justify-between px-8 py-3 transition-all duration-500 ease-in-out ${scrolled
                ? "bg-[#0F172A]/90 backdrop-blur-md shadow-2xl border border-white/10 scale-90 w-[70vw]"
                : "bg-[#0F172A] w-[95vw] border border-transparent"
                }`}
        >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                    <Book size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tighter leading-none text-white">JSN English Learning</span>
                    {/* <span className="text-[8px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">TRB</span> */}
                </div>
            </Link>

            {/* LINKS */}
            <ul ref={linksRef} className="flex space-x-8">
                {links.map((link) => (
                    <li key={link.label} className="relative group">
                        <Link href={link.href} className={`text-sm font-bold transition-all duration-300 ${pathname === link.href ? "text-orange-500" : "text-gray-300 hover:text-white"
                            }`}>
                            {link.label}
                        </Link>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : "w-0"
                            }`} />
                    </li>
                ))}
            </ul>

            {/* AUTHENTICATION SECTION */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        {user.role === 'admin' && (
                            <Link
                                href="/admin/dashboard"
                                className="text-[10px] font-black uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-[#0F172A] transition-all"
                            >
                                Dashboard
                            </Link>
                        )}
                        {user.role === 'user' && (
                            <Link
                                href="/user/dashboard"
                                className="text-[10px] font-black uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-[#0F172A] transition-all"
                            >
                                Dashboard
                            </Link>
                        )}

                        <div className="relative group">
                            <button className="flex items-center gap-2 py-1.5 px-3 bg-[#1E293B] border border-white/10 rounded-full hover:border-orange-500 transition-all">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-xs font-bold text-gray-200">{user.name.split(' ')[0]}</span>
                                <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            <div className="absolute right-0 mt-3 w-48 bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50 origin-top-right">
                                <div className="px-4 py-2 border-b border-white/5 mb-1">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Signed in as</p>
                                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-orange-500 text-white px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 active:scale-95"
                    >
                        Get Started
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavbarDesktop;