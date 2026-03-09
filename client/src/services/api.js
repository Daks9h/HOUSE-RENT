import axios from 'axios';

// Base URL configuration
const API_URL = 'http://localhost:5000/api';

// Create instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for tokens
// Har request mein token automatic add hoga agar user logged in hai
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (userData) => api.post('/users/register', userData);

// Property Services
export const getAllProperties = () => api.get('/users/properties');
export const getMyBookings = () => api.get('/users/my-bookings');
export const getRenterStats = () => api.get('/users/stats');
export const bookProperty = (bookingData) => api.post('/users/bookings', bookingData);
export const saveProperty = (id) => api.post(`/users/save-property/${id}`);
export const getSavedIds = () => api.get('/users/saved-ids');
export const addProperty = (propertyData) => api.post('/owner/add-property', propertyData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMyProperties = () => api.get('/owner/my-properties');
export const getOwnerStats = () => api.get('/owner/stats');
export const getOwnerBookings = () => api.get('/owner/bookings');
export const updateBookingStatus = (bookingId, status) => api.put('/owner/update-status', { bookingId, status });
export const deleteProperty = (id) => api.delete(`/owner/property/${id}`);
export const updateProperty = (id, propertyData) => api.put(`/owner/property/${id}`, propertyData);

// Admin Services
export const adminGetUsers = () => api.get('/admin/users');
export const adminGetProperties = () => api.get('/admin/properties');
export const adminGetBookings = () => api.get('/admin/bookings');
export const adminUpdateUserGrant = (userId) => api.put(`/admin/users/${userId}/grant`);

export default api;
