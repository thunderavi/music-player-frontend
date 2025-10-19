// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to use Auth Context
 * Provides access to authentication state and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;