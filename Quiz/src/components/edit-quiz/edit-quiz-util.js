import React, { Component } from "react";

function populateDefaultValues (correct_answers, wrong_answers, react_elements) {    

    let default_elements = [];
    let el = null;
    let ci=0;
    let wi=0;
  
    for (let i=0; i<react_elements.length; i++)
    {  
      if(react_elements[i].props["correctAnswer"]) {
          el = React.cloneElement(react_elements[i], {"defaultValue": correct_answers[ci], "key": `ca${ci}`});
          ci++;

          default_elements.push(el);          
      }   
  
      if(!react_elements[i].props["correctAnswer"]) {
        el = React.cloneElement(react_elements[i], {"defaultValue": wrong_answers[wi], "key": `wa${wi}`});
        wi++;
  
        default_elements.push(el);
      }      
    }  
  
    return default_elements
  }

  export default populateDefaultValues;