import React, { Component } from 'react'

export class RadioAnswerInput extends Component {

    onChange = (e) => {
        let radios = document.querySelectorAll("input[name='radioanswerinput']")
        for (let i = 0; i< radios.length; i++){
            if(radios[i].checked) {
                radios[i].className = 'CorrectAnswer'
            } else {
                radios[i].className = 'WrongAnswer'
            }
        }
    }

    render() {
        const correctAnswer = this.props.correctAnswer;
        const defaultValue = this.props.defaultValue;

        let display = [];
        if (correctAnswer) {
            display.push(<h3 key='p1'>Select correct answer:</h3>)
            display.push(<label style={{fontSize: "20px"}} htmlFor="True" key="trueLabel">True:</label>)
            if (defaultValue === 'True') {
                display.push(<input style={{fontSize: "20px"}} key="ca1" type="radio" defaultChecked name="radioanswerinput" value ="True" className='CorrectAnswer' onChange= {(e) => {this.onChange(e)}}/>)
            } 
            else 
            {
                display.push(<input key="ca1" type="radio"  name="radioanswerinput" value ="True" className='CorrectAnswer' onChange= {(e) => {this.onChange(e)}}/>)
            }

            display.push(<label style={{fontSize: "20px"}} htmlFor="False" key="falseLabel">False:</label>)
           
            if (defaultValue === 'False') {
                display.push(<input key="wa1" type="radio" defaultChecked name="radioanswerinput" value ="False" className='WrongAnswer' onChange= {(e) => {this.onChange(e)}} />)
            } 
            else {
                display.push(<input key="wa1" type="radio" name="radioanswerinput" value ="False" className='WrongAnswer' onChange= {(e) => {this.onChange(e)}} />)
            }
        }
        
        return (
            <div className='edit-answers'>
                {display}
            </div>
        )
    }
}

export default RadioAnswerInput
