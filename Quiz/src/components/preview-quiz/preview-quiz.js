import React, { Component } from "react";
import './preview-quiz.css';

export class QApreview extends Component {

  render() {
    const QAobject = this.props.quiz.QuestionsAndAnswers;
    let QAentries = [];
    
    for (const [key, QA] of Object.entries(QAobject)) {

      QAentries.push(<div key={`K${key}`}>{key}</div>);

      QAentries.push(<div key={`Q${key}`}>{QA.question}</div>);

      QAentries.push(<div key={`T${key}`}>{QA.type}</div>);

      for (let i=0; i<QA.correct_answers.length; i++) {
        QAentries.push(<div key={`CA${key}${i}`}>Correct answer: {QA.correct_answers[i]}</div>);
      }

      for (let i=0; i<QA.incorrect_answers.length; i++) {
        QAentries.push(<div key={`IA${key}${i}`}>Wrong answer: {QA.incorrect_answers[i]}</div>);
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

export default QApreview;
