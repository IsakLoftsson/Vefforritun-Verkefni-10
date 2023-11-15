// import logo from './logo-mr-man.png';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [animationDuration, setAnimationDuration] = useState(10);

  const handleSliderChange = (event) => {
    setAnimationDuration(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={process.env.PUBLIC_URL + '/logo-mr-man.png'}
          className="App-logo"
          alt="logo"
          style={{
            animation: `App-logo-spin infinite ${animationDuration}s linear`,
          }}
        />
        <h1>Hæ kennari, þetta er ég, Ísak :^) </h1> <p>Ég notaði React fyrir þetta! Sjáðu hvað ég get farið hratt! </p>
        <input
          type="range"
          min="1"
          max="20"
          value={animationDuration}
          onChange={handleSliderChange}
        />
        <span>{`${21-animationDuration} Km/klst`}s</span> {}
        <a
          className="App-link"
          href="./location.html"
          rel="noopener noreferrer"
        >
          Ekki smella!!!
        </a>
      </header>
    </div>
  );
}

export default App;