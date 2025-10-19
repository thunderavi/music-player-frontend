import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSongs } from '../hooks/useSongs';
import { Link } from 'react-router-dom';
import './Pages.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { songs, loading, fetchAllSongs } = useSongs();

  useEffect(() => {
    fetchAllSongs(1, 10);
  }, [fetchAllSongs]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>{getGreeting()}, {user?.username}! 🎵</h1>
        <p>Welcome back to your music player</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Songs</h3>
          <p className="stat-number">{songs?.length || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Quick Actions</h3>
          <Link to="/upload" className="btn btn-primary">Upload Song</Link>
        </div>
      </div>

      <div className="recent-songs">
        <h2>Recent Songs</h2>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading songs...</p>
          </div>
        ) : songs?.length > 0 ? (
          <div className="song-grid">
            {songs.slice(0, 6).map(song => (
              <div key={song._id} className="song-card-simple">
                <div className="song-cover-simple">
                  {song.coverImageUrl ? (
                    <img src={song.coverImageUrl} alt={song.title} />
                  ) : (
                    <div className="cover-placeholder">🎵</div>
                  )}
                </div>
                <div className="song-info-simple">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No songs yet. Upload your first song!</p>
            <Link to="/upload" className="btn btn-primary">Upload Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;