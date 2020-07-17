import React, { Component } from "react";

export class QAentry extends Component {


  render() {
    let ansDisplay=[];
    const type = this.props.qaType;

    const displayOption = {
                            "multipleChoice": {"caNumer": 1, "iaNumber": 3},
                            "openEnded": {"caNumer": 4, "iaNumber": 0},
                            "boolean": {"caNumer": 1, "iaNumber": 1},
                          }

    // Generate correct answer inputs      
    for (let i=0; i<displayOption[type]["caNumer"]; i++) {
      ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`}/>);
    }

    // Generate wrong answer inputs
    for (let i=0; i<displayOption[type]["iaNumber"]; i++) {
      ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`}/>);
    }      

    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion'/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange}>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="openEnded">Open Ended Question</option>
          <option value="boolean">True or False</option>
        </select>

        {ansDisplay}

        <button onClick = {this.props.onClick}>Submit question</button>
      </div>
    );
  }
}

export default QAentry;
