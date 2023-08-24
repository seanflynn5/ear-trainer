import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const major = [['C','E','G']];
  const minor = [['C', 'Eb', 'G']];
  const diminished = [['C', 'Eb', 'Gb']];
  const [isMajor, setIsMajor] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [isDiminished, setIsDiminished] = useState(false);
  const [selections, setSelections] = useState({
    'major': true,
    'minor': true,
    'diminished': false
  })

  const handleDivClick = (type) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [type]: !prevSelections[type]
    }));
  };

  return (
    <div className="App">
      <h1>My Ear Trainer</h1>
      <div>
      <div onClick={() => handleDivClick('major')}>
        Major {selections.major ? 'Selected' : 'Not Selected'}
      </div>
      <div onClick={() => handleDivClick('minor')}>
        Minor {selections.minor ? 'Selected' : 'Not Selected'}
      </div>
      <div onClick={() => handleDivClick('diminished')}>
        Diminished {selections.diminished ? 'Selected' : 'Not Selected'}
      </div>
    </div>
    </div>
  );
}

export default App;
