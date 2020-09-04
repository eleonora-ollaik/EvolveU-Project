import React, { Component } from 'react'

export class deleteConfirmationContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.noticeMsg}
                <button>Delete</button>
                <button>Cancel</button>
            </div>
        )
    }
}

export default deleteConfirmationContent
