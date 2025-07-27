import React from 'react';

const categories = [
  "general",
  "technology", 
  "business",
  "health",
  "sports",
  "entertainment",
];

const NavBar = ({ setCategory, activeCategory }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid px-4">
        <a className="navbar-brand fs-3 fw-bold" href="#">
          🗞️ NewsX
        </a>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm category-btn ${
                activeCategory === cat
                  ? 'btn-primary'
                  : 'btn-outline-light'
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;