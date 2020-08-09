import React, { Component } from 'react'

export class TextAnswerInput extends Component {
    render() {
        let ansDisplay=[];
        const correctAnswer = this.props.correctAnswer;
        const defaultValue = this.props.defaultValue;
        // for (let )
        if (correctAnswer) {
            ansDisplay.push(<label key="trueLabel">Correct Answer</label>)
            
            ansDisplay.push(<input type ="text" className='CorrectAnswer' placeholder='Correct answer' defaultValue={defaultValue} key='ca'/>)

        }
        else {
            ansDisplay.push(<label key="trueLabel">Wrong Answer</label>)
            ansDisplay.push(<input type ="text" className='WrongAnswer' placeholder='Wrong Answer' defaultValue={defaultValue} key='wa'/>)

        }
      
        return (
            <div>
                {ansDisplay}
            </div>
        )
    }
}

export default TextAnswerInput
