import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSongs } from '../hooks/useSongs';
import { usePlayer } from '../hooks/usePlayer';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { songs, loading, fetchAllSongs } = useSongs();
  const { playSong } = usePlayer();

  useEffect(() => {
    fetchAllSongs(1, 12);
  }, [fetchAllSongs]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handlePlay = (song) => {
    playSong(song, songs);
  };

  // Quick picks - first 6 songs
  const quickPicks = songs?.slice(0, 6) || [];
  
  // Recently added - next 6 songs
  const recentlyAdded = songs?.slice(6, 12) || [];

  return (
    <div className="spotify-dashboard">
      {/* Greeting Header */}
      <div className="dashboard-greeting">
        <h1>{getGreeting()}</h1>
      </div>

      {/* Quick Picks Grid */}
      {loading ? (
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading your music...</p>
        </div>
      ) : quickPicks.length > 0 ? (
        <>
          <div className="quick-picks-grid">
            {quickPicks.map(song => (
              <div 
                key={song._id} 
                className="quick-pick-card"
                onClick={() => handlePlay(song)}
              >
                <div className="quick-pick-image">
                  {song.coverImageUrl ? (
                    <img src={song.coverImageUrl} alt={song.title} />
                  ) : (
                    <div className="quick-pick-placeholder">🎵</div>
                  )}
                </div>
                <div className="quick-pick-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <button className="quick-pick-play-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Recently Added Section */}
          {recentlyAdded.length > 0 && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Recently Added</h2>
                <Link to="/all-songs" className="section-link">Show all</Link>
              </div>
              
              <div className="songs-grid">
                {recentlyAdded.map(song => (
                  <div 
                    key={song._id} 
                    className="song-card"
                    onClick={() => handlePlay(song)}
                  >
                    <div className="song-card-image">
                      {song.coverImageUrl ? (
                        <img src={song.coverImageUrl} alt={song.title} />
                      ) : (
                        <div className="song-card-placeholder">🎵</div>
                      )}
                      <button className="song-card-play-btn">
                        <svg viewBox="0 0 24 24" width="28" height="28">
                          <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="song-card-info">
                      <h3>{song.title}</h3>
                      <p>{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Your Library Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Your Library</h2>
            </div>
            
            <div className="library-cards">
              <Link to="/my-songs" className="library-card">
                <div className="library-card-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="library-card-content">
                  <h3>My Songs</h3>
                  <p>View and manage your uploaded tracks</p>
                </div>
              </Link>

              <Link to="/upload" className="library-card">
                <div className="library-card-icon upload-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </div>
                <div className="library-card-content">
                  <h3>Upload Music</h3>
                  <p>Share your music with the world</p>
                </div>
              </Link>

              <Link to="/all-songs" className="library-card">
                <div className="library-card-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="library-card-content">
                  <h3>Browse All</h3>
                  <p>Explore all available songs</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="dashboard-empty">
          <div className="empty-icon">🎵</div>
          <h2>Start Your Music Journey</h2>
          <p>Upload your first song to get started</p>
          <Link to="/upload" className="empty-btn">Upload Now</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;