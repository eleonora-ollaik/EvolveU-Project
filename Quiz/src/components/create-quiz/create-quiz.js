import React, { Component } from "react";
import {Form, Col, Button, DropdownButton, InputGroup, FormControl} from 'react-bootstrap'
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

export class QAentry extends Component {

  render() {
    // console.log(this.props)

    let ansDisplay=[];
    const type = this.props.qaType;
console.log(type)
    const displayOption = this.props.qaTypeList;
    const qaTypeCheck = this.props.qaTypeCheck;
    // const 
    //      console.log(qaTypeCheck)
    if(qaTypeCheck !== null) {   
      // Generate correct answer inputs  
      for (let i=0; i<qaTypeCheck[type]["caNumer"]; i++) {
        ansDisplay.push(<input type="text" placeholder="Correct Answer" className='CorrectAnswer' key={`'ca'${i}`}/>);
      }
  
      // Generate wrong answer inputs
      for (let i=0; i<qaTypeCheck[type]["iaNumber"]; i++) {
        ansDisplay.push(
        <input type="text" placeholder="Wrong Answer" className='WrongAnswer' key={`'ia'${i}`}/>
        );
      }      
    }
    
    return (
   
      <Form>
          <InputGroup>

          {/* <Form.Label>Question:</Form.Label>  */}
      
          <Form.Control type="text" placeholder="Question"  id = 'idQuestion'/>
            <DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Type" id="idQuestionType" onSelect={this.props.onChange}>
            {displayOption}
            </DropdownButton>
        


          </InputGroup>
         <br/> 


          <Form.Group as={Col} >
          {ansDisplay}
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" onClick = {this.props.onClick}>Submit question</Button>
        </Form>
    );
  }
}

export default QAentry;
