// src/services/songService.js
import api from './api';
import { formatSongUrls, formatSongsUrls, getAudioStreamUrl as getStreamUrl } from '../utils/imageHelper';

// Get all songs (user's songs + default songs)
export const getAllSongs = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/songs', {
      params: { page, limit }
    });
    
    // Format songs with full URLs
    if (response.data.success && response.data.data) {
      response.data.data = formatSongsUrls(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's uploaded songs only
export const getMySongs = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/songs/my-songs', {
      params: { page, limit }
    });
    
    // Format songs with full URLs
    if (response.data.success && response.data.data) {
      response.data.data = formatSongsUrls(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single song by ID
export const getSongById = async (id) => {
  try {
    const response = await api.get(`/songs/${id}`);
    
    // Format song with full URLs
    if (response.data.success && response.data.song) {
      response.data.song = formatSongUrls(response.data.song);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload new song
export const uploadSong = async (formData, onProgress) => {
  try {
    const response = await api.post('/songs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      }
    });
    
    // Format song with full URLs
    if (response.data.success && response.data.song) {
      response.data.song = formatSongUrls(response.data.song);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update song
export const updateSong = async (id, formData) => {
  try {
    const response = await api.put(`/songs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Format song with full URLs
    if (response.data.success && response.data.song) {
      response.data.song = formatSongUrls(response.data.song);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete song
export const deleteSong = async (id) => {
  try {
    const response = await api.delete(`/songs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search songs
export const searchSongs = async (searchParams) => {
  try {
    const response = await api.get('/songs/search', {
      params: searchParams
    });
    
    // Format songs with full URLs
    if (response.data.success && response.data.data) {
      response.data.data = formatSongsUrls(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all genres
export const getGenres = async () => {
  try {
    const response = await api.get('/songs/genres');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get audio stream URL
export const getAudioStreamUrl = (audioFileId) => {
  return getStreamUrl(audioFileId);
};

// Create FormData for song upload
export const createSongFormData = (songData) => {
  const formData = new FormData();
  
  // Add text fields
  if (songData.title) formData.append('title', songData.title);
  if (songData.artist) formData.append('artist', songData.artist);
  if (songData.album) formData.append('album', songData.album);
  if (songData.genre) formData.append('genre', songData.genre);
  
  // Add files
  if (songData.audioFile) {
    formData.append('audioFile', songData.audioFile);
  }
  if (songData.coverImage) {
    formData.append('coverImage', songData.coverImage);
  }
  
  return formData;
};

export default {
  getAllSongs,
  getMySongs,
  getSongById,
  uploadSong,
  updateSong,
  deleteSong,
  searchSongs,
  getGenres,
  getAudioStreamUrl,
  createSongFormData
};