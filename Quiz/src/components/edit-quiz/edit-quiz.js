import React, { Component } from "react";
import populateDefaultValues from './edit-quiz-util.js'
import populateAnswers from './../create-quiz/create-quiz-util.js'

export class QAedit extends Component {

  render() {
    const quiz = this.props.quiz;
    const key = this.props.qaID;
    const qaType = this.props.qaType;
    const qaCategory = this.props.qaCategory;
    let ansDisplay=[];
    let question = null;

    const displayOption = this.props.qaTypeList;
    const qaCategoryList = this.props.qaCategoryList;
    const qaTypeObj = this.props.qaTypeObj;

    if (key !== null) {   // A question and answer object provided
      const QA = quiz.QuestionsAndAnswers[key];
      const correct_answers = QA.correct_answers;
      const wrong_answers = QA.wrong_answers;
      question = QA.question;

      ansDisplay = populateAnswers(qaType, qaTypeObj);
      ansDisplay = populateDefaultValues(correct_answers, wrong_answers, ansDisplay);     
    }

    return (
      <div>
        <input type="text" placeholder="Question"  id='idQuestion' defaultValue={question}/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange} value={qaType}>
          {displayOption}
        </select>
        <select name="type" id="idQuestionCategory" onChange={this.props.onChange} value={qaCategory}>
          {qaCategoryList}
        </select>
        
        {ansDisplay}

        <button className='editSaveBtn' onClick={this.props.onClickSave}>Save</button>
      </div>
    );
  }
}

export default QAedit
