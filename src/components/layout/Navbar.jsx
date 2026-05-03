// src/components/layout/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Space for sidebar logo if needed, or search bar */}
        </div>

        <div className="navbar-actions">
          <button 
            className="icon-button" 
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="navbar-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="avatar-img" />
              ) : (
                getUserInitials()
              )}
            </div>
            <span>{user?.username || 'User'}</span>
          </div>

          <button 
            className="icon-button logout-button" 
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;