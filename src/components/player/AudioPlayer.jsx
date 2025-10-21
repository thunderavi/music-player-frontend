// src/components/player/AudioPlayer.jsx
import React, { useRef } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffled,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    changeVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle
  } = usePlayer();

  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Format time helper
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    seek(newTime);
  };

  // Handle volume bar click
  const handleVolumeClick = (e) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    changeVolume(Math.max(0, Math.min(1, percent)));
  };

  // Get repeat icon based on mode
  const getRepeatIcon = () => {
    const color = repeatMode !== 'off' ? '#1db954' : 'currentColor';
    return (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill={color} d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
        {repeatMode === 'one' && (
          <text x="12" y="16" fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">1</text>
        )}
      </svg>
    );
  };

  // Don't render if no song
  if (!currentSong) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      {/* Left Section - Song Info */}
      <div className="player-left">
        <div className="player-cover">
          {currentSong.coverImageUrl ? (
            <img src={currentSong.coverImageUrl} alt={currentSong.title} />
          ) : (
            <div className="cover-placeholder">🎵</div>
          )}
        </div>
        <div className="player-info">
          <div className="player-title">{currentSong.title}</div>
          <div className="player-artist">{currentSong.artist}</div>
        </div>
        <button className="player-button btn-like" title="Like">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      {/* Center Section - Controls */}
      <div className="player-center">
        <div className="player-buttons">
          <button 
            className={`player-button ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </button>

          <button 
            className="player-button"
            onClick={playPrevious}
            title="Previous"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button 
            className="player-button play-button"
            onClick={togglePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button 
            className="player-button"
            onClick={playNext}
            title="Next"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>

          <button 
            className={`player-button ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode}`}
          >
            {getRepeatIcon()}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="player-progress-container">
          <span className="player-time">{formatTime(currentTime)}</span>
          <div 
            className="player-progress-bar"
            ref={progressBarRef}
            onClick={handleProgressClick}
          >
            <div 
              className="player-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-handle"></div>
            </div>
          </div>
          <span className="player-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section - Volume */}
      <div className="player-right">
        <button 
          className="player-button"
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : volume < 0.5 ? (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M7 9v6h4l5 5V4l-5 5H7z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="player-volume">
          <div 
            className="volume-bar"
            ref={volumeBarRef}
            onClick={handleVolumeClick}
          >
            <div 
              className="volume-fill"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="volume-handle"></div>
            </div>
          </div>
        </div>

        <button className="player-button" title="Queue">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;