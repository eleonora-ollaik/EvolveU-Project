import React, { Component } from 'react'

export class deleteConfirmationContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onClickCancel, deleteQuiz, highlightedQuizID } = this.props; 
        console.log('this is props highlighted id', highlightedQuizID)
        return (
            <div>
                {this.props.noticeMsg}
                <br/>
                <button onClick={() => deleteQuiz({highlightedQuizID})}> Delete </button>
                <button onClick={onClickCancel}> Cancel </button>
            </div>
        )
    }
}

export default deleteConfirmationContent
