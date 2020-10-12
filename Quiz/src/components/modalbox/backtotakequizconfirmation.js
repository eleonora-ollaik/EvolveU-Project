import React, { Component } from 'react'
import "../quiz-manager-preview/quiz-manager-preview.css";

export class BackToTakeQuizConfirmation extends Component {
    constructor() {
        super()
    }
    render() {
        const { onClickCancel, onClickBackToTQ } = this.props; 

        return (
            <div>
                {this.props.noticeMsg}
                <br/>
                <button onClick={onClickBackToTQ} className="buttonBack" style={{marginRight: "20px", marginTop: "35px"}}>Quit</button>
                <button onClick={onClickCancel} className="buttonCancel"> Cancel </button>
            </div>
        )
    }
}

export default BackToTakeQuizConfirmation;
