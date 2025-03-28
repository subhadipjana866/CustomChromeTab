/**
 * NewsWidget.js
 * Displays top 3 news headlines in the top left corner
 * Uses the News API to fetch real-time news headlines
 */

import React, { useState, useEffect } from "react";
import "./NewsWidget.css";

function NewsWidget() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // News API key - in a real app, store this in environment variables
  const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  
  useEffect(() => {
    // Fetch news data from News API
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=${NEWS_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error("News data not available");
        }
        
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles.slice(0, 3));
        } else {
          throw new Error("No news articles found");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Unable to fetch news");
        setLoading(false);
        
        // Set fallback news data for demo
        setNews([
          {
            title: "Sample news headline 1",
            url: "#",
            source: { name: "Demo News" },
            publishedAt: new Date().toISOString()
          },
          {
            title: "Sample news headline 2",
            url: "#",
            source: { name: "Demo News" },
            publishedAt: new Date().toISOString()
          },
          {
            title: "Sample news headline 3",
            url: "#",
            source: { name: "Demo News" },
            publishedAt: new Date().toISOString()
          }
        ]);
      }
    };
    
    fetchNews();
    
    // Update news every hour
    const intervalId = setInterval(fetchNews, 3600000);
    return () => clearInterval(intervalId);
  }, [NEWS_API_KEY]);

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

  return (
    <div className="news-widget">
      <div className="news-header">
        <span className="material-icons">feed</span>
        <h3>Top News</h3>
      </div>
      
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
                <h4 className="news-title">{article.title}</h4>
                <div className="news-meta">
                  <span className="news-source">{article.source.name}</span>
                  <span className="news-time">{getRelativeTime(article.publishedAt)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsWidget;