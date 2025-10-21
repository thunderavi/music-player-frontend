import React, { useState, useEffect } from 'react';
import { useSongs } from '../hooks/useSongs';
import { useNavigate, useParams } from 'react-router-dom';
import './Pages.css';

const GENRES = ['Pop', 'Rock', 'Hip-Hop', 'Rap', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B', 'Metal', 'Blues', 'Folk', 'Indie', 'Other'];

const EditSong = () => {
  const { id } = useParams();
  const { getSongById, updateSong } = useSongs();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: 'Pop',
    coverImage: null
  });
  const [currentCoverUrl, setCurrentCoverUrl] = useState('');

  useEffect(() => {
    loadSong();
  }, [id]);

  const loadSong = async () => {
    setLoading(true);
    const response = await getSongById(id);
    if (response.success && response.song) {
      const song = response.song;
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album || '',
        genre: song.genre,
        coverImage: null
      });
      setCurrentCoverUrl(song.coverImageUrl || '');
    } else {
      navigate('/my-songs');
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData(prev => ({ ...prev, coverImage: files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const result = await updateSong(id, formData);

    setUpdating(false);

    if (result.success) {
      navigate('/my-songs');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading song...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Edit Song</h1>
        <p>Update your song information</p>
      </div>

      <div className="upload-form-container">
        <form onSubmit={handleSubmit} className="upload-form">
          {currentCoverUrl && !formData.coverImage && (
            <div className="form-group">
              <label>Current Cover Image</label>
              <div style={{ marginTop: '0.5rem' }}>
                <img 
                  src={currentCoverUrl} 
                  alt="Current cover" 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                  }} 
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>New Cover Image (Optional)</label>
            <input
              type="file"
              name="coverImage"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
            />
            {formData.coverImage && (
              <p className="file-info">Selected: {formData.coverImage.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
              required
            />
          </div>

          <div className="form-group">
            <label>Artist *</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              required
            />
          </div>

          <div className="form-group">
            <label>Album (Optional)</label>
            <input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album name"
            />
          </div>

          <div className="form-group">
            <label>Genre *</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/my-songs')}
              disabled={updating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSong;