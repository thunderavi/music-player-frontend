import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

const Signup = () => {
  const { signup, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signup(formData);
    setLoading(false);
  };

  return (
    <div className="spotify-auth-page">
      {/* Header */}
      <header className="spotify-auth-header">
        <div className="spotify-header-content">
          <Link to="/" className="spotify-logo">
            <span className="aureo-text">Aureo</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="spotify-auth-content">
        <div className="spotify-auth-box">
          <h1 className="spotify-auth-title">Sign up to start listening</h1>

          <form onSubmit={handleSubmit} className="spotify-form">
            <div className="spotify-form-group">
              <label htmlFor="email">What's your email?</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="spotify-form-group">
              <label htmlFor="username">Create a username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter a username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="spotify-form-group">
              <label htmlFor="password">Create a password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="spotify-btn-signup"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="spotify-login-prompt">
            <span>Already have an account?</span>
            <Link to="/login" className="spotify-login-link">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;