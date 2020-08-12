import React, { Component } from "react";
import './preview-quiz.css'

export class QApreview extends Component {

  render() {
    const QAobject = this.props.quiz.QuestionsAndAnswers;
    let QAentries = [];
    let maxColNum = 0;
    
    for (const [key, QA] of Object.entries(QAobject)) {
      let num = QA.correct_answers.length + QA.wrong_answers.length;
      if (num > maxColNum){
        maxColNum = num;
      }
    }
    QAentries.push(
        <PreviewColNum  maxColNum={maxColNum}/>

    )
    
    for (const [key, QA] of Object.entries(QAobject)) {

      QAentries.push(<PreviewRow maxColNum = {maxColNum} key={key} QA={QA} onClickDelete={this.props.onClickDelete} onClickEdit={this.props.onClickEdit}/>)

    }

    return (
      <div >
        <table>
          {QAentries}
        </table>
      </div>
    );
  }
}


class PreviewRow extends Component {
  render() {

    let QA = this.props.QA
    const correct = []
    const wrong = []

      for (let i=0; i<QA.correct_answers.length; i++) {
        correct.push(<td key={`CA${this.props.key}${i}`}>Correct answer: {QA.correct_answers[i]}</td>);
      }

      for (let i=0; i<QA.wrong_answers.length; i++) {
        wrong.push(<td key={`IA${this.props.key}${i}`}>Wrong answer: {QA.wrong_answers[i]}</td>);
      }
      let ansLength = QA.correct_answers.length + QA.wrong_answers.length;
      if (this.props.maxColNum > ansLength) {
        for (let i=0; i<(this.props.maxColNum-ansLength); i++){
          wrong.push(<td key={`EA${this.props.key}${i}`}></td>)
        }
      }
    



    return (

    <tr>
      <td key={`K${this.props.key}`}>{this.props.key}</td>
      <td key={`Q${this.props.key}`}>{this.props.QA.question}</td>
      <td key={`T${this.props.key}`}>{this.props.QA.type}</td>
      <td key={`TN${this.props.key}`}>{this.props.QA.typename}</td>
      <td key={`C${this.props.key}`}>{this.props.QA.category_id}</td>
      <td key={`CN${this.props.key}`}>{this.props.QA.category} </td>
      {correct}
      {wrong}
      <button key={`BEdit${this.props.key}`} uuid={this.props.key} onClick={this.props.onClickEdit}>Edit</button>
      <button key={`BDel${this.props.key}`} uuid={this.props.key} onClick={this.props.onClickDelete}>Delete</button>
    </tr>

    )
  }

}


class PreviewColNum extends Component {
  render() {
    const answerTitle = [];
    for (let i=0; i<this.props.maxColNum; i++){
      answerTitle.push(<th>Answer {i+1}</th>)
    }
    return(
      <tr>
        <th>Key</th>
        <th>Question</th>
        <th>Type ID</th>
        <th>Type</th>
        <th>Category ID</th>
        <th>Category</th>
        {answerTitle}
      </tr>
    )
  }
}

export default QApreview;