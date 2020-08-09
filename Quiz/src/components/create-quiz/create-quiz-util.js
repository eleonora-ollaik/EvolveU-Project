import React from "react";
import RadioAnswerInput from "../answerInput/RadioAnswerInput.js";
import TextAnswerInput from "../answerInput/TextAnswerInput.js";

function populateAnswers (type, qaTypeCheck) {
  const ansDisplay = [];
  const correctTextInput = <TextAnswerInput correctAnswer={true} />;
  const correctRadioInput = <RadioAnswerInput correctAnswer={true} defaultValue=''/>;
  const wrongTextInput = <TextAnswerInput correctAnswer={false} />;
  const wrongRadioInput = <RadioAnswerInput correctAnswer={false} />;
  let el = null;
  
  const answertypes = [
    {
      questiontype_id: 1,
      component: correctTextInput,
      wrongComponent: wrongTextInput,
    },
    {
      questiontype_id: 2,
      component: correctRadioInput,
      wrongComponent: wrongRadioInput,
    },
    {
      questiontype_id: 3,
      component: correctTextInput,
      wrongComponent: wrongTextInput,
    },
  ];

  if (qaTypeCheck !== null) {
    // Generate correct and wrong answer inputs  
    for (let i = 0; i < answertypes.length; i++) {
      if (qaTypeCheck[type]["inputType"] === answertypes[i]["questiontype_id"]) {  
        for (let j = 0; j < qaTypeCheck[type]["caNumer"]; j++) {
          el = React.cloneElement(answertypes[i]["component"], {"key": `ca${j}`});
          ansDisplay.push(el);
        }

        for (let j = 0; j < qaTypeCheck[type]["iaNumber"]; j++) {
          el = React.cloneElement(answertypes[i]["wrongComponent"], {"key": `wa${j}`});
          ansDisplay.push(el);
        }
      }
    }
  }

  return(ansDisplay)
}
  
export default populateAnswers;