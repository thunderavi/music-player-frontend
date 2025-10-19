import React, { useEffect } from 'react';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import { Link } from 'react-router-dom';
import './Pages.css';

const MySongs = () => {
  const { mySongs, loading, fetchMySongs, deleteSong } = useSongs();
  const { playSong } = usePlayer();

  useEffect(() => {
    fetchMySongs();
  }, [fetchMySongs]);

  const handlePlay = (song) => {
    playSong(song, mySongs);
  };

  const handleDelete = async (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      await deleteSong(songId);
      fetchMySongs();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Songs</h1>
        <p>Songs you've uploaded</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your songs...</p>
        </div>
      ) : mySongs?.length > 0 ? (
        <div className="songs-list">
          <table className="songs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mySongs.map((song, index) => (
                <tr key={song._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="song-cell">
                      <div className="song-cover-tiny">
                        {song.coverImageUrl ? (
                          <img src={song.coverImageUrl} alt={song.title} />
                        ) : (
                          '🎵'
                        )}
                      </div>
                      <span>{song.title}</span>
                    </div>
                  </td>
                  <td>{song.artist}</td>
                  <td>{song.album || '-'}</td>
                  <td>
                    <span className="genre-badge">{song.genre}</span>
                  </td>
                  <td>
                    <button 
                      className="btn-play"
                      onClick={() => handlePlay(song)}
                    >
                      ▶️ Play
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(song._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>You haven't uploaded any songs yet</p>
          <Link to="/upload" className="btn btn-primary">Upload Your First Song</Link>
        </div>
      )}
    </div>
  );
};

export default MySongs;