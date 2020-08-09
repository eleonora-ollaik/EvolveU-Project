import React from "react";
import RadioAnswerInput from "./../answerInput/RadioAnswerInput.js";
import TextAnswerInput from "./../answerInput/TextAnswerInput.js";


function populateAnswers (type, qaTypeCheck) {
    let ansDisplay = [];
    let correctTextInput = <TextAnswerInput correctAnswer={true} />;
    let correctRadioInput = <RadioAnswerInput correctAnswer={true} defaultValue=''/>;
    let wrongTextInput = <TextAnswerInput correctAnswer={false} />;
    let wrongRadioInput = <RadioAnswerInput correctAnswer={false} />;
  
  
    let answertypes = [
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
        if (qaTypeCheck[type]["inputType"] === answertypes[i]["questiontype_id"]) 
        {
  
          for (let j = 0; j < qaTypeCheck[type]["caNumer"]; j++) {
            ansDisplay.push(answertypes[i]["component"]);
          }
          for (let j = 0; j < qaTypeCheck[type]["iaNumber"]; j++) {
            ansDisplay.push(answertypes[i]["wrongComponent"]);
          }
        }
      }
    }
    return(ansDisplay)
  }
  
  export default populateAnswers;