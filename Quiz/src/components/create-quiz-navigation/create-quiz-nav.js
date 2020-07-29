import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

export class CreateQuizNav extends Component {

    render() {        
        return (
            <Nav variant="tabs" >
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={this.props.onEntryClick}>Create Quiz</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={this.props.onPreviewClick}>Preview Quiz</Nav.Link>
                </Nav.Item>

            </Nav>
        )
    }
}

export default CreateQuizNav
