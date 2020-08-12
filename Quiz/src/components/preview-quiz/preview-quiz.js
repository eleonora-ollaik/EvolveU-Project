import React, { Component } from "react";
import './preview-quiz.css'

export class QApreview extends Component {

  render() {
    const QAobject = this.props.quiz.QuestionsAndAnswers;
    const QAentries = [];
    let FootNote = [];
    let maxColNum = 0;
    
    // Get the max number of columns required for different question types
    // to ensure the correct number of cells is created to align the table content
    for (const QA of Object.values(QAobject)) {
      const num = QA.correct_answers.length + QA.wrong_answers.length;
      if (num > maxColNum){
        maxColNum = num;
      }
    }

    // Only generate table when there is at least one question and answer pair
    if (Object.keys(QAobject).length > 0) {
      QAentries.push(<PreviewRowTitle key="prt" maxColNum={maxColNum}/>)

      // Generate table rows
      for (const [key, QA] of Object.entries(QAobject)) {
        QAentries.push(<PreviewRow key={`pr${key}`} maxColNum={maxColNum} uuid={key} QA={QA} onClickDelete={this.props.onClickDelete} onClickEdit={this.props.onClickEdit}/>);
      }      
      
      FootNote.push(<PreviewFootNote key="pfn"/>)
    }

    return (
      <div className="previewContainer">
        <table>
          <tbody>
            {QAentries}
          </tbody>
        </table>
        {FootNote}               
      </div>
    );
  }
}

class PreviewFootNote extends Component {
  render() {
    return (
      <div className="previewFootNote">
        <br/>
        <p>Answer in <span className="correctAnswerColor">green</span> represents <span className="correctAnswerColor">correct answer</span></p>
        <p>Answer in <span className="wrongAnswerColor">red</span> represents <span className="wrongAnswerColor">wrong answer</span></p>
        <br/>
      </div> 
    )
  }
}

class PreviewRow extends Component {
  render() {

    const QA = this.props.QA;
    const uuid = this.props.uuid;
    const correct = [];
    const wrong = [];

    for (let i=0; i<QA.correct_answers.length; i++) {
      correct.push(<td key={`CA${uuid}${i}`} className="correctAnswerColor">{QA.correct_answers[i]}</td>);
    }

    for (let i=0; i<QA.wrong_answers.length; i++) {
      wrong.push(<td key={`IA${uuid}${i}`} className="wrongAnswerColor">{QA.wrong_answers[i]}</td>);
    }
    const ansLength = QA.correct_answers.length + QA.wrong_answers.length;
    if (this.props.maxColNum > ansLength) {
      for (let i=0; i<(this.props.maxColNum-ansLength); i++){
        wrong.push(<td key={`EA${uuid}${i}`}></td>)
      }
    }
  
    return (
      <tr>
        {/* <td key={`K${uuid}`}>{uuid}</td> */}
        <td key={`Q${uuid}`}>{this.props.QA.question}</td>
        {/* <td key={`T${uuid}`}>{this.props.QA.type}</td> */}
        <td key={`TN${uuid}`}>{this.props.QA.typename}</td>
        {/* <td key={`C${uuid}`}>{this.props.QA.category_id}</td> */}
        <td key={`CN${uuid}`}>{this.props.QA.category} </td>
        {correct}
        {wrong}
        <td key={`BE${uuid}`}>
          <button key={`BEdit${uuid}`} uuid={uuid} onClick={this.props.onClickEdit}>Edit</button>
        </td>
        <td key={`BD${uuid}`}>
          <button key={`BDel${uuid}`} uuid={uuid} onClick={this.props.onClickDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}

class PreviewRowTitle extends Component {
  render() {
    const answerTitle = [];
    for (let i=0; i<this.props.maxColNum; i++){
      answerTitle.push(<th key={`tha${i}`}>Answer {i+1}</th>)
    }
    return(
      <tr>
        {/* <th key="thk">Key</th> */}
        <th key="thq">Question</th>
        {/* <th key="thtid">Type ID</th> */}
        <th key="thtn">Type</th>
        {/* <th key="thcid">Category ID</th> */}
        <th key="thcn">Category</th>
        {answerTitle}
      </tr>
    )
  }
}

export default QApreview;