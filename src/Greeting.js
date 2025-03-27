/**
 * Greeting.js
 * Displays a time-based greeting message for the user.
 * Includes a fade-in animation after a short delay.
 */

import React, { useState, useEffect } from "react";
import "./Greeting.css";

function Greeting({ userName }) {
  const [greeting, setGreeting] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Determine the appropriate greeting based on the current hour.
    const hour = new Date().getHours();
    let greetMsg = "Good Evening";
    if (hour < 12) {
      greetMsg = "Good Morning";
    } else if (hour < 18) {
      greetMsg = "Good Afternoon";
    }
    setGreeting(`${greetMsg}, ${userName}!`);

    // A slight delay triggers the fade-in CSS transition.
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, [userName]);

  return (
    <h1 className={`greeting ${visible ? "fade-in" : ""}`}>
      {greeting}
    </h1>
  );
}

export default Greeting;