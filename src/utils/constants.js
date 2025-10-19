// src/utils/constants.js

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  ALL_SONGS: '/songs',
  MY_SONGS: '/my-songs',
  UPLOAD: '/upload',
  ADMIN: '/admin',
  NOT_FOUND: '*'
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! 🎵',
  LOGOUT_SUCCESS: 'Logged out successfully',
  SIGNUP_SUCCESS: 'Account created! Welcome! 🎉',
  AUTH_ERROR: 'Authentication failed',
  UPLOAD_SUCCESS: 'Song uploaded successfully! 🎵',
  UPLOAD_ERROR: 'Failed to upload song',
  UPDATE_SUCCESS: 'Song updated successfully',
  UPDATE_ERROR: 'Failed to update song',
  DELETE_SUCCESS: 'Song deleted successfully',
  DELETE_ERROR: 'Failed to delete song',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNAUTHORIZED: 'Please login to continue',
  NOT_FOUND: 'Resource not found'
};

export const STORAGE_KEYS = {
  THEME: 'music-player-theme',
  VOLUME: 'music-player-volume',
  REPEAT: 'music-player-repeat',
  SHUFFLE: 'music-player-shuffle'
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

export const PLAYER_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LOADING: 'loading',
  ERROR: 'error'
};

export const REPEAT_MODES = {
  OFF: 'off',
  ONE: 'one',
  ALL: 'all'
};

export const ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  SONGS: '/songs',
  MY_SONGS: '/songs/my-songs',
  UPLOAD_SONG: '/songs/upload',
  SONG_BY_ID: (id) => `/songs/${id}`,
  UPDATE_SONG: (id) => `/songs/${id}`,
  DELETE_SONG: (id) => `/songs/${id}`,
  STREAM_AUDIO: (id) => `/songs/stream/audio/${id}`,
  STREAM_IMAGE: (id) => `/songs/stream/image/${id}`,
  SEARCH_SONGS: '/songs/search',
  GENRES: '/songs/genres',
  ADMIN_SONGS: '/admin/songs',
  ADMIN_UPLOAD: '/admin/songs/upload',
  ADMIN_UPDATE_SONG: (id) => `/admin/songs/${id}`,
  ADMIN_DELETE_SONG: (id) => `/admin/songs/${id}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_DELETE_USER: (id) => `/admin/users/${id}`
};