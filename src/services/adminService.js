// src/services/adminService.js
import api, { createFormDataConfig } from './api';
import { ENDPOINTS } from '../utils/constants';

/**
 * Admin Service
 * Handles all admin related API calls
 */

// Upload default song (visible to all users)
export const uploadDefaultSong = async (formData, onProgress) => {
  try {
    const response = await api.post(
      ENDPOINTS.ADMIN_UPLOAD,
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

// Get all default songs
export const getAllDefaultSongs = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(ENDPOINTS.ADMIN_SONGS, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update default song
export const updateDefaultSong = async (id, formData) => {
  try {
    const response = await api.put(
      ENDPOINTS.ADMIN_UPDATE_SONG(id),
      formData,
      createFormDataConfig()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete default song
export const deleteDefaultSong = async (id) => {
  try {
    const response = await api.delete(ENDPOINTS.ADMIN_DELETE_SONG(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all users
export const getAllUsers = async (page = 1, limit = 20, role = null) => {
  try {
    const params = { page, limit };
    if (role) params.role = role;
    
    const response = await api.get(ENDPOINTS.ADMIN_USERS, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(ENDPOINTS.ADMIN_DELETE_USER(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get statistics (can be extended)
export const getStatistics = async () => {
  try {
    // This endpoint doesn't exist in backend yet, but can be added
    // For now, we can aggregate data from other endpoints
    const [usersData, songsData] = await Promise.all([
      getAllUsers(1, 1), // Get just count
      getAllDefaultSongs(1, 1) // Get just count
    ]);
    
    return {
      totalUsers: usersData.pagination?.totalItems || 0,
      totalDefaultSongs: songsData.pagination?.totalItems || 0
    };
  } catch (error) {
    throw error;
  }
};

export default {
  uploadDefaultSong,
  getAllDefaultSongs,
  updateDefaultSong,
  deleteDefaultSong,
  getAllUsers,
  deleteUser,
  getStatistics
};