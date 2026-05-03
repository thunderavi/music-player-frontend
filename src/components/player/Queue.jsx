import React from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import './Queue.css';

const Queue = ({ isOpen, onClose }) => {
  const { playlist, currentIndex, playSong } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="player-queue-overlay">
      <div className="player-queue-container">
        <div className="queue-header">
          <h3>Queue</h3>
          <button className="close-queue" onClick={onClose}>&times;</button>
        </div>
        <div className="queue-list">
          {playlist.map((song, index) => (
            <div 
              key={`${song._id}-${index}`} 
              className={`queue-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => playSong(song)}
            >
              <div className="queue-item-info">
                <div className="queue-item-title">{song.title}</div>
                <div className="queue-item-artist">{song.artist}</div>
              </div>
              {index === currentIndex && <div className="now-playing-tag">Now Playing</div>}
            </div>
          ))}
          {playlist.length === 0 && <p className="empty-queue">Your queue is empty</p>}
        </div>
      </div>
    </div>
  );
};

export default Queue;
