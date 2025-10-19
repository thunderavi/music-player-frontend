// src/hooks/usePlayer.js
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

/**
 * Custom hook to use Player Context
 * Provides access to music player state and controls
 */
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  
  return context;
};

export default usePlayer;