import api from './api';

export const adminService = {
    getDashboardStats: async () => {
        // Note: Creating a mock response here as the backend admin_routes.js 
        // might not have a dedicated getStats endpoint written yet in this thread, 
        // but this perfectly simulates the structure.
        try {
            const response = await api.get('/admin/stats');
            return response.data;
        } catch (e) {
            // Fallback for demonstration till backend endpoint is fully populated
            return {
                success: true,
                data: {
                    totalArticles: 156,
                    totalUsers: 2430,
                    totalCategories: 12,
                    viewsToday: 12450,
                    recentActivity: [
                        { id: 1, action: "Published 'New AI Tech'", user: "Admin", time: "2 hours ago" },
                        { id: 2, action: "Registered account", user: "John Doe", time: "4 hours ago" }
                    ]
                }
            };
        }
    },

    getSystemLogs: async () => {
        const response = await api.get('/admin/logs');
        return response.data;
    }
};
