import React, { Component } from "react";

export class QAentry extends Component {


  render() {
    let ansDisplay=[];
    const type = this.props.qaType;

    const displayOption = this.props.qaTypeList;
    const qaTypeCheck = this.props.qaTypeCheck;
    const categoryList = this.props.qaCategoryList;
         
    if(qaTypeCheck !== null) {   
      ansDisplay.push(<p> {qaTypeCheck[type]["question_label"]}</p>)
      // Generate correct answer inputs  
      for (let i=0; i<qaTypeCheck[type]["caNumer"]; i++) {
        ansDisplay.push(<div><label>{qaTypeCheck[type]["correctansw_label"]}</label><input type = {qaTypeCheck[type]["inputType"]} placeholder="Correct Answer" value = {qaTypeCheck[type]["correctansw_label"]} className='CorrectAnswer' key={`'ca'${i}`}/></div>);

      }
  
      // Generate wrong answer inputs
      for (let i=0; i<qaTypeCheck[type]["iaNumber"]; i++) {
        ansDisplay.push(<div><label>{qaTypeCheck[type]["wrongansw_label"]}</label><input type = {qaTypeCheck[type]["inputType"]} placeholder="Wrong Answer" className='WrongAnswer' key={`'wa'${i}`}/></div>);

        // ansDisplay.push(<input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`}/>);
      }   
      // let radio = document.querySelector('input[type="radio"]:checked')
      // console.log(radio) 
    }
    
    return (
      <div>
        <input type="text" placeholder="Question"  id = 'idQuestion'/>

        <select name="type" id="idQuestionType" onChange={this.props.onChange}>
          {displayOption}
        </select>

        <select name="type" id="idQuestionCategory" onChange={this.props.onChange}>
          {categoryList}
        </select>
        <br/>


        {ansDisplay}

        <button onClick = {this.props.onClick}>Submit question</button>
      </div>
    );
  }
}

export default QAentry;
