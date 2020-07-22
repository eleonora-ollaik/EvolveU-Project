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
        <div id="idEditQAModal" className="modal">
          <QAedit
            quiz={this.props.quiz}
            qaID= {this.props.qaID}
            qaType={this.props.qaType}
            onChange={this.props.onChange}
            onClickSave = {this.props.onClickSave}
            onClickClose = {this.props.onClickClose}
          />        
        </div>        
      </div>
    );
  }
}

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
      // Modal Box
      <div className="modal-content">

        <span className="close" onClick={this.props.onClickClose}>x</span>
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

export default QApreview;
