// src/hooks/useUpload.js
import { useState, useCallback } from 'react';

/**
 * Custom hook to handle file uploads with progress tracking
 */
export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Reset upload state
  const resetUpload = useCallback(() => {
    setUploading(false);
    setUploadProgress(0);
    setUploadError(null);
  }, []);

  // Start upload
  const startUpload = useCallback(() => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
  }, []);

  // Update progress
  const updateProgress = useCallback((progress) => {
    setUploadProgress(progress);
  }, []);

  // Upload success
  const uploadSuccess = useCallback(() => {
    setUploading(false);
    setUploadProgress(100);
    setUploadError(null);
  }, []);

  // Upload error
  const uploadFailed = useCallback((error) => {
    setUploading(false);
    setUploadError(error);
  }, []);

  return {
    uploading,
    uploadProgress,
    uploadError,
    resetUpload,
    startUpload,
    updateProgress,
    uploadSuccess,
    uploadFailed
  };
};

export default useUpload;