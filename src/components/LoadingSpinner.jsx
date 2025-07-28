import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h3 className="loading-title">Loading News...</h3>
        <p className="loading-subtitle">Fetching the latest stories for you</p>
      </div>
      
      {/* Loading skeleton cards */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-line skeleton-text">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-line skeleton-text short">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-button">
                <div className="skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;