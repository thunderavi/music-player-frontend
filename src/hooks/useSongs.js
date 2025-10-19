// src/hooks/useSongs.js
import { useContext } from 'react';
import { SongContext } from '../context/SongContext';

/**
 * Custom hook to use Song Context
 * Provides access to songs data and operations
 */
export const useSongs = () => {
  const context = useContext(SongContext);
  
  if (!context) {
    throw new Error('useSongs must be used within a SongProvider');
  }
  
  return context;
};

export default useSongs;