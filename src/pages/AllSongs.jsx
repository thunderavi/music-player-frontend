import React, { useEffect } from 'react';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import './Pages.css';

const AllSongs = () => {
  const { songs, loading, fetchAllSongs } = useSongs();
  const { playSong } = usePlayer();

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const handlePlay = (song) => {
    playSong(song, songs);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Songs</h1>
        <p>Browse all available songs</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading songs...</p>
        </div>
      ) : songs?.length > 0 ? (
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
              {songs.map((song, index) => (
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No songs available yet</p>
        </div>
      )}
    </div>
  );
};

export default AllSongs;