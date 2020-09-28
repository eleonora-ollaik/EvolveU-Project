import React, { Component } from "react";
import populateAnswers from './create-quiz-util.js';
import './create-quiz.css';

export class QAentry extends Component {

  render() {
    let ansDisplay = [];
    const type = this.props.qaType;

    const displayOption = this.props.qaTypeList;
    const qaTypeObj = this.props.qaTypeObj;
    const categoryList = this.props.qaCategoryList;
    ansDisplay = populateAnswers(type, qaTypeObj)

    return (
      <div>
          <div className="create-quizInfo">
            <div className="create-question-input">
              <div className="create-question-label">Enter question</div>
              <input type="text" placeholder="Question" id="idQuestion"/>
            </div>
            <div className="create-question-input">
              <div className="create-question-select">Select a question type</div>
              <select 
                name="type" 
                id="idQuestionType"
                style={{ border: "1px solid black"}}  
                onChange={this.props.onChange}
              >
                {displayOption}
              </select>
            </div>
            <div className="create-question-input">
              <div className="create-question-select">Select question category</div>
              <select
                style={{ border: "1px solid black"}} 
                name="type"
                id="idQuestionCategory"
                onChange={this.props.onChange}
              >
                {categoryList}
              </select>
            </div>
          </div>

          <div className="create-answers">
            {ansDisplay}
          </div>
          <hr/>
      </div>
    );
  }
}

export default QAentry;
