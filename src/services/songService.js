// src/services/songService.js
import api, { createFormDataConfig } from './api';
import { ENDPOINTS, API_URL } from '../utils/constants';

/**
 * Song Service
 * Handles all song related API calls
 */

// Get all songs (user's + default)
export const getAllSongs = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(ENDPOINTS.SONGS, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's uploaded songs only
export const getMySongs = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(ENDPOINTS.MY_SONGS, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single song by ID
export const getSongById = async (id) => {
  try {
    const response = await api.get(ENDPOINTS.SONG_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload new song
export const uploadSong = async (formData, onProgress) => {
  try {
    const response = await api.post(
      ENDPOINTS.UPLOAD_SONG,
      formData,
      {
        ...createFormDataConfig(),
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update song metadata
export const updateSong = async (id, formData) => {
  try {
    const response = await api.put(
      ENDPOINTS.UPDATE_SONG(id),
      formData,
      createFormDataConfig()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete song
export const deleteSong = async (id) => {
  try {
    const response = await api.delete(ENDPOINTS.DELETE_SONG(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search songs
export const searchSongs = async (params) => {
  try {
    const response = await api.get(ENDPOINTS.SEARCH_SONGS, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all genres
export const getGenres = async () => {
  try {
    const response = await api.get(ENDPOINTS.GENRES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get audio stream URL
export const getAudioStreamUrl = (audioFileId) => {
  return `${API_URL}${ENDPOINTS.STREAM_AUDIO(audioFileId)}`;
};

// Get cover image URL
export const getCoverImageUrl = (coverImageId) => {
  if (!coverImageId) return null;
  return `${API_URL}${ENDPOINTS.STREAM_IMAGE(coverImageId)}`;
};

// Create FormData for song upload
export const createSongFormData = (songData) => {
  const formData = new FormData();
  
  if (songData.audioFile) {
    formData.append('audioFile', songData.audioFile);
  }
  
  if (songData.coverImage) {
    formData.append('coverImage', songData.coverImage);
  }
  
  formData.append('title', songData.title);
  formData.append('artist', songData.artist);
  
  if (songData.album) {
    formData.append('album', songData.album);
  }
  
  formData.append('genre', songData.genre);
  
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
  getCoverImageUrl,
  createSongFormData
};