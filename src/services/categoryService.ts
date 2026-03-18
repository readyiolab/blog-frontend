import api from "./api";

export const categoryService = {
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  getHeaderCategories: async () => {
    const response = await api.get("/categories/header");
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  create: async (data: Record<string, unknown>) => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  update: async (id: number, data: Record<string, unknown>) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
