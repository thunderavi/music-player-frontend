// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMusic, FiUpload, FiUser, FiSettings, FiHeart, FiList, FiPlus } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLibrary } from '../../context/LibraryContext';
import { ROUTES } from '../../utils/constants';
import './Sidebar.css';

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const { playlists, createPlaylist } = useLibrary();

  const menuItems = [
    { path: ROUTES.DASHBOARD, icon: FiHome, label: 'Home' },
    { path: ROUTES.ALL_SONGS, icon: FiMusic, label: 'Search' },
    { path: '/liked-songs', icon: FiHeart, label: 'Liked Songs' },
    { path: ROUTES.MY_SONGS, icon: FiUser, label: 'My Music' },
    { path: ROUTES.UPLOAD, icon: FiUpload, label: 'Upload' },
  ];

  if (isAdmin()) {
    menuItems.push({ path: ROUTES.ADMIN, icon: FiSettings, label: 'Admin Panel' });
  }

  const handleCreatePlaylist = async () => {
    const name = prompt('Enter playlist name:');
    if (name) {
      await createPlaylist({ name });
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Aureo</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar-divider"></div>

        <div className="sidebar-section">
          <div className="section-header">
            <span>Playlists</span>
            <button className="add-playlist-btn" onClick={handleCreatePlaylist}>
              <FiPlus size={16} />
            </button>
          </div>
          
          <div className="playlist-list">
            {playlists.map(playlist => (
              <NavLink
                key={playlist._id}
                to={`/playlists/${playlist._id}`}
                className={({ isActive }) => 
                  `sidebar-link playlist-link ${isActive ? 'active' : ''}`
                }
              >
                <FiList size={18} />
                <span>{playlist.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;