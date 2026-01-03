import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User APIs
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// City APIs
export const cityAPI = {
  getAllCities: (params) => api.get('/cities', { params }),
  getCityById: (id) => api.get(`/cities/${id}`),
  createCity: (data) => api.post('/cities', data),
  updateCity: (id, data) => api.put(`/cities/${id}`, data),
  deleteCity: (id) => api.delete(`/cities/${id}`),
};

// Activity APIs
export const activityAPI = {
  getActivitiesByCity: (cityId) => api.get(`/activities/city/${cityId}`),
  getActivityById: (id) => api.get(`/activities/${id}`),
  createActivity: (data) => api.post('/activities', data),
  updateActivity: (id, data) => api.put(`/activities/${id}`, data),
  deleteActivity: (id) => api.delete(`/activities/${id}`),
};

// Trip APIs
export const tripAPI = {
  getAllTrips: () => api.get('/trips'),
  getTripById: (id) => api.get(`/trips/${id}`),
  createTrip: (data) => api.post('/trips', data),
  updateTrip: (id, data) => api.put(`/trips/${id}`, data),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  addStop: (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
  deleteStop: (tripId, stopId) => api.delete(`/trips/${tripId}/stops/${stopId}`),
  addActivity: (tripId, stopId, activityId) =>
    api.post(`/trips/${tripId}/stops/${stopId}/activities/${activityId}`),
  removeActivity: (tripId, stopId, activityId) =>
    api.delete(`/trips/${tripId}/stops/${stopId}/activities/${activityId}`),
};

export default api;
