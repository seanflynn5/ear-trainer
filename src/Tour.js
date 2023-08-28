import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shepherd from 'shepherd.js';

function Tour() {
  useEffect(() => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: false
        },
        classes: 'tour',
        scrollTo: true
      }
    });

    tour.addStep({
      title: 'How to Use My Ear Trainer',
      id: 'step-1',
      text: `Select any combination of chord types you want to hear random instances of and test yourself on. After playing a chord with the 'Play' button, repeat it or select your answer to indicate the chord type you believe was played. Your selection being highlighted green indicates a correct answer while the selection being highlighted red indicates it being incorrect. If you're on mobile, be sure to turn off "silent" mode. Have fun and happy listening!`,
      attachTo: { element: '.major-button', on: 'bottom' },
      buttons: [
        {
          action() {
            return tour.complete();
          },
          text: `Let's get started!`,
          classes: 'btn btn-dark popup-button',
          when: {
            show: () => true // Trigger the action when the step is shown
          }
        }
      ]
    });

    tour.start();
  }, []);

  return null;
}

export default Tour;