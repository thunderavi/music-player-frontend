import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/profile', 
        { username, bio, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="avatar-section">
            <div className="avatar-preview">
              {avatar ? <img src={avatar} alt="Avatar" /> : <span>{username.charAt(0)}</span>}
            </div>
            <div className="form-group">
              <label>Avatar URL</label>
              <input 
                type="text" 
                value={avatar} 
                onChange={(e) => setAvatar(e.target.value)} 
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              placeholder="Tell us about yourself..."
              maxLength="160"
            />
            <span className="char-count">{bio.length}/160</span>
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
