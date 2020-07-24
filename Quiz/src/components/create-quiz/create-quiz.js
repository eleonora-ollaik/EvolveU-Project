import React, { Component } from "react";

export class QAentry extends Component {


  render() {
    let ansDisplay=[];
    const type = this.props.qaType;

    const displayOption = this.props.qaTypeList;
    const qaTypeCheck = this.props.qaTypeCheck;
         
    if(qaTypeCheck !== null) {   
      // Generate correct answer inputs  
      for (let i=0; i<qaTypeCheck[type]["caNumer"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`}/>);
      }
  
      // Generate wrong answer inputs
      for (let i=0; i<qaTypeCheck[type]["iaNumber"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`}/>);
      }      
    }
    
    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion'/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange}>
          {displayOption}
        </select>

        {ansDisplay}

        <button onClick = {this.props.onClick}>Submit question</button>
      </div>
    );
  }
}

export default QAentry;
