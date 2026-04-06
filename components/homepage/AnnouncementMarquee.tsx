// components/homepage/AnnouncementMarquee.tsx
"use client";
import { motion } from "framer-motion";
import { BellRing } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AnnouncementMarquee({ announcements }: { announcements: any[] }) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (marqueeRef.current && containerRef.current) {
            setWidth(marqueeRef.current.scrollWidth);
            setContainerWidth(containerRef.current.offsetWidth);
        }
    }, [announcements]);

    if (!announcements.length) return null;

    return (
        <div ref={containerRef} className="absolute bottom-5 left-0 w-full bg-orange-500/10 border-y border-orange-500/20 py-3 z-20 overflow-hidden">
            <motion.div
                ref={marqueeRef}
                animate={{ x: [containerWidth, -width] }}
                transition={{ ease: "linear", duration: (width + containerWidth) / 80, repeat: Infinity }}
                className="flex whitespace-nowrap"
            >
                {[...announcements, ...announcements].map((item, i) => (
                    <span key={i} className="text-white font-bold text-sm mx-8 flex items-center gap-3">
                        <BellRing className="w-4 h-4" /> {item.message}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}