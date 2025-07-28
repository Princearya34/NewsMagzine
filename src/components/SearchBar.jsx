import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearchToggle = () => {
    if (isExpanded && !searchTerm) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (searchTerm) {
        setSearchTerm('');
      } else {
        setIsExpanded(false);
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''} ${isFocused ? 'focused' : ''}`}>
      <div className="search-input-wrapper">
        <button 
          className="search-icon-btn"
          onClick={handleSearchToggle}
          aria-label="Search news"
        >
          <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
        
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search news articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setIsExpanded(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
        
        {searchTerm && (
          <button 
            className="clear-search-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="search-results-count">
          <span className="results-text">
            {searchTerm.length > 0 && `Searching for "${searchTerm}"`}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;