import React from "react";

export default function CBTLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Notice there is NO <Navbar /> or <Footer /> here.
    // This ensures a full-screen, distraction-free environment for the test.
    return (
        <div className="bg-[#F8FAFC] min-h-screen selection:bg-blue-500/30">
            {children}
        </div>
    );
}