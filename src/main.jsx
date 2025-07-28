import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          color: '#1e293b'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              🔄 Refresh Page
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '2rem', 
                textAlign: 'left',
                background: '#fef2f2',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca'
              }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  fontWeight: '500',
                  color: '#dc2626',
                  marginBottom: '0.5rem'
                }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  color: '#7f1d1d',
                  overflow: 'auto'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring (simplified)
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function && process.env.NODE_ENV === 'development') {
    // Simple performance logging without external dependencies
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          onPerfEntry({
            name: 'page-load',
            value: entry.loadEventEnd - entry.loadEventStart,
            delta: entry.loadEventEnd - entry.loadEventStart
          });
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      // Performance Observer not supported, ignore
    }
  }
};

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Add loading state to root element
document.getElementById('root').innerHTML = `
  <div style="
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f8fafc;
    color: #64748b;
    font-family: system-ui, -apple-system, sans-serif;
  ">
    <div style="text-align: center;">
      <div style="
        width: 40px;
        height: 40px;
        border: 3px solid #e2e8f0;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      "></div>
      <p>Loading NewsX...</p>
    </div>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`;

// Render the app with error boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Report web vitals (optional)
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
});

// Service worker registration (optional)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}