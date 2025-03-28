/**
 * WeatherWidget.js
 * Displays current weather information in the bottom left corner
 * Uses the OpenWeatherMap API to fetch real weather data based on geolocation
 */

import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";

function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: null,
    condition: "Loading...",
    location: "Loading...",
    icon: "cloud",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // OpenWeatherMap API key - in a real app, store this in environment variables
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
  console.log("API_KEY", API_KEY); // Debugging line to check if API_KEY is loaded correctly

  useEffect(() => {
    // Get user's location and fetch weather data
    const getWeatherData = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        
        const data = await response.json();
        
        // Map weather conditions to Material Icons
        const iconMap = {
          "01d": "wb_sunny", // clear sky day
          "01n": "nightlight_round", // clear sky night
          "02d": "partly_cloudy_day", // few clouds day
          "02n": "nights_stay", // few clouds night
          "03d": "cloud", // scattered clouds
          "03n": "cloud",
          "04d": "cloud", // broken clouds
          "04n": "cloud",
          "09d": "water_drop", // shower rain
          "09n": "water_drop",
          "10d": "rainy", // rain
          "10n": "rainy",
          "11d": "thunderstorm", // thunderstorm
          "11n": "thunderstorm",
          "13d": "ac_unit", // snow
          "13n": "ac_unit",
          "50d": "foggy", // mist
          "50n": "foggy"
        };
        
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          location: data.name,
          icon: iconMap[data.weather[0].icon] || "cloud",
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to fetch weather");
        setLoading(false);
        
        // Set fallback values
        setWeather({
          temp: "--",
          condition: "Unavailable",
          location: "Unknown",
          icon: "cloud_off",
        });
      }
    };
    
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied");
          setLoading(false);
          
          // Fallback to a default location (New York)
          getWeatherData(40.7128, -74.0060);
        }
      );
    } else {
      setError("Geolocation not supported");
      setLoading(false);
      
      // Fallback to a default location
      getWeatherData(40.7128, -74.0060);
    }
    
    // Update weather every 30 minutes
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => getWeatherData(40.7128, -74.0060)
        );
      }
    }, 1800000);
    
    return () => clearInterval(intervalId);
  }, [API_KEY]);

  return (
    <div className="weather-widget">
      {loading ? (
        <div className="weather-loading">
          <span className="material-icons weather-icon">cloud</span>
          <span>Loading weather...</span>
        </div>
      ) : error ? (
        <div className="weather-error">
          <span className="material-icons">error_outline</span>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="weather-main">
            <span className="material-icons weather-icon">{weather.icon}</span>
            <div className="weather-info">
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-condition">{weather.condition}</div>
            </div>
          </div>
          <div className="weather-location">{weather.location}</div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;