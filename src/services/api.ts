import axios from 'axios';

// Create a generic Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors gracefully
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Standardize the error signature mapping back to our Express `success: false, message: ...` pattern
        const customError = {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            status: error.response?.status,
            data: error.response?.data,
        };

        // Auto-logout on 401 Unauthorized (invalid/expired token)
        if (error.response?.status === 401) {
            console.warn('Unauthorized access - redirecting or clearing session');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optionally dispatch an event or redirect
            // window.location.href = '/login'; 
        }

        return Promise.reject(customError);
    }
);

export default api;
