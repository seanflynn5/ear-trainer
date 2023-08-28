import * as Tone from 'tone';
import Tour from './Tour';
import { FaPlay, FaRedo } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [chords, setChords] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const major = [['C','E','G'], ['Db','F','Ab'], ['D','Gb','A'],['Eb','G','Bb'],['E','Ab','B'],['F','A','C'],['Gb','Bb','Db'],['G','B','D'],['Ab','C','Eb'],['A','Db','E'],['Bb','D','F'],['B','Eb','Gb']];
  const minor = [['C', 'Eb', 'G'],['Db','E','Ab'], ['D','F','A'],['Eb','Gb','Bb'],['E','G','B'],['F','Ab','C'],['Gb','A','Db'],['G','Bb','D'],['Ab','B','Eb'],['A','C','E'],['Bb','Db','F'],['B','D','Gb']];
  const diminished = [['C', 'Eb', 'Gb'],['Db','E','G'], ['D','F','Ab'],['Eb','Gb','A'],['E','G','Bb'],['F','Ab','B'],['Gb','A','C'],['G','Bb','Db'],['Ab','B','D'],['A','C','Eb'],['Bb','Db','E'],['B','D','F']];
  const augmented = [['C','E','Ab'], ['Db','F','A'], ['D','Gb','Bb'],['Eb','G','B'],['E','Ab','C'],['F','A','Db'],['Gb','Bb','D'],['G','B','Eb'],['Ab','C','E'],['A','Db','F'],['Bb','D','Gb'],['B','Eb','G']];
  const [selections, setSelections] = useState({
    'major': true,
    'minor': false,
    'diminished': false,
    'augmented': false
  })
  const [selectedButton, setSelectedButton] = useState(null);
  let randomChord;
  let now;
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
      if (selections[key] && key === 'augmented') {
        for (let i = 0; i < augmented.length; i++) {
          newChords.push(augmented[i])
        }
      }
    }
    console.log(newChords)
    setChords(newChords);
  }  

  const playChord = () => {
    randomChord = chords[Math.floor(Math.random() * chords.length)]
    octave = Math.random() < 0.5 ? 4 : 5;
    synth0 = new Tone.Synth().toDestination();
    synth1 = new Tone.Synth().toDestination();
    synth2 = new Tone.Synth().toDestination();
    now = Tone.now();
    synth0.triggerAttack(randomChord[0] + octave, now);
    synth0.triggerRelease(now + 1);
    synth1.triggerAttack(randomChord[1] + octave, now);
    synth1.triggerRelease(now + 1);
    synth2.triggerAttack(randomChord[2] + octave, now);
    synth2.triggerRelease(now + 1);
  }

  const repeatChord = () => {
    console.log('randomChord', randomChord)
    if (!randomChord) {
      console.log('here')
      setFeedback('Play a chord!');
      return;
    }
    now = Tone.now();
    synth0.triggerAttack(randomChord[0] + octave, now);
    synth0.triggerRelease(now + 1);
    synth1.triggerAttack(randomChord[1] + octave, now);
    synth1.triggerRelease(now + 1);
    synth2.triggerAttack(randomChord[2] + octave, now);
    synth2.triggerRelease(now + 1);
  }

  const checkChord = (e, chordType) => {
    if (!randomChord) {
      setSelectedButton(null);
      return;
    }
    
    let choice = chordType;
    let isCorrect = false;
    
    if (
      (choice === 'Major' && containsArray(major, randomChord)) ||
      (choice === 'Minor' && containsArray(minor, randomChord)) ||
      (choice === 'Diminished' && containsArray(diminished, randomChord)) ||
      (choice === 'Augmented' && containsArray(augmented, randomChord))
    ) {
      isCorrect = true;
      setFeedback('Right!');
      setScore(score + 1);
    } else {
      setFeedback('Wrong!');
      setScore(0);
    }

    setSelectedButton({ chordType, isCorrect });
    setTimeout(() => {
      setSelectedButton(null);
    }, 1000);
  };

  function containsArray(arrayOfArrays, targetArray) {
    for (const array of arrayOfArrays) {
      if (array.length === targetArray.length && array.every((value, index) => value === targetArray[index])) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    chordCount();
}, [selections])

return (
  <div className='App'>
    <Tour />
    <div className='content'></div>
    <h1 className="display-4">My Ear Trainer</h1>
    <div className='content'>
    <div className="container mt-4 d-flex flex-column justify-content-center box">
      <h2 className="h4 align-self-center">Chord Types</h2>
      <div className="d-flex justify-content-center row">
        <button
          className={`col-6 my-1 btn btn-sm ${selections.major ? 'btn-success' : 'btn-secondary'} mx-2`} 
          onClick={() => handleDivClick('major')}
        >
          Major
        </button>
        <button
          className={`col-6 my-1 btn btn-sm ${selections.minor ? 'btn-success' : 'btn-secondary'} mx-2`} 
          onClick={() => handleDivClick('minor')}
        >
          Minor
        </button>
        <button
          className={`col-6 my-1 btn btn-sm ${selections.diminished ? 'btn-success' : 'btn-secondary'} mx-2`} 
          onClick={() => handleDivClick('diminished')}
        >
          Diminished
        </button>
        <button
          className={`col-6 my-1 btn btn-sm ${selections.augmented ? 'btn-success' : 'btn-secondary'} mx-2`} 
          onClick={() => handleDivClick('augmented')}
        >
          Augmented
        </button>
      </div>
      <div className="container mt-4 d-flex justify-content-center buttons">
    <button className="btn btn-dark mt-2 mx-1 btn-sm" onClick={() => playChord()}>
          <FaPlay /> 
        </button>
        <button className="btn btn-dark mt-2 mx-1 btn-sm" onClick={() => repeatChord()}>
          <FaRedo />
        </button>
    </div>
    </div>

    <div className="container mt-4 d-flex flex-column justify-content-center box">
      <h2 className="h4 align-self-center">Your Answer</h2>
        <div className="d-flex justify-content-center row">
          <button
            className={`col-6 btn ${selectedButton?.chordType === 'Major' ? (selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => checkChord(e, 'Major')}
          >
            Major
          </button>
          <button
            className={`col-6 btn ${selectedButton?.chordType === 'Minor' ? (selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => checkChord(e, 'Minor')}
          >
            Minor
          </button>
          <button
            className={`col-6 btn ${selectedButton?.chordType === 'Diminished' ? (selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => checkChord(e, 'Diminished')}
          >
            Diminished
          </button>
          <button
            className={`col-6 btn ${selectedButton?.chordType === 'Augmented' ? (selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => checkChord(e, 'Augmented')}
          >
            Augmented
          </button>
        </div>
      </div>
      </div>
    <div className="container mt-4 d-flex justify-content-center">
      <h2 className="h4">Score: {score}</h2>
    </div>
  </div>
);
}

export default App;
