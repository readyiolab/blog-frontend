import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText,
    Users,
    Eye,
    Tags,
    Activity,
    ArrowUpRight
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock chart data - in production, this would also come from `adminService.getDashboardStats()`
    const chartData = [
        { name: "Mon", views: 4000 },
        { name: "Tue", views: 3000 },
        { name: "Wed", views: 2000 },
        { name: "Thu", views: 2780 },
        { name: "Fri", views: 1890 },
        { name: "Sat", views: 2390 },
        { name: "Sun", views: 3490 },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminService.getDashboardStats();
                if (response.success) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <Activity size={32} className="text-primary animate-bounce" />
                    <p className="text-zinc-500 font-medium">Loading Dashboard Data...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { title: "Total Articles", value: stats?.totalArticles || 0, icon: FileText, change: "+12%" },
        { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, change: "+5%" },
        { title: "Today's Views", value: stats?.viewsToday?.toLocaleString() || 0, icon: Eye, change: "+24%" },
        { title: "Categories", value: stats?.totalCategories || 0, icon: Tags, change: "+2%" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                    Welcome back Admin! Here is what's happening today.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Card key={i} className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                {stat.title}
                            </CardTitle>
                            <stat.icon size={16} className="text-zinc-400 dark:text-zinc-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 font-medium">
                                <ArrowUpRight size={12} />
                                {stat.change} <span className="text-zinc-500 dark:text-zinc-500 font-normal">from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Weekly Article Views</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f4f4f5' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="views" fill="#09090b" className="dark:fill-white" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Recent Activity Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {stats?.recentActivity?.map((activity: any, i: number) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center flex-shrink-0">
                                        <Activity size={14} className="text-zinc-600 dark:text-zinc-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex gap-2">
                                            <span className="font-medium text-zinc-900 dark:text-white">{activity.user}</span> • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
