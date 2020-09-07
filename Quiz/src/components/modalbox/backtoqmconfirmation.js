import React, { Component } from 'react'

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
                <button onClick={onClickBackToQM}> Back to Quiz Manager </button>
                <button onClick={onClickCancel}> Cancel </button>
            </div>
        )
    }
}

export default BackToQMConfirmation;
