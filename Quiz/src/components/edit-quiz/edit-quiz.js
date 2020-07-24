import React, { Component } from "react";

export class QAedit extends Component {

  render() {
    console.log(this.props)
    const quiz = this.props.quiz;
    const key = this.props.qaID;
    const qaType = this.props.qaType;
    let ansDisplay=[];
    let question = null;

    const displayOption = this.props.qaTypeList;
    const qaTypeCheck = this.props.qaTypeCheck;

    if (key !== null) {   // A question and answer object provided
      const QA = quiz.QuestionsAndAnswers[key];
      const correct_answers = QA.correct_answers;
      const wrong_answers = QA.wrong_answers;
      question = QA.question;

      // Generate correct answer inputs      
      for (let i=0; i<qaTypeCheck[qaType]["caNumer"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`} defaultValue={correct_answers[i]}/>);
      }

      // Generate wrong answer inputs
      for (let i=0; i<qaTypeCheck[qaType]["iaNumber"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`} defaultValue={wrong_answers[i]}/>);
      }        
    }

    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion' defaultValue={question}/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange} value={qaType}>
          {displayOption}
        </select>
        
        {ansDisplay}

        <button onClick={this.props.onClickSave}>Save</button>
      </div>
    );
  }
}

export default QAedit;
