import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="spotify-home-page">
      {/* Header */}
      <header className="spotify-home-header">
        <div className="spotify-home-header-content">
          <Link to="/" className="spotify-home-logo">
            <svg viewBox="0 0 1134 340" className="spotify-logo-svg">
              <path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-45-46-18-5-25-10-25-21 0-9 7-15 21-15 12 0 23 4 34 12 0 0 1 1 2 1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 17 5 22 10 22 20 0 10-9 16-23 16zm116-34c-7-2-10-6-10-12 0-7 6-12 15-12 9 0 20 4 29 12v-25c-11-5-22-8-34-8-28 0-48 17-48 43 0 21 12 35 37 42 11 3 15 7 15 14 0 8-7 13-17 13-11 0-24-5-33-13l-1-1-15 23c14 11 31 17 50 17 30 0 51-17 51-44 0-22-13-35-39-42zm97 5c11 0 19-3 25-9 6-6 9-15 9-26s-3-20-9-26c-6-6-14-9-25-9-11 0-19 3-25 9-6 6-9 15-9 26s3 20 9 26c6 6 14 9 25 9zm0-66c17 0 30 5 39 15 9 10 14 23 14 40s-5 30-14 40c-9 10-22 15-39 15-17 0-30-5-39-15-9-10-14-23-14-40s5-30 14-40c9-10 22-15 39-15zm134 55c-7-2-10-6-10-12 0-7 6-12 15-12 9 0 20 4 29 12v-25c-11-5-22-8-34-8-28 0-48 17-48 43 0 21 12 35 37 42 11 3 15 7 15 14 0 8-7 13-17 13-11 0-24-5-33-13l-1-1-15 23c14 11 31 17 50 17 30 0 51-17 51-44 0-22-13-35-39-42zm98-40c-11 0-21 5-29 15v-12h-29v95h29v-53c0-17 9-28 23-28 12 0 20 9 20 25v56h29v-61c0-27-16-42-43-42z"/>
            </svg>
            <span className="aureo-home-text">Aureo</span>
          </Link>

          <nav className="spotify-home-nav">
            <Link to="/login" className="nav-link-login">Log in</Link>
            <Link to="/signup" className="nav-btn-signup">Sign up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="spotify-hero">
        <div className="spotify-hero-content">
          <h1 className="spotify-hero-title">
            Listening is everything
          </h1>
          <p className="spotify-hero-subtitle">
            Millions of songs and podcasts. No credit card needed.
          </p>
          <Link to="/signup" className="spotify-hero-btn">
            GET AUREO FREE
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="spotify-features">
        <div className="spotify-features-content">
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Play your favorites.</h3>
            <p>Listen to the songs you love, and discover new music and podcasts.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Playlists made easy.</h3>
            <p>We'll help you make playlists. Or enjoy playlists made by music experts.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💿</div>
            <h3>Make it yours.</h3>
            <p>Tell us what you like, and we'll recommend you the perfect songs.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📻</div>
            <h3>Save and share.</h3>
            <p>Save unlimited songs and share them with friends and family.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="spotify-home-footer">
        <div className="spotify-footer-content">
          <div className="footer-logo">
            <svg viewBox="0 0 1134 340" className="footer-logo-svg">
              <path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-45-46-18-5-25-10-25-21 0-9 7-15 21-15 12 0 23 4 34 12 0 0 1 1 2 1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 17 5 22 10 22 20 0 10-9 16-23 16zm116-34c-7-2-10-6-10-12 0-7 6-12 15-12 9 0 20 4 29 12v-25c-11-5-22-8-34-8-28 0-48 17-48 43 0 21 12 35 37 42 11 3 15 7 15 14 0 8-7 13-17 13-11 0-24-5-33-13l-1-1-15 23c14 11 31 17 50 17 30 0 51-17 51-44 0-22-13-35-39-42zm97 5c11 0 19-3 25-9 6-6 9-15 9-26s-3-20-9-26c-6-6-14-9-25-9-11 0-19 3-25 9-6 6-9 15-9 26s3 20 9 26c6 6 14 9 25 9zm0-66c17 0 30 5 39 15 9 10 14 23 14 40s-5 30-14 40c-9 10-22 15-39 15-17 0-30-5-39-15-9-10-14-23-14-40s5-30 14-40c9-10 22-15 39-15zm134 55c-7-2-10-6-10-12 0-7 6-12 15-12 9 0 20 4 29 12v-25c-11-5-22-8-34-8-28 0-48 17-48 43 0 21 12 35 37 42 11 3 15 7 15 14 0 8-7 13-17 13-11 0-24-5-33-13l-1-1-15 23c14 11 31 17 50 17 30 0 51-17 51-44 0-22-13-35-39-42zm98-40c-11 0-21 5-29 15v-12h-29v95h29v-53c0-17 9-28 23-28 12 0 20 9 20 25v56h29v-61c0-27-16-42-43-42z"/>
            </svg>
            <span className="aureo-footer-text">Aureo</span>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Aureo. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Legal</a>
              <a href="#">Privacy Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookies</a>
              <a href="#">About Ads</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;