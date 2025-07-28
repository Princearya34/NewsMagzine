import React, { useState, useEffect, useCallback, useMemo } from 'react';
import NewsItem from './NewsItem';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';

const NewsBoard = ({ category, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // RSS feed URLs with better sources
  const rssFeeds = useMemo(() => ({
    general: 'https://feeds.bbci.co.uk/news/rss.xml',
    technology: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    business: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    health: 'https://feeds.bbci.co.uk/news/health/rss.xml',
    sports: 'https://feeds.bbci.co.uk/sport/rss.xml',
    entertainment: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'
  }), []);

  // Memoized function to parse RSS
  const parseRSSFeed = useCallback((xmlText) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      return Array.from(items).map((item, index) => {
        const getTextContent = (tagName) => {
          const element = item.querySelector(tagName);
          return element ? element.textContent.trim() : '';
        };
        
        // Enhanced image extraction
        const description = getTextContent('description');
        const imageMatch = description.match(/<img[^>]+src="([^">]+)"/);
        const mediaContent = item.querySelector('media\\:thumbnail, thumbnail, enclosure');
        
        let imageUrl = '';
        if (mediaContent) {
          imageUrl = mediaContent.getAttribute('url') || mediaContent.getAttribute('href');
        } else if (imageMatch) {
          imageUrl = imageMatch[1];
        }
        
        // Clean description from HTML tags and get preview
        const cleanDescription = description
          .replace(/<[^>]*>/g, '')
          .replace(/&[^;]+;/g, ' ')
          .trim();
        
        const pubDate = getTextContent('pubDate');
        const publishedAt = pubDate ? new Date(pubDate) : new Date();
        
        return {
          id: `${category}-${index}-${Date.now()}`,
          title: getTextContent('title'),
          description: cleanDescription,
          url: getTextContent('link'),
          urlToImage: imageUrl,
          publishedAt: publishedAt.toISOString(),
          category,
          source: 'BBC News'
        };
      });
    } catch (err) {
      console.error('Error parsing RSS:', err);
      return [];
    }
  }, [category]);

  // Enhanced fetch function with retry logic
  const fetchNews = useCallback(async (retryCount = 0) => {
    if (retryCount === 0) {
      setLoading(true);
      setError(null);
    }
    
    try {
      const rssUrl = rssFeeds[category] || rssFeeds.general;
      
      // Try multiple proxy services for better reliability
      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        `https://cors-anywhere.herokuapp.com/${rssUrl}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
      ];
      
      let response;
      let xmlText;
      
      for (let i = 0; i < proxyUrls.length; i++) {
        try {
          response = await fetch(proxyUrls[i], {
            headers: {
              'User-Agent': 'NewsX/1.0'
            }
          });
          
          if (response.ok) {
            xmlText = await response.text();
            break;
          }
        } catch (proxyError) {
          console.warn(`Proxy ${i + 1} failed:`, proxyError);
          if (i === proxyUrls.length - 1) throw proxyError;
        }
      }
      
      if (!xmlText) {
        throw new Error('All proxy services failed');
      }
      
      const parsedArticles = parseRSSFeed(xmlText);
      
      if (parsedArticles.length === 0) {
        throw new Error('No articles found');
      }
      
      setArticles(parsedArticles);
      setHasMore(parsedArticles.length >= 20);
      setPage(1);
      
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      
      // Retry logic
      if (retryCount < 2) {
        setTimeout(() => fetchNews(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setError("Unable to load news at the moment. Please check your connection and try again.");
    } finally {
      if (retryCount === 0) {
        setLoading(false);
      }
    }
  }, [category, rssFeeds, parseRSSFeed]);

  // Filter and sort articles
  useEffect(() => {
    let filtered = articles;
    
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = articles.filter(article =>
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term)
      );
    }
    
    // Sort articles
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case 'oldest':
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredArticles(filtered);
  }, [articles, searchTerm, sortBy]);

  // Fetch news when category changes
  useEffect(() => {
    fetchNews();
    setSearchTerm(''); // Clear search when category changes
  }, [category, fetchNews]);

  const handleRetry = () => {
    fetchNews();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={handleRetry}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-board">
      <div className="news-header">
        <div className="header-content">
          <h1 className="news-title">
            Latest <span className="highlight">News</span>
          </h1>
          <p className="news-subtitle">
            Stay updated with {category} news from trusted sources
          </p>
        </div>
        
        <div className="news-controls">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            darkMode={darkMode}
          />
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {filteredArticles.length === 0 && searchTerm ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No articles found</h3>
          <p>Try adjusting your search terms or browse different categories.</p>
        </div>
      ) : (
        <>
          <div className="articles-grid">
            {filteredArticles.map((news) => (
              <NewsItem
                key={news.id}
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
                publishedAt={news.publishedAt}
                source={news.source}
                darkMode={darkMode}
              />
            ))}
          </div>
          
          {filteredArticles.length > 0 && (
            <div className="articles-count">
              Showing {filteredArticles.length} articles
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsBoard;