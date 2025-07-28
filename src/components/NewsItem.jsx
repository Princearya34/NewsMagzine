import React, { useState, memo } from 'react';

const NewsItem = memo(({ 
  title = '', 
  description = '', 
  src = '', 
  url = '#', 
  publishedAt = '',
  source = '',
  darkMode = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = "https://via.placeholder.com/400x200/e2e8f0/64748b?text=News+Image";
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Truncate text with better word boundary handling
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > maxLength * 0.8 
      ? truncated.slice(0, lastSpace) + '...'
      : truncated + '...';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = fallbackImage;
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on the read more button
    if (e.target.classList.contains('read-more-btn') || e.target.closest('.read-more-btn')) {
      return;
    }
    
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="news-item" onClick={handleCardClick}>
      <div className="news-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        <img
          src={src || fallbackImage}
          alt={title || 'News article'}
          className={`news-image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {source && (
          <div className="news-source-badge">
            {source}
          </div>
        )}
      </div>

      <div className="news-content">
        <div className="news-meta">
          {publishedAt && (
            <time className="news-date" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          )}
        </div>

        <h2 className="news-title">
          {title ? truncateText(title, 100) : "Untitled Article"}
        </h2>

        <p className="news-description">
          {description 
            ? truncateText(description, 150)
            : "No description available for this article."
          }
        </p>

        <div className="news-actions">
          <button
            className="read-more-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
              }
            }}
            disabled={!url || url === '#'}
          >
            <span>Read More</span>
            <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
});

NewsItem.displayName = 'NewsItem';

export default NewsItem;