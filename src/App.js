// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import { SongProvider } from './context/SongContext';
import { LibraryProvider } from './context/LibraryContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AllSongs from './pages/AllSongs';
import MySongs from './pages/MySongs';
import Upload from './pages/Upload';
import AdminPanel from './pages/AdminPanel';
import EditSong from './pages/EditSong';
import LikedSongs from './pages/LikedSongs';
import PlaylistDetails from './pages/PlaylistDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

import { ROUTES } from './utils/constants';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <SongProvider>
              <LibraryProvider>
                <div className="app">
                <Routes>
                  {/* Public Routes */}
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.SIGNUP} element={<Signup />} />

                  {/* Protected Routes - Wrapped in Layout */}
                  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.ALL_SONGS} element={<AllSongs />} />
                    <Route path={ROUTES.MY_SONGS} element={<MySongs />} />
                    <Route path={ROUTES.UPLOAD} element={<Upload />} />
                    <Route path="/liked-songs" element={<LikedSongs />} />
                    <Route path="/playlists/:id" element={<PlaylistDetails />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* ✅ Add Edit Song Route */}
                    <Route
                      path="/edit-song/:id"
                      element={<EditSong />}
                    />

                    {/* Admin Only Route */}
                    <Route 
                      path={ROUTES.ADMIN} 
                      element={
                        <ProtectedRoute requireAdmin>
                          <AdminPanel />
                        </ProtectedRoute>
                      } 
                    />
                  </Route>

                  {/* 404 Not Found */}
                  <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>

                {/* Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: 'var(--surface)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--spacing-md)',
                      boxShadow: 'var(--shadow-lg)'
                    },
                    success: {
                      iconTheme: {
                        primary: 'var(--success)',
                        secondary: 'var(--surface)'
                      }
                    },
                    error: {
                      iconTheme: {
                        primary: 'var(--error)',
                        secondary: 'var(--surface)'
                      }
                    }
                  }}
                />
                </div>
              </LibraryProvider>
            </SongProvider>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
