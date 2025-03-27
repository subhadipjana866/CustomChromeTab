/**
 * ParticleBackground.js
 * Creates subtle floating particles in the background for visual interest.
 * Enhanced with more visible particles and improved animations.
 */

import React, { useEffect, useRef } from "react";

function ParticleBackground() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const particleCount = 25; // Increased particle count
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 6px and 20px (slightly larger)
      const size = Math.random() * 14 + 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // More visible opacity
      particle.style.opacity = (Math.random() * 0.7 + 0.1).toString(); // Between 0.1 and 0.8
      
      // Random color variations
      const hue = Math.floor(Math.random() * 60) + 180; // Blues to purples (180-240)
      const saturation = Math.floor(Math.random() * 40) + 60; // 60-100%
      const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.2)`;
      
      // Add a subtle glow effect
      particle.style.boxShadow = `0 0 ${size/2}px rgba(255, 255, 255, 0.3)`;
      
      // Animation properties
      const duration = Math.random() * 40; // Slightly faster animation
      const delay = Math.random() * 0;
      
      particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    // Add a few special "highlight" particles
    for (let i = 0; i < 5; i++) {
      const highlight = document.createElement('div');
      highlight.className = 'particle highlight-particle';
      
      // Larger size for highlight particles
      const size = Math.random() * 25 + 15;
      highlight.style.width = `${size}px`;
      highlight.style.height = `${size}px`;
      
      // Random position
      highlight.style.left = `${Math.random() * 100}%`;
      highlight.style.top = `${Math.random() * 100}%`;
      
      // Lower opacity but stronger glow
      highlight.style.opacity = '0.15';
      highlight.style.backgroundColor = `rgba(255, 255, 255, 0.5)`;
      highlight.style.boxShadow = `0 0 ${size}px ${size/2}px rgba(255, 255, 255, 0.3)`;
      
      // Slower animation for dreamy effect
      const duration = Math.random() * 60;
      const delay = Math.random() * 0;
      
      highlight.style.animation = `floatHighlight ${duration}s ${delay}s infinite ease-in-out`;
      
      container.appendChild(highlight);
      particles.push(highlight);
    }
    
    return () => {
      // Cleanup
      particles.forEach(p => {
        if (container.contains(p)) {
          container.removeChild(p);
        }
      });
    };
  }, []);
  
  return <div ref={containerRef} className="particle-container" />;
}

export default ParticleBackground;