import React from 'react'

interface ModalProps {
  modalIsOpen: boolean;
  handleClose: Function;
}

const Modal = (props: ModalProps): React.JSX.Element => {
    return(
        <div>
        {props.modalIsOpen && (
            <div
              onClick={() => {
                props.handleClose();
              }}
              className='overlay'
            >
              <div className='modalContents'>
                <div className='modalText'>
                Select any combination of chord types you want to hear random instances of and test yourself on. After playing a chord with the 'Play' button, repeat it or select your answer to indicate the chord type you believe was played. Your selection being highlighted green indicates a correct answer while the selection being highlighted red indicates it being incorrect. If you're on mobile, be sure to turn off "silent" mode. Have fun and happy listening!
                <button className='btn btn-dark mt-2 mx-1 btn-sm popup-button' onClick={() => {
                props.handleClose()
              }}>Let's get started!</button>
                </div>
              </div>
            </div>
          )}
          </div>
    )
}

export default Modal;