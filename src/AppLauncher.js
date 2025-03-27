/**
 * AppLauncher.js
 * Implements the Chrome-style app launcher (9 dots) in the top right corner
 * with a dropdown menu showing Google apps.
 */

import React, { useState, useRef, useEffect } from "react";
import "./AppLauncher.css";

function AppLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // List of Google apps to show in the dropdown
  const apps = [
    {
      name: "Search",
      icon: "search",
      url: "https://www.google.com",
      color: "#FFFFFF",
    },
    {
      name: "Maps",
      icon: "pin_drop",
      url: "https://maps.google.com",
      color: "#0bcb2b",
    },
    {
      name: "YouTube",
      icon: "smart_display",
      url: "https://youtube.com",
      color: "#EA3323",
    },
    {
      name: "Photos",
      icon: "image",
      url: "https://photos.google.com",
      color: "#EA33F7",
    },
    {
      name: "Drive",
      icon: "add_to_drive",
      url: "https://drive.google.com",
      color: "#EAC452",
    },
    {
      name: "Gmail",
      icon: "mail",
      url: "https://mail.google.com",
      color: "#0000F5",
    },
    {
      name: "Docs",
      icon: "docs",
      url: "https://docs.google.com",
      color: "#0000F5",
    },
    {
      name: "Calendar",
      icon: "calendar_month",
      url: "https://calendar.google.com",
      color: "#75FB4C",
    },
    {
      name: "Sheets",
      icon: "table_chart",
      url: "https://sheets.google.com",
      color: "#EA3323",
    },
  ];

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-launcher-container" ref={menuRef}>
      <button
        className="app-launcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Google apps"
      >
        <div className="app-launcher-icon">
          {/* This creates the 3x3 dot grid */}
          {[...Array(9)].map((_, i) => (
            <span key={i} className="app-launcher-dot"></span>
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="app-launcher-menu">
          <div className="app-grid">
            {apps.map((app, index) => (
              <a
                key={index}
                href={app.url}
                className="app-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="app-icon">
                  <span className="material-icons material-symbols-rounded" style={{ color: app.color }}>
                    {app.icon}
                  </span>
                  {/* <span class="material-symbols-rounded">docs</span> */}
                </div>
                <span className="app-name">{app.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLauncher;
