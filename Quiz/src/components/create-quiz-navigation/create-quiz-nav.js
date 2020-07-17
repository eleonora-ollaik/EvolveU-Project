import React, { Component } from 'react'

export class CreateQuizNav extends Component {

    render() {        
        return (
            <div>
                <div onClick={this.props.onEntryClick}>Create Quiz</div>
                <div onClick={this.props.onPreviewClick}>Preview Quiz</div>
            </div>
        )
    }
}

export default CreateQuizNav
