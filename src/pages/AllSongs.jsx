import React, { useEffect, useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import './AllSongs.css';

const AllSongs = () => {
  const { songs, loading, fetchAllSongs } = useSongs();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const handlePlay = (song) => {
    playSong(song, filteredSongs);
  };

  // Get unique genres
  const genres = ['All', ...new Set(songs?.map(song => song.genre) || [])];

  // Filter songs
  const filteredSongs = songs?.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.album?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }) || [];

  return (
    <div className="all-songs-page">
      {/* Header */}
      <div className="all-songs-header">
        <h1>All Songs</h1>
        <p>{songs?.length || 0} songs available</p>
      </div>

      {/* Search and Filters */}
      <div className="songs-controls">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="genre-filter">
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

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

      {/* Content */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>Loading songs...</p>
        </div>
      ) : filteredSongs.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="songs-grid-view">
              {filteredSongs.map((song) => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <div 
                    key={song._id} 
                    className={`song-card ${isCurrentSong ? 'playing' : ''}`}
                    onClick={() => handlePlay(song)}
                  >
                    <div className="song-card-image">
                      {song.coverImageUrl ? (
                        <img src={song.coverImageUrl} alt={song.title} />
                      ) : (
                        <div className="song-card-placeholder">🎵</div>
                      )}
                      <div className="song-card-overlay">
                        <button className="play-btn-large">
                          {isCurrentSong && isPlaying ? (
                            <svg viewBox="0 0 24 24" width="28" height="28">
                              <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="28" height="28">
                              <path fill="currentColor" d="M8 5v14l11-7z"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="song-card-info">
                      <h3>{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                      {song.album && <p className="song-album">{song.album}</p>}
                      <span className="song-genre-tag">{song.genre}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="songs-list-view">
              <table className="songs-table">
                <thead>
                  <tr>
                    <th className="col-index">#</th>
                    <th className="col-title">Title</th>
                    <th className="col-artist">Artist</th>
                    <th className="col-album">Album</th>
                    <th className="col-genre">Genre</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSongs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <tr 
                        key={song._id} 
                        className={`song-row ${isCurrentSong ? 'active' : ''}`}
                        onClick={() => handlePlay(song)}
                      >
                        <td className="col-index">
                          {isCurrentSong && isPlaying ? (
                            <div className="playing-indicator">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="col-title">
                          <div className="song-title-cell">
                            <div className="song-thumbnail">
                              {song.coverImageUrl ? (
                                <img src={song.coverImageUrl} alt={song.title} />
                              ) : (
                                <span>🎵</span>
                              )}
                            </div>
                            <span className="song-title-text">{song.title}</span>
                          </div>
                        </td>
                        <td className="col-artist">{song.artist}</td>
                        <td className="col-album">{song.album || '-'}</td>
                        <td className="col-genre">
                          <span className="genre-badge">{song.genre}</span>
                        </td>
                        <td className="col-actions">
                          <button 
                            className="action-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlay(song);
                            }}
                          >
                            {isCurrentSong && isPlaying ? (
                              <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No songs found</h3>
          <p>Try adjusting your search or filters</p>
          {(searchTerm || selectedGenre !== 'All') && (
            <button 
              className="btn-reset"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllSongs;