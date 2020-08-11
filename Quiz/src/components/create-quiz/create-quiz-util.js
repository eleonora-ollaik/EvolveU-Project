import React from "react";
import QuizComp from "../comp-map.js";

function populateAnswers (type, qatypeObj) {
  const ansDisplay = [];

  let el = null;
  let comp = null;
  
  if (qatypeObj !== null) {          
    // Generate correct answer inputs  
    for (let j = 0; j < qatypeObj[type]["caNumer"]; j++) {
      comp = QuizComp[qatypeObj[type]["comp"]];
      el = React.cloneElement(comp, {"correctAnswer": true, "key": `ca${j}`});
      ansDisplay.push(el);
    }

    // Generate wrong answer inputs  
    for (let j = 0; j < qatypeObj[type]["iaNumber"]; j++) {
      comp = QuizComp[qatypeObj[type]["comp"]];
      el = React.cloneElement(comp, {"correctAnswer": false, "key": `wa${j}`});
      ansDisplay.push(el);
    }
  }

  return(ansDisplay)
}
  
export default populateAnswers;