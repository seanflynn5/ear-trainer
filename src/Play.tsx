import { FaPlay, FaRedo } from 'react-icons/fa';
import React from 'react'
import { Selections } from './App'

interface PlayProps {
  selections: Selections;
  handleDivClick: Function;
  playChord: Function;
  repeatChord: Function;

}

const Play = (props: PlayProps): React.JSX.Element => {
    return (
    <div className="container mt-4 d-flex flex-column justify-content-center box">
    <h2 className="h4 align-self-center">Chord Types</h2>
    <div className="d-flex justify-content-center row">
      <button
        className={`col-6 my-1 btn btn-sm ${props.selections.major ? 'btn-success' : 'btn-secondary'} mx-2`} 
        onClick={() => props.handleDivClick('major')}
      >
        Major
      </button>
      <button
        className={`col-6 my-1 btn btn-sm ${props.selections.minor ? 'btn-success' : 'btn-secondary'} mx-2`} 
        onClick={() => props.handleDivClick('minor')}
      >
        Minor
      </button>
      <button
        className={`col-6 my-1 btn btn-sm ${props.selections.diminished ? 'btn-success' : 'btn-secondary'} mx-2`} 
        onClick={() => props.handleDivClick('diminished')}
      >
        Diminished
      </button>
      <button
        className={`col-6 my-1 btn btn-sm ${props.selections.augmented ? 'btn-success' : 'btn-secondary'} mx-2`} 
        onClick={() => props.handleDivClick('augmented')}
      >
        Augmented
      </button>
    </div>
    <div className="container mt-4 d-flex justify-content-center buttons">
  <button className="btn btn-dark mt-2 mx-1 btn-sm" onClick={() => props.playChord()}>
        <FaPlay /> 
      </button>
      <button className="btn btn-dark mt-2 mx-1 btn-sm" onClick={() => props.repeatChord()}>
        <FaRedo />
      </button>
  </div>
  </div>
    )
}

export default Play;