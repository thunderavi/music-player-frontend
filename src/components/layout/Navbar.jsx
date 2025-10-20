// src/components/layout/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiSun, FiMoon, FiUser } from 'react-icons/fi';
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
        <div className="navbar-brand">
          <h1>Aureo</h1>
        </div>

        <div className="navbar-actions">
          <button 
            className="icon-button" 
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="navbar-user">
            <div className="user-avatar">
              {getUserInitials()}
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