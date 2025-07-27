import React from 'react';

const NewsItem = ({ title = '', description = '', src = '', url = '#' }) => {
  const fallbackImage = "https://via.placeholder.com/360x200?text=No+Image+Available";
  
  return (
    <div className="card h-100 shadow-sm border-0 news-card">
      <img
        src={src || fallbackImage}
        alt="News"
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        loading="lazy"
        onError={(e) => {
          e.target.src = fallbackImage;
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark mb-3" style={{ 
          fontSize: "1.1rem", 
          lineHeight: "1.3",
          minHeight: "2.6rem",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>
          {title ? (title.length > 80 ? title.slice(0, 80) + "..." : title) : "No Title Available"}
        </h5>
        <p className="card-text text-muted flex-grow-1" style={{
          fontSize: "0.9rem",
          lineHeight: "1.4"
        }}>
          {description 
            ? (description.length > 120 ? description.slice(0, 120) + "..." : description)
            : "No description available for this news article."
          }
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm mt-auto"
          style={{ borderRadius: "20px" }}
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;