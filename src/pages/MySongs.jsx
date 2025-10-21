import React, { useEffect } from 'react';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import { Link, useNavigate } from 'react-router-dom';
import './MySongs.css';

const MySongs = () => {
  const { mySongs, loading, fetchMySongs, deleteSong } = useSongs();
  const { playSong } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMySongs();
  }, [fetchMySongs]);

  const handlePlay = (song) => {
    playSong(song, mySongs);
  };

  const handleEdit = (songId) => {
    navigate(`/edit-song/${songId}`);
  };

  const handleDelete = async (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      await deleteSong(songId);
      fetchMySongs();
    }
  };

  if (loading) {
    return (
      <div className="my-songs-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your songs...</p>
        </div>
      </div>
    );
  }

  if (!mySongs || mySongs.length === 0) {
    return (
      <div className="my-songs-page">
        <div className="empty-state-container">
          <div className="empty-icon">🎵</div>
          <h2>No songs yet</h2>
          <p>Upload your first song to start building your library</p>
          <Link to="/upload" className="upload-link-btn">
            Upload Song
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-songs-page">
      <div className="page-header-section">
        <h1>My Songs</h1>
        <p className="page-subtitle">{mySongs.length} song{mySongs.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="songs-table-wrapper">
        <table className="songs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mySongs.map((song, index) => (
              <tr key={song._id}>
                <td className="track-number-cell">
                  <span className="track-number">{index + 1}</span>
                  <button 
                    className="track-play-btn"
                    onClick={() => handlePlay(song)}
                    aria-label="Play song"
                  >
                    ▶
                  </button>
                </td>
                
                <td>
                  <div className="title-cell">
                    <div className="song-thumbnail">
                      {song.coverImageUrl ? (
                        <img src={song.coverImageUrl} alt={song.title} />
                      ) : (
                        <span className="song-thumbnail-icon">🎵</span>
                      )}
                    </div>
                    <div className="song-details">
                      <div className="song-name">{song.title}</div>
                    </div>
                  </div>
                </td>
                
                <td>
                  <span className="artist-name">{song.artist}</span>
                </td>
                
                <td>
                  <span className="album-name">{song.album || '-'}</span>
                </td>
                
                <td>
                  <span className="genre-tag">{song.genre}</span>
                </td>
                
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      className="icon-btn btn-play"
                      onClick={() => handlePlay(song)}
                      title="Play"
                    >
                      Play
                    </button>
                    <button
                      className="icon-btn btn-edit"
                      onClick={() => handleEdit(song._id)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="icon-btn btn-delete"
                      onClick={() => handleDelete(song._id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySongs;