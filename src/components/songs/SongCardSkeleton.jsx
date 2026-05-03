import React from 'react';
import Skeleton from '../common/Skeleton';

const SongCardSkeleton = () => {
  return (
    <div className="song-card skeleton-card" style={{ cursor: 'default' }}>
      <div className="song-card-image" style={{ background: 'transparent' }}>
        <Skeleton variant="rect" height="100%" />
      </div>
      <div className="song-card-info">
        <Skeleton variant="text" width="80%" height="1.2rem" />
        <Skeleton variant="text" width="60%" height="0.8rem" />
      </div>
    </div>
  );
};

export default SongCardSkeleton;
