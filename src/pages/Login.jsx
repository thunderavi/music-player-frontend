import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData);
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
          <h1 className="spotify-auth-title">Log in to Aureo</h1>

          <form onSubmit={handleSubmit} className="spotify-form">
            <div className="spotify-form-group">
              <label htmlFor="email">Email or username</label>
              <input
                id="email"
                type="email"
                placeholder="Email or username"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="spotify-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="spotify-remember">
              <label className="spotify-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="spotify-btn-login"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <a href="#" className="spotify-forgot-password">Forgot your password?</a>
          </form>

          <div className="spotify-signup-prompt">
            <span>Don't have an account?</span>
            <Link to="/signup" className="spotify-signup-link">Sign up for Aureo</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;