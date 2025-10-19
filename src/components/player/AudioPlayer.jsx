// src/components/player/AudioPlayer.jsx
import React from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { usePlayer } from '../../hooks/usePlayer';
import { formatDuration } from '../../utils/helpers';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    seek
  } = usePlayer();

  if (!currentSong) {
    return null;
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <div className="player-container">
        {/* Song Info */}
        <div className="player-info">
          <div className="player-cover">
            {currentSong.coverImageUrl ? (
              <img src={currentSong.coverImageUrl} alt={currentSong.title} />
            ) : (
              <div className="player-cover-placeholder">🎵</div>
            )}
          </div>
          <div className="player-details">
            <div className="player-title">{currentSong.title}</div>
            <div className="player-artist">{currentSong.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <div className="player-buttons">
            <button className="player-button" onClick={playPrevious}>
              <FiSkipBack size={20} />
            </button>
            <button className="player-button play-button" onClick={togglePlayPause}>
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            <button className="player-button" onClick={playNext}>
              <FiSkipForward size={20} />
            </button>
          </div>

          <div className="player-progress-container">
            <span className="player-time">{formatDuration(currentTime)}</span>
            <div className="player-progress-bar" onClick={handleSeek}>
              <div className="player-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="player-time">{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Volume (Placeholder) */}
        <div className="player-volume">
          {/* Volume controls will be added later */}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;