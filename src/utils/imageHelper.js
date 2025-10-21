// src/utils/imageHelper.js
// Helper functions to construct proper image and audio URLs

// Get the API base URL from environment or default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Get full image URL from song object or relative path
 * @param {Object|String} input - Song object or relative image URL
 * @returns {String|null} - Full image URL or null if no image
 */
export const getImageUrl = (input) => {
  if (!input) return null;

  // If input is a string (relative URL)
  if (typeof input === 'string') {
    // If already a full URL, return as is
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input;
    }
    // Construct full URL
    return `${API_BASE_URL}${input}`;
  }

  // If input is a song object
  if (typeof input === 'object') {
    const song = input;
    
    // Check for coverImageUrl
    if (song.coverImageUrl) {
      if (song.coverImageUrl.startsWith('http://') || song.coverImageUrl.startsWith('https://')) {
        return song.coverImageUrl;
      }
      return `${API_BASE_URL}${song.coverImageUrl}`;
    }
    
    // Check for coverImageId (construct URL)
    if (song.coverImageId) {
      return `${API_BASE_URL}/api/songs/stream/image/${song.coverImageId}`;
    }
  }

  return null;
};

/**
 * Get full audio stream URL
 * @param {String} audioFileId - Audio file ID from GridFS
 * @returns {String} - Full audio stream URL
 */
export const getAudioStreamUrl = (audioFileId) => {
  if (!audioFileId) return null;
  return `${API_BASE_URL}/api/songs/stream/audio/${audioFileId}`;
};

/**
 * Format song object with full URLs
 * @param {Object} song - Song object from API
 * @returns {Object} - Song object with full URLs
 */
export const formatSongUrls = (song) => {
  if (!song) return null;

  return {
    ...song,
    coverImageUrl: getImageUrl(song),
    audioStreamUrl: getAudioStreamUrl(song.audioFileId)
  };
};

/**
 * Format array of songs with full URLs
 * @param {Array} songs - Array of song objects
 * @returns {Array} - Array of songs with full URLs
 */
export const formatSongsUrls = (songs) => {
  if (!Array.isArray(songs)) return [];
  return songs.map(song => formatSongUrls(song));
};

export default {
  getImageUrl,
  getAudioStreamUrl,
  formatSongUrls,
  formatSongsUrls,
  API_BASE_URL
};