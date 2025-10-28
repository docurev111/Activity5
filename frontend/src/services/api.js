import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if:
    // 1. It's a 401 error
    // 2. We're NOT already on the login or register page
    // 3. The request was NOT to the auth endpoints (login/register)
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      const isOnAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
      
      if (!isAuthEndpoint && !isOnAuthPage) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Posts API
export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  getByCategory: (category, params) => api.get(`/posts/category/${category}`, { params }),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.patch(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  incrementView: (id) => api.post(`/posts/${id}/view`),
};

// Comments API
export const commentsAPI = {
  getByPost: (postId, params) => api.get(`/comments/post/${postId}`, { params }),
  create: (data) => api.post('/comments', data),
  update: (id, data) => api.patch(`/comments/${id}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
};

// Reactions API
export const reactionsAPI = {
  getByPost: (postId) => api.get(`/reactions/post/${postId}`),
  create: (data) => api.post('/reactions', data),
  delete: (postId) => api.delete(`/reactions/post/${postId}`),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
};

export default api;
