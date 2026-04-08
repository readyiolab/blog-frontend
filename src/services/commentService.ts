import api from "./api";

export const commentService = {
    getForArticle: async (articleId: number) => {
        const response = await api.get(`/comments/article/${articleId}`);
        return response.data;
    },

    addComment: async (data: { articleId: number; content: string }) => {
        const response = await api.post("/comments", data);
        return response.data;
    },
};
