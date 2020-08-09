import React, { Component } from "react";
import populateAnswers from './../create-quiz/createquiz_util.js'

function populateDefaultValues (correct_answers, wrong_answers) {
    console.log('Beginning of the func')
    let correctInputs = document.querySelectorAll("input[className='CorrectAnswer']")
    console.log(document)
    console.log(correctInputs)
    let wrongInputs = document.querySelectorAll('.WrongAnswer')
    console.log(wrongInputs)
    for (let i=0; i<correctInputs.length; i++) {
      correctInputs[i].defaultValue = correct_answers[i]
      console.log(correct_answers[i])
    }

    for (let i=0; i<wrongInputs.length; i++) {
      wrongInputs[i].defaultValue = wrong_answers[i]
      console.log(wrong_answers[i])

    }


}


 export class QAedit extends Component {


  render() {
    console.log(this.props)
    const quiz = this.props.quiz;
    const key = this.props.qaID;
    const qaType = this.props.qaType;
    const qaCategory = this.props.qaCategory;
    let ansDisplay=[];
    let question = null;

    const displayOption = this.props.qaTypeList;
    const qaCategoryList = this.props.qaCategoryList;
    const qaTypeCheck = this.props.qaTypeCheck;

    if (key !== null) {   // A question and answer object provided
      const QA = quiz.QuestionsAndAnswers[key];
      const correct_answers = QA.correct_answers;
      const wrong_answers = QA.wrong_answers;
      question = QA.question;

      ansDisplay = populateAnswers(qaType, qaTypeCheck);
      populateDefaultValues(correct_answers, wrong_answers);
      // Generate correct answer inputs      
    //   for (let i=0; i<qaTypeCheck[qaType]["caNumer"]; i++) {
    //     ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`} defaultValue={correct_answers[i]}/>);
    //   }

    //   // Generate wrong answer inputs
    //   for (let i=0; i<qaTypeCheck[qaType]["iaNumber"]; i++) {
    //     ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`} defaultValue={wrong_answers[i]}/>);
    //   }        
    }

    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion' defaultValue={question}/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange} value={qaType}>
          {displayOption}
        </select>
        <select name="type" id="idQuestionCategory" onChange={this.props.onChange} value={qaCategory}>
          {qaCategoryList}
        </select>

        
        {ansDisplay}

        <button onClick={this.props.onClickSave}>Save</button>
      </div>
    );
  }
}

export default QAedit
