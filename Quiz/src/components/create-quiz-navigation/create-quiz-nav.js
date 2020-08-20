import React, { Component } from 'react'

export class CreateQuizNav extends Component {

    render() {   
        const createQuizTabColor = this.props.quizNav === "Create Quiz" ? "tabActive" : "tabInactive";
        const previewQuizTabColor = this.props.quizNav !== "Create Quiz" ? "tabActive" : "tabInactive";

        return (
            <div className='createQuizNavContainer'>
                <div className={`createQuizTab ${createQuizTabColor}`} onClick={this.props.onEntryClick}>Create Quiz</div>
                <div className={`previewQuizTab ${previewQuizTabColor}`} onClick={this.props.onPreviewClick}>Preview Quiz</div>
            </div>
        )
    }
}

export default CreateQuizNav
