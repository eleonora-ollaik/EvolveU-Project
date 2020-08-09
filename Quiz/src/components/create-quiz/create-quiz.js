import React, { Component } from "react";
import populateAnswers from './createquiz_util.js';


export class QAentry extends Component {


  render() {
    let ansDisplay = [];
    const type = this.props.qaType;

    const displayOption = this.props.qaTypeList;
    const qaTypeCheck = this.props.qaTypeCheck;
    const categoryList = this.props.qaCategoryList;
    ansDisplay = populateAnswers(type, qaTypeCheck)

    return (
      <div>
        <input type="text" placeholder="Question" id="idQuestion" />

        <select name="type" id="idQuestionType" onChange={this.props.onChange}>
          {displayOption}
        </select>

        <select
          name="type"
          id="idQuestionCategory"
          onChange={this.props.onChange}
        >
          {categoryList}
        </select>
        <br />

        {ansDisplay}

        <button onClick={this.props.onClick}>Submit question</button>
      </div>
    );
  }
}

export default QAentry;
