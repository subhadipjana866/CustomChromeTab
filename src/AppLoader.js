/**
 * AppLoader.js
 * Provides a smooth loading animation when the app first loads
 */

import React, { useState, useEffect } from 'react';
import './AppLoader.css';

function AppLoader({ children }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {loading ? (
        <div className="app-loader">
          <div className="loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default AppLoader;