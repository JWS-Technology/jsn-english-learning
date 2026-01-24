"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Study Materials", href: "/materials" },
    { label: "Online Tests", href: "/online-tests" },
    { label: "YouTube", href: "/youtube" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Sync user state with database on route change
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get("/api/auth/me");
                if (data.success && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        };
        checkAuth();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setUser(null);
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="pointer-events-auto">
            <div className="hidden lg:flex fixed inset-x-0 top-3 justify-center z-[100]">
                <NavbarDesktop
                    links={NAV_LINKS}
                    user={user}
                    handleLogout={handleLogout}
                />
            </div>

            <div className="lg:hidden fixed inset-x-0 top-3 justify-center z-[100]">
                <NavbarMobile
                    links={NAV_LINKS}
                    user={user}
                    handleLogout={handleLogout}
                />
            </div>
        </div>
    );
};

export default Navbar;