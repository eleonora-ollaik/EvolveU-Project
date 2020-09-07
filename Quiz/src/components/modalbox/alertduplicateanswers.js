import React, { Component } from 'react'

export class AlertDuplicateAnswers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.noticeMsg}
                <br/>
            </div>
        )
    }
}

export default AlertDuplicateAnswers;
