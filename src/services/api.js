// src/services/api.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden
          console.error('Access denied:', data.error?.message);
          break;
          
        case 404:
          // Not found
          console.error('Resource not found:', data.error?.message);
          break;
          
        case 500:
          // Server error
          console.error('Server error:', data.error?.message);
          break;
          
        default:
          console.error('API Error:', data.error?.message || 'Unknown error');
      }
      
      return Promise.reject(error);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response from server');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Helper function for multipart/form-data requests
export const createFormDataConfig = () => ({
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Helper to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.error?.message || 'An error occurred';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'Something went wrong';
  }
};

export default api;