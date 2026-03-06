import api from './api';

export const articleService = {
    // Get all with optional filters
    getAll: async (params?: any) => {
        const response = await api.get('/articles', { params });
        return response.data;
    },

    getFeatured: async () => {
        const response = await api.get('/articles/featured');
        return response.data;
    },

    getTrending: async () => {
        const response = await api.get('/articles/trending');
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await api.get(`/articles/slug/${slug}`);
        return response.data;
    },

    getByCategory: async (slug: string) => {
        const response = await api.get(`/articles/category/${slug}`);
        return response.data;
    },

    // Protected Admin/Author routes
    create: async (data: any) => {
        const response = await api.post('/articles', data);
        return response.data;
    },

    update: async (id: number, data: any) => {
        const response = await api.put(`/articles/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/articles/${id}`);
        return response.data;
    },

    publish: async (id: number) => {
        const response = await api.put(`/articles/${id}/publish`);
        return response.data;
    }
};
