import React, { useState } from 'react';
import NavBar from './components/NavBar';
import NewsBoard from './components/NewsBoard';

function App() {
  const [category, setCategory] = useState("general");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <NavBar setCategory={setCategory} activeCategory={category} />
      <NewsBoard category={category} />
    </div>
  );
}

export default App;