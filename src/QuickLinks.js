/**
 * QuickLinks.js
 * Displays shortcuts similar to Chrome's new tab page.
 */

import React from "react";
import "./QuickLinks.css";

function QuickLinks() {
  // Enhanced links with icons
  const links = [
    { 
      name: "Gmail",
      url: "https://mail.google.com",
      icon: "mail",
      color: "#EA4335"
    },
    { 
      name: "Calendar", 
      url: "https://calendar.google.com",
      icon: "calendar_month",
      color: "#4285F4" 
    },
    { 
      name: "Drive", 
      url: "https://drive.google.com",
      icon: "add_to_drive",
      color: "#FBBC04"
    },
    { 
      name: "YouTube", 
      url: "https://youtube.com",
      icon: "smart_display",
      color: "#FF0000"
    },
    { 
      name: "GitHub", 
      url: "https://github.com/subhadipjana866",
      icon: "code",
      color: "#FFFFFF"
    },
  ];

  return (
    <div className="quick-links">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link-item"
        >
          <div className="quick-link-icon">
            <span className="material-icons" style={{ color: link.color }}>
              {link.icon}
            </span>
          </div>
          <span className="quick-link-name">{link.name}</span>
        </a>
      ))}
    </div>
  );
}

export default QuickLinks;