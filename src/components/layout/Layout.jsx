// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FriendActivity from './FriendActivity';
import AudioPlayer from '../player/AudioPlayer';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content page-fade-in">
          <Outlet />
        </main>
        <FriendActivity />
      </div>
      <AudioPlayer />
    </div>
  );
};

export default Layout;