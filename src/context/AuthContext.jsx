// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import toast from 'react-hot-toast';
import { TOAST_MESSAGES, ROUTES } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await authService.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        navigate(ROUTES.DASHBOARD);
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || TOAST_MESSAGES.AUTH_ERROR;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Signup
  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS);
        navigate(ROUTES.DASHBOARD);
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || TOAST_MESSAGES.AUTH_ERROR;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.LOGIN);
    }
  };

  // Update user
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, []);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return user && user.role === 'admin';
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth,
    updateUser,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};