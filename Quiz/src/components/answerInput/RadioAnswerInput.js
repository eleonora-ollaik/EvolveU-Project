import React, { Component } from 'react'

export class RadioAnswerInput extends Component {


    onChange = (e) => {
        // console.log('event:', e.target.className)
        // console.log('hello from onchange')
        // console.log(document.querySelectorAll("input[name='radioanswerinput']"))
        let radios = document.querySelectorAll("input[name='radioanswerinput']")
        for (let i = 0; i< radios.length; i++){
            if(radios[i].checked){
                radios[i].className = 'CorrectAnswer'
            } else {
                radios[i].className = 'WrongAnswer'
            }

        }
        console.log(document.querySelectorAll("input[name='radioanswerinput']"))

    }


    render() {
        const correctAnswer = this.props.correctAnswer;
        const defaultValue = this.props.defaultValue;


        let display = [];
        if (correctAnswer) {
            display.push(<p key='p1'>Select correct answer:</p>)
            display.push(<label htmlFor="True" key="trueLabel">True:</label>)
            if (defaultValue === 'True') {
                display.push(<input key="true1" type="radio" defaultChecked name="radioanswerinput" value ="True" className='CorrectAnswer' onChange= {(e) => {this.onChange(e)}}/>)
            } 
            else 
            {
                display.push(<input key="true1" type="radio"  name="radioanswerinput" value ="True" className='CorrectAnswer' onChange= {(e) => {this.onChange(e)}}/>)
            }

            display.push(<label htmlFor="False" key="falseLabel">False:</label>)
           
            if (defaultValue === 'False') {
                display.push(<input key="false1" type="radio" defaultChecked name="radioanswerinput" value ="False" className='WrongAnswer' onChange= {(e) => {this.onChange(e)}} />)
            } 
            else 
            {
                display.push(<input key="false1" type="radio" name="radioanswerinput" value ="False" className='WrongAnswer' onChange= {(e) => {this.onChange(e)}} />)
            }
            // <div>
                {/* <label for="True">True:</label>
                <input type="radio" name="radioanswerinput" value ="True" className='CorrectAnswer' />
                <br/>
                <label for="False">False:</label>
                <input type="radio" name="radioanswerinput" value ="False" className='WrongAnswer'  /> */}

            // </div>)
        } else {
            display.push(<div></div>)
        }
        
        return (
            <div>
                {display}
            </div>
        )
    }
}

export default RadioAnswerInput
