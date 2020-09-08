import React, { Component } from 'react'
import "../quiz-manager-preview/quiz-manager-preview.css";

export class BackToQMConfirmation extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onClickCancel, onClickBackToQM } = this.props; 

        return (
            <div>
                {this.props.noticeMsg}
                <br/>
                <button onClick={onClickBackToQM} className="buttonBack" style={{marginRight: "20px", marginTop: "35px"}}>Back to Quiz Manager</button>
                <button onClick={onClickCancel} className="buttonCancel"> Cancel </button>
            </div>
        )
    }
}

export default BackToQMConfirmation;
