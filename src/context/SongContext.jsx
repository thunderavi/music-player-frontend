// src/context/SongContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import * as songService from '../services/songService';
import toast from 'react-hot-toast';
import { TOAST_MESSAGES } from '../utils/constants';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [mySongs, setMySongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [genres, setGenres] = useState([]);

  // Fetch all songs
  const fetchAllSongs = useCallback(async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const response = await songService.getAllSongs(page, limit);
      if (response.success) {
        setSongs(response.data);
        setPagination(response.pagination);
      }
      return response;
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Failed to load songs');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's songs
  const fetchMySongs = useCallback(async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const response = await songService.getMySongs(page, limit);
      if (response.success) {
        setMySongs(response.data);
        setPagination(response.pagination);
      }
      return response;
    } catch (error) {
      console.error('Error fetching my songs:', error);
      toast.error('Failed to load your songs');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Search songs
  const searchSongs = useCallback(async (searchParams) => {
    try {
      setLoading(true);
      const response = await songService.searchSongs(searchParams);
      if (response.success) {
        setSongs(response.data);
        setPagination(response.pagination);
      }
      return response;
    } catch (error) {
      console.error('Error searching songs:', error);
      toast.error('Search failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload song
  const uploadSong = useCallback(async (songData, onProgress) => {
    try {
      const formData = songService.createSongFormData(songData);
      const response = await songService.uploadSong(formData, onProgress);
      
      if (response.success) {
        toast.success(TOAST_MESSAGES.UPLOAD_SUCCESS);
        // Refresh songs list
        fetchMySongs();
      }
      return response;
    } catch (error) {
      console.error('Error uploading song:', error);
      const errorMessage = error.response?.data?.error?.message || TOAST_MESSAGES.UPLOAD_ERROR;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchMySongs]);

  // Update song
  const updateSong = useCallback(async (id, songData) => {
    try {
      const formData = songService.createSongFormData(songData);
      const response = await songService.updateSong(id, formData);
      
      if (response.success) {
        toast.success(TOAST_MESSAGES.UPDATE_SUCCESS);
        
        // Update in local state
        setSongs(prev => prev.map(song => 
          song._id === id ? { ...song, ...response.song } : song
        ));
        setMySongs(prev => prev.map(song => 
          song._id === id ? { ...song, ...response.song } : song
        ));
      }
      return response;
    } catch (error) {
      console.error('Error updating song:', error);
      const errorMessage = error.response?.data?.error?.message || TOAST_MESSAGES.UPDATE_ERROR;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Delete song
  const deleteSong = useCallback(async (id) => {
    try {
      const response = await songService.deleteSong(id);
      
      if (response.success) {
        toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
        
        // Remove from local state
        setSongs(prev => prev.filter(song => song._id !== id));
        setMySongs(prev => prev.filter(song => song._id !== id));
      }
      return response;
    } catch (error) {
      console.error('Error deleting song:', error);
      const errorMessage = error.response?.data?.error?.message || TOAST_MESSAGES.DELETE_ERROR;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Get single song
  const getSongById = useCallback(async (id) => {
    try {
      const response = await songService.getSongById(id);
      return response;
    } catch (error) {
      console.error('Error fetching song:', error);
      toast.error(TOAST_MESSAGES.NOT_FOUND);
      return { success: false };
    }
  }, []);

  // Fetch genres
  const fetchGenres = useCallback(async () => {
    try {
      const response = await songService.getGenres();
      if (response.success) {
        setGenres(response.genres);
      }
      return response;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return { success: false };
    }
  }, []);

  // Add song to local state
  const addSong = useCallback((song) => {
    setSongs(prev => [song, ...prev]);
    setMySongs(prev => [song, ...prev]);
  }, []);

  // Update song in local state
  const updateSongInState = useCallback((id, updates) => {
    setSongs(prev => prev.map(song => 
      song._id === id ? { ...song, ...updates } : song
    ));
    setMySongs(prev => prev.map(song => 
      song._id === id ? { ...song, ...updates } : song
    ));
  }, []);

  // Clear songs
  const clearSongs = useCallback(() => {
    setSongs([]);
    setMySongs([]);
    setPagination(null);
  }, []);

  const value = {
    // State
    songs,
    mySongs,
    loading,
    pagination,
    genres,

    // Actions
    fetchAllSongs,
    fetchMySongs,
    searchSongs,
    uploadSong,
    updateSong,
    deleteSong,
    getSongById,
    fetchGenres,
    addSong,
    updateSongInState,
    clearSongs
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
};