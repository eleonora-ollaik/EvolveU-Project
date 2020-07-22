import React, { Component } from "react";

export class QAedit extends Component {

  render() {
    const quiz = this.props.quiz;
    const key = this.props.qaID;
    const qaType = this.props.qaType;
    let ansDisplay=[];
    let question = null;

    const displayOption = {
                            "multipleChoice": {"caNumer": 1, "iaNumber": 3},
                            "openEnded": {"caNumer": 4, "iaNumber": 0},
                            "boolean": {"caNumer": 1, "iaNumber": 1},
                          }

    if (key !== null) {   // A question and answer object provided
      const QA = quiz.QuestionsAndAnswers[key];
      const correct_answers = QA.correct_answers;
      const incorrect_answers = QA.incorrect_answers;
      question = QA.question;

      // Generate correct answer inputs      
      for (let i=0; i<displayOption[qaType]["caNumer"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`} defaultValue={correct_answers[i]}/>);
      }

      // Generate wrong answer inputs
      for (let i=0; i<displayOption[qaType]["iaNumber"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`} defaultValue={incorrect_answers[i]}/>);
      }      
    }

    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion' defaultValue={question}/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange} value={qaType}>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="openEnded">Open Ended Question</option>
          <option value="boolean">True or False</option>
        </select>
        
        {ansDisplay}

        <button onClick={this.props.onClickSave}>Save</button>
      </div>
    );
  }
}

export default QAedit;
