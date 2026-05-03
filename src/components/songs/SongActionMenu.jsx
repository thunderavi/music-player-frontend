import React, { useState, useRef, useEffect } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { FiHeart, FiMoreVertical } from 'react-icons/fi';
import './SongActionMenu.css';

const SongActionMenu = ({ song }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playlists, addSongToPlaylist, toggleLike, isLiked } = useLibrary();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleLike(song._id, song);
    setIsOpen(false);
  };

  const handleAddToPlaylist = (e, playlistId) => {
    e.stopPropagation();
    addSongToPlaylist(playlistId, song._id);
    setIsOpen(false);
  };

  return (
    <div className="song-action-menu-container" ref={menuRef}>
      <button 
        className="action-menu-trigger" 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <FiMoreVertical />
      </button>

      {isOpen && (
        <div className="song-action-dropdown">
          <button className="dropdown-item" onClick={handleToggleLike}>
            <FiHeart className={isLiked(song._id) ? 'liked' : ''} />
            <span>{isLiked(song._id) ? 'Unlike' : 'Like'}</span>
          </button>
          
          <div className="dropdown-divider"></div>
          <div className="dropdown-header">Add to Playlist</div>
          
          <div className="playlists-submenu">
            {playlists.length > 0 ? playlists.map(playlist => (
              <button 
                key={playlist._id} 
                className="dropdown-item" 
                onClick={(e) => handleAddToPlaylist(e, playlist._id)}
              >
                <span>{playlist.name}</span>
              </button>
            )) : (
              <div className="dropdown-item disabled">No playlists</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongActionMenu;
