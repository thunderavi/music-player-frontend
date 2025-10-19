// src/context/PlayerContext.jsx
import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';
import { getAudioStreamUrl } from '../services/songService';
import { PLAYER_STATES, REPEAT_MODES, STORAGE_KEYS } from '../utils/constants';
import { shuffleArray } from '../utils/helpers';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [originalPlaylist, setOriginalPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.IDLE);
  
  // Progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Volume
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOLUME);
    return saved ? parseFloat(saved) : 0.7;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  
  // Modes
  const [repeatMode, setRepeatMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REPEAT);
    return saved || REPEAT_MODES.OFF;
  });
  const [isShuffled, setIsShuffled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHUFFLE);
    return saved === 'true';
  });

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    // Event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => handleSongEnd();
    const handlePlay = () => {
      setIsPlaying(true);
      setPlayerState(PLAYER_STATES.PLAYING);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setPlayerState(PLAYER_STATES.PAUSED);
    };
    const handleLoadStart = () => setPlayerState(PLAYER_STATES.LOADING);
    const handleCanPlay = () => {
      if (playerState === PLAYER_STATES.LOADING) {
        setPlayerState(PLAYER_STATES.PAUSED);
      }
    };
    const handleError = () => setPlayerState(PLAYER_STATES.ERROR);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [playerState]);

  // Play song
  const playSong = useCallback((song, songList = null) => {
    if (!song) return;

    const audio = audioRef.current;
    const streamUrl = getAudioStreamUrl(song.audioFileId);

    if (currentSong?._id === song._id && audio.src) {
      // Same song - just toggle play/pause
      togglePlayPause();
    } else {
      // New song
      audio.src = streamUrl;
      setCurrentSong(song);
      
      if (songList) {
        const list = isShuffled ? shuffleArray(songList) : songList;
        setPlaylist(list);
        setOriginalPlaylist(songList);
        const index = list.findIndex(s => s._id === song._id);
        setCurrentIndex(index !== -1 ? index : 0);
      }
      
      audio.play().catch(error => {
        console.error('Play error:', error);
        setPlayerState(PLAYER_STATES.ERROR);
      });
    }
  }, [currentSong, isShuffled]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Play error:', error);
        setPlayerState(PLAYER_STATES.ERROR);
      });
    }
  }, [isPlaying]);

  // Play next song
  const playNext = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (repeatMode === REPEAT_MODES.ONE) {
      nextIndex = currentIndex;
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        nextIndex = repeatMode === REPEAT_MODES.ALL ? 0 : currentIndex;
      }
    }

    if (nextIndex !== currentIndex || repeatMode === REPEAT_MODES.ONE) {
      setCurrentIndex(nextIndex);
      playSong(playlist[nextIndex]);
    }
  }, [playlist, currentIndex, repeatMode, playSong]);

  // Play previous song
  const playPrevious = useCallback(() => {
    if (playlist.length === 0) return;

    if (currentTime > 3) {
      // If more than 3 seconds played, restart current song
      seek(0);
    } else {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = playlist.length - 1;
      }
      setCurrentIndex(prevIndex);
      playSong(playlist[prevIndex]);
    }
  }, [playlist, currentIndex, currentTime, playSong]);

  // Handle song end
  const handleSongEnd = useCallback(() => {
    if (repeatMode === REPEAT_MODES.ONE) {
      audioRef.current.play();
    } else {
      playNext();
    }
  }, [repeatMode, playNext]);

  // Seek to position
  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Change volume
  const changeVolume = useCallback((newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = vol;
    setVolume(vol);
    localStorage.setItem(STORAGE_KEYS.VOLUME, vol.toString());
    if (vol > 0) setIsMuted(false);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      changeVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      changeVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume, changeVolume]);

  // Toggle repeat mode
  const toggleRepeat = useCallback(() => {
    const modes = [REPEAT_MODES.OFF, REPEAT_MODES.ALL, REPEAT_MODES.ONE];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
    localStorage.setItem(STORAGE_KEYS.REPEAT, nextMode);
  }, [repeatMode]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    const newShuffleState = !isShuffled;
    setIsShuffled(newShuffleState);
    localStorage.setItem(STORAGE_KEYS.SHUFFLE, newShuffleState.toString());

    if (newShuffleState) {
      // Shuffle playlist
      const shuffled = shuffleArray(originalPlaylist);
      setPlaylist(shuffled);
      const newIndex = shuffled.findIndex(s => s._id === currentSong?._id);
      setCurrentIndex(newIndex !== -1 ? newIndex : 0);
    } else {
      // Restore original order
      setPlaylist(originalPlaylist);
      const newIndex = originalPlaylist.findIndex(s => s._id === currentSong?._id);
      setCurrentIndex(newIndex !== -1 ? newIndex : 0);
    }
  }, [isShuffled, originalPlaylist, currentSong]);

  // Set playlist
  const setNewPlaylist = useCallback((songs) => {
    const list = isShuffled ? shuffleArray(songs) : songs;
    setPlaylist(list);
    setOriginalPlaylist(songs);
  }, [isShuffled]);

  // Stop playback
  const stop = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setPlayerState(PLAYER_STATES.IDLE);
  }, []);

  const value = {
    // State
    currentSong,
    playlist,
    currentIndex,
    isPlaying,
    playerState,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffled,

    // Actions
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    changeVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    setNewPlaylist,
    stop
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};