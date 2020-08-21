import React, { Component } from "react";
import populateAnswers from './create-quiz-util.js';
import '../../pages/createQuizPage/CreateQuizForm.css';

export class QAentry extends Component {

  render() {
    let ansDisplay = [];
    const type = this.props.qaType;

    const displayOption = this.props.qaTypeList;
    const qaTypeObj = this.props.qaTypeObj;
    const categoryList = this.props.qaCategoryList;
    ansDisplay = populateAnswers(type, qaTypeObj)

    return (
      <div className="label-input-QA">
        <div>Enter question</div>
        <input type="text" placeholder="Question" id="idQuestion" />
        <div>Select a question type</div>
        <select name="type" id="idQuestionType" onChange={this.props.onChange}>
          {displayOption}
        </select>

        <div>Select a category for the question</div>
        <select
          name="type"
          id="idQuestionCategory"
          onChange={this.props.onChange}
        >
          {categoryList}
        </select>
        <br />

        {ansDisplay}

        <button  className='button' onClick={this.props.onClick}>Submit Question</button>
      </div>
    );
  }
}

export default QAentry;
