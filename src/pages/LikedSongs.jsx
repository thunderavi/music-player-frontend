import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../hooks/usePlayer';
import './AllSongs.css'; // Reuse AllSongs styling

const LikedSongs = () => {
  const { likedSongs, loading, toggleLike, isLiked } = useLibrary();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const handlePlay = (song) => {
    playSong(song, filteredSongs);
  };

  const filteredSongs = likedSongs?.filter(song => {
    return song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
           song.album?.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <div className="all-songs-page">
      <div className="all-songs-header">
        <h1>Liked Songs</h1>
        <p>{likedSongs?.length || 0} songs</p>
      </div>

      <div className="songs-controls">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search in liked songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
              </svg>
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your liked songs...</p>
        </div>
      ) : filteredSongs.length > 0 ? (
        <div className={viewMode === 'grid' ? 'songs-grid-view' : 'songs-list-view'}>
          {viewMode === 'grid' ? (
            filteredSongs.map(song => (
              <div 
                key={song._id} 
                className={`song-card ${currentSong?._id === song._id ? 'playing' : ''}`}
                onClick={() => handlePlay(song)}
              >
                <div className="song-card-image">
                  {song.coverImageUrl ? <img src={song.coverImageUrl} alt={song.title} /> : <div className="song-card-placeholder">🎵</div>}
                  <div className="song-card-overlay">
                    <button className="play-btn-large">
                      {currentSong?._id === song._id && isPlaying ? 
                        <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg> : 
                        <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                      }
                    </button>
                  </div>
                </div>
                <div className="song-card-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <table className="songs-table">
              <thead>
                <tr>
                  <th className="col-index">#</th>
                  <th className="col-title">Title</th>
                  <th className="col-artist">Artist</th>
                  <th className="col-album">Album</th>
                  <th className="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song, index) => (
                  <tr 
                    key={song._id} 
                    className={`song-row ${currentSong?._id === song._id ? 'active' : ''}`}
                    onClick={() => handlePlay(song)}
                  >
                    <td className="col-index">{index + 1}</td>
                    <td className="col-title">
                      <div className="song-title-cell">
                        <div className="song-thumbnail">
                          {song.coverImageUrl ? <img src={song.coverImageUrl} alt={song.title} /> : <span>🎵</span>}
                        </div>
                        <span className="song-title-text">{song.title}</span>
                      </div>
                    </td>
                    <td className="col-artist">{song.artist}</td>
                    <td className="col-album">{song.album || '-'}</td>
                    <td className="col-actions">
                      <button 
                        className="player-button btn-like active"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song._id);
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path fill="#1db954" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3>Your liked songs will appear here</h3>
          <p>Start liking songs to build your personal library</p>
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
