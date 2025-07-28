import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import NewsBoard from './components/NewsBoard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [category, setCategory] = useState("general");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <NavBar 
        setCategory={setCategory} 
        activeCategory={category}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="main-content">
        <NewsBoard category={category} darkMode={darkMode} />
      </main>
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 NewsX. Stay informed with the latest news.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;