// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMusic, FiUpload, FiUser, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import './Sidebar.css';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const menuItems = [
    { path: ROUTES.DASHBOARD, icon: FiHome, label: 'Dashboard' },
    { path: ROUTES.ALL_SONGS, icon: FiMusic, label: 'All Songs' },
    { path: ROUTES.MY_SONGS, icon: FiUser, label: 'My Songs' },
    { path: ROUTES.UPLOAD, icon: FiUpload, label: 'Upload' },
  ];

  if (isAdmin()) {
    menuItems.push({ path: ROUTES.ADMIN, icon: FiSettings, label: 'Admin Panel' });
  }

  return (
    <aside className="sidebar">
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
      </nav>
    </aside>
  );
};

export default Sidebar;