import React, { Component } from 'react'

export class deleteConfirmationContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onClickCancel } = this.props; 

        return (
            <div>
                {this.props.noticeMsg}
                <br/>
                <button > Delete </button>
                <button onClick={onClickCancel}> Cancel </button>
            </div>
        )
    }
}

export default deleteConfirmationContent
