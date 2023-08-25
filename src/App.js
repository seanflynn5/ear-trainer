import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [chords, setChords] = useState('');
  const [feedback, setFeedback] = useState('');
  const major = [['C','E','G'], ['Db','F','Ab'], ['D','Gb','A'],['Eb','G','Bb'],['E','Ab','B'],['F','A','C'],['Gb','Bb','Db'],['G','B','D'],['Ab','C','Eb'],['A','Db','E'],['Bb','D','F'],['B','Eb','Gb']];
  const minor = [['C', 'Eb', 'G'],['Db','E','Ab'], ['D','F','A'],['Eb','Gb','Bb'],['E','A','B'],['F','Ab','C'],['Gb','A','Db'],['G','Bb','D'],['Ab','B','Eb'],['A','C','E'],['Bb','Db','F'],['B','D','Gb']];
  const diminished = [['C', 'Eb', 'Gb'],['Db','E','A'], ['D','F','Ab'],['Eb','Gb','A'],['E','A','Bb'],['F','Ab','B'],['Gb','A','C'],['G','Bb','Db'],['Ab','B','D'],['A','C','Eb'],['Bb','Db','E'],['B','D','F']];
  const [selections, setSelections] = useState({
    'major': true,
    'minor': true,
    'diminished': false
  })
  let randomChord;
  let octave;
  let synth0;
  let synth1;
  let synth2;

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
    octave = Math.floor(Math.random() * 3) + 3;
    console.log('octave', octave);
    synth0 = new Tone.Synth().toDestination();
    synth1 = new Tone.Synth().toDestination();
    synth2 = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth0.triggerAttack(randomChord[0] + octave, now);
    synth0.triggerRelease(now + 1);
    synth1.triggerAttack(randomChord[1] + octave, now);
    synth1.triggerRelease(now + 1);
    synth2.triggerAttack(randomChord[2] + octave, now);
    synth2.triggerRelease(now + 1);
  }

  const repeatChord = () => {
    if (!randomChord) {
      setFeedback('Play a chord!');
      return;
    }
    const now = Tone.now();
    synth0.triggerAttack(randomChord[0] + octave, now);
    synth0.triggerRelease(now + 1);
    synth1.triggerAttack(randomChord[1] + octave, now);
    synth1.triggerRelease(now + 1);
    synth2.triggerAttack(randomChord[2] + octave, now);
    synth2.triggerRelease(now + 1);
  }

  const checkChord = (e) => {
    if (!randomChord) {
      setFeedback('Play a chord!');
      return;
    }
    let choice = e.target.innerHTML;
    if (
      (choice === 'Major' && containsArray(major, randomChord)) ||
      (choice === 'Minor' && containsArray(minor, randomChord)) ||
      (choice === 'Diminished' && containsArray(diminished, randomChord))
    ) {
      setFeedback('Right!');
    } else {
      setFeedback('Wrong!');
    }
    console.log('randomChord', randomChord)
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
    <div className="container mt-5 d-flex justify-content-center">
    <h2>Chord Types:</h2>
      <div className="d-flex justify-content-center">
        <button
          className={`btn ${selections.major ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('major')}
        >
          Major
        </button>
        <button
          className={`btn ${selections.minor ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('minor')}
        >
          Minor
        </button>
        <button
          className={`btn ${selections.diminished ? 'btn-success' : 'btn-secondary'} mx-2`}
          onClick={() => handleDivClick('diminished')}
        >
          Diminished
        </button>
      </div>
    </div>
    <button className="btn btn-dark mt-3" onClick={() => playChord()}>Play Chord</button>
    <button className="btn btn-dark mt-3" onClick={() => repeatChord()}>Repeat Chord</button>
    <div className="d-flex justify-content-center mt-3">
      <button className="btn btn-secondary mx-2" onClick={(e) => checkChord(e)}>Major</button>
      <button className="btn btn-secondary mx-2" onClick={(e) => checkChord(e)}>Minor</button>
      <button className="btn btn-secondary mx-2" onClick={(e) => checkChord(e)}>Diminished</button>
    </div>
    <div className="mt-3">
        <p className={feedback === 'Right!' ? 'text-success' : 'text-danger'}>{feedback}</p>
      </div>
  </div>
);
}

export default App;
