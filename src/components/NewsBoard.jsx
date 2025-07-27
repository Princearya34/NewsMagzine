import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // NewsAPI call
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.status === 'error') {
          throw new Error(data.message || 'API Error');
        }
        
        setArticles(data.articles || []);
      } catch (err) {
        setError("Failed to fetch news articles. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-5">
          Latest <span className="badge bg-danger fs-6">News</span>
        </h2>
        <div className="row g-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0">
                <div className="loading-skeleton" style={{ height: "200px" }}></div>
                <div className="card-body">
                  <div className="loading-skeleton mb-3" style={{ height: "60px" }}></div>
                  <div className="loading-skeleton mb-3" style={{ height: "80px" }}></div>
                  <div className="loading-skeleton" style={{ height: "35px", borderRadius: "20px" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">Oops! Something went wrong</h4>
          <p className="mb-0">{error}</p>
          <hr />
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">
        Latest <span className="badge bg-danger fs-6">News</span>
      </h2>
      <div className="row g-4">
        {articles.map((news, index) => (
          <div key={`${category}-${index}`} className="col-lg-4 col-md-6">
            <NewsItem
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;