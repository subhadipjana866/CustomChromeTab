/**
 * App.js
 * Main container for our Chrome-style homepage in React.
 * Contains the Greeting, SearchBar, QuickLinks, AppLauncher components,
 * as well as Weather, News, and Note widgets.
 */

import React from "react";
import Greeting from "./Greeting";
import SearchBar from "./SearchBar";
import QuickLinks from "./QuickLinks";
import AppLauncher from "./AppLauncher";
import ParticleBackground from "./ParticleBackground";
import WeatherWidget from "./WeatherWidget";
import NewsWidget from "./NewsWidget";
import NoteWidget from "./NoteWidget";
import "./App.css";


function App() {
  return (
    <div className="App">
      {/* Background with floating particles */}
      <ParticleBackground />
      
      {/* News widget in the top left corner */}
      <NewsWidget />
      
      {/* Chrome-style app launcher (9 dots) in the top right corner */}
      <AppLauncher />
      
      {/* Weather widget in the bottom left corner */}
      <WeatherWidget />
      
      {/* Notes widget in the bottom right corner */}
      <NoteWidget />
      
      {/* Greeting with fade-in effect and dynamic daypart */}
      <Greeting userName="SUBHADIP" />
      
      {/* Google search input box */}
      <SearchBar />
      
      {/* Minimal quick links similar to Chrome's new tab */}
      <QuickLinks />
    </div>
  );
}

export default App;