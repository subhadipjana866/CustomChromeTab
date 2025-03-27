/**
 * SearchBar.js
 * Provides a search input that navigates to search results.
 * Supports multiple search engines (Google and DuckDuckGo).
 */

import React, { useState, useRef } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchEngine, setSearchEngine] = useState("google");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const engines = {
    google: {
      name: "Google",
      url: "https://www.google.com/search?q=",
    },
    duckduckgo: {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // Redirect to the selected search engine with the query
      window.location.href = engines[searchEngine].url + encodeURIComponent(query);
    }
  };

  const handleEngineSelect = (engine) => {
    setSearchEngine(engine);
    setShowDropdown(false);
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  // Add event listener for clicks outside dropdown
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder={`Search ${engines[searchEngine].name} or type a URL`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div className="search-button-container" ref={dropdownRef}>
        <button
          type="button"
          className="search-dropdown-toggle"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="Search engine options"
        >
          <span className="search-engine-name">{engines[searchEngine].name}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        {showDropdown && (
          <div className="search-engine-dropdown">
            {Object.keys(engines).map((key) => (
              <button
                key={key}
                type="button"
                className={`search-engine-option ${searchEngine === key ? 'active' : ''}`}
                onClick={() => handleEngineSelect(key)}
              >
                {engines[key].name}
              </button>
            ))}
          </div>
        )}
        
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;