import React, { useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const GENRES = ['Pop', 'Rock', 'Hip-Hop', 'Rap', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B', 'Metal', 'Blues', 'Folk', 'Indie', 'Other'];

const Upload = () => {
  const { uploadSong } = useSongs();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: 'Pop',
    audioFile: null,
    coverImage: null
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.audioFile) {
      alert('Please select an audio file');
      return;
    }

    setUploading(true);
    
    const result = await uploadSong(formData, (percent) => {
      setProgress(percent);
    });

    setUploading(false);

    if (result.success) {
      navigate('/my-songs');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Upload Song</h1>
        <p>Share your music with the world</p>
      </div>

      <div className="upload-form-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Audio File *</label>
            <input
              type="file"
              name="audioFile"
              accept=".mp3,.wav,.ogg,.m4a"
              onChange={handleFileChange}
              required
            />
            {formData.audioFile && (
              <p className="file-info">Selected: {formData.audioFile.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Cover Image (Optional)</label>
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

          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>Uploading... {progress}%</p>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;