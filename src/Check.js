
const Check = (props) => {
    return(
    <div className="container mt-4 d-flex flex-column justify-content-center box">
      <h2 className="h4 align-self-center">Your Answer</h2>
        <div className="d-flex justify-content-center row">
          <button
            className={`col-6 btn ${props.selectedButton?.chordType === 'Major' ? (props.selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => props.checkChord(e, 'Major')}
          >
            Major
          </button>
          <button
            className={`col-6 btn ${props.selectedButton?.chordType === 'Minor' ? (props.selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => props.checkChord(e, 'Minor')}
          >
            Minor
          </button>
          <button
            className={`col-6 btn ${props.selectedButton?.chordType === 'Diminished' ? (props.selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => props.checkChord(e, 'Diminished')}
          >
            Diminished
          </button>
          <button
            className={`col-6 btn ${props.selectedButton?.chordType === 'Augmented' ? (props.selectedButton.isCorrect ? 'btn-success' : 'btn-danger') : 'btn-secondary'} mx-2 my-1 btn-sm`}
            onClick={(e) => props.checkChord(e, 'Augmented')}
          >
            Augmented
          </button>
        </div>
      </div> 
    )
}

export default Check;