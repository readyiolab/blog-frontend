import { Outlet, Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Tags,
    Users,
    Settings,
    LogOut,
    Menu
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AdminSidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: FileText, label: "Articles", href: "/admin/articles" },
        { icon: Tags, label: "Categories", href: "/admin/categories" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    const isActive = (path: string) => {
        if (path === '/admin' && location.pathname !== '/admin') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800
        transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
                    <Link to="/" className="font-serif text-xl font-bold tracking-tight text-primary">
                        Telegraph<span className="text-zinc-900 dark:text-white">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">
                        Main Menu
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive(item.href)
                                    ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const AdminHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return (
        <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 hidden md:flex">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold hidden sm:block">Admin Portal</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-sm hidden sm:block">
                        <p className="font-medium leading-none">Super Admin</p>
                        <p className="text-xs text-zinc-500 mt-1">admin@telegraph.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 sticky top-0 z-10">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="-ml-2 mr-2">
                        <Menu size={20} />
                    </Button>
                    <span className="font-serif font-bold text-lg">Admin Dash</span>
                </div>

                <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
