import api from "./api";

export const newsletterService = {
  subscribe: async (data: { email: string; firstName?: string }) => {
    const response = await api.post("/newsletter/subscribe", data);
    return response.data;
  },
};
