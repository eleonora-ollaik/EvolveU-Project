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
      <div>
          <div className="quizInfo" style={{marginBottom: "35px"}}>
            <div className="label-input">
              <div style={{marginBottom: "-4px"}}>Enter question</div>
              <input type="text" placeholder="Question" id="idQuestion" style={{width: "520px"}}/>
            </div>
            <div className="label-input">
              <div style={{marginBottom: "5px"}}>Select a question type</div>
              <select name="type" id="idQuestionType" onChange={this.props.onChange} style={{width: "200px", marginLeft: "-80px"}}>
                {displayOption}
              </select>
            </div>
            <div className="label-input" style={{marginLeft: "-105px"}}>
              <div style={{marginBottom: "5px"}} >Select question category</div>
              <select
                name="type"
                id="idQuestionCategory"
                onChange={this.props.onChange}
                style={{width: "200px", marginLeft: "-105px"}}
              >
                {categoryList}
              </select>
            </div>
          </div>

          <div className="answers" style={{marginLeft: "47px"}}>
            {ansDisplay}
          </div>
          <hr/>
      </div>
    );
  }
}

export default QAentry;
