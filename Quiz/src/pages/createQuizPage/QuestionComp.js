import React, { Component } from "react";

export class QAentry extends Component {

  render() {
    let ansDisplay;
    if (this.props.QAtype === "multipleChoice") {
       ansDisplay = [
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer' key = 'c1'/>,
        <input type="text" placeholder="Wrong Answer/s" className='WrongAnswer' key = 'w1'/>,
        <input type="text" placeholder="Wrong Answer/s" className='WrongAnswer' key = 'w2'/>,
        <input type="text" placeholder="Wrong Answer/s" className='WrongAnswer'key = 'w3'/>
    ];

    } else if(this.props.QAtype === "openEnded") {

       ansDisplay = [
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer'key = 'c1'/>,
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer'key = 'c2'/>,
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer'key = 'c3'/>,
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer'key = 'c4'/>      
      ];

    } else if(this.props.QAtype === "boolean") {
      ansDisplay = [
        <input type="text" placeholder="Correct Answer" className='CorrectAnswer'key = 'c1'/>,
        <input type="text" placeholder="Wrong Answer/s" className='WrongAnswer'key = 'w1'/>
    ];

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

export class QApreview extends Component {

  render() {
    const entries_num = Object.keys(this.props.quiz.QuestionsAndAnswers).length;
    let QAentries = [];
    console.log("this.props.quiz.QuestionsAndAnswers,", this.props.quiz.QuestionsAndAnswers);
    console.log("entries_num,", entries_num);
    for (let i=0; i<entries_num; i++ ) {
      QAentries.push(<QAentry key={i} quiz={this.props.quiz} QAtype={this.props.QAtype} onClick={this.props.onClick} onChange={this.props.onChange}/>);
    }

    return (
      <div>
        {QAentries}        
      </div>
    );
  }
}

export default {QAentry, QApreview};
