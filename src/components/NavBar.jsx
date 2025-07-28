import React, { useState } from 'react';

const categories = [
  { id: "general", name: "General", icon: "📰" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "health", name: "Health", icon: "🏥" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
];

const NavBar = ({ setCategory, activeCategory, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🗞️</span>
          <span className="brand-text">NewsX</span>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation items */}
        <div className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className="nav-icon">{cat.icon}</span>
                <span className="nav-text">{cat.name}</span>
              </button>
            ))}
          </div>
          
          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;