import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-blue-500/30">
            {/* Persistent Sidebar */}
            <AdminSidebar />

            {/* Scrollable Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {children}
            </main>
        </div>
    );
}