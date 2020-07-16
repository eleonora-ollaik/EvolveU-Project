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
    const QAobject = this.props.quiz.QuestionsAndAnswers;
    let QAentries = [];

    for (const [key, QA] of Object.entries(QAobject)) {

      QAentries.push(<div key={`Q${key}`}>{QA.question}</div>);

      for (let i=0; i<QA.correct_answers.length; i++) {
        QAentries.push(<div key={`CA${key}${i}`}>{QA.correct_answers[i]}</div>);
      }

      for (let i=0; i<QA.incorrect_answers.length; i++) {
        QAentries.push(<div key={`IA${key}${i}`}>{QA.incorrect_answers[i]}</div>);
      }
            
      QAentries.push(<button key={`BEdit${key}`} uuid={key} onClick={this.props.onClickEdit}>Edit</button>);
      QAentries.push(<button key={`BDel${key}`} uuid={key} onClick={this.props.onClickDelete}>Delete</button>);
    }

    return (
      <div>
        {QAentries}        
      </div>
    );
  }
}

export default {QAentry, QApreview};
