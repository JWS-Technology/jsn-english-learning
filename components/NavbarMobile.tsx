"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Book } from "lucide-react";

// 1. ADD PROPS TYPE
type NavbarMobileProps = {
    links: any[];
    user: {
        name: string;
        role: string;
        email: string; // Add this line
    } | null;
    handleLogout: () => void;
};

// 2. UPDATE COMPONENT DEFINITION
const NavbarMobile: React.FC<NavbarMobileProps> = ({ links, user, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`mx-auto rounded-[2rem] px-6 py-4 transition-all duration-500 z-50 ${scrolled
                ? "bg-[#0F172A]/90 backdrop-blur-md shadow-2xl scale-90 w-[90vw] border border-white/10"
                : "bg-[#0F172A] w-[95vw]"
                } ${open ? "rounded-3xl bg-[#0F172A]" : ""}`}
        >
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Book className="text-orange-500" size={24} />
                    <span className="text-white font-black tracking-tighter text-lg uppercase">JSN English Learning</span>
                </Link>

                <button
                    onClick={() => setOpen(!open)}
                    className={`text-white p-2 rounded-xl transition-all duration-300 ${open ? "bg-orange-500 rotate-90" : "bg-white/5"}`}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col space-y-4 pb-4">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-gray-300 font-bold hover:text-orange-500 transition-colors text-lg border-b border-white/5 pb-2"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-auto space-y-4">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-[#1E293B] rounded-[2rem] border border-white/5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl font-black uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white truncate">{user.name}</p>
                                        <p className="text-[10px] text-orange-500 lowercase font-black tracking-widest">{user.email}</p>
                                    </div>

                                </div>

                                {user.role === 'admin' && (
                                    <Link
                                        href="/admin/dashboard"
                                        onClick={() => setOpen(false)}
                                        className="w-full py-4 bg-white/5 text-white text-center font-bold rounded-2xl border border-white/10"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                {user.role === 'user' && (
                                    <Link
                                        href="/user/dashboard"
                                        onClick={() => setOpen(false)}
                                        className="w-full py-4 bg-white/5 text-white text-center font-bold rounded-2xl border border-white/10"
                                    >
                                        User Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-4 bg-red-500/10 text-red-500 font-bold rounded-2xl border border-red-500/20"
                                >
                                    Logout Session
                                </button>
                            </div>
                        ) : (
                            <div>

                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="block w-full py-5 bg-orange-500 text-white text-center font-black uppercase tracking-widest rounded-[2rem] text-lg shadow-xl shadow-orange-900/40"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarMobile;