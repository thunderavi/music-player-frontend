import React from 'react';
import './Skeleton.css';

const Skeleton = ({ variant = 'rect', width, height, className = '' }) => {
  const styles = {
    width: width || '100%',
    height: height || '100%'
  };

  return (
    <div 
      className={`skeleton skeleton-${variant} ${className}`} 
      style={styles}
    >
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

export default Skeleton;
