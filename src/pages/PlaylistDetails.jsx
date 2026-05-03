import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../hooks/usePlayer';
import axios from 'axios';
import { FiPlay, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import './AllSongs.css';

const PlaylistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deletePlaylist, refreshLibrary } = useLibrary();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/playlists/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlaylist(res.data.playlist);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  const handlePlay = (song) => {
    playSong(song, playlist.songs);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      await deletePlaylist(id);
      navigate('/');
    }
  };

  if (loading) return <div className="loading-state"><div className="spinner"></div></div>;
  if (!playlist) return <div className="empty-state"><h3>Playlist not found</h3></div>;

  return (
    <div className="all-songs-page">
      <div className="all-songs-header">
        <div className="playlist-header-content">
          <div className="playlist-cover-large">
            {playlist.coverImageUrl ? <img src={playlist.coverImageUrl} alt={playlist.name} /> : <div className="placeholder">🎵</div>}
          </div>
          <div className="playlist-info-large">
            <span className="subtitle">Playlist</span>
            <h1>{playlist.name}</h1>
            <p>{playlist.description || 'No description'}</p>
            <div className="playlist-meta">
              <strong>{playlist.user.username}</strong> • {playlist.songs.length} songs
            </div>
          </div>
        </div>
      </div>

      <div className="playlist-actions">
        <button className="play-btn-main" onClick={() => playlist.songs.length > 0 && handlePlay(playlist.songs[0])}>
          <FiPlay size={24} fill="currentColor" />
        </button>
        <button className="delete-btn-main" onClick={handleDelete} title="Delete Playlist">
          <FiTrash2 size={24} />
        </button>
      </div>

      <div className="songs-list-view">
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
            {playlist.songs.map((song, index) => (
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
                  <div onClick={e => e.stopPropagation()}>
                    <SongActionMenu song={song} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {playlist.songs.length === 0 && (
          <div className="empty-playlist-msg">
            <p>This playlist is empty. Add some songs!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
