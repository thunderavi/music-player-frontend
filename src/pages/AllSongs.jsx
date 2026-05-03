import React, { useEffect, useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import SongActionMenu from '../components/songs/SongActionMenu';
import SongCardSkeleton from '../components/songs/SongCardSkeleton';
import './AllSongs.css';

const AllSongs = () => {
  const { songs, loading, fetchAllSongs, searchSongs } = useSongs();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Fetch all songs on mount
  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() || selectedGenre !== 'All') {
        searchSongs({ 
          query: searchTerm, 
          genre: selectedGenre === 'All' ? undefined : selectedGenre 
        });
      } else {
        fetchAllSongs();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedGenre, searchSongs, fetchAllSongs]);

  const handlePlay = (song) => {
    playSong(song, songs);
  };

  // Genres list
  const genres = ['All', 'Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classical', 'Electronic', 'Lo-fi'];

  const displaySongs = songs || [];

  return (
    <div className="all-songs-page">
      {/* Header */}
      <div className="all-songs-header">
        <h1>All Songs</h1>
        <p>{songs?.length || 0} songs available</p>
      </div>

      {/* Search and Filters */}
      <div className="songs-controls">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" width="20" height="20" className="search-icon">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search by title, artist or album..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <div className="genre-filters">
            {genres.map(genre => (
              <button 
                key={genre}
                className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="songs-grid-view">
          {[...Array(8)].map((_, i) => (
            <SongCardSkeleton key={i} />
          ))}
        </div>
      ) : displaySongs.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="songs-grid-view">
              {displaySongs.map(song => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <div 
                    key={song._id} 
                    className={`song-card ${isCurrentSong ? 'active' : ''}`}
                    onClick={() => handlePlay(song)}
                  >
                    <div className="song-card-image">
                      {song.coverImageUrl ? (
                        <img src={song.coverImageUrl} alt={song.title} />
                      ) : (
                        <div className="placeholder-icon">🎵</div>
                      )}
                      <button className="play-overlay">
                        {isCurrentSong && isPlaying ? (
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="song-card-info">
                      <div className="song-card-header">
                        <h3>{song.title}</h3>
                        <div onClick={e => e.stopPropagation()}>
                          <SongActionMenu song={song} />
                        </div>
                      </div>
                      <p>{song.artist}</p>
                      <span className="genre-badge">{song.genre}</span>
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
                  {displaySongs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <tr 
                        key={song._id} 
                        className={`song-row ${isCurrentSong ? 'active' : ''}`}
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
                        <td className="col-genre">
                          <span className="genre-badge">{song.genre}</span>
                        </td>
                        <td className="col-actions">
                          <div className="action-cell-container" onClick={e => e.stopPropagation()}>
                            <SongActionMenu song={song} />
                          </div>
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
          <p>Try adjusting your search or category filters</p>
          <button 
            className="reset-search-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSongs;