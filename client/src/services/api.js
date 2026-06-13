import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gemstone-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gemstone-token');
      // Don't redirect here - let the component handle it
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const gemstoneAPI = {
  getAll: (params) => api.get('/gemstones', { params }),
  getById: (id) => api.get(`/gemstones/${id}`),
};

export const recommendAPI = {
  getRecommendation: (data) => api.post('/recommend', data),
  getHistory: () => api.get('/recommend/history'),
};

export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  add: (gemstoneId) => api.post('/favorites', { gemstoneId }),
  remove: (gemstoneId) => api.delete(`/favorites/${gemstoneId}`),
};

export default api;
