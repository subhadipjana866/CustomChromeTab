/**
 * NewsWidget.js
 * Displays top 3 news headlines with images in the top left corner
 * Uses the Gnews API to fetch real-time news headlines
 * Features collapsible dropdown like the Notes widget
 */

import React, { useState, useEffect } from "react";
import "./NewsWidget.css";

function NewsWidget() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use hardcoded API key since env variables are causing issues
  const GNEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Replace with your actual key

  useEffect(() => {
    // Fetch news data from Gnews API
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?country=us&max=5&token=${GNEWS_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error("News data not available");
        }
        
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles.slice(0, 5)); // Get up to 5 articles
        } else {
          throw new Error("No news articles found");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Unable to fetch news");
        setLoading(false);
        
        // Set fallback news data for demo with images
        setNews([
          {
            title: "Google's Pixel 7 Pro Introduces New AI Camera Features",
            description: "The latest Pixel flagship brings enhanced computational photography and AI tools.",
            url: "#",
            source: { name: "Tech News" },
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?q=80&w=300&auto=format&fit=crop",
            publishedAt: new Date().toISOString()
          },
          {
            title: "Climate Summit Reaches Historic Carbon Emissions Agreement",
            description: "World leaders agree on ambitious targets to reduce global carbon footprint.",
            url: "#",
            source: { name: "World Report" },
            image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?q=80&w=300&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            title: "New Cybersecurity Framework Adopted by Major Tech Companies",
            description: "Industry leaders collaborate on standards to protect user data and privacy.",
            url: "#",
            source: { name: "Digital Today" },
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 7200000).toISOString()
          },
          {
            title: "Electric Vehicle Sales Surge as Charging Infrastructure Expands",
            description: "Record numbers of consumers are switching to electric vehicles as charging networks grow.",
            url: "#",
            source: { name: "Auto Weekly" },
            image: "https://images.unsplash.com/photo-1593941707882-a156bb24b3dd?q=80&w=300&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 10800000).toISOString()
          },
          {
            title: "Scientists Discover Promising Alzheimer's Treatment in Clinical Trial",
            description: "New research shows significant reduction in cognitive decline with experimental treatment.",
            url: "#",
            source: { name: "Health Journal" },
            image: "https://images.unsplash.com/photo-1576671114259-3b045b93b05b?q=80&w=300&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 14400000).toISOString()
          }
        ]);
      }
    };
    
    fetchNews();
    
    // Update news every hour
    const intervalId = setInterval(fetchNews, 3600000);
    return () => clearInterval(intervalId);
  }, [GNEWS_API_KEY]);

  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Toggle widget expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`news-widget ${isExpanded ? 'expanded' : ''}`}>
      <div className="news-widget-header" onClick={toggleExpand}>
        <span className="material-icons">feed</span>
        <h3>Top News</h3>
        <span className="material-icons">
          {isExpanded ? 'expand_more' : 'expand_less'}
        </span>
      </div>

      {isExpanded && (
        <div className="news-widget-content">
          {loading ? (
            <div className="news-loading">
              <span className="material-icons">hourglass_empty</span>
              <span>Loading news...</span>
            </div>
          ) : error ? (
            <div className="news-error">
              <span className="material-icons">error_outline</span>
              <span>{error}</span>
            </div>
          ) : (
            <ul className="news-list">
              {news.map((article, index) => (
                <li key={index} className="news-item">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <div className="news-item-content">
                      {article.image && (
                        <div className="news-image-container">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="news-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/100x70?text=News";
                            }}
                          />
                        </div>
                      )}
                      <div className="news-text-content">
                        <h4 className="news-title">{article.title}</h4>
                        <div className="news-meta">
                          <span className="news-source">{article.source.name}</span>
                          <span className="news-time">{getRelativeTime(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsWidget;