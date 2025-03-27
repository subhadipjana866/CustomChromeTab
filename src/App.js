/**
 * App.js
 * Main container for our Chrome-style homepage in React.
 * Contains the Greeting, SearchBar, QuickLinks, and AppLauncher components.
 */

import React from "react";
import Greeting from "./Greeting";
import SearchBar from "./SearchBar";
import QuickLinks from "./QuickLinks";
import AppLauncher from "./AppLauncher";
import ParticleBackground from "./ParticleBackground";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Background with floating particles */}
      <ParticleBackground />
      
      {/* Chrome-style app launcher (9 dots) in the top right corner */}
      <AppLauncher />
      
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