// src/context/LibraryContext.jsx
import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Configure axios with token
  const api = useMemo(() => axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }), [token]);

  // Fetch all library data
  const fetchLibrary = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [playlistsRes, likedRes] = await Promise.all([
        api.get('/playlists/my'),
        api.get('/songs/liked')
      ]);
      setPlaylists(playlistsRes.data.playlists);
      setLikedSongs(likedRes.data.songs || []);
    } catch (error) {
      console.error('Error fetching library:', error);
    } finally {
      setLoading(false);
    }
  }, [user, token, api]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  // Playlist Actions
  const createPlaylist = async (data) => {
    try {
      const res = await api.post('/playlists', data);
      setPlaylists(prev => [res.data.playlist, ...prev]);
      return res.data.playlist;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  };

  const deletePlaylist = async (id) => {
    try {
      await api.delete(`/playlists/${id}`);
      setPlaylists(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  };

  const addSongToPlaylist = async (playlistId, songId) => {
    try {
      await api.post(`/playlists/${playlistId}/songs`, { songId });
      // Refresh playlist data
      fetchLibrary();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      throw error;
    }
  };

  // Like Actions
  const toggleLike = async (songId, song = null) => {
    try {
      const res = await api.post(`/songs/${songId}/like`);
      if (res.data.isLiked) {
        if (song) {
          setLikedSongs(prev => [song, ...prev]);
        } else {
          fetchLikedSongs();
        }
      } else {
        setLikedSongs(prev => prev.filter(s => s._id !== songId));
      }
      return res.data.isLiked;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const res = await api.get('/songs/liked');
      setLikedSongs(res.data.songs || []);
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  const isLiked = (songId) => {
    return likedSongs.some(s => s._id === songId);
  };

  const value = {
    playlists,
    likedSongs,
    loading,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    toggleLike,
    isLiked,
    refreshLibrary: fetchLibrary
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
