import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [chords, setChords] = useState('');
  const major = [['C','E','G'], ['Db','F','Ab']];
  const minor = [['C', 'Eb', 'G']];
  const diminished = [['C', 'Eb', 'Gb']];
  const [selections, setSelections] = useState({
    'major': true,
    'minor': true,
    'diminished': false
  })
  let randomChord;

  const handleDivClick = (type) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [type]: !prevSelections[type]
    }));
  };

  const chordCount = () => {
    const newChords = [];
    for (const key in selections) {
      if (selections[key] && key === 'major') {
        for (let i = 0; i < major.length; i++) {
          newChords.push(major[i])
        }
      }
      if (selections[key] && key === 'minor') {
        for (let i = 0; i < minor.length; i++) {
          newChords.push(minor[i])
        }
      }
      if (selections[key] && key === 'diminished') {
        for (let i = 0; i < diminished.length; i++) {
          newChords.push(diminished[i])
        }
      }
    }
    console.log(newChords)
    setChords(newChords)
  }  

  const playChord = () => {
    console.log('chords', chords)
    randomChord = chords[Math.floor(Math.random() * chords.length)]
    console.log('item', randomChord)
  }

  const checkChord = (e) => {
    let choice = e.target.innerHTML;
    // arrInArr(chords, choice)
    console.log('choice', choice)
    console.log('major', major)
    if ((choice === 'Major' && containsArray(major, randomChord)) || (choice === 'Minor' && containsArray(minor, randomChord)) || (choice === 'Diminished' && containsArray(diminished, randomChord))) {
      alert('Right!!')
    } else {
      alert('wrong')
    }
  }

  function containsArray(arrayOfArrays, targetArray) {
    for (const array of arrayOfArrays) {
      if (array.length === targetArray.length && array.every((value, index) => value === targetArray[index])) {
        return true;
      }
    }
    console.log('here')
    return false;
  }

  useEffect(() => {
    chordCount();
}, [selections])

  return (
    <div className='App'>
      <h1 className="display-1">My Ear Trainer</h1>
    <div className="container mt-5">
      <h2>Chord Types</h2>
      <div className="d-flex justify-content-center">
        <div
          className={`btn ${selections.major ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('major')}
        >
          Major
        </div>
        <div
          className={`btn ${selections.minor ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('minor')}
        >
          Minor
        </div>
        <div
          className={`btn ${selections.diminished ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('diminished')}
        >
          Diminished
        </div>
      </div>
    </div>
    
    <button onClick={() => playChord()}>Play Chord</button>
    <div className="d-flex justify-content-center">
    <button onClick={(e) => checkChord(e)}>Major</button>
    <button onClick={(e) => checkChord(e)}>Minor</button>
    <button onClick={(e) => checkChord(e)}>Diminished</button>
    </div>
    </div>
  );
}

export default App;
