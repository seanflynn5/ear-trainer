import * as Tone from 'tone';
import Modal from './Modal';
import Play from './Play';
import Check from './Check';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { JsxElement } from 'typescript';

type Selections = {
  'major': boolean,
  'minor': boolean,
  'diminished': boolean,
  'augmented': boolean
}

function App() {
  const [chords, setChords] = useState<string[][]>([]);
  const [score, setScore] = useState<number>(0);
  const major: string[][] = [['C','E','G'], ['Db','F','Ab'], ['D','Gb','A'],['Eb','G','Bb'],['E','Ab','B'],['F','A','C'],['Gb','Bb','Db'],['G','B','D'],['Ab','C','Eb'],['A','Db','E'],['Bb','D','F'],['B','Eb','Gb']];
  const minor: string[][] = [['C', 'Eb', 'G'],['Db','E','Ab'], ['D','F','A'],['Eb','Gb','Bb'],['E','G','B'],['F','Ab','C'],['Gb','A','Db'],['G','Bb','D'],['Ab','B','Eb'],['A','C','E'],['Bb','Db','F'],['B','D','Gb']];
  const diminished: string[][] = [['C', 'Eb', 'Gb'],['Db','E','G'], ['D','F','Ab'],['Eb','Gb','A'],['E','G','Bb'],['F','Ab','B'],['Gb','A','C'],['G','Bb','Db'],['Ab','B','D'],['A','C','Eb'],['Bb','Db','E'],['B','D','F']];
  const augmented: string[][] = [['C','E','Ab'], ['Db','F','A'], ['D','Gb','Bb'],['Eb','G','B'],['E','Ab','C'],['F','A','Db'],['Gb','Bb','D'],['G','B','Eb'],['Ab','C','E'],['A','Db','F'],['Bb','D','Gb'],['B','Eb','G']];
  const [selections, setSelections] = useState<Selections>({
    'major': true,
    'minor': false,
    'diminished': false,
    'augmented': false
  })
  const [selectedButton, setSelectedButton] = useState(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  
  const handleClose = (): void => {
    setIsOpen(false);
  }


  let randomChord: Array<string>;
  let now;
  let octave: number;
  let synth0;
  let synth1;
  let synth2;

  const handleDivClick = (type): void => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [type]: !prevSelections[type]
    }));
  };

  const chordCount = (): void => {
    const newChords: string[][] = [];
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
    setChords(newChords);
  }  

  const playChord = (): void => {
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

  const repeatChord = (): void => {
    if (!randomChord) {
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

  const checkChord = (e, chordType: string): void => {
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
      setScore(score + 1);
    } else {
      setScore(0);
    }

    setSelectedButton({ chordType, isCorrect });
    setTimeout(() => {
      setSelectedButton(null);
    }, 350);
  };

  function containsArray(arrayOfArrays: string[][], targetArray: Array<string>): boolean {
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
    <Modal modalIsOpen={modalIsOpen} handleClose={handleClose}/>
    <h1 className="title display-4">My Ear Trainer</h1>
    <div className="container mt-4 d-flex justify-content-center">
      <h2 className="h4">Score: {score}</h2>
    </div>
    <div className='content'>
    <Play<JsxElement> selections={selections} handleDivClick={handleDivClick} playChord={playChord} repeatChord={repeatChord}/>
    <Check<JsxElement> selectedButton={selectedButton} checkChord={checkChord}/>
      </div>
  </div>
);
}

export default App;
