// src/services/authService.js
import api from './api';
import { ENDPOINTS } from '../utils/constants';

/**
 * Auth Service
 * Handles all authentication related API calls
 */

// Sign up new user
export const signup = async (userData) => {
  try {
    const response = await api.post(ENDPOINTS.SIGNUP, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await api.post(ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get(ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await api.get(ENDPOINTS.ME);
    return {
      isAuthenticated: true,
      user: response.data.user
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null
    };
  }
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
  checkAuth
};